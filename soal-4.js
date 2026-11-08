/*
 * Bank soal Bahasa Indonesia — bagian 4 (BIN-076 s.d. BIN-100).
 * BIN-095 s.d. BIN-099 memakai dua teks sekaligus (membandingkan dua teks).
 */
TKA.tambahSoal('bin', [
    {
        id: 'BIN-076', bacaan: 'B21', bentuk: 'PG', kompetensi: 'K01', kesulitan: 'mudah',
        pertanyaan: 'Menurut teks, apa yang harus dilakukan jika luka lecet berdarah?',
        opsi: [
            'Mengoleskan pasta gigi pada luka.',
            'Menggosok luka dengan keras memakai sabun.',
            'Membiarkan luka terbuka agar cepat kering.',
            'Menekan luka perlahan dengan kain kasa bersih sampai darah berhenti.'
        ],
        kunci: 3,
        pembahasan: 'Langkah ketiga menyebutkan, "Jika luka berdarah, tekan perlahan dengan kain kasa bersih sampai darah berhenti." Pasta gigi justru dilarang, luka tidak boleh digosok keras, dan luka perlu ditutup.'
    },
    {
        id: 'BIN-077', bacaan: 'B21', bentuk: 'BS', kompetensi: 'K15', kesulitan: 'sulit',
        pertanyaan: 'Laras menolong adiknya yang lututnya lecet karena jatuh dari sepeda. Tentukan apakah setiap tindakan Laras sesuai (Benar) atau tidak sesuai (Salah) dengan petunjuk dalam teks.',
        opsi: [
            'Laras mengalirkan air bersih ke luka untuk membuang pasir.',
            'Laras langsung menyentuh luka tanpa mencuci tangan karena terburu-buru.',
            'Laras mengoleskan pasta gigi agar luka terasa dingin.',
            'Dua hari kemudian luka adiknya bengkak dan bernanah, lalu Laras mengajaknya ke puskesmas.'
        ],
        kunci: [true, false, false, true],
        pembahasan: '(1) Benar, sesuai langkah kedua. (2) Salah: tangan harus dicuci dengan sabun lebih dulu (langkah pertama). (3) Salah: pasta gigi dilarang karena dapat memperparah luka. (4) Benar: luka yang bengkak dan bernanah harus diperiksakan ke petugas kesehatan (langkah keenam).'
    },
    {
        id: 'BIN-078', bacaan: 'B21', bentuk: 'PG', kompetensi: 'K11', kesulitan: 'sedang',
        pertanyaan: 'Teks ditutup dengan kalimat "Jangan mengoleskan pasta gigi, kopi, atau bahan lain yang tidak jelas kebersihannya pada luka." Tujuan penulis menuliskan bagian penutup tersebut adalah …',
        opsi: [
            'memperingatkan pembaca tentang kebiasaan keliru yang dapat memperparah luka',
            'menjelaskan cara membuat obat luka dari bahan dapur',
            'mengajak pembaca membeli cairan antiseptik',
            'menceritakan pengalaman penulis saat terluka'
        ],
        kunci: 0,
        pembahasan: 'Kata "jangan" dan kalimat "Bahan-bahan itu justru dapat memperparah luka" menunjukkan bahwa penulis ingin memperingatkan pembaca agar tidak melakukan kebiasaan yang salah.'
    },
    {
        id: 'BIN-079', bacaan: 'B22', bentuk: 'PG', kompetensi: 'K10', kesulitan: 'sulit',
        pertanyaan: 'Berdasarkan data dalam laporan, berapa uang yang diperoleh dari penjualan kaleng selama tiga bulan?',
        opsi: ['Rp14.000', 'Rp19.000', 'Rp50.000', 'Rp70.000'],
        kunci: 3,
        pembahasan: 'Kaleng yang terkumpul 14 kilogram dan harganya Rp5.000 per kilogram. Jadi, 14 × Rp5.000 = Rp70.000. Informasi ini tidak ditulis langsung, tetapi dapat disimpulkan dari dua data dalam teks.'
    },
    {
        id: 'BIN-080', bacaan: 'B22', bentuk: 'PG', kompetensi: 'K04', kesulitan: 'sedang',
        pertanyaan: 'Gagasan pendukung yang menunjukkan bahwa program bank sampah berhasil mengurangi sampah di sekolah adalah …',
        opsi: [
            'Harga kaleng Rp5.000 per kilogram.',
            'Buku tabungan sering tertinggal di rumah.',
            'Sampah plastik yang dibuang petugas kebersihan berkurang dari empat karung menjadi satu karung setiap minggu.',
            'Sampah ditimbang oleh siswa secara bergiliran.'
        ],
        kunci: 2,
        pembahasan: 'Perubahan dari empat karung menjadi satu karung adalah bukti berkurangnya sampah plastik di sekolah. Pilihan lain berisi harga, kendala, dan cara penimbangan, bukan bukti keberhasilan.'
    },
    {
        id: 'BIN-081', bacaan: 'B22', bentuk: 'BS', kompetensi: 'K17', kesulitan: 'sedang',
        pertanyaan: 'Tentukan apakah setiap pernyataan berikut sesuai (Benar) atau tidak sesuai (Salah) dengan isi laporan.',
        opsi: [
            'Penimbangan sampah dilakukan oleh petugas kebersihan sekolah.',
            'Siswa membawa sampah ke sekolah setiap hari Jumat.',
            'Kertas adalah jenis sampah yang paling banyak terkumpul.',
            'Semua sampah yang dibawa siswa selalu diterima oleh pengepul.'
        ],
        kunci: [false, true, true, false],
        pembahasan: '(1) Salah: sampah ditimbang oleh siswa yang bertugas bergiliran. (2) Benar, sesuai paragraf pertama. (3) Benar: kertas 120 kg, lebih banyak daripada botol plastik 96 kg dan kaleng 14 kg. (4) Salah: sampah yang kotor tidak diterima pengepul.'
    },
    {
        id: 'BIN-082', bacaan: 'B22', bentuk: 'MCMA', kompetensi: 'K16', kesulitan: 'sulit',
        pertanyaan: 'Pernyataan sebab-akibat yang sesuai dengan isi laporan adalah …',
        opsi: [
            'Sebagian sampah masih kotor sehingga berbau dan tidak diterima pengepul.',
            'Program bank sampah berjalan sehingga sampah plastik di tempat sampah sekolah berkurang.',
            'Buku tabungan disimpan di lemari kelas sehingga sampah menjadi bersih.',
            'Harga kaleng paling mahal sehingga kaleng menjadi sampah yang paling banyak terkumpul.'
        ],
        kunci: [0, 1],
        pembahasan: 'A dan B sesuai dengan paragraf ketiga dan keempat. C salah karena menyimpan buku tabungan tidak membuat sampah bersih. D salah karena kaleng justru paling sedikit terkumpul (14 kg).'
    },
    {
        id: 'BIN-083', bacaan: 'B23', bentuk: 'PG', kompetensi: 'K03', kesulitan: 'mudah',
        pertanyaan: 'Gagasan utama teks tersebut adalah …',
        opsi: [
            'Jajanan di sekitar sekolah tidak semuanya sehat.',
            'Menu sarapan dapat disiapkan sejak malam hari.',
            'Tubuh tidak mendapat makanan selama delapan sampai sepuluh jam saat tidur.',
            'Sarapan sangat penting bagi anak sekolah.'
        ],
        kunci: 3,
        pembahasan: 'Pendapat utama penulis ada di akhir paragraf pertama: "sarapan sangat penting bagi anak sekolah". Paragraf-paragraf berikutnya berisi alasan dan saran yang mendukungnya.'
    },
    {
        id: 'BIN-084', bacaan: 'B23', bentuk: 'PG', kompetensi: 'K08', kesulitan: 'sulit',
        pertanyaan: 'Paragraf pertama menyebutkan alasan siswa tidak sarapan, misalnya bangun kesiangan atau takut terlambat. Hubungan paragraf keempat dengan alasan tersebut adalah …',
        opsi: [
            'paragraf keempat membenarkan bahwa sarapan memang menghabiskan banyak waktu',
            'paragraf keempat menjawab alasan itu dengan menunjukkan bahwa sarapan dapat dibuat sederhana dan disiapkan sejak malam',
            'paragraf keempat menambahkan alasan baru mengapa siswa tidak sarapan',
            'paragraf keempat tidak berhubungan dengan paragraf pertama'
        ],
        kunci: 1,
        pembahasan: 'Paragraf keempat menyatakan sarapan "tidak harus mewah atau memakan banyak waktu" dan dapat disiapkan sejak malam. Bagian ini menanggapi alasan bangun kesiangan dan takut terlambat yang disebut di paragraf pertama.'
    },
    {
        id: 'BIN-085', bacaan: 'B23', bentuk: 'PG', kompetensi: 'K12', kesulitan: 'sedang',
        pertanyaan: 'Kalimat yang merupakan fakta dalam teks tersebut adalah …',
        opsi: [
            'Padahal, sarapan sangat penting bagi anak sekolah.',
            'Lima belas menit untuk sarapan akan membuat kegiatan belajar sepanjang pagi menjadi lebih lancar.',
            'Saat bangun pagi, tubuh kita sudah tidak mendapat asupan makanan selama delapan sampai sepuluh jam.',
            'Biasakanlah bangun lebih awal agar sempat sarapan.'
        ],
        kunci: 2,
        pembahasan: 'Pilihan C dapat dibuktikan karena saat tidur kita memang tidak makan selama berjam-jam. Pilihan A dan B adalah pendapat penulis, sedangkan D adalah ajakan.'
    },
    {
        id: 'BIN-086', bacaan: 'B23', bentuk: 'PG', kompetensi: 'K07', kesulitan: 'sulit',
        pertanyaan: 'Perhatikan kalimat berikut. "Siswa yang tidak sarapan biasanya merasa sangat lapar pada jam istirahat sehingga membeli banyak jajanan. Sayangnya, tidak semua jajanan di sekitar sekolah sehat dan bergizi." Hubungan kedua kalimat tersebut adalah …',
        opsi: [
            'kalimat kedua memberi contoh jajanan yang dibeli siswa',
            'kalimat kedua menyatakan penyebab siswa merasa lapar',
            'kalimat kedua membantah isi kalimat pertama',
            'kalimat kedua menjelaskan mengapa membeli banyak jajanan merupakan hal yang kurang baik'
        ],
        kunci: 3,
        pembahasan: 'Kalimat pertama menyebut kebiasaan membeli banyak jajanan. Kalimat kedua, yang diawali "sayangnya", menunjukkan sisi buruk kebiasaan itu: tidak semua jajanan sehat. Kalimat kedua tidak membantah, tidak memberi contoh, dan tidak menjelaskan penyebab lapar.'
    },
    {
        id: 'BIN-087', bacaan: 'B24', bentuk: 'PG', kompetensi: 'K01', kesulitan: 'mudah',
        pertanyaan: 'Kapan dan di mana kelompok tersebut akan mengerjakan poster?',
        opsi: [
            'Sabtu pukul 10.00 di lapangan sepak bola',
            'Minggu pukul 12.00 di balai desa',
            'Minggu pukul 15.00 di rumah Rudi',
            'Sabtu siang di rumah nenek Lia'
        ],
        kunci: 2,
        pembahasan: 'Rudi mengusulkan, "Minggu sore pukul tiga saja. Kita bisa memakai teras rumahku," dan teman-temannya setuju. Pukul tiga sore adalah pukul 15.00.'
    },
    {
        id: 'BIN-088', bacaan: 'B24', bentuk: 'MCMA', kompetensi: 'K17', kesulitan: 'sulit',
        pertanyaan: 'Pernyataan yang sesuai dengan isi percakapan adalah …',
        opsi: [
            'Bayu akan membawa gambar makanan dari majalah bekas.',
            'Sinta bertugas membawa spidol warna dan gunting.',
            'Karton besar yang akan dipakai adalah milik ayah Rudi.',
            'Poster harus memuat empat kelompok makanan.',
            'Kerja kelompok dibatalkan jika turun hujan.'
        ],
        kunci: [0, 2, 3],
        pembahasan: 'A, C, dan D sesuai dengan percakapan. B salah karena spidol dan gunting dibawa Lia; Sinta membawa lem dan penggaris. E salah karena jika hujan, mereka hanya pindah ke ruang tamu.'
    },
    {
        id: 'BIN-089', bacaan: 'B25', bentuk: 'PG', kompetensi: 'K10', kesulitan: 'sulit',
        pertanyaan: 'Mbok Rondo dan Sulastri mengundang seluruh warga, termasuk warga yang dulu mengusir sang kakek, untuk mengambil air. Sikap tersebut menunjukkan bahwa mereka …',
        opsi: [
            'ingin warga membayar air dari telaga',
            'ingin dianggap sebagai pemilik telaga',
            'takut dimarahi oleh sang kakek',
            'tidak menyimpan dendam dan tetap murah hati'
        ],
        kunci: 3,
        pembahasan: 'Meskipun warga pernah bersikap buruk, Mbok Rondo dan Sulastri tetap berbagi air "sepuasnya". Ini menunjukkan mereka tidak mendendam dan murah hati. Tidak ada petunjuk bahwa mereka meminta bayaran, takut, atau ingin dianggap pemilik.'
    },
    {
        id: 'BIN-090', bacaan: 'B25', bentuk: 'PG', kompetensi: 'K05', kesulitan: 'mudah',
        pertanyaan: 'Kata **compang-camping** dalam kalimat "datanglah seorang kakek berpakaian compang-camping" bermakna …',
        opsi: ['mewah dan mahal', 'robek di banyak tempat', 'bersih dan rapi', 'berwarna-warni'],
        kunci: 1,
        pembahasan: 'Kakek itu meminta seteguk air dari rumah ke rumah dan diusir warga. Gambaran ini sesuai dengan pakaian yang lusuh dan robek-robek. Compang-camping berarti sobek di sana-sini.'
    },
    {
        id: 'BIN-091', bacaan: 'B25', bentuk: 'MCMA', kompetensi: 'K09', kesulitan: 'sedang',
        pertanyaan: 'Amanat yang dapat disimpulkan dari cerita tersebut adalah …',
        opsi: [
            'Tolonglah orang yang membutuhkan meskipun kita sendiri berkekurangan.',
            'Janganlah menyimpan dendam kepada orang yang pernah berbuat salah.',
            'Simpanlah air untuk diri sendiri ketika musim kemarau.',
            'Orang miskin pasti akan mendapat hadiah ajaib.'
        ],
        kunci: [0, 1],
        pembahasan: 'Mbok Rondo dan Sulastri memberikan air dan ubi terakhir mereka (A), lalu berbagi air dengan warga yang pernah bersikap buruk (B). Pilihan C bertentangan dengan cerita, dan D terlalu berlebihan.'
    },
    {
        id: 'BIN-092', bacaan: 'B26', bentuk: 'MCMA', kompetensi: 'K02', kesulitan: 'sedang',
        pertanyaan: 'Informasi penting tentang proses pembuatan batik dalam teks adalah …',
        opsi: [
            'Bagian kain ditutup dengan malam sebelum dicelup.',
            'Kain dicelup ke dalam pewarna.',
            'Malam dilunturkan dengan cara merebus kain.',
            'Motif parang banyak ditemukan di Yogyakarta.',
            'Hari Batik Nasional diperingati setiap 2 Oktober.'
        ],
        kunci: [0, 1, 2],
        pembahasan: 'Proses pembuatan batik dijelaskan di paragraf pertama: menutup kain dengan malam, mencelup ke pewarna, lalu melunturkan malam (A, B, C). D dan E benar menurut teks, tetapi tidak berkaitan dengan proses pembuatan.'
    },
    {
        id: 'BIN-093', bacaan: 'B26', bentuk: 'PG', kompetensi: 'K12', kesulitan: 'sedang',
        pertanyaan: 'Kalimat yang merupakan opini dalam teks tersebut adalah …',
        opsi: [
            'Batik tulis dibuat dengan canting.',
            'Menurut penulis, mengenakan batik adalah cara paling sederhana untuk menunjukkan rasa cinta terhadap budaya bangsa.',
            'Pada 2 Oktober 2009, UNESCO menetapkan batik Indonesia sebagai Warisan Kemanusiaan.',
            'Cirebon terkenal dengan motif mega mendung.'
        ],
        kunci: 1,
        pembahasan: 'Pilihan B memuat penilaian pribadi ("menurut penulis", "paling sederhana"). Pilihan A, C, dan D adalah fakta yang dapat dibuktikan.'
    },
    {
        id: 'BIN-094', bacaan: 'B26', bentuk: 'BS', kompetensi: 'K17', kesulitan: 'sulit',
        pertanyaan: 'Tentukan apakah setiap pernyataan berikut sesuai (Benar) atau tidak sesuai (Salah) dengan isi teks.',
        opsi: [
            'Malam dilunturkan dari kain dengan cara merebus kain.',
            'Canting digunakan untuk membuat batik cap.',
            'Motif mega mendung menyerupai awan berarak.',
            'Hari Batik Nasional sudah diperingati sejak sebelum tahun 2009.'
        ],
        kunci: [true, false, true, false],
        pembahasan: '(1) Benar, sesuai paragraf pertama. (2) Salah: canting dipakai untuk batik tulis, sedangkan batik cap memakai cap tembaga. (3) Benar, sesuai paragraf ketiga. (4) Salah: Hari Batik Nasional diperingati sejak penetapan UNESCO pada 2 Oktober 2009.'
    },
    {
        id: 'BIN-095', bacaan: ['B27', 'B28'], bentuk: 'MCMA', kompetensi: 'K13', kesulitan: 'sedang',
        pertanyaan: 'Bacalah Teks 1 dan Teks 2. Informasi yang terdapat pada **kedua** teks adalah …',
        opsi: [
            'Bersepeda dapat membantu mengurangi kemacetan.',
            'Helm berkaitan dengan keselamatan pesepeda.',
            'Program "Rabu Bersepeda" diikuti siswa kelas 4 sampai kelas 6.',
            'Anak-anak dianjurkan melakukan kegiatan fisik enam puluh menit setiap hari.',
            'Sepeda tidak memerlukan bahan bakar.'
        ],
        kunci: [0, 1],
        pembahasan: 'Teks 1 menyebut bersepeda mengurangi kemacetan, dan Teks 2 melaporkan kendaraan pengantar berkurang hampir setengahnya (A). Teks 1 menganjurkan memakai helm, dan Teks 2 menyebut belum semua siswa memiliki helm (B). C hanya ada di Teks 2, sedangkan D dan E hanya ada di Teks 1.'
    },
    {
        id: 'BIN-096', bacaan: ['B27', 'B28'], bentuk: 'PG', kompetensi: 'K13', kesulitan: 'sulit',
        pertanyaan: 'Perbedaan Teks 1 dan Teks 2 yang paling tepat adalah …',
        opsi: [
            'Teks 1 membahas bahaya bersepeda, sedangkan Teks 2 membahas manfaatnya.',
            'Teks 1 berisi pendapat kepala sekolah, sedangkan Teks 2 berisi pendapat ahli kesehatan.',
            'Teks 1 menjelaskan manfaat bersepeda secara umum, sedangkan Teks 2 melaporkan pelaksanaan program bersepeda di sebuah sekolah.',
            'Teks 1 ditujukan untuk orang dewasa, sedangkan Teks 2 ditujukan untuk polisi lalu lintas.'
        ],
        kunci: 2,
        pembahasan: 'Teks 1 berisi informasi umum tentang manfaat dan keselamatan bersepeda. Teks 2 melaporkan program "Rabu Bersepeda" di SD Negeri Sukamaju, lengkap dengan hasil dan tantangannya. Pendapat kepala sekolah justru ada di Teks 2.'
    },
    {
        id: 'BIN-097', bacaan: ['B27', 'B28'], bentuk: 'MCMA', kompetensi: 'K13', kesulitan: 'sulit',
        pertanyaan: 'Saran keselamatan dalam Teks 1 yang **belum** sepenuhnya terpenuhi dalam program pada Teks 2 adalah …',
        opsi: [
            'Memakai helm saat bersepeda.',
            'Bersepeda di jalur khusus sepeda bila tersedia.',
            'Mematuhi rambu lalu lintas.',
            'Memastikan rem dan rantai sepeda berfungsi dengan baik.'
        ],
        kunci: [0, 1],
        pembahasan: 'Teks 2 menyebut "belum semua siswa memiliki helm" dan "jalan menuju sekolah belum memiliki jalur sepeda". Teks 2 tidak menyebut adanya masalah dengan rambu lalu lintas ataupun rem dan rantai sepeda.'
    },
    {
        id: 'BIN-098', bacaan: ['B29', 'B30'], bentuk: 'PG', kompetensi: 'K13', kesulitan: 'sedang',
        pertanyaan: 'Kalimat pada Teks 1 yang paling tepat menjadi alasan pentingnya langkah-langkah dalam Teks 2 adalah …',
        opsi: [
            'Kulit bumi tersusun atas lempengan-lempengan besar yang terus bergerak.',
            'Energi yang terlepas merambat ke segala arah sebagai getaran.',
            'Cara terbaik untuk mengurangi korban adalah melatih masyarakat agar tahu apa yang harus dilakukan saat gempa terjadi.',
            'Indonesia terletak di pertemuan tiga lempeng besar.'
        ],
        kunci: 2,
        pembahasan: 'Teks 2 berisi langkah yang harus dilakukan saat gempa. Teks 1 menyebut pentingnya melatih masyarakat agar tahu apa yang harus dilakukan saat gempa. Kalimat itulah yang menjadi alasan langsung. Pilihan A, B, dan D menjelaskan penyebab gempa.'
    },
    {
        id: 'BIN-099', bacaan: ['B29', 'B30'], bentuk: 'PG', kompetensi: 'K13', kesulitan: 'sulit',
        pertanyaan: 'Informasi tentang tsunami pada Teks 1 paling berkaitan dengan langkah nomor berapa pada Teks 2?',
        opsi: ['Langkah 2', 'Langkah 3', 'Langkah 5', 'Langkah 6'],
        kunci: 3,
        pembahasan: 'Teks 1 menyebut gempa di dasar laut dapat menimbulkan tsunami. Langkah 6 pada Teks 2 meminta sekolah di dekat pantai segera menuju tempat tinggi bila guncangan kuat atau lama, yaitu cara menyelamatkan diri dari tsunami.'
    },
    {
        id: 'BIN-100', bacaan: 'B30', bentuk: 'BS', kompetensi: 'K15', kesulitan: 'sulit',
        pertanyaan: 'Saat terjadi gempa di sekolah, siswa melakukan tindakan berikut. Tentukan apakah setiap tindakan sesuai (Benar) atau tidak sesuai (Salah) dengan petunjuk.',
        opsi: [
            'Beni langsung berlari ke luar kelas saat lantai masih berguncang.',
            'Citra berlindung di bawah meja sambil melindungi kepala dengan tangan.',
            'Doni kembali ke kelas untuk mengambil tas setelah guncangan berhenti.',
            'Eka berkumpul di lapangan terbuka yang jauh dari pohon besar dan tiang listrik.'
        ],
        kunci: [false, true, false, true],
        pembahasan: '(1) Salah: jangan berlari keluar saat guncangan masih terjadi. (2) Benar, sesuai langkah 2. (3) Salah: jangan kembali ke kelas untuk mengambil barang. (4) Benar: titik kumpul adalah lapangan terbuka yang jauh dari gedung, pohon besar, dan tiang listrik.'
    }
]);
