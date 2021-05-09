<template>
  <div>
    <div class="card bg-secondary border-0 mb-0">
      <div class="card-header bg-transparent pb-5">
        <div class="text-muted text-center mt-2 mb-3"><small>Sign up with</small></div>
        <div class="btn-wrapper text-center">
          <a href="#" class="btn btn-neutral btn-icon">
            <span class="btn-inner--icon"><img src="~assets/img/icons/common/github.svg"></span>
            <span class="btn-inner--text">Github</span>
          </a>
          <a href="#" class="btn btn-neutral btn-icon">
            <span class="btn-inner--icon"><img src="~assets/img/icons/common/google.svg"></span>
            <span class="btn-inner--text">Google</span>
          </a>
        </div>
      </div>
      <div class="card-body px-lg-5 py-lg-5">
        <div class="text-center text-muted mb-4">
          <small>Or sign up with credentials</small>
        </div>
        <form role="form" @submit.prevent="onSubmit">
          <div class="form-group mb-3">
            <div class="input-group input-group-merge input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="ni ni-single-02"></i></span>
              </div>
              <input class="form-control" placeholder="Name" type="text" v-model="form.name">
            </div>
          </div>
          <div class="form-group mb-3">
            <div class="input-group input-group-merge input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
              </div>
              <input class="form-control" placeholder="Email" type="email" autocomplete="username" v-model="form.email">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group input-group-merge input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
              </div>
              <input class="form-control" placeholder="Password" type="password" autocomplete="current-password" v-model="form.password">
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary my-4">Sign up</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <nuxt-link to="/auth/login" class="text-light"><small>Have account?</small></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  name: "Register",
  data: () => ({
    form: {
      name: null,
      email: null,
      password: null
    }
  }),
  methods: {
    onSubmit() {
      this.setLoading(true)
      this.$store.dispatch("users/register", { ...this.form, ...this.$bvToast })
      this.setLoading(false)
    },
    setLoading(loading) {
      this.$nextTick(() => {
        (loading) ? this.$nuxt.$loading.start() : setTimeout(() => this.$nuxt.$loading.finish(), 500);
      })
    }
  }
}
</script>