// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fglklwnstasihqagpuur.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnbGtsd25zdGFzaWhxYWdwdXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDA1NzEsImV4cCI6MjA1NjgxNjU3MX0.tlPRZUvY9I-FPHs_3IA6bzJl2AkekKpsaxRv50ER85I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);