const Router = require("express").Router();
const BukuController = require('./../Controllers/BukuController');
const BukuValidation = require('./../Controllers/Validations/BukuController.Validation');
const UploadValidation = require('./../Controllers/Validations/UploadFile.Validation');

Router.get('/list', BukuController.ListBuku)
Router.get('/total', BukuController.TotalBuku )
Router.post('/tambah', BukuValidation.addValidation, UploadValidation.FilesBase, BukuController.TambahBuku )
Router.put('/edit/:id', BukuController.UpdateBuku)
Router.delete('/hapus/:id', BukuValidation.deleteValidation, BukuController.HapusBuku)

// Router.post('/upload', UploadValidation.FilesBase )

module.exports = Router;