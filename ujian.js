/*
 * Siklus hidup satu pengerjaan: membuat, menyimpan sementara, submit.
 *
 * Bentuk objek Pengerjaan (disimpan di localStorage):
 * {
 *   id, mapel, sesi: 1|2, mode: 'latihan'|'penguatan'|'pengayaan',
 *   nama, mulai (ISO), batasWaktu (epoch ms), selesai (ISO|null),
 *   durasiDetik, status: 'aktif'|'selesai', otomatis: bool,
 *   soalIds: [...], jawaban: { idSoal: jawaban }, ragu: [idSoal],
 *   kunci: { idSoal: kunci }          // salinan kunci saat dikerjakan
 *   versiBank, dasarId (Sesi 2: id Sesi 1 acuan), fokus: [kode], catatan: [...],
 *   hasil: { ...lihat penilaian.js }  // diisi saat submit
 * }
 */
(function (TKA) {
    'use strict';

    var C = TKA.CONFIG;

    function buatPengerjaan(kode, sesi, pilihan, nama, dasarId) {
        var bank = TKA.ambilBank(kode);
        var sekarang = Date.now();
        return {
            id: TKA.util.idUnik(kode),
            mapel: kode,
            sesi: sesi,
            mode: pilihan.mode,
            nama: nama,
            mulai: new Date(sekarang).toISOString(),
            batasWaktu: sekarang + C.durasiDetik * 1000,
            selesai: null,
            durasiDetik: 0,
            status: 'aktif',
            otomatis: false,
            soalIds: pilihan.soalIds,
            jawaban: {},
            ragu: [],
            kunci: {},
            posisi: 0,
            versiBank: bank.versi,
            dasarId: dasarId || null,
            fokus: pilihan.fokus || [],
            catatan: pilihan.catatan || [],
            peringatan: [],
            hasil: null
        };
    }

    function mulai(kode, sesi, nama, dasar) {
        var pilihan = sesi === 1 ? TKA.pemilih.pilihSesi1(kode) : TKA.pemilih.pilihSesi2(kode, dasar);
        if (pilihan.galat) { return { galat: pilihan.galat }; }
        var p = buatPengerjaan(kode, sesi, pilihan, nama, dasar ? dasar.id : null);
        TKA.simpan.simpanAktif(kode, p);
        return { pengerjaan: p };
    }

    function simpanSementara(p) { TKA.simpan.simpanAktif(p.mapel, p); }

    function sisaDetik(p) { return Math.max(0, Math.round((p.batasWaktu - Date.now()) / 1000)); }

    function submit(p, otomatis) {
        if (p.status === 'selesai') { return p; }
        var indeks = TKA.indeksSoal(p.mapel);
        var akhir = Math.min(Date.now(), p.batasWaktu);
        p.status = 'selesai';
        p.otomatis = !!otomatis;
        p.selesai = new Date(akhir).toISOString();
        p.durasiDetik = Math.min(C.durasiDetik, Math.round((akhir - new Date(p.mulai).getTime()) / 1000));
        p.soalIds.forEach(function (id) { if (indeks[id]) { p.kunci[id] = indeks[id].kunci; } });
        p.hasil = TKA.nilai.nilaiPengerjaan(p, indeks);
        TKA.simpan.tambahRiwayat(p.mapel, p);
        TKA.simpan.catatPemakaian(p.mapel, p.soalIds, TKA.pemilih.sidik(p.soalIds));
        TKA.simpan.hapusAktif(p.mapel);
        return p;
    }

    /** Sesi 1 selesai terakhir — acuan Sesi 2. */
    function sesi1Terakhir(kode) {
        var r = TKA.simpan.riwayat(kode).filter(function (p) { return p.sesi === 1 && p.hasil; });
        return r.length ? r[r.length - 1] : null;
    }

    TKA.ujian = {
        mulai: mulai,
        simpanSementara: simpanSementara,
        sisaDetik: sisaDetik,
        submit: submit,
        sesi1Terakhir: sesi1Terakhir
    };
})(window.TKA);
