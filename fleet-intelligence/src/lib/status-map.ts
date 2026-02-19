/** Raw hex values for inline style props (charts, data-viz badges). */
export const PALETTE = {
  active: '#3B82F6',
  success: '#22C55E',
  alert: '#EAB308',
  danger: '#EF4444',
  purple: '#A855F7',
} as const;

export const STATUS_CONFIG: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  en_turno: {
    bg: 'bg-status-active/15',
    text: 'text-status-active',
    label: 'En turno',
  },
  completado: {
    bg: 'bg-status-success/15',
    text: 'text-status-success',
    label: 'Completado',
  },
  pendiente_revision: {
    bg: 'bg-status-alert/15',
    text: 'text-status-alert',
    label: 'Pend. revisión',
  },
  disponible: {
    bg: 'bg-status-success/15',
    text: 'text-status-success',
    label: 'Disponible',
  },
  cargando: {
    bg: 'bg-status-alert/15',
    text: 'text-status-alert',
    label: 'Cargando',
  },
  mantenimiento: {
    bg: 'bg-orange-500/15',
    text: 'text-orange-500',
    label: 'Mantenimiento',
  },
  fuera_de_servicio: {
    bg: 'bg-status-danger/15',
    text: 'text-status-danger',
    label: 'Fuera de servicio',
  },
  activo: {
    bg: 'bg-status-success/15',
    text: 'text-status-success',
    label: 'Activo',
  },
  invitado: {
    bg: 'bg-status-alert/15',
    text: 'text-status-alert',
    label: 'Invitado',
  },
  inactivo: { bg: 'bg-zinc-500/15', text: 'text-zinc-500', label: 'Inactivo' },
  admin: { bg: 'bg-status-info/15', text: 'text-status-info', label: 'Admin' },
  supervisor: {
    bg: 'bg-status-active/15',
    text: 'text-status-active',
    label: 'Supervisor',
  },
  diurno: {
    bg: 'bg-status-alert/15',
    text: 'text-status-alert',
    label: 'Diurno',
  },
  nocturno: {
    bg: 'bg-status-info/15',
    text: 'text-status-info',
    label: 'Nocturno',
  },
  alerta: {
    bg: 'bg-status-danger/15',
    text: 'text-status-danger',
    label: 'Alerta',
  },
  cerrado: {
    bg: 'bg-status-success/15',
    text: 'text-status-success',
    label: 'Cerrado',
  },
  procesado: {
    bg: 'bg-status-success/15',
    text: 'text-status-success',
    label: 'Procesado',
  },
  error: {
    bg: 'bg-status-danger/15',
    text: 'text-status-danger',
    label: 'Error',
  },
};

export const STATUS_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([k, v]) => [k, v.label]),
);
