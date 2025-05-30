var admModel = require("../models/admModel");

function getEmpresasCadastradas(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  admModel
    .getEmpresasCadastradas()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  getEmpresasCadastradas,
};
