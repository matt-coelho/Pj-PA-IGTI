"use strict"
import express from "express"
import controller from "../controllers/controller.meta.js"

const router = express.Router()

router.post("/", controller.create)

router.get("/", controller.reads)

router.get("/populares", controller.populares)

router.get("/:meta", controller.read)

router.put("/:meta", controller.update)

router.put("/copiado/:meta", controller.updateVezesCopiado)

router.put("/encerrar/:meta", controller.updateEncerrado)

router.delete("/:meta", controller.remove)

export default router
