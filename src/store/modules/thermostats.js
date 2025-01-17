const state = {
  list: [],
  currentIndex: 0
}

const mutations = {
  UPDATE_THERMOSTAT(state, { index, data }) {
    if (!state.list[index]) {
      state.list[index] = {}
    }
    state.list[index] = {
      ...state.list[index],
      ...data
    }
  },
  SET_CURRENT_INDEX(state, index) {
    state.currentIndex = index
  }
}

const actions = {
  updateThermostat({ commit }, payload) {
    commit('UPDATE_THERMOSTAT', payload)
  },
  setCurrentIndex({ commit }, index) {
    commit('SET_CURRENT_INDEX', index)
  }
}

const getters = {
  getCurrentThermostat: state => state.list[state.currentIndex] || {},
  isInstallationComplete: (state, getters, rootState) => {
    const numThermostats = rootState.site.numThermostats
    return state.list.length === numThermostats &&
           state.list.every(t => t.isVerified)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
