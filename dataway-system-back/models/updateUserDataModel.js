var database = require("../database/config");

function updateUserData(
  email,
  telefone,
  representanteLegal,
  razaoSocial,
  nomeFantasia,
  idEmpresa
) {
  console.log(
    "ACESSEI O UPdateUserData MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. "
  );
  var instrucaoSqlUsuario = `
        UPDATE Usuario SET email = '${email}', telefone = '${telefone}' WHERE idUsuario = '${idEmpresa}';  
    `;

  var instrucaoSql = `UPDATE Empresa SET nomeFantasia = '${nomeFantasia}', razaoSocial = '${razaoSocial}', representanteLegal = '${representanteLegal}' WHERE idEmpresa = '${idEmpresa}'`;

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
