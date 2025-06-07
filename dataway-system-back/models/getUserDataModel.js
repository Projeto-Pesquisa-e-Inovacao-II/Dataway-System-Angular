var database = require("../database/config")

function getUserData(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idUsuario)
    console.log(idUsuario)
    var instrucaoSql = `
        SELECT * FROM Usuario
        JOIN Empresa ON Empresa.idEmpresa = Usuario.fkEmpresa
        WHERE cpf = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getUserData
};