import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#212121',
        accent: '#e97d2c',
        foreground: '#fafafa',
        muted: '#d8d8d8',
        card: '#292929',
        border: '#555555',
        'surface-elevated': 'rgba(41, 41, 41, 0.85)',
        'surface-overlay': 'rgba(33, 33, 33, 0.92)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: {
        'depth-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
        'depth-2': '0 4px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.10)',
        'depth-3': '0 10px 20px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.12)',
      },
      backdropBlur: {
        surface: '12px',
        overlay: '16px',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'cursor-scan': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(60px)' },
          '100%': { transform: 'translateY(120px)' },
        },
        'status-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        typing: 'typing 2s steps(30, end) forwards',
        'cursor-scan': 'cursor-scan 3s ease-in-out infinite',
        'status-pulse': 'status-pulse 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
