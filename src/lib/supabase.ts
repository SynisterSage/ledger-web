import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || ''

export const supabaseConfigError = !supabaseUrl || !supabaseKey ? new Error('Ledger authentication is not configured.') : null

export const supabase = createClient(supabaseUrl || 'https://invalid.invalid', supabaseKey || 'invalid', {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'ledger-auth' },
})
