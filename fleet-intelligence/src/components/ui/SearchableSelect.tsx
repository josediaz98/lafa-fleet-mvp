import { useState, useRef, useEffect, useId } from 'react';
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
  searchable?: boolean;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  label,
  searchable = true,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const optionIdPrefix = useId();

  const filtered = searchable
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          (o.sublabel?.toLowerCase().includes(query.toLowerCase()) ?? false),
      )
    : options;

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery('');
        setActiveIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchable) {
      inputRef.current?.focus();
    }
  }, [open, searchable]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (
      !open &&
      (e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'Enter' ||
        e.key === ' ')
    ) {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(-1);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filtered.length) {
        onChange(filtered[activeIndex].value);
        setOpen(false);
        setQuery('');
        setActiveIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      setActiveIndex(-1);
    }
  }

  const activeOptionId =
    activeIndex >= 0 ? `${optionIdPrefix}-opt-${activeIndex}` : undefined;

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setOpen(!open);
          setQuery('');
          setActiveIndex(-1);
        }}
        onKeyDown={!searchable ? handleKeyDown : undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-left focus:outline-none focus:border-lafa-accent transition-colors duration-150"
      >
        <span
          className={
            selected ? 'text-lafa-text-primary' : 'text-lafa-text-secondary/50'
          }
        >
          {selected ? selected.label : (placeholder ?? 'Seleccionar...')}
        </span>
        <ChevronDown
          size={16}
          className={`text-lafa-text-secondary transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-lafa-surface border border-lafa-border rounded-lg shadow-xl">
          {searchable && (
            <div className="p-2 border-b border-lafa-border">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-lafa-text-secondary"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar..."
                  aria-controls={listboxId}
                  aria-activedescendant={activeOptionId}
                  className="w-full pl-8 pr-3 py-2 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
                />
              </div>
            </div>
          )}
          <div
            id={listboxId}
            role="listbox"
            className="max-h-60 overflow-y-auto overscroll-contain"
          >
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-xs text-lafa-text-secondary text-center">
                Sin resultados
              </p>
            )}
            {filtered.map((opt, idx) => (
              <button
                key={opt.value}
                id={`${optionIdPrefix}-opt-${idx}`}
                type="button"
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setQuery('');
                  setActiveIndex(-1);
                }}
                className={`w-full text-left px-3 py-2.5 text-sm hover:bg-lafa-accent/10 transition-colors duration-150 ${
                  idx === activeIndex
                    ? 'bg-lafa-accent/10'
                    : opt.value === value
                      ? 'bg-lafa-accent/5 text-lafa-accent'
                      : 'text-lafa-text-primary'
                }`}
              >
                <span className="block">{opt.label}</span>
                {opt.sublabel && (
                  <span className="block text-xs text-lafa-text-secondary">
                    {opt.sublabel}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
