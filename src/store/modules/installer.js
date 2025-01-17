const state = {
  name: '',
  phone: ''
}

const mutations = {
  SET_INSTALLER_INFO(state, info) {
    state.name = info.name
    state.phone = info.phone
  }
}

const actions = {
  setInstallerInfo({ commit }, info) {
    commit('SET_INSTALLER_INFO', info)
  }
}

const getters = {
  getInstallerInfo: state => state
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
