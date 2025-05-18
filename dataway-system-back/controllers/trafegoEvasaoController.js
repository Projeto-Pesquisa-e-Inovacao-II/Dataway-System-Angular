var trafegoEvasaoModel = require("../models/trafegoEvasaoModel");

function getGraphData(req, res, idEmpresa) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  if (idEmpresa == null || idEmpresa == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    trafegoEvasaoModel
      .getGraphData(idEmpresa)
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
}
module.exports = {
  getGraphData,
};
