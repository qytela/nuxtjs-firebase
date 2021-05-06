import vuexPersisted from "~/plugins/persistedState.client.js"
import Toast from "~/components/Toast"

export const plugins = [vuexPersisted]

export const state = () => ({
  authId: null,
  userProfile: {
    isBanned: false
  }
})

export const actions = {
  async login({ commit }, ctx) {
    try {
      const { user } = await this.$fire.auth.signInWithEmailAndPassword(ctx.email, ctx.password)
      const usersRef = await this.$fire.firestore.collection("users").doc(user.uid).get()

      commit("setAuthId", user.uid)
      commit("setUserProfile", usersRef.data())

      this.$cookies.set("TOKEN", "BearerTokenHere")
      this.$router.push("/")
    } catch (error) {
      Toast(ctx, error)
    }
  },
  async register({ commit }, ctx) {
    try {
      const { user } = await this.$fire.auth.createUserWithEmailAndPassword(ctx.email, ctx.password)
      const usersRef = await this.$fire.firestore.collection("users").doc(user.uid)
      const data = { name: ctx.name, isBanned: false }
      
      await usersRef.set(data)
      commit("setAuthId", user.uid)
      commit("setUserProfile", data)

      this.$cookies.set("TOKEN", "BearerTokenHere")
      this.$router.push("/")
    } catch (error) {
      Toast(ctx, error)
    }
  },
  async changeName({ state, commit }, ctx) {
    try {
      const usersRef = await this.$fire.firestore.collection("users").doc(state.authId)
      const data = { ...state.userProfile, name: ctx.name }

      await usersRef.update(data)
      commit("setUserProfile", data)

      Toast(ctx, { code: "Success", message: "Success to change name" }, "success")
    } catch (error) {
      Toast(ctx, error)
    }
  },
  async logout({ commit }, ctx) {
    try {
      await this.$fire.auth.signOut()
      commit("setAuthId", null)
      commit("setUserProfile", {})

      this.$cookies.remove("TOKEN")
      this.$router.push("/auth/login")
    } catch (error) {
      Toast(ctx, error)
    }
  }
}

export const mutations = {
  setAuthId(state, uid) {
    state.authId = uid
  },
  setUserProfile(state, payload) {
    state.userProfile = payload
  }
}