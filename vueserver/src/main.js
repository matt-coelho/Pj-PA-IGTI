import { createApp } from "vue"
import router from "./components/Router.js"
import App from "./App.vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App).use(router).mount("#app")
