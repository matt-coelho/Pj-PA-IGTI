"use strict"
import util from "../Utils/Utils.js"
import service from "../services/service.entidade.js"
import servicePerfil from "../services/service.perfil.js"

async function create(req, res, next) {
  const data_cadastro = new Date()
  const senha = req.body.senha

  const entidade = {
    cadastro: data_cadastro.toDateString(),
    nome: req.body.nome,
    cgc: req.body.cgc,
    senha: util.hashSenha(senha),
  }

  try {
    const resp = await service.create(entidade)
    if (resp.identidade) {
      const perfil = {
        idEntidade: resp.identidade,
        localidade: "",
        perfilPic: "",
        backPic: "",
        sobre: "",
      }

      const respp = await servicePerfil.create(perfil)
      if (!respp) {
        res.status(200).json({
          status: "ok",
          message: "Perfil criado com sucesso. Faça login para continuar.",
        })
      } else {
        res.send(respp)
      }
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

async function read(req, res, next) {
  const entidade = { id: req.params.entidade }
  try {
    const resp = await service.read(entidade)
    if (!resp) {
      res.status(404).json({
        status: "falhou",
        message: "Registro não foi encontrado.",
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

async function readcgc(req, res, next) {
  const entidade = { cgc: req.params.cgc }
  try {
    const resp = await service.read(entidade)
    if (!resp) {
      res.status(404).json({
        status: "falhou",
        message: "Registro não foi encontrado.",
      })
    } else {
      res.send(resp)
    }
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  const senha = util.hashSenha(req.body.senha)
  const ultimoLogin = new Date()
  const entidade = {
    cgc: req.body.cgc,
    senha: senha,
    ultimoLogin: ultimoLogin,
  }

  try {
    const resp = await service.login(entidade)

    entidade.id = resp.identidade
    if (!resp) {
      res.status(404).json({
        status: "falhou",
        message: "Verifique seu número de cadastro e senha.",
      })
    } else {
      res.status(200).json({
        status: "ok",
        message: "usuário logado",
        token: util.genToken(entidade),
      })
    }
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  const entidade = {
    id: req.params.identidade,
    cgc: req.body.cgc,
    nome: req.body.nome,
    senha: req.body.senha,
  }
  try {
  } catch (err) {
    next(err)
  }

  try {
    const entidadeDB = await service.read(entidade)

    if (entidadeDB) {
      if (entidade.nome == "") {
        //nome
        entidade.nome = entidadeDB.nome
      }

      if (entidade.cgc == "") {
        //cgc
        entidade.cgc = entidadeDB.cgc
      }

      if (entidade.senha == "") {
        //senha
        entidade.senha = entidadeDB.senha
      } else {
        entidade.senha = hashSenha(entidade.senha)
      }

      try {
        const resp = await service.update(entidade)
        if (!resp) {
          res
            .status(200)
            .json({ status: "ok", message: "Atualização bem sucedida." })
        }
      } catch (err) {
        next(err)
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
  const entidade = {
    id: req.params.identidade,
  }
  const entidadeDB = await service.read(entidade)
  if (entidadeDB) {
    try {
      const resp = await service.remove(entidade)
      if (!resp) {
        res
          .status(200)
          .json({ status: "ok", message: "Cadastro removido com sucesso." })
      }
    } catch (err) {
      next(err)
    }
  } else {
    res
      .status(404)
      .json({ status: "falhou", message: `A remoção do cadastro falhou.` })
  }
}

export default { create, read, reads, readcgc, login, update, remove }
