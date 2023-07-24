const Router = require("express").Router();
const KategoriController = require('./../Controllers/KategoriController');
const KategoriValidation = require('./../Controllers/Validations/KategoriController.Validation');

Router.get('/list-new', (req, res) => {
    res.send("ini list");
})

Router.get('/list', KategoriController.ListKategori)
Router.post('/tambah', KategoriValidation.addValidation, KategoriController.TambahKategori)
Router.put('/edit/:id_kategori', KategoriValidation.editValidation, KategoriController.UpdateKategori)
Router.delete('/hapus/:id_kategori', KategoriValidation.deleteValidation, KategoriController.HapusKategori)
Router.get('/total', KategoriController.TotalKategori )

module.exports = Router;