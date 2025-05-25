var database = require("../database/config");

async function getUserConcessoes(idUsuario, mes) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idUsuario
  );
  console.log(idUsuario);
  console.log(idUsuario);
  var instrucaoSql = `
SELECT fkEmpresa FROM Usuario WHERE cpf = ${idUsuario};
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  var fkEmpresa = await database.executar(instrucaoSql);
  console.log(fkEmpresa);
  var idEmpresa = fkEmpresa[0].fkEmpresa;
  const mesFormatado = mes < 10 ? `0${mes}` : mes;

  var instrucaoSql = `
    SELECT
      dp.lote      AS concessao,
      SUM(dp.quantidade) AS trafego
    FROM DadosPracaPedagio dp
    WHERE dp.fkEmpresa = ${idEmpresa}
      AND dp.data LIKE '2024-${mesFormatado}-%'
    GROUP BY dp.lote;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

async function getEvasao(idUsuario, mes, concessao) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idUsuario
  );
  console.log(idUsuario);
  var instrucaoSql = `
SELECT fkEmpresa FROM Usuario WHERE cpf = ${idUsuario};
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  var fkEmpresa = await database.executar(instrucaoSql);
  console.log(fkEmpresa);
  var idEmpresa = fkEmpresa[0].fkEmpresa;

  const mesFormatado = mes < 10 ? `0${mes}` : mes;

  const sql = `
        select (COUNT(case when tpCampo = 2 then 2 end) / COUNT(*)) * 100 as evasoes 
        from DadosPracaPedagio 
        where lote = '${concessao}'
        and data LIKE '2024-${mesFormatado}-%' 
        and fkEmpresa = ${idEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + sql);
  return database.executar(sql);
}

module.exports = {
  getUserConcessoes,
  getEvasao,
};
