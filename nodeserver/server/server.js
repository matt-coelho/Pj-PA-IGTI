"use strict"
import express from "express"
import rMeta from "../routers/router.meta.js"
import rEntidade from "../routers/router.entidade.js"
import rPerfil from "../routers/router.perfil.js"
import rBanco from "../routers/router.banco.js"
import rMeio from "../routers/router.meio.js"
import cors from "cors"

const srv = express()

srv.use(express.json())
srv.use(cors())

srv.use("/entidade", rEntidade)
srv.use("/meta", rMeta)
srv.use("/perfil", rPerfil)
srv.use("/bancos", rBanco)
srv.use("/meio", rMeio)

srv.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
})

export default srv
