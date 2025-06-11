import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Note: The anon key is safe to expose as it only allows RLS-controlled access
const supabaseUrl = 'https://xjmktjcflmjrqbtofdjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWt0amNmbG1qcnFidG9mZGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0OTYxODksImV4cCI6MjA2NTA3MjE4OX0.SWyvV0aoi8KmrW8fJGzEzy8cC3qXTy5_OyobTbVanXc';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get full URL for storage files
export const getStorageUrl = (bucket: string, path: string) => {
  if (!path) return null;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
};
