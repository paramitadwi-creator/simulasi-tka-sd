#!/usr/bin/env node
// =====================================================================
// VALIDASI BANK SOAL UTAMA (dipakai index.html: 826 soal)
// ---------------------------------------------------------------------
// Memuat berkas bank persis seperti urutan <script> di index.html (tanpa browser),
// lalu memeriksa setiap soal: ID unik, isi wajib, kunci dalam rentang opsi,
// gambar ada + SVG valid + terdaftar di manifest versi aset.
// Hanya MEMBACA; tidak mengubah bank soal.
//
//   node alat/validasi-bank-utama.js
// Keluar dengan kode 1 bila ada galat (peringatan tidak menggagalkan).
// (validasi-bank.js di akar proyek memeriksa bank aplikasi latihan.html, bukan bank ini.)
// =====================================================================
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const AKAR = path.resolve(__dirname, "..");
const LEWATI = new Set(["js/dashboard.js", "js/riwayat.js", "js/hasil.js", "js/antarmuka.js", "js/aset.js"]);
const JUMLAH_HARAPAN = 826;

const galat = [];
const peringatan = [];

// ---------- Muat skrip sesuai urutan index.html ----------
const html = fs.readFileSync(path.join(AKAR, "index.html"), "utf8");
const skrip = [...html.matchAll(/<script\s+src="([^"?]+)(?:\?[^"]*)?"/g)].map((m) => m[1]);
const konteks = { console: { log() {}, warn() {}, error() {} } };
konteks.window = konteks;
vm.createContext(konteks);
for (const rel of skrip) {
  if (LEWATI.has(rel)) continue;
  let kode = fs.readFileSync(path.join(AKAR, rel), "utf8");
  if (rel === "js/app.js") {
    // Hanya data bankSoal (bagian awal app.js); sisanya kode tampilan yang butuh browser
    const akhir = kode.indexOf("\nconst namaMapel");
    if (akhir < 0) { console.error("✗ Tidak menemukan batas bankSoal di js/app.js"); process.exit(1); }
    kode = kode.slice(0, akhir) + "\nglobalThis.bankSoal = bankSoal;";
  }
  try { vm.runInContext(kode, konteks, { filename: rel }); }
  catch (e) { galat.push(`Gagal memuat ${rel}: ${e.message}`); }
}
if (galat.length) { console.error("✗ " + galat.join("\n✗ ")); process.exit(1); }

// ---------- Gabungan bank per mapel (sama seperti aplikasi) ----------
const w = konteks;
const sumber = {
  matematika: [w.bankSoal.matematika, w.soalAdaptifMatematika, w.soalKisiMatematika],
  bahasa: [w.bankSoal.bahasa, w.soalAdaptifBahasa, w.soalKisiBahasa],
  ipas: [w.bankSoal.ipas, w.soalAdaptifIPAS, w.soalKisiIPAS]
};
const kisi = w.kisiKisiTKA || {};
const indikatorSoal = (q) => q.indikator ?? (kisi.indikatorSoal || {})[q.id] ?? (kisi.indikatorKode || {})[q.kodeKompetensi] ?? null;
const manifest = (w.ASET_MANIFEST && w.ASET_MANIFEST.berkas) || {};

const semuaId = new Map();
const perMapel = {};
const perTipe = {};
let jumlahGambar = 0;
const svgTerperiksa = new Map();

function periksaSvg(rel) {
  if (svgTerperiksa.has(rel)) return svgTerperiksa.get(rel);
  const teks = fs.readFileSync(path.join(AKAR, rel), "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const masalah = [];
  if (!/<svg[\s>]/.test(teks)) masalah.push("tidak ada <svg>");
  for (const m of teks.matchAll(/<([a-zA-Z][\w:.-]*)([^>]*?)\/?>/g)) {
    const nama = [...m[2].matchAll(/([\w:.-]+)\s*=\s*("[^"]*"|'[^']*')/g)].map((x) => x[1]);
    const ganda = nama.filter((n, i) => nama.indexOf(n) !== i);
    if (ganda.length) masalah.push(`atribut ganda "${[...new Set(ganda)].join(",")}" pada <${m[1]}>`);
  }
  svgTerperiksa.set(rel, masalah);
  return masalah;
}

for (const [mapel, daftarBank] of Object.entries(sumber)) {
  const unik = new Map();
  daftarBank.forEach((bank, i) => {
    if (!Array.isArray(bank)) { galat.push(`${mapel}: bank ke-${i + 1} tidak termuat`); return; }
    bank.forEach((q) => { if (!unik.has(q.id)) unik.set(q.id, q); });
  });
  perMapel[mapel] = unik.size;
  for (const q of unik.values()) {
    const id = q.id;
    if (semuaId.has(id)) galat.push(`${id}: ID dipakai di ${semuaId.get(id)} dan ${mapel}`);
    semuaId.set(id, mapel);
    perTipe[q.type] = (perTipe[q.type] || 0) + 1;
    const g = (p) => galat.push(`${id}: ${p}`);
    if (!["pg", "pgk", "pgk_kategori"].includes(q.type)) g(`tipe tidak dikenal "${q.type}"`);
    if (!q.question || !String(q.question).trim()) g("teks soal kosong");
    if (!q.explanation || !String(q.explanation).trim()) g("pembahasan kosong");
    if (!q.topic) g("materi (topic) kosong");
    if (!["mudah", "sedang", "sulit"].includes(q.difficulty)) g(`tingkat kesulitan "${q.difficulty}"`);
    if (!Array.isArray(q.answer) || !q.answer.length) g("kunci jawaban kosong");
    else if (q.type === "pgk_kategori") {
      if (!Array.isArray(q.statements) || !q.statements.length) g("pernyataan kosong");
      if (!Array.isArray(q.categories) || q.categories.length < 2) g("kategori kurang dari 2");
      if (q.statements && q.answer.length !== q.statements.length) g("jumlah kunci ≠ jumlah pernyataan");
      if (q.categories && q.answer.some((a) => !Number.isInteger(a) || a < 0 || a >= q.categories.length)) g("kunci di luar kategori");
    } else {
      if (!Array.isArray(q.options) || q.options.length < 2) g("opsi kurang dari 2");
      else {
        if (q.answer.some((a) => !Number.isInteger(a) || a < 0 || a >= q.options.length)) g("kunci di luar opsi");
        if (new Set(q.options.map((o) => String(o).trim())).size !== q.options.length) g("ada opsi kembar");
        if (q.options.some((o) => !String(o).trim())) g("ada opsi kosong");
      }
      if (q.type === "pg" && q.answer.length !== 1) g("PG harus tepat satu kunci");
      if (q.type === "pgk" && q.answer.length < 2) peringatan.push(`${id}: PGK hanya satu kunci`);
      if (new Set(q.answer).size !== q.answer.length) g("kunci kembar");
    }
    if (q.image) {
      jumlahGambar++;
      const lokasi = path.join(AKAR, q.image);
      if (!fs.existsSync(lokasi)) g(`gambar tidak ada: ${q.image}`);
      else {
        if (q.image.toLowerCase().endsWith(".svg")) periksaSvg(q.image).forEach((p) => g(`SVG tidak valid (${q.image}): ${p}`));
        const v = manifest[q.image];
        if (!v) g(`gambar belum terdaftar di manifest versi aset: ${q.image}`);
        else if (!fs.existsSync(path.join(AKAR, v.src))) g(`berkas versi aset tidak ada: ${v.src}`);
      }
      if (!q.imageAlt) peringatan.push(`${id}: gambar tanpa teks alternatif`);
    }
    if (!indikatorSoal(q)) peringatan.push(`${id}: tanpa indikator kisi-kisi (tidak masuk peta hasil)`);
  }
}

const total = semuaId.size;
if (total !== JUMLAH_HARAPAN) galat.push(`Jumlah soal ${total}, seharusnya ${JUMLAH_HARAPAN}`);

console.log(`Bank soal utama: ${total} soal · Matematika ${perMapel.matematika} · Bahasa Indonesia ${perMapel.bahasa} · IPAS ${perMapel.ipas}`);
console.log(`Tipe: ${Object.entries(perTipe).map(([t, n]) => `${t} ${n}`).join(" · ")} · soal bergambar ${jumlahGambar}`);
if (peringatan.length) {
  console.log(`Peringatan (${peringatan.length}, tidak menggagalkan):`);
  peringatan.slice(0, 20).forEach((p) => console.log("  - " + p));
  if (peringatan.length > 20) console.log(`  … ${peringatan.length - 20} lainnya`);
}
if (galat.length) {
  console.error(`✗ ${galat.length} galat:`);
  galat.slice(0, 50).forEach((p) => console.error("  - " + p));
  process.exit(1);
}
console.log("✓ Semua pemeriksaan bank soal utama lolos.");
