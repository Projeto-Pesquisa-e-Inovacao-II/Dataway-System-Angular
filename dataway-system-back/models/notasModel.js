var database = require("../database/config");


async function listarNotasPorUsuario(cpf) {
  var instrucaoSql = `SELECT * FROM Notas WHERE fkUsuario = '${cpf}';`;
  return await database.executar(instrucaoSql);
}

async function criarNota(Descricao, MesReferente, Concessao, Status, fkUsuario) {
  var instrucaoSql = `
    INSERT INTO Notas (Descricao, MesReferente, Concessao, Status, fkUsuario)
    VALUES ('${Descricao}', '${MesReferente}', '${Concessao}', '${Status}', '${fkUsuario}');
  `;
  return await database.executar(instrucaoSql);
}

async function atualizarNota(id, Descricao, MesReferente, Concessao, Status) {
  var instrucaoSql = `
    UPDATE Notas
    SET Descricao = '${Descricao}',
        MesReferente = '${MesReferente}',
        Concessao = '${Concessao}',
        Status = '${Status}',
    WHERE idNotas = ${id};
  `;
  return await database.executar(instrucaoSql);
}

async function deletarNota(id) {
  var instrucaoSql = `
    DELETE FROM Notas WHERE idNotas = ${id};
  `;
  return await database.executar(instrucaoSql);
}

module.exports = {
  listarNotas,
  criarNota,
  atualizarNota,
  deletarNota,
  listarNotasPorUsuario
};