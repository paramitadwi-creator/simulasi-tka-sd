// =====================================================================
// KISI-KISI TKA SD/MI — "Indikator Materi Latihan TKA" (30 indikator per mapel)
// Dipakai untuk menyusun Peta Hasil Belajar setiap sesi latihan.
// =====================================================================
window.kisiKisiTKA = {
  // Batas penguasaan, sama dengan Peta Belajar sekolah
  batasDikuasai: 75,
  batasBerkembang: 50,

  matematika: {
    indikator: {
      1: "Representasi pecahan dari bagian benda utuh",
      2: "Mengurutkan bilangan dalam bentuk berbeda",
      3: "Membandingkan pecahan, bilangan cacah, desimal, dan persen",
      4: "Operasi bilangan cacah dan nilai tempat",
      5: "Memodelkan masalah ke kalimat matematika",
      6: "Kebenaran operasi pada diagram alir",
      7: "Operasi hitung campuran pecahan dan bilangan asli",
      8: "Persamaan sederhana penjumlahan dan pengurangan",
      9: "Persamaan sederhana penjumlahan dan pengurangan (lanjutan)",
      10: "Persamaan sederhana berbagai operasi",
      11: "Mengevaluasi informasi dengan persamaan sederhana",
      12: "KPK dan FPB",
      13: "Ciri-ciri bangun datar",
      14: "Bangun datar penyusun segi banyak",
      15: "Konstruksi bangun ruang dan visualisasi spasial",
      16: "Bentuk benda: segiempat, segitiga, segi banyak, lingkaran",
      17: "Kelogisan satuan baku panjang",
      18: "Representasi volume dengan satuan baku",
      19: "Kesetimbangan neraca",
      20: "Durasi aktivitas dari jam analog",
      21: "Keliling segi banyak tidak beraturan",
      22: "Luas segi banyak gabungan segitiga",
      23: "Keliling dan luas persegi/persegi panjang",
      24: "Evaluasi pengukuran panjang dan berat",
      25: "Besar sudut dari ilustrasi kontekstual",
      26: "Kesalahan penyajian diagram batang",
      27: "Interpretasi diagram atau tabel",
      28: "Interpretasi data berdasarkan kategori",
      29: "Masalah penyajian data diagram batang/tabel",
      30: "Interpretasi diagram batang atau tabel"
    },
    elemen: [
      { nama: "Bilangan", nomor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { nama: "Geometri dan Pengukuran", nomor: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25] },
      { nama: "Data", nomor: [26, 27, 28, 29, 30] }
    ]
  },

  bahasa: {
    indikator: {
      1: "Pernyataan yang sesuai dengan isi teks",
      2: "Bagan kerangka isi teks",
      3: "Informasi tersurat: mengapa",
      4: "Informasi tersurat: apa",
      5: "Informasi tersurat: apa (lanjutan)",
      6: "Informasi tersurat: bagaimana",
      7: "Informasi tersurat: siapa",
      8: "Informasi tersurat: siapa (lanjutan)",
      9: "Kesimpulan dan relevansi isi teks",
      10: "Nilai moral dalam percakapan",
      11: "Inferensi penyebab",
      12: "Unsur intrinsik dan amanat",
      13: "Ide pokok",
      14: "Menyimpulkan isi teks",
      15: "Perasaan dan sifat tokoh",
      16: "Sifat atau karakter tokoh",
      17: "Perbedaan sebelum dan sesudah peristiwa",
      18: "Perubahan watak tokoh",
      19: "Perubahan karakter tokoh",
      20: "Makna ungkapan dalam cerita",
      21: "Makna idiom dalam percakapan",
      22: "Makna peribahasa sederhana",
      23: "Refleksi peristiwa dengan kehidupan sehari-hari",
      24: "Refleksi pengetahuan baru: apa yang kamu lakukan",
      25: "Refleksi pengetahuan baru (lanjutan)",
      26: "Nilai keteladanan",
      27: "Kesesuaian judul dengan isi",
      28: "Kesesuaian ilustrasi dengan isi",
      29: "Respons emosional terhadap konflik tokoh",
      30: "Setuju atau tidak setuju terhadap sikap tokoh"
    },
    elemen: [
      { nama: "Memahami informasi tersurat", nomor: [1, 2, 3, 4, 5, 6, 7, 8] },
      { nama: "Menyimpulkan isi teks (inferensial)", nomor: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
      { nama: "Mengevaluasi dan merefleksikan", nomor: [23, 24, 25, 26, 27, 28, 29, 30] }
    ]
  },

  ipas: {
    indikator: {
      1: "Bagian dan fungsi telinga",
      2: "Gangguan penglihatan dan lensa kacamata",
      3: "Bagian dan fungsi mata",
      4: "Hewan dengan daur hidup yang sama",
      5: "Metamorfosis sempurna dan tidak sempurna",
      6: "Sumber daya alam dan manfaatnya",
      7: "Upaya mengatasi masalah lingkungan",
      8: "Dampak perilaku manusia pada lingkungan",
      9: "Organ dan proses pernapasan",
      10: "Organ dan proses pencernaan",
      11: "Gangguan pencernaan dan pencegahannya",
      12: "Sistem peredaran darah",
      13: "Gangguan peredaran darah dan pencegahannya",
      14: "Jenis otot dan letaknya",
      15: "Jenis sendi dan arah geraknya",
      16: "Rantai dan jaring-jaring makanan",
      17: "Jenis simbiosis",
      18: "Adaptasi hewan",
      19: "Adaptasi tumbuhan",
      20: "Perubahan wujud dalam peristiwa sehari-hari",
      21: "Bagan perubahan wujud zat",
      22: "Energi alternatif dan pembangkit listrik",
      23: "Perubahan bentuk energi",
      24: "Jenis-jenis gaya",
      25: "Pengaruh gaya terhadap benda",
      26: "Tinggi rendah bunyi",
      27: "Sifat-sifat cahaya",
      28: "Planet dalam tata surya",
      29: "Akibat rotasi dan revolusi Bumi",
      30: "Peristiwa gerhana"
    },
    elemen: [
      { nama: "Tubuh manusia dan indera", nomor: [1, 2, 3, 9, 10, 11, 12, 13, 14, 15] },
      { nama: "Makhluk hidup dan lingkungan", nomor: [4, 5, 6, 7, 8, 16, 17, 18, 19] },
      { nama: "Zat, energi, gaya, bunyi, dan cahaya", nomor: [20, 21, 22, 23, 24, 25, 26, 27] },
      { nama: "Bumi dan tata surya", nomor: [28, 29, 30] }
    ]
  },

  // Nomor indikator untuk soal yang tidak membawa field `indikator`:
  // soal adaptif asli proyek (berdasarkan kode kompetensinya) ...
  indikatorKode: {
    "MT-W01": 11, "MT-W02": 17, "MT-W03": 22, "MT-W04": 27, "MT-W05": 14,
    "MT-W06": 15, "MT-W07": 7, "MT-W08": 20, "MT-W09": 30,
    "IPAS-IP-01": 1, "IPAS-IP-02": 25, "IPAS-IP-03": 3, "IPAS-IP-04": 5,
    "IPAS-IP-05": 27, "IPAS-IP-06": 20,
    "BIN-TKS-01": 1, "BIN-TKS-02": 2, "BIN-TKS-03": 3, "BIN-TKS-04": 4,
    "BIN-TKS-05": 5, "BIN-TKS-06": 6, "BIN-TKS-07": 7, "BIN-TKS-08": 8,
    "BIN-INF-01": 9, "BIN-INF-02": 10, "BIN-INF-03": 11, "BIN-INF-04": 12,
    "BIN-INF-05": 13, "BIN-INF-06": 14, "BIN-INF-07": 15, "BIN-INF-08": 16,
    "BIN-INF-09": 22,
    "BIN-EVA-01": 23, "BIN-EVA-02": 24, "BIN-EVA-03": 25, "BIN-EVA-04": 26,
    "BIN-EVA-05": 27, "BIN-EVA-06": 29
  },

  // ... dan soal bank biasa di app.js (dipetakan dari topik dan pertanyaannya).
  // Soal yang tidak tercantum di sini berada di luar kisi-kisi.
  indikatorSoal: {
    MT01: 4, MT02: 4, MT03: 4, MT04: 4, MT05: 1, MT06: 23, MT07: 24, MT08: 20, MT09: 27,
    MT10: 25, MT11: 7, MT12: 23, MT13: 4, MT16: 12, MT18: 10, MT21: 23, MT22: 24, MT24: 18,
    MT25: 18, MT27: 29, MT28: 30, MT29: 12, MT30: 25, MT31: 29, MT32: 12, MT33: 7, MT36: 12,
    MT38: 5, MT39: 23, MT41: 18, MT42: 20, MT45: 27, MT46: 27, MT48: 3, MT49: 23, MT50: 7, MT51: 29,
    BI01: 4, BI02: 3, BI03: 16, BI05: 14,
    IP02: 16, IP03: 23, IP04: 12
  }
};
