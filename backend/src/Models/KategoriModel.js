const db = require("../Config/dbConfig");

const getKategori = (filter) => {
    try {

        const { page, limit } = filter;
        const offset = (parseInt(page) * parseInt(limit)) - parseInt(limit);

        const limit_page = parseInt(limit);

        const getKategori = db.select('*').from('kategori').limit(limit_page).offset(offset);
        return getKategori;
    } catch (error) {
        console.log(error)
    }
}

const total = () => {
    const total = db('kategori').count('* as total');
    return total;
}

const cekKategori = (kategori, id_kategori) => {
    const cek = db.select('*').from('kategori').where({ kategori: kategori }).where('id_kategori', '!=', id_kategori).first();
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
    const update = db('kategori').where({ id_kategori: id_kategori }).update({ kategori: kategori })
    return update;
}

const hapus = (id) => {
    const hapus = db('tbl_buku').where({ id: id }).del();
    return hapus;
}

module.exports = {
    getKategori,
    cekKategori,
    tambah,
    cekId,
    update,
    hapus,
    total
}