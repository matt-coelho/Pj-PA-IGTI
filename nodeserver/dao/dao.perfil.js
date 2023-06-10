"use strict"
import { connect } from "../db/db.js"

async function create(perfil) {
  const conn = await connect()
  try {
    const sql =
      "insert into perfil(idEntidade, localidade, perfilPic, backPic, sobre)values($1, $2, $3, $4, $5)"
    const values = [
      perfil.idEntidade,
      perfil.localidade,
      perfil.perfilPic,
      perfil.backPic,
      perfil.sobre,
    ]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function readProfPic(perfil) {
  const conn = await connect()
  try {
    const sql = "select perfilpic from perfil where identidade = $1"
    const values = [perfil.idEntidade]
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
      "select en.identidade as identidade, en.nome as nome, en.ultimoLogin as ultimoLogin, pf.localidade as localidade, pf.perfilPic as perfilPic, pf.backPic as backPic, pf.sobre as sobre, count(mt.*) as nmetas, coalesce(sum(mt.vezesCopiado)::integer,0) as tapoios, (select count(*) from meta where encerrado = true and identidade = en.identidade)as encerrados from Perfil pf left join Entidade en on en.idEntidade = pf.idEntidade left join meta mt on en.identidade = mt.identidade where en.idEntidade = $1 or en.cgc = $2 group by en.identidade, en.nome, en.ultimologin, pf.localidade, pf.perfilpic, pf.backpic, pf.sobre"
    const values = [perfil.idEntidade, perfil.cgc]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function update(perfil) {
  const conn = await connect()
  try {
    const sql =
      "update perfil set localidade = $1, perfilPic = $2, backPic = $3, sobre = $4 where idEntidade = $5"
    const values = [
      perfil.localidade,
      perfil.perfilPic,
      perfil.backPic,
      perfil.sobre,
      perfil.idEntidade,
    ]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

export default { create, read, readProfPic, update }
