// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AutoChainLogistics {
    address public managerPabrik; // Admin utama

    struct Mobil {
        string vin;
        string status;
        address pemegangTerakhir;
        uint256 waktuUpdate;
    }

    mapping(string => Mobil) public daftarMobil;
    mapping(address => bool) public vendorTerverifikasi;

    // Keamanan akses khusus Pabrik
    modifier hanyaPabrik() {
        require(msg.sender == managerPabrik, "Bukan otoritas Pabrik!");
        _;
    }

    constructor() {
        managerPabrik = msg.sender;
    }

    function registerVehicle(string memory _vin) public hanyaPabrik {
        daftarMobil[_vin] = Mobil(_vin, "Pabrik", msg.sender, block.timestamp);
    }

    function updateShipment(string memory _vin, string memory _status) public {
        require(vendorTerverifikasi[msg.sender], "Vendor tidak terdaftar!");
        daftarMobil[_vin].status = _status;
        daftarMobil[_vin].pemegangTerakhir = msg.sender;
        daftarMobil[_vin].waktuUpdate = block.timestamp;
    }
}
