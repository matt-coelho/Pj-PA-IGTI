"use strict"
import service from "../services/service.banco.js"

async function read(req, res, next) {
  try {
    const resp = await service.read()
    res.send(resp)
  } catch (err) {
    next(err)
  }
}

export default { read }
