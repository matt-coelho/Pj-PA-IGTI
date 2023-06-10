<template>
  <div>
    <div
      class="modal fade"
      :id="modalId"
      tabindex="-1"
      aria-labelledby="newProjectModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newProjectModalLabel" v-if="!meta">
              Nova Meta
            </h5>
            <h5 class="modal-title" id="newProjectModalLabel" v-if="meta">
              Editar Meta
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="acaoBotao">
              <div class="row">
                <label for="formNovoProjetoLabel">Título</label>
                <input
                  v-model="titulo"
                  type="text"
                  class="form-control"
                  id="formNovoProjetoLabel"
                  placeholder="Título"
                  maxlength="100"
                />
              </div>

              <div class="row">
                <label for="descricaoNovoProjetolabel">Descrição da Meta</label>
                <textarea
                  v-model="descricao"
                  class="form-control"
                  id="descricaoNovoProjetolabel"
                  rows="5"
                  placeholder="Descrição da meta"
                ></textarea>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="col-md-2" v-if="meta">
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        v-model="encerrado"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                        >Encerrado</label
                      >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="datetime">Data de finalização</label>
                    <input
                      type="date"
                      id="datetime"
                      v-model="datafim"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <button v-if="!meta" type="submit" class="btn btn-primary">
                  Criar meta
                </button>
                <button v-else type="submit" class="btn btn-primary">
                  Atualizar meta
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
import moment from "moment"

export default {
  name: "NewProjectModal",
  props: {
    meta: { type: Object, required: false },
  },

  data() {
    return {
      titulo: "",
      descricao: "",
      datafim: "",
      encerrado: false,
      token: "",
    }
  },
  methods: {
    async acaoBotao() {
      if (this.meta) {
        await this.atualizaProjeto()
      } else {
        await this.novoProjeto()
      }
    },
    async novoProjeto() {
      try {
        const dataHeader = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        }
        const resp = await axios.post(
          "http://localhost:8091/meta",
          {
            titulo: this.titulo,
            descricao: this.descricao,
            dataFim: this.datafim,
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
    async atualizaProjeto() {
      try {
        const dataHeader = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        }
        const path = "http://localhost:8091/meta/" + String(this.meta.id)
        const resp = await axios.put(
          path,
          {
            titulo: this.titulo,
            descricao: this.descricao,
            dataFim: this.datafim,
            encerrado: this.encerrado,
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
  mounted() {
    this.titulo = this.meta ? this.meta.titulo : ""
    this.descricao = this.meta ? this.meta.descricao : ""
    this.encerrado = this.meta ? this.meta.encerrado : false
    this.datafim =
      this.meta && this.meta.datafim
        ? moment(this.meta.datafim).format("YYYY-MM-DD")
        : null
  },
  computed: {
    modalId() {
      if (this.meta) {
        return "modal-edit-" + String(this.meta.id)
      } else {
        return "newProjectModal"
      }
    },
  },
  created() {
    this.token = localStorage.getItem("acess_token")
  },
}
</script>

<style strict></style>
