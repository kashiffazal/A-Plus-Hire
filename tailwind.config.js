/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '500px',
      },
    },
  },
  plugins: [],
  // corePlugins: { preflight: false },//@ Avoid Tailwind preflight (Default CSS) in order to use Antd Design Preflight,
}

