import repository from "../dao/dao.entidade.js"

async function create(entidade) {
  return await repository.create(entidade)
}

async function readAll() {
  return await repository.readAll()
}

async function read(entidade) {
  return await repository.read(entidade)
}

async function readcgc(entidade) {
  return await repository.readcgc(entidade)
}

async function login(entidade) {
  return await repository.login(entidade)
}

async function update(entidade) {
  return await repository.update(entidade)
}

async function remove(entidade) {
  return await repository.remove(entidade)
}

export default { create, update, login, read, readAll, readcgc, remove }
