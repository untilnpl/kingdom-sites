import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return client
}

// Lazy proxy so module-level import never calls createClient at build time
export const supabase = new Proxy({} as SupabaseClient, {
  get(_t, prop: string) {
    return (getSupabase() as any)[prop]
  },
})
