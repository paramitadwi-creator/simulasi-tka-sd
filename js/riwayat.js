// =====================================================================
// RIWAYAT HASIL & PEMBAHASAN (modul penyimpanan terpusat)
// ---------------------------------------------------------------------
// Disimpan HANYA di localStorage perangkat & browser ini (tidak ada server).
// Tidak menyimpan data pribadi: hanya mapel, mode, waktu, nilai, jawaban, status.
//
// Struktur kunci (setiap data di kunci sendiri agar satu data rusak tidak
// merusak seluruh riwayat):
//   tkaRiwayat:skema              -> versi skema, mis. "1"
//   tkaRiwayat:indeks             -> { v, sesi: [ringkasan sesi, terbaru dulu] }
//   tkaRiwayat:sesi:<id>          -> satu sesi: metadata, peta, daftar soal + jawaban + status
//   tkaRiwayat:soal:<id>@<sidik>  -> SALINAN satu versi soal saat dikerjakan (dipakai bersama)
//   tkaRiwayat:bacaan:<sidik>     -> SALINAN satu bacaan (dipakai bersama oleh banyak soal)
// Salinan soal hanya dibuat untuk soal yang muncul di sesi, dan satu versi soal
// disimpan sekali walau muncul di banyak sesi, sehingga ukurannya tetap kecil.
// Status benar/salah dibekukan saat ujian selesai dan tidak pernah dihitung ulang.
// =====================================================================
(function () {
  const AWALAN = "tkaRiwayat:";
  const K_SKEMA = AWALAN + "skema";
  const K_INDEKS = AWALAN + "indeks";
  const K_SESI = AWALAN + "sesi:";
  const K_SOAL = AWALAN + "soal:";
  const K_BACAAN = AWALAN + "bacaan:";
  const SKEMA = 2;
  const MAKS_SESI = 50;
  const BATAS_PERINGATAN = 45;
  const ANGGARAN_KARAKTER = 2000000; // batas aman milik riwayat (localStorage umumnya ±5 juta karakter)

  // Migrasi skema: migrasi[n] mengubah data skema n menjadi n+1.
  // Skema 1 -> 2: skema 2 mencatat versi gambar (berkas tetap berbasis hash) pada salinan soal.
  // Sesi skema 1 tidak punya catatan itu, jadi ditandai agar gambarnya diberi pemberitahuan.
  const migrasiSesi = {
    1: (r) => ({ ...r, v: 2, asetTanpaVersi: true })
  };

  // ---------- Akses localStorage yang aman ----------
  let penyimpanan = null;
  try {
    const uji = AWALAN + "__uji";
    window.localStorage.setItem(uji, "1");
    window.localStorage.removeItem(uji);
    penyimpanan = window.localStorage;
  } catch (e) {
    penyimpanan = null; // diblokir, mode privat tertentu, atau dinonaktifkan
  }
  // galatBaca dihitung agar pembersihan TIDAK menghapus apa pun bila ada pembacaan yang gagal
  // (tanpa ini, data yang tidak terbaca bisa disangka "tidak dirujuk" lalu terhapus).
  let galatBaca = 0;
  const baca = (k) => { try { return penyimpanan ? penyimpanan.getItem(k) : null; } catch (e) { galatBaca++; return null; } };
  let galatTulis = null; // jenis kegagalan terakhir: "penuh" atau "tidak-tersedia"
  const tulis = (k, v) => {
    try { penyimpanan.setItem(k, v); return penyimpanan.getItem(k) === v; }
    catch (e) {
      const penuh = e && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.code === 22 || e.code === 1014);
      galatTulis = penuh ? "penuh" : "tidak-tersedia";
      return false;
    }
  };
  const hapusKunci = (k) => { try { penyimpanan.removeItem(k); } catch (e) { /* abaikan */ } };
  const bacaJSON = (k) => { const t = baca(k); if (t === null) return null; try { return JSON.parse(t); } catch (e) { return undefined; } };
  const semuaKunci = () => { const d = []; try { for (let i = 0; i < penyimpanan.length; i++) { const k = penyimpanan.key(i); if (k && k.startsWith(AWALAN)) d.push(k); } } catch (e) { /* */ } return d; };

  // ---------- Sidik versi soal (FNV-1a 32-bit) ----------
  const fnv = (teks) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < teks.length; i++) { h ^= teks.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(16).padStart(8, "0");
  };
  // sidikIsi: isi teks soal (termasuk jalur gambar sumber). sidikSoal: sidikIsi + versi gambar,
  // sehingga gambar yang diperbarui (nama berkas sama) menghasilkan salinan soal yang berbeda.
  const infoAset = (jalur) => (jalur && window.Aset ? window.Aset.info(jalur) : null);
  const sidikIsi = (q) => fnv(JSON.stringify([q.type, q.question, q.options || null, q.statements || null, q.categories || null, q.answer, q.explanation, q.stimulus || "", q.image || "", q.imageAlt || "", q.topic, q.difficulty]));
  const sidikSoal = (q) => {
    const a = infoAset(q.image);
    return a ? fnv(sidikIsi(q) + "|" + a.hash) : sidikIsi(q);
  };

  // ---------- Skema ----------
  let bacaSaja = false;
  let pesanSkema = "";
  function siapkanSkema() {
    if (!penyimpanan) return;
    const t = baca(K_SKEMA);
    const v = t === null ? null : Number(t);
    if (v === null) { tulis(K_SKEMA, String(SKEMA)); return; }
    if (!Number.isFinite(v) || v > SKEMA) {
      // Data dibuat versi aplikasi yang lebih baru: jangan menimpa, cukup baca yang dikenali
      bacaSaja = true;
      pesanSkema = "Riwayat dibuat oleh versi aplikasi yang lebih baru. Riwayat hanya dapat dibaca.";
      return;
    }
    if (v < SKEMA) {
      // Migrasi per sesi dilakukan saat dibaca (lihat muatSesi); di sini cukup naikkan penanda
      tulis(K_SKEMA, String(SKEMA));
    }
  }
  siapkanSkema();

  function migrasikan(rekam) {
    let r = rekam;
    while (r && typeof r.v === "number" && r.v < SKEMA && migrasiSesi[r.v]) r = migrasiSesi[r.v](r);
    return r && r.v === SKEMA ? r : null;
  }

  // ---------- Indeks ----------
  function validRingkas(x) {
    return x && typeof x.id === "string" && typeof x.mapel === "string" && typeof x.mode === "string";
  }
  function bangunUlangIndeks() {
    // Dipakai bila indeks hilang/rusak: susun dari kunci sesi yang masih terbaca
    const sesi = [];
    semuaKunci().filter((k) => k.startsWith(K_SESI)).forEach((k) => {
      const r = migrasikan(bacaJSON(k));
      if (r && validRingkas(r)) sesi.push(ringkasDari(r));
    });
    sesi.sort((a, b) => (a.id < b.id ? 1 : -1));
    return sesi;
  }
  function ringkasDari(r) {
    return { id: r.id, mapel: r.mapel, mode: r.mode, tanggal: r.tanggal, nilai: r.nilai, benar: r.benar, total: r.total, terjawab: r.terjawab };
  }
  function bacaIndeks() {
    if (!penyimpanan) return [];
    const x = bacaJSON(K_INDEKS);
    if (x && Array.isArray(x.sesi)) return x.sesi.filter(validRingkas);
    if (x === null && !semuaKunci().some((k) => k.startsWith(K_SESI))) return [];
    const galatAwal = galatBaca;
    const ulang = bangunUlangIndeks();
    // Tulis indeks hasil susun ulang hanya bila semua sesi benar-benar terbaca
    if (!bacaSaja && galatBaca === galatAwal) tulis(K_INDEKS, JSON.stringify({ v: SKEMA, sesi: ulang }));
    return ulang;
  }
  const tulisIndeks = (sesi) => tulis(K_INDEKS, JSON.stringify({ v: SKEMA, sesi }));

  // ---------- Pembersihan salinan yang tidak dirujuk lagi ----------
  // Prinsip: lebih baik menyisakan data tak terpakai daripada menghapus data yang masih dirujuk.
  // Pembersihan dibatalkan seluruhnya bila indeks tidak terbaca utuh atau ada pembacaan yang gagal.
  function bersihkan() {
    if (!penyimpanan || bacaSaja) return;
    const galatAwal = galatBaca;
    const x = bacaJSON(K_INDEKS);
    if (!x || !Array.isArray(x.sesi) || galatBaca !== galatAwal) return;
    const idAktif = new Set(x.sesi.filter(validRingkas).map((s) => s.id));
    const soalDirujuk = new Set();
    const bacaanDirujuk = new Set();
    const sesiYatim = [];
    let rujukanLengkap = true;
    const sekarang = Date.now();
    semuaKunci().forEach((k) => {
      if (!k.startsWith(K_SESI)) return;
      const id = k.slice(K_SESI.length);
      const r = bacaJSON(k);
      if (!idAktif.has(id) && !(sekarang - Date.parse(id) < 60000)) {
        // Sesi yatim (penulisan sebelumnya gagal); yang sangat baru dilewati: mungkin tab lain sedang menulis
        sesiYatim.push(k);
        return;
      }
      if (!r || !Array.isArray(r.soal)) { rujukanLengkap = false; return; } // tidak terbaca: rujukannya tak diketahui
      r.soal.forEach((s) => soalDirujuk.add(s.k));
    });
    soalDirujuk.forEach((kunci) => {
      const sn = bacaJSON(K_SOAL + kunci);
      if (sn === undefined) rujukanLengkap = false;
      if (sn && sn.stim) bacaanDirujuk.add(sn.stim);
    });
    if (galatBaca !== galatAwal) return; // ada yang gagal dibaca: jangan hapus apa pun
    sesiYatim.forEach(hapusKunci);
    if (!rujukanLengkap) return; // salinan soal/bacaan dibiarkan agar tidak ada rujukan yang terputus
    semuaKunci().forEach((k) => {
      if (k.startsWith(K_SOAL) && !soalDirujuk.has(k.slice(K_SOAL.length))) hapusKunci(k);
      if (k.startsWith(K_BACAAN) && !bacaanDirujuk.has(k.slice(K_BACAAN.length))) hapusKunci(k);
    });
  }

  // ---------- Ukuran ----------
  function ukuranKarakter() {
    return semuaKunci().reduce((t, k) => t + k.length + (baca(k) || "").length, 0);
  }

  // ---------- Menyimpan satu sesi ----------
  // hasil: objek dari finishQuiz() (lihat js/hasil.js). Mengembalikan { ok, alasan, jumlah, dihapus }
  function simpan(hasil) {
    if (!penyimpanan) return { ok: false, alasan: "tidak-tersedia" };
    if (bacaSaja) return { ok: false, alasan: "baca-saja" };
    const id = hasil.tanggal;
    if (!id) return { ok: false, alasan: "data-tidak-lengkap" };

    galatTulis = null;
    const ditulisBaru = []; // untuk dibatalkan bila salah satu langkah gagal
    const batalkan = () => ditulisBaru.forEach(hapusKunci);
    const coba = () => {
      const daftarSoal = [];
      for (const s of hasil.soal) {
        const q = s.q;
        const sidik = sidikSoal(q);
        const kunciSoal = q.id + "@" + sidik;
        let stim = null;
        if (q.stimulus) {
          stim = fnv(q.stimulus) + q.stimulus.length.toString(36);
          const kb = K_BACAAN + stim;
          if (baca(kb) !== q.stimulus) {
            if (!tulis(kb, q.stimulus)) return false;
            ditulisBaru.push(kb);
          }
        }
        const ks = K_SOAL + kunciSoal;
        const ada = bacaJSON(ks);
        if (!ada || ada.id !== q.id) {
          const salinan = {
            id: q.id, type: q.type, topic: q.topic, difficulty: q.difficulty,
            question: q.question, options: q.options, statements: q.statements, categories: q.categories,
            answer: q.answer, explanation: q.explanation, image: q.image, imageAlt: q.imageAlt,
            // Versi gambar yang benar-benar dilihat siswa (berkas tetap, tidak pernah ditimpa)
            imageVersi: q.image ? (infoAset(q.image) || {}).src || null : null,
            imageHash: q.image ? (infoAset(q.image) || {}).hash || null : null,
            indikator: s.indikator ?? null, stim
          };
          if (!tulis(ks, JSON.stringify(salinan))) return false;
          ditulisBaru.push(ks);
        }
        daftarSoal.push({ k: kunciSoal, j: s.jawaban, s: s.jawaban === null ? "k" : s.benar ? "b" : "s", r: s.ragu ? 1 : 0 });
      }
      const rekam = {
        v: SKEMA, id, mapel: hasil.mapel, namaMapel: hasil.namaMapel, mode: hasil.mode, tanggal: hasil.tanggal,
        versiAplikasi: typeof VERSI_APLIKASI === "string" ? VERSI_APLIKASI : null,
        nilai: hasil.nilai, benar: hasil.benar, terjawab: hasil.terjawab, total: hasil.total,
        peta: hasil.peta || null, soal: daftarSoal
      };
      const kSesi = K_SESI + id;
      if (!tulis(kSesi, JSON.stringify(rekam))) return false;
      ditulisBaru.push(kSesi);

      // Indeks ditulis terakhir: sesi baru baru "ada" setelah langkah ini berhasil
      const indeks = bacaIndeks().filter((x) => x.id !== id);
      indeks.unshift(ringkasDari(rekam));
      // Urut terbaru dulu menurut waktu pengerjaan (id = waktu ISO), supaya yang dihapus selalu yang terlama
      indeks.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
      let disimpan = indeks.slice(0, MAKS_SESI);
      if (!disimpan.some((x) => x.id === id)) {
        // Jam perangkat mundur: sesi baru tetap disimpan, yang terlama lainnya yang dilepas
        disimpan = [ringkasDari(rekam), ...indeks.filter((x) => x.id !== id)].slice(0, MAKS_SESI);
      }
      const idDisimpan = new Set(disimpan.map((x) => x.id));
      if (!tulisIndeks(disimpan)) return false;
      return { indeks: disimpan, lebih: indeks.filter((x) => !idDisimpan.has(x.id)) };
    };

    let hasilTulis = coba();
    if (!hasilTulis) {
      // Gagal (umumnya penuh): batalkan tulisan sesi ini, bersihkan sisa yatim, coba sekali lagi.
      batalkan(); ditulisBaru.length = 0;
      bersihkan();
      hasilTulis = coba();
      if (!hasilTulis) { batalkan(); return { ok: false, alasan: galatTulis || "penuh" }; }
    }
    // Sesi baru sudah aman tersimpan; baru sekarang sesi di atas batas 50 dihapus.
    const dihapus = hasilTulis.lebih.map((x) => x.tanggal || x.id);
    hasilTulis.lebih.forEach((x) => hapusKunci(K_SESI + x.id));
    if (hasilTulis.lebih.length) bersihkan();
    kabari();
    return { ok: true, jumlah: hasilTulis.indeks.length, dihapus };
  }

  // ---------- Membuka kembali satu sesi ----------
  function petaBankKini() {
    const peta = new Map();
    const daftar = [
      typeof bankSoal !== "undefined" ? bankSoal.matematika : null, typeof bankSoal !== "undefined" ? bankSoal.bahasa : null, typeof bankSoal !== "undefined" ? bankSoal.ipas : null,
      window.soalAdaptifMatematika, window.soalAdaptifBahasa, window.soalAdaptifIPAS,
      window.soalKisiMatematika, window.soalKisiBahasa, window.soalKisiIPAS
    ];
    daftar.forEach((b) => (b || []).forEach((q) => { if (!peta.has(q.id)) peta.set(q.id, q); }));
    return peta;
  }

  function muat(id) {
    if (!penyimpanan) return { galat: "tidak-tersedia" };
    const galatAwal = galatBaca;
    const mentah = bacaJSON(K_SESI + id);
    if (galatBaca !== galatAwal) return { galat: "tidak-tersedia" };
    if (mentah === null) {
      // Sesi benar-benar tidak ada (mis. dihapus di tab lain): rapikan indeks agar tidak ditawarkan lagi
      if (!bacaSaja) {
        const indeks = bacaIndeks();
        if (indeks.some((x) => x.id === id)) { tulisIndeks(indeks.filter((x) => x.id !== id)); kabari(); }
      }
      return { galat: "tidak-ada" };
    }
    const r = migrasikan(mentah);
    if (!r || !Array.isArray(r.soal)) return { galat: "rusak" };
    const bank = petaBankKini();
    const soal = r.soal.map((s, i) => {
      const [qid, sidik] = String(s.k).split("@");
      const salinan = bacaJSON(K_SOAL + s.k);
      const kini = bank.get(qid) || null;
      let q = null, catatan = null, catatanGambar = null;
      if (salinan && salinan.id === qid) {
        const stimulus = salinan.stim ? baca(K_BACAAN + salinan.stim) : "";
        q = { ...salinan, stimulus: stimulus || "" };
        delete q.stim;
        if (salinan.stim && stimulus === null) catatan = "bacaan-hilang";
        if (!kini) catatan = "dihapus-dari-bank";
        else if (sidikIsi(kini) !== sidikIsi(q)) catatan = catatan || "berubah";
        if (q.image) {
          if (!q.imageVersi) {
            // Disimpan sebelum versi gambar dicatat (skema 1) atau gambar belum terdaftar
            catatanGambar = "gambar-tanpa-versi";
            q.imageVersi = null;
          } else if (kini && kini.image === q.image) {
            const a = infoAset(kini.image);
            if (a && a.hash !== q.imageHash) catatanGambar = "gambar-berubah";
          }
        }
      } else if (kini) {
        // Salinan rusak/hilang: tampilkan versi bank saat ini dengan pemberitahuan
        q = { ...kini, imageVersi: undefined };
        catatan = sidikSoal(kini) === sidik ? null : "salinan-hilang";
      } else {
        catatan = "tidak-tersedia";
      }
      return {
        nomor: i + 1, q, jawaban: s.j === undefined ? null : s.j, benar: s.s === "b", ragu: !!s.r,
        indikator: q ? (q.indikator ?? null) : null, catatan, catatanGambar, idSoal: qid
      };
    });
    return {
      dariRiwayat: true, id: r.id, mapel: r.mapel, namaMapel: r.namaMapel, mode: r.mode, tanggal: r.tanggal,
      versiAplikasi: r.versiAplikasi, nilai: r.nilai, benar: r.benar, terjawab: r.terjawab, total: r.total,
      peta: r.peta, soal
    };
  }

  // ---------- Menghapus ----------
  // Hapus satu sesi: pembahasan + baris ringkasannya di riwayat nilai.
  function hapus(id) {
    if (!penyimpanan || bacaSaja) return false;
    const indeks = bacaIndeks().filter((x) => x.id !== id);
    if (!tulisIndeks(indeks)) return false;
    hapusKunci(K_SESI + id);
    try {
      const riwayat = JSON.parse(baca("tkaSessionHistory") || "[]");
      if (Array.isArray(riwayat)) tulis("tkaSessionHistory", JSON.stringify(riwayat.filter((x) => x && x.tanggal !== id)));
    } catch (e) { /* ringkasan rusak: biarkan apa adanya */ }
    bersihkan();
    kabari();
    return true;
  }
  // Hapus semua: seluruh riwayat pembahasan, riwayat nilai, dan progres latihan per kompetensi.
  function hapusSemua() {
    if (!penyimpanan) return false;
    semuaKunci().forEach((k) => { if (k !== K_SKEMA) hapusKunci(k); });
    hapusKunci("tkaSessionHistory");
    hapusKunci("tkaSkillProgress");
    kabari();
    return true;
  }

  // ---------- Info & kabar perubahan ----------
  function info() {
    const jumlah = bacaIndeks().length;
    const ukuran = penyimpanan ? ukuranKarakter() : 0;
    return {
      tersedia: !!penyimpanan, bacaSaja, pesanSkema, jumlah, maks: MAKS_SESI, batasPeringatan: BATAS_PERINGATAN,
      hampirPenuh: jumlah >= BATAS_PERINGATAN || ukuran > ANGGARAN_KARAKTER * 0.8,
      ukuranKarakter: ukuran, anggaranKarakter: ANGGARAN_KARAKTER
    };
  }
  function kabari() { window.dispatchEvent(new CustomEvent("riwayat-berubah")); }
  // Perubahan dari tab lain (satu penyimpanan = beberapa kunci; kabari sekali saja)
  let tundaKabar = null;
  window.addEventListener("storage", (e) => {
    if (e.key === null || (e.key && (e.key.startsWith(AWALAN) || e.key === "tkaSessionHistory"))) {
      clearTimeout(tundaKabar);
      tundaKabar = setTimeout(kabari, 80);
    }
  });

  // Minta browser menyimpan data secara tetap (bila didukung; tidak menjamin di semua browser)
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch (e) { /* */ }

  window.Riwayat = {
    simpan, muat, hapus, hapusSemua, info,
    daftar: () => bacaIndeks(),
    ada: (id) => bacaIndeks().some((x) => x.id === id),
    sidikSoal, MAKS_SESI, BATAS_PERINGATAN, SKEMA,
    _kunci: { AWALAN, K_INDEKS, K_SESI, K_SOAL, K_BACAAN, K_SKEMA }
  };
})();
