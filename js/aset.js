// Pemetaan gambar soal ke versi tetap (immutable) berbasis hash.
// Data dari js/aset-manifest.js (dibuat oleh alat/versi-aset.js). Bank soal tetap memakai
// jalur sumber; tampilan memakai berkas versi agar gambar yang dilihat siswa bisa disimpan
// di riwayat dan ditampilkan lagi persis sama walau gambar sumber kelak diperbarui.
(function () {
  const peta = (window.ASET_MANIFEST && window.ASET_MANIFEST.berkas) || {};
  window.Aset = {
    // { src: "assets/versi/<hash>.svg", hash } atau null bila belum terdaftar di manifest
    info(jalur) {
      const v = jalur ? peta[jalur] : null;
      return v && v.src && v.hash ? { src: v.src, hash: v.hash } : null;
    },
    // Jalur untuk ditampilkan: versi terbaru bila terdaftar, selain itu jalur sumber
    src(jalur) {
      const v = jalur ? peta[jalur] : null;
      return v && v.src ? v.src : jalur;
    }
  };
})();
