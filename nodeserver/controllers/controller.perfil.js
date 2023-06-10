"use strict"
import service from "../services/service.perfil.js"
import serviceMeta from "../services/service.meta.js"
import serviceMeio from "../services/service.meio.js"
import util from "../Utils/Utils.js"

async function read(req, res, next) {
  if (!req.params.cgc && !req.header("Authorization")) {
    res.status(500).json({
      status: "falhou",
      message: "Requisição rejeitada",
    })
  } else {
    const perfil = {}
    if (req.params.cgc) {
      perfil.cgc = req.params.cgc
    }

    if (req.header("Authorization")) {
      const token = req.header("Authorization").split(" ")[1]
      const decodedToken = util.decodeToken(token)
      perfil.idEntidade = decodedToken.userId
    }
    try {
      const pr = await service.read(perfil)

      const meta = await serviceMeta.readEntidade(perfil)
      pr.metas = meta

      const meio = await serviceMeio.read(perfil)
      pr.pagamentos = meio

      res.send(pr)
    } catch (err) {
      next(err)
    }
  }
}

async function readProfPic(req, res, next) {
  if (!req.header("Authorization")) {
    res.status(500).json({
      status: "falhou",
      message: "Requisição rejeitada",
    })
  } else {
    const perfil = {}
    if (req.header("Authorization")) {
      const token = req.header("Authorization").split(" ")[1]
      const decodedToken = util.decodeToken(token)
      perfil.idEntidade = decodedToken.userId
    }

    try {
      const pr = await service.readProfPic(perfil)
      res.send(pr)
    } catch (err) {
      next(err)
    }
  }
}

async function update(req, res, next) {
  const token = req.header("Authorization").split(" ")[1]

  const decodedToken = util.decodeToken(token)

  const perfil = {
    idEntidade: decodedToken.userId,
    localidade: req.body.localidade,
    perfilPic: req.body.perfilPic,
    backPic: req.body.backPic,
    sobre: req.body.sobre,
  }

  try {
    const perfilBD = await service.read(perfil)

    if (perfilBD) {
      if (perfil.localidade == "") {
        perfil.localidade = perfilBD.localidade
      }
      if (perfil.perfilPic == "") {
        perfil.perfilPic = perfilBD.perfilPic
      }
      if (perfil.backPic == "") {
        perfil.backPic = perfilBD.backPic
      }
      if (perfil.sobre == "") {
        perfil.sobre = perfilBD.sobre
      }
      const resp = await service.update(perfil)

      if (!resp) {
        res
          .status(200)
          .json({ status: "ok", message: "Atualização bem sucedida." })
      }
    } else {
      res
        .status(404)
        .json({ status: "falhou", message: `A atualização falhou.` })
    }
  } catch (err) {
    next(err)
  }
}

export default {
  //create,
  read,
  readProfPic,
  update,
}
