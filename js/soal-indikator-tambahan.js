// Soal tambahan untuk indikator kisi-kisi yang sebelumnya belum memiliki soal:
//   - Matematika indikator 9: Persamaan sederhana penjumlahan dan pengurangan (lanjutan)
//   - Bahasa Indonesia indikator 19: Perubahan karakter tokoh
// Disusun mandiri untuk latihan (bukan soal resmi). Komposisi per indikator:
// Matematika 2 mudah, 5 sedang, 3 sulit; Bahasa 2 mudah, 4 sedang, 4 sulit.
// Bentuk PG, PGK pilih-banyak, dan PGK kategori. Komposisi sesi 20/40/40 diatur pemilih soal.
// Dipakai di mode Latihan dan Simulasi Ujian (bank kisi-kisi).
window.soalKisiMatematika = window.soalKisiMatematika || [];
window.soalKisiBahasa = window.soalKisiBahasa || [];

(function () {
  const MT = { kodeKompetensi: "KISI-MT-09", indikator: 9, topic: "Persamaan sederhana penjumlahan dan pengurangan (lanjutan)" };

  window.soalKisiMatematika.push(
    { id: "TMB-MT9-01", ...MT, difficulty: "mudah", type: "pg", fokus: "Mencari bilangan yang belum diketahui pada penjumlahan",
      stimulus: "", question: "□ + 125 = 300. Nilai □ adalah ....",
      options: ["175", "185", "275", "425"], answer: [0],
      explanation: "□ = 300 − 125 = 175. Periksa: 175 + 125 = 300." },

    { id: "TMB-MT9-02", ...MT, difficulty: "mudah", type: "pg", fokus: "Mencari bilangan yang belum diketahui pada pengurangan",
      stimulus: "", question: "Nilai □ yang memenuhi 450 − □ = 270 adalah ....",
      options: ["90", "120", "170", "180"], answer: [3],
      explanation: "□ = 450 − 270 = 180. Periksa: 450 − 180 = 270." },

    { id: "TMB-MT9-03", ...MT, difficulty: "sedang", type: "pg", fokus: "Persamaan dengan operasi di kedua ruas",
      stimulus: "", question: "36 + □ = 100 − 18. Nilai □ adalah ....",
      options: ["46", "54", "64", "118"], answer: [0],
      explanation: "Hitung ruas kanan dulu: 100 − 18 = 82. Jadi 36 + □ = 82, sehingga □ = 82 − 36 = 46." },

    { id: "TMB-MT9-04", ...MT, difficulty: "sedang", type: "pg", fokus: "Memodelkan cerita dua langkah ke kalimat matematika",
      stimulus: "Di dalam bus ada 28 penumpang. Di halte pertama, beberapa penumpang turun. Di halte kedua, naik 15 penumpang. Sekarang di dalam bus ada 34 penumpang.",
      question: "Kalimat matematika dan banyak penumpang yang turun di halte pertama adalah ....",
      options: ["28 + □ − 15 = 34, □ = 21", "28 − □ − 15 = 34, □ = 9", "34 − 28 + 15 = □, □ = 21", "28 − □ + 15 = 34, □ = 9"], answer: [3],
      explanation: "Penumpang turun berarti dikurangi, penumpang naik berarti ditambah: 28 − □ + 15 = 34. Karena 28 + 15 = 43, maka 43 − □ = 34, sehingga □ = 43 − 34 = 9 orang." },

    { id: "TMB-MT9-05", ...MT, difficulty: "sedang", type: "pg", fokus: "Persamaan dengan operasi di kedua ruas",
      stimulus: "", question: "Jika 245 + □ = 600 − 155, nilai □ adalah ....",
      options: ["200", "210", "355", "400"], answer: [0],
      explanation: "Ruas kanan: 600 − 155 = 445. Jadi 245 + □ = 445, sehingga □ = 445 − 245 = 200." },

    { id: "TMB-MT9-06", ...MT, difficulty: "sedang", type: "pgk", fokus: "Memeriksa beberapa persamaan sekaligus",
      stimulus: "", question: "Pilih semua kalimat matematika yang nilai □-nya sama dengan 35.",
      options: ["□ + 65 = 100", "100 − □ = 75", "80 − □ = 45", "□ − 15 = 50"], answer: [0, 2],
      explanation: "□ + 65 = 100 → □ = 35 (benar). 100 − □ = 75 → □ = 25 (salah). 80 − □ = 45 → □ = 35 (benar). □ − 15 = 50 → □ = 65 (salah)." },

    { id: "TMB-MT9-07", ...MT, difficulty: "sulit", type: "pg", fokus: "Masalah uang dengan dua langkah",
      stimulus: "Uang Rani mula-mula Rp45.000. Ia membeli buku seharga Rp18.500. Setelah itu, Rani mendapat uang saku dari kakek. Sekarang uang Rani Rp51.500.",
      question: "Besar uang saku yang diberikan kakek adalah ....",
      options: ["Rp25.000", "Rp26.500", "Rp33.000", "Rp70.000"], answer: [0],
      explanation: "Sisa uang setelah membeli buku: Rp45.000 − Rp18.500 = Rp26.500. Kalimat matematikanya Rp26.500 + □ = Rp51.500, sehingga □ = Rp51.500 − Rp26.500 = Rp25.000." },

    { id: "TMB-MT9-08", ...MT, difficulty: "sedang", type: "pg", fokus: "Menyeimbangkan kedua ruas persamaan",
      stimulus: "", question: "Perhatikan kalimat matematika berikut.\n120 + 80 = □ + 145\nNilai □ agar kedua ruas sama besar adalah ....",
      options: ["35", "45", "50", "55"], answer: [3],
      explanation: "Ruas kiri: 120 + 80 = 200. Agar sama, □ + 145 = 200, sehingga □ = 200 − 145 = 55." },

    { id: "TMB-MT9-09", ...MT, difficulty: "sulit", type: "pgk_kategori", fokus: "Menilai kebenaran penyelesaian persamaan",
      stimulus: "", question: "Tentukan Benar atau Salah penyelesaian setiap kalimat matematika berikut.",
      statements: [
        "Jika □ + 48 = 120, maka □ = 72.",
        "Jika 250 − □ = 175, maka □ = 425.",
        "Jika □ − 36 = 64, maka □ = 100.",
        "Jika 90 + □ = 150 − 20, maka □ = 60."
      ],
      categories: ["Benar", "Salah"], answer: [0, 1, 0, 1],
      explanation: "120 − 48 = 72 (Benar). 250 − 175 = 75, bukan 425 (Salah). 64 + 36 = 100 (Benar). 150 − 20 = 130, lalu 130 − 90 = 40, bukan 60 (Salah)." },

    { id: "TMB-MT9-10", ...MT, difficulty: "sulit", type: "pgk", fokus: "Memodelkan dan menyelesaikan cerita dua langkah",
      stimulus: "Di rak perpustakaan kelas ada 64 buku. Andi meminjam beberapa buku. Setelah itu, Bu Guru menambahkan 25 buku baru ke rak. Sekarang di rak ada 70 buku.",
      question: "Pilih semua pernyataan yang benar.",
      options: ["Kalimat matematikanya 64 − □ + 25 = 70.", "Banyak buku yang dipinjam Andi adalah 19.", "Banyak buku yang dipinjam Andi adalah 31.", "Sebelum Bu Guru menambah buku, di rak ada 45 buku."],
      answer: [0, 1, 3],
      explanation: "Buku dipinjam berarti dikurangi, buku ditambah berarti dijumlah: 64 − □ + 25 = 70. Karena 64 + 25 = 89, maka □ = 89 − 70 = 19 buku. Sebelum ditambah, di rak ada 64 − 19 = 45 buku. Jadi pernyataan 1, 2, dan 4 benar." }
  );

  // ------------------------------------------------------------------
  // BAHASA INDONESIA — indikator 19: Perubahan karakter tokoh
  // Fokus: sebab perubahan, bukti perubahan, dan karakter sebelum/sesudah.
  // ------------------------------------------------------------------
  const BIN = { kodeKompetensi: "KISI-BIN-19", indikator: 19, topic: "Perubahan karakter tokoh" };

  const ceritaRaka = "Pot Bunga Bu Sari\n\n" +
    "Raka suka bermain bola di gang depan rumahnya. Ia sering menendang bola sekeras-kerasnya tanpa melihat sekeliling. Ketika teman-temannya mengingatkan agar berhati-hati, Raka hanya tertawa. \"Ah, tidak apa-apa. Gang ini kan luas,\" katanya.\n\n" +
    "Suatu sore, bola yang ditendang Raka melambung tinggi dan mengenai pot bunga anggrek di teras Bu Sari. Pot itu jatuh dan pecah. Raka langsung berlari pulang dan bersembunyi di kamar. Hatinya berdebar-debar.\n\n" +
    "Malam harinya, Raka melihat Bu Sari dari jendela. Bu Sari memunguti pecahan pot sambil sesekali mengusap matanya. Raka teringat cerita Ibu bahwa anggrek itu hadiah dari almarhum suami Bu Sari. Raka merasa sangat bersalah.\n\n" +
    "Keesokan paginya, Raka mengetuk pintu rumah Bu Sari. Dengan suara pelan, ia mengaku bahwa dialah yang memecahkan pot itu dan meminta maaf. Raka juga menyerahkan celengan ayamnya untuk membeli pot baru. Bu Sari tersenyum dan memaafkannya.\n\n" +
    "Sejak hari itu, Raka berubah. Sebelum bermain, ia selalu memeriksa keadaan sekitar. Ia juga mengajak teman-temannya bermain bola di lapangan agar tidak mengganggu rumah warga. Setiap Minggu pagi, Raka membantu Bu Sari menyiram tanaman di terasnya.";

  const ceritaNisa = "Nisa dan Lomba Mendongeng\n\n" +
    "Nisa adalah murid kelas lima yang pandai bercerita. Sayangnya, ia sangat pemalu. Setiap kali Bu Wati memintanya maju ke depan kelas, wajah Nisa memerah dan suaranya hampir tidak terdengar. Saat istirahat, Nisa lebih suka duduk sendirian di perpustakaan.\n\n" +
    "Suatu hari, Bu Wati mengumumkan lomba mendongeng antarkelas. Bu Wati memilih Nisa sebagai wakil kelas. \"Ibu sering mendengar kamu mendongeng untuk adik-adik di perpustakaan. Ceritamu bagus sekali,\" kata Bu Wati. Nisa ingin menolak, tetapi teman-temannya bertepuk tangan memberi semangat.\n\n" +
    "Selama seminggu, Nisa berlatih di depan cermin. Sahabatnya, Laras, menemaninya berlatih setiap sore. Laras mengajarinya menarik napas panjang sebelum mulai bercerita dan menatap wajah pendengar yang tersenyum.\n\n" +
    "Pada hari lomba, kaki Nisa sempat gemetar. Namun, ia ingat pesan Laras. Nisa menarik napas panjang, lalu mendongeng dengan suara lantang dan gerakan yang menarik. Penonton tertawa dan bertepuk tangan. Nisa meraih juara kedua.\n\n" +
    "Setelah lomba itu, Nisa tidak lagi bersembunyi di perpustakaan. Ia berani mengacungkan tangan saat guru bertanya. Ia bahkan menawarkan diri menjadi pembawa acara pentas seni sekolah.";

  const ceritaTio = "Kak Tio dan Ponselnya\n\n" +
    "Kak Tio baru saja dibelikan ponsel oleh Ayah karena sudah masuk SMP. Sejak itu, Kak Tio hampir selalu menatap layar ponselnya. Ketika Dani, adiknya, mengajak bermain layang-layang, Kak Tio menjawab tanpa menoleh, \"Nanti saja, Kakak sedang sibuk.\" Ia juga sering lupa membantu Ibu menyapu halaman.\n\n" +
    "Suatu malam, Dani demam tinggi. Ayah sedang bertugas ke luar kota, sedangkan Ibu harus mengantar Dani ke puskesmas. \"Tio, tolong jaga rumah dan siapkan air hangat, ya,\" pesan Ibu. Kak Tio terkejut melihat adiknya yang lemas dan menggigil.\n\n" +
    "Malam itu Kak Tio tidak menyentuh ponselnya sama sekali. Ia merebus air, membereskan kamar Dani, dan menunggu dengan cemas di teras. Ketika Dani pulang, Kak Tio mengompres dahi adiknya sampai tertidur.\n\n" +
    "Kak Tio menyadari bahwa selama ini ia jarang memperhatikan keluarganya. Ia merasa menyesal karena sering menolak ajakan Dani.\n\n" +
    "Sejak kejadian itu, Kak Tio membuat aturan untuk dirinya sendiri. Ponsel hanya ia pakai setelah membantu Ibu dan menemani Dani belajar. Setiap Sabtu sore, ia mengajak Dani bermain layang-layang di lapangan. Dani pun senang karena kakaknya kembali menjadi teman bermain yang menyenangkan.";

  const ceritaBayu = "Bayu dan Jadwal Piket\n\n" +
    "Setiap hari Rabu, Bayu mendapat giliran piket kelas. Namun, Bayu sering menggerutu. \"Kenapa harus aku? Kelas ini kan milik semua orang,\" keluhnya. Kadang ia pura-pura lupa dan langsung pulang begitu bel berbunyi. Teman satu kelompoknya terpaksa membersihkan kelas tanpa Bayu.\n\n" +
    "Suatu Rabu, Bayu kembali ke kelas karena botol minumnya tertinggal. Ia terkejut melihat Pak Rudi, wali kelasnya, sedang menyapu lantai sendirian. Teman-teman piket lain sedang mengikuti latihan pramuka. Keringat membasahi kemeja Pak Rudi.\n\n" +
    "\"Lho, Bapak yang menyapu?\" tanya Bayu. Pak Rudi tersenyum. \"Tidak apa-apa. Bapak ingin besok pagi kalian belajar di kelas yang bersih,\" jawabnya. Bayu terdiam. Ia malu karena selama ini sering menghindari tugasnya.\n\n" +
    "Tanpa disuruh, Bayu mengambil kain lap dan membersihkan papan tulis. Setelah itu, ia merapikan meja dan membuang sampah ke tempatnya. Pak Rudi menepuk bahunya dan mengucapkan terima kasih.\n\n" +
    "Sejak hari itu, Bayu tidak pernah lagi menggerutu saat piket. Ia datang lebih pagi setiap Rabu untuk menyiram tanaman di depan kelas. Bayu bahkan membuat papan pengingat jadwal piket agar tidak ada teman yang lupa. Kelasnya pun terpilih menjadi kelas terbersih bulan itu.";

  window.soalKisiBahasa.push(
    { id: "TMB-BIN19-01", ...BIN, difficulty: "mudah", type: "pg", fokus: "Karakter tokoh sebelum berubah",
      stimulus: ceritaRaka, question: "Bagaimana karakter Raka pada awal cerita?",
      options: ["Pemalu dan pendiam", "Rajin dan teliti", "Ceroboh dan tidak mau mendengar nasihat", "Penakut dan mudah menangis"], answer: [2],
      explanation: "Pada awal cerita Raka menendang bola sekeras-kerasnya tanpa melihat sekeliling dan hanya tertawa ketika diingatkan. Itu menunjukkan Raka ceroboh dan tidak mau mendengar nasihat." },

    { id: "TMB-BIN19-02", ...BIN, difficulty: "sedang", type: "pg", fokus: "Sebab perubahan karakter tokoh",
      stimulus: ceritaRaka, question: "Peristiwa yang paling menyebabkan Raka berubah adalah ....",
      options: ["Raka dimarahi teman-temannya karena bolanya hilang.", "Raka kalah dalam pertandingan bola di lapangan.", "Raka diberi hadiah celengan ayam oleh Ibu.", "Raka melihat Bu Sari bersedih memunguti pecahan pot anggrek kenangannya."], answer: [3],
      explanation: "Raka merasa sangat bersalah setelah melihat Bu Sari memunguti pecahan pot sambil mengusap mata, apalagi anggrek itu hadiah dari almarhum suaminya. Rasa bersalah inilah yang membuat Raka mengaku, meminta maaf, dan berubah." },

    { id: "TMB-BIN19-03", ...BIN, difficulty: "sulit", type: "pgk_kategori", fokus: "Bukti perubahan karakter tokoh",
      stimulus: ceritaRaka, question: "Tentukan Benar atau Salah setiap pernyataan tentang perubahan karakter Raka berikut.",
      statements: [
        "Raka berubah menjadi lebih berhati-hati karena selalu memeriksa keadaan sekitar sebelum bermain.",
        "Raka berubah karena dihukum oleh orang tuanya.",
        "Raka menunjukkan sikap bertanggung jawab dengan menyerahkan celengannya untuk membeli pot baru.",
        "Setelah kejadian itu, Raka berhenti bermain bola selamanya."
      ],
      categories: ["Benar", "Salah"], answer: [0, 1, 0, 1],
      explanation: "Pernyataan 1 benar: Raka selalu memeriksa keadaan sekitar. Pernyataan 2 salah: cerita tidak menyebut hukuman; Raka berubah karena rasa bersalah. Pernyataan 3 benar: menyerahkan celengan menunjukkan tanggung jawab. Pernyataan 4 salah: Raka tetap bermain bola, tetapi kini di lapangan." },

    { id: "TMB-BIN19-04", ...BIN, difficulty: "mudah", type: "pg", fokus: "Karakter tokoh sebelum dan sesudah berubah",
      stimulus: ceritaNisa, question: "Perubahan karakter Nisa dalam cerita tersebut adalah dari ....",
      options: ["sombong menjadi rendah hati", "malas menjadi rajin", "pemarah menjadi penyabar", "pemalu menjadi percaya diri"], answer: [3],
      explanation: "Awalnya Nisa sangat pemalu: wajahnya memerah dan suaranya hampir tidak terdengar. Setelah lomba, ia berani mengacungkan tangan dan menjadi pembawa acara. Jadi Nisa berubah dari pemalu menjadi percaya diri." },

    { id: "TMB-BIN19-05", ...BIN, difficulty: "sedang", type: "pgk", fokus: "Bukti perubahan karakter tokoh",
      stimulus: ceritaNisa, question: "Pilih semua kalimat yang menunjukkan bahwa Nisa sudah berubah.",
      options: ["Nisa berani mengacungkan tangan saat guru bertanya.", "Saat istirahat, Nisa lebih suka duduk sendirian di perpustakaan.", "Nisa menawarkan diri menjadi pembawa acara pentas seni sekolah.", "Wajah Nisa memerah saat diminta maju ke depan kelas."], answer: [0, 2],
      explanation: "Kalimat 1 dan 3 terjadi setelah lomba dan menunjukkan Nisa sudah percaya diri. Kalimat 2 dan 4 menggambarkan Nisa sebelum berubah, ketika ia masih pemalu." },

    { id: "TMB-BIN19-06", ...BIN, difficulty: "sulit", type: "pg", fokus: "Peran tokoh lain dalam perubahan karakter",
      stimulus: ceritaNisa, question: "Bagaimana peran Laras dalam perubahan karakter Nisa?",
      options: ["Laras menggantikan Nisa mendongeng di atas panggung.", "Laras memaksa Nisa mengikuti lomba walaupun Nisa menolak.", "Laras menemani Nisa berlatih dan mengajarkan cara mengatasi rasa gugup.", "Laras memberi tahu Bu Wati bahwa Nisa pandai mendongeng."], answer: [2],
      explanation: "Laras menemani Nisa berlatih setiap sore dan mengajarinya menarik napas panjang serta menatap pendengar yang tersenyum. Pesan Laras itulah yang membantu Nisa mengatasi gugup saat lomba sehingga ia menjadi percaya diri." },

    { id: "TMB-BIN19-07", ...BIN, difficulty: "sedang", type: "pg", fokus: "Sebab perubahan karakter tokoh",
      stimulus: ceritaTio, question: "Apa yang membuat Kak Tio menyadari kesalahannya?",
      options: ["Ayah menyita ponsel Kak Tio.", "Ponsel Kak Tio rusak dan tidak bisa dipakai.", "Kak Tio dimarahi Ibu karena tidak menyapu halaman.", "Kak Tio melihat adiknya sakit dan harus menjaga rumah sendirian."], answer: [3],
      explanation: "Saat Dani demam tinggi dan Kak Tio harus menjaga rumah, ia tidak menyentuh ponselnya dan merawat adiknya. Dari kejadian itu Kak Tio menyadari bahwa selama ini ia jarang memperhatikan keluarganya." },

    { id: "TMB-BIN19-08", ...BIN, difficulty: "sulit", type: "pg", fokus: "Bukti perubahan karakter tokoh",
      stimulus: ceritaTio, question: "Kalimat yang paling tepat menunjukkan bahwa Kak Tio sudah berubah menjadi kakak yang peduli adalah ....",
      options: ["Kak Tio baru saja dibelikan ponsel oleh Ayah karena sudah masuk SMP.", "\"Nanti saja, Kakak sedang sibuk.\"", "Setiap Sabtu sore, ia mengajak Dani bermain layang-layang di lapangan.", "Kak Tio terkejut melihat adiknya yang lemas dan menggigil."], answer: [2],
      explanation: "Mengajak Dani bermain setiap Sabtu sore adalah kebiasaan baru Kak Tio setelah ia berubah. Pilihan lain menggambarkan keadaan sebelum berubah atau hanya perasaan terkejut, bukan bukti perubahan sikap." },

    { id: "TMB-BIN19-09", ...BIN, difficulty: "sedang", type: "pg", fokus: "Karakter tokoh sebelum dan sesudah berubah",
      stimulus: ceritaBayu, question: "Perubahan karakter Bayu dalam cerita tersebut adalah ....",
      options: ["dari pemberani menjadi penakut", "dari jujur menjadi suka berbohong", "dari ramah menjadi pemarah", "dari suka menghindari tugas menjadi bertanggung jawab"], answer: [3],
      explanation: "Awalnya Bayu menggerutu dan pura-pura lupa piket. Setelah melihat Pak Rudi menyapu sendirian, ia rajin piket, datang lebih pagi, dan membuat papan pengingat. Jadi Bayu berubah dari suka menghindari tugas menjadi bertanggung jawab." },

    { id: "TMB-BIN19-10", ...BIN, difficulty: "sulit", type: "pgk", fokus: "Sebab dan bukti perubahan karakter tokoh",
      stimulus: ceritaBayu, question: "Pilih semua pernyataan yang sesuai dengan perubahan karakter Bayu.",
      options: ["Bayu berubah karena merasa malu setelah melihat Pak Rudi menyapu kelas sendirian.", "Bayu berubah karena takut mendapat nilai jelek dari Pak Rudi.", "Bayu membuat papan pengingat jadwal piket agar teman-temannya tidak lupa.", "Bayu datang lebih pagi setiap Rabu untuk menyiram tanaman di depan kelas."], answer: [0, 2, 3],
      explanation: "Bayu berubah karena malu melihat Pak Rudi menyapu sendirian (pernyataan 1). Bukti perubahannya: membuat papan pengingat jadwal piket (pernyataan 3) dan datang lebih pagi untuk menyiram tanaman (pernyataan 4). Cerita tidak menyebut Bayu takut mendapat nilai jelek, jadi pernyataan 2 salah." }
  );
})();
