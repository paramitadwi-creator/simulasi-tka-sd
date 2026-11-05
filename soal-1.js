/*
 * Bank soal Bahasa Indonesia — bagian 1 (BIN-001 s.d. BIN-025).
 *
 * Bentuk soal:
 *   PG   : kunci = indeks pilihan (0 = A)
 *   MCMA : PG Kompleks pilih semua yang benar, kunci = [indeks, ...]
 *   BS   : PG Kompleks Benar/Salah, kunci = [true|false, ...] per pernyataan
 * Kesulitan: mudah | sedang | sulit.  Kompetensi: lihat kompetensi.js
 */
TKA.tambahSoal('bin', [
    {
        id: 'BIN-001', bacaan: 'B01', bentuk: 'PG', kompetensi: 'K01', kesulitan: 'mudah',
        pertanyaan: 'Menurut Kakek Darmo, apa penyebab layang-layang Bima selalu jatuh?',
        opsi: [
            'Benang layang-layangnya terlalu pendek.',
            'Angin pada musim kemarau terlalu kencang.',
            'Ekor layang-layangnya terlalu panjang.',
            'Sisi kanan layang-layang lebih berat daripada sisi kiri.'
        ],
        kunci: 3,
        pembahasan: 'Kakek berkata, "Sisi kanan lebih berat daripada sisi kiri." Karena tidak seimbang, layang-layang berputar lalu jatuh. Benang, ekor, dan angin tidak disebut sebagai penyebabnya; Kakek justru menambahkan ekor.'
    },
    {
        id: 'BIN-002', bacaan: 'B01', bentuk: 'PG', kompetensi: 'K10', kesulitan: 'sulit',
        pertanyaan: 'Bima tidak ikut bersorak ketika layang-layangnya berhasil terbang tinggi. Ia malah berlari ke rumah Kakek Darmo. Hal ini menunjukkan bahwa Bima …',
        opsi: [
            'malu karena layang-layangnya diperbaiki oleh orang lain',
            'takut layang-layangnya akan jatuh lagi jika diterbangkan lebih lama',
            'ingin menguasai sendiri cara membuat layang-layang yang baik',
            'ingin segera mengembalikan peralatan yang dipinjam dari Kakek'
        ],
        kunci: 2,
        pembahasan: 'Bima "memohon agar diajari membuat layang-layang sendiri dari awal". Artinya, ia tidak puas hanya dibantu; ia ingin bisa membuatnya sendiri. Tidak ada petunjuk bahwa Bima malu, takut, atau meminjam alat.'
    },
    {
        id: 'BIN-003', bacaan: 'B01', bentuk: 'PG', kompetensi: 'K06', kesulitan: 'sedang',
        pertanyaan: 'Kakek berkata, "Layang-layang harus seimbang, seperti orang yang meniti pematang sawah." Maksud perumpamaan tersebut adalah …',
        opsi: [
            'layang-layang harus diterbangkan di dekat sawah agar anginnya cukup',
            'layang-layang harus dibuat perlahan-lahan seperti orang berjalan di sawah',
            'layang-layang harus ringan seperti orang yang berjalan tanpa membawa beban',
            'berat kedua sisi harus sama agar tidak miring dan jatuh, seperti orang yang berjalan di pematang'
        ],
        kunci: 3,
        pembahasan: 'Orang yang meniti (berjalan di atas) pematang sawah yang sempit harus menjaga keseimbangan agar tidak jatuh. Layang-layang pun harus seimbang kiri dan kanan agar tidak miring lalu jatuh.'
    },
    {
        id: 'BIN-004', bacaan: 'B01', bentuk: 'BS', kompetensi: 'K17', kesulitan: 'sedang',
        pertanyaan: 'Tentukan apakah setiap pernyataan berikut sesuai (Benar) atau tidak sesuai (Salah) dengan isi cerita.',
        opsi: [
            'Kakek Darmo dulu dikenal sebagai pembuat layang-layang.',
            'Bima merasa bangga ketika dipanggil Kakek Darmo untuk pertama kalinya.',
            'Kakek Darmo menipiskan bambu di sisi kanan layang-layang.',
            'Pada percobaan berikutnya, layang-layang Bima melayang di atas pucuk pohon kelapa.'
        ],
        kunci: [true, false, true, true],
        pembahasan: '(1) Benar: Kakek "dulu terkenal sebagai pembuat layang-layang". (2) Salah: Bima menurut "meskipun agak malu", bukan bangga. (3) Benar: Kakek meraut bambu sisi kanan sampai lebih tipis. (4) Benar: layang-layang "melayang tenang di atas pucuk pohon kelapa".'
    },
    {
        id: 'BIN-005', bacaan: 'B02', bentuk: 'PG', kompetensi: 'K03', kesulitan: 'mudah',
        pertanyaan: 'Ide pokok paragraf kedua teks tersebut adalah …',
        opsi: [
            'Di dalam koloni terdapat tiga jenis lebah dengan tugas yang berbeda.',
            'Ratu lebah dapat bertelur hingga ribuan butir dalam sehari.',
            'Lebah pekerja jumlahnya paling banyak di dalam koloni.',
            'Lebah jantan tidak ikut mencari makanan.'
        ],
        kunci: 0,
        pembahasan: 'Kalimat utama paragraf kedua ada di awal: "Di dalam koloni terdapat tiga jenis lebah." Kalimat-kalimat berikutnya menjelaskan tugas ratu, lebah jantan, dan lebah pekerja. Pilihan B, C, dan D hanyalah rincian.'
    },
    {
        id: 'BIN-006', bacaan: 'B02', bentuk: 'MCMA', kompetensi: 'K16', kesulitan: 'sedang',
        pertanyaan: 'Pernyataan sebab-akibat yang sesuai dengan isi teks adalah …',
        opsi: [
            'Nektar dikipasi dengan sayap sehingga sebagian airnya menguap dan menjadi madu.',
            'Lebah membawa serbuk sari dari bunga ke bunga sehingga tanaman dapat berbuah.',
            'Ratu lebah bertelur ribuan butir sehingga lebah jantan tidak perlu mencari makanan.',
            'Jumlah lebah berkurang sehingga hasil panen buah dan sayuran dapat terancam.',
            'Sel sarang berbentuk segi enam sehingga bunga menjadi sulit ditemukan.'
        ],
        kunci: [0, 1, 3],
        pembahasan: 'Pilihan A, B, dan D sesuai dengan paragraf ketiga dan keempat. Pilihan C salah karena teks tidak menghubungkan banyaknya telur dengan tugas lebah jantan. Pilihan E salah karena bentuk sel tidak berhubungan dengan sulitnya menemukan bunga.'
    },
    {
        id: 'BIN-007', bacaan: 'B02', bentuk: 'MCMA', kompetensi: 'K02', kesulitan: 'sedang',
        pertanyaan: 'Informasi penting dalam teks yang menunjukkan manfaat lebah bagi manusia adalah …',
        opsi: [
            'Lebah menghasilkan madu.',
            'Lebah membantu penyerbukan sehingga tanaman petani dapat berbuah.',
            'Lebah menyimpan nektar di dalam sel berbentuk segi enam.',
            'Lebah jantan tidak ikut mencari makanan.'
        ],
        kunci: [0, 1],
        pembahasan: 'Manfaat lebah bagi manusia adalah menghasilkan madu dan membantu penyerbukan sehingga petani bisa panen (paragraf keempat). Pilihan C dan D benar menurut teks, tetapi tidak menunjukkan manfaat bagi manusia.'
    },
    {
        id: 'BIN-008', bacaan: 'B03', bentuk: 'PG', kompetensi: 'K05', kesulitan: 'mudah',
        pertanyaan: 'Kata **lengang** dalam kalimat "Menjelang pukul sembilan pagi, pasar mulai lengang" bermakna …',
        opsi: ['ramai', 'sepi', 'kotor', 'panas'],
        kunci: 1,
        pembahasan: 'Setelah kalimat itu, jukung "satu per satu" pulang dan permukaan air "kembali tenang". Jadi, pasar menjadi sepi. Lengang berarti sepi atau tidak ramai.'
    },
    {
        id: 'BIN-009', bacaan: 'B03', bentuk: 'PG', kompetensi: 'K14', kesulitan: 'sedang',
        pertanyaan: 'Judul lain yang paling tepat untuk teks tersebut adalah …',
        opsi: [
            'Cara Membuat Jukung dari Kayu',
            'Tanggui, Topi Khas Kalimantan',
            'Ramainya Pagi di Pasar Terapung',
            'Harga Buah di Pasar Tradisional'
        ],
        kunci: 2,
        pembahasan: 'Seluruh teks menggambarkan suasana pasar terapung dari subuh sampai menjelang pukul sembilan pagi. Judul C mencakup isi itu. Judul B hanya mewakili satu rincian, sedangkan A dan D tidak dibahas.'
    },
    {
        id: 'BIN-010', bacaan: 'B03', bentuk: 'PG', kompetensi: 'K11', kesulitan: 'sedang',
        pertanyaan: 'Tujuan penulis menulis teks tersebut adalah …',
        opsi: [
            'mengajak pembaca berbelanja buah di pasar terapung',
            'melaporkan hasil penelitian tentang jumlah pedagang di sungai',
            'menjelaskan langkah-langkah berdagang di atas perahu',
            'menggambarkan suasana pasar terapung sehingga pembaca seolah-olah melihatnya sendiri'
        ],
        kunci: 3,
        pembahasan: 'Teks deskripsi ini penuh rincian yang dapat dilihat, dicium, dan didengar (tanggui, aroma buah, tawa pembeli). Tujuannya menggambarkan suasana. Tidak ada ajakan, langkah-langkah, atau data penelitian.'
    },
    {
        id: 'BIN-011', bacaan: 'B03', bentuk: 'MCMA', kompetensi: 'K04', kesulitan: 'sulit',
        pertanyaan: 'Paragraf ketiga diawali kalimat "Suasana pasar terasa hidup." Rincian yang mendukung gagasan tersebut adalah …',
        opsi: [
            'Perahu-perahu saling merapat, berdesakan, lalu menjauh lagi.',
            'Penjual dan pembeli tawar-menawar sambil berpegangan pada tepi perahu.',
            'Sesekali terdengar tawa ketika sebuah jukung oleng.',
            'Para pedagang mengenakan tanggui dari anyaman daun nipah.',
            'Menjelang pukul sembilan pagi, satu per satu jukung didayung pulang.'
        ],
        kunci: [0, 1, 2],
        pembahasan: 'A, B, dan C terdapat di paragraf ketiga dan menunjukkan gerak serta suara yang membuat pasar terasa hidup. D berasal dari paragraf kedua dan menggambarkan pakaian pedagang. E justru menunjukkan pasar mulai sepi.'
    },
    {
        id: 'BIN-012', bacaan: 'B04', bentuk: 'BS', kompetensi: 'K16', kesulitan: 'sedang',
        pertanyaan: 'Tentukan Benar atau Salah setiap pernyataan sebab-akibat berikut berdasarkan teks.',
        opsi: [
            'Warna cahaya terpisah karena setiap warna dibelokkan dengan besar yang berbeda.',
            'Pelangi jarang terlihat pada tengah hari karena matahari berada terlalu rendah.',
            'Kita melihat pita warna yang rapi karena jutaan butiran air menguraikan cahaya dengan cara yang sama.',
            'Pelangi dapat terlihat karena matahari berada di depan pengamat.'
        ],
        kunci: [true, false, true, false],
        pembahasan: '(1) Benar, sesuai paragraf kedua. (2) Salah: pada tengah hari matahari justru berada tinggi di atas kepala. (3) Benar, sesuai paragraf ketiga. (4) Salah: matahari harus berada di belakang pengamat.'
    },
    {
        id: 'BIN-013', bacaan: 'B04', bentuk: 'PG', kompetensi: 'K08', kesulitan: 'sulit',
        pertanyaan: 'Hubungan paragraf ketiga dengan paragraf kedua adalah …',
        opsi: [
            'paragraf ketiga membantah penjelasan pada paragraf kedua',
            'paragraf ketiga memberi contoh lain tentang pemantulan cahaya',
            'paragraf ketiga menjelaskan hasil yang terlihat ketika proses pada paragraf kedua terjadi di banyak butiran air',
            'paragraf ketiga mengulang isi paragraf kedua dengan kata-kata yang berbeda'
        ],
        kunci: 2,
        pembahasan: 'Paragraf kedua menjelaskan proses di satu butiran air. Paragraf ketiga diawali "Karena jutaan butiran air melakukan hal yang sama", lalu menyebut hasilnya: pita warna yang tersusun rapi. Jadi, paragraf ketiga adalah akibat atau hasil dari proses itu.'
    },
    {
        id: 'BIN-014', bacaan: 'B04', bentuk: 'PG', kompetensi: 'K15', kesulitan: 'sulit',
        pertanyaan: 'Pukul 07.00 pagi, matahari bersinar dari arah timur. Dimas ingin membuat pelangi dengan menyemprotkan air dari selang. Berdasarkan teks, apa yang sebaiknya dilakukan Dimas?',
        opsi: [
            'Menghadap ke timur dan menyemprotkan air ke arah matahari.',
            'Menunggu sampai pukul 12.00 ketika cahaya matahari paling terang.',
            'Membelakangi matahari dan menyemprotkan air ke arah barat.',
            'Menyemprotkan air di tempat teduh agar cahaya tidak menyilaukan.'
        ],
        kunci: 2,
        pembahasan: 'Pelangi terlihat bila matahari berada di belakang pengamat dan butiran air di depannya. Karena matahari di timur, Dimas harus membelakangi timur dan menyemprot ke arah barat. Pukul 12.00 matahari terlalu tinggi, dan tempat teduh tidak mendapat cahaya.'
    },
    {
        id: 'BIN-015', bacaan: 'B05', bentuk: 'PG', kompetensi: 'K01', kesulitan: 'mudah',
        pertanyaan: 'Apa fungsi bantal sekam yang diletakkan di dasar keranjang?',
        opsi: [
            'Menyerap air yang berlebih.',
            'Menambah jasad renik pengurai sampah.',
            'Mencegah kompos tercecer dari lubang keranjang.',
            'Membuat kompos berbau seperti tanah.'
        ],
        kunci: 0,
        pembahasan: 'Langkah kedua menyebutkan, "Bantal ini berguna untuk menyerap air yang berlebih." Jasad renik berasal dari kompos jadi, sedangkan yang mencegah kompos tercecer adalah kardus.'
    },
    {
        id: 'BIN-016', bacaan: 'B05', bentuk: 'PG', kompetensi: 'K07', kesulitan: 'sedang',
        pertanyaan: 'Perhatikan dua kalimat pada langkah keempat: "Potong kecil-kecil sisa sayur dan kulit buah, lalu benamkan ke dalam kompos dan aduk. Potongan yang kecil lebih cepat terurai." Hubungan kedua kalimat tersebut adalah …',
        opsi: [
            'kalimat kedua memberi contoh sampah yang dipotong',
            'kalimat kedua menyatakan langkah berikutnya setelah kalimat pertama',
            'kalimat kedua menjelaskan alasan perintah pada kalimat pertama',
            'kalimat kedua bertentangan dengan kalimat pertama'
        ],
        kunci: 2,
        pembahasan: 'Kalimat pertama berisi perintah memotong kecil-kecil. Kalimat kedua menjawab "mengapa harus dipotong kecil?", yaitu karena lebih cepat terurai. Jadi, kalimat kedua adalah alasan.'
    },
    {
        id: 'BIN-017', bacaan: 'B05', bentuk: 'MCMA', kompetensi: 'K02', kesulitan: 'sulit',
        pertanyaan: 'Kompos di keranjang Rani terasa sangat basah. Informasi dari teks yang dapat Rani gunakan untuk mengatasinya adalah …',
        opsi: [
            'Menambahkan daun kering ke dalam kompos.',
            'Memercikkan sedikit air setiap hari.',
            'Menambahkan serbuk gergaji ke dalam kompos.',
            'Memindahkan keranjang ke bawah sinar matahari langsung.',
            'Menambah kompos jadi hingga keranjang penuh.'
        ],
        kunci: [0, 2],
        pembahasan: 'Langkah keenam menyebutkan, "Jika terlalu basah, tambahkan serbuk gergaji atau daun kering." Memercikkan air dilakukan bila kompos kering. Keranjang harus di tempat teduh, dan kompos jadi hanya diisi setengah keranjang.'
    },
    {
        id: 'BIN-018', bacaan: 'B05', bentuk: 'BS', kompetensi: 'K17', kesulitan: 'sedang',
        pertanyaan: 'Tentukan apakah setiap pernyataan berikut sesuai (Benar) atau tidak sesuai (Salah) dengan petunjuk dalam teks.',
        opsi: [
            'Kardus dipasang agar kompos tidak tercecer melalui lubang keranjang.',
            'Kompos jadi dimasukkan sampai keranjang penuh.',
            'Sampah baru boleh ditambahkan setiap hari sampai keranjang penuh.',
            'Kompos yang matang berbau seperti sayur busuk.'
        ],
        kunci: [true, false, true, false],
        pembahasan: '(1) Benar, sesuai langkah pertama. (2) Salah: kompos jadi dimasukkan kira-kira setengah keranjang. (3) Benar: langkah keempat diulang setiap hari sampai keranjang penuh. (4) Salah: kompos matang berbau seperti tanah.'
    },
    {
        id: 'BIN-019', bacaan: 'B06', bentuk: 'PG', kompetensi: 'K14', kesulitan: 'sulit',
        pertanyaan: 'Penilaian yang paling tepat tentang isi laporan kunjungan tersebut adalah …',
        opsi: [
            'Laporan kurang lengkap karena tidak menyebutkan tujuan kunjungan.',
            'Laporan sudah lengkap karena hanya berisi data jumlah sapi dan jumlah susu.',
            'Laporan kurang tepat karena seluruh isinya berupa pendapat siswa.',
            'Laporan sudah lengkap karena memuat waktu dan tujuan kunjungan, hasil pengamatan, dan kesimpulan.'
        ],
        kunci: 3,
        pembahasan: 'Paragraf pertama memuat waktu dan tujuan, paragraf kedua sampai keempat memuat hasil pengamatan, dan paragraf terakhir berisi kesimpulan. Laporan juga memuat banyak fakta, tidak hanya pendapat, dan tidak hanya berisi angka.'
    },
    {
        id: 'BIN-020', bacaan: 'B06', bentuk: 'PG', kompetensi: 'K09', kesulitan: 'sedang',
        pertanyaan: 'Simpulan yang tepat berdasarkan isi laporan tersebut adalah …',
        opsi: [
            'Peternakan Lembah Hijau adalah peternakan sapi terbesar di daerahnya.',
            'Memerah sapi dengan mesin lebih baik daripada memerah dengan tangan.',
            'Susu yang kita minum dihasilkan melalui proses yang menuntut kebersihan dan ketelitian, mulai dari kandang hingga penyimpanan.',
            'Sapi perah cukup diberi makan rumput agar menghasilkan banyak susu.'
        ],
        kunci: 2,
        pembahasan: 'Laporan menjelaskan kebersihan kandang, pemerahan, penyaringan, pendinginan, dan pakan, lalu ditutup dengan kesimpulan yang sama dengan pilihan C. Pilihan A dan B tidak dibahas, dan D salah karena pakan juga berisi konsentrat.'
    },
    {
        id: 'BIN-021', bacaan: 'B06', bentuk: 'PG', kompetensi: 'K12', kesulitan: 'sedang',
        pertanyaan: 'Kalimat yang merupakan opini dalam laporan tersebut adalah …',
        opsi: [
            'Peternakan tersebut memiliki 85 ekor sapi perah.',
            'Sapi diperah dua kali sehari, yaitu pukul 05.00 dan pukul 15.00.',
            'Seekor sapi rata-rata menghasilkan 15 liter susu setiap hari.',
            'Menurut kami, kunjungan ini adalah kegiatan belajar paling menyenangkan pada semester ini.'
        ],
        kunci: 3,
        pembahasan: 'Pilihan D berisi penilaian pribadi ("menurut kami", "paling menyenangkan") yang belum tentu sama bagi setiap orang. Pilihan A, B, dan C adalah fakta karena dapat dibuktikan dengan menghitung atau mengamati.'
    },
    {
        id: 'BIN-022', bacaan: 'B06', bentuk: 'MCMA', kompetensi: 'K02', kesulitan: 'sulit',
        pertanyaan: 'Informasi penting yang menunjukkan upaya peternakan menjaga mutu susu adalah …',
        opsi: [
            'Lantai kandang dibersihkan dua kali sehari.',
            'Susu segar langsung disaring, lalu didinginkan di dalam tangki pendingin.',
            'Peternakan tersebut memiliki 85 ekor sapi perah.',
            'Kunjungan dilakukan pada hari Kamis, 12 September.',
            'Seekor sapi rata-rata menghasilkan 15 liter susu setiap hari.'
        ],
        kunci: [0, 1],
        pembahasan: 'Kandang yang bersih menjaga susu "tetap higienis", dan susu didinginkan "agar tidak cepat rusak". Keduanya menjaga mutu. Jumlah sapi, tanggal kunjungan, dan jumlah susu tidak berkaitan dengan mutu susu.'
    },
    {
        id: 'BIN-023', bacaan: 'B07', bentuk: 'PG', kompetensi: 'K12', kesulitan: 'mudah',
        pertanyaan: 'Kalimat yang merupakan fakta dalam teks tersebut adalah …',
        opsi: [
            'Menurut saya, sudah saatnya setiap siswa membawa botol minum sendiri dari rumah.',
            'Hasil pendataan pengurus OSIS selama satu minggu menunjukkan bahwa sekolah kita menghasilkan sekitar 600 kemasan minuman plastik.',
            'Membiasakan minum air putih tentu lebih baik bagi tubuh kita yang sedang tumbuh.',
            'Kerepotan kecil itu tidak sebanding dengan manfaatnya.'
        ],
        kunci: 1,
        pembahasan: 'Pilihan B dapat dibuktikan dengan data pendataan OSIS. Pilihan A, C, dan D berisi pendapat atau penilaian penulis, ditandai kata "menurut saya", "tentu lebih baik", dan "tidak sebanding".'
    },
    {
        id: 'BIN-024', bacaan: 'B07', bentuk: 'PG', kompetensi: 'K11', kesulitan: 'sedang',
        pertanyaan: 'Tujuan penulis menulis teks tersebut adalah …',
        opsi: [
            'melaporkan hasil pendataan sampah oleh OSIS',
            'menjelaskan cara mencuci botol minum',
            'mengajak siswa membawa botol minum sendiri dari rumah',
            'mengkritik kantin karena menjual minuman manis'
        ],
        kunci: 2,
        pembahasan: 'Penulis menyampaikan pendapat di awal, memberi tiga alasan, lalu menutup dengan ajakan "Mari kita mulai dari diri sendiri". Data OSIS hanya dipakai sebagai alasan, bukan tujuan utama.'
    },
    {
        id: 'BIN-025', bacaan: 'B07', bentuk: 'PG', kompetensi: 'K14', kesulitan: 'sulit',
        pertanyaan: 'Bagian argumen yang paling lemah karena tidak disertai data atau penjelasan yang cukup adalah …',
        opsi: [
            'alasan pertama tentang mengurangi sampah',
            'alasan kedua tentang kesehatan',
            'alasan ketiga tentang berhemat',
            'paragraf terakhir yang menanggapi teman yang merasa repot'
        ],
        kunci: 2,
        pembahasan: 'Alasan ketiga hanya terdiri atas dua kalimat singkat tanpa data atau contoh. Alasan pertama didukung data OSIS, alasan kedua dijelaskan dengan kandungan gula minuman kemasan, dan paragraf terakhir sudah menanggapi keberatan disertai jalan keluar.'
    }
]);
