"use strict"
import server from "./server/server.js"

const port = process.env.port

server.listen(port, () => {
  console.log(`API running ${port}`)
})
