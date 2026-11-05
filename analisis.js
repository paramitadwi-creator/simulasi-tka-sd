/*
 * Analisis kompetensi.
 * Semua angka berasal dari jawaban aktual. Kompetensi yang tidak diuji
 * tidak diberi persentase; kompetensi yang hanya diuji 1 soal ditandai
 * "data terbatas".
 */
(function (TKA) {
    'use strict';

    function status(persen) {
        if (persen >= TKA.CONFIG.batasDikuasai) { return 'Dikuasai'; }
        if (persen >= TKA.CONFIG.batasBerkembang) { return 'Berkembang'; }
        return 'Perlu penguatan';
    }

    /** Daftar kompetensi yang diuji, diurutkan sesuai urutan resmi daftar kompetensi. */
    function daftarKompetensi(hasil, kompetensi) {
        var out = [];
        kompetensi.forEach(function (k) {
            var x = hasil.perKompetensi[k.kode];
            if (!x) { return; }
            out.push({
                kode: k.kode,
                nama: k.nama,
                level: k.level,
                benar: x.benar,
                total: x.total,
                persen: x.persen,
                status: status(x.persen),
                terbatas: x.total < 2
            });
        });
        return out;
    }

    /** Urutan prioritas: persen terendah dulu; bila sama, yang salahnya lebih banyak. */
    function urutPrioritas(list) {
        return list.slice().sort(function (a, b) {
            if (a.persen !== b.persen) { return a.persen - b.persen; }
            return (b.total - b.benar) - (a.total - a.benar);
        });
    }

    function lemah(list) {
        return urutPrioritas(list.filter(function (x) { return x.persen < TKA.CONFIG.batasDikuasai; }));
    }

    function tigaTerlemah(list) {
        return lemah(list).slice(0, 3);
    }

    /**
     * Membandingkan dua hasil (mis. Sesi 1 → Sesi 2) hanya untuk kompetensi
     * yang diuji di keduanya.
     */
    function bandingkan(hasilA, hasilB, kompetensi) {
        var a = {}, b = {};
        daftarKompetensi(hasilA, kompetensi).forEach(function (x) { a[x.kode] = x; });
        daftarKompetensi(hasilB, kompetensi).forEach(function (x) { b[x.kode] = x; });
        var baris = [];
        kompetensi.forEach(function (k) {
            if (a[k.kode] && b[k.kode]) {
                baris.push({
                    kode: k.kode, nama: k.nama,
                    sebelum: a[k.kode].persen, sesudah: b[k.kode].persen,
                    nSebelum: a[k.kode].total, nSesudah: b[k.kode].total,
                    selisih: b[k.kode].persen - a[k.kode].persen
                });
            }
        });
        return {
            nilaiSebelum: hasilA.nilai,
            nilaiSesudah: hasilB.nilai,
            selisihNilai: Math.round((hasilB.nilai - hasilA.nilai) * 10) / 10,
            baris: baris,
            meningkat: baris.filter(function (x) { return x.selisih > 0; }),
            tetap: baris.filter(function (x) { return x.selisih === 0; }),
            menurun: baris.filter(function (x) { return x.selisih < 0; }),
            masihLemah: baris.filter(function (x) { return x.sesudah < TKA.CONFIG.batasDikuasai; })
        };
    }

    /** Penguasaan kumulatif seluruh riwayat (dipakai halaman riwayat). */
    function kumulatif(riwayat, kompetensi) {
        var agg = {};
        riwayat.forEach(function (p) {
            if (!p.hasil) { return; }
            Object.keys(p.hasil.perKompetensi).forEach(function (kode) {
                var x = p.hasil.perKompetensi[kode];
                var g = agg[kode] || (agg[kode] = { benar: 0, total: 0 });
                g.benar += x.benar; g.total += x.total;
            });
        });
        return kompetensi.filter(function (k) { return agg[k.kode]; }).map(function (k) {
            var g = agg[k.kode];
            var persen = Math.round((g.benar / g.total) * 100);
            return { kode: k.kode, nama: k.nama, benar: g.benar, total: g.total, persen: persen, status: status(persen) };
        });
    }

    TKA.analisis = {
        status: status,
        daftarKompetensi: daftarKompetensi,
        urutPrioritas: urutPrioritas,
        lemah: lemah,
        tigaTerlemah: tigaTerlemah,
        bandingkan: bandingkan,
        kumulatif: kumulatif
    };
})(window.TKA);
