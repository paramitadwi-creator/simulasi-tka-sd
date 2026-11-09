#!/usr/bin/env node
// Uji fungsi rekap laporan harian (js/laporan.js) tanpa browser.
//   node alat/uji-laporan.js           jalankan semua uji
//   node alat/uji-laporan.js --contoh  juga cetak contoh data laporan (JSON)
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const AKAR = path.resolve(__dirname, "..");
const L = require(path.join(AKAR, "js/laporan.js"));

// Nama indikator dari kisi-kisi asli (hanya dibaca)
const ktx = {}; ktx.window = ktx; vm.createContext(ktx);
vm.runInContext(fs.readFileSync(path.join(AKAR, "js/kisi-kisi.js"), "utf8"), ktx);
const kisi = ktx.kisiKisiTKA;

// ---------- Data riwayat contoh (format persis seperti dataSesi di app.js) ----------
// Jam ditulis dalam UTC; WIB = UTC+7.
const sesi = (tanggal, mapel, mode, totalSoal, terjawab, benar, peta, luar = { benar: 0, total: 0 }) => ({
  tanggal, mataPelajaran: mapel, mode, totalSoal, terjawab, benar,
  nilai: Math.round((benar / totalSoal) * 100),
  hasilKompetensi: [],
  petaIndikator: peta.map(([indikator, b, t]) => ({ indikator, benar: b, total: t, persen: Math.round((b / t) * 100), status: "x" })),
  diLuarKisi: luar
});
const RIWAYAT = [
  // --- 7 Nov 2026 (Sabtu) ---
  sesi("2026-11-07T02:00:00.000Z", "matematika", "practice", 15, 15, 9, [[17, 2, 3], [22, 1, 2], [8, 1, 3]]),
  sesi("2026-11-07T03:00:00.000Z", "ipas", "exam", 30, 28, 20, [[15, 2, 2], [30, 1, 2], [5, 3, 4]]),
  // --- 8 Nov 2026 (Minggu): Matematika tanpa indikator 17 ---
  sesi("2026-11-08T09:00:00.000Z", "matematika", "exam", 30, 30, 18, [[22, 1, 2], [4, 2, 2]]),
  sesi("2026-11-08T10:00:00.000Z", "bahasa", "practice", 15, 14, 10, [[5, 2, 2], [7, 0, 1]]),
  // --- 9 Nov 2026 (Senin) ---
  sesi("2026-11-08T23:30:00.000Z", "matematika", "practice", 15, 13, 9, [[17, 1, 3], [22, 2, 2], [8, 1, 2]], { benar: 1, total: 1 }), // 06.30 WIB
  sesi("2026-11-09T07:00:00.000Z", "matematika", "adaptive", 30, 26, 19, [[17, 0, 1], [22, 1, 2], [8, 2, 2], [12, 3, 4]]),          // 14.00 WIB
  sesi("2026-11-09T16:59:00.000Z", "matematika", "exam", 30, 30, 21, [[12, 1, 2], [13, 3, 4]]),                                       // 23.59 WIB
  sesi("2026-11-09T05:00:00.000Z", "bahasa", "exam", 30, 25, 15, [[5, 1, 2], [7, 2, 2], [9, 2, 4]]),
  // --- 10 Nov 2026 pukul 00.01 WIB: TIDAK termasuk 9 Nov ---
  sesi("2026-11-09T17:01:00.000Z", "matematika", "practice", 15, 15, 15, [[17, 3, 3]]),
  // --- data rusak / tidak lengkap: harus dilewati tanpa galat ---
  { tanggal: "bukan-tanggal", mataPelajaran: "matematika", totalSoal: 15, terjawab: 15, benar: 1, nilai: 7 },
  { tanggal: "2026-11-09T05:00:00Z", mataPelajaran: "fisika", totalSoal: 15, terjawab: 15, benar: 1, nilai: 7 },
  { tanggal: "2026-11-09T05:00:00Z", mataPelajaran: "ipas", totalSoal: 15, terjawab: 10, benar: 12, nilai: 80 },
  null,
  "teks"
];

let lolos = 0;
const uji = (nama, fn) => { fn(); lolos++; console.log("  ✓ " + nama); };
const salinanAsli = JSON.stringify(RIWAYAT);

console.log("Uji js/laporan.js");

uji("Tanggal & jam dikelompokkan menurut WIB (UTC+7)", () => {
  assert.strictEqual(L.tanggalWIB("2026-11-08T23:30:00Z"), "2026-11-09");
  assert.strictEqual(L.tanggalWIB("2026-11-09T16:59:00Z"), "2026-11-09");
  assert.strictEqual(L.tanggalWIB("2026-11-09T17:01:00Z"), "2026-11-10");
  assert.strictEqual(L.jamWIB("2026-11-09T13:00:00Z"), "20:00");
  assert.strictEqual(L.tanggalWIB("bukan-tanggal"), null);
});

uji("Status laporan: sementara sebelum 20.00 WIB, final mulai 20.00", () => {
  assert.strictEqual(L.statusLaporan("2026-11-09", "2026-11-09T12:59:00Z"), "sementara"); // 19.59 WIB
  assert.strictEqual(L.statusLaporan("2026-11-09", "2026-11-09T13:00:00Z"), "final");     // 20.00 WIB
  assert.strictEqual(L.statusLaporan("2026-11-08", "2026-11-09T01:00:00Z"), "final");
  assert.strictEqual(L.statusLaporan("2026-11-10", "2026-11-09T13:00:00Z"), "akan-datang");
});

uji("Batas penguasaan: ≥75 dikuasai, 50–74 berkembang, <50 perlu penguatan", () => {
  assert.strictEqual(L.statusPenguasaan(75), "dikuasai");
  assert.strictEqual(L.statusPenguasaan(74), "berkembang");
  assert.strictEqual(L.statusPenguasaan(50), "berkembang");
  assert.strictEqual(L.statusPenguasaan(49), "lemah");
});

const rekap = L.rekapHarian(RIWAYAT, { tanggal: "2026-11-09", sekarang: "2026-11-09T13:30:00Z", kisi, potongJam: false }); // uji logika agregasi tanpa batas 20.00 (diuji terpisah)
const mat = rekap.mapel.matematika, bin = rekap.mapel.bahasa, ipas = rekap.mapel.ipas;

uji("Rekap terpisah untuk 3 mapel; 5 entri rusak dilewati", () => {
  assert.deepStrictEqual(Object.keys(rekap.mapel), ["matematika", "bahasa", "ipas"]);
  assert.strictEqual(rekap.status, "final");
  assert.strictEqual(rekap.dataDilewati, 5);
  assert.strictEqual(rekap.adaAktivitas, true);
});

uji("Matematika: 3 sesi (06.30, 14.00, 23.59 WIB), sesi 00.01 WIB besok tidak ikut", () => {
  assert.strictEqual(mat.jumlahSesi, 3);
  assert.deepStrictEqual(mat.perMode, { practice: 1, exam: 1, adaptive: 1 });
  assert.deepStrictEqual(mat.sesi.map((s) => s.jam), ["06:30", "14:00", "23:59"]);
  assert.strictEqual(mat.totalSoal, 75);
  assert.strictEqual(mat.soalDikerjakan, 69);
  assert.strictEqual(mat.jawabanBenar, 49);
  assert.strictEqual(mat.rataRataNilai, Math.round(((60 + 63 + 70) / 3) * 10) / 10); // 64.3
  assert.strictEqual(mat.ketepatan, Math.round((49 / 69) * 100));
  assert.deepStrictEqual(mat.diLuarKisi, { benar: 1, total: 1 });
});

uji("Matematika: indikator diagregasi dari semua sesi hari itu", () => {
  const k = Object.fromEntries(mat.kompetensi.map((x) => [x.indikator, x]));
  assert.deepStrictEqual([k[17].benar, k[17].total, k[17].persen, k[17].status], [1, 4, 25, "lemah"]);
  assert.deepStrictEqual([k[22].benar, k[22].total, k[22].persen, k[22].status], [3, 4, 75, "dikuasai"]);
  assert.deepStrictEqual([k[8].benar, k[8].total, k[8].persen, k[8].status], [3, 4, 75, "dikuasai"]);
  assert.deepStrictEqual([k[12].benar, k[12].total, k[12].persen, k[12].status], [4, 6, 67, "berkembang"]);
  assert.strictEqual(k[13].nama, kisi.matematika.indikator[13]);
});

uji("Perkembangan dibandingkan dengan hari belajar sebelumnya yang punya indikator sama", () => {
  const k = Object.fromEntries(mat.kompetensi.map((x) => [x.indikator, x]));
  // Indikator 17 tidak dilatih 8 Nov -> pembanding 7 Nov (2/3 = 67%)
  assert.strictEqual(k[17].sebelumnya.tanggal, "2026-11-07");
  assert.strictEqual(k[17].perubahan, "turun");
  assert.strictEqual(k[17].selisih, 25 - 67);
  // Indikator 22 dilatih 8 Nov (1/2 = 50%) -> naik
  assert.strictEqual(k[22].sebelumnya.tanggal, "2026-11-08");
  assert.strictEqual(k[22].perubahan, "naik");
  // Indikator 8: 7 Nov 1/3 = 33% -> 75% naik
  assert.strictEqual(k[8].sebelumnya.persen, 33);
  // Indikator 12 & 13 belum pernah dilatih -> baru
  assert.strictEqual(k[12].perubahan, "baru");
  assert.strictEqual(k[13].sebelumnya, null);
  assert.deepStrictEqual(mat.perkembangan.naik.map((x) => x.indikator), [8, 22]);
  assert.deepStrictEqual(mat.perkembangan.turun.map((x) => x.indikator), [17]);
});

uji("Dikuasai / berkembang / perlu penguatan + rekomendasi", () => {
  // Sama-sama 75% dari 4 soal -> urut nomor indikator
  assert.deepStrictEqual(mat.dikuasai.map((x) => x.indikator), [8, 13, 22]);
  assert.deepStrictEqual(mat.berkembang.map((x) => x.indikator), [12]);
  assert.deepStrictEqual(mat.perluPenguatan.map((x) => x.indikator), [17]);
  assert.strictEqual(mat.rekomendasi.jenis, "penguatan");
  assert.strictEqual(mat.rekomendasi.mode, "adaptive");
  assert.strictEqual(mat.rekomendasi.fokus[0].indikator, 17);
});

uji("Hari belajar sebelumnya & data untuk Motivation Engine", () => {
  assert.deepStrictEqual(mat.hariBelajarSebelumnya, { tanggal: "2026-11-08", jumlahSesi: 1, rataRataNilai: 60 });
  assert.deepStrictEqual(L.dataMotivasi(mat), {
    hasil: { tanggal: "2026-11-09", mapel: "matematika", mode: "harian", nilai: mat.rataRataNilai },
    sebelumnya: { nilai: 60 }
  });
});

uji("Bahasa Indonesia: 1 sesi, perbandingan dengan 8 Nov", () => {
  assert.strictEqual(bin.jumlahSesi, 1);
  assert.deepStrictEqual([bin.totalSoal, bin.soalDikerjakan, bin.jawabanBenar, bin.rataRataNilai], [30, 25, 15, 50]);
  const k = Object.fromEntries(bin.kompetensi.map((x) => [x.indikator, x]));
  assert.strictEqual(k[5].perubahan, "turun");  // 100% -> 50%
  assert.strictEqual(k[7].perubahan, "naik");   // 0% -> 100%
  assert.strictEqual(k[9].perubahan, "baru");
  assert.strictEqual(bin.rekomendasi.jenis, "pemantapan");
});

uji("IPAS: hari tanpa aktivitas (entri IPAS rusak tidak dihitung)", () => {
  assert.strictEqual(ipas.adaAktivitas, false);
  assert.strictEqual(ipas.jumlahSesi, 0);
  assert.strictEqual(ipas.rataRataNilai, null);
  assert.deepStrictEqual(ipas.kompetensi, []);
  assert.deepStrictEqual(ipas.hariBelajarSebelumnya, { tanggal: "2026-11-07", jumlahSesi: 1, rataRataNilai: 67 });
  assert.strictEqual(ipas.rekomendasi.jenis, "mulai");
  assert.strictEqual(L.dataMotivasi(ipas), null);
});

uji("Hari tanpa aktivitas sama sekali & riwayat kosong/rusak", () => {
  const kosong = L.rekapHarian(RIWAYAT, { tanggal: "2026-11-05", sekarang: "2026-11-09T13:30:00Z", kisi });
  assert.strictEqual(kosong.adaAktivitas, false);
  ["matematika", "bahasa", "ipas"].forEach((m) => assert.strictEqual(kosong.mapel[m].hariBelajarSebelumnya, null));
  assert.strictEqual(L.rekapHarian([], { tanggal: "2026-11-09" }).adaAktivitas, false);
  assert.strictEqual(L.rekapHarian(null, { tanggal: "2026-11-09" }).adaAktivitas, false);
  assert.deepStrictEqual(L.bacaRiwayatTersimpan({ getItem: () => "{rusak" }), []);
  assert.deepStrictEqual(L.bacaRiwayatTersimpan({ getItem: () => { throw new Error("diblokir"); } }), []);
});

uji("Sesi tanpa petaIndikator tetap dihitung angkanya", () => {
  const r = L.rekapHarian([{ tanggal: "2026-11-09T05:00:00Z", mataPelajaran: "ipas", mode: "practice", totalSoal: 15, terjawab: 12, benar: 9, nilai: 60 }], { tanggal: "2026-11-09" });
  assert.strictEqual(r.mapel.ipas.jumlahSesi, 1);
  assert.strictEqual(r.mapel.ipas.sesiTanpaPeta, 1);
  assert.strictEqual(r.mapel.ipas.rekomendasi.jenis, "lanjutkan");
});

uji("Fungsi murni: data riwayat asli tidak berubah & hasil konsisten", () => {
  assert.strictEqual(JSON.stringify(RIWAYAT), salinanAsli);
  const ulang = L.rekapHarian(RIWAYAT, { tanggal: "2026-11-09", sekarang: "2026-11-09T13:30:00Z", kisi, potongJam: false });
  assert.deepStrictEqual(ulang, rekap);
  assert.throws(() => L.rekapMapel(RIWAYAT, { tanggal: "9-11-2026", mapel: "ipas" }));
  assert.throws(() => L.rekapMapel(RIWAYAT, { tanggal: "2026-11-09", mapel: "fisika" }));
  assert.ok(Object.isFrozen(L));
});

// ---------- Batas laporan pukul 20.00 WIB (pilihan A) ----------
uji("Bawaan: laporan hanya menghitung latihan sebelum pukul 20.00 WIB", () => {
  const r = L.rekapHarian(RIWAYAT, { tanggal: "2026-11-09", sekarang: "2026-11-09T17:30:00Z", kisi }).mapel.matematika;
  // Sesi 06.30 & 14.00 masuk; sesi 23.59 dicatat terpisah
  assert.strictEqual(r.jumlahSesi, 2);
  assert.deepStrictEqual(r.sesi.map((s) => s.jam), ["06:30", "14:00"]);
  assert.deepStrictEqual(r.sesudahLaporan, { jumlahSesi: 1, rataRataNilai: 70 });
  assert.strictEqual(r.totalSoal, 45);
  // Indikator 13 hanya ada di sesi 23.59 -> tidak masuk laporan
  assert.ok(!r.kompetensi.some((k) => k.indikator === 13));
});

uji("Laporan final tidak berubah oleh latihan sesudah pukul 20.00", () => {
  const pukul2005 = L.rekapHarian(RIWAYAT.slice(0, 6), { tanggal: "2026-11-09", sekarang: "2026-11-09T13:05:00Z", kisi });
  const pukul2359 = L.rekapHarian(RIWAYAT, { tanggal: "2026-11-09", sekarang: "2026-11-09T16:59:30Z", kisi });
  const inti = (x) => { const { sesudahLaporan, ...sisa } = x.mapel.matematika; return sisa; };
  assert.deepStrictEqual(inti(pukul2359), inti(pukul2005));
  assert.strictEqual(pukul2005.status, "final");
});

uji("Hanya berlatih sesudah 20.00 -> tanpa aktivitas, dengan catatan", () => {
  const r = L.rekapHarian([sesi("2026-11-09T14:00:00.000Z", "ipas", "practice", 15, 15, 12, [[5, 3, 4]])], { tanggal: "2026-11-09" }).mapel.ipas; // 21.00 WIB
  assert.strictEqual(r.adaAktivitas, false);
  assert.strictEqual(r.sesudahLaporan.jumlahSesi, 1);
  assert.ok(L.susunTeks(r, { status: "final", hariIni: "2026-11-09" }).includes("Catatan: 1 sesi latihan sesudah pukul 20.00 WIB tidak termasuk dalam laporan ini."));
});

uji("Latihan sesudah 20.00 tetap menjadi pembanding hari berikutnya", () => {
  const r = L.rekapHarian(RIWAYAT, { tanggal: "2026-11-10", sekarang: "2026-11-10T05:00:00Z", kisi }).mapel.matematika;
  // Sesi 10 Nov 00.01 WIB (indikator 17: 3/3); pembanding indikator 17 = 9 Nov termasuk sesi 23.59? (17 tidak ada di 23.59)
  // Indikator 12/13 hari sebelumnya dihitung dari seluruh sesi 9 Nov, termasuk 23.59
  assert.strictEqual(r.hariBelajarSebelumnya.jumlahSesi, 3);
  assert.strictEqual(r.kompetensi.find((k) => k.indikator === 17).sebelumnya.tanggal, "2026-11-09");
});

// ---------- Langkah 3: teks laporan & tautan WhatsApp ----------
uji("Format tanggal Indonesia & daftar 7 hari terakhir (WIB)", () => {
  assert.strictEqual(L.formatTanggalPanjang("2026-11-09"), "Senin, 9 November 2026");
  assert.strictEqual(L.formatTanggalPanjang("salah"), "");
  assert.strictEqual(L.formatAngka(64.3), "64,3");
  assert.strictEqual(L.formatAngka(null), "-");
  // 2026-11-09T18:00Z = 10 Nov 01.00 WIB -> hari ini 10 Nov
  assert.deepStrictEqual(L.daftarTanggal("2026-11-09T18:00:00Z", 3), ["2026-11-10", "2026-11-09", "2026-11-08"]);
  assert.deepStrictEqual(L.daftarTanggal("2026-03-01T03:00:00Z", 2), ["2026-03-01", "2026-02-28"]); // lintas bulan
});

const motivasiContoh = { judul: "Kemajuanmu terlihat!", pesan: "Nilaimu naik 4 poin." };
const teksMat = L.susunTeks(mat, { namaAnak: "Aisyah", status: "final", motivasi: motivasiContoh });

uji("Teks laporan memuat 11 isi yang dibutuhkan", () => {
  [
    "*Laporan Belajar Harian — Matematika*", "Nama: Aisyah", "Tanggal: Senin, 9 November 2026",
    "Sesi: 3 (1 Latihan, 1 Simulasi Ujian, 1 Latihan Adaptif)", "Soal dikerjakan: 69 dari 75",
    "Jawaban benar: 49", "Rata-rata nilai: 64,3", "*Perkembangan kompetensi*",
    "↑ Persamaan sederhana penjumlahan dan pengurangan: 33% → 75%",
    "↓ Kelogisan satuan baku panjang: 67% → 25%",
    "*Sudah dikuasai:*", "*Masih berkembang:* KPK dan FPB", "*Perlu penguatan:* Kelogisan satuan baku panjang",
    "*Rekomendasi:* Latihan Adaptif Matematika", "*Pesan untuk Aisyah:* Kemajuanmu terlihat!"
  ].forEach((s) => assert.ok(teksMat.includes(s), "tidak memuat: " + s));
  assert.ok(!teksMat.includes("Status: sementara"));
  assert.ok(!/terkirim/i.test(teksMat), "teks tidak boleh mengklaim terkirim");
});

uji("Laporan sementara (sebelum 20.00 WIB) diberi keterangan jelas", () => {
  const t = L.susunTeks(mat, { namaAnak: "Aisyah", status: "sementara", jam: "15:42" });
  assert.ok(t.includes("Status: sementara (per pukul 15.42 WIB; laporan final pukul 20.00 WIB)"));
});

uji("Teks hari tanpa aktivitas (IPAS)", () => {
  const t = L.susunTeks(ipas, { namaAnak: "Aisyah", status: "final", hariIni: "2026-11-09" });
  assert.ok(t.includes("Belum ada latihan IPAS pada hari ini."));
  assert.ok(L.susunTeks(ipas, { status: "final", hariIni: "2026-11-12" }).includes("Belum ada latihan IPAS pada hari itu."));
  assert.ok(t.includes("Latihan terakhir: Sabtu, 7 November 2026 (rata-rata nilai 67)."));
  assert.ok(t.includes("*Rekomendasi:* Mulai dengan Latihan IPAS"));
  assert.ok(!t.includes("*Ringkasan*"));
});

uji("Nama dibersihkan dari karakter format WhatsApp; tanpa nama memakai \"Ananda\"", () => {
  assert.strictEqual(L.namaUntukTeks("*Ai*sy_ah~"), "Aisyah");
  assert.strictEqual(L.namaUntukTeks(""), "Ananda");
  assert.ok(L.susunTeks(bin, { status: "final" }).includes("Nama: Ananda"));
});

uji("Tautan wa.me: nomor dari profil bila valid, kosong bila tidak; teks utuh setelah di-decode", () => {
  const khusus = "Halo & selamat? #1 50% 😊\nBaris kedua *tebal*";
  const a = L.tautanWa(khusus, "6281234567890");
  assert.ok(a.startsWith("https://wa.me/6281234567890?text="));
  assert.strictEqual(decodeURIComponent(new URL(a).searchParams.get("text") === null ? "" : a.split("?text=")[1]), khusus);
  assert.strictEqual(new URL(a).searchParams.get("text"), khusus);
  assert.ok(L.tautanWa("x", "").startsWith("https://wa.me/?text="));          // pilih kontak sendiri
  assert.ok(L.tautanWa("x", "081234567890").startsWith("https://wa.me/?text=")); // belum baku -> diabaikan
  assert.ok(L.tautanWa("x", "62215551234").startsWith("https://wa.me/?text=")); // bukan ponsel -> diabaikan
  assert.ok(L.tautanWa("x", "javascript:alert(1)").startsWith("https://wa.me/?text="));
});

uji("Panjang pesan tetap aman untuk tautan (≤ 1.800 karakter)", () => {
  // Rekap buatan dengan banyak indikator & nama panjang
  const banyak = Array.from({ length: 25 }, (_, i) => ({ indikator: i + 1, nama: "Materi dengan nama yang cukup panjang nomor " + (i + 1), benar: 1, total: 4, persen: 25, perubahan: "turun", sebelumnya: { persen: 75 } }));
  const besar = { ...mat, dikuasai: banyak, berkembang: banyak, perluPenguatan: banyak, kompetensi: banyak, perkembangan: { naik: [], turun: banyak, tetap: [], baru: [] } };
  const t = L.susunTeks(besar, { namaAnak: "Aisyah", status: "final" });
  assert.ok(t.length <= 1800, "panjang " + t.length);
  assert.ok(t.includes("lainnya"));
});

uji("Fungsi teks murni: rekap tidak berubah", () => {
  const sebelum = JSON.stringify(mat);
  L.susunTeks(mat, { namaAnak: "Aisyah", status: "final", motivasi: motivasiContoh });
  assert.strictEqual(JSON.stringify(mat), sebelum);
});

// ---------- Langkah 4: pengingat harian pukul 20.00 WIB (.ics) ----------
const URL_SITUS = "https://contoh.github.io/simulasi-tka-sd/#laporanHarian";
const ics = L.buatIcs({ sekarang: "2026-11-09T12:00:00Z", url: URL_SITUS }); // 19.00 WIB

uji("Berkas .ics: struktur iCalendar lengkap, CRLF, berulang setiap hari pukul 20.00 WIB", () => {
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\nVERSION:2.0\r\n"));
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
  assert.ok(!/[^\r]\n/.test(ics), "semua akhir baris harus CRLF");
  const isi = ics.replace(/\r\n /g, ""); // buka lipatan
  ["BEGIN:VTIMEZONE", "TZID:Asia/Jakarta", "TZOFFSETTO:+0700", "BEGIN:VEVENT", "RRULE:FREQ=DAILY",
    "DTSTART;TZID=Asia/Jakarta:20261109T200000", "DTEND;TZID=Asia/Jakarta:20261109T201500",
    "BEGIN:VALARM", "TRIGGER:PT0M", "URL:" + URL_SITUS, "UID:pengingat-laporan-20261109@simulasi-tka-sd", "DTSTAMP:20261109T120000Z"]
    .forEach((s) => assert.ok(isi.includes(s), "tidak memuat: " + s));
  // Jumlah BEGIN/END seimbang
  const hitung = (p) => (isi.match(new RegExp("^" + p, "gm")) || []).length;
  assert.strictEqual(hitung("BEGIN:"), hitung("END:"));
});

uji("Berkas .ics: setiap baris maks. 75 oktet (dilipat sesuai RFC 5545)", () => {
  ics.split("\r\n").forEach((b) => assert.ok(Buffer.byteLength(b, "utf8") <= 75, `baris ${Buffer.byteLength(b, "utf8")} oktet: ${b}`));
  assert.ok(ics.includes("\r\n "), "ada baris panjang yang dilipat");
});

uji("Berkas .ics: mulai hari ini sebelum 20.00 WIB, besok bila sudah lewat (termasuk lintas bulan)", () => {
  const mulai = (t) => L.buatIcs({ sekarang: t }).match(/DTSTART;TZID=Asia\/Jakarta:(\d{8})/)[1];
  assert.strictEqual(mulai("2026-11-09T12:59:00Z"), "20261109"); // 19.59 WIB
  assert.strictEqual(mulai("2026-11-09T13:00:00Z"), "20261110"); // 20.00 WIB
  assert.strictEqual(mulai("2026-11-30T14:00:00Z"), "20261201"); // 30 Nov 21.00 WIB -> 1 Des
  assert.strictEqual(mulai("2026-11-09T18:00:00Z"), "20261110"); // 10 Nov 01.00 WIB -> hari ini (10 Nov)
});

uji("Berkas .ics: hanya tautan http/https; tanpa nama anak & nomor WhatsApp", () => {
  const tanpaUrl = L.buatIcs({ sekarang: "2026-11-09T12:00:00Z", url: "file:///C:/tka/index.html" });
  assert.ok(!tanpaUrl.includes("URL:"));
  assert.ok(!L.buatIcs({ sekarang: "2026-11-09T12:00:00Z", url: "javascript:alert(1)" }).includes("javascript"));
  assert.ok(!/Aisyah|628\d{8,}/.test(ics));
});

uji("Berkas .ics: teks di-escape & UID aman", () => {
  const x = L.buatIcs({ sekarang: "2026-11-09T12:00:00Z", uid: "abc;def,ghi\njkl" });
  assert.ok(/UID:abcdefghijkl@simulasi-tka-sd/.test(x));
  assert.ok(x.replace(/\r\n /g, "").includes("DESCRIPTION:Saatnya membuka") );
  assert.ok(!/DESCRIPTION:[^\r]*[^\\][,;]/.test(x.replace(/\r\n /g, "").replace(/\\[,;n]/g, "")), "koma/titik koma di teks harus di-escape");
});

console.log(`\n✓ ${lolos} uji lolos.`);
if (process.argv.includes("--teks")) {
  console.log("\n----- Contoh teks Matematika -----\n" + teksMat);
  console.log("\n----- Contoh teks IPAS (tanpa aktivitas) -----\n" + L.susunTeks(ipas, { namaAnak: "Aisyah", status: "final" }));
}

if (process.argv.includes("--contoh")) {
  const ringkas = (r) => ({
    mapel: r.namaMapel, tanggal: r.tanggal, adaAktivitas: r.adaAktivitas,
    jumlahSesi: r.jumlahSesi, perMode: r.perMode, totalSoal: r.totalSoal, soalDikerjakan: r.soalDikerjakan,
    jawabanBenar: r.jawabanBenar, rataRataNilai: r.rataRataNilai, ketepatan: r.ketepatan,
    kompetensi: r.kompetensi.map((k) => `${k.indikator} ${k.nama}: ${k.benar}/${k.total} = ${k.persen}% ${k.labelStatus}` + (k.sebelumnya ? ` (${k.perubahan}, ${k.sebelumnya.tanggal}: ${k.sebelumnya.persen}%)` : " (baru)")),
    dikuasai: r.dikuasai.map((k) => k.nama), perluPenguatan: r.perluPenguatan.map((k) => k.nama), berkembang: r.berkembang.map((k) => k.nama),
    rekomendasi: r.rekomendasi.teks, hariBelajarSebelumnya: r.hariBelajarSebelumnya
  });
  console.log(JSON.stringify({ tanggal: rekap.tanggal, status: rekap.status, mapel: Object.fromEntries(Object.entries(rekap.mapel).map(([k, v]) => [k, ringkas(v)])) }, null, 2));
}
