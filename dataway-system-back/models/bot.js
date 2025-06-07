var database = require("../database/config");

function getChatId(chatId, tokenUsuario) {
  console.log(
    "ACESSEI O NOTIFICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente."
  );

  var instrucaoSql = `
        UPDATE usuario SET telegramChatId = ${chatId} WHERE token = '${tokenUsuario}';
    `;
  return database.executar(instrucaoSql);
}

module.exports = {
  getChatId,
};
