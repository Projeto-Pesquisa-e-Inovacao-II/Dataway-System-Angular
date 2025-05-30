var express = require("express");
var router = express.Router();

var admController = require("../controllers/admController");

router.get("/empresas", function (req, res) {
  admController.getEmpresasCadastradas(req, res);
});

module.exports = router;
