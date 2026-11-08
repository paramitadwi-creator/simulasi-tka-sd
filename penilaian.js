/*
 * Penilaian otomatis.
 *
 * Bentuk soal:
 *   PG    — pilihan ganda, satu jawaban.          kunci: indeks (number)
 *   MCMA  — PGK pilih semua yang benar.           kunci: [indeks, ...]
 *   BS    — PGK Benar/Salah per pernyataan.       kunci: [true|false, ...]
 * PGK dinilai exact match: benar hanya bila seluruh pilihan sama dengan kunci.
 */
(function (TKA) {
    'use strict';

    var HURUF = ['A', 'B', 'C', 'D', 'E'];

    function kelompokBentuk(bentuk) { return bentuk === 'PG' ? 'PG' : 'PGK'; }

    function sudahDijawab(soal, jwb) {
        if (jwb == null) { return false; }
        if (soal.bentuk === 'PG') { return typeof jwb === 'number'; }
        if (soal.bentuk === 'MCMA') { return Array.isArray(jwb) && jwb.length > 0; }
        if (soal.bentuk === 'BS') {
            return Array.isArray(jwb) && jwb.some(function (x) { return x === true || x === false; });
        }
        return false;
    }

    function lengkap(soal, jwb) {
        if (soal.bentuk === 'BS') {
            return Array.isArray(jwb) && jwb.length === soal.opsi.length &&
                jwb.every(function (x) { return x === true || x === false; });
        }
        return sudahDijawab(soal, jwb);
    }

    function cekBenar(soal, jwb) {
        if (!sudahDijawab(soal, jwb)) { return false; }
        if (soal.bentuk === 'PG') { return jwb === soal.kunci; }
        if (soal.bentuk === 'MCMA') {
            var a = jwb.slice().sort(), b = soal.kunci.slice().sort();
            if (a.length !== b.length) { return false; }
            for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) { return false; } }
            return true;
        }
        if (soal.bentuk === 'BS') {
            if (!lengkap(soal, jwb)) { return false; }
            for (var j = 0; j < soal.kunci.length; j++) {
                if (jwb[j] !== soal.kunci[j]) { return false; }
            }
            return true;
        }
        return false;
    }

    function teksJawaban(soal, jwb) {
        if (!sudahDijawab(soal, jwb)) { return 'Tidak dijawab'; }
        if (soal.bentuk === 'PG') { return HURUF[jwb]; }
        if (soal.bentuk === 'MCMA') {
            return jwb.slice().sort().map(function (i) { return HURUF[i]; }).join(', ');
        }
        return jwb.map(function (x, i) {
            return (i + 1) + ': ' + (x === true ? 'Benar' : x === false ? 'Salah' : '–');
        }).join('  ·  ');
    }

    function teksKunci(soal) { return teksJawaban(soal, soal.kunci); }

    function kategori(nilai) {
        if (nilai >= 85) { return 'Sangat Baik'; }
        if (nilai >= 70) { return 'Baik'; }
        if (nilai >= 55) { return 'Cukup'; }
        return 'Perlu Penguatan';
    }

    /**
     * Menilai satu pengerjaan.
     * @returns {object} ringkasan hasil; disimpan apa adanya di riwayat.
     */
    function nilaiPengerjaan(pengerjaan, indeks) {
        var rinci = [];
        var benar = 0, kosong = 0;
        var perBentuk = {
            PG: { benar: 0, total: 0 },
            PGK: { benar: 0, total: 0 },
            MCMA: { benar: 0, total: 0 },
            BS: { benar: 0, total: 0 }
        };
        var perKompetensi = {};
        var perKesulitan = {};

        pengerjaan.soalIds.forEach(function (id) {
            var s = indeks[id];
            if (!s) { return; }
            var jwb = pengerjaan.jawaban[id];
            var ok = cekBenar(s, jwb);
            var dijawab = sudahDijawab(s, jwb);
            if (ok) { benar++; }
            if (!dijawab) { kosong++; }

            var g = kelompokBentuk(s.bentuk);
            perBentuk[g].total++;
            if (ok) { perBentuk[g].benar++; }
            if (s.bentuk !== g) {
                perBentuk[s.bentuk].total++;
                if (ok) { perBentuk[s.bentuk].benar++; }
            }

            var k = perKompetensi[s.kompetensi] || (perKompetensi[s.kompetensi] = { benar: 0, total: 0 });
            k.total++; if (ok) { k.benar++; }

            var d = perKesulitan[s.kesulitan] || (perKesulitan[s.kesulitan] = { benar: 0, total: 0 });
            d.total++; if (ok) { d.benar++; }

            rinci.push({ id: id, benar: ok, dijawab: dijawab });
        });

        var total = rinci.length;
        var nilai = total ? Math.round((benar / total) * 1000) / 10 : 0;
        Object.keys(perKompetensi).forEach(function (kode) {
            var x = perKompetensi[kode];
            x.persen = Math.round((x.benar / x.total) * 100);
        });

        return {
            total: total,
            benar: benar,
            salah: total - benar,
            kosong: kosong,
            nilai: nilai,
            persenTepat: total ? Math.round((benar / total) * 100) : 0,
            kategori: kategori(nilai),
            perBentuk: perBentuk,
            perKompetensi: perKompetensi,
            perKesulitan: perKesulitan,
            rinci: rinci
        };
    }

    TKA.nilai = {
        HURUF: HURUF,
        kelompokBentuk: kelompokBentuk,
        sudahDijawab: sudahDijawab,
        lengkap: lengkap,
        cekBenar: cekBenar,
        teksJawaban: teksJawaban,
        teksKunci: teksKunci,
        kategori: kategori,
        nilaiPengerjaan: nilaiPengerjaan
    };
})(window.TKA);
