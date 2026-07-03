"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';

const Web3Context = createContext();

const contractAddress = "0x99223E82d666a5E313cBa747C16ba94564f92F41";
const contractABI = [
    "function registerVehicle(string _vin)",
    "function updateShipment(string _vin, string _status)",
    "function confirmDelivery(string _vin)",
    "function daftarMobil(string _vin) view returns (string vin, string status, address pemegangTerakhir, uint256 waktuUpdate)"
];

export function Web3Provider({ children }) {
    const [walletAddress, setWalletAddress] = useState("Not Connected");
    const [isConnected, setIsConnected] = useState(false);
    const [contract, setContract] = useState(null);
    const [vehicleMetadata, setVehicleMetadata] = useState({});
    const [stats, setStats] = useState({ total: 0, transit: 0, arrived: 0 });

    useEffect(() => {
        loadOffChainDatabase();
        checkWalletOnLoad();
    }, []);

    const loadOffChainDatabase = async () => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("autoChain_db")) {
                const db = JSON.parse(localStorage.getItem("autoChain_db"));
                setVehicleMetadata(db);
                updateWidgets(db);
            } else {
                try {
                    const response = await fetch('/vehicles.json');
                    const db = await response.json();
                    localStorage.setItem("autoChain_db", JSON.stringify(db));
                    setVehicleMetadata(db);
                    updateWidgets(db);
                } catch (e) {
                    console.error("Gagal membaca static database", e);
                }
            }
        }
    };

    const updateWidgets = (db) => {
        const totalUnits = Object.keys(db).length;
        const transitUnits = Math.max(1, Math.floor(totalUnits / 3));
        const arrivedUnits = Math.max(0, totalUnits - transitUnits);
        setStats({ total: totalUnits, transit: transitUnits, arrived: arrivedUnits });
    };

    const checkWalletOnLoad = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
                const signer = provider.getSigner();
                const contractInst = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contractInst);
                setWalletAddress(accounts[0]);
                setIsConnected(true);
            }
        }
    };

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const signer = provider.getSigner();
                const contractInst = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contractInst);
                const myAddress = await signer.getAddress();
                setWalletAddress(myAddress);
                setIsConnected(true);
                Swal.fire({ title: 'Wallet Connected!', text: 'Secure session established successfully.', icon: 'success', confirmButtonColor: '#2563eb' });
            } catch (error) {
                Swal.fire('Cancelled', 'Connection signature rejected.', 'error');
            }
        } else {
            Swal.fire('Wallet Missing', 'Please install MetaMask extension!', 'warning');
        }
    };

    return (
        <Web3Context.Provider value={{ walletAddress, isConnected, contract, vehicleMetadata, setVehicleMetadata, stats, updateWidgets, connectWallet }}>
            {children}
        </Web3Context.Provider>
    );
}

export const useWeb3 = () => useContext(Web3Context);