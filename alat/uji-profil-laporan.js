#!/usr/bin/env node
// Uji js/profil-laporan.js (validasi, format, penyimpanan lokal) tanpa browser.
//   node alat/uji-profil-laporan.js
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const AKAR = path.resolve(__dirname, "..");
const P = require(path.join(AKAR, "js/profil-laporan.js"));

// Penyimpanan tiruan (perilaku seperti localStorage)
function penyimpananTiruan({ penuh = false, diblokir = false } = {}) {
  const data = new Map();
  return {
    data,
    getItem: (k) => { if (diblokir) throw new DOMException("x", "SecurityError"); return data.has(k) ? data.get(k) : null; },
    setItem: (k, v) => {
      if (diblokir) throw new DOMException("x", "SecurityError");
      if (penuh) throw new DOMException("x", "QuotaExceededError");
      data.set(k, String(v));
    },
    removeItem: (k) => { if (diblokir) throw new DOMException("x", "SecurityError"); data.delete(k); }
  };
}

let lolos = 0;
const uji = (nama, fn) => { fn(); lolos++; console.log("  ✓ " + nama); };
console.log("Uji js/profil-laporan.js");

uji("Nama anak: dirapikan & divalidasi", () => {
  assert.deepStrictEqual(P.periksaNama("  Aisyah   Putri ").nilai, "Aisyah Putri");
  assert.strictEqual(P.periksaNama("Siti Nur'aini").ok, true);
  assert.strictEqual(P.periksaNama("Muh. Raffi Al-Fatih").ok, true);
  assert.strictEqual(P.periksaNama("Zoë").ok, true);
  assert.strictEqual(P.periksaNama("A​isyah\u0007").nilai, "Aisyah");      // karakter tak terlihat & kontrol dibuang
  assert.strictEqual(P.periksaNama("").ok, false);
  assert.strictEqual(P.periksaNama("A").ok, false);                               // terlalu pendek
  assert.strictEqual(P.periksaNama("x".repeat(41)).ok, false);                    // terlalu panjang
  assert.strictEqual(P.periksaNama("Budi123").ok, false);                         // angka
  assert.strictEqual(P.periksaNama("<script>").ok, false);                        // tanda khusus
  assert.strictEqual(P.periksaNama("https://contoh.id").ok, false);
  assert.strictEqual(P.periksaNama("-Budi").ok, false);                           // harus diawali huruf
});

uji("Nomor WhatsApp: semua format umum dinormalkan ke 628…", () => {
  const harap = "6281234567890";
  ["081234567890", "0812-3456-7890", "0812 3456 7890", "+62 812 3456 7890", "+6281234567890",
    "6281234567890", "(0812) 3456-7890", "0062 812 3456 7890", "+62 0812 3456 7890", "81234567890"]
    .forEach((n) => assert.strictEqual(P.periksaNomorWa(n).nilai, harap, n));
  assert.strictEqual(P.periksaNomorWa("0811234567").nilai, "62811234567");       // 10 digit (terpendek)
  assert.strictEqual(P.periksaNomorWa("0812345678901").nilai, "62812345678901"); // 13 digit (terpanjang)
});

uji("Nomor WhatsApp: kosong boleh, nomor tidak valid ditolak dengan pesan jelas", () => {
  assert.deepStrictEqual(P.periksaNomorWa("   "), { ok: true, nilai: "", kosong: true, pesan: "" });
  const tolak = {
    "021 1234 5678": "telepon rumah",
    "+1 650 555 1234": "Indonesia",
    "0812345": "pendek",
    "08123456789012345": "panjang",
    "0812-3456-78ab": "angka",
    "08+1234567890": "awal",
    "0801234567890": "dikenali"
  };
  Object.entries(tolak).forEach(([n, kata]) => {
    const h = P.periksaNomorWa(n);
    assert.strictEqual(h.ok, false, n);
    assert.ok(h.pesan.includes(kata), `${n}: "${h.pesan}" harus memuat "${kata}"`);
  });
});

uji("Format & penyamaran nomor untuk tampilan", () => {
  assert.strictEqual(P.formatNomor("6281234567890"), "+62 812-3456-7890");
  assert.strictEqual(P.samarkanNomor("6281234567890"), "+62 812-****-7890");
  assert.strictEqual(P.samarkanNomor("62811234567"), "+62 811-**-4567");
  assert.strictEqual(P.formatNomor("12345"), "");
  assert.strictEqual(P.samarkanNomor(""), "");
});

uji("Persetujuan wajib dicentang; semua galat dilaporkan sekaligus", () => {
  const h = P.buatProfil({ namaAnak: "", nomorWa: "021", setuju: false });
  assert.strictEqual(h.ok, false);
  assert.deepStrictEqual(Object.keys(h.galat).sort(), ["namaAnak", "nomorWa", "setuju"]);
  assert.strictEqual(P.buatProfil({ namaAnak: "Aisyah", nomorWa: "", setuju: "true" }).ok, false); // harus boolean true
});

uji("Profil baku: nama rapi, nomor baku, versi & waktu persetujuan", () => {
  const h = P.buatProfil({ namaAnak: " Aisyah ", nomorWa: "0812 3456 7890", setuju: true }, "2026-11-09T13:00:00Z");
  assert.deepStrictEqual(h.profil, {
    v: 1, namaAnak: "Aisyah", nomorWa: "6281234567890",
    persetujuan: { versi: P.VERSI_PERSETUJUAN, waktu: "2026-11-09T13:00:00.000Z" },
    diperbarui: "2026-11-09T13:00:00.000Z"
  });
});

uji("Simpan, baca, ubah, hapus di penyimpanan lokal", () => {
  const s = penyimpananTiruan();
  assert.strictEqual(P.bacaProfil(s), null);
  const r = P.simpanProfil({ namaAnak: "Aisyah", nomorWa: "081234567890", setuju: true }, s, "2026-11-09T13:00:00Z");
  assert.strictEqual(r.ok, true);
  assert.deepStrictEqual([...s.data.keys()], ["tkaLaporanProfil"]);        // hanya satu kunci baru
  const p = P.bacaProfil(s);
  assert.strictEqual(p.namaAnak, "Aisyah");
  assert.strictEqual(p.nomorWa, "6281234567890");
  assert.strictEqual(p.perluPersetujuanUlang, false);
  P.simpanProfil({ namaAnak: "Aisyah Putri", nomorWa: "", setuju: true }, s);  // ubah: nomor dikosongkan
  assert.strictEqual(P.bacaProfil(s).nomorWa, "");
  assert.strictEqual(P.hapusProfil(s), true);
  assert.strictEqual(P.bacaProfil(s), null);
});

uji("Isian tidak valid tidak menimpa profil yang sudah tersimpan", () => {
  const s = penyimpananTiruan();
  P.simpanProfil({ namaAnak: "Aisyah", nomorWa: "", setuju: true }, s);
  const sebelum = s.data.get("tkaLaporanProfil");
  const r = P.simpanProfil({ namaAnak: "Aisyah", nomorWa: "021-555", setuju: true }, s);
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.alasan, "tidak-valid");
  assert.strictEqual(s.data.get("tkaLaporanProfil"), sebelum);
});

uji("Penyimpanan penuh / diblokir ditangani tanpa galat", () => {
  const isian = { namaAnak: "Aisyah", nomorWa: "", setuju: true };
  assert.strictEqual(P.simpanProfil(isian, penyimpananTiruan({ penuh: true })).alasan, "penuh");
  assert.strictEqual(P.simpanProfil(isian, penyimpananTiruan({ diblokir: true })).alasan, "tidak-tersedia");
  assert.strictEqual(P.bacaProfil(penyimpananTiruan({ diblokir: true })), null);
  assert.strictEqual(P.hapusProfil(penyimpananTiruan({ diblokir: true })), false);
});

uji("Data tersimpan rusak/diubah manual dianggap tidak ada (tidak dipakai)", () => {
  const s = penyimpananTiruan();
  const simpanMentah = (o) => s.data.set("tkaLaporanProfil", typeof o === "string" ? o : JSON.stringify(o));
  const baik = P.buatProfil({ namaAnak: "Aisyah", nomorWa: "081234567890", setuju: true }).profil;
  simpanMentah("{rusak"); assert.strictEqual(P.bacaProfil(s), null);
  simpanMentah({ ...baik, v: 99 }); assert.strictEqual(P.bacaProfil(s), null);
  simpanMentah({ ...baik, nomorWa: "021555" }); assert.strictEqual(P.bacaProfil(s), null);
  simpanMentah({ ...baik, namaAnak: "<b>x</b>" }); assert.strictEqual(P.bacaProfil(s), null);
  simpanMentah({ ...baik, persetujuan: null }); assert.strictEqual(P.bacaProfil(s), null);
  simpanMentah(baik); assert.strictEqual(P.bacaProfil(s).namaAnak, "Aisyah");
});

uji("Persetujuan versi lama ditandai perlu disetujui ulang", () => {
  const baik = P.buatProfil({ namaAnak: "Aisyah", nomorWa: "", setuju: true }).profil;
  const lama = { ...baik, persetujuan: { versi: P.VERSI_PERSETUJUAN - 1, waktu: baik.persetujuan.waktu } };
  assert.strictEqual(P.validasiProfil(lama).perluPersetujuanUlang, true);
  assert.strictEqual(P.validasiProfil(baik).perluPersetujuanUlang, false);
});

uji("Fungsi validasi murni: masukan tidak diubah, API dibekukan", () => {
  const isian = { namaAnak: " Aisyah ", nomorWa: "0812 3456 7890", setuju: true };
  const salinan = JSON.stringify(isian);
  P.buatProfil(isian); P.periksaNama(isian.namaAnak); P.periksaNomorWa(isian.nomorWa);
  assert.strictEqual(JSON.stringify(isian), salinan);
  assert.ok(Object.isFrozen(P));
  assert.ok(P.TEKS_PERSETUJUAN.includes("hanya di browser perangkat ini"));
});

uji("Tidak ada data pribadi (nomor ponsel) di berkas JavaScript publik", () => {
  const berkas = fs.readdirSync(path.join(AKAR, "js")).filter((f) => f.endsWith(".js") && !/backup|before/.test(f));
  const pola = /(?:\+?62|\b0)8[1-9]\d{7,10}\b/;
  const temuan = berkas.filter((f) => pola.test(fs.readFileSync(path.join(AKAR, "js", f), "utf8")));
  assert.deepStrictEqual(temuan, [], "nomor ponsel ditemukan di: " + temuan.join(", "));
});

console.log(`\n✓ ${lolos} uji lolos.`);
