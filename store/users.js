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

      if (ctx.isRemember) {
        this.$cookies.set("REMEMBER_ME", true)
        this.$cookies.set("FORM", { email: ctx.email, password: ctx.password })
      } else {
        this.$cookies.remove("REMEMBER_ME")
        this.$cookies.remove("FORM")
      }

      this.$cookies.set("TOKEN", "BearerTokenHere")
      this.$router.push("/")
    } catch (error) {
      Toast(ctx, error)
    }
  },
  async googleLogin({ commit }, ctx) {
    try {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      const { user } = await this.$fireModule.auth().signInWithPopup(provider)
      const usersRef = await this.$fire.firestore.collection("users").doc(user.uid).get()
      const data = { name: user.displayName, photoUrl: user.photoURL, isBanned: false }

      if (usersRef.exists) {
        commit("setAuthId", user.uid)
        commit("setUserProfile", usersRef.data())
        this.$cookies.set("TOKEN", "BearerTokenHere")
        this.$router.push("/")
      } else {
        createUser(this.$fire, this.$cookies, this.$router, { commit, uid: user.uid, data })
      }
    } catch (error) {
      Toast(ctx, error)
    }
  },
  async register({ commit }, ctx) {
    try {
      const { user } = await this.$fire.auth.createUserWithEmailAndPassword(ctx.email, ctx.password)
      const data = { name: ctx.name, photoUrl: null, isBanned: false }

      createUser(this.$fire, this.$cookies, this.$router, { commit, uid: user.uid, data })
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

const createUser = async (fire, cookies, router, { commit, uid, data }) => {
  const usersRef = await fire.firestore.collection("users").doc(uid)

  await usersRef.set(data)
  commit("setAuthId", uid)
  commit("setUserProfile", data)

  cookies.set("TOKEN", "BearerTokenHere")
  router.push("/")
}