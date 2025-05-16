var express = require("express");
var router = express.Router();

var updateUserData = require("../controllers/updateUserDataController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.put("/", function (req, res) {
    const idEmpresa = 1;
    updateUserData.updateUserData(req, res, idEmpresa);
})

module.exports = router;