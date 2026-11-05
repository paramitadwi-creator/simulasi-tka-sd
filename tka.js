/*
 * TKA — namespace bersama untuk semua mata pelajaran.
 * Dimuat pertama kali oleh latihan.html. Tidak bergantung pada library luar
 * dan sengaja memakai <script> biasa (bukan ES module) agar tetap berjalan
 * ketika file dibuka langsung (file://) maupun di GitHub Pages.
 */
(function (global) {
    'use strict';

    var TKA = global.TKA || {};

    /* ------------------------------------------------------------------
     * Konfigurasi sesi — sama untuk ketiga mata pelajaran.
     * ------------------------------------------------------------------ */
    TKA.CONFIG = {
        jumlahSoal: 35,
        durasiDetik: 90 * 60,
        peringatanDetik: [15 * 60, 5 * 60],
        // Komposisi per sesi: 25 PG + 10 PGK (PGK campuran: pilih-banyak & Benar/Salah)
        komposisiBentuk: { PG: 25, PGK: 10 },
        komposisiPGK: { MCMA: 6, BS: 4 },          // target lunak di dalam 10 PGK
        komposisiKesulitan: { mudah: 7, sedang: 14, sulit: 14 },
        minPerKompetensi: 2,
        batasDikuasai: 75,                          // sama dengan Peta Belajar sekolah
        batasBerkembang: 50
    };

    /* ------------------------------------------------------------------
     * Daftar mata pelajaran & file data bank soalnya.
     * Menambah mapel baru cukup dengan menambah entri di sini.
     * ------------------------------------------------------------------ */
    TKA.MAPEL = {
        bin: {
            kode: 'bin',
            nama: 'Bahasa Indonesia',
            ikon: 'Aa',
            kelasIkon: 'language',
            deskripsi: 'Latihan literasi membaca: informasi tersurat dan tersirat, ide pokok, ' +
                'makna kata, hubungan antarbagian teks, fakta dan opini, hingga evaluasi isi bacaan.',
            fileData: [
                'js/data/bin/kompetensi.js',
                'js/data/bin/bacaan-1.js',
                'js/data/bin/bacaan-2.js',
                'js/data/bin/soal-1.js',
                'js/data/bin/soal-2.js',
                'js/data/bin/soal-3.js',
                'js/data/bin/soal-4.js'
            ]
        },
        mat: {
            kode: 'mat',
            nama: 'Matematika',
            ikon: '∑',
            kelasIkon: 'math',
            deskripsi: 'Latihan numerasi, operasi hitung, pecahan, geometri, pengukuran, dan data.',
            fileData: []
        },
        ipas: {
            kode: 'ipas',
            nama: 'IPAS',
            ikon: '🌍',
            kelasIkon: 'science',
            deskripsi: 'Latihan ilmu pengetahuan alam dan sosial: makhluk hidup, energi, bumi, ' +
                'lingkungan, sejarah, dan kehidupan masyarakat.',
            fileData: []
        }
    };

    /* ------------------------------------------------------------------
     * Registri bank soal. File data memanggil fungsi-fungsi di bawah ini.
     * ------------------------------------------------------------------ */
    TKA.bank = {};

    function bankMapel(kode) {
        if (!TKA.bank[kode]) {
            TKA.bank[kode] = { kompetensi: [], bacaan: {}, soal: [], versi: '' };
        }
        return TKA.bank[kode];
    }

    TKA.daftarKompetensi = function (kode, daftar, versi) {
        var b = bankMapel(kode);
        b.kompetensi = daftar;
        if (versi) { b.versi = versi; }
    };

    TKA.tambahBacaan = function (kode, daftar) {
        var b = bankMapel(kode);
        daftar.forEach(function (x) { b.bacaan[x.id] = x; });
    };

    TKA.tambahSoal = function (kode, daftar) {
        var b = bankMapel(kode);
        daftar.forEach(function (s) { b.soal.push(s); });
    };

    TKA.ambilBank = function (kode) { return bankMapel(kode); };

    /** Peta id → soal untuk pencarian cepat. */
    TKA.indeksSoal = function (kode) {
        var b = bankMapel(kode);
        if (!b._indeks || b._indeksN !== b.soal.length) {
            b._indeks = {};
            b.soal.forEach(function (s) { b._indeks[s.id] = s; });
            b._indeksN = b.soal.length;
        }
        return b._indeks;
    };

    /** Memuat file data satu per satu (urutan dijaga). */
    TKA.muatData = function (kode, selesai) {
        var m = TKA.MAPEL[kode];
        if (!m) { selesai(new Error('Mata pelajaran tidak dikenal')); return; }
        var daftar = m.fileData.slice();
        (function berikut() {
            if (!daftar.length) { selesai(null); return; }
            var src = daftar.shift();
            var el = document.createElement('script');
            el.src = src;
            el.onload = berikut;
            el.onerror = function () { selesai(new Error('Gagal memuat ' + src)); };
            document.head.appendChild(el);
        })();
    };

    /* ------------------------------------------------------------------
     * Utilitas kecil.
     * ------------------------------------------------------------------ */
    TKA.util = {
        acak: function (arr) {
            var a = arr.slice();
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var t = a[i]; a[i] = a[j]; a[j] = t;
            }
            return a;
        },
        idUnik: function (awalan) {
            return (awalan || 'id') + '-' + Date.now().toString(36) + '-' +
                Math.random().toString(36).slice(2, 7);
        },
        escape: function (s) {
            return String(s == null ? '' : s)
                .replace(/&/g, '&amp;').replace(/</g, '&lt;')
                .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        },
        hitungKata: function (teks) {
            var t = String(teks || '').trim();
            return t ? t.split(/\s+/).length : 0;
        },
        formatDurasi: function (detik) {
            detik = Math.max(0, Math.round(detik));
            var j = Math.floor(detik / 3600);
            var m = Math.floor((detik % 3600) / 60);
            var d = detik % 60;
            var dua = function (n) { return (n < 10 ? '0' : '') + n; };
            return (j ? j + ':' + dua(m) : dua(m)) + ':' + dua(d);
        },
        formatDurasiTeks: function (detik) {
            detik = Math.max(0, Math.round(detik));
            var m = Math.floor(detik / 60);
            var d = detik % 60;
            return m + ' menit ' + d + ' detik';
        },
        formatTanggal: function (iso) {
            try {
                return new Date(iso).toLocaleString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });
            } catch (e) { return iso; }
        },
        formatTanggalPendek: function (iso) {
            try {
                return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            } catch (e) { return iso; }
        },
        angka: function (n, desimal) {
            var f = Math.pow(10, desimal == null ? 1 : desimal);
            return (Math.round(n * f) / f).toLocaleString('id-ID');
        }
    };

    global.TKA = TKA;
})(window);
