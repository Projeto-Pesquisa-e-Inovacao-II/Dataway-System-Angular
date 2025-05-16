var updateUserDataModel = require("../models/updateUserDataModel");

function updateUserData(req, res, idEmpresa) {
  // Crie uma variável que vá recuperar os valores do arquivo perfil.html
  var email = req.body[0];
  var telefone = req.body[1];
  var representanteLegal = req.body[2];
  var razaoSocial = req.body[3];
  var nomeFantasia = req.body[4];
  // Faça as validações dos valores
  if (idEmpresa == undefined) {
    res.status(400).send("Seu id está undefined!");
  }else {
    console.log(email)
    console.log(telefone)
    console.log(representanteLegal)
    console.log(razaoSocial)
    console.log(nomeFantasia);
    console.log(idEmpresa)

    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  updateUserDataModel.updateUserData(email, telefone, representanteLegal, razaoSocial, nomeFantasia, idEmpresa)
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
  updateUserData,
};
