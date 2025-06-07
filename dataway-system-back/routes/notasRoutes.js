const express = require("express");
const router = express.Router();
const notasController = require("../controllers/notasController");

router.get("/", notasController.listarNotas);
router.post("/", notasController.criarNota);
router.put("/:id", notasController.atualizarNota);
router.delete("/:id", notasController.deletarNota);

module.exports = router;