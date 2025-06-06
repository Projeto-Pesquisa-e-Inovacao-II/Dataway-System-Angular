const ocorrenciaModel = require("../models/ocorrenciaModel");

async function criarOcorrencia(req, res) {
  const { descricao, concessao, praca, status, mesReferente, fkFuncionario } = req.body;
  try {
    await ocorrenciaModel.criarOcorrencia(descricao, concessao, praca, status, mesReferente, fkFuncionario);
    res.status(201).send({ message: "Ocorrência criada com sucesso!" });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function listarOcorrencias(req, res) {
  try {
    const ocorrencias = await ocorrenciaModel.listarOcorrencias();
    res.status(200).json(ocorrencias);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  criarOcorrencia,
  listarOcorrencias
};