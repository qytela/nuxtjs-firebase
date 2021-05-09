export default ({
  data: () => ({
    isBanned: false
  }),
  mounted() {
    this.isBanned = this.$store.state.users.userProfile.isBanned
  }
})