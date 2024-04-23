/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'current',
      purple: '#633CFF',
      'light-purple': '#EFEBFF',
      'dark-grey': '#333333',
      grey: '#737373',
      borders: '#D9D9D9',
      'light-grey': '#FAFAFA',
      white: '#FFFFFF',
      red: '#FF3939',
      black: '#1A1A1A',
      blue: '#2D68FF',
      twitch: '#9147ff',
      linkedin: '#0A66C2',
      gitlab: '#171321',
      freecodecamp: '#0A0A23',
      frontendmentor: '#3E54A3'
    },
    extend: {
      boxShadow: {
        custom: '0px 2px 4px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
