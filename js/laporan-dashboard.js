// =====================================================================
// DASHBOARD LAPORAN BELAJAR HARIAN — Langkah 3 (tampilan saja)
// ---------------------------------------------------------------------
// Memakai: Laporan (js/laporan.js) untuk rekap & teks, ProfilLaporan (js/profil-laporan.js)
// untuk nama anak & nomor, dan Motivasi (js/motivasi.js) hanya dipanggil, tidak diubah.
// Tidak menulis ke penyimpanan. Pengiriman manual: wa.me membuka WhatsApp dengan pesan
// yang masih bisa diedit; pesan baru terkirim setelah orang tua menekan Kirim di WhatsApp.
// =====================================================================
(function () {
  "use strict";
  if (typeof document === "undefined") return;

  document.addEventListener("DOMContentLoaded", () => {
    const wadah = document.getElementById("laporanHarian");
    if (!wadah || !window.Laporan) return;
    const L = window.Laporan;
    const $ = (id) => document.getElementById(id);
    const pilihTanggal = $("laporanTanggal"), statusEl = $("laporanStatus"), kartuWadah = $("laporanKartu"), profilInfo = $("laporanProfilInfo");

    // Teks yang sudah diedit orang tua tidak ditimpa saat data diperbarui
    const teksEdit = {}; // mapel -> { tanggal, teks }
    const MAKS_TEKS = 3000; // batas pesan agar tautan wa.me tetap aman
    let rekapTerakhir = null;

    const el = (tag, kelas, teks) => {
      const e = document.createElement(tag);
      if (kelas) e.className = kelas;
      if (teks !== undefined && teks !== null) e.textContent = teks;
      return e;
    };
    const ikon = (id) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "icon");
      svg.setAttribute("aria-hidden", "true");
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", id);
      svg.appendChild(use);
      return svg;
    };

    // Profil hanya dipakai bila persetujuan masih berlaku.
    // { profil, perluPersetujuanUlang } — profil null bila belum ada atau persetujuan kedaluwarsa
    function bacaProfilLaporan() {
      const p = window.ProfilLaporan ? window.ProfilLaporan.bacaProfil() : null;
      return { profil: p && !p.perluPersetujuanUlang ? p : null, perluPersetujuanUlang: !!(p && p.perluPersetujuanUlang) };
    }

    function isiPilihanTanggal() {
      const pilihan = pilihTanggal.value;
      const riwayat = L.bacaRiwayatTersimpan();
      const adaLatihan = new Set(riwayat.map((s) => s && L.tanggalWIB(s.tanggal)).filter(Boolean));
      const daftar = L.daftarTanggal(new Date(), 7);
      pilihTanggal.replaceChildren(...daftar.map((t, i) => {
        const o = document.createElement("option");
        o.value = t;
        o.textContent = (i === 0 ? "Hari ini · " : i === 1 ? "Kemarin · " : "") + L.formatTanggalPendek(t) + (adaLatihan.has(t) ? " · ada latihan" : "");
        return o;
      }));
      pilihTanggal.value = daftar.includes(pilihan) ? pilihan : daftar[0];
    }

    function tampilkanProfilInfo(profil, perluPersetujuanUlang) {
      profilInfo.replaceChildren();
      if (!profil) {
        profilInfo.append(ikon("#i-alert"), el("span", null, perluPersetujuanUlang
          ? "Persetujuan penggunaan data perlu diperbarui. Sampai disetujui, laporan memakai sebutan \"Ananda\" dan WhatsApp akan meminta Anda memilih kontak. "
          : "Profil belum diisi: laporan memakai sebutan \"Ananda\" dan WhatsApp akan meminta Anda memilih kontak. "));
        const a = el("a", null, perluPersetujuanUlang ? "Perbarui persetujuan" : "Isi profil laporan");
        a.href = "#profilLaporan";
        profilInfo.appendChild(a);
        profilInfo.className = "laporan-profil-info is-peringatan";
      } else {
        profilInfo.append(ikon("#i-lock"), el("span", null,
          `Laporan untuk ${profil.namaAnak}. ` + (profil.nomorWa
            ? `WhatsApp akan dibuka ke ${window.ProfilLaporan.samarkanNomor(profil.nomorWa)}.`
            : "Nomor belum diisi, WhatsApp akan meminta Anda memilih kontak.")));
        profilInfo.className = "laporan-profil-info";
      }
    }

    // Teks status hanya diganti bila isinya berubah, supaya pembaca layar tidak mengulang pengumuman
    function tampilkanStatus(status, tanggal) {
      const jam = L.jamWIB(new Date());
      const teks = status === "final"
        ? `Laporan final ${L.formatTanggalPanjang(tanggal)}: mencakup latihan sampai pukul 20.00 WIB.`
        : `Laporan sementara, per pukul ${jam.replace(":", ".")} WIB. Latihan sampai pukul 20.00 WIB ikut terhitung; laporan final pukul 20.00 WIB.`;
      if (statusEl.dataset.teks === teks) return;
      statusEl.dataset.teks = teks;
      statusEl.className = "laporan-status is-" + status;
      statusEl.replaceChildren(ikon(status === "final" ? "#i-check-circle" : "#i-clock"), el("span", null, teks));
    }

    // ---------- Satu kartu mapel ----------
    function daftarMateri(judul, kelas, daftar) {
      const blok = el("div", "laporan-materi " + kelas);
      const h = el("h5", null);
      h.append(document.createTextNode(judul + " "), el("span", "laporan-hitung", daftar.length));
      blok.appendChild(h);
      if (!daftar.length) { blok.appendChild(el("p", "laporan-kosong", "Tidak ada.")); return blok; }
      const ul = el("ul");
      daftar.slice(0, 5).forEach((k) => {
        const li = el("li");
        li.append(el("span", "laporan-materi-nama", k.nama), el("span", "laporan-materi-persen", k.persen + "%"));
        ul.appendChild(li);
      });
      if (daftar.length > 5) ul.appendChild(el("li", "laporan-lainnya", `dan ${daftar.length - 5} lainnya`));
      blok.appendChild(ul);
      return blok;
    }

    function kartu(rekap, profil, statusLaporan) {
      const m = rekap.mapel;
      const art = el("article", "laporan-kartu" + (rekap.adaAktivitas ? "" : " is-kosong"));
      art.setAttribute("aria-labelledby", "laporanJudul-" + m);

      const kepala = el("header", "laporan-kepala");
      const h4 = el("h4", null, rekap.namaMapel);
      h4.id = "laporanJudul-" + m;
      kepala.append(h4, el("span", "laporan-lencana " + (rekap.adaAktivitas ? "is-aktif" : "is-kosong"),
        rekap.adaAktivitas ? `${rekap.jumlahSesi} sesi` : "Belum ada latihan"));
      art.appendChild(kepala);

      if (!rekap.adaAktivitas) {
        const p = el("p", "laporan-kosong-pesan", `Belum ada latihan ${rekap.namaMapel} pada ${L.formatTanggalPanjang(rekap.tanggal)}.`);
        art.appendChild(p);
        if (rekap.hariBelajarSebelumnya) {
          art.appendChild(el("p", "laporan-terakhir",
            `Latihan terakhir: ${L.formatTanggalPanjang(rekap.hariBelajarSebelumnya.tanggal)} · rata-rata nilai ${L.formatAngka(rekap.hariBelajarSebelumnya.rataRataNilai)}`));
        }
      } else {
        // Angka utama
        const dl = el("dl", "laporan-angka");
        [["Sesi", rekap.jumlahSesi], ["Soal dikerjakan", `${rekap.soalDikerjakan}/${rekap.totalSoal}`], ["Jawaban benar", rekap.jawabanBenar], ["Rata-rata nilai", L.formatAngka(rekap.rataRataNilai)]]
          .forEach(([k, v]) => { const d = el("div"); d.append(el("dt", null, k), el("dd", null, v)); dl.appendChild(d); });
        art.appendChild(dl);

        // Perkembangan kompetensi
        const pk = el("section", "laporan-perkembangan");
        pk.appendChild(el("h5", null, "Perkembangan kompetensi"));
        const berubah = [...rekap.perkembangan.naik, ...rekap.perkembangan.turun];
        if (berubah.length) {
          const ul = el("ul");
          berubah.slice(0, 5).forEach((k) => {
            const li = el("li", "is-" + k.perubahan);
            li.append(ikon(k.perubahan === "naik" ? "#i-trend-up" : "#i-trend-down"),
              el("span", "laporan-materi-nama", k.nama),
              el("span", "laporan-perubahan", `${k.sebelumnya.persen}% → ${k.persen}%`));
            li.setAttribute("aria-label", `${k.nama}: ${k.perubahan} dari ${k.sebelumnya.persen} persen menjadi ${k.persen} persen`);
            ul.appendChild(li);
          });
          pk.appendChild(ul);
          if (berubah.length > 5) pk.appendChild(el("p", "laporan-kosong", `dan ${berubah.length - 5} perubahan lainnya`));
        } else {
          pk.appendChild(el("p", "laporan-kosong", rekap.perkembangan.tetap.length
            ? "Penguasaan sama dengan hari belajar sebelumnya."
            : rekap.kompetensi.length ? "Materi hari ini baru pertama kali dilatih, belum ada pembanding." : "Belum ada data indikator."));
        }
        art.appendChild(pk);

        // Materi
        const materi = el("div", "laporan-materi-grid");
        materi.append(
          daftarMateri("Dikuasai", "is-dikuasai", rekap.dikuasai),
          daftarMateri("Berkembang", "is-berkembang", rekap.berkembang),
          daftarMateri("Perlu penguatan", "is-lemah", rekap.perluPenguatan)
        );
        art.appendChild(materi);
      }

      // Latihan sesudah pukul 20.00 tidak masuk laporan tanggal ini (laporan final tidak berubah)
      if (rekap.sesudahLaporan && rekap.sesudahLaporan.jumlahSesi > 0) {
        art.appendChild(el("p", "laporan-sesudah",
          `${rekap.sesudahLaporan.jumlahSesi} sesi latihan sesudah pukul 20.00 WIB tidak termasuk laporan ini.`));
      }

      // Rekomendasi
      const rek = el("p", "laporan-rekomendasi");
      rek.append(ikon("#i-target"), el("span", null, rekap.rekomendasi.teks));
      art.appendChild(rek);

      // Teks laporan: dapat diperiksa & diedit sebelum dibuka di WhatsApp
      const dm = L.dataMotivasi(rekap);
      const motivasi = dm && window.Motivasi && typeof window.Motivasi.buat === "function" ? window.Motivasi.buat(dm.hasil, dm.sebelumnya) : null;
      const teksAwal = L.susunTeks(rekap, { namaAnak: profil ? profil.namaAnak : "", status: statusLaporan, jam: L.jamWIB(new Date()), hariIni: L.tanggalWIB(new Date()), motivasi });
      const simpanan = teksEdit[m] && teksEdit[m].tanggal === rekap.tanggal ? teksEdit[m].teks : null;

      const rincian = el("details", "laporan-pesan");
      const ringkasan = el("summary", null, "Periksa dan edit pesan");
      ringkasan.id = "laporanRincian-" + m; // id tetap: fokus keyboard bisa dipulihkan setelah render ulang
      const idArea = "laporanTeks-" + m;
      const label = el("label", "sr-only", `Pesan laporan ${rekap.namaMapel}`);
      label.htmlFor = idArea;
      const area = el("textarea", "laporan-teks");
      area.id = idArea;
      area.rows = 12;
      // Batas panjang agar tautan wa.me tetap aman dibuka
      area.maxLength = MAKS_TEKS;
      area.setAttribute("aria-describedby", "laporanBatas-" + m);
      area.value = (simpanan ?? teksAwal).slice(0, MAKS_TEKS);
      area.spellcheck = false;
      const batasTeks = el("p", "laporan-batas", "");
      batasTeks.id = "laporanBatas-" + m;
      const catatanEdit = el("p", "laporan-catatan-edit", "");
      const ulang = el("button", "btn btn--ghost laporan-ulang", "Kembalikan teks otomatis");
      ulang.type = "button";
      ulang.id = "laporanUlang-" + m;
      const tandaiEdit = () => {
        const diedit = area.value !== teksAwal;
        if (diedit) teksEdit[m] = { tanggal: rekap.tanggal, teks: area.value }; else delete teksEdit[m];
        ulang.hidden = !diedit;
        catatanEdit.textContent = diedit ? "Teks sudah Anda edit. Tombol di bawah memakai teks yang sudah diedit." : "";
        catatanEdit.hidden = !diedit;
        const n = area.value.length;
        batasTeks.textContent = `${n.toLocaleString("id-ID")} dari ${MAKS_TEKS.toLocaleString("id-ID")} karakter`;
        batasTeks.classList.toggle("is-hampir", n > MAKS_TEKS * 0.9);
      };
      rincian.append(ringkasan, label, area, batasTeks, catatanEdit, ulang);
      art.appendChild(rincian);

      // Tombol
      const aksi = el("div", "laporan-aksi");
      const salin = el("button", "btn btn--secondary laporan-salin");
      salin.type = "button";
      salin.id = "laporanSalin-" + m;
      salin.append(ikon("#i-book"), document.createTextNode(" Salin laporan"));
      salin.setAttribute("aria-label", `Salin laporan ${rekap.namaMapel}`);
      const wa = el("a", "btn btn--primary laporan-wa");
      wa.id = "laporanWa-" + m;
      wa.target = "_blank";
      wa.rel = "noopener noreferrer";
      wa.append(ikon("#i-send"), document.createTextNode(" Buka WhatsApp"));
      wa.setAttribute("aria-label", `Buka WhatsApp dengan laporan ${rekap.namaMapel}` + (profil && profil.nomorWa ? "" : " (pilih kontak di WhatsApp)"));
      const info = el("p", "laporan-info");
      info.setAttribute("role", "status");
      const perbaruiTautan = () => { wa.href = L.tautanWa(area.value, profil ? profil.nomorWa : ""); };

      area.addEventListener("input", () => { tandaiEdit(); perbaruiTautan(); });
      ulang.addEventListener("click", () => { area.value = teksAwal; tandaiEdit(); perbaruiTautan(); area.focus(); });
      salin.addEventListener("click", async () => {
        const ok = await salinTeks(area.value, area);
        info.textContent = ok ? `Laporan ${rekap.namaMapel} disalin. Tempelkan di WhatsApp lalu kirim.` : "Tidak bisa menyalin otomatis. Buka \"Periksa dan edit pesan\", pilih semua teks, lalu salin.";
      });
      wa.addEventListener("click", () => {
        perbaruiTautan();
        // Jujur: membuka WhatsApp BUKAN berarti terkirim
        info.textContent = "WhatsApp dibuka. Pesan belum terkirim sampai Anda menekan tombol Kirim di WhatsApp.";
      });
      aksi.append(salin, wa);
      art.append(aksi, info);
      tandaiEdit();
      perbaruiTautan();
      return art;
    }

    async function salinTeks(teks, area) {
      try {
        if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(teks); return true; }
      } catch (e) { /* lanjut ke cara cadangan */ }
      try {
        const rincian = area.closest("details");
        const tadiTerbuka = rincian && rincian.open;
        if (rincian) rincian.open = true;
        area.focus(); area.select();
        const ok = document.execCommand && document.execCommand("copy");
        if (rincian && !tadiTerbuka) rincian.open = false;
        return !!ok;
      } catch (e) {
        return false;
      }
    }

    // ---------- Render ----------
    function render() {
      const sekarang = new Date();
      const { profil, perluPersetujuanUlang } = bacaProfilLaporan();
      // Simpan keadaan buka/tutup & fokus agar render ulang tidak mengganggu
      const terbuka = new Set([...kartuWadah.querySelectorAll("details[open]")].map((d) => d.closest("article").getAttribute("aria-labelledby")));
      const fokusId = document.activeElement && kartuWadah.contains(document.activeElement) ? document.activeElement.id : null;

      const rekap = L.rekapHarian(L.bacaRiwayatTersimpan(), { tanggal: pilihTanggal.value, sekarang, kisi: window.kisiKisiTKA });
      rekapTerakhir = rekap;
      tampilkanStatus(rekap.status, rekap.tanggal);
      tampilkanProfilInfo(profil, perluPersetujuanUlang);
      $("laporanTanpaAktivitas").hidden = rekap.adaAktivitas;
      kartuWadah.replaceChildren(...L.MAPEL.map((m) => kartu(rekap.mapel[m], profil, rekap.status)));
      kartuWadah.querySelectorAll("article").forEach((a) => { if (terbuka.has(a.getAttribute("aria-labelledby"))) a.querySelector("details").open = true; });
      if (fokusId && $(fokusId)) $(fokusId).focus({ preventScroll: true });
    }

    // ---------- Pengingat harian 20.00 WIB: unduh berkas kalender (.ics) ----------
    const tombolPengingat = $("laporanPengingat"), infoPengingat = $("laporanPengingatInfo");
    if (tombolPengingat && typeof L.buatIcs === "function") {
      tombolPengingat.addEventListener("click", () => {
        try {
          // Tautan kembali ke bagian laporan, hanya bila situs dibuka lewat http/https
          const url = /^https?:$/.test(location.protocol) ? location.origin + location.pathname + "#laporanHarian" : "";
          const isi = L.buatIcs({ sekarang: new Date(), url });
          const berkas = new Blob([isi], { type: "text/calendar;charset=utf-8" });
          const alamat = URL.createObjectURL(berkas);
          const a = document.createElement("a");
          a.href = alamat;
          a.download = "pengingat-laporan-tka.ics";
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(alamat), 1500);
          const mulai = Number(L.jamWIB(new Date()).slice(0, 2)) >= L.JAM_LAPORAN ? "besok" : "hari ini";
          infoPengingat.textContent = `Berkas "pengingat-laporan-tka.ics" diunduh. Buka berkas itu lalu pilih tambahkan ke kalender. ` +
            `Pengingat muncul setiap hari pukul 20.00 WIB mulai ${mulai}. Pengingat ini ada di kalender Anda; situs ini tidak mengirim notifikasi.`;
        } catch (e) {
          infoPengingat.textContent = "Berkas pengingat tidak dapat dibuat di browser ini. Pasang pengingat harian pukul 20.00 secara manual di kalender atau alarm ponsel.";
        }
      });
    }

    pilihTanggal.addEventListener("change", render);
    // Data berubah: sesi baru/dihapus (riwayat.js), profil berubah (profil-laporan.js), tab lain
    window.addEventListener("riwayat-berubah", () => { isiPilihanTanggal(); render(); });
    window.addEventListener("profil-laporan-berubah", render);
    window.addEventListener("storage", (e) => { if (e.key === "tkaSessionHistory" || e.key === null) { isiPilihanTanggal(); render(); } });
    // Kembali ke beranda setelah latihan: perbarui (dashboard.js memanggil tampilkanDashboard)
    new MutationObserver(() => { if (!$("perkembangan").hidden) { isiPilihanTanggal(); render(); } })
      .observe($("perkembangan"), { attributes: true, attributeFilter: ["hidden"] });
    // Setiap menit: pergantian hari, pergantian pukul 20.00 WIB, dan jam pada laporan sementara.
    // Saat orang tua sedang mengetik di kotak pesan, hanya baris status yang diperbarui
    // (render ulang ditunda agar posisi kursor tidak hilang).
    setInterval(() => {
      if (!rekapTerakhir || $("perkembangan").hidden) return;
      const sedangMengetik = document.activeElement && document.activeElement.matches && document.activeElement.matches("#laporanKartu textarea");
      const sekarang = new Date();
      const hariIni = L.tanggalWIB(sekarang);
      const daftar = [...pilihTanggal.options].map((o) => o.value);
      const status = L.statusLaporan(rekapTerakhir.tanggal, sekarang);
      if (sedangMengetik) { tampilkanStatus(status, rekapTerakhir.tanggal); return; }
      if (daftar[0] !== hariIni) { const diHariIni = pilihTanggal.value === daftar[0]; isiPilihanTanggal(); if (diHariIni) pilihTanggal.value = hariIni; render(); return; }
      if (status !== rekapTerakhir.status || status === "sementara") render();
    }, 60000);

    isiPilihanTanggal();
    render();
    // Dibuka dari pengingat kalender (…#laporanHarian): panel baru terisi setelah halaman dimuat,
    // jadi gulir ke panel setelah render pertama
    if (location.hash === "#laporanHarian") {
      requestAnimationFrame(() => wadah.scrollIntoView({ block: "start", behavior: "instant" }));
    }
  });
})();
