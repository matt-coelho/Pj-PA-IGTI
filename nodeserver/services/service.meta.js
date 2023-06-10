import repository from "../dao/dao.meta.js"

async function create(meta) {
  return await repository.create(meta)
}

async function readAll() {
  return await repository.readAll()
}

async function readPopulares() {
  return await repository.readPopular()
}

async function readEntidade(entidade) {
  return await repository.readEntidade(entidade)
}

async function read(meta) {
  return await repository.read(meta)
}

async function update(meta) {
  return await repository.update(meta)
}

async function updateVezesCopiado(meta) {
  return await repository.updateVezesCopiado(meta)
}

async function updateEncerrado(meta) {
  return await repository.updateEncerrado(meta)
}

async function remove(meta) {
  return await repository.remove(meta)
}

export default {
  create,
  read,
  readAll,
  readPopulares,
  readEntidade,
  update,
  updateVezesCopiado,
  updateEncerrado,
  remove,
}
