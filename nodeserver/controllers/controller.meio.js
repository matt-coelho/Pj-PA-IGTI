"use strict"
import util from "../Utils/Utils.js"
import service from "../services/service.meio.js"

async function create(req, res, next) {
  const meio = {}
  if (!req.header("Authorization")) {
    res.status(500).json({
      status: "falhou",
      message: "Requisição rejeitada",
    })
  } else {
    const token = req.header("Authorization").split(" ")[1]

    const decodedToken = util.decodeToken(token)

    meio.idbanco = req.body.idbanco
    meio.idEntidade = decodedToken.userId
    meio.tipo = req.body.tipo
    meio.endereco = req.body.endereco
    meio.agencia = req.body.agencia
    meio.conta = req.body.conta
    meio.nome = req.body.nome
  }

  try {
    const resp = await service.create(meio)
    if (!resp) {
      res.status(200).json({ status: "ok", message: "Meio criado." })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  const token = req.header("Authorization").split(" ")[1]

  const decodedToken = util.decodeToken(token)
  const meio = {
    idEntidade: decodedToken.userId,
    idmeio: req.params.meio,
  }
  try {
    const resp = await service.remove(meio)
    if (!resp) {
      res
        .status(200)
        .json({ status: "ok", message: "Meio removido com sucesso." })
    }
  } catch (err) {
    next(err)
  }
}

export default { create, remove }
