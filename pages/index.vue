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
      <div class="mt-3">
        <div>
          Posts Data
          <code>{{ postsData }}</code>
          <b-spinner variant="primary" type="grow" label="Spinning" v-if="postsIsLoading"></b-spinner>
        </div>
        <hr />
        <div>
          Users Data
          <code>{{ usersData }}</code>
          <b-spinner variant="primary" type="grow" label="Spinning" v-if="usersIsLoading"></b-spinner>
        </div>
        <hr />
        <div>
          Gql Data
          <code>{{ users }}</code>
          <b-spinner variant="primary" type="grow" label="Spinning" v-if="$apollo.queries.users.loading"></b-spinner>
        </div>
        <hr />
        <div>
          Gql Data One
          <code>{{ user }}</code>
          <b-spinner variant="primary" type="grow" label="Spinning" v-if="$apollo.queries.user.loading"></b-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosMixin from "../mixins/axiosMixin"
import { getUser, getUsers } from "../gql/users"

export default {
  middleware: "authenticated",
  mixins: [
    axiosMixin("posts", "https://jsonplaceholder.typicode.com/posts"),
    axiosMixin("users", "https://jsonplaceholder.typicode.com/posts")
  ],
  name: "Dashboard",
  data: () => ({
    form: {
      name: null
    }
  }),
  created() {
    this.postsShow(1)
  },
  mounted() {
    this.$store.commit("page/setPageName", "#")
    this.$apollo.queries.user.skip = false
  },
  apollo: {
    users: getUsers(`id, username`, 5),
    user: getUser(`id, username`, 1)
  },
  methods: {
    onSubmit() {
      this.setLoading(true)
      this.$store.dispatch("users/changeName", { ...this.form, ...this.$bvToast})
      this.setLoading(false)

      console.time()
      this.usersShow(10)
        .then(response => {
          console.log("Users Show", response)
          console.timeEnd()
        })

      this.$apollo.queries.users.skip = false
      this.$apollo.queries.user.refetch({ id: 10 })
    },
    setLoading(loading) {
      this.$nextTick(() => {
        (loading) ? this.$nuxt.$loading.start() : setTimeout(() => this.$nuxt.$loading.finish(), 500);
      })
    }
  }
}
</script>