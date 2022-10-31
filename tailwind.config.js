/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./theme/templates/*.{html,js}",
    "./content/**/*.{html,js,md}",
    "./tools/*.{html,jinja}"
  ],
  theme: {
    extend: {
      spacing: {
        '25%': '25%',
      }

    },
  },
  plugins: [],
}
