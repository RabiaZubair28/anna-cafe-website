/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f7efe3',
        porcelain: '#fffaf1',
        sage: '#9db293',
        sageSoft: '#c7d4bd',
        moss: '#6c8265',
        forest: '#244b38',
        deep: '#132a21',
        espresso: '#4b2e22',
        caramel: '#c79557',
        gold: '#d5b071',
        blush: '#f3ded1'
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        arabic: ['"Noto Naskh Arabic"', 'serif']
      },
      boxShadow: {
        glow: '0 25px 80px rgba(213,176,113,.24)',
        leaf: '0 25px 70px rgba(36,75,56,.26)',
        porcelain: 'inset 0 1px 0 rgba(255,255,255,.76), 0 30px 80px rgba(19,42,33,.18)'
      },
      backgroundImage: {
        radialGlow: 'radial-gradient(circle at var(--x,50%) var(--y,40%), rgba(213,176,113,.22), transparent 35%)',
        paper: 'linear-gradient(135deg, rgba(255,255,255,.72), rgba(247,239,227,.88))'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(-1deg)' },
          '50%': { transform: 'translate3d(0,-18px,0) rotate(2deg)' }
        },
        floatReverse: {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(2deg)' },
          '50%': { transform: 'translate3d(0,18px,0) rotate(-2deg)' }
        },
        steam: {
          '0%': { opacity: 0, transform: 'translateY(24px) scale(.85)' },
          '30%': { opacity: .7 },
          '100%': { opacity: 0, transform: 'translateY(-70px) translateX(22px) scale(1.25)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(140%) skewX(-18deg)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        pulseGlow: {
          '0%,100%': { opacity: .55, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.08)' }
        },
        beanDrift: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(18px, -30px, 0) rotate(22deg)' },
          '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' }
        }
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        floatReverse: 'floatReverse 8s ease-in-out infinite',
        steam: 'steam 4.8s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        spinSlow: 'spinSlow 24s linear infinite',
        pulseGlow: 'pulseGlow 5s ease-in-out infinite',
        beanDrift: 'beanDrift 9s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
