/*
 * Tampilan & navigasi halaman latihan (latihan.html).
 *
 * Rute (hash):
 *   #/                 beranda mata pelajaran (kartu Sesi 1, Sesi 2, Riwayat)
 *   #/kerjakan         pengerjaan aktif
 *   #/hasil/<id>       hasil + analisis + pembahasan satu pengerjaan
 *   #/riwayat          riwayat belajar
 *
 * Mapel dipilih lewat ?mapel=bin|mat|ipas (bawaan: bin).
 */
(function (TKA) {
    'use strict';

    var util = TKA.util, esc = util.escape, C = TKA.CONFIG;
    var $app = document.getElementById('app');
    var KODE = (function () {
        var m = /[?&]mapel=([a-z]+)/.exec(window.location.search);
        return m && TKA.MAPEL[m[1]] ? m[1] : 'bin';
    })();
    var MAPEL = TKA.MAPEL[KODE];
    var bank = null;
    var timerId = null;

    /* ------------------------------------------------------------------
     * Pembantu umum
     * ------------------------------------------------------------------ */
    function fmt(teks) {
        // **tebal** dan _miring_ sederhana; selebihnya di-escape
        return esc(teks)
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/(^|[\s(])_(.+?)_(?=[\s.,;:)!?]|$)/g, '$1<em>$2</em>');
    }

    function namaSesi(p) {
        if (p.sesi === 1) { return 'Sesi 1 – Latihan'; }
        return p.mode === 'pengayaan' ? 'Sesi 2 – Pengayaan' : 'Sesi 2 – Penguatan Kelemahan';
    }

    function namaKomp(kode) {
        for (var i = 0; i < bank.kompetensi.length; i++) {
            if (bank.kompetensi[i].kode === kode) { return bank.kompetensi[i]; }
        }
        return { kode: kode, nama: kode, saran: '' };
    }

    function namaBentuk(b) {
        return b === 'PG' ? 'Pilihan Ganda' : b === 'MCMA' ? 'PG Kompleks' : 'PG Kompleks (Benar/Salah)';
    }

    function toast(pesan, jenis) {
        var el = document.getElementById('toast');
        el.textContent = pesan;
        el.className = 'toast ' + (jenis || '');
        el.hidden = false;
        clearTimeout(toast._t);
        toast._t = setTimeout(function () { el.hidden = true; }, 6000);
    }

    function modal(html, saatBuka) {
        var m = document.getElementById('modal');
        document.getElementById('modal-isi').innerHTML = html;
        m.hidden = false;
        document.body.classList.add('modal-terbuka');
        var tutup = m.querySelectorAll('[data-tutup]');
        Array.prototype.forEach.call(tutup, function (b) { b.addEventListener('click', tutupModal); });
        if (saatBuka) { saatBuka(m); }
        var fokus = m.querySelector('button, input');
        if (fokus) { fokus.focus(); }
    }

    function tutupModal() {
        document.getElementById('modal').hidden = true;
        document.body.classList.remove('modal-terbuka');
    }

    function hentikanTimer() {
        if (timerId) { clearInterval(timerId); timerId = null; }
    }

    function pergi(hash) {
        if (window.location.hash === hash) { route(); } else { window.location.hash = hash; }
    }

    function renderBacaan(idBacaan) {
        if (!idBacaan) { return ''; }
        return [].concat(idBacaan).map(function (id, i, semua) {
            var b = bank.bacaan[id];
            if (!b) { return ''; }
            return '<article class="bacaan">' +
                (semua.length > 1 ? '<span class="bacaan-urut">Teks ' + (i + 1) + '</span>' : '') +
                '<h3>' + esc(b.judul) + '</h3>' +
                b.paragraf.map(function (p) { return '<p>' + fmt(p) + '</p>'; }).join('') +
                (b.sumber ? '<p class="sumber">' + esc(b.sumber) + '</p>' : '') +
                '</article>';
        }).join('');
    }

    function jenisTeks(s) {
        if (!s.bacaan) { return ''; }
        return [].concat(s.bacaan).map(function (id) {
            return bank.bacaan[id] ? bank.bacaan[id].jenis : '';
        }).filter(Boolean).join(' & ');
    }

    /* ------------------------------------------------------------------
     * BERANDA MAPEL
     * ------------------------------------------------------------------ */
    function viewBeranda() {
        hentikanTimer();
        var profil = TKA.simpan.profil();
        var aktif = TKA.simpan.aktif(KODE);
        var riwayat = TKA.simpan.riwayat(KODE);
        var dasar = TKA.ujian.sesi1Terakhir(KODE);
        var jumlahBank = bank.soal.length;
        var siap = jumlahBank >= C.jumlahSoal;

        var html = '<section class="mapel-hero">' +
            '<div class="subject-icon ' + MAPEL.kelasIkon + '">' + esc(MAPEL.ikon) + '</div>' +
            '<div><span class="tag">SIMULASI TKA SD/MI</span>' +
            '<h1>Simulasi TKA ' + esc(MAPEL.nama) + '</h1>' +
            '<p>' + esc(MAPEL.deskripsi) + '</p>' +
            '<div class="chip-row">' +
            '<span class="chip">📚 ' + (siap ? jumlahBank : 100) + ' bank soal</span>' +
            '<span class="chip">📝 ' + C.jumlahSoal + ' soal per sesi</span>' +
            '<span class="chip">⏱ ' + (C.durasiDetik / 60) + ' menit</span>' +
            '<span class="chip">🔘 ' + C.komposisiBentuk.PG + ' PG + ' + C.komposisiBentuk.PGK + ' PG Kompleks</span>' +
            '</div></div></section>';

        if (!siap) {
            html += '<section class="kartu info-kosong"><h2>Bank soal sedang disusun</h2>' +
                '<p>Bank soal ' + esc(MAPEL.nama) + ' (100 soal dengan gambar dan diagram) sedang disiapkan. ' +
                'Sementara itu, kamu bisa berlatih Bahasa Indonesia terlebih dahulu.</p>' +
                '<a class="btn-primary" href="latihan.html?mapel=bin#/">Ke Bahasa Indonesia</a></section>';
            $app.innerHTML = html;
            return;
        }

        html += '<section class="kartu nama-siswa"><label for="input-nama">Nama siswa</label>' +
            '<div class="nama-baris"><input id="input-nama" type="text" maxlength="60" autocomplete="name" ' +
            'placeholder="Tulis nama lengkapmu" value="' + esc(profil.nama) + '">' +
            '<button class="btn-outline" id="simpan-nama" type="button">Simpan</button></div>' +
            '<small>Nama dicantumkan pada hasil dan riwayat belajar.</small></section>';

        if (aktif) {
            html += '<section class="kartu lanjutkan"><div><strong>Ada pengerjaan yang belum selesai</strong>' +
                '<p>' + esc(namaSesi(aktif)) + ' · sisa waktu ' + util.formatDurasi(TKA.ujian.sisaDetik(aktif)) + '</p></div>' +
                '<a class="btn-primary" href="#/kerjakan">Lanjutkan</a></section>';
        }

        html += '<section class="sesi-grid">';

        // Kartu Sesi 1
        html += '<article class="subject-card sesi-card">' +
            '<span class="sesi-no">SESI 1</span><h3>Latihan</h3>' +
            '<p>Ukur kemampuanmu dengan ' + C.jumlahSoal + ' soal acak dari bank soal. ' +
            'Setiap pengerjaan mendapat kombinasi soal yang berbeda, mengutamakan soal yang belum pernah kamu kerjakan.</p>' +
            '<ul class="ceklis"><li>' + C.jumlahSoal + ' soal · ' + C.durasiDetik / 60 + ' menit</li>' +
            '<li>' + C.komposisiBentuk.PG + ' PG + ' + C.komposisiBentuk.PGK + ' PG Kompleks</li>' +
            '<li>Pembahasan setelah selesai</li></ul>' +
            '<button class="btn-primary" type="button" data-mulai="1"' + (aktif ? ' disabled' : '') + '>Mulai Sesi 1</button>' +
            '</article>';

        // Kartu Sesi 2
        var infoSesi2;
        if (!dasar) {
            infoSesi2 = '<p class="terkunci">🔒 Selesaikan Sesi 1 terlebih dahulu. Soal Sesi 2 disusun dari hasil analisis Sesi 1.</p>';
        } else {
            var lemah = TKA.analisis.tigaTerlemah(TKA.analisis.daftarKompetensi(dasar.hasil, bank.kompetensi));
            infoSesi2 = '<p>Acuan: Sesi 1 tanggal ' + esc(util.formatTanggal(dasar.selesai)) +
                ' (nilai ' + util.angka(dasar.hasil.nilai) + ').</p>' +
                (lemah.length
                    ? '<p class="label-kecil">Fokus penguatan:</p><ul class="fokus">' + lemah.map(function (x) {
                        return '<li><span>' + esc(x.nama) + '</span><b>' + x.persen + '%</b></li>';
                    }).join('') + '</ul>'
                    : '<p>Semua kompetensi sudah dikuasai — Sesi 2 akan berisi <strong>latihan pengayaan</strong> yang lebih menantang.</p>');
        }
        html += '<article class="subject-card sesi-card">' +
            '<span class="sesi-no">SESI 2</span><h3>Penguatan Kelemahan</h3>' +
            '<p>Latihan adaptif: soal dipilih dari kompetensi yang belum kamu kuasai, berbeda dari soal Sesi 1.</p>' +
            infoSesi2 +
            '<button class="btn-primary" type="button" data-mulai="2"' + (!dasar || aktif ? ' disabled' : '') +
            '>Mulai Sesi 2</button></article>';

        // Kartu Riwayat
        var terakhir = riwayat.slice(-1)[0];
        html += '<article class="subject-card sesi-card">' +
            '<span class="sesi-no">RIWAYAT</span><h3>Riwayat Belajar</h3>' +
            '<p>Lihat semua pengerjaan, grafik perkembangan nilai dan kompetensi, serta buka kembali pembahasan.</p>' +
            '<ul class="ceklis"><li>' + riwayat.length + ' pengerjaan tersimpan</li>' +
            (terakhir ? '<li>Nilai terakhir: ' + util.angka(terakhir.hasil.nilai) + '</li>' : '') + '</ul>' +
            '<a class="btn-outline" href="#/riwayat">Buka Riwayat</a></article>';

        html += '</section>';

        if (!TKA.simpan.tersedia) {
            html += '<p class="peringatan">Penyimpanan browser tidak tersedia (mode privat?). Riwayat tidak akan tersimpan setelah halaman ditutup.</p>';
        }

        $app.innerHTML = html;

        document.getElementById('simpan-nama').addEventListener('click', function () {
            var nama = document.getElementById('input-nama').value.trim();
            TKA.simpan.simpanProfil({ nama: nama });
            toast(nama ? 'Nama disimpan.' : 'Nama dikosongkan.');
        });
        Array.prototype.forEach.call($app.querySelectorAll('[data-mulai]'), function (b) {
            b.addEventListener('click', function () { konfirmasiMulai(parseInt(b.getAttribute('data-mulai'), 10)); });
        });
    }

    function konfirmasiMulai(sesi) {
        var nama = (document.getElementById('input-nama').value || '').trim();
        if (!nama) {
            toast('Tulis namamu terlebih dahulu, ya.', 'galat');
            document.getElementById('input-nama').focus();
            return;
        }
        TKA.simpan.simpanProfil({ nama: nama });
        modal('<h2 id="modal-judul">Mulai ' + (sesi === 1 ? 'Sesi 1 – Latihan' : 'Sesi 2 – Penguatan') + '?</h2>' +
            '<ul class="aturan">' +
            '<li>Ada <strong>' + C.jumlahSoal + ' soal</strong>: ' + C.komposisiBentuk.PG + ' pilihan ganda dan ' +
            C.komposisiBentuk.PGK + ' pilihan ganda kompleks.</li>' +
            '<li>Waktu <strong>' + C.durasiDetik / 60 + ' menit</strong>. Jawaban dikumpulkan otomatis bila waktu habis.</li>' +
            '<li>Kamu boleh berpindah soal dan menandai soal <strong>ragu-ragu</strong>.</li>' +
            '<li>Jawaban tersimpan otomatis. Bila halaman tertutup, kamu bisa melanjutkan (waktu tetap berjalan).</li>' +
            '<li>Kunci dan pembahasan muncul setelah kamu menekan <strong>Selesai</strong>.</li></ul>' +
            '<div class="modal-aksi"><button class="btn-outline" type="button" data-tutup>Batal</button>' +
            '<button class="btn-primary" type="button" id="ya-mulai">Mulai Sekarang</button></div>',
            function (m) {
                m.querySelector('#ya-mulai').addEventListener('click', function () {
                    var dasar = sesi === 2 ? TKA.ujian.sesi1Terakhir(KODE) : null;
                    var r = TKA.ujian.mulai(KODE, sesi, nama, dasar);
                    tutupModal();
                    if (r.galat) { toast(r.galat, 'galat'); return; }
                    pergi('#/kerjakan');
                });
            });
    }

    /* ------------------------------------------------------------------
     * PENGERJAAN
     * ------------------------------------------------------------------ */
    function viewKerjakan() {
        hentikanTimer();
        var p = TKA.simpan.aktif(KODE);
        if (!p) { pergi('#/'); return; }
        var indeks = TKA.indeksSoal(KODE);

        // soal yang hilang dari bank (mis. bank diperbarui) dibuang agar tidak error
        p.soalIds = p.soalIds.filter(function (id) { return indeks[id]; });

        if (TKA.ujian.sisaDetik(p) <= 0) {
            TKA.ujian.submit(p, true);
            pergi('#/hasil/' + p.id);
            toast('⏰ Waktu pengerjaan sudah habis. Jawabanmu telah dikumpulkan otomatis.', 'waspada');
            return;
        }

        $app.innerHTML =
            '<div class="ujian">' +
            '<div class="ujian-bar">' +
            '<div class="ujian-judul"><strong>' + esc(MAPEL.nama) + '</strong><span>' + esc(namaSesi(p)) + '</span></div>' +
            '<div class="ujian-progres"><span id="teks-progres"></span><div class="progres"><div id="isi-progres"></div></div></div>' +
            '<div class="timer" id="timer" aria-label="Sisa waktu">--:--</div>' +
            '</div>' +
            '<div class="ujian-isi">' +
            '<div class="ujian-utama" id="ujian-utama"></div>' +
            '<aside class="ujian-nav">' +
            '<button class="btn-outline nav-toggle" type="button" id="toggle-nav">Daftar Soal ▾</button>' +
            '<div class="nav-panel" id="nav-panel">' +
            '<div class="nav-grid" id="nav-grid"></div>' +
            '<div class="nav-legenda"><span><i class="lg dijawab"></i>Dijawab</span><span><i class="lg ragu"></i>Ragu-ragu</span>' +
            '<span><i class="lg kosong"></i>Belum</span></div>' +
            '<button class="btn-selesai" type="button" id="btn-selesai">Selesai &amp; Kumpulkan</button>' +
            '</div></aside>' +
            '</div></div>';

        document.getElementById('toggle-nav').addEventListener('click', function () {
            document.getElementById('nav-panel').classList.toggle('buka');
        });
        document.getElementById('btn-selesai').addEventListener('click', function () { konfirmasiSelesai(p); });

        tampilSoal(p);
        perbaruiNav(p);
        jalankanTimer(p);
    }

    function tampilSoal(p) {
        var indeks = TKA.indeksSoal(KODE);
        var i = Math.min(Math.max(p.posisi || 0, 0), p.soalIds.length - 1);
        p.posisi = i;
        var s = indeks[p.soalIds[i]];
        var jwb = p.jawaban[s.id];
        var ragu = p.ragu.indexOf(s.id) !== -1;

        var instruksi = s.bentuk === 'PG' ? 'Pilih satu jawaban yang paling tepat.' :
            s.bentuk === 'MCMA' ? 'Pilih <strong>semua</strong> jawaban yang benar. Jawaban benar bisa lebih dari satu.' :
                'Tentukan <strong>Benar</strong> atau <strong>Salah</strong> untuk setiap pernyataan.';

        var opsiHtml;
        if (s.bentuk === 'BS') {
            opsiHtml = '<table class="tabel-bs"><thead><tr><th>Pernyataan</th><th>Benar</th><th>Salah</th></tr></thead><tbody>' +
                s.opsi.map(function (o, k) {
                    var v = Array.isArray(jwb) ? jwb[k] : null;
                    return '<tr><td>' + fmt(o) + '</td>' +
                        '<td><button type="button" class="bs-btn' + (v === true ? ' pilih' : '') + '" data-bs="' + k + '" data-v="1" aria-pressed="' + (v === true) + '" aria-label="Pernyataan ' + (k + 1) + ' benar">B</button></td>' +
                        '<td><button type="button" class="bs-btn' + (v === false ? ' pilih' : '') + '" data-bs="' + k + '" data-v="0" aria-pressed="' + (v === false) + '" aria-label="Pernyataan ' + (k + 1) + ' salah">S</button></td></tr>';
                }).join('') + '</tbody></table>';
        } else {
            opsiHtml = '<div class="opsi-list ' + (s.bentuk === 'MCMA' ? 'multi' : 'tunggal') + '">' +
                s.opsi.map(function (o, k) {
                    var pilih = s.bentuk === 'PG' ? jwb === k : (Array.isArray(jwb) && jwb.indexOf(k) !== -1);
                    return '<button type="button" class="opsi' + (pilih ? ' pilih' : '') + '" data-opsi="' + k + '" aria-pressed="' + pilih + '">' +
                        '<span class="huruf">' + TKA.nilai.HURUF[k] + '</span><span class="opsi-teks">' + fmt(o) + '</span></button>';
                }).join('') + '</div>';
        }

        var adaBacaan = !!s.bacaan;
        var el = document.getElementById('ujian-utama');
        el.className = 'ujian-utama' + (adaBacaan ? ' dua-kolom' : '');
        el.innerHTML =
            (adaBacaan ? '<div class="panel-bacaan">' + renderBacaan(s.bacaan) + '</div>' : '') +
            '<div class="panel-soal">' +
            '<div class="soal-kepala"><span class="no-soal">Soal ' + (i + 1) + ' <small>dari ' + p.soalIds.length + '</small></span>' +
            '<span class="badge bentuk-' + s.bentuk + '">' + namaBentuk(s.bentuk) + '</span></div>' +
            (s.gambar ? '<figure class="gambar-soal">' + s.gambar + '</figure>' : '') +
            '<p class="pertanyaan">' + fmt(s.pertanyaan) + '</p>' +
            '<p class="instruksi">' + instruksi + '</p>' +
            opsiHtml +
            '<div class="soal-aksi">' +
            '<button type="button" class="btn-outline" id="sebelum"' + (i === 0 ? ' disabled' : '') + '>← Sebelumnya</button>' +
            '<button type="button" class="btn-ragu' + (ragu ? ' aktif' : '') + '" id="ragu" aria-pressed="' + ragu + '">' + (ragu ? '★ Ragu-ragu' : '☆ Ragu-ragu') + '</button>' +
            (i < p.soalIds.length - 1
                ? '<button type="button" class="btn-primary" id="berikut">Berikutnya →</button>'
                : '<button type="button" class="btn-primary" id="akhir">Selesai</button>') +
            '</div></div>';

        // interaksi jawaban
        Array.prototype.forEach.call(el.querySelectorAll('[data-opsi]'), function (b) {
            b.addEventListener('click', function () {
                var k = parseInt(b.getAttribute('data-opsi'), 10);
                if (s.bentuk === 'PG') {
                    p.jawaban[s.id] = p.jawaban[s.id] === k ? null : k;
                } else {
                    var arr = Array.isArray(p.jawaban[s.id]) ? p.jawaban[s.id].slice() : [];
                    var pos = arr.indexOf(k);
                    if (pos === -1) { arr.push(k); } else { arr.splice(pos, 1); }
                    arr.sort();
                    p.jawaban[s.id] = arr;
                }
                simpanDanSegarkan(p);
            });
        });
        Array.prototype.forEach.call(el.querySelectorAll('[data-bs]'), function (b) {
            b.addEventListener('click', function () {
                var k = parseInt(b.getAttribute('data-bs'), 10);
                var v = b.getAttribute('data-v') === '1';
                var arr = Array.isArray(p.jawaban[s.id]) ? p.jawaban[s.id].slice() : s.opsi.map(function () { return null; });
                arr[k] = arr[k] === v ? null : v;
                p.jawaban[s.id] = arr;
                simpanDanSegarkan(p);
            });
        });
        el.querySelector('#ragu').addEventListener('click', function () {
            var pos = p.ragu.indexOf(s.id);
            if (pos === -1) { p.ragu.push(s.id); } else { p.ragu.splice(pos, 1); }
            simpanDanSegarkan(p);
        });
        var sb = el.querySelector('#sebelum');
        if (sb) { sb.addEventListener('click', function () { pindah(p, i - 1); }); }
        var bk = el.querySelector('#berikut');
        if (bk) { bk.addEventListener('click', function () { pindah(p, i + 1); }); }
        var ak = el.querySelector('#akhir');
        if (ak) { ak.addEventListener('click', function () { konfirmasiSelesai(p); }); }
    }

    function simpanDanSegarkan(p) {
        if (p.status !== 'aktif') { return; }
        TKA.ujian.simpanSementara(p);
        var gulir = window.scrollY;
        tampilSoal(p);
        perbaruiNav(p);
        window.scrollTo(0, gulir);
    }

    function pindah(p, i) {
        p.posisi = i;
        TKA.ujian.simpanSementara(p);
        tampilSoal(p);
        perbaruiNav(p);
        var u = document.querySelector('.ujian');
        if (u && u.getBoundingClientRect().top < 0) { u.scrollIntoView({ block: 'start' }); }
        document.getElementById('nav-panel').classList.remove('buka');
    }

    function hitungTerjawab(p) {
        var indeks = TKA.indeksSoal(KODE);
        return p.soalIds.filter(function (id) { return TKA.nilai.sudahDijawab(indeks[id], p.jawaban[id]); }).length;
    }

    function perbaruiNav(p) {
        var indeks = TKA.indeksSoal(KODE);
        var grid = document.getElementById('nav-grid');
        if (!grid) { return; }
        grid.innerHTML = p.soalIds.map(function (id, i) {
            var cls = ['nav-no'];
            if (TKA.nilai.sudahDijawab(indeks[id], p.jawaban[id])) { cls.push('dijawab'); }
            if (p.ragu.indexOf(id) !== -1) { cls.push('ragu'); }
            if (i === p.posisi) { cls.push('kini'); }
            return '<button type="button" class="' + cls.join(' ') + '" data-ke="' + i + '" aria-label="Soal ' + (i + 1) + '">' + (i + 1) + '</button>';
        }).join('');
        Array.prototype.forEach.call(grid.querySelectorAll('[data-ke]'), function (b) {
            b.addEventListener('click', function () { pindah(p, parseInt(b.getAttribute('data-ke'), 10)); });
        });
        var n = hitungTerjawab(p);
        document.getElementById('teks-progres').textContent = 'Terjawab ' + n + ' / ' + p.soalIds.length;
        document.getElementById('isi-progres').style.width = Math.round((n / p.soalIds.length) * 100) + '%';
    }

    function jalankanTimer(p) {
        var el = document.getElementById('timer');
        function tik() {
            var sisa = TKA.ujian.sisaDetik(p);
            el.textContent = util.formatDurasi(sisa);
            el.classList.toggle('waspada', sisa <= C.peringatanDetik[0]);
            el.classList.toggle('kritis', sisa <= C.peringatanDetik[1]);
            C.peringatanDetik.forEach(function (batas) {
                if (sisa <= batas && sisa > 0 && p.peringatan.indexOf(batas) === -1) {
                    p.peringatan.push(batas);
                    TKA.ujian.simpanSementara(p);
                    toast('⏰ Waktu tersisa ' + Math.round(batas / 60) + ' menit. Periksa kembali jawabanmu.', 'waspada');
                }
            });
            if (sisa <= 0) {
                hentikanTimer();
                tutupModal();
                TKA.ujian.submit(p, true);
                pergi('#/hasil/' + p.id);
                toast('⏰ Waktu habis. Jawabanmu telah dikumpulkan otomatis.', 'waspada');
            }
        }
        tik();
        timerId = setInterval(tik, 1000);
    }

    function konfirmasiSelesai(p) {
        var n = hitungTerjawab(p);
        var belum = p.soalIds.length - n;
        modal('<h2 id="modal-judul">Kumpulkan jawaban?</h2>' +
            '<div class="ringkas-selesai"><div><b>' + n + '</b><small>Terjawab</small></div>' +
            '<div><b>' + belum + '</b><small>Belum dijawab</small></div>' +
            '<div><b>' + p.ragu.length + '</b><small>Ragu-ragu</small></div></div>' +
            (belum ? '<p class="peringatan">Masih ada ' + belum + ' soal yang belum dijawab.</p>' : '') +
            '<p>Setelah dikumpulkan, jawaban <strong>tidak dapat diubah</strong>.</p>' +
            '<div class="modal-aksi"><button class="btn-outline" type="button" data-tutup>Periksa Lagi</button>' +
            '<button class="btn-primary" type="button" id="ya-kumpul">Ya, Kumpulkan</button></div>',
            function (m) {
                m.querySelector('#ya-kumpul').addEventListener('click', function () {
                    hentikanTimer();
                    TKA.ujian.submit(p, false);
                    tutupModal();
                    pergi('#/hasil/' + p.id);
                });
            });
    }

    /* ------------------------------------------------------------------
     * HASIL & PEMBAHASAN
     * ------------------------------------------------------------------ */
    function viewHasil(id, bagian) {
        hentikanTimer();
        var p = TKA.simpan.cariRiwayat(KODE, id);
        if (!p) {
            $app.innerHTML = '<section class="kartu"><h2>Hasil tidak ditemukan</h2><a class="btn-outline" href="#/riwayat">Ke Riwayat</a></section>';
            return;
        }
        var h = p.hasil;
        var A = TKA.analisis;
        var komp = A.daftarKompetensi(h, bank.kompetensi);
        var lemah3 = A.tigaTerlemah(komp);
        var dasar = p.dasarId ? TKA.simpan.cariRiwayat(KODE, p.dasarId) : null;
        var banding = dasar ? A.bandingkan(dasar.hasil, h, bank.kompetensi) : null;
        var pembanding = {};
        if (dasar) { A.daftarKompetensi(dasar.hasil, bank.kompetensi).forEach(function (x) { pembanding[x.kode] = x.persen; }); }

        var html = '<section class="hasil-kepala kartu">' +
            '<div class="hasil-meta"><span class="tag">HASIL PENGERJAAN</span>' +
            '<h1>' + esc(namaSesi(p)) + '</h1>' +
            '<dl>' +
            '<dt>Nama</dt><dd>' + esc(p.nama || '-') + '</dd>' +
            '<dt>Mata pelajaran</dt><dd>' + esc(MAPEL.nama) + '</dd>' +
            '<dt>Tanggal</dt><dd>' + esc(util.formatTanggal(p.selesai)) + '</dd>' +
            '<dt>Durasi</dt><dd>' + esc(util.formatDurasiTeks(p.durasiDetik)) + (p.otomatis ? ' (dikumpulkan otomatis)' : '') + '</dd>' +
            '</dl></div>' +
            '<div class="skor"><div class="skor-angka">' + util.angka(h.nilai) + '</div>' +
            '<span class="kategori kat-' + h.kategori.replace(/\s+/g, '-').toLowerCase() + '">' + esc(h.kategori) + '</span></div>' +
            '</section>';

        html += '<section class="stat-grid">' +
            stat(h.total, 'Jumlah soal') + stat(h.benar, 'Benar') + stat(h.salah, 'Salah' + (h.kosong ? ' (' + h.kosong + ' kosong)' : '')) +
            stat(h.persenTepat + '%', 'Ketepatan') + '</section>';

        // per bentuk & kesulitan
        var pb = h.perBentuk;
        html += '<section class="kartu dua-tabel"><div><h2>Hasil per jenis soal</h2><table class="tabel">' +
            '<thead><tr><th>Jenis</th><th>Benar</th><th>%</th></tr></thead><tbody>' +
            barisTabel('Pilihan Ganda (PG)', pb.PG) +
            barisTabel('PG Kompleks (PGK)', pb.PGK) +
            barisTabel('↳ PGK pilih banyak', pb.MCMA, true) +
            barisTabel('↳ PGK Benar/Salah', pb.BS, true) +
            '</tbody></table></div>' +
            '<div><h2>Hasil per tingkat kesulitan</h2><table class="tabel"><thead><tr><th>Tingkat</th><th>Benar</th><th>%</th></tr></thead><tbody>' +
            ['mudah', 'sedang', 'sulit'].map(function (k) { return h.perKesulitan[k] ? barisTabel(k.charAt(0).toUpperCase() + k.slice(1), h.perKesulitan[k]) : ''; }).join('') +
            '</tbody></table><p class="catatan-kecil">PG Kompleks dinilai benar bila seluruh pilihan sesuai kunci.</p></div></section>';

        // kompetensi
        html += '<section class="kartu"><h2>Penguasaan per kompetensi</h2>' +
            '<p class="catatan-kecil">Dikuasai ≥ ' + C.batasDikuasai + '% · Berkembang ' + C.batasBerkembang + '–' + (C.batasDikuasai - 1) +
            '% · Perlu penguatan &lt; ' + C.batasBerkembang + '%. Hanya kompetensi yang diuji pada sesi ini yang ditampilkan.' +
            (dasar ? ' Garis tegak = hasil Sesi 1 acuan.' : '') + '</p>' +
            TKA.grafik.batang(komp.map(function (x) {
                return {
                    kode: x.kode, nama: x.nama, persen: x.persen,
                    pembanding: pembanding[x.kode] != null ? pembanding[x.kode] : null,
                    info: x.benar + '/' + x.total + ' soal' + (x.terbatas ? ' · data terbatas' : '')
                };
            })) + '</section>';

        // analisis kelemahan
        html += '<section class="kartu analisis"><h2>Analisis &amp; rekomendasi</h2>';
        if (lemah3.length) {
            html += '<p>Kompetensi yang perlu dipelajari kembali (urutan prioritas):</p><ol class="prioritas">' +
                lemah3.map(function (x) {
                    var k = namaKomp(x.kode);
                    return '<li><strong>' + esc(x.nama) + '</strong> — ' + x.persen + '% (' + x.benar + '/' + x.total + ' soal)' +
                        (k.saran ? '<p>' + esc(k.saran) + '</p>' : '') + '</li>';
                }).join('') + '</ol>';
            var sisaLemah = A.lemah(komp).slice(3);
            if (sisaLemah.length) {
                html += '<p class="catatan-kecil">Kompetensi lain yang juga belum dikuasai: ' +
                    sisaLemah.map(function (x) { return esc(x.nama) + ' (' + x.persen + '%)'; }).join(', ') + '.</p>';
            }
        } else {
            html += '<p>Hebat! Semua kompetensi yang diuji pada sesi ini sudah dikuasai. Lanjutkan dengan latihan pengayaan agar kemampuanmu makin mantap.</p>';
        }
        if (p.sesi === 1) {
            var terakhir = TKA.ujian.sesi1Terakhir(KODE);
            var aktif = TKA.simpan.aktif(KODE);
            if (terakhir && terakhir.id === p.id && !aktif) {
                html += '<button class="btn-primary" type="button" id="ke-sesi2">' +
                    (lemah3.length ? 'Mulai Sesi 2 – Penguatan Kelemahan' : 'Mulai Sesi 2 – Pengayaan') + '</button>';
            } else if (terakhir && terakhir.id !== p.id) {
                html += '<p class="catatan-kecil">Sesi 2 selalu mengacu pada Sesi 1 terbaru.</p>';
            }
        }
        html += '</section>';

        // perbandingan
        if (banding) {
            html += '<section class="kartu banding"><h2>Perbandingan dengan Sesi 1</h2>' +
                '<div class="banding-nilai"><div><small>Sesi 1</small><b>' + util.angka(banding.nilaiSebelum) + '</b></div>' +
                '<div class="panah ' + (banding.selisihNilai >= 0 ? 'naik' : 'turun') + '">' +
                (banding.selisihNilai >= 0 ? '▲ +' : '▼ ') + util.angka(banding.selisihNilai) + '</div>' +
                '<div><small>Sesi 2</small><b>' + util.angka(banding.nilaiSesudah) + '</b></div></div>' +
                daftarBanding('Kompetensi yang meningkat', banding.meningkat, 'naik') +
                daftarBanding('Kompetensi yang masih lemah', banding.masihLemah, 'lemah') +
                daftarBanding('Kompetensi yang menurun', banding.menurun, 'turun') +
                '<p class="catatan-kecil">Hanya kompetensi yang diuji di kedua sesi yang dibandingkan. ' +
                'Jumlah soal per kompetensi kecil, jadi perubahan satu soal sudah menggeser persentase cukup besar.</p></section>';
        }

        if (p.catatan && p.catatan.length) {
            html += '<section class="kartu catatan"><h2>Catatan penyusunan soal</h2><ul>' +
                p.catatan.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></section>';
        }

        // pembahasan
        html += '<section class="kartu" id="pembahasan"><div class="pembahasan-kepala"><h2>Pembahasan ' + p.soalIds.length + ' soal</h2>' +
            '<div class="filter" role="group" aria-label="Saring pembahasan">' +
            '<button type="button" class="aktif" data-saring="semua">Semua</button>' +
            '<button type="button" data-saring="salah">Salah (' + h.salah + ')</button>' +
            '<button type="button" data-saring="benar">Benar (' + h.benar + ')</button>' +
            '<button type="button" data-saring="ragu">Ragu-ragu (' + (p.ragu || []).length + ')</button></div></div>' +
            '<div id="daftar-pembahasan">' + renderPembahasan(p) + '</div></section>';

        html += '<div class="aksi-bawah"><a class="btn-outline" href="#/">← Beranda ' + esc(MAPEL.nama) + '</a>' +
            '<a class="btn-outline" href="#/riwayat">Riwayat Belajar</a></div>';

        $app.innerHTML = html;

        var ke2 = document.getElementById('ke-sesi2');
        if (ke2) {
            ke2.addEventListener('click', function () {
                var r = TKA.ujian.mulai(KODE, 2, TKA.simpan.profil().nama || p.nama, p);
                if (r.galat) { toast(r.galat, 'galat'); return; }
                pergi('#/kerjakan');
            });
        }
        Array.prototype.forEach.call($app.querySelectorAll('[data-saring]'), function (b) {
            b.addEventListener('click', function () {
                var f = b.getAttribute('data-saring');
                Array.prototype.forEach.call($app.querySelectorAll('[data-saring]'), function (x) { x.classList.toggle('aktif', x === b); });
                Array.prototype.forEach.call($app.querySelectorAll('.bahas'), function (el) {
                    var tampil = f === 'semua' || el.getAttribute('data-status') === f ||
                        (f === 'ragu' && el.getAttribute('data-ragu') === '1');
                    el.hidden = !tampil;
                });
            });
        });

        if (bagian === 'pembahasan') {
            document.getElementById('pembahasan').scrollIntoView({ block: 'start' });
        } else {
            window.scrollTo(0, 0);
        }
    }

    function stat(angka, label) {
        return '<div class="stat"><b>' + esc(angka) + '</b><small>' + esc(label) + '</small></div>';
    }

    function barisTabel(label, x, sub) {
        if (!x || !x.total) { return ''; }
        return '<tr' + (sub ? ' class="sub"' : '') + '><td>' + esc(label) + '</td><td>' + x.benar + ' / ' + x.total +
            '</td><td>' + Math.round((x.benar / x.total) * 100) + '%</td></tr>';
    }

    function daftarBanding(judul, list, cls) {
        if (!list.length) { return ''; }
        return '<h3>' + esc(judul) + '</h3><ul class="banding-list ' + cls + '">' + list.map(function (x) {
            return '<li><span>' + esc(x.nama) + '</span><b>' + x.sebelum + '% → ' + x.sesudah + '%</b></li>';
        }).join('') + '</ul>';
    }

    function renderPembahasan(p) {
        var indeks = TKA.indeksSoal(KODE);
        return p.soalIds.map(function (id, i) {
            var s = indeks[id];
            if (!s) {
                return '<article class="bahas"><p>Soal ' + (i + 1) + ' (' + esc(id) + ') sudah tidak ada di bank soal.</p></article>';
            }
            // gunakan kunci yang tersimpan saat dikerjakan
            var sKunci = p.kunci && p.kunci[id] !== undefined ? Object.assign({}, s, { kunci: p.kunci[id] }) : s;
            var jwb = p.jawaban[id];
            var ok = TKA.nilai.cekBenar(sKunci, jwb);
            var ragu = (p.ragu || []).indexOf(id) !== -1;
            var k = namaKomp(s.kompetensi);

            var opsiHtml;
            if (s.bentuk === 'BS') {
                opsiHtml = '<table class="tabel-bs hasil"><thead><tr><th>Pernyataan</th><th>Jawabanmu</th><th>Kunci</th></tr></thead><tbody>' +
                    s.opsi.map(function (o, j) {
                        var v = Array.isArray(jwb) ? jwb[j] : null;
                        var kv = sKunci.kunci[j];
                        return '<tr class="' + (v === kv ? 'cocok' : 'tidak') + '"><td>' + fmt(o) + '</td><td>' +
                            (v === true ? 'Benar' : v === false ? 'Salah' : '–') + '</td><td>' + (kv ? 'Benar' : 'Salah') + '</td></tr>';
                    }).join('') + '</tbody></table>';
            } else {
                var kunciArr = [].concat(sKunci.kunci);
                var jwbArr = jwb == null ? [] : [].concat(jwb);
                opsiHtml = '<ul class="opsi-hasil">' + s.opsi.map(function (o, j) {
                    var isKunci = kunciArr.indexOf(j) !== -1, isPilih = jwbArr.indexOf(j) !== -1;
                    var cls = isKunci ? 'kunci' : (isPilih ? 'salah-pilih' : '');
                    return '<li class="' + cls + '"><span class="huruf">' + TKA.nilai.HURUF[j] + '</span><span>' + fmt(o) + '</span>' +
                        (isPilih ? '<em class="tanda">pilihanmu</em>' : '') + (isKunci ? '<em class="tanda kunci-tanda">kunci</em>' : '') + '</li>';
                }).join('') + '</ul>';
            }

            return '<article class="bahas ' + (ok ? 'benar' : 'salah') + '" data-status="' + (ok ? 'benar' : 'salah') + '" data-ragu="' + (ragu ? 1 : 0) + '">' +
                '<header><span class="no-soal">Soal ' + (i + 1) + '</span>' +
                '<span class="status ' + (ok ? 'ok' : 'x') + '">' + (ok ? '✓ Benar' : (TKA.nilai.sudahDijawab(s, jwb) ? '✗ Salah' : '✗ Tidak dijawab')) + '</span>' +
                (ragu ? '<span class="badge">ragu-ragu</span>' : '') +
                '<span class="meta">' + esc(namaBentuk(s.bentuk)) + ' · ' + esc(s.kesulitan) + ' · ' + esc(k.nama) +
                (jenisTeks(s) ? ' · jenis teks: ' + esc(jenisTeks(s)) : '') + '</span></header>' +
                (s.bacaan ? '<details class="bahas-bacaan"><summary>Teks bacaan</summary>' + renderBacaan(s.bacaan) + '</details>' : '') +
                (s.gambar ? '<figure class="gambar-soal">' + s.gambar + '</figure>' : '') +
                '<p class="pertanyaan">' + fmt(s.pertanyaan) + '</p>' + opsiHtml +
                '<p class="jawaban-ringkas"><span>Jawabanmu: <b>' + esc(TKA.nilai.teksJawaban(s, jwb)) + '</b></span>' +
                '<span>Kunci: <b>' + esc(TKA.nilai.teksKunci(sKunci)) + '</b></span></p>' +
                '<div class="penjelasan"><strong>Pembahasan:</strong> ' + fmt(s.pembahasan) + '</div>' +
                (s.gambarPembahasan ? '<figure class="gambar-pembahasan">' + s.gambarPembahasan + '<figcaption>Gambar dengan keterangan</figcaption></figure>' : '') +
                '</article>';
        }).join('');
    }

    /* ------------------------------------------------------------------
     * RIWAYAT BELAJAR
     * ------------------------------------------------------------------ */
    function viewRiwayat() {
        hentikanTimer();
        var r = TKA.simpan.riwayat(KODE).filter(function (p) { return p.hasil; });
        var A = TKA.analisis;

        var html = '<section class="mapel-hero kecil"><div><span class="tag">RIWAYAT BELAJAR</span>' +
            '<h1>Riwayat Belajar ' + esc(MAPEL.nama) + '</h1>' +
            '<p>Semua pengerjaan tersimpan di perangkat ini dan tidak terhapus ketika browser ditutup.</p></div></section>';

        if (!r.length) {
            html += '<section class="kartu"><p>Belum ada pengerjaan. Mulai dari Sesi 1 – Latihan.</p>' +
                '<a class="btn-primary" href="#/">Ke Beranda ' + esc(MAPEL.nama) + '</a></section>';
            $app.innerHTML = html;
            return;
        }

        var nilai = r.map(function (p) { return p.hasil.nilai; });
        var rata = nilai.reduce(function (a, b) { return a + b; }, 0) / nilai.length;
        html += '<section class="stat-grid">' + stat(r.length, 'Pengerjaan') +
            stat(r.filter(function (p) { return p.sesi === 1; }).length + ' / ' + r.filter(function (p) { return p.sesi === 2; }).length, 'Sesi 1 / Sesi 2') +
            stat(util.angka(Math.max.apply(null, nilai)), 'Nilai tertinggi') + stat(util.angka(rata), 'Rata-rata') + '</section>';

        // grafik nilai
        html += '<section class="kartu"><h2>Perkembangan nilai</h2>' +
            TKA.grafik.garis(r.map(function (p, i) {
                return {
                    label: '#' + (i + 1) + ' S' + p.sesi, nilai: p.hasil.nilai, kelas: 's' + p.sesi,
                    keterangan: namaSesi(p) + ' · ' + util.formatTanggal(p.selesai)
                };
            }), { judul: 'Grafik perkembangan nilai', garisAcuan: 70 }) +
            '<p class="catatan-kecil"><i class="lg s1"></i> Sesi 1 &nbsp; <i class="lg s2"></i> Sesi 2 &nbsp;· garis putus-putus = KKM 70</p></section>';

        // grafik kompetensi
        var diuji = bank.kompetensi.filter(function (k) {
            return r.some(function (p) { return p.hasil.perKompetensi[k.kode]; });
        });
        html += '<section class="kartu"><h2>Perkembangan kompetensi</h2>' +
            '<label class="pilih-komp">Pilih kompetensi: <select id="pilih-komp">' +
            diuji.map(function (k) { return '<option value="' + esc(k.kode) + '">' + esc(k.kode + ' · ' + k.nama) + '</option>'; }).join('') +
            '</select></label><div id="grafik-komp"></div>' +
            '<h3>Penguasaan kumulatif (seluruh pengerjaan)</h3>' +
            TKA.grafik.batang(A.kumulatif(r, bank.kompetensi).map(function (x) {
                return { kode: x.kode, nama: x.nama, persen: x.persen, info: x.benar + '/' + x.total + ' soal' };
            })) + '</section>';

        // perbandingan sesi 1 vs sesi 2 terbaru
        var s2 = r.filter(function (p) { return p.sesi === 2 && p.dasarId; }).slice(-1)[0];
        if (s2) {
            var d = TKA.simpan.cariRiwayat(KODE, s2.dasarId);
            if (d) {
                var b = A.bandingkan(d.hasil, s2.hasil, bank.kompetensi);
                html += '<section class="kartu banding"><h2>Perbandingan Sesi 1 dan Sesi 2 terbaru</h2>' +
                    '<div class="banding-nilai"><div><small>Sesi 1</small><b>' + util.angka(b.nilaiSebelum) + '</b></div>' +
                    '<div class="panah ' + (b.selisihNilai >= 0 ? 'naik' : 'turun') + '">' + (b.selisihNilai >= 0 ? '▲ +' : '▼ ') +
                    util.angka(b.selisihNilai) + '</div><div><small>Sesi 2</small><b>' + util.angka(b.nilaiSesudah) + '</b></div></div>' +
                    daftarBanding('Kompetensi yang meningkat', b.meningkat, 'naik') +
                    daftarBanding('Kompetensi yang masih lemah', b.masihLemah, 'lemah') +
                    (!b.meningkat.length && !b.masihLemah.length ? '<p>Belum ada kompetensi yang sama di kedua sesi untuk dibandingkan.</p>' : '') +
                    '</section>';
            }
        } else {
            html += '<section class="kartu"><h2>Perbandingan Sesi 1 dan Sesi 2</h2><p>Perbandingan muncul setelah kamu menyelesaikan Sesi 2.</p></section>';
        }

        // masih lemah (dari pengerjaan terakhir)
        var akhir = r[r.length - 1];
        var lemahAkhir = A.lemah(A.daftarKompetensi(akhir.hasil, bank.kompetensi));
        html += '<section class="kartu"><h2>Kompetensi yang masih lemah</h2><p class="catatan-kecil">Berdasarkan pengerjaan terakhir (' +
            esc(namaSesi(akhir)) + ', ' + esc(util.formatTanggal(akhir.selesai)) + ').</p>' +
            (lemahAkhir.length ? '<ul class="banding-list lemah">' + lemahAkhir.map(function (x) {
                return '<li><span>' + esc(x.nama) + '</span><b>' + x.persen + '%</b></li>';
            }).join('') + '</ul>' : '<p>Tidak ada — semua kompetensi yang diuji sudah dikuasai.</p>') + '</section>';

        // daftar pengerjaan
        html += '<section class="kartu"><h2>Daftar pengerjaan</h2><div class="tabel-gulir"><table class="tabel riwayat">' +
            '<thead><tr><th>#</th><th>Tanggal</th><th>Sesi</th><th>Nama</th><th>Nilai</th><th>Benar/Salah</th><th>Durasi</th><th></th></tr></thead><tbody>' +
            r.slice().reverse().map(function (p) {
                var no = r.indexOf(p) + 1;
                return '<tr><td>' + no + '</td><td>' + esc(util.formatTanggal(p.selesai)) + '</td><td>' + esc(namaSesi(p)) + '</td>' +
                    '<td>' + esc(p.nama || '-') + '</td><td><b>' + util.angka(p.hasil.nilai) + '</b><br><small>' + esc(p.hasil.kategori) + '</small></td>' +
                    '<td>' + p.hasil.benar + ' / ' + p.hasil.salah + '</td><td>' + esc(util.formatDurasi(p.durasiDetik)) + '</td>' +
                    '<td class="aksi"><a class="btn-kecil" href="#/hasil/' + esc(p.id) + '">Lihat hasil</a>' +
                    '<a class="btn-kecil garis" href="#/hasil/' + esc(p.id) + '/pembahasan">Pembahasan</a></td></tr>';
            }).join('') + '</tbody></table></div></section>';

        $app.innerHTML = html;

        var sel = document.getElementById('pilih-komp');
        function gambarKomp() {
            var kode = sel.value;
            var titik = [];
            r.forEach(function (p, i) {
                var x = p.hasil.perKompetensi[kode];
                if (x) {
                    titik.push({ label: '#' + (i + 1) + ' S' + p.sesi, nilai: x.persen, kelas: 's' + p.sesi,
                        keterangan: namaSesi(p) + ' (' + x.benar + '/' + x.total + ' soal)' });
                }
            });
            document.getElementById('grafik-komp').innerHTML =
                TKA.grafik.garis(titik, { judul: 'Perkembangan kompetensi', garisAcuan: C.batasDikuasai }) +
                '<p class="catatan-kecil">Garis putus-putus = batas dikuasai ' + C.batasDikuasai + '%. Hanya pengerjaan yang menguji kompetensi ini yang ditampilkan.</p>';
        }
        if (sel) {
            sel.addEventListener('change', gambarKomp);
            // tampilkan kompetensi terlemah terakhir lebih dulu
            if (lemahAkhir.length) { sel.value = lemahAkhir[0].kode; }
            gambarKomp();
        }
        window.scrollTo(0, 0);
    }

    /* ------------------------------------------------------------------
     * ROUTER
     * ------------------------------------------------------------------ */
    function route() {
        tutupModal();
        var h = window.location.hash.replace(/^#\/?/, '');
        var bagian = h.split('/');
        document.body.classList.toggle('mode-ujian', bagian[0] === 'kerjakan');
        if (bagian[0] === 'kerjakan') { viewKerjakan(); }
        else if (bagian[0] === 'hasil' && bagian[1]) { viewHasil(bagian[1], bagian[2]); }
        else if (bagian[0] === 'riwayat') { viewRiwayat(); }
        else { viewBeranda(); }
    }

    function tandaiNav() {
        Array.prototype.forEach.call(document.querySelectorAll('#nav-mapel a'), function (a) {
            if (a.getAttribute('href').indexOf('mapel=' + KODE) !== -1) { a.classList.add('aktif'); }
        });
    }

    document.title = 'Simulasi TKA ' + MAPEL.nama + ' | TKA SD';
    tandaiNav();
    TKA.muatData(KODE, function (err) {
        bank = TKA.ambilBank(KODE);
        if (err) {
            $app.innerHTML = '<section class="kartu"><h2>Bank soal gagal dimuat</h2><p>' + esc(err.message) + '</p></section>';
            return;
        }
        window.addEventListener('hashchange', route);
        route();
    });
})(window.TKA);
