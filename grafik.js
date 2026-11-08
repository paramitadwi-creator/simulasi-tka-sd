/*
 * Grafik SVG sederhana tanpa library (garis perkembangan nilai/kompetensi).
 */
(function (TKA) {
    'use strict';

    var esc = TKA.util.escape;

    /**
     * titik: [{ label, nilai (0–100), warna?, keterangan? }]
     */
    function garis(titik, opsi) {
        opsi = opsi || {};
        if (!titik.length) {
            return '<p class="kosong">Belum ada data untuk ditampilkan.</p>';
        }
        var W = 640, H = 260, kiri = 38, kanan = 16, atas = 16, bawah = 42;
        var lebar = W - kiri - kanan, tinggi = H - atas - bawah;
        var n = titik.length;
        var x = function (i) { return kiri + (n === 1 ? lebar / 2 : (i * lebar) / (n - 1)); };
        var y = function (v) { return atas + tinggi - (v / 100) * tinggi; };

        var svg = '<svg class="grafik" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' +
            esc(opsi.judul || 'Grafik perkembangan') + '">';

        [0, 25, 50, 75, 100].forEach(function (v) {
            svg += '<line class="grid' + (v === (opsi.garisAcuan || -1) ? ' acuan' : '') + '" x1="' + kiri +
                '" x2="' + (W - kanan) + '" y1="' + y(v) + '" y2="' + y(v) + '"/>';
            svg += '<text class="sumbu" x="' + (kiri - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>';
        });
        if (opsi.garisAcuan) {
            svg += '<line class="grid acuan" x1="' + kiri + '" x2="' + (W - kanan) + '" y1="' +
                y(opsi.garisAcuan) + '" y2="' + y(opsi.garisAcuan) + '"/>';
        }

        var d = titik.map(function (t, i) { return (i ? 'L' : 'M') + x(i) + ' ' + y(t.nilai); }).join(' ');
        svg += '<path class="jalur" d="' + d + '"/>';

        var langkahLabel = Math.max(1, Math.ceil(n / 8));
        titik.forEach(function (t, i) {
            svg += '<g class="titik"><circle cx="' + x(i) + '" cy="' + y(t.nilai) + '" r="5" class="' +
                esc(t.kelas || '') + '"><title>' + esc((t.keterangan || t.label) + ': ' + t.nilai) + '</title></circle>';
            if (n <= 12) {
                svg += '<text class="nilai" x="' + x(i) + '" y="' + (y(t.nilai) - 10) + '" text-anchor="middle">' +
                    esc(TKA.util.angka(t.nilai)) + '</text>';
            }
            svg += '</g>';
            if (i % langkahLabel === 0 || i === n - 1) {
                svg += '<text class="sumbu" x="' + x(i) + '" y="' + (H - bawah + 18) + '" text-anchor="middle">' +
                    esc(t.label) + '</text>';
            }
        });
        svg += '</svg>';
        return svg;
    }

    /** Batang horizontal persentase per kompetensi. */
    function batang(baris) {
        return '<div class="batang-list">' + baris.map(function (b) {
            var cls = b.persen >= TKA.CONFIG.batasDikuasai ? 'baik' :
                b.persen >= TKA.CONFIG.batasBerkembang ? 'sedang' : 'lemah';
            return '<div class="batang-baris">' +
                '<div class="batang-label"><span class="kode">' + esc(b.kode) + '</span> ' + esc(b.nama) + '</div>' +
                '<div class="batang-wadah"><div class="batang-isi ' + cls + '" style="width:' + b.persen + '%"></div>' +
                (b.pembanding != null ? '<div class="batang-penanda" style="left:' + b.pembanding +
                    '%" title="Sesi sebelumnya: ' + b.pembanding + '%"></div>' : '') +
                '</div>' +
                '<div class="batang-angka">' + b.persen + '%<small>' + esc(b.info || '') + '</small></div>' +
                '</div>';
        }).join('') + '</div>';
    }

    TKA.grafik = { garis: garis, batang: batang };
})(window.TKA);
