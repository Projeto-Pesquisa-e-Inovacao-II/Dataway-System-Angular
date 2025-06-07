var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");


// Atualiza estado das notificações
router.post('/notificacoes/telegram', function (req, res) {
  notificacaoController.getChatId(req, res);
});


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.put("/", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const notificacoesAtivas = Number(req.query.notificacoesAtivas);
  console.log("Rota de atualização de notificações chamada com idUsuario:", idUsuario);
  console.log("Notificações ativas:", notificacoesAtivas);
  notificacaoController.atualizarNotificacoes(req, res, idUsuario, notificacoesAtivas);
});

router.get("/", function (req, res) {
  const idUsuario = req.query.idUsuario;
  notificacaoController.verificarNotificacoes(req, res, idUsuario);
});

router.put("/parametrizacao", function (req, res) {
  const idUsuario = req.query.idUsuario;
  const frequencia = req.query.frequencia;
  console.log("Rota de atualização de parametrização chamada com idUsuario:", idUsuario);
  console.log("Frequência:", frequencia);
  notificacaoController.updateParametrizacao(req, res, idUsuario, frequencia);
});

module.exports = router;

