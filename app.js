/*
 * Halaman depan: tombol "Mulai Latihan" membuka halaman simulasi
 * (latihan.html) sesuai mata pelajaran yang dipilih.
 */
var KODE_MAPEL = {
    matematika: 'mat',
    bahasa: 'bin',
    ipas: 'ipas'
};

function startSubject(subject) {
    var kode = KODE_MAPEL[subject];
    if (!kode) { return; }
    window.location.href = 'latihan.html?mapel=' + kode + '#/';
}
