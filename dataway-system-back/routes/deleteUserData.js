var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.delete("/", function (req, res) {
  const idUsuario = req.query.idUsuario;

  empresaController.deletar(req, res, idUsuario);
});

module.exports = router;
