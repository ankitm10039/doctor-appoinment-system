/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // This is important for Quasar to work properly with Tailwind
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with Quasar
  },
  // For Tailwind CSS v4
  future: {
    hoverOnlyWhenSupported: true,
  },
}