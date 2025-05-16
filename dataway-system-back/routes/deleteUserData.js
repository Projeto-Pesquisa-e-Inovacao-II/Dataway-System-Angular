var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.delete("/:idEmpresa", empresaController.deletar);

module.exports = router;
