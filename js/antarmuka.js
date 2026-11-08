// Interaksi antarmuka umum (hanya tampilan; tidak menyentuh logika soal, penilaian, atau penyimpanan).
(function () {
  // ---------- Menu navigasi ponsel (<details>) ----------
  const menu = document.querySelector(".nav-mobile");
  if (menu) {
    const tutup = (kembalikanFokus) => {
      if (!menu.open) return;
      menu.open = false;
      if (kembalikanFokus) menu.querySelector("summary").focus();
    };

    // Tutup setelah memilih tautan, supaya bagian tujuan langsung terlihat
    menu.querySelectorAll("a").forEach((tautan) => {
      tautan.addEventListener("click", () => tutup(false));
    });

    // Tutup dengan tombol Esc dan kembalikan fokus ke tombol Menu
    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") tutup(true);
    });

    // Tutup bila mengetuk di luar menu
    document.addEventListener("click", (e) => {
      if (menu.open && !menu.contains(e.target)) tutup(false);
    });

    // Bila layar dilebarkan sampai menu desktop tampil, tutup menu ponsel
    window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
      if (e.matches) tutup(false);
    });
  }
})();
