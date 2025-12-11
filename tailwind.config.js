/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'practizio-navy': '#0A1F44',
        'practizio-coral': '#FF6B4A',
        'practizio-beige': '#F5F1EA',
        'practizio-orange': '#FF8C42',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

