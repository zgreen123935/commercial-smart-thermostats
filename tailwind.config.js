/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FFFFFF',
        'surface': '#FFFFFF',
        'surface-container': '#F0F0F0',
        'surface-container-low': '#F5F5F5',
        'surface-container-high': '#EBEBEB',
        'on-surface': '#191C20',
        'on-surface-variant': '#42474E',
        'primary': '#35618E',
        'on-primary': '#FFFFFF',
        'primary-container': '#D1E4FF',
        'on-primary-container': '#001D36',
        'error': '#BA1A1A',
        'error-container': '#FFDAD6',
        'on-error-container': '#410002',
        'surface-disabled': '#1E1A2061',
        'on-surface-disabled': '#1E1A201F',
        'outline': '#73777F',
        'outline-variant': '#C3C7CF'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
