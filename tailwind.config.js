/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'sans': ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif']
      },
      colors: {
        primary: {
          orange: '#FF6F1F',
          peach: '#FFB5A0',
          black: '#000000',
          white: '#FFFFFF',
          grey: '#2D2D2D'
        },
        gradients: {
          'peach-white': 'linear-gradient(135deg, #FFF5F0 0%, #FFE6D5 100%)',
          'orange-dark': 'linear-gradient(135deg, #000000 0%, #FF6F1F 100%)',
          'cosmic': 'linear-gradient(135deg, #FF6F1F 0%, #FFB5A0 50%, #FFF5F0 100%)'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 111, 31, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 111, 31, 0.6)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};