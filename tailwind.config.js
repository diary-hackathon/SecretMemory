/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // カスタムカラーを定義
        customBlue: '#3498db',
        customRed: '#E6E0E9',
      },
      fontFamily: {
          'sacramento': ['Sacramento', 'cursive'],
        },
    }
  },
  plugins: []
}
