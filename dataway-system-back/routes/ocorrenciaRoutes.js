const express = require("express");
const router = express.Router();
const ocorrenciaController = require("../controllers/ocorrenciaController");

router.post("/", ocorrenciaController.criarOcorrencia);
router.get("/", ocorrenciaController.listarOcorrencias);

module.exports = router;