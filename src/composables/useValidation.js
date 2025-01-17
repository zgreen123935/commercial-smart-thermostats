import { computed } from 'vue'

export function useValidation(rules, values) {
  const errors = computed(() => {
    return Object.entries(rules).reduce((errors, [field, validations]) => {
      errors[field] = validations
        .map(validation => validation(values[field]))
        .filter(error => error !== true)[0] || null
      return errors
    }, {})
  })

  const isValid = computed(() => {
    return Object.values(errors.value).every(error => error === null)
  })

  return {
    errors,
    isValid
  }
}

// Validation rules
export const required = value => {
  return value !== null && value !== undefined && value !== '' ? true : 'This field is required'
}

export const minLength = min => value => {
  return !value || value.length >= min ? true : `Must be at least ${min} characters`
}

export const phone = value => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  return !value || phoneRegex.test(value) ? true : 'Invalid phone number'
}

export const email = value => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return !value || emailRegex.test(value) ? true : 'Invalid email address'
}
