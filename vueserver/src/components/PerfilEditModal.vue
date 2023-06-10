<template>
  <div>
    <div
      class="modal fade"
      id="perfilEditModal"
      tabindex="-1"
      aria-labelledby="perfilEditModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="perfilEditModalLabel">
              Editando perfil
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editPerfil">
              <div class="mb-3">
                <label class="form-label" for="formLocalidadeLabel"
                  >Localidade:</label
                >
                <input
                  v-model="localidade"
                  type="text"
                  class="form-control"
                  id="formLocalidadeLabel"
                  placeholder="Localidade"
                  maxlength="100"
                />
              </div>

              <div class="input-group mb-3">
                <input
                  type="file"
                  @change="handleProfileUpload"
                  class="form-control"
                  id="formProfile"
                />
                <label class="input-group-text" for="formProfile"
                  >Imagem Perfil</label
                >
              </div>
              <div class="input-group mb-3">
                <input
                  type="file"
                  @change="handleBackUpload"
                  class="form-control"
                  id="formFundo"
                />
                <label class="input-group-text" for="formFundo"
                  >Imagem Fundo
                </label>
              </div>

              <div class="mb-3">
                <label for="formSobreLabel" class="form-label">Sobre:</label>
                <textarea
                  v-model="sobre"
                  class="form-control"
                  id="formSobreLabel"
                  rows="5"
                  placeholder="Sobre"
                ></textarea>
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-secondary">
                  Atualizar
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "PerfilEditModal",
  props: { perfil: { type: Object, required: true } },
  data() {
    return {
      localidade: "",
      perfilPic: "",
      backPic: "",
      sobre: "",
      token: "",
      perfilPicUrl: "",
      backPicUrl: "",
    }
  },
  methods: {
    handleProfileUpload() {
      this.perfilPic = event.target.files[0]
    },
    handleBackUpload() {
      this.backPic = event.target.files[0]
    },
    async uploadImageBack() {
      let formData = new FormData()
      formData.append("file", this.backPic)
      formData.append("name", this.backPic.name)
      try {
        const resp = await axios.post(
          "https://postimages.org/api/upload",
          formData
        )
        console.log(resp)
        this.backPicUrl = resp.data.data.url
      } catch (err) {
        console.error(err)
      }
    },
    async uploadImageProf() {
      let formData = new FormData()
      formData.append("file", this.perfilPic)
      formData.append("name", this.perfilPic.name)
      try {
        const resp = await axios.post(
          "https://postimages.org/api/upload",
          formData
        )
        console.log(resp)
        this.perfilPicUrl = resp.data.data.url
      } catch (err) {
        console.error(err)
      }
    },
    async editPerfil() {
      try {
        //await this.uploadImageProf()
        //await this.uploadImageBack()
        const dataHeader = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        }
        const resp = await axios.put(
          "http://localhost:8091/perfil",
          {
            localidade: this.localidade,
            sobre: this.sobre,
            perfilPic: this.perfilPicUrl,
            backPic: this.backPicUrl,
          },
          { headers: dataHeader }
        )
        if (resp.data.status === "ok") {
          window.location.reload()
        } else {
          console.error(resp.data.message)
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
  created() {
    this.token = localStorage.getItem("acess_token")
  },
  mounted() {
    this.perfilPic = this.perfil.perfilPicUrl
    this.backPic = this.perfil.backPicUrl
    this.sobre = this.perfil.sobre
    this.localidade = this.perfil.localidade
  },
}
</script>

<style strict></style>
