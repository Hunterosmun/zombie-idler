import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        pulse: {
          '50%': { opacity: '0.75' }
        }
      },
      animation: {
        'danger-wiggle': 'wiggle 0.5s ease-in-out infinite',
        pulse: 'pulse 1s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config
