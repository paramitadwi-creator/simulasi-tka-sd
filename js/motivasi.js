
(function () {
  "use strict";

  const PESAN = {
    tinggi: [
      ["MasyaAllah, hebat sekali!", "Hasil belajarmu membanggakan. Pertahankan rasa ingin tahu dan semangat untuk terus berkembang."],
      ["Kerja kerasmu terlihat!", "Kamu sudah menunjukkan usaha yang luar biasa. Tetap rendah hati dan terus belajar."],
      ["Keren! Terus bertumbuh!", "Kamu berhasil melewati tantangan hari ini. Jadikan keberhasilan ini penyemangat."]
    ],
    baik: [
      ["Usahamu membuahkan hasil!", "Kamu sudah berada di jalur yang baik. Terus berlatih agar pemahamanmu semakin kuat."],
      ["Bagus, teruskan!", "Setiap latihan membuatmu semakin terampil. Pertahankan kebiasaan belajar yang baik."],
      ["Satu langkah lebih maju!", "Terus asah kemampuanmu dan jangan takut menghadapi soal baru."]
    ],
    berkembang: [
      ["Kamu sedang berkembang!", "Masih ada beberapa hal yang bisa dipelajari. Pelan-pelan saja, yang penting terus berusaha."],
      ["Terus berlatih, ya!", "Tidak harus langsung bisa semuanya. Pelajari pembahasan dan coba kembali."],
      ["Setiap usaha itu berarti!", "Ambil pelajaran dari setiap soal dan terus melangkah."]
    ],
    semangat: [
      ["Jangan menyerah, pejuang hebat!", "Hasil hari ini bukan batas kemampuanmu. Kesalahan adalah kesempatan untuk belajar. Yuk, coba lagi!"],
      ["Tidak apa-apa, kita belajar lagi!", "Kamu berani mencoba, dan itu langkah penting. Besok adalah kesempatan baru."],
      ["Tetap semangat!", "Belajar membutuhkan waktu dan kesabaran. Istirahat sejenak, lalu lanjutkan saat siap."]
    ],
    naik: [
      ["Kemajuanmu terlihat!", "Nilaimu naik {selisih} poin dibandingkan latihan sebelumnya. Usahamu mulai membuahkan hasil!"],
      ["MasyaAllah, ada peningkatan!", "Kali ini nilaimu bertambah {selisih} poin. Teruskan kebiasaan belajar yang baik."],
      ["Langkah kecil, kemajuan besar!", "Nilaimu meningkat {selisih} poin. Terus bertumbuh!"]
    ],
    turun: [
      ["Tetap semangat, ya!", "Nilaimu kali ini {selisih} poin lebih rendah. Tidak apa-apa. Satu hasil tidak menentukan kemampuanmu."],
      ["Masih ada kesempatan!", "Cari tahu bagian yang masih sulit, lalu coba lagi. Kamu bisa berkembang."],
      ["Jangan berkecil hati!", "Hasil latihan kadang naik dan kadang turun. Teruslah berusaha."]
    ],
    tetap: [
      ["Konsistensimu patut diapresiasi!", "Nilaimu tetap sama. Terus berlatih agar pemahamanmu semakin kuat."],
      ["Terus jaga semangat belajar!", "Sekarang, coba tantang dirimu memahami materi lebih dalam."],
      ["Kamu terus melangkah!", "Jadikan latihan berikutnya kesempatan memperkuat kemampuanmu."]
    ],
    pertama: [
      ["Selamat, kamu sudah memulai!", "Setiap perjalanan belajar dimulai dari satu langkah. Terus semangat!"],
      ["Awal yang baik!", "Jadikan hasil latihan ini sebagai petunjuk untuk belajar lebih terarah."],
      ["Terus tumbuh dan belajar!", "Fokus pada usaha dan perkembangan dirimu sendiri."]
    ]
  };

  function pilih(daftar, seed) {
    let hash = 2166136261;
    const teks = String(seed || "tka");

    for (let i = 0; i < teks.length; i++) {
      hash ^= teks.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    return daftar[(hash >>> 0) % daftar.length];
  }

  function buat(hasil, sebelumnya) {
    const nilai = Math.max(
      0,
      Math.min(100, Number(hasil && hasil.nilai) || 0)
    );

    const seed = [
      hasil && hasil.tanggal,
      hasil && hasil.mapel,
      hasil && hasil.mode,
      nilai
    ].join("|");

    let kelompok = "pertama";
    let selisih = null;

    if (sebelumnya && Number.isFinite(Number(sebelumnya.nilai))) {
      selisih = nilai - Number(sebelumnya.nilai);

      if (selisih > 0) kelompok = "naik";
      else if (selisih < 0) kelompok = "turun";
      else kelompok = "tetap";
    } else if (nilai >= 90) kelompok = "tinggi";
    else if (nilai >= 75) kelompok = "baik";
    else if (nilai >= 60) kelompok = "berkembang";
    else kelompok = "semangat";

    const variasi = pilih(PESAN[kelompok], seed);

    return {
      kode: kelompok + "-" + (PESAN[kelompok].indexOf(variasi) + 1),
      kategori: kelompok,
      judul: variasi[0],
      pesan: variasi[1].replace(
        "{selisih}",
        String(Math.abs(selisih || 0))
      ),
      dibandingkan: sebelumnya ? {
        nilaiSebelumnya: Number(sebelumnya.nilai),
        selisih
      } : null
    };
  }

  window.Motivasi = { buat };

})();
