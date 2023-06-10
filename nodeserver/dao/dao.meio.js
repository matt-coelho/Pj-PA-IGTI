"use strict"
import { connect } from "../db/db.js"

async function create(meio) {
  const conn = await connect()
  try {
    //default encerrado = false, vezesCopiado = 0
    const sql =
      "insert into meios(idbanco, idEntidade, tipo, endereco, agencia, conta, nome)values($1, $2, $3, $4, $5, $6, $7)"
    const values = [
      meio.idbanco,
      meio.idEntidade,
      meio.tipo,
      meio.endereco,
      meio.agencia,
      meio.conta,
      meio.nome,
    ]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function read(perfil) {
  const conn = await connect()
  try {
    const sql =
      "select m.idmeios as idmeio, m.idbanco, m.tipo, m.endereco, m.agencia, m.conta, m.nome, b.nome as banco, b.codigo as codigo from meios m inner join entidade e on m.identidade = e.identidade inner join bancos b on b.idbanco = m.idbanco where m.idEntidade = $1 or e.cgc = $2"
    const values = [perfil.idEntidade, perfil.cgc]
    const res = await conn.query(sql, values)

    return res.rows
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function remove(meio) {
  const conn = await connect()
  try {
    const sql = "delete from meios where idmeios = $1 and idEntidade = $2"
    const values = [meio.idmeio, meio.idEntidade]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

export default { create, read, remove }
