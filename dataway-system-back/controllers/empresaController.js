var empresaModel = require("../models/empresaModel");

function autenticar(req, res) {
  var email = req.body.email;
  var senha = req.body.senha;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    empresaModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.status(200).json(resultadoAutenticar[0]);
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function autenticarAdmin(req, res) {
  var email = req.body.email;
  var senha = req.body.senha;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    empresaModel
      .autenticarAdmin(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.status(200).json(resultadoAutenticar[0]);
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  console.log(req.body);
  var nome = req.body.userData.nomeServer;
  var cpf = req.body.userData.cpfServer; 
  var telefone = req.body.userData.telefoneServer;
  var email = req.body.userData.emailServer;
  var senha = req.body.userData.senhaServer;
  var codigoEmpresa = req.body.userData.codigoEmpresaServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu CPF está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (codigoEmpresa == undefined) {
    res.status(400).send("O código da empresa está undefined!");
  } else {
    // Passe apenas os campos necessários para o model
    empresaModel
      .cadastrar(nome, cpf, telefone, email, senha, codigoEmpresa)
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

function deletar(req, res, idUsuario) {
  if (idUsuario == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
    empresaModel
      .deletar(idUsuario)
      .then((resultado) => {
        res.status(200).json({ sucesso: true, resultado });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ erro: "Erro ao deletar empresa." });
      });
  }
}
module.exports = {
  autenticar,
  autenticarAdmin,
  cadastrar,
  deletar,
};
