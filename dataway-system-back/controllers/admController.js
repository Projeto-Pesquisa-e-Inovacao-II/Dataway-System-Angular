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

function getEmpresa(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  console.log("Recuperando empresa com o id: ", req.query.idEmpresa);
  admModel
    .getEmpresa(req.query.idEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.json(resultado[0]);
      } else {
        res.status(404).json({ message: "Empresa não encontrada" });
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao recuperar a empresa! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function getEmpresasFiltradas(req, res, search) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  admModel
    .getEmpresasFiltradas(search)
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

function updateEmpresa(req, res) {
  // Faça as validações dos valores
  // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  console.log("Atualizando empresa com os dados: ", req.body);
  admModel
    .updateEmpresa(req.body)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao atualizar a empresa! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function softDelete(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  console.log("Deletando empresa com o id: ", req.params.idEmpresa);
  admModel
    .softDelete(req.params.idEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao deletar a empresa! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function reativarEmpresa(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  console.log("Reativando empresa com o id: ", req.params.idEmpresa);
  admModel
    .reativarEmpresa(req.params.idEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao reativar a empresa! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarEmpresa(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  console.log("Cadastrando empresa com os dados: ", req.body);
  admModel
    .cadastrarEmpresa(req.body)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao cadastrar a empresa! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function getConcessoesGeral(req, res) {
  var idUsuario = req.query.idUsuario;
  var mes = req.query.mes;

  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
  admModel
    .getConcessoesReq(idUsuario, mes)
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
  getEmpresa,
  getEmpresasFiltradas,
  updateEmpresa,
  softDelete,
  reativarEmpresa,
  cadastrarEmpresa,
  getConcessoesGeral,
};
