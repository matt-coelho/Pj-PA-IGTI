"use strict"
import service from "../services/service.meta.js"
import util from "../Utils/Utils.js"

async function create(req, res, next) {
  if (!req.header("Authorization")) {
    res.status(500).json({
      status: "falhou",
      message: "Requisição rejeitada",
    })
  } else {
    const token = req.header("Authorization").split(" ")[1]

    const decodedToken = util.decodeToken(token)

    const meta = {
      idEntidade: decodedToken.userId,
      dataInicio: new Date(),
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      encerrado: false,
      dataFim: req.body.dataFim ? req.body.dataFim : new Date(null),
    }

    try {
      const resp = await service.create(meta)
      if (!resp) {
        res.status(200).json({
          status: "ok",
          message: "Nova meta criada com sucesso.",
        })
      } else {
        res.send(resp)
      }
    } catch (err) {
      next(err)
    }
  }
}

async function read(req, res, next) {
  const meta = { id: req.params.meta }
  try {
    const resp = await service.read(meta)

    if (!resp) {
      res.status(404).json({
        status: "falhou",
        message: "Registro não encontrado.",
      })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

async function reads(req, res, next) {
  try {
    const resp = await service.readAll()
    if (!resp) {
      res.status(200).json({
        status: "ok",
        message: "Nenhum registro foi encontrado.",
      })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

async function populares(req, res, next) {
  try {
    const resp = await service.readPopulares()
    if (!resp) {
      res.status(200).json({
        status: "ok",
        message: "Nenhum registro foi encontrado.",
      })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  if (!req.header("Authorization")) {
    res.status(500).json({
      status: "falhou",
      message: "Requisição rejeitada",
    })
  } else {
    const token = req.header("Authorization").split(" ")[1]

    const decodedToken = util.decodeToken(token)
    const meta = {
      idEntidade: decodedToken.userId,
      id: parseInt(req.params.meta),
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      encerrado: req.body.encerrado,
      dataFim: req.body.dataFim,
    }

    try {
      const metaBD = await service.read(meta)

      if (metaBD) {
        if (meta.titulo == "") {
          meta.titulo = metaBD.titulo
        }
        if (meta.descricao == "") {
          meta.descricao = metaBD.descricao
        }
        if (meta.encerrado == "") {
          meta.encerrado = metaBD.encerrado
        }
        if (meta.dataFim == "") {
          meta.dataFim = metaBD.dataFim
        }
        const resp = await service.update(meta)

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
}

async function updateVezesCopiado(req, res, next) {
  const meta = { id: req.params.meta }

  try {
    const metaBD = await service.read(meta)

    if (metaBD) {
      metaBD.vezescopiado = Number(metaBD.vezescopiado)
      metaBD.vezescopiado = metaBD.vezescopiado + 1

      const resp = await service.updateVezesCopiado(metaBD)

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

async function updateEncerrado(req, res, next) {
  const meta = { id: req.params.meta }

  try {
    const metaBD = await service.read(meta)

    if (metaBD) {
      const resp = await service.updateEncerrado(metaBD)

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

async function remove(req, res, next) {
  const meta = { id: req.params.meta }

  try {
    const resp = await service.read(meta)

    if (!resp) {
      res
        .status(404)
        .json({ status: "falhou", message: `A remoção do cadastro falhou.` })
    } else {
      const remotion = await service.remove(meta)

      if (!remotion) {
        res
          .status(200)
          .json({ status: "ok", message: "Cadastro removido com sucesso." })
      }
    }
  } catch (err) {
    next(err)
  }
}

export default {
  create,
  read,
  reads,
  populares,
  update,
  updateVezesCopiado,
  updateEncerrado,
  remove,
}
