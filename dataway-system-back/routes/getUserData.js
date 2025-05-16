var express = require("express");
var router = express.Router();

var getUserDataController = require("../controllers/getUserDataController");

// Recebendo o email como parâmetro na rota e direcionando para a função getUserData de getUserDataController.js
router.get("/", function (req, res) {
  const idUsuario = req.query.idUsuario;
  getUserDataController.getUserData(req, res, idUsuario);
});


module.exports = router;