var express = require("express");
var router = express.Router();

var concessoesUsuarioController = require("../controllers/concessoesUsuarioController");

router.get("/", function (req, res) {
  const idUsuario = req.query.idUsuario;
  concessoesUsuarioController.getUserConcessoesReq(req, res, idUsuario);
});

router.get("/evasoes", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const mes = req.query.mes;
  const concessao = req.query.concessao;
  concessoesUsuarioController.getEvasaoReq(req, res, idUsuario, mes, concessao);
});

module.exports = router;