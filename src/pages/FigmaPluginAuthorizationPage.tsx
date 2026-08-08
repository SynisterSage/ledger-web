import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'

type WebSession = {
  access_token: string
  refresh_token?: string
  expires_at?: number
}

type ViewState = 'loading' | 'sign_in' | 'ready' | 'busy' | 'approved' | 'error'

const API_BASE = import.meta.env.VITE_API_URL?.trim() || 'https://api.ledgerworkspace.com'
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim() || ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || ''
const clearLegacySession = () => window.localStorage.removeItem('ledger-web-auth-session')

const readOAuthSession = () => {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const accessToken = hash.get('access_token')
  if (!accessToken) return null
  const session = { access_token: accessToken, refresh_token: hash.get('refresh_token') || undefined, expires_at: Number(hash.get('expires_at') || 0) || undefined }
  clearLegacySession()
  window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`)
  return session
}

const authRequest = async (path: string, body: Record<string, string>) => {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY },
    body: JSON.stringify(body),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload?.msg || payload?.error_description || 'Ledger sign-in failed.')
  return payload as WebSession
}

export function FigmaPluginAuthorizationPage({ sessionId, code }: { sessionId: string; code: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState<WebSession | null>(null)
  const [state, setState] = useState<ViewState>('loading')
  const [error, setError] = useState('')

  const configured = Boolean(SUPABASE_URL && SUPABASE_KEY)
  const currentUrl = useMemo(() => window.location.href.split('#')[0], [])

  useEffect(() => {
    const nextSession = readOAuthSession()
    clearLegacySession()
    setSession(nextSession)
    setState(configured ? (nextSession ? 'ready' : 'sign_in') : 'error')
    if (!configured) setError('Ledger web authentication is not configured.')
  }, [configured])

  const approve = async (accessToken: string) => {
    setState('busy')
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/figma-plugin/auth/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ session_id: sessionId, verification_code: code }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload?.error || 'This authorization request is invalid or expired.')
      setState('approved')
    } catch (caught) {
      setState('error')
      setError(caught instanceof Error ? caught.message : 'Ledger could not approve plugin access.')
    }
  }

  const signIn = async (event: FormEvent) => {
    event.preventDefault()
    setState('busy')
    setError('')
    try {
      const nextSession = await authRequest('token?grant_type=password', { email: email.trim(), password })
      setSession(nextSession)
      setState('ready')
    } catch (caught) {
      setState('sign_in')
      setError(caught instanceof Error ? caught.message : 'Ledger sign-in failed.')
    }
  }

  const signInWithGoogle = () => {
    if (!configured) return
    window.location.assign(`${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(currentUrl)}&apikey=${encodeURIComponent(SUPABASE_KEY)}`)
  }

  if (state === 'loading') return null

  return (
    <main className="min-h-dvh bg-ledger-bg px-6 py-12 text-ledger-text">
      <section className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-[390px] items-center justify-center">
        <div className="w-full text-center">
          <img src="/assets/logos/logo.svg" alt="Ledger" className="mx-auto h-9 w-9" />
          <p className="mt-4 text-[13px] font-medium text-ledger-text-muted">Ledger plugin access</p>
          <h1 className="mt-3 text-[25px] font-semibold tracking-[-0.04em]">Connect Ledger to Figma</h1>
          {state === 'approved' ? (
            <p className="mx-auto mt-3 max-w-[300px] text-[15px] leading-7 text-ledger-text-muted">Plugin access approved. Return to Figma to continue.</p>
          ) : state === 'sign_in' ? (
            <>
              <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-7 text-ledger-text-muted">Sign in to approve this plugin connection for your Ledger workspace.</p>
              <form className="mx-auto mt-7 space-y-3 text-left" onSubmit={(event) => void signIn(event)}>
                <label className="block text-[13px] font-medium text-ledger-text-muted">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-4 text-[15px] text-ledger-text outline-none focus:border-(--ledger-header-border)" /></label>
                <label className="block text-[13px] font-medium text-ledger-text-muted">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-4 text-[15px] text-ledger-text outline-none focus:border-(--ledger-header-border)" /></label>
                <button className="h-11 w-full rounded-full bg-ledger-accent px-5 text-[15px] font-semibold text-white hover:bg-ledger-accent-hover" type="submit">Continue</button>
                <div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-(--ledger-border-subtle)" /><span className="text-[12px] text-ledger-text-muted">or</span><span className="h-px flex-1 bg-(--ledger-border-subtle)" /></div>
                <button className="h-11 w-full rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 text-[15px] font-semibold text-ledger-text hover:bg-(--ledger-surface-muted)" type="button" onClick={signInWithGoogle}>Continue with Google</button>
              </form>
            </>
          ) : (
            <>
              <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-7 text-ledger-text-muted">Approve this plugin connection to view your workspaces and send designs into Ledger.</p>
              <p className="mx-auto mt-5 max-w-[250px] rounded-xl bg-(--ledger-surface-muted) px-4 py-3 text-xs text-ledger-text-muted">Verification code <strong className="ml-1 text-ledger-text">{code}</strong></p>
              <button className="mt-6 h-11 rounded-full bg-ledger-accent px-5 text-[15px] font-semibold text-white hover:bg-ledger-accent-hover" type="button" disabled={state === 'busy'} onClick={() => session && void approve(session.access_token)}>Approve plugin access</button>
            </>
          )}
          {error && <p className="mx-auto mt-4 max-w-[320px] text-sm leading-6 text-red-600" role="alert">{error}</p>}
        </div>
      </section>
    </main>
  )
}
