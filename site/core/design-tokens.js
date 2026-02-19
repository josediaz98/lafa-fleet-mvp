// ============================================================
// LAFA Design Tokens
// Colors, ApexCharts defaults — shared across all prototypes
// ============================================================

const COLORS = {
  // Brand Core
  dark: '#1B1A23', card: '#252B37', cardHover: '#2D3444',
  orange: '#FF5A00', orangeLogo: '#FF6200',
  // Semantic Status
  green: '#22C55E', yellow: '#EAB308', red: '#EF4444', blue: '#3B82F6',
  // Track Colors
  teal: '#14B8A6',      // DaE track
  amber: '#F59E0B',     // LTO track
  // SOH Heatmap
  sohExcellent: '#16A34A', sohGood: '#22C55E', sohFair: '#4ADE80',
  sohWatch: '#EAB308', sohCritical: '#EF4444',
  // Neutrals
  gray100: '#F3F4F6', gray300: '#D1D5DB', gray400: '#9CA3AF',
  gray500: '#6B7280', gray600: '#4B5563', gray700: '#374151', gray800: '#1F2937',
  border: 'rgba(255,255,255,0.06)',
};

// ---------- ApexCharts Defaults ----------
const APEX_DEFAULTS = {
  chart: {
    background: 'transparent',
    foreColor: COLORS.gray400,
    fontFamily: 'Inter Tight, system-ui, sans-serif',
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeinout', speed: 800 },
  },
  grid: {
    borderColor: 'rgba(255,255,255,0.06)',
    strokeDashArray: 3,
  },
  tooltip: {
    theme: 'dark',
    style: { fontSize: '12px' },
  },
  colors: [COLORS.orange, COLORS.teal, COLORS.amber, COLORS.green, COLORS.yellow, COLORS.red],
  stroke: { curve: 'smooth' },
};

function mergeApexDefaults(opts) {
  return {
    ...opts,
    chart: { ...APEX_DEFAULTS.chart, ...opts.chart },
    grid: { ...APEX_DEFAULTS.grid, ...opts.grid },
    tooltip: { ...APEX_DEFAULTS.tooltip, ...opts.tooltip },
    colors: opts.colors || APEX_DEFAULTS.colors,
    stroke: { ...APEX_DEFAULTS.stroke, ...opts.stroke },
  };
}
