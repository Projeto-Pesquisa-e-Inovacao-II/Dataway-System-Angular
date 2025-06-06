var database = require("../database/config");

// Criar nova ocorrência
async function criarOcorrencia(descricao, concessao, praca, status, mesReferente, fkFuncionario) {
  var instrucaoSql = `
    INSERT INTO Ocorrencias (Descricao, Concessao, Praca, Status, MesReferente, fkFuncionario)
    VALUES ('${descricao}', '${concessao}', '${praca}', '${status}', '${mesReferente}', '${fkFuncionario}');
  `;
  return await database.executar(instrucaoSql);
}

// Listar todas as ocorrências
async function listarOcorrencias() {
  var instrucaoSql = `SELECT * FROM Ocorrencias;`;
  return await database.executar(instrucaoSql);
}

module.exports = {
  criarOcorrencia,
  listarOcorrencias
};