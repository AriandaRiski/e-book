const db = require('../Config/dbConfig');

const getBuku = (filter) => {
    try {

        const { page, limit } = filter;
        const offset = (parseInt(page) * parseInt(limit)) - parseInt(limit);
        const limit_page = parseInt(limit);

        const getBuku = db.select('b.*','k.kategori').from('tbl_buku as b')
            .join('kategori as k', 'k.id_kategori', 'b.id_kategori')
            .orderBy('b.id', 'desc')
            .limit(limit_page).offset(offset);
        return getBuku;
    } catch (error) {
        console.log(error)
    }
}

const total = () => {
    // const total = db('tbl_buku').count('* as total');
    const total = db.select('*').from('tbl_buku as b').join('kategori as k', 'k.id_kategori' , 'b.id_kategori').count('* as total');
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
        'judul': data.judul,
        'pengarang': data.pengarang
    }).where('id', '!=', id).first();

    return cek;
}

const cekId = (id) => {
    const cek = db.select('*').from('tbl_buku').where('id', id).first();
    // const cek = db.select('*').from('tbl_buku as b').join('kategori as k', 'k.id_kategori', 'b.id_kategori').where('id', id).first();

    return cek;
}

const cekCustom = (data) =>{
    const cekCustom = db.select('*').from('tbl_buku').where(data).first();
    return cekCustom
}

const cekBukuTersedia = (data, id) => {
    const cekBukuTersedia = db.select('*').from('tbl_buku').where(data).where('id', '!=', id).first();
    // sama dengan
    // const cekBukuTersedia = db.select('*').from('tbl_buku').where(data).whereNotIn('id', [id]).first();
    
    return cekBukuTersedia
}

module.exports = {
    getBuku,
    total,
    tambah,
    update,
    hapus,
    cekBuku,
    cekId,
    cekCustom,
    cekBukuTersedia
}