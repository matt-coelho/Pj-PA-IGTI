<template>
  <!-- <div v-if="login" class="text-center">
    <SignIn @form-submitted="handleLogin" />
  </div> -->
  <div class="app">
    <MainHeader :user="token" />
    <div v-if="false" id="alertPlaceHolder">
      <AlertMessage msg="mensagem" tipo="status" />
    </div>
    <router-view @form-submitted="handleLogin"></router-view>
    <div v-if="token">
      <NewProjectModal />
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <ItemsGrid /> -->
  </div>
</template>

<script>
import MainHeader from "./components/Header.vue"
import AlertMessage from "./components/Alert.vue"
import NewProjectModal from "./components/NewProjectModal.vue"

export default {
  name: "App",
  components: {
    MainHeader,
    AlertMessage,
    NewProjectModal,
  },
  data() {
    return {
      token: null,
    }
  },
  methods: {
    handleLogin(data) {
      if (data.status === "ok") {
        this.token = data.token
        localStorage.setItem("acess_token", data.token)
        this.$router.push("/")
      }
    },
  },
  created() {
    this.token = localStorage.getItem("acess_token")
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
