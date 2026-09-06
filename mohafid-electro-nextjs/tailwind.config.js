/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0F1C',
        panel: '#121B2E',
        panel2: '#0F1728',
        border: '#1E2A42',
        accent: '#F2A93B',
        accent2: '#35D7B6',
        danger: '#E8697A'
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      }
    }
  },
  plugins: []
};
