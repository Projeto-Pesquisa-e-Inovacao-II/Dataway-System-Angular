var trafegoEvasaoModel = require("../models/trafegoEvasaoModel");

function getGraphData(req, res, idEmpresa, concessao) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores

  if (idEmpresa == null || idEmpresa == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    trafegoEvasaoModel
      .getGraphData(idEmpresa, concessao)
      .then(function (resultado) {
        res.json(resultado);
        console.log(resultado);
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

function pracaAlerta(req, res, idUsuario, mes, concessao) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores

  if (idUsuario == null || idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    trafegoEvasaoModel
      .pracaAlerta(idUsuario, mes, concessao)
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

function porcetagemPraca(req, res, idUsuario, mes, concessao) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores
  if (idUsuario == null || idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    trafegoEvasaoModel
      .porcetagemPraca(idUsuario, mes, concessao)
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

function getEvasao(req, res, idUsuario, mes, concessao) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores

  if (idUsuario == null || idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    trafegoEvasaoModel
      .getEvasao(idUsuario, mes, concessao)
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

function getImpactoFinancerio(req, res, idUsuario, mes, concessao) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores

  if (idUsuario == null || idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    trafegoEvasaoModel
      .getImpactoFinancerio(idUsuario, mes, concessao)
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

function getComparacaoEvasaoImpacto(req, res, idUsuario, mes, concessao) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores

  if (idUsuario == null || idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    trafegoEvasaoModel
      .getComparacaoEvasaoImpacto(idUsuario, mes, concessao)
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

// Função para obter os dados da categoria
function getCategoria(req, res, idUsuario, mes, concessao) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Faça as validações dos valores

  if (idUsuario == null || idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo updateUserDataModel.js
    trafegoEvasaoModel
      .getCategoria(idUsuario, mes, concessao)
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
  pracaAlerta,
  getEvasao,
  getImpactoFinancerio,
  getComparacaoEvasaoImpacto,
  getCategoria,
  porcetagemPraca
};
