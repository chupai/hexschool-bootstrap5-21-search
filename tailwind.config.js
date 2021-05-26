const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    options: {
      safelist: {},
    },
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['"Noto Sans TC"', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.emerald,
        dark: colors.coolGray,
      },
      screens: {
        xs: '360px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
