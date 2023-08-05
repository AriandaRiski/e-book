const BukuModel = require('../Models/BukuModel');

const ListBuku = async (req, res) => {

    try {
        let filter = {}
        filter = { ...filter, page: req.query.page ?? 1 };
        filter = { ...filter, limit: req.query.limit ?? 10 };

        const buku = await BukuModel.getBuku(filter);
        const total = await BukuModel.total().first();

        return res.status(201).json({
            success: true,
            data: buku,
            keterangan: "List Buku",
            total: total.total
        })
    } catch (error) {
        console.log(error)
    }
}

const TotalBuku = async (req, res) => {
    const total = await BukuModel.total().first();
    return res.status(201).json(total)
}

const TambahBuku = async (req, res) => {

    const data = {
        id_kategori: req.body.id_kategori,
        judul: req.body.judul,
        pengarang: req.body.pengarang,
        kota: req.body.kota,
        tahun: req.body.tahun,
        penerbit: req.body.penerbit
    }

    const cekValid = {
        judul: req.body.judul,
        tahun: req.body.tahun,
        pengarang: req.body.pengarang
    }

    try {

        const cekBuku = await BukuModel.cekCustom(cekValid);

        if (cekBuku) {
            return res.status(400).json({
                success: false,
                message: `data buku dengan judul, pengarang dan tahun sudah tersedia!`
            })
        }

        const insert = await BukuModel.tambah(data);
        const getData = await BukuModel.cekId(insert[0]);

        console.log(getData)

        res.status(201).json({
            success: true,
            message: `Berhasil Insert Buku`,
            data: getData
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

const UpdateBuku = async (req, res) => {

    const data = {
        id: req.params.id,
        id_kategori: req.body.id_kategori,
        judul: req.body.judul,
        pengarang: req.body.pengarang,
        kota: req.body.kota,
        tahun: req.body.tahun,
        penerbit: req.body.penerbit
    }

    const cekValid = {
        judul: req.body.judul,
        tahun: req.body.tahun,
        pengarang: req.body.pengarang
    }


    try {

        const cek = await BukuModel.cekId(data.id);
        if (!cek) {
            return res.json({ message: `data dengan id = ${data.id} tidak ditemukan!` });
        }

        const cekBukuTersedia = await BukuModel.cekBukuTersedia(cekValid, data.id );
        if (cekBukuTersedia) {
            return res.status(400).json({
                success: false,
                message: `data buku dengan judul, pengarang dan tahun sudah tersedia!`
            })
        }

        const update = await BukuModel.update(data.id, data)
        const getData = await BukuModel.cekId(data.id)

        return res.status(201).json({
            success: true,
            message: "Buku Berhasil di Update!",
            data: getData
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

const HapusBuku = async (req, res) => {

    const id = req.params.id;

    try {

        const cek = await BukuModel.cekId(id);
        if (!cek) {
            return res.json({ message: `data dengan id = ${id} tidak ditemukan!` });
        }

        const hapus = await BukuModel.hapus(id);

        return res.status(201).json({
            success: true,
            message: "Buku berhasil dihapus!"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {
    ListBuku,
    TotalBuku,
    TambahBuku,
    UpdateBuku,
    HapusBuku
}