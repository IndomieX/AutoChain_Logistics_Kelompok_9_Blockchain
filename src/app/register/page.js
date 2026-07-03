"use client";
import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const { contract, vehicleMetadata, setVehicleMetadata, updateWidgets } = useWeb3();
    const [vin, setVin] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");

    const handleRegister = async () => {
        if (!contract) return Swal.fire('Wallet Required', 'Please connect secure wallet first!', 'warning');
        if (!vin || !name || !year || !color) return Swal.fire('Verification Failed', 'All specification parameters are mandatory.', 'error');

        try {
            // LOADING STATE FASE 1: Menunggu konfirmasi user menekan sign/approve di pop-up MetaMask
            Swal.fire({ title: 'Awaiting Signature', text: 'Please sign gas fee approval on your MetaMask wallet extension...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            const tx = await contract.registerVehicle(vin);
            
            // LOADING STATE FASE 2: Dompet disetujui, menunggu transaksi masuk blok on-chain Sepolia
            Swal.fire({ title: 'Minting Asset On-Chain', text: 'Encrypting credentials and broadcasting to Sepolia testnet nodes...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            await tx.wait(); // Menunggu block mining selesai

            const updatedDb = { ...vehicleMetadata, [vin]: { name, year: parseInt(year), color } };
            setVehicleMetadata(updatedDb);
            localStorage.setItem("autoChain_db", JSON.stringify(updatedDb));
            localStorage.setItem(`time_reg_${vin}`, new Date().toLocaleString('id-ID') + " WIB");
            updateWidgets(updatedDb);

            Swal.fire({ title: 'Asset Minted Successfully!', text: `Unit ${name} has been permanently written to block records.`, icon: 'success', confirmButtonColor: '#2563eb' });
            setVin(""); setName(""); setYear(""); setColor("");
        } catch (e) {
            Swal.fire('Execution Reverted', e.reason || e.message, 'error');
        }
    };

    return (
        <main className="app-container">
            <div className="card-form">
                <h2>🏭 Vehicle Registration & Specification</h2>
                <p className="card-subtitle">Otoritas Pabrik: Tulis identitas fisik mobil langsung ke dalam data blok Sepolia.</p>
                <div className="form-group"><label>Vehicle Identification Number (VIN)</label><input type="text" value={vin} onChange={(e)=>setVin(e.target.value)} placeholder="Masukkan Kode Nomor Rangka Baru" /></div>
                <div className="form-group"><label>Nama / Model Seri Kendaraan</label><input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Contoh: Honda Civic Type R" /></div>
                <div className="form-group"><label>Tahun Konstruksi Perakitan</label><input type="number" value={year} onChange={(e)=>setYear(e.target.value)} placeholder="Contoh: 2026" /></div>
                <div className="form-group"><label>Varian Warna Lapisan Fisik</label><input type="text" value={color} onChange={(e)=>setColor(e.target.value)} placeholder="Contoh: Platinum White Pearl" /></div>
                <button className="btn-submit" onClick={handleRegister}>Mint Asset Credentials</button>
            </div>
        </main>
    );
}