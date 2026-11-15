#!/usr/bin/env node
// =====================================================================
// VALIDASI SINKRON SOAL MAT-001..100 (bank lama latihan.html ↔ bank utama index.html)
// ---------------------------------------------------------------------
// Sumber kebenaran soal MAT yang dipakai pengguna adalah bank utama
// (js/soal-kisi-matematika.js). Bank lama mat-soal-1..4.js dibekukan sebagai arsip.
// Skrip ini memastikan setiap soal MAT di bank utama:
//   - muncul tepat satu kali di seluruh bank Matematika index.html;
//   - ada di bank lama dan isinya sama (pertanyaan, opsi/pernyataan, pembahasan,
//     kesulitan, bentuk, gambar soal);
//   - kuncinya cocok berdasarkan TEKS opsi (bukan indeks — urutan opsi boleh beda,
//     mis. MAT-018 dan MAT-024);
//   - memakai indikator kisi-kisi yang terdaftar dan kode KISI-MT-NN yang sesuai;
//   - gambarnya ada.
// Soal yang sengaja belum diporting didaftar di BELUM_DIPORT; perbedaan isi yang
// disetujui dicatat di PENGECUALIAN (dikunci sha256 isi bank utama).
// Hanya MEMBACA.   node alat/validasi-sinkron-mat.js
// =====================================================================
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const AKAR = path.resolve(__dirname, "..");

// Belum diporting: tidak ada indikator kisi-kisi yang benar-benar sesuai
// (keputusan 2026-11-15; lihat laporan pemetaan tahap berikutnya).
const BELUM_DIPORT = [
  "MAT-009", "MAT-010", "MAT-011", "MAT-012", "MAT-013", "MAT-014", "MAT-015", "MAT-016",
  "MAT-032",
  "MAT-042", "MAT-043", "MAT-044", "MAT-045", "MAT-046", "MAT-047", "MAT-048", "MAT-049",
  "MAT-050", "MAT-051", "MAT-052", "MAT-053", "MAT-054", "MAT-056", "MAT-057",
  "MAT-069", "MAT-070", "MAT-074", "MAT-081", "MAT-087", "MAT-088", "MAT-090"
];
// { "MAT-xxx": "<sha256 JSON soal di bank utama>" } — perbedaan isi yang sudah disetujui.
const PENGECUALIAN = {};
// Kode kisi Matematika yang sudah dipakai bank utama sebelum port (2026-11-15).
// KISI-MT-03, -10, -14 belum pernah dipakai: memakainya = membuat kode baru.
// KISI-MT-31 (indikator 31, persen kontekstual) disetujui pengguna 2026-11-15.
const KODE_TERDAFTAR = [1, 2, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  .map((n) => `KISI-MT-${String(n).padStart(2, "0")}`);

const galat = [];

// ---------- Bank lama (latihan.html) ----------
const ctxLama = { console: { log() {}, warn() {}, error() {} } };
ctxLama.window = ctxLama;
vm.createContext(ctxLama);
for (const rel of ["tka.js", "mat-gambar.js", "mat-kompetensi.js", "mat-soal-1.js", "mat-soal-2.js", "mat-soal-3.js", "mat-soal-4.js"]) {
  vm.runInContext(fs.readFileSync(path.join(AKAR, rel), "utf8"), ctxLama, { filename: rel });
}
const lama = new Map(ctxLama.TKA.bank.mat.soal.map((q) => [q.id, q]));

// ---------- Bank utama (urutan <script> index.html) ----------
const html = fs.readFileSync(path.join(AKAR, "index.html"), "utf8");
const ctx = { console: { log() {}, warn() {}, error() {} } };
ctx.window = ctx;
vm.createContext(ctx);
for (const rel of [...html.matchAll(/<script\s+src="([^"?]+)(?:\?[^"]*)?"/g)].map((m) => m[1])) {
  if (!/kisi-kisi|soal-|app\.js/.test(rel)) continue;
  let kode = fs.readFileSync(path.join(AKAR, rel), "utf8");
  if (rel === "js/app.js") kode = kode.slice(0, kode.indexOf("\nconst namaMapel")) + "\nglobalThis.bankSoal = bankSoal;";
  vm.runInContext(kode, ctx, { filename: rel });
}
const namaIndikator = ctx.kisiKisiTKA.matematika.indikator;
const semuaMat = [ctx.bankSoal.matematika, ctx.soalAdaptifMatematika, ctx.soalKisiMatematika].flat();

// ---------- Normalisasi ----------
const teks = (s) => String(s ?? "").replace(/<[^>]+>/g, " ").replace(/\*\*/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
const svg = (s) => String(s ?? "").replace(/\s+/g, " ").replace(/> </g, "><").trim();
const TIPE = { PG: "pg", MCMA: "pgk", BS: "pgk_kategori" };

// ---------- Kehadiran ----------
const hitung = new Map();
semuaMat.filter((q) => /^MAT-\d{3}$/.test(q.id)).forEach((q) => hitung.set(q.id, (hitung.get(q.id) || 0) + 1));
for (let n = 1; n <= 100; n++) {
  const id = `MAT-${String(n).padStart(3, "0")}`;
  const k = hitung.get(id) || 0;
  if (!lama.has(id)) galat.push(`${id}: tidak ada di bank lama`);
  if (BELUM_DIPORT.includes(id)) { if (k) galat.push(`${id}: terdaftar BELUM_DIPORT tetapi ada di bank utama`); }
  else if (k !== 1) galat.push(`${id}: muncul ${k} kali di bank utama (harus tepat 1)`);
}
for (const id of hitung.keys()) if (!lama.has(id)) galat.push(`${id}: ada di bank utama tetapi tidak dikenal di bank lama`);

// ---------- Isi per soal ----------
let diperiksa = 0, terkecuali = 0;
for (const b of semuaMat.filter((q) => lama.has(q.id))) {
  const a = lama.get(b.id);
  const g = (p) => galat.push(`${b.id}: ${p}`);
  diperiksa++;
  // Indikator & kode (berlaku juga untuk soal berpengecualian)
  if (!namaIndikator[b.indikator]) g(`indikator ${b.indikator} tidak terdaftar di kisi-kisi`);
  else {
    if (b.kodeKompetensi !== `KISI-MT-${String(b.indikator).padStart(2, "0")}`) g(`kode ${b.kodeKompetensi} tidak sesuai indikator ${b.indikator}`);
    if (!KODE_TERDAFTAR.includes(b.kodeKompetensi)) g(`kode ${b.kodeKompetensi} belum pernah dipakai (kode baru perlu persetujuan)`);
  }
  if (!String(b.topic || "").trim()) g("topic kosong");
  if (b.image && !fs.existsSync(path.join(AKAR, b.image))) g(`gambar tidak ada: ${b.image}`);

  const sha = crypto.createHash("sha256").update(JSON.stringify(b)).digest("hex");
  if (PENGECUALIAN[b.id]) {
    if (PENGECUALIAN[b.id] !== sha) g("berubah lagi setelah pengecualian disetujui (sha256 tidak cocok)");
    else terkecuali++;
    continue;
  }
  if (TIPE[a.bentuk] !== b.type) g(`bentuk ${a.bentuk} → ${b.type}`);
  if (a.kesulitan !== b.difficulty) g(`kesulitan ${a.kesulitan} → ${b.difficulty}`);
  if (teks(b.stimulus)) g("stimulus tidak kosong (bank lama tidak punya stimulus)");
  if (teks(a.pertanyaan) !== teks(b.question)) g("pertanyaan berbeda");
  if (teks(a.pembahasan) !== teks(b.explanation)) g("pembahasan berbeda");
  const opsiB = (b.type === "pgk_kategori" ? b.statements : b.options) || [];
  const oA = a.opsi.map(teks), oB = opsiB.map(teks);
  if (JSON.stringify([...oA].sort()) !== JSON.stringify([...oB].sort())) g("opsi/pernyataan berbeda");
  else if (b.type === "pgk_kategori") {
    // BS: kunci per pernyataan, dicocokkan lewat teks pernyataan
    const kat = (b.categories || []).map(teks);
    if (kat[0] !== "benar" || kat[1] !== "salah") g(`kategori ${JSON.stringify(b.categories)}`);
    a.opsi.forEach((p, i) => {
      const j = oB.indexOf(teks(p));
      if ((b.answer[j] === 0) !== (a.kunci[i] === true)) g(`kunci pernyataan "${p}" berbeda`);
    });
  } else {
    const kunciA = (Array.isArray(a.kunci) ? a.kunci : [a.kunci]).map((i) => oA[i]).sort();
    const kunciB = (b.answer || []).map((i) => oB[i]).sort();
    if (JSON.stringify(kunciA) !== JSON.stringify(kunciB)) g(`kunci berbeda (teks): ${kunciA.join(" | ")} ≠ ${kunciB.join(" | ")}`);
  }
  if (!!a.gambar !== !!b.image) g(a.gambar ? "gambar soal tidak dibawa" : "gambar baru yang tidak ada di bank lama");
  else if (a.gambar && fs.existsSync(path.join(AKAR, b.image)) && svg(fs.readFileSync(path.join(AKAR, b.image), "utf8")) !== svg(a.gambar)) g(`gambar ${b.image} berbeda dari bank lama`);
}

console.log(`Sinkron MAT: ${hitung.size} soal MAT di bank utama · ${BELUM_DIPORT.length} belum diporting · ${diperiksa} diperiksa · ${terkecuali} berpengecualian`);
if (galat.length) {
  console.error(`✗ ${galat.length} galat:`);
  galat.forEach((p) => console.error("  - " + p));
  process.exit(1);
}
console.log("✓ Semua soal MAT di bank utama sinkron dengan bank lama (kunci dicocokkan lewat teks).");
