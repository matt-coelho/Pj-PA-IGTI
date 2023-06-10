"use strict"
import express from "express"
import controller from "../controllers/controller.meio.js"

const router = express.Router()

router.post("/", controller.create)

router.delete("/:meio", controller.remove)

export default router
