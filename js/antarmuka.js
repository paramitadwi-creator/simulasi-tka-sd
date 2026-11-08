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

  // ---------- Layar soal ----------
  const kulitSoal = document.getElementById("quizShell");
  const kulitHasil = document.getElementById("resultShell");
  const navSoal = document.getElementById("questionNav");
  const kotakBahas = document.getElementById("explanationBox");
  const tombolPanel = document.getElementById("navPanelToggle");
  const tombolTutupPanel = document.getElementById("navPanelClose");
  const latarPanel = document.getElementById("navPanelBackdrop");
  const layarSempit = window.matchMedia("(max-width: 1023.98px)");

  // Panel nomor soal (ponsel/tablet): buka-tutup
  const setPanel = (buka, fokusKeToggle) => {
    if (!kulitSoal || !tombolPanel) return;
    const aktif = buka && layarSempit.matches;
    kulitSoal.classList.toggle("panel-terbuka", aktif);
    tombolPanel.setAttribute("aria-expanded", aktif ? "true" : "false");
    if (latarPanel) latarPanel.hidden = !aktif;
    if (aktif) {
      requestAnimationFrame(() => (navSoal.querySelector(".nav-number.current") || navSoal.querySelector(".nav-number"))?.focus());
    } else if (fokusKeToggle) {
      tombolPanel.focus();
    }
  };
  if (tombolPanel) tombolPanel.addEventListener("click", () => setPanel(!kulitSoal.classList.contains("panel-terbuka"), false));
  if (tombolTutupPanel) tombolTutupPanel.addEventListener("click", () => setPanel(false, true));
  if (latarPanel) latarPanel.addEventListener("click", () => setPanel(false, true));
  if (kulitSoal) {
    kulitSoal.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && kulitSoal.classList.contains("panel-terbuka")) { e.preventDefault(); setPanel(false, true); }
    });
  }
  // Memilih nomor soal menutup panel; fokus berpindah ke soal (diatur goToQuestion di app.js)
  if (navSoal) navSoal.addEventListener("click", (e) => { if (e.target.closest(".nav-number")) setPanel(false, false); });
  layarSempit.addEventListener("change", () => setPanel(false, false));

  // Progres pengerjaan: dihitung dari tombol nomor soal yang dibuat app.js
  const perbaruiProgres = () => {
    if (!navSoal) return;
    const total = navSoal.querySelectorAll(".nav-number").length;
    const terjawab = navSoal.querySelectorAll(".nav-number.answered").length;
    document.querySelectorAll("[data-progres-terjawab]").forEach((el) => { el.textContent = terjawab; });
    document.querySelectorAll("[data-progres-total]").forEach((el) => { el.textContent = total; });
    document.querySelectorAll("[data-progres-ringkas]").forEach((el) => { el.textContent = terjawab + "/" + total; });
    document.querySelectorAll("[data-progres-bar]").forEach((el) => { el.style.width = (total ? (terjawab / total) * 100 : 0) + "%"; });
    if (tombolPanel) tombolPanel.setAttribute("aria-label", `Buka nomor soal, ${terjawab} dari ${total} terjawab`);
  };
  if (navSoal) new MutationObserver(perbaruiProgres).observe(navSoal, { childList: true });

  // Pembahasan: tandai "tepat" atau "belum tepat" (warna + ikon + teks yang sudah ada)
  const buatIkon = (id) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", id);
    svg.appendChild(use);
    return svg;
  };
  const tandaiPembahasan = () => {
    if (!kotakBahas) return;
    const judul = kotakBahas.querySelector(":scope > strong");
    const tepat = !!judul && /^\s*Jawaban tepat/i.test(judul.textContent);
    kotakBahas.classList.toggle("is-tepat", !!judul && tepat);
    kotakBahas.classList.toggle("is-belum", !!judul && !tepat);
    if (judul && !judul.querySelector("svg")) judul.prepend(buatIkon(tepat ? "#i-check" : "#i-book"));
  };
  if (kotakBahas) new MutationObserver(tandaiPembahasan).observe(kotakBahas, { childList: true });

  // Sesi aktif: sembunyikan navbar, fokus ke soal saat sesi dimulai, tutup panel saat sesi berakhir
  const perbaruiSesi = (berubahKe) => {
    const soalTampil = kulitSoal && !kulitSoal.hidden;
    const hasilTampil = kulitHasil && !kulitHasil.hidden;
    document.documentElement.classList.toggle("sesi-aktif", !!(soalTampil || hasilTampil));
    if (!soalTampil) setPanel(false, false);
    if (berubahKe === "soal" && soalTampil) {
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() => document.getElementById("questionText")?.focus({ preventScroll: true }));
    }
  };
  if (kulitSoal) new MutationObserver(() => perbaruiSesi("soal")).observe(kulitSoal, { attributes: true, attributeFilter: ["hidden"] });
  if (kulitHasil) new MutationObserver(() => perbaruiSesi("hasil")).observe(kulitHasil, { attributes: true, attributeFilter: ["hidden"] });
})();
