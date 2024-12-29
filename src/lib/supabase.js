import { createClient } from '@supabase/supabase-js';

// Fallback to hardcoded values if env variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jbugzbnbqwnnfhsherla.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidWd6Ym5icXdubmZoc2hlcmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NTg1MjIsImV4cCI6MjA1MTAzNDUyMn0.DnWK5_fufN15MFGLTk87kf4tuW2Km1poTJU4sywndnc';

export const supabase = createClient(supabaseUrl, supabaseKey);
