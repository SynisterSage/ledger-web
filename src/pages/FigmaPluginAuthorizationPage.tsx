import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { IntegrationCallbackSuccess } from '../components/IntegrationCallbackSuccess'

type WebSession = { access_token: string; refresh_token?: string; expires_at?: number }
type Workspace = { id: string; name: string; is_personal?: boolean; role?: string }
type RequestInfo = { scopes: string[]; expires_at: string; workspaces: Workspace[] }
type ViewState = 'loading' | 'sign_in' | 'ready' | 'busy' | 'approved' | 'error'

const API_BASE = import.meta.env.VITE_API_URL?.trim() || 'https://api.ledgerworkspace.com'
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim() || ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || ''
const clearLegacySession = () => window.localStorage.removeItem('ledger-web-auth-session')
const readOAuthSession = () => {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const accessToken = hash.get('access_token')
  if (!accessToken) return null
  clearLegacySession()
  window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`)
  return { access_token: accessToken, refresh_token: hash.get('refresh_token') || undefined, expires_at: Number(hash.get('expires_at') || 0) || undefined }
}
const authRequest = async (body: Record<string, string>) => {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY }, body: JSON.stringify(body) })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload?.msg || payload?.error_description || 'Ledger sign-in failed.')
  return payload as WebSession
}

export function FigmaPluginAuthorizationPage({ sessionId, code }: { sessionId: string; code: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState<WebSession | null>(null)
  const [request, setRequest] = useState<RequestInfo | null>(null)
  const [workspaceId, setWorkspaceId] = useState('')
  const [state, setState] = useState<ViewState>('loading')
  const [error, setError] = useState('')
  const configured = Boolean(SUPABASE_URL && SUPABASE_KEY)
  const currentUrl = useMemo(() => window.location.href.split('#')[0], [])

  const loadRequest = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/api/figma-plugin/auth/requests/${encodeURIComponent(sessionId)}?code=${encodeURIComponent(code)}`, { headers: { Authorization: `Bearer ${accessToken}` } })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload?.error || 'This authorization request is invalid or expired.')
    const next = payload as RequestInfo
    setRequest(next)
    setWorkspaceId(next.workspaces[0]?.id || '')
    setState('ready')
  }

  useEffect(() => {
    const nextSession = readOAuthSession()
    setSession(nextSession)
    if (!configured) { setError('Ledger web authentication is not configured.'); setState('error'); return }
    if (!nextSession) { setState('sign_in'); return }
    void loadRequest(nextSession.access_token).catch((caught) => { setError(caught instanceof Error ? caught.message : 'Could not load this authorization request.'); setState('error') })
  }, [configured, sessionId, code])

  const signIn = async (event: FormEvent) => {
    event.preventDefault(); setState('busy'); setError('')
    try { const next = await authRequest({ email: email.trim(), password }); setSession(next); await loadRequest(next.access_token) }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Ledger sign-in failed.'); setState('sign_in') }
  }

  const signInWithGoogle = () => { if (configured) window.location.assign(`${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(currentUrl)}&apikey=${encodeURIComponent(SUPABASE_KEY)}`) }

  const approve = async () => {
    if (!session || !workspaceId) return
    setState('busy'); setError('')
    try {
      const response = await fetch(`${API_BASE}/api/figma-plugin/auth/approve`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ session_id: sessionId, verification_code: code, workspace_id: workspaceId }) })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload?.error || 'Ledger could not approve plugin access.')
      setState('approved')
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Ledger could not approve plugin access.'); setState('error') }
  }

  if (state === 'loading') return null
  if (state === 'approved') return <IntegrationCallbackSuccess sourceName="Figma" sourceIcon="/Figma-logo.svg" title="Figma successfully authenticated" description="Your Ledger workspace is connected. Return to Figma to continue." closeAfterSeconds={5} />
  if (state === 'error') return <IntegrationCallbackSuccess status="error" sourceName="Figma" sourceIcon="/Figma-logo.svg" title="Figma authorization needs attention" description={error || 'This authorization request could not be completed. Return to Ledger and try again.'} />

  if (state === 'sign_in') return <main className="min-h-dvh bg-[#080808] px-5 py-8 text-white sm:px-8"><section className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[460px] items-center justify-center"><div className="w-full rounded-[14px] border border-[#242424] bg-[#141414] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.34)]"><img src="/assets/logos/logo.svg" alt="Ledger" className="h-10 w-10" /><p className="mt-6 text-[13px] text-[#979797]">Ledger authorization</p><h1 className="mt-2 text-[27px] font-semibold tracking-[-0.025em]">Connect Ledger to Figma</h1><p className="mt-3 text-[15px] leading-6 text-[#979797]">Sign in to choose the workspace this plugin can access.</p><form className="mt-7 space-y-3" onSubmit={(event) => void signIn(event)}><input required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 w-full rounded-lg border border-[#363636] bg-[#1b1b1b] px-4 text-[15px] text-white outline-none placeholder:text-[#777]" /><input required type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 w-full rounded-lg border border-[#363636] bg-[#1b1b1b] px-4 text-[15px] text-white outline-none placeholder:text-[#777]" /><button className="ledger-button h-11 w-full bg-ledger-accent px-5 text-[15px] font-semibold text-white" type="submit">Continue</button><button className="ledger-button h-11 w-full border border-[#363636] bg-[#202020] px-5 text-[15px] font-semibold text-white" type="button" onClick={signInWithGoogle}>Continue with Google</button></form></div></section></main>

  return <main className="min-h-dvh bg-[#080808] px-5 py-8 text-white sm:px-8"><section className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[710px] items-center justify-center"><div className="w-full rounded-[14px] border border-[#242424] bg-[#141414] px-6 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:px-11"><div className="flex items-center justify-center gap-5"><div className="flex h-[78px] w-[78px] items-center justify-center rounded-[16px] border border-[#292929] bg-[#191919] p-4"><img src="/Figma-logo.svg" alt="Figma logo" className="max-h-full max-w-full" /></div><span className="text-[30px] text-[#9b9b9b]" aria-hidden="true">↔</span><div className="flex h-[78px] w-[78px] items-center justify-center rounded-[16px] border border-[#292929] bg-[#191919] p-4"><img src="/assets/logos/logo.svg" alt="Ledger logo" className="h-full w-full" /></div></div><h1 className="mt-8 text-[26px] font-semibold tracking-[-0.025em]">Figma is requesting access</h1><p className="mt-2 text-[15px] text-[#979797]">Select a workspace to authenticate</p><div className="mt-9 text-left"><p className="mb-2 text-[15px] font-medium text-[#979797]">Workspace to connect</p><select value={workspaceId} onChange={(event) => setWorkspaceId(event.target.value)} disabled={state === 'busy' || !request?.workspaces.length} className="h-[82px] w-full rounded-lg border border-[#292929] bg-[#1b1b1b] px-4 text-[16px] text-white outline-none disabled:opacity-60">{request?.workspaces.map((workspace) => <option key={workspace.id} value={workspace.id}>{workspace.name}{workspace.is_personal ? ` · ${email || 'Personal workspace'}` : ''}</option>)}</select>{!request?.workspaces.length && <p className="mt-3 text-sm text-[#f0a45d]">You do not have a Ledger workspace available for this connection.</p>}</div><button type="button" disabled={state === 'busy' || !workspaceId} onClick={() => void approve()} className="ledger-button mt-7 h-11 min-w-[220px] bg-[#202020] px-6 text-sm font-semibold text-white ring-1 ring-[#363636] hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-50">{state === 'busy' ? 'Connecting…' : 'Approve connection'}</button></div></section></main>
}
