const db = require('../Config/dbConfig');

const getBuku = (filter) => {
    try {

        const { page, limit } = filter;
        const offset = (parseInt(page) * parseInt(limit)) - parseInt(limit);
        const limit_page = parseInt(limit);

        const getBuku =
            // db.select('b.*', 'k.kategori', 'f.thumbnailUrl as cover').from('tbl_buku as b')
            //     .leftJoin('kategori as k', 'k.id_kategori', 'b.id_kategori')
            //     .join('files as f', function () {
            //         this.on('f.id_parent', '=', 'b.id')
            //         this.on(db.raw(`f.jenis = ?`, [1]))
            //     })
            //     .orderBy('b.id', 'desc')
            //     .limit(limit_page).offset(offset);


            db.select('b.*', 'k.kategori', 'f.thumbnailUrl as cover')
                .from('tbl_buku as b')
                .leftJoin('kategori as k', 'k.id_kategori', '=', 'b.id_kategori')
                .join('files as f', function () {
                    this.on('f.id_parent', '=', 'b.id').andOn('f.jenis', '=', 1);
                })
                .orderBy('b.id', 'desc')
                .limit(limit_page).offset(offset);
        return getBuku;
    } catch (error) {
        console.log(error)
    }
}

const total = () => {
    // const total = db('tbl_buku').count('* as total');
    const total = db.select('*').from('tbl_buku as b').join('kategori as k', 'k.id_kategori', 'b.id_kategori').count('* as total');
    return total;
}

const tambah = async (data, file_cover) => {

    const trans = await db.transaction();

    try {

        const buku = await trans('tbl_buku').insert(data);
        // if (file_cover) {
            const cover = {
                fileId: file_cover.fileId,
                name: file_cover.name,
                size: file_cover.size,
                filePath: file_cover.filePath,
                url: file_cover.url,
                fileType: file_cover.fileType,
                height: file_cover.height,
                width: file_cover.width,
                thumbnailUrl: file_cover.thumbnailUrl,
                id_parent: buku[0],
                jenis: 1
            }
            const file = await trans('files').insert(cover);
        // }
        const kategori = await trans('kategori').select('kategori').where('id_kategori', data.id_kategori).first();
        await trans.commit();

        return {
            ...data, id: buku[0], thumbnailUrl: cover.thumbnailUrl, kategori: kategori.kategori
        };

    } catch (error) {
        console.log(error);
        await trans.rollback(error);
        return error;
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

const cekCustom = (data) => {
    const cekCustom = db.select('*').from('tbl_buku').where(data).first();
    return cekCustom
}

const cekBukuTersedia = (data, id) => {
    const cekBukuTersedia = db.select('*').from('tbl_buku').where(data).where('id', '!=', id).first();
    // sama dengan
    // const cekBukuTersedia = db.select('*').from('tbl_buku').where(data).whereNotIn('id', [id]).first();

    return cekBukuTersedia
}

const cek_cover = (id_parent) => {
    const cek_cover = db.select('fileId').from('files').whereRaw(`id_parent = ? and jenis = 1`, [id_parent]).first();
    return cek_cover;
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
    cekBukuTersedia,
    cek_cover
}