import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL || '';
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = !!(url && key && !url.includes('your-project'));

export const supabase: SupabaseClient | null = isConfigured
  ? createClient(url, key)
  : null;

export const isSupabaseConfigured = isConfigured;
