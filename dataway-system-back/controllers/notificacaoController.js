var notificacaoModel = require("../models/notificacaoModel");
const TelegramBot = require("node-telegram-bot-api");

function getChatId(req, res) {
  const bot = new TelegramBot(
    "7753286594:AAHkbUrC_rgxK63_Qok9k0F2rCsXhdrUJxw",
    { polling: true }
  );

  bot.onText(/\/start (.+)?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const tokenUsuario = match[1]; // Ex: usuario123

    console.log(
      "ACESSEI O NOTIFICACAO CONTROLLER \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getChatId(): ",
      chatId,
      tokenUsuario
    );

    if (!chatId || !tokenUsuario) {
      return res
        .status(400)
        .send("Chat ID ou token do usuário não fornecidos.");
    } else {
      notificacaoModel
        .getChatId(chatId, tokenUsuario)
        .then(function (resultado) {
          console.log("Chat ID atualizado com sucesso:", resultado);
          res.status(200).send("Chat ID atualizado com sucesso.");
        })
        .catch(function (erro) {
          console.error("Erro ao atualizar o Chat ID:", erro);
          res.status(500).send("Erro ao atualizar o Chat ID.");
        });
    }
  });
}

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
  getChatId,
};
