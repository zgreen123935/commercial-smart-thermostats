import { createStore } from 'vuex'
import site from './modules/site'
import installer from './modules/installer'
import thermostats from './modules/thermostats'
import feedback from './modules/feedback'

export default createStore({
  modules: {
    site,
    installer,
    thermostats,
    feedback
  }
})
