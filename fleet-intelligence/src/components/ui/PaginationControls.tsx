import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded text-lafa-text-secondary hover:text-lafa-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
        aria-label="Página anterior"
      >
        <ChevronLeft size={14} />
      </button>
      <span className="text-xs text-lafa-text-secondary">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded text-lafa-text-secondary hover:text-lafa-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
        aria-label="Página siguiente"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
