const db = require('../Config/dbConfig');

const getBuku = (filter) => {
    try {

        const { page, limit } = filter;
        const offset = (parseInt(page) * parseInt(limit)) - parseInt(limit);
        const limit_page = parseInt(limit);

        const getBuku = db.select('*').from('tbl_buku').limit(limit_page).offset(offset);
        return getBuku;
    } catch (error) {
        console.log(error)
    }
}

const total = () => {
    const total = db('tbl_buku').count('* as total');
    return total;
}

const tambah = (data) => {

    try {

        const tambah = db('tbl_buku').insert(data)
        return tambah;

    } catch (error) {
        console.log(error);
    }

}

const update = (id, data) => {
    try {
        const update = db('tbl_buku').where({ id: id }).update(data)
        return update;
    } catch (error) {
        console.log(error)
    }
}

const hapus = (id) => {
    const hapus = db('tbl_buku').where({ id: id }).del();
    return hapus;
}

const cekBuku = (data, id) => {
    // const cek = db.select('*').from('tbl_buku').where('judul', data.judul).where('id', '!=', id).first();
    const cek = db.select('*').from('tbl_buku').where({
        'judul' : data.judul,
        'pengarang' : data.pengarang
    }).where('id' ,'!=', id).first();

    return cek;
}

const cekId = (id) => {
    const cek = db.select('*').from('tbl_buku').where('id', id).first();
    return cek;
}

module.exports = {
    getBuku,
    total,
    tambah,
    update,
    hapus,
    cekBuku,
    cekId
}