// Interaksi antarmuka umum (hanya tampilan; tidak menyentuh logika soal, penilaian, atau penyimpanan).
(function () {
  // ---------- Menu navigasi ponsel (<details>) ----------
  const menu = document.querySelector(".nav-mobile");
  if (menu) {
    const tutup = (kembalikanFokus) => {
      if (!menu.open) return;
      menu.open = false;
      if (kembalikanFokus) menu.querySelector("summary").focus();
    };

    // Tutup setelah memilih tautan, supaya bagian tujuan langsung terlihat
    menu.querySelectorAll("a").forEach((tautan) => {
      tautan.addEventListener("click", () => tutup(false));
    });

    // Tutup dengan tombol Esc dan kembalikan fokus ke tombol Menu
    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") tutup(true);
    });

    // Tutup bila mengetuk di luar menu
    document.addEventListener("click", (e) => {
      if (menu.open && !menu.contains(e.target)) tutup(false);
    });

    // Bila layar dilebarkan sampai menu desktop tampil, tutup menu ponsel
    window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
      if (e.matches) tutup(false);
    });
  }

  // ---------- Jumlah soal & indikator per mata pelajaran (dibaca dari bank soal) ----------
  // Hanya MEMBACA bank yang sama dengan yang dipakai mode Latihan/Simulasi:
  // bank biasa + adaptif + kisi-kisi, tanpa ID ganda.
  try {
    const sumber = {
      matematika: [bankSoal.matematika, window.soalAdaptifMatematika, window.soalKisiMatematika],
      bahasa: [bankSoal.bahasa, window.soalAdaptifBahasa, window.soalKisiBahasa],
      ipas: [bankSoal.ipas, window.soalAdaptifIPAS, window.soalKisiIPAS]
    };
    Object.entries(sumber).forEach(([mapel, daftar]) => {
      const idTerlihat = new Set();
      const indikator = new Set();
      daftar.forEach((bank) => (bank || []).forEach((q) => {
        if (idTerlihat.has(q.id)) return;
        idTerlihat.add(q.id);
        const nomor = typeof indikatorSoal === "function" ? indikatorSoal(q) : q.indikator;
        if (nomor) indikator.add(nomor);
      }));
      document.querySelectorAll(`[data-jumlah-soal="${mapel}"]`).forEach((el) => {
        el.textContent = idTerlihat.size.toLocaleString("id-ID");
      });
      document.querySelectorAll(`[data-jumlah-indikator="${mapel}"]`).forEach((el) => {
        el.textContent = indikator.size;
      });
    });
  } catch (e) {
    // Bila bank belum termuat, angka cadangan di HTML tetap tampil.
  }

  // ---------- Jumlah soal & durasi tiap mode (dibaca dari pengaturan app.js) ----------
  try {
    ["practice", "exam", "adaptive"].forEach((mode) => {
      const jumlah = JUMLAH_SOAL_MODE[mode];
      const menit = Math.round(DURASI_MODE[mode] / 60);
      document.querySelectorAll(`[data-mode-meta="${mode}"]`).forEach((el) => {
        el.textContent = `${jumlah} soal · ${menit} menit`;
      });
    });
  } catch (e) {
    // Teks cadangan di HTML tetap tampil.
  }

  // ---------- Modal pilih mode: Esc, klik luar, jebakan fokus, fokus kembali ----------
  const modal = document.getElementById("setupModal");
  if (modal) {
    const kartu = modal.querySelector(".modal-card");
    const tombolBatal = document.getElementById("cancelSetup");
    let pemicu = null;

    // Catat tombol mapel yang membuka modal (dipakai untuk mengembalikan fokus)
    document.querySelectorAll(".subject-button").forEach((tombol) => {
      tombol.addEventListener("click", () => { pemicu = tombol; });
    });

    const tutupModal = () => { modal.hidden = true; };
    if (tombolBatal) tombolBatal.addEventListener("click", tutupModal);

    // Hanya elemen HTML yang bisa difokus (bukan <use href> milik ikon SVG)
    const fokusDalam = () => [...kartu.querySelectorAll("button, a[href], select, input, textarea, [tabindex]:not([tabindex='-1'])")]
      .filter((el) => el instanceof HTMLElement && !el.disabled && el.offsetParent !== null);

    modal.addEventListener("keydown", (e) => {
      if (modal.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); tutupModal(); return; }
      if (e.key !== "Tab") return;
      const daftar = fokusDalam();
      if (!daftar.length) return;
      const pertama = daftar[0], terakhir = daftar[daftar.length - 1];
      if (e.shiftKey && document.activeElement === pertama) { e.preventDefault(); terakhir.focus(); }
      else if (!e.shiftKey && document.activeElement === terakhir) { e.preventDefault(); pertama.focus(); }
    });

    // Klik luar kartu sudah ditangani app.js (menutup modal); reaksi buka/tutup diamati di sini
    new MutationObserver(() => {
      const terbuka = !modal.hidden;
      document.documentElement.classList.toggle("modal-terbuka", terbuka);
      if (terbuka) {
        // Fokus ke pilihan mode pertama agar bisa langsung dipilih dengan keyboard
        requestAnimationFrame(() => document.getElementById("practiceMode")?.focus());
      } else {
        // Kembali ke tombol mapel asal, kecuali modal tertutup karena sesi dimulai
        const sesiDimulai = !document.getElementById("quizShell").hidden;
        if (!sesiDimulai && pemicu && pemicu.offsetParent !== null) pemicu.focus({ preventScroll: true });
      }
    }).observe(modal, { attributes: true, attributeFilter: ["hidden"] });
  }
})();
