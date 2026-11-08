/*
 * Bank soal Matematika — bagian 1 (MAT-001 s.d. MAT-025):
 * M01 bilangan cacah, M02 bilangan bulat, M03 pecahan.
 * Gambar soal hanya memuat data yang diperlukan; gambarPembahasan berketerangan.
 */
(function (G) {
    'use strict';
    var svg = G.svg, teks = G.teks, tebal = G.tebal, garis = G.garis, kotak = G.kotak, lingkar = G.lingkar, jalur = G.jalur;
    var S = G.S;

    /* ---------- gambar khusus bagian ini ---------- */
    function kotakTelur(bahas) {
        var isi = kotak(20, 20, 250, 210, '#f3e2c4');
        for (var r = 0; r < 5; r++) {
            for (var c = 0; c < 6; c++) {
                isi += '<ellipse cx="' + (45 + c * 40) + '" cy="' + (45 + r * 40) + '" rx="14" ry="17" fill="#fffaf0" stroke="#b08a55" stroke-width="1.5"/>';
            }
        }
        if (bahas) {
            isi += teks(145, 252, '6 kolom', 13, tebal(G.BIRU)) + teks(296, 130, '5 baris', 13, 'text-anchor="start" ' + tebal(G.BIRU)) +
                teks(160, 280, '5 × 6 = 30 butir per kotak', 14, tebal(G.HIJAU));
        }
        return svg(360, bahas ? 295 : 245, isi);
    }

    function labelHarga(bahas) {
        var data = [['Buku tulis', 'Rp12.500'], ['Pensil', 'Rp3.750'], ['Penghapus', 'Rp2.250'], ['Penggaris', 'Rp4.500']];
        var isi = '';
        data.forEach(function (d, i) {
            var x = 10 + i * 120;
            isi += jalur('M' + (x + 18) + ' 20 L' + (x + 110) + ' 20 L' + (x + 110) + ' 90 L' + (x + 18) + ' 90 L' + x + ' 55 Z', '#fff4e5') +
                lingkar(x + 18, 55, 4, '#fff') + teks(x + 62, 48, d[0], 12, tebal()) + teks(x + 62, 72, d[1], 14, tebal(G.MERAH));
        });
        if (bahas) {
            isi += teks(250, 122, 'Buku + penggaris = Rp17.000 → kembali Rp8.000', 12) +
                teks(250, 142, 'Buku + 3 pensil + penghapus = Rp26.000 (tidak cukup)', 12) +
                teks(250, 162, '6 pensil = Rp22.500   ·   2 buku + penggaris = Rp29.500', 12) +
                teks(250, 182, 'Keempat barang = Rp23.000 → kembali Rp2.000', 12, tebal(G.HIJAU));
        }
        return svg(500, bahas ? 195 : 100, isi);
    }

    function nilaiTempat() {
        var kol = ['Juta', 'Ratus ribu', 'Puluh ribu', 'Ribu', 'Ratus', 'Puluh', 'Satuan'];
        var ang = ['4', '5', '0', '7', '3', '2', '0'];
        return G.tabel([62, 82, 82, 62, 62, 62, 62], [kol, ang], { sorot: function (i, j) { return i === 1 && (j === 1 || j === 3); } });
    }

    function papanTiket(bahas) {
        var isi = kotak(20, 10, 260, 110, '#edf1ff') + teks(150, 38, 'TIKET MUSEUM', 15, tebal()) +
            teks(150, 70, 'Dewasa  Rp15.000 / orang', 14) + teks(150, 98, 'Anak-anak  Rp8.000 / orang', 14);
        if (bahas) {
            isi += teks(150, 148, '5 dewasa = 5 × 15.000 = Rp75.000', 13) +
                teks(150, 170, 'Anak: 179.000 − 75.000 = Rp104.000', 13) +
                teks(150, 192, '104.000 : 8.000 = 13 anak', 14, tebal(G.HIJAU));
        }
        return svg(300, bahas ? 205 : 130, isi);
    }

    function termometer(bahas) {
        var x = 80, y0 = 230, sk = 9; // 1 derajat = 9 px; skala −10..10
        var py = function (v) { return y0 - (v + 10) * sk - 20; };
        var isi = '<rect x="' + (x - 12) + '" y="' + (py(10) - 10) + '" width="24" height="' + (py(-10) - py(10) + 20) + '" rx="12" fill="#fff" ' + S + '/>' +
            lingkar(x, y0, 20, '#e8564f');
        for (var v = -10; v <= 10; v++) {
            var panjang = v % 5 === 0 ? 14 : 7;
            isi += garis(x + 14, py(v), x + 14 + panjang, py(v), 'stroke="' + G.NAVY + '" stroke-width="' + (v % 5 === 0 ? 1.6 : 1) + '"');
            if (v % 5 === 0) { isi += teks(x + 34, py(v) + 4, String(v).replace('-', '−'), 12, 'text-anchor="start"'); }
        }
        var nilai = bahas ? 5 : -3;
        isi += '<rect x="' + (x - 5) + '" y="' + py(nilai) + '" width="10" height="' + (y0 - py(nilai)) + '" fill="#e8564f"/>';
        if (bahas) {
            isi += '<rect x="' + (x - 5) + '" y="' + py(-3) + '" width="10" height="2" fill="' + G.NAVY + '"/>' +
                teks(x - 22, py(-3) + 4, 'pagi −3', 12, 'text-anchor="end" ' + tebal(G.BIRU)) +
                teks(x - 22, py(5) + 4, 'siang 5', 12, 'text-anchor="end" ' + tebal(G.HIJAU)) +
                jalur('M' + (x - 70) + ' ' + (py(-3) - 8) + ' L' + (x - 70) + ' ' + (py(5) + 10), 'none', 'stroke="' + G.HIJAU + '" stroke-width="2"') +
                jalur('M' + (x - 75) + ' ' + (py(5) + 14) + ' L' + (x - 70) + ' ' + (py(5) + 6) + ' L' + (x - 65) + ' ' + (py(5) + 14), 'none', 'stroke="' + G.HIJAU + '" stroke-width="2"') +
                teks(x - 74, py(1), '+8', 13, 'text-anchor="end" ' + tebal(G.HIJAU));
        }
        return svg(170, 260, '<g transform="translate(' + (bahas ? 30 : 0) + ',0)">' + isi + '</g>');
    }

    function laut(bahas) {
        var isi = '<rect x="0" y="100" width="' + (bahas ? 400 : 360) + '" height="170" fill="#cfe9ff"/>' + garis(0, 100, bahas ? 400 : 360, 100, 'stroke="#1a73c9" stroke-width="2"') +
            teks(50, 94, 'permukaan laut', 11, 'fill="#1a73c9"') +
            // burung
            jalur('M120 40 q12 -14 24 0 q12 -14 24 0', 'none', 'stroke="' + G.NAVY + '" stroke-width="3"') +
            // penyelam
            lingkar(150, 232, 8, '#f4b740') + jalur('M150 240 L150 262 M138 248 L162 248', 'none', 'stroke="' + G.NAVY + '" stroke-width="3"');
        if (bahas) {
            var x = 250;
            isi += garis(x, 40, x, 240, 'stroke="' + G.NAVY + '" stroke-width="1.5"');
            [[9, 46, '+9 m (burung)'], [0, 112, '0 m'], [-9, 160, '−9 m'], [-21, 236, '−21 m (penyelam)']].forEach(function (t) {
                isi += garis(x - 6, t[0] === 0 ? 100 : t[1], x + 6, t[0] === 0 ? 100 : t[1]) + teks(x + 12, t[1] + 4, t[2], 12, 'text-anchor="start" ' + tebal());
            });
            isi += jalur('M200 46 L200 236', 'none', 'stroke="' + G.MERAH + '" stroke-width="2" stroke-dasharray="6 4"') +
                teks(194, 150, 'selisih 30 m', 12, 'text-anchor="end" ' + tebal(G.MERAH));
        }
        return svg(bahas ? 400 : 360, 270, isi);
    }

    function lompatKatak(bahas) {
        return G.garisBilangan({
            min: -6, maks: 8, lebar: 420,
            titik: bahas ? [{ v: -5, label: 'awal', warna: G.BIRU }, { v: 7, label: 'akhir', warna: G.HIJAU }] : [{ v: -5, label: 'katak', warna: G.HIJAU }],
            tambahan: bahas ? function (x0, y, sk) {
                var r = '';
                [-5, -1, 3].forEach(function (a) {
                    var xa = x0 + (a + 6) * sk, xb = x0 + (a + 4 + 6) * sk;
                    r += jalur('M' + xa + ' ' + (y - 8) + ' Q' + ((xa + xb) / 2) + ' ' + (y - 50) + ' ' + xb + ' ' + (y - 8), 'none', 'stroke="' + G.MERAH + '" stroke-width="2"') +
                        teks((xa + xb) / 2, y - 34, '+4', 11, tebal(G.MERAH));
                });
                return r;
            } : null
        });
    }

    function tabelSuhu(bahas) {
        var baris = [['Kota', 'Suhu (°C)'], ['Jakarta', '31'], ['Bandung', '22'], ['Tokyo', '−2'], ['Moskow', '−15'], ['Kairo', '35']];
        return G.tabel([120, 100], baris, bahas ? {
            sorot: function (i, j) { return i === 4 || i === 5; },
            bawah: 50,
            tambahan: teks(120, 215, 'Terendah: Moskow (−15)', 12, tebal(G.MERAH)) + teks(120, 235, '35 − (−15) = 50   ·   22 − (−2) = 24', 12)
        } : null);
    }

    function pizza(bahas) {
        var isi = '';
        if (!bahas) {
            isi = lingkar(110, 110, 90, '#f6c56b', 'stroke="#b5712a" stroke-width="4"') + lingkar(110, 110, 78, '#ef8f5a', 'stroke="none"');
            [[80, 80], [140, 90], [100, 140], [150, 140], [70, 125], [120, 60]].forEach(function (p) { isi += lingkar(p[0], p[1], 9, '#c0392b', 'stroke="none"'); });
            return svg(220, 220, isi);
        }
        for (var i = 0; i < 12; i++) {
            var a1 = i * 30 * Math.PI / 180, a2 = (i + 1) * 30 * Math.PI / 180;
            var warna = i < 3 ? '#f4b740' : i < 7 ? '#7fd3a8' : '#fff';
            isi += jalur('M110 110 L' + (110 + 90 * Math.sin(a1)).toFixed(1) + ' ' + (110 - 90 * Math.cos(a1)).toFixed(1) + ' A90 90 0 0 1 ' +
                (110 + 90 * Math.sin(a2)).toFixed(1) + ' ' + (110 - 90 * Math.cos(a2)).toFixed(1) + ' Z', warna, 'stroke="' + G.NAVY + '" stroke-width="1.5"');
        }
        isi += kotak(225, 40, 16, 16, '#f4b740') + teks(250, 53, 'Andi 1/4 = 3/12', 12, 'text-anchor="start"') +
            kotak(225, 70, 16, 16, '#7fd3a8') + teks(250, 83, 'Budi 1/3 = 4/12', 12, 'text-anchor="start"') +
            kotak(225, 100, 16, 16, '#fff') + teks(250, 113, 'Sisa 5/12', 12, 'text-anchor="start" ' + tebal(G.HIJAU));
        return svg(370, 220, isi);
    }

    function pita(bahas) {
        var isi = kotak(20, 40, 400, 34, '#f7a8c4', 'stroke="#b0476f" stroke-width="2"');
        isi += jalur('M20 40 L5 57 L20 74', '#f7a8c4', 'stroke="#b0476f" stroke-width="2"') +
            jalur('M420 40 L435 57 L420 74', '#f7a8c4', 'stroke="#b0476f" stroke-width="2"');
        if (bahas) {
            for (var i = 1; i < 5; i++) { isi += garis(20 + i * 80, 30, 20 + i * 80, 84, G.putus()); }
            for (var j = 0; j < 5; j++) { isi += teks(60 + j * 80, 62, '3/4 m', 12, tebal()); }
            isi += teks(220, 112, '3 3/4 m = 15/4 m;  15/4 : 5 = 3/4 m', 13, tebal(G.HIJAU));
        } else {
            isi += garis(20, 96, 420, 96, 'stroke="' + G.NAVY + '" stroke-width="1.2"') + garis(20, 90, 20, 102) + garis(420, 90, 420, 102) +
                teks(220, 116, '3 3/4 m', 13, tebal());
        }
        return svg(445, 125, isi);
    }

    function modelPecahan(bahas) {
        var isi = '', A = '#f4b740';
        // A: lingkaran 4 bagian, 2 diarsir
        isi += jalur('M60 60 L60 15 A45 45 0 0 1 105 60 Z', A) + jalur('M60 60 L105 60 A45 45 0 0 1 60 105 Z', A) +
            jalur('M60 60 L60 105 A45 45 0 0 1 15 60 Z', '#fff') + jalur('M60 60 L15 60 A45 45 0 0 1 60 15 Z', '#fff');
        // B: persegi panjang 6 bagian, 3 diarsir
        for (var i = 0; i < 6; i++) { isi += kotak(130 + (i % 3) * 28, 25 + Math.floor(i / 3) * 35, 28, 35, i % 3 === 0 || i === 4 ? A : '#fff'); }
        // C: batang 8 bagian, 5 diarsir
        for (var k = 0; k < 8; k++) { isi += kotak(240 + k * 13, 35, 13, 50, k < 5 ? A : '#fff'); }
        // D: lingkaran 3 bagian, 2 diarsir
        var p = function (deg) { var t = deg * Math.PI / 180; return (395 + 45 * Math.sin(t)).toFixed(1) + ' ' + (60 - 45 * Math.cos(t)).toFixed(1); };
        isi += jalur('M395 60 L' + p(0) + ' A45 45 0 0 1 ' + p(120) + ' Z', A) + jalur('M395 60 L' + p(120) + ' A45 45 0 0 1 ' + p(240) + ' Z', A) +
            jalur('M395 60 L' + p(240) + ' A45 45 0 0 1 ' + p(360) + ' Z', '#fff');
        // E: persegi dibagi diagonal, 1 segitiga diarsir
        isi += jalur('M470 15 L560 15 L560 105 Z', A) + jalur('M470 15 L470 105 L560 105 Z', '#fff');
        ['A', 'B', 'C', 'D', 'E'].forEach(function (h, j) { isi += teks([60, 172, 292, 395, 515][j], 130, h, 15, tebal()); });
        if (bahas) {
            [['2/4 = 1/2', 1], ['3/6 = 1/2', 1], ['5/8', 0], ['2/3', 0], ['1/2', 1]].forEach(function (t, j) {
                isi += teks([60, 172, 292, 395, 515][j], 150, t[0], 12, tebal(t[1] ? G.HIJAU : G.MERAH));
            });
        }
        return svg(580, bahas ? 160 : 140, isi);
    }

    function modelBatang36() {
        var isi = '', x0 = 20, w = 432; // 36 bagian × 12 px
        isi += kotak(x0, 30, 144, 40, '#cfe0ff') + kotak(x0 + 144, 30, 144, 40, '#ffe9a8') + kotak(x0 + 288, 30, 144, 40, '#cdeedd');
        isi += teks(x0 + 72, 55, 'Pramuka 12', 12, tebal()) + teks(x0 + 216, 55, 'Menari 12', 12, tebal()) + teks(x0 + 360, 55, 'Futsal 12', 12, tebal(G.HIJAU));
        isi += teks(x0 + w / 2, 20, '36 siswa', 13, tebal());
        isi += jalur('M' + (x0 + 144) + ' 80 L' + (x0 + 144) + ' 90 L' + (x0 + w) + ' 90 L' + (x0 + w) + ' 80', 'none', 'stroke="' + G.NAVY + '" stroke-width="1.5"') +
            teks(x0 + 288, 108, 'sisa 24 → 1/2 menari = 12, sisanya futsal = 12', 12);
        return svg(470, 120, isi);
    }

    function garisPecahan(bahas) {
        return G.garisBilangan({
            min: 0, maks: 2, bagi: 5, lebar: 400,
            titik: [{ v: 1.4, label: bahas ? 'A = 1 2/5' : 'A', warna: G.MERAH }],
            tambahan: bahas ? function (x0, y, sk) { return teks(x0 + 1.2 * sk, y + 46, 'setiap 1 satuan dibagi 5 bagian sama', 11, 'fill="' + G.BIRU + '"'); } : null
        });
    }

    function urutanPecahan() {
        var data = [['7/12', 14], ['5/8', 15], ['2/3', 16], ['3/4', 18]];
        var isi = '';
        data.forEach(function (d, i) {
            var y = 20 + i * 34;
            isi += kotak(70, y, 288, 22, '#fff', 'stroke="' + G.NAVY + '" stroke-width="1"') + kotak(70, y, d[1] * 12, 22, '#b9c8ff', 'stroke="' + G.NAVY + '" stroke-width="1"') +
                teks(60, y + 16, d[0], 13, 'text-anchor="end" ' + tebal()) + teks(368, y + 16, '= ' + d[1] + '/24', 12, 'text-anchor="start"');
        });
        return svg(440, 160, isi);
    }

    function kue(bahas) {
        var isi = '';
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 4; c++) {
                var arsir = (c < 2 && r < 2);
                isi += kotak(20 + c * 55, 20 + r * 45, 55, 45, arsir ? '#f4b740' : '#fff8e7');
                if (bahas) { isi += teks(20 + c * 55 + 27, 20 + r * 45 + 28, arsir ? '✕' : '✓', 15, tebal()); }
            }
        }
        if (bahas) {
            isi += kotak(265, 30, 16, 16, '#f4b740') + teks(330, 43, 'dimakan: 4', 13) +
                kotak(265, 62, 16, 16, '#fff8e7') + teks(330, 75, 'tersisa: 8', 13) + teks(330, 120, '8/12 = 2/3', 16, tebal(G.HIJAU));
        }
        return svg(bahas ? 400 : 260, 175, isi);
    }

    function garisBulatUrut() {
        return G.garisBilangan({
            min: -9, maks: 6, lebar: 420,
            titik: [{ v: -8, label: '−8' }, { v: -3, label: '−3' }, { v: 0, label: '0' }, { v: 2, label: '2' }, { v: 5, label: '5' }].map(function (t) { t.warna = G.BIRU; return t; }),
            tambahan: function (x0, y) { return teks(x0 + 210, y + 46, 'makin ke kanan, makin besar →', 12, tebal(G.HIJAU)); }
        });
    }

    function garisPQ(bahas) {
        return G.garisBilangan({
            min: -6, maks: 6, lebar: 400,
            titik: [{ v: -4, label: 'P', warna: G.MERAH }, { v: 3, label: 'Q', warna: G.BIRU }],
            tambahan: bahas ? function (x0, y, sk) {
                var xa = x0 + 2 * sk, xb = x0 + 9 * sk;
                return jalur('M' + xa + ' ' + (y + 40) + ' L' + xb + ' ' + (y + 40), 'none', 'stroke="' + G.HIJAU + '" stroke-width="2"') +
                    garis(xa, y + 34, xa, y + 46, 'stroke="' + G.HIJAU + '" stroke-width="2"') + garis(xb, y + 34, xb, y + 46, 'stroke="' + G.HIJAU + '" stroke-width="2"') +
                    teks((xa + xb) / 2, y + 60, '7 satuan', 12, tebal(G.HIJAU));
            } : null
        });
    }

    TKA.tambahSoal('mat', [
        /* ================= M01 Bilangan cacah dan operasi hitung ================= */
        {
            id: 'MAT-001', bentuk: 'PG', kompetensi: 'M01', kesulitan: 'mudah',
            pertanyaan: 'Hasil dari 125 + 75 × 4 − 200 : 8 adalah …',
            opsi: ['75', '400', '450', '600'],
            kunci: 1,
            pembahasan: 'Kerjakan perkalian dan pembagian lebih dulu: 75 × 4 = 300 dan 200 : 8 = 25. Lalu dari kiri ke kanan: 125 + 300 − 25 = 400. Jawaban 75 muncul jika semua operasi dikerjakan urut dari kiri tanpa aturan tersebut.'
        },
        {
            id: 'MAT-002', bentuk: 'PG', kompetensi: 'M01', kesulitan: 'sedang',
            pertanyaan: 'Satu kotak berisi telur seperti gambar. Bu Ani membeli 6 kotak telur. Sebanyak 45 butir dipakai untuk membuat kue. Banyak telur yang tersisa adalah …',
            gambar: kotakTelur(false), gambarPembahasan: kotakTelur(true),
            opsi: ['135 butir', '150 butir', '165 butir', '225 butir'],
            kunci: 0,
            pembahasan: 'Satu kotak berisi 5 baris × 6 kolom = 30 butir. Enam kotak berisi 6 × 30 = 180 butir. Sisa telur = 180 − 45 = 135 butir. Pilihan 225 muncul jika 45 ditambahkan, bukan dikurangkan.'
        },
        {
            id: 'MAT-003', bentuk: 'PG', kompetensi: 'M01', kesulitan: 'sulit',
            pertanyaan: 'Sebanyak 245 siswa dan 15 guru akan berwisata dengan bus. Setiap bus dapat memuat 45 orang. Paling sedikit berapa bus yang diperlukan?',
            opsi: ['5 bus', '6 bus', '7 bus', '8 bus'],
            kunci: 1,
            pembahasan: 'Jumlah orang = 245 + 15 = 260. Lalu 260 : 45 = 5 sisa 35. Lima bus hanya memuat 225 orang, sehingga 35 orang lagi memerlukan 1 bus tambahan. Jadi, paling sedikit 6 bus. Guru juga ikut dihitung.'
        },
        {
            id: 'MAT-004', bentuk: 'MCMA', kompetensi: 'M01', kesulitan: 'sulit',
            pertanyaan: 'Gambar berikut menunjukkan harga alat tulis di sebuah toko. Rina membawa uang Rp25.000. Pernyataan yang benar adalah …',
            gambar: labelHarga(false), gambarPembahasan: labelHarga(true),
            opsi: [
                'Jika membeli 1 buku tulis dan 1 penggaris, Rina mendapat kembalian Rp8.000.',
                'Rina dapat membeli 1 buku tulis, 3 pensil, dan 1 penghapus.',
                'Harga 6 pensil adalah Rp22.000.',
                'Uang Rina cukup untuk membeli 2 buku tulis dan 1 penggaris.',
                'Jika membeli masing-masing satu dari keempat barang, Rina mendapat kembalian Rp2.000.'
            ],
            kunci: [0, 4],
            pembahasan: 'A: 12.500 + 4.500 = 17.000; kembalian 25.000 − 17.000 = 8.000 (benar). B: 12.500 + 3 × 3.750 + 2.250 = 26.000, uang tidak cukup (salah). C: 6 × 3.750 = 22.500, bukan 22.000 (salah). D: 2 × 12.500 + 4.500 = 29.500, uang tidak cukup (salah). E: 12.500 + 3.750 + 2.250 + 4.500 = 23.000; kembalian 2.000 (benar).'
        },
        {
            id: 'MAT-005', bentuk: 'MCMA', kompetensi: 'M01', kesulitan: 'sedang',
            pertanyaan: 'Pernyataan yang benar tentang bilangan 4.507.320 adalah …',
            gambarPembahasan: nilaiTempat(),
            opsi: [
                'Angka 5 bernilai 500.000.',
                'Angka 7 menempati tempat ribuan.',
                'Bilangan itu dibaca "empat juta lima puluh tujuh ribu tiga ratus dua puluh".',
                'Jika dibulatkan ke ribuan terdekat, hasilnya 4.508.000.',
                'Jika dibulatkan ke jutaan terdekat, hasilnya 5.000.000.'
            ],
            kunci: [0, 1, 4],
            pembahasan: 'Lihat tabel nilai tempat: 5 berada di tempat ratus ribuan (500.000) dan 7 di tempat ribuan. Bilangan itu dibaca "empat juta lima ratus tujuh ribu tiga ratus dua puluh". Dibulatkan ke ribuan: angka ratusan 3 (< 5) sehingga menjadi 4.507.000. Dibulatkan ke jutaan: angka ratus ribuan 5 (≥ 5) sehingga menjadi 5.000.000.'
        },
        {
            id: 'MAT-006', bentuk: 'PG', kompetensi: 'M01', kesulitan: 'sulit',
            pertanyaan: 'Sebuah rombongan terdiri atas 5 orang dewasa dan beberapa anak. Mereka membayar tiket masuk museum sebesar Rp179.000. Dengan harga tiket seperti gambar, banyak anak dalam rombongan itu adalah …',
            gambar: papanTiket(false), gambarPembahasan: papanTiket(true),
            opsi: ['10 anak', '11 anak', '12 anak', '13 anak'],
            kunci: 3,
            pembahasan: 'Tiket 5 orang dewasa = 5 × Rp15.000 = Rp75.000. Uang untuk tiket anak = Rp179.000 − Rp75.000 = Rp104.000. Banyak anak = 104.000 : 8.000 = 13 anak.'
        },
        {
            id: 'MAT-007', bentuk: 'PG', kompetensi: 'M01', kesulitan: 'sedang',
            pertanyaan: 'Sebanyak 150 kue akan dimasukkan ke dalam kotak. Setiap kotak harus berisi tepat 12 kue. Berapa kue yang tersisa karena tidak dapat mengisi satu kotak penuh?',
            opsi: ['2 kue', '3 kue', '4 kue', '6 kue'],
            kunci: 3,
            pembahasan: '150 : 12 = 12 sisa 6, karena 12 × 12 = 144 dan 150 − 144 = 6. Jadi, ada 12 kotak penuh dan 6 kue tersisa.'
        },
        {
            id: 'MAT-008', bentuk: 'MCMA', kompetensi: 'M01', kesulitan: 'sulit',
            pertanyaan: 'Perhitungan berikut yang hasilnya benar adalah …',
            opsi: [
                '25 × 48 = 1.250',
                '999 + 999 = 1.998',
                '36 × 15 = 36 × 10 + 36 × 5 = 540',
                '(48 : 6) × 3 = 48 : (6 × 3)',
                '125 × 8 = 1.000'
            ],
            kunci: [1, 2, 4],
            pembahasan: 'A salah: 25 × 48 = 25 × 4 × 12 = 100 × 12 = 1.200. B benar: 999 + 999 = 2.000 − 2 = 1.998. C benar: 360 + 180 = 540. D salah: (48 : 6) × 3 = 8 × 3 = 24, sedangkan 48 : (6 × 3) = 48 : 18 hasilnya bukan 24. E benar: 125 × 8 = 1.000.'
        },

        /* ================= M02 Bilangan bulat ================= */
        {
            id: 'MAT-009', bentuk: 'PG', kompetensi: 'M02', kesulitan: 'mudah',
            pertanyaan: 'Termometer menunjukkan suhu sebuah kota di pegunungan pada pagi hari. Pada siang hari, suhunya naik 8°C. Suhu kota itu pada siang hari adalah …',
            gambar: termometer(false), gambarPembahasan: termometer(true),
            opsi: ['−11°C', '−5°C', '5°C', '11°C'],
            kunci: 2,
            pembahasan: 'Termometer menunjukkan −3°C. Naik 8°C berarti −3 + 8 = 5. Jadi, suhu siang hari 5°C. Pilihan −11 muncul jika suhu dianggap turun.'
        },
        {
            id: 'MAT-010', bentuk: 'PG', kompetensi: 'M02', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan titik P dan Q pada garis bilangan. Jarak titik P ke titik Q adalah … satuan.',
            gambar: garisPQ(false), gambarPembahasan: garisPQ(true),
            opsi: ['−1', '1', '7', '12'],
            kunci: 2,
            pembahasan: 'P berada di −4 dan Q di 3. Jaraknya 3 − (−4) = 3 + 4 = 7 satuan. Hitung langkahnya: dari −4 ke 0 ada 4 langkah, dari 0 ke 3 ada 3 langkah. Jarak tidak pernah bernilai negatif.'
        },
        {
            id: 'MAT-011', bentuk: 'PG', kompetensi: 'M02', kesulitan: 'mudah',
            pertanyaan: 'Urutan bilangan 5, −3, 0, −8, 2 dari yang terkecil adalah …',
            gambarPembahasan: garisBulatUrut(),
            opsi: ['−8, −3, 0, 2, 5', '−3, −8, 0, 2, 5', '0, −3, 2, 5, −8', '5, 2, 0, −3, −8'],
            kunci: 0,
            pembahasan: 'Pada garis bilangan, bilangan di sebelah kiri lebih kecil. Bilangan negatif yang angkanya lebih besar justru lebih kecil, jadi −8 < −3. Urutannya −8, −3, 0, 2, 5.'
        },
        {
            id: 'MAT-012', bentuk: 'PG', kompetensi: 'M02', kesulitan: 'sulit',
            pertanyaan: 'Seorang penyelam berada 15 m di bawah permukaan laut. Ia naik 6 m, lalu turun lagi 12 m. Pada saat yang sama, seekor burung terbang 9 m di atas permukaan laut. Selisih ketinggian burung dan penyelam adalah …',
            gambar: laut(false), gambarPembahasan: laut(true),
            opsi: ['12 m', '21 m', '30 m', '36 m'],
            kunci: 2,
            pembahasan: 'Posisi penyelam: −15 + 6 − 12 = −21 m. Burung berada di +9 m. Selisihnya 9 − (−21) = 9 + 21 = 30 m. Pilihan 21 m hanya kedalaman penyelam.'
        },
        {
            id: 'MAT-013', bentuk: 'MCMA', kompetensi: 'M02', kesulitan: 'sedang',
            pertanyaan: 'Hasil operasi hitung bilangan bulat berikut yang benar adalah …',
            opsi: ['−7 + 10 = 3', '4 − 9 = −5', '−6 − (−2) = −8', '−3 × 4 = 12', '−20 : (−5) = −4'],
            kunci: [0, 1],
            pembahasan: 'A benar (mulai dari −7 maju 10 langkah). B benar. C salah: −6 − (−2) = −6 + 2 = −4. D salah: negatif × positif = negatif, jadi hasilnya −12. E salah: negatif : negatif = positif, jadi hasilnya 4.'
        },
        {
            id: 'MAT-014', bentuk: 'BS', kompetensi: 'M02', kesulitan: 'sulit',
            pertanyaan: 'Tabel berikut menunjukkan suhu beberapa kota pada suatu hari. Tentukan Benar atau Salah setiap pernyataan.',
            gambar: tabelSuhu(false), gambarPembahasan: tabelSuhu(true),
            opsi: [
                'Kota dengan suhu terendah adalah Tokyo.',
                'Selisih suhu Kairo dan Moskow adalah 50°C.',
                'Jika suhu Moskow naik 10°C, suhunya menjadi −25°C.',
                'Suhu Bandung 24°C lebih tinggi daripada suhu Tokyo.'
            ],
            kunci: [false, true, false, true],
            pembahasan: '(1) Salah: −15 lebih kecil daripada −2, jadi suhu terendah di Moskow. (2) Benar: 35 − (−15) = 50. (3) Salah: −15 + 10 = −5. (4) Benar: 22 − (−2) = 24.'
        },
        {
            id: 'MAT-015', bentuk: 'PG', kompetensi: 'M02', kesulitan: 'sulit',
            pertanyaan: 'Dalam sebuah kuis, jawaban benar diberi skor 4, jawaban salah diberi skor −2, dan soal yang tidak dijawab diberi skor 0. Dari 25 soal, Rina menjawab benar 17 soal, salah 5 soal, dan tidak menjawab 3 soal. Skor Rina adalah …',
            opsi: ['58', '63', '68', '78'],
            kunci: 0,
            pembahasan: 'Skor benar = 17 × 4 = 68. Skor salah = 5 × (−2) = −10. Tidak dijawab = 0. Total = 68 − 10 + 0 = 58. Pilihan 78 muncul jika skor salah ditambahkan.'
        },
        {
            id: 'MAT-016', bentuk: 'PG', kompetensi: 'M02', kesulitan: 'sedang',
            pertanyaan: 'Seekor katak berada di titik seperti pada gambar. Katak itu melompat ke kanan sebanyak 3 kali. Setiap lompatan panjangnya 4 satuan. Katak berhenti di titik …',
            gambar: lompatKatak(false), gambarPembahasan: lompatKatak(true),
            opsi: ['7', '2', '12', '−17'],
            kunci: 0,
            pembahasan: 'Katak mulai di −5. Tiga lompatan ke kanan = 3 × 4 = 12 satuan. Posisi akhir −5 + 12 = 7. Pilihan 12 hanya panjang lompatan total, dan −17 muncul jika katak melompat ke kiri.'
        },

        /* ================= M03 Pecahan ================= */
        {
            id: 'MAT-017', bentuk: 'PG', kompetensi: 'M03', kesulitan: 'mudah',
            pertanyaan: 'Ibu memotong kue menjadi beberapa bagian yang sama besar seperti gambar. Bagian yang diarsir sudah dimakan. Pecahan paling sederhana yang menunjukkan bagian kue yang **tersisa** adalah …',
            gambar: kue(false), gambarPembahasan: kue(true),
            opsi: ['2/3', '1/3', '4/12', '3/4'],
            kunci: 0,
            pembahasan: 'Kue dipotong menjadi 12 bagian. Yang dimakan (diarsir) 4 bagian, jadi yang tersisa 12 − 4 = 8 bagian, yaitu 8/12. Bentuk paling sederhananya: 8/12 = 2/3 (pembilang dan penyebut dibagi 4). Pilihan 4/12 adalah bagian yang dimakan, dan 1/3 adalah bentuk sederhananya.'
        },
        {
            id: 'MAT-018', bentuk: 'PG', kompetensi: 'M03', kesulitan: 'sulit',
            pertanyaan: 'Urutan pecahan 3/4, 2/3, 5/8, dan 7/12 dari yang terkecil adalah …',
            gambarPembahasan: urutanPecahan(),
            opsi: ['3/4, 2/3, 5/8, 7/12', '5/8, 7/12, 2/3, 3/4', '7/12, 5/8, 2/3, 3/4', '2/3, 3/4, 5/8, 7/12'],
            kunci: 2,
            pembahasan: 'Samakan penyebutnya menjadi 24: 3/4 = 18/24, 2/3 = 16/24, 5/8 = 15/24, 7/12 = 14/24. Urutan dari terkecil: 14/24, 15/24, 16/24, 18/24, yaitu 7/12, 5/8, 2/3, 3/4.'
        },
        {
            id: 'MAT-019', bentuk: 'PG', kompetensi: 'M03', kesulitan: 'sedang',
            pertanyaan: 'Sebuah pizza seperti gambar dimakan bersama. Andi makan 1/4 bagian dan Budi makan 1/3 bagian. Bagian pizza yang tersisa adalah …',
            gambar: pizza(false), gambarPembahasan: pizza(true),
            opsi: ['5/12', '2/7', '7/12', '1/2'],
            kunci: 0,
            pembahasan: 'Yang dimakan: 1/4 + 1/3 = 3/12 + 4/12 = 7/12. Sisa = 1 − 7/12 = 5/12. Pilihan 7/12 adalah bagian yang dimakan, dan 2/7 muncul jika pembilang dan penyebut dijumlahkan langsung.'
        },
        {
            id: 'MAT-020', bentuk: 'PG', kompetensi: 'M03', kesulitan: 'sedang',
            pertanyaan: 'Pita sepanjang 3 3/4 m seperti gambar dipotong menjadi 5 bagian yang sama panjang. Panjang setiap potongan pita adalah …',
            gambar: pita(false), gambarPembahasan: pita(true),
            opsi: ['3/5 m', '4/5 m', '1 1/4 m', '3/4 m'],
            kunci: 3,
            pembahasan: 'Ubah ke pecahan biasa: 3 3/4 = 15/4. Lalu 15/4 : 5 = 15/20 = 3/4 m. Periksa: 5 × 3/4 = 15/4 = 3 3/4 m.'
        },
        {
            id: 'MAT-021', bentuk: 'MCMA', kompetensi: 'M03', kesulitan: 'sedang',
            pertanyaan: 'Gambar yang daerah arsirnya menunjukkan pecahan 1/2 adalah …',
            gambar: modelPecahan(false), gambarPembahasan: modelPecahan(true),
            opsi: ['A', 'B', 'C', 'D', 'E'],
            kunci: [0, 1, 4],
            pembahasan: 'A: 2 dari 4 bagian = 2/4 = 1/2. B: 3 dari 6 bagian = 3/6 = 1/2. C: 5 dari 8 bagian = 5/8. D: 2 dari 3 bagian = 2/3. E: persegi dibagi diagonal menjadi 2 segitiga sama besar, 1 diarsir = 1/2.'
        },
        {
            id: 'MAT-022', bentuk: 'PG', kompetensi: 'M03', kesulitan: 'sulit',
            pertanyaan: 'Di kelas 6 terdapat 36 siswa. Sebanyak 1/3 dari siswa mengikuti pramuka. Setengah dari sisanya mengikuti menari, dan siswa lainnya mengikuti futsal. Banyak siswa yang mengikuti futsal adalah …',
            gambarPembahasan: modelBatang36(),
            opsi: ['12 siswa', '18 siswa', '24 siswa', '36 siswa'],
            kunci: 0,
            pembahasan: 'Pramuka = 1/3 × 36 = 12. Sisanya 36 − 12 = 24. Menari = 1/2 × 24 = 12. Futsal = 24 − 12 = 12 siswa. Pilihan 18 muncul jika "setengah dari sisanya" dihitung dari 36.'
        },
        {
            id: 'MAT-023', bentuk: 'BS', kompetensi: 'M03', kesulitan: 'sulit',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan tentang pecahan berikut.',
            opsi: ['2 1/2 = 5/2', '3/4 + 1/8 = 4/12', '2/3 × 9 = 6', '1/2 : 1/4 = 1/8'],
            kunci: [true, false, true, false],
            pembahasan: '(1) Benar: 2 × 2 + 1 = 5, jadi 5/2. (2) Salah: 3/4 + 1/8 = 6/8 + 1/8 = 7/8; penyebut tidak boleh dijumlahkan. (3) Benar: 2/3 × 9 = 18/3 = 6. (4) Salah: 1/2 : 1/4 = 1/2 × 4 = 2.'
        },
        {
            id: 'MAT-024', bentuk: 'PG', kompetensi: 'M03', kesulitan: 'sedang',
            pertanyaan: 'Pecahan yang ditunjukkan oleh titik A pada garis bilangan berikut adalah …',
            gambar: garisPecahan(false), gambarPembahasan: garisPecahan(true),
            opsi: ['2/5', '1 2/5', '1 2/10', '7/10'],
            kunci: 1,
            pembahasan: 'Jarak 0 ke 1 dibagi menjadi 5 bagian sama, jadi setiap garis kecil bernilai 1/5. Titik A berada 2 garis kecil setelah angka 1, yaitu 1 2/5. Pilihan 2/5 lupa menghitung bilangan bulat 1.'
        },
        {
            id: 'MAT-025', bentuk: 'PG', kompetensi: 'M03', kesulitan: 'mudah',
            pertanyaan: 'Untuk membuat satu adonan roti diperlukan 2/3 gelas gula. Banyak gula yang diperlukan untuk 3 adonan adalah …',
            opsi: ['6/9 gelas', '1 2/3 gelas', '2 gelas', '3 2/3 gelas'],
            kunci: 2,
            pembahasan: '3 × 2/3 = 6/3 = 2 gelas. Pilihan 6/9 muncul jika penyebut ikut dikali 3, dan 3 2/3 muncul jika 3 dan 2/3 dijumlahkan.'
        }
    ]);
})(TKA.gambarMat);
