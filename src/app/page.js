"use client";
import { useState } from 'react';
import { useWeb3 } from './context/Web3Context';
import Swal from 'sweetalert2';

export default function TrackPage() {
    const { contract, vehicleMetadata, stats } = useWeb3();
    const [searchVin, setSearchVin] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [resStatus, setResStatus] = useState("");
    const [isArrived, setIsArrived] = useState(false);
    const [timeLogs, setTimeLogs] = useState({ factory: "-", logistics: "-", dealer: "-" });
    const [logistikTxt, setLogistikTxt] = useState("Menunggu Kurir...");
    const [dealerTxt, setDealerStatusTxt] = useState("Belum Sampai");

    const webTrackVehicle = async () => {
        if (!contract) return Swal.fire('Wallet Required', 'Please connect MetaMask secure wallet first.', 'warning');
        if (!searchVin.trim()) return Swal.fire('Input Required', 'Please fill the VIN code text-box.', 'error');

        // LOADING STATE: Memanggil Data Node Block Sepolia (Fase Read-Only Istimewa Cepat)
        Swal.fire({ title: 'Querying Ledger State', text: 'Fetching cryptographic parameters from Sepolia node...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        try {
            const result = await contract.daftarMobil(searchVin.trim());
            Swal.close(); // Tutup loading saat data terunduh sempurna

            if (result.vin === "" || result[0] === "") {
                setShowResult(false);
                return Swal.fire('Asset Not Found', `VIN ${searchVin} is not registered on-chain.`, 'info');
            }

            const carInfo = vehicleMetadata[searchVin.trim()] || { name: "Custom Blueprint Model", year: "N/A", color: "N/A" };
            setResStatus(`${carInfo.name} (${carInfo.year}) - ${result.status}`);
            
            const statusStr = result.status.toLowerCase();
            const arrivedCheck = statusStr.includes('sampai') || statusStr.includes('arrived') || statusStr.includes('received') || statusStr.includes('delivered') || (statusStr.includes('dealer') && !statusStr.includes('perjalanan') && !statusStr.includes('transit'));
            setIsArrived(arrivedCheck);

            const dateConversion = new Date(result.waktuUpdate * 1000).toLocaleString('id-ID') + " WIB";
            let regTime = localStorage.getItem(`time_reg_${searchVin}`) || "Terverifikasi On-Chain";
            let updateTime = localStorage.getItem(`time_update_${searchVin}`) || (statusStr.includes('perjalanan') ? dateConversion : "Menunggu Distribusi...");
            let confirmTime = localStorage.getItem(`time_confirm_${searchVin}`) || (arrivedCheck ? dateConversion : "Belum Sampai di Tujuan");

            setTimeLogs({ factory: regTime, logistics: updateTime, dealer: confirmTime });

            if (statusStr.includes('perjalanan') || statusStr.includes('gudang')) {
                setLogistikTxt(`Status: ${result.status}`);
                setDealerStatusTxt("Status: Sedang Transit Menuju Lokasi");
            } else if (arrivedCheck) {
                setLogistikTxt("Status: Transportasi Distribusi Selesai");
                setDealerStatusTxt(`Status: Diterima oleh Dealer (${result.pemegangTerakhir.substring(0,8)}...)`);
            } else {
                setLogistikTxt("Status: Menunggu Kurir Logistik");
                setDealerStatusTxt("Status: Belum Sampai");
            }
            setShowResult(true);
        } catch (e) {
            Swal.fire('Query Failed', 'Failed to communicate with blockchain block network.', 'error');
        }
    };

    return (
        <main className="app-container">
            <div className="hero-header">
                <span className="hero-badge">Immutable Tracking Infrastructure</span>
                <h1>Enterprise Supply Chain Overview</h1>
                <p>Simulasi siklus logistik terdesentralisasi kelompok 9 untuk transparansi data end-to-end.</p>
            </div>

            <div className="dashboard-widgets">
                <div className="widget-card">
                    <div className="widget-icon bg-blue">🏭</div>
                    <div className="widget-info"><h3>Total Unit</h3><p>{stats.total}</p></div>
                </div>
                <div className="widget-card">
                    <div className="widget-icon bg-orange">🚚</div>
                    <div className="widget-info"><h3>Dalam Transit</h3><p>{stats.transit}</p></div>
                </div>
                <div className="widget-card">
                    <div className="widget-icon bg-purple">🏢</div>
                    <div className="widget-info"><h3>Sampai Dealer</h3><p>{stats.arrived}</p></div>
                </div>
            </div>

            <div className="autochain-card">
                <div className="search-container">
                    <input type="text" value={searchVin} onChange={(e) => setSearchVin(e.target.value)} placeholder="Enter Vehicle Identification Number (VIN) code..." />
                    <button className="btn-search" onClick={webTrackVehicle}>🔍 Search</button>
                </div>

                {showResult && (
                    <>
                        <div className="status-blue-box" style={{display: 'block'}}>
                            <span style={{fontSize: '0.8rem', opacity: 0.85, textTransform: 'uppercase', fontWeight: 700}}>Current Terminal Node Location</span>
                            <h1>{resStatus}</h1>
                            <div className="status-tag" style={{backgroundColor: isArrived ? '#10b981' : 'rgba(255,255,255,0.2)'}}>
                                {isArrived ? "✓ Arrived / Received" : "• In Transit"}
                            </div>
                        </div>

                        <div className="timeline-card" style={{display: 'block'}}>
                            <h4>Cryptographic Lifecycle Log</h4>
                            <div className="timeline-wrapper">
                                <div className="timeline-item">
                                    <div className="timeline-icon">🏭</div>
                                    <div className="timeline-content">
                                        <h5>1. Factory Verification Log (Pabrik)</h5>
                                        <small style={{color: '#2563eb', fontWeight: 600}}>{timeLogs.factory}</small>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-icon">🚚</div>
                                    <div className="timeline-content">
                                        <h5>2. Logistics Shipping Manifest (Kurir Perjalanan)</h5>
                                        <small style={{color: '#10b981', fontWeight: 600}}>{timeLogs.logistics}</small>
                                        <span className="timeline-hash" style={{display:'block', marginTop:'3px'}}>{logistikTxt}</span>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-icon">🏢</div>
                                    <div className="timeline-content">
                                        <h5>3. Dealer Gate-In Ledger (Tujuan Akhir)</h5>
                                        <small style={{color: '#8b5cf6', fontWeight: 600}}>{timeLogs.dealer}</small>
                                        <span className="timeline-hash" style={{display:'block', marginTop:'3px'}}>{dealerTxt}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}