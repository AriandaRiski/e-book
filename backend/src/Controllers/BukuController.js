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

    try {

        const insert = await BukuModel.tambah(data);
        const getData = await BukuModel.cekId(insert[0]);

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

    try {

        // const cek = await BukuModel.cekId(data.id);
        // if (!cek) {
        //     return res.json({ message: `data dengan id = ${data.id} tidak ditemukan!` });
        // }

        // const cekBuku = await BukuModel.cekBuku(data, data.id)
        // if (cekBuku) {
        //     return res.json({ success: false, message: `Buku dengan Judul " ${data.judul} "karangan " ${data.pengarang} " Sudah Tersedia` });
        // }

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
            message: "Kategori berhasil dihapus!"
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