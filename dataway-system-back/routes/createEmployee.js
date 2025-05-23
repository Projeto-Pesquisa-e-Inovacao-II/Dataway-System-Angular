var express = require("express");
var router = express.Router();

var employeeController = require("../controllers/employeeController");

//Recebendo os dados do html e direcionando para a função cadastrar de employeeController.js
router.post("/create-employee", function (req, res) {
    employeeController.cadastrar(req, res);
});

module.exports = router;
