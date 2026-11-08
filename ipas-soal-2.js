/*
 * Bank soal IPAS — bagian 2 (IPAS-026 s.d. IPAS-051):
 * P04 zat dan perubahannya, P05 gaya dan pesawat sederhana, P06 energi, kalor, listrik.
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

    /* ---------- P04 ---------- */
    function wujud(bahas) {
        var P = [230, 40], C = [80, 220], Gs = [380, 220], isi = '';
        function simpul(p, nama, w) { return '<rect x="' + (p[0] - 45) + '" y="' + (p[1] - 20) + '" width="90" height="40" rx="10" fill="' + w + '" stroke="' + NAVY + '" stroke-width="2"/>' + teks(p[0], p[1] + 6, nama, 15, tebal()); }
        function lengkung(a, b, bengkok, label, lx, ly) {
            var mx = (a[0] + b[0]) / 2 + bengkok[0], my = (a[1] + b[1]) / 2 + bengkok[1];
            var a2 = Math.atan2(b[1] - my, b[0] - mx), u = 10;
            var r = jalur('M' + a[0] + ' ' + a[1] + ' Q' + mx + ' ' + my + ' ' + b[0] + ' ' + b[1], 'none', 'stroke="' + BIRU + '" stroke-width="2"') +
                jalur('M' + (b[0] - u * Math.cos(a2 - 0.45)).toFixed(1) + ' ' + (b[1] - u * Math.sin(a2 - 0.45)).toFixed(1) + ' L' + b[0] + ' ' + b[1] + ' L' +
                    (b[0] - u * Math.cos(a2 + 0.45)).toFixed(1) + ' ' + (b[1] - u * Math.sin(a2 + 0.45)).toFixed(1) + ' Z', BIRU, 'stroke="none"');
            if (bahas) { r += teks(lx, ly, label, 11, (lx === 200 ? 'text-anchor="end" ' : lx === 262 ? 'text-anchor="start" ' : '') + tebal(MERAH)); }
            return r;
        }
        isi += lengkung([195, 58], [100, 196], [-30, -10], 'mencair', 108, 112) + lengkung([115, 196], [205, 62], [30, 10], 'membeku', 200, 128) +
            lengkung([265, 58], [360, 196], [30, -10], 'menyublim', 352, 112) + lengkung([345, 196], [255, 62], [-30, 10], 'mengkristal', 262, 128) +
            lengkung([128, 212], [332, 212], [0, -36], 'menguap', 230, 188) + lengkung([332, 230], [128, 230], [0, 36], 'mengembun', 230, 262);
        return svg(460, 270, isi + simpul(P, 'Padat', '#cfe0ff') + simpul(C, 'Cair', '#cdeedd') + simpul(Gs, 'Gas', '#ffe9a8'));
    }

    function partikel(bahas) {
        var isi = '', acak = [[0.2, 0.3], [0.7, 0.15], [0.45, 0.6], [0.85, 0.7], [0.15, 0.8], [0.6, 0.85]];
        // A padat: rapat teratur
        isi += kotak(20, 20, 120, 120, '#fff');
        for (var r = 0; r < 5; r++) { for (var c = 0; c < 5; c++) { isi += lingkar(35 + c * 22.5, 35 + r * 22.5, 10, '#7fa3ff', 'stroke="' + NAVY + '" stroke-width="1"'); } }
        // B cair: agak renggang, tidak teratur, di bagian bawah
        isi += kotak(170, 20, 120, 120, '#fff');
        [[188, 70], [212, 78], [238, 68], [264, 80], [195, 98], [222, 104], [250, 100], [274, 108], [186, 125], [212, 128], [240, 126], [268, 128], [200, 50], [256, 52]].forEach(function (p) {
            isi += lingkar(p[0], p[1], 10, '#7fa3ff', 'stroke="' + NAVY + '" stroke-width="1"');
        });
        // C gas: sangat renggang
        isi += kotak(320, 20, 120, 120, '#fff');
        acak.forEach(function (p) { isi += lingkar(330 + p[0] * 100, 30 + p[1] * 100, 10, '#7fa3ff', 'stroke="' + NAVY + '" stroke-width="1"'); });
        ['A', 'B', 'C'].forEach(function (h, i) { isi += teks(80 + i * 150, 162, h, 15, tebal()); });
        if (bahas) {
            [['padat', 'rapat, teratur'], ['cair', 'agak renggang'], ['gas', 'sangat renggang']].forEach(function (t, i) {
                isi += teks(80 + i * 150, 182, t[0], 12, tebal(i === 2 ? HIJAU : null)) + teks(80 + i * 150, 198, t[1], 11);
            });
        }
        return svg(460, bahas ? 208 : 172, isi);
    }

    /* ---------- P05 ---------- */
    function tuas(bahas) {
        var isi = garis(40, 120, 400, 120, 'stroke="#8b5a2b" stroke-width="8" stroke-linecap="round"') +
            jalur('M150 124 L130 160 L170 160 Z', '#c4ccdc') +
            kotak(48, 70, 44, 44, '#ffe9a8') + teks(70, 98, '60 N', 12, tebal()) +
            panah(380, 60, 380, 112, MERAH, 3) + teks(380, 50, 'F = ?', 13, tebal(MERAH)) +
            garis(70, 170, 150, 170, 'stroke="' + NAVY + '" stroke-width="1.5"') + garis(70, 164, 70, 176) + garis(150, 164, 150, 176) + teks(110, 190, '1 m', 13, tebal()) +
            garis(150, 170, 380, 170, 'stroke="' + NAVY + '" stroke-width="1.5"') + garis(380, 164, 380, 176) + teks(265, 190, '2 m', 13, tebal());
        if (bahas) {
            isi += teks(70, 60, 'beban', 11, tebal()) + teks(150, 214, 'titik tumpu', 11, tebal()) +
                teks(230, 30, 'beban × lengan beban = kuasa × lengan kuasa', 12) + teks(230, 236, '60 × 1 = F × 2 → F = 30 N', 13, tebal(HIJAU));
        }
        return svg(440, bahas ? 248 : 200, isi);
    }

    function duaMagnet(bahas) {
        function magnet(x, kiri, kanan) {
            return kotak(x, 50, 70, 40, kiri === 'U' ? '#e8564f' : '#5b8def', 'stroke="' + NAVY + '" stroke-width="1.5"') +
                kotak(x + 70, 50, 70, 40, kanan === 'U' ? '#e8564f' : '#5b8def', 'stroke="' + NAVY + '" stroke-width="1.5"') +
                teks(x + 35, 76, kiri, 15, tebal('#fff')) + teks(x + 105, 76, kanan, 15, tebal('#fff'));
        }
        var isi = magnet(20, 'U', 'S') + magnet(200, 'S', 'U') + teks(90, 30, 'Magnet A', 12, tebal()) + teks(270, 30, 'Magnet B', 12, tebal());
        if (bahas) {
            isi += panah(150, 115, 110, 115, MERAH, 2.5) + panah(230, 115, 270, 115, MERAH, 2.5) +
                teks(190, 145, 'S bertemu S (kutub senama) → tolak-menolak', 12, tebal(MERAH));
        }
        return svg(380, bahas ? 155 : 105, isi);
    }

    function tabelBola(bahas) {
        return G.tabel([150, 160], [['Permukaan', 'Jarak tempuh bola'], ['Kaca', '3 m'], ['Karpet', '1,5 m'], ['Pasir', '0,5 m']],
            bahas ? { bawah: 30, tambahan: teks(165, 152, 'makin kasar → gaya gesek makin besar → jarak makin pendek', 11, tebal(HIJAU)) } : null);
    }

    /* ---------- P06 ---------- */
    function lampu(cx, cy, label, mati, nyala, atas) {
        var r = lingkar(cx, cy, 15, nyala ? '#fff3b0' : (mati ? '#e6e6e6' : '#fff')) +
            garis(cx - 10, cy - 10, cx + 10, cy + 10, 'stroke="' + NAVY + '" stroke-width="1.6"') + garis(cx + 10, cy - 10, cx - 10, cy + 10, 'stroke="' + NAVY + '" stroke-width="1.6"') +
            (atas ? teks(cx, cy - 22, label, 13, tebal()) : teks(cx + 24, cy + 5, label, 13, 'text-anchor="start" ' + tebal()));
        if (mati) { r += teks(cx - 24, cy + 5, 'putus', 11, 'text-anchor="end" ' + tebal(MERAH)) + garis(cx - 18, cy + 18, cx + 18, cy - 18, 'stroke="' + MERAH + '" stroke-width="3"'); }
        return r;
    }
    function baterai(x, y) {
        return garis(x - 18, y, x + 18, y, 'stroke="' + NAVY + '" stroke-width="3"') + garis(x - 10, y + 12, x + 10, y + 12, 'stroke="' + NAVY + '" stroke-width="6"') +
            garis(x - 18, y + 22, x + 18, y + 22, 'stroke="' + NAVY + '" stroke-width="3"') + garis(x - 10, y + 30, x + 10, y + 30, 'stroke="' + NAVY + '" stroke-width="6"') +
            teks(x - 28, y + 19, 'Baterai', 11, 'text-anchor="end"');
    }
    function listrikParalel(bahas) {
        var k = bahas ? 'stroke="' + HIJAU + '" stroke-width="3.5"' : 'stroke="' + NAVY + '" stroke-width="2"', kab = 'stroke="' + NAVY + '" stroke-width="2"';
        var isi = garis(50, 40, 160, 40, k) + garis(200, 40, 340, 40, k) + garis(50, 40, 50, 105, k) + garis(50, 135, 50, 200, k) + garis(50, 200, 340, 200, k) +
            garis(260, 40, 260, 105, bahas ? kab : k) + garis(260, 135, 260, 200, bahas ? kab : k) + garis(340, 40, 340, 105, k) + garis(340, 135, 340, 200, k) +
            baterai(50, 105) + lampu(180, 40, 'L1', false, bahas, true) + lampu(260, 120, 'L2', bahas, false) + lampu(340, 120, 'L3', false, bahas);
        if (bahas) { isi += teks(200, 230, 'Arus (hijau) tetap mengalir melalui L1 dan L3', 12, tebal(HIJAU)); }
        return svg(420, bahas ? 250 : 225, '<g transform="translate(40,10)">' + isi + '</g>');
    }
    function listrikSeri(bahas) {
        var k = 'stroke="' + NAVY + '" stroke-width="2"';
        var isi = garis(50, 40, 145, 40, k) + garis(175, 40, 265, 40, k) + garis(295, 40, 340, 40, k) + garis(340, 40, 340, 200, k) +
            garis(50, 40, 50, 105, k) + garis(50, 135, 50, 200, k) + garis(50, 200, 340, 200, k) + baterai(50, 105);
        if (bahas) { isi += lampu(160, 40, 'L1 dilepas', false, false, true).replace(/<circle[^>]*\/>/, '<circle cx="160" cy="40" r="15" fill="#fff" stroke="#d64545" stroke-width="2" stroke-dasharray="4 3"/>') + lampu(280, 40, 'L2', false, false, true) + teks(200, 235, 'Rangkaian terputus → arus tidak mengalir → L2 padam', 12, tebal(MERAH)); }
        else { isi += lampu(160, 40, 'L1', false, false, true) + lampu(280, 40, 'L2', false, false, true); }
        return svg(420, bahas ? 250 : 225, '<g transform="translate(40,10)">' + isi + '</g>');
    }

    function pemanasan(bahas) {
        return G.grafikGaris([['0', 25], ['2', 45], ['4', 65], ['6', 85], ['8', 100], ['10', 100], ['12', 100]], {
            min: 20, maks: 110, langkah: 10, judulY: 'Suhu (°C)', tampilNilai: bahas,
            tambahan: teks(204, 244, 'Waktu (menit)', 11) + (bahas ? '<rect x="254" y="22" width="100" height="25" fill="#cdeedd" opacity=".6"/>' + teks(304, 16, 'mendidih: suhu tetap', 11, tebal(HIJAU)) : '')
        }).replace(/viewBox="0 0 (\d+) 235"/, 'viewBox="0 0 $1 250"');
    }

    function tabelKonduktor(bahas) {
        return G.tabel([170, 140], [['Benda yang diuji', 'Lampu'], ['Paku besi', 'Menyala'], ['Penghapus karet', 'Tidak menyala'], ['Sendok aluminium', 'Menyala'], ['Penggaris plastik', 'Tidak menyala']],
            bahas ? { sorot: function (i) { return i === 1 || i === 3; }, bawah: 30, tambahan: teks(165, 182, 'Logam (besi, aluminium) = konduktor listrik', 12, tebal(HIJAU)) } : null);
    }

    TKA.tambahSoal('ipas', [
        /* ================= P04 Zat dan perubahannya ================= */
        {
            id: 'IPAS-026', bentuk: 'BS', kompetensi: 'P04', kesulitan: 'sedang',
            pertanyaan: 'Gambar berikut menunjukkan perubahan wujud zat. Tentukan Benar atau Salah setiap pernyataan berikut.',
            gambar: wujud(false), gambarPembahasan: wujud(true),
            opsi: [
                'Kapur barus di lemari yang lama-kelamaan habis mengalami peristiwa menyublim.',
                'Embun pada daun di pagi hari terbentuk karena peristiwa menguap.',
                'Lilin yang dipanaskan hingga meleleh mengalami peristiwa mencair.',
                'Air yang dimasukkan ke dalam freezer hingga menjadi es mengalami peristiwa mengkristal.'
            ],
            kunci: [true, false, true, false],
            pembahasan: '(1) Benar: kapur barus berubah langsung dari padat menjadi gas (menyublim). (2) Salah: embun terbentuk karena uap air berubah menjadi cair (mengembun). (3) Benar: lilin berubah dari padat menjadi cair (mencair). (4) Salah: air menjadi es adalah membeku (cair → padat); mengkristal adalah perubahan gas → padat.'
        },
        {
            id: 'IPAS-027', bentuk: 'PG', kompetensi: 'P04', kesulitan: 'mudah',
            pertanyaan: 'Air dituangkan dari botol ke dalam gelas. Bentuk air berubah mengikuti gelas, tetapi banyaknya air tetap. Hal ini menunjukkan sifat zat cair, yaitu …',
            opsi: ['bentuk dan volumenya tetap', 'bentuk dan volumenya berubah', 'bentuknya tetap, volumenya berubah', 'bentuknya berubah sesuai wadah, volumenya tetap'],
            kunci: 3,
            pembahasan: 'Zat cair selalu mengikuti bentuk wadahnya, tetapi volumenya (banyaknya) tidak berubah. Zat padat bentuk dan volumenya tetap, sedangkan gas bentuk dan volumenya berubah sesuai wadah.'
        },
        {
            id: 'IPAS-028', bentuk: 'PG', kompetensi: 'P04', kesulitan: 'sedang',
            pertanyaan: 'Peristiwa berikut yang termasuk perubahan kimia adalah …',
            opsi: ['kayu dibakar menjadi arang', 'es batu mencair', 'gula larut dalam teh', 'kertas digunting kecil-kecil'],
            kunci: 0,
            pembahasan: 'Kayu yang dibakar berubah menjadi arang dan abu, yaitu zat baru yang tidak dapat kembali menjadi kayu. Ini perubahan kimia. Es mencair, gula larut, dan kertas digunting adalah perubahan fisika karena tidak terbentuk zat baru.'
        },
        {
            id: 'IPAS-029', bentuk: 'MCMA', kompetensi: 'P04', kesulitan: 'sedang',
            pertanyaan: 'Pasangan campuran dan cara pemisahannya yang tepat adalah …',
            opsi: [
                'Garam dari air laut dipisahkan dengan penguapan.',
                'Pasir dari air dipisahkan dengan penyaringan.',
                'Serbuk besi dari pasir dipisahkan dengan penguapan.',
                'Minyak dari air dipisahkan dengan penguapan.',
                'Gula dari air teh manis dipisahkan dengan penyaringan.'
            ],
            kunci: [0, 1],
            pembahasan: 'Air laut diuapkan sehingga garam tertinggal (A). Pasir tertahan di kertas saring (B). Serbuk besi dipisahkan dengan magnet, bukan penguapan (C salah). Minyak dan air dipisahkan dengan corong pisah atau dituang perlahan karena minyak mengapung, bukan diuapkan (D salah). Gula larut dalam air sehingga tidak tertahan oleh saringan (E salah).'
        },
        {
            id: 'IPAS-030', bentuk: 'PG', kompetensi: 'P04', kesulitan: 'sulit',
            pertanyaan: 'Gambar berikut menunjukkan susunan partikel tiga wujud zat. Susunan partikel zat gas ditunjukkan oleh gambar …',
            gambar: partikel(false), gambarPembahasan: partikel(true),
            opsi: ['A', 'B', 'C', 'A dan B'],
            kunci: 2,
            pembahasan: 'Partikel gas sangat renggang dan bergerak bebas mengisi seluruh ruang (C). Partikel padat rapat dan teratur (A), sedangkan partikel cair agak renggang dan dapat bergeser (B).'
        },
        {
            id: 'IPAS-031', bentuk: 'PG', kompetensi: 'P04', kesulitan: 'sulit',
            pertanyaan: 'Kabel listrik yang dipasang di antara tiang-tiang listrik dibuat agak kendur. Alasan yang tepat adalah …',
            opsi: [
                'agar kabel terlihat lebih rapi',
                'agar kabel tidak putus ketika menyusut pada saat udara dingin',
                'agar arus listrik mengalir lebih cepat',
                'agar burung dapat hinggap dengan nyaman'
            ],
            kunci: 1,
            pembahasan: 'Logam memuai saat panas dan menyusut saat dingin. Jika kabel dipasang tegang, kabel dapat putus ketika menyusut pada malam atau udara dingin. Karena itu, kabel dipasang agak kendur.'
        },
        {
            id: 'IPAS-032', bentuk: 'MCMA', kompetensi: 'P04', kesulitan: 'sulit',
            pertanyaan: 'Peristiwa berikut yang termasuk perubahan fisika adalah …',
            opsi: ['air dimasukkan ke freezer menjadi es', 'susu menjadi basi', 'lilin dipanaskan hingga meleleh', 'besi dibiarkan di udara lembap hingga berkarat', 'garam dilarutkan dalam air'],
            kunci: [0, 2, 4],
            pembahasan: 'Perubahan fisika tidak menghasilkan zat baru: air menjadi es, lilin meleleh, dan garam larut (masih bisa dikembalikan). Susu basi dan besi berkarat menghasilkan zat baru, sehingga termasuk perubahan kimia.'
        },
        {
            id: 'IPAS-033', bentuk: 'PG', kompetensi: 'P04', kesulitan: 'sulit',
            pertanyaan: 'Benda berikut yang termasuk campuran adalah …',
            opsi: ['emas murni', 'air suling', 'udara', 'oksigen'],
            kunci: 2,
            pembahasan: 'Udara terdiri atas berbagai gas, seperti nitrogen, oksigen, dan karbon dioksida, sehingga termasuk campuran. Emas murni, air suling, dan oksigen masing-masing hanya terdiri atas satu jenis zat.'
        },

        /* ================= P05 Gaya, gerak, dan pesawat sederhana ================= */
        {
            id: 'IPAS-034', bentuk: 'PG', kompetensi: 'P05', kesulitan: 'mudah',
            pertanyaan: 'Alas sepatu olahraga dibuat bergerigi. Tujuannya adalah …',
            opsi: ['memperkecil gaya gesek agar mudah tergelincir', 'memperbesar gaya gesek agar tidak mudah tergelincir', 'membuat sepatu lebih ringan', 'mengurangi gaya gravitasi'],
            kunci: 1,
            pembahasan: 'Permukaan yang bergerigi memperbesar gaya gesek antara sepatu dan lantai, sehingga kaki tidak mudah tergelincir saat berlari.'
        },
        {
            id: 'IPAS-035', bentuk: 'PG', kompetensi: 'P05', kesulitan: 'sulit',
            pertanyaan: 'Sebuah batu seberat 60 N diungkit dengan tuas seperti gambar. Gaya (kuasa) yang diperlukan untuk mengangkat batu tersebut adalah …',
            gambar: tuas(false), gambarPembahasan: tuas(true),
            opsi: ['15 N', '20 N', '30 N', '60 N'],
            kunci: 2,
            pembahasan: 'Pada tuas berlaku beban × lengan beban = kuasa × lengan kuasa. 60 × 1 = kuasa × 2, sehingga kuasa = 30 N. Lengan kuasa yang lebih panjang membuat gaya yang diperlukan lebih kecil.'
        },
        {
            id: 'IPAS-036', bentuk: 'MCMA', kompetensi: 'P05', kesulitan: 'sedang',
            pertanyaan: 'Pernyataan yang benar tentang sifat magnet adalah …',
            opsi: [
                'Kutub magnet yang senama akan tolak-menolak.',
                'Kutub magnet yang tidak senama akan tarik-menarik.',
                'Magnet dapat menarik semua jenis logam, termasuk aluminium dan tembaga.',
                'Gaya magnet paling kuat terdapat pada kedua kutubnya.',
                'Magnet dapat menarik paku besi meskipun terhalang kertas tipis.'
            ],
            kunci: [0, 1, 3, 4],
            pembahasan: 'A, B, D, dan E benar. C salah karena magnet hanya menarik benda dari bahan tertentu, seperti besi, baja, dan nikel. Aluminium dan tembaga tidak ditarik magnet.'
        },
        {
            id: 'IPAS-037', bentuk: 'BS', kompetensi: 'P05', kesulitan: 'sulit',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan tentang pesawat sederhana berikut.',
            opsi: [
                'Katrol tetap pada tiang bendera memudahkan pekerjaan dengan mengubah arah gaya.',
                'Makin landai bidang miring, makin besar gaya yang diperlukan untuk mendorong benda ke atas.',
                'Gunting termasuk pesawat sederhana jenis tuas.',
                'Sekrup bekerja berdasarkan prinsip bidang miring.'
            ],
            kunci: [true, false, true, true],
            pembahasan: '(1) Benar: menarik tali ke bawah membuat bendera naik. (2) Salah: makin landai bidang miring, gaya yang diperlukan makin kecil, tetapi jaraknya makin panjang. (3) Benar: gunting memiliki titik tumpu di tengah. (4) Benar: ulir sekrup adalah bidang miring yang melingkar.'
        },
        {
            id: 'IPAS-038', bentuk: 'PG', kompetensi: 'P05', kesulitan: 'mudah',
            pertanyaan: 'Buah mangga yang matang jatuh dari pohon ke tanah. Gaya yang menyebabkan peristiwa tersebut adalah …',
            opsi: ['gaya gravitasi', 'gaya magnet', 'gaya gesek', 'gaya pegas'],
            kunci: 0,
            pembahasan: 'Gaya gravitasi adalah gaya tarik bumi yang menarik semua benda ke arah pusat bumi. Karena itu, benda yang lepas dari pohon jatuh ke tanah.'
        },
        {
            id: 'IPAS-039', bentuk: 'PG', kompetensi: 'P05', kesulitan: 'sedang',
            pertanyaan: 'Dua magnet batang diletakkan berdekatan seperti gambar. Yang akan terjadi pada kedua magnet adalah …',
            gambar: duaMagnet(false), gambarPembahasan: duaMagnet(true),
            opsi: ['tarik-menarik karena kutubnya berbeda', 'tidak terjadi apa-apa', 'tarik-menarik karena kutubnya sama', 'tolak-menolak karena kutub yang berdekatan sama'],
            kunci: 3,
            pembahasan: 'Ujung kanan magnet A adalah kutub S dan ujung kiri magnet B juga kutub S. Kutub yang senama saling berdekatan sehingga kedua magnet tolak-menolak.'
        },
        {
            id: 'IPAS-040', bentuk: 'PG', kompetensi: 'P05', kesulitan: 'sedang',
            pertanyaan: 'Doni menekan plastisin dengan telapak tangannya sehingga plastisin menjadi pipih. Peristiwa ini menunjukkan bahwa gaya dapat …',
            opsi: ['menggerakkan benda diam', 'mengubah arah gerak benda', 'menghentikan benda bergerak', 'mengubah bentuk benda'],
            kunci: 3,
            pembahasan: 'Plastisin yang awalnya bulat menjadi pipih setelah ditekan. Artinya, gaya (tekanan tangan) mengubah bentuk benda.'
        },
        {
            id: 'IPAS-041', bentuk: 'PG', kompetensi: 'P05', kesulitan: 'sulit',
            pertanyaan: 'Sebuah bola digelindingkan dengan dorongan yang sama di atas tiga permukaan. Hasil pengamatannya ditunjukkan pada tabel. Kesimpulan yang tepat adalah …',
            gambar: tabelBola(false), gambarPembahasan: tabelBola(true),
            opsi: [
                'makin kasar permukaan, makin besar gaya gesek sehingga jarak tempuh bola makin pendek',
                'makin halus permukaan, makin besar gaya gesek',
                'jenis permukaan tidak memengaruhi gerak bola',
                'bola paling cepat berhenti di permukaan kaca'
            ],
            kunci: 0,
            pembahasan: 'Kaca paling halus dan bola menempuh jarak terjauh (3 m), sedangkan pasir paling kasar dan bola hanya menempuh 0,5 m. Permukaan yang kasar menimbulkan gaya gesek lebih besar yang menghambat gerak bola.'
        },
        {
            id: 'IPAS-042', bentuk: 'MCMA', kompetensi: 'P05', kesulitan: 'sulit',
            pertanyaan: 'Contoh gaya gesek yang menguntungkan dalam kehidupan sehari-hari adalah …',
            opsi: ['rem sepeda dapat menghentikan laju sepeda', 'ban mobil bergerigi agar tidak licin di jalan', 'mesin kendaraan menjadi aus', 'kita dapat berjalan di lantai tanpa terpeleset', 'sol sepatu menjadi cepat tipis'],
            kunci: [0, 1, 3],
            pembahasan: 'Gesekan pada rem, ban bergerigi, dan telapak kaki dengan lantai membantu kita sehingga menguntungkan. Mesin aus dan sol sepatu yang menipis adalah kerugian akibat gaya gesek.'
        },

        /* ================= P06 Energi, kalor, dan listrik ================= */
        {
            id: 'IPAS-043', bentuk: 'PG', kompetensi: 'P06', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan rangkaian listrik berikut. Jika lampu L2 putus, lampu yang tetap menyala adalah …',
            gambar: listrikParalel(false), gambarPembahasan: listrikParalel(true),
            opsi: ['hanya L1', 'hanya L3', 'L1 dan L3', 'semua lampu padam'],
            kunci: 2,
            pembahasan: 'L1 terpasang pada kabel utama, sedangkan L2 dan L3 terpasang bercabang (paralel). Jika L2 putus, arus masih dapat mengalir dari baterai melalui L1 lalu ke cabang L3. Jadi, L1 dan L3 tetap menyala. Semua lampu baru padam jika yang putus adalah L1 di kabel utama.'
        },
        {
            id: 'IPAS-044', bentuk: 'MCMA', kompetensi: 'P06', kesulitan: 'sulit',
            pertanyaan: 'Sejumlah air dipanaskan, lalu suhunya diukur setiap 2 menit. Hasilnya ditunjukkan pada grafik berikut. Pernyataan yang sesuai dengan grafik adalah …',
            gambar: pemanasan(false), gambarPembahasan: pemanasan(true),
            opsi: [
                'Suhu awal air adalah 25°C.',
                'Air mendidih pada suhu 100°C.',
                'Setelah mendidih, suhu air terus naik selama dipanaskan.',
                'Antara menit ke-8 dan ke-12, kalor dipakai untuk mengubah air menjadi uap.',
                'Kenaikan suhu setiap 2 menit selalu sama besar.'
            ],
            kunci: [0, 1, 3],
            pembahasan: 'Grafik dimulai pada 25°C (A benar) dan mendatar di 100°C, yaitu saat air mendidih (B benar). Setelah mendidih suhu tetap 100°C, tidak naik (C salah), karena kalor dipakai untuk mengubah wujud air menjadi uap (D benar). Kenaikan suhu 20°C, 20°C, 20°C, lalu 15°C, jadi tidak selalu sama (E salah).'
        },
        {
            id: 'IPAS-045', bentuk: 'PG', kompetensi: 'P06', kesulitan: 'mudah',
            pertanyaan: 'Sumber energi berikut yang termasuk sumber energi terbarukan (tidak akan habis) adalah …',
            opsi: ['minyak bumi', 'cahaya matahari', 'batu bara', 'gas alam'],
            kunci: 1,
            pembahasan: 'Cahaya matahari selalu tersedia dan tidak akan habis, sehingga termasuk energi terbarukan. Minyak bumi, batu bara, dan gas alam terbentuk selama jutaan tahun dan dapat habis jika terus dipakai.'
        },
        {
            id: 'IPAS-046', bentuk: 'PG', kompetensi: 'P06', kesulitan: 'mudah',
            pertanyaan: 'Saat setrika listrik digunakan, terjadi perubahan energi dari …',
            opsi: ['energi panas menjadi energi listrik', 'energi listrik menjadi energi cahaya', 'energi gerak menjadi energi listrik', 'energi listrik menjadi energi panas'],
            kunci: 3,
            pembahasan: 'Setrika memakai listrik untuk menghasilkan panas yang merapikan pakaian. Jadi, energi listrik berubah menjadi energi panas.'
        },
        {
            id: 'IPAS-047', bentuk: 'PG', kompetensi: 'P06', kesulitan: 'sedang',
            pertanyaan: 'Dua lampu dirangkai seperti gambar. Jika lampu L1 dilepas dari rangkaian, yang terjadi pada lampu L2 adalah …',
            gambar: listrikSeri(false), gambarPembahasan: listrikSeri(true),
            opsi: ['L2 ikut padam', 'L2 tetap menyala seperti semula', 'L2 menyala lebih terang', 'L2 berkedip-kedip'],
            kunci: 0,
            pembahasan: 'Kedua lampu dirangkai seri (berderet dalam satu jalur). Jika L1 dilepas, jalur arus terputus sehingga arus tidak mengalir dan L2 ikut padam.'
        },
        {
            id: 'IPAS-048', bentuk: 'BS', kompetensi: 'P06', kesulitan: 'sulit',
            pertanyaan: 'Tentukan Benar atau Salah setiap pasangan peristiwa dan cara perpindahan kalor berikut.',
            opsi: [
                'Ujung sendok logam menjadi panas saat dipakai mengaduk teh panas – konduksi.',
                'Air yang dipanaskan bergerak naik-turun di dalam panci – konveksi.',
                'Panas matahari sampai ke bumi – konduksi.',
                'Badan terasa hangat saat duduk di dekat api unggun – radiasi.'
            ],
            kunci: [true, true, false, true],
            pembahasan: '(1) Benar: kalor merambat melalui logam tanpa logamnya berpindah. (2) Benar: kalor berpindah bersama aliran air. (3) Salah: panas matahari sampai ke bumi melalui ruang hampa dengan cara radiasi. (4) Benar: kalor dari api sampai ke tubuh tanpa perantara (radiasi).'
        },
        {
            id: 'IPAS-049', bentuk: 'PG', kompetensi: 'P06', kesulitan: 'sulit',
            pertanyaan: 'Beberapa benda diuji dengan cara dipasang pada rangkaian lampu dan baterai. Hasilnya ditunjukkan pada tabel. Kesimpulan yang tepat adalah …',
            gambar: tabelKonduktor(false), gambarPembahasan: tabelKonduktor(true),
            opsi: [
                'benda dari plastik dan karet dapat menghantarkan listrik',
                'semua benda dapat menghantarkan listrik',
                'benda dari logam dapat menghantarkan listrik (konduktor)',
                'lampu menyala jika benda yang diuji berukuran besar'
            ],
            kunci: 2,
            pembahasan: 'Lampu menyala ketika diuji dengan paku besi dan sendok aluminium yang terbuat dari logam. Lampu tidak menyala dengan karet dan plastik (isolator). Jadi, logam adalah konduktor listrik.'
        },
        {
            id: 'IPAS-050', bentuk: 'MCMA', kompetensi: 'P06', kesulitan: 'sedang',
            pertanyaan: 'Tindakan yang menunjukkan sikap hemat energi listrik adalah …',
            opsi: ['mematikan lampu ketika keluar kamar', 'membiarkan televisi menyala saat tidak ditonton', 'menggunakan lampu LED', 'mencabut pengisi daya ponsel setelah baterai penuh', 'membuka pintu kulkas terlalu lama'],
            kunci: [0, 2, 3],
            pembahasan: 'Mematikan lampu, memakai lampu LED yang hemat daya, dan mencabut pengisi daya mengurangi pemakaian listrik. Membiarkan televisi menyala dan membuka kulkas terlalu lama justru memboroskan listrik.'
        },
        {
            id: 'IPAS-051', bentuk: 'PG', kompetensi: 'P06', kesulitan: 'sedang',
            pertanyaan: 'Pada Pembangkit Listrik Tenaga Air (PLTA), energi yang diubah menjadi energi listrik adalah …',
            opsi: ['energi panas bumi', 'energi gerak air', 'energi kimia bahan bakar', 'energi cahaya matahari'],
            kunci: 1,
            pembahasan: 'Air dari bendungan dialirkan ke bawah sehingga bergerak deras dan memutar turbin. Turbin memutar generator yang menghasilkan listrik. Jadi, energi gerak air diubah menjadi energi listrik.'
        }
    ]);
})(TKA.gambarMat);
