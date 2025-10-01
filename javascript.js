const express = require("express");
const bodyParser = require("body-parser");

// PERBAIKAN: Mengatasi 'fetch is not a function' di Node
const { default: fetch } = require("node-fetch");
const app = express();
const PORT = 3000;

// URL APPS SCRIPT TERBARU DARI DEPLOYMENT FINAL ANDA
const API_URL = "https://script.google.com/macros/s/AKfycbxuef1OOUrxQ1J6lTM_iwSBSuYeECjkW2-uRwROcHQ-o5yVV7J-dFGCyLypx-8-Idr4/exec";
app.use(bodyParser.json());

// Melayani file statis (HTML, CSS, JS) dari folder 'public'
app.use(express.static("public"));

// ENDPOINT: MENGAMBIL DATA PRODUK (GET /api)
app.get("/api", async (req, res) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            // Ini akan menangani error HTTP dari Google seperti 500, 404, atau 429
            throw new Error(`Apps Script Error: HTTP ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Error ambil produk:", err.message);
        res.status(500).json({ error: "Gagal ambil produk dari Spreadsheet", detail: err.message });
    }
});

// ENDPOINT: MENYIMPAN TRANSAKSI (POST /api)
app.post("/api", async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });
        const responseData = await response.json();
        res.json(responseData);
    } catch (err) {
        console.error("Error simpan transaksi:", err.message);
        res.status(500).json({ error: "Error simpan transaksi", detail: err.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

// ... (Kode di atas tidak diubah)
app.listen(PORT, '0.0.0.0', () => { // <--- TAMBAHKAN '0.0.0.0' DI SINI
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Akses di jaringan lokal: http://[IP ANDA]:${PORT}`); // Opsional: pesan bantuan
});