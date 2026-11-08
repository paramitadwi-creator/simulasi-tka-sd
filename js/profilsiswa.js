
// PROFIL KEMAMPUAN SISWA
// Data berdasarkan hasil tryout yang telah dianalisis.

window.profilSiswa = {
  id: "siswa-01",
  nama: "Siswa 01",

  hasilTryout: {
    matematika: 80,
    bahasa: 98.9,
    ipas: 85.6
  },

  // PRIORITAS PEMBELAJARAN MATEMATIKA
  prioritasMatematika: [
    {
      kode: "MT-W01",
      kompetensi: "Persamaan sederhana dan hubungan bilangan",
      tingkat: "tinggi",
      nomorAcuan: [10, 11],
      fokus: "Menentukan nilai yang belum diketahui dalam soal cerita"
    },
    {
      kode: "MT-W02",
      kompetensi: "Logika penggunaan satuan panjang",
      tingkat: "tinggi",
      nomorAcuan: [17],
      fokus: "Memilih satuan panjang yang sesuai dengan benda atau jarak"
    },
    {
      kode: "MT-W03",
      kompetensi: "Luas gabungan beberapa segitiga",
      tingkat: "tinggi",
      nomorAcuan: [22],
      fokus: "Menguraikan bangun gabungan menjadi beberapa segitiga"
    },
    {
      kode: "MT-W04",
      kompetensi: "Interpretasi tabel dan jadwal",
      tingkat: "tinggi",
      nomorAcuan: [27],
      fokus: "Membaca informasi waktu dan menentukan pilihan berdasarkan syarat"
    },
    {
      kode: "MT-W05",
      kompetensi: "Mengidentifikasi unsur bangun datar",
      tingkat: "penguatan",
      nomorAcuan: [14],
      fokus: "Mengenali bangun penyusun suatu bangun gabungan"
    },
    {
      kode: "MT-W06",
      kompetensi: "Visualisasi jaring-jaring kubus",
      tingkat: "penguatan",
      nomorAcuan: [15],
      fokus: "Menentukan posisi sisi kubus setelah dilipat"
    },
    // Tambahan dari artifact "Latihan Khusus Aisyah" (Peta Belajar MTK-P02)
    {
      kode: "MT-W07",
      kompetensi: "Operasi hitung campuran pecahan dan bilangan asli",
      tingkat: "penguatan",
      nomorAcuan: [7],
      fokus: "Mendahulukan kali dan bagi, serta mengubah pecahan campuran menjadi pecahan biasa"
    },
    {
      kode: "MT-W08",
      kompetensi: "Durasi aktivitas dari jam analog",
      tingkat: "penguatan",
      nomorAcuan: [20],
      fokus: "Membaca jarum jam dan menghitung durasi melalui jam bulat terdekat"
    },
    {
      kode: "MT-W09",
      kompetensi: "Interpretasi diagram batang atau tabel",
      tingkat: "penguatan",
      nomorAcuan: [30],
      fokus: "Membaca nilai batang dengan memperhatikan skala sumbu"
    }
  ],  // PRIORITAS PEMBELAJARAN BAHASA INDONESIA
  prioritasBahasaIndonesia: [
    {
      kode: "BIN-INF-02",
      kompetensi: "Menyimpulkan nilai moral dalam percakapan",
      tingkat: "penguatan",
      persentase: 67,
      nomorAcuan: [10],
      fokus: "Mengidentifikasi seluruh nilai moral dalam percakapan, termasuk kepedulian, tanggung jawab, dan kerja sama."
    },
    // Tambahan dari artifact "Latihan Khusus Aisyah" (Peta Belajar BIN-P01):
    // keterampilan yang paling dekat dengan nilai moral
    {
      kode: "BIN-INF-04",
      kompetensi: "Menentukan amanat cerita",
      tingkat: "pemantapan",
      nomorAcuan: [12],
      fokus: "Menemukan pesan cerita dari perbuatan tokoh yang berakibat baik atau buruk."
    },
    {
      kode: "BIN-EVA-04",
      kompetensi: "Merefleksikan nilai keteladanan tokoh",
      tingkat: "pemantapan",
      nomorAcuan: [26],
      fokus: "Memilih tindakan sehari-hari yang paling mirip dengan perbuatan baik tokoh."
    },
    {
      kode: "BIN-INF-08",
      kompetensi: "Menyimpulkan sifat dan sikap tokoh dari dialog",
      tingkat: "pemantapan",
      nomorAcuan: [16],
      fokus: "Menyimpulkan sifat tokoh dari ucapan, perbuatan, dan tanggapan tokoh lain."
    },
    {
      kode: "BIN-INF-09",
      kompetensi: "Makna ungkapan dan peribahasa dalam percakapan",
      tingkat: "pemantapan",
      nomorAcuan: [20, 21, 22],
      fokus: "Menghubungkan makna ungkapan atau peribahasa dengan situasi tokoh."
    },
    {
      kode: "BIN-EVA-06",
      kompetensi: "Menentukan sikap yang tepat terhadap masalah tokoh",
      tingkat: "pemantapan",
      nomorAcuan: [29],
      fokus: "Memilih sikap yang menyelesaikan masalah tanpa menyakiti orang lain."
    }
  ],

    prioritasIPAS: [
        {
            kode: "IPAS-IP-01",
            kompetensi: "Indera pendengaran",
            tingkat: "tinggi",
            persentase: 0,
            nomorAcuan: [1],
            fokus: "Mengidentifikasi bagian telinga dan fungsi setiap bagiannya."
        },
        {
            kode: "IPAS-IP-02",
            kompetensi: "Gaya",
            tingkat: "tinggi",
            persentase: 33,
            nomorAcuan: [24, 25],
            fokus: "Memahami pengaruh gaya terhadap gerak dan bentuk benda."
        },
        {
            kode: "IPAS-IP-03",
            kompetensi: "Indera penglihatan",
            tingkat: "intensif",
            persentase: 50,
            nomorAcuan: [2, 3],
            fokus: "Memahami bagian mata dan proses melihat."
        },
        {
            kode: "IPAS-IP-04",
            kompetensi: "Metamorfosis hewan",
            tingkat: "intensif",
            persentase: 50,
            nomorAcuan: [4, 5],
            fokus: "Membedakan metamorfosis sempurna dan tidak sempurna."
        },
        {
            kode: "IPAS-IP-05",
            kompetensi: "Sifat cahaya",
            tingkat: "penguatan",
            persentase: 67,
            nomorAcuan: [27],
            fokus: "Memahami sifat cahaya merambat lurus dan penerapannya."
        },
        {
            kode: "IPAS-IP-06",
            kompetensi: "Perubahan wujud benda",
            tingkat: "pemantapan",
            persentase: 83,
            nomorAcuan: [20, 21],
            fokus: "Mengidentifikasi berbagai perubahan wujud benda."
        }
    ],

  // BATAS PRIORITAS BERDASARKAN PERSENTASE PENGUASAAN
  kategoriKemampuan: {
    prioritasTinggi: {
      minimal: 0,
      maksimal: 39
    },
    intensif: {
      minimal: 40,
      maksimal: 59
    },
    penguatan: {
      minimal: 60,
      maksimal: 74
    },
    pemantapan: {
      minimal: 75,
      maksimal: 89
    },
    pengayaan: {
      minimal: 90,
      maksimal: 100
    }
  }
};

console.log("Profil siswa berhasil dimuat:", window.profilSiswa);
