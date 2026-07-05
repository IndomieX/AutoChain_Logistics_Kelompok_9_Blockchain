
  <h3 align="center">AutoChain Logistics</h3>

  <p align="center">
    Implementasi Blockchain untuk Meningkatkan Transparansi pada Industri Logistik Mobil
    <br />
    <a href="https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://auto-chain-logistics-kelompok-9-blo.vercel.app">View Demo</a>
    &middot;
    <a href="https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Industri logistik otomotif konvensional masih menghadapi tantangan besar terkait transparansi data dan risiko manipulasi riwayat unit kendaraan selama proses distribusi dari pabrik ke dealer. Basis data tradisional yang bersifat terpusat memiliki kerentanan berupa titik kegagalan tunggal (*single point of failure*), di mana pihak internal dapat mengubah data log perjalanan tanpa rekam jejak yang transparan (*siloed data*).

**AutoChain Logistics** hadir sebagai platform *Single Source of Truth* terdesentralisasi yang menjamin integritas data mutlak. Proyek ini mengimplementasikan aplikasi terdesentralisasi (dApp) berbasis arsitektur multi-halaman yang memanfaatkan *smart contract* Solidity pada jaringan Ethereum Sepolia Testnet. Dengan menggunakan Nomor Rangka (*Vehicle Identification Number*/VIN) sebagai kunci utama permanen (*immutable primary key*) di dalam blockchain, manipulasi riwayat perjalanan oleh pihak ketiga dapat dicegah secara total.

Berikut adalah keunggulan utama arsitektur kami:
* **Hybrid Storage Architecture:** Data status pelacakan krusial dikelola secara *on-chain* untuk menjamin keamanan, sedangkan data spesifikasi fisik kendaraan (Model, Tahun, Warna) dikelola secara *off-chain* menggabungkan berkas `vehicles.json` dan browser `localStorage` demi menghemat pengeluaran *gas fee*.
* **Role-Based Access Control (RBAC):** Fungsi sensitif kontrak pintar dilindungi oleh modifier keamanan `hanyaPabrik` dan `hanyaVendorTerverifikasi` untuk mencegah penulisan data oleh akun ilegal.
* **Cryptographic Lifecycle Log:** Visualisasi pelacakan kronologis real-time berbiaya gas nol (*zero gas cost*) menggunakan fungsi bertipe `view` (`verifyUnit`).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Sistem ini dibangun dengan mengintegrasikan ekosistem Web3 dan kerangka kerja web premium berikut:

* [![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
* [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
* [![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
* [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
* [![Ethers.js](https://img.shields.io/badge/Ethers.js-2535a0?style=for-the-badge&logo=ethereum&logoColor=white)](https://docs.ethers.org/v5/)

<!-- FUNGSI UTAMA -->
## Fungsi Utama

### 1. Track & Overview Dashboard (`/`)
* **Tampilan Ringkas Metrik:** Menyajikan ringkasan data total pasokan unit secara real-time yang terbagi menjadi tiga indikator statistik (*Total Unit*, *Dalam Transit*, dan *Sampai Dealer*).
* **Cryptographic Lifecycle Log:** Menyediakan kolom pencarian string tunggal Nomor Rangka (VIN) untuk menarik jejak digital audit (*digital footprint*) perjalanan unit secara kronologis.

<p align="center">
  <img src="https://auto-chain-logistics-kelompok-9-blo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.png&w=256&q=75" alt="Dashboard Overview Screenshot" width="700">
</p>

### 2. Vehicle Registration (`/register`)
* **Otoritas Khusus Pabrik:** Formulir entri data terisolasi yang dilindungi oleh modifier keamanan `hanyaPabrik` untuk mendaftarkan unit mobil baru.
* **Inisialisasi Hybrid Storage:** Mengirimkan parameter kode identifikasi VIN menuju blok Sepolia Testnet dan secara simultan mencatat data fisik statis (Model, Tahun, Warna) ke memori lokal[cite: 1].

<p align="center">
  <img src="https://auto-chain-logistics-kelompok-9-blo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.png&w=256&q=75" alt="Vehicle Registration Screenshot" width="700">
</p>

### 3. Logistics Shipment Update (`/update`)
* **Pembaruan Posisi Manifes:** Halaman khusus kurir ekspedisi untuk memperbarui manifes teks log posisi koordinat atau terminal transit terkini unit[cite: 1].
* **Proteksi Akses RBAC:** Memanfaatkan gerbang pengujian whitelist `hanyaVendorTerverifikasi` untuk menolak dan melakukan *revert transaction* secara keras apabila dipicu oleh akun ilegal[cite: 1].

<p align="center">
  <img src="https://auto-chain-logistics-kelompok-9-blo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.png&w=256&q=75" alt="Logistics Update Screenshot" width="700">
</p>

### 4. Arrival Confirmation (`/confirm`)
* **Terminal Akhir Distribusi:** Panel interaktif serah terima digital bagi pihak Dealer Resmi untuk memeriksa muatan unit inbound[cite: 1].
* **Parsing Data Hibrida:** Menampilkan kartu ringkasan spesifikasi kendaraan hasil gabungan query *on-chain data* dan berkas database lokal secara asinkron sebelum mengunci transaksi final[cite: 1].

<p align="center">
  <img src="https://auto-chain-logistics-kelompok-9-blo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.png&w=256&q=75" alt="Arrival Confirmation Screenshot" width="700">
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- TEKNOLOGI & TOOLS -->
## Teknologi & Tools

* **Next.js 14 (App Router)**
  * Framework React modern untuk optimalisasi performa *routing client-side* berbasis multi-halaman (*multi-page dApp*)[cite: 1].
  * Struktur direktori `/src/app` digunakan secara modular untuk memisahkan logika antarmuka tiap peran aktor[cite: 1].
* **Solidity 0.8.0**
  * Bahasa pemrograman berorientasi objek untuk menyusun kompilasi logika bisnis, aturan modifikasi hak akses, dan struktur objek *Smart Contract*[cite: 1].
* **Ethers.js v5**
  * Pustaka Web3 eksternal yang bertindak sebagai *provider* dan *signer* asinkron untuk menghubungkan API fungsi kontrak pintar dengan antarmuka Next.js[cite: 1].
* **Tailwind CSS**
  * *Utility-first CSS framework* untuk membangun tema tata letak seragam *Futuristic Glassmorphism Dashboard* yang konsisten[cite: 1].
* **SweetAlert2**
  * Komponen modal pop-up notifikasi interaktif untuk menangkap respon pemuatan status transaksi atau pesan kegagalan penandatanganan gas fee[cite: 1].

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- STRUKTUR PROYEK -->
## Struktur Proyek

* `src/app/layout.js` - Layout utama dasbor aplikasi termasuk komponen bilah navigasi kiri (*sidebar*).
* `src/app/page.js` - Halaman utama penelusuran status publik dilengkapi linimasa *Cryptographic Lifecycle Log*[cite: 1].
* `src/app/register/page.js` - Panel pendaftaran unit kendaraan baru bermetode penulisan *on-chain* (Pabrik)[cite: 1].
* `src/app/update/page.js` - Panel penyiaran log lokasi atau manifes perjalanan unit distribusi (Vendor Logistik)[cite: 1].
* `src/app/confirm/page.js` - Panel validasi inbound dokumen dan penguncian status terima terminal akhir (Dealer)[cite: 1].
* `src/app/context/Web3Context.js` - Global state management reaktif untuk memulihkan sesi dan mendengarkan akun MetaMask wallet[cite: 1].
* `public/vehicles.json` - Basis data statis penyimpanan data sekunder spesifikasi fisik komponen kendaraan (*Off-Chain Storage*)[cite: 1].

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- CARA MENJALANKAN -->
## Cara Menjalankan

1. **Install dependensi:**
   ```sh
   npm install
<!-- GETTING STARTED -->
## Getting Started

Untuk menjalankan kloning prototipe aplikasi terdesentralisasi ini di lingkungan komputer lokal Anda, ikuti prosedur teknis di bawah ini.

### Prerequisites

Daftar perangkat lunak dan komponen environment awal yang harus Anda persiapkan:
* **Node.js** (Versi 18 atau yang lebih baru)
* **NPM** (Pustaka package manager bawaan Node.js)
* **MetaMask Wallet Extension** terpasang pada browser Anda.
* Akun MetaMask harus terhubung ke jaringan **Ethereum Sepolia Testnet** dan memiliki saldo uji Sepolia ETH.

### Installation

1. Kloning repositori kode sumber AutoChain Logistics
   ```sh
   git clone https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain.git
