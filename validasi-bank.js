/*
 * Validasi bank soal & algoritma pemilihan (dijalankan dengan Node.js):
 *   node tools/validasi-bank.js [bin]
 * Memeriksa jumlah kata bacaan, kelengkapan field, distribusi kesulitan,
 * bentuk soal, kompetensi, sebaran kunci, lalu menyimulasikan pemilihan soal.
 */
'use strict';
const path = require('path');
const kode = process.argv[2] || 'bin';
const akar = __dirname;

// Lingkungan minimal agar file browser dapat dimuat di Node
const simpanan = {};
global.window = global;
global.localStorage = {
    getItem: k => (k in simpanan ? simpanan[k] : null),
    setItem: (k, v) => { simpanan[k] = String(v); },
    removeItem: k => { delete simpanan[k]; }
};
['tka', 'penyimpanan', 'penilaian', 'analisis', 'pemilih-soal', 'ujian']
    .forEach(f => require(path.join(akar, f + '.js')));
TKA.MAPEL[kode].fileData.forEach(f => require(path.join(akar, f)));

const bank = TKA.ambilBank(kode);
const galat = [], info = [];
const hitung = (arr, f) => arr.reduce((m, x) => { const k = f(x); m[k] = (m[k] || 0) + 1; return m; }, {});

/* ---------- bacaan ---------- */
const dipakai = new Set();
bank.soal.forEach(s => [].concat(s.bacaan || []).forEach(b => dipakai.add(b)));
Object.values(bank.bacaan).forEach(b => {
    const n = TKA.util.hitungKata(b.paragraf.join(' '));
    if (n < 150 || n > 300) galat.push(`Bacaan ${b.id}: ${n} kata (harus 150–300)`);
    if (!dipakai.has(b.id)) galat.push(`Bacaan ${b.id} tidak dipakai soal mana pun`);
    if (!b.jenis || !b.judul) galat.push(`Bacaan ${b.id}: jenis/judul kosong`);
});
const kata = Object.values(bank.bacaan).map(b => TKA.util.hitungKata(b.paragraf.join(' ')));
info.push(`Bacaan: ${kata.length} teks, ${Math.min(...kata)}–${Math.max(...kata)} kata (rata-rata ${Math.round(kata.reduce((a, b) => a + b) / kata.length)})`);
info.push('Jenis teks: ' + JSON.stringify(hitung(Object.values(bank.bacaan), b => b.jenis.split(' ')[0])));

/* ---------- soal ---------- */
const id = new Set();
const kodeKomp = new Set(bank.kompetensi.map(k => k.kode));
bank.soal.forEach(s => {
    if (id.has(s.id)) galat.push(`ID ganda: ${s.id}`); id.add(s.id);
    ['id', 'bentuk', 'kompetensi', 'kesulitan', 'pertanyaan', 'opsi', 'pembahasan'].forEach(f => {
        if (s[f] == null || s[f] === '') galat.push(`${s.id}: field ${f} kosong`);
    });
    if (s.kunci == null) galat.push(`${s.id}: kunci kosong`);
    [].concat(s.bacaan || []).forEach(b => { if (!bank.bacaan[b]) galat.push(`${s.id}: bacaan ${b} tidak ada`); });
    if (!kodeKomp.has(s.kompetensi)) galat.push(`${s.id}: kompetensi ${s.kompetensi} tidak dikenal`);
    if (['mudah', 'sedang', 'sulit'].indexOf(s.kesulitan) < 0) galat.push(`${s.id}: kesulitan tidak valid`);
    if (s.bentuk === 'PG') {
        if (s.opsi.length !== 4) galat.push(`${s.id}: PG harus 4 opsi`);
        if (!(Number.isInteger(s.kunci) && s.kunci >= 0 && s.kunci < s.opsi.length)) galat.push(`${s.id}: kunci PG tidak valid`);
    } else if (s.bentuk === 'MCMA') {
        if (s.opsi.length < 4 || s.opsi.length > 5) galat.push(`${s.id}: PGK harus 4–5 opsi`);
        if (!Array.isArray(s.kunci) || s.kunci.length < 2 || s.kunci.some(k => k < 0 || k >= s.opsi.length) ||
            new Set(s.kunci).size !== s.kunci.length) galat.push(`${s.id}: kunci MCMA tidak valid`);
    } else if (s.bentuk === 'BS') {
        if (s.opsi.length < 4 || s.opsi.length > 5) galat.push(`${s.id}: BS harus 4–5 pernyataan`);
        if (!Array.isArray(s.kunci) || s.kunci.length !== s.opsi.length || s.kunci.some(k => typeof k !== 'boolean'))
            galat.push(`${s.id}: kunci BS tidak valid`);
        if (s.kunci.every(k => k) || s.kunci.every(k => !k)) galat.push(`${s.id}: kunci BS seragam`);
    } else galat.push(`${s.id}: bentuk ${s.bentuk} tidak dikenal`);
    // teks pilihan tidak boleh ganda
    if (new Set(s.opsi).size !== s.opsi.length) galat.push(`${s.id}: ada pilihan jawaban ganda`);
});

const target = {
    jumlah: 100,
    kesulitan: { mudah: 20, sedang: 40, sulit: 40 },
    bentuk: { PG: 70, MCMA: 18, BS: 12 }
};
if (bank.soal.length !== target.jumlah) galat.push(`Jumlah soal ${bank.soal.length} (target ${target.jumlah})`);
const kes = hitung(bank.soal, s => s.kesulitan), bnt = hitung(bank.soal, s => s.bentuk);
Object.keys(target.kesulitan).forEach(k => { if (kes[k] !== target.kesulitan[k]) galat.push(`Kesulitan ${k}: ${kes[k]} (target ${target.kesulitan[k]})`); });
Object.keys(target.bentuk).forEach(k => { if (bnt[k] !== target.bentuk[k]) galat.push(`Bentuk ${k}: ${bnt[k]} (target ${target.bentuk[k]})`); });
info.push('Kesulitan: ' + JSON.stringify(kes));
info.push('Bentuk: ' + JSON.stringify(bnt) + `  → PG ${bnt.PG} / PGK ${bnt.MCMA + bnt.BS}`);
const komp = hitung(bank.soal, s => s.kompetensi);
info.push('Per kompetensi: ' + bank.kompetensi.map(k => `${k.kode}=${komp[k.kode] || 0}`).join(' '));
bank.kompetensi.forEach(k => { if ((komp[k.kode] || 0) < 5) galat.push(`Kompetensi ${k.kode} hanya ${komp[k.kode] || 0} soal`); });
info.push('Sebaran kunci PG: ' + JSON.stringify(hitung(bank.soal.filter(s => s.bentuk === 'PG'), s => 'ABCD'[s.kunci])));
info.push('Jumlah jawaban benar MCMA: ' + JSON.stringify(hitung(bank.soal.filter(s => s.bentuk === 'MCMA'), s => s.kunci.length)));
info.push('Pola kunci BS: ' + JSON.stringify(hitung(bank.soal.filter(s => s.bentuk === 'BS'), s => s.kunci.map(k => k ? 'B' : 'S').join(''))));

/* ---------- simulasi pemilihan Sesi 1 ---------- */
const C = TKA.CONFIG;
const sidikSet = new Set();
let pakaiTotal = {};
const N = 6;
for (let i = 0; i < N; i++) {
    const r = TKA.pemilih.pilihSesi1(kode);
    if (r.galat) { galat.push('Sesi 1: ' + r.galat); break; }
    const idx = TKA.indeksSoal(kode);
    const sel = r.soalIds.map(x => idx[x]);
    if (new Set(r.soalIds).size !== C.jumlahSoal) galat.push(`Sesi 1 #${i + 1}: jumlah/duplikat salah`);
    const b = hitung(sel, s => s.bentuk === 'PG' ? 'PG' : 'PGK');
    const d = hitung(sel, s => s.kesulitan);
    const kp = hitung(sel, s => s.kompetensi);
    if (b.PG !== 25 || b.PGK !== 10) galat.push(`Sesi 1 #${i + 1}: komposisi bentuk ${JSON.stringify(b)}`);
    if (d.mudah !== 7 || d.sedang !== 14 || d.sulit !== 14) galat.push(`Sesi 1 #${i + 1}: kesulitan ${JSON.stringify(d)}`);
    bank.kompetensi.forEach(k => { if ((kp[k.kode] || 0) < 2) galat.push(`Sesi 1 #${i + 1}: ${k.kode} < 2 soal`); });
    const sd = TKA.pemilih.sidik(r.soalIds);
    if (sidikSet.has(sd)) galat.push(`Sesi 1 #${i + 1}: kombinasi berulang`); sidikSet.add(sd);
    const baru = r.soalIds.filter(x => !pakaiTotal[x]).length;
    info.push(`Simulasi Sesi 1 #${i + 1}: soal baru ${baru}/35, MCMA ${hitung(sel, s => s.bentuk).MCMA || 0}, BS ${hitung(sel, s => s.bentuk).BS || 0}`);
    r.soalIds.forEach(x => { pakaiTotal[x] = (pakaiTotal[x] || 0) + 1; });
    TKA.simpan.catatPemakaian(kode, r.soalIds, sd);
}
info.push(`Cakupan bank setelah ${N} sesi: ${Object.keys(pakaiTotal).length}/100 soal pernah muncul; pemakaian maks ${Math.max(...Object.values(pakaiTotal))}, min ${Math.min(...bank.soal.map(s => pakaiTotal[s.id] || 0))}`);

/* ---------- simulasi Sesi 2 (penguatan & pengayaan) ---------- */
function simulasiSesi2(label, benarFn) {
    const r1 = TKA.pemilih.pilihSesi1(kode);
    const p = { id: 'uji', sesi: 1, soalIds: r1.soalIds, jawaban: {} };
    const idx = TKA.indeksSoal(kode);
    r1.soalIds.forEach(x => { const s = idx[x]; p.jawaban[x] = benarFn(s) ? s.kunci : (s.bentuk === 'PG' ? (s.kunci + 1) % 4 : s.bentuk === 'MCMA' ? [] : s.kunci.map(k => !k)); });
    p.hasil = TKA.nilai.nilaiPengerjaan(p, idx);
    const r2 = TKA.pemilih.pilihSesi2(kode, p);
    if (r2.galat) { galat.push(label + ': ' + r2.galat); return; }
    const sel = r2.soalIds.map(x => idx[x]);
    const ulang = r2.soalIds.filter(x => r1.soalIds.indexOf(x) >= 0).length;
    if (ulang) galat.push(`${label}: ${ulang} soal Sesi 1 terulang`);
    if (new Set(r2.soalIds).size !== 35) galat.push(`${label}: jumlah/duplikat salah`);
    const b = hitung(sel, s => s.bentuk === 'PG' ? 'PG' : 'PGK');
    const d = hitung(sel, s => s.kesulitan);
    const fokus = r2.fokus.slice(0, 3);
    const nFokus = sel.filter(s => r2.fokus.indexOf(s.kompetensi) >= 0).length;
    info.push(`${label}: nilai S1 ${p.hasil.nilai}, mode ${r2.mode}, bentuk ${JSON.stringify(b)}, kesulitan ${JSON.stringify(d)}, ` +
        `soal kompetensi lemah ${nFokus}/35, 3 terlemah ${fokus.map(k => k + '=' + sel.filter(s => s.kompetensi === k).length).join(',')}`);
    if (b.PG !== 25 || b.PGK !== 10) galat.push(`${label}: komposisi bentuk ${JSON.stringify(b)}`);
    if (r2.catatan.length) info.push('   catatan: ' + r2.catatan.join(' | '));
}
const lemahUji = new Set(['K05', 'K10', 'K12', 'K13']);
simulasiSesi2('Sesi 2 (lemah K05,K10,K12,K13)', s => !lemahUji.has(s.kompetensi));
simulasiSesi2('Sesi 2 (semua benar → pengayaan)', () => true);
simulasiSesi2('Sesi 2 (semua salah)', () => false);

console.log(info.join('\n'));
console.log(galat.length ? '\n✗ ' + galat.length + ' masalah:\n- ' + galat.join('\n- ') : '\n✓ Semua pemeriksaan lolos.');
process.exit(galat.length ? 1 : 0);
