import repository from "../dao/dao.meio.js"

async function create(meio) {
  return await repository.create(meio)
}

async function read(perfil) {
  return await repository.read(perfil)
}

async function remove(meio) {
  return await repository.remove(meio)
}

export default { create, read, remove }
