var database = require("../database/config");

async function updateUserData(
  email,
  telefone,
  representanteLegal,
  nomeFantasia,
  idUsuario
) {
  console.log(
    "ACESSEI O UPdateUserData MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. "
  );
  const empresa = `
      SELECT fkEmpresa FROM Usuario
      WHERE Usuario.cpf = ${idUsuario};
    `;

  const resultadoEmpresa = await database.executar(empresa);

  const idEmpresa = resultadoEmpresa[0].fkEmpresa;
  console.log("idEmpresa: ", idEmpresa);
  var instrucaoSqlUsuario = `
        UPDATE Usuario SET email = '${email}', telefone = '${telefone}' WHERE cpf = '${idUsuario}';  
    `;

  var instrucaoSql = `UPDATE Empresa SET nomeFantasia = '${nomeFantasia}', representanteLegal = '${representanteLegal}' WHERE idEmpresa = '${idEmpresa}'`;

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
