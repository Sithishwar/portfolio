/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#080B11',
          900: '#0A0E14',
          800: '#121826',
          700: '#1A2233',
          600: '#1E2532',
          500: '#2A3444',
        },
        ink: {
          100: '#E6EAF0',
          300: '#B4BDCC',
          500: '#8A94A6',
          700: '#5C6577',
        },
        teal: {
          400: '#5EEBDA',
          500: '#34D8C6',
          600: '#22B8A8',
        },
        indigo: {
          400: '#7C89F7',
          500: '#5B6EF5',
          600: '#4855D6',
        },
        amber: {
          400: '#FFC24D',
          500: '#F5A623',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-map': 'linear-gradient(rgba(94,235,218,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(94,235,218,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      animation: {
        blob: 'blob 18s infinite ease-in-out',
        scan: 'scan 6s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,25px) scale(0.95)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
