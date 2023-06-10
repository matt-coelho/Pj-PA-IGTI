"use strict"
import express from "express"
import controller from "../controllers/controller.banco.js"

const router = express.Router()

router.get("/", controller.read)

export default router
