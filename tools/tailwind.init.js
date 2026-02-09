// Shared Tailwind config for all LAFA internal tools
// Superset of colors used across dashboard, battery, collections, onboarding, roadmap
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter Tight', 'system-ui', 'sans-serif'] },
      colors: {
        lafa: {
          dark: '#1B1A23', card: '#252B37', orange: '#FF5A00', 'orange-hover': '#E54E00', 'orange-logo': '#FF6200',
          teal: '#14B8A6', amber: '#F59E0B', green: '#22C55E', red: '#EF4444',
          yellow: '#EAB308', blue: '#3B82F6',
          modal: '#1E1D28', sidebar: '#16151E',
          'wa-dark': '#0B141A', 'wa-header': '#1F2C33', 'wa-input': '#2A3942'
        }
      }
    }
  }
}
