export default (namespace, endpoint) => ({
  data: () => ({
    [`${namespace}IsLoading`]: false,
    [`${namespace}Data`]: null
  }),
  methods: {
    [`${namespace}Read`]() {
      return new Promise((resolve, reject) => {
        this[`${namespace}IsLoading`] = true
        this.$axios
          .get(endpoint)
          .then(response => {
            const data = response.data
            if (Object.values(data).length > 0) {
              this[`${namespace}Data`] = data
              resolve(data)
            }
          })
          .catch(error => console.error(error))
          .finally(() => this[`${namespace}IsLoading`] = false)
      })
    },
    [`${namespace}Show`](id) {
      return new Promise((resolve, reject) => {
        this[`${namespace}IsLoading`] = true
        this.$axios
          .get(`${endpoint}/${id}`)
          .then(response => {
            const data = response.data
            if (Object.values(data).length > 0) {
              this[`${namespace}Data`] = data
              resolve(data)
            }
          })
          .catch(error => console.error(error))
          .finally(() => this[`${namespace}IsLoading`] = false)
      })
    }
  }
})