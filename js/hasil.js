// Halaman Hasil & Pembahasan (hanya tampilan).
// Menerima data yang sudah dibekukan oleh finishQuiz() di app.js: soal (objek bank asli),
// jawaban siswa (salinan), status benar dari isCorrect(), dan peta hasil belajar.
// Tidak menghitung ulang nilai, tidak mengubah bank soal, kunci, atau penyimpanan.
(function () {
  const $ = (id) => document.getElementById(id);
  const huruf = (n) => String.fromCharCode(65 + n);
  const NAMA_MODE = { practice: "Latihan", exam: "Simulasi Ujian", adaptive: "Latihan Adaptif" };
  const NAMA_TIPE = { pg: "Pilihan Ganda", pgk: "Pilihan Ganda Kompleks", pgk_kategori: "Pilihan Ganda Kategori" };
  const LABEL_KESULITAN = { mudah: "Mudah", sedang: "Sedang", sulit: "Sulit" };
  const FILTER = [
    ["semua", "Semua soal"],
    ["benar", "Benar"],
    ["salah", "Salah"],
    ["kosong", "Belum dijawab"],
    ["ragu", "Ragu-ragu"]
  ];

  let data = null;          // hasil sesi terakhir (tetap ada selama halaman hasil dibuka)
  let filterAktif = "semua";
  let posisi = 0;           // indeks di dalam daftar hasil filter
  let kembaliKeDaftar = false; // riwayat dibuka dari Beranda: tombol Beranda kembali ke daftar riwayat

  const el = (tag, kelas, teks) => {
    const e = document.createElement(tag);
    if (kelas) e.className = kelas;
    if (teks !== undefined && teks !== null) e.textContent = teks;
    return e;
  };
  const ikon = (id, kelas = "icon") => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", kelas);
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", id);
    svg.appendChild(use);
    return svg;
  };

  const statusSoal = (s) => (s.jawaban === null ? "kosong" : s.benar ? "benar" : "salah");
  const LABEL_STATUS = { benar: "Benar", salah: "Salah", kosong: "Belum dijawab" };
  const IKON_STATUS = { benar: "#i-check-circle", salah: "#i-x-circle", kosong: "#i-minus-circle" };
  const cocokFilter = (s, f) => f === "semua" || (f === "ragu" ? s.ragu : statusSoal(s) === f);
  const daftarFilter = () => data.soal.filter((s) => cocokFilter(s, filterAktif));

  const namaIndikator = (nomor) => {
    const kisi = (window.kisiKisiTKA || {})[data.mapel];
    return kisi && kisi.indikator && kisi.indikator[nomor] ? kisi.indikator[nomor] : null;
  };

  // ======================= BAGIAN A: RINGKASAN =======================
  function renderRingkasan() {
    const total = data.total;
    const benar = data.benar;
    const kosong = total - data.terjawab;
    const salah = data.terjawab - benar;
    const ragu = data.soal.filter((s) => s.ragu).length;
    const persen = total ? Math.round((benar / total) * 100) : 0;

    $("resultTag").textContent = (data.dariRiwayat ? "Riwayat " : "Hasil ") + NAMA_MODE[data.mode].toLowerCase();
    $("resultTitle").textContent = data.dariRiwayat
      ? "Hasil " + NAMA_MODE[data.mode]
      : data.mode === "exam" ? "Simulasi selesai!" : "Latihan selesai!";
    const waktu = new Date(data.tanggal);
    $("resultMeta").textContent = [data.namaMapel, NAMA_MODE[data.mode], isNaN(waktu) ? "" : waktu.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })]
      .filter(Boolean).join(" · ");

    $("scoreValue").textContent = data.nilai;
    $("resultSummary").textContent = benar === total
      ? `Luar biasa! Semua ${total} soal kamu jawab dengan benar.`
      : `Kamu menjawab benar ${benar} dari ${total} soal. ${persen >= 75 ? "Hasil yang bagus, pertahankan!" : "Pelajari pembahasannya agar nilaimu naik."}`;

    const prog = $("scoreProgress");
    prog.replaceChildren();
    const kepala = el("div", "score-progress-head");
    kepala.append(el("span", null, "Persentase keberhasilan"), el("strong", null, persen + "%"));
    const bar = el("div", "score-bar");
    bar.setAttribute("role", "img");
    bar.setAttribute("aria-label", `Benar ${benar}, salah ${salah}, belum dijawab ${kosong} dari ${total} soal`);
    [["benar", benar], ["salah", salah], ["kosong", kosong]].forEach(([k, n]) => {
      if (!n) return;
      const i = el("i", "is-" + k);
      i.style.width = (n / total) * 100 + "%";
      bar.appendChild(i);
    });
    prog.append(kepala, bar);
    // Motivation Engine
    const wadahMotivasi = $("resultMotivation");

    if (wadahMotivasi) {
      wadahMotivasi.replaceChildren();

      const pesanMotivasi = data.motivasi ||
        (window.Motivasi &&
         typeof window.Motivasi.buat === "function"
          ? window.Motivasi.buat(data, null)
          : null);

      if (pesanMotivasi) {
        wadahMotivasi.append(
          el("h3", "result-motivation-title", pesanMotivasi.judul),
          el("p", "result-motivation-message", pesanMotivasi.pesan)
        );
        wadahMotivasi.hidden = false;
      } else {
        wadahMotivasi.hidden = true;
      }
    }
    // Kartu angka (bisa diklik untuk membuka pembahasan sesuai status)
    const stats = $("resultStats");
    stats.replaceChildren();
    [["benar", benar, "Jawaban benar", "#i-check-circle"],
     ["salah", salah, "Jawaban salah", "#i-x-circle"],
     ["kosong", kosong, "Tidak dijawab", "#i-minus-circle"],
     ["ragu", ragu, "Ditandai ragu-ragu", "#i-flag"]].forEach(([k, n, label, id]) => {
      const b = el("button", "stat-card is-" + k);
      b.type = "button";
      b.disabled = n === 0;
      b.setAttribute("aria-label", `${label}: ${n}. ${n ? "Lihat pembahasannya" : ""}`.trim());
      b.append(ikon(id), el("strong", null, n), el("span", null, label));
      if (n) b.addEventListener("click", () => bukaPembahasan(k));
      stats.appendChild(b);
    });

    renderPenguasaan();
    renderRekomendasi({ salah, kosong, ragu });
  }

  // Materi dikuasai / perlu diperkuat: dari peta hasil (indikator kisi-kisi);
  // bila soal tidak memiliki indikator, dikelompokkan menurut materi (topic).
  function kelompokMateri() {
    const baris = (data.peta && data.peta.baris) || [];
    if (baris.length) {
      return baris.map((b) => ({ nama: b.nama, label: "Indikator " + b.nomor, benar: b.benar, total: b.total, persen: b.persen, status: b.status }));
    }
    const per = new Map();
    data.soal.forEach((s) => {
      const k = (s.q && s.q.topic) || "Lainnya";
      if (!per.has(k)) per.set(k, { nama: k, label: "Materi", benar: 0, total: 0 });
      const d = per.get(k); d.total++; if (s.benar) d.benar++;
    });
    const batas = window.kisiKisiTKA || { batasDikuasai: 75, batasBerkembang: 50 };
    return [...per.values()].map((d) => {
      const persen = Math.round((d.benar / d.total) * 100);
      return { ...d, persen, status: persen >= batas.batasDikuasai ? "dikuasai" : persen >= batas.batasBerkembang ? "berkembang" : "lemah" };
    });
  }

  function renderPenguasaan() {
    const wadah = $("resultMastery");
    wadah.replaceChildren();
    const semua = kelompokMateri();
    const dikuasai = semua.filter((m) => m.status === "dikuasai").sort((a, b) => b.persen - a.persen || b.total - a.total);
    const perlu = semua.filter((m) => m.status !== "dikuasai").sort((a, b) => a.persen - b.persen || b.total - a.total);

    const kolom = (judul, idIkon, kelas, daftar, kosongTeks) => {
      const sec = el("section", "mastery-col " + kelas);
      const h = el("h3");
      h.append(ikon(idIkon), document.createTextNode(` ${judul} `), el("span", "mastery-count", daftar.length));
      sec.appendChild(h);
      if (!daftar.length) { sec.appendChild(el("p", "mastery-empty", kosongTeks)); return sec; }
      const ul = el("ul");
      daftar.forEach((m) => {
        const li = el("li");
        const teks = el("div", "mastery-text");
        teks.append(el("span", "mastery-name", m.nama), el("small", null, `${m.label} · ${m.benar}/${m.total} benar`));
        const angka = el("span", "mastery-pct", m.persen + "%");
        li.append(teks, angka);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      return sec;
    };
    wadah.append(
      kolom("Materi yang sudah dikuasai", "#i-check-circle", "is-dikuasai", dikuasai, "Belum ada materi yang mencapai batas dikuasai pada sesi ini. Tetap semangat!"),
      kolom("Materi yang perlu diperkuat", "#i-target", "is-perlu", perlu, "Hebat! Semua materi yang diuji sudah dikuasai.")
    );
  }

  function renderRekomendasi({ salah, kosong, ragu }) {
    const wadah = $("resultReco");
    wadah.replaceChildren();
    const h = el("h3");
    h.append(ikon("#i-trend-up"), document.createTextNode(" Rekomendasi latihan berikutnya"));
    wadah.appendChild(h);

    const ol = el("ol", "reco-list");
    const perlu = kelompokMateri().filter((m) => m.status !== "dikuasai").sort((a, b) => a.persen - b.persen || b.total - a.total).slice(0, 3);
    if (perlu.length) {
      const li = el("li");
      li.append(el("strong", null, "Perkuat materi ini lebih dulu:"));
      const sub = el("ul", "reco-sub");
      perlu.forEach((m) => sub.appendChild(el("li", null, `${m.nama} (${m.persen}%)`)));
      li.appendChild(sub);
      ol.appendChild(li);
    }
    if (salah) ol.appendChild(el("li", null, `Baca pembahasan ${salah} soal yang salah, lalu coba jelaskan kembali dengan kata-katamu sendiri.`));
    if (kosong) ol.appendChild(el("li", null, `Ada ${kosong} soal yang tidak dijawab. Atur waktu: kerjakan soal yang mudah dulu, lalu kembali ke soal yang sulit.`));
    if (ragu) ol.appendChild(el("li", null, `Periksa ${ragu} soal yang kamu tandai ragu-ragu untuk memastikan pemahamanmu.`));
    if (!ol.children.length) ol.appendChild(el("li", null, "Pertahankan! Coba Simulasi Ujian dengan soal baru untuk menguji kesiapanmu."));
    wadah.appendChild(ol);

    // Tombol tindakan yang benar-benar berfungsi
    const aksi = el("div", "reco-actions");
    if (salah) {
      const b = el("button", "btn btn--secondary"); b.type = "button";
      b.append(ikon("#i-x-circle"), document.createTextNode(` Pelajari ${salah} soal yang salah`));
      b.addEventListener("click", () => bukaPembahasan("salah"));
      aksi.appendChild(b);
    }
    if (perlu.length && typeof beginQuiz === "function") {
      const b = el("button", "btn btn--primary"); b.type = "button";
      b.append(ikon("#i-target"), document.createTextNode(" Mulai Latihan Adaptif"));
      b.addEventListener("click", () => beginQuiz("adaptive"));
      aksi.appendChild(b);
    }
    if (aksi.children.length) wadah.appendChild(aksi);
  }

  // ======================= BAGIAN B & C: PEMBAHASAN =======================
  function renderFilter() {
    const wadah = $("reviewFilters");
    wadah.replaceChildren();
    FILTER.forEach(([kunci, label]) => {
      const n = data.soal.filter((s) => cocokFilter(s, kunci)).length;
      const b = el("button", "filter-chip is-" + kunci);
      b.type = "button";
      b.setAttribute("aria-pressed", kunci === filterAktif ? "true" : "false");
      b.disabled = n === 0 && kunci !== "semua";
      b.append(document.createTextNode(label + " "), el("span", "filter-count", n));
      b.addEventListener("click", () => { filterAktif = kunci; posisi = 0; renderPembahasan(true); });
      wadah.appendChild(b);
    });
  }

  function renderNomor() {
    const wadah = $("reviewNumbers");
    wadah.replaceChildren();
    const daftar = daftarFilter();
    data.soal.forEach((s) => {
      const st = statusSoal(s);
      const b = el("button", `review-number is-${st}${s.ragu ? " flagged" : ""}`, s.nomor);
      b.type = "button";
      const iDaftar = daftar.indexOf(s);
      const terpilih = daftar[posisi] === s;
      if (terpilih) { b.classList.add("current"); b.setAttribute("aria-current", "true"); }
      if (iDaftar < 0) b.classList.add("is-luar-filter");
      b.setAttribute("aria-label", `Soal ${s.nomor}, ${LABEL_STATUS[st].toLowerCase()}${s.ragu ? ", ragu-ragu" : ""}`);
      b.addEventListener("click", () => {
        if (iDaftar < 0) { filterAktif = "semua"; posisi = s.nomor - 1; } else posisi = iDaftar;
        renderPembahasan(true);
      });
      wadah.appendChild(b);
    });
  }

  function chip(teks, kelas, idIkon) {
    const c = el("span", "review-chip " + kelas);
    if (idIkon) c.appendChild(ikon(idIkon));
    c.appendChild(document.createTextNode(teks));
    return c;
  }

  // Pemberitahuan versi soal pada riwayat
  const PESAN_CATATAN = {
    "berubah": "Soal ini sudah diperbarui di bank soal setelah kamu mengerjakannya. Yang tampil di bawah adalah versi saat kamu mengerjakan, beserta kunci dan pembahasannya saat itu. Jawaban dan nilaimu tidak berubah.",
    "dihapus-dari-bank": "Soal ini sudah tidak ada di bank soal saat ini. Yang tampil adalah salinan saat kamu mengerjakan. Jawaban dan nilaimu tidak berubah.",
    "bacaan-hilang": "Salinan bacaan untuk soal ini tidak ditemukan di penyimpanan perangkat. Soal, jawaban, dan pembahasan tetap tampil.",
    "salinan-hilang": "Salinan soal saat pengerjaan tidak ditemukan di penyimpanan perangkat. Yang tampil adalah versi bank soal saat ini, yang mungkin berbeda. Status dan nilaimu tetap sesuai saat dikerjakan.",
    "tidak-tersedia": "Isi soal ini tidak dapat ditampilkan karena salinannya hilang dan soal sudah tidak ada di bank soal. Jawaban dan status tetap sesuai saat dikerjakan.",
    "gambar-berubah": "Gambar soal ini sudah diperbarui setelah kamu mengerjakannya. Yang tampil adalah gambar versi saat kamu mengerjakan.",
    "gambar-tanpa-versi": "Versi gambar saat soal ini dikerjakan tidak tercatat (riwayat lama). Gambar yang tampil adalah versi terbaru dan mungkin berbeda dari yang kamu lihat saat itu."
  };

  function kartuSoal(s, urutan, jumlah) {
    const q = s.q;
    const st = statusSoal(s);
    const kartu = document.createDocumentFragment();
    if (!q) return kartuTidakTersedia(s, kartu);

    // 1, 10: nomor & status
    const kepala = el("div", "review-head");
    const judul = el("h3", "review-title", `Soal ${s.nomor}`);
    judul.id = "reviewSoalJudul";
    judul.tabIndex = -1;
    const status = el("div", "review-status");
    status.append(chip(LABEL_STATUS[st], "is-" + st, IKON_STATUS[st]));
    if (s.ragu) status.append(chip("Ragu-ragu", "is-ragu", "#i-flag"));
    kepala.append(judul, status);
    kartu.appendChild(kepala);
    if (filterAktif !== "semua") kartu.appendChild(el("p", "review-pos", `${urutan + 1} dari ${jumlah} soal pada saringan “${FILTER.find((f) => f[0] === filterAktif)[1]}”`));
    if (s.catatan && PESAN_CATATAN[s.catatan]) kartu.appendChild(pemberitahuan(PESAN_CATATAN[s.catatan]));
    if (s.catatanGambar && PESAN_CATATAN[s.catatanGambar]) kartu.appendChild(pemberitahuan(PESAN_CATATAN[s.catatanGambar], s.catatanGambar));

    // 2, 3, 4: mapel, materi, indikator, kesulitan, tipe
    const meta = el("dl", "review-meta");
    const tambahMeta = (k, v) => { if (!v) return; const d = el("div"); d.append(el("dt", null, k), el("dd", null, v)); meta.appendChild(d); };
    tambahMeta("Mata pelajaran", data.namaMapel);
    tambahMeta("Materi", q.topic);
    const nmInd = s.indikator ? namaIndikator(s.indikator) : null;
    tambahMeta("Indikator", s.indikator ? `${s.indikator}${nmInd ? " · " + nmInd : ""}` : "Di luar kisi-kisi");
    tambahMeta("Tingkat kesulitan", LABEL_KESULITAN[q.difficulty] || q.difficulty);
    tambahMeta("Tipe soal", NAMA_TIPE[q.type] || q.type);
    kartu.appendChild(meta);

    // 6: bacaan/gambar lengkap (sama seperti saat mengerjakan)
    if (q.stimulus || q.image) {
      const stim = el("div", "stimulus-box review-stimulus-box");
      if (q.stimulus) stim.appendChild(document.createTextNode(q.stimulus));
      if (q.image) {
        // Riwayat: berkas versi yang tercatat saat dikerjakan. Sesi baru: versi terbaru dari manifest.
        const src = q.imageVersi || (window.Aset ? window.Aset.src(q.image) : q.image);
        const img = document.createElement("img");
        img.src = src;
        img.alt = q.imageAlt || "Gambar stimulus soal";
        img.loading = "lazy";
        // Berkas versi tidak ditemukan: beri tahu dengan jelas, JANGAN ganti dengan gambar versi lain
        img.addEventListener("error", () => {
          // Pesan "yang tampil adalah versi saat dikerjakan" tidak berlaku lagi: ganti dengan pesan ini
          const kartuIni = img.closest(".review-card");
          if (kartuIni) kartuIni.querySelectorAll('.review-version-note[data-jenis="gambar-berubah"]').forEach((n) => n.remove());
          img.replaceWith(pemberitahuan(`Gambar versi saat soal ini dikerjakan tidak ditemukan (${src}). Gambar versi lain sengaja tidak ditampilkan agar tidak keliru.`, "gambar-hilang"));
        }, { once: true });
        stim.appendChild(img);
      }
      kartu.appendChild(stim);
    }

    // 5: teks soal lengkap
    kartu.appendChild(el("p", "review-question", q.question));

    // 7, 8, 9: semua opsi, jawaban siswa, kunci
    const dipilih = s.jawaban || [];
    if (q.type === "pgk_kategori") {
      kartu.appendChild(tabelKategori(q, dipilih, s));
    } else {
      const ul = el("ul", "review-options");
      ul.setAttribute("aria-label", "Pilihan jawaban");
      q.options.forEach((teks, n) => {
        const kunci = q.answer.includes(n), pilih = dipilih.includes(n);
        const kelas = pilih && kunci ? "is-pilih-benar" : pilih ? "is-pilih-salah" : kunci ? "is-kunci" : "";
        const li = el("li", "review-option " + kelas);
        const tandaIkon = pilih && kunci ? "#i-check-circle" : pilih ? "#i-x-circle" : kunci ? "#i-check-circle" : null;
        const lingkar = el("span", "review-letter", huruf(n));
        const isi = el("span", "review-option-text", teks);
        li.append(lingkar, isi);
        const label = [];
        if (pilih) label.push(kunci ? "Jawabanmu · benar" : "Jawabanmu · salah");
        else if (kunci) label.push(q.type === "pgk" ? "Kunci · tidak kamu pilih" : "Kunci jawaban");
        if (label.length) {
          const tag = el("span", "review-option-tag");
          if (tandaIkon) tag.appendChild(ikon(tandaIkon));
          tag.appendChild(document.createTextNode(label[0]));
          li.appendChild(tag);
        }
        ul.appendChild(li);
      });
      kartu.appendChild(ul);
      kartu.appendChild(ringkasJawaban(q, dipilih, s));
    }

    // 11: pembahasan lengkap
    const bahas = el("div", "review-explanation");
    const hb = el("h4");
    hb.append(ikon("#i-book"), document.createTextNode(" Pembahasan"));
    bahas.append(hb, el("p", null, q.explanation));
    kartu.appendChild(bahas);
    return kartu;
  }

  function pemberitahuan(teks, jenis) {
    const p = el("p", "review-version-note");
    p.setAttribute("role", "note");
    if (jenis) p.dataset.jenis = jenis;
    p.append(ikon("#i-alert"), el("span", null, teks));
    return p;
  }

  function kartuTidakTersedia(s, kartu) {
    const st = statusSoal(s);
    const kepala = el("div", "review-head");
    const judul = el("h3", "review-title", `Soal ${s.nomor}`);
    judul.id = "reviewSoalJudul";
    judul.tabIndex = -1;
    const status = el("div", "review-status");
    status.append(chip(LABEL_STATUS[st], "is-" + st, IKON_STATUS[st]));
    if (s.ragu) status.append(chip("Ragu-ragu", "is-ragu", "#i-flag"));
    kepala.append(judul, status);
    kartu.append(kepala, pemberitahuan(PESAN_CATATAN["tidak-tersedia"]));
    const dl = el("dl", "review-meta");
    [["ID soal", s.idSoal], ["Jawabanmu", s.jawaban ? JSON.stringify(s.jawaban) : "Belum dijawab"]].forEach(([k, v]) => {
      const d = el("div"); d.append(el("dt", null, k), el("dd", null, v)); dl.appendChild(d);
    });
    kartu.appendChild(dl);
    return kartu;
  }

  function ringkasJawaban(q, dipilih, s) {
    const kotak = el("div", "review-answer-summary is-" + statusSoal(s));
    const dl = el("dl");
    const baris = (k, v) => { const d = el("div"); d.append(el("dt", null, k), el("dd", null, v)); dl.appendChild(d); };
    baris("Jawabanmu", dipilih.length ? dipilih.map(huruf).join(", ") : "Belum dijawab");
    baris("Kunci jawaban", q.answer.map(huruf).join(", "));
    kotak.appendChild(dl);
    if (q.type === "pgk") {
      // Penjelasan mekanisme penilaian PGK yang berlaku (tidak mengubah penilaian)
      const tepat = dipilih.filter((n) => q.answer.includes(n)).length;
      const keliru = dipilih.filter((n) => !q.answer.includes(n)).length;
      const p = el("p", "review-pgk-note");
      p.textContent = dipilih.length
        ? `Kamu memilih ${tepat} dari ${q.answer.length} jawaban benar dan ${keliru} pilihan yang salah. Soal PGK dinilai benar hanya jika semua jawaban benar dipilih dan tidak ada pilihan yang salah, jadi soal ini dinilai ${s.benar ? "BENAR" : "SALAH"}.`
        : "Soal PGK dinilai benar hanya jika semua jawaban benar dipilih dan tidak ada pilihan yang salah.";
      kotak.appendChild(p);
    }
    return kotak;
  }

  function tabelKategori(q, dipilih, s) {
    const wadah = el("div", "review-category");
    const tabel = el("table", "review-category-table");
    const cap = el("caption", "sr-only", "Jawabanmu dan kunci untuk setiap pernyataan");
    const thead = el("thead");
    const trh = el("tr");
    ["Pernyataan", "Jawabanmu", "Kunci"].forEach((t) => { const th = el("th", null, t); th.scope = "col"; trh.appendChild(th); });
    thead.appendChild(trh);
    const tbody = el("tbody");
    let tepat = 0;
    q.statements.forEach((pernyataan, n) => {
      const jawab = dipilih[n];
      const ada = jawab !== null && jawab !== undefined;
      const ok = ada && jawab === q.answer[n];
      if (ok) tepat++;
      const tr = el("tr", ok ? "is-tepat" : ada ? "is-keliru" : "is-kosong");
      const td1 = el("td", null, `${n + 1}. ${pernyataan}`);
      td1.dataset.label = "Pernyataan";
      const td2 = el("td");
      td2.dataset.label = "Jawabanmu";
      td2.append(ikon(ok ? "#i-check-circle" : ada ? "#i-x-circle" : "#i-minus-circle"), document.createTextNode(" " + (ada ? q.categories[jawab] : "Belum dijawab")));
      const td3 = el("td", null, q.categories[q.answer[n]]);
      td3.dataset.label = "Kunci";
      tr.append(td1, td2, td3);
      tbody.appendChild(tr);
    });
    tabel.append(cap, thead, tbody);
    wadah.appendChild(tabel);
    const p = el("p", "review-pgk-note");
    p.textContent = `Kamu menjawab tepat ${tepat} dari ${q.statements.length} pernyataan. Soal kategori dinilai benar hanya jika semua pernyataan dijawab tepat, jadi soal ini dinilai ${s.benar ? "BENAR" : (s.jawaban === null ? "BELUM DIJAWAB" : "SALAH")}.`;
    wadah.appendChild(p);
    return wadah;
  }

  function renderPembahasan(fokus) {
    renderFilter();
    const daftar = daftarFilter();
    if (posisi >= daftar.length) posisi = Math.max(0, daftar.length - 1);
    const kartu = $("resultReview");
    kartu.replaceChildren();
    if (!daftar.length) {
      kartu.appendChild(el("p", "review-empty", "Tidak ada soal pada saringan ini."));
    } else {
      kartu.appendChild(kartuSoal(daftar[posisi], posisi, daftar.length));
    }
    renderNomor();
    $("reviewPrev").disabled = posisi <= 0;
    $("reviewNext").disabled = posisi >= daftar.length - 1;
    if (fokus) {
      window.scrollTo({ top: 0, behavior: "instant" });
      const judul = $("reviewSoalJudul");
      if (judul) requestAnimationFrame(() => judul.focus({ preventScroll: true }));
    }
  }

  // ======================= Pindah tampilan =======================
  function pilihTab(nama, fokusKeTab) {
    const ringkas = nama === "ringkasan";
    $("tabRingkasan").setAttribute("aria-selected", ringkas ? "true" : "false");
    $("tabPembahasan").setAttribute("aria-selected", ringkas ? "false" : "true");
    $("tabRingkasan").tabIndex = ringkas ? 0 : -1;
    $("tabPembahasan").tabIndex = ringkas ? -1 : 0;
    $("panelRingkasan").hidden = !ringkas;
    $("panelPembahasan").hidden = ringkas;
    if (fokusKeTab) $(ringkas ? "tabRingkasan" : "tabPembahasan").focus();
  }
  function bukaPembahasan(filter) {
    if (!data) return;
    if (filter) { filterAktif = filter; posisi = 0; }
    pilihTab("pembahasan");
    renderPembahasan(true);
  }
  function bukaRingkasan() {
    pilihTab("ringkasan");
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => $("resultTitle").focus({ preventScroll: true }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!$("resultShell")) return;
    $("tabRingkasan").addEventListener("click", bukaRingkasan);
    $("tabPembahasan").addEventListener("click", () => bukaPembahasan());
    // Panah kiri/kanan berpindah tab (pola tab ARIA)
    $("resultShell").querySelector(".result-tabs").addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      if ($("panelRingkasan").hidden) pilihTab("ringkasan", true);
      else { pilihTab("pembahasan", true); renderPembahasan(false); }
    });
    $("openReview").addEventListener("click", () => bukaPembahasan("semua"));
    $("reviewBack").addEventListener("click", bukaRingkasan);
    $("reviewPrev").addEventListener("click", () => { if (posisi > 0) { posisi--; renderPembahasan(true); } });
    $("reviewNext").addEventListener("click", () => { if (posisi < daftarFilter().length - 1) { posisi++; renderPembahasan(true); } });
  });

  // ======================= Riwayat (js/riwayat.js) =======================
  const fmtTanggal = (iso) => {
    const t = new Date(iso);
    return isNaN(t) ? iso : t.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
  };

  // Catatan penyimpanan di bawah judul halaman hasil
  function tampilkanCatatan(teks, nada) {
    const p = $("resultSaveNote");
    if (!p) return;
    p.replaceChildren();
    if (!teks) { p.hidden = true; return; }
    p.className = "result-save-note is-" + nada;
    p.append(ikon(nada === "ok" ? "#i-check-circle" : nada === "info" ? "#i-lock" : "#i-alert"), el("span", null, teks));
    p.hidden = false;
  }

  function simpanKeRiwayat(hasil) {
    const kulit = $("resultShell");
    kulit.dataset.tersimpan = "tidak";
    if (!window.Riwayat) return;
    const r = window.Riwayat.simpan(hasil);
    if (r.ok) {
      kulit.dataset.tersimpan = "ya";
      const inf = window.Riwayat.info();
      let teks = `Hasil dan pembahasan tersimpan di riwayat perangkat ini (${r.jumlah} dari ${inf.maks} sesi). Buka kembali kapan saja dari Beranda.`;
      if (r.dihapus && r.dihapus.length) teks += ` Riwayat terlama (${r.dihapus.map(fmtTanggal).join(", ")}) dihapus otomatis karena batas ${inf.maks} sesi.`;
      else if (inf.hampirPenuh) teks += ` Riwayat hampir penuh. Saat penuh, riwayat terlama akan dihapus otomatis. Kamu bisa menghapus riwayat lama di Beranda.`;
      tampilkanCatatan(teks, inf.hampirPenuh || (r.dihapus && r.dihapus.length) ? "peringatan" : "ok");
    } else {
      const alasan = {
        "tidak-tersedia": "Browser ini tidak mengizinkan penyimpanan, jadi pembahasan sesi ini tidak bisa dibuka lagi setelah halaman ini ditutup. Pelajari pembahasannya sekarang.",
        "baca-saja": "Riwayat dibuat oleh versi aplikasi yang lebih baru, jadi sesi ini tidak disimpan. Pelajari pembahasannya sekarang.",
        "penuh": "Penyimpanan perangkat penuh, jadi pembahasan sesi ini tidak tersimpan. Riwayat lama tetap aman. Hapus beberapa riwayat di Beranda agar sesi berikutnya bisa tersimpan."
      }[r.alasan] || "Pembahasan sesi ini tidak tersimpan. Pelajari pembahasannya sekarang.";
      tampilkanCatatan(alasan, "galat");
    }
  }

  // Dipanggil finishQuiz() di app.js (sesi baru) atau bukaRiwayat() (riwayat)
  window.tampilkanHasil = (hasil) => {
    data = hasil;
    filterAktif = "semua";
    posisi = 0;
    const tombolHapus = $("resultDelete");
    if (hasil.dariRiwayat) {
      // Peta hasil belajar disimpan apa adanya saat ujian; tampilkan dengan fungsi yang sama
      if (typeof tampilkanPetaHasil === "function" && hasil.peta && hasil.peta.baris) tampilkanPetaHasil(hasil.peta);
      else if ($("petaHasil")) $("petaHasil").hidden = true;
      $("resultShell").dataset.tersimpan = "ya";
      const berubah = hasil.soal.filter((s) => s.catatan || s.catatanGambar).length;
      tampilkanCatatan(
        `Riwayat ${fmtTanggal(hasil.tanggal)}. Soal, kunci, pembahasan, jawaban, dan nilai ditampilkan sesuai saat dikerjakan.` +
        (berubah ? ` ${berubah} soal sudah diperbarui di bank soal sejak itu; ada tanda pada soal tersebut.` : ""),
        berubah ? "peringatan" : "info"
      );
      if (tombolHapus) tombolHapus.hidden = !window.Riwayat || window.Riwayat.info().bacaSaja;

    } else {
      if (tombolHapus) tombolHapus.hidden = true;
      kembaliKeDaftar = false;

      // Buat pesan motivasi sebelum hasil disimpan
      if (
        !hasil.motivasi &&
        window.Motivasi &&
        typeof window.Motivasi.buat === "function"
      ) {
        hasil.motivasi = window.Motivasi.buat(hasil, null);
      }

      simpanKeRiwayat(hasil);
    }

    renderRingkasan();
    renderPembahasan(false);
    pilihTab("ringkasan");
    requestAnimationFrame(() => $("resultTitle").focus({ preventScroll: true }));
  };

  // Membuka riwayat dari Beranda
  window.bukaRiwayat = (id) => {
    if (!window.Riwayat) return false;
    const hasil = window.Riwayat.muat(id);
    if (hasil.galat) {
      const pesan = { "tidak-ada": "Riwayat ini sudah dihapus (mungkin dari tab lain).", "rusak": "Data riwayat ini rusak dan tidak dapat dibuka. Riwayat lain tidak terpengaruh.", "tidak-tersedia": "Penyimpanan browser tidak tersedia." }[hasil.galat];
      if (typeof window.tanyaKonfirmasi === "function") window.tanyaKonfirmasi({ judul: "Riwayat tidak dapat dibuka", pesan, ok: "Mengerti", nada: "peringatan", ikon: "#i-alert", tanpaBatal: true });
      else alert(pesan);
      if (typeof window.tampilkanDashboard === "function") window.tampilkanDashboard();
      return false;
    }
    // Tampilan sama seperti setelah ujian selesai; mapel & mode dipakai tombol "Ulangi"
    try { currentSubject = hasil.mapel; currentMode = hasil.mode; } catch (e) { /* */ }
    document.querySelector("main").hidden = true;
    const kaki = document.querySelector("footer"); if (kaki) kaki.hidden = true;
    const dasbor = $("perkembangan"); if (dasbor) dasbor.hidden = true;
    $("quizShell").hidden = true;
    $("resultShell").hidden = false;
    window.tampilkanHasil(hasil);
    kembaliKeDaftar = true;
    window.scrollTo({ top: 0, behavior: "instant" });
    return true;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const tombolHapus = $("resultDelete");
    if (tombolHapus) tombolHapus.addEventListener("click", async () => {
      if (!data || !data.dariRiwayat) return;
      const setuju = typeof window.tanyaKonfirmasi === "function"
        ? await window.tanyaKonfirmasi({
          judul: "Hapus riwayat ini?",
          pesan: `Hasil dan pembahasan ${NAMA_MODE[data.mode]} ${data.namaMapel} (${fmtTanggal(data.tanggal)}) akan dihapus dari perangkat ini, termasuk barisnya di riwayat nilai. Tindakan ini tidak bisa dibatalkan.`,
          ok: "Ya, hapus", batal: "Batal", nada: "bahaya", ikon: "#i-alert"
        })
        : confirm("Hapus riwayat ini? Tindakan ini tidak bisa dibatalkan.");
      if (!setuju) return;
      window.Riwayat.hapus(data.id);
      data = null;
      $("homeButton").click();
    });
    // Kembali ke Beranda dari riwayat: langsung ke daftar riwayat (setelah returnHome() di app.js)
    $("homeButton").addEventListener("click", () => {
      if (!kembaliKeDaftar) return;
      kembaliKeDaftar = false;
      setTimeout(() => {
        const dasbor = $("perkembangan");
        const panel = $("riwayatDashboard") && $("riwayatDashboard").closest(".dashboard-panel");
        if (dasbor && !dasbor.hidden) (panel || dasbor).scrollIntoView({ block: "start", behavior: "instant" });
      }, 0);
    });
  });
})();
