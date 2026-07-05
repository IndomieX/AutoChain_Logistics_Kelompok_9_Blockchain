<h3 align="center">AutoChain Logistics</h3>

  <p align="center">
    Implementasi Blockchain untuk Meningkatkan Transparansi pada Industri Logistik Mobil[cite: 1]
    <br />
    <a href="[https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain](https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain)"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="[https://auto-chain-logistics-kelompok-9-blo.vercel.app](https://auto-chain-logistics-kelompok-9-blo.vercel.app)">View Demo</a>
    &middot;
    <a href="[https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain/issues/new?labels=bug](https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain/issues/new?labels=bug)">Report Bug</a>
    &middot;
    <a href="[https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain/issues/new?labels=enhancement](https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain/issues/new?labels=enhancement)">Request Feature</a>
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

<p align="center">
  <img src="[https://auto-chain-logistics-kelompok-9-blo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.png&w=256&q=75](https://auto-chain-logistics-kelompok-9-blo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.png&w=256&q=75)" alt="AutoChain Logistics Banner" width="120">
</p>

Industri logistik otomotif konvensional masih menghadapi tantangan besar terkait transparansi data dan risiko manipulasi riwayat unit kendaraan selama proses distribusi dari pabrik ke dealer[cite: 1]. Basis data tradisional yang bersifat terpusat memiliki kerentanan berupa titik kegagalan tunggal (*single point of failure*), di mana pihak internal dapat mengubah data log perjalanan tanpa rekam jejak yang transparan (*siloed data*)[cite: 1].

**AutoChain Logistics** hadir sebagai platform *Single Source of Truth* terdesentralisasi yang menjamin integritas data mutlak[cite: 1]. Proyek ini mengimplementasikan aplikasi terdesentralisasi (dApp) berbasis arsitektur multi-halaman yang memanfaatkan *smart contract* Solidity pada jaringan Ethereum Sepolia Testnet[cite: 1]. Dengan menggunakan Nomor Rangka (*Vehicle Identification Number*/VIN) sebagai kunci utama permanen (*immutable primary key*) di dalam blockchain, manipulasi riwayat perjalanan oleh pihak ketiga dapat dicegah secara total[cite: 1].

Berikut adalah keunggulan utama arsitektur kami:
* **Hybrid Storage Architecture:** Data status pelacakan krusial dikelola secara *on-chain* untuk menjamin keamanan, sedangkan data spesifikasi fisik kendaraan (Model, Tahun, Warna) dikelola secara *off-chain* menggabungkan berkas `vehicles.json` dan browser `localStorage` demi menghemat pengeluaran *gas fee*[cite: 1].
* **Role-Based Access Control (RBAC):** Fungsi sensitif kontrak pintar dilindungi oleh modifier keamanan `hanyaPabrik` dan `hanyaVendorTerverifikasi` untuk mencegah penulisan data oleh akun ilegal[cite: 1].
* **Cryptographic Lifecycle Log:** Visualisasi pelacakan kronologis real-time berbiaya gas nol (*zero gas cost*) menggunakan fungsi bertipe `view` (`verifyUnit`)[cite: 1].

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Sistem ini dibangun dengan mengintegrasikan ekosistem Web3 dan kerangka kerja web premium berikut:

[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)]([https://nextjs.org/](https://nextjs.org/))
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Ethers.js](https://img.shields.io/badge/Ethers.js-2535a0?style=for-the-badge&logo=ethereum&logoColor=white)](https://docs.ethers.org/v5/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Untuk menjalankan kloning prototipe aplikasi terdesentralisasi ini di lingkungan komputer lokal Anda, ikuti prosedur teknis di bawah ini.

### Prerequisites

Daftar perangkat lunak dan komponen environment awal yang harus Anda persiapkan:
* **Node.js** (Versi 18 atau yang lebih baru)
* **NPM** (Pustaka package manager bawaan Node.js)
* **MetaMask Wallet Extension** terpasang pada browser Anda.
* Akun MetaMask harus terhubung ke jaringan **Ethereum Sepolia Testnet** dan memiliki saldo uji Sepolia ETH[cite: 1].

### Installation

1. Kloning repositori kode sumber AutoChain Logistics
   ```sh
   git clone https://github.com/IndomieX/AutoChain_Logistics_Kelompok_9_Blockchain.git
