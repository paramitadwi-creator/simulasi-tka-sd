
document.addEventListener("DOMContentLoaded", function () {
    const profil = window.profilSiswa || {};

    const namaMap = {
        matematika: "Matematika",
        bahasa: "Bahasa Indonesia",
        ipas: "IPAS"
    };

    const prioritasMap = {
        matematika: "prioritasMatematika",
        bahasa: "prioritasBahasaIndonesia",
        ipas: "prioritasIPAS"
    };

    const pilihMapel = document.getElementById(
        "pilihMapelDashboard"
    );

    function formatNilai(nilai) {
        return typeof nilai === "number"
            ? nilai.toLocaleString("id-ID")
            : "--";
    }

    function tampilkanDashboard() {
        const subjek = pilihMapel.value;

        // Baca ulang setiap kali agar hasil latihan terbaru langsung tampil
        const riwayat = JSON.parse(
            localStorage.getItem("tkaSessionHistory") || "[]"
        );

        const progres = JSON.parse(
            localStorage.getItem("tkaSkillProgress") || "{}"
        );

        // NILAI AWAL TRYOUT
        const nilaiAwal = profil.hasilTryout?.[subjek];

        document.getElementById("nilaiAwal").textContent =
            formatNilai(nilaiAwal);

        document.getElementById("infoNilaiAwal").textContent =
            "Nilai awal " + namaMap[subjek];

        // RIWAYAT KHUSUS MATA PELAJARAN
        const riwayatMapel = riwayat.filter(
            sesi => sesi.mataPelajaran === subjek
        );

        const sesiTerakhir = riwayatMapel[0];

        // NILAI LATIHAN TERAKHIR
        document.getElementById("nilaiTerakhir").textContent =
            sesiTerakhir
                ? formatNilai(sesiTerakhir.nilai)
                : "--";

        document.getElementById("infoNilaiTerakhir").textContent =
            sesiTerakhir
                ? "Latihan terakhir " + namaMap[subjek]
                : "Belum ada latihan " + namaMap[subjek];

        // JUMLAH SESI
        document.getElementById("totalSesi").textContent =
            riwayatMapel.length;

        // KOMPETENSI PRIORITAS
        const daftar = document.getElementById("daftarPrioritas");

        daftar.innerHTML = "";

        const daftarPrioritas =
            profil[prioritasMap[subjek]] || [];

        if (daftarPrioritas.length === 0) {
            daftar.textContent =
                "Data kompetensi prioritas " +
                namaMap[subjek] + " belum tersedia.";
        } else {
            daftarPrioritas.forEach(item => {
                const key = subjek + "_" + item.kode;
                const dataProgres = progres[key];

                const kartu = document.createElement("div");
                kartu.className = "prioritas-item";

                const judul = document.createElement("strong");
                judul.textContent = item.kompetensi;

                const detail = document.createElement("p");

                const nilaiLatihan = dataProgres
                    ? dataProgres.accuracy
                    : null;

                detail.textContent =
                    "Prioritas: " +
                    (item.tingkat || "penguatan") +
                    (nilaiLatihan !== null
                        ? " · Progres latihan: " +
                          nilaiLatihan + "%"
                        : " · Belum ada progres latihan");

                const fokus = document.createElement("small");
                fokus.textContent = item.fokus || "";

                kartu.append(judul, detail, fokus);
                daftar.appendChild(kartu);
            });
        }

        // RIWAYAT LATIHAN
        const wadahRiwayat =
            document.getElementById("riwayatDashboard");

        wadahRiwayat.innerHTML = "";

        if (riwayatMapel.length === 0) {
            wadahRiwayat.textContent =
                "Belum ada riwayat latihan " +
                namaMap[subjek] + ".";
        } else {
            riwayatMapel.slice(0, 10).forEach(sesi => {
                const baris = document.createElement("div");
                baris.className = "riwayat-item";

                const tanggal = new Date(sesi.tanggal);

                const tanggalTampil =
                    isNaN(tanggal.getTime())
                        ? "-"
                        : tanggal.toLocaleString("id-ID");

                baris.textContent =
                    tanggalTampil + " · " +
                    sesi.benar + "/" +
                    sesi.totalSoal + " benar · Nilai " +
                    formatNilai(sesi.nilai);

                wadahRiwayat.appendChild(baris);
            });
        }

        console.log("Dashboard diperbarui:", {
            mataPelajaran: subjek,
            nilaiAwal: nilaiAwal,
            jumlahSesi: riwayatMapel.length,
            jumlahPrioritas: daftarPrioritas.length
        });
    }

    // TAMPILKAN DATA AWAL
    tampilkanDashboard();

    // PERUBAHAN PILIHAN MATA PELAJARAN
    pilihMapel.addEventListener("change", tampilkanDashboard);

    // Dipanggil app.js saat kembali ke beranda setelah latihan
    window.tampilkanDashboard = tampilkanDashboard;
});
