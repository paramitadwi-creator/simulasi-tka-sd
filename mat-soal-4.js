/*
 * Bank soal Matematika — bagian 4 (MAT-075 s.d. MAT-100):
 * M10 bangun ruang dan volume, M11 sudut, simetri, koordinat, M12 data.
 */
(function (G) {
    'use strict';
    var svg = G.svg, teks = G.teks, tebal = G.tebal, garis = G.garis, kotak = G.kotak, lingkar = G.lingkar, jalur = G.jalur;
    var S = G.S;

    /* ---------- M10 ---------- */
    function jaring(bahas) {
        var sel = [[100, 10, '★'], [100, 60, '1'], [100, 110, '2'], [100, 160, '3'], [50, 60, '4'], [150, 60, '5']];
        var warna = { '★': '#ffe9a8', '2': '#ffe9a8', '1': '#cfe0ff', '3': '#cfe0ff', '4': '#cdeedd', '5': '#cdeedd' };
        var isi = '';
        sel.forEach(function (s) { isi += kotak(s[0], s[1], 50, 50, bahas ? warna[s[2]] : '#fff') + teks(s[0] + 25, s[1] + 31, s[2], 18, tebal()); });
        if (bahas) {
            isi += teks(290, 60, 'Sisi berhadapan', 13, tebal()) +
                kotak(232, 76, 14, 14, '#ffe9a8') + teks(290, 88, '★ dan 2', 13) +
                kotak(232, 102, 14, 14, '#cfe0ff') + teks(290, 114, '1 dan 3', 13) +
                kotak(232, 128, 14, 14, '#cdeedd') + teks(290, 140, '4 dan 5', 13);
        }
        return svg(bahas ? 350 : 220, 220, isi);
    }

    function akuarium(bahas) {
        var air = 220 - 112.5;
        var isi = jalur('M40 ' + air + ' L100 ' + (air - 40) + ' L280 ' + (air - 40) + ' L280 180 L220 220 L40 220 Z', '#bfe3ff', 'opacity=".85"') +
            jalur('M40 ' + air + ' L100 ' + (air - 40) + ' L280 ' + (air - 40) + ' L220 ' + air + ' Z', '#8fd0ff', 'opacity=".8"') +
            jalur('M40 70 L100 30 L280 30 L280 180 L220 220 L40 220 Z M40 70 L220 70 L280 30 M220 70 L220 220', 'none') +
            jalur('M40 220 L100 180 L280 180 M100 30 L100 180', 'none', 'stroke="#172b4d" stroke-width="1.2" stroke-dasharray="5 4"') +
            teks(130, 240, '60 cm') + teks(10, 150, '50 cm', 14, 'text-anchor="end"') + teks(268, 214, '40 cm', 13);
        if (bahas) {
            isi += garis(228, air, 228, 220, 'stroke="#315efb" stroke-width="3"') + teks(290, 160, '37,5 cm', 12, 'text-anchor="start" ' + tebal(G.BIRU)) +
                garis(228, 70, 228, air, 'stroke="#d64545" stroke-width="3" stroke-dasharray="4 3"') + teks(290, 70, '12,5 cm', 12, 'text-anchor="start" ' + tebal(G.MERAH)) +
                teks(130, 160, 'air = 90 L', 14, tebal()) + teks(130, 95, 'kosong = 30 L', 12, 'fill="#d64545"');
        }
        return svg(bahas ? 440 : 370, 250, '<g transform="translate(70,0)">' + isi + '</g>');
    }

    function kubusSatuan(bahas) {
        return G.kubusSatuan([[2, 2], [2, 2], [2, 2]], {
            w: bahas ? 400 : 290, h: 230, ox: 130, oy: 120, s: 32,
            tambahan: bahas ? teks(330, 80, 'panjang 3', 12, tebal(G.BIRU)) + teks(330, 102, 'lebar 2', 12, tebal(G.BIRU)) +
                teks(330, 124, 'tinggi 2', 12, tebal(G.BIRU)) + teks(330, 152, '3 × 2 × 2 = 12', 14, tebal(G.HIJAU)) : ''
        });
    }

    function kubus(label, bahas) {
        var isi = G.balok(150, 150, 70, { x: 70, y: 20, isi: '#edf1ff', label: [label, label, label] });
        if (bahas) { isi += teks(300, 120, 'V = s × s × s', 13, 'text-anchor="start" ' + tebal()) + teks(300, 144, '= 15 × 15 × 15', 13, 'text-anchor="start"') + teks(300, 168, '= 3.375 cm³', 14, 'text-anchor="start" ' + tebal(G.HIJAU)); }
        return svg(bahas ? 460 : 330, 270, isi.replace('x="300"', 'x="300"'));
    }

    function prisma(bahas) {
        var A = [60, 200], B = [180, 200], C = [100, 130], A2 = [160, 150], B2 = [280, 150], C2 = [200, 80];
        var p = function (q) { return q[0] + ' ' + q[1]; };
        var w = function (c) { return bahas ? 'stroke="' + c + '" stroke-width="3"' : S; };
        var isi = jalur('M' + p(A) + ' L' + p(B) + ' L' + p(C) + ' Z', '#edf1ff', w('#315efb')) +
            jalur('M' + p(C) + ' L' + p(C2) + ' L' + p(B2) + ' L' + p(B) , 'none', '') +
            garis(C[0], C[1], C2[0], C2[1], w('#16a36a')) + garis(B[0], B[1], B2[0], B2[1], w('#16a36a')) +
            garis(C2[0], C2[1], B2[0], B2[1], w('#d64545')) +
            garis(A[0], A[1], A2[0], A2[1], bahas ? 'stroke="#16a36a" stroke-width="2" stroke-dasharray="5 4"' : 'stroke="#172b4d" stroke-width="1.2" stroke-dasharray="5 4"') +
            garis(A2[0], A2[1], B2[0], B2[1], bahas ? 'stroke="#d64545" stroke-width="2" stroke-dasharray="5 4"' : 'stroke="#172b4d" stroke-width="1.2" stroke-dasharray="5 4"') +
            garis(A2[0], A2[1], C2[0], C2[1], bahas ? 'stroke="#d64545" stroke-width="2" stroke-dasharray="5 4"' : 'stroke="#172b4d" stroke-width="1.2" stroke-dasharray="5 4"');
        if (bahas) {
            isi += teks(330, 90, 'Segitiga depan: 3 rusuk', 12, 'text-anchor="start" ' + tebal(G.BIRU)) +
                teks(330, 114, 'Segitiga belakang: 3 rusuk', 12, 'text-anchor="start" ' + tebal(G.MERAH)) +
                teks(330, 138, 'Rusuk tegak: 3 rusuk', 12, 'text-anchor="start" ' + tebal(G.HIJAU)) +
                teks(330, 168, 'Jumlah = 9 rusuk', 14, 'text-anchor="start" ' + tebal());
        }
        return svg(bahas ? 520 : 320, 230, isi);
    }

    function kardus(bahas) {
        var isi = G.balok(200, 100, 75, { x: 70, y: 20, isi: '#f3e2c4', label: ['40 cm', '20 cm', '30 cm'] });
        if (bahas) {
            for (var i = 1; i < 4; i++) { isi += garis(70 + i * 50, 95, 70 + i * 50, 195, 'stroke="#b08a55" stroke-width="1"'); }
            isi += garis(70, 145, 270, 145, 'stroke="#b08a55" stroke-width="1"') +
                teks(440, 100, '40 : 10 = 4', 13, tebal()) + teks(440, 124, '30 : 10 = 3', 13, tebal()) + teks(440, 148, '20 : 10 = 2', 13, tebal()) +
                teks(440, 178, '4 × 3 × 2 = 24 kotak', 14, tebal(G.HIJAU));
        }
        return svg(bahas ? 500 : 360, 230, isi);
    }

    function tabung(bahas) {
        var isi = jalur('M50 60 L50 220 A70 18 0 0 0 190 220 L190 60', '#edf1ff') +
            '<ellipse cx="120" cy="60" rx="70" ry="18" fill="#dfe7ff" ' + S + '/>' +
            jalur('M50 220 A70 18 0 0 1 190 220', 'none', 'stroke="#172b4d" stroke-width="1.2" stroke-dasharray="5 4"') +
            garis(50, 60, 190, 60, 'stroke="#d64545" stroke-width="1.6"') + teks(120, 52, '14 cm', 12, tebal(G.MERAH)) +
            teks(200, 145, '20 cm', 13, 'text-anchor="start" ' + tebal());
        if (bahas) {
            isi += teks(370, 70, 'r = 14 : 2 = 7 cm', 12, tebal()) + teks(370, 94, 'Luas alas = 22/7 × 7 × 7 = 154 cm²', 12) +
                teks(370, 118, 'Volume = 154 × 20 = 3.080 cm³', 12, tebal(G.HIJAU)) +
                teks(370, 150, 'Sisi: alas, tutup, selimut = 3', 12) + teks(370, 174, 'Tidak memiliki titik sudut', 12, tebal(G.MERAH));
        }
        return svg(bahas ? 500 : 260, 250, isi);
    }

    function bendaBenda(bahas) {
        var isi = '';
        // A kaleng
        isi += jalur('M30 50 L30 130 A35 10 0 0 0 100 130 L100 50', '#e8e8e8') + '<ellipse cx="65" cy="50" rx="35" ry="10" fill="#f5f5f5" ' + S + '/>' +
            kotak(30, 75, 70, 30, '#d64545', 'stroke="none"');
        // B tenda
        isi += jalur('M135 140 L195 140 L165 60 Z', '#7fd3a8') + jalur('M165 60 L225 45 L255 125 L195 140', '#5bbf8c') + garis(165, 60, 195, 140);
        // C dadu
        isi += G.balok(60, 60, 30, { x: 285, y: 50, isi: '#fff' }) + lingkar(315, 125, 5, '#172b4d', '') + lingkar(300, 110, 5, '#172b4d', '') + lingkar(330, 140, 5, '#172b4d', '');
        // D topi kerucut
        isi += jalur('M420 140 L490 140 L455 40 Z', '#f4b740') + '<ellipse cx="455" cy="140" rx="35" ry="9" fill="#f4b740" ' + S + '/>' + lingkar(455, 38, 7, '#d64545');
        ['A', 'B', 'C', 'D'].forEach(function (h, i) { isi += teks([65, 195, 325, 455][i], 172, h, 15, tebal()); });
        if (bahas) {
            ['tabung', 'prisma segitiga', 'kubus', 'kerucut'].forEach(function (n, i) { isi += teks([65, 195, 325, 455][i], 192, n, 12, tebal(i === 1 ? G.HIJAU : null)); });
        }
        return svg(520, bahas ? 202 : 182, isi);
    }

    function duaBak(bahas) {
        var a = G.balok(110, 110, 50, { x: 60, y: 30, isi: '#cfe9ff', label: ['1 m', '1 m', '1 m'] });
        var b = G.balok(220, 55, 50, { x: 290, y: 85, isi: '#cfe9ff', label: ['2 m', '0,5 m', '1 m'] });
        var isi = a + b + teks(115, 228, 'Bak A', 13, tebal()) + teks(400, 228, 'Bak B', 13, tebal());
        if (bahas) {
            isi += teks(115, 250, '1 × 1 × 1 = 1 m³ = 1.000 L', 12, tebal(G.HIJAU)) + teks(400, 250, '2 × 1 × 0,5 = 1 m³ = 1.000 L', 12, tebal(G.HIJAU));
        }
        return svg(590, bahas ? 262 : 240, isi);
    }

    /* ---------- M11 ---------- */
    function segitigaLuar(bahas) {
        var isi = jalur('M40 200 L240 200 L168.5 46.9 Z', '#edf1ff') + garis(240, 200, 320, 200) +
            jalur('M70 200 A30 30 0 0 0 59.3 177', 'none') + teks(84, 190, '50°', 13) +
            jalur('M268 200 A28 28 0 0 0 228.2 174.6', 'none') + teks(276, 182, '115°', 13) +
            teks(30, 218, 'A') + teks(240, 218, 'C') + teks(320, 218, 'D') + teks(168, 38, 'B');
        if (bahas) {
            isi += jalur('M232.4 183.7 A18 18 0 0 0 222 200', 'none', 'stroke="#d64545" stroke-width="2"') + teks(206, 192, '65°', 13, tebal(G.MERAH)) +
                teks(168, 78, '65°', 13, tebal(G.HIJAU));
        } else { isi += teks(168, 78, '?', 15, tebal()); }
        return svg(340, 230, isi);
    }

    function simetri(bahas) {
        var isi = '', d = G.putus(G.MERAH, 1.5);
        isi += kotak(20, 30, 70, 70, '#edf1ff') + kotak(110, 40, 100, 50, '#edf1ff') + jalur('M230 100 L310 100 L270 30.7 Z', '#edf1ff') +
            jalur('M335 100 L410 100 L435 40 L360 40 Z', '#edf1ff') + lingkar(490, 65, 36, '#edf1ff');
        ['A', 'B', 'C', 'D', 'E'].forEach(function (h, i) { isi += teks([55, 160, 270, 385, 490][i], 130, h, 15, tebal()); });
        if (bahas) {
            isi += garis(55, 22, 55, 108, d) + garis(12, 65, 98, 65, d) + garis(14, 24, 96, 106, d) + garis(96, 24, 14, 106, d) +
                garis(160, 32, 160, 98, d) + garis(102, 65, 218, 65, d) +
                garis(270, 24, 270, 106, d) + garis(230, 100, 292, 64, d) + garis(310, 100, 248, 64, d) +
                garis(490, 22, 490, 108, d) + garis(447, 65, 533, 65, d) + garis(460, 35, 520, 95, d) + garis(520, 35, 460, 95, d) +
                teks(55, 150, '4 sumbu', 11, tebal(G.HIJAU)) + teks(160, 150, '2 sumbu', 11, 'fill="#d64545"') + teks(270, 150, '3 sumbu', 11, tebal(G.HIJAU)) +
                teks(385, 150, 'tidak ada', 11, 'fill="#d64545"') + teks(490, 150, 'tak terhingga', 11, tebal(G.HIJAU));
        }
        return svg(545, bahas ? 160 : 140, isi);
    }

    function jamTiga(bahas) {
        return G.jam(3, 0, {
            w: bahas ? 300 : 180,
            tambahan: bahas ? jalur('M90 62 A28 28 0 0 1 118 90', 'none', 'stroke="#d64545" stroke-width="2.5"') + jalur('M90 78 L102 78 L102 90', 'none', 'stroke="#d64545" stroke-width="1.5"') +
                teks(230, 80, 'seperempat putaran', 12, tebal()) + teks(230, 104, '360° : 4 = 90°', 13, tebal(G.HIJAU)) : ''
        });
    }

    function titikPQRS(bahas) {
        return G.koordinat([{ x: 2, y: 4, label: 'P' }, { x: 4, y: 2, label: 'Q', warna: bahas ? G.HIJAU : G.MERAH }, { x: 4, y: 4, label: 'R' }, { x: 2, y: 2, label: 'S' }], {
            n: 6, sel: 34,
            tambahan: bahas ? function (px, py) {
                return garis(px(4), py(0), px(4), py(2), G.putus(G.HIJAU)) + garis(px(0), py(2), px(4), py(2), G.putus(G.HIJAU)) +
                    teks(px(4), py(0) + 34, 'x = 4', 11, tebal(G.HIJAU));
            } : null
        });
    }

    function persegiPanjangKoordinat(bahas) {
        var t = [{ x: 1, y: 1, label: 'A' }, { x: 6, y: 1, label: 'B' }, { x: 6, y: 4, label: 'C' }];
        if (bahas) { t.push({ x: 1, y: 4, label: 'D(1, 4)', warna: G.HIJAU }); }
        return G.koordinat(t, {
            n: 7, sel: 30,
            tambahan: function (px, py) {
                return jalur('M' + px(1) + ' ' + py(1) + ' L' + px(6) + ' ' + py(1) + ' L' + px(6) + ' ' + py(4) + (bahas ? ' L' + px(1) + ' ' + py(4) + ' Z' : ''),
                    bahas ? 'rgba(127,163,255,.25)' : 'none', 'stroke="#315efb" stroke-width="2"' + (bahas ? '' : ''));
            }
        });
    }

    function sudutPelurus(bahas) {
        var isi = garis(20, 160, 360, 160) + garis(190, 160, 190 - 130 * Math.cos(Math.PI / 4), 160 - 130 * Math.sin(Math.PI / 4)) +
            jalur('M' + (190 - 40 * Math.cos(Math.PI / 4)).toFixed(1) + ' ' + (160 - 40 * Math.sin(Math.PI / 4)).toFixed(1) + ' A40 40 0 0 0 150 160', 'none', 'stroke="#d64545" stroke-width="2"') +
            jalur('M230 160 A40 40 0 0 0 ' + (190 - 40 * Math.cos(Math.PI / 4)).toFixed(1) + ' ' + (160 - 40 * Math.sin(Math.PI / 4)).toFixed(1), 'none', 'stroke="#315efb" stroke-width="2"') +
            teks(132, 146, 'a', 15, tebal(G.MERAH)) + teks(232, 128, 'b', 15, tebal(G.BIRU));
        if (bahas) {
            isi += teks(132, 190, 'a = 45°', 13, tebal(G.MERAH)) + teks(250, 190, 'b = 135°', 13, tebal(G.BIRU)) +
                teks(190, 216, 'a + 3a = 180° → 4a = 180° → a = 45°', 13, tebal(G.HIJAU));
        }
        return svg(380, bahas ? 228 : 175, isi);
    }

    function cermin(bahas) {
        return G.koordinat([
            { x: 2, y: 3, label: 'P', warna: G.BIRU }, { x: 5, y: 3, label: 'L' }, { x: 6, y: 3, label: 'K', warna: bahas ? G.HIJAU : G.MERAH },
            { x: 6, y: 5, label: 'M' }, { x: 2, y: 1, label: 'N' }
        ], {
            n: 8, sel: 30,
            tambahan: function (px, py) {
                var r = garis(px(4), py(0) + 8, px(4), py(8) - 4, 'stroke="#172b4d" stroke-width="2.5" stroke-dasharray="8 5"') + teks(px(4) + 8, py(8) + 2, 'l', 14, 'text-anchor="start" ' + tebal());
                if (bahas) { r += garis(px(2), py(3), px(6), py(3), G.putus(G.HIJAU)) + teks(px(3), py(3) + 18, '2 petak', 11, tebal(G.HIJAU)) + teks(px(5), py(3) + 18, '2 petak', 11, tebal(G.HIJAU)); }
                return r;
            }
        });
    }

    function samaKaki(bahas) {
        // alas 120 px, sudut alas 70° → tinggi 60 × tan 70°
        var A = [100, 210], B = [220, 210], C = [160, 210 - 60 * Math.tan(70 * Math.PI / 180)];
        var isi = jalur('M' + A[0] + ' ' + A[1] + ' L' + B[0] + ' ' + B[1] + ' L' + C[0] + ' ' + C[1].toFixed(1) + ' Z', '#edf1ff');
        // tanda sisi sama
        var tanda = function (p, q) { var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; return garis(mx - 6, my - 4, mx + 6, my + 4, 'stroke="#d64545" stroke-width="2"'); };
        isi += tanda(A, C) + tanda(B, C) + teks(C[0], C[1] + 40, '40°', 13, tebal()) +
            teks(126, 202, bahas ? '70°' : '?', 13, tebal(bahas ? G.HIJAU : null)) + teks(194, 202, bahas ? '70°' : '', 13, tebal(G.HIJAU));
        if (bahas) { isi += teks(160, 238, '(180° − 40°) : 2 = 70°', 13, tebal(G.HIJAU)); }
        return svg(320, bahas ? 250 : 230, isi);
    }

    /* ---------- M12 ---------- */
    function batangBuku(bahas) {
        return G.batang([['Sen', 12], ['Sel', 8], ['Rab', 16], ['Kam', 10], ['Jum', 14]], {
            maks: 18, langkah: 2, judulY: 'Banyak buku', tampilNilai: bahas, rata: bahas ? 12 : null, labelRata: 'rata-rata = 12'
        });
    }

    function pieOlahraga(bahas) {
        return G.pie([
            { sudut: 180, warna: '#cfe0ff', label: 'Sepak bola', ket: bahas ? '50% · 20 anak' : '' },
            { sudut: 90, warna: '#cdeedd', label: 'Bulu tangkis', ket: bahas ? '25% · 10 anak' : '' },
            { sudut: 45, warna: '#ffe9a8', label: 'Renang', ket: bahas ? '12,5% · 5' : '' },
            { sudut: 45, warna: '#fde0e0', label: 'Voli', ket: bahas ? '12,5% · 5' : '' }
        ], { w: 330, h: 240, cx: 170, cy: 120, tambahan: jalur('M170 134 L156 134 L156 120', 'none', 'stroke="#172b4d" stroke-width="1.5"') });
    }

    function tabelNilai(bahas) {
        return G.tabel([110, 110], [['Nilai', 'Banyak siswa'], ['60', '3'], ['70', '7'], ['80', '9'], ['90', '5'], ['100', '1']],
            bahas ? { sorot: function (i) { return i === 3; }, bawah: 30, tambahan: teks(120, 205, 'Paling sering muncul: 80 (9 siswa)', 12, tebal(G.HIJAU)) } : null);
    }

    function dataUrut() {
        var d = [5, 6, 7, 7, 8, 8, 8, 9, 10], isi = '';
        d.forEach(function (v, i) {
            var tengah = i === 4;
            isi += kotak(20 + i * 44, 30, 40, 40, tengah ? '#ffe9a8' : (v === 8 ? '#cdeedd' : '#fff')) + teks(40 + i * 44, 56, v, 15, tebal());
        });
        isi += teks(20 + 4 * 44 + 20, 92, 'median (ke-5)', 11, tebal(G.MERAH)) + teks(210, 18, 'Data diurutkan dari terkecil', 12, tebal()) +
            teks(210, 118, 'Jumlah 68 : 9 data ≈ 7,56 · tertinggi − terendah = 10 − 5 = 5', 12);
        return svg(430, 128, isi);
    }

    function piktogram(bahas) {
        var data = [['Januari', 4], ['Februari', 2.5], ['Maret', 5], ['April', 3]], isi = '';
        function apel(x, y, setengah) {
            var r = '<g>' + lingkar(x, y, 13, '#e8564f', 'stroke="#a8322c" stroke-width="1.5"') + jalur('M' + x + ' ' + (y - 13) + ' q4 -8 10 -8', 'none', 'stroke="#2e7d32" stroke-width="3"') + '</g>';
            if (setengah) { r += kotak(x, y - 22, 16, 38, '#fff', 'stroke="none"'); }
            return r;
        }
        data.forEach(function (d, i) {
            var y = 40 + i * 40;
            isi += teks(100, y + 5, d[0], 13, 'text-anchor="end" ' + tebal()) + garis(110, y - 20, 110, y + 20, 'stroke="#c4ccdc" stroke-width="1"');
            for (var k = 0; k < Math.ceil(d[1]); k++) { isi += apel(135 + k * 36, y, d[1] - k === 0.5); }
            if (bahas) { isi += teks(340, y + 5, d[1] * 10 + ' kg', 13, 'text-anchor="start" ' + tebal(d[1] === 5 || d[1] === 2.5 ? G.MERAH : null)); }
        });
        isi += apel(150, 210, false) + teks(172, 215, '= 10 kg', 13, 'text-anchor="start" ' + tebal());
        if (bahas) { isi += teks(330, 215, '50 − 25 = 25 kg', 13, tebal(G.HIJAU)); }
        return svg(420, 232, isi);
    }

    function garisSuhu(bahas) {
        return G.grafikGaris([['Sen', 28], ['Sel', 30], ['Rab', 27], ['Kam', 31], ['Jum', 29], ['Sab', 32]], {
            min: 25, maks: 33, langkah: 1, judulY: 'Suhu (°C)', tampilNilai: bahas,
            tambahan: bahas ? teks(196, 26, 'naik terbesar: Rabu → Kamis (+4)', 11, tebal(G.HIJAU)) : ''
        });
    }

    function batangPengunjung(bahas) {
        return G.batang([['4A', 25], ['4B', 20], ['5A', 30], ['5B', 35], ['6A', 40], ['6B', 30]], {
            maks: 45, langkah: 5, judulY: 'Pengunjung', tampilNilai: bahas, rata: bahas ? 30 : null, labelRata: 'rata-rata = 30', lebar: 320
        });
    }

    function pieEkskul(bahas) {
        return G.pie([
            { sudut: 120, warna: '#cfe0ff', label: 'Pramuka', ket: bahas ? '120° → 60 siswa' : '120°' },
            { sudut: 90, warna: '#ffe9a8', label: 'Menari', ket: bahas ? '90° → 45' : '' },
            { sudut: 150, warna: '#cdeedd', label: 'Futsal', ket: bahas ? '150° → 75' : '' }
        ], { w: 320, h: 240, cx: 160, cy: 120 });
    }

    TKA.tambahSoal('mat', [
        /* ================= M10 Bangun ruang dan volume ================= */
        {
            id: 'MAT-075', bentuk: 'PG', kompetensi: 'M10', kesulitan: 'sulit',
            pertanyaan: 'Gambar berikut adalah jaring-jaring kubus. Jika jaring-jaring itu dirakit menjadi kubus, sisi yang berhadapan dengan sisi bertanda ★ adalah sisi nomor …',
            gambar: jaring(false), gambarPembahasan: jaring(true),
            opsi: ['1', '2', '3', '5'],
            kunci: 1,
            pembahasan: 'Pada deretan empat persegi yang memanjang (★, 1, 2, 3), sisi yang berselang satu akan saling berhadapan: ★ berhadapan dengan 2, dan 1 berhadapan dengan 3. Dua persegi di kiri dan kanan (4 dan 5) saling berhadapan. Jadi, sisi yang berhadapan dengan ★ adalah sisi 2.'
        },
        {
            id: 'MAT-076', bentuk: 'MCMA', kompetensi: 'M10', kesulitan: 'sulit',
            pertanyaan: 'Sebuah akuarium berbentuk balok seperti gambar. Akuarium itu diisi air setinggi 3/4 dari tinggi akuarium. Pernyataan yang benar adalah … (1 liter = 1.000 cm³)',
            gambar: akuarium(false), gambarPembahasan: akuarium(true),
            opsi: [
                'Volume akuarium adalah 120.000 cm³.',
                'Air di dalam akuarium sebanyak 90 liter.',
                'Tinggi air di dalam akuarium adalah 35 cm.',
                'Untuk memenuhi akuarium, diperlukan tambahan 30 liter air.',
                'Jika semua air dipindahkan ke ember berisi 10 liter, diperlukan 8 ember.'
            ],
            kunci: [0, 1, 3],
            pembahasan: 'Volume akuarium = 60 × 40 × 50 = 120.000 cm³ = 120 liter (A benar). Air = 3/4 × 120 = 90 liter (B benar). Tinggi air = 3/4 × 50 = 37,5 cm, bukan 35 cm (C salah). Tambahan air = 120 − 90 = 30 liter (D benar). 90 liter : 10 liter = 9 ember, bukan 8 (E salah).'
        },
        {
            id: 'MAT-077', bentuk: 'PG', kompetensi: 'M10', kesulitan: 'mudah',
            pertanyaan: 'Bangun berikut tersusun dari kubus-kubus satuan yang sama besar tanpa rongga. Volume bangun tersebut adalah … kubus satuan.',
            gambar: kubusSatuan(false), gambarPembahasan: kubusSatuan(true),
            opsi: ['7', '10', '12', '16'],
            kunci: 2,
            pembahasan: 'Bangun berbentuk balok dengan panjang 3, lebar 2, dan tinggi 2 kubus satuan. Volume = 3 × 2 × 2 = 12 kubus satuan. Kubus di bagian belakang dan bawah ikut dihitung walaupun tidak terlihat.'
        },
        {
            id: 'MAT-078', bentuk: 'PG', kompetensi: 'M10', kesulitan: 'sedang',
            pertanyaan: 'Sebuah kotak hadiah berbentuk kubus seperti gambar. Volume kotak tersebut adalah …',
            gambar: kubus('15 cm', false), gambarPembahasan: kubus('15 cm', true),
            opsi: ['225 cm³', '900 cm³', '1.350 cm³', '3.375 cm³'],
            kunci: 3,
            pembahasan: 'Volume kubus = s × s × s = 15 × 15 × 15 = 225 × 15 = 3.375 cm³. Pilihan 225 adalah luas satu sisi, dan 1.350 adalah luas seluruh permukaan (6 × 225).'
        },
        {
            id: 'MAT-079', bentuk: 'PG', kompetensi: 'M10', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan bangun prisma segitiga berikut. Banyak rusuk prisma segitiga adalah …',
            gambar: prisma(false), gambarPembahasan: prisma(true),
            opsi: ['5', '6', '8', '9'],
            kunci: 3,
            pembahasan: 'Rusuk adalah garis pertemuan dua sisi. Segitiga depan punya 3 rusuk, segitiga belakang 3 rusuk, dan ada 3 rusuk tegak yang menghubungkan keduanya. Jumlahnya 9 rusuk. Angka 5 adalah banyak sisi, dan 6 adalah banyak titik sudut.'
        },
        {
            id: 'MAT-080', bentuk: 'PG', kompetensi: 'M10', kesulitan: 'sedang',
            pertanyaan: 'Kardus berbentuk balok seperti gambar akan diisi penuh dengan kotak kecil berbentuk kubus yang panjang rusuknya 10 cm. Banyak kotak kecil yang dapat dimasukkan adalah …',
            gambar: kardus(false), gambarPembahasan: kardus(true),
            opsi: ['4 kotak', '9 kotak', '12 kotak', '24 kotak'],
            kunci: 3,
            pembahasan: 'Sepanjang 40 cm muat 4 kotak, sepanjang 30 cm muat 3 kotak, dan setinggi 20 cm muat 2 kotak. Banyak kotak = 4 × 3 × 2 = 24. Cara lain: 24.000 cm³ : 1.000 cm³ = 24.'
        },
        {
            id: 'MAT-081', bentuk: 'BS', kompetensi: 'M10', kesulitan: 'sulit',
            pertanyaan: 'Perhatikan tabung berikut. Tentukan Benar atau Salah setiap pernyataan. (π = 22/7)',
            gambar: tabung(false), gambarPembahasan: tabung(true),
            opsi: [
                'Volume tabung adalah 3.080 cm³.',
                'Luas alas tabung adalah 154 cm².',
                'Tabung memiliki 3 sisi.',
                'Tabung memiliki 2 titik sudut.'
            ],
            kunci: [true, true, true, false],
            pembahasan: 'Diameter 14 cm, jadi r = 7 cm. Luas alas = 22/7 × 7 × 7 = 154 cm² (Benar). Volume = 154 × 20 = 3.080 cm³ (Benar). Sisi tabung: alas, tutup, dan selimut = 3 sisi (Benar). Tabung tidak memiliki titik sudut (Salah).'
        },
        {
            id: 'MAT-082', bentuk: 'PG', kompetensi: 'M10', kesulitan: 'mudah',
            pertanyaan: 'Perhatikan benda-benda berikut. Benda yang berbentuk prisma segitiga adalah …',
            gambar: bendaBenda(false), gambarPembahasan: bendaBenda(true),
            opsi: ['A (kaleng)', 'B (tenda)', 'C (dadu)', 'D (topi ulang tahun)'],
            kunci: 1,
            pembahasan: 'Tenda memiliki dua sisi segitiga yang sejajar (depan dan belakang) dan tiga sisi persegi panjang, sehingga berbentuk prisma segitiga. Kaleng berbentuk tabung, dadu berbentuk kubus, dan topi berbentuk kerucut.'
        },
        {
            id: 'MAT-083', bentuk: 'MCMA', kompetensi: 'M10', kesulitan: 'sulit',
            pertanyaan: 'Terdapat dua bak air seperti gambar. Pernyataan yang benar adalah … (1 m³ = 1.000 liter)',
            gambar: duaBak(false), gambarPembahasan: duaBak(true),
            opsi: [
                'Volume bak A adalah 1.000 liter.',
                'Volume bak B sama dengan volume bak A.',
                'Bak B dapat menampung 500 liter air.',
                'Jika bak A terisi 3/4 bagian, air di dalamnya 750 liter.',
                'Keran berdebit 25 liter per menit dapat memenuhi bak A dalam 20 menit.'
            ],
            kunci: [0, 1, 3],
            pembahasan: 'Bak A = 1 × 1 × 1 = 1 m³ = 1.000 L (A benar). Bak B = 2 × 1 × 0,5 = 1 m³ = 1.000 L, sama dengan bak A (B benar, C salah). 3/4 × 1.000 = 750 L (D benar). Waktu mengisi bak A = 1.000 : 25 = 40 menit (E salah).'
        },

        /* ================= M11 Sudut, simetri, koordinat ================= */
        {
            id: 'MAT-084', bentuk: 'PG', kompetensi: 'M11', kesulitan: 'sulit',
            pertanyaan: 'Perhatikan gambar segitiga ABC. Sisi AC diperpanjang sampai titik D. Besar sudut ABC (sudut yang bertanda ?) adalah …',
            gambar: segitigaLuar(false), gambarPembahasan: segitigaLuar(true),
            opsi: ['50°', '65°', '115°', '130°'],
            kunci: 1,
            pembahasan: 'Sudut BCA dan sudut BCD berada pada satu garis lurus, sehingga jumlahnya 180°. Sudut BCA = 180° − 115° = 65°. Jumlah sudut dalam segitiga 180°, jadi sudut ABC = 180° − 50° − 65° = 65°. Cara cepat: sudut luar (115°) sama dengan jumlah dua sudut dalam yang tidak bersebelahan, 115° − 50° = 65°.'
        },
        {
            id: 'MAT-085', bentuk: 'MCMA', kompetensi: 'M11', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan bangun-bangun datar berikut. Bangun yang memiliki **lebih dari dua** sumbu simetri lipat adalah …',
            gambar: simetri(false), gambarPembahasan: simetri(true),
            opsi: ['A (persegi)', 'B (persegi panjang)', 'C (segitiga sama sisi)', 'D (jajargenjang)', 'E (lingkaran)'],
            kunci: [0, 2, 4],
            pembahasan: 'Persegi memiliki 4 sumbu simetri, segitiga sama sisi 3 sumbu, dan lingkaran tak terhingga sumbu simetri. Persegi panjang hanya memiliki 2 sumbu (tidak lebih dari dua), sedangkan jajargenjang tidak memiliki sumbu simetri lipat.'
        },
        {
            id: 'MAT-086', bentuk: 'PG', kompetensi: 'M11', kesulitan: 'mudah',
            pertanyaan: 'Besar sudut terkecil yang dibentuk oleh kedua jarum jam pada gambar berikut adalah …',
            gambar: jamTiga(false), gambarPembahasan: jamTiga(true),
            opsi: ['90°', '120°', '180°', '270°'],
            kunci: 0,
            pembahasan: 'Jam menunjukkan pukul 03.00. Jarum panjang di angka 12 dan jarum pendek di angka 3, membentuk seperempat putaran. Satu putaran 360°, jadi seperempatnya 90° (sudut siku-siku).'
        },
        {
            id: 'MAT-087', bentuk: 'PG', kompetensi: 'M11', kesulitan: 'sedang',
            pertanyaan: 'Titik yang terletak pada koordinat (4, 2) adalah titik …',
            gambar: titikPQRS(false), gambarPembahasan: titikPQRS(true),
            opsi: ['P', 'Q', 'R', 'S'],
            kunci: 1,
            pembahasan: 'Koordinat (4, 2) berarti 4 langkah ke kanan pada sumbu x, lalu 2 langkah ke atas pada sumbu y. Titik itu adalah Q. Titik P berada di (2, 4), yaitu jika urutan x dan y tertukar.'
        },
        {
            id: 'MAT-088', bentuk: 'PG', kompetensi: 'M11', kesulitan: 'sedang',
            pertanyaan: 'Titik A, B, dan C adalah tiga titik sudut sebuah persegi panjang ABCD. Koordinat titik D adalah …',
            gambar: persegiPanjangKoordinat(false), gambarPembahasan: persegiPanjangKoordinat(true),
            opsi: ['(4, 1)', '(6, 6)', '(1, 4)', '(4, 6)'],
            kunci: 2,
            pembahasan: 'A(1, 1), B(6, 1), C(6, 4). Titik D harus sejajar dengan A secara tegak (x = 1) dan sejajar dengan C secara mendatar (y = 4). Jadi, D(1, 4).'
        },
        {
            id: 'MAT-089', bentuk: 'BS', kompetensi: 'M11', kesulitan: 'sulit',
            pertanyaan: 'Pada gambar, sudut a dan sudut b terletak pada satu garis lurus. Besar sudut b sama dengan 3 kali besar sudut a. Tentukan Benar atau Salah setiap pernyataan.',
            gambar: sudutPelurus(false), gambarPembahasan: sudutPelurus(true),
            opsi: [
                'Jumlah sudut a dan sudut b adalah 180°.',
                'Besar sudut a adalah 45°.',
                'Besar sudut b adalah 120°.',
                'Sudut a termasuk sudut tumpul.'
            ],
            kunci: [true, true, false, false],
            pembahasan: 'Sudut pada garis lurus berjumlah 180° (Benar). a + 3a = 4a = 180°, jadi a = 45° (Benar) dan b = 135°, bukan 120° (Salah). Sudut 45° kurang dari 90°, sehingga termasuk sudut lancip, bukan tumpul (Salah).'
        },
        {
            id: 'MAT-090', bentuk: 'PG', kompetensi: 'M11', kesulitan: 'sedang',
            pertanyaan: 'Titik P dicerminkan terhadap garis l. Bayangan titik P adalah titik …',
            gambar: cermin(false), gambarPembahasan: cermin(true),
            opsi: ['K', 'L', 'M', 'N'],
            kunci: 0,
            pembahasan: 'Jarak P ke garis l adalah 2 petak ke kiri. Bayangannya berada 2 petak di sebelah kanan garis l pada tinggi yang sama, yaitu titik K. Titik L hanya 1 petak dari garis l.'
        },
        {
            id: 'MAT-091', bentuk: 'PG', kompetensi: 'M11', kesulitan: 'sulit',
            pertanyaan: 'Segitiga berikut adalah segitiga sama kaki dengan sudut puncak 40°. Besar sudut yang bertanda ? adalah …',
            gambar: samaKaki(false), gambarPembahasan: samaKaki(true),
            opsi: ['40°', '70°', '100°', '140°'],
            kunci: 1,
            pembahasan: 'Pada segitiga sama kaki, kedua sudut alas sama besar. Jumlah sudut segitiga 180°, sehingga kedua sudut alas = 180° − 40° = 140°, dan masing-masing 140° : 2 = 70°. Pilihan 140° belum dibagi dua.'
        },

        /* ================= M12 Penyajian dan pengolahan data ================= */
        {
            id: 'MAT-092', bentuk: 'PG', kompetensi: 'M12', kesulitan: 'mudah',
            pertanyaan: 'Diagram batang berikut menunjukkan banyak buku yang dipinjam siswa dari perpustakaan selama lima hari. Rata-rata banyak buku yang dipinjam setiap hari adalah …',
            gambar: batangBuku(false), gambarPembahasan: batangBuku(true),
            opsi: ['12 buku', '14 buku', '16 buku', '60 buku'],
            kunci: 0,
            pembahasan: 'Baca tinggi setiap batang: Senin 12, Selasa 8, Rabu 16, Kamis 10, Jumat 14. Jumlahnya 12 + 8 + 16 + 10 + 14 = 60 buku. Rata-rata = 60 : 5 hari = 12 buku. Pilihan 60 adalah jumlah, bukan rata-rata.'
        },
        {
            id: 'MAT-093', bentuk: 'BS', kompetensi: 'M12', kesulitan: 'sedang',
            pertanyaan: 'Diagram lingkaran berikut menunjukkan olahraga kegemaran 40 siswa kelas 6. Banyak siswa yang gemar renang sama dengan yang gemar voli. Tentukan Benar atau Salah setiap pernyataan berikut.',
            gambar: pieOlahraga(false), gambarPembahasan: pieOlahraga(true),
            opsi: [
                'Banyak siswa yang gemar sepak bola adalah 20 orang.',
                'Siswa yang gemar bulu tangkis sebanyak 25%.',
                'Banyak siswa yang gemar renang adalah 8 orang.',
                'Banyak siswa yang gemar sepak bola 4 kali banyak siswa yang gemar voli.'
            ],
            kunci: [true, true, false, true],
            pembahasan: 'Sepak bola menempati setengah lingkaran: 1/2 × 40 = 20 orang (Benar). Bulu tangkis bertanda sudut siku-siku, yaitu 1/4 lingkaran = 25% (Benar), atau 10 orang. Sisanya 40 − 20 − 10 = 10 orang dibagi sama untuk renang dan voli, masing-masing 5 orang, jadi pernyataan 3 Salah. Sepak bola 20 = 4 × 5 (Benar).'
        },
        {
            id: 'MAT-094', bentuk: 'PG', kompetensi: 'M12', kesulitan: 'mudah',
            pertanyaan: 'Tabel berikut menunjukkan nilai ulangan Matematika siswa kelas 6. Modus data tersebut adalah …',
            gambar: tabelNilai(false), gambarPembahasan: tabelNilai(true),
            opsi: ['9', '70', '80', '90'],
            kunci: 2,
            pembahasan: 'Modus adalah nilai yang paling sering muncul. Nilai 80 diperoleh oleh 9 siswa, paling banyak dibanding nilai lain. Jadi, modusnya 80. Angka 9 adalah banyak siswanya, bukan nilainya.'
        },
        {
            id: 'MAT-095', bentuk: 'MCMA', kompetensi: 'M12', kesulitan: 'sedang',
            pertanyaan: 'Data banyak gol yang dicetak tim futsal sekolah dalam 9 pertandingan adalah: 7, 9, 6, 8, 10, 7, 8, 8, 5. Pernyataan yang benar adalah …',
            gambarPembahasan: dataUrut(),
            opsi: ['Median data tersebut adalah 8.', 'Modus data tersebut adalah 8.', 'Rata-rata data tersebut adalah 8.', 'Selisih nilai tertinggi dan terendah adalah 5.', 'Banyak data tersebut adalah 10.'],
            kunci: [0, 1, 3],
            pembahasan: 'Urutkan data: 5, 6, 7, 7, 8, 8, 8, 9, 10. Data ke-5 (tengah) adalah 8, jadi median 8 (A benar). Angka 8 muncul 3 kali, paling sering (B benar). Jumlah data 68 : 9 ≈ 7,56, bukan 8 (C salah). 10 − 5 = 5 (D benar). Banyak data 9, bukan 10 (E salah).'
        },
        {
            id: 'MAT-096', bentuk: 'PG', kompetensi: 'M12', kesulitan: 'sulit',
            pertanyaan: 'Rata-rata nilai 5 siswa adalah 70. Setelah nilai seorang siswa baru ditambahkan, rata-rata nilai keenam siswa menjadi 72. Nilai siswa baru tersebut adalah …',
            opsi: ['70', '72', '74', '82'],
            kunci: 3,
            pembahasan: 'Jumlah nilai 5 siswa = 5 × 70 = 350. Jumlah nilai 6 siswa = 6 × 72 = 432. Nilai siswa baru = 432 − 350 = 82. Pilihan 74 muncul jika hanya menambahkan selisih rata-rata (70 + 2 × 2).'
        },
        {
            id: 'MAT-097', bentuk: 'PG', kompetensi: 'M12', kesulitan: 'sedang',
            pertanyaan: 'Piktogram berikut menunjukkan hasil panen apel Pak Tani selama empat bulan. Selisih hasil panen terbanyak dan tersedikit adalah …',
            gambar: piktogram(false), gambarPembahasan: piktogram(true),
            opsi: ['2,5 kg', '25 kg', '30 kg', '50 kg'],
            kunci: 1,
            pembahasan: 'Setiap gambar apel = 10 kg, setengah apel = 5 kg. Panen terbanyak Maret (5 apel) = 50 kg. Panen tersedikit Februari (2 apel dan setengah) = 25 kg. Selisihnya 50 − 25 = 25 kg. Pilihan 2,5 kg muncul jika lupa mengalikan dengan 10.'
        },
        {
            id: 'MAT-098', bentuk: 'MCMA', kompetensi: 'M12', kesulitan: 'sulit',
            pertanyaan: 'Diagram garis berikut menunjukkan suhu udara pada siang hari selama satu minggu. Pernyataan yang benar adalah …',
            gambar: garisSuhu(false), gambarPembahasan: garisSuhu(true),
            opsi: [
                'Suhu tertinggi terjadi pada hari Sabtu.',
                'Kenaikan suhu terbesar terjadi dari hari Rabu ke Kamis.',
                'Suhu pada hari Senin sama dengan suhu pada hari Jumat.',
                'Rata-rata suhu selama enam hari adalah 29,5°C.',
                'Suhu turun sebanyak tiga kali.'
            ],
            kunci: [0, 1, 3],
            pembahasan: 'Data: 28, 30, 27, 31, 29, 32. Tertinggi 32°C pada Sabtu (A benar). Kenaikan: Sen–Sel +2, Rab–Kam +4, Jum–Sab +3; terbesar Rabu ke Kamis (B benar). Senin 28 dan Jumat 29 (C salah). Rata-rata = 177 : 6 = 29,5 (D benar). Suhu turun dua kali, yaitu Selasa–Rabu dan Kamis–Jumat (E salah).'
        },
        {
            id: 'MAT-099', bentuk: 'BS', kompetensi: 'M12', kesulitan: 'sulit',
            pertanyaan: 'Diagram batang berikut menunjukkan banyak pengunjung perpustakaan dari setiap kelas selama satu minggu. Tentukan Benar atau Salah setiap pernyataan.',
            gambar: batangPengunjung(false), gambarPembahasan: batangPengunjung(true),
            opsi: [
                'Jumlah seluruh pengunjung adalah 180 siswa.',
                'Modus data banyak pengunjung adalah 30.',
                'Rata-rata pengunjung setiap kelas adalah 35 siswa.',
                'Pengunjung dari kelas 6 (6A dan 6B) 25 siswa lebih banyak daripada pengunjung dari kelas 4 (4A dan 4B).'
            ],
            kunci: [true, true, false, true],
            pembahasan: 'Data: 25, 20, 30, 35, 40, 30. Jumlah = 180 (Benar). Nilai 30 muncul dua kali, paling sering (Benar). Rata-rata = 180 : 6 = 30, bukan 35 (Salah). Kelas 6 = 40 + 30 = 70, kelas 4 = 25 + 20 = 45, selisih 25 (Benar).'
        },
        {
            id: 'MAT-100', bentuk: 'PG', kompetensi: 'M12', kesulitan: 'sedang',
            pertanyaan: 'Diagram lingkaran berikut menunjukkan pilihan ekstrakurikuler 180 siswa. Banyak siswa yang memilih pramuka adalah …',
            gambar: pieEkskul(false), gambarPembahasan: pieEkskul(true),
            opsi: ['30 siswa', '40 siswa', '45 siswa', '60 siswa'],
            kunci: 3,
            pembahasan: 'Satu lingkaran penuh 360°. Pramuka menempati 120°, yaitu 120/360 = 1/3 bagian. Banyak siswa = 1/3 × 180 = 60 siswa. Banyak siswa tidak sama dengan besar sudutnya (120°).'
        }
    ]);
})(TKA.gambarMat);
