import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  const navigateToNext = (currentPath, params) => {
    const routes = {
      'site-details': '/installer/:slug/installer-info',
      'installer-info': '/installer/:slug/thermostat-photos/0',
      'thermostat-photos': '/installer/:slug/wiring-check/:thermostatIndex',
      'wiring-check': '/installer/:slug/install-thermostat/:thermostatIndex',
      'install-thermostat': '/installer/:slug/config/system-type/:thermostatIndex',
      'system-type': '/installer/:slug/config/heating-type/:thermostatIndex',
      'heating-type': '/installer/:slug/config/cooling-type/:thermostatIndex',
      'cooling-type': '/installer/:slug/config/fan-control/:thermostatIndex',
      'fan-control': '/installer/:slug/config/emergency-heat/:thermostatIndex',
      'emergency-heat': '/installer/:slug/config/reversing-valve/:thermostatIndex',
      'reversing-valve': '/installer/:slug/config-code/:thermostatIndex',
      'config-code': '/installer/:slug/confirm-working/:thermostatIndex',
      'confirm-working': '/installer/:slug/feedback',
      'feedback': '/installer/:slug/complete'
    }

    const nextPath = routes[currentPath]
    if (!nextPath) return

    const path = Object.entries(params).reduce(
      (path, [key, value]) => path.replace(`:${key}`, value),
      nextPath
    )

    router.push(path)
  }

  return {
    navigateToNext
  }
}
