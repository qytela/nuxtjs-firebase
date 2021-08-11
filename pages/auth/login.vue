<template>
  <div>
    <div class="card bg-secondary border-0 mb-0">
      <signin-with />
      <div class="card-body px-lg-5 py-lg-5">
        <div class="text-center text-muted mb-4">
          <small>Or sign in with credentials</small>
        </div>
        <form role="form" @submit.prevent="onSubmit">
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
          <div class="custom-control custom-control-alternative custom-checkbox">
            <input class="custom-control-input" id="customCheckLogin" type="checkbox" v-model="form.isRemember">
            <label class="custom-control-label" for="customCheckLogin">
              <span class="text-muted">Remember me</span>
            </label>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary my-4">Sign in</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <a href="#" class="text-light"><small>Forgot password?</small></a>
      </div>
      <div class="col-6 text-right">
        <nuxt-link to="/auth/register" class="text-light"><small>Create new account</small></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import loadingMixin from "~/mixins/loadingMixin"

export default {
  layout: "auth",
  mixins: [loadingMixin],
  name: "Login",
  data: () => ({
    form: {
      email: null,
      password: null,
      isRemember: false
    }
  }),
  created() {
    const formCookies = this.$cookies.get("FORM") || {}
    this.form.email = formCookies.email
    this.form.password = formCookies.password
    this.form.isRemember = this.$cookies.get("REMEMBER_ME")
  },
  methods: {
    onSubmit() {
      this.setLoading(true)
      this.$store.dispatch("users/login", { ...this.form, ...this.$bvToast })
      this.setLoading(false)
    }
  }
}
</script>