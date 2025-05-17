var database = require("../database/config");

function updateUserData(
  email,
  telefone,
  representanteLegal,
  nomeFantasia,
  idUsuario
) {
  console.log(
    "ACESSEI O UPdateUserData MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. "
  );
  var instrucaoSqlUsuario = `
        UPDATE Usuario SET email = '${email}', telefone = '${telefone}' WHERE idUsuario = '${idUsuario}';  
    `;

  var instrucaoSql = `UPDATE Empresa SET nomeFantasia = '${nomeFantasia}', representanteLegal = '${representanteLegal}' WHERE Usuario_idUsuario = '${idUsuario}'`;

  console.log(
    "Executando a instrução SQL: \n" + instrucaoSql + "e" + instrucaoSqlUsuario
  );
  return Promise.all([
    database.executar(instrucaoSqlUsuario),
    database.executar(instrucaoSql),
  ]);
}

module.exports = {
  updateUserData,
};
