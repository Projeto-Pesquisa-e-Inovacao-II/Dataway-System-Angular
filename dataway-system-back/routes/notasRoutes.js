const express = require("express");
const router = express.Router();
const notasController = require("../controllers/notasController");


router.post("/", notasController.criarNota);
router.put("/:id", notasController.atualizarNota);
router.delete("/:id", notasController.deletarNota);
router.get("/usuario/:cpf", notasController.listarNotasPorUsuario);

module.exports = router;