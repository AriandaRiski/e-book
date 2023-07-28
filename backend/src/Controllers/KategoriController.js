const KategoriModel = require('./../Models/KategoriModel')

const ListKategori = async (req, res) => {

    try {

        let filter = {}
        filter = { ...filter, page: req.query.page ?? 1 };
        filter = { ...filter, limit: req.query.limit ?? 10 };

        const kategori = await KategoriModel.getKategori(filter);
        const total = await KategoriModel.total().first();

        return res.status(201).json({
            success: true,
            data: kategori,
            keterangan: "List kategori",
            total : total.total
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

const TambahKategori = async (req, res) => {

    const kategori = req.body.kategori;

    try {
        const cek = await KategoriModel.cekKategori(kategori);
        if (cek) {
            return res.json({
                success: false,
                message: `Data Kategori " ${kategori} " Sudah Tersedia`
            });
        }

        const insert = await KategoriModel.tambah(kategori);
        const getData = await KategoriModel.cekId(insert[0]);

        res.status(201).json({
            success: true,
            message: `Berhasil Insert Kategori, ${kategori}`,
            data: getData
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

const UpdateKategori = async (req, res) => {

    const id_kategori = req.params.id_kategori;
    const kategori = req.body.kategori;

    try {

        const cek = await KategoriModel.cekId(id_kategori);
        if (!cek) {
            return res.json({ message: `data dengan id = ${id_kategori} tidak ditemukan!` })
        }

        const cek_kat = await KategoriModel.cekKategori(kategori,id_kategori);
        if (cek_kat) {
            return res.json({ success: false, message: `Data Kategori " ${kategori} " Sudah Tersedia` });
        }

        const update = await KategoriModel.update(id_kategori, kategori)
        const getData = await KategoriModel.cekId(id_kategori)

        return res.status(201).json({
            success: true,
            message: "Kategori Berhasil di Update!",
            data: getData
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

const HapusKategori = async (req, res) => {

    const id_kategori = req.params.id_kategori;

    try {

        const cek = await KategoriModel.cekId(id_kategori);
        if (!cek) {
            return res.json({ message: `data dengan id = ${id_kategori} tidak ditemukan!` });
        }

        const hapus = await KategoriModel.hapus(id_kategori);

        return res.status(201).json({
            success: true,
            message: "Kategori berhasil dihapus!"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

const TotalKategori = async (req, res) => {
    const total = await KategoriModel.total().first();
    return res.status(201).json(total)
}

module.exports = {
    ListKategori,
    TambahKategori,
    UpdateKategori,
    HapusKategori,
    TotalKategori
}