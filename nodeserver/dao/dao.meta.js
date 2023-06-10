"use strict"
import { connect } from "../db/db.js"

async function create(meta) {
  const conn = await connect()
  try {
    //default encerrado = false, vezesCopiado = 0
    const sql =
      "insert into meta(idEntidade, titulo, descricao, dataInicio, dataFim, encerrado)values($1, $2, $3, $4, $5, $6)"
    const values = [
      meta.idEntidade,
      meta.titulo,
      meta.descricao,
      meta.dataInicio,
      meta.dataFim,
      meta.encerrado,
    ]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function read(meta) {
  const conn = await connect()
  try {
    const sql =
      "select idMeta as id, titulo, descricao, vezesCopiado, encerrado, dataInicio, dataFim from meta where idMeta = $1"
    const values = [meta.id]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

const sqlReadMany =
  "select mt.idMeta as id, mt.titulo as titulo, mt.descricao as descricao, mt.vezesCopiado as vezesCopiado, mt.encerrado as encerrado, mt.dataFim as dataFim, mt.dataInicio as dataInicio, pf.backpic as backpic, et.cgc as cgc from meta mt left join perfil pf on pf.identidade = mt.identidade left join entidade et on et.identidade = mt.identidade "

async function readAll() {
  const conn = await connect()
  try {
    const sql =
      sqlReadMany +
      "where mt.encerrado = false group by mt.idMeta, mt.titulo, mt.descricao, mt.vezescopiado, mt.encerrado, mt.datafim, mt.datainicio, pf.backpic, et.cgc order by mt.dataInicio desc"
    const res = await conn.query(sql)
    return res.rows
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function readEntidade(entidade) {
  const conn = await connect()
  try {
    const sql =
      sqlReadMany +
      "where (et.idEntidade = $1 or et.cgc = $2) group by mt.idMeta, mt.titulo, mt.descricao, mt.vezescopiado, mt.encerrado, mt.datafim, mt.datainicio, pf.backpic, et.cgc order by mt.datainicio desc"
    const values = [entidade.idEntidade, entidade.cgc]
    const res = await conn.query(sql, values)

    return res.rows
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function readPopular() {
  const conn = await connect()
  try {
    const sql =
      sqlReadMany +
      "where mt.encerrado = false order by vezesCopiado desc limit 10"
    const res = await conn.query(sql)
    return res.rows
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function update(meta) {
  const conn = await connect()
  try {
    const sql =
      "update meta set titulo = $1, descricao = $2, dataFim = $3, encerrado = $4 where idMeta = $5 and idEntidade = $6"
    const values = [
      meta.titulo, //1
      meta.descricao,
      meta.dataFim, //3
      meta.encerrado,
      meta.id, //5
      meta.idEntidade,
    ]
    const res = await conn.query(sql, values)

    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function updateVezesCopiado(meta) {
  const conn = await connect()
  try {
    const sql = "update meta set vezescopiado = $2 where idMeta = $1"
    const values = [meta.id, meta.vezescopiado]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function updateEncerrado(meta) {
  const conn = await connect()
  try {
    const sql =
      "update meta set encerrado = true, dataFim = now() where idMeta = $1"
    const values = [meta.id]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function remove(meta) {
  const conn = await connect()
  try {
    const sql = "delete from meta where idMeta = $1"
    const values = [meta.id]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

export default {
  create,
  read,
  readAll,
  readPopular,
  readEntidade,
  update,
  updateEncerrado,
  updateVezesCopiado,
  remove,
}
