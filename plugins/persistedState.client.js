import createPersistedState from "vuex-persistedstate"

export default ({ store }) => {
  let persistedOptions = {}

  if (process.browser) {
    const SecureLS = require("secure-ls")
    const ls = new SecureLS({ isCompression: false })
    persistedOptions.storage = {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key)
    }
  }

  createPersistedState(persistedOptions)(store)
}