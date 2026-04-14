import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: '#F7F2E9',
        espresso:  '#1C1410',
        terracotta: {
          DEFAULT: '#C4622D',
          light:   '#D97B4A',
          dark:    '#9E4E24',
        },
        // Full numeric scale built around DEFAULT #4A6741
        sage: {
          50:      '#f0f5ef',
          100:     '#d4e4d1',
          200:     '#b0ccab',
          300:     '#83ab7c',
          400:     '#5e8a57',
          500:     '#4A6741',
          600:     '#3a5232',
          700:     '#2d4127',
          800:     '#22301e',
          900:     '#162014',
          DEFAULT: '#4A6741',
          light:   '#6A8F60',
          pale:    '#E8F0E6',
        },
        // Warm sandy neutral — interactive component backgrounds & borders
        sand: {
          50:  '#faf7f2',
          100: '#f5efe3',
          200: '#ece2ce',
          300: '#dfd0b5',
          400: '#cfb994',
          500: '#b99a72',
          600: '#9a7c57',
          700: '#7b6144',
          800: '#5d4833',
          900: '#3d2f22',
        },
        stone: {
          warm:    '#8B7355',
          border:  '#E5DBCC',
          muted:   '#B5A490',
          surface: '#FDFAF4',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl':  ['6rem',   { lineHeight: '1', letterSpacing: '-0.03em' }],
        '9xl':  ['8rem',   { lineHeight: '1', letterSpacing: '-0.04em' }],
        '10xl': ['10rem',  { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        jana: {
          css: {
            '--tw-prose-body':          theme('colors.espresso'),
            '--tw-prose-headings':      theme('colors.espresso'),
            '--tw-prose-links':         theme('colors.terracotta.DEFAULT'),
            '--tw-prose-bold':          theme('colors.espresso'),
            '--tw-prose-counters':      theme('colors.stone.warm'),
            '--tw-prose-bullets':       theme('colors.stone.muted'),
            '--tw-prose-quotes':        theme('colors.espresso'),
            '--tw-prose-quote-borders': theme('colors.terracotta.DEFAULT'),
            '--tw-prose-code':          theme('colors.terracotta.dark'),
            '--tw-prose-hr':            theme('colors.stone.border'),
            maxWidth: '72ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.9',
            fontSize: '1.075rem',
            p: { marginTop: '1.5em', marginBottom: '1.5em' },
            'h1,h2,h3,h4': {
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontWeight: '400',
              letterSpacing: '-0.02em',
            },
            h2: { fontSize: '1.9em', marginTop: '2.75em', marginBottom: '0.75em' },
            h3: { fontSize: '1.4em',  marginTop: '2em',   marginBottom: '0.5em' },
            code: {
              backgroundColor: '#EDE6D9',
              padding: '0.15em 0.4em',
              borderRadius: '3px',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
            a: {
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px',
            },
            blockquote: {
              fontStyle: 'italic',
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.2em',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
