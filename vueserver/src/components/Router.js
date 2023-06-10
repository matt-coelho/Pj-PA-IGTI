import { createRouter, createWebHistory } from "vue-router"
import ItemsGrid from "./ItemsGrid.vue"
import ItemsPopulares from "./ItemsPopulares.vue"
import EntidadesCadastradas from "./Entidades.vue"
import CadastroEntidades from "./CadastroEntidades.vue"
import SignIn from "./SignIn.vue"
import PerfilEntidade from "./Perfil.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: ItemsGrid,
    },
    {
      path: "/populares",
      name: "populares",
      component: ItemsPopulares,
    },
    {
      path: "/entidades",
      name: "entidades",
      component: EntidadesCadastradas,
    },
    {
      path: "/login",
      name: "login",
      component: SignIn,
    },
    {
      path: "/registrar",
      name: "cadastro",
      component: CadastroEntidades,
    },
    {
      path: "/perfil/:cgc?",
      name: "perfil",
      props: true,
      component: PerfilEntidade,
    },
  ],
})

export default router
