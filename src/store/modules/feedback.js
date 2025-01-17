const state = {
  rating: 0,
  comments: ''
}

const mutations = {
  SET_FEEDBACK(state, feedback) {
    state.rating = feedback.rating
    state.comments = feedback.comments
  }
}

const actions = {
  setFeedback({ commit }, feedback) {
    commit('SET_FEEDBACK', feedback)
  }
}

const getters = {
  getFeedback: state => state
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
