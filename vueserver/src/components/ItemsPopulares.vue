<template>
  <div class="container-fluid pb-3">
    <div class="d-grid gap-3 third">
      <ItemGridCard v-for="meta in data" :key="meta.id" :meta="meta" />
    </div>
  </div>
</template>

<script>
import ItemGridCard from "./ItemGrid-card.vue"
import axios from "axios"

export default {
  name: "ItemsGrid",
  components: {
    ItemGridCard,
  },
  data() {
    return { data: null }
  },
  methods: {
    async getData() {
      try {
        const resp = await axios.get("http://localhost:8091/meta/populares")
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
