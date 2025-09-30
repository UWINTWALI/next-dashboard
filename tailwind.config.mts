import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      // --- New Dim/Dark Palette (Inspired by Ubuntu Dark/Dim Theme) ---
      colors: {
        
        // 1. SURFACES & BACKGROUNDS (Dim)
        // ---------------------------------
        // Used for the main body and primary container elements (cards, headers).
        'bg-base': {
          DEFAULT: '#1E1E1E', // Main page background (Dark Slate)
        },
        'bg-surface': {
          DEFAULT: '#2A2A2E',   // Soft dark gray, not harsh, easy on eyes
          darker: '#323236',    // Slightly darker for hover, subtle contrast
          shadow: 'rgba(0, 0, 0, 0.35)' // softer shadow for depth
        },

        'border-dim': {
          DEFAULT: '#5A5A5A', // Light dividers, input borders in dark mode
        },

        // 2. TEXT & TYPOGRAPHY (High Contrast)
        // -------------------------------------
        'text-primary': {
          DEFAULT: '#EAEAEA', // Main body text, headers (Near White)
        },
        'text-secondary': {
          DEFAULT: '#AFAFAF', // Labels, secondary stats, placeholder text
        },
        'text-accent': {
          DEFAULT: '#F5E36A', // Used sparingly for highlights or links
        },

        // 3. BRAND & INTERACTIVE ACCENTS (Ubuntu Hues)
        // --------------------------------------------
        // Primary: Deep, rich purple (Aubergine) for main action buttons/focus states
        'brand-primary': {
          DEFAULT: '#5D2F6B', // Main button background, active tab indicator
          hover: '#734B80',   // Lighter shade for hover effects
          active: '#451F52',  // Darker shade for pressed state
        },
        // Secondary: Deep Orange/Red for alternatives or destructive confirmation
        'brand-secondary': {
          DEFAULT: '#DD4814', // Secondary button, prominent call-to-action
          hover: '#F28D35',
        },
        // Accent: Teal/Cyan for info, toggles, and interactive elements
        'brand-accent': {
          DEFAULT: '#4DB6AC', // Info icons, sliders, subtle highlights
          hover: '#68D1C4',
        },

        // 4. UTILITY & FEEDBACK COLORS
        // ------------------------------------
        // Used for alerts, status indicators, and form validation.
        'feedback-success': {
          DEFAULT: '#7BBF6A', // Green for success messages/badges
          bg: '#2C402B',      // Darker background for success alerts
        },
        'feedback-warning': {
          DEFAULT: '#F5E36A', // Yellow/Gold for warnings/drafts
          bg: '#454027',
        },
        'feedback-error': {
          DEFAULT: '#E57373', // Red for errors/destructive buttons
          bg: '#543535',
        },
      },
      
      // Animations and other utility extensions
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      
      // You can also map the Tailwind defaults to your custom palette
      extend: {
        // Example of mapping generic Tailwind names to custom names:
        // backgroundColor: theme => ({
        //   'primary': theme('colors.brand-primary.DEFAULT'),
        //   ...
        // })
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;