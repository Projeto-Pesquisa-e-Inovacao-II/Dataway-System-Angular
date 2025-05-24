var express = require("express");
var router = express.Router();

var concessoesUsuarioController = require("../controllers/concessoesUsuarioController");

router.get("/", function (req, res) {
  const idUsuario = req.query.idUsuario;
  concessoesUsuarioController.getUserConcessoesReq(req, res, idUsuario);
});


module.exports = router;