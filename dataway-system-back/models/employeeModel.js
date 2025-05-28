var database = require("../database/config");

async function createCompanyEmployee(nome, birthDate, email, senha, cargo, cpf) {
  var instrucaoSql = `
        INSERT INTO Usuario 
        (tipoUsuario, email, senha, telefone, nome, fkEmpresa) 
        VALUES 
        ('${nome}', '${birthDate}', '${email}', '${senha}, ${cargo}', '${cpf}');
    `;
  return await database.executar(instrucaoSql);
}

module.exports = {
  createCompanyEmployee,
};
