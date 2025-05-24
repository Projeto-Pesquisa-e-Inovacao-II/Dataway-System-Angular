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

module.exports = {
  getGraphData,
};
