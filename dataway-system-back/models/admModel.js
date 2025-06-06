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

async function getEmpresa(idEmpresa) {
  console.log(
    "ACESSEI O adm MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );

  var instrucaoSql = `
    SELECT * from Empresa WHERE idEmpresa = ${idEmpresa};
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

async function updateEmpresa(empresa) {
  console.log(
    "ACESSEI O adm MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );

  console.log(
    "Recuperando empresa com o id: ",
    empresa.idEmpresa,
    "\nDados da empresa: ",
    empresa
  );

  var instrucaoSql = `
    UPDATE Empresa SET 
      representanteLegal = '${empresa.representanteLegal}',
      nomeFantasia = '${empresa.nomeFantasia}',
      cnpj = '${empresa.CNPJ}',
      codigoEmpresa = '${empresa.codigoEmpresa}',
      ativo = '${empresa.ativo}'
    WHERE idEmpresa = ${empresa.idEmpresa}
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

async function softDelete(idEmpresa) {
  console.log(
    "ACESSEI O adm MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );

  var instrucaoSql = `
    UPDATE Empresa SET 
      ativo = 0
    WHERE idEmpresa = ${idEmpresa}
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

async function reativarEmpresa(idEmpresa) {
  console.log(
    "ACESSEI O adm MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );

  var instrucaoSql = `
    UPDATE Empresa SET 
      ativo = 1
    WHERE idEmpresa = ${idEmpresa}
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

async function cadastrarEmpresa(empresa) {
  console.log(
    "ACESSEI O adm MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );

  var instrucaoSql = `
    INSERT INTO Empresa (representanteLegal, razaoSocial, nomeFantasia, cnpj, codigoEmpresa) 
    VALUES ('${empresa.representanteLegal}', '${empresa.razaoSocial}', '${empresa.nomeFantasia}', '${empresa.CNPJ}', '${empresa.codigoEmpresa}');
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  const result = await database.executar(instrucaoSql);
  const idEmpresa = result.insertId;
  for (let lote in empresa.concessoes) {
    let updateConcessoes = `
      UPDATE DadosPracaPedagio SET fkEmpresa = ${idEmpresa} WHERE lote = '${empresa.concessoes[lote]}';
    `;

    console.log("Executando a instrução SQL: \n" + updateConcessoes);
    await database.executar(updateConcessoes);
  }
}

function getConcessoesReq() {
  var instrucaoSql = `
    SELECT Distinct(lote) FROM DadosPracaPedagio where fkEmpresa is null;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  getEmpresasCadastradas,
  getEmpresa,
  getEmpresasFiltradas,
  updateEmpresa,
  softDelete,
  reativarEmpresa,
  cadastrarEmpresa,
  getConcessoesReq,
};
