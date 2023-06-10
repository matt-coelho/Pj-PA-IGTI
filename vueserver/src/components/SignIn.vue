<template>
  <div class="text-center the-body">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="login">
        <img
          class="mb-4"
          src="../assets/logo.png"
          alt=""
          width="72"
          height="57"
        />
        <h1 class="h3 mb-3 fw-normal">Acessar</h1>

        <div class="form-floating">
          <input
            v-model="registro"
            type="number"
            class="form-control"
            id="floatingInput"
            placeholder="000000000000"
            maxlength="12"
          />
          <label for="floatingInput">Registro</label>
        </div>
        <div class="form-floating">
          <input
            v-model="senha"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            maxlength="64"
          />
          <label for="floatingPassword">Senha</label>
        </div>

        <div class="buttons">
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Entrar
          </button>
        </div>
        <div class="buttons">
          <router-link to="/registrar">
            <button class="w-100 btn btn-lg btn-outline-secondary">
              Registrar entidade
            </button>
          </router-link>
        </div>
        <p class="mt-5 mb-3 text-muted">© 2017–2022</p>
      </form>
    </main>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "SignIn",
  //emits: ["form-submitted"],
  emits: {
    "form-submitted": function (data) {
      if (data) {
        return data
      } else {
        console.error("no data")
        return null
      }
    },
  },
  data() {
    return {
      registro: "",
      senha: "",
    }
  },
  methods: {
    async login() {
      if (this.registro && this.senha) {
        try {
          const response = await axios.put("http://localhost:8091/entidade", {
            cgc: this.registro,
            senha: this.senha,
          })

          this.$emit("form-submitted", response.data)
        } catch (err) {
          console.error(err)
        }
      }
    },
  },
}
</script>

<style scoped>
.buttons {
  margin-top: 5px;
  margin-bottom: 5px;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: none;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.the-body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
