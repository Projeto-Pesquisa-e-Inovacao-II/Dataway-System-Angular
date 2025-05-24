var express = require("express");
var router = express.Router();

var trafegoEvasaoController = require("../controllers/trafegoEvasaoController");

router.get("/", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const concessao = req.query.concessao;

  trafegoEvasaoController.getGraphData(req, res, idUsuario, concessao);
});

module.exports = router;
