<template>
  <div class="row py-5 px-4">
    <div class="col-md-5 mx-auto">
      <!-- Profile widget -->
      <div class="bg-white shadow rounded overflow-hidden">
        <div
          class="px-4 pt-0 pb-4 cover"
          style="
            background-image: url(https://images.unsplash.com/photo-1530305408560-82d13781b33a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80);
          "
        >
          <div class="media align-items-end profile-head">
            <div class="profile mr-3">
              <img
                :src="profilePic()"
                alt="..."
                width="130"
                class="rounded mb-2 img-thumbnail"
              />
            </div>
            <div class="media-body mb-5 text-white">
              <h4 class="mt-0 mb-0">{{ perfil.nome }}</h4>
            </div>
          </div>
        </div>
        <p class="small mb-4">
          <i class="fas fa-map-marker-alt mr-2">{{ perfil.localidade }}</i>
        </p>
        <a
          v-if="editavel"
          href="#"
          class="btn btn-outline-dark btn-sm btn-block"
          data-bs-toggle="modal"
          data-bs-target="#perfilEditModal"
          >Editar</a
        >
        <a
          v-if="editavel"
          href="#"
          class="btn btn-outline-dark btn-sm btn-block"
          data-bs-toggle="modal"
          data-bs-target="#newMeioModal"
          >Adicionar Meio</a
        >
        <div class="bg-light p-4 d-flex justify-content-end text-center">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">{{ perfil.nmetas }}</h5>
              <!--numero de metas-->
              <small class="text-muted">
                <i class="fas fa-image mr-1"></i>Metas publicadas</small
              >
            </li>
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">
                {{ perfil.tapoios }}
              </h5>
              <!--total de apoios-->
              <small class="text-muted">
                <i class="fas fa-user mr-1"></i>Número de apoios</small
              >
            </li>
            <li class="list-inline-item">
              <h5 class="font-weight-bold mb-0 d-block">
                {{ perfil.encerrados }}
              </h5>
              <!--metas alcancadas-->
              <small class="text-muted">
                <i class="fas fa-user mr-1"></i>Metas alcançadas</small
              >
            </li>
          </ul>
        </div>
        <div class="px-4 py-3">
          <h5 class="mb-0">Sobre</h5>
          <div class="p-4 rounded shadow-sm bg-light">
            <!--area sobre-->
            <p class="font-italic mb-0">{{ perfil.sobre }}</p>
          </div>
        </div>
        <div class="px-4 py-3" v-if="perfil.pagamentos">
          <h5 class="mb-0">Meios de apoio</h5>
          <div class="p-4 rounded shadow-sm bg-light">
            <div v-for="pagamento in perfil.pagamentos" :key="pagamento.idmeio">
              <PayCard :pagamento="pagamento" />
            </div>
          </div>
        </div>
        <div class="py-4 px-4">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="mb-0">Metas - mais recente a mais antiga</h5>
          </div>
          <div class="row">
            <div class="container-fluid">
              <div class="d-grid">
                <div
                  class="d-grid gap-3"
                  style="grid-template-columns: 1fr 1fr 1fr"
                >
                  <ItemsGridCard
                    v-for="meta in perfil.metas"
                    :key="meta.id"
                    :meta="meta"
                    :editavel="editavel"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="editavel">
        <PerfilEditModal :perfil="perfil" />
        <NewMeioModal :token="token" />
      </div>
    </div>
  </div>
</template>
<script>
import ItemsGridCard from "./ItemGrid-card.vue"
import PerfilEditModal from "./PerfilEditModal.vue"
import PayCard from "./PayCard.vue"
import NewMeioModal from "./NewMeioModal.vue"
import axios from "axios"

export default {
  name: "PerfilEntidade",
  props: { cgc: { type: String, required: false } },
  components: { PerfilEditModal, ItemsGridCard, PayCard, NewMeioModal },
  data() {
    return { token: "", perfil: {}, editavel: false }
  },
  methods: {
    profilePic() {
      if (!this.perfil.profileic) {
        return "https://i.postimg.cc/HLXHRHsH/profile.jpg"
      } else {
        return this.perfil.profilePic
      }
    },
    async comCGC() {
      const resp = await axios.get(
        "http://localhost:8091/perfil/" + this.$route.params.cgc
      )
      this.perfil = resp.data
    },
    async own() {
      const dataHeader = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      }
      const resp = await axios.get("http://localhost:8091/perfil", {
        headers: dataHeader,
      })
      this.perfil = resp.data
      this.editavel = true
    },
  },
  mounted() {
    if (this.$route.params.cgc && !this.token) {
      this.comCGC()
    } else if (this.token) {
      this.own()
    } else {
      this.$router.push("/")
    }
  },
  created() {
    this.token = localStorage.getItem("acess_token")
  },
}
</script>
<style scoped>
.profile-head {
  transform: translateY(5rem);
}

.cover {
  background-size: cover;
  background-repeat: no-repeat;
}

body {
  background: #654ea3;
  background: linear-gradient(to right, #e96443, #904e95);
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
