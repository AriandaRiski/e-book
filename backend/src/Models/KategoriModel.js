const db = require("../Config/dbConfig");

const getKategori = () => {
    const getKategori = db.select('*').from('kategori');
    return getKategori;
}

const cekKategori = (kategori) => {
    const cek = db.select('*').from('kategori').where({ kategori: kategori }).first();
    return cek;
}

const tambah = (kategori) => {
    const tambah = db('kategori').insert({ kategori: kategori })
    return tambah;
}

const cekId = (id_kategori) => {
    const cek = db.select('*').from('kategori').where('id_kategori', id_kategori).first();
    return cek;
}

const update = (id_kategori, kategori) => {
    const update = db('kategori').where({ id_kategori: id_kategori }).update({ kategori : kategori })
    return update;
}

const hapus = (id_kategori) => {
    const hapus = db('kategori').where({ id_kategori: id_kategori }).del();
    return hapus;
}

module.exports = {
    getKategori,
    cekKategori,
    tambah,
    cekId,
    update,
    hapus
}