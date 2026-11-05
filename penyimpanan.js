/*
 * Penyimpanan riwayat belajar (localStorage).
 *
 * Struktur kunci (berversi, dipisah per mapel — mudah dipindah ke database):
 *   tka.v1.profil               { nama }
 *   tka.v1.<mapel>.riwayat      [ Pengerjaan, ... ]   (tidak pernah ditimpa, hanya ditambah)
 *   tka.v1.<mapel>.aktif        Pengerjaan yang sedang berjalan (untuk pemulihan setelah refresh)
 *   tka.v1.<mapel>.pemakaian    { hitung: { idSoal: n }, kombinasi: [ sidik, ... ] }
 *
 * Bentuk satu "Pengerjaan" didokumentasikan di js/core/ujian.js (buatPengerjaan).
 */
(function (TKA) {
    'use strict';

    var AWALAN = 'tka.v1.';
    var cadangan = {};          // dipakai bila localStorage tidak tersedia
    var tersedia = (function () {
        try {
            var k = AWALAN + '__uji';
            window.localStorage.setItem(k, '1');
            window.localStorage.removeItem(k);
            return true;
        } catch (e) { return false; }
    })();

    function baca(kunci, bawaan) {
        try {
            var mentah = tersedia ? window.localStorage.getItem(AWALAN + kunci) : cadangan[kunci];
            if (mentah == null) { return bawaan; }
            return JSON.parse(mentah);
        } catch (e) {
            return bawaan;
        }
    }

    function tulis(kunci, nilai) {
        var mentah = JSON.stringify(nilai);
        try {
            if (tersedia) { window.localStorage.setItem(AWALAN + kunci, mentah); }
            else { cadangan[kunci] = mentah; }
            return true;
        } catch (e) {
            cadangan[kunci] = mentah;
            return false;
        }
    }

    function hapus(kunci) {
        try {
            if (tersedia) { window.localStorage.removeItem(AWALAN + kunci); }
        } catch (e) { /* abaikan */ }
        delete cadangan[kunci];
    }

    TKA.simpan = {
        tersedia: tersedia,

        /* ---- profil ---- */
        profil: function () { return baca('profil', { nama: '' }); },
        simpanProfil: function (p) { return tulis('profil', p); },

        /* ---- riwayat ---- */
        riwayat: function (mapel) { return baca(mapel + '.riwayat', []); },
        tambahRiwayat: function (mapel, pengerjaan) {
            var r = baca(mapel + '.riwayat', []);
            // jangan timpa: bila id sudah ada (mis. submit ganda), abaikan
            for (var i = 0; i < r.length; i++) {
                if (r[i].id === pengerjaan.id) { return true; }
            }
            r.push(pengerjaan);
            return tulis(mapel + '.riwayat', r);
        },
        cariRiwayat: function (mapel, id) {
            var r = baca(mapel + '.riwayat', []);
            for (var i = 0; i < r.length; i++) { if (r[i].id === id) { return r[i]; } }
            return null;
        },

        /* ---- pengerjaan aktif ---- */
        aktif: function (mapel) { return baca(mapel + '.aktif', null); },
        simpanAktif: function (mapel, p) { return tulis(mapel + '.aktif', p); },
        hapusAktif: function (mapel) { hapus(mapel + '.aktif'); },

        /* ---- pemakaian soal & kombinasi ---- */
        pemakaian: function (mapel) {
            var p = baca(mapel + '.pemakaian', null);
            if (!p || typeof p !== 'object') { p = {}; }
            if (!p.hitung) { p.hitung = {}; }
            if (!p.kombinasi) { p.kombinasi = []; }
            return p;
        },
        catatPemakaian: function (mapel, idSoal, sidik) {
            var p = TKA.simpan.pemakaian(mapel);
            idSoal.forEach(function (id) { p.hitung[id] = (p.hitung[id] || 0) + 1; });
            if (sidik && p.kombinasi.indexOf(sidik) === -1) { p.kombinasi.push(sidik); }
            return tulis(mapel + '.pemakaian', p);
        }
    };
})(window.TKA);
