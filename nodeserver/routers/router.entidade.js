"use strict"
import express from "express"
import controller from "../controllers/controller.entidade.js"

const router = express.Router()

router.post("/", controller.create)

router.get("/", controller.reads)

router.get("/:entidade", controller.read)

router.get("/cgc/:cgc", controller.readcgc)

router.put("/", controller.login)

router.put("/:identidade", controller.update)

router.delete("/:identidade", controller.remove)

export default router
