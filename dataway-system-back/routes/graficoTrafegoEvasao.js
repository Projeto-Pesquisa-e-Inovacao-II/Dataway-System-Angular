var express = require("express");
var router = express.Router();

var trafegoEvasaoController = require("../controllers/trafegoEvasaoController");

router.get("/", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const concessao = req.query.concessao;

  trafegoEvasaoController.getGraphData(req, res, idUsuario, concessao);
});

router.get("/praca_alerta", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const mes = req.query.mes;
  const concessao = req.query.concessao;
  trafegoEvasaoController.pracaAlerta(req, res, idUsuario, mes, concessao);
});

router.get("/total_evasao", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const mes = req.query.mes;
  const concessao = req.query.concessao;
  trafegoEvasaoController.getEvasao(req, res, idUsuario, mes, concessao);
});

router.get("/impacto_financeiro", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const mes = req.query.mes;
  const concessao = req.query.concessao;
  trafegoEvasaoController.getImpactoFinancerio(req, res, idUsuario, mes, concessao);
});

router.get("/comparacao_evasao_impacto", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const mes = req.query.mes;
  const concessao = req.query.concessao;
  trafegoEvasaoController.getComparacaoEvasaoImpacto(req, res, idUsuario, mes, concessao);
});

module.exports = router;
