/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Hind"', 'system-ui', 'sans-serif'],
        hindi: ['"Hind"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        cream: '#fff7fb',
      },
      boxShadow: {
        'pink-glow': '0 20px 60px -15px rgba(236, 72, 153, 0.35)',
        'soft': '0 10px 40px -10px rgba(190, 24, 93, 0.18)',
        'card': '0 8px 30px -6px rgba(236, 72, 153, 0.12)',
      },
      animation: {
        'blob': 'blob 18s ease-in-out infinite',
        'blob-slow': 'blob 24s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'spin-slow': 'spin 1.2s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pop': 'pop 0.3s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
        'rose-gradient': 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        'shimmer-bg': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
      },
    },
  },
  plugins: [],
};
