<template>
  <div class="container-fluid pb-3">
    <div class="d-grid gap-3 third">
      <ItemGridCard
        v-for="meta in data"
        :key="meta.id"
        :meta="meta"
        :editavel="editavel"
      />
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
  props: { editavel: { type: Boolean, required: false, default: false } },
  data() {
    return { data: null }
  },
  methods: {
    async getData() {
      try {
        const resp = await axios.get("http://localhost:8091/meta")
        this.data = resp.data
      } catch (error) {
        console.error(error)
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
