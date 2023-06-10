<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link class="nav-link link-secondary" to="/"
              >Mais recentes</router-link
            >
          </li>
          <li>
            <router-link class="nav-link link-body-emphasis" to="/populares"
              >Populares</router-link
            >
          </li>
          <li>
            <router-link class="nav-link link-body-emphasis" to="/entidades"
              >Entidades</router-link
            >
          </li>
        </ul>

        <div v-if="user">
          <div class="dropdown text-end">
            <a
              href="#"
              class="d-block link-dark text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="profilepic"
                alt="mdo"
                width="32"
                height="32"
                class="rounded-circle"
              />
            </a>
            <ul class="dropdown-menu text-small">
              <li>
                <a
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#newProjectModal"
                  href="#"
                  >Nova Meta</a
                >
              </li>
              <li>
                <router-link class="nav-link link-body-emphasis" to="/perfil"
                  ><a class="dropdown-item" href="#">Perfil</a></router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#" @click="logout">Sair</a>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div class="col-md-3 text-end">
            <router-link class="nav-link link-body-emphasis" to="/login"
              ><button type="button" class="btn btn-outline-primary me-2">
                Entrar
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios"

export default {
  name: "MainHeader",
  props: { user: { type: String, required: false } },
  data() {
    return { profilepic: "" }
  },
  methods: {
    logout() {
      localStorage.removeItem("acess_token")
      window.location.reload()
    },
    async imagemPerfil() {
      try {
        const dataHeader = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user,
        }
        const resp = await axios.get("http://localhost:8091/perfil/profpic", {
          headers: dataHeader,
        })
        const url = resp.data.perfilpic

        if (!url) {
          this.profilepic = "https://i.postimg.cc/HLXHRHsH/profile.jpg"
        } else {
          this.profilepic = url.data.perfilpic
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
  mounted() {
    if (this.user) {
      this.imagemPerfil()
    }
  },
}
</script>
