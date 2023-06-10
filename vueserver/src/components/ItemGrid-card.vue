<template>
  <div class="col">
    <div class="card shadow-sm">
      <div class="">
        <!-- meta.backpic -->
        <img
          src="../assets/doe.jpg"
          class="card-img"
          alt="Image"
          @load="setImageSize"
        />
        <div class="card-img-overlay d-flex align-items-center">
          <h5 class="card-title text-dark mx-auto">{{ meta.titulo }}</h5>
          <small
            class="text-body-secondary"
            v-if="editavel && meta.encerrado === true"
            >[Encerrado]</small
          >
        </div>
      </div>
      <div class="card-body">
        <p class="card-text" v-if="!editavel">
          {{ meta.descricao.slice(0, 120) }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              data-bs-toggle="modal"
              :data-bs-target="cardId"
            >
              Ver
            </button>
            <button
              v-if="editavel"
              type="button"
              class="btn btn-sm btn-outline-secondary"
              data-bs-toggle="modal"
              :data-bs-target="cardIdEdit"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
    <NewProjectModal :meta="meta" v-if="editavel" />
    <ItemGridCardModal :meta="meta" />
  </div>
</template>

<script>
import ItemGridCardModal from "./ItemGrid-card-modal.vue"
import NewProjectModal from "./NewProjectModal.vue"
export default {
  name: "ItemsGrid-card",
  props: {
    meta: { type: Object, required: true },
    editavel: { type: Boolean, required: false, default: false },
  },
  components: {
    ItemGridCardModal,
    NewProjectModal,
  },
  methods: {
    setImageSize() {
      const img = this.$refs.image
      if (img) {
        this.imageWidth = this.$refs.image.width
        this.imageHeight = this.$refs.image.height
      }
    },
  },
  computed: {
    cardId() {
      return "#modal-" + String(this.meta.id)
    },
    cardIdEdit() {
      return "#modal-edit-" + String(this.meta.id)
    },
  },
}
</script>

<style strict>
.vezesCopiado {
  font-size: 12px;
}
</style>
