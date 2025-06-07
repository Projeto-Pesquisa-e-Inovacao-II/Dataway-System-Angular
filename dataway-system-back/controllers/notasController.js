const notasModel = require("../models/notasModel");

async function listarNotas(req, res) {
  try {
    const notas = await notasModel.listarNotas();
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function criarNota(req, res) {
  const { Descricao, MesReferente, Concessao, Status, fkUsuario } = req.body;
  try {
    await notasModel.criarNota(Descricao, MesReferente, Concessao, Status, fkUsuario);
    res.status(201).send({ message: "Nota criada com sucesso!" });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function atualizarNota(req, res) {
  const id = req.params.id;
  const { Descricao, MesReferente, Concessao, Status, fkUsuario } = req.body;
  try {
    await notasModel.atualizarNota(id, Descricao, MesReferente, Concessao, Status);
    res.status(200).send({ message: "Nota atualizada com sucesso!" });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deletarNota(req, res) {
  const id = req.params.id;
  try {
    await notasModel.deletarNota(id);
    res.status(200).send({ message: "Nota deletada com sucesso!" });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  listarNotas,
  criarNota,
  atualizarNota,
  deletarNota
};