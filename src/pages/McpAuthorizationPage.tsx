import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type WebSession = { access_token: string; refresh_token?: string; expires_at?: number }
type Workspace = { id: string; name: string; type: 'personal' | 'team' }
type RequestInfo = { client_name: string; resource: string; requested_scopes: string[]; expires_at: string; workspaces: Workspace[] }
type ViewState = 'loading' | 'sign_in' | 'ready' | 'busy' | 'done' | 'error'

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
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY }, body: JSON.stringify(body) })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload?.msg || payload?.error_description || 'Ledger sign-in failed.')
  return payload as WebSession
}

const labels: Record<string, string> = {
  'workspace:read': 'View workspace context', 'projects:read': 'View projects', 'tasks:read': 'View tasks', 'notes:read': 'View notes', 'calendar:read': 'View calendar items', 'daily:read': 'View Today',
  'intake:write': 'Send items to Intake', 'tasks:write': 'Create and update tasks', 'notes:write': 'Create notes', 'daily:write': 'Update Today’s focus', 'projects:write': 'Create projects',
}

export function McpAuthorizationPage({ requestId }: { requestId: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState<WebSession | null>(null)
  const [request, setRequest] = useState<RequestInfo | null>(null)
  const [workspaceId, setWorkspaceId] = useState('')
  const [state, setState] = useState<ViewState>('loading')
  const [error, setError] = useState('')
  const configured = Boolean(SUPABASE_URL && SUPABASE_KEY)

  const loadRequest = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/oauth/authorize/requests/${encodeURIComponent(requestId)}`, { headers: { Authorization: `Bearer ${accessToken}` } })
    const payload = await response.json().catch(() => ({}))
    if (response.status === 401) {
      clearLegacySession()
      setSession(null)
      setError('Your Ledger session expired. Sign in again to continue.')
      setState('sign_in')
      return
    }
    if (!response.ok) throw new Error(payload?.error || 'This authorization request is invalid or expired.')
    setRequest(payload as RequestInfo)
    setWorkspaceId((payload.workspaces?.[0] as Workspace | undefined)?.id || '')
    setState('ready')
  }

  useEffect(() => {
    const nextSession = readOAuthSession()
    clearLegacySession()
    setSession(nextSession)
    if (!configured) { setError('Ledger web authentication is not configured.'); setState('error'); return }
    if (!nextSession) { setState('sign_in'); return }
    void loadRequest(nextSession.access_token).catch((caught) => { setError(caught instanceof Error ? caught.message : 'Could not load this authorization request.'); setState('error') })
  }, [configured, requestId])

  const signIn = async (event: FormEvent) => {
    event.preventDefault(); setState('busy'); setError('')
    try { const nextSession = await authRequest('token?grant_type=password', { email: email.trim(), password }); setSession(nextSession); await loadRequest(nextSession.access_token) }
    catch (caught) { setState('sign_in'); setError(caught instanceof Error ? caught.message : 'Ledger sign-in failed.') }
  }

  const signInWithGoogle = () => { if (configured) window.location.assign(`${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.href.split('#')[0])}&apikey=${encodeURIComponent(SUPABASE_KEY)}`) }

  const finish = async (action: 'approve' | 'deny') => {
    if (!session) return
    setState('busy'); setError('')
    try {
      const response = await fetch(`${API_BASE}/oauth/authorize/requests/${encodeURIComponent(requestId)}/${action}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` }, body: action === 'approve' ? JSON.stringify({ workspace_id: workspaceId }) : '{}' })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload?.error || 'Ledger could not complete this authorization.')
      setState('done')
      if (payload.redirect_uri && /^(?:https?:|ledger:)/i.test(String(payload.redirect_uri))) window.location.assign(payload.redirect_uri)
    } catch (caught) { setState('error'); setError(caught instanceof Error ? caught.message : 'Ledger could not complete this authorization.') }
  }

  if (state === 'loading') return null
  return <main className="min-h-dvh bg-ledger-bg px-6 py-12 text-ledger-text"><section className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-[460px] items-center justify-center"><div className="w-full rounded-[28px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"><img src="/assets/logos/logo.svg" alt="Ledger" className="h-9 w-9" /><p className="mt-5 text-[13px] font-medium text-ledger-text-muted">Ledger authorization</p><h1 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">Connect {request?.client_name || 'an AI client'} to Ledger</h1>
    {state === 'sign_in' ? <><p className="mt-3 text-[15px] leading-7 text-ledger-text-muted">Sign in to review this connection and choose which Ledger workspace it can access.</p><form className="mt-7 space-y-3" onSubmit={(event) => void signIn(event)}><label className="block text-[13px] font-medium text-ledger-text-muted">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-full border border-(--ledger-border-subtle) bg-(--ledger-bg) px-4 text-[15px] outline-none" /></label><label className="block text-[13px] font-medium text-ledger-text-muted">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-full border border-(--ledger-border-subtle) bg-(--ledger-bg) px-4 text-[15px] outline-none" /></label><button className="h-11 w-full rounded-full bg-ledger-accent px-5 text-[15px] font-semibold text-white" type="submit">Continue</button><div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-(--ledger-border-subtle)" /><span className="text-[12px] text-ledger-text-muted">or</span><span className="h-px flex-1 bg-(--ledger-border-subtle)" /></div><button className="h-11 w-full rounded-full border border-(--ledger-border-subtle) px-5 text-[15px] font-semibold" type="button" onClick={signInWithGoogle}>Continue with Google</button></form></> : state === 'ready' && request ? <><p className="mt-3 text-[15px] leading-7 text-ledger-text-muted">Review the workspace and permissions before continuing.</p><div className="mt-6 rounded-2xl bg-(--ledger-surface-muted) p-4"><p className="text-xs font-medium text-ledger-text-muted">Workspace</p><select value={workspaceId} onChange={(event) => setWorkspaceId(event.target.value)} className="mt-2 h-11 w-full rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-3 text-[15px] outline-none">{request.workspaces.map((workspace) => <option key={workspace.id} value={workspace.id}>{workspace.name}</option>)}</select></div><div className="mt-5 space-y-4">{(['read', 'write'] as const).map((kind) => { const scopes = request.requested_scopes.filter((scope) => kind === 'write' ? scope.endsWith(':write') : !scope.endsWith(':write')); return scopes.length ? <div key={kind}><p className="text-xs font-medium text-ledger-text-muted">{kind === 'write' ? 'Can change' : 'Can view'}</p><ul className="mt-2 space-y-2 text-[15px]">{scopes.map((scope) => <li key={scope} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ledger-accent" />{labels[scope] || scope}</li>)}</ul></div> : null })}</div><div className="mt-7 flex gap-3"><button type="button" onClick={() => void finish('deny')} className="h-11 flex-1 rounded-full border border-(--ledger-border-subtle) px-4 text-[15px] font-semibold">Cancel</button><button type="button" disabled={!workspaceId} onClick={() => void finish('approve')} className="h-11 flex-1 rounded-full bg-ledger-accent px-4 text-[15px] font-semibold text-white disabled:opacity-50">Approve connection</button></div></> : <p className="mt-3 text-[15px] leading-7 text-ledger-text-muted">This authorization request is complete. Return to your MCP client.</p>}
    {error && <p className="mt-5 text-sm leading-6 text-red-600" role="alert">{error}</p>}</div></section></main>
}
