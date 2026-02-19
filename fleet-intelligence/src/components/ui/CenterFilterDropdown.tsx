import { useCenterFilter } from '@/lib/use-center-filter';
import { CENTERS } from '@/data/constants';
import Select from '@/components/ui/Select';

interface CenterFilterDropdownProps {
  variant?: 'select' | 'pills';
}

export default function CenterFilterDropdown({ variant = 'select' }: CenterFilterDropdownProps) {
  const { isAdmin, effectiveCenterId, setCenterFilter } = useCenterFilter();

  if (!isAdmin) return null;

  const selectedCenterName = effectiveCenterId
    ? CENTERS.find(c => c.id === effectiveCenterId)?.name ?? 'Todos'
    : 'Todos';

  if (variant === 'pills') {
    const options = [{ id: null, name: 'Todos' }, ...CENTERS.map(c => ({ id: c.id as string | null, name: c.name }))];
    return (
      <div className="flex items-center gap-1.5">
        {options.map(opt => {
          const isActive = opt.id === effectiveCenterId;
          return (
            <button
              key={opt.name}
              onClick={() => setCenterFilter(opt.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-lafa-accent text-white'
                  : 'bg-lafa-surface border border-lafa-border text-lafa-text-secondary hover:text-lafa-text-primary hover:border-lafa-accent/30'
              }`}
            >
              {opt.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <Select
      value={selectedCenterName}
      onChange={e => {
        const name = e.target.value;
        if (name === 'Todos') setCenterFilter(null);
        else {
          const center = CENTERS.find(c => c.name === name);
          setCenterFilter(center?.id ?? null);
        }
      }}
      className="px-3 py-2 bg-lafa-surface border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
    >
      {['Todos', ...CENTERS.map(c => c.name)].map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </Select>
  );
}
