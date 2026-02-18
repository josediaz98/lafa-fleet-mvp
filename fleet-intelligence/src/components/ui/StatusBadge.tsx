const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  en_turno: { bg: 'bg-[rgba(59,130,246,0.15)]', text: 'text-[#3B82F6]', label: 'En turno' },
  completado: { bg: 'bg-[rgba(34,197,94,0.15)]', text: 'text-[#22C55E]', label: 'Completado' },
  pendiente_revision: { bg: 'bg-[rgba(234,179,8,0.15)]', text: 'text-[#EAB308]', label: 'Pend. revisión' },
  disponible: { bg: 'bg-[rgba(34,197,94,0.15)]', text: 'text-[#22C55E]', label: 'Disponible' },
  cargando: { bg: 'bg-[rgba(234,179,8,0.15)]', text: 'text-[#EAB308]', label: 'Cargando' },
  mantenimiento: { bg: 'bg-[rgba(249,115,22,0.15)]', text: 'text-[#F97316]', label: 'Mantenimiento' },
  fuera_de_servicio: { bg: 'bg-[rgba(239,68,68,0.15)]', text: 'text-[#EF4444]', label: 'Fuera de servicio' },
  activo: { bg: 'bg-[rgba(34,197,94,0.15)]', text: 'text-[#22C55E]', label: 'Activo' },
  inactivo: { bg: 'bg-[rgba(113,113,122,0.15)]', text: 'text-[#71717A]', label: 'Inactivo' },
  admin: { bg: 'bg-[rgba(139,92,246,0.15)]', text: 'text-[#8B5CF6]', label: 'Admin' },
  supervisor: { bg: 'bg-[rgba(59,130,246,0.15)]', text: 'text-[#3B82F6]', label: 'Supervisor' },
  diurno: { bg: 'bg-[rgba(234,179,8,0.15)]', text: 'text-[#EAB308]', label: 'Diurno' },
  nocturno: { bg: 'bg-[rgba(139,92,246,0.15)]', text: 'text-[#8B5CF6]', label: 'Nocturno' },
  alerta: { bg: 'bg-[rgba(239,68,68,0.15)]', text: 'text-[#EF4444]', label: 'Alerta' },
  cerrado: { bg: 'bg-[rgba(34,197,94,0.15)]', text: 'text-[#22C55E]', label: 'Cerrado' },
};

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? {
    bg: 'bg-[rgba(113,113,122,0.15)]',
    text: 'text-[#71717A]',
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${style.bg} ${style.text}`}
    >
      {label ?? style.label}
    </span>
  );
}
