"use strict"
import pg from "pg"

export async function connect() {
  if (global.connection) {
    return global.connection.connect()
  }
  const pool = new pg.Pool({
    connectionString: process.env.postgresConnectionString,
  })
  global.connection = pool
  return pool.connect()
}
