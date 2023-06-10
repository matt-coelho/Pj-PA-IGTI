<template>
  <div class="container-fluid pb-9">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Metas/Alcançadas</th>
          <th scope="col">Nome</th>
          <th scope="col">CGC</th>
          <th scope="col">Membro desde</th>
          <th scope="col">Apoios</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="entidade in entidades" :key="entidade.id">
          <th scope="row">{{ entidade.nmetas }}/{{ entidade.encerrados }}</th>
          <td>{{ entidade.nome }}</td>
          <td>
            <router-link
              class="nav-link link-body-emphasis"
              :to="{ path: '/perfil/' + entidade.cgc }"
            >
              {{ entidade.cgc }}</router-link
            >
          </td>
          <td>{{ new Date(entidade.cadastro).toLocaleDateString("pt-BR") }}</td>
          <td>{{ entidade.tapoios }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "EntidadesList",
  props: { entidades: { type: Object, required: true } },
}
</script>

<style></style>
