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

  // Cegah jawaban/hasil hilang karena halaman tertutup/dimuat ulang tanpa sengaja
  // selama sesi berjalan atau saat halaman hasil & pembahasan masih dibuka
  window.addEventListener("beforeunload", (e) => {
    const aktif = (kulitSoal && !kulitSoal.hidden) || (kulitHasil && !kulitHasil.hidden);
    if (aktif) { e.preventDefault(); e.returnValue = ""; }
  });

  // ---------- Timer: status warna + pengumuman pembaca layar ----------
  const timer = document.getElementById("timer");
  const kotakTimer = document.querySelector(".timer-box");
  const umumkan = document.getElementById("timerAnnounce");
  if (timer && kotakTimer) {
    const BATAS_PERINGATAN = 10 * 60; // amber: 10 menit terakhir
    const BATAS_KRITIS = 5 * 60;      // merah: 5 menit terakhir
    const titikUmum = [[600, "Sisa waktu 10 menit."], [300, "Sisa waktu 5 menit."], [60, "Sisa waktu 1 menit."]];
    let detikSebelumnya = null;
    const perbaruiTimer = () => {
      const m = /^(\d+):(\d{2})$/.exec(timer.textContent.trim());
      if (!m) return;
      const detik = Number(m[1]) * 60 + Number(m[2]);
      const status = detik <= BATAS_KRITIS ? "kritis" : detik <= BATAS_PERINGATAN ? "peringatan" : "normal";
      kotakTimer.dataset.timerStatus = status;
      timer.setAttribute("aria-label", `Sisa waktu ${m[1]} menit ${m[2]} detik`);
      // Umumkan sekali saat melewati titik tertentu (bukan setiap detik); sesi baru dimulai ulang
      if (detikSebelumnya === null || detik > detikSebelumnya) { if (umumkan) umumkan.textContent = ""; }
      else if (umumkan) {
        const lewat = titikUmum.filter(([t]) => detikSebelumnya > t && detik <= t).pop();
        if (lewat) umumkan.textContent = lewat[1];
      }
      detikSebelumnya = detik;
    };
    new MutationObserver(perbaruiTimer).observe(timer, { childList: true, characterData: true, subtree: true });
  }

  // Jumlah tiap status di legenda panel nomor soal
  const perbaruiHitungan = () => {
    if (!navSoal) return;
    const semua = navSoal.querySelectorAll(".nav-number").length;
    const terjawab = navSoal.querySelectorAll(".nav-number.answered").length;
    const ragu = navSoal.querySelectorAll(".nav-number.flagged").length;
    const isi = { terjawab, ragu, kosong: semua - terjawab };
    document.querySelectorAll("[data-hitung]").forEach((el) => { el.textContent = isi[el.dataset.hitung]; });
  };
  if (navSoal) new MutationObserver(perbaruiHitungan).observe(navSoal, { childList: true });

  // ---------- Dialog konfirmasi (pengganti confirm/alert bawaan peramban) ----------
  const dialog = document.getElementById("confirmDialog");
  if (dialog) {
    const kartuDialog = dialog.querySelector(".dialog-card");
    const judulDialog = document.getElementById("confirmTitle");
    const pesanDialog = document.getElementById("confirmMessage");
    const detailDialog = document.getElementById("confirmDetail");
    const tombolOk = document.getElementById("confirmOk");
    const tombolBatal = document.getElementById("confirmCancel");
    const ikonDialog = dialog.querySelector(".dialog-icon use");
    let selesaikan = null;
    let pemicuDialog = null;

    const tutup = (hasil, kembalikanFokus = true) => {
      if (dialog.hidden) return;
      dialog.hidden = true;
      document.documentElement.classList.remove("modal-terbuka");
      const fn = selesaikan; selesaikan = null;
      if (kembalikanFokus) {
        // Pemicu di dalam panel nomor (ponsel) sudah tertutup: kembali ke tombol "Nomor"
        const dariPanel = pemicuDialog && pemicuDialog.closest && pemicuDialog.closest("#quizSide") && layarSempit.matches;
        const calon = [dariPanel ? tombolPanel : pemicuDialog, document.getElementById("questionText")];
        const tujuan = calon.find((el) => el && el !== document.body && el.offsetParent !== null);
        tujuan?.focus({ preventScroll: true });
      }
      if (fn) fn(hasil);
    };

    // nada: "utama" (biru), "peringatan" (amber), "bahaya" (merah)
    const tanya = ({ judul, pesan, detail = null, ok = "Ya", batal = "Batal", nada = "utama", ikon = "#i-send", tanpaBatal = false }) => {
      if (selesaikan) tutup(false, false);
      setPanel(false, false);
      pemicuDialog = document.activeElement;
      judulDialog.textContent = judul;
      pesanDialog.textContent = pesan || "";
      pesanDialog.hidden = !pesan;
      detailDialog.replaceChildren(...(detail ? [detail] : []));
      detailDialog.hidden = !detail;
      tombolOk.textContent = ok;
      tombolBatal.textContent = batal;
      tombolBatal.hidden = tanpaBatal;
      dialog.dataset.nada = nada;
      tombolOk.className = "btn " + (nada === "bahaya" ? "btn--danger" : "btn--primary");
      ikonDialog.setAttribute("href", ikon);
      dialog.hidden = false;
      document.documentElement.classList.add("modal-terbuka");
      // Fokus awal pada pilihan yang aman (Batal), kecuali dialog hanya berisi informasi
      requestAnimationFrame(() => (tanpaBatal ? tombolOk : tombolBatal).focus());
      return new Promise((r) => { selesaikan = r; });
    };

    tombolOk.addEventListener("click", () => tutup(true));
    tombolBatal.addEventListener("click", () => tutup(false));
    dialog.addEventListener("click", (e) => { if (e.target === dialog && !tombolBatal.hidden) tutup(false); });
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); tutup(false); return; }
      if (e.key !== "Tab") return;
      const daftar = [...kartuDialog.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])")]
        .filter((el) => el instanceof HTMLElement && !el.disabled && el.offsetParent !== null);
      if (!daftar.length) return;
      const pertama = daftar[0], terakhir = daftar[daftar.length - 1];
      if (e.shiftKey && document.activeElement === pertama) { e.preventDefault(); terakhir.focus(); }
      else if (!e.shiftKey && document.activeElement === terakhir) { e.preventDefault(); pertama.focus(); }
    });

    window.tanyaKonfirmasi = tanya;
    window.tutupDialog = () => tutup(false, false);

    // Ringkasan sebelum mengumpulkan jawaban: soal kosong, belum lengkap, ragu-ragu (bisa diklik)
    window.konfirmasiSelesai = ({ mode, total, kosong = [], ragu = [], belumLengkap = [], keSoal }) => {
      const latihan = mode === "practice";
      const terjawab = total - kosong.length;
      const wadah = document.createElement("div");

      const ringkas = document.createElement("dl");
      ringkas.className = "dialog-stats";
      [["Terjawab", terjawab, ""], ["Belum dijawab", kosong.length, kosong.length ? "is-kosong" : ""], ["Ragu-ragu", ragu.length, ragu.length ? "is-ragu" : ""]]
        .forEach(([label, angka, kelas]) => {
          const item = document.createElement("div");
          if (kelas) item.className = kelas;
          const dt = document.createElement("dt"); dt.textContent = label;
          const dd = document.createElement("dd"); dd.textContent = angka;
          item.append(dd, dt);
          ringkas.appendChild(item);
        });
      wadah.appendChild(ringkas);

      const daftarNomor = (judul, indeks, kelas) => {
        if (!indeks.length) return;
        const blok = document.createElement("div");
        blok.className = "dialog-nomor " + kelas;
        const p = document.createElement("p");
        p.textContent = judul;
        const ul = document.createElement("ul");
        indeks.forEach((i) => {
          const li = document.createElement("li");
          const b = document.createElement("button");
          b.type = "button";
          b.textContent = i + 1;
          b.setAttribute("aria-label", `Buka soal ${i + 1}`);
          b.addEventListener("click", () => { tutup(false, false); if (typeof keSoal === "function") keSoal(i); });
          li.appendChild(b);
          ul.appendChild(li);
        });
        blok.append(p, ul);
        wadah.appendChild(blok);
      };
      daftarNomor("Soal yang belum dijawab:", kosong, "is-kosong");
      daftarNomor("Soal kategori yang belum lengkap:", belumLengkap, "is-kosong");
      daftarNomor("Soal yang ditandai ragu-ragu:", ragu, "is-ragu");

      const adaMasalah = kosong.length || belumLengkap.length;
      let pesan;
      if (kosong.length) pesan = `Masih ada ${kosong.length} dari ${total} soal yang belum dijawab. Soal kosong dihitung salah. Pilih nomor di bawah untuk kembali ke soal itu.`;
      else if (belumLengkap.length) pesan = "Semua soal sudah dijawab, tetapi ada soal kategori yang belum lengkap.";
      else if (ragu.length) pesan = `Semua soal sudah dijawab. Masih ada ${ragu.length} soal yang kamu tandai ragu-ragu.`;
      else pesan = "Semua soal sudah dijawab. Setelah dikumpulkan, jawaban tidak bisa diubah lagi.";

      return tanya({
        judul: latihan ? "Akhiri latihan?" : "Selesaikan simulasi?",
        pesan,
        detail: wadah,
        ok: adaMasalah ? "Tetap selesaikan" : "Ya, kumpulkan",
        batal: "Kembali mengerjakan",
        nada: adaMasalah ? "peringatan" : "utama",
        ikon: adaMasalah ? "#i-alert" : "#i-send"
      });
    };

    // Waktu habis: jawaban sudah dikumpulkan app.js; dialog ini hanya memberi tahu
    window.infoWaktuHabis = () => tanya({
      judul: "Waktu habis",
      pesan: "Jawabanmu sudah dikumpulkan secara otomatis. Lihat hasil dan pembahasannya di halaman ini.",
      ok: "Lihat hasil",
      nada: "peringatan",
      ikon: "#i-clock",
      tanpaBatal: true
    });
  }
})();
