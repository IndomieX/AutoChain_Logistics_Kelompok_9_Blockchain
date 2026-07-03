"use client";
import './globals.css';
import { Web3Provider, useWeb3 } from './context/Web3Context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function HeaderNavbar() {
    const { connectWallet, isConnected } = useWeb3();
    const pathname = usePathname();

    return (
        <header className="autochain-header">
            <div className="header-container">
                {/* 1. KIRI: BRAND LOGO */}
                <Link href="/" className="brand-area">
                    <span className="brand-logo">🛡️</span>
                    <div className="brand-text">
                        <h2 className="brand-title">AutoChain<span>Logistics</span><span className="brand-tag">dApp</span></h2>
                    </div>
                </Link>
                {/* 2. TENGAH: NAVIGATION MENU */}
                <nav>
                    <ul className="nav-menu">
                        <li><Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Track & Overview</Link></li>
                        <li><Link href="/register" className={`nav-link ${pathname === '/register' ? 'active' : ''}`}>Vehicle Registration</Link></li>
                        <li><Link href="/update" className={`nav-link ${pathname === '/update' ? 'active' : ''}`}>Logistics Update</Link></li>
                        <li><Link href="/confirm" className={`nav-link ${pathname === '/confirm' ? 'active' : ''}`}>Arrival Confirmation</Link></li>
                    </ul>
                </nav>
                {/* 3. KANAN: WALLET BUTTON CONTROLLER */}
                <div className="wallet-area">
                    <button id="connectBtn" className={`btn-wallet ${isConnected ? 'connected' : ''}`} onClick={connectWallet}>
                        {isConnected ? "Connected" : "👛 Connect Wallet"}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Web3Provider>
                    <HeaderNavbar />
                    {children}
                </Web3Provider>
            </body>
        </html>
    );
}