<template>
  <div class="container-fluid pb-3">
    <div v-if="this.data">
      <EntidadesList :entidades="this.data" />
    </div>
  </div>
</template>

<script>
import EntidadesList from "./EntidadesList.vue"
import axios from "axios"

export default {
  name: "EntidadesCadastradas",
  components: {
    EntidadesList,
  },
  data() {
    return { data: null }
  },
  methods: {
    async getData() {
      try {
        const resp = await axios.get("http://localhost:8091/entidade")
        this.data = resp.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style>
.third {
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
