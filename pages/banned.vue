<template>
  <div>
    <div v-if="checkBanned">
      <h4>Banned account! <a href="javascript:void(0)" @click="logout">Logout</a></h4>
    </div>
  </div>
</template>

<script>
import bannedMixin from "../mixins/bannedMixin"

export default {
  layout: "blank",
  mixins: [bannedMixin],
  name: "Banned",
  data: () => ({
    checkBanned: false
  }),
  mounted() {
    if (!this.isBanned) return this.$router.push("/")
    this.checkBanned = true
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout", this.$bvToast)
    }
  }
}
</script>