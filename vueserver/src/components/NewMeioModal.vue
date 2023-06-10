<template>
  <div>
    <div
      class="modal fade"
      id="newMeioModal"
      tabindex="-1"
      aria-labelledby="ariaLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ariaLabel">Novo Meio de Apoio</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="novoMeio">
              <div class="form-group mb-3">
                <label for="formNovoProjetoLabel">Tipo/Banco</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="idbanco"
                >
                  <option
                    placeholder="Banco"
                    v-for="banco in bancos"
                    :key="banco.idbanco"
                    :value="banco.idbanco"
                    :selected="banco.idbanco === 1 ? 'selected' : ''"
                  >
                    Código:{{ banco.codigo }} / {{ banco.nome }}
                  </option>
                </select>
              </div>

              <div class="form-group mb-3">
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nome"
                      aria-label="Nome"
                      v-model="nome"
                      :disabled="tipo === 'b'"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Agência"
                      aria-label="Agência"
                      v-model="agencia"
                      :disabled="idbanco === 1"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Conta"
                      aria-label="Conta"
                      v-model="conta"
                      :disabled="idbanco === 1"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group mb-3">
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      v-model="endereco"
                      :placeholder="tipo === 'b' ? 'Bitcoin' : 'PIX'"
                      aria-label="Endereço: PIX/Bitcoin"
                      :disabled="idbanco > 1"
                    />
                  </div>
                  <div class="col">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radioTipo"
                        id="radioBitcoin"
                        v-model="tipo"
                        value="b"
                        :disabled="idbanco > 1"
                      />
                      <label class="form-check-label" for="radioBitcoin">
                        Bitcoin
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radioTipo"
                        id="radioPIX"
                        checked
                        value="p"
                        v-model="tipo"
                        :disabled="idbanco > 1"
                      />
                      <label class="form-check-label" for="radioPIX">
                        PIX
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary mb-3"
                :disabled="idbanco === 0"
              >
                Adicionar Meio
              </button>
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
  name: "NewProjectModal",
  props: { token: { type: String, required: true } },
  data() {
    return {
      idbanco: 0,
      tipo: "p",
      endereco: "",
      agencia: "",
      conta: "",
      nome: "",
      bancos: [],
    }
  },
  methods: {
    async novoMeio() {
      try {
        const dataHeader = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        }

        const resp = await axios.post(
          "http://localhost:8091/meio",
          {
            idbanco: this.idbanco,
            tipo: this.idbanco === 1 ? this.tipo : "",
            endereco: this.idbanco === 1 ? this.endereco : "", //se id banco == outro armazena endereco pix ou bitcoin
            agencia: this.idbanco > 1 ? this.agencia : "",
            conta: this.idbanco > 1 ? this.conta : "", //se id banco maior que 1 nao é banco outro
            nome: this.tipo != "b" ? this.nome : "", //se nao e bitcoin, armazena nome tbm
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
    async listaBancos() {
      const bancos = await axios.get("http://localhost:8091/bancos")
      if (bancos.data) {
        this.bancos = bancos.data
      }
    },
  },
  mounted() {
    this.listaBancos()
  },
}
</script>

<style strict></style>
