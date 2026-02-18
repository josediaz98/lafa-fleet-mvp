import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  sublabel?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function SearchableSelect({ options, value, onChange, placeholder, label }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase()) ||
    (o.sublabel?.toLowerCase().includes(query.toLowerCase()) ?? false)
  );

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">{label}</label>
      )}
      <button
        type="button"
        onClick={() => { setOpen(!open); setQuery(''); }}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-left focus:outline-none focus:border-lafa-accent transition-colors"
      >
        <span className={selected ? 'text-lafa-text-primary' : 'text-lafa-text-secondary/50'}>
          {selected ? selected.label : placeholder ?? 'Seleccionar...'}
        </span>
        <ChevronDown size={16} className={`text-lafa-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-lafa-surface border border-lafa-border rounded-lg shadow-xl overflow-hidden">
          <div className="p-2 border-b border-lafa-border">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-lafa-text-secondary" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-8 pr-3 py-2 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-xs text-lafa-text-secondary text-center">Sin resultados</p>
            )}
            {filtered.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); setQuery(''); }}
                className={`w-full text-left px-3 py-2.5 text-sm hover:bg-lafa-accent/10 transition-colors ${
                  opt.value === value ? 'bg-lafa-accent/5 text-lafa-accent' : 'text-lafa-text-primary'
                }`}
              >
                <span className="block">{opt.label}</span>
                {opt.sublabel && (
                  <span className="block text-xs text-lafa-text-secondary">{opt.sublabel}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
