var database = require("../database/config");

function getChatId() {
  console.log(
    "ACESSEI O NOTIFICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente."
  );

  var instrucaoSql = `
        "UPDATE usuario SET telegramChatId = ${chatId}, notificacoesTelegram = 1 
        WHERE token = ${tokenUsuario}";
    `;
  return database.executar(instrucaoSql);
}

function atualizarNotificacoes(idUsuario, notificacoesAtivas) {
  console.log(
    "ACESSEI O NOTIFICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.",
    idUsuario
  );
  console.log(idUsuario);
  var instrucaoSql = `
        UPDATE Usuario
        SET notificacoesAtivas = ${notificacoesAtivas}
        WHERE cpf = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function verificarNotificacoes(idUsuario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarNotificacoes(): ",
    idUsuario
  );
  var instrucaoSql = `
        SELECT notificacoesAtivas FROM Usuario
        WHERE cpf = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  atualizarNotificacoes,
  verificarNotificacoes,
  getChatId,
};
