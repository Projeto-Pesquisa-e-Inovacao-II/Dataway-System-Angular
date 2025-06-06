var updateUserDataModel = require("../models/updateUserDataModel");

function updateUserData(req, res, idUsuario) {
  // Crie uma variável que vá recuperar os valores do arquivo perfil.html
  console.log("ACESSEI O updateUserData CONTROLLER");
  console.log("idUsuario: ", idUsuario);
  console.log("req: ", req.body);
  var nome = req.body.nome;
  var email = req.body.email;
  var telefone = req.body.telefone;
  var senha = req.body.senha;
  // Faça as validações dos valores
  if (idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    console.log(email);
    console.log(telefone);
    console.log(nome);
    console.log(senha);

    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    updateUserDataModel
      .updateUserData(
        nome,
        email,
        telefone,
        senha,
        idUsuario
      )
      .then(function (resultado) {
        console.log("resultado: ", resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o update! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  updateUserData,
};
