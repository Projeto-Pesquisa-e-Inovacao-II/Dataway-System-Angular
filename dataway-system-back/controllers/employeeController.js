var empresaModel = require("../models/empresaModel");

function createEmployee(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var empresaServer = req.body.userData.empresaServer;
  var nomeFantasia = req.body.userData.nomeFantasiaServer;
  var numero = req.body.userData.numeroServer;
  var representanteLegal = req.body.userData.representanteLegalServer;
  var CPNJ = req.body.userData.cnpjServer;
  var telefone = req.body.userData.telefoneServer;
  var email = req.body.userData.emailServer;
  var senha = req.body.userData.senhaServer;
  var cep = req.body.userData.cepServer;

  console.log(req.body)
  console.log("email: ", email);


  console.log("OI");  
  // Faça as validações dos valores
  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
    // console.log(nomeFantasia);
    empresaModel
      .cadastrar(
        empresaServer,
        nomeFantasia,
        numero,
        cep,
        email,
        senha,
        representanteLegal,
        CPNJ,
        telefone
      )
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
  createEmployee,
};
