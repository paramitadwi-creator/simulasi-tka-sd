/*
 * Bank soal IPAS — bagian 3 (IPAS-052 s.d. IPAS-076):
 * P07 cahaya dan bunyi, P08 bumi dan tata surya, P09 peta dan keragaman Indonesia.
 */
(function (G) {
    'use strict';
    var svg = G.svg, teks = G.teks, tebal = G.tebal, garis = G.garis, kotak = G.kotak, lingkar = G.lingkar, jalur = G.jalur;
    var NAVY = G.NAVY, HIJAU = G.HIJAU, MERAH = G.MERAH, BIRU = G.BIRU;

    function panah(x1, y1, x2, y2, warna, w) {
        var a = Math.atan2(y2 - y1, x2 - x1), u = 9;
        return garis(x1, y1, x2, y2, 'stroke="' + (warna || NAVY) + '" stroke-width="' + (w || 2) + '"') +
            jalur('M' + (x2 - u * Math.cos(a - 0.45)).toFixed(1) + ' ' + (y2 - u * Math.sin(a - 0.45)).toFixed(1) + ' L' + x2 + ' ' + y2 + ' L' +
                (x2 - u * Math.cos(a + 0.45)).toFixed(1) + ' ' + (y2 - u * Math.sin(a + 0.45)).toFixed(1) + ' Z', warna || NAVY, 'stroke="none"');
    }

    /* ---------- P07 ---------- */
    function cermin(bahas) {
        var cx = 200, cy = 190, L = 150, t = 40 * Math.PI / 180;
        var isi = kotak(60, 190, 280, 10, '#cfe0ff', 'stroke="' + NAVY + '" stroke-width="1.5"');
        for (var i = 0; i < 14; i++) { isi += garis(66 + i * 20, 200, 58 + i * 20, 210, 'stroke="' + NAVY + '" stroke-width="1"'); }
        isi += garis(cx, 30, cx, cy, 'stroke="' + NAVY + '" stroke-width="1.5" stroke-dasharray="6 4"') + teks(cx, 22, 'garis normal', 11);
        var ax = cx - L * Math.sin(t), ay = cy - L * Math.cos(t);
        isi += panah(ax.toFixed(1), ay.toFixed(1), cx, cy, '#e09e1a', 3) + teks(ax - 6, ay - 6, 'sinar datang', 11, 'text-anchor="end" ' + tebal('#b07a10'));
        isi += jalur('M' + cx + ' ' + (cy - 40) + ' A40 40 0 0 0 ' + (cx - 40 * Math.sin(t)).toFixed(1) + ' ' + (cy - 40 * Math.cos(t)).toFixed(1), 'none', 'stroke="' + MERAH + '" stroke-width="2"') +
            teks(cx - 26, cy - 50, '40°', 12, tebal(MERAH));
        if (bahas) {
            var bx = cx + L * Math.sin(t), by = cy - L * Math.cos(t);
            isi += panah(cx, cy, bx.toFixed(1), by.toFixed(1), HIJAU, 3) + teks(bx + 6, by - 6, 'sinar pantul', 11, 'text-anchor="start" ' + tebal(HIJAU)) +
                jalur('M' + cx + ' ' + (cy - 40) + ' A40 40 0 0 1 ' + (cx + 40 * Math.sin(t)).toFixed(1) + ' ' + (cy - 40 * Math.cos(t)).toFixed(1), 'none', 'stroke="' + HIJAU + '" stroke-width="2"') +
                teks(cx + 26, cy - 50, '40°', 12, tebal(HIJAU)) + teks(cx, 232, 'sudut datang = sudut pantul', 12, tebal(HIJAU));
        }
        return svg(400, bahas ? 242 : 220, isi);
    }

    function botol(bahas) {
        var isi = '', isiAir = [0.75, 0.5, 0.25, 0.9];
        isiAir.forEach(function (f, i) {
            var x = 30 + i * 100, y0 = 40, h = 140;
            isi += '<rect x="' + (x + 10) + '" y="' + (y0 + h - h * f) + '" width="50" height="' + (h * f) + '" fill="#8fd0ff"/>' +
                jalur('M' + (x + 25) + ' ' + (y0 - 25) + ' L' + (x + 25) + ' ' + y0 + ' L' + (x + 10) + ' ' + (y0 + 15) + ' L' + (x + 10) + ' ' + (y0 + h) + ' L' + (x + 60) + ' ' + (y0 + h) +
                    ' L' + (x + 60) + ' ' + (y0 + 15) + ' L' + (x + 45) + ' ' + y0 + ' L' + (x + 45) + ' ' + (y0 - 25), 'none') +
                teks(x + 35, y0 + h + 22, ['A', 'B', 'C', 'D'][i], 14, tebal());
            if (bahas) { isi += teks(x + 35, y0 + h + 40, ['', '', 'kolom udara terpanjang', ''][i], 10, tebal(HIJAU)); }
        });
        if (bahas) { isi += teks(220, 238, 'Ditiup: makin panjang kolom udara → nada makin rendah', 12, tebal(HIJAU)); }
        return svg(440, bahas ? 248 : 210, isi);
    }

    /* ---------- P08 ---------- */
    function siklus(bahas) {
        var isi = kotak(0, 0, 460, 260, '#eaf6ff', 'stroke="none"');
        isi += jalur('M0 260 L0 190 L70 110 L130 170 L170 140 L250 215 L260 260 Z', '#9ccf8a', 'stroke="#5d8f4b" stroke-width="1.5"') +
            jalur('M250 215 Q300 235 330 222 L460 222 L460 260 L250 260 Z', '#5fa8e8', 'stroke="none"') +
            jalur('M150 165 Q190 200 210 205 Q240 215 300 228', 'none', 'stroke="#4a90d9" stroke-width="5"') +
            lingkar(410, 40, 24, '#f4b740', 'stroke="#e09e1a" stroke-width="2"') +
            '<g fill="#fff" stroke="#9aa7b8" stroke-width="1.5"><circle cx="160" cy="55" r="22"/><circle cx="190" cy="45" r="28"/><circle cx="222" cy="58" r="20"/><rect x="150" y="55" width="80" height="22" stroke="none"/></g>';
        for (var i = 0; i < 6; i++) { isi += garis(70 + i * 14, 92 + (i % 2) * 6, 64 + i * 14, 108 + (i % 2) * 6, 'stroke="#4a90d9" stroke-width="2"'); }
        function nomor(x, y, n) { return lingkar(x, y, 12, '#d64545', 'stroke="#fff" stroke-width="2"') + teks(x, y + 5, n, 12, tebal('#fff')); }
        isi += panah(370, 205, 300, 95, MERAH, 2.5) + nomor(345, 150, 1) + panah(255, 60, 236, 60, MERAH, 2.5) + nomor(270, 60, 2) +
            panah(120, 70, 95, 90, MERAH, 2.5) + nomor(128, 62, 3) + panah(190, 190, 245, 222, MERAH, 2.5) + nomor(205, 180, 4);
        if (bahas) {
            isi += teks(395, 140, '1 Penguapan', 12, tebal()) + teks(395, 155, '(evaporasi)', 10) + teks(275, 100, '2 Pengembunan', 12, tebal()) + teks(275, 114, '(kondensasi)', 10) +
                teks(45, 135, '3 Hujan', 12, tebal()) + teks(45, 149, '(presipitasi)', 10) + teks(130, 238, '4 Air mengalir & meresap', 12, tebal()) + teks(130, 252, 'kembali ke laut', 10);
        }
        return svg(460, 260, isi);
    }

    function tataSurya(bahas) {
        var nama = ['Merkurius', 'Venus', 'Bumi', 'Mars', 'Jupiter', 'Saturnus', 'Uranus', 'Neptunus'];
        var ukuran = [4, 6, 6.5, 5, 15, 13, 9, 9], warna = ['#a7a7a7', '#e3b56b', '#4a90d9', '#d4553c', '#d9a066', '#e8cf8a', '#8fd3e0', '#4c6fd6'];
        var isi = kotak(0, 0, 560, 230, '#0f1b3d', 'stroke="none"') + lingkar(-60, 115, 95, '#f6b93b', 'stroke="#f8d26a" stroke-width="4"');
        nama.forEach(function (n, i) {
            var r = 110 + i * 55, x = -60 + r;
            isi += '<circle cx="-60" cy="115" r="' + r + '" fill="none" stroke="#3b4a7a" stroke-width="1"/>' + lingkar(x, 115, ukuran[i], warna[i], 'stroke="none"');
            if (i === 5) { isi += '<ellipse cx="' + x + '" cy="115" rx="' + (ukuran[i] + 8) + '" ry="4" fill="none" stroke="#e8cf8a" stroke-width="2"/>'; }
            if (i === 3 && !bahas) { isi += teks(x, 95, 'X', 15, tebal('#ffd166')); }
            if (bahas) { isi += teks(i === 0 ? x - 6 : x, i % 2 ? 150 : 88, n, 10, (i === 0 ? 'text-anchor="start" ' : '') + tebal('#fff')); }
        });
        return svg(560, 230, isi);
    }

    function gerhana(bahas) {
        var isi = kotak(0, 0, 520, 200, '#0f1b3d', 'stroke="none"') +
            lingkar(60, 100, 50, '#f6b93b', 'stroke="#f8d26a" stroke-width="4"') + teks(60, 175, 'Matahari', 12, tebal('#fff')) +
            lingkar(300, 100, 12, '#c8c8c8', 'stroke="none"') + teks(300, 175, 'Bulan', 12, tebal('#fff')) +
            lingkar(440, 100, 32, '#4a90d9', 'stroke="none"') + teks(440, 175, 'Bumi', 12, tebal('#fff'));
        if (bahas) {
            isi += jalur('M60 50 L300 88 L440 92 L440 108 L300 112 L60 150 Z', 'rgba(255,230,150,.18)', 'stroke="none"') +
                jalur('M300 88 L420 96 L420 104 L300 112 Z', 'rgba(0,0,0,.55)', 'stroke="none"') +
                teks(380, 60, 'bayangan bulan jatuh ke bumi', 11, tebal('#ffd166')) + teks(260, 195, 'Matahari – Bulan – Bumi segaris → gerhana matahari', 12, tebal('#7ee0a5'));
        }
        return svg(520, bahas ? 205 : 200, isi);
    }

    function lapisanBumi(bahas) {
        var isi = '', cx = 150, cy = 150;
        [[130, '#8b5a2b'], [118, '#e8743b'], [70, '#f4b740'], [36, '#fde68a']].forEach(function (l) { isi += lingkar(cx, cy, l[0], l[1], 'stroke="' + NAVY + '" stroke-width="1.5"'); });
        function n(x, y, k) { return lingkar(x, y, 11, '#315efb', 'stroke="#fff" stroke-width="2"') + teks(x, y + 5, k, 11, tebal('#fff')); }
        isi += n(290, 40, 1) + garis(280, 46, 232, 58, 'stroke="#315efb" stroke-width="1.5"') +
            n(300, 100, 2) + garis(289, 104, 238, 118, 'stroke="#315efb" stroke-width="1.5"') +
            n(300, 160, 3) + garis(289, 158, 202, 159, 'stroke="#315efb" stroke-width="1.5"') +
            n(300, 210, 4) + garis(289, 206, 162, 160, 'stroke="#315efb" stroke-width="1.5"');
        if (bahas) {
            isi += teks(315, 45, 'kerak bumi (tempat kita tinggal)', 11, 'text-anchor="start" ' + tebal(HIJAU)) + teks(315, 105, 'selimut/mantel', 11, 'text-anchor="start" ' + tebal()) +
                teks(315, 165, 'inti luar', 11, 'text-anchor="start" ' + tebal()) + teks(315, 215, 'inti dalam', 11, 'text-anchor="start" ' + tebal());
        }
        return svg(bahas ? 500 : 330, 290, isi);
    }

    /* ---------- P09 ---------- */
    function peta(bahas) {
        var isi = kotak(10, 10, 300, 230, '#f3f7ee') + kotak(10, 115, 300, 20, '#d9d9d9', 'stroke="none"') + kotak(150, 10, 20, 230, '#d9d9d9', 'stroke="none"');
        function tempat(x, y, nama, warna) {
            return '<rect x="' + (x - 34) + '" y="' + (y - 16) + '" width="68" height="32" rx="6" fill="' + warna + '" stroke="' + NAVY + '" stroke-width="1.5"/>' + teks(x, y + 5, nama, 11, tebal());
        }
        isi += tempat(160, 125, 'Sekolah', '#cfe0ff') + tempat(255, 50, 'Pasar', '#ffe9a8') + tempat(65, 50, 'Masjid', '#cdeedd') + tempat(65, 200, 'Rumah Dina', '#fde0e0');
        var cx = 370, cy = 70;
        isi += lingkar(cx, cy, 34, '#fff') + panah(cx, cy + 20, cx, cy - 26, MERAH, 3) + teks(cx, cy - 40, 'U', 14, tebal(MERAH));
        if (bahas) {
            [['TL', 45], ['T', 90], ['TG', 135], ['S', 180], ['BD', 225], ['B', 270], ['BL', 315]].forEach(function (a) {
                var t = a[1] * Math.PI / 180;
                isi += garis(cx, cy, (cx + 24 * Math.sin(t)).toFixed(1), (cy - 24 * Math.cos(t)).toFixed(1), 'stroke="' + NAVY + '" stroke-width="1"') +
                    teks((cx + 46 * Math.sin(t)).toFixed(1), (cy - 46 * Math.cos(t) + 4).toFixed(1), a[0], 11, tebal(a[0] === 'TL' ? HIJAU : null));
            });
            isi += panah(185, 112, 228, 64, HIJAU, 3) + teks(370, 150, 'TL = timur laut', 12, tebal(HIJAU)) + teks(370, 170, 'Pasar di timur laut', 11) + teks(370, 186, 'dari sekolah', 11);
        }
        return svg(430, 250, isi);
    }

    function tabelRumahAdat() {
        return G.tabel([150, 190], [['Rumah adat', 'Daerah asal'], ['Rumah Gadang', 'Sumatra Barat'], ['Honai', 'Papua'], ['Joglo', 'Jawa Tengah / DI Yogyakarta'],
            ['Tongkonan', 'Sulawesi Selatan'], ['Lamin', 'Kalimantan Timur']], { sorot: function (i) { return i === 3 || i === 5; } });
    }

    function zonaWaktu(bahas) {
        var isi = '', z = [['WIB', '#cfe0ff', 'Jakarta', bahas ? '08.00' : '08.00'], ['WITA', '#cdeedd', 'Makassar', bahas ? '09.00' : '?'], ['WIT', '#ffe9a8', 'Jayapura', bahas ? '10.00' : '?']];
        z.forEach(function (d, i) {
            var x = 10 + i * 160;
            isi += kotak(x, 20, 160, 110, d[1]) + teks(x + 80, 45, d[0], 15, tebal()) + lingkar(x + 80, 75, 5, MERAH, 'stroke="none"') + teks(x + 80, 95, d[2], 12, tebal()) +
                teks(x + 80, 120, 'pukul ' + d[3], 13, tebal(i && bahas ? HIJAU : null));
        });
        if (bahas) { isi += teks(250, 152, 'Ke timur, tiap zona lebih cepat 1 jam: WITA = WIB + 1, WIT = WIB + 2', 11, tebal(HIJAU)); }
        return svg(500, bahas ? 162 : 140, isi);
    }

    TKA.tambahSoal('ipas', [
        /* ================= P07 Cahaya dan bunyi ================= */
        {
            id: 'IPAS-052', bentuk: 'PG', kompetensi: 'P07', kesulitan: 'mudah',
            pertanyaan: 'Pada pagi hari, berkas cahaya matahari yang masuk melalui celah genteng tampak berupa garis-garis lurus. Peristiwa ini menunjukkan bahwa cahaya …',
            opsi: ['dapat dipantulkan', 'dapat dibiaskan', 'merambat lurus', 'dapat diuraikan'],
            kunci: 2,
            pembahasan: 'Berkas cahaya yang tampak lurus menunjukkan bahwa cahaya merambat lurus. Pemantulan, pembiasan, dan penguraian cahaya terjadi pada peristiwa lain.'
        },
        {
            id: 'IPAS-053', bentuk: 'PG', kompetensi: 'P07', kesulitan: 'sedang',
            pertanyaan: 'Seberkas sinar mengenai cermin datar seperti gambar. Besar sudut pantul sinar tersebut adalah …',
            gambar: cermin(false), gambarPembahasan: cermin(true),
            opsi: ['40°', '50°', '80°', '140°'],
            kunci: 0,
            pembahasan: 'Pada pemantulan cahaya, sudut datang sama dengan sudut pantul. Kedua sudut diukur dari garis normal. Sudut datang 40°, sehingga sudut pantul juga 40°.'
        },
        {
            id: 'IPAS-054', bentuk: 'PG', kompetensi: 'P07', kesulitan: 'sedang',
            pertanyaan: 'Pensil yang dimasukkan sebagian ke dalam gelas berisi air tampak patah. Peristiwa ini terjadi karena cahaya …',
            opsi: ['dipantulkan oleh air', 'dibiaskan ketika melewati air dan udara', 'diserap seluruhnya oleh air', 'merambat lurus di dalam air'],
            kunci: 1,
            pembahasan: 'Cahaya berbelok (dibiaskan) ketika berpindah dari air ke udara yang kerapatannya berbeda. Akibatnya, bagian pensil di dalam air tampak bergeser sehingga pensil terlihat patah.'
        },
        {
            id: 'IPAS-055', bentuk: 'MCMA', kompetensi: 'P07', kesulitan: 'sulit',
            pertanyaan: 'Sifat bayangan yang dibentuk oleh cermin datar adalah …',
            opsi: ['tegak', 'sama besar dengan benda', 'nyata (dapat ditangkap layar)', 'jarak bayangan ke cermin sama dengan jarak benda ke cermin', 'terbalik atas-bawah'],
            kunci: [0, 1, 3],
            pembahasan: 'Bayangan pada cermin datar tegak, sama besar, dan berjarak sama dengan benda. Bayangannya maya (tidak dapat ditangkap layar), dan yang tertukar hanya sisi kiri-kanan, bukan atas-bawah.'
        },
        {
            id: 'IPAS-056', bentuk: 'BS', kompetensi: 'P07', kesulitan: 'sulit',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan tentang bunyi berikut.',
            opsi: [
                'Bunyi tidak dapat merambat di ruang hampa udara.',
                'Bunyi merambat paling cepat melalui udara.',
                'Gema terjadi karena bunyi dipantulkan oleh dinding yang jauh.',
                'Kelelawar memanfaatkan pantulan bunyi untuk mengetahui letak benda di sekitarnya.'
            ],
            kunci: [true, false, true, true],
            pembahasan: '(1) Benar: bunyi memerlukan perantara. (2) Salah: bunyi paling cepat merambat melalui zat padat, lalu zat cair, dan paling lambat melalui udara. (3) Benar. (4) Benar: kelelawar menggunakan ekolokasi.'
        },
        {
            id: 'IPAS-057', bentuk: 'PG', kompetensi: 'P07', kesulitan: 'sulit',
            pertanyaan: 'Empat botol yang sama diisi air dengan ketinggian berbeda seperti gambar. Jika bagian mulut botol ditiup, botol yang menghasilkan nada paling rendah adalah botol …',
            gambar: botol(false), gambarPembahasan: botol(true),
            opsi: ['A', 'B', 'C', 'D'],
            kunci: 2,
            pembahasan: 'Saat ditiup, yang bergetar adalah udara di dalam botol. Makin panjang kolom udara, makin lambat getarannya sehingga nadanya makin rendah. Botol C berisi air paling sedikit, jadi kolom udaranya paling panjang.'
        },
        {
            id: 'IPAS-058', bentuk: 'PG', kompetensi: 'P07', kesulitan: 'sedang',
            pertanyaan: 'Cahaya putih yang dilewatkan pada prisma kaca terurai menjadi warna-warni seperti pelangi. Peristiwa ini disebut …',
            opsi: ['pemantulan', 'perambatan', 'penyerapan', 'dispersi'],
            kunci: 3,
            pembahasan: 'Penguraian cahaya putih menjadi berbagai warna disebut dispersi. Hal ini terjadi karena setiap warna dibiaskan dengan besar yang berbeda oleh prisma. Pelangi juga terbentuk dengan cara ini.'
        },
        {
            id: 'IPAS-059', bentuk: 'PG', kompetensi: 'P07', kesulitan: 'mudah',
            pertanyaan: 'Benda berikut yang dapat meneruskan hampir seluruh cahaya yang mengenainya adalah …',
            opsi: ['kaca bening', 'papan kayu', 'kertas karton', 'dinding bata'],
            kunci: 0,
            pembahasan: 'Kaca bening adalah benda bening yang meneruskan cahaya sehingga kita dapat melihat benda di baliknya. Kayu, karton, dan bata adalah benda gelap yang tidak meneruskan cahaya.'
        },

        /* ================= P08 Bumi dan tata surya ================= */
        {
            id: 'IPAS-060', bentuk: 'MCMA', kompetensi: 'P08', kesulitan: 'sedang',
            pertanyaan: 'Gambar berikut menunjukkan siklus air. Pernyataan yang benar tentang proses bernomor pada gambar adalah …',
            gambar: siklus(false), gambarPembahasan: siklus(true),
            opsi: [
                'Proses 1 adalah penguapan air laut karena panas matahari.',
                'Proses 2 adalah pengembunan uap air menjadi awan.',
                'Proses 3 adalah penguapan air dari tumbuhan.',
                'Proses 4 adalah air yang mengalir di permukaan dan meresap ke tanah lalu kembali ke laut.',
                'Siklus air dapat terjadi tanpa energi panas matahari.'
            ],
            kunci: [0, 1, 3],
            pembahasan: 'Proses 1: air laut menguap karena panas matahari (evaporasi). Proses 2: uap air mendingin dan mengembun membentuk awan (kondensasi). Proses 3: air jatuh sebagai hujan (presipitasi), bukan penguapan. Proses 4: air mengalir melalui sungai dan meresap ke tanah, lalu kembali ke laut. Siklus air memerlukan energi panas matahari, jadi pernyataan E salah.'
        },
        {
            id: 'IPAS-061', bentuk: 'BS', kompetensi: 'P08', kesulitan: 'sulit',
            pertanyaan: 'Gambar berikut menunjukkan susunan planet dalam tata surya (ukuran dan jarak tidak sebenarnya). Tentukan Benar atau Salah setiap pernyataan.',
            gambar: tataSurya(false), gambarPembahasan: tataSurya(true),
            opsi: [
                'Planet yang paling dekat dengan Matahari adalah Merkurius.',
                'Bumi adalah planet urutan ketiga dari Matahari.',
                'Planet terbesar dalam tata surya adalah Saturnus.',
                'Planet yang bertanda X adalah Mars.'
            ],
            kunci: [true, true, false, true],
            pembahasan: 'Urutan planet dari Matahari: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus. (1) Benar. (2) Benar: Bumi urutan ketiga. (3) Salah: planet terbesar adalah Jupiter; Saturnus terkenal karena cincinnya. (4) Benar: planet keempat (bertanda X) adalah Mars.'
        },
        {
            id: 'IPAS-062', bentuk: 'PG', kompetensi: 'P08', kesulitan: 'mudah',
            pertanyaan: 'Terjadinya siang dan malam di bumi disebabkan oleh …',
            opsi: ['revolusi bumi', 'revolusi bulan', 'gerhana matahari', 'rotasi bumi'],
            kunci: 3,
            pembahasan: 'Rotasi adalah perputaran bumi pada porosnya, sekali dalam sekitar 24 jam. Bagian bumi yang menghadap matahari mengalami siang, sedangkan bagian yang membelakangi matahari mengalami malam.'
        },
        {
            id: 'IPAS-063', bentuk: 'PG', kompetensi: 'P08', kesulitan: 'sedang',
            pertanyaan: 'Waktu yang diperlukan bumi untuk satu kali mengelilingi matahari (revolusi) adalah sekitar …',
            opsi: ['24 jam', '365 hari', '30 hari', '7 hari'],
            kunci: 1,
            pembahasan: 'Satu kali revolusi bumi memerlukan sekitar 365 hari atau satu tahun. Waktu 24 jam adalah lama satu kali rotasi bumi, sedangkan sekitar 30 hari adalah lama bulan mengelilingi bumi.'
        },
        {
            id: 'IPAS-064', bentuk: 'PG', kompetensi: 'P08', kesulitan: 'sulit',
            pertanyaan: 'Gambar berikut menunjukkan posisi Matahari, Bulan, dan Bumi yang berada pada satu garis lurus. Peristiwa yang terjadi pada posisi tersebut adalah …',
            gambar: gerhana(false), gambarPembahasan: gerhana(true),
            opsi: ['gerhana matahari', 'gerhana bulan', 'bulan purnama', 'pasang laut terendah'],
            kunci: 0,
            pembahasan: 'Bulan berada di antara Matahari dan Bumi, sehingga bayangan bulan jatuh ke permukaan bumi dan menutupi cahaya matahari. Peristiwa ini disebut gerhana matahari. Gerhana bulan terjadi jika bumi berada di tengah.'
        },
        {
            id: 'IPAS-065', bentuk: 'PG', kompetensi: 'P08', kesulitan: 'sedang',
            pertanyaan: 'Gambar berikut menunjukkan lapisan-lapisan bumi. Lapisan tempat manusia, hewan, dan tumbuhan hidup ditunjukkan oleh nomor …',
            gambar: lapisanBumi(false), gambarPembahasan: lapisanBumi(true),
            opsi: ['1', '2', '3', '4'],
            kunci: 0,
            pembahasan: 'Lapisan terluar bumi (nomor 1) adalah kerak bumi, tempat daratan, lautan, dan makhluk hidup berada. Di bawahnya terdapat selimut/mantel (2), inti luar (3), dan inti dalam (4) yang sangat panas.'
        },
        {
            id: 'IPAS-066', bentuk: 'MCMA', kompetensi: 'P08', kesulitan: 'sulit',
            pertanyaan: 'Ciri-ciri musim kemarau di Indonesia adalah …',
            opsi: ['curah hujan rendah', 'umumnya terjadi sekitar bulan April sampai Oktober', 'banyak sungai meluap', 'sumur dapat mengering', 'umumnya terjadi sekitar bulan Desember sampai Februari'],
            kunci: [0, 1, 3],
            pembahasan: 'Musim kemarau di Indonesia umumnya terjadi sekitar April–Oktober, ketika angin muson timur yang kering bertiup. Curah hujan rendah sehingga sumur dapat mengering. Sungai meluap dan bulan Desember–Februari adalah ciri musim hujan.'
        },
        {
            id: 'IPAS-067', bentuk: 'PG', kompetensi: 'P08', kesulitan: 'sedang',
            pertanyaan: 'Bulan tampak bercahaya pada malam hari karena …',
            opsi: ['bulan memancarkan cahayanya sendiri', 'bulan memiliki gunung berapi yang menyala', 'bulan memantulkan cahaya matahari', 'bulan memantulkan cahaya bintang-bintang'],
            kunci: 2,
            pembahasan: 'Bulan adalah benda langit yang tidak dapat memancarkan cahaya sendiri. Bulan tampak terang karena permukaannya memantulkan cahaya matahari ke arah bumi.'
        },
        {
            id: 'IPAS-068', bentuk: 'PG', kompetensi: 'P08', kesulitan: 'sedang',
            pertanyaan: 'Indonesia termasuk negara yang sering mengalami gempa bumi. Penyebab utamanya adalah …',
            opsi: ['Indonesia memiliki banyak sungai', 'Indonesia terletak di pertemuan beberapa lempeng bumi', 'Indonesia dilalui garis khatulistiwa', 'Indonesia memiliki dua musim'],
            kunci: 1,
            pembahasan: 'Indonesia terletak di pertemuan lempeng Indo-Australia, Eurasia, dan Pasifik. Pergerakan lempeng-lempeng itu sering menimbulkan gempa. Garis khatulistiwa dan dua musim berkaitan dengan iklim, bukan gempa.'
        },

        /* ================= P09 Peta, wilayah, dan keragaman Indonesia ================= */
        {
            id: 'IPAS-069', bentuk: 'PG', kompetensi: 'P09', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan denah lingkungan sekolah berikut. Pasar terletak di sebelah … dari sekolah.',
            gambar: peta(false), gambarPembahasan: peta(true),
            opsi: ['barat laut', 'barat daya', 'tenggara', 'timur laut'],
            kunci: 3,
            pembahasan: 'Tanda U menunjukkan arah utara, sehingga kanan denah adalah timur. Pasar berada di atas (utara) dan di kanan (timur) sekolah, yaitu arah timur laut. Barat laut adalah arah Masjid dari sekolah.'
        },
        {
            id: 'IPAS-070', bentuk: 'MCMA', kompetensi: 'P09', kesulitan: 'mudah',
            pertanyaan: 'Pasangan rumah adat dan daerah asalnya yang tepat adalah …',
            gambarPembahasan: tabelRumahAdat(),
            opsi: ['Rumah Gadang – Sumatra Barat', 'Honai – Papua', 'Joglo – Kalimantan Barat', 'Tongkonan – Sulawesi Selatan', 'Lamin – Nusa Tenggara Timur'],
            kunci: [0, 1, 3],
            pembahasan: 'Rumah Gadang berasal dari Sumatra Barat, Honai dari Papua, dan Tongkonan dari Sulawesi Selatan (Toraja). Joglo adalah rumah adat Jawa Tengah dan DI Yogyakarta, sedangkan Lamin adalah rumah adat Kalimantan Timur.'
        },
        {
            id: 'IPAS-071', bentuk: 'PG', kompetensi: 'P09', kesulitan: 'mudah',
            pertanyaan: 'Pada peta, wilayah perairan seperti laut dan danau biasanya digambarkan dengan warna …',
            opsi: ['hijau', 'biru', 'cokelat', 'kuning'],
            kunci: 1,
            pembahasan: 'Warna biru digunakan untuk perairan. Warna hijau untuk dataran rendah, kuning untuk dataran tinggi, dan cokelat untuk pegunungan.'
        },
        {
            id: 'IPAS-072', bentuk: 'PG', kompetensi: 'P09', kesulitan: 'sedang',
            pertanyaan: 'Garis khayal yang membagi bumi menjadi belahan bumi utara dan belahan bumi selatan, serta melintasi wilayah Indonesia, disebut …',
            opsi: ['garis khatulistiwa (ekuator)', 'garis bujur', 'garis pantai', 'garis kontur'],
            kunci: 0,
            pembahasan: 'Garis khatulistiwa adalah garis lintang 0° yang membagi bumi menjadi belahan utara dan selatan. Garis ini melintasi beberapa wilayah Indonesia, salah satunya Kota Pontianak.'
        },
        {
            id: 'IPAS-073', bentuk: 'MCMA', kompetensi: 'P09', kesulitan: 'sulit',
            pertanyaan: 'Pasangan tarian daerah dan asal daerahnya yang tepat adalah …',
            opsi: ['Tari Saman – Aceh', 'Tari Kecak – Bali', 'Tari Piring – Kalimantan Barat', 'Tari Jaipong – Jawa Timur', 'Tari Pendet – Papua'],
            kunci: [0, 1],
            pembahasan: 'Tari Saman berasal dari Aceh dan Tari Kecak dari Bali. Tari Piring berasal dari Sumatra Barat, bukan Kalimantan Barat. Tari Jaipong berasal dari Jawa Barat, dan Tari Pendet berasal dari Bali.'
        },
        {
            id: 'IPAS-074', bentuk: 'PG', kompetensi: 'P09', kesulitan: 'sulit',
            pertanyaan: 'Provinsi yang terkenal sebagai daerah penghasil timah terbesar di Indonesia adalah …',
            opsi: ['Papua', 'Kalimantan Timur', 'Jawa Barat', 'Kepulauan Bangka Belitung'],
            kunci: 3,
            pembahasan: 'Kepulauan Bangka Belitung dikenal sebagai penghasil timah terbesar di Indonesia. Papua terkenal dengan tambang emas dan tembaga, sedangkan Kalimantan Timur dengan batu bara.'
        },
        {
            id: 'IPAS-075', bentuk: 'BS', kompetensi: 'P09', kesulitan: 'sedang',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan tentang keragaman di Indonesia berikut.',
            opsi: [
                'Indonesia memiliki ratusan suku bangsa dengan bahasa dan adat yang berbeda.',
                'Semboyan Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu.',
                'Bahasa daerah sebaiknya tidak digunakan lagi agar semua orang sama.',
                'Sikap saling menghormati diperlukan agar keragaman tidak menimbulkan perpecahan.'
            ],
            kunci: [true, true, false, true],
            pembahasan: '(1) Benar. (2) Benar: semboyan itu tertulis pada lambang Garuda Pancasila. (3) Salah: bahasa daerah adalah kekayaan budaya yang perlu dilestarikan, sedangkan bahasa Indonesia menjadi bahasa persatuan. (4) Benar.'
        },
        {
            id: 'IPAS-076', bentuk: 'PG', kompetensi: 'P09', kesulitan: 'sulit',
            pertanyaan: 'Indonesia memiliki tiga zona waktu seperti gambar. Ketika di Jakarta pukul 08.00 WIB, di Jayapura pukul …',
            gambar: zonaWaktu(false), gambarPembahasan: zonaWaktu(true),
            opsi: ['06.00 WIT', '08.00 WIT', '10.00 WIT', '11.00 WIT'],
            kunci: 2,
            pembahasan: 'Waktu Indonesia bagian Timur (WIT) lebih cepat 2 jam daripada WIB. Jadi, pukul 08.00 WIB sama dengan pukul 10.00 WIT. Di Makassar (WITA) pada saat itu pukul 09.00.'
        }
    ]);
})(TKA.gambarMat);
