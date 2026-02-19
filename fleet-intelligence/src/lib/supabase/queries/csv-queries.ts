import { supabase } from '../client';
import type { DbCsvUpload } from '../types';

// ─────────────────────────────────────────────────────────────
// CSV upload history
// ─────────────────────────────────────────────────────────────

export interface CsvUploadRecord {
  id: string;
  filename: string;
  uploadedBy: string;
  uploadedAt: string;
  recordCount: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  status: 'procesado' | 'error';
}

export async function fetchUploadHistory(
  limit = 20,
): Promise<CsvUploadRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('csv_uploads')
    .select('*, profiles!uploaded_by ( name )')
    .order('uploaded_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return (data ?? []).map(
    (row: DbCsvUpload & { profiles: { name: string } | null }) => ({
      id: row.id,
      filename: row.filename,
      uploadedBy: row.profiles?.name ?? 'Desconocido',
      uploadedAt: row.uploaded_at,
      recordCount: row.record_count,
      validCount: row.valid_count,
      warningCount: row.warning_count,
      errorCount: row.error_count,
      status: row.status,
    }),
  );
}
