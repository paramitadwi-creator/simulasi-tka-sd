
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

    let tampilSemuaRiwayat = false;

    function tampilkanDashboard() {
        const subjek = pilihMapel.value;

        // Baca ulang setiap kali agar hasil latihan terbaru langsung tampil
        // Aman bila penyimpanan diblokir browser atau datanya rusak: dashboard tetap tampil
        const bacaJSON = (kunci, cadangan, cocok) => {
            try {
                const nilai = JSON.parse(localStorage.getItem(kunci) || "null");
                return cocok(nilai) ? nilai : cadangan;
            } catch (e) {
                return cadangan;
            }
        };
        const riwayat = bacaJSON("tkaSessionHistory", [], Array.isArray)
            .filter(sesi => sesi && typeof sesi === "object");

        const progres = bacaJSON("tkaSkillProgress", {},
            v => v && typeof v === "object" && !Array.isArray(v));

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

            const namaMode = { practice: "Latihan", exam: "Simulasi Ujian", adaptive: "Latihan Adaptif" };
            const R = window.Riwayat;

            const BATAS_AWAL = 10;
            riwayatMapel.slice(0, tampilSemuaRiwayat ? riwayatMapel.length : BATAS_AWAL).forEach(sesi => {
                const baris = document.createElement("li");
                baris.className = "riwayat-item";

                const tanggal = new Date(sesi.tanggal);

                const tanggalTampil =
                    isNaN(tanggal.getTime())
                        ? "-"
                        : tanggal.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

                const kiri = document.createElement("div");
                kiri.className = "riwayat-info-sesi";
                const waktu = document.createElement("strong");
                waktu.textContent = tanggalTampil;
                const ringkas = document.createElement("small");
                ringkas.textContent = (namaMode[sesi.mode] ? namaMode[sesi.mode] + " · " : "") +
                    sesi.benar + " dari " + sesi.totalSoal + " soal benar";
                kiri.append(waktu, ringkas);

                const nilai = document.createElement("span");
                nilai.className = "riwayat-nilai";
                nilai.textContent = formatNilai(sesi.nilai);
                nilai.setAttribute("aria-label", "Nilai " + formatNilai(sesi.nilai));

                // TAMPILAN: buka kembali pembahasan (bila tersimpan) & hapus riwayat
                const aksi = document.createElement("div");
                aksi.className = "riwayat-aksi";
                if (R && R.ada(sesi.tanggal)) {
                    const buka = document.createElement("button");
                    buka.type = "button";
                    buka.className = "btn btn--secondary riwayat-buka";
                    buka.textContent = "Lihat pembahasan";
                    buka.setAttribute("aria-label", "Lihat pembahasan " + (namaMode[sesi.mode] || "sesi") + " " + tanggalTampil);
                    buka.addEventListener("click", () => window.bukaRiwayat && window.bukaRiwayat(sesi.tanggal));
                    aksi.appendChild(buka);
                } else {
                    const label = document.createElement("span");
                    label.className = "riwayat-tanpa";
                    label.textContent = "Ringkasan saja";
                    label.title = "Sesi ini disimpan sebelum fitur pembahasan riwayat tersedia, atau pembahasannya sudah dihapus otomatis.";
                    aksi.appendChild(label);
                }
                if (R && !R.info().bacaSaja) {
                    const hapus = document.createElement("button");
                    hapus.type = "button";
                    hapus.className = "riwayat-hapus";
                    hapus.setAttribute("aria-label", "Hapus riwayat " + tanggalTampil);
                    hapus.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-trash"/></svg>';
                    hapus.addEventListener("click", async () => {
                        const setuju = typeof window.tanyaKonfirmasi === "function"
                            ? await window.tanyaKonfirmasi({
                                judul: "Hapus riwayat ini?",
                                pesan: "Riwayat " + (namaMode[sesi.mode] || "sesi") + " " + namaMap[subjek] + " (" + tanggalTampil + ") beserta pembahasannya akan dihapus dari perangkat ini. Tindakan ini tidak bisa dibatalkan.",
                                ok: "Ya, hapus", batal: "Batal", nada: "bahaya", ikon: "#i-alert"
                            })
                            : confirm("Hapus riwayat ini? Tindakan ini tidak bisa dibatalkan.");
                        if (setuju) { R.hapus(sesi.tanggal); tampilkanDashboard(); }
                    });
                    aksi.appendChild(hapus);
                }

                baris.append(kiri, nilai, aksi);
                daftarRiwayat.appendChild(baris);
            });

            wadahRiwayat.appendChild(daftarRiwayat);

            // TAMPILAN: semua riwayat tetap bisa dibuka, bukan hanya 10 terbaru
            if (riwayatMapel.length > BATAS_AWAL) {
                const tombolSemua = document.createElement("button");
                tombolSemua.type = "button";
                tombolSemua.className = "btn btn--ghost riwayat-semua";
                tombolSemua.setAttribute("aria-expanded", tampilSemuaRiwayat ? "true" : "false");
                tombolSemua.textContent = tampilSemuaRiwayat
                    ? "Tampilkan " + BATAS_AWAL + " terbaru saja"
                    : "Tampilkan semua riwayat (" + riwayatMapel.length + ")";
                tombolSemua.addEventListener("click", () => {
                    tampilSemuaRiwayat = !tampilSemuaRiwayat;
                    tampilkanDashboard();
                    const tombolBaru = document.querySelector("#riwayatDashboard .riwayat-semua");
                    if (tombolBaru) tombolBaru.focus({ preventScroll: true });
                });
                wadahRiwayat.appendChild(tombolSemua);
            }
        }

        tampilkanInfoRiwayat();

        console.log("Dashboard diperbarui:", {
            mataPelajaran: subjek,
            nilaiAwal: nilaiAwal,
            jumlahSesi: riwayatMapel.length,
            jumlahPrioritas: daftarPrioritas.length
        });
    }

    // TAMPILAN: info penyimpanan riwayat, keterangan privasi, hapus semua
    function tampilkanInfoRiwayat() {
        const wadah = document.getElementById("riwayatInfo");
        if (!wadah) return;
        wadah.innerHTML = "";
        const R = window.Riwayat;
        const info = R ? R.info() : { tersedia: false };

        const privasi = document.createElement("p");
        privasi.className = "riwayat-privasi";
        privasi.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-lock"/></svg>';
        privasi.append(info.tersedia
            ? "Riwayat hanya tersimpan di perangkat dan browser ini, tidak tersinkron ke perangkat lain. Riwayat bisa hilang bila data browser dibersihkan."
            : "Browser ini tidak mengizinkan penyimpanan, jadi riwayat tidak dapat disimpan.");
        wadah.appendChild(privasi);
        if (!info.tersedia) return;

        const kapasitas = document.createElement("div");
        kapasitas.className = "riwayat-kapasitas" + (info.hampirPenuh ? " is-hampir-penuh" : "");
        const teks = document.createElement("p");
        teks.textContent = "Pembahasan tersimpan: " + info.jumlah + " dari " + info.maks + " sesi (semua mata pelajaran) · ±" +
            Math.max(1, Math.round(info.ukuranKarakter / 1024)) + " KB";
        const bar = document.createElement("span");
        bar.className = "progress-bar";
        bar.setAttribute("aria-hidden", "true");
        const isi = document.createElement("i");
        isi.style.width = Math.min(100, info.jumlah / info.maks * 100) + "%";
        bar.appendChild(isi);
        kapasitas.append(teks, bar);
        if (info.hampirPenuh) {
            const peringatan = document.createElement("p");
            peringatan.className = "riwayat-peringatan";
            peringatan.textContent = "Riwayat hampir penuh. Saat mencapai " + info.maks + " sesi, riwayat terlama dihapus otomatis. Hapus riwayat yang tidak diperlukan agar riwayat penting tetap tersimpan.";
            kapasitas.appendChild(peringatan);
        }
        if (info.bacaSaja) {
            const p = document.createElement("p");
            p.className = "riwayat-peringatan";
            p.textContent = info.pesanSkema;
            kapasitas.appendChild(p);
        }
        wadah.appendChild(kapasitas);
        if (info.bacaSaja) return; // riwayat dari versi lebih baru: jangan tampilkan tombol yang tidak berfungsi

        const hapusSemua = document.createElement("button");
        hapusSemua.type = "button";
        hapusSemua.className = "btn btn--ghost riwayat-hapus-semua";
        hapusSemua.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-trash"/></svg> Hapus semua riwayat';
        hapusSemua.addEventListener("click", async () => {
            const setuju = typeof window.tanyaKonfirmasi === "function"
                ? await window.tanyaKonfirmasi({
                    judul: "Hapus semua riwayat?",
                    pesan: "Semua riwayat nilai, pembahasan, dan progres latihan untuk ketiga mata pelajaran akan dihapus dari perangkat ini. Nilai awal tryout tidak terpengaruh. Tindakan ini tidak bisa dibatalkan.",
                    ok: "Ya, hapus semua", batal: "Batal", nada: "bahaya", ikon: "#i-alert"
                })
                : confirm("Hapus semua riwayat? Tindakan ini tidak bisa dibatalkan.");
            if (setuju) { R.hapusSemua(); tampilkanDashboard(); }
        });
        wadah.appendChild(hapusSemua);
    }

    // TAMPILKAN DATA AWAL
    tampilkanDashboard();

    // Riwayat berubah (sesi baru, dihapus, atau diubah dari tab lain)
    window.addEventListener("riwayat-berubah", tampilkanDashboard);

    // PERUBAHAN PILIHAN MATA PELAJARAN
    pilihMapel.addEventListener("change", () => {
        tampilSemuaRiwayat = false;
        tampilkanDashboard();
    });

    // Dipanggil app.js saat kembali ke beranda setelah latihan
    window.tampilkanDashboard = tampilkanDashboard;
});
