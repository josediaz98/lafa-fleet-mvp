import { useState, useRef } from 'react';
import { useAppState } from '@/app/providers/AppProvider';
import { useActionContext } from '@/lib/action-context';
import { getWeekBounds } from '@/lib/date-utils';
import { parseCsvText, validateRow, type ParsedRow } from './csv-parser';

export function useFileParser() {
  const { trips, drivers } = useAppState();
  const ctx = useActionContext();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState('');
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [showOnlyErrors, setShowOnlyErrors] = useState(false);

  const existingTripIds = new Set(trips.map((t) => t.tripId));

  function processFile(file: File): boolean {
    if (file.size > 20 * 1024 * 1024) {
      ctx.showToast('error', 'Archivo muy grande (max 20MB)');
      return false;
    }
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCsvText(text);

      const seenIds = new Set<string>();
      const week = getWeekBounds();
      const validated = parsed.map((row) => {
        const result = validateRow(
          row,
          seenIds,
          existingTripIds,
          drivers,
          week.start,
          week.end,
        );
        seenIds.add(row.tripId);
        return result;
      });

      setRows(validated);
      setShowOnlyErrors(false);
    };
    reader.readAsText(file);
    return true;
  }

  function reset() {
    setFileName('');
    setRows([]);
    setShowOnlyErrors(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  return {
    fileRef,
    fileName,
    rows,
    showOnlyErrors,
    setShowOnlyErrors,
    processFile,
    reset,
    existingTripIds,
    drivers,
  };
}
