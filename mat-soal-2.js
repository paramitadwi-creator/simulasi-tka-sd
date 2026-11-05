/*
 * Bank soal Matematika — bagian 2 (MAT-026 s.d. MAT-049):
 * M04 desimal dan persen, M05 KPK dan FPB, M06 perbandingan, skala, kecepatan.
 */
(function (G) {
    'use strict';
    var svg = G.svg, teks = G.teks, tebal = G.tebal, garis = G.garis, kotak = G.kotak, lingkar = G.lingkar, jalur = G.jalur;

    /* ---------- gambar khusus ---------- */
    function grid100(arsir, bahas, fokusArsir) {
        var isi = '';
        for (var i = 0; i < 100; i++) {
            var r = Math.floor(i / 10), c = i % 10;
            isi += kotak(20 + c * 20, 20 + r * 20, 20, 20, i < arsir ? '#7fa3ff' : '#fff', 'stroke="#172b4d" stroke-width="1"');
        }
        isi += kotak(20, 20, 200, 200, 'none');
        if (bahas) {
            var n = fokusArsir ? arsir : 100 - arsir;
            isi += teks(240, 90, 'diarsir: ' + arsir + ' kotak', 12, 'text-anchor="start" ' + tebal(G.BIRU)) +
                teks(240, 115, 'tidak diarsir: ' + (100 - arsir) + ' kotak', 12, 'text-anchor="start" ' + tebal(fokusArsir ? null : G.HIJAU)) +
                teks(240, 140, (fokusArsir ? '3/4 = ' : '') + n + '/100 = ' + n + '%', 13, 'text-anchor="start" ' + tebal(G.HIJAU));
        }
        return svg(bahas ? 380 : 240, 240, isi);
    }

    function labelDiskon(bahas) {
        var isi = jalur('M40 20 L250 20 L250 130 L40 130 L10 75 Z', '#fff4e5') + lingkar(40, 75, 6, '#fff') +
            teks(145, 55, 'TAS SEKOLAH', 14, tebal()) + teks(145, 85, 'Rp120.000', 18, tebal()) +
            lingkar(250, 25, 32, '#d64545', 'stroke="none"') + teks(250, 22, 'Diskon', 11, tebal('#fff')) + teks(250, 38, '25%', 15, tebal('#fff'));
        if (bahas) {
            isi += teks(145, 160, 'Potongan = 25% × 120.000 = Rp30.000', 13) +
                teks(145, 182, 'Harga bayar = 120.000 − 30.000 = Rp90.000', 13, tebal(G.HIJAU));
        }
        return svg(300, bahas ? 195 : 140, isi);
    }

    function tabelDesimal() {
        return G.tabel([90, 60, 60, 60, 60], [
            ['Bilangan', 'Satuan', 'Persepuluhan', 'Perseratusan', 'Perseribuan'].map(function (x, i) { return i ? x.slice(0, 6) + '.' : x; }),
            ['0,5', '0', '5', '0', '0'], ['0,45', '0', '4', '5', '0'], ['0,405', '0', '4', '0', '5'], ['0,54', '0', '5', '4', '0']
        ], { sorot: function (i) { return i === 4; } });
    }

    function duaToko(bahas) {
        function toko(x, nama, harga, diskon, hasil) {
            var r = kotak(x, 20, 190, 120, '#edf1ff') + kotak(x, 20, 190, 30, '#315efb', 'stroke="#172b4d" stroke-width="2"') +
                teks(x + 95, 41, nama, 14, tebal('#fff')) + teks(x + 95, 80, 'Buku cerita', 13) + teks(x + 95, 104, harga, 16, tebal()) +
                teks(x + 95, 128, 'Diskon ' + diskon, 13, tebal(G.MERAH));
            if (bahas) { r += teks(x + 95, 165, hasil, 13, tebal(G.HIJAU)); }
            return r;
        }
        return svg(420, bahas ? 180 : 150, toko(10, 'TOKO A', 'Rp40.000', '20%', 'bayar Rp32.000') + toko(220, 'TOKO B', 'Rp36.000', '10%', 'bayar Rp32.400'));
    }

    function pieTransport(bahas) {
        return G.pie([
            { sudut: 108, warna: '#cfe0ff', label: 'Sepeda', ket: bahas ? '30% · 12 anak' : '30%' },
            { sudut: 162, warna: '#cdeedd', label: 'Jalan kaki', ket: bahas ? '45% · 18 anak' : '45%' },
            { sudut: 90, warna: '#ffe9a8', label: 'Diantar', ket: bahas ? '25% · 10 anak' : '25%' }
        ], { w: 300, h: 235 });
    }

    function hargaNaik(bahas) {
        var isi = kotak(10, 20, 150, 70, '#fff') + teks(85, 45, 'Bulan Mei', 12) + teks(85, 72, 'Rp50.000', 16, tebal()) +
            jalur('M170 55 L200 55 M192 47 L200 55 L192 63', 'none') +
            kotak(210, 20, 150, 70, '#fff') + teks(285, 45, 'Bulan Juni', 12) + teks(285, 72, 'Rp60.000', 16, tebal());
        if (bahas) {
            isi += teks(185, 118, 'Juli: turun 10% dari Rp60.000 = turun Rp6.000', 13) +
                teks(185, 140, 'Harga Juli = 60.000 − 6.000 = Rp54.000', 13, tebal(G.HIJAU));
        }
        return svg(370, bahas ? 150 : 100, isi);
    }

    function lampuSoal() {
        function lampu(cx, warna, huruf) {
            var r = '';
            for (var i = 0; i < 8; i++) {
                var a = i * Math.PI / 4;
                r += garis((cx + 30 * Math.cos(a)).toFixed(1), (60 + 30 * Math.sin(a)).toFixed(1), (cx + 40 * Math.cos(a)).toFixed(1), (60 + 40 * Math.sin(a)).toFixed(1),
                    'stroke="' + warna + '" stroke-width="3" stroke-linecap="round"');
            }
            return r + lingkar(cx, 60, 22, warna) + teks(cx, 125, 'Lampu ' + huruf, 14, tebal());
        }
        return svg(300, 140, lampu(80, '#f4b740', 'A') + lampu(220, '#7fd3a8', 'B'));
    }
    function lampuBahas() {
        var x0 = 30, k = 4.6, isi = garis(x0, 70, x0 + 60 * k, 70);
        for (var t = 0; t <= 60; t += 6) { isi += lingkar(x0 + t * k, 50, 5, '#f4b740', 'stroke="#172b4d"'); }
        for (var u = 0; u <= 56; u += 8) { isi += lingkar(x0 + u * k, 90, 5, '#7fd3a8', 'stroke="#172b4d"'); }
        [0, 24, 48].forEach(function (b) {
            isi += '<rect x="' + (x0 + b * k - 9) + '" y="38" width="18" height="64" rx="8" fill="none" stroke="#d64545" stroke-width="2"/>';
        });
        for (var s = 0; s <= 60; s += 12) { isi += teks(x0 + s * k, 120, s, 11); }
        isi += teks(x0 + 60 * k + 12, 54, 'A', 12, tebal()) + teks(x0 + 60 * k + 12, 94, 'B', 12, tebal()) +
            teks(170, 20, 'Menyala bersama: detik 0, 24, 48 (KPK 6 dan 8 = 24)', 12, tebal(G.MERAH)) + teks(170, 140, 'detik', 11);
        return svg(340, 150, isi);
    }

    /** pohon faktor sederhana: daftar [nilai, faktorPrimaKiri] dari atas ke bawah */
    function pohonFaktor(n, langkah, bahas, xAwal) {
        var isi = '', x = xAwal || 60, y = 30, nilai = n;
        isi += teks(x, y, n, 16, tebal());
        langkah.forEach(function (p, i) {
            var sisa = nilai / p, y2 = y + 50;
            isi += garis(x, y + 6, x - 30, y2 - 16, 'stroke="#172b4d" stroke-width="1.5"') + garis(x, y + 6, x + 30, y2 - 16, 'stroke="#172b4d" stroke-width="1.5"');
            isi += (bahas ? lingkar(x - 30, y2 - 5, 13, '#cdeedd', 'stroke="#16a36a" stroke-width="2"') : '') + teks(x - 30, y2, p, 15, tebal());
            var akhir = i === langkah.length - 1;
            isi += (bahas && akhir ? lingkar(x + 30, y2 - 5, 13, '#cdeedd', 'stroke="#16a36a" stroke-width="2"') : '') + teks(x + 30, y2, sisa, 15, tebal());
            x += 30; y = y2; nilai = sisa;
        });
        return { isi: isi, tinggi: y + 20 };
    }

    function pohon60(bahas) {
        var p = pohonFaktor(60, [2, 2, 3], bahas, 70);
        var isi = p.isi + (bahas ? teks(260, 110, '60 = 2 × 2 × 3 × 5', 14, tebal()) + teks(260, 134, '= 2² × 3 × 5', 15, tebal(G.HIJAU)) : '');
        return svg(bahas ? 360 : 220, p.tinggi + 10, isi);
    }

    function pohon4836() {
        var a = pohonFaktor(48, [2, 2, 2, 2], true, 50), b = pohonFaktor(36, [2, 2, 3], true, 50);
        var isi = a.isi + '<g transform="translate(220,0)">' + b.isi + '</g>' +
            teks(110, a.tinggi + 20, '48 = 2⁴ × 3', 13, tebal()) + teks(330, a.tinggi + 20, '36 = 2² × 3²', 13, tebal()) +
            teks(220, a.tinggi + 46, 'FPB = 2² × 3 = 12', 14, tebal(G.HIJAU));
        return svg(440, a.tinggi + 60, isi);
    }

    function tabelFaktor() {
        return G.tabel([80, 300], [
            ['Bilangan', 'Faktor'],
            ['24', '1, 2, 3, 4, 6, 8, 12, 24'],
            ['36', '1, 2, 3, 4, 6, 9, 12, 18, 36']
        ], { bawah: 30, tambahan: teks(200, 120, 'Faktor persekutuan terbesar = 12', 13, tebal(G.HIJAU)) });
    }

    function kalenderJuni(bahas) {
        var hari = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'], isi = '';
        var x0 = 15, y0 = 50, w = 46, h = 34;
        isi += kotak(x0, 10, w * 7, 30, '#315efb', 'stroke="#172b4d" stroke-width="1.5"') + teks(x0 + w * 3.5, 31, 'JUNI', 15, tebal('#fff'));
        hari.forEach(function (d, i) { isi += teks(x0 + i * w + w / 2, y0 + 4, d, 12, tebal(i === 6 ? G.MERAH : null)); });
        var rina = [3, 7, 11, 15, 19, 23, 27], sari = [3, 9, 15, 21, 27];
        for (var tgl = 1; tgl <= 30; tgl++) {
            var idx = tgl + 4, r = Math.floor(idx / 7), c = idx % 7; // 1 Juni = Sabtu (kolom 5)
            var x = x0 + c * w, y = y0 + 12 + r * h;
            isi += kotak(x, y, w, h, '#fff', 'stroke="#c4ccdc" stroke-width="1"');
            if (bahas) {
                var dua = rina.indexOf(tgl) >= 0 && sari.indexOf(tgl) >= 0;
                if (dua) { isi += lingkar(x + w / 2, y + h / 2, 14, '#ffe9a8', 'stroke="#d64545" stroke-width="2"'); }
                else if (rina.indexOf(tgl) >= 0) { isi += lingkar(x + w / 2, y + h / 2, 13, '#cfe0ff', 'stroke="none"'); }
                else if (sari.indexOf(tgl) >= 0) { isi += lingkar(x + w / 2, y + h / 2, 13, '#cdeedd', 'stroke="none"'); }
            }
            isi += teks(x + w / 2, y + h / 2 + 5, tgl, 13, c === 6 ? 'fill="#d64545"' : '');
        }
        var tinggi = y0 + 12 + 5 * h + 14;
        if (bahas) {
            isi += lingkar(30, tinggi + 4, 7, '#cfe0ff', 'stroke="none"') + teks(42, tinggi + 9, 'Rina (tiap 4 hari)', 11, 'text-anchor="start"') +
                lingkar(160, tinggi + 4, 7, '#cdeedd', 'stroke="none"') + teks(172, tinggi + 9, 'Sari (tiap 6 hari)', 11, 'text-anchor="start"') +
                lingkar(290, tinggi + 4, 7, '#ffe9a8', 'stroke="#d64545" stroke-width="2"') + teks(302, tinggi + 9, 'bersama', 11, 'text-anchor="start"');
        }
        return svg(x0 * 2 + w * 7, tinggi + (bahas ? 22 : 0), isi);
    }

    function lantaiUbin(bahas) {
        var isi = kotak(40, 20, 320, 240, '#f5efe4');
        if (bahas) {
            for (var c = 1; c < 4; c++) { isi += garis(40 + c * 80, 20, 40 + c * 80, 260, 'stroke="#b08a55" stroke-width="1.5"'); }
            for (var r = 1; r < 3; r++) { isi += garis(40, 20 + r * 80, 360, 20 + r * 80, 'stroke="#b08a55" stroke-width="1.5"'); }
            isi += teks(80, 66, '30 cm', 12, tebal(G.BIRU)) + teks(200, 290, '4 ubin × 3 ubin = 12 ubin', 13, tebal(G.HIJAU));
        }
        isi += teks(200, 14, '120 cm', 13, tebal()) + teks(372, 144, '90 cm', 13, 'text-anchor="start" ' + tebal());
        return svg(430, bahas ? 300 : 275, isi);
    }

    function garisBus() {
        var x0 = 30, k = 2.6, isi = garis(x0, 70, x0 + 120 * k, 70);
        for (var t = 0; t <= 120; t += 15) { isi += lingkar(x0 + t * k, 50, 5, '#cfe0ff', 'stroke="#172b4d"'); }
        for (var u = 0; u <= 120; u += 20) { isi += lingkar(x0 + u * k, 90, 5, '#cdeedd', 'stroke="#172b4d"'); }
        [0, 60, 120].forEach(function (b, i) {
            isi += '<rect x="' + (x0 + b * k - 9) + '" y="38" width="18" height="64" rx="8" fill="none" stroke="#d64545" stroke-width="2"/>' +
                teks(x0 + b * k, 120, ['06.00', '07.00', '08.00'][i], 11, tebal(G.MERAH)) + teks(x0 + b * k, 136, 'ke-' + (i + 1), 10, 'fill="#d64545"');
        });
        isi += teks(x0 + 120 * k + 16, 54, 'A', 12, tebal()) + teks(x0 + 120 * k + 16, 94, 'B', 12, tebal()) +
            teks(190, 20, 'KPK 15 dan 20 = 60 menit', 12, tebal(G.MERAH));
        return svg(380, 145, isi);
    }

    function modelBatang(bagianA, bagianB, nilai, labelA, labelB, ketBawah) {
        var isi = '', w = 40, x0 = 90;
        for (var i = 0; i < bagianA; i++) { isi += kotak(x0 + i * w, 20, w, 30, '#cfe0ff') + teks(x0 + i * w + w / 2, 40, nilai, 12); }
        for (var j = 0; j < bagianB; j++) { isi += kotak(x0 + j * w, 70, w, 30, '#ffe9a8') + teks(x0 + j * w + w / 2, 90, nilai, 12); }
        isi += teks(x0 - 10, 40, labelA, 13, 'text-anchor="end" ' + tebal()) + teks(x0 - 10, 90, labelB, 13, 'text-anchor="end" ' + tebal());
        return svg(Math.max(Math.max(bagianA, bagianB) * w + x0 + 20, 440), 140, isi + teks(x0 + Math.max(bagianA, bagianB) * w / 2, 128, ketBawah, 13, tebal(G.HIJAU)));
    }

    function peta(bahas) {
        var pg = G.penggaris(7, { y: 150, sk: 50 });
        var xa = pg.x(0.5), xb = pg.x(6.5);
        var isi = kotak(10, 10, 370, 120, '#e7f4e4') +
            jalur('M30 100 C90 60 140 120 200 80 S320 40 360 70', 'none', 'stroke="#8fb6e8" stroke-width="5"') +
            lingkar(xa, 60, 8, '#d64545') + teks(xa, 40, 'Kota P', 12, tebal()) +
            lingkar(xb, 60, 8, '#315efb') + teks(xb, 40, 'Kota Q', 12, tebal()) +
            teks(300, 122, 'Skala 1 : 500.000', 12, tebal()) +
            garis(xa, 68, xa, 150, 'stroke="#172b4d" stroke-width="1" stroke-dasharray="3 3"') + garis(xb, 68, xb, 150, 'stroke="#172b4d" stroke-width="1" stroke-dasharray="3 3"') +
            pg.isi;
        if (bahas) {
            isi += teks(195, 215, 'jarak pada peta: 6,5 − 0,5 = 6 cm', 13, tebal(G.BIRU)) +
                teks(195, 237, '6 × 500.000 = 3.000.000 cm = 30 km', 13, tebal(G.HIJAU));
        }
        return svg(pg.lebar + 20, bahas ? 248 : 205, isi);
    }

    function kartuResep(bahas) {
        var isi = kotak(20, 10, 260, 150, '#fffaf0') + teks(150, 36, 'Kue Bolu (untuk 4 porsi)', 14, tebal()) +
            garis(40, 46, 260, 46, 'stroke="#c4ccdc" stroke-width="1"') +
            teks(50, 75, '• Tepung terigu  200 g', 13, 'text-anchor="start"') +
            teks(50, 102, '• Telur  2 butir', 13, 'text-anchor="start"') +
            teks(50, 129, '• Susu  300 ml', 13, 'text-anchor="start"');
        if (bahas) {
            isi += teks(150, 185, '10 porsi = 4 porsi × 2,5', 13, tebal(G.BIRU)) +
                teks(150, 207, 'tepung 500 g · telur 5 · susu 750 ml', 13, tebal(G.HIJAU));
        }
        return svg(300, bahas ? 218 : 170, isi);
    }

    function denah(bahas) {
        var isi = '', x0 = 30, y0 = 30, c = 30;
        for (var i = 0; i <= 10; i++) { isi += garis(x0 + i * c, y0 - 10, x0 + i * c, y0 + 8 * c + 10, 'stroke="#e6eaf1" stroke-width="1"'); }
        for (var j = 0; j <= 8; j++) { isi += garis(x0 - 10, y0 + j * c, x0 + 10 * c + 10, y0 + j * c, 'stroke="#e6eaf1" stroke-width="1"'); }
        isi += kotak(x0 + c, y0 + c, 8 * c, 6 * c, 'rgba(207,224,255,.6)', 'stroke="#172b4d" stroke-width="3"') +
            teks(x0 + 5 * c, y0 + 4 * c, 'Ruang Kelas', 14, tebal()) +
            teks(x0 + 5 * c, y0 + 8 * c + 34, 'Skala 1 : 100   (1 petak = 1 cm)', 12, tebal());
        if (bahas) {
            isi += teks(x0 + 5 * c, y0 + 7 * c + 20, '8 cm → 8 m', 12, tebal(G.MERAH)) +
                teks(x0 + 9.3 * c, y0 + 4 * c, '6 cm → 6 m', 12, 'text-anchor="start" ' + tebal(G.MERAH)) +
                teks(x0 + 5 * c, y0 + 4.8 * c, 'luas 48 m² · keliling 28 m', 12, tebal(G.HIJAU));
        }
        return svg(x0 * 2 + 10 * c + (bahas ? 80 : 0), y0 + 8 * c + 50, isi);
    }

    TKA.tambahSoal('mat', [
        /* ================= M04 Desimal dan persen ================= */
        {
            id: 'MAT-026', bentuk: 'PG', kompetensi: 'M04', kesulitan: 'mudah',
            pertanyaan: 'Bentuk persen dari pecahan 3/4 adalah …',
            gambarPembahasan: grid100(75, true, true),
            opsi: ['34%', '43%', '75%', '80%'],
            kunci: 2,
            pembahasan: '3/4 = (3 × 25)/(4 × 25) = 75/100 = 75%. Persen berarti per seratus, jadi penyebut diubah menjadi 100.'
        },
        {
            id: 'MAT-027', bentuk: 'PG', kompetensi: 'M04', kesulitan: 'sedang',
            pertanyaan: 'Sebuah toko memberi diskon untuk tas sekolah seperti gambar. Harga yang harus dibayar untuk tas tersebut adalah …',
            gambar: labelDiskon(false), gambarPembahasan: labelDiskon(true),
            opsi: ['Rp30.000', 'Rp60.000', 'Rp80.000', 'Rp90.000'],
            kunci: 3,
            pembahasan: 'Potongan harga = 25% × Rp120.000 = Rp30.000. Harga yang dibayar = Rp120.000 − Rp30.000 = Rp90.000. Rp30.000 hanyalah besar potongannya.'
        },
        {
            id: 'MAT-028', bentuk: 'PG', kompetensi: 'M04', kesulitan: 'sedang',
            pertanyaan: 'Bilangan terbesar di antara 0,5; 0,45; 0,405; dan 0,54 adalah …',
            gambarPembahasan: tabelDesimal(),
            opsi: ['0,5', '0,45', '0,405', '0,54'],
            kunci: 3,
            pembahasan: 'Bandingkan angka per tempat. Persepuluhan: 0,5 dan 0,54 sama-sama 5, lebih besar daripada 4. Perseratusan: 0,54 punya 4, sedangkan 0,5 = 0,50 punya 0. Jadi, 0,54 paling besar. Banyaknya angka di belakang koma tidak menentukan besar bilangan.'
        },
        {
            id: 'MAT-029', bentuk: 'PG', kompetensi: 'M04', kesulitan: 'mudah',
            pertanyaan: 'Persegi besar berikut dibagi menjadi 100 kotak kecil yang sama. Persentase daerah yang **tidak** diarsir adalah …',
            gambar: grid100(35, false), gambarPembahasan: grid100(35, true),
            opsi: ['65%', '35%', '6,5%', '0,65%'],
            kunci: 0,
            pembahasan: 'Kotak yang diarsir: 3 baris penuh (30) + 5 = 35 kotak. Yang tidak diarsir = 100 − 35 = 65 kotak, yaitu 65/100 = 65%.'
        },
        {
            id: 'MAT-030', bentuk: 'MCMA', kompetensi: 'M04', kesulitan: 'sulit',
            pertanyaan: 'Dua toko menjual buku cerita yang sama dengan harga dan diskon seperti gambar. Pernyataan yang benar adalah …',
            gambar: duaToko(false), gambarPembahasan: duaToko(true),
            opsi: [
                'Harga buku di Toko A setelah diskon adalah Rp32.000.',
                'Harga buku di Toko B setelah diskon adalah Rp32.400.',
                'Membeli di Toko B lebih murah.',
                'Selisih harga setelah diskon di kedua toko adalah Rp400.',
                'Potongan harga di Toko B adalah Rp4.000.'
            ],
            kunci: [0, 1, 3],
            pembahasan: 'Toko A: potongan 20% × 40.000 = 8.000, bayar 32.000 (A benar). Toko B: potongan 10% × 36.000 = 3.600, bayar 32.400 (B benar, E salah). Toko A lebih murah, jadi C salah. Selisih 32.400 − 32.000 = 400 (D benar).'
        },
        {
            id: 'MAT-031', bentuk: 'PG', kompetensi: 'M04', kesulitan: 'sulit',
            pertanyaan: 'Diagram berikut menunjukkan cara 40 siswa kelas 6 berangkat ke sekolah. Minggu depan, 2 siswa yang biasa berjalan kaki akan beralih naik sepeda. Persentase siswa yang naik sepeda menjadi …',
            gambar: pieTransport(false), gambarPembahasan: pieTransport(true),
            opsi: ['30%', '32%', '35%', '40%'],
            kunci: 2,
            pembahasan: 'Naik sepeda sekarang = 30% × 40 = 12 siswa. Setelah 2 siswa beralih, menjadi 14 siswa. Persentasenya 14/40 = 35/100 = 35%. Pilihan 32% muncul jika 2 ditambahkan langsung ke 30%.'
        },
        {
            id: 'MAT-032', bentuk: 'MCMA', kompetensi: 'M04', kesulitan: 'sedang',
            pertanyaan: 'Hasil operasi hitung desimal berikut yang benar adalah …',
            opsi: ['2,5 + 1,75 = 4,25', '0,6 × 0,5 = 3', '4,8 : 4 = 1,2', '7 − 2,35 = 5,35'],
            kunci: [0, 2],
            pembahasan: 'A benar: 2,50 + 1,75 = 4,25. B salah: 0,6 × 0,5 = 0,30 = 0,3. C benar: 4,8 : 4 = 1,2. D salah: 7,00 − 2,35 = 4,65.'
        },
        {
            id: 'MAT-033', bentuk: 'PG', kompetensi: 'M04', kesulitan: 'sulit',
            pertanyaan: 'Harga sepasang sepatu pada bulan Mei dan Juni ditunjukkan pada gambar. Pada bulan Juli, harganya turun 10% dari harga bulan Juni. Harga sepatu pada bulan Juli adalah …',
            gambar: hargaNaik(false), gambarPembahasan: hargaNaik(true),
            opsi: ['Rp48.000', 'Rp50.000', 'Rp52.000', 'Rp54.000'],
            kunci: 3,
            pembahasan: 'Penurunan dihitung dari harga Juni: 10% × Rp60.000 = Rp6.000. Harga Juli = Rp60.000 − Rp6.000 = Rp54.000. Harga tidak kembali ke Rp50.000 karena 10% dihitung dari Rp60.000, bukan selisih kenaikannya.'
        },

        /* ================= M05 KPK dan FPB ================= */
        {
            id: 'MAT-034', bentuk: 'MCMA', kompetensi: 'M05', kesulitan: 'sedang',
            pertanyaan: 'Lampu A berkedip setiap 6 detik dan lampu B berkedip setiap 8 detik. Pada detik ke-0, kedua lampu berkedip bersamaan. Pernyataan yang benar adalah …',
            gambar: lampuSoal(), gambarPembahasan: lampuBahas(),
            opsi: [
                'Kedua lampu berkedip bersamaan lagi pada detik ke-24.',
                'Dalam 60 detik pertama, kedua lampu berkedip bersamaan lagi sebanyak 2 kali (tidak termasuk detik ke-0).',
                'Kedua lampu berkedip bersamaan setiap 14 detik.',
                'Lampu B berkedip pada detik ke-36.',
                'Lampu A berkedip pada detik ke-42.'
            ],
            kunci: [0, 1, 4],
            pembahasan: 'Kedua lampu berkedip bersamaan setiap KPK dari 6 dan 8, yaitu 24 detik: detik ke-24 dan ke-48, jadi 2 kali dalam 60 detik pertama (A dan B benar). Pilihan C salah karena 14 adalah 6 + 8, bukan KPK. Pilihan D salah karena 36 bukan kelipatan 8. Pilihan E benar karena 42 = 6 × 7.'
        },
        {
            id: 'MAT-035', bentuk: 'PG', kompetensi: 'M05', kesulitan: 'mudah',
            pertanyaan: 'FPB dari 24 dan 36 adalah …',
            gambarPembahasan: tabelFaktor(),
            opsi: ['12', '24', '36', '72'],
            kunci: 0,
            pembahasan: 'Faktor 24: 1, 2, 3, 4, 6, 8, 12, 24. Faktor 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. Faktor persekutuan terbesarnya 12. Angka 72 adalah KPK, bukan FPB.'
        },
        {
            id: 'MAT-036', bentuk: 'PG', kompetensi: 'M05', kesulitan: 'sedang',
            pertanyaan: 'Bu Guru memiliki 48 buku dan 36 pensil. Semua buku dan pensil akan dibagikan ke dalam paket hadiah dengan isi yang sama banyak untuk setiap paket. Paling banyak berapa paket yang dapat dibuat?',
            gambarPembahasan: pohon4836(),
            opsi: ['4 paket', '6 paket', '12 paket', '24 paket'],
            kunci: 2,
            pembahasan: 'Banyak paket terbanyak = FPB dari 48 dan 36. 48 = 2⁴ × 3 dan 36 = 2² × 3², sehingga FPB = 2² × 3 = 12 paket. Setiap paket berisi 48 : 12 = 4 buku dan 36 : 12 = 3 pensil.'
        },
        {
            id: 'MAT-037', bentuk: 'PG', kompetensi: 'M05', kesulitan: 'sulit',
            pertanyaan: 'Rina berenang setiap 4 hari sekali dan Sari setiap 6 hari sekali. Mereka berenang bersama pada hari Senin, 3 Juni. Dengan melihat kalender, mereka akan berenang bersama lagi untuk pertama kalinya pada …',
            gambar: kalenderJuni(false), gambarPembahasan: kalenderJuni(true),
            opsi: ['Kamis, 13 Juni', 'Jumat, 14 Juni', 'Sabtu, 15 Juni', 'Minggu, 16 Juni'],
            kunci: 2,
            pembahasan: 'Mereka bersama setiap KPK dari 4 dan 6, yaitu 12 hari. Tanggal 3 + 12 = 15 Juni. Pada kalender, 15 Juni jatuh pada hari Sabtu. Pilihan 13 Juni muncul jika menghitung 4 + 6 = 10 hari.'
        },
        {
            id: 'MAT-038', bentuk: 'PG', kompetensi: 'M05', kesulitan: 'mudah',
            pertanyaan: 'Perhatikan pohon faktor berikut. Faktorisasi prima dari 60 adalah …',
            gambar: pohon60(false), gambarPembahasan: pohon60(true),
            opsi: ['2² × 3 × 5', '2 × 3 × 5', '2 × 30', '4 × 15'],
            kunci: 0,
            pembahasan: 'Faktor prima pada ujung pohon adalah 2, 2, 3, dan 5. Jadi, 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5. Pilihan 2 × 30 dan 4 × 15 benar hasilnya 60, tetapi 30, 4, dan 15 bukan bilangan prima.'
        },
        {
            id: 'MAT-039', bentuk: 'MCMA', kompetensi: 'M05', kesulitan: 'sulit',
            pertanyaan: 'Lantai berbentuk persegi panjang seperti gambar akan ditutup ubin persegi yang semuanya sama besar, tanpa ada ubin yang dipotong. Pernyataan yang benar adalah …',
            gambar: lantaiUbin(false), gambarPembahasan: lantaiUbin(true),
            opsi: [
                'Ukuran sisi ubin terbesar yang dapat dipakai adalah 30 cm.',
                'Jika memakai ubin terbesar, diperlukan 12 ubin.',
                'Jika memakai ubin bersisi 15 cm, diperlukan 24 ubin.',
                'Ubin bersisi 20 cm dapat dipakai tanpa dipotong.',
                'Ubin bersisi 25 cm dapat dipakai tanpa dipotong.'
            ],
            kunci: [0, 1],
            pembahasan: 'Sisi ubin harus membagi habis 120 dan 90. Sisi terbesar = FPB(120, 90) = 30 cm (A benar), sehingga diperlukan 4 × 3 = 12 ubin (B benar). Ubin 15 cm: 8 × 6 = 48 ubin (C salah). 90 tidak habis dibagi 20 (D salah). 120 dan 90 tidak habis dibagi 25 (E salah).'
        },
        {
            id: 'MAT-040', bentuk: 'BS', kompetensi: 'M05', kesulitan: 'sedang',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan berikut.',
            opsi: [
                'KPK dari 6 dan 9 adalah 18.',
                'FPB dari 15 dan 25 adalah 5.',
                'KPK dari dua bilangan prima yang berbeda sama dengan hasil kali kedua bilangan itu.',
                'FPB dari 8 dan 9 adalah 72.'
            ],
            kunci: [true, true, true, false],
            pembahasan: '(1) Benar: kelipatan 6 dan 9 yang pertama sama adalah 18. (2) Benar: 15 = 3 × 5 dan 25 = 5 × 5, faktor sama terbesar 5. (3) Benar: dua bilangan prima berbeda tidak punya faktor sama selain 1, contohnya KPK 3 dan 7 = 21. (4) Salah: 8 dan 9 hanya memiliki faktor sama 1, jadi FPB-nya 1; 72 adalah KPK-nya.'
        },
        {
            id: 'MAT-041', bentuk: 'PG', kompetensi: 'M05', kesulitan: 'sulit',
            pertanyaan: 'Bus jurusan A berangkat dari terminal setiap 15 menit, sedangkan bus jurusan B setiap 20 menit. Kedua bus berangkat bersamaan pertama kali pukul 06.00. Pukul berapa kedua bus berangkat bersamaan untuk ketiga kalinya?',
            gambarPembahasan: garisBus(),
            opsi: ['06.40', '07.00', '07.40', '08.00'],
            kunci: 3,
            pembahasan: 'KPK dari 15 dan 20 adalah 60 menit, jadi bus berangkat bersamaan setiap 1 jam: pukul 06.00 (ke-1), 07.00 (ke-2), dan 08.00 (ke-3). Pilihan 07.00 adalah kali kedua.'
        },

        /* ================= M06 Perbandingan, skala, kecepatan ================= */
        {
            id: 'MAT-042', bentuk: 'PG', kompetensi: 'M06', kesulitan: 'sedang',
            pertanyaan: 'Perbandingan banyak kelereng Andi dan Budi adalah 3 : 5. Jumlah kelereng mereka 48 butir. Banyak kelereng Budi adalah …',
            gambarPembahasan: modelBatang(3, 5, 6, 'Andi', 'Budi', '8 bagian = 48, 1 bagian = 6 → Budi = 5 × 6 = 30'),
            opsi: ['16 butir', '18 butir', '30 butir', '40 butir'],
            kunci: 2,
            pembahasan: 'Jumlah bagian = 3 + 5 = 8. Satu bagian = 48 : 8 = 6 butir. Budi = 5 × 6 = 30 butir, sedangkan Andi = 3 × 6 = 18 butir.'
        },
        {
            id: 'MAT-043', bentuk: 'PG', kompetensi: 'M06', kesulitan: 'sulit',
            pertanyaan: 'Jarak Kota P dan Kota Q pada peta diukur dengan penggaris seperti gambar. Jarak sebenarnya kedua kota adalah …',
            gambar: peta(false), gambarPembahasan: peta(true),
            opsi: ['0,3 km', '3 km', '6 km', '30 km'],
            kunci: 3,
            pembahasan: 'Kota P di 0,5 cm dan Kota Q di 6,5 cm, jadi jarak pada peta 6 cm. Jarak sebenarnya = 6 × 500.000 = 3.000.000 cm. Karena 1 km = 100.000 cm, maka 3.000.000 cm = 30 km. Perhatikan penggaris tidak dimulai dari 0.'
        },
        {
            id: 'MAT-044', bentuk: 'PG', kompetensi: 'M06', kesulitan: 'sulit',
            pertanyaan: 'Pak Rahmat mengendarai sepeda motor dari kota A ke kota B yang berjarak 150 km dengan kecepatan rata-rata 60 km/jam. Ia berangkat pukul 07.15. Pak Rahmat tiba di kota B pukul …',
            opsi: ['08.45', '09.15', '09.30', '09.45'],
            kunci: 3,
            pembahasan: 'Waktu tempuh = jarak : kecepatan = 150 : 60 = 2,5 jam = 2 jam 30 menit. Tiba pukul 07.15 + 2 jam 30 menit = 09.45.'
        },
        {
            id: 'MAT-045', bentuk: 'MCMA', kompetensi: 'M06', kesulitan: 'sulit',
            pertanyaan: 'Ibu akan membuat kue bolu untuk 10 porsi menggunakan resep seperti gambar. Pernyataan yang benar adalah …',
            gambar: kartuResep(false), gambarPembahasan: kartuResep(true),
            opsi: [
                'Tepung terigu yang diperlukan untuk 10 porsi adalah 500 g.',
                'Telur yang diperlukan untuk 10 porsi adalah 5 butir.',
                'Susu yang diperlukan untuk 10 porsi adalah 600 ml.',
                'Perbandingan berat tepung dan banyak susu (dalam g dan ml) adalah 2 : 3.',
                'Untuk 2 porsi diperlukan 150 ml susu.'
            ],
            kunci: [0, 1, 3, 4],
            pembahasan: '10 porsi = 2,5 kali resep. Tepung 2,5 × 200 = 500 g (A benar), telur 2,5 × 2 = 5 butir (B benar), susu 2,5 × 300 = 750 ml (C salah). 200 : 300 = 2 : 3 (D benar). 2 porsi = setengah resep, susu 150 ml (E benar).'
        },
        {
            id: 'MAT-046', bentuk: 'BS', kompetensi: 'M06', kesulitan: 'sulit',
            pertanyaan: 'Gambar berikut adalah denah ruang kelas pada kertas berpetak. Tentukan Benar atau Salah setiap pernyataan.',
            gambar: denah(false), gambarPembahasan: denah(true),
            opsi: [
                'Panjang ruang kelas sebenarnya adalah 8 m.',
                'Luas ruang kelas sebenarnya adalah 48 m².',
                'Keliling ruang kelas sebenarnya adalah 14 m.',
                'Jika denah dibuat dengan skala 1 : 200, panjang ruang kelas pada denah menjadi 16 cm.'
            ],
            kunci: [true, true, false, false],
            pembahasan: 'Pada denah, ruang kelas berukuran 8 petak × 6 petak = 8 cm × 6 cm. Dengan skala 1 : 100, ukuran sebenarnya 800 cm × 600 cm = 8 m × 6 m. (1) Benar. (2) Benar: 8 × 6 = 48 m². (3) Salah: keliling = 2 × (8 + 6) = 28 m. (4) Salah: 800 cm : 200 = 4 cm; skala yang lebih besar penyebutnya membuat gambar lebih kecil.'
        },
        {
            id: 'MAT-047', bentuk: 'PG', kompetensi: 'M06', kesulitan: 'mudah',
            pertanyaan: 'Air dari keran mengalir dengan debit 5 liter per menit. Waktu yang diperlukan untuk mengisi ember yang dapat menampung 40 liter sampai penuh adalah …',
            opsi: ['8 menit', '35 menit', '45 menit', '200 menit'],
            kunci: 0,
            pembahasan: 'Waktu = volume : debit = 40 : 5 = 8 menit. Pilihan 200 muncul jika volume dikalikan dengan debit.'
        },
        {
            id: 'MAT-048', bentuk: 'PG', kompetensi: 'M06', kesulitan: 'sulit',
            pertanyaan: 'Perbandingan umur ayah dan umur Dani adalah 7 : 2. Selisih umur mereka 35 tahun. Umur Dani sekarang adalah …',
            gambarPembahasan: modelBatang(7, 2, 7, 'Ayah', 'Dani', 'selisih 5 bagian = 35 → 1 bagian = 7 → Dani = 14'),
            opsi: ['5 tahun', '7 tahun', '10 tahun', '14 tahun'],
            kunci: 3,
            pembahasan: 'Selisih bagian = 7 − 2 = 5 bagian = 35 tahun, sehingga 1 bagian = 7 tahun. Umur Dani = 2 × 7 = 14 tahun dan umur ayah = 7 × 7 = 49 tahun.'
        },
        {
            id: 'MAT-049', bentuk: 'PG', kompetensi: 'M06', kesulitan: 'sedang',
            pertanyaan: 'Lina bersepeda dengan kecepatan tetap 12 km/jam selama 1 jam 30 menit. Jarak yang ditempuh Lina adalah …',
            opsi: ['13,5 km', '15 km', '18 km', '24 km'],
            kunci: 2,
            pembahasan: '1 jam 30 menit = 1,5 jam. Jarak = kecepatan × waktu = 12 × 1,5 = 18 km. Pilihan 24 km muncul jika waktunya dianggap 2 jam.'
        }
    ]);
})(TKA.gambarMat);
