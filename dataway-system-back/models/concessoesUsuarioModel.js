var database = require("../database/config");

function getUserConcessoes(idUsuario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idUsuario
  );
  console.log(idUsuario);
  var instrucaoSql = `
SELECT distinct(lote) as 'concessao', sum(quantidade) as 'trafego' FROM Usuario 
	JOIN DadosPracaPedagio as dp on dp.fkEmpresa = Usuario.fkEmpresa group by lote;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  getUserConcessoes,
};
