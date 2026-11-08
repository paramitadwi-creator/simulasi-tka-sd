// Menerapkan bacaan panjang (150–300 kata) dari window.bacaanBahasa ke semua soal Bahasa Indonesia.
// Dimuat setelah app.js agar bankSoal.bahasa juga terjangkau.
(function () {
  const data = window.bacaanBahasa || {};
  const bank = [];
  if (typeof bankSoal !== "undefined" && Array.isArray(bankSoal.bahasa)) bank.push(bankSoal.bahasa);
  ["soalAdaptifBahasa", "soalKisiBahasa"].forEach((nama) => {
    if (Array.isArray(window[nama])) bank.push(window[nama]);
  });

  const pembuka = /^(Perhatikan percakapan berikut\.|Bacalah cerita berikut\.)/;

  bank.forEach((daftar) => daftar.forEach((q) => {
    const entri = data[q.id];
    if (!entri) return;
    const stimulus = typeof entri === "string" ? entri : entri.stimulus;
    if (typeof entri === "object" && entri.question) {
      q.question = entri.question;
    } else if (pembuka.test((q.question || "").trim())) {
      // Percakapan/cerita sudah ada di bacaan; sisakan kalimat pertanyaannya saja.
      const bagian = q.question.trim().split(/\n\s*\n/);
      q.question = bagian[bagian.length - 1].trim();
    }
    if (stimulus) q.stimulus = stimulus;
  }));
})();
