import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get full URL for storage files
export const getStorageUrl = (bucket: string, path: string) => {
  if (!path) return null;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
};