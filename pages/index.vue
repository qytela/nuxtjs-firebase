<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <h3 class="mb-0">Dashboard</h3>
    </div>
    <div class="card-body">
      <form role="form" @submit.prevent="onSubmit">
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="input-name">Name</label>
              <input type="text" id="input-name" class="form-control" placeholder="Change name..." v-model="form.name">
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  name: "Dashboard",
  data() {
    return {
      form: {
        name: null
      }
    }
  },
  mounted() {
    this.$store.commit("page/setPageName", "#")
  },
  methods: {
    onSubmit() {
      this.setLoading(true)
      this.$store.dispatch("users/changeName", { ...this.form, ...this.$bvToast})
      this.setLoading(false)
    },
    setLoading(loading) {
      this.$nextTick(() => {
        (loading) ? this.$nuxt.$loading.start() : setTimeout(() => {
          this.$nuxt.$loading.finish()
        }, 500);
      })
    }
  }
}
</script>