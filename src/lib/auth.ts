import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabase, supabaseConfigError } from './supabase'

export const productAuth = {
  isConfigured: !supabaseConfigError,
  async signIn(email: string, password: string) {
    const result = await supabase.auth.signInWithPassword({ email, password })
    if (result.error) throw result.error
    return result.data.session
  },
  async signUp(email: string, password: string, fullName: string) {
    const result = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName || undefined } } })
    if (result.error) throw result.error
    return result.data.session
  },
  async signInWithGoogle() {
    const result = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
    if (result.error) throw result.error
  },
  async getSession(): Promise<Session | null> {
    const result = await supabase.auth.getSession()
    if (result.error) throw result.error
    return result.data.session
  },
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback).data.subscription
  },
}
