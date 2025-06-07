var database = require("../database/config");

function atualizarNotificacoes(idUsuario, notificacoesAtivas) {
  console.log(
    "ACESSEI O NOTIFICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.",
    idUsuario
  );
  console.log(idUsuario);
  var instrucaoSql = `
        UPDATE Usuario
        SET notificacoesAtivas = ${notificacoesAtivas}
        WHERE cpf = '${idUsuario}';
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
        WHERE cpf = '${idUsuario}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function updateParametrizacao(idUsuario, frequencia) {
  var instrucaoSql = `
    UPDATE Frequencia f
    JOIN Config_Notificacoes c ON c.fkFrequencia = f.idFrequencia
    JOIN Usuario u ON u.fkNotificacoes = c.idNotificacoes
    SET f.frequencia = '${frequencia}', 
        f.diaDisparo = 'Novo Dia'
    WHERE u.cpf = '${idUsuario}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  atualizarNotificacoes,
  verificarNotificacoes,
  updateParametrizacao,
};
