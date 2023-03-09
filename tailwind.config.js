/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./theme/templates/*.{html,js}",
    "./content/**/*.{html,js,md}",
    "../node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      spacing: {
        '25%': '25%',
      }

    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
