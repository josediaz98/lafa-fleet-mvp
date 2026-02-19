import { STATUS_CONFIG } from '@/lib/status-map';

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = STATUS_CONFIG[status] ?? {
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
