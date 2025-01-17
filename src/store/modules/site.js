const state = {
  siteName: '',
  address: '',
  numThermostats: 1
}

const mutations = {
  SET_SITE_DETAILS(state, details) {
    state.siteName = details.siteName
    state.address = details.address
    state.numThermostats = details.numThermostats
  }
}

const actions = {
  setSiteDetails({ commit }, details) {
    commit('SET_SITE_DETAILS', details)
  }
}

const getters = {
  getSiteDetails: state => state
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
