var employeeModel = require("../models/employeeModel");

function createEmployee(req, res) {
  console.log(req);
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var name = req.body.name;
  var role = req.body.role;
  var cpf = req.body.cpf;
  var birthDate = req.body.birthDate;
  var email = req.body.email;
  var password = req.body.password;


  console.log("OI");
  // Faça as validações dos valores
  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (password == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo employeeModel.js
    // console.log(nomeFantasia);
    employeeModel
      .createCompanyEmployee(name, birthDate, email, password, role, cpf)
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
