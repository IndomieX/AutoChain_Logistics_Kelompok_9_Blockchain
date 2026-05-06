AutoChain Logistics: Implementasi Blockchain untuk Transparansi Industri Logistik Mobil
Repositori ini memuat prototipe Decentralized Application (dApp) untuk memfasilitasi pelacakan distribusi unit kendaraan yang transparan, aman, dan kebal terhadap manipulasi data (tamper-proof). Proyek ini dirancang sebagai pemenuhan Ujian Tengah Semester (UTS) dalam perancangan sistem informasi akademik di lingkungan Institut Teknologi PLN (ITPLN).  

Sistem ini mentransisikan proses pemantauan logistik dari arsitektur basis data terpusat menuju smart contract di jaringan Ethereum, guna mengeliminasi single point of failure dan menjamin integritas riwayat status kendaraan dari pabrik hingga ke dealer.  

📌 Deskripsi Arsitektur Sistem
AutoChain Logistics mengimplementasikan pendekatan arsitektur hibrida untuk menjaga efisiensi komputasi jaringan (gas fee) dan melindungi privasi data operasional internal.  

Logika inti (core logic) pelacakan unit diimplementasikan di dalam AutoChainLogistics.sol, yang secara spesifik mencatat:  

Registrasi Unit (VIN): Pendaftaran Nomor Rangka (VIN) sebagai identitas unik digital yang resmi lahir di dalam blockchain.  

Kekebalan Riwayat: Pencatatan setiap perubahan status distribusi (seperti "Transit" atau "Diterima Dealer") secara permanen dan immutable.  

Verifikasi Akses: Mekanisme validasi berbasis mapping untuk memastikan hanya vendor logistik terverifikasi yang dapat memperbarui status perjalanan unit.  

✨ Fitur Utama (Berdasarkan Smart Contract)
Role-Based Access Control: Penggunaan modifier hanyaPabrik memastikan bahwa otorisasi pendaftaran unit baru hanya dapat dilakukan oleh entitas Manufaktur (Pabrik) yang sah.  

Immutable Audit Trail: Setiap transaksi pemindahan unit meninggalkan jejak digital permanen yang mempermudah pelacakan jika terjadi anomali atau sengketa di lapangan.  

Event Logging: Pencatatan jejak audit secara real-time ke dalam buku besar publik setiap kali terjadi registrasi kendaraan atau pembaruan status pengiriman.  

🛠️ Tumpukan Teknologi (Tech Stack)
Smart Contract: Solidity (^0.8.0).  

Jaringan Target: Ethereum Sepolia (Testnet).  

Lingkungan Pengembangan (IDE): Remix Ethereum.  

Otentikasi Identitas (Web3): MetaMask.  

Arsitektur Antarmuka: Flutter / HTML-JS (Fase Implementasi Lanjutan UAS).

🚀 Panduan Pengujian (Simulasi Remix IDE)
Untuk menguji integritas dan fungsionalitas logika smart contract, ikuti langkah prosedural berikut:  

Buka Remix IDE.

Buat fail baru dengan nama AutoChainLogistics.sol dan salin kode smart contract dari repositori ini.  

Jalankan kompilasi pada tab Solidity Compiler (gunakan versi 0.8.0 atau lebih tinggi).  

Navigasikan ke tab Deploy & Run Transactions. Atur Environment ke Injected Provider - MetaMask dan pastikan dompet terhubung ke jaringan Sepolia.  
Nama,Peran,Tanggung Jawab Utama
Rafi Daniswara Putra Widiatnoko,Project Manager & Smart Contract Dev,"Analisis teknis, koding Solidity, & manajemen repositori GitHub."
Adham Resi Ghiffari,System Analyst & Technical Writer,"Analisis masalah, justifikasi teknologi, & penyusunan laporan Bab 1 & 3."
Fathur Muttaqi Rahman,UI/UX & Frontend Planner,Perancangan wireframe antarmuka & diagram alur data teknis.
Maisha Lafina,Researcher & Academic Writer,"Studi literatur, penyusunan abstrak, & dokumentasi daftar pustaka."
Klik Deploy. Alamat yang melakukan deploy akan otomatis ditetapkan sebagai managerPabrik.  

Lakukan simulasi dengan mendaftarkan VIN melalui fungsi registerVehicle sebelum mengeksekusi pembaruan status melalui updateShipment.
