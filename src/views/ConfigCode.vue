<template>
  <BaseView title="HVAC Configuration">
    <div class="space-y-8">
      <InfoCard title="Configuration Code Details">
        <p class="font-roboto text-body-large text-on-surface-variant">
          Take thermostat off the wall, press the config button five times to enter the HVAC configuration menu.
        </p>
      </InfoCard>

      <div v-if="thermostat" class="space-y-6">
        <InfoCard>
          <div>
            <h3 class="font-roboto text-body-large text-on-surface mb-1">Heating Type:</h3>
            <p class="font-roboto text-body-large text-on-surface-variant">{{ formatHeatingType }}</p>
          </div>
        </InfoCard>

        <InfoCard>
          <div>
            <h3 class="font-roboto text-body-large text-on-surface mb-1">Cooling Type:</h3>
            <p class="font-roboto text-body-large text-on-surface-variant">{{ formatCoolingType }}</p>
          </div>
        </InfoCard>

        <template v-if="thermostat.systemType === 'Heatpump'">
          <InfoCard>
            <div>
              <h3 class="font-roboto text-body-large text-on-surface mb-1">Emergency Heating:</h3>
              <p class="font-roboto text-body-large text-on-surface-variant">{{ thermostat.hasEmergencyHeat ? 'Yes' : 'None' }}</p>
            </div>
          </InfoCard>

          <InfoCard>
            <div>
              <h3 class="font-roboto text-body-large text-on-surface mb-1">Reversing Valve:</h3>
              <p class="font-roboto text-body-large text-on-surface-variant">{{ thermostat.reversingValveType === 'o_type' ? 'Cool' : 'None' }}</p>
            </div>
          </InfoCard>
        </template>
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant space-y-4">
        <AppButton
          @click="handleRestart"
          variant="secondary"
          full-width
        >
          Start configuration code wizard over
        </AppButton>
        <AppButton
          @click="handleNext"
        >
          Next
        </AppButton>
      </div>
    </div>
  </BaseView>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BaseView from '@/components/base/BaseView.vue'
import AppButton from '@/components/base/AppButton.vue'
import InfoCard from '@/components/base/InfoCard.vue'
import { getThermostatConfigCode } from '@/utils/configCode'

export default {
  name: 'ConfigCode',
  components: {
    BaseView,
    AppButton,
    InfoCard
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const configCode = computed(() => {
      const t = store.getters.currentThermostat
      if (!t) return ''
      const answers = {
        systemType: t.systemType,
        heatingStage: t.heatingType === 'none' ? 'None' : 
                     t.heatingType === '1stage' ? '1-stage' : '2-stage',
        coolingStage: t.coolingType === 'none' ? 'None' : 
                     t.coolingType === '1stage' ? '1-stage' : '2-stage',
        fanSpeed: t.fanControl === 'none' ? 'No' :
                 t.fanControl === '1speed' ? '1-speed' :
                 t.fanControl === '2speed' ? '2-speed' : '3-speed',
        hasEmergencyHeat: t.hasEmergencyHeat === 'yes',
        reversingValve: t.reversingValveType === 'o_type' ? 'Cool' : 'Heat',
        fanControlledByTstat: true
      }

      return getThermostatConfigCode(answers)
    })

    const thermostat = computed(() => store.getters.currentThermostat)

    const formatHeatingType = computed(() => {
      const t = thermostat.value
      if (!t) return ''
      return t.heatingType === 'none' ? 'None' :
             t.heatingType === '1stage' ? 'Single Stage, Oil Gas' :
             'Two-stage, Electric'
    })

    const formatCoolingType = computed(() => {
      const t = thermostat.value
      if (!t) return ''
      return t.coolingType === 'none' ? 'None' :
             t.coolingType === '1stage' ? 'Single Stage' : 'Two-stage'
    })

    const handleNext = () => {
      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          configCode: configCode.value,
          isConfigured: true
        }
      })
      
      router.push(`/installer/${router.currentRoute.value.params.slug}/confirm-working/${router.currentRoute.value.params.thermostatIndex}`)
    }

    const handleRestart = () => {
      router.push(`/installer/${router.currentRoute.value.params.slug}/config/system-type/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      configCode,
      thermostat,
      formatHeatingType,
      formatCoolingType,
      handleNext,
      handleRestart
    }
  }
}
</script>
