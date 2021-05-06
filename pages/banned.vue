<template>
  <div v-if="$store.state.users.userProfile.isBanned">
    <h4>Banned account! <a href="javascript:void(0)" @click="logout">Logout</a></h4>
  </div>
</template>

<script>
export default {
  layout: "blank",
  name: "Banned",
  created() {
    if (!this.$store.state.users.userProfile.isBanned) return this.$router.push("/")
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout", this.$bvToast)
    }
  }
}
</script>