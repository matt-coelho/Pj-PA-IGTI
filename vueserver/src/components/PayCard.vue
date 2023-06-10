<template>
  <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          :src="imagemTipo(pagamento.tipo)"
          class="img-fluid rounded-start"
          alt="..."
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ pagamentoTipo(pagamento.tipo) }}
            <label v-if="token">
              <btnDelete @click="removePagamento()" />
            </label>
          </h5>

          <div
            v-if="pagamento.tipo === 'p' || pagamento.tipo === 'b'"
            class="pix-bit"
          >
            <p class="card-text">
              Copiar endereço
              <btnCopy @click="copyToClipboard()" />
            </p>

            <small class="text-body-secondary">{{ pagamento.endereco }}</small>
            <p class="card-text" v-if="pagamento.nome">
              Nome: {{ pagamento.nome }}
            </p>
          </div>
          <div class="ted-doc-pix" v-else>
            <p class="card-text">
              Banco {{ pagamento.codigo }} : {{ pagamento.banco }}
            </p>
            <p class="card-text">
              Agência: {{ pagamento.agencia }} Conta: {{ pagamento.conta }}
            </p>
            <small class="text-body-secondary"
              >Nome: {{ pagamento.nome }}</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import btnCopy from "./btnCopy.vue"
import btnDelete from "./btnDelete.vue"
import axios from "axios"

export default {
  name: "PayCard",
  props: { pagamento: { type: Object, required: false } },
  components: { btnCopy, btnDelete },
  data() {
    return { token: "" }
  },
  methods: {
    imagemTipo(tipo) {
      if (tipo === "b") {
        const b = "https://i.postimg.cc/MpK9dg8Z/bitcoin.png"
        return b
      } else if (tipo === "p") {
        const p = "https://i.postimg.cc/nz72XJq2/pix.webp"
        return p
      } else {
        const e = "https://i.postimg.cc/FRJW0cXj/bank.jpg"
        return e
      }
    },
    pagamentoTipo(tipo) {
      if (tipo === "b") {
        return "Bitcoin"
      } else if (tipo === "p") {
        return "PIX"
      } else {
        return "TED/DOC/PIX"
      }
    },
    copyToClipboard() {
      const textToCopy = this.pagamento.endereco

      navigator.clipboard.writeText(textToCopy).then(
        () => {},
        () => {
          console.error("Copiar falhou")
        }
      )
    },
    async removePagamento() {
      const dataHeader = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      }
      const path = "http://localhost:8091/meio/" + this.pagamento.idmeio

      const resp = await axios.delete(path, {
        headers: dataHeader,
      })
      if (resp.data.status === "ok") {
        window.location.reload()
      } else {
        console.log(resp)
      }
    },
  },
  created() {
    this.token = localStorage.getItem("acess_token")
  },
}
</script>

<style scoped>
button {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  line-height: normal;
  margin: 0;
  padding: 0;
  text-align: left;
  text-decoration: none;
}
</style>
