
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

        // TAMPILAN: selisih nilai terakhir terhadap nilai awal (ikon + teks, bukan warna saja)
        const elSelisih = document.getElementById("selisihNilai");
        if (elSelisih) {
            const adaKeduanya = sesiTerakhir &&
                typeof sesiTerakhir.nilai === "number" &&
                typeof nilaiAwal === "number";
            elSelisih.hidden = !adaKeduanya;
            if (adaKeduanya) {
                const selisih = Math.round((sesiTerakhir.nilai - nilaiAwal) * 10) / 10;
                const naik = selisih > 0, turun = selisih < 0;
                elSelisih.className = "trend " + (naik ? "trend--up" : turun ? "trend--down" : "trend--flat");
                elSelisih.innerHTML = "";
                if (naik || turun) {
                    const ikon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    ikon.setAttribute("class", "icon");
                    ikon.setAttribute("aria-hidden", "true");
                    const pakai = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    pakai.setAttribute("href", naik ? "#i-trend-up" : "#i-trend-down");
                    ikon.appendChild(pakai);
                    elSelisih.appendChild(ikon);
                }
                elSelisih.append(
                    naik ? "Naik " + formatNilai(selisih) + " poin dari nilai awal"
                        : turun ? "Turun " + formatNilai(Math.abs(selisih)) + " poin dari nilai awal"
                            : "Sama dengan nilai awal"
                );
            }
        }

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
            const daftarUl = document.createElement("ol");
            daftarUl.className = "prioritas-list";

            daftarPrioritas.forEach(item => {
                const key = subjek + "_" + item.kode;
                const dataProgres = progres[key];

                const kartu = document.createElement("li");
                kartu.className = "prioritas-item";

                const kepala = document.createElement("div");
                kepala.className = "prioritas-head";

                const judul = document.createElement("strong");
                judul.textContent = item.kompetensi;

                const tingkat = (item.tingkat || "penguatan").toLowerCase();
                const lencana = document.createElement("span");
                // tinggi/intensif = paling mendesak, penguatan = sedang, pemantapan = ringan
                lencana.className = "badge " +
                    (tingkat === "tinggi" || tingkat === "intensif" ? "badge--danger"
                        : tingkat === "penguatan" ? "badge--warning"
                            : "badge--neutral");
                lencana.textContent = "Prioritas " + tingkat;

                kepala.append(judul, lencana);

                const nilaiLatihan = dataProgres
                    ? dataProgres.accuracy
                    : null;

                // Bilah progres latihan (angka tetap ditulis sebagai teks)
                const progresWadah = document.createElement("div");
                progresWadah.className = "prioritas-progress";

                const bar = document.createElement("span");
                bar.className = "progress-bar";
                bar.setAttribute("aria-hidden", "true");
                const isi = document.createElement("i");
                isi.style.width = (nilaiLatihan !== null ? Math.max(0, Math.min(100, nilaiLatihan)) : 0) + "%";
                bar.appendChild(isi);

                const detail = document.createElement("span");
                detail.className = "prioritas-angka";
                detail.textContent = nilaiLatihan !== null
                    ? "Progres latihan " + nilaiLatihan + "%"
                    : "Belum ada progres latihan";

                progresWadah.append(bar, detail);

                const fokus = document.createElement("small");
                fokus.textContent = item.fokus || "";

                kartu.append(kepala, progresWadah, fokus);
                daftarUl.appendChild(kartu);
            });

            daftar.appendChild(daftarUl);
        }

        // RIWAYAT LATIHAN
        const wadahRiwayat =
            document.getElementById("riwayatDashboard");

        wadahRiwayat.innerHTML = "";

        if (riwayatMapel.length === 0) {
            // Keadaan kosong yang memberi tahu langkah berikutnya
            const kosong = document.createElement("div");
            kosong.className = "empty-state";
            const teks = document.createElement("p");
            teks.textContent = "Belum ada riwayat latihan " + namaMap[subjek] + ".";
            const ajakan = document.createElement("a");
            ajakan.href = "#pilih-mapel";
            ajakan.className = "btn btn--secondary";
            ajakan.textContent = "Mulai latihan pertama";
            kosong.append(teks, ajakan);
            wadahRiwayat.appendChild(kosong);
        } else {
            const daftarRiwayat = document.createElement("ul");
            daftarRiwayat.className = "riwayat-list";

            riwayatMapel.slice(0, 10).forEach(sesi => {
                const baris = document.createElement("li");
                baris.className = "riwayat-item";

                const tanggal = new Date(sesi.tanggal);

                const tanggalTampil =
                    isNaN(tanggal.getTime())
                        ? "-"
                        : tanggal.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

                const kiri = document.createElement("div");
                const waktu = document.createElement("strong");
                waktu.textContent = tanggalTampil;
                const ringkas = document.createElement("small");
                ringkas.textContent = sesi.benar + " dari " + sesi.totalSoal + " soal benar";
                kiri.append(waktu, ringkas);

                const nilai = document.createElement("span");
                nilai.className = "riwayat-nilai";
                nilai.textContent = formatNilai(sesi.nilai);
                nilai.setAttribute("aria-label", "Nilai " + formatNilai(sesi.nilai));

                baris.append(kiri, nilai);
                daftarRiwayat.appendChild(baris);
            });

            wadahRiwayat.appendChild(daftarRiwayat);
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
