var express = require("express");
var router = express.Router();

var admController = require("../controllers/admController");

router.get("/empresas", function (req, res) {
  admController.getEmpresasCadastradas(req, res);
});

router.get("/empresasFiltradas", function (req, res) {
  search = req.query.search;
  admController.getEmpresasFiltradas(req, res, search);
});

router.put("/empresa", function (req, res) {
  admController.updateEmpresa(req, res);
});

router.put("/empresa/desativar/:idEmpresa", function (req, res) {
  admController.softDelete(req, res);
});

router.put("/empresa/reativar/:idEmpresa", function (req, res) {
  admController.reativarEmpresa(req, res);
});

router.post("/cadastrar-empresa", function (req, res) {
  admController.cadastrarEmpresa(req, res);
});

module.exports = router;
