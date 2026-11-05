/*
 * Bank soal IPAS — bagian 4 (IPAS-077 s.d. IPAS-100):
 * P10 sejarah Indonesia, P11 kegiatan ekonomi, P12 Indonesia, ASEAN, dan dunia.
 */
(function (G) {
    'use strict';
    var svg = G.svg, teks = G.teks, tebal = G.tebal, garis = G.garis, kotak = G.kotak, lingkar = G.lingkar, jalur = G.jalur;
    var NAVY = G.NAVY, HIJAU = G.HIJAU, MERAH = G.MERAH;

    function panah(x1, y1, x2, y2, warna, w) {
        var a = Math.atan2(y2 - y1, x2 - x1), u = 9;
        return garis(x1, y1, x2, y2, 'stroke="' + (warna || NAVY) + '" stroke-width="' + (w || 2) + '"') +
            jalur('M' + (x2 - u * Math.cos(a - 0.45)).toFixed(1) + ' ' + (y2 - u * Math.sin(a - 0.45)).toFixed(1) + ' L' + x2 + ' ' + y2 + ' L' +
                (x2 - u * Math.cos(a + 0.45)).toFixed(1) + ' ' + (y2 - u * Math.sin(a + 0.45)).toFixed(1) + ' Z', warna || NAVY, 'stroke="none"');
    }

    function sejarah(bahas) {
        var kartu = [['P', 'Proklamasi Kemerdekaan'], ['Q', 'Berdirinya Budi Utomo'], ['R', 'Ikrar Sumpah Pemuda'], ['S', 'Sidang pertama BPUPKI']], isi = '';
        if (!bahas) {
            kartu.forEach(function (k, i) {
                var x = 10 + (i % 2) * 230, y = 10 + Math.floor(i / 2) * 56;
                isi += '<rect x="' + x + '" y="' + y + '" width="220" height="46" rx="8" fill="#fff7dc" stroke="' + NAVY + '" stroke-width="1.5"/>' +
                    lingkar(x + 22, y + 23, 13, '#315efb', 'stroke="none"') + teks(x + 22, y + 28, k[0], 13, tebal('#fff')) + teks(x + 42, y + 28, k[1], 12, 'text-anchor="start"');
            });
            return svg(470, 125, isi);
        }
        var urut = [['Q', 'Budi Utomo', '20 Mei 1908'], ['R', 'Sumpah Pemuda', '28 Okt 1928'], ['S', 'Sidang BPUPKI', '29 Mei 1945'], ['P', 'Proklamasi', '17 Agt 1945']];
        isi += panah(20, 70, 480, 70, NAVY, 2.5);
        urut.forEach(function (u, i) {
            var x = 60 + i * 120;
            isi += lingkar(x, 70, 9, '#315efb') + teks(x, 75, u[0], 10, tebal('#fff')) + teks(x, 46, u[1], 12, tebal()) + teks(x, 100, u[2], 11, tebal(HIJAU));
        });
        return svg(500, 140, isi + teks(250, 130, 'Urutan: Q – R – S – P', 13, tebal(HIJAU)));
    }

    function distribusi(bahas) {
        var nama = ['Pabrik sepatu', 'X', 'Toko sepatu', 'Pembeli'], isi = '';
        nama.forEach(function (n, i) {
            var x = 10 + i * 130, kosong = n === 'X';
            isi += '<rect x="' + x + '" y="20" width="105" height="46" rx="9" fill="' + (kosong ? (bahas ? '#cdeedd' : '#fff1c2') : '#edf1ff') + '" stroke="' + NAVY + '" stroke-width="2"/>' +
                teks(x + 52, 48, kosong && bahas ? 'Distributor' : n, 12, tebal());
            if (i < 3) { isi += panah(x + 108, 43, x + 127, 43); }
        });
        if (bahas) {
            isi += teks(52 + 10, 88, 'produsen', 11, tebal()) + teks(182, 88, 'pedagang besar', 11, tebal(HIJAU)) + teks(312, 88, 'pengecer', 11, tebal()) + teks(442, 88, 'konsumen', 11, tebal());
        }
        return svg(530, bahas ? 98 : 80, isi);
    }

    function letakIndonesia(bahas) {
        var isi = kotak(0, 0, 520, 300, '#cfe9ff', 'stroke="none"');
        isi += jalur('M0 0 L330 0 L330 40 Q280 70 220 60 Q150 80 120 70 Q60 90 0 80 Z', '#e4d6a7', 'stroke="#a88f4e" stroke-width="1.5"');           // Asia
        isi += jalur('M250 230 Q300 205 380 215 Q440 230 450 270 L430 300 L260 300 Q235 270 250 230 Z', '#e4d6a7', 'stroke="#a88f4e" stroke-width="1.5"'); // Australia
        // kepulauan Indonesia
        [[150, 140, 50, 14, -20], [215, 165, 55, 9, 0], [230, 128, 32, 26, 0], [290, 135, 22, 26, 15], [380, 150, 45, 22, 0], [262, 178, 22, 5, 0], [300, 182, 26, 5, 0]].forEach(function (e) {
            isi += '<ellipse cx="' + e[0] + '" cy="' + e[1] + '" rx="' + e[2] + '" ry="' + e[3] + '" transform="rotate(' + e[4] + ' ' + e[0] + ' ' + e[1] + ')" fill="#7fc97f" stroke="#3a7d3a" stroke-width="1.5"/>';
        });
        function huruf(x, y, h) { return lingkar(x, y, 13, '#d64545', 'stroke="#fff" stroke-width="2"') + teks(x, y + 5, h, 13, tebal('#fff')); }
        if (!bahas) {
            isi += huruf(180, 30, 'A') + huruf(350, 262, 'B') + huruf(70, 240, 'C') + huruf(470, 90, 'D') + teks(400, 120, 'Indonesia', 12, tebal());
        } else {
            isi += teks(180, 34, 'Benua Asia', 14, tebal()) + teks(350, 265, 'Benua Australia', 14, tebal()) +
                teks(90, 240, 'Samudra Hindia', 14, tebal('#1a5fa8')) + teks(445, 90, 'Samudra Pasifik', 14, tebal('#1a5fa8')) + teks(400, 120, 'Indonesia', 12, tebal(HIJAU));
        }
        return svg(520, 300, isi);
    }

    TKA.tambahSoal('ipas', [
        /* ================= P10 Sejarah Indonesia ================= */
        {
            id: 'IPAS-077', bentuk: 'PG', kompetensi: 'P10', kesulitan: 'sulit',
            pertanyaan: 'Perhatikan peristiwa-peristiwa sejarah berikut. Urutan peristiwa dari yang paling awal terjadi adalah …',
            gambar: sejarah(false), gambarPembahasan: sejarah(true),
            opsi: ['R – Q – S – P', 'Q – R – S – P', 'Q – R – P – S', 'Q – S – R – P'],
            kunci: 1,
            pembahasan: 'Budi Utomo berdiri pada 20 Mei 1908 (Q), Sumpah Pemuda diikrarkan pada 28 Oktober 1928 (R), sidang pertama BPUPKI dimulai 29 Mei 1945 (S), dan Proklamasi Kemerdekaan pada 17 Agustus 1945 (P). BPUPKI bersidang untuk mempersiapkan kemerdekaan, jadi terjadi sebelum proklamasi.'
        },
        {
            id: 'IPAS-078', bentuk: 'PG', kompetensi: 'P10', kesulitan: 'mudah',
            pertanyaan: 'Tokoh yang membacakan dan menandatangani teks Proklamasi Kemerdekaan Indonesia atas nama bangsa Indonesia adalah …',
            opsi: ['Sutan Sjahrir dan Ki Hajar Dewantara', 'Ahmad Soebardjo dan Sayuti Melik', 'Soekarno dan Mohammad Hatta', 'Bung Tomo dan Jenderal Sudirman'],
            kunci: 2,
            pembahasan: 'Teks proklamasi ditandatangani oleh Soekarno dan Mohammad Hatta atas nama bangsa Indonesia, lalu dibacakan oleh Soekarno pada 17 Agustus 1945. Keduanya disebut tokoh proklamator.'
        },
        {
            id: 'IPAS-079', bentuk: 'PG', kompetensi: 'P10', kesulitan: 'sedang',
            pertanyaan: 'Kerajaan bercorak Hindu tertua di Indonesia yang terletak di Kalimantan Timur adalah Kerajaan …',
            opsi: ['Majapahit', 'Sriwijaya', 'Tarumanegara', 'Kutai'],
            kunci: 3,
            pembahasan: 'Kerajaan Kutai di Kalimantan Timur dianggap kerajaan Hindu tertua di Indonesia, dibuktikan dengan prasasti Yupa. Majapahit dan Tarumanegara berada di Jawa, sedangkan Sriwijaya bercorak Buddha di Sumatra.'
        },
        {
            id: 'IPAS-080', bentuk: 'PG', kompetensi: 'P10', kesulitan: 'sedang',
            pertanyaan: 'Candi Borobudur merupakan peninggalan kerajaan yang bercorak …',
            opsi: ['Hindu, dibangun oleh Kerajaan Majapahit', 'Buddha, dibangun pada masa Dinasti Syailendra', 'Islam, dibangun oleh Kerajaan Demak', 'Hindu, dibangun oleh Kerajaan Kutai'],
            kunci: 1,
            pembahasan: 'Candi Borobudur di Magelang, Jawa Tengah, adalah candi Buddha yang dibangun pada masa Dinasti Syailendra (Mataram Kuno). Candi Prambanan adalah contoh candi bercorak Hindu.'
        },
        {
            id: 'IPAS-081', bentuk: 'MCMA', kompetensi: 'P10', kesulitan: 'sulit',
            pertanyaan: 'Pernyataan yang tepat tentang masa penjajahan Belanda di Indonesia adalah …',
            opsi: [
                'Rakyat dipaksa menanam tanaman tertentu yang laku dijual di Eropa (tanam paksa).',
                'Rakyat Indonesia menjadi makmur karena hasil buminya dijual sendiri.',
                'Sebagian kecil rakyat mulai mendapat pendidikan bergaya Barat.',
                'Jalan Raya Pos dari Anyer sampai Panarukan dibangun dengan kerja paksa.',
                'Bangsa Indonesia bebas memperdagangkan rempah-rempah ke negara mana pun.'
            ],
            kunci: [0, 2, 3],
            pembahasan: 'Tanam paksa (A), pendidikan Barat untuk sebagian kecil rakyat (C), dan pembangunan jalan Anyer–Panarukan dengan kerja rodi pada masa Daendels (D) terjadi pada masa penjajahan. Rakyat justru menderita (B salah), dan perdagangan rempah dimonopoli VOC (E salah).'
        },
        {
            id: 'IPAS-082', bentuk: 'PG', kompetensi: 'P10', kesulitan: 'sedang',
            pertanyaan: 'Isi Sumpah Pemuda adalah mengaku bertumpah darah satu, berbangsa satu, dan menjunjung bahasa persatuan, yaitu Indonesia. Nilai yang paling menonjol dari Sumpah Pemuda adalah …',
            opsi: ['persatuan dan kesatuan bangsa', 'semangat bersaing antardaerah', 'kebanggaan terhadap suku masing-masing', 'kerja sama dengan negara lain'],
            kunci: 0,
            pembahasan: 'Para pemuda dari berbagai daerah dan suku berikrar menjadi satu tanah air, satu bangsa, dan menjunjung satu bahasa persatuan. Nilai utamanya adalah persatuan dan kesatuan.'
        },
        {
            id: 'IPAS-083', bentuk: 'BS', kompetensi: 'P10', kesulitan: 'sulit',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan tentang peristiwa Proklamasi Kemerdekaan Indonesia berikut.',
            opsi: [
                'Proklamasi dibacakan di Jalan Pegangsaan Timur 56, Jakarta.',
                'Naskah proklamasi diketik oleh Sayuti Melik.',
                'Bendera Merah Putih yang dikibarkan dijahit oleh Fatmawati.',
                'Proklamasi dibacakan pada tanggal 17 Agustus 1946.'
            ],
            kunci: [true, true, true, false],
            pembahasan: '(1) Benar: di kediaman Soekarno, Jalan Pegangsaan Timur 56. (2) Benar. (3) Benar: bendera pusaka dijahit oleh Ibu Fatmawati. (4) Salah: proklamasi dibacakan pada 17 Agustus 1945.'
        },
        {
            id: 'IPAS-084', bentuk: 'PG', kompetensi: 'P10', kesulitan: 'sulit',
            pertanyaan: 'Kerajaan Islam pertama di Indonesia yang terletak di pesisir utara Aceh adalah …',
            opsi: ['Demak', 'Mataram Islam', 'Samudra Pasai', 'Ternate'],
            kunci: 2,
            pembahasan: 'Samudra Pasai di pesisir utara Aceh dikenal sebagai kerajaan Islam pertama di Indonesia (abad ke-13). Demak adalah kerajaan Islam pertama di Pulau Jawa, sedangkan Mataram Islam dan Ternate berdiri kemudian.'
        },

        /* ================= P11 Kegiatan ekonomi ================= */
        {
            id: 'IPAS-085', bentuk: 'PG', kompetensi: 'P11', kesulitan: 'mudah',
            pertanyaan: 'Kebutuhan yang harus dipenuhi agar manusia dapat hidup layak disebut kebutuhan primer. Contoh kebutuhan primer adalah …',
            opsi: ['televisi, kulkas, dan sepeda motor', 'makanan, pakaian, dan tempat tinggal', 'perhiasan, mobil mewah, dan liburan', 'telepon genggam dan komputer'],
            kunci: 1,
            pembahasan: 'Kebutuhan primer adalah kebutuhan pokok: makanan, pakaian, dan tempat tinggal. Televisi dan kulkas termasuk kebutuhan sekunder, sedangkan perhiasan dan mobil mewah termasuk kebutuhan tersier.'
        },
        {
            id: 'IPAS-086', bentuk: 'PG', kompetensi: 'P11', kesulitan: 'sedang',
            pertanyaan: 'Ciri khas pasar tradisional yang membedakannya dari pasar modern seperti swalayan adalah …',
            opsi: ['pembeli dan penjual dapat melakukan tawar-menawar harga', 'harga barang sudah pasti tertera pada label', 'pembeli mengambil sendiri barang di rak', 'ruangan selalu ber-AC'],
            kunci: 0,
            pembahasan: 'Di pasar tradisional, penjual dan pembeli bertemu langsung dan dapat tawar-menawar. Di pasar modern, harga sudah tertera pasti dan pembeli melayani dirinya sendiri.'
        },
        {
            id: 'IPAS-087', bentuk: 'PG', kompetensi: 'P11', kesulitan: 'sedang',
            pertanyaan: 'Perhatikan alur penyaluran sepatu dari pabrik sampai ke pembeli berikut. Pihak X yang membeli sepatu dalam jumlah besar dari pabrik lalu menyalurkannya ke toko-toko disebut …',
            gambar: distribusi(false), gambarPembahasan: distribusi(true),
            opsi: ['produsen', 'konsumen', 'pengecer', 'distributor'],
            kunci: 3,
            pembahasan: 'Pabrik adalah produsen dan pembeli adalah konsumen. Pihak yang menyalurkan barang dari produsen ke toko (pengecer) disebut distributor atau pedagang besar.'
        },
        {
            id: 'IPAS-088', bentuk: 'MCMA', kompetensi: 'P11', kesulitan: 'sulit',
            pertanyaan: 'Pernyataan yang benar tentang koperasi sekolah adalah …',
            opsi: [
                'Anggotanya terdiri atas siswa, guru, dan karyawan sekolah.',
                'Tujuan utamanya mencari keuntungan sebesar-besarnya.',
                'Koperasi berasaskan kekeluargaan.',
                'Sisa hasil usaha (SHU) dibagikan kepada anggota.',
                'Hanya guru yang boleh menjadi anggota.'
            ],
            kunci: [0, 2, 3],
            pembahasan: 'Koperasi sekolah beranggotakan warga sekolah (A), berasaskan kekeluargaan (C), dan membagikan SHU kepada anggota (D). Tujuan koperasi adalah menyejahterakan anggota, bukan mencari untung sebesar-besarnya (B salah), dan siswa juga boleh menjadi anggota (E salah).'
        },
        {
            id: 'IPAS-089', bentuk: 'PG', kompetensi: 'P11', kesulitan: 'sulit',
            pertanyaan: 'Indonesia membeli gandum dari Australia karena gandum sulit tumbuh di iklim Indonesia. Kegiatan tersebut disebut … dan alasannya adalah …',
            opsi: [
                'ekspor; Indonesia ingin menjual hasil bumi ke luar negeri',
                'impor; Indonesia ingin mengurangi jumlah gandum di dalam negeri',
                'ekspor; Australia kekurangan gandum',
                'impor; kebutuhan gandum tidak dapat dipenuhi oleh produksi dalam negeri'
            ],
            kunci: 3,
            pembahasan: 'Membeli barang dari luar negeri disebut impor. Alasannya, gandum sulit dihasilkan di Indonesia sehingga kebutuhan dalam negeri tidak tercukupi. Ekspor adalah menjual barang ke luar negeri.'
        },
        {
            id: 'IPAS-090', bentuk: 'BS', kompetensi: 'P11', kesulitan: 'sedang',
            pertanyaan: 'Tentukan Benar atau Salah setiap pasangan kegiatan dan jenis kegiatan ekonomi berikut.',
            opsi: [
                'Petani menanam padi di sawah – produksi.',
                'Sopir truk mengangkut sayuran dari desa ke pasar kota – distribusi.',
                'Siswa membeli buku cerita lalu membacanya – produksi.',
                'Penjahit membuat baju seragam pesanan – distribusi.'
            ],
            kunci: [true, true, false, false],
            pembahasan: '(1) Benar: menghasilkan barang. (2) Benar: menyalurkan barang ke konsumen. (3) Salah: memakai barang adalah konsumsi. (4) Salah: membuat baju adalah produksi.'
        },
        {
            id: 'IPAS-091', bentuk: 'PG', kompetensi: 'P11', kesulitan: 'sulit',
            pertanyaan: 'Dina memiliki uang Rp20.000. Ia ingin membeli buku latihan soal untuk ujian seharga Rp18.000 dan mainan seharga Rp15.000. Sikap yang paling tepat bagi Dina adalah …',
            opsi: [
                'membeli buku latihan soal lebih dulu karena lebih penting',
                'membeli mainan karena harganya lebih murah',
                'meminjam uang teman agar dapat membeli keduanya',
                'tidak membeli apa pun dan menyimpan seluruh uangnya selamanya'
            ],
            kunci: 0,
            pembahasan: 'Uang Dina tidak cukup untuk membeli keduanya (Rp33.000). Ia perlu menyusun skala prioritas, yaitu mendahulukan kebutuhan yang lebih penting dan mendesak: buku latihan soal untuk ujian.'
        },
        {
            id: 'IPAS-092', bentuk: 'PG', kompetensi: 'P11', kesulitan: 'mudah',
            pertanyaan: 'Ibu membeli sayur di pasar dengan membayar menggunakan uang. Dalam kegiatan ini, uang berfungsi sebagai …',
            opsi: ['alat penyimpan barang', 'alat tukar atau alat pembayaran', 'barang yang dikonsumsi', 'alat produksi'],
            kunci: 1,
            pembahasan: 'Uang dipakai untuk membayar atau menukar dengan barang dan jasa yang dibutuhkan. Jadi, uang berfungsi sebagai alat tukar (alat pembayaran).'
        },

        /* ================= P12 Indonesia, ASEAN, dan dunia ================= */
        {
            id: 'IPAS-093', bentuk: 'PG', kompetensi: 'P12', kesulitan: 'mudah',
            pertanyaan: 'Perhimpunan Bangsa-Bangsa Asia Tenggara (ASEAN) didirikan pada tanggal …',
            opsi: ['17 Agustus 1945', '28 Oktober 1928', '8 Agustus 1967', '1 Juni 1945'],
            kunci: 2,
            pembahasan: 'ASEAN didirikan pada 8 Agustus 1967 di Bangkok, Thailand, melalui Deklarasi Bangkok. Tanggal lainnya adalah hari proklamasi, Sumpah Pemuda, dan hari lahir Pancasila.'
        },
        {
            id: 'IPAS-094', bentuk: 'PG', kompetensi: 'P12', kesulitan: 'sedang',
            pertanyaan: 'Negara berikut yang **bukan** termasuk negara pendiri ASEAN adalah …',
            opsi: ['Thailand', 'Vietnam', 'Filipina', 'Singapura'],
            kunci: 1,
            pembahasan: 'Lima negara pendiri ASEAN adalah Indonesia, Malaysia, Filipina, Singapura, dan Thailand. Vietnam baru bergabung pada tahun 1995.'
        },
        {
            id: 'IPAS-095', bentuk: 'MCMA', kompetensi: 'P12', kesulitan: 'sedang',
            pertanyaan: 'Dampak positif globalisasi bagi masyarakat Indonesia adalah …',
            opsi: [
                'informasi dari seluruh dunia dapat diperoleh dengan cepat melalui internet',
                'budaya asing diterima begitu saja tanpa disaring',
                'komunikasi jarak jauh menjadi lebih mudah',
                'kebudayaan daerah semakin dilupakan',
                'gaya hidup konsumtif (boros) meningkat'
            ],
            kunci: [0, 2],
            pembahasan: 'Informasi yang cepat dan komunikasi yang mudah adalah dampak positif. Menerima budaya asing tanpa disaring, lunturnya budaya daerah, dan gaya hidup boros adalah dampak negatif.'
        },
        {
            id: 'IPAS-096', bentuk: 'PG', kompetensi: 'P12', kesulitan: 'sulit',
            pertanyaan: 'Melalui internet, budaya dari berbagai negara mudah masuk ke Indonesia. Sikap yang paling tepat terhadap budaya asing adalah …',
            opsi: [
                'menolak semua budaya asing tanpa kecuali',
                'meniru semua budaya asing agar terlihat modern',
                'menganggap budaya asing selalu lebih baik daripada budaya sendiri',
                'menyaring budaya asing dan menerima yang sesuai dengan nilai Pancasila'
            ],
            kunci: 3,
            pembahasan: 'Budaya asing ada yang baik, misalnya disiplin dan tepat waktu, dan ada yang tidak sesuai dengan kepribadian bangsa. Sikap yang tepat adalah menyaringnya, menerima yang baik dan sesuai nilai Pancasila, serta tetap melestarikan budaya sendiri.'
        },
        {
            id: 'IPAS-097', bentuk: 'BS', kompetensi: 'P12', kesulitan: 'sulit',
            pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan tentang ASEAN berikut.',
            opsi: [
                'Sekretariat ASEAN berkedudukan di Jakarta.',
                'Semboyan ASEAN adalah "One Vision, One Identity, One Community".',
                'Indonesia adalah salah satu negara pendiri ASEAN.',
                'ASEAN adalah organisasi kerja sama negara-negara di kawasan Asia Selatan.'
            ],
            kunci: [true, true, true, false],
            pembahasan: '(1) Benar. (2) Benar. (3) Benar: Indonesia diwakili Adam Malik dalam Deklarasi Bangkok. (4) Salah: ASEAN adalah organisasi negara-negara di kawasan Asia Tenggara.'
        },
        {
            id: 'IPAS-098', bentuk: 'PG', kompetensi: 'P12', kesulitan: 'sedang',
            pertanyaan: 'Contoh kerja sama negara-negara ASEAN dalam bidang pendidikan adalah …',
            opsi: ['program pertukaran pelajar antarnegara ASEAN', 'pesta olahraga SEA Games', 'perdagangan bebas antarnegara ASEAN', 'latihan bersama penanggulangan bencana'],
            kunci: 0,
            pembahasan: 'Pertukaran pelajar dan pemberian beasiswa adalah kerja sama di bidang pendidikan. SEA Games adalah bidang olahraga, perdagangan bebas bidang ekonomi, dan latihan penanggulangan bencana bidang sosial/keamanan.'
        },
        {
            id: 'IPAS-099', bentuk: 'PG', kompetensi: 'P12', kesulitan: 'sulit',
            pertanyaan: 'Gambar berikut menunjukkan letak Indonesia. Indonesia diapit oleh benua A dan B serta samudra C dan D. Nama A, B, C, dan D secara berurutan adalah …',
            gambar: letakIndonesia(false), gambarPembahasan: letakIndonesia(true),
            opsi: [
                'Australia, Asia, Pasifik, Hindia',
                'Asia, Australia, Hindia, Pasifik',
                'Asia, Afrika, Atlantik, Pasifik',
                'Eropa, Australia, Hindia, Arktik'
            ],
            kunci: 1,
            pembahasan: 'Di utara Indonesia terdapat Benua Asia (A) dan di selatan Benua Australia (B). Di barat daya terdapat Samudra Hindia (C) dan di timur laut Samudra Pasifik (D). Letak di antara dua benua dan dua samudra ini membuat Indonesia strategis bagi lalu lintas perdagangan dunia.'
        },
        {
            id: 'IPAS-100', bentuk: 'PG', kompetensi: 'P12', kesulitan: 'sedang',
            pertanyaan: 'Organisasi internasional yang dibentuk dengan tujuan utama menjaga perdamaian dan keamanan dunia adalah …',
            opsi: ['ASEAN', 'OPEC', 'Perserikatan Bangsa-Bangsa (PBB)', 'APEC'],
            kunci: 2,
            pembahasan: 'PBB didirikan pada tahun 1945 dengan tujuan utama memelihara perdamaian dan keamanan dunia. ASEAN adalah kerja sama kawasan Asia Tenggara, OPEC organisasi negara pengekspor minyak, dan APEC kerja sama ekonomi Asia Pasifik.'
        }
    ]);
})(TKA.gambarMat);
