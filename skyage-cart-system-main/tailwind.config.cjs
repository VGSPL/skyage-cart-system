/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#E6F7FF',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        'xs': ['0.75rem', '0.875rem'],    // 10px - extra small for 320px
        'sm': ['0.875rem', '1rem'],       // 12px - small
        'base': ['1rem', '1.125rem'], // 14px - base
        'lg': ['1.125rem', '1.25rem'],        // 16px - large
        'xl': ['1.25rem', '1.5rem'],   // 18px - extra large
        '2xl': ['1.5rem', '1.75rem'],   // 20px
        '3xl': ['1.75rem', '2rem'],       // 24px


          
      },
    },
  },
  plugins: [],
}
