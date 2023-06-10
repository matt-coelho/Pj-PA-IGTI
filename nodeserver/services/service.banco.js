import repository from "../dao/dao.banco.js"

async function read() {
  return await repository.read()
}

export default { read }
