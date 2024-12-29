import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing:', { 
    url: !!supabaseUrl, 
    key: !!supabaseKey 
  });
}

export const supabase = createClient(
  supabaseUrl || 'https://jbugzbnbqwnnfhsherla.supabase.co',
  supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidWd6Ym5icXdubmZoc2hlcmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NTg1MjIsImV4cCI6MjA1MTAzNDUyMn0.DnWK5_fufN15MFGLTk87kf4tuW2Km1poTJU4sywndnc'
);
