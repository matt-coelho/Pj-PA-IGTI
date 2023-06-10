import repository from "../dao/dao.perfil.js"

async function create(perfil) {
  return await repository.create(perfil)
}

async function read(perfil) {
  return await repository.read(perfil)
}

async function readProfPic(perfil) {
  return await repository.readProfPic(perfil)
}

async function update(perfil) {
  return await repository.update(perfil)
}

export default { create, update, read, readProfPic }
