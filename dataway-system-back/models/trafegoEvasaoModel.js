var database = require("../database/config");

async function getGraphData(idUsuario, concessao) {
  try {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      idUsuario
    );
    console.log(idUsuario);
    const empresa = `
      SELECT fkEmpresa FROM Usuario
      WHERE Usuario.cpf = ${idUsuario};
    `;

    const resultadoEmpresa = await database.executar(empresa);

    const idEmpresa = resultadoEmpresa[0].fkEmpresa;

    // const dadosTrafegoEvasao = `
    //   select
    //     sum(DadosPracaPedagio.quantidade) as 'trafego',
    //     sum(case
    //             when tpCampo = 2
    //                 THEN quantidade
    //             ELSE 0
    //         END) as 'evasões'
    // FROM DadosPracaPedagio where DadosPracaPedagio.Empresa_idEmpresa = ${idEmpresa};
    // `;

    const resultadoPorMes = [];

    for (let mes = 1; mes <= 12; mes++) {
      const mesFormatado = mes < 10 ? `0${mes}` : mes;
      const sql = `
        select (COUNT(case when tpCampo = 2 then 2 end) / COUNT(*)) * 100 as evasoes 
        from DadosPracaPedagio 
        where lote = '${concessao}'
        and data LIKE '2024-${mesFormatado}-%' 
        and fkEmpresa = ${idEmpresa};
    `;
      console.log("SQL:", sql);
      const linhas = await database.executar(sql);
      resultadoPorMes.push({
        mes: mes,
        dados: linhas,
      });
    }

    return resultadoPorMes;
  } catch (erro) {
    console.log("Erro ao executar as queries:", erro);
    return [];
  }
}

async function pracaAlerta(idUsuario, mes, concessao) {
  try {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      idUsuario
    );
    console.log(idUsuario);
    const empresa = `
      SELECT fkEmpresa FROM Usuario
      WHERE Usuario.cpf = ${idUsuario};
    `;

    const resultadoEmpresa = await database.executar(empresa);

    const idEmpresa = resultadoEmpresa[0].fkEmpresa;

    const resultadoPorMes = [];

    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    const sql = `
        select praca from DadosPracaPedagio 
        where tpCampo = 2 
        and fkEmpresa = ${idEmpresa}
        and data LIKE '2024-${mesFormatado}-%' 
        and lote = '${concessao}'
        group by praca 
        ORDER BY praca ASC limit 1;
    `;
    console.log("SQL:", sql);

    return await database.executar(sql);
  } catch (erro) {
    console.log("Erro ao executar as queries:", erro);
    return [];
  }
}

async function getEvasao(idUsuario, mes, concessao) {
  try {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      idUsuario
    );
    console.log(idUsuario);
    const empresa = `
      SELECT fkEmpresa FROM Usuario
      WHERE Usuario.cpf = ${idUsuario};
    `;

    const resultadoEmpresa = await database.executar(empresa);

    const idEmpresa = resultadoEmpresa[0].fkEmpresa;

    const resultadoPorMes = [];

    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    const sql = `
        select sum(quantidade) as evasoes from DadosPracaPedagio
        where tpCampo = 2
        and fkEmpresa = ${idEmpresa}
        and data LIKE '2024-${mesFormatado}-%'
        and lote = '${concessao}' LIMIT 1;
    `;
    console.log("SQL:", sql);

    return await database.executar(sql);
  } catch (erro) {
    console.log("Erro ao executar as queries:", erro);
    return [];
  }
}

async function getImpactoFinancerio(idUsuario, mes, concessao) {
  try {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      idUsuario
    );
    console.log(idUsuario);
    const empresa = `
      SELECT fkEmpresa FROM Usuario
      WHERE Usuario.cpf = ${idUsuario};
    `;

    const resultadoEmpresa = await database.executar(empresa);

    const idEmpresa = resultadoEmpresa[0].fkEmpresa;

    const resultadoPorMes = [];

    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    const sql = `
      select sum(valor) as impactoFinanceiro from DadosPracaPedagio 
		    where fkEmpresa = ${idEmpresa}
        and tpCampo = 2
        and data LIKE '2024-${mesFormatado}-%'
        and lote = '${concessao}';
    `;
    console.log("SQL:", sql);

    return await database.executar(sql);
  } catch (erro) {
    console.log("Erro ao executar as queries:", erro);
    return [];
  }
}

async function getComparacaoEvasaoImpacto(idUsuario, mes, concessao) {
  try {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      idUsuario
    );
    console.log(idUsuario);
    const empresa = `
      SELECT fkEmpresa FROM Usuario
      WHERE Usuario.cpf = ${idUsuario};
    `;

    const resultadoEmpresa = await database.executar(empresa);

    const idEmpresa = resultadoEmpresa[0].fkEmpresa;

    const resultadoPorMes = [];

    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    const mesAnterior = mes - 1 < 10 ? `0${mes - 1}` : mes - 1;
    const sql = `
SELECT
    SUM(CASE WHEN data LIKE '2024-${mesAnterior}-%' THEN valor ELSE 0 END) AS impactoMesAnterior,
    SUM(CASE WHEN data LIKE '2024-${mesFormatado}-%' THEN valor ELSE 0 END) AS impactoMesAtual,
    SUM(CASE WHEN data LIKE '2024-${mesAnterior}-%' THEN quantidade ELSE 0 END) AS evasaoMesAnterior,
    SUM(CASE WHEN data LIKE '2024-${mesFormatado}-%' THEN quantidade ELSE 0 END) AS evasaoMesAtual
FROM DadosPracaPedagio
WHERE fkEmpresa = ${idEmpresa}
  AND tpCampo = 2
  AND lote = '${concessao}';
    `;
    console.log("SQL:", sql);

    return await database.executar(sql);
  } catch (erro) {
    console.log("Erro ao executar as queries:", erro);
    return [];
  }
}

async function getCategoria(idUsuario, mes, concessao) {
   try {
    console.log(
      "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
      idUsuario
    );
    console.log(idUsuario);
    const empresa = `
      SELECT fkEmpresa FROM Usuario
      WHERE Usuario.cpf = ${idUsuario};
    `;

    const resultadoEmpresa = await database.executar(empresa);

    const idEmpresa = resultadoEmpresa[0].fkEmpresa;

    const resultadoPorMes = [];

    const mesFormatado = mes < 10 ? `0${mes}` : mes;
    const sql = `
      select categoria from DadosPracaPedagio 
		    where fkEmpresa = ${idEmpresa}
        and tpCampo = 2
        and data LIKE '2024-${mesFormatado}-%'
        and lote = '${concessao}' ORDER BY categoria ASC LIMIT 3;
    `;
    console.log("SQL:", sql);

    return await database.executar(sql);
  } catch (erro) {
    console.log("Erro ao executar as queries:", erro);
    return [];
  } 
}
module.exports = {
  getGraphData,
  pracaAlerta,
  getEvasao,
  getImpactoFinancerio,
  getComparacaoEvasaoImpacto,
  getCategoria
};
