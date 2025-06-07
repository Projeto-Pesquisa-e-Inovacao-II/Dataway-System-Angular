var notificacaoModel = require("../models/notificacaoModel");


function atualizarNotificacoes(req, res, idUsuario, notificacoesAtivas) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  console.log(
    "ACESSEI O NOTIFICACAO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarNotificacoes(): ",
    idUsuario
  );

  if (idUsuario == null || idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    notificacaoModel
      .atualizarNotificacoes(idUsuario, notificacoesAtivas)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Exporta as funções para serem usadas em outros arquivos
// Compare this snippet from dataway-system-back/routes/notificacaoRoutes.js:
function verificarNotificacoes(req, res, idUsuario) {
  console.log(
    "ACESSEI O NOTIFICACAO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarNotificacoes(): ",
    idUsuario
  );
  if (idUsuario == null || idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    notificacaoModel
      .verificarNotificacoes(idUsuario)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao verificar as notificações! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  atualizarNotificacoes,
  verificarNotificacoes,
};
