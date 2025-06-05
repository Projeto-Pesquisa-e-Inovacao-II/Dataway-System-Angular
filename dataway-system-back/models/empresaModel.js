var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );

  //   CREATE TABLE Usuario (
  //     idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  //     tipoUsuario ENUM('Admin', 'Empresa', 'Funcionario'),
  //     email VARCHAR(100) UNIQUE NULL,
  //     senha VARCHAR(255) NULL,
  //     telefone VARCHAR(20) NULL
  // );

  // CREATE TABLE Empresa (
  //     idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  //     CNPJ CHAR(18) UNIQUE NULL,
  //     representanteLegal VARCHAR(100) NULL,
  //     nomeFantasia VARCHAR(100) NULL,
  //     concessionaria VARCHAR(100),
  //     Usuario_idUsuario INT NULL,
  //     FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
  // );
  var instrucaoSql = `
        SELECT cpf, nome, email FROM Usuario JOIN Empresa ON Usuario.fkEmpresa = Empresa.idEmpresa
WHERE email = '${email}' AND senha = '${senha}' and Empresa.ativo = 1;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function autenticarAdmin(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticarAdmin(): ",
    email,
    senha
  );
  var instrucaoSql = `
        SELECT cpf, tipoUsuario FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND tipoUsuario = 'admin';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

async function cadastrar(
  empresaServer,
  nomeFantasia,
  numero,
  cep,
  email,
  senha,
  representanteLegal,
  CNPJ,
  telefone
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    empresaServer,
    nomeFantasia,
    representanteLegal,
    CNPJ,
    numero,
    telefone,
    email,
    senha,
    cep
  );
  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  await inserirUsuario(email, senha, telefone, representanteLegal);

  const usuarioResult = await database.executar(`
    SELECT idUsuario FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND telefone = '${telefone}';
  `);

  const idUsuario = usuarioResult[0].idUsuario;

  await inserirEmpresa(
    CNPJ,
    representanteLegal,
    nomeFantasia,
    empresaServer,
    idUsuario
  );

  const empresaResult = await database.executar(`
    SELECT idEmpresa FROM Empresa WHERE CNPJ = '${CNPJ}' AND representanteLegal = '${representanteLegal}' AND concessionaria = '${empresaServer}';
  `);

  const idEmpresa = empresaResult[0].idEmpresa;

  await inserirEndereco(cep, numero, idEmpresa);

  return true;
}

//representanteLegal aqui seria o 'nome'
async function inserirUsuario(email, senha, telefone, representanteLegal) {
  var instrucaoSql = `
        INSERT INTO Usuario 
        (tipoUsuario, email, senha, telefone, nome) 
        VALUES 
        ('Empresa', '${email}', '${senha}', '${telefone}', '${representanteLegal}');
    `;
  return await database.executar(instrucaoSql);
}

async function inserirEmpresa(
  CNPJ,
  representanteLegal,
  nomeFantasia,
  concessionaria,
  idUsuario
) {
  var instrucaoSql = `
        INSERT INTO Empresa 
        ( CNPJ, representanteLegal, nomeFantasia, concessionaria, Usuario_idUsuario)
        VALUES  
        ('${CNPJ}', '${representanteLegal}', '${nomeFantasia}', '${concessionaria}', ${idUsuario});
    `;
  return await database.executar(instrucaoSql);
}
// function inserirEndereco(cep, estado, cidade, bairro, rua, numero, complemento) {
//   var instrucaoSql = `
//         INSERT INTO Endereco
//         (cep, estado, cidade, bairro, rua, numero, complemento)
//         VALUES
//         ('${cep}', '${estado}', '${cidade}', '${bairro}', '${rua}', '${numero}', '${complemento}');
//     `;
//   return database.executar(instrucaoSql);
// }

async function inserirEndereco(cep, numero, idEmpresa) {
  var instrucaoSql = `
        INSERT INTO Endereco 
        (cep, numero, Empresa_idEmpresa)
        VALUES   
        ('${cep}', '${numero}', '${idEmpresa}');
    `;
  return await database.executar(instrucaoSql);
}

function deletar(idEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    idEmpresa
  );
  //verificar id usuario de empresa, guarda delete de endereço e de empresa. executa verificação de id, deleta endereço, deleta empresa e deleta usuario
  const sqlSelectUsuario = `SELECT Usuario_idUsuario FROM Empresa WHERE idEmpresa = ${idEmpresa};`;

  const sqlDeleteEndereco = `DELETE FROM Endereco WHERE Empresa_idEmpresa = ${idEmpresa};`;

  const sqlDeleteEmpresa = `DELETE FROM Empresa WHERE idEmpresa = ${idEmpresa};`;

  console.log("Executando a instrução SQL de seleção: \n" + sqlSelectUsuario);

  return database.executar(sqlSelectUsuario).then((resultado) => {
    if (resultado.length === 0) {
      throw new Error("Empresa não encontrada!");
    }

    const idUsuario = resultado[0].Usuario_idUsuario;
    if (!idUsuario) {
      throw new Error("ID de usuário não encontrado para esta empresa!");
    }

    console.log("ID do Usuário encontrado:", idUsuario);

    console.log(
      "Executando a instrução SQL de deleção do endereco: \n" +
        sqlDeleteEndereco
    );

    return database
      .executar(sqlDeleteEndereco)
      .then((resultadoEndereco) => {
        console.log("Endereços deletados:", resultadoEndereco);

        console.log(
          "Executando a instrução SQL de deleção da empresa: \n" +
            sqlDeleteEmpresa
        );

        return database.executar(sqlDeleteEmpresa);
      })
      .then((resultadoEmpresa) => {
        console.log("Empresa deletada:", resultadoEmpresa);

        const sqlDeleteUsuario = `DELETE FROM Usuario WHERE idUsuario = ${idUsuario};`;
        console.log(
          "Executando a instrução SQL de deleção do usuário: \n" +
            sqlDeleteUsuario
        );
        return database.executar(sqlDeleteUsuario);
      })
      .then((resultadoUsuario) => {
        console.log("Usuário deletado:", resultadoUsuario);
      });
  });
}

module.exports = {
  autenticar,
  autenticarAdmin,
  cadastrar,
  deletar,
};
