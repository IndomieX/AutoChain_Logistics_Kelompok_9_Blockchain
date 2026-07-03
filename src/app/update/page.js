"use client";
import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import Swal from 'sweetalert2';

export default function UpdatePage() {
    const { contract } = useWeb3();
    const [vin, setVin] = useState("");
    const [status, setStatus] = useState("");

    const handleUpdate = async () => {
        if (!contract) return Swal.fire('Wallet Required', 'Please connect secure wallet first!', 'warning');
        if (!vin || !status) return Swal.fire('Verification Failed', 'VIN code and Tracking Location text fields are required.', 'error');

        try {
            // LOADING STATE FASE 1
            Swal.fire({ title: 'Awaiting Courier Signature', text: 'Confirm network gas fee adjustment inside MetaMask...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            const tx = await contract.updateShipment(vin, status);
            
            // LOADING STATE FASE 2
            Swal.fire({ title: 'Updating Logistics Ledger', text: 'Securing new location log parameter on Sepolia cluster nodes...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            await tx.wait();

            localStorage.setItem(`time_update_${vin}`, new Date().toLocaleString('id-ID') + " WIB");
            Swal.fire({ title: 'Shipping Manifest Saved!', text: `Current position altered to: "${status}".`, icon: 'success', confirmButtonColor: '#10b981' });
            setVin(""); setStatus("");
        } catch (e) {
            Swal.fire('Modification Reverted', e.reason || e.message, 'error');
        }
    };

    return (
        <main className="app-container">
            <div className="card-form">
                <h2>🚚 Logistics Shipment Update</h2>
                <p className="card-subtitle">Otoritas Vendor Logistik: Perbarui posisi koordinat manifes perjalanan secara berkala.</p>
                <div className="form-group"><label>Vehicle Identification Number (VIN)</label><input type="text" value={vin} onChange={(e)=>setVin(e.target.value)} placeholder="Masukkan VIN Unit Terdistribusi" /></div>
                <div className="form-group"><label>Current Terminal / Location Status</label><input type="text" value={status} onChange={(e)=>setStatus(e.target.value)} placeholder="Contoh: Transit Gudang Karawang atau Perjalanan Tol Cipali" /></div>
                <button className="btn-submit" style={{background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)', border:'1px solid #047857'}} onClick={handleUpdate}>Broadcast Location Log</button>
            </div>
        </main>
    );
}