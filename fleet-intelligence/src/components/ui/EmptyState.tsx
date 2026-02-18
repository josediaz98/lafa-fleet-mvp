import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export default function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-lafa-border/30 flex items-center justify-center mb-4">
        <Icon size={22} className="text-lafa-text-secondary" />
      </div>
      <p className="text-sm font-medium text-lafa-text-primary mb-1">{title}</p>
      {description && (
        <p className="text-xs text-lafa-text-secondary max-w-xs">{description}</p>
      )}
    </div>
  );
}
