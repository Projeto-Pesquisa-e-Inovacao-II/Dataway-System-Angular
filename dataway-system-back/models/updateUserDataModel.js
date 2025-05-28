var database = require("../database/config");

async function updateUserData(
  nome,
  email,
  telefone,
  senha,
  idUsuario
) {
  console.log(
    "ACESSEI O UPdateUserData MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. "
  );
  // const empresa = `
  //     SELECT fkEmpresa FROM Usuario
  //     WHERE Usuario.cpf = ${idUsuario};
  //   `;

  // const resultadoEmpresa = await database.executar(empresa);

  // const idEmpresa = resultadoEmpresa[0].fkEmpresa;
  // console.log("idEmpresa: ", idEmpresa);
  var instrucaoSqlUsuario = `
        UPDATE Usuario SET nome = '${nome}', email = '${email}', telefone = '${telefone}', senha = '${senha}' WHERE cpf = '${idUsuario}';  
    `;

  // var instrucaoSql = `UPDATE Empresa SET nomeFantasia = '${nomeFantasia}', representanteLegal = '${representanteLegal}' WHERE idEmpresa = '${idEmpresa}'`;

  console.log(
    "Executando a instrução SQL: \n" + instrucaoSqlUsuario
  );
  return await database.executar(instrucaoSqlUsuario)
  // return Promise.all([
  //   database.executar(instrucaoSqlUsuario),
  //   database.executar(instrucaoSql),
  // ]);
}

module.exports = {
  updateUserData,
};
