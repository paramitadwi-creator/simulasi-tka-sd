/*
 * Algoritma pengambilan soal.
 *
 * Sesi 1 (Latihan)
 *   - 35 soal tanpa duplikat, komposisi dikunci: 25 PG + 10 PGK,
 *     kesulitan 7 mudah / 14 sedang / 14 sulit.
 *   - Setiap kompetensi minimal 2 soal (dasar data analisis).
 *   - Soal yang paling jarang dipakai didahulukan (pemakaian merata),
 *     di antara yang sama jarangnya diacak.
 *   - Kombinasi 35 soal yang pernah dipakai ditolak dan diambil ulang.
 *
 * Sesi 2 (Penguatan Kelemahan)
 *   - Berdasarkan hasil Sesi 1 terakhir. Soal Sesi 1 itu tidak dipakai lagi.
 *   - Kompetensi < 75% diprioritaskan (terendah dulu); masing-masing minimal
 *     2 soal, lalu jatah tambahan untuk yang terlemah.
 *   - Sisa slot diisi kompetensi lain mulai dari persentase terendah.
 *   - Komposisi PG/PGK tetap dijaga; kesulitan divariasikan.
 *   - Bila semua kompetensi sudah dikuasai → mode pengayaan (dominan sulit).
 */
(function (TKA) {
    'use strict';

    var C = TKA.CONFIG;
    var util = TKA.util;

    function grup(s) { return s.bentuk === 'PG' ? 'PG' : 'PGK'; }

    function sidik(ids) { return ids.slice().sort().join('|'); }

    /** Urutkan soal terpilih: soal yang berbagi bacaan diletakkan berdampingan. */
    function urutkanTampil(terpilih) {
        var kelompok = {}, urutan = [];
        util.acak(terpilih).forEach(function (s) {
            var kunci = s.bacaan ? [].concat(s.bacaan).join('+') : s.id;
            if (!kelompok[kunci]) { kelompok[kunci] = []; urutan.push(kunci); }
            kelompok[kunci].push(s);
        });
        var out = [];
        urutan.forEach(function (k) {
            kelompok[k].sort(function (a, b) { return a.id < b.id ? -1 : 1; });
            out = out.concat(kelompok[k]);
        });
        return out.map(function (s) { return s.id; });
    }

    /**
     * Inti pemilihan bertahap.
     * opsi.fase       : [{ kompetensi: ['K01',..] | null, maks: n }]
     * opsi.kesulitan  : target { mudah, sedang, sulit }
     * opsi.kesulitanKeras: true → target kesulitan tidak boleh dilampaui
     * opsi.bentukKeras   : true → 25 PG / 10 PGK tidak boleh dilampaui
     */
    function susun(kandidat, hitung, opsi) {
        var dipilih = [], idDipilih = {};
        var nBentuk = { PG: 0, PGK: 0 }, nSub = { MCMA: 0, BS: 0 };
        var nSulit = { mudah: 0, sedang: 0, sulit: 0 };
        var acakBobot = {};
        kandidat.forEach(function (s) { acakBobot[s.id] = Math.random(); });

        function biaya(s) {
            var g = grup(s);
            if (nBentuk[g] >= C.komposisiBentuk[g] && opsi.bentukKeras) { return Infinity; }
            var b = (hitung[s.id] || 0) * 10 + acakBobot[s.id];
            if (nBentuk[g] >= C.komposisiBentuk[g]) { b += 40; }
            if (g === 'PGK' && nSub[s.bentuk] >= C.komposisiPGK[s.bentuk]) { b += 3; }
            if (nSulit[s.kesulitan] >= opsi.kesulitan[s.kesulitan]) {
                if (opsi.kesulitanKeras) { return Infinity; }
                b += 20;
            }
            return b;
        }

        function ambil(s) {
            dipilih.push(s); idDipilih[s.id] = true;
            nBentuk[grup(s)]++;
            if (s.bentuk !== 'PG') { nSub[s.bentuk]++; }
            nSulit[s.kesulitan]++;
        }

        opsi.fase.forEach(function (f) {
            var diambil = 0;
            while (diambil < f.maks && dipilih.length < C.jumlahSoal) {
                var terbaik = null, bTerbaik = Infinity;
                for (var i = 0; i < kandidat.length; i++) {
                    var s = kandidat[i];
                    if (idDipilih[s.id]) { continue; }
                    if (f.kompetensi && f.kompetensi.indexOf(s.kompetensi) === -1) { continue; }
                    var b = biaya(s);
                    if (b < bTerbaik) { bTerbaik = b; terbaik = s; }
                }
                if (!terbaik) { break; }
                ambil(terbaik);
                diambil++;
            }
        });
        return dipilih;
    }

    function cukup(dipilih) { return dipilih.length === C.jumlahSoal; }

    /** Setiap kompetensi minimal C.minPerKompetensi soal. */
    function cakupKompetensi(dipilih, kompetensi) {
        var n = {};
        dipilih.forEach(function (s) { n[s.kompetensi] = (n[s.kompetensi] || 0) + 1; });
        return kompetensi.every(function (k) { return (n[k.kode] || 0) >= C.minPerKompetensi; });
    }

    function pas(dipilih) {
        var n = { PG: 0, PGK: 0 };
        dipilih.forEach(function (s) { n[grup(s)]++; });
        return n.PG === C.komposisiBentuk.PG && n.PGK === C.komposisiBentuk.PGK;
    }

    /* ==================================================================
     * SESI 1
     * ================================================================== */
    function pilihSesi1(kode) {
        var bank = TKA.ambilBank(kode);
        var pem = TKA.simpan.pemakaian(kode);
        var catatan = [];

        if (bank.soal.length < C.jumlahSoal) {
            return { galat: 'Bank soal belum cukup (' + bank.soal.length + ' soal).' };
        }

        var cadangan = null;
        for (var coba = 0; coba < 300; coba++) {
            var urutanKomp = util.acak(bank.kompetensi.map(function (k) { return k.kode; }));
            var fase = urutanKomp.map(function (k) { return { kompetensi: [k], maks: C.minPerKompetensi }; });
            fase.push({ kompetensi: null, maks: C.jumlahSoal });

            var hasil = susun(bank.soal, pem.hitung, {
                fase: fase,
                kesulitan: C.komposisiKesulitan,
                kesulitanKeras: coba < 250,
                bentukKeras: true
            });
            if (!cukup(hasil) || !cakupKompetensi(hasil, bank.kompetensi)) { continue; }
            var ids = hasil.map(function (s) { return s.id; });
            if (pem.kombinasi.indexOf(sidik(ids)) !== -1) {
                if (!cadangan) { cadangan = hasil; }
                continue;
            }
            return { soalIds: urutkanTampil(hasil), mode: 'latihan', fokus: [], catatan: catatan };
        }
        if (cadangan) {
            catatan.push('Semua kombinasi yang dicoba pernah dipakai; sistem memakai kombinasi terdekat.');
            return { soalIds: urutkanTampil(cadangan), mode: 'latihan', fokus: [], catatan: catatan };
        }
        return { galat: 'Gagal menyusun paket soal. Coba muat ulang halaman.' };
    }

    /* ==================================================================
     * SESI 2
     * ================================================================== */
    function pilihSesi2(kode, dasar) {
        var bank = TKA.ambilBank(kode);
        var pem = TKA.simpan.pemakaian(kode);
        var catatan = [];
        var A = TKA.analisis;

        var daftar = A.daftarKompetensi(dasar.hasil, bank.kompetensi);
        var lemah = A.lemah(daftar);
        var kecuali = {};
        dasar.soalIds.forEach(function (id) { kecuali[id] = true; });

        var tersedia = bank.soal.filter(function (s) { return !kecuali[s.id]; });
        if (tersedia.length < C.jumlahSoal) {
            catatan.push('Soal baru yang tersisa kurang dari 35, sehingga sebagian soal Sesi 1 dipakai ulang.');
            tersedia = bank.soal.slice();
        }

        function kapasitas(k) {
            return tersedia.filter(function (s) { return s.kompetensi === k; }).length;
        }

        var mode, fase = [], target, fokus;

        if (lemah.length) {
            mode = 'penguatan';
            fokus = lemah.map(function (x) { return x.kode; });
            // 1) minimal 2 soal untuk setiap kompetensi lemah (urutan prioritas)
            lemah.forEach(function (x) { fase.push({ kompetensi: [x.kode], maks: 2 }); });
            // 2) jatah tambahan: tiga terlemah dulu, sampai kapasitas soal barunya habis
            lemah.forEach(function (x, i) {
                fase.push({ kompetensi: [x.kode], maks: i < 3 ? 6 : 3 });
            });
            // 3) sisa slot: kompetensi lain, dari persentase terendah
            var lain = A.urutPrioritas(daftar.filter(function (x) { return fokus.indexOf(x.kode) === -1; }));
            var belumDiuji = bank.kompetensi.filter(function (k) {
                return !daftar.some(function (x) { return x.kode === k.kode; });
            });
            lain.forEach(function (x) { fase.push({ kompetensi: [x.kode], maks: 2 }); });
            belumDiuji.forEach(function (k) { fase.push({ kompetensi: [k.kode], maks: 2 }); });
            fase.push({ kompetensi: null, maks: C.jumlahSoal });
            target = C.komposisiKesulitan;

            lemah.slice(0, 3).forEach(function (x) {
                var cap = kapasitas(x.kode);
                if (cap < 4) {
                    catatan.push('Kompetensi "' + x.nama + '" hanya memiliki ' + cap +
                        ' soal baru di bank soal; sisa slot diisi kompetensi prioritas berikutnya.');
                }
            });
        } else {
            mode = 'pengayaan';
            fokus = [];
            catatan.push('Semua kompetensi pada Sesi 1 sudah dikuasai (≥ ' + C.batasDikuasai +
                '%). Sesi ini berisi latihan pengayaan dengan soal yang lebih menantang.');
            A.urutPrioritas(daftar).forEach(function (x) { fase.push({ kompetensi: [x.kode], maks: 2 }); });
            fase.push({ kompetensi: null, maks: C.jumlahSoal });
            target = { mudah: 2, sedang: 11, sulit: 22 };
        }

        var terbaik = null;
        for (var coba = 0; coba < 120; coba++) {
            var hasil = susun(tersedia, pem.hitung, {
                fase: fase, kesulitan: target,
                kesulitanKeras: false,
                bentukKeras: coba < 100
            });
            if (!cukup(hasil)) { continue; }
            var ids = hasil.map(function (s) { return s.id; });
            var baru = pem.kombinasi.indexOf(sidik(ids)) === -1;
            if (baru && pas(hasil)) { terbaik = hasil; break; }
            if (!terbaik) { terbaik = hasil; }
        }
        if (!terbaik) { return { galat: 'Gagal menyusun soal penguatan.' }; }
        if (!pas(terbaik)) {
            catatan.push('Komposisi 25 PG / 10 PGK tidak dapat dipenuhi penuh dari soal yang tersedia.');
        }
        return { soalIds: urutkanTampil(terbaik), mode: mode, fokus: fokus, catatan: catatan };
    }

    TKA.pemilih = {
        sidik: sidik,
        pilihSesi1: pilihSesi1,
        pilihSesi2: pilihSesi2
    };
})(window.TKA);
