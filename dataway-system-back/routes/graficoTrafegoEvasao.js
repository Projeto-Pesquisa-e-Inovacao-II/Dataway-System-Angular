var express = require("express");
var router = express.Router();

var trafegoEvasaoController = require("../controllers/trafegoEvasaoController");

router.get("/", function (req, res) {
  const idUsuario = req.query.idUsuario;

  trafegoEvasaoController.getGraphData(req, res, idUsuario);
});

module.exports = router;
