# 🔗 AutoChain Logistics Tracking System (Kelompok 9)

An untamperable decentralized application (dApp) built to track vehicle supply chain lifecycles across distributed participants. This system integrates **Solidity Smart Contracts** deployed on the **Ethereum Sepolia Testnet** with a dynamic, multi-page frontend interface powered by **Ethers.js** and **SweetAlert2**.

---

## 👥 Anggota Kelompok & Kontributor
* **Program Studi:** Sistem Informasi
* **Mata Kuliah:** Teknologi Blockchain
* **Repositori Resmi:** [GitHub Link](https://github.com/INDOMIEX/AUTOCHAIN_LOGISTICS_KELOMPOK_9_BLOCKCHAIN.git)

---

## 🛠️ Tech Stack & Arsitektur Sistem

Aplikasi ini menggunakan pendekatan **Hybrid Architecture** demi mengoptimalkan efisiensi biaya gas (*gas fee utilization*):
1. **On-Chain Data (Solidity Smart Contract):** Menyimpan data esensial yang membutuhkan integritas tinggi dan transparansi mutlak, seperti nomor VIN (Primary Key), status logistik dinamis, alamat wallet pengubah, dan waktu *block timestamp*.
2. **Off-Chain Data (Local Database JSON):** Menyimpan spesifikasi fisik kendaraan yang statis dan berat (Nama Mobil, Tahun Produksi, Varian Warna) pada berkas terpisah untuk dibaca secara asinkron oleh frontend berdasarkan kecocokan VIN.

* **Smart Contract Language:** Solidity v0.8.x
* **Blockchain Network:** Ethereum Sepolia Testnet
* **Web3 Provider:** MetaMask Extension Wallet
* **Frontend Controller:** Vanilla JavaScript, HTML5, CSS3 Grid System
* **Libraries:** Ethers.js v5 (Web3 RPC Liaison), SweetAlert2 (Dynamic Centered Modal Alerts)

---

## 📂 Struktur Repositori Proyek

```text
autochain-web/
├── index.html       # Halaman Utama: Track Verification & Dashboard Audit Trail
├── register.html    # Panel Pabrik: Minting & Inisialisasi Kendaraan Baru
├── update.html      # Panel Vendor Logistik: Pembaruan Manifes Distribusi Rute
├── confirm.html     # Panel Dealer: Validasi Penerimaan Akhir & Penutupan Siklus Ledger
├── shared.js        # Core Web3 Network Initialization & Automated Wallet Recovery
├── style.css        # Desain Dashboard Layout, Sidebar Navigasi & Responsive Grid
└── vehicles.json    # Off-Chain Metadata Store (Spesifikasi Fisik Aset)
