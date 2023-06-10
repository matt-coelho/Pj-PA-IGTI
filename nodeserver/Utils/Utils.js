import jwt from "jsonwebtoken"
import crypto, { createHash } from "crypto"
import Config from "./Config.js"

const TSecret = process.env.tSecret

const PSalt = process.env.pSalt

function decodeToken(token) {
  return jwt.verify(token, TSecret)
}

function genToken(entidade) {
  const token = jwt.sign({ userId: entidade.id, cgc: entidade.cgc }, TSecret, {
    expiresIn: process.env.jwtExpiresIn,
  })
  return token
}

function hashSenha(senha) {
  const sRes = crypto
    .createHash("sha256")
    .update(senha)
    .update(createHash("sha256").update(PSalt, "utf8").digest("hex"))
    .digest("hex")

  return sRes
}

export default { decodeToken, genToken, hashSenha }
