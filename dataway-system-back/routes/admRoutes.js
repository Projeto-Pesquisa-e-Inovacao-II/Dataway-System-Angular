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

module.exports = router;
