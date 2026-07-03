"use client";
import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import Swal from 'sweetalert2';

export default function ConfirmPage() {
    const { contract, vehicleMetadata } = useWeb3();
    const [inputVin, setInputVin] = useState("");
    const [loadedCar, setLoadedCar] = useState(null);

    const loadVehicle = async () => {
        if (!contract) return Swal.fire('Wallet Required', 'Please link MetaMask secure wallet first.', 'warning');
        if (!inputVin.trim()) return Swal.fire('Error', 'Input field cannot be empty.', 'error');

        Swal.fire({ title: 'Interrogating Block State', text: 'Reading on-chain metadata structures...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        try {
            const result = await contract.daftarMobil(inputVin.trim());
            Swal.close();

            if (result.vin === "" || result[0] === "") {
                setLoadedCar(null);
                return Swal.fire('Not Indexed', 'This vehicle registry index does not exist.', 'warning');
            }

            const carInfo = vehicleMetadata[inputVin.trim()] || { name: "Custom Architectural Design", year: "N/A", color: "Custom Spec" };
            setLoadedCar({ vin: inputVin.trim(), name: carInfo.name, year: carInfo.year, color: carInfo.color, status: result.status });
            Swal.fire('Data Synced', 'Local technical specs and blockchain state aligned.', 'success');
        } catch (e) {
            Swal.fire('Error', 'Failed to read from blockchain server node.', 'error');
        }
    };

    const confirmReceipt = async () => {
        try {
            // LOADING STATE FASE 1
            Swal.fire({ title: 'Authorizing Gateway Lock', text: 'Approve asset ownership transfer signature on MetaMask...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            const tx = await contract.confirmDelivery(loadedCar.vin);

            // LOADING STATE FASE 2
            Swal.fire({ title: 'Closing Distribution Ledger', text: 'Finalizing final gate-in timestamp block signature inside Sepolia...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            await tx.wait();

            localStorage.setItem(`time_confirm_${loadedCar.vin}`, new Date().toLocaleString('id-ID') + " WIB");
            Swal.fire({ title: 'Ledger Closed Successfully!', text: 'Asset safely recorded as delivered. Distribution loop complete.', icon: 'success' });
            setLoadedCar(null); setInputVin("");
        } catch (e) {
            Swal.fire('Confirmation Failed', e.reason || e.message, 'error');
        }
    };

    return (
        <main className="app-container">
            <div className="autochain-card">
                <h2>🏢 Load Inbound Vehicle</h2>
                <p className="card-subtitle">Otoritas Dealer Resmi: Muat spesifikasi fisik mobil secara dinamis sebelum menutup tanda terima digital.</p>
                <div className="search-container">
                    <input type="text" value={inputVin} onChange={(e)=>setInputVin(e.target.value)} placeholder="Masukkan Kode Rangka VIN Unit Masuk..." />
                    <button className="btn-search" onClick={loadVehicle}>🔍 Load Specs</button>
                </div>
            </div>

            {loadedCar && (
                <div className="dealer-card" style={{maxWidth: '500px', margin: '0 auto'}}>
                    <div style={{textAlign: 'center'}}>
                        <span style={{fontSize: '2.5rem'}}>🚗</span>
                        <h2 style={{marginTop:'10px'}}>{loadedCar.name}</h2>
                        <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>{loadedCar.year} &bull; {loadedCar.color}</p>
                        <div className="vin-badge-box">{loadedCar.vin}</div>
                        <p style={{fontSize: '0.9rem', marginBottom:'20px'}}><strong>On-Chain Status:</strong> <span style={{color:'#2563eb', fontWeight:700}}>{loadedCar.status}</span></p>
                    </div>
                    <button className="btn-confirm-receipt" onClick={confirmReceipt}>Confirm & Close Lifecycle</button>
                </div>
            )}
        </main>
    );
}