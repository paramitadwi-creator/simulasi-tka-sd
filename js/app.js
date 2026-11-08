const bankSoal = {
  bahasa: [
    { id: "BI01", difficulty: "mudah", type: "pg", topic: "Teks informasi · informasi tersurat", stimulus: "Perhatikan teks berikut.\n\nDi halaman sekolah terdapat tiga tempat sampah berwarna. Tempat sampah hijau digunakan untuk sampah organik, tempat sampah kuning untuk sampah anorganik, dan tempat sampah merah untuk sampah berbahaya.", question: "Tempat sampah berwarna apakah yang digunakan untuk membuang sampah organik?", options: ["Merah", "Kuning", "Hijau", "Biru"], answer: [2], explanation: "Informasi tersebut tertulis secara langsung pada kalimat kedua. Tempat sampah hijau digunakan untuk sampah organik." },
    { id: "BI02", difficulty: "sedang", type: "pg", topic: "Teks informasi · sebab-akibat", stimulus: "Warga Desa Sukaasri menanam pohon di sepanjang tepi sungai. Akar pohon membantu mengikat tanah. Ketika hujan deras, tanah di tepi sungai menjadi lebih kuat dan tidak mudah terbawa arus.", question: "Mengapa penanaman pohon dapat mengurangi pengikisan tanah di tepi sungai?", options: ["Daun pohon menghentikan seluruh hujan.", "Batang pohon mengubah tanah menjadi batu.", "Pohon membuat aliran sungai berhenti.", "Akar pohon membantu mengikat tanah."], answer: [3], explanation: "Hubungan sebab-akibatnya adalah akar pohon mengikat tanah sehingga tanah tidak mudah terkikis oleh aliran air." },
    { id: "BI03", difficulty: "sedang", type: "pg", topic: "Teks fiksi · watak tokoh", stimulus: "Rani menemukan sebuah kotak pensil di bawah meja kelas. Ia ingin segera pulang, tetapi kemudian menyerahkan kotak itu kepada guru agar pemiliknya dapat ditemukan.", question: "Watak Rani yang paling tepat berdasarkan tindakannya adalah ....", options: ["Ceroboh", "Jujur dan bertanggung jawab", "Pemarah", "Tidak peduli"], answer: [1], explanation: "Rani tidak mengambil barang yang bukan miliknya. Ia menyerahkannya kepada guru agar kembali kepada pemiliknya. Tindakan ini menunjukkan kejujuran dan tanggung jawab." },
    { id: "BI04", difficulty: "sulit", type: "pgk", topic: "Evaluasi teks · fakta dan opini", stimulus: "Bacalah dua pernyataan berikut.\n\nTeks A: Perpustakaan sekolah dibuka pukul 07.00 sampai 14.00 setiap hari sekolah.\nTeks B: Perpustakaan sekolah adalah tempat paling nyaman dan paling menyenangkan bagi semua siswa.", question: "Pilih semua pernyataan yang merupakan fakta berdasarkan kedua teks.", options: ["Perpustakaan dibuka pukul 07.00.", "Perpustakaan merupakan tempat paling nyaman.", "Perpustakaan ditutup pukul 14.00.", "Semua siswa pasti senang berada di perpustakaan."], answer: [0, 2], explanation: "Pernyataan tentang jam buka dan tutup dapat diperiksa kebenarannya dari informasi Teks A. Ungkapan paling nyaman dan semua siswa senang merupakan penilaian atau opini." },
    { id: "BI05", difficulty: "sulit", type: "pg", topic: "Evaluasi teks · simpulan dan refleksi", stimulus: "Sekolah mengurangi penggunaan gelas sekali pakai. Siswa diminta membawa botol minum sendiri. Dalam satu bulan, jumlah sampah gelas plastik di sekolah berkurang. Namun, beberapa siswa masih lupa membawa botol sehingga kantin tetap menyediakan gelas sekali pakai dalam jumlah terbatas.", question: "Simpulan paling tepat berdasarkan teks tersebut adalah ....", options: ["Program membawa botol minum tidak memberi manfaat.", "Sampah plastik hanya dapat diatasi dengan menutup kantin.", "Kebiasaan membawa botol sendiri membantu mengurangi sampah, tetapi perlu dilakukan secara konsisten.", "Sekolah harus melarang semua siswa membeli minuman."], answer: [2], explanation: "Teks menunjukkan adanya penurunan sampah setelah program berjalan, tetapi hasilnya belum maksimal karena sebagian siswa belum konsisten. Simpulan harus mencakup kedua informasi tersebut." }
  ],
  matematika: [
    // MUDAH (10 soal)
    { id: "MT01", difficulty: "mudah", type: "pg", topic: "Bilangan · operasi hitung", stimulus: "Perpustakaan kelas memiliki 125 buku cerita. Sekolah menyumbangkan 38 buku lagi.", question: "Berapa jumlah buku cerita sekarang?", options: ["153", "163", "173", "183"], answer: [1], explanation: "125 + 38 = 163 buku." },
    { id: "MT02", difficulty: "mudah", type: "pg", topic: "Bilangan · pengurangan", stimulus: "Pak Budi memanen 275 buah mangga. Sebanyak 128 buah dijual.", question: "Berapa buah mangga yang tersisa?", options: ["137", "147", "157", "167"], answer: [1], explanation: "275 − 128 = 147 buah." },
    { id: "MT03", difficulty: "mudah", type: "pg", topic: "Bilangan · perkalian", stimulus: "Ada 24 kotak pensil. Setiap kotak berisi 6 pensil.", question: "Berapa jumlah seluruh pensil?", options: ["120", "134", "144", "154"], answer: [2], explanation: "24 × 6 = 144 pensil." },
    { id: "MT04", difficulty: "mudah", type: "pg", topic: "Bilangan · pembagian", stimulus: "Sebanyak 96 buku dibagikan sama rata kepada 8 kelas.", question: "Berapa buku yang diterima setiap kelas?", options: ["10", "11", "12", "14"], answer: [2], explanation: "96 ÷ 8 = 12 buku." },
    { id: "MT05", difficulty: "mudah", type: "pg", topic: "Bilangan · pecahan", stimulus: "Sebuah pizza dipotong menjadi 8 bagian sama besar. Rina memakan 3 bagian.", question: "Pecahan yang menunjukkan bagian pizza yang dimakan Rina adalah ....", options: ["3/8", "5/8", "3/5", "8/3"], answer: [0], explanation: "Tiga dari delapan bagian ditulis 3/8." },
    { id: "MT06", difficulty: "mudah", type: "pg", topic: "Geometri · keliling persegi", stimulus: "Sebuah taman berbentuk persegi memiliki panjang sisi 9 meter.", question: "Keliling taman tersebut adalah ....", options: ["18 m", "27 m", "36 m", "81 m"], answer: [2], explanation: "Keliling persegi = 4 × sisi = 4 × 9 = 36 meter." },
    { id: "MT07", difficulty: "mudah", type: "pg", topic: "Pengukuran · konversi panjang", stimulus: "Panjang pita adalah 3 meter.", question: "Panjang pita tersebut sama dengan ....", options: ["30 cm", "300 cm", "3.000 cm", "30.000 cm"], answer: [1], explanation: "1 meter = 100 cm, sehingga 3 meter = 300 cm." },
    { id: "MT08", difficulty: "mudah", type: "pg", topic: "Pengukuran · waktu", stimulus: "Pelajaran dimulai pukul 07.00 dan berlangsung selama 90 menit.", question: "Pukul berapa pelajaran berakhir?", options: ["08.00", "08.15", "08.30", "09.00"], answer: [2], explanation: "90 menit = 1 jam 30 menit. Jadi berakhir pukul 08.30." },
    { id: "MT09", difficulty: "mudah", type: "pg", topic: "Data · membaca tabel", stimulus: "Jumlah buku yang dibaca siswa: Ani 4 buku, Budi 6 buku, Citra 3 buku, dan Dodi 5 buku.", question: "Siapa yang membaca buku paling banyak?", options: ["Ani", "Budi", "Citra", "Dodi"], answer: [1], explanation: "Jumlah terbanyak adalah 6 buku, yaitu milik Budi." },
    { id: "MT10", difficulty: "mudah", type: "pg", topic: "Geometri · sudut", stimulus: "Sebuah sudut memiliki besar 90°.", question: "Sudut tersebut disebut sudut ....", options: ["Lancip", "Siku-siku", "Tumpul", "Lurus"], answer: [1], explanation: "Sudut yang besarnya tepat 90° disebut sudut siku-siku." },

    // SEDANG (20 soal)
    { id: "MT11", difficulty: "sedang", type: "pg", topic: "Bilangan · pecahan dari jumlah", stimulus: "Sebuah kelas memiliki 40 siswa. Sebanyak 3/5 dari seluruh siswa mengikuti kegiatan membaca bersama.", question: "Berapa siswa yang mengikuti kegiatan membaca bersama?", options: ["18 siswa", "20 siswa", "24 siswa", "30 siswa"], answer: [2], explanation: "3/5 × 40 = 3 × 8 = 24 siswa." },
    { id: "MT12", difficulty: "sedang", type: "pg", topic: "Geometri · luas persegi panjang", stimulus: "Kebun sekolah berbentuk persegi panjang dengan panjang 12 meter dan lebar 7 meter.", question: "Luas kebun sekolah tersebut adalah ....", options: ["19 m²", "38 m²", "72 m²", "84 m²"], answer: [3], explanation: "Luas = panjang × lebar = 12 × 7 = 84 m²." },
    { id: "MT13", difficulty: "sedang", type: "pg", topic: "Bilangan · operasi campuran", stimulus: "Ibu membeli 5 kantong jeruk. Setiap kantong berisi 12 jeruk. Sebanyak 8 jeruk diberikan kepada tetangga.", question: "Berapa jeruk yang masih dimiliki ibu?", options: ["42", "48", "52", "60"], answer: [2], explanation: "Jumlah awal 5 × 12 = 60. Sisa 60 − 8 = 52. Periksa pilihan: jawaban yang benar adalah 52 (C)." },
    { id: "MT14", difficulty: "sedang", type: "pg", topic: "Bilangan · persen", stimulus: "Harga sebuah buku adalah Rp80.000. Toko memberikan diskon 25%.", question: "Berapa harga buku setelah diskon?", options: ["Rp55.000", "Rp60.000", "Rp65.000", "Rp70.000"], answer: [1], explanation: "Diskon = 25% × Rp80.000 = Rp20.000. Harga akhir = Rp60.000." },
    { id: "MT15", difficulty: "sedang", type: "pg", topic: "Bilangan · perbandingan", stimulus: "Perbandingan jumlah siswa laki-laki dan perempuan adalah 2 : 3. Jumlah seluruh siswa 25 orang.", question: "Berapa jumlah siswa perempuan?", options: ["10", "12", "15", "18"], answer: [2], explanation: "Jumlah bagian = 2 + 3 = 5. Satu bagian = 25 ÷ 5 = 5. Perempuan = 3 × 5 = 15." },
    { id: "MT16", difficulty: "sedang", type: "pg", topic: "Bilangan · FPB", stimulus: "Bu Guru memiliki 24 pensil dan 36 penghapus. Semua akan dibagikan ke beberapa paket dengan isi setiap paket sama banyak.", question: "Paket terbanyak yang dapat dibuat adalah ....", options: ["6", "8", "10", "12"], answer: [3], explanation: "FPB dari 24 dan 36 adalah 12. Jadi dapat dibuat 12 paket." },
    { id: "MT17", difficulty: "sedang", type: "pg", topic: "Bilangan · pola bilangan", stimulus: "Perhatikan pola berikut: 4, 8, 12, 16, ....", question: "Bilangan berikutnya adalah ....", options: ["18", "20", "22", "24"], answer: [1], explanation: "Pola bertambah 4. Bilangan berikutnya 16 + 4 = 20." },
    { id: "MT18", difficulty: "sedang", type: "pg", topic: "Bilangan · nilai yang belum diketahui", stimulus: "Perhatikan kalimat matematika berikut: □ + 275 = 600.", question: "Nilai yang tepat untuk mengisi kotak adalah ....", options: ["315", "325", "335", "375"], answer: [1], explanation: "□ = 600 − 275 = 325." },
    { id: "MT19", difficulty: "sedang", type: "pg", topic: "Bilangan · desimal", stimulus: "Dina membeli 1,5 kg apel dan 0,75 kg pir.", question: "Berapa kilogram jumlah buah yang dibeli Dina?", options: ["1,75 kg", "2,15 kg", "2,25 kg", "2,75 kg"], answer: [2], explanation: "1,5 + 0,75 = 2,25 kg." },
    { id: "MT20", difficulty: "sedang", type: "pg", topic: "Geometri · luas segitiga", stimulus: "Sebuah segitiga memiliki alas 14 cm dan tinggi 8 cm.", question: "Luas segitiga tersebut adalah ....", options: ["44 cm²", "56 cm²", "64 cm²", "112 cm²"], answer: [1], explanation: "Luas segitiga = 1/2 × alas × tinggi = 1/2 × 14 × 8 = 56 cm²." },
    { id: "MT21", difficulty: "sedang", type: "pg", topic: "Geometri · keliling persegi panjang", stimulus: "Sebuah lapangan memiliki panjang 18 meter dan lebar 10 meter.", question: "Panjang pagar yang diperlukan untuk mengelilingi lapangan adalah ....", options: ["28 m", "46 m", "56 m", "180 m"], answer: [2], explanation: "Keliling = 2 × (18 + 10) = 56 meter." },
    { id: "MT22", difficulty: "sedang", type: "pg", topic: "Pengukuran · berat", stimulus: "Sebuah karung beras memiliki berat 2,5 kg.", question: "Berat tersebut sama dengan ....", options: ["25 gram", "250 gram", "2.500 gram", "25.000 gram"], answer: [2], explanation: "1 kg = 1.000 gram, jadi 2,5 kg = 2.500 gram." },
    { id: "MT23", difficulty: "sedang", type: "pg", topic: "Pengukuran · volume", stimulus: "Sebuah wadah berisi 2 liter air. Kemudian ditambahkan 750 ml air.", question: "Berapa mililiter jumlah air sekarang?", options: ["2.075 ml", "2.500 ml", "2.750 ml", "3.000 ml"], answer: [2], explanation: "2 liter = 2.000 ml. Jumlahnya 2.000 + 750 = 2.750 ml." },
    { id: "MT24", difficulty: "sedang", type: "pg", topic: "Geometri · volume kubus", stimulus: "Sebuah kubus memiliki panjang rusuk 5 cm.", question: "Volume kubus tersebut adalah ....", options: ["25 cm³", "75 cm³", "100 cm³", "125 cm³"], answer: [3], explanation: "Volume kubus = rusuk × rusuk × rusuk = 5 × 5 × 5 = 125 cm³." },
    { id: "MT25", difficulty: "sedang", type: "pg", topic: "Geometri · volume balok", stimulus: "Sebuah kotak berbentuk balok memiliki panjang 10 cm, lebar 4 cm, dan tinggi 3 cm.", question: "Volume kotak tersebut adalah ....", options: ["17 cm³", "40 cm³", "120 cm³", "140 cm³"], answer: [2], explanation: "Volume balok = 10 × 4 × 3 = 120 cm³." },
    { id: "MT26", difficulty: "sedang", type: "pg", topic: "Geometri · sifat bangun ruang", stimulus: "Sebuah bangun ruang memiliki 6 sisi berbentuk persegi yang sama besar.", question: "Bangun ruang tersebut adalah ....", options: ["Balok", "Prisma segitiga", "Tabung", "Kubus"], answer: [3], explanation: "Kubus memiliki enam sisi berbentuk persegi yang sama besar." },
    { id: "MT27", difficulty: "sedang", type: "pg", topic: "Data · rata-rata", stimulus: "Nilai empat siswa adalah 70, 80, 90, dan 60.", question: "Rata-rata nilai keempat siswa adalah ....", options: ["70", "75", "80", "85"], answer: [1], explanation: "(70 + 80 + 90 + 60) ÷ 4 = 300 ÷ 4 = 75." },
    { id: "MT28", difficulty: "sedang", type: "pg", topic: "Data · diagram batang", stimulus: "Jumlah pengunjung perpustakaan selama empat hari: Senin 20 orang, Selasa 25 orang, Rabu 15 orang, Kamis 30 orang.", question: "Berapa selisih pengunjung terbanyak dan paling sedikit?", options: ["5 orang", "10 orang", "15 orang", "20 orang"], answer: [2], explanation: "Terbanyak 30 dan paling sedikit 15. Selisih = 30 − 15 = 15 orang." },
    { id: "MT29", difficulty: "sedang", type: "pg", topic: "Bilangan · KPK", stimulus: "Lampu A menyala setiap 4 menit dan lampu B setiap 6 menit. Keduanya menyala bersama pada pukul 08.00.", question: "Keduanya akan menyala bersama lagi pada pukul ....", options: ["08.06", "08.10", "08.12", "08.24"], answer: [2], explanation: "KPK dari 4 dan 6 adalah 12 menit. Jadi pukul 08.12." },
    { id: "MT30", difficulty: "sedang", type: "pg", topic: "Geometri · sudut", stimulus: "Sebuah sudut memiliki besar 135°.", question: "Sudut tersebut termasuk sudut ....", options: ["Lancip", "Siku-siku", "Tumpul", "Lurus"], answer: [2], explanation: "Sudut tumpul lebih dari 90° dan kurang dari 180°. Jadi 135° adalah sudut tumpul." },

    // SULIT (20 soal)
    { id: "MT31", difficulty: "sulit", type: "pgk", topic: "Data · analisis rata-rata", stimulus: "Nilai kuis lima siswa adalah 70, 80, 75, 85, dan 90.", question: "Pilih semua pernyataan yang benar tentang data tersebut.", options: ["Nilai tertinggi adalah 90.", "Nilai terendah adalah 70.", "Rata-rata nilainya adalah 80.", "Selisih nilai tertinggi dan terendah adalah 15."], answer: [0, 1, 2], explanation: "Nilai tertinggi 90, terendah 70, rata-rata 400 ÷ 5 = 80, dan selisihnya 20." },
    { id: "MT32", difficulty: "sulit", type: "pg", topic: "Bilangan · KPK dalam konteks", stimulus: "Lampu A berkedip setiap 6 detik. Lampu B berkedip setiap 8 detik. Keduanya berkedip bersama pada awal pengamatan.", question: "Setelah berapa detik kedua lampu akan berkedip bersama lagi?", options: ["12 detik", "18 detik", "24 detik", "48 detik"], answer: [2], explanation: "KPK dari 6 dan 8 adalah 24." },
    { id: "MT33", difficulty: "sulit", type: "pg", topic: "Bilangan · operasi pecahan", stimulus: "Ibu memiliki 2 1/2 kg tepung. Sebanyak 3/4 kg digunakan untuk membuat kue.", question: "Berapa kilogram tepung yang tersisa?", options: ["1 1/4 kg", "1 1/2 kg", "1 3/4 kg", "2 1/4 kg"], answer: [2], explanation: "2 1/2 = 10/4. Sisa = 10/4 − 3/4 = 7/4 = 1 3/4 kg." },
    { id: "MT34", difficulty: "sulit", type: "pg", topic: "Bilangan · persen bertingkat", stimulus: "Sebuah tas berharga Rp200.000 mendapat diskon 20%. Setelah diskon, pembeli memperoleh potongan tambahan Rp10.000.", question: "Berapa harga akhir tas tersebut?", options: ["Rp140.000", "Rp150.000", "Rp160.000", "Rp170.000"], answer: [1], explanation: "Diskon 20% × Rp200.000 = Rp40.000. Harga setelah diskon Rp160.000. Potongan tambahan Rp10.000, jadi Rp150.000." },
    { id: "MT35", difficulty: "sulit", type: "pg", topic: "Bilangan · perbandingan senilai", stimulus: "Untuk membuat 12 gelas jus diperlukan 900 ml air. Resep dibuat dengan perbandingan yang sama.", question: "Berapa mililiter air yang diperlukan untuk membuat 20 gelas jus?", options: ["1.200 ml", "1.350 ml", "1.500 ml", "1.800 ml"], answer: [2], explanation: "900 ÷ 12 = 75 ml per gelas. Untuk 20 gelas: 20 × 75 = 1.500 ml." },
    { id: "MT36", difficulty: "sulit", type: "pg", topic: "Bilangan · FPB dalam konteks", stimulus: "Terdapat 48 kelereng merah dan 60 kelereng biru. Kelereng akan dimasukkan ke kantong-kantong dengan jumlah setiap warna sama pada setiap kantong.", question: "Berapa kantong terbanyak yang dapat dibuat tanpa sisa?", options: ["6", "10", "12", "15"], answer: [2], explanation: "FPB dari 48 dan 60 adalah 12. Jadi dapat dibuat 12 kantong." },
    { id: "MT37", difficulty: "sulit", type: "pg", topic: "Bilangan · pola bilangan", stimulus: "Perhatikan pola: 2, 6, 12, 20, 30, ....", question: "Bilangan berikutnya adalah ....", options: ["36", "40", "42", "44"], answer: [2], explanation: "Selisihnya berturut-turut 4, 6, 8, dan 10. Selisih berikutnya 12, sehingga 30 + 12 = 42." },
    { id: "MT38", difficulty: "sulit", type: "pg", topic: "Bilangan · kalimat matematika", stimulus: "Tiga kotak berisi jumlah kelereng yang sama. Setelah ditambah 5 kelereng, jumlah seluruhnya menjadi 29.", question: "Berapa kelereng dalam setiap kotak sebelum ditambah?", options: ["6", "7", "8", "9"], answer: [2], explanation: "Misalkan isi setiap kotak x. Maka 3x + 5 = 29. Jadi 3x = 24 dan x = 8. Jawaban yang benar adalah 8 (C)." },
    { id: "MT39", difficulty: "sulit", type: "pg", topic: "Geometri · luas gabungan", stimulus: "Sebuah bangun terdiri atas persegi panjang berukuran 12 cm × 8 cm dan persegi berukuran sisi 4 cm yang menempel di salah satu sisinya tanpa menutupi bagian persegi panjang.", question: "Berapakah luas seluruh bangun tersebut?", options: ["96 cm²", "104 cm²", "112 cm²", "128 cm²"], answer: [2], explanation: "Luas persegi panjang = 12 × 8 = 96 cm². Luas persegi = 4 × 4 = 16 cm². Total = 112 cm²." },
    { id: "MT40", difficulty: "sulit", type: "pg", topic: "Geometri · luas lingkaran", stimulus: "Sebuah kolam berbentuk lingkaran memiliki jari-jari 7 meter. Gunakan π = 22/7.", question: "Luas permukaan kolam adalah ....", options: ["44 m²", "77 m²", "154 m²", "308 m²"], answer: [2], explanation: "Luas lingkaran = π × r × r = 22/7 × 7 × 7 = 154 m²." },
    { id: "MT41", difficulty: "sulit", type: "pg", topic: "Geometri · volume gabungan", stimulus: "Sebuah bangun tersusun dari dua balok yang tidak saling bertumpuk. Balok pertama berukuran 8 cm × 5 cm × 4 cm dan balok kedua 4 cm × 3 cm × 2 cm.", question: "Volume seluruh bangun adalah ....", options: ["160 cm³", "184 cm³", "200 cm³", "224 cm³"], answer: [1], explanation: "Volume pertama = 160 cm³. Volume kedua = 24 cm³. Total = 184 cm³." },
    { id: "MT42", difficulty: "sulit", type: "pg", topic: "Pengukuran · waktu dan kecepatan sederhana", stimulus: "Sebuah bus berangkat pukul 07.35. Perjalanan berlangsung selama 2 jam 45 menit.", question: "Pukul berapa bus tiba?", options: ["09.50", "10.10", "10.20", "10.30"], answer: [2], explanation: "07.35 + 2 jam = 09.35. Ditambah 45 menit = 10.20." },
    { id: "MT43", difficulty: "sulit", type: "pg", topic: "Pengukuran · konversi satuan", stimulus: "Sebuah tangki berisi 3,5 liter air. Sebanyak 850 ml digunakan untuk menyiram tanaman.", question: "Berapa mililiter air yang tersisa?", options: ["2.550 ml", "2.650 ml", "2.750 ml", "2.850 ml"], answer: [1], explanation: "3,5 liter = 3.500 ml. Sisa = 3.500 − 850 = 2.650 ml." },
    { id: "MT44", difficulty: "sulit", type: "pg", topic: "Geometri · sifat bangun ruang", stimulus: "Sebuah bangun ruang memiliki dua sisi berbentuk lingkaran yang sejajar dan satu sisi lengkung.", question: "Bangun ruang tersebut adalah ....", options: ["Tabung", "Kerucut", "Bola", "Prisma"], answer: [0], explanation: "Tabung memiliki dua alas berbentuk lingkaran yang sejajar dan satu selimut lengkung." },
    { id: "MT45", difficulty: "sulit", type: "pgk", topic: "Data · analisis data", stimulus: "Data tinggi tanaman (cm) adalah 12, 15, 10, 18, dan 15.", question: "Pilih semua pernyataan yang benar.", options: ["Nilai tertinggi adalah 18 cm.", "Nilai terendah adalah 12 cm.", "Rata-rata adalah 14 cm.", "Modus data adalah 18 cm."], answer: [0, 2], explanation: "Urutkan data: 10, 12, 15, 15, 18. Nilai tertinggi 18 cm (benar). Nilai terendah 10 cm, bukan 12 cm (salah). Rata-rata (12 + 15 + 10 + 18 + 15) ÷ 5 = 70 ÷ 5 = 14 cm (benar). Modus adalah nilai yang paling sering muncul, yaitu 15 cm, bukan 18 cm (salah). Jadi pernyataan yang benar adalah pernyataan 1 dan 3." },
    { id: "MT46", difficulty: "sulit", type: "pg", topic: "Data · interpretasi tabel", stimulus: "Jumlah pengunjung museum: Senin 40 orang, Selasa 55 orang, Rabu 45 orang, Kamis 60 orang. Target rata-rata pengunjung adalah 50 orang per hari.", question: "Berapa orang tambahan yang dibutuhkan pada hari Jumat agar rata-rata lima hari menjadi 50 orang?", options: ["40 orang", "45 orang", "50 orang", "55 orang"], answer: [2], explanation: "Target total = 5 × 50 = 250. Total empat hari = 200. Jadi Jumat harus 50 orang." },
    { id: "MT47", difficulty: "sulit", type: "pg", topic: "Peluang · kemungkinan sederhana", stimulus: "Dalam sebuah kantong terdapat 5 bola merah, 3 bola biru, dan 2 bola kuning. Satu bola diambil tanpa melihat.", question: "Warna bola yang memiliki peluang paling besar untuk terambil adalah ....", options: ["Merah", "Biru", "Kuning", "Semua sama"], answer: [0], explanation: "Bola merah berjumlah 5, paling banyak dibandingkan warna lainnya." },
    { id: "MT48", difficulty: "sulit", type: "pgk", topic: "Bilangan · membandingkan pecahan", stimulus: "Perhatikan pecahan 1/2, 3/4, 2/3, dan 5/8.", question: "Pilih semua pecahan yang nilainya lebih besar dari 0,6.", options: ["1/2", "3/4", "2/3", "5/8"], answer: [1, 2, 3], explanation: "1/2 = 0,5; 3/4 = 0,75; 2/3 sekitar 0,667; 5/8 = 0,625. Tiga pecahan terakhir lebih besar dari 0,6." },
    { id: "MT49", difficulty: "sulit", type: "pg", topic: "Geometri · keliling dan luas", stimulus: "Sebuah persegi panjang memiliki keliling 50 cm. Panjangnya 15 cm.", question: "Berapakah luas persegi panjang tersebut?", options: ["100 cm²", "125 cm²", "150 cm²", "175 cm²"], answer: [2], explanation: "Keliling 2 × (p + l) = 50, sehingga p + l = 25. Lebar = 25 − 15 = 10 cm. Luas = 15 × 10 = 150 cm²." },
    { id: "MT50", difficulty: "sulit", type: "pg", topic: "Bilangan · penalaran operasi", stimulus: "Sebuah toko memiliki 240 buku. Pada pagi hari terjual 1/4 bagian. Pada sore hari terjual 1/3 dari buku yang tersisa.", question: "Berapa buku yang masih tersisa setelah penjualan sore?", options: ["100 buku", "110 buku", "120 buku", "130 buku"], answer: [2], explanation: "Pagi terjual 1/4 × 240 = 60, sisa 180. Sore terjual 1/3 × 180 = 60. Sisa akhir 180 − 60 = 120 buku." },
  
  {
  id: "MT51",
  difficulty: "sulit",
  type: "pgk_kategori",
  topic: "Data · analisis rata-rata",
  stimulus: "Nilai kuis lima siswa adalah 70, 80, 75, 85, dan 90.",
  question: "Tentukan kategori yang tepat untuk setiap pernyataan.",
  statements: [
    "Nilai tertinggi adalah 90.",
    "Nilai terendah adalah 70.",
    "Rata-rata nilainya adalah 80.",
    "Selisih nilai tertinggi dan terendah adalah 15."
  ],
  categories: ["Benar", "Salah"],
  answer: [0, 0, 0, 1],
  explanation: "Nilai tertinggi 90, terendah 70, rata-rata 400 ÷ 5 = 80, dan selisihnya 20.",
},
],

  ipas: [
    { id: "IP01", difficulty: "mudah", type: "pg", topic: "Makhluk hidup · fotosintesis", stimulus: "Tumbuhan hijau memiliki daun yang umumnya berwarna hijau karena mengandung klorofil.", question: "Bagian tumbuhan yang paling banyak menjadi tempat berlangsungnya fotosintesis adalah ....", options: ["Akar", "Daun", "Bunga", "Buah"], answer: [1], explanation: "Fotosintesis terutama berlangsung pada daun karena daun mengandung banyak klorofil untuk menangkap energi cahaya." },
    { id: "IP02", difficulty: "sedang", type: "pg", topic: "Ekosistem · rantai makanan", stimulus: "Di sawah terdapat padi, belalang, katak, ular, dan elang. Belalang memakan padi, katak memakan belalang, ular memakan katak, dan elang memangsa ular.", question: "Jika jumlah katak menurun drastis, perubahan yang paling mungkin terjadi pada awalnya adalah ....", options: ["Jumlah belalang meningkat.", "Jumlah padi langsung habis.", "Jumlah elang pasti meningkat.", "Jumlah ular meningkat karena lebih banyak makanan."], answer: [0], explanation: "Katak merupakan pemangsa belalang. Jika katak berkurang, tekanan pemangsaan terhadap belalang menurun sehingga jumlah belalang berpeluang meningkat." },
    { id: "IP03", difficulty: "sedang", type: "pg", topic: "Energi · perubahan energi", stimulus: "Sebuah kipas angin dihubungkan ke sumber listrik dan kemudian berputar.", question: "Perubahan energi utama yang terjadi pada kipas angin adalah ....", options: ["Energi gerak menjadi energi listrik", "Energi listrik menjadi energi gerak", "Energi cahaya menjadi energi panas", "Energi kimia menjadi energi bunyi"], answer: [1], explanation: "Motor pada kipas menggunakan energi listrik untuk menghasilkan gerakan putaran baling-baling. Sebagian energi juga berubah menjadi bunyi dan panas." },
    { id: "IP04", difficulty: "sulit", type: "pgk", topic: "Sistem organ · peredaran darah", stimulus: "Saat berlari, denyut jantung dan frekuensi napas seseorang meningkat. Otot membutuhkan lebih banyak oksigen untuk menghasilkan energi.", question: "Pilih semua penjelasan yang tepat.", options: ["Jantung memompa darah lebih cepat untuk membantu mengirim oksigen.", "Paru-paru membantu memasukkan oksigen ke dalam tubuh.", "Darah tidak lagi diperlukan untuk mengangkut zat ke otot.", "Frekuensi napas meningkat untuk memenuhi kebutuhan oksigen."], answer: [0, 1, 3], explanation: "Saat aktivitas meningkat, otot memerlukan lebih banyak oksigen. Paru-paru memasukkan oksigen dan jantung membantu mengedarkannya melalui darah. Darah tetap penting untuk mengangkut oksigen." },
    { id: "IP05", difficulty: "sulit", type: "pg", topic: "Bumi dan alam semesta · siklus air", stimulus: "Pada musim kemarau panjang, beberapa sumur warga mulai mengering. Di wilayah tersebut, hujan jarang turun dan sebagian lahan resapan berubah menjadi permukiman berlapis beton.", question: "Penjelasan paling tepat tentang kondisi tersebut adalah ....", options: ["Air tanah bertambah karena permukaan beton menahan air hujan.", "Berkurangnya hujan dan daerah resapan mengurangi pengisian kembali air tanah.", "Air tanah berubah menjadi udara karena suhu siang hari.", "Sumur mengering karena air hujan tidak dapat mengalir di sungai."], answer: [1], explanation: "Air hujan yang meresap ke tanah membantu mengisi cadangan air tanah. Kemarau mengurangi pasokan hujan, sedangkan permukaan beton menghambat peresapan sehingga sumur lebih mudah mengering." }
  ]
};

const namaMapel = { bahasa: "Bahasa Indonesia", matematika: "Matematika", ipas: "IPAS" };
let currentSubject = null, currentMode = "practice", currentQuestions = [], currentIndex = 0;
let answers = {}, flagged = new Set(), timerId = null, secondsLeft = 600, hasSubmitted = false;
let checkedAnswers = new Set();

// Versi aset; samakan dengan ?v= pada index.html setiap kali file JS/CSS berubah
const VERSI_APLIKASI = "2026.11.09-14";

// Bila index.html lama masih tersimpan di cache browser, data kisi-kisi
// belum ikut dimuat. Muat sendiri agar Peta Hasil Belajar tetap tersedia.
if (!window.kisiKisiTKA) {
  const skripKisi = document.createElement("script");
  skripKisi.src = "js/kisi-kisi.js?v=" + VERSI_APLIKASI;
  document.head.appendChild(skripKisi);
}

// =====================================================================
// JUMLAH SOAL, DURASI, KOMPOSISI KESULITAN & BENTUK SOAL PER SESI
// =====================================================================
const JUMLAH_SOAL_MODE = { practice: 15, exam: 30, adaptive: 30 };
// Durasi pengerjaan per sesi (detik)
const DURASI_MODE = { practice: 45 * 60, exam: 90 * 60, adaptive: 90 * 60 };
const KOMPOSISI_KESULITAN = { mudah: 0.2, sedang: 0.4, sulit: 0.4 };
const URUTAN_KESULITAN = ["mudah", "sedang", "sulit"];
// Bentuk soal campuran: 2/3 PG, 1/3 PGK (30 → 20 PG + 10 PGK, 15 → 10 PG + 5 PGK).
// PGK terdiri atas pilih-banyak (pgk) dan Benar/Salah (pgk_kategori), kira-kira 3 : 2.
const PORSI_PGK = 1 / 3;
const PORSI_PGK_PILIH_BANYAK = 0.6;

const bentukSoal = q => q.type === "pg" ? "PG" : "PGK";
const selSoal = q => q.difficulty + "|" + bentukSoal(q);

// Target banyak soal per tingkat, mis. 30 → 6/12/12, 15 → 3/6/6
function targetKesulitan(jumlah) {
  const mudah = Math.round(jumlah * KOMPOSISI_KESULITAN.mudah);
  const sedang = Math.round(jumlah * KOMPOSISI_KESULITAN.sedang);
  return { mudah, sedang, sulit: jumlah - mudah - sedang };
}

// Target per sel (tingkat × bentuk). Kesulitan selalu tepat; soal PGK
// ditempatkan pada tingkat yang memiliki stok PGK (umumnya sedang & sulit).
function targetKomposisi(pool, jumlah) {
  const perTingkat = targetKesulitan(jumlah);
  const totalPGK = Math.round(jumlah * PORSI_PGK);

  const stokPGK = {};
  URUTAN_KESULITAN.forEach(t => {
    stokPGK[t] = pool.filter(q => q.difficulty === t && bentukSoal(q) === "PGK").length;
  });

  // Bagi PGK sebanding target tingkat, dibatasi stok (sisa pembagian terbesar)
  const pgk = { mudah: 0, sedang: 0, sulit: 0 };
  let sisa = totalPGK;
  for (let putaran = 0; putaran < 5 && sisa > 0; putaran++) {
    const bisa = URUTAN_KESULITAN.filter(t =>
      pgk[t] < Math.min(stokPGK[t], perTingkat[t])
    );
    const bobot = bisa.reduce((total, t) => total + perTingkat[t], 0);
    if (!bobot) break;

    const jatah = bisa.map(t => {
      const ideal = sisa * perTingkat[t] / bobot;
      return { t, bulat: Math.floor(ideal), pecahan: ideal - Math.floor(ideal) };
    });
    let terbagi = 0;
    jatah.forEach(j => {
      const tambah = Math.min(j.bulat, Math.min(stokPGK[j.t], perTingkat[j.t]) - pgk[j.t]);
      pgk[j.t] += tambah; terbagi += tambah;
    });
    jatah.sort((a, b) => b.pecahan - a.pecahan).forEach(j => {
      if (terbagi < sisa && pgk[j.t] < Math.min(stokPGK[j.t], perTingkat[j.t])) {
        pgk[j.t]++; terbagi++;
      }
    });
    sisa -= terbagi;
    if (!terbagi) break;
  }

  const sel = {};
  URUTAN_KESULITAN.forEach(t => {
    sel[t + "|PGK"] = pgk[t];
    sel[t + "|PG"] = perTingkat[t] - pgk[t];
  });

  const totalPGKAkhir = pgk.mudah + pgk.sedang + pgk.sulit;
  const jenisPGK = {
    pgk: Math.round(totalPGKAkhir * PORSI_PGK_PILIH_BANYAK),
    pgk_kategori: totalPGKAkhir - Math.round(totalPGKAkhir * PORSI_PGK_PILIH_BANYAK)
  };

  return { perTingkat, sel, jenisPGK };
}

function acakSalinan(daftar) {
  const hasil = daftar.slice();
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

function urutkanMenurutKesulitan(daftar) {
  return daftar.sort((a, b) =>
    URUTAN_KESULITAN.indexOf(a.difficulty) - URUTAN_KESULITAN.indexOf(b.difficulty)
  );
}

function bankAdaptif(mapel) {
  return mapel === "matematika" ? (window.soalAdaptifMatematika || [])
    : mapel === "bahasa" ? (window.soalAdaptifBahasa || [])
    : mapel === "ipas" ? (window.soalAdaptifIPAS || [])
    : [];
}

// Bank soal per indikator kisi-kisi (dipakai mode Latihan & Simulasi Ujian)
function bankKisi(mapel) {
  return mapel === "matematika" ? (window.soalKisiMatematika || [])
    : mapel === "bahasa" ? (window.soalKisiBahasa || [])
    : mapel === "ipas" ? (window.soalKisiIPAS || [])
    : [];
}

// Pencatat komposisi terpilih terhadap target
function buatPencatat(target) {
  const hitungSel = {}, hitungTingkat = {}, hitungJenis = { pgk: 0, pgk_kategori: 0 };
  const ubah = (q, d) => {
    hitungSel[selSoal(q)] = (hitungSel[selSoal(q)] || 0) + d;
    hitungTingkat[q.difficulty] = (hitungTingkat[q.difficulty] || 0) + d;
    if (q.type in hitungJenis) hitungJenis[q.type] += d;
  };
  const kurangSel = q => (target.sel[selSoal(q)] || 0) - (hitungSel[selSoal(q)] || 0);
  const kurangTingkat = q => (target.perTingkat[q.difficulty] || 0) - (hitungTingkat[q.difficulty] || 0);
  const kurangJenis = q => q.type in target.jenisPGK ? target.jenisPGK[q.type] - hitungJenis[q.type] : 0;
  // Nilai prioritas: sel paling dibutuhkan, lalu tingkat, lalu jenis PGK
  const nilai = q => kurangSel(q) * 10000 + kurangTingkat(q) * 100 + kurangJenis(q);
  const terbaik = daftar => daftar.reduce((pilih, q) => (!pilih || nilai(q) > nilai(pilih)) ? q : pilih, null);
  const selLebih = () => Object.keys(target.sel).filter(k => (hitungSel[k] || 0) > target.sel[k]);
  const selKurang = () => Object.keys(target.sel).filter(k => (hitungSel[k] || 0) < target.sel[k]);
  return { tambah: q => ubah(q, 1), kurangi: q => ubah(q, -1), terbaik, selLebih, selKurang };
}

// Mode latihan & simulasi: bank biasa + bank adaptif mapel tersebut,
// diambil acak per sel (tingkat × bentuk) dan digilir antartopik.
function pilihSoalBerimbang(pool, jumlah) {
  const target = targetKomposisi(pool, jumlah);
  const catat = buatPencatat(target);
  const terpakai = new Set();
  const terpilih = [];
  const ambil = q => { terpilih.push(q); terpakai.add(q.id); catat.tambah(q); };

  Object.entries(target.sel).forEach(([sel, banyak]) => {
    const kelompok = new Map();
    acakSalinan(pool.filter(q => selSoal(q) === sel)).forEach(q => {
      const kunci = q.kodeKompetensi || q.topic;
      if (!kelompok.has(kunci)) kelompok.set(kunci, []);
      kelompok.get(kunci).push(q);
    });

    const antrean = acakSalinan([...kelompok.values()]);
    let diambil = 0;
    while (diambil < banyak && antrean.some(d => d.length)) {
      for (const daftar of antrean) {
        if (diambil >= banyak || !daftar.length) continue;
        // pada sel PGK, utamakan jenis PGK yang masih kurang
        const q = sel.endsWith("PGK") ? catat.terbaik(daftar) : daftar[0];
        daftar.splice(daftar.indexOf(q), 1);
        ambil(q); diambil++;
      }
    }
  });

  // Bila stok satu sel kurang, lengkapi dengan soal yang paling mendekati target
  while (terpilih.length < jumlah) {
    const q = catat.terbaik(pool.filter(x => !terpakai.has(x.id)));
    if (!q) break;
    ambil(q);
  }

  return urutkanMenurutKesulitan(terpilih);
}

// Mode adaptif: penuhi kuota tiap kompetensi sekaligus target kesulitan & bentuk.
// kelompokSoal: Map kode → daftar soal (sudah diacak); urutan: kode berulang sesuai kuota.
function pilihSoalAdaptif(kelompokSoal, urutan, jumlah) {
  const semua = [...kelompokSoal.values()].flat();
  const target = targetKomposisi(semua, jumlah);
  const catat = buatPencatat(target);
  const sisa = new Map([...kelompokSoal].map(([kode, daftar]) => [kode, daftar.slice()]));
  const terpilih = [];

  const kuota = new Map();
  urutan.forEach(kode => kuota.set(kode, (kuota.get(kode) || 0) + 1));

  const ambil = q => {
    const daftar = sisa.get(q.kodeKompetensi);
    daftar.splice(daftar.indexOf(q), 1);
    terpilih.push(q);
    catat.tambah(q);
  };
  const lepas = q => {
    terpilih.splice(terpilih.indexOf(q), 1);
    sisa.get(q.kodeKompetensi).push(q);
    catat.kurangi(q);
  };

  // 1. Penuhi kuota kompetensi; kompetensi dengan stok sedikit diproses lebih dulu
  [...kuota]
    .sort((a, b) => (sisa.get(a[0])?.length || 0) - (sisa.get(b[0])?.length || 0))
    .forEach(([kode, banyak]) => {
      for (let i = 0; i < banyak; i++) {
        const daftar = sisa.get(kode) || [];
        if (!daftar.length) break;
        ambil(catat.terbaik(daftar));
      }
    });

  // 2. Bila ada kompetensi yang stoknya habis, lengkapi dari kompetensi berkuota, lalu kompetensi lain
  const kodeBerkuota = [...kuota.keys()];
  const kodeLain = [...sisa.keys()].filter(kode => !kuota.has(kode));
  const kodeUrut = [...kodeBerkuota, ...kodeLain];
  while (terpilih.length < jumlah) {
    const calon = kodeUrut.flatMap(kode => sisa.get(kode) || []);
    if (!calon.length) break;
    ambil(catat.terbaik(calon));
  }

  // 3. Perbaiki komposisi dengan menukar soal dari sel berlebih ke sel yang kurang.
  //    Aturan tukar: di dalam kompetensi yang sama selalu boleh; antar-kompetensi
  //    boleh bila kompetensi asal masih punya soal lain, atau bila penggantinya
  //    kompetensi yang belum muncul (banyak kompetensi yang tampil tetap sama).
  const cariTukar = (sL, sK) => {
    for (const q of terpilih.filter(q => selSoal(q) === sL)) {
      const pengganti = sisa.get(q.kodeKompetensi).find(x => selSoal(x) === sK);
      if (pengganti) return { lama: q, baru: pengganti };
    }
    const banyakPerKode = {};
    terpilih.forEach(q => { banyakPerKode[q.kodeKompetensi] = (banyakPerKode[q.kodeKompetensi] || 0) + 1; });
    const calonBaru = kodeUrut.flatMap(kode => sisa.get(kode) || []).filter(x => selSoal(x) === sK);
    const urutLama = terpilih
      .filter(q => selSoal(q) === sL)
      .sort((a, b) => banyakPerKode[b.kodeKompetensi] - banyakPerKode[a.kodeKompetensi]);
    for (const q of urutLama) {
      const pengganti = banyakPerKode[q.kodeKompetensi] > 1
        ? calonBaru[0]
        : calonBaru.find(x => !banyakPerKode[x.kodeKompetensi]);
      if (pengganti) return { lama: q, baru: pengganti };
    }
    return null;
  };
  const tukar = ({ lama, baru }) => { lepas(lama); ambil(baru); };
  const batal = ({ lama, baru }) => { lepas(baru); ambil(lama); };
  const semuaSel = Object.keys(target.sel);

  for (let langkah = 0; langkah < jumlah * 6; langkah++) {
    const lebih = catat.selLebih(), kurang = catat.selKurang();
    if (!lebih.length || !kurang.length) break;

    // Utamakan pertukaran yang mempertahankan tingkat kesulitan
    const pasangan = [];
    lebih.forEach(sL => kurang.forEach(sK => {
      pasangan.push({ sL, sK, skor: sL.split("|")[0] === sK.split("|")[0] ? 0 : 1 });
    }));
    pasangan.sort((a, b) => a.skor - b.skor);

    // a. tukar langsung satu langkah
    let berhasil = false;
    for (const { sL, sK } of pasangan) {
      const t = cariTukar(sL, sK);
      if (t) { tukar(t); berhasil = true; break; }
    }

    // b. tukar dua langkah lewat sel perantara (sL → X, lalu X → sK)
    if (!berhasil) {
      cari: for (const { sL, sK } of pasangan) {
        for (const X of semuaSel) {
          if (X === sL || X === sK) continue;
          const t1 = cariTukar(sL, X);
          if (!t1) continue;
          tukar(t1);
          const t2 = cariTukar(X, sK);
          if (t2 && t2.lama !== t1.baru) { tukar(t2); berhasil = true; break cari; }
          batal(t1);
        }
      }
    }

    if (!berhasil) break;
  }

  return urutkanMenurutKesulitan(terpilih);
}

const $ = id => document.getElementById(id);
const setupModal = $("setupModal"), quizShell = $("quizShell"), resultShell = $("resultShell");

document.querySelectorAll(".subject-button").forEach(btn => btn.addEventListener("click", () => {
  currentSubject = btn.dataset.subject;
  $("setupSubjectName").textContent = namaMapel[currentSubject];
  setupModal.hidden = false;
}));
$("closeSetup").addEventListener("click", () => setupModal.hidden = true);
setupModal.addEventListener("click", e => { if (e.target === setupModal) setupModal.hidden = true; });
$("practiceMode").addEventListener("click", () => beginQuiz("practice"));
$("examMode").addEventListener("click", () => beginQuiz("exam"));
$("adaptiveMode").addEventListener("click", () => beginQuiz("adaptive"));
$("backHome").addEventListener("click", confirmExitQuiz);
$("prevButton").addEventListener("click", () => moveQuestion(-1));
$("nextButton").addEventListener("click", () => moveQuestion(1));
$("flagButton").addEventListener("click", toggleFlag);
$("finishButton").addEventListener("click", () => {
  const unanswered = currentQuestions.length - Object.keys(answers).length;
  const message = unanswered ? `Masih ada ${unanswered} soal yang belum dijawab. Selesaikan sekarang?` : "Kumpulkan jawaban sekarang?";
  if (confirm(message)) finishQuiz();
});
$("retryButton").addEventListener("click", () => beginQuiz(currentMode));
$("homeButton").addEventListener("click", returnHome);

function beginQuiz(mode) {
  currentMode = mode;
  
if (mode === "adaptive") {

  // Tentukan bank soal dan prioritas berdasarkan mata pelajaran
  
const isMatematika = currentSubject === "matematika";
const isBahasa = currentSubject === "bahasa";
const isIPAS = currentSubject === "ipas";

const bank = isMatematika
    ? (window.soalAdaptifMatematika || [])
    : isBahasa
        ? (window.soalAdaptifBahasa || [])
        : isIPAS
            ? (window.soalAdaptifIPAS || [])
            : [];

const dataPrioritas = isMatematika
    ? window.profilSiswa.prioritasMatematika
    : isBahasa
        ? window.profilSiswa.prioritasBahasaIndonesia
        : isIPAS
            ? window.profilSiswa.prioritasIPAS
            : [];


  if (!bank.length || !dataPrioritas || !dataPrioritas.length) {
    alert("Bank soal atau profil prioritas belum tersedia.");
    return;
  }

  const progres = JSON.parse(
    localStorage.getItem("tkaSkillProgress") || "{}"
  );

  // Simpan kode kompetensi dan persentase awal
 const petaPrioritas = new Map(
  dataPrioritas.map(item => [
    item.kode,
    item.tingkat === "tinggi" ? 30 :
    item.tingkat === "penguatan" ? 70 : 90
  ])
);

  const prioritas = dataPrioritas.map(item => item.kode);

  // Urutkan kompetensi dari akurasi terendah
  prioritas.sort((a, b) => {

    const cariProgres = kode =>
      progres[`${currentSubject}_${kode}`] ||
      progres[`bahasa_${kode}`] ||
      progres[`bahasa_indonesia_${kode}`];

    const dataA = cariProgres(a);
    const dataB = cariProgres(b);

    const akurasiA =
      dataA && dataA.attempted > 0
        ? dataA.accuracy
        : petaPrioritas.get(a) ?? 101;

    const akurasiB =
      dataB && dataB.attempted > 0
        ? dataB.accuracy
        : petaPrioritas.get(b) ?? 101;

    return akurasiA - akurasiB;
  });

  // Kelompokkan soal berdasarkan kompetensi
 
const kelompokSoal = new Map();

// Kelompokkan SEMUA kompetensi dalam bank soal,
// bukan hanya kompetensi prioritas.
const semuaKode = [
  ...new Set(bank.map(soal => soal.kodeKompetensi))
];

semuaKode.forEach(kode => {
  const daftar = bank.filter(
    soal => soal.kodeKompetensi === kode
  );

  // Acak soal dalam setiap kelompok kompetensi
  for (let i = daftar.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [daftar[i], daftar[j]] = [daftar[j], daftar[i]];
  }

  kelompokSoal.set(kode, daftar);
});


  // Kompetensi prioritas mendapat porsi lebih banyak
  const urutanPengambilan = [
    ...prioritas.slice(0, 2),
    ...prioritas.slice(2),
    ...prioritas.slice(0, 2)
  ];

  // Siapkan kompetensi lain sebagai cadangan penguatan
  const kodeLain = [
    ...new Set(bank.map(soal => soal.kodeKompetensi))
  ].filter(kode => !prioritas.includes(kode));

  // Acak kompetensi cadangan
  for (let i = kodeLain.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kodeLain[i], kodeLain[j]] = [
      kodeLain[j],
      kodeLain[i]
    ];
  }
// Matematika: distribusi soal adaptif khusus

// MATEMATIKA: KUOTA ADAPTIF DINAMIS
if (currentSubject === "matematika") {
  urutanPengambilan.length = 0;

  // Ikuti daftar prioritas di profil siswa
  const daftarKompetensiMT = dataPrioritas.map(item => item.kode);

  const kuotaDinamisMT = daftarKompetensiMT.map(kode => {
    const stok = kelompokSoal.get(kode)?.length || 0;

    const data = progres[`${currentSubject}_${kode}`] || null;

    const itemPrioritas = dataPrioritas.find(
      item => item.kode === kode
    );

    const akurasi = data?.accuracy ??
      itemPrioritas?.persentase ?? 50;

    return {
      kode,
      stok,
      akurasi,
      bobot: Math.max(10, 100 - akurasi),
      kuota: stok > 0 ? 1 : 0
    };
  });

  let sisaSoal = JUMLAH_SOAL_MODE.adaptive - kuotaDinamisMT.reduce(
    (total, item) => total + item.kuota,
    0
  );

  while (sisaSoal > 0) {
    const kandidat = kuotaDinamisMT
      .filter(item => item.kuota < item.stok)
      .sort((a, b) =>
        (b.bobot / (b.kuota + 1)) -
        (a.bobot / (a.kuota + 1))
      );

    if (kandidat.length === 0) break;

    kandidat[0].kuota++;
    sisaSoal--;
  }

  kuotaDinamisMT.forEach(item => {
    for (let i = 0; i < item.kuota; i++) {
      urutanPengambilan.push(item.kode);
    }
  });

  console.log("KUOTA DINAMIS MATEMATIKA:", kuotaDinamisMT);
  console.log("TOTAL KUOTA MATEMATIKA:", urutanPengambilan.length);
}
 

  

 // BAHASA INDONESIA: KUOTA ADAPTIF DINAMIS + ROTASI
if (currentSubject === "bahasa") {
  urutanPengambilan.length = 0;

  // KOMPETENSI PRIORITAS: porsi utama (60%), dibagi menurut akurasi
  const JUMLAH_SOAL_PRIORITAS = Math.round(JUMLAH_SOAL_MODE.adaptive * 0.6);

  // Perkiraan akurasi bila belum ada progres maupun persentase
  const akurasiTingkat = {
    tinggi: 20, intensif: 50, penguatan: 67, pemantapan: 82, pengayaan: 95
  };

  const kuotaPrioritas = dataPrioritas
    .filter(item => (kelompokSoal.get(item.kode)?.length || 0) > 0)
    .map(item => {
      const data =
        progres[`bahasa_${item.kode}`] ||
        progres[`bahasa_indonesia_${item.kode}`];

      const akurasi = data?.attempted > 0
        ? data.accuracy
        : item.persentase ?? akurasiTingkat[item.tingkat] ?? 50;

      return {
        kode: item.kode,
        stok: kelompokSoal.get(item.kode).length,
        akurasi,
        bobot: Math.max(10, 100 - akurasi),
        kuota: 1
      };
    });

  let sisaPrioritas = Math.min(JUMLAH_SOAL_PRIORITAS, JUMLAH_SOAL_MODE.adaptive) -
    kuotaPrioritas.length;

  while (sisaPrioritas > 0) {
    const kandidat = kuotaPrioritas
      .filter(item => item.kuota < item.stok)
      .sort((a, b) =>
        (b.bobot / (b.kuota + 1)) -
        (a.bobot / (a.kuota + 1))
      );

    if (kandidat.length === 0) break;

    kandidat[0].kuota++;
    sisaPrioritas--;
  }

  const kodePrioritas = kuotaPrioritas.map(item => item.kode);
  const totalKuotaPrioritas = kuotaPrioritas.reduce(
    (total, item) => total + item.kuota,
    0
  );

  // Kelompok kompetensi lain (non-prioritas) untuk rotasi
  const kodeTKS = [...kelompokSoal.keys()]
    .filter(kode =>
      kode.startsWith("BIN-TKS-") && !kodePrioritas.includes(kode)
    )
    .sort();

  const kodeINF = [...kelompokSoal.keys()]
    .filter(kode =>
      kode.startsWith("BIN-INF-") && !kodePrioritas.includes(kode)
    )
    .sort();

  const kodeEVA = [...kelompokSoal.keys()]
    .filter(kode =>
      kode.startsWith("BIN-EVA-") && !kodePrioritas.includes(kode)
    )
    .sort();

  // Menghitung rata-rata akurasi setiap kelompok
  function rataAkurasiBahasa(daftar) {
    if (daftar.length === 0) return 50;

    const nilai = daftar.map(kode => {
      const data =
        progres[`bahasa_${kode}`] ||
        progres[`bahasa_indonesia_${kode}`];

      return data?.accuracy ?? 50;
    });

    return nilai.reduce((a, b) => a + b, 0) / nilai.length;
  }

  const kelompokBahasa = [
    {
      nama: "TKS",
      daftar: kodeTKS,
      dasar: 7,
      akurasi: rataAkurasiBahasa(kodeTKS),
      kuota: 0
    },
    {
      nama: "INF",
      daftar: kodeINF,
      dasar: 5,
      akurasi: rataAkurasiBahasa(kodeINF),
      kuota: 0
    },
    {
      nama: "EVA",
      daftar: kodeEVA,
      dasar: 4,
      akurasi: rataAkurasiBahasa(kodeEVA),
      kuota: 0
    }
  ];

  // Bobot lebih besar untuk kelompok dengan akurasi lebih rendah
  kelompokBahasa.forEach(kelompok => {
    kelompok.bobot =
      kelompok.dasar * (1 + (100 - kelompok.akurasi) / 100);
  });

  // Sisa soal untuk rotasi kompetensi non-prioritas
  let sisaSoalBahasa = JUMLAH_SOAL_MODE.adaptive - totalKuotaPrioritas;

  while (sisaSoalBahasa > 0) {
    const kandidat = kelompokBahasa
      .filter(k => k.kuota < k.daftar.length)
      .sort((a, b) =>
        (b.bobot / (b.kuota + 1)) -
        (a.bobot / (a.kuota + 1))
      );

    if (kandidat.length === 0) break;

    kandidat[0].kuota++;
    sisaSoalBahasa--;
  }

  // Fungsi rotasi kompetensi antarsesi
  function ambilRotasi(daftar, jumlah, namaKunci) {
    if (daftar.length === 0) return [];

    const kunci = `tkaRotasiBahasa_${namaKunci}`;
    const posisi = Number(localStorage.getItem(kunci)) || 0;
    const terpilih = [];

    for (let i = 0; i < Math.min(jumlah, daftar.length); i++) {
      terpilih.push(daftar[(posisi + i) % daftar.length]);
    }

    localStorage.setItem(
      kunci,
      (posisi + terpilih.length) % daftar.length
    );

    return terpilih;
  }

  const pilihanTKS = ambilRotasi(
    kodeTKS,
    kelompokBahasa[0].kuota,
    "TKS"
  );

  const pilihanINF = ambilRotasi(
    kodeINF,
    kelompokBahasa[1].kuota,
    "INF"
  );

  const pilihanEVA = ambilRotasi(
    kodeEVA,
    kelompokBahasa[2].kuota,
    "EVA"
  );

  // Soal prioritas sesuai kuotanya
  const pilihanPrioritas = kuotaPrioritas.flatMap(item =>
    Array(item.kuota).fill(item.kode)
  );

  urutanPengambilan.push(
    ...pilihanPrioritas,
    ...pilihanTKS,
    ...pilihanINF,
    ...pilihanEVA
  );

  console.table(
    kuotaPrioritas.map(item => ({
      prioritas: item.kode,
      akurasi: Math.round(item.akurasi),
      stok: item.stok,
      kuota: item.kuota
    }))
  );

  console.table(
    kelompokBahasa.map(k => ({
      kelompok: k.nama,
      akurasi: Math.round(k.akurasi),
      stokKompetensi: k.daftar.length,
      kuota: k.kuota
    }))
  );

  console.log(
    "TOTAL KUOTA BAHASA:",
    urutanPengambilan.length
  );
}

 

// IPAS: kuota dinamis berdasarkan akurasi terbaru
if (currentSubject === "ipas") {
  urutanPengambilan.length = 0;

  // Ikuti daftar prioritas di profil siswa
  const daftarKompetensiIPAS = dataPrioritas.map(item => item.kode);

  const kuotaDinamis = daftarKompetensiIPAS.map(kode => {
    const stok = kelompokSoal.get(kode)?.length || 0;
const data = progres[`${currentSubject}_${kode}`] || null;

const itemPrioritas = dataPrioritas.find(
  item => item.kode === kode
);

const akurasi = data?.accuracy ??
  itemPrioritas?.persentase ?? 50;

    return {
      kode,
      stok,
      akurasi,
      bobot: Math.max(10, 100 - akurasi),
      kuota: stok > 0 ? 1 : 0
    };
  });

  // Satu soal minimal untuk setiap kompetensi yang tersedia
  let sisaSoal = JUMLAH_SOAL_MODE.adaptive - kuotaDinamis.reduce(
    (total, item) => total + item.kuota,
    0
  );

  // Tambahkan soal berdasarkan prioritas dan stok
  while (sisaSoal > 0) {
    const kandidat = kuotaDinamis
      .filter(item => item.kuota < item.stok)
      .sort((a, b) =>
        (b.bobot / (b.kuota + 1)) -
        (a.bobot / (a.kuota + 1))
      );

    if (kandidat.length === 0) break;

    kandidat[0].kuota++;
    sisaSoal--;
  }

  // Susun urutan pengambilan soal
  kuotaDinamis.forEach(item => {
    for (let i = 0; i < item.kuota; i++) {
      urutanPengambilan.push(item.kode);
    }
  });

  console.log("KUOTA DINAMIS IPAS:", kuotaDinamis);
  console.log("TOTAL KUOTA IPAS:", urutanPengambilan.length);
}



  // Ambil soal sesuai kuota kompetensi dan komposisi kesulitan
  currentQuestions = pilihSoalAdaptif(
    kelompokSoal,
    urutanPengambilan,
    JUMLAH_SOAL_MODE.adaptive
  );

  console.log(
  "ADAPTIVE SESSION:",
  currentSubject,
  currentQuestions.map(q => q.id)
);

if (currentQuestions.length !== JUMLAH_SOAL_MODE.adaptive) {
    alert(
      `Jumlah soal adaptif belum mencapai ${JUMLAH_SOAL_MODE.adaptive}. Periksa bank soal.`
    );
    return;
  }

}

 
else {
  // Gabungan bank biasa + bank adaptif + bank kisi-kisi, tanpa duplikat ID
  const pool = [...bankSoal[currentSubject], ...bankAdaptif(currentSubject), ...bankKisi(currentSubject)]
    .filter((q, i, semua) => semua.findIndex(x => x.id === q.id) === i);

  currentQuestions = pilihSoalBerimbang(pool, JUMLAH_SOAL_MODE[mode])
    .map(q => ({ ...q }));
}
currentIndex = 0;
answers = {};
flagged = new Set();
checkedAnswers = new Set();
hasSubmitted = false;
secondsLeft = DURASI_MODE[mode];
  setupModal.hidden = true;
  document.querySelector("main").hidden = true;
  document.querySelector("footer").hidden = true;
  $("perkembangan").hidden = true; // dashboard tidak tampil selama sesi ujian
  quizShell.hidden = false; resultShell.hidden = true;
  $("quizSubjectTitle").textContent = namaMapel[currentSubject];
 $("quizModeLabel").textContent =
    mode === "practice"
        ? "Mode latihan"
        : mode === "adaptive"
            ? "Latihan adaptif · fokus pada kelemahanmu"
            : "Mode simulasi · pembahasan setelah selesai";
  $("timer").hidden = false;
  $("finishButton").textContent = mode === "practice" ? "Akhiri latihan" : "Selesaikan simulasi";
  renderQuestion();
  startTimer();
  window.scrollTo(0, 0);
}
function startTimer() {
  stopTimer(); updateTimer();
  timerId = setInterval(() => {
    secondsLeft--; updateTimer();
    if (secondsLeft <= 0) { stopTimer(); alert("Waktu habis. Jawaban akan dikumpulkan."); finishQuiz(); }
  }, 1000);
}
function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
function updateTimer() { $("timer").textContent = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`; }
function renderQuestion() {
  const q = currentQuestions[currentIndex], selected = answers[q.id] || [];
  $("questionCounter").textContent = `Soal ${currentIndex + 1} dari ${currentQuestions.length}`;
  $("difficultyBadge").textContent = q.difficulty[0].toUpperCase() + q.difficulty.slice(1);
  $("difficultyBadge").className = "difficulty-badge " + (q.difficulty === "sedang" ? "medium" : q.difficulty === "sulit" ? "hard" : "");
  $("typeBadge").textContent =
  q.type === "pgk_kategori"
    ? "Pilihan Ganda Kategori"
    : q.type === "pgk"
      ? "Pilihan Ganda Kompleks"
      : "Pilihan Ganda";
 
const stimulusBox = $("stimulusBox");
stimulusBox.replaceChildren();

if (q.stimulus) {
  stimulusBox.appendChild(
    document.createTextNode(q.stimulus)
  );
}

if (q.image) {
  const img = document.createElement("img");
  img.src = q.image;
  img.alt = q.imageAlt || "Gambar stimulus soal";
  img.loading = "lazy";
  stimulusBox.appendChild(img);
}

stimulusBox.hidden = !q.stimulus && !q.image;

$("questionText").textContent = q.question;

  $("answerInstruction").textContent =
  q.type === "pgk_kategori"
    ? "Tentukan kategori yang tepat untuk setiap pernyataan."
    : q.type === "pgk"
      ? "Pilih semua jawaban yang benar. Kamu dapat memilih lebih dari satu."
      : "Pilih satu jawaban yang paling tepat.";
  // Ingat kontrol jawaban yang sedang difokus sebelum pilihan dibuat ulang,
  // agar fokus keyboard tidak jatuh ke <body> setelah siswa memilih jawaban.
  const answerOptions = $("answerOptions");
  const focusedControls = [...answerOptions.querySelectorAll("input, button")];
  const focusIndex = focusedControls.indexOf(document.activeElement);
  const focusIsCheckButton = focusIndex >= 0 && document.activeElement.tagName === "BUTTON";
  // TAMPILAN PILIHAN JAWABAN
answerOptions.innerHTML = "";

if (q.type === "pgk_kategori") {

  // TAMPILAN PERNYATAAN DAN KATEGORI
  q.statements.forEach((statement, i) => {

    const item = document.createElement("div");
    item.className = "category-item";

    const title = document.createElement("p");
    title.textContent = `${i + 1}. ${statement}`;
    item.appendChild(title);

    const choices = document.createElement("div");
    choices.className = "category-options";

    q.categories.forEach((category, categoryIndex) => {

      const label = document.createElement("label");
      label.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `category-${q.id}-${i}`;
      input.checked = selected[i] === categoryIndex;

      input.disabled =
        currentMode === "practice" &&
        checkedAnswers.has(q.id);

      input.addEventListener("change", () => {
        chooseCategoryAnswer(i, categoryIndex);
      });

      const span = document.createElement("span");
      span.textContent = category;

      label.append(input, span);
      choices.appendChild(label);
    });

    item.appendChild(choices);
    answerOptions.appendChild(item);
  });

  // TOMBOL PERIKSA PGK KATEGORI
  if (currentMode === "practice") {

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.textContent = "Periksa Jawaban";

    checkButton.disabled =
      selected.length !== q.statements.length ||
      selected.some(v => v === null || v === undefined) ||
      checkedAnswers.has(q.id);

    checkButton.addEventListener("click", () => {
      checkedAnswers.add(q.id);
      renderQuestion();
    });

    answerOptions.appendChild(checkButton);
  }

} else {

  // TAMPILAN PG DAN PGK MULTI-JAWABAN
  q.options.forEach((opt, i) => {

    const label = document.createElement("label");
    label.className =
      "option" + (selected.includes(i) ? " selected" : "");

    const input = document.createElement("input");
    input.type = q.type === "pgk" ? "checkbox" : "radio";
    input.name = "answer";
    input.checked = selected.includes(i);

    input.disabled =
      currentMode === "practice" &&
      (q.type === "pg"
        ? hasAnswered(q)
        : checkedAnswers.has(q.id));

    input.addEventListener("change", () => {
      chooseAnswer(i, input.checked);
    });

    const span = document.createElement("span");
    span.textContent =
      String.fromCharCode(65 + i) + ". " + opt;

    label.append(input, span);
    answerOptions.append(label);
  });

  // TOMBOL PERIKSA PGK MULTI-JAWABAN
  if (q.type === "pgk" && currentMode === "practice") {

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.textContent = "Periksa Jawaban";

    checkButton.disabled =
      selected.length === 0 ||
      checkedAnswers.has(q.id);

    checkButton.addEventListener("click", () => {
      checkedAnswers.add(q.id);
      renderQuestion();
    });

    answerOptions.appendChild(checkButton);
  }
}

const exp = $("explanationBox");

const showExp = currentMode === "practice" && (
  (q.type === "pg" && hasAnswered(q)) ||
  (
    (q.type === "pgk" || q.type === "pgk_kategori") &&
    checkedAnswers.has(q.id)
  )
);

exp.hidden = !showExp;

if (showExp) {

  if (q.type === "pgk_kategori") {

    const categoryAnswers = answers[q.id] || [];

    const detail = q.statements.map((statement, i) => {
      const chosen = categoryAnswers[i];
      const correct = q.answer[i];

      return `
        <li>
          ${escapeHTML(statement)}<br>
          Jawabanmu: ${escapeHTML(q.categories[chosen] ?? "Belum dijawab")}<br>
          Kunci: ${escapeHTML(q.categories[correct])}
          ${chosen === correct ? "✓" : "✗"}
        </li>
      `;
    }).join("");

    exp.innerHTML = `
      <strong>${isCorrect(q) ? "Jawaban tepat!" : "Mari pahami jawabannya."}</strong>
      <ol>${detail}</ol>
      <p>${escapeHTML(q.explanation)}</p>
      <b>Materi:</b> ${escapeHTML(q.topic)}
    `;

  } else {

    exp.innerHTML = `
      <strong>${isCorrect(q) ? "Jawaban tepat!" : "Mari pahami jawabannya."}</strong>
      <br>
      ${escapeHTML(q.explanation)}
      <br><br>
      <b>Materi:</b> ${escapeHTML(q.topic)}
    `;

  }
}
  
 
  $("prevButton").disabled = currentIndex === 0;
  $("nextButton").textContent = currentIndex === currentQuestions.length - 1 ? "Lihat hasil →" : "Berikutnya →";
  $("flagButton").classList.toggle("active", flagged.has(q.id));
  $("flagButton").setAttribute("aria-pressed", flagged.has(q.id) ? "true" : "false");
  renderNavigation();

  // Kembalikan fokus ke kontrol yang sama. Jika kontrol itu kini terkunci
  // (mode latihan setelah dijawab/diperiksa), arahkan fokus ke pembahasan.
  if (focusIndex >= 0) {
    const controls = [...answerOptions.querySelectorAll("input, button")];
    const target = controls[focusIndex];
    const sameKind = target && (target.tagName === "BUTTON") === focusIsCheckButton;
    if (sameKind && !target.disabled) target.focus({ preventScroll: true });
    else if (!exp.hidden) exp.focus({ preventScroll: true });
    else $("questionText").focus({ preventScroll: true });
  }
}
function hasAnswered(q) { return Object.prototype.hasOwnProperty.call(answers, q.id); }
function chooseAnswer(i, checked) {
  const q = currentQuestions[currentIndex];
if (
  currentMode === "practice" &&
  (q.type === "pg"
    ? hasAnswered(q)
    : checkedAnswers.has(q.id))
) return;
  if (q.type === "pg") answers[q.id] = [i];
  else {
    const next = new Set(answers[q.id] || []);
    checked ? next.add(i) : next.delete(i);
    if (next.size) answers[q.id] = [...next].sort((a, b) => a - b); else delete answers[q.id];
  }
  renderQuestion();
}
// MENYIMPAN JAWABAN PGK KATEGORI
function chooseCategoryAnswer(statementIndex, categoryIndex) {
  const q = currentQuestions[currentIndex];

  if (q.type !== "pgk_kategori") return;

  // Kunci jawaban setelah diperiksa dalam mode latihan
  if (
    currentMode === "practice" &&
    checkedAnswers.has(q.id)
  ) return;

  // Siapkan tempat jawaban setiap pernyataan
  const next = answers[q.id]
    ? [...answers[q.id]]
    : Array(q.statements.length).fill(null);

  // Simpan kategori yang dipilih
  next[statementIndex] = categoryIndex;

  answers[q.id] = next;

  renderQuestion();
}
function isCorrect(q) {
  const a = answers[q.id] || [];

  // PENILAIAN PGK KATEGORI
  if (q.type === "pgk_kategori") {
    return (
      a.length === q.answer.length &&
      a.every((v, i) =>
        v !== null &&
        v !== undefined &&
        v === q.answer[i]
      )
    );
  }

  // PENILAIAN PG DAN PGK MULTI-JAWABAN
  return (
    a.length === q.answer.length &&
    a.every((v, i) => v === q.answer[i])
  );
}
function renderNavigation() {
  const nav = $("questionNav"); nav.innerHTML = "";
  currentQuestions.forEach((q, i) => {
    const b = document.createElement("button"); b.className = "nav-number";
    b.textContent = i + 1;
    if (i === currentIndex) b.classList.add("current");
    if (hasAnswered(q)) b.classList.add("answered");
    if (flagged.has(q.id)) b.classList.add("flagged");
    const status = [];
    if (hasAnswered(q)) status.push("sudah dijawab"); else status.push("belum dijawab");
    if (flagged.has(q.id)) status.push("ditandai ragu-ragu");
    b.type = "button";
    b.setAttribute("aria-label", `Soal ${i + 1}, ${status.join(", ")}`);
    if (i === currentIndex) b.setAttribute("aria-current", "step");
    b.addEventListener("click", () => goToQuestion(i));
    nav.appendChild(b);
  });
}
function toggleFlag() {
  const id = currentQuestions[currentIndex].id;
  flagged.has(id) ? flagged.delete(id) : flagged.add(id);
  renderQuestion();
}
function moveQuestion(delta) {
  if (currentMode === "practice" && delta === 1 && currentIndex === currentQuestions.length - 1) { finishQuiz(); return; }
  goToQuestion(Math.max(0, Math.min(currentQuestions.length - 1, currentIndex + delta)));
}
// Pindah soal: tampilkan soal baru dari atas dan arahkan fokus ke teks soal,
// supaya siswa (termasuk pengguna keyboard/pembaca layar) mulai membaca dari awal.
function goToQuestion(index) {
  currentIndex = index;
  renderQuestion();
  // "instant": html memakai scroll-behavior: smooth, dan animasi halus itu
  // terputus saat soal digambar ulang sehingga halaman tidak sampai ke atas.
  window.scrollTo({ top: 0, behavior: "instant" });
  $("questionText").focus({ preventScroll: true });
}
// =====================================================================
// PETA HASIL BELAJAR: penguasaan per indikator kisi-kisi dalam satu sesi
// =====================================================================
const LABEL_STATUS = { dikuasai: "Dikuasai", berkembang: "Berkembang", lemah: "Perlu penguatan" };

function indikatorSoal(q) {
  const kisi = window.kisiKisiTKA || {};
  return q.indikator
    ?? (kisi.indikatorSoal || {})[q.id]
    ?? (kisi.indikatorKode || {})[q.kodeKompetensi]
    ?? null;
}

function statusPenguasaan(persen) {
  const kisi = window.kisiKisiTKA || { batasDikuasai: 75, batasBerkembang: 50 };
  return persen >= kisi.batasDikuasai ? "dikuasai"
    : persen >= kisi.batasBerkembang ? "berkembang"
    : "lemah";
}

function hitungPetaHasil(mapel, soal) {
  const kisi = (window.kisiKisiTKA || {})[mapel];
  const perIndikator = new Map();
  const luar = { benar: 0, total: 0 };

  soal.forEach(q => {
    const nomor = indikatorSoal(q);
    const benar = isCorrect(q);
    if (!nomor || !kisi || !kisi.indikator[nomor]) {
      luar.total++;
      if (benar) luar.benar++;
      return;
    }
    if (!perIndikator.has(nomor)) {
      perIndikator.set(nomor, { nomor, nama: kisi.indikator[nomor], benar: 0, total: 0 });
    }
    const data = perIndikator.get(nomor);
    data.total++;
    if (benar) data.benar++;
  });

  const baris = [...perIndikator.values()]
    .sort((a, b) => a.nomor - b.nomor)
    .map(data => {
      const persen = Math.round(data.benar / data.total * 100);
      return { ...data, persen, status: statusPenguasaan(persen) };
    });

  const elemen = (kisi ? kisi.elemen : [])
    .map(e => ({ nama: e.nama, baris: baris.filter(b => e.nomor.includes(b.nomor)) }))
    .filter(e => e.baris.length);

  return { mapel, baris, elemen, luar, totalIndikator: kisi ? Object.keys(kisi.indikator).length : 0 };
}

function tampilkanPetaHasil(peta) {
  let wadah = $("petaHasil");
  if (!wadah) {
    // index.html lama (dari cache) belum punya wadah peta: buat di atas pembahasan
    wadah = document.createElement("section");
    wadah.id = "petaHasil";
    wadah.className = "peta-hasil";
    wadah.setAttribute("aria-labelledby", "petaJudul");
    const review = $("resultReview");
    const judulReview = review.previousElementSibling;
    review.parentNode.insertBefore(wadah, judulReview && judulReview.tagName === "H3" ? judulReview : review);
  }

  if (!peta.baris.length) {
    wadah.hidden = true;
    return;
  }
  wadah.hidden = false;

  const hitung = { dikuasai: 0, berkembang: 0, lemah: 0 };
  peta.baris.forEach(b => hitung[b.status]++);

  // Prioritas: indikator belum dikuasai, persentase terendah lebih dulu
  const prioritas = peta.baris
    .filter(b => b.status !== "dikuasai")
    .sort((a, b) => a.persen - b.persen || b.total - a.total || a.nomor - b.nomor)
    .slice(0, 3);

  const barisHTML = b => `
    <li class="peta-baris status-${b.status}">
      <span class="peta-no" aria-label="Indikator ${b.nomor}">${b.nomor}</span>
      <span class="peta-nama">${escapeHTML(b.nama)}</span>
      <span class="peta-bar" aria-hidden="true"><i style="width:${b.persen}%"></i></span>
      <span class="peta-angka">${b.benar}/${b.total} benar</span>
      <span class="peta-status">${LABEL_STATUS[b.status]}</span>
    </li>`;

  const elemenHTML = peta.elemen.map(e => {
    const benar = e.baris.reduce((t, b) => t + b.benar, 0);
    const total = e.baris.reduce((t, b) => t + b.total, 0);
    return `
      <div class="peta-elemen">
        <h4>${escapeHTML(e.nama)} <small>${benar}/${total} benar · ${Math.round(benar / total * 100)}%</small></h4>
        <ul>${e.baris.map(barisHTML).join("")}</ul>
      </div>`;
  }).join("");

  const kisi = window.kisiKisiTKA || { batasDikuasai: 75, batasBerkembang: 50 };

  wadah.innerHTML = `
    <h3 id="petaJudul">Peta Hasil Belajar</h3>
    <p class="peta-pengantar">Penguasaan setiap indikator kisi-kisi TKA yang diuji pada sesi ini
      (${peta.baris.length} dari ${peta.totalIndikator} indikator).</p>
    <div class="peta-ringkas">
      <div class="status-dikuasai"><strong>${hitung.dikuasai}</strong>Dikuasai</div>
      <div class="status-berkembang"><strong>${hitung.berkembang}</strong>Berkembang</div>
      <div class="status-lemah"><strong>${hitung.lemah}</strong>Perlu penguatan</div>
    </div>
    <div class="peta-saran">
      ${prioritas.length
        ? `<strong>Prioritas belajar berikutnya:</strong>
           <ol>${prioritas.map(b => `<li>Indikator ${b.nomor} · ${escapeHTML(b.nama)} (${b.persen}%)</li>`).join("")}</ol>`
        : `<strong>Hebat!</strong> Semua indikator yang diuji pada sesi ini sudah dikuasai.`}
    </div>
    ${elemenHTML}
    <p class="peta-catatan">
      Dikuasai ≥ ${kisi.batasDikuasai}% · Berkembang ${kisi.batasBerkembang}–${kisi.batasDikuasai - 1}% ·
      Perlu penguatan &lt; ${kisi.batasBerkembang}%. Indikator yang hanya diuji 1–2 soal belum
      mencerminkan penguasaan penuh; lihat perkembangannya dari beberapa sesi.
      ${peta.luar.total ? `${peta.luar.total} soal di luar kisi-kisi (${peta.luar.benar} benar) tidak dihitung dalam peta.` : ""}
    </p>`;
}

// Pembahasan satu soal: teks soal lengkap, jawaban siswa, kunci, dan penjelasan
function htmlPembahasan(q, i) {
  const ok = isCorrect(q);
  const dipilih = answers[q.id] || [];
  const huruf = n => String.fromCharCode(65 + n);
  let isi = "";

  // Bacaan/stimulus: bacaan panjang dilipat agar pembahasan tetap ringkas
  if (q.stimulus) {
    isi += q.stimulus.length > 280
      ? `<details class="review-bacaan"><summary>Lihat bacaan</summary><p>${escapeHTML(q.stimulus)}</p></details>`
      : `<p class="review-stimulus">${escapeHTML(q.stimulus)}</p>`;
  }
  if (q.image) {
    isi += `<img class="review-gambar" src="${escapeHTML(q.image)}" alt="${escapeHTML(q.imageAlt || "Gambar soal")}" loading="lazy">`;
  }
  isi += `<p class="review-soal">${escapeHTML(q.question)}</p>`;

  if (q.type === "pgk_kategori") {
    // Benar/Salah per pernyataan: tulis kategorinya, bukan huruf
    const baris = q.statements.map((pernyataan, n) => {
      const jawab = dipilih[n];
      const tepat = jawab === q.answer[n];
      return `<tr class="${tepat ? "tepat" : "keliru"}">
        <td>${n + 1}. ${escapeHTML(pernyataan)}</td>
        <td>${escapeHTML(q.categories[jawab] ?? "Belum dijawab")} ${tepat ? "✓" : "✗"}</td>
        <td>${escapeHTML(q.categories[q.answer[n]])}</td>
      </tr>`;
    }).join("");
    isi += `<table class="review-tabel">
      <thead><tr><th>Pernyataan</th><th>Jawabanmu</th><th>Kunci</th></tr></thead>
      <tbody>${baris}</tbody></table>`;
  } else {
    // PG & PGK pilih-banyak: tandai kunci dan pilihan siswa pada setiap opsi
    const opsi = q.options.map((teks, n) => {
      const kunci = q.answer.includes(n), pilih = dipilih.includes(n);
      const kelas = kunci ? "kunci" : pilih ? "salah-pilih" : "";
      const tanda = [pilih ? "Jawabanmu" : "", kunci ? "Kunci" : ""].filter(Boolean).join(" · ");
      return `<li class="${kelas}"><b>${huruf(n)}.</b> <span>${escapeHTML(teks)}</span>${tanda ? `<em>${tanda}</em>` : ""}</li>`;
    }).join("");
    isi += `<ul class="review-opsi">${opsi}</ul>`;
    const teksPilih = dipilih.map(huruf).join(", ") || "Belum dijawab";
    isi += `<p class="review-ringkas">Jawabanmu: ${escapeHTML(teksPilih)} · Kunci: ${q.answer.map(huruf).join(", ")}</p>`;
  }

  return `<strong>Soal ${i + 1} · ${escapeHTML(q.topic)} <span class="${ok ? "right" : "wrong"}">${ok ? "Benar" : "Belum tepat"}</span></strong>
    ${isi}
    <p class="review-penjelasan"><b>Pembahasan:</b> ${escapeHTML(q.explanation)}</p>`;
}

function finishQuiz() {
  if (hasSubmitted) return;
  hasSubmitted = true; stopTimer();
  const correct = currentQuestions.filter(isCorrect).length;
  const answered = Object.keys(answers).length;
  const score = Math.round(correct / currentQuestions.length * 100);// SIMPAN HASIL LATIHAN PER KOMPETENSI
const progress = JSON.parse(
    localStorage.getItem("tkaSkillProgress") || "{}"
);

const skillResults = {};

currentQuestions.forEach(q => {
    if (!q.kodeKompetensi) return;

    // Hanya hitung soal yang sudah dijawab
    if (!Object.prototype.hasOwnProperty.call(answers, q.id)) return;

    const kode = q.kodeKompetensi;

    if (!skillResults[kode]) {
        skillResults[kode] = {
            correct: 0,
            attempted: 0
        };
    }

    skillResults[kode].attempted++;

    if (isCorrect(q)) {
        skillResults[kode].correct++;
    }
});

Object.entries(skillResults).forEach(([kode, hasil]) => {
    const key = `${currentSubject}_${kode}`;

    if (!progress[key]) {
        progress[key] = {
            correct: 0,
            attempted: 0
        };
    }

    progress[key].correct += hasil.correct;
    progress[key].attempted += hasil.attempted;

    progress[key].accuracy = Math.round(
        progress[key].correct / progress[key].attempted * 100
    );

    progress[key].lastUpdated = new Date().toISOString();
});

// Peta hasil belajar per indikator kisi-kisi
const petaHasil = hitungPetaHasil(currentSubject, currentQuestions);

// Menyimpan riwayat setiap sesi latihan
const riwayatLatihan = JSON.parse(
  localStorage.getItem("tkaSessionHistory") || "[]"
);

const dataSesi = {
  tanggal: new Date().toISOString(),
  mataPelajaran: currentSubject,
  mode: currentMode,
  totalSoal: currentQuestions.length,
  terjawab: answered,
  benar: correct,
  nilai: score,

  hasilKompetensi: Object.entries(skillResults).map(
    ([kode, hasil]) => ({
      kodeKompetensi: kode,
      benar: hasil.correct,
      terjawab: hasil.attempted,
      persentase: Math.round(
        hasil.correct / hasil.attempted * 100
      )
    })
  ),

  // Peta hasil belajar sesi ini (per indikator kisi-kisi)
  petaIndikator: petaHasil.baris.map(b => ({
    indikator: b.nomor,
    benar: b.benar,
    total: b.total,
    persen: b.persen,
    status: b.status
  })),
  diLuarKisi: petaHasil.luar
};

riwayatLatihan.unshift(dataSesi);

// Simpan maksimal 100 sesi terakhir
localStorage.setItem(
  "tkaSessionHistory",
  JSON.stringify(riwayatLatihan.slice(0, 100))
);

localStorage.setItem("tkaSkillProgress", JSON.stringify(progress));
  quizShell.hidden = true; resultShell.hidden = false;
  $("resultTitle").textContent = currentMode === "exam" ? "Simulasi selesai!" : "Latihan selesai!";
  $("scoreValue").textContent = score;
  $("resultSummary").textContent = `Kamu menjawab benar ${correct} dari ${currentQuestions.length} soal. Terus berlatih untuk meningkatkan pemahamanmu.`;
  $("resultStats").innerHTML = `<div><strong>${correct}</strong>Jawaban benar</div><div><strong>${currentQuestions.length - correct}</strong>Belum tepat</div><div><strong>${answered}</strong>Soal terjawab</div><div><strong>${flagged.size}</strong>Ditandai ragu-ragu</div>`;
  $("resultReview").innerHTML = "";
  currentQuestions.forEach((q, i) => {
    const item = document.createElement("div"); item.className = "review-item";
    item.innerHTML = htmlPembahasan(q, i);
    $("resultReview").appendChild(item);
  });
  tampilkanPetaHasil(petaHasil);
  window.scrollTo(0, 0);
}
// Keluar dari sesi yang sedang berjalan menghapus jawaban, jadi minta konfirmasi dulu.
function confirmExitQuiz() {
  const answeredCount = Object.keys(answers).length;
  const message = answeredCount
    ? `Keluar dari latihan? ${answeredCount} jawaban yang sudah kamu isi akan hilang dan tidak disimpan.`
    : "Keluar dari latihan? Sesi ini tidak akan disimpan.";
  if (hasSubmitted || confirm(message)) returnHome();
}
function returnHome() {
  stopTimer(); hasSubmitted = false;
  quizShell.hidden = true; resultShell.hidden = true; setupModal.hidden = true;
  document.querySelector("main").hidden = false; document.querySelector("footer").hidden = false;
  $("perkembangan").hidden = false;
  if (typeof window.tampilkanDashboard === "function") window.tampilkanDashboard();
  window.scrollTo(0, 0);
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
