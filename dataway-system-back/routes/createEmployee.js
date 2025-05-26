var express = require("express");
var router = express.Router();

var employeeController = require("../controllers/employeeController");

//Recebendo os dados do html e direcionando para a função cadastrar de employeeController.js
router.post("/", function (req, res) {
  employeeController.createEmployee(req, res);
});

router.get("/list", function (req, res) {
  idUsuario = req.query.idUsuario;
  employeeController.listEmployee(req, res, idUsuario);
});

module.exports = router;
