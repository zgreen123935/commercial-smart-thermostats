import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import App from './App.vue'
import './assets/tailwind.css'

// Import base components
import AppButton from './components/base/AppButton.vue'
import AppDialog from './components/base/AppDialog.vue'
import AppHeader from './components/base/AppHeader.vue'
import BaseView from './components/base/BaseView.vue'
import AppCard from './components/base/AppCard.vue'

// Import route components
import SiteDetails from './views/SiteDetails.vue'
import InstallerInfo from './views/InstallerInfo.vue'
import ThermostatPhotos from './views/ThermostatPhotos.vue'
import WiringCheck from './views/WiringCheck.vue'
import InstallThermostat from './views/InstallThermostat.vue'
import ConfigCode from './views/ConfigCode.vue'
import ConfirmWorking from './views/ConfirmWorking.vue'
import Feedback from './views/Feedback.vue'
import Complete from './views/Complete.vue'

// Import config screens
import SystemType from './views/config/SystemType.vue'
import HeatingType from './views/config/HeatingType.vue'
import CoolingType from './views/config/CoolingType.vue'
import FanControl from './views/config/FanControl.vue'
import EmergencyHeat from './views/config/EmergencyHeat.vue'
import ReversingValve from './views/config/ReversingValve.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/installer/demo/site-details'
    },
    {
      path: '/installer/:slug/site-details',
      name: 'SiteDetails',
      component: SiteDetails
    },
    {
      path: '/installer/:slug/installer-info',
      name: 'InstallerInfo',
      component: InstallerInfo
    },
    {
      path: '/installer/:slug/thermostat-photos/:thermostatIndex',
      name: 'ThermostatPhotos',
      component: ThermostatPhotos
    },
    {
      path: '/installer/:slug/wiring-check/:thermostatIndex',
      name: 'WiringCheck',
      component: WiringCheck
    },
    {
      path: '/installer/:slug/install-thermostat/:thermostatIndex',
      name: 'InstallThermostat',
      component: InstallThermostat
    },
    // Configuration flow
    {
      path: '/installer/:slug/config/system-type/:thermostatIndex',
      name: 'SystemType',
      component: SystemType
    },
    {
      path: '/installer/:slug/config/heating-type/:thermostatIndex',
      name: 'HeatingType',
      component: HeatingType
    },
    {
      path: '/installer/:slug/config/cooling-type/:thermostatIndex',
      name: 'CoolingType',
      component: CoolingType
    },
    {
      path: '/installer/:slug/config/fan-control/:thermostatIndex',
      name: 'FanControl',
      component: FanControl
    },
    {
      path: '/installer/:slug/config/emergency-heat/:thermostatIndex',
      name: 'EmergencyHeat',
      component: EmergencyHeat
    },
    {
      path: '/installer/:slug/config/reversing-valve/:thermostatIndex',
      name: 'ReversingValve',
      component: ReversingValve
    },
    {
      path: '/installer/:slug/config-code/:thermostatIndex',
      name: 'ConfigCode',
      component: ConfigCode
    },
    {
      path: '/installer/:slug/confirm-working/:thermostatIndex',
      name: 'ConfirmWorking',
      component: ConfirmWorking
    },
    {
      path: '/installer/:slug/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/installer/:slug/complete',
      name: 'Complete',
      component: Complete
    }
  ]
})

const store = createStore({
  state() {
    return {
      siteDetails: {
        siteName: '',
        address: '',
        numThermostats: 1
      },
      installerInfo: {
        name: '',
        phone: ''
      },
      thermostats: [],
      currentThermostatIndex: 0,
      feedback: {
        rating: 0,
        comments: ''
      }
    }
  },
  mutations: {
    setSiteDetails(state, details) {
      state.siteDetails = details
    },
    setInstallerInfo(state, info) {
      state.installerInfo = info
    },
    updateThermostat(state, { index, data }) {
      if (!state.thermostats[index]) {
        state.thermostats[index] = {}
      }
      state.thermostats[index] = {
        ...state.thermostats[index],
        ...data
      }
    },
    setCurrentThermostatIndex(state, index) {
      state.currentThermostatIndex = index
    },
    setFeedback(state, feedback) {
      state.feedback = feedback
    }
  },
  getters: {
    currentThermostat: (state) => {
      return state.thermostats[state.currentThermostatIndex] || {}
    },
    isInstallationComplete: (state) => {
      return state.thermostats.length === state.siteDetails.numThermostats &&
             state.thermostats.every(t => t.isVerified)
    }
  }
})

const app = createApp(App)

// Register global components
app.component('AppButton', AppButton)
app.component('AppDialog', AppDialog)
app.component('AppHeader', AppHeader)
app.component('BaseView', BaseView)
app.component('AppCard', AppCard)

app.use(router)
app.use(store)
app.mount('#app')
