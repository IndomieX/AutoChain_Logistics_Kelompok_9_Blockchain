// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AutoChainLogistics {
    address public managerPabrik;

    struct Mobil {
        string vin;
        string status;
        address pemegangTerakhir;
        uint256 waktuUpdate;
    }

    mapping(string => Mobil) public daftarMobil;
    mapping(address => bool) public vendorTerverifikasi;

    // Events untuk Audit Trail di laporan
    event StatusDiperbarui(string indexed vin, string status, address oleh, uint256 waktu);
    event VendorDiotorisasi(address indexed vendor, bool status);

    modifier hanyaPabrik() {
        require(msg.sender == managerPabrik, "Bukan otoritas Pabrik");
        _;
    }

    modifier hanyaVendorTerverifikasi() {
        require(vendorTerverifikasi[msg.sender], "Vendor tidak terdaftar!");
        _;
    }

    constructor() {
        managerPabrik = msg.sender;
    }

    // Otorisasi Hak Akses Vendor
    function otorisasiVendor(address _vendor) public hanyaPabrik {
        vendorTerverifikasi[_vendor] = true;
        emit VendorDiotorisasi(_vendor, true);
    }

    // Step 1: Pendaftaran Kendaraan oleh Pabrik
    function registerVehicle(string memory _vin) public hanyaPabrik {
        require(bytes(daftarMobil[_vin].vin).length == 0, "VIN sudah terdaftar");
        daftarMobil[_vin] = Mobil(_vin, "Pabrik", msg.sender, block.timestamp);
        emit StatusDiperbarui(_vin, "Pabrik", msg.sender, block.timestamp);
    }

    // Step 2: Pembaruan Status oleh Vendor Logistik
    function updateShipment(string memory _vin, string memory _status) public hanyaVendorTerverifikasi {
        require(bytes(daftarMobil[_vin].vin).length > 0, "VIN tidak ditemukan");
        daftarMobil[_vin].status = _status;
        daftarMobil[_vin].pemegangTerakhir = msg.sender;
        daftarMobil[_vin].waktuUpdate = block.timestamp;
        emit StatusDiperbarui(_vin, _status, msg.sender, block.timestamp);
    }

    // Step 3 & 4: Konfirmasi Penerimaan Akhir oleh Dealer
    function confirmDelivery(string memory _vin) public {
        require(bytes(daftarMobil[_vin].vin).length > 0, "VIN tidak ditemukan");
        daftarMobil[_vin].status = "Diterima Dealer";
        daftarMobil[_vin].pemegangTerakhir = msg.sender;
        daftarMobil[_vin].waktuUpdate = block.timestamp;
        emit StatusDiperbarui(_vin, "Diterima Dealer", msg.sender, block.timestamp);
    }

    // Fungsi Read-Only untuk Verifikasi Unit (Bebas Gas Fee)
    function verifyUnit(string memory _vin) public view returns (string memory vin, string memory status, address pemegangTerakhir, uint256 waktuUpdate) {
        Mobil memory m = daftarMobil[_vin];
        require(bytes(m.vin).length > 0, "VIN tidak ditemukan");
        return (m.vin, m.status, m.pemegangTerakhir, m.waktuUpdate);
    }
}