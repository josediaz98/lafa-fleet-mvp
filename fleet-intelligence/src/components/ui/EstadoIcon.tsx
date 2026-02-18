import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface EstadoIconProps {
  estado: string;
  msg?: string;
}

export default function EstadoIcon({ estado, msg }: EstadoIconProps) {
  switch (estado) {
    case 'valido':
      return (
        <span className="inline-flex items-center gap-1 text-xs text-[#22C55E]">
          <CheckCircle size={14} /> {'V\u00e1lido'}
        </span>
      );
    case 'warning':
      return (
        <span className="inline-flex items-center gap-1 text-xs text-[#EAB308]" title={msg}>
          <AlertTriangle size={14} /> {msg || 'Warning'}
        </span>
      );
    case 'error':
      return (
        <span className="inline-flex items-center gap-1 text-xs text-[#EF4444]" title={msg}>
          <XCircle size={14} /> {msg || 'Error'}
        </span>
      );
    default:
      return null;
  }
}
