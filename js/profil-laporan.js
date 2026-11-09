// =====================================================================
// PROFIL LAPORAN ORANG TUA — Langkah 2
// ---------------------------------------------------------------------
// Nama anak, nomor WhatsApp orang tua (opsional), dan persetujuan penggunaan data.
// Disimpan HANYA di localStorage perangkat & browser ini (kunci "tkaLaporanProfil").
// Tidak pernah ditulis ke berkas JavaScript, URL, atau konsol; tidak dikirim ke server.
//
// Bagian 1 — fungsi murni (validasi & format), bisa diuji di Node.
// Bagian 2 — penyimpanan (baca/tulis/hapus) dengan penanganan galat.
// Bagian 3 — formulir di halaman (hanya berjalan di browser bila elemennya ada).
// =====================================================================
(function (akar) {
  "use strict";

  const KUNCI = "tkaLaporanProfil";
  const VERSI_DATA = 1;
  // Naikkan bila teks persetujuan berubah: orang tua akan diminta menyetujui ulang
  const VERSI_PERSETUJUAN = 1;
  const TEKS_PERSETUJUAN =
    "Saya setuju nama anak dan nomor WhatsApp di atas disimpan hanya di browser perangkat ini " +
    "untuk menyusun laporan belajar harian. Data tidak dikirim ke server mana pun. Laporan hanya " +
    "terkirim bila saya sendiri menekan tombol kirim di WhatsApp. Saya dapat menghapus data ini kapan saja.";
  const NAMA_MIN = 2, NAMA_MAKS = 40;
  // Karakter kontrol & tak terlihat (zero-width, arah teks, BOM), dibangun dari kode karakter
  const rentang = (a, b) => String.fromCharCode(a) + "-" + String.fromCharCode(b);
  const KARAKTER_TERSEMBUNYI = new RegExp("[" + [rentang(0x00, 0x1f), rentang(0x7f, 0x9f), rentang(0x200b, 0x200f),
    rentang(0x2028, 0x202e), rentang(0x2060, 0x206f), String.fromCharCode(0xfeff)].join("") + "]", "g");

  // ---------- Bagian 1: fungsi murni ----------
  // Nama: hapus karakter kontrol/tak terlihat, rapikan spasi; hanya huruf, spasi, titik, apostrof, tanda hubung.
  function periksaNama(masukan) {
    const nilai = String(masukan ?? "")
      .normalize("NFC")
      .replace(KARAKTER_TERSEMBUNYI, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!nilai) return { ok: false, nilai, pesan: "Nama anak wajib diisi." };
    if (nilai.length < NAMA_MIN) return { ok: false, nilai, pesan: `Nama anak minimal ${NAMA_MIN} huruf.` };
    if (nilai.length > NAMA_MAKS) return { ok: false, nilai, pesan: `Nama anak maksimal ${NAMA_MAKS} karakter.` };
    if (!/^[\p{L}][\p{L}\p{M} .'’-]*$/u.test(nilai)) {
      return { ok: false, nilai, pesan: "Nama anak hanya boleh berisi huruf, spasi, titik, apostrof, atau tanda hubung." };
    }
    return { ok: true, nilai, pesan: "" };
  }

  // Nomor WhatsApp Indonesia (seluler). Menerima 0812…, 62812…, +62 812-…, (0812) …
  // Hasil baku: "62" + 8 + 8–11 digit (total 11–14 digit), tanpa tanda "+", siap untuk wa.me.
  // Kosong = boleh (nomor opsional: WhatsApp akan meminta orang tua memilih kontak).
  function periksaNomorWa(masukan) {
    const mentah = String(masukan ?? "").trim();
    if (!mentah) return { ok: true, nilai: "", kosong: true, pesan: "" };
    if (/[^\d\s+().-]/.test(mentah)) return { ok: false, nilai: "", pesan: "Nomor hanya boleh berisi angka (boleh diawali +62 atau 0)." };
    if (mentah.indexOf("+") > 0 || (mentah.match(/\+/g) || []).length > 1) return { ok: false, nilai: "", pesan: "Tanda + hanya boleh di awal nomor." };
    let angka = mentah.replace(/\D/g, "");
    if (angka.startsWith("0062")) angka = angka.slice(2);
    if (angka.startsWith("620")) angka = "62" + angka.slice(3); // "+62 0812…" (nol ganda)
    if (angka.startsWith("0")) angka = "62" + angka.slice(1);
    else if (angka.startsWith("8")) angka = "62" + angka;
    if (!angka.startsWith("62")) return { ok: false, nilai: "", pesan: "Gunakan nomor Indonesia yang diawali 08, 62, atau +62." };
    if (!angka.startsWith("628")) return { ok: false, nilai: "", pesan: "Gunakan nomor ponsel (diawali 08…), bukan nomor telepon rumah." };
    if (angka.length < 11) return { ok: false, nilai: "", pesan: "Nomor terlalu pendek. Periksa kembali, mis. 0812 3456 7890." };
    if (angka.length > 14) return { ok: false, nilai: "", pesan: "Nomor terlalu panjang. Periksa kembali, mis. 0812 3456 7890." };
    if (!/^628[1-9]\d{7,10}$/.test(angka)) return { ok: false, nilai: "", pesan: "Format nomor ponsel tidak dikenali." };
    return { ok: true, nilai: angka, kosong: false, pesan: "" };
  }

  // "62812xxxxyyyy" -> "+62 812-xxxx-yyyy"
  function formatNomor(nomor) {
    if (!/^628\d{8,11}$/.test(String(nomor))) return "";
    const lokal = String(nomor).slice(2); // 81234567890
    return "+62 " + [lokal.slice(0, 3), lokal.slice(3, 7), lokal.slice(7)].filter(Boolean).join("-");
  }
  // "62812xxxxyyyy" -> "+62 812-****-yyyy" (untuk ditampilkan di layar)
  function samarkanNomor(nomor) {
    if (!/^628\d{8,11}$/.test(String(nomor))) return "";
    const lokal = String(nomor).slice(2);
    return "+62 " + lokal.slice(0, 3) + "-" + "*".repeat(Math.max(1, lokal.length - 7)) + "-" + lokal.slice(-4);
  }

  // Bangun objek profil baku dari isian formulir. Tidak menyimpan apa pun.
  function buatProfil({ namaAnak, nomorWa, setuju }, sekarang) {
    const galat = {};
    const n = periksaNama(namaAnak);
    if (!n.ok) galat.namaAnak = n.pesan;
    const w = periksaNomorWa(nomorWa);
    if (!w.ok) galat.nomorWa = w.pesan;
    if (setuju !== true) galat.setuju = "Centang persetujuan agar data dapat disimpan.";
    if (Object.keys(galat).length) return { ok: false, galat };
    const waktu = new Date(sekarang || Date.now()).toISOString();
    return {
      ok: true,
      profil: {
        v: VERSI_DATA,
        namaAnak: n.nilai,
        nomorWa: w.nilai,
        persetujuan: { versi: VERSI_PERSETUJUAN, waktu },
        diperbarui: waktu
      }
    };
  }

  // Periksa profil hasil baca penyimpanan. Data rusak/asing dianggap tidak ada (tidak dipakai).
  function validasiProfil(data) {
    if (!data || typeof data !== "object" || data.v !== VERSI_DATA) return null;
    const n = periksaNama(data.namaAnak);
    const w = periksaNomorWa(data.nomorWa);
    if (!n.ok || !w.ok || n.nilai !== data.namaAnak || w.nilai !== data.nomorWa) return null;
    const p = data.persetujuan;
    if (!p || typeof p.versi !== "number" || isNaN(Date.parse(p.waktu))) return null;
    return {
      v: VERSI_DATA, namaAnak: n.nilai, nomorWa: w.nilai,
      persetujuan: { versi: p.versi, waktu: p.waktu },
      diperbarui: isNaN(Date.parse(data.diperbarui)) ? p.waktu : data.diperbarui,
      // Teks persetujuan berubah sejak disetujui -> perlu persetujuan ulang sebelum dipakai
      perluPersetujuanUlang: p.versi < VERSI_PERSETUJUAN
    };
  }

  // ---------- Bagian 2: penyimpanan ----------
  const ambilPenyimpanan = (s) => s || (typeof localStorage !== "undefined" ? localStorage : null);

  function bacaProfil(penyimpanan) {
    try {
      const s = ambilPenyimpanan(penyimpanan);
      const teks = s ? s.getItem(KUNCI) : null;
      return teks ? validasiProfil(JSON.parse(teks)) : null;
    } catch (e) {
      return null;
    }
  }
  // Mengembalikan { ok, alasan } — alasan: "tidak-valid" | "penuh" | "tidak-tersedia"
  function simpanProfil(isian, penyimpanan, sekarang) {
    const hasil = buatProfil(isian, sekarang);
    if (!hasil.ok) return { ok: false, alasan: "tidak-valid", galat: hasil.galat };
    try {
      const s = ambilPenyimpanan(penyimpanan);
      if (!s) return { ok: false, alasan: "tidak-tersedia" };
      const teks = JSON.stringify(hasil.profil);
      s.setItem(KUNCI, teks);
      if (s.getItem(KUNCI) !== teks) return { ok: false, alasan: "tidak-tersedia" };
      return { ok: true, profil: validasiProfil(hasil.profil) };
    } catch (e) {
      const penuh = e && (e.name === "QuotaExceededError" || e.code === 22);
      return { ok: false, alasan: penuh ? "penuh" : "tidak-tersedia" };
    }
  }
  function hapusProfil(penyimpanan) {
    try {
      const s = ambilPenyimpanan(penyimpanan);
      if (!s) return false;
      s.removeItem(KUNCI);
      return s.getItem(KUNCI) === null;
    } catch (e) {
      return false;
    }
  }

  const api = Object.freeze({
    KUNCI, VERSI_PERSETUJUAN, TEKS_PERSETUJUAN,
    periksaNama, periksaNomorWa, formatNomor, samarkanNomor, buatProfil, validasiProfil,
    bacaProfil, simpanProfil, hapusProfil
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (akar && typeof akar === "object") akar.ProfilLaporan = api;

  // ---------- Bagian 3: formulir di halaman ----------
  if (typeof document === "undefined") return;
  document.addEventListener("DOMContentLoaded", () => {
    const wadah = document.getElementById("profilLaporan");
    if (!wadah) return;
    const $ = (id) => document.getElementById(id);
    const form = $("formProfilLaporan"), ringkas = $("ringkasProfilLaporan"), status = $("statusProfilLaporan");
    const input = { namaAnak: $("profilNamaAnak"), nomorWa: $("profilNomorWa"), setuju: $("profilSetuju") };
    const pesanGalat = { namaAnak: $("galatNamaAnak"), nomorWa: $("galatNomorWa"), setuju: $("galatSetuju") };
    $("teksPersetujuan").textContent = TEKS_PERSETUJUAN;

    // Beri tahu bagian lain (dashboard laporan) bahwa profil berubah
    const kabariPerubahan = () => window.dispatchEvent(new CustomEvent("profil-laporan-berubah"));
    const umumkan = (teks, nada) => {
      status.textContent = teks;
      status.className = "profil-status" + (nada ? " is-" + nada : "");
      status.hidden = !teks;
    };
    const tampilkanGalat = (galat) => {
      Object.keys(input).forEach((k) => {
        const ada = galat && galat[k];
        pesanGalat[k].textContent = ada || "";
        pesanGalat[k].hidden = !ada;
        input[k].setAttribute("aria-invalid", ada ? "true" : "false");
      });
    };

    function tampilkan(mode) {
      const profil = bacaProfil();
      const edit = mode === "edit" || !profil || profil.perluPersetujuanUlang;
      form.hidden = !edit;
      ringkas.hidden = edit;
      $("batalProfil").hidden = !profil;
      if (profil && !edit) {
        $("ringkasNamaAnak").textContent = profil.namaAnak;
        $("ringkasNomorWa").textContent = profil.nomorWa ? samarkanNomor(profil.nomorWa) : "Belum diisi (pilih kontak saat mengirim)";
        $("ringkasPersetujuan").textContent = new Date(profil.persetujuan.waktu).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
      }
      if (edit) {
        input.namaAnak.value = profil ? profil.namaAnak : "";
        input.nomorWa.value = profil && profil.nomorWa ? "0" + profil.nomorWa.slice(2) : "";
        // Persetujuan selalu dicentang ulang secara sadar setiap kali menyimpan
        input.setuju.checked = false;
        tampilkanGalat(null);
        if (profil && profil.perluPersetujuanUlang) umumkan("Teks persetujuan diperbarui. Mohon baca dan setujui kembali.", "peringatan");
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const hasil = simpanProfil({ namaAnak: input.namaAnak.value, nomorWa: input.nomorWa.value, setuju: input.setuju.checked });
      if (!hasil.ok) {
        if (hasil.alasan === "tidak-valid") {
          tampilkanGalat(hasil.galat);
          umumkan("Periksa kembali isian yang ditandai.", "galat");
          const pertama = ["namaAnak", "nomorWa", "setuju"].find((k) => hasil.galat[k]);
          if (pertama) input[pertama].focus();
        } else {
          umumkan(hasil.alasan === "penuh"
            ? "Penyimpanan perangkat penuh. Hapus beberapa riwayat latihan lalu coba lagi."
            : "Browser ini tidak mengizinkan penyimpanan, jadi profil tidak dapat disimpan.", "galat");
        }
        return;
      }
      tampilkan("lihat");
      umumkan("Profil tersimpan di perangkat ini.", "ok");
      kabariPerubahan();
      $("ubahProfil").focus();
    });

    // Validasi saat kolom ditinggalkan, supaya kesalahan terlihat lebih awal
    input.namaAnak.addEventListener("blur", () => {
      if (!input.namaAnak.value.trim()) return;
      const n = periksaNama(input.namaAnak.value);
      pesanGalat.namaAnak.textContent = n.pesan; pesanGalat.namaAnak.hidden = n.ok;
      input.namaAnak.setAttribute("aria-invalid", n.ok ? "false" : "true");
    });
    input.nomorWa.addEventListener("blur", () => {
      const w = periksaNomorWa(input.nomorWa.value);
      pesanGalat.nomorWa.textContent = w.pesan; pesanGalat.nomorWa.hidden = w.ok;
      input.nomorWa.setAttribute("aria-invalid", w.ok ? "false" : "true");
      if (w.ok && w.nilai) input.nomorWa.value = "0" + w.nilai.slice(2);
    });

    $("ubahProfil").addEventListener("click", () => { umumkan("", ""); tampilkan("edit"); input.namaAnak.focus(); });
    $("batalProfil").addEventListener("click", () => { umumkan("", ""); tampilkan("lihat"); $("ubahProfil").focus(); });
    $("hapusProfil").addEventListener("click", async () => {
      const setuju = typeof window.tanyaKonfirmasi === "function"
        ? await window.tanyaKonfirmasi({
          judul: "Hapus profil laporan?",
          pesan: "Nama anak, nomor WhatsApp, dan persetujuan akan dihapus dari perangkat ini. Riwayat latihan tidak terpengaruh.",
          ok: "Ya, hapus", batal: "Batal", nada: "bahaya", ikon: "#i-alert"
        })
        : window.confirm("Hapus profil laporan dari perangkat ini?");
      if (!setuju) return;
      if (hapusProfil()) { sedangMengedit = false; tampilkan("edit"); umumkan("Profil laporan sudah dihapus dari perangkat ini.", "ok"); input.namaAnak.focus(); kabariPerubahan(); }
      else umumkan("Profil tidak dapat dihapus karena penyimpanan browser tidak tersedia.", "galat");
    });

    // Sedang mengedit = orang tua menekan "Ubah profil" atau mulai mengisi formulir
    let sedangMengedit = false;
    form.addEventListener("input", () => { sedangMengedit = true; });
    $("ubahProfil").addEventListener("click", () => { sedangMengedit = true; });
    $("batalProfil").addEventListener("click", () => { sedangMengedit = false; });
    form.addEventListener("submit", () => { if (!form.hidden) return; sedangMengedit = false; }); // tersimpan -> ringkasan tampil

    // Profil diubah di tab lain
    window.addEventListener("storage", (e) => {
      if (e.key !== KUNCI && e.key !== null) return;
      if (sedangMengedit) {
        // Jangan menimpa isian yang sedang diketik; cukup beri tahu
        umumkan("Profil baru saja diubah di tab lain. Bila Anda menyimpan sekarang, isian di sini yang akan dipakai.", "peringatan");
      } else {
        tampilkan("lihat");
      }
      kabariPerubahan();
    });

    tampilkan("lihat");
  });
})(typeof window !== "undefined" ? window : null);
