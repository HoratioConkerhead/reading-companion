/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3b4d61',
          secondary: '#aa9b77',
          background: '#f5f3ed',
          protagonists: '#3182ce',
          'fifth-columnists': '#e53e3e',
          'german-connection': '#d69e2e',
          supporting: '#718096'
        },
        fontFamily: {
          serif: ['Playfair Display', 'serif'],
          sans: ['Source Sans Pro', 'sans-serif']
        },
        height: {
          '128': '32rem',
        }
      },
    },
    plugins: [],
  }