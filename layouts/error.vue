<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <h3 class="mb-0">Oooppppssss....</h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div v-if="error.statusCode === 404">Page not found</div>
        <div v-else>An error occurred</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  mounted() {
    this.$store.commit("page/setPageName", this.error.statusCode)
  }
}
</script>