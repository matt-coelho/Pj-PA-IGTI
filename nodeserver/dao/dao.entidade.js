"use strict"
import { connect } from "../db/db.js"

async function create(entidade) {
  const conn = await connect()
  try {
    const sql =
      "insert into entidade(nome, cgc, senha, cadastro)values($1, $2, $3, $4) returning idEntidade"
    const values = [
      entidade.nome,
      entidade.cgc,
      entidade.senha,
      entidade.cadastro,
    ]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function read(entidade) {
  const conn = await connect()
  try {
    const sql =
      "select en.idEntidade as id, en.nome, en.cgc, en.cadastro, pf.localidade as localidade, pf.perfilPic as perfilPic, pf.backPic as backpic, pf.sobre as sobre, count(mt.*) as nmetas, coalesce(sum(mt.vezesCopiado)::integer,0) as tapoios, (select count(*) from meta where encerrado = true and identidade = en.identidade)as encerrados from entidade en left join perfil pf on pf.identidade = en.identidade left join meta mt on mt.identidade = en.identidade where en.idEntidade = $1 group by en.identidade, pf.localidade, pf.perfilpic, pf.backpic, pf.sobre"
    const values = [entidade.id]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function readcgc(entidade) {
  const conn = await connect()
  try {
    const sql =
      "select en.idEntidade as id, en.nome, en.cgc, en.cadastro, pf.localidade as localidade, pf.perfilPic as perfilPic, pf.backPic as backpic, pf.sobre as sobre, count(mt.*) as nmetas, coalesce(sum(mt.vezesCopiado)::integer,0) as tapoios, (select count(*) from meta where encerrado = true and identidade = en.identidade)as encerrados from entidade en left join perfil pf on pf.identidade = en.identidade left join meta mt on mt.identidade = en.identidade where en.cgc = $1 group by en.identidade, pf.localidade, pf.perfilpic, pf.backpic, pf.sobre"
    const values = [entidade.cgc]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function readAll() {
  const conn = await connect()
  try {
    const sql =
      "select * from (select en.idEntidade as id, en.nome as nome, en.cgc as cgc, en.cadastro as cadastro, count(mt.*) as nmetas, coalesce(sum(mt.vezesCopiado)::integer,0) as tapoios, (select count(*) from meta where encerrado = true and identidade = en.identidade)as encerrados from entidade en left join meta mt on en.identidade = mt.identidade group by en.identidade) as etn order by etn.tapoios/(case when etn.nmetas = 0 then 1 else etn.nmetas end )::numeric(5,3) desc, etn.nome, etn.cadastro"
    const res = await conn.query(sql)
    return res.rows
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function login(entidade) {
  const conn = await connect()
  try {
    const sql =
      "update entidade set ultimoLogin = $3 where cgc = $1 and senha = $2 returning idEntidade"
    const values = [entidade.cgc, entidade.senha, entidade.ultimoLogin]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function update(entidade) {
  const conn = await connect()
  try {
    const sql =
      "update entidade set nome = $1, cgc = $2, senha = $3 where idEntidade = $4"
    const values = [entidade.nome, entidade.cgc, entidade.senha, entidade.id]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

async function remove(entidade) {
  const conn = await connect()
  try {
    const sql = "delete from entidade where idEntidade = $1"
    const values = [entidade.id]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

export default { create, read, readAll, readcgc, login, update, remove }
