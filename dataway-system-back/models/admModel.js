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
    SELECT DISTINCT
      Empresa.idEmpresa,
      Empresa.CNPJ,
      Empresa.representanteLegal,
      Empresa.razaoSocial,
      Empresa.nomeFantasia,
      Empresa.codigoEmpresa,
      Empresa.ativo,
      DadosPracaPedagio.lote
    FROM Empresa
    LEFT JOIN DadosPracaPedagio ON DadosPracaPedagio.fkEmpresa = Empresa.idEmpresa
    WHERE Empresa.idEmpresa = ${idEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  let result = await database.executar(instrucaoSql);
  let allLotes = await getConcessoesReq();
  const empresa = {
    idEmpresa: result[0].idEmpresa,
    CNPJ: result[0].CNPJ,
    representanteLegal: result[0].representanteLegal,
    razaoSocial: result[0].razaoSocial,
    nomeFantasia: result[0].nomeFantasia,
    codigoEmpresa: result[0].codigoEmpresa,
    ativo: result[0].ativo,
    lotes: result.map((loteAtual) => loteAtual.lote),
    allLotes: allLotes.map((lote) => lote.lote),
  };
  return empresa;
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

  for (let lote in empresa.concessoes) {
    console.log("Lote selecionado: ", empresa.concessoes[lote]);

    var verificacaoLoteAtribuido = `
      SELECT * FROM DadosPracaPedagio 
      WHERE fkEmpresa != ${empresa.idEmpresa} 
      AND fkEmpresa IS NOT NULL 
      AND lote = '${empresa.concessoes[lote]}' LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + verificacaoLoteAtribuido);

    let result = await database.executar(verificacaoLoteAtribuido);
    console.log("verificação de lote atribuído: ", result);

    if (result.length > 0) {
      console.log("lote já atribuído");
      return {
        message: "Concessão já atribuída a outra empresa.",
        status: 400,
      };
    }
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  var instrucaoSql = `
    UPDATE Empresa SET 
      representanteLegal = '${empresa.representanteLegal}',
      nomeFantasia = '${empresa.nomeFantasia}',
      cnpj = '${empresa.CNPJ}',
      codigoEmpresa = '${empresa.codigoEmpresa}',
      ativo = '${empresa.ativo}'
    WHERE idEmpresa = ${empresa.idEmpresa}
    `;
  await database.executar(instrucaoSql);

  console.log("Atualizando lotes da empresa: ", empresa.idEmpresa);
  var updateLotes = `
      UPDATE DadosPracaPedagio SET fkEmpresa = null WHERE fkEmpresa = '${empresa.idEmpresa}';
    `;
  await database.executar(updateLotes);

  for (let lote in empresa.concessoes) {
    let updateConcessoes = `
      UPDATE DadosPracaPedagio SET fkEmpresa = ${empresa.idEmpresa} WHERE lote = '${empresa.concessoes[lote]}';
    `;

    console.log("Executando a instrução SQL: \n" + updateConcessoes);
    await database.executar(updateConcessoes);
  }
  return {
    status: 200,
    message: "empresa atualizou",
  };
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
    SELECT Distinct(lote) FROM DadosPracaPedagio;
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
