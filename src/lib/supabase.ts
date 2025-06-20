import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlgodilqctrgejpjvpqc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZ29kaWxxY3RyZ2VqcGp2cHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzU2NzAsImV4cCI6MjA2NTc1MTY3MH0.0ouQeEIng_5cYPN9JmMU_W2ycFH0gYREzLW1-jPC8ZM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);