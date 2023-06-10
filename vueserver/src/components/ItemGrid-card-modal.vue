<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ meta.titulo }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ meta.descricao }}
        </div>
        <div class="modal-body">
          Criador:
          <router-link
            class="nav-link link-body-emphasis"
            data-bs-dismiss="modal"
            @click="closeModal"
            :to="{ path: '/perfil/' + meta.cgc }"
          >
            {{ meta.cgc }}
          </router-link>
        </div>
        <div class="modal-footer">
          <small
            >Criação:
            {{ new Date(meta.datainicio).toLocaleDateString("pt-BR") }},
            possíveis apoios: {{ meta.vezescopiado }}</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemGrid-card-modal",
  props: { meta: { type: Object, required: true } },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$router.push({ path: "/perfil/" + this.meta.cgc })
    },
  },
  computed: {
    modalId() {
      return "modal-" + String(this.meta.id)
    },
  },
}
</script>

<style scoped></style>
