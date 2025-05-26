var database = require("../database/config");

async function createCompanyEmployee(
  nome,
  birthDate,
  email,
  senha,
  cargo,
  cpf
) {
  var instrucaoSql = `
        INSERT INTO Usuario 
        (tipoUsuario, email, senha, telefone, nome, fkEmpresa) 
        VALUES 
        ('${nome}', '${birthDate}', '${email}', '${senha}, ${cargo}', '${cpf}');
    `;
  return await database.executar(instrucaoSql);
}

async function listEmployee(idUsuario) {
  var sqlEmpresa = `
        SELECT fkEmpresa FROM Usuario WHERE cpf = '${idUsuario}';
    `;
  console.log("Executando a consulta SQL para obter a empresa do usuário:", sqlEmpresa);
  // Executa a consulta para obter a empresa associada ao usuário
  var resultadoEmpresa = await database.executar(sqlEmpresa);

  if (resultadoEmpresa.length === 0) {
    throw new Error("Empresa não encontrada para o usuário fornecido.");
  }

  var fkEmpresa = resultadoEmpresa[0].fkEmpresa;
  var instrucaoSql = `
        SELECT * FROM Usuario where fkEmpresa = ${fkEmpresa};
    `;

    console.log("Executando a consulta SQL para listar funcionários:", instrucaoSql);
  return await database.executar(instrucaoSql);
}

module.exports = {
  createCompanyEmployee,
  listEmployee,
};
