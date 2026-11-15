// =====================================================================
// LAPORAN HASIL BELAJAR HARIAN — Langkah 1: fungsi rekap per mata pelajaran
// ---------------------------------------------------------------------
// Sumber data: tkaSessionHistory (ringkasan sesi yang ditulis finishQuiz() di app.js).
// Semua fungsi inti MURNI: hanya membaca argumen, tidak mengubah data masukan,
// tidak membaca/menulis localStorage, dan tidak menyentuh DOM.
// Satu-satunya pembaca penyimpanan adalah bacaRiwayatTersimpan() (hanya membaca).
//
// Tanggal belajar dikelompokkan menurut zona waktu Asia/Jakarta (WIB, UTC+7).
// Status kompetensi: Dikuasai ≥75% · Berkembang 50–74% · Perlu penguatan <50%
// (persen dibulatkan dulu, sama seperti Peta Hasil Belajar di app.js).
//
// Bisa dipakai di browser (window.Laporan) maupun Node (require) untuk pengujian.
// =====================================================================
(function (akar) {
  "use strict";

  const ZONA = "Asia/Jakarta";
  const MAPEL = ["matematika", "bahasa", "ipas"];
  const NAMA_MAPEL = { matematika: "Matematika", bahasa: "Bahasa Indonesia", ipas: "IPAS" };
  const NAMA_MODE = { practice: "Latihan", exam: "Simulasi Ujian", adaptive: "Latihan Adaptif" };
  const BATAS = { dikuasai: 75, berkembang: 50 };
  const JAM_LAPORAN = 20; // laporan dianggap final pukul 20.00 WIB

  // ---------- Waktu (WIB) ----------
  const formatTanggal = new Intl.DateTimeFormat("en-CA", { timeZone: ZONA, year: "numeric", month: "2-digit", day: "2-digit" });
  const formatJam = new Intl.DateTimeFormat("en-GB", { timeZone: ZONA, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

  // "2026-11-09" menurut WIB, atau null bila waktu tidak valid
  function tanggalWIB(waktu) {
    const d = waktu instanceof Date ? waktu : new Date(waktu);
    return isNaN(d.getTime()) ? null : formatTanggal.format(d);
  }
  // "20:05" menurut WIB, atau null
  function jamWIB(waktu) {
    const d = waktu instanceof Date ? waktu : new Date(waktu);
    return isNaN(d.getTime()) ? null : formatJam.format(d);
  }
  const polaTanggal = /^\d{4}-\d{2}-\d{2}$/;

  // Status laporan untuk suatu tanggal WIB pada saat `sekarang`:
  //  "akan-datang" · "sementara" (hari ini sebelum 20.00) · "final" (hari ini ≥20.00 atau hari lampau)
  function statusLaporan(tanggal, sekarang) {
    const hariIni = tanggalWIB(sekarang);
    if (!polaTanggal.test(String(tanggal)) || !hariIni) return null;
    if (tanggal > hariIni) return "akan-datang";
    if (tanggal < hariIni) return "final";
    const jam = Number(jamWIB(sekarang).slice(0, 2));
    return jam >= JAM_LAPORAN ? "final" : "sementara";
  }

  // ---------- Validasi satu sesi (tanpa mengubah aslinya) ----------
  const angka = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);

  function normalisasiSesi(sesi) {
    if (!sesi || typeof sesi !== "object") return null;
    const tanggal = tanggalWIB(sesi.tanggal);
    const mapel = sesi.mataPelajaran;
    const totalSoal = angka(sesi.totalSoal), terjawab = angka(sesi.terjawab), benar = angka(sesi.benar), nilai = angka(sesi.nilai);
    if (!tanggal || !MAPEL.includes(mapel)) return null;
    if (totalSoal === null || terjawab === null || benar === null || nilai === null) return null;
    if (totalSoal <= 0 || terjawab < 0 || benar < 0 || benar > terjawab || terjawab > totalSoal || nilai < 0 || nilai > 100) return null;
    const peta = Array.isArray(sesi.petaIndikator)
      ? sesi.petaIndikator
        .filter((b) => b && angka(b.indikator) !== null && angka(b.benar) !== null && angka(b.total) !== null && b.total > 0 && b.benar >= 0 && b.benar <= b.total)
        .map((b) => ({ indikator: b.indikator, benar: b.benar, total: b.total }))
      : null;
    const luar = sesi.diLuarKisi && angka(sesi.diLuarKisi.total) !== null
      ? { benar: angka(sesi.diLuarKisi.benar) || 0, total: sesi.diLuarKisi.total }
      : { benar: 0, total: 0 };
    return {
      waktu: new Date(sesi.tanggal).toISOString(), tanggal, jam: jamWIB(sesi.tanggal), mapel,
      mode: NAMA_MODE[sesi.mode] ? sesi.mode : "tidak-diketahui",
      totalSoal, terjawab, benar, nilai, peta, luar
    };
  }

  // ---------- Kompetensi ----------
  function statusPenguasaan(persen, batas) {
    return persen >= batas.dikuasai ? "dikuasai" : persen >= batas.berkembang ? "berkembang" : "lemah";
  }
  const LABEL_STATUS = { dikuasai: "Dikuasai", berkembang: "Berkembang", lemah: "Perlu penguatan" };

  // Gabungkan petaIndikator beberapa sesi: Map nomor -> { benar, total }
  function gabungIndikator(daftarSesi) {
    const peta = new Map();
    daftarSesi.forEach((s) => (s.peta || []).forEach((b) => {
      const d = peta.get(b.indikator) || { benar: 0, total: 0 };
      peta.set(b.indikator, { benar: d.benar + b.benar, total: d.total + b.total });
    }));
    return peta;
  }
  const persenDari = (benar, total) => Math.round((benar / total) * 100);
  const bulat1 = (x) => Math.round(x * 10) / 10;

  // ---------- Rekap satu mapel pada satu tanggal ----------
  // riwayat : array dari tkaSessionHistory (tidak diubah)
  // opsi    : { tanggal: "YYYY-MM-DD" (wajib), mapel (wajib), kisi: window.kisiKisiTKA (opsional),
  //             batas: { dikuasai, berkembang } (opsional), sesiTernormal: hasil normalisasi (opsional, untuk efisiensi),
  //             potongJam: false untuk ikut menghitung latihan sesudah pukul 20.00 (bawaan: dipotong) }
  function rekapMapel(riwayat, opsi) {
    const { tanggal, mapel } = opsi || {};
    if (!polaTanggal.test(String(tanggal))) throw new Error("tanggal harus berbentuk YYYY-MM-DD");
    if (!MAPEL.includes(mapel)) throw new Error("mapel tidak dikenal: " + mapel);
    const batas = { ...BATAS, ...(opsi.batas || {}) };
    const namaIndikator = (nomor) => {
      const k = opsi.kisi && opsi.kisi[mapel] && opsi.kisi[mapel].indikator;
      return (k && k[nomor]) || "Indikator " + nomor;
    };

    const semua = opsi.sesiTernormal || (Array.isArray(riwayat) ? riwayat : []).map(normalisasiSesi).filter(Boolean);
    const sesiMapel = semua.filter((s) => s.mapel === mapel);
    const semuaHariIni = sesiMapel.filter((s) => s.tanggal === tanggal).sort((a, b) => (a.waktu < b.waktu ? -1 : 1));
    // Laporan harian mencakup latihan pukul 00.00–19.59 WIB, agar laporan final pukul 20.00 tidak
    // berubah lagi setelah dikirim. Latihan pukul 20.00–23.59 dicatat terpisah (sesudahLaporan)
    // dan tetap dipakai sebagai riwayat pembanding untuk hari-hari berikutnya.
    const potong = opsi.potongJam !== false;
    const sebelumBatas = (s) => Number(String(s.jam).slice(0, 2)) < JAM_LAPORAN;
    const hariIni = potong ? semuaHariIni.filter(sebelumBatas) : semuaHariIni;
    const sesudah = potong ? semuaHariIni.filter((s) => !sebelumBatas(s)) : [];
    const sesudahLaporan = {
      jumlahSesi: sesudah.length,
      rataRataNilai: sesudah.length ? bulat1(sesudah.reduce((t, s) => t + s.nilai, 0) / sesudah.length) : null
    };
    const sebelum = sesiMapel.filter((s) => s.tanggal < tanggal);

    // Hari belajar sebelumnya (untuk mapel ini) — dipakai perbandingan nilai & motivasi
    const tanggalSebelum = [...new Set(sebelum.map((s) => s.tanggal))].sort();
    const hariTerakhirSebelum = tanggalSebelum.length ? tanggalSebelum[tanggalSebelum.length - 1] : null;
    const ringkasHari = (tgl) => {
      const d = sesiMapel.filter((s) => s.tanggal === tgl);
      return { tanggal: tgl, jumlahSesi: d.length, rataRataNilai: bulat1(d.reduce((t, s) => t + s.nilai, 0) / d.length) };
    };
    const hariBelajarSebelumnya = hariTerakhirSebelum ? ringkasHari(hariTerakhirSebelum) : null;

    const dasar = {
      mapel, namaMapel: NAMA_MAPEL[mapel], tanggal,
      adaAktivitas: hariIni.length > 0,
      hariBelajarSebelumnya,
      sesudahLaporan
    };

    if (!hariIni.length) {
      return {
        ...dasar,
        jumlahSesi: 0, perMode: { practice: 0, exam: 0, adaptive: 0 },
        totalSoal: 0, soalDikerjakan: 0, jawabanBenar: 0, rataRataNilai: null, ketepatan: null,
        sesi: [], kompetensi: [], dikuasai: [], berkembang: [], perluPenguatan: [],
        perkembangan: { naik: [], turun: [], tetap: [], baru: [] },
        diLuarKisi: { benar: 0, total: 0 }, sesiTanpaPeta: 0,
        rekomendasi: rekomendasi(mapel, null)
      };
    }

    // Angka harian
    const perMode = { practice: 0, exam: 0, adaptive: 0 };
    hariIni.forEach((s) => { if (perMode[s.mode] !== undefined) perMode[s.mode]++; });
    const jumlah = (k) => hariIni.reduce((t, s) => t + s[k], 0);
    const totalSoal = jumlah("totalSoal"), soalDikerjakan = jumlah("terjawab"), jawabanBenar = jumlah("benar");

    // Kompetensi hari ini + perbandingan dengan hari belajar sebelumnya yang punya indikator sama
    const aggHariIni = gabungIndikator(hariIni);
    const aggPerTanggal = new Map(); // tanggal -> Map indikator
    tanggalSebelum.forEach((tgl) => aggPerTanggal.set(tgl, gabungIndikator(sebelum.filter((s) => s.tanggal === tgl))));

    const kompetensi = [...aggHariIni.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([nomor, d]) => {
        const persen = persenDari(d.benar, d.total);
        const status = statusPenguasaan(persen, batas);
        let pembanding = null;
        for (let i = tanggalSebelum.length - 1; i >= 0; i--) {
          const p = aggPerTanggal.get(tanggalSebelum[i]).get(nomor);
          if (p) {
            const ps = persenDari(p.benar, p.total);
            pembanding = { tanggal: tanggalSebelum[i], benar: p.benar, total: p.total, persen: ps, status: statusPenguasaan(ps, batas) };
            break;
          }
        }
        const perubahan = !pembanding ? "baru" : persen > pembanding.persen ? "naik" : persen < pembanding.persen ? "turun" : "tetap";
        return {
          indikator: nomor, nama: namaIndikator(nomor), benar: d.benar, total: d.total, persen,
          status, labelStatus: LABEL_STATUS[status],
          sebelumnya: pembanding, perubahan, selisih: pembanding ? persen - pembanding.persen : null
        };
      });

    const urutLemah = (a, b) => a.persen - b.persen || b.total - a.total || a.indikator - b.indikator;
    const urutKuat = (a, b) => b.persen - a.persen || b.total - a.total || a.indikator - b.indikator;
    const dikuasai = kompetensi.filter((k) => k.status === "dikuasai").sort(urutKuat);
    const berkembang = kompetensi.filter((k) => k.status === "berkembang").sort(urutLemah);
    const perluPenguatan = kompetensi.filter((k) => k.status === "lemah").sort(urutLemah);
    const perkembangan = {
      naik: kompetensi.filter((k) => k.perubahan === "naik").sort((a, b) => b.selisih - a.selisih),
      turun: kompetensi.filter((k) => k.perubahan === "turun").sort((a, b) => a.selisih - b.selisih),
      tetap: kompetensi.filter((k) => k.perubahan === "tetap"),
      baru: kompetensi.filter((k) => k.perubahan === "baru")
    };
    const diLuarKisi = hariIni.reduce((t, s) => ({ benar: t.benar + s.luar.benar, total: t.total + s.luar.total }), { benar: 0, total: 0 });

    return {
      ...dasar,
      jumlahSesi: hariIni.length, perMode,
      totalSoal, soalDikerjakan, jawabanBenar,
      // Rata-rata nilai = rata-rata nilai tiap sesi (sama dengan nilai yang dilihat anak)
      rataRataNilai: bulat1(jumlah("nilai") / hariIni.length),
      // Ketepatan = benar dari soal yang dikerjakan
      ketepatan: soalDikerjakan ? Math.round((jawabanBenar / soalDikerjakan) * 100) : null,
      sesi: hariIni.map((s) => ({ waktu: s.waktu, jam: s.jam, mode: s.mode, namaMode: NAMA_MODE[s.mode] || "Lainnya", nilai: s.nilai, benar: s.benar, terjawab: s.terjawab, totalSoal: s.totalSoal })),
      kompetensi, dikuasai, berkembang, perluPenguatan, perkembangan,
      diLuarKisi, sesiTanpaPeta: hariIni.filter((s) => !s.peta).length,
      rekomendasi: rekomendasi(mapel, { perluPenguatan, berkembang, dikuasai, kompetensi })
    };
  }

  // ---------- Rekomendasi belajar berikutnya (murni) ----------
  function rekomendasi(mapel, k) {
    const nama = NAMA_MAPEL[mapel];
    if (!k) return { jenis: "mulai", mode: "practice", fokus: [], teks: `Mulai dengan Latihan ${nama} (15 soal) untuk menjaga ritme belajar.` };
    const fokus = (daftar) => daftar.slice(0, 2).map((x) => ({ indikator: x.indikator, nama: x.nama, persen: x.persen }));
    if (k.perluPenguatan.length) {
      const f = fokus(k.perluPenguatan);
      return { jenis: "penguatan", mode: "adaptive", fokus: f, teks: `Latihan Adaptif ${nama}, fokus pada ${f.map((x) => `"${x.nama}"`).join(" dan ")}.` };
    }
    if (k.berkembang.length) {
      const f = fokus(k.berkembang);
      return { jenis: "pemantapan", mode: "practice", fokus: f, teks: `Latihan ${nama} lalu pelajari pembahasan untuk memantapkan ${f.map((x) => `"${x.nama}"`).join(" dan ")}.` };
    }
    if (k.kompetensi.length) return { jenis: "uji-kesiapan", mode: "exam", fokus: [], teks: `Semua materi yang dilatih hari ini sudah dikuasai. Coba Simulasi Ujian ${nama} untuk menguji kesiapan.` };
    return { jenis: "lanjutkan", mode: "practice", fokus: [], teks: `Lanjutkan Latihan ${nama} dan pelajari pembahasan soal yang belum tepat.` };
  }

  // ---------- Rekap ketiga mapel ----------
  // opsi: { tanggal (default: hari ini WIB dari `sekarang`), sekarang: Date|ISO (default new Date()), kisi, batas }
  function rekapHarian(riwayat, opsi = {}) {
    const sekarang = opsi.sekarang ? new Date(opsi.sekarang) : new Date();
    const tanggal = opsi.tanggal || tanggalWIB(sekarang);
    const daftar = Array.isArray(riwayat) ? riwayat : [];
    const sesiTernormal = daftar.map(normalisasiSesi).filter(Boolean);
    const mapel = {};
    MAPEL.forEach((m) => { mapel[m] = rekapMapel(daftar, { ...opsi, tanggal, mapel: m, sesiTernormal }); });
    return {
      tanggal, zonaWaktu: ZONA,
      status: statusLaporan(tanggal, sekarang),
      dibuatPada: sekarang.toISOString(),
      adaAktivitas: MAPEL.some((m) => mapel[m].adaAktivitas),
      dataDilewati: daftar.length - sesiTernormal.length, // entri riwayat yang rusak/tidak lengkap
      mapel
    };
  }

  // Data siap pakai untuk Motivation Engine (Motivasi.buat) — tidak memanggilnya
  function dataMotivasi(rekap) {
    if (!rekap || !rekap.adaAktivitas) return null;
    return {
      hasil: { tanggal: rekap.tanggal, mapel: rekap.mapel, mode: "harian", nilai: rekap.rataRataNilai },
      sebelumnya: rekap.hariBelajarSebelumnya ? { nilai: rekap.hariBelajarSebelumnya.rataRataNilai } : null
    };
  }

  // Hanya membaca tkaSessionHistory (tidak menulis). Mengembalikan [] bila tidak tersedia/rusak.
  function bacaRiwayatTersimpan(penyimpanan) {
    try {
      const s = penyimpanan || (typeof localStorage !== "undefined" ? localStorage : null);
      const v = s ? JSON.parse(s.getItem("tkaSessionHistory") || "[]") : [];
      return Array.isArray(v) ? v : [];
    } catch (e) {
      return [];
    }
  }

  // =====================================================================
  // Langkah 3 — teks laporan & tautan WhatsApp (tetap fungsi murni)
  // =====================================================================
  const formatTanggalPanjangIntl = new Intl.DateTimeFormat("id-ID", { timeZone: ZONA, weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const formatTanggalPendekIntl = new Intl.DateTimeFormat("id-ID", { timeZone: ZONA, weekday: "short", day: "numeric", month: "short" });
  // "2026-11-09" -> Date pada tengah hari WIB (aman dari pergeseran zona)
  const dariTanggal = (tanggal) => new Date(`${tanggal}T12:00:00+07:00`);
  // "Senin, 9 November 2026"
  function formatTanggalPanjang(tanggal) {
    return polaTanggal.test(String(tanggal)) ? formatTanggalPanjangIntl.format(dariTanggal(tanggal)) : "";
  }
  // "Sen, 9 Nov"
  function formatTanggalPendek(tanggal) {
    return polaTanggal.test(String(tanggal)) ? formatTanggalPendekIntl.format(dariTanggal(tanggal)) : "";
  }
  // 64.3 -> "64,3"
  const formatAngka = (x) => (typeof x === "number" ? x.toLocaleString("id-ID", { maximumFractionDigits: 1 }) : "-");

  // Tanggal WIB hari ini dan (jumlah-1) hari sebelumnya, terbaru dulu
  function daftarTanggal(sekarang, jumlah = 7) {
    const hariIni = tanggalWIB(sekarang || new Date());
    if (!hariIni) return [];
    const [y, m, d] = hariIni.split("-").map(Number);
    return Array.from({ length: jumlah }, (_, i) => new Date(Date.UTC(y, m - 1, d - i)).toISOString().slice(0, 10));
  }

  // Bersihkan nama untuk teks: tanpa karakter format WhatsApp/kontrol, maks. 40 karakter
  function namaUntukTeks(nama) {
    const n = String(nama ?? "").replace(/[*_~`\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, 40);
    return n || "Ananda";
  }

  const daftarNama = (daftar, maks) => {
    const nama = daftar.map((k) => k.nama);
    return nama.length <= maks ? nama.join("; ") : nama.slice(0, maks).join("; ") + ` (dan ${nama.length - maks} lainnya)`;
  };
  const panah = { naik: "↑", turun: "↓" };

  // Susun teks laporan WhatsApp satu mapel.
  // opsi: { namaAnak, status: "sementara"|"final", jam: "15:42", hariIni: "YYYY-MM-DD", motivasi: { judul, pesan } | null, maksDaftar }
  function susunTeks(rekap, opsi = {}) {
    if (!rekap || !rekap.mapel) return "";
    const maks = opsi.maksDaftar || 5;
    const baris = [];
    baris.push(`*Laporan Belajar Harian — ${rekap.namaMapel}*`);
    baris.push(`Nama: ${namaUntukTeks(opsi.namaAnak)}`);
    baris.push(`Tanggal: ${formatTanggalPanjang(rekap.tanggal)}`);
    if (opsi.status === "sementara") baris.push(`Status: sementara (per pukul ${String(opsi.jam || "").replace(":", ".")} WIB; laporan final pukul 20.00 WIB)`);
    baris.push("");

    if (!rekap.adaAktivitas) {
      // opsi.hariIni (YYYY-MM-DD WIB) dikirim pemanggil agar fungsi tetap murni
      baris.push(`Belum ada latihan ${rekap.namaMapel} pada ${opsi.hariIni === rekap.tanggal ? "hari ini" : "hari itu"}.`);
      const s = rekap.hariBelajarSebelumnya;
      if (s) baris.push(`Latihan terakhir: ${formatTanggalPanjang(s.tanggal)} (rata-rata nilai ${formatAngka(s.rataRataNilai)}).`);
      baris.push("");
      baris.push(`*Rekomendasi:* ${rekap.rekomendasi.teks}`);
      baris.push("Sedikit latihan setiap hari lebih bermakna daripada banyak sekaligus. Semangat!");
    } else {
      const mode = Object.entries(rekap.perMode).filter(([, n]) => n > 0)
        .map(([m, n]) => `${n} ${NAMA_MODE[m]}`).join(", ");
      baris.push("*Ringkasan*");
      baris.push(`• Sesi: ${rekap.jumlahSesi}${mode ? ` (${mode})` : ""}`);
      baris.push(`• Soal dikerjakan: ${rekap.soalDikerjakan} dari ${rekap.totalSoal}`);
      baris.push(`• Jawaban benar: ${rekap.jawabanBenar}`);
      baris.push(`• Rata-rata nilai: ${formatAngka(rekap.rataRataNilai)}`);
      baris.push("");

      const p = rekap.perkembangan;
      const berubah = [...p.naik, ...p.turun];
      baris.push("*Perkembangan kompetensi*");
      if (berubah.length) {
        berubah.slice(0, maks).forEach((k) => baris.push(`• ${panah[k.perubahan]} ${k.nama}: ${k.sebelumnya.persen}% → ${k.persen}%`));
        if (berubah.length > maks) baris.push(`• dan ${berubah.length - maks} perubahan lainnya`);
      } else if (p.tetap.length) {
        baris.push("• Penguasaan materi sama dengan hari belajar sebelumnya.");
      } else if (rekap.kompetensi.length) {
        baris.push("• Materi hari ini baru pertama kali dilatih, belum ada pembanding.");
      } else {
        baris.push("• Belum ada data indikator untuk sesi hari ini.");
      }
      baris.push("");
      if (rekap.dikuasai.length) baris.push(`*Sudah dikuasai:* ${daftarNama(rekap.dikuasai, maks)}`);
      if (rekap.berkembang.length) baris.push(`*Masih berkembang:* ${daftarNama(rekap.berkembang, maks)}`);
      if (rekap.perluPenguatan.length) baris.push(`*Perlu penguatan:* ${daftarNama(rekap.perluPenguatan, maks)}`);
      baris.push("");
      baris.push(`*Rekomendasi:* ${rekap.rekomendasi.teks}`);
      if (opsi.motivasi && opsi.motivasi.judul) {
        baris.push("");
        baris.push(`*Pesan untuk ${namaUntukTeks(opsi.namaAnak)}:* ${opsi.motivasi.judul} ${opsi.motivasi.pesan || ""}`.trim());
      }
    }
    const sesudah = rekap.sesudahLaporan;
    if (sesudah && sesudah.jumlahSesi > 0) {
      baris.push("");
      baris.push(`Catatan: ${sesudah.jumlahSesi} sesi latihan sesudah pukul 20.00 WIB tidak termasuk dalam laporan ini.`);
    }
    baris.push("");
    baris.push("_Dari Simulasi TKA SD. Data dari perangkat ini._");
    const teks = baris.join("\n").replace(/\n{3,}/g, "\n\n");
    // Jaga agar tautan wa.me tidak terlalu panjang: persingkat daftar bila perlu
    return teks.length > 1800 && maks > 2 ? susunTeks(rekap, { ...opsi, maksDaftar: maks - 2 }) : teks;
  }

  // =====================================================================
  // Langkah 4 — pengingat harian pukul 20.00 WIB (berkas kalender iCalendar .ics)
  // Tanpa backend: berkas diunduh lalu dibuka di aplikasi kalender ponsel/komputer.
  // Tidak memuat nama anak atau nomor WhatsApp (privasi).
  // =====================================================================
  // Teks iCalendar: \ ; , dan baris baru di-escape (RFC 5545 §3.3.11)
  const escIcs = (t) => String(t).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  // Lipat baris > 75 oktet (UTF-8) dengan CRLF + spasi (RFC 5545 §3.1), tanpa memotong karakter
  function lipatBaris(baris) {
    const hasil = [];
    let kini = "", oktet = 0;
    for (const c of baris) {
      const n = new TextEncoder().encode(c).length;
      const batas = hasil.length ? 74 : 75; // baris lanjutan diawali 1 spasi
      if (oktet + n > batas) { hasil.push(kini); kini = ""; oktet = 0; }
      kini += c; oktet += n;
    }
    hasil.push(kini);
    return hasil.join("\r\n ");
  }
  const cap = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); // 20261109T130000Z

  // opsi: { sekarang (Date|ISO), url (opsional, http/https), uid (opsional) }
  // Mulai hari ini bila belum pukul 20.00 WIB, selain itu besok. Berulang setiap hari.
  function buatIcs(opsi = {}) {
    const sekarang = new Date(opsi.sekarang || Date.now());
    const hariIni = tanggalWIB(sekarang);
    const sudahLewat = Number(jamWIB(sekarang).slice(0, 2)) >= JAM_LAPORAN;
    const [y, m, d] = hariIni.split("-").map(Number);
    const mulai = new Date(Date.UTC(y, m - 1, d + (sudahLewat ? 1 : 0))).toISOString().slice(0, 10).replace(/-/g, "");
    const url = /^https?:\/\//i.test(String(opsi.url || "")) ? String(opsi.url) : "";
    const uid = String(opsi.uid || `pengingat-laporan-${mulai}`).replace(/[^\w.-]/g, "") + "@simulasi-tka-sd";
    const deskripsi = "Saatnya membuka Laporan Belajar Harian Simulasi TKA SD dan mengirim laporan setiap mata pelajaran lewat WhatsApp." +
      (url ? `\nBuka: ${url}` : "\nBuka situs Simulasi TKA SD, lalu bagian Perkembangan Belajar.");
    const baris = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Simulasi TKA SD//Laporan Belajar Harian//ID",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VTIMEZONE",
      "TZID:Asia/Jakarta",
      "BEGIN:STANDARD",
      "DTSTART:19700101T000000",
      "TZOFFSETFROM:+0700",
      "TZOFFSETTO:+0700",
      "TZNAME:WIB",
      "END:STANDARD",
      "END:VTIMEZONE",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${cap(sekarang)}`,
      `DTSTART;TZID=Asia/Jakarta:${mulai}T200000`,
      `DTEND;TZID=Asia/Jakarta:${mulai}T201500`,
      "RRULE:FREQ=DAILY",
      `SUMMARY:${escIcs("Kirim laporan belajar harian (TKA SD)")}`,
      `DESCRIPTION:${escIcs(deskripsi)}`
    ];
    if (url) baris.push(`URL:${url}`);
    baris.push(
      "TRANSP:TRANSPARENT",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escIcs("Waktunya mengirim laporan belajar harian")}`,
      "TRIGGER:PT0M",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    );
    return baris.map(lipatBaris).join("\r\n") + "\r\n";
  }

  // Tautan Click to Chat. Nomor harus baku "628…"; selain itu diabaikan (orang tua memilih kontak).
  function tautanWa(teks, nomor) {
    const tujuan = /^628\d{8,11}$/.test(String(nomor || "")) ? String(nomor) : "";
    return `https://wa.me/${tujuan}?text=${encodeURIComponent(String(teks || ""))}`;
  }

  const api = Object.freeze({
    ZONA, MAPEL, NAMA_MAPEL, NAMA_MODE, BATAS, JAM_LAPORAN,
    tanggalWIB, jamWIB, statusLaporan, normalisasiSesi, statusPenguasaan: (p) => statusPenguasaan(p, BATAS),
    rekapMapel, rekapHarian, dataMotivasi, bacaRiwayatTersimpan,
    formatTanggalPanjang, formatTanggalPendek, formatAngka, daftarTanggal, namaUntukTeks, susunTeks, tautanWa, buatIcs
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (akar && typeof akar === "object") akar.Laporan = api;
})(typeof window !== "undefined" ? window : null);
