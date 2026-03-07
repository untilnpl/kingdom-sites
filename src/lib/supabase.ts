import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// By removing "| null", you tell the whole app that supabase is always ready.
export const supabase = createClient(url, key)