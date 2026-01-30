import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgbypbllmqqsqaouwmve.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYnlwYmxsbXFxc3Fhb3V3bXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MTQyNTMsImV4cCI6MjA4NTE5MDI1M30.Zllsc9o9dJdSpXpCC6hFMb_Fo4XNoyUtV8hgqge7rRQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);