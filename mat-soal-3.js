/*
 * Bank soal Matematika — bagian 3 (MAT-050 s.d. MAT-074):
 * M07 pola dan penalaran, M08 pengukuran, M09 keliling dan luas bangun datar.
 */
(function (G) {
    'use strict';
    var svg = G.svg, teks = G.teks, tebal = G.tebal, garis = G.garis, kotak = G.kotak, lingkar = G.lingkar, jalur = G.jalur;
    var NAVY = G.NAVY;

    /* ---------- M07 ---------- */
    function korek(bahas) {
        var isi = '', s = 34, st = 'stroke="#d58a25" stroke-width="5" stroke-linecap="round"';
        function pola(x0, n, y0) {
            var r = '';
            for (var i = 0; i <= n; i++) { r += garis(x0 + i * s, y0 + 4, x0 + i * s, y0 + s - 4, st); }
            for (var j = 0; j < n; j++) {
                r += garis(x0 + j * s + 4, y0, x0 + (j + 1) * s - 4, y0, st) + garis(x0 + j * s + 4, y0 + s, x0 + (j + 1) * s - 4, y0 + s, st);
            }
            return r;
        }
        isi += pola(20, 1, 40) + pola(90, 2, 40) + pola(196, 3, 40);
        isi += teks(37, 104, 'Pola 1', 12) + teks(124, 104, 'Pola 2', 12) + teks(247, 104, 'Pola 3', 12);
        if (bahas) {
            isi += teks(37, 124, '4 batang', 12, tebal(G.HIJAU)) + teks(124, 124, '7 batang', 12, tebal(G.HIJAU)) +
                teks(247, 124, '10 batang', 12, tebal(G.HIJAU)) + teks(80, 22, '+3', 13, tebal(G.MERAH)) + teks(170, 22, '+3', 13, tebal(G.MERAH)) +
                teks(170, 150, 'Pola ke-n = 3 × n + 1', 14, tebal());
        }
        return svg(340, bahas ? 165 : 115, isi);
    }

    function titikSegitiga(bahas) {
        var isi = '', x = 20, d = 16;
        [1, 2, 3, 4].forEach(function (n, k) {
            var lebar = n * d;
            for (var r = 0; r < n; r++) {
                for (var c = 0; c <= r; c++) {
                    isi += lingkar(x + lebar / 2 - r * d / 2 + c * d, 30 + r * d, 5, '#315efb', 'stroke="none"');
                }
            }
            isi += teks(x + lebar / 2, 120, 'Pola ' + n, 12);
            if (bahas) { isi += teks(x + lebar / 2, 140, [1, 3, 6, 10][k] + ' titik', 12, tebal(G.HIJAU)); }
            x += lebar + 40;
        });
        if (bahas) { isi += teks(170, 168, '+2, +3, +4, lalu +5 → pola ke-5 = 10 + 5 = 15', 13, tebal(G.MERAH)); }
        return svg(360, bahas ? 180 : 130, isi);
    }

    function persegiPola(bahas) {
        var isi = '', x = 15, c = 16;
        [1, 2, 3, 4].forEach(function (n) {
            for (var r = 0; r < n; r++) { for (var k = 0; k < n; k++) { isi += kotak(x + k * c, 90 - n * c + r * c, c, c, '#ffe9a8', 'stroke="#172b4d" stroke-width="1.2"'); } }
            isi += teks(x + n * c / 2, 112, 'Pola ' + n, 12);
            if (bahas) { isi += teks(x + n * c / 2, 132, n + ' × ' + n + ' = ' + n * n, 12, tebal(G.HIJAU)); }
            x += n * c + 35;
        });
        if (bahas) { isi += teks(170, 160, '81 = 9 × 9 → pola ke-9', 14, tebal(G.MERAH)); }
        return svg(340, bahas ? 172 : 122, isi);
    }

    function neracaBentuk(bahas) {
        var B = G.bentuk;
        var n1 = G.neraca(B('segitiga', 18) + B('segitiga', 42), B('lingkaran', 28));
        var n2 = G.neraca(B('lingkaran', 14) + B('segitiga', 40), B('beban', 22, null, '12 g'));
        var isi = '<g>' + n1.replace(/^<svg[^>]*>|<\/svg>$/g, '') + '</g><g transform="translate(320,0)">' + n2.replace(/^<svg[^>]*>|<\/svg>$/g, '') + '</g>' +
            teks(150, 192, 'Neraca 1', 13, tebal()) + teks(470, 192, 'Neraca 2', 13, tebal());
        if (bahas) {
            isi += teks(310, 222, '1 lingkaran = 2 segitiga, jadi neraca 2: 2 + 1 = 3 segitiga = 12 g', 13) +
                teks(310, 246, '1 segitiga = 12 : 3 = 4 g   (1 lingkaran = 8 g)', 14, tebal(G.HIJAU));
        }
        return svg(620, bahas ? 258 : 202, isi);
    }

    function manik(bahas) {
        var warna = ['#e8564f', '#f4b740', '#315efb'], huruf = ['M', 'K', 'B'], isi = '';
        var n = bahas ? 12 : 7;
        garis(0, 0, 0, 0);
        isi += garis(10, 50, 30 + n * 38, 50, 'stroke="#8a94a6" stroke-width="2"');
        for (var i = 0; i < n; i++) {
            isi += lingkar(30 + i * 38, 50, 15, warna[i % 3]) + teks(30 + i * 38, 55, huruf[i % 3], 12, tebal('#fff'));
            if (bahas) { isi += teks(30 + i * 38, 86, i + 1, 11); }
        }
        if (!bahas) { isi += teks(30 + n * 38 + 4, 55, '…', 18, tebal()); }
        else {
            isi += teks(240, 112, 'M di urutan 1, 4, 7, 10, …  K di 2, 5, 8, …  B di 3, 6, 9, …', 12) +
                teks(240, 132, 'ke-10: sisa 10 : 3 = 1 → M · ke-20: sisa 2 → K · ke-30: sisa 0 → B', 12, tebal(G.HIJAU));
        }
        return svg(bahas ? 490 : 320, bahas ? 142 : 80, isi);
    }

    function lipatKertas(bahas) {
        var isi = '';
        [[1, 2, 1], [2, 2, 2], [3, 4, 2]].forEach(function (p, i) {
            var x = 20 + i * 140, w = 110, h = 80;
            isi += kotak(x, 20, w, h, '#fff7dc');
            for (var c = 1; c < p[1]; c++) { isi += garis(x + c * w / p[1], 20, x + c * w / p[1], 20 + h, 'stroke="#d58a25" stroke-width="1.5" stroke-dasharray="5 4"'); }
            for (var r = 1; r < p[2]; r++) { isi += garis(x, 20 + r * h / p[2], x + w, 20 + r * h / p[2], 'stroke="#d58a25" stroke-width="1.5" stroke-dasharray="5 4"'); }
            isi += teks(x + w / 2, 120, 'Dilipat ' + p[0] + ' kali', 12);
            if (bahas) { isi += teks(x + w / 2, 140, p[1] * p[2] + ' bagian', 12, tebal(G.HIJAU)); }
        });
        if (bahas) { isi += teks(210, 168, '2 → 4 → 8 → 16 → 32 (setiap lipatan × 2)', 13, tebal(G.MERAH)); }
        return svg(430, bahas ? 180 : 130, isi);
    }

    /* ---------- M08 ---------- */
    function jamBahas() {
        var a = G.jam(8, 40).replace(/^<svg[^>]*>|<\/svg>$/g, ''), b = G.jam(10, 15).replace(/^<svg[^>]*>|<\/svg>$/g, '');
        return svg(470, 220, '<g>' + a + '</g><g transform="translate(270,0)">' + b + '</g>' +
            jalur('M190 90 L260 90 M250 82 L260 90 L250 98', 'none', 'stroke="' + G.HIJAU + '" stroke-width="2.5"') +
            teks(225, 80, '+1 jam 35 mnt', 11, tebal(G.HIJAU)) + teks(90, 200, 'mulai 08.40', 13, tebal()) + teks(360, 200, 'selesai 10.15', 13, tebal(G.HIJAU)));
    }

    function penggarisPensil(bahas) {
        var pg = G.penggaris(13, { y: 70, sk: 32 });
        var xa = pg.x(2), xb = pg.x(11.5);
        var isi = jalur('M' + xa + ' 45 L' + (xb - 26) + ' 34 L' + (xb - 26) + ' 56 Z', '#f4b740') +
            kotak(xa + 0, 34, xb - xa - 26, 22, '#f4b740', 'stroke="#172b4d" stroke-width="1.5"') +
            jalur('M' + (xb - 26) + ' 34 L' + xb + ' 45 L' + (xb - 26) + ' 56 Z', '#f3d2a2') +
            jalur('M' + (xb - 8) + ' 41 L' + xb + ' 45 L' + (xb - 8) + ' 49 Z', '#172b4d') +
            kotak(xa - 14, 34, 14, 22, '#e8a0b4', 'stroke="#172b4d" stroke-width="1.5"') +
            pg.isi;
        // ujung kiri pensil (penghapus) tepat di 2 cm
        isi = isi.replace('M' + xa + ' 45', 'M' + xa + ' 45');
        isi += garis(xa, 56, xa, 70, 'stroke="#d64545" stroke-width="1.2" stroke-dasharray="3 3"') + garis(xb, 49, xb, 70, 'stroke="#d64545" stroke-width="1.2" stroke-dasharray="3 3"');
        if (bahas) { isi += teks(pg.lebar / 2, 140, 'Panjang = 11,5 − 2 = 9,5 cm', 14, tebal(G.HIJAU)); }
        return svg(pg.lebar + 10, bahas ? 152 : 125, isi.replace(kotak(xa - 14, 34, 14, 22, '#e8a0b4', 'stroke="#172b4d" stroke-width="1.5"'), ''));
    }

    function jadwalKereta(bahas) {
        return G.tabel([110, 110, 110].concat(bahas ? [110] : []), [
            ['Kereta', 'Berangkat', 'Tiba'].concat(bahas ? ['Lama'] : []),
            ['KA Fajar', '06.45', '09.20'].concat(bahas ? ['2 j 35 m'] : []),
            ['KA Senja', '13.10', '15.30'].concat(bahas ? ['2 j 20 m'] : []),
            ['KA Malam', '19.50', '22.05'].concat(bahas ? ['2 j 15 m'] : [])
        ], bahas ? { sorot: function (i, j) { return i === 3 && j === 3; } } : null);
    }

    function gantMasak() {
        var x0 = 110, k = 5, isi = '';
        [['Nasi', 0, 45, '#ffe9a8'], ['Ayam', 0, 25, '#fde0e0'], ['Sayur', 25, 20, '#cdeedd']].forEach(function (b, i) {
            var y = 20 + i * 36;
            isi += teks(x0 - 10, y + 18, b[0], 13, 'text-anchor="end" ' + tebal()) +
                kotak(x0 + b[1] * k, y, b[2] * k, 26, b[3], 'stroke="#172b4d" stroke-width="1.5"') + teks(x0 + b[1] * k + b[2] * k / 2, y + 18, b[2] + ' mnt', 11);
        });
        [0, 25, 45].forEach(function (t, i) {
            isi += garis(x0 + t * k, 16, x0 + t * k, 130, 'stroke="#8a94a6" stroke-width="1" stroke-dasharray="3 3"') +
                teks(x0 + t * k, 146, ['10.30', '10.55', '11.15'][i], 12, tebal(i === 2 ? G.HIJAU : null));
        });
        return svg(x0 + 50 * k + 30, 158, isi);
    }

    function neracaKelapa(bahas) {
        function kelapa(x) { return lingkar(x + 9, 67, 10, '#8b5a2b'); }
        function semangka(x) { return '<ellipse cx="' + (x + 18) + '" cy="64" rx="18" ry="13" fill="#4caf50" stroke="#172b4d" stroke-width="2"/>'; }
        var B = G.bentuk;
        var n1 = G.neraca(kelapa(2) + kelapa(22) + kelapa(42) + kelapa(62), B('beban', 24, null, '6 kg'));
        var n2 = G.neraca(kelapa(8) + semangka(36), B('beban', 24, null, '5 kg'));
        var st = function (s) { return s.replace(/^<svg[^>]*>|<\/svg>$/g, ''); };
        var isi = '<g>' + st(n1) + '</g><g transform="translate(320,0)">' + st(n2) + '</g>' +
            teks(150, 192, 'Neraca 1', 13, tebal()) + teks(470, 192, 'Neraca 2', 13, tebal());
        if (bahas) {
            isi += teks(310, 222, '4 kelapa = 6 kg → 1 kelapa = 1,5 kg', 13) + teks(310, 246, 'semangka = 5 − 1,5 = 3,5 kg', 14, tebal(G.HIJAU));
        }
        return svg(620, bahas ? 258 : 202, isi);
    }

    /* ---------- M09 ---------- */
    function taman(bahas) {
        var S = G.S, isi;
        if (!bahas) {
            isi = jalur('M40 20 H180 V100 H280 V220 H40 Z', '#dff3e8') + teks(110, 14, '7 m') + teks(18, 125, '10 m') + teks(160, 240, '12 m') + teks(304, 165, '6 m');
        } else {
            isi = kotak(40, 20, 140, 80, '#cfe0ff') + kotak(40, 100, 240, 120, '#dff3e8') + garis(40, 100, 180, 100, G.putus()) +
                teks(110, 14, '7 m') + teks(18, 65, '4 m', 13, 'fill="#315efb"') + teks(18, 165, '6 m', 13) + teks(160, 240, '12 m') + teks(304, 165, '6 m') +
                teks(230, 92, '5 m', 13, 'fill="#d64545"') + teks(193, 62, '4 m', 13, 'fill="#d64545"') +
                teks(110, 58, 'I: 7 × 4', 13, tebal()) + teks(110, 76, '= 28 m²', 13) + teks(160, 158, 'II: 12 × 6', 13, tebal()) + teks(160, 176, '= 72 m²', 13);
            void S;
        }
        return svg(330, 250, isi);
    }

    function persegiPanjang(p, l, lp, ll, bahas, ket) {
        var isi = kotak(40, 30, p, l, '#edf1ff') + teks(40 + p / 2, 22, lp, 13, tebal()) + teks(48 + p, 34 + l / 2, ll, 13, 'text-anchor="start" ' + tebal());
        if (bahas && ket) { isi += teks(40 + p / 2, 34 + l / 2, ket, 13, tebal(G.HIJAU)); }
        return svg(p + 120, l + 50, isi);
    }

    function segitigaLuas(bahas) {
        // alas 12 (×20 px), tinggi 9, sisi kiri 10 (offset 4,36)
        var x0 = 30, y0 = 210, k = 20, ax = x0 + 4.36 * k, ay = y0 - 9 * k;
        var isi = jalur('M' + x0 + ' ' + y0 + ' L' + (x0 + 12 * k) + ' ' + y0 + ' L' + ax + ' ' + ay + ' Z', '#edf1ff') +
            garis(ax, ay, ax, y0, 'stroke="#d64545" stroke-width="1.6" stroke-dasharray="5 4"') +
            jalur('M' + ax + ' ' + (y0 - 12) + ' L' + (ax + 12) + ' ' + (y0 - 12) + ' L' + (ax + 12) + ' ' + y0, 'none', 'stroke="#d64545" stroke-width="1.2"') +
            teks(x0 + 6 * k, y0 + 22, '12 cm', 13, tebal()) + teks(ax + 8, y0 - 4.5 * k, '9 cm', 13, 'text-anchor="start" ' + tebal(G.MERAH)) +
            teks(x0 + 1.4 * k, y0 - 4.8 * k, '10 cm', 13, 'text-anchor="end" ' + tebal());
        if (bahas) { isi += teks(x0 + 8.5 * k, y0 - 5.5 * k, 'L = 12 × 9 : 2', 13, 'text-anchor="start" ' + tebal(G.HIJAU)) + teks(x0 + 8.5 * k, y0 - 4.5 * k, '= 54 cm²', 13, 'text-anchor="start" ' + tebal(G.HIJAU)); }
        return svg(330, 240, isi);
    }

    function lingkaranD(bahas) {
        var isi = lingkar(110, 110, 85, '#edf1ff') + garis(25, 110, 195, 110, 'stroke="#d64545" stroke-width="2"') + lingkar(110, 110, 3, '#172b4d', '') +
            teks(110, 100, '28 cm', 13, tebal(G.MERAH));
        if (bahas) { isi += teks(300, 95, 'K = π × d', 13, tebal()) + teks(300, 118, '= 22/7 × 28', 13) + teks(300, 141, '= 88 cm', 14, tebal(G.HIJAU)); }
        return svg(bahas ? 380 : 220, 220, isi);
    }

    function persegiLingkaran(bahas) {
        var isi = kotak(30, 20, 196, 196, '#7fa3ff') + lingkar(128, 118, 98, '#fff') +
            teks(128, 238, '14 cm', 13, tebal());
        if (bahas) {
            isi += garis(30, 118, 226, 118, 'stroke="#d64545" stroke-width="1.5" stroke-dasharray="5 4"') + teks(128, 110, 'd = 14 cm', 12, tebal(G.MERAH)) +
                teks(330, 90, 'Persegi: 14 × 14 = 196', 13, 'text-anchor="middle"') + teks(330, 114, 'Lingkaran: 22/7 × 7 × 7 = 154', 13) +
                teks(330, 142, 'Arsir: 196 − 154 = 42 cm²', 14, tebal(G.HIJAU));
        }
        return svg(bahas ? 450 : 260, 250, isi);
    }

    function lapangan(bahas) {
        var isi = kotak(40, 30, 320, 200, '#cdeedd') + garis(200, 30, 200, 230, 'stroke="#fff" stroke-width="2"') + lingkar(200, 130, 30, 'none', 'stroke="#fff" stroke-width="2"') +
            teks(200, 22, '40 m', 13, tebal()) + teks(368, 134, '25 m', 13, 'text-anchor="start" ' + tebal());
        if (bahas) {
            for (var i = 0; i < 26; i++) {
                var d = i * 5, x, y;
                if (d <= 40) { x = 40 + d * 8; y = 30; } else if (d <= 65) { x = 360; y = 30 + (d - 40) * 8; }
                else if (d <= 105) { x = 360 - (d - 65) * 8; y = 230; } else { x = 40; y = 230 - (d - 105) * 8; }
                isi += lingkar(x, y, 3.5, '#d64545', 'stroke="none"');
            }
            isi += teks(200, 262, 'Keliling 2 × (40 + 25) = 130 m · tiang setiap 5 m: 130 : 5 = 26 tiang', 12, tebal(G.HIJAU));
        }
        return svg(420, bahas ? 275 : 245, isi);
    }

    function bangunSifat(bahas) {
        var isi = '';
        isi += jalur('M60 20 L100 70 L60 120 L20 70 Z', '#edf1ff') + teks(60, 145, 'Belah ketupat', 12, tebal());
        isi += jalur('M150 110 L250 110 L225 40 L175 40 Z', '#edf1ff') + teks(200, 145, 'Trapesium', 12, tebal());
        isi += kotak(285, 40, 110, 70, '#edf1ff') + teks(340, 145, 'Persegi panjang', 12, tebal());
        isi += jalur('M480 20 L515 55 L480 125 L445 55 Z', '#edf1ff') + teks(480, 145, 'Layang-layang', 12, tebal());
        if (bahas) {
            var mk = function (x1, y1, x2, y2) { var mx = (x1 + x2) / 2, my = (y1 + y2) / 2; return lingkar(mx, my, 3, '#d64545', 'stroke="none"'); };
            isi += mk(60, 20, 100, 70) + mk(100, 70, 60, 120) + mk(60, 120, 20, 70) + mk(20, 70, 60, 20) +
                teks(200, 165, '1 pasang sisi sejajar', 11, 'fill="#d64545"') + teks(60, 165, '4 sisi sama', 11, 'fill="#16a36a"') +
                teks(340, 165, '4 sudut 90°', 11, 'fill="#16a36a"') +
                garis(480, 20, 480, 125, G.putus()) + garis(445, 55, 515, 55, G.putus()) + teks(480, 165, 'diagonal beda panjang', 11, 'fill="#d64545"');
            isi += jalur('M285 52 L297 52 L297 40', 'none', 'stroke="#16a36a" stroke-width="1.5"');
        }
        return svg(540, bahas ? 175 : 155, isi);
    }

    function petakLuas(bahas) {
        var c = 34, x0 = 20, y0 = 20, isi = '';
        // kisi 8 × 5
        for (var i = 0; i <= 8; i++) { isi += garis(x0 + i * c, y0, x0 + i * c, y0 + 5 * c, 'stroke="#c4ccdc" stroke-width="1"'); }
        for (var j = 0; j <= 5; j++) { isi += garis(x0, y0 + j * c, x0 + 8 * c, y0 + j * c, 'stroke="#c4ccdc" stroke-width="1"'); }
        // titik (gx, gy) dengan gy dari atas
        var P = function (gx, gy) { return (x0 + gx * c) + ' ' + (y0 + gy * c); };
        isi += jalur('M' + P(1, 4) + ' L' + P(7, 4) + ' L' + P(5, 2) + ' L' + P(5, 1) + ' L' + P(1, 1) + ' Z', 'rgba(127,163,255,.55)', 'stroke="#172b4d" stroke-width="2.5"');
        if (bahas) {
            for (var gx = 1; gx < 5; gx++) { for (var gy = 1; gy < 4; gy++) { isi += teks(x0 + gx * c + c / 2, y0 + gy * c + c / 2 + 5, '1', 11, tebal()); } }
            isi += teks(x0 + 5.5 * c, y0 + 3.5 * c + 5, '1', 11, tebal()) +
                teks(x0 + 5.35 * c, y0 + 2.75 * c, '½', 12, tebal(G.MERAH)) + teks(x0 + 6.3 * c, y0 + 3.7 * c, '½', 12, tebal(G.MERAH)) +
                teks(x0 + 4 * c, y0 + 5 * c + 26, '13 petak penuh + 2 setengah petak = 14 cm²', 13, tebal(G.HIJAU));
        }
        return svg(x0 * 2 + 8 * c, y0 + 5 * c + (bahas ? 40 : 14), isi);
    }

    function setengahLingkaran(bahas) {
        // persegi panjang 14 × 10 (×14 px), setengah lingkaran di sisi atas
        var k = 14, x0 = 75, y0 = 130, w = 14 * k, h = 10 * k;
        var isi = jalur('M' + x0 + ' ' + y0 + ' A' + (w / 2) + ' ' + (w / 2) + ' 0 0 1 ' + (x0 + w) + ' ' + y0 + ' L' + (x0 + w) + ' ' + (y0 + h) + ' L' + x0 + ' ' + (y0 + h) + ' Z', '#ffe9a8');
        isi += teks(x0 + w / 2, y0 + h + 22, '14 cm', 13, tebal()) + teks(x0 - 8, y0 + h / 2 + 4, '10 cm', 13, 'text-anchor="end" ' + tebal());
        if (bahas) {
            isi += garis(x0, y0, x0 + w, y0, G.putus()) + teks(x0 + w / 2, y0 - 8, 'd = 14 (tidak dihitung)', 11, 'fill="#d64545"') +
                teks(x0 + w / 2, y0 - w / 2 - 8, 'busur = 1/2 × 22/7 × 14 = 22', 12, tebal(G.BIRU)) +
                teks(x0 + w / 2, y0 + h / 2 + 4, '14 + 10 + 10 + 22 = 56 cm', 13, tebal(G.HIJAU));
        }
        return svg(x0 + w + 40, y0 + h + 34, isi);
    }

    TKA.tambahSoal('mat', [
        /* ================= M07 Pola bilangan dan penalaran ================= */
        {
            id: 'MAT-050', bentuk: 'BS', kompetensi: 'M07', kesulitan: 'sulit',
            pertanyaan: 'Batang korek api disusun membentuk pola persegi seperti gambar. Tentukan Benar atau Salah setiap pernyataan berikut.',
            gambar: korek(false), gambarPembahasan: korek(true),
            opsi: [
                'Pola ke-4 memerlukan 13 batang korek api.',
                'Pola ke-10 memerlukan 31 batang korek api.',
                'Dengan tepat 50 batang korek api, dapat dibuat satu pola tanpa sisa batang.',
                'Setiap pola berikutnya memerlukan 4 batang lebih banyak daripada pola sebelumnya.'
            ],
            kunci: [true, true, false, false],
            pembahasan: 'Hitung batang pada gambar: 4, 7, 10. Setiap pola bertambah 3 batang (pernyataan 4 Salah), sehingga pola ke-n = 3 × n + 1. Pola ke-4 = 13 (Benar) dan pola ke-10 = 31 (Benar). Pola ke-16 memerlukan 49 batang dan pola ke-17 memerlukan 52 batang, jadi 50 batang tidak pas untuk pola mana pun (Salah).'
        },
        {
            id: 'MAT-051', bentuk: 'PG', kompetensi: 'M07', kesulitan: 'mudah',
            pertanyaan: 'Perhatikan pola bilangan 3, 7, 11, 15, … . Suku ke-6 pola tersebut adalah …',
            opsi: ['18', '19', '21', '23'],
            kunci: 3,
            pembahasan: 'Setiap suku bertambah 4. Suku ke-5 = 15 + 4 = 19 dan suku ke-6 = 19 + 4 = 23. Pilihan 19 adalah suku ke-5.'
        },
        {
            id: 'MAT-052', bentuk: 'PG', kompetensi: 'M07', kesulitan: 'sedang',
            pertanyaan: 'Titik-titik disusun membentuk pola segitiga seperti gambar. Banyak titik pada pola ke-5 adalah …',
            gambar: titikSegitiga(false), gambarPembahasan: titikSegitiga(true),
            opsi: ['12', '14', '15', '21'],
            kunci: 2,
            pembahasan: 'Banyak titik: 1, 3, 6, 10. Tambahannya +2, +3, +4, sehingga berikutnya +5. Pola ke-5 = 10 + 5 = 15 titik. Pilihan 14 muncul jika tambahannya dianggap selalu 4.'
        },
        {
            id: 'MAT-053', bentuk: 'PG', kompetensi: 'M07', kesulitan: 'sulit',
            pertanyaan: 'Persegi kecil disusun membentuk pola seperti gambar. Pola ke berapakah yang tersusun dari 81 persegi kecil?',
            gambar: persegiPola(false), gambarPembahasan: persegiPola(true),
            opsi: ['ke-9', 'ke-18', 'ke-27', 'ke-81'],
            kunci: 0,
            pembahasan: 'Pola ke-n berbentuk persegi n × n: 1, 4, 9, 16, … . Karena 9 × 9 = 81, maka 81 persegi kecil adalah pola ke-9.'
        },
        {
            id: 'MAT-054', bentuk: 'MCMA', kompetensi: 'M07', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan pola bilangan 2, 6, 18, 54, … . Pernyataan yang benar adalah …',
            opsi: ['Setiap suku diperoleh dengan mengalikan suku sebelumnya dengan 3.', 'Suku ke-5 adalah 162.', 'Suku ke-6 adalah 486.', 'Semua suku pola itu habis dibagi 4.', 'Suku ke-5 adalah 108.'],
            kunci: [0, 1, 2],
            pembahasan: '6 = 2 × 3, 18 = 6 × 3, 54 = 18 × 3 (A benar). Suku ke-5 = 54 × 3 = 162 (B benar, E salah). Suku ke-6 = 162 × 3 = 486 (C benar). D salah karena 2, 6, dan 18 tidak habis dibagi 4.'
        },
        {
            id: 'MAT-055', bentuk: 'PG', kompetensi: 'M07', kesulitan: 'sulit',
            pertanyaan: 'Kedua neraca berikut dalam keadaan seimbang. Benda yang bentuknya sama memiliki berat yang sama. Berat satu segitiga adalah …',
            gambar: neracaBentuk(false), gambarPembahasan: neracaBentuk(true),
            opsi: ['4 g', '6 g', '8 g', '12 g'],
            kunci: 0,
            pembahasan: 'Neraca 1: 2 segitiga = 1 lingkaran. Pada neraca 2, lingkaran dapat diganti 2 segitiga, sehingga 3 segitiga = 12 g. Satu segitiga = 12 : 3 = 4 g dan satu lingkaran = 8 g. Pilihan 8 g adalah berat lingkaran.'
        },
        {
            id: 'MAT-056', bentuk: 'BS', kompetensi: 'M07', kesulitan: 'sedang',
            pertanyaan: 'Manik-manik dirangkai dengan pola warna merah (M), kuning (K), biru (B) yang berulang seperti gambar. Tentukan Benar atau Salah setiap pernyataan.',
            gambar: manik(false), gambarPembahasan: manik(true),
            opsi: [
                'Manik ke-10 berwarna merah.',
                'Manik ke-20 berwarna kuning.',
                'Manik ke-30 berwarna merah.',
                'Dalam 30 manik pertama terdapat 10 manik kuning.'
            ],
            kunci: [true, true, false, true],
            pembahasan: 'Pola berulang setiap 3 manik. Bagi urutannya dengan 3 dan lihat sisanya: sisa 1 = merah, sisa 2 = kuning, sisa 0 = biru. 10 : 3 sisa 1 → merah (Benar). 20 : 3 sisa 2 → kuning (Benar). 30 : 3 sisa 0 → biru (Salah). 30 manik = 10 kali ulangan, jadi ada 10 manik kuning (Benar).'
        },
        {
            id: 'MAT-057', bentuk: 'PG', kompetensi: 'M07', kesulitan: 'sedang',
            pertanyaan: 'Selembar kertas dilipat dua berkali-kali. Setelah dibuka, garis lipatan membagi kertas seperti gambar. Jika kertas dilipat dua sebanyak 5 kali, banyak bagian kertas setelah dibuka adalah …',
            gambar: lipatKertas(false), gambarPembahasan: lipatKertas(true),
            opsi: ['10 bagian', '16 bagian', '25 bagian', '32 bagian'],
            kunci: 3,
            pembahasan: 'Setiap lipatan membuat banyak bagian menjadi 2 kali lipat: 2, 4, 8, 16, 32. Jadi, 5 lipatan menghasilkan 32 bagian. Pilihan 10 muncul jika dianggap bertambah 2 setiap lipatan.'
        },

        /* ================= M08 Pengukuran ================= */
        {
            id: 'MAT-058', bentuk: 'PG', kompetensi: 'M08', kesulitan: 'mudah',
            pertanyaan: 'Jarak rumah Doni ke sekolah 2,5 km. Jarak tersebut sama dengan …',
            opsi: ['25 m', '250 m', '2.500 m', '25.000 m'],
            kunci: 2,
            pembahasan: '1 km = 1.000 m, sehingga 2,5 km = 2,5 × 1.000 = 2.500 m.'
        },
        {
            id: 'MAT-059', bentuk: 'PG', kompetensi: 'M08', kesulitan: 'sedang',
            pertanyaan: 'Jam berikut menunjukkan waktu dimulainya lomba cerdas cermat pada pagi hari. Lomba berlangsung selama 1 jam 35 menit. Lomba selesai pukul …',
            gambar: G.jam(8, 40), gambarPembahasan: jamBahas(),
            opsi: ['09.15', '10.05', '10.15', '10.25'],
            kunci: 2,
            pembahasan: 'Jarum pendek di antara 8 dan 9, jarum panjang di angka 8 (40 menit), jadi lomba dimulai pukul 08.40. Ditambah 1 jam menjadi 09.40, lalu ditambah 35 menit: 09.40 + 20 menit = 10.00, sisa 15 menit → 10.15.'
        },
        {
            id: 'MAT-060', bentuk: 'PG', kompetensi: 'M08', kesulitan: 'sedang',
            pertanyaan: 'Panjang sebatang pensil diukur dengan penggaris seperti gambar. Panjang pensil tersebut adalah …',
            gambar: penggarisPensil(false), gambarPembahasan: penggarisPensil(true),
            opsi: ['9 cm', '9,5 cm', '11,5 cm', '13,5 cm'],
            kunci: 1,
            pembahasan: 'Ujung kiri pensil berada di angka 2 dan ujung kanannya di 11,5. Panjang pensil = 11,5 − 2 = 9,5 cm. Pilihan 11,5 cm muncul jika pengukuran dianggap dimulai dari 0.'
        },
        {
            id: 'MAT-061', bentuk: 'PG', kompetensi: 'M08', kesulitan: 'mudah',
            pertanyaan: 'Ibu membeli 3 kg 250 g gula dan 1 kg 900 g tepung. Berat seluruh belanjaan ibu adalah …',
            opsi: ['4.150 g', '4.250 g', '5.150 g', '5.250 g'],
            kunci: 2,
            pembahasan: '3 kg 250 g = 3.250 g dan 1 kg 900 g = 1.900 g. Jumlahnya 3.250 + 1.900 = 5.150 g, atau 5 kg 150 g.'
        },
        {
            id: 'MAT-062', bentuk: 'MCMA', kompetensi: 'M08', kesulitan: 'sulit',
            pertanyaan: 'Tabel berikut menunjukkan jadwal tiga kereta api dari Stasiun A ke Stasiun B. Pernyataan yang benar adalah …',
            gambar: jadwalKereta(false), gambarPembahasan: jadwalKereta(true),
            opsi: [
                'Perjalanan KA Fajar berlangsung 2 jam 35 menit.',
                'KA Malam memiliki waktu perjalanan paling singkat.',
                'Perjalanan KA Senja berlangsung 2 jam 40 menit.',
                'Selisih waktu keberangkatan KA Fajar dan KA Senja adalah 6 jam 25 menit.',
                'KA Malam tiba sebelum pukul 22.00.'
            ],
            kunci: [0, 1, 3],
            pembahasan: 'Lama perjalanan: Fajar 06.45 → 09.20 = 2 jam 35 menit (A benar); Senja 13.10 → 15.30 = 2 jam 20 menit (C salah); Malam 19.50 → 22.05 = 2 jam 15 menit, paling singkat (B benar). Keberangkatan 06.45 → 13.10 = 6 jam 25 menit (D benar). KA Malam tiba 22.05 (E salah).'
        },
        {
            id: 'MAT-063', bentuk: 'BS', kompetensi: 'M08', kesulitan: 'sedang',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan tentang satuan ukur berikut.',
            opsi: ['1,5 liter = 150 ml', '3 jam = 180 menit', '2 abad = 20 tahun', '4 ton = 4.000 kg'],
            kunci: [false, true, false, true],
            pembahasan: '(1) Salah: 1 liter = 1.000 ml, jadi 1,5 liter = 1.500 ml. (2) Benar: 3 × 60 = 180 menit. (3) Salah: 1 abad = 100 tahun, jadi 2 abad = 200 tahun. (4) Benar: 1 ton = 1.000 kg.'
        },
        {
            id: 'MAT-064', bentuk: 'PG', kompetensi: 'M08', kesulitan: 'sulit',
            pertanyaan: 'Ibu mulai memasak pukul 10.30. Ibu menanak nasi selama 45 menit dan pada saat yang sama menggoreng ayam selama 25 menit. Setelah ayam matang, ibu memasak sayur selama 20 menit. Semua masakan paling cepat selesai pukul …',
            gambarPembahasan: gantMasak(),
            opsi: ['11.00', '11.15', '11.30', '12.00'],
            kunci: 1,
            pembahasan: 'Nasi: 10.30 sampai 11.15. Ayam: 10.30 sampai 10.55, lalu sayur 10.55 sampai 11.15. Keduanya selesai pukul 11.15. Pilihan 12.00 muncul jika semua waktu dijumlahkan (45 + 25 + 20 = 90 menit), padahal nasi dan ayam dimasak bersamaan.'
        },
        {
            id: 'MAT-065', bentuk: 'PG', kompetensi: 'M08', kesulitan: 'sulit',
            pertanyaan: 'Kedua neraca berikut seimbang. Semua buah kelapa beratnya sama. Berat semangka adalah …',
            gambar: neracaKelapa(false), gambarPembahasan: neracaKelapa(true),
            opsi: ['3,5 kg', '4 kg', '4,5 kg', '6 kg'],
            kunci: 0,
            pembahasan: 'Neraca 1: 4 kelapa = 6 kg, jadi 1 kelapa = 6 : 4 = 1,5 kg. Neraca 2: 1 kelapa + 1 semangka = 5 kg, sehingga semangka = 5 − 1,5 = 3,5 kg.'
        },

        /* ================= M09 Keliling dan luas bangun datar ================= */
        {
            id: 'MAT-066', bentuk: 'PG', kompetensi: 'M09', kesulitan: 'sedang',
            pertanyaan: 'Pak Darto memiliki taman berbentuk seperti gambar di bawah. Seluruh taman akan ditanami rumput. Luas taman yang ditanami rumput adalah …',
            gambar: taman(false), gambarPembahasan: taman(true),
            opsi: ['80 m²', '92 m²', '100 m²', '120 m²'],
            kunci: 2,
            pembahasan: 'Bagi taman menjadi dua persegi panjang. Bagian bawah (II): 12 m × 6 m = 72 m². Bagian atas (I): lebarnya 7 m dan tingginya 10 m − 6 m = 4 m, jadi 7 × 4 = 28 m². Luas taman = 72 + 28 = 100 m². Pilihan 120 m² salah karena menghitung 12 × 10 tanpa mengurangi bagian yang terpotong.'
        },
        {
            id: 'MAT-067', bentuk: 'PG', kompetensi: 'M09', kesulitan: 'mudah',
            pertanyaan: 'Keliling persegi panjang pada gambar berikut adalah …',
            gambar: persegiPanjang(225, 120, '15 cm', '8 cm', false), gambarPembahasan: persegiPanjang(225, 120, '15 cm', '8 cm', true, 'K = 2 × (15 + 8) = 46 cm'),
            opsi: ['23 cm', '46 cm', '92 cm', '120 cm'],
            kunci: 1,
            pembahasan: 'Keliling = 2 × (panjang + lebar) = 2 × (15 + 8) = 2 × 23 = 46 cm. Pilihan 120 adalah luasnya (15 × 8), bukan keliling.'
        },
        {
            id: 'MAT-068', bentuk: 'PG', kompetensi: 'M09', kesulitan: 'sedang',
            pertanyaan: 'Luas segitiga pada gambar berikut adalah …',
            gambar: segitigaLuas(false), gambarPembahasan: segitigaLuas(true),
            opsi: ['45 cm²', '54 cm²', '60 cm²', '108 cm²'],
            kunci: 1,
            pembahasan: 'Luas segitiga = alas × tinggi : 2. Tinggi adalah garis putus-putus yang tegak lurus alas, yaitu 9 cm, bukan sisi miring 10 cm. Luas = 12 × 9 : 2 = 54 cm². Pilihan 60 memakai sisi miring, dan 108 lupa dibagi 2.'
        },
        {
            id: 'MAT-069', bentuk: 'PG', kompetensi: 'M09', kesulitan: 'sedang',
            pertanyaan: 'Sebuah tutup kaleng berbentuk lingkaran seperti gambar. Keliling tutup kaleng tersebut adalah … (π = 22/7)',
            gambar: lingkaranD(false), gambarPembahasan: lingkaranD(true),
            opsi: ['44 cm', '88 cm', '176 cm', '616 cm'],
            kunci: 1,
            pembahasan: 'Garis yang melewati titik pusat adalah diameter, d = 28 cm. Keliling = π × d = 22/7 × 28 = 88 cm. Pilihan 616 cm² adalah luasnya, dan 176 muncul jika diameter dikira jari-jari.'
        },
        {
            id: 'MAT-070', bentuk: 'PG', kompetensi: 'M09', kesulitan: 'sulit',
            pertanyaan: 'Di dalam persegi bersisi 14 cm terdapat lingkaran yang menyinggung keempat sisinya seperti gambar. Luas daerah yang diarsir adalah … (π = 22/7)',
            gambar: persegiLingkaran(false), gambarPembahasan: persegiLingkaran(true),
            opsi: ['42 cm²', '56 cm²', '154 cm²', '196 cm²'],
            kunci: 0,
            pembahasan: 'Diameter lingkaran sama dengan sisi persegi, 14 cm, sehingga r = 7 cm. Luas persegi = 14 × 14 = 196 cm². Luas lingkaran = 22/7 × 7 × 7 = 154 cm². Daerah arsir = 196 − 154 = 42 cm².'
        },
        {
            id: 'MAT-071', bentuk: 'MCMA', kompetensi: 'M09', kesulitan: 'sulit',
            pertanyaan: 'Lapangan berbentuk persegi panjang seperti gambar akan dipagari di sekelilingnya. Pernyataan yang benar adalah …',
            gambar: lapangan(false), gambarPembahasan: lapangan(true),
            opsi: [
                'Luas lapangan adalah 1.000 m².',
                'Keliling lapangan adalah 130 m.',
                'Jika tiang pagar dipasang setiap 5 m di sekeliling lapangan, diperlukan 26 tiang.',
                'Jika panjang dan lebar lapangan masing-masing dijadikan 2 kali, luasnya menjadi 2.000 m².',
                'Jika biaya pagar Rp20.000 per meter, biaya seluruh pagar adalah Rp2.600.000.'
            ],
            kunci: [0, 1, 2, 4],
            pembahasan: 'Luas = 40 × 25 = 1.000 m² (A benar). Keliling = 2 × (40 + 25) = 130 m (B benar). Pada keliling tertutup, banyak tiang = 130 : 5 = 26 (C benar). Jika panjang dan lebar dijadikan 2 kali, luas = 80 × 50 = 4.000 m², yaitu 4 kali semula (D salah). Biaya = 130 × 20.000 = 2.600.000 (E benar).'
        },
        {
            id: 'MAT-072', bentuk: 'BS', kompetensi: 'M09', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan bangun-bangun datar berikut. Tentukan Benar atau Salah setiap pernyataan tentang sifat bangun datar.',
            gambar: bangunSifat(false), gambarPembahasan: bangunSifat(true),
            opsi: [
                'Belah ketupat memiliki empat sisi yang sama panjang.',
                'Trapesium memiliki dua pasang sisi yang sejajar.',
                'Semua sudut persegi panjang besarnya 90°.',
                'Kedua diagonal layang-layang sama panjang.'
            ],
            kunci: [true, false, true, false],
            pembahasan: '(1) Benar: keempat sisi belah ketupat sama panjang. (2) Salah: trapesium hanya memiliki sepasang sisi sejajar. (3) Benar: persegi panjang memiliki empat sudut siku-siku. (4) Salah: diagonal layang-layang tidak sama panjang, tetapi saling tegak lurus.'
        },
        {
            id: 'MAT-073', bentuk: 'PG', kompetensi: 'M09', kesulitan: 'mudah',
            pertanyaan: 'Bangun berikut digambar pada kertas berpetak. Setiap petak berukuran 1 cm × 1 cm. Luas bangun tersebut adalah …',
            gambar: petakLuas(false), gambarPembahasan: petakLuas(true),
            opsi: ['12 cm²', '13 cm²', '14 cm²', '16 cm²'],
            kunci: 2,
            pembahasan: 'Hitung petak penuh: 12 petak pada persegi panjang kiri dan 1 petak di bagian kanan bawah, jadi 13 petak. Ada 2 setengah petak yang jika digabung = 1 petak. Luas = 13 + 1 = 14 cm².'
        },
        {
            id: 'MAT-074', bentuk: 'PG', kompetensi: 'M09', kesulitan: 'sulit',
            pertanyaan: 'Bangun berikut terdiri atas persegi panjang dan setengah lingkaran. Keliling bangun tersebut adalah … (π = 22/7)',
            gambar: setengahLingkaran(false), gambarPembahasan: setengahLingkaran(true),
            opsi: ['56 cm', '70 cm', '78 cm', '99 cm'],
            kunci: 0,
            pembahasan: 'Keliling hanya menghitung tepi luar. Busur setengah lingkaran = 1/2 × 22/7 × 14 = 22 cm. Tepi lainnya 14 + 10 + 10 = 34 cm. Keliling = 34 + 22 = 56 cm. Pilihan 70 cm muncul jika garis tengah 14 cm di dalam bangun ikut dihitung.'
        }
    ]);
})(TKA.gambarMat);
