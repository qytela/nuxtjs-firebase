export default ({
  methods: {
    setLoading(loading) {
      this.$nextTick(() => {
        (loading) ? this.$nuxt.$loading.start() : setTimeout(() => this.$nuxt.$loading.finish(), 500);
      })
    }
  }
})