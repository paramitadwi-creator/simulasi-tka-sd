/*
 * Pustaka gambar SVG untuk soal Matematika.
 * Setiap fungsi mengembalikan string <svg>. Soal memakai versi "polos"
 * (hanya data yang diperlukan), pembahasan memakai versi berketerangan.
 */
(function (TKA) {
    'use strict';

    var NAVY = '#172b4d', BIRU = '#315efb', HIJAU = '#16a36a', MERAH = '#d64545', KUNING = '#f4b740';
    var S = 'stroke="' + NAVY + '" stroke-width="2"';

    function svg(w, h, isi) {
        return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" xmlns="http://www.w3.org/2000/svg" role="img">' + isi + '</svg>';
    }

    /** teks(x, y, isi, ukuran, atributTambahan) — rata tengah kecuali diberi text-anchor */
    function teks(x, y, t, uk, ext) {
        ext = ext || '';
        var anchor = ext.indexOf('text-anchor') >= 0 ? '' : 'text-anchor="middle" ';
        var warna = ext.indexOf('fill=') >= 0 ? '' : 'fill="' + NAVY + '" ';
        return '<text x="' + x + '" y="' + y + '" font-size="' + (uk || 14) + '" ' + anchor + warna +
            'font-family="Inter,Arial,sans-serif" ' + ext + '>' + t + '</text>';
    }
    function tebal(warna) { return 'font-weight="700"' + (warna ? ' fill="' + warna + '"' : ''); }
    function garis(x1, y1, x2, y2, ext) {
        return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" ' + (ext || S) + '/>';
    }
    function putus(warna, w) { return 'stroke="' + (warna || MERAH) + '" stroke-width="' + (w || 2) + '" stroke-dasharray="6 4"'; }
    function kotak(x, y, w, h, fill, ext) {
        return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (fill || '#fff') + '" ' + (ext || S) + '/>';
    }
    function lingkar(cx, cy, r, fill, ext) {
        return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || '#fff') + '" ' + (ext || S) + '/>';
    }
    function jalur(d, fill, ext) { return '<path d="' + d + '" fill="' + (fill || 'none') + '" ' + (ext || S) + '/>'; }

    /* ---------- Diagram batang vertikal ---------- */
    // data: [[label, nilai]], o: {maks, langkah, skala, judulY, tampilNilai, rata, lebar}
    function batang(data, o) {
        o = o || {};
        var x0 = 54, y0 = 220, maks = o.maks || 20, langkah = o.langkah || 2;
        var tinggi = 190, skala = tinggi / maks, lebarArea = o.lebar || 290, jarak = lebarArea / data.length;
        var isi = '';
        for (var v = 0; v <= maks; v += langkah) {
            var y = y0 - v * skala;
            isi += garis(x0, y, x0 + lebarArea, y, 'stroke="#e6eaf1"') + teks(x0 - 12, y + 4, v, 11);
        }
        data.forEach(function (d, i) {
            var bw = Math.min(40, jarak * 0.6), x = x0 + jarak * i + (jarak - bw) / 2, h = d[1] * skala;
            isi += '<rect x="' + x + '" y="' + (y0 - h) + '" width="' + bw + '" height="' + h + '" fill="' + (d[2] || BIRU) + '" rx="2"/>' +
                teks(x + bw / 2, y0 + 18, d[0], 12);
            if (o.tampilNilai) { isi += teks(x + bw / 2, y0 - h - 6, d[1], 12, tebal()); }
        });
        isi += garis(x0, y0, x0 + lebarArea, y0) + garis(x0, 20, x0, y0) +
            teks(16, 120, o.judulY || '', 11, 'transform="rotate(-90 16 120)"');
        if (o.rata != null) {
            var ym = y0 - o.rata * skala;
            isi += garis(x0, ym, x0 + lebarArea, ym, putus()) +
                teks(x0 + lebarArea + 8, ym + 4, o.labelRata || ('rata-rata = ' + o.rata), 11, 'text-anchor="start" ' + tebal(MERAH));
        }
        return svg(x0 + lebarArea + (o.rata != null ? 110 : 16), 245, isi);
    }

    /* ---------- Diagram garis ---------- */
    function grafikGaris(data, o) {
        o = o || {};
        var x0 = 54, y0 = 210, min = o.min || 0, maks = o.maks || 10, langkah = o.langkah || 1;
        var tinggi = 180, skala = tinggi / (maks - min), lebar = 300, jarak = lebar / (data.length - 1);
        var isi = '';
        for (var v = min; v <= maks; v += langkah) {
            var y = y0 - (v - min) * skala;
            isi += garis(x0, y, x0 + lebar, y, 'stroke="#e6eaf1"') + teks(x0 - 12, y + 4, v, 11);
        }
        var d = data.map(function (p, i) { return (i ? 'L' : 'M') + (x0 + i * jarak) + ' ' + (y0 - (p[1] - min) * skala); }).join(' ');
        isi += jalur(d, 'none', 'stroke="' + BIRU + '" stroke-width="2.5"');
        data.forEach(function (p, i) {
            var x = x0 + i * jarak, y = y0 - (p[1] - min) * skala;
            isi += lingkar(x, y, 4.5, BIRU, 'stroke="#fff" stroke-width="1.5"') + teks(x, y0 + 18, p[0], 11);
            if (o.tampilNilai) { isi += teks(x, y - 10, p[1], 11, tebal()); }
        });
        isi += garis(x0, y0, x0 + lebar, y0) + garis(x0, 20, x0, y0) +
            teks(16, 115, o.judulY || '', 11, 'transform="rotate(-90 16 115)"');
        return svg(x0 + lebar + 24, 235, isi + (o.tambahan || ''));
    }

    /* ---------- Diagram lingkaran ---------- */
    // sektor: [{sudut, warna, label, ket}] mulai dari arah jam 12 searah jarum jam
    function pie(sektor, o) {
        o = o || {};
        var cx = o.cx || 150, cy = o.cy || 115, r = o.r || 92, a = 0, isi = '', label = '';
        sektor.forEach(function (s) {
            var a1 = a, a2 = a + s.sudut;
            var p = function (ang, rr) {
                var t = ang * Math.PI / 180;
                return [cx + rr * Math.sin(t), cy - rr * Math.cos(t)];
            };
            var p1 = p(a1, r), p2 = p(a2, r), besar = s.sudut > 180 ? 1 : 0;
            isi += jalur('M' + cx + ' ' + cy + ' L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + besar +
                ' 1 ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + ' Z', s.warna);
            var tengah = p((a1 + a2) / 2, s.sudut < 50 ? r + 22 : r * 0.55);
            var anc = s.sudut < 50 ? (tengah[0] < cx ? 'text-anchor="end" ' : 'text-anchor="start" ') : '';
            if (s.sudut < 50) {
                var q = p((a1 + a2) / 2, r * 0.8), q2 = p((a1 + a2) / 2, r + 14);
                label += garis(q[0].toFixed(1), q[1].toFixed(1), q2[0].toFixed(1), q2[1].toFixed(1), 'stroke="' + NAVY + '" stroke-width="1"');
            }
            label += teks(tengah[0].toFixed(1), (tengah[1] + (s.ket ? -2 : 4)).toFixed(1), s.label, 11, anc + tebal());
            if (s.ket) { label += teks(tengah[0].toFixed(1), (tengah[1] + 12).toFixed(1), s.ket, 10, anc); }
            a = a2;
        });
        return svg(o.w || 300, o.h || 235, isi + (o.tambahan || '') + label);
    }

    /* ---------- Garis bilangan ---------- */
    // o: {min, maks, langkah, bagi (sub-tick per satuan), titik:[{v,label,warna,atas}], label: fn}
    function garisBilangan(o) {
        var x0 = 30, lebar = o.lebar || 380, y = 60, n = (o.maks - o.min);
        var skala = lebar / n, isi = garis(x0 - 10, y, x0 + lebar + 10, y);
        isi += jalur('M' + (x0 + lebar + 10) + ' ' + (y - 5) + ' L' + (x0 + lebar + 18) + ' ' + y + ' L' + (x0 + lebar + 10) + ' ' + (y + 5), NAVY);
        isi += jalur('M' + (x0 - 10) + ' ' + (y - 5) + ' L' + (x0 - 18) + ' ' + y + ' L' + (x0 - 10) + ' ' + (y + 5), NAVY);
        var bagi = o.bagi || 1;
        for (var k = 0; k <= n * bagi; k++) {
            var v = o.min + k / bagi, x = x0 + (v - o.min) * skala, utama = (k % bagi === 0);
            isi += garis(x, y - (utama ? 8 : 5), x, y + (utama ? 8 : 5), 'stroke="' + NAVY + '" stroke-width="' + (utama ? 2 : 1.2) + '"');
            if (utama && (o.labelSemua !== false) && ((v - o.min) % (o.langkah || 1) === 0)) {
                isi += teks(x, y + 26, o.label ? o.label(v) : String(v).replace('-', '−'), 12);
            }
        }
        (o.titik || []).forEach(function (t) {
            var x = x0 + (t.v - o.min) * skala;
            isi += lingkar(x, y, 6, t.warna || MERAH, 'stroke="#fff" stroke-width="1.5"') +
                teks(x, y - 16, t.label, 13, tebal(t.warna || MERAH));
        });
        return svg(x0 + lebar + 30, o.tinggi || (o.tambahan ? 125 : 100), isi + (o.tambahan ? o.tambahan(x0, y, skala) : ''));
    }

    /* ---------- Jam analog ---------- */
    function jam(h, m, o) {
        o = o || {};
        var cx = 90, cy = 90, r = 72, isi = lingkar(cx, cy, r, '#fff', 'stroke="' + NAVY + '" stroke-width="3"');
        for (var i = 0; i < 60; i++) {
            var t = i * 6 * Math.PI / 180, besar = i % 5 === 0;
            isi += garis((cx + (r - (besar ? 10 : 5)) * Math.sin(t)).toFixed(1), (cy - (r - (besar ? 10 : 5)) * Math.cos(t)).toFixed(1),
                (cx + r * Math.sin(t)).toFixed(1), (cy - r * Math.cos(t)).toFixed(1), 'stroke="' + NAVY + '" stroke-width="' + (besar ? 2 : 1) + '"');
            if (besar) {
                var n = i / 5 || 12;
                isi += teks((cx + (r - 22) * Math.sin(t)).toFixed(1), (cy - (r - 22) * Math.cos(t) + 5).toFixed(1), n, 13, tebal());
            }
        }
        var am = (h % 12 + m / 60) * 30 * Math.PI / 180, mm = m * 6 * Math.PI / 180;
        isi += garis(cx, cy, (cx + 38 * Math.sin(am)).toFixed(1), (cy - 38 * Math.cos(am)).toFixed(1), 'stroke="' + NAVY + '" stroke-width="5" stroke-linecap="round"');
        isi += garis(cx, cy, (cx + 58 * Math.sin(mm)).toFixed(1), (cy - 58 * Math.cos(mm)).toFixed(1), 'stroke="' + BIRU + '" stroke-width="3" stroke-linecap="round"');
        isi += lingkar(cx, cy, 5, NAVY, '');
        return svg(o.w || 180, 180, isi + (o.tambahan || ''));
    }

    /* ---------- Bidang koordinat ---------- */
    // titik: [{x,y,label,warna}], o: {n, sel, tambahan(fn px,py)}
    function koordinat(titik, o) {
        o = o || {};
        var n = o.n || 8, sel = o.sel || 30, x0 = 36, y0 = 20 + n * sel, isi = '';
        var px = function (x) { return x0 + x * sel; }, py = function (y) { return y0 - y * sel; };
        for (var i = 0; i <= n; i++) {
            isi += garis(px(i), py(0), px(i), py(n), 'stroke="#e6eaf1"') + garis(px(0), py(i), px(n), py(i), 'stroke="#e6eaf1"');
            isi += teks(px(i), y0 + 18, i, 11) + (i ? teks(x0 - 12, py(i) + 4, i, 11) : '');
        }
        isi += garis(px(0), py(0), px(n) + 8, py(0)) + garis(px(0), py(0), px(0), py(n) - 8) +
            teks(px(n) + 14, py(0) + 4, 'x', 12, tebal()) + teks(px(0), py(n) - 12, 'y', 12, tebal());
        if (o.tambahan) { isi += o.tambahan(px, py); }
        titik.forEach(function (t) {
            isi += lingkar(px(t.x), py(t.y), 5, t.warna || MERAH, 'stroke="#fff" stroke-width="1.5"') +
                teks(px(t.x) + 10, py(t.y) - 8, t.label, 13, 'text-anchor="start" ' + tebal(t.warna || MERAH));
        });
        return svg(x0 + n * sel + 30, y0 + 46, isi);
    }

    /* ---------- Balok miring (proyeksi kabinet) ---------- */
    // ukuran px: p (panjang depan), t (tinggi), d (kedalaman miring)
    function balok(p, t, d, o) {
        o = o || {};
        var x = o.x || 40, y = (o.y || 20) + d, dx = d * 0.8, dy = d * 0.6;
        var warna = o.isi || 'none', tanpa = 'stroke="none"';
        var isi = (o.isiDalam || '') +
            (warna !== 'none' ? kotak(x, y, p, t, warna, tanpa) +
                jalur('M' + x + ' ' + y + ' L' + (x + dx) + ' ' + (y - dy) + ' L' + (x + p + dx) + ' ' + (y - dy) + ' L' + (x + p) + ' ' + y + ' Z', warna, tanpa + ' opacity=".75"') +
                jalur('M' + (x + p) + ' ' + y + ' L' + (x + p + dx) + ' ' + (y - dy) + ' L' + (x + p + dx) + ' ' + (y - dy + t) + ' L' + (x + p) + ' ' + (y + t) + ' Z', warna, tanpa + ' opacity=".6"') : '') +
            jalur('M' + x + ' ' + y + ' L' + (x + dx) + ' ' + (y - dy) + ' L' + (x + p + dx) + ' ' + (y - dy) + ' L' + (x + p + dx) + ' ' + (y - dy + t) +
                ' L' + (x + p) + ' ' + (y + t) + ' L' + x + ' ' + (y + t) + ' Z M' + x + ' ' + y + ' L' + (x + p) + ' ' + y + ' L' + (x + p + dx) + ' ' + (y - dy) +
                ' M' + (x + p) + ' ' + y + ' L' + (x + p) + ' ' + (y + t), 'none') +
            jalur('M' + x + ' ' + (y + t) + ' L' + (x + dx) + ' ' + (y - dy + t) + ' L' + (x + p + dx) + ' ' + (y - dy + t) + ' M' + (x + dx) + ' ' + (y - dy) + ' L' + (x + dx) + ' ' + (y - dy + t),
                'none', 'stroke="' + NAVY + '" stroke-width="1.2" stroke-dasharray="5 4"');
        if (o.label) {
            isi += teks(x + p / 2, y + t + 20, o.label[0]) + teks(x - 8, y + t / 2 + 4, o.label[1], 14, 'text-anchor="end"') +
                teks(x + p + dx / 2 + 8, y + t - dy / 2 + 14, o.label[2], 13, 'text-anchor="start"');
        }
        return isi;
    }

    /* ---------- Kubus satuan isometrik ---------- */
    // tumpukan: array [x][y] = tinggi (x ke kanan, y ke belakang)
    function kubusSatuan(tumpukan, o) {
        o = o || {};
        var s = o.s || 26, ox = o.ox || 120, oy = o.oy || 170, isi = '';
        var iso = function (x, y, z) { return [ox + (x - y) * s * 0.87, oy + (x + y) * s * 0.5 - z * s]; };
        var daftar = [];
        tumpukan.forEach(function (baris, x) { baris.forEach(function (h, y) { for (var z = 0; z < h; z++) { daftar.push([x, y, z]); } }); });
        daftar.sort(function (a, b) { return (a[0] + a[1]) - (b[0] + b[1]) || a[2] - b[2]; });
        // urutan gambar: belakang dulu (x+y kecil berada di belakang? di sini x,y besar = depan)
        daftar.forEach(function (c) {
            var x = c[0], y = c[1], z = c[2];
            var a = iso(x, y, z + 1), b = iso(x + 1, y, z + 1), cc = iso(x + 1, y + 1, z + 1), d = iso(x, y + 1, z + 1);
            var b0 = iso(x + 1, y, z), c0 = iso(x + 1, y + 1, z), d0 = iso(x, y + 1, z);
            var pt = function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); };
            var warna = o.warna ? o.warna(x, y, z) : null;
            isi += jalur('M' + pt(a) + ' L' + pt(b) + ' L' + pt(cc) + ' L' + pt(d) + ' Z', warna || '#dfe7ff', 'stroke="' + NAVY + '" stroke-width="1.3"') +
                jalur('M' + pt(b) + ' L' + pt(cc) + ' L' + pt(c0) + ' L' + pt(b0) + ' Z', warna ? warna : '#b9c8ff', 'stroke="' + NAVY + '" stroke-width="1.3"') +
                jalur('M' + pt(d) + ' L' + pt(cc) + ' L' + pt(c0) + ' L' + pt(d0) + ' Z', warna ? warna : '#8fa6f5', 'stroke="' + NAVY + '" stroke-width="1.3"');
        });
        return svg(o.w || 260, o.h || 210, isi + (o.tambahan || ''));
    }

    /* ---------- Tabel ---------- */
    // kolom: [lebar...], baris: [[sel...]], baris pertama = judul
    function tabel(kolom, baris, o) {
        o = o || {};
        var x0 = 10, y0 = 10, h = o.tinggi || 30, isi = '', total = kolom.reduce(function (a, b) { return a + b; }, 0);
        baris.forEach(function (r, i) {
            var x = x0;
            r.forEach(function (c, j) {
                var sorot = o.sorot && o.sorot(i, j);
                isi += kotak(x, y0 + i * h, kolom[j], h, i === 0 ? '#edf1ff' : (sorot ? '#fff1c2' : '#fff'), 'stroke="' + NAVY + '" stroke-width="1.2"') +
                    teks(x + kolom[j] / 2, y0 + i * h + h / 2 + 5, c, 13, i === 0 || sorot ? tebal() : '');
                x += kolom[j];
            });
        });
        return svg(total + 20, baris.length * h + 20 + (o.bawah || 0), isi + (o.tambahan || ''));
    }

    /* ---------- Neraca seimbang ---------- */
    // kiri/kanan: string SVG isi piring (digambar di atas piring), lebar 120
    function neraca(kiri, kanan, o) {
        o = o || {};
        var isi = jalur('M150 40 L150 150', 'none') + jalur('M120 160 L180 160 L150 140 Z', '#c4ccdc') +
            garis(40, 40, 260, 40, 'stroke="' + NAVY + '" stroke-width="4" stroke-linecap="round"') +
            garis(40, 40, 40, 80, 'stroke="' + NAVY + '" stroke-width="1.5"') + garis(260, 40, 260, 80, 'stroke="' + NAVY + '" stroke-width="1.5"') +
            jalur('M0 80 Q40 95 80 80 Z', '#e6eaf1') + jalur('M220 80 Q260 95 300 80 Z', '#e6eaf1') +
            '<g transform="translate(0,0)">' + kiri + '</g><g transform="translate(220,0)">' + kanan + '</g>';
        return svg(o.w || 300, 170, isi + (o.tambahan || ''));
    }
    // bentuk kecil untuk isi piring; posisi x di dalam piring (0..80), dasar y=78
    function bentuk(jenis, x, warna, label) {
        var y = 78, r = '';
        if (jenis === 'segitiga') { r = jalur('M' + x + ' ' + y + ' L' + (x + 22) + ' ' + y + ' L' + (x + 11) + ' ' + (y - 20) + ' Z', warna || KUNING); }
        else if (jenis === 'lingkaran') { r = lingkar(x + 11, y - 11, 11, warna || '#7fd3a8'); }
        else if (jenis === 'kotak') { r = kotak(x, y - 22, 22, 22, warna || '#cfe0ff'); }
        else if (jenis === 'beban') { r = jalur('M' + x + ' ' + y + ' L' + (x + 34) + ' ' + y + ' L' + (x + 28) + ' ' + (y - 24) + ' L' + (x + 6) + ' ' + (y - 24) + ' Z', '#c4ccdc') + teks(x + 17, y - 7, label, 11, tebal()); }
        return r;
    }

    /* ---------- Penggaris ---------- */
    function penggaris(cmMaks, o) {
        o = o || {};
        var x0 = 20, sk = o.sk || 34, y = o.y || 70, isi = kotak(x0 - 10, y, cmMaks * sk + 20, 44, '#fff7dc');
        for (var i = 0; i <= cmMaks * 10; i++) {
            var x = x0 + i * sk / 10, cm = i % 10 === 0, half = i % 5 === 0;
            isi += garis(x, y, x, y + (cm ? 16 : half ? 11 : 6), 'stroke="' + NAVY + '" stroke-width="' + (cm ? 1.6 : 0.8) + '"');
            if (cm) { isi += teks(x, y + 32, i / 10, 11); }
        }
        return { isi: isi, x: function (cm) { return x0 + cm * sk; }, lebar: cmMaks * sk + 40 };
    }

    TKA.gambarMat = {
        NAVY: NAVY, BIRU: BIRU, HIJAU: HIJAU, MERAH: MERAH, KUNING: KUNING, S: S,
        svg: svg, teks: teks, tebal: tebal, garis: garis, putus: putus, kotak: kotak, lingkar: lingkar, jalur: jalur,
        batang: batang, grafikGaris: grafikGaris, pie: pie, garisBilangan: garisBilangan, jam: jam,
        koordinat: koordinat, balok: balok, kubusSatuan: kubusSatuan, tabel: tabel, neraca: neraca, bentuk: bentuk,
        penggaris: penggaris
    };
})(window.TKA);
