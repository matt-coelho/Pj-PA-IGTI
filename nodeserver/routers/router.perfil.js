"use strict"
import express from "express"
import controller from "../controllers/controller.perfil.js"

const router = express.Router()

//router.post("/", controller.create)

router.get("/", controller.read)

router.get("/profpic", controller.readProfPic)

router.get("/:cgc", controller.read)

router.put("/", controller.update)

export default router
