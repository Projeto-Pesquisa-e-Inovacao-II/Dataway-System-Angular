var database = require("../database/config");

async function getEmpresasCadastradas() {
  console.log(
    "ACESSEI O adm MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );

  var instrucaoSql = `
    SELECT * from Empresa;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

async function getEmpresasFiltradas(search) {
  console.log(
    "ACESSEI O adm MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );

  var instrucaoSql = `
    SELECT * from Empresa 
    WHERE representanteLegal LIKE '${search}%' 
    or razaoSocial LIKE '${search}%'
    or nomeFantasia LIKE '${search}%'
    or codigoEmpresa LIKE '${search}%'
    or cnpj LIKE '${search}%';

    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  getEmpresasCadastradas,
  getEmpresasFiltradas,
};
