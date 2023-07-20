const KategoriModel = require('./../Models/KategoriModel')

const ListKategori = async (req, res) => {

    try {

        const kategori = await KategoriModel.getKategori();

        return res.status(201).json({
            success: true,
            data: kategori,
            keterangan: "List kategori"
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
        const getId = await KategoriModel.cekId(insert[0]);

        res.status(201).json({
            success: true,
            message: `Berhasil Insert Kategori, ${kategori}`,
            data: getId
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

        const update = await KategoriModel.update(id_kategori, kategori)

        return res.status(201).json({
            success: true,
            message: "Kategori Berhasil di Update!"
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

module.exports = {
    ListKategori,
    TambahKategori,
    UpdateKategori,
    HapusKategori
}