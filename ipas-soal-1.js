/*
 * Bank soal IPAS — bagian 1 (IPAS-001 s.d. IPAS-025):
 * P01 makhluk hidup dan ekosistem, P02 organ tubuh manusia, P03 tumbuhan.
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
    function kartu(x, y, w, h, isiTeks, warna, uk) {
        return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="9" fill="' + (warna || '#fff') + '" stroke="' + NAVY + '" stroke-width="2"/>' +
            teks(x + w / 2, y + h / 2 + 5, isiTeks, uk || 13, tebal());
    }

    /* ---------- P01 ---------- */
    function rantai(bahas) {
        var nama = ['Padi', 'Tikus', 'Ular', 'Elang'], peran = ['Produsen', 'Konsumen I', 'Konsumen II', 'Konsumen III'];
        var warna = ['#cdeedd', '#ffe9a8', '#fde0e0', '#cfe0ff'], isi = '';
        nama.forEach(function (n, i) {
            var x = 15 + i * 125;
            isi += kartu(x, 30, 95, 44, n, warna[i], 15);
            if (i < 3) { isi += panah(x + 98, 52, x + 122, 52); }
            if (bahas) { isi += teks(x + 47, 98, peran[i], 12, tebal(i === 1 ? HIJAU : null)); }
        });
        if (bahas) { isi += teks(250, 124, 'Arah panah = "dimakan oleh"', 12, 'fill="' + BIRU + '"'); }
        return svg(510, bahas ? 134 : 90, isi);
    }

    function jaring(bahas, sorot) {
        var pos = { Rumput: [60, 150], Belalang: [190, 80], Kelinci: [190, 220], Katak: [320, 80], Ular: [420, 160], Elang: [530, 160] };
        var warna = { Rumput: '#cdeedd', Belalang: '#ffe9a8', Kelinci: '#ffe9a8', Katak: '#fde0e0', Ular: '#fde0e0', Elang: '#cfe0ff' };
        var sisi = [['Rumput', 'Belalang'], ['Rumput', 'Kelinci'], ['Belalang', 'Katak'], ['Katak', 'Ular'], ['Kelinci', 'Ular'], ['Ular', 'Elang']];
        var isi = '';
        sisi.forEach(function (s) {
            var a = pos[s[0]], b = pos[s[1]], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.sqrt(dx * dx + dy * dy);
            isi += panah((a[0] + dx * 46 / d).toFixed(1), (a[1] + dy * 22 / d).toFixed(1), (b[0] - dx * 48 / d).toFixed(1), (b[1] - dy * 24 / d).toFixed(1));
        });
        Object.keys(pos).forEach(function (n) {
            var p = pos[n];
            isi += kartu(p[0] - 42, p[1] - 18, 84, 36, n, warna[n], 13);
        });
        if (bahas && sorot === 'katak') {
            isi += teks(320, 40, 'Katak berkurang', 12, tebal(MERAH)) + teks(190, 40, 'Belalang bertambah', 12, tebal(HIJAU)) +
                teks(300, 268, 'Pemangsa belalang berkurang, sehingga belalang lebih banyak bertahan hidup', 12, tebal());
        }
        if (bahas && sorot === 'peran') {
            isi += teks(60, 186, 'produsen', 11, tebal(HIJAU)) + teks(420, 196, 'konsumen II & III', 11, tebal(HIJAU)) + teks(530, 196, 'konsumen puncak', 11) +
                teks(300, 268, 'Rantai: rumput–belalang–katak–ular–elang dan rumput–kelinci–ular–elang', 12, tebal());
        }
        return svg(590, bahas ? 280 : 250, isi);
    }

    function piramida(bahas) {
        var tingkat = [['Elang', '#cfe0ff'], ['Ular', '#fde0e0'], ['Tikus', '#ffe9a8'], ['Padi', '#cdeedd']], isi = '';
        tingkat.forEach(function (t, i) {
            var y = 20 + i * 48, l = 110 + i * 70, x = 220 - l / 2;
            isi += jalur('M' + (x + 0) + ' ' + (y + 48) + ' L' + (x + l + 0) + ' ' + (y + 48) + ' L' + (x + l - 35 + 0) + ' ' + y + ' L' + (x + 35) + ' ' + y + ' Z', t[1]) +
                teks(220, y + 31, t[0], 13, tebal());
        });
        if (bahas) {
            isi += panah(420, 200, 420, 30, MERAH, 2.5) + teks(430, 115, 'energi dan', 11, 'text-anchor="start" ' + tebal(MERAH)) +
                teks(430, 130, 'jumlah makin', 11, 'text-anchor="start" ' + tebal(MERAH)) + teks(430, 145, 'sedikit', 11, 'text-anchor="start" ' + tebal(MERAH));
        }
        return svg(bahas ? 520 : 440, 225, isi);
    }

    /* ---------- P02 ---------- */
    function rantaiOrgan(nama, kosong, bahas, jawab) {
        var isi = '', w = 92, gap = 26;
        nama.forEach(function (n, i) {
            var x = 10 + i * (w + gap), k = i === kosong;
            isi += kartu(x, 20, w, 44, k ? (bahas ? jawab : 'X') : n, k ? (bahas ? '#cdeedd' : '#fff1c2') : '#edf1ff', 12);
            if (i < nama.length - 1) { isi += panah(x + w + 2, 42, x + w + gap - 2, 42); }
        });
        return svg(10 + nama.length * (w + gap), 80, isi);
    }

    function tabelNadi(bahas) {
        return G.tabel([150, 150], [['Keadaan', 'Denyut nadi per menit'], ['Duduk istirahat', '80'], ['Setelah lari 5 menit', '120']],
            bahas ? { sorot: function (i) { return i === 2; }, bawah: 44, tambahan: teks(150, 122, 'Otot butuh lebih banyak oksigen,', 11, tebal(HIJAU)) + teks(150, 137, 'jadi jantung memompa lebih cepat', 11, tebal(HIJAU)) } : null);
    }

    function mata(bahas) {
        var isi = lingkar(170, 110, 85, '#fff') +
            jalur('M95 70 Q70 110 95 150', 'none', 'stroke="#9ec5ff" stroke-width="10"') +  // kornea
            '<ellipse cx="112" cy="110" rx="12" ry="30" fill="#cfe0ff" stroke="' + NAVY + '" stroke-width="2"/>' +  // lensa
            jalur('M235 50 A85 85 0 0 1 235 170', 'none', 'stroke="#d64545" stroke-width="6"') +  // retina
            garis(100, 85, 100, 135, 'stroke="#6b4f2a" stroke-width="6"') +  // iris
            jalur('M255 110 L300 100 L300 120 Z', '#f4c7a1');  // saraf
        function n(x, y, k) { return lingkar(x, y, 11, '#315efb', 'stroke="#fff" stroke-width="2"') + teks(x, y + 5, k, 11, tebal('#fff')); }
        isi += n(60, 70, 1) + garis(70, 74, 86, 82, 'stroke="#315efb" stroke-width="1.5"') +
            n(112, 175, 2) + garis(112, 164, 112, 142, 'stroke="#315efb" stroke-width="1.5"') +
            n(275, 55, 3) + garis(266, 62, 248, 78, 'stroke="#315efb" stroke-width="1.5"') +
            n(318, 140, 4) + garis(308, 134, 292, 118, 'stroke="#315efb" stroke-width="1.5"');
        if (bahas) {
            isi += teks(40, 50, 'kornea', 11, tebal()) + teks(112, 205, 'lensa', 11, tebal()) + teks(275, 35, 'retina', 12, tebal(HIJAU)) + teks(330, 165, 'saraf mata', 11, tebal());
        }
        return svg(370, 215, isi);
    }

    /* ---------- P03 ---------- */
    function daun(x, y, hasil) {
        var bentuk = 'M' + x + ' ' + (y + 80) + ' C' + (x + 40) + ' ' + y + ' ' + (x + 160) + ' ' + y + ' ' + (x + 200) + ' ' + (y + 80) +
            ' C' + (x + 160) + ' ' + (y + 160) + ' ' + (x + 40) + ' ' + (y + 160) + ' ' + x + ' ' + (y + 80) + ' Z';
        var r = '<clipPath id="kdp' + x + '"><path d="' + bentuk + '"/></clipPath>' + jalur(bentuk, hasil ? '#2b3a8f' : '#5cb85c');
        if (hasil) { r += '<rect x="' + (x + 75) + '" y="' + y + '" width="50" height="160" fill="#efe7b4" clip-path="url(#kdp' + x + ')"/>'; }
        return r + jalur(bentuk, 'none') + garis(x - 15, y + 80, x + 200, y + 80, 'stroke="' + (hasil ? '#c9c9c9' : '#2e7d32') + '" stroke-width="2"');
    }
    function fotosintesis(bahas) {
        var isi = daun(20, 20, false) + kotak(95, 14, 50, 172, '#c4ccdc', 'stroke="' + NAVY + '" stroke-width="1.5" opacity=".9"') +
            teks(120, 205, 'ditutup kertas timah', 11, tebal()) + teks(110, 228, 'Daun sebelum diuji', 12, tebal());
        if (bahas) {
            isi += '<g transform="translate(250,0)">' + daun(20, 20, true) + '</g>' + teks(352, 228, 'Daun setelah ditetesi iodin', 12, tebal()) +
                teks(330, 14, 'terkena cahaya: biru kehitaman (ada amilum)', 11, tebal('#2b3a8f')) + teks(370, 196, 'tidak berubah (tanpa amilum)', 11, tebal(MERAH));
        }
        return svg(bahas ? 480 : 240, 240, isi);
    }

    function bunga(bahas) {
        var isi = garis(170, 150, 170, 240, 'stroke="#2e7d32" stroke-width="6"');
        // kelopak (hijau) di bawah
        isi += jalur('M170 160 Q120 175 100 140 Q140 150 170 160 Z', '#6cc070') + jalur('M170 160 Q220 175 240 140 Q200 150 170 160 Z', '#6cc070');
        // mahkota
        isi += jalur('M170 150 Q95 140 90 70 Q140 90 170 150 Z', '#f7a8c4') + jalur('M170 150 Q245 140 250 70 Q200 90 170 150 Z', '#f7a8c4');
        // benang sari
        [[140, 75], [200, 75]].forEach(function (p) { isi += garis(170, 145, p[0], p[1], 'stroke="#c9a227" stroke-width="2"') + '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="7" ry="5" fill="#f4b740" stroke="' + NAVY + '" stroke-width="1"/>'; });
        // putik
        isi += jalur('M163 150 Q160 120 168 90 L172 90 Q180 120 177 150 Z', '#7fd3a8') + lingkar(170, 86, 7, '#3fa36b');
        function n(x, y, k) { return lingkar(x, y, 11, '#315efb', 'stroke="#fff" stroke-width="2"') + teks(x, y + 5, k, 11, tebal('#fff')); }
        isi += n(50, 95, 1) + garis(61, 95, 100, 100, 'stroke="#315efb" stroke-width="1.5"') +
            n(140, 30, 2) + garis(140, 41, 140, 68, 'stroke="#315efb" stroke-width="1.5"') +
            n(220, 30, 3) + garis(213, 39, 176, 82, 'stroke="#315efb" stroke-width="1.5"') +
            n(285, 160, 4) + garis(274, 158, 235, 150, 'stroke="#315efb" stroke-width="1.5"');
        if (bahas) {
            isi += teks(50, 120, 'mahkota', 11, tebal()) + teks(140, 14, 'benang sari (♂)', 11, tebal()) + teks(240, 14, 'putik (♀)', 12, tebal(HIJAU)) + teks(285, 185, 'kelopak', 11, tebal());
        }
        return svg(320, 250, isi);
    }

    TKA.tambahSoal('ipas', [
        /* ================= P01 Makhluk hidup dan ekosistem ================= */
        {
            id: 'IPAS-001', bentuk: 'PG', kompetensi: 'P01', kesulitan: 'mudah',
            pertanyaan: 'Perhatikan rantai makanan pada gambar berikut. Peran tikus dalam rantai makanan tersebut adalah sebagai …',
            gambar: rantai(false), gambarPembahasan: rantai(true),
            opsi: ['produsen', 'konsumen tingkat I', 'konsumen tingkat II', 'pengurai'],
            kunci: 1,
            pembahasan: 'Padi membuat makanannya sendiri sehingga menjadi produsen. Tikus memakan padi secara langsung, jadi tikus adalah konsumen tingkat I. Ular (konsumen II) memakan tikus, lalu elang (konsumen III) memakan ular. Pengurai tidak terdapat dalam gambar.'
        },
        {
            id: 'IPAS-002', bentuk: 'PG', kompetensi: 'P01', kesulitan: 'mudah',
            pertanyaan: 'Lebah mengisap nektar dari bunga, sedangkan bunga terbantu penyerbukannya oleh lebah. Hubungan antara lebah dan bunga disebut simbiosis …',
            opsi: ['mutualisme', 'komensalisme', 'parasitisme', 'netralisme'],
            kunci: 0,
            pembahasan: 'Kedua makhluk hidup sama-sama untung: lebah mendapat makanan dan bunga terbantu penyerbukannya. Hubungan saling menguntungkan disebut simbiosis mutualisme.'
        },
        {
            id: 'IPAS-003', bentuk: 'PG', kompetensi: 'P01', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan jaring-jaring makanan berikut. Jika populasi katak berkurang drastis, hal yang paling mungkin terjadi adalah …',
            gambar: jaring(false), gambarPembahasan: jaring(true, 'katak'),
            opsi: ['populasi belalang berkurang', 'populasi kelinci berkurang', 'populasi rumput bertambah', 'populasi belalang bertambah'],
            kunci: 3,
            pembahasan: 'Katak memakan belalang. Jika katak berkurang, pemangsa belalang berkurang sehingga populasi belalang bertambah. Akibat selanjutnya, rumput justru bisa berkurang karena dimakan lebih banyak belalang.'
        },
        {
            id: 'IPAS-004', bentuk: 'MCMA', kompetensi: 'P01', kesulitan: 'sulit',
            pertanyaan: 'Berdasarkan jaring-jaring makanan pada gambar, pernyataan yang benar adalah …',
            gambar: jaring(false), gambarPembahasan: jaring(true, 'peran'),
            opsi: [
                'Rumput berperan sebagai produsen.',
                'Ular dapat berperan sebagai konsumen tingkat II dan konsumen tingkat III.',
                'Elang adalah konsumen tingkat I.',
                'Jaring-jaring makanan itu tersusun atas tiga rantai makanan.',
                'Jika rumput habis, semua hewan pada jaring-jaring itu ikut terdampak.'
            ],
            kunci: [0, 1, 4],
            pembahasan: 'Rumput membuat makanan sendiri (A benar). Ular memakan kelinci (konsumen I) sehingga menjadi konsumen II, dan memakan katak (konsumen II) sehingga menjadi konsumen III (B benar). Elang adalah konsumen puncak (C salah). Ada dua rantai: rumput–belalang–katak–ular–elang dan rumput–kelinci–ular–elang (D salah). Semua rantai berawal dari rumput, jadi semua hewan terdampak (E benar).'
        },
        {
            id: 'IPAS-005', bentuk: 'PG', kompetensi: 'P01', kesulitan: 'sedang',
            pertanyaan: 'Kaktus yang hidup di gurun memiliki daun berbentuk duri. Fungsi daun berbentuk duri bagi kaktus adalah …',
            opsi: ['menarik serangga untuk penyerbukan', 'menyerap air dari udara', 'mempercepat fotosintesis', 'mengurangi penguapan air'],
            kunci: 3,
            pembahasan: 'Gurun sangat panas dan kering. Daun yang kecil seperti duri membuat permukaan penguapan sangat sempit, sehingga air di dalam tubuh kaktus tidak cepat hilang. Ini adalah bentuk adaptasi.'
        },
        {
            id: 'IPAS-006', bentuk: 'BS', kompetensi: 'P01', kesulitan: 'sulit',
            pertanyaan: 'Tentukan Benar atau Salah setiap pasangan contoh dan jenis simbiosis berikut.',
            opsi: [
                'Ikan remora yang menempel pada ikan hiu merupakan simbiosis komensalisme.',
                'Benalu yang tumbuh pada pohon mangga merupakan simbiosis mutualisme.',
                'Burung jalak yang memakan kutu di punggung kerbau merupakan simbiosis mutualisme.',
                'Anggrek yang menempel pada batang pohon merupakan simbiosis parasitisme.'
            ],
            kunci: [true, false, true, false],
            pembahasan: '(1) Benar: remora mendapat sisa makanan, hiu tidak dirugikan. (2) Salah: benalu mengambil zat makanan pohon mangga sehingga merugikan (parasitisme). (3) Benar: jalak mendapat makanan, kerbau bebas dari kutu. (4) Salah: anggrek hanya menumpang dan membuat makanan sendiri, pohon tidak dirugikan (komensalisme).'
        },
        {
            id: 'IPAS-007', bentuk: 'PG', kompetensi: 'P01', kesulitan: 'sulit',
            pertanyaan: 'Gambar berikut adalah piramida makanan di sebuah sawah. Mengapa jumlah elang jauh lebih sedikit daripada jumlah tikus?',
            gambar: piramida(false), gambarPembahasan: piramida(true),
            opsi: [
                'Karena elang hidup lebih lama daripada tikus.',
                'Karena energi berkurang pada setiap tingkat sehingga konsumen puncak hanya cukup untuk sedikit individu.',
                'Karena elang hanya memakan padi.',
                'Karena tikus tidak pernah dimakan oleh hewan lain.'
            ],
            kunci: 1,
            pembahasan: 'Pada setiap perpindahan tingkat, sebagian besar energi terpakai untuk hidup makhluk itu sendiri. Energi yang sampai ke puncak paling sedikit, sehingga jumlah elang juga paling sedikit. Elang tidak memakan padi, dan tikus dimakan oleh ular.'
        },
        {
            id: 'IPAS-008', bentuk: 'PG', kompetensi: 'P01', kesulitan: 'sedang',
            pertanyaan: 'Penebangan hutan secara liar dapat merusak ekosistem. Akibat yang paling tepat dari penebangan hutan secara liar adalah …',
            opsi: ['udara menjadi lebih sejuk', 'hewan kehilangan tempat tinggal dan tanah mudah longsor', 'jumlah hewan hutan bertambah', 'air tanah semakin banyak'],
            kunci: 1,
            pembahasan: 'Hutan adalah tempat tinggal hewan, dan akar pohon menahan tanah serta menyimpan air. Tanpa pohon, hewan kehilangan habitat dan tanah mudah longsor atau banjir. Pilihan lain justru kebalikan dari akibat penebangan.'
        },

        /* ================= P02 Organ tubuh manusia ================= */
        {
            id: 'IPAS-009', bentuk: 'PG', kompetensi: 'P02', kesulitan: 'mudah',
            pertanyaan: 'Urutan jalannya udara saat kita menarik napas adalah …',
            gambarPembahasan: rantaiOrgan(['Hidung', 'Tenggorokan', 'Bronkus', 'Paru-paru'], -1, true),
            opsi: ['hidung – bronkus – tenggorokan – paru-paru', 'hidung – tenggorokan – bronkus – paru-paru', 'tenggorokan – hidung – bronkus – paru-paru', 'hidung – paru-paru – tenggorokan – bronkus'],
            kunci: 1,
            pembahasan: 'Udara masuk melalui hidung, lalu ke tenggorokan (trakea), bercabang ke bronkus, dan sampai di paru-paru (alveolus). Di alveolus terjadi pertukaran oksigen dan karbon dioksida.'
        },
        {
            id: 'IPAS-010', bentuk: 'PG', kompetensi: 'P02', kesulitan: 'mudah',
            pertanyaan: 'Perhatikan urutan organ pencernaan berikut. Organ yang ditandai X adalah …',
            gambar: rantaiOrgan(['Mulut', 'Kerongkongan', 'X', 'Usus halus', 'Usus besar'], 2, false),
            gambarPembahasan: rantaiOrgan(['Mulut', 'Kerongkongan', 'X', 'Usus halus', 'Usus besar'], 2, true, 'Lambung'),
            opsi: ['hati', 'pankreas', 'lambung', 'kantong empedu'],
            kunci: 2,
            pembahasan: 'Setelah melewati kerongkongan, makanan masuk ke lambung untuk dicerna lebih lanjut, baru kemudian ke usus halus. Hati, pankreas, dan kantong empedu membantu pencernaan, tetapi tidak dilewati makanan.'
        },
        {
            id: 'IPAS-011', bentuk: 'PG', kompetensi: 'P02', kesulitan: 'sedang',
            pertanyaan: 'Fungsi utama usus halus dalam sistem pencernaan adalah …',
            opsi: ['menyerap sari-sari makanan', 'menghancurkan makanan dengan gigi', 'menyerap air dan membentuk feses', 'menghasilkan air liur'],
            kunci: 0,
            pembahasan: 'Di usus halus, makanan dicerna sempurna dan sari-sari makanan diserap ke dalam darah. Penyerapan air dan pembentukan feses terjadi di usus besar, sedangkan gigi dan air liur ada di mulut.'
        },
        {
            id: 'IPAS-012', bentuk: 'MCMA', kompetensi: 'P02', kesulitan: 'sulit',
            pertanyaan: 'Pernyataan yang benar tentang sistem peredaran darah manusia adalah …',
            opsi: [
                'Jantung memompa darah ke seluruh tubuh.',
                'Pembuluh vena membawa darah menuju jantung.',
                'Sel darah putih bertugas mengangkut oksigen.',
                'Keping darah berperan dalam pembekuan darah saat terluka.',
                'Peredaran darah kecil adalah aliran darah dari jantung ke seluruh tubuh.'
            ],
            kunci: [0, 1, 3],
            pembahasan: 'A, B, dan D benar. C salah karena oksigen diangkut sel darah merah; sel darah putih melawan kuman. E salah karena peredaran darah kecil adalah dari jantung ke paru-paru dan kembali ke jantung; dari jantung ke seluruh tubuh adalah peredaran darah besar.'
        },
        {
            id: 'IPAS-013', bentuk: 'BS', kompetensi: 'P02', kesulitan: 'sedang',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan tentang cara menjaga kesehatan organ tubuh berikut.',
            opsi: [
                'Asap rokok dapat merusak paru-paru.',
                'Makan sayur dan buah yang berserat membantu mencegah sembelit.',
                'Membaca di tempat yang gelap baik untuk kesehatan mata.',
                'Mendengarkan musik sangat keras melalui earphone berjam-jam aman bagi telinga.'
            ],
            kunci: [true, true, false, false],
            pembahasan: '(1) Benar: zat dalam asap rokok merusak paru-paru. (2) Benar: serat melancarkan pencernaan. (3) Salah: membaca di tempat gelap membuat mata cepat lelah. (4) Salah: suara keras dalam waktu lama dapat merusak pendengaran.'
        },
        {
            id: 'IPAS-014', bentuk: 'PG', kompetensi: 'P02', kesulitan: 'sulit',
            pertanyaan: 'Tabel berikut menunjukkan denyut nadi Raka sebelum dan sesudah berlari. Denyut nadi Raka meningkat setelah berlari karena …',
            gambar: tabelNadi(false), gambarPembahasan: tabelNadi(true),
            opsi: [
                'paru-paru berhenti bekerja sementara',
                'darah di dalam tubuh bertambah banyak',
                'otot memerlukan lebih banyak oksigen sehingga jantung memompa darah lebih cepat',
                'jantung menjadi lebih kecil saat berlari'
            ],
            kunci: 2,
            pembahasan: 'Saat berlari, otot bekerja keras dan memerlukan lebih banyak oksigen serta energi. Jantung lalu berdenyut lebih cepat agar darah yang membawa oksigen lebih cepat sampai ke otot. Jumlah darah dan ukuran jantung tidak berubah.'
        },
        {
            id: 'IPAS-015', bentuk: 'PG', kompetensi: 'P02', kesulitan: 'sulit',
            pertanyaan: 'Penyakit pada organ pernapasan yang disebabkan oleh bakteri dan dapat menular melalui percikan dahak penderita adalah …',
            opsi: ['asma', 'TBC (tuberkulosis)', 'mimisan', 'sariawan'],
            kunci: 1,
            pembahasan: 'TBC disebabkan oleh bakteri Mycobacterium tuberculosis dan menular melalui percikan dahak saat penderita batuk atau bersin. Asma adalah penyempitan saluran napas yang tidak menular, sedangkan mimisan dan sariawan bukan penyakit menular pada paru-paru.'
        },
        {
            id: 'IPAS-016', bentuk: 'MCMA', kompetensi: 'P02', kesulitan: 'sedang',
            pertanyaan: 'Pasangan alat indra dan fungsinya yang tepat adalah …',
            opsi: ['Kulit – peraba', 'Lidah – pengecap', 'Hidung – pendengar', 'Mata – penglihat', 'Telinga – pendengar dan penjaga keseimbangan'],
            kunci: [0, 1, 3, 4],
            pembahasan: 'Kulit untuk meraba, lidah untuk mengecap rasa, mata untuk melihat, dan telinga untuk mendengar sekaligus menjaga keseimbangan tubuh. Hidung adalah indra pembau, bukan pendengar.'
        },
        {
            id: 'IPAS-017', bentuk: 'PG', kompetensi: 'P02', kesulitan: 'sulit',
            pertanyaan: 'Perhatikan gambar penampang mata berikut. Bagian mata tempat terbentuknya bayangan benda ditunjukkan oleh nomor …',
            gambar: mata(false), gambarPembahasan: mata(true),
            opsi: ['1', '2', '3', '4'],
            kunci: 2,
            pembahasan: 'Cahaya masuk melalui kornea (1), dibiaskan oleh lensa (2), lalu jatuh di retina (3) tempat bayangan terbentuk. Saraf mata (4) meneruskan rangsang ke otak.'
        },

        /* ================= P03 Tumbuhan dan fotosintesis ================= */
        {
            id: 'IPAS-018', bentuk: 'PG', kompetensi: 'P03', kesulitan: 'sulit',
            pertanyaan: 'Sebagian daun pada tanaman ditutup kertas timah seperti gambar, lalu tanaman dijemur seharian. Daun kemudian dipetik dan ditetesi larutan iodin. Hasil dan kesimpulan yang tepat dari percobaan tersebut adalah …',
            gambar: fotosintesis(false), gambarPembahasan: fotosintesis(true),
            opsi: [
                'Bagian yang tidak ditutup berwarna biru kehitaman, karena fotosintesis memerlukan cahaya dan menghasilkan amilum.',
                'Bagian yang ditutup berwarna biru kehitaman, karena fotosintesis lebih banyak terjadi di tempat gelap.',
                'Seluruh daun berwarna biru kehitaman, karena fotosintesis tidak dipengaruhi cahaya.',
                'Seluruh daun tidak berubah warna, karena kertas timah menghentikan fotosintesis pada seluruh daun.'
            ],
            kunci: 0,
            pembahasan: 'Iodin berubah menjadi biru kehitaman jika ada amilum (zat tepung), yaitu hasil fotosintesis. Bagian yang terkena cahaya dapat berfotosintesis sehingga mengandung amilum dan berwarna biru kehitaman. Bagian yang ditutup tidak mendapat cahaya sehingga tidak berubah warna. Jadi, fotosintesis memerlukan cahaya.'
        },
        {
            id: 'IPAS-019', bentuk: 'PG', kompetensi: 'P03', kesulitan: 'mudah',
            pertanyaan: 'Bagian tumbuhan yang berfungsi menyerap air dan zat hara dari dalam tanah adalah …',
            opsi: ['daun', 'batang', 'bunga', 'akar'],
            kunci: 3,
            pembahasan: 'Akar berada di dalam tanah dan menyerap air serta zat hara. Air lalu diangkut melalui batang ke daun untuk fotosintesis.'
        },
        {
            id: 'IPAS-020', bentuk: 'PG', kompetensi: 'P03', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan gambar bagian-bagian bunga berikut. Alat perkembangbiakan betina pada bunga ditunjukkan oleh nomor …',
            gambar: bunga(false), gambarPembahasan: bunga(true),
            opsi: ['1', '2', '3', '4'],
            kunci: 2,
            pembahasan: 'Nomor 3 adalah putik, alat perkembangbiakan betina yang menerima serbuk sari. Nomor 2 adalah benang sari (alat kelamin jantan), nomor 1 mahkota, dan nomor 4 kelopak.'
        },
        {
            id: 'IPAS-021', bentuk: 'MCMA', kompetensi: 'P03', kesulitan: 'sedang',
            pertanyaan: 'Hal-hal yang diperlukan tumbuhan hijau untuk melakukan fotosintesis adalah …',
            opsi: ['air', 'karbon dioksida', 'oksigen', 'cahaya matahari', 'amilum'],
            kunci: [0, 1, 3],
            pembahasan: 'Fotosintesis memerlukan air, karbon dioksida, dan cahaya matahari (dibantu klorofil). Hasilnya adalah amilum (zat gula/tepung) dan oksigen. Jadi, oksigen dan amilum adalah hasil, bukan bahan.'
        },
        {
            id: 'IPAS-022', bentuk: 'BS', kompetensi: 'P03', kesulitan: 'sulit',
            pertanyaan: 'Tentukan Benar atau Salah setiap pasangan tumbuhan dan cara perkembangbiakan vegetatif alaminya berikut.',
            opsi: ['Kentang – umbi batang', 'Cocor bebek – tunas daun', 'Jahe – geragih', 'Stroberi – geragih'],
            kunci: [true, true, false, true],
            pembahasan: '(1) Benar: kentang tumbuh dari umbi batang. (2) Benar: tunas muncul di tepi daun cocor bebek. (3) Salah: jahe berkembang biak dengan rimpang (akar tinggal). (4) Benar: stroberi menjalarkan geragih (stolon) di atas tanah.'
        },
        {
            id: 'IPAS-023', bentuk: 'PG', kompetensi: 'P03', kesulitan: 'sulit',
            pertanyaan: 'Dua pot kecambah yang sama disiram dengan jumlah air yang sama. Pot A diletakkan di tempat terang dan pot B di dalam kardus gelap. Seminggu kemudian, kecambah B lebih tinggi tetapi kurus dan pucat. Kesimpulan yang tepat adalah …',
            opsi: [
                'cahaya diperlukan agar tumbuhan tumbuh sehat dan hijau',
                'tumbuhan sebaiknya diletakkan di tempat gelap agar cepat tinggi',
                'air tidak diperlukan untuk pertumbuhan',
                'kardus membuat tanah menjadi lebih subur'
            ],
            kunci: 0,
            pembahasan: 'Tanpa cahaya, kecambah tumbuh memanjang dengan cepat, tetapi tidak dapat membentuk zat hijau daun sehingga pucat dan lemah (etiolasi). Jadi, cahaya diperlukan agar tumbuhan tumbuh sehat. Tinggi yang cepat bukan berarti sehat.'
        },
        {
            id: 'IPAS-024', bentuk: 'PG', kompetensi: 'P03', kesulitan: 'sedang',
            pertanyaan: 'Bunga padi dan jagung diserbuki dengan bantuan angin. Ciri bunga yang penyerbukannya dibantu angin adalah …',
            opsi: ['mahkota besar, berwarna cerah, dan harum', 'menghasilkan banyak nektar', 'serbuk sarinya lengket dan berat', 'bunga kecil tidak mencolok dan serbuk sarinya ringan serta banyak'],
            kunci: 3,
            pembahasan: 'Bunga yang diserbuki angin tidak perlu menarik serangga, sehingga biasanya kecil dan tidak mencolok. Serbuk sarinya ringan dan banyak agar mudah terbawa angin. Mahkota cerah, harum, nektar, dan serbuk sari lengket adalah ciri bunga yang diserbuki serangga.'
        },
        {
            id: 'IPAS-025', bentuk: 'PG', kompetensi: 'P03', kesulitan: 'mudah',
            pertanyaan: 'Gas yang dilepaskan tumbuhan ke udara sebagai hasil fotosintesis adalah …',
            opsi: ['karbon dioksida', 'nitrogen', 'uap belerang', 'oksigen'],
            kunci: 3,
            pembahasan: 'Fotosintesis menghasilkan amilum yang disimpan tumbuhan dan oksigen yang dilepaskan ke udara. Karbon dioksida justru diambil tumbuhan sebagai bahan fotosintesis.'
        }
    ]);
})(TKA.gambarMat);
