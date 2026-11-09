#!/usr/bin/env node
// =====================================================================
// VERSI ASET GAMBAR (immutable asset versioning)
// ---------------------------------------------------------------------
// Setiap berkas di assets/images/ disalin SEKALI ke assets/versi/<hash>.<ext>,
// dengan <hash> = 16 karakter awal SHA-256 isi berkas. Berkas versi TIDAK PERNAH
// ditimpa atau dihapus: bila gambar sumber diperbarui (nama sama, isi berbeda),
// muncul berkas versi baru, sedangkan versi lama tetap ada untuk riwayat lama.
//
// Lalu js/aset-manifest.js ditulis ulang: peta "jalur sumber" -> "jalur versi terbaru".
// Bank soal tidak diubah; soal tetap menunjuk jalur sumber (mis. assets/images/kisi/X.svg).
//
// Pemakaian:
//   node alat/versi-aset.js            buat versi untuk gambar baru/berubah + tulis manifest
//   node alat/versi-aset.js --periksa  hanya memeriksa (keluar dengan kode 1 bila manifest
//                                      tidak cocok dengan gambar sumber). Jalankan sebelum commit.
// =====================================================================
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const AKAR = path.resolve(__dirname, "..");
const SUMBER = "assets/images";
const TUJUAN = "assets/versi";
const MANIFEST = "js/aset-manifest.js";
const periksaSaja = process.argv.includes("--periksa");

const kePosix = (p) => p.split(path.sep).join("/");
function daftarBerkas(dir) {
  const hasil = [];
  for (const nama of fs.readdirSync(path.join(AKAR, dir)).sort()) {
    const rel = dir + "/" + nama;
    const st = fs.statSync(path.join(AKAR, rel));
    if (st.isDirectory()) hasil.push(...daftarBerkas(rel));
    else if (!nama.startsWith(".")) hasil.push(rel);
  }
  return hasil;
}
const hashIsi = (buf) => crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);

// Pemeriksaan dasar SVG: browser menolak menampilkan SVG yang XML-nya tidak valid
// (mis. atribut ganda "Attribute fill redefined"), jadi gambar seperti itu tidak boleh lolos.
function periksaSvg(teks) {
  const masalah = [];
  const bersih = teks.replace(/<!--[\s\S]*?-->/g, "").replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "").replace(/<\?[\s\S]*?\?>/g, "").replace(/<!DOCTYPE[^>]*>/gi, "");
  if (!/<svg[\s>]/.test(bersih)) masalah.push("tidak ada elemen <svg>");
  const tumpukan = [];
  const reTag = /<(\/?)([a-zA-Z][\w:.-]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = reTag.exec(bersih))) {
    const [, tutup, nama, atribut, selfClose] = m;
    if (tutup) {
      if (tumpukan.pop() !== nama) { masalah.push(`tag penutup </${nama}> tidak cocok`); break; }
      continue;
    }
    const namaAtribut = [...atribut.matchAll(/([\w:.-]+)\s*=\s*("[^"]*"|'[^']*')/g)].map((x) => x[1]);
    const ganda = namaAtribut.filter((n, i) => namaAtribut.indexOf(n) !== i);
    if (ganda.length) masalah.push(`atribut ganda "${[...new Set(ganda)].join(", ")}" pada <${nama}>`);
    if (!selfClose) tumpukan.push(nama);
  }
  if (!masalah.length && tumpukan.length) masalah.push(`tag tidak ditutup: <${tumpukan[tumpukan.length - 1]}>`);
  return masalah;
}

function bacaManifestLama() {
  try {
    const teks = fs.readFileSync(path.join(AKAR, MANIFEST), "utf8");
    const json = teks.slice(teks.indexOf("{"), teks.lastIndexOf("}") + 1);
    return JSON.parse(json);
  } catch (e) { return null; }
}

const sumber = daftarBerkas(SUMBER);
const berkas = {};
const baru = [], diperbarui = [], masalah = [];
const lama = bacaManifestLama();

for (const rel of sumber) {
  const isi = fs.readFileSync(path.join(AKAR, rel));
  if (rel.toLowerCase().endsWith(".svg")) {
    periksaSvg(isi.toString("utf8")).forEach((p) => masalah.push(`SVG tidak valid (${rel}): ${p}`));
  }
  const hash = hashIsi(isi);
  const ext = path.extname(rel).toLowerCase();
  const versi = `${TUJUAN}/${hash}${ext}`;
  const lokasi = path.join(AKAR, versi);
  if (fs.existsSync(lokasi)) {
    // Berkas versi sudah ada: pastikan isinya benar-benar sama (tidak pernah ditimpa)
    if (!fs.readFileSync(lokasi).equals(isi)) masalah.push(`Tabrakan hash: ${versi} berbeda isi dengan ${rel}`);
  } else if (periksaSaja) {
    masalah.push(`Belum ada versi untuk ${rel} (jalankan: node alat/versi-aset.js)`);
  } else {
    fs.mkdirSync(path.dirname(lokasi), { recursive: true });
    fs.writeFileSync(lokasi, isi, { flag: "wx" }); // "wx": gagal bila berkas sudah ada
    (lama && lama.berkas && lama.berkas[rel] ? diperbarui : baru).push(rel);
  }
  berkas[rel] = { src: versi, hash };
}

if (periksaSaja) {
  if (!lama || !lama.berkas) masalah.push(`${MANIFEST} tidak ada atau rusak`);
  else {
    for (const [rel, v] of Object.entries(berkas)) {
      const m = lama.berkas[rel];
      if (!m || m.hash !== v.hash) masalah.push(`Manifest belum diperbarui untuk ${rel}`);
    }
    for (const rel of Object.keys(lama.berkas)) if (!berkas[rel]) masalah.push(`Manifest menyebut berkas yang tidak ada: ${rel}`);
  }
  if (masalah.length) { console.error("✗ Versi aset tidak cocok:\n  " + masalah.join("\n  ")); process.exit(1); }
  console.log(`✓ Versi aset cocok: ${sumber.length} gambar sumber, semua sudah punya versi tetap.`);
  process.exit(0);
}

if (masalah.length) { console.error("✗ " + masalah.join("\n✗ ")); process.exit(1); }

if (lama && lama.berkas && JSON.stringify(lama.berkas) === JSON.stringify(berkas)) {
  console.log(`✓ Tidak ada perubahan: ${sumber.length} gambar sumber sudah punya versi tetap.`);
  process.exit(0);
}

const isiManifest = {
  dibuat: new Date().toISOString(),
  catatan: "Dibuat otomatis oleh alat/versi-aset.js. Jangan diedit manual.",
  berkas
};
const teks = `// DIBUAT OTOMATIS oleh alat/versi-aset.js — jangan diedit manual.
// Peta jalur gambar sumber (dipakai bank soal) -> versi tetap berbasis hash di ${TUJUAN}/.
window.ASET_MANIFEST = ${JSON.stringify(isiManifest, null, 1)};
`;
// Tulis manifest secara aman: berkas sementara lalu ganti nama
const sementara = path.join(AKAR, MANIFEST + ".tmp");
fs.writeFileSync(sementara, teks);
fs.renameSync(sementara, path.join(AKAR, MANIFEST));

const jumlahVersi = fs.readdirSync(path.join(AKAR, TUJUAN)).length;
console.log(`✓ ${sumber.length} gambar sumber · ${baru.length} versi baru · ${diperbarui.length} gambar diperbarui (versi lama tetap disimpan) · ${jumlahVersi} berkas di ${TUJUAN}/`);
diperbarui.forEach((r) => console.log("  diperbarui: " + r + " -> " + berkas[r].src));
