export const state = () => ({
  pageName: ""
})

export const mutations = {
  setPageName(state, name) {
    state.pageName = name
  }
}