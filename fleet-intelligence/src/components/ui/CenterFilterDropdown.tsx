import { useCenterFilter } from '@/lib/use-center-filter';
import { CENTERS } from '@/data/constants';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface CenterFilterDropdownProps {
  variant?: 'select' | 'pills';
}

export default function CenterFilterDropdown({
  variant = 'select',
}: CenterFilterDropdownProps) {
  const { isAdmin, effectiveCenterId, setCenterFilter } = useCenterFilter();

  if (!isAdmin) return null;

  if (variant === 'pills') {
    const options = [
      { id: null, name: 'Todos' },
      ...CENTERS.map((c) => ({ id: c.id as string | null, name: c.name })),
    ];
    return (
      <div className="flex items-center gap-1.5">
        {options.map((opt) => {
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

  const selectedCenterName = effectiveCenterId
    ? (CENTERS.find((c) => c.id === effectiveCenterId)?.name ?? 'Todos')
    : 'Todos';

  const filterOptions = [
    { value: '__todos__', label: 'Todos' },
    ...CENTERS.map((c) => ({ value: c.name, label: c.name })),
  ];

  const filterValue =
    selectedCenterName === 'Todos' ? '__todos__' : selectedCenterName;

  return (
    <SearchableSelect
      options={filterOptions}
      value={filterValue}
      onChange={(v) => {
        if (v === '__todos__') setCenterFilter(null);
        else {
          const center = CENTERS.find((c) => c.name === v);
          setCenterFilter(center?.id ?? null);
        }
      }}
      searchable={false}
    />
  );
}
