import { createClient } from '@supabase/supabase-js'

// Credentials are loaded from environment variables — never hardcoded.
// VITE_ prefix makes them available in the browser bundle (Vite convention).
// The anon key is safe to expose publicly: it only grants access that
// Supabase Row-Level Security (RLS) policies explicitly allow.
// Real access control is enforced server-side by RLS — not by hiding this key.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
