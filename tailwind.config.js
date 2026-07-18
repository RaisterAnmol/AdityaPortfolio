/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#050505',
        emeraldAccent: '#00FF99',
        indigoAccent: '#6366F1',
        cardBg: 'rgba(10, 10, 10, 0.7)',
        borderBg: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient-pulse': 'gradientPulse 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradientPulse: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'futuristic-gradient': 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(5, 5, 5, 1) 70%)',
      }
    },
  },
  plugins: [],
}
