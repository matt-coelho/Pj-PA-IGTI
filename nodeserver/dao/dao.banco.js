"use strict"
import { connect } from "../db/db.js"

async function read() {
  const conn = await connect()
  try {
    const sql = "select nome, codigo, idBanco from bancos order by nome"
    const res = await conn.query(sql)
    return res.rows
  } catch (err) {
    throw err
  } finally {
    conn.release()
  }
}

export default { read }
