import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { IntegrationCallbackSuccess } from '../components/IntegrationCallbackSuccess'

type Session = { access_token: string; refresh_token?: string; expires_at?: number }
type Workspace = { id: string; name: string; is_personal?: boolean }
type AuthorizationSession = { client_name: string; requested_scopes: string[]; requested_workspace_id?: string | null; status: string }
type UpgradeSession = { client_name: string; current_scopes: string[]; requested_scopes: string[]; status: string }
type Mode = 'authorization' | 'scope-upgrade'
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
  return payload as Session
}

const scopeLabels: Record<string, string> = {
  'workspace:read': 'View workspace context', 'projects:read': 'View projects', 'tasks:read': 'View tasks', 'notes:read': 'View notes', 'calendar:read': 'View calendar items', 'daily:read': 'View daily planning data',
  'intake:write': 'Send items to Intake', 'tasks:write': 'Create and update tasks', 'notes:write': 'Create notes', 'daily:write': 'Update Today’s focus', 'projects:write': 'Create projects',
}

export function McpLegacyAuthorizationPage({ sessionId, code, mode }: { sessionId: string; code: string; mode: Mode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState<Session | null>(null)
  const [request, setRequest] = useState<AuthorizationSession | UpgradeSession | null>(null)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [workspaceId, setWorkspaceId] = useState('')
  const [state, setState] = useState<ViewState>('loading')
  const [error, setError] = useState('')
  const configured = Boolean(SUPABASE_URL && SUPABASE_KEY)
  const isUpgrade = mode === 'scope-upgrade'

  const load = async (accessToken: string) => {
    const endpoint = isUpgrade ? `/api/mcp/scope-upgrades/${encodeURIComponent(sessionId)}` : `/api/mcp/authorization/sessions/${encodeURIComponent(sessionId)}`
    const response = await fetch(`${API_BASE}${endpoint}`, { headers: { Authorization: `Bearer ${accessToken}` } })
    const payload = await response.json().catch(() => ({}))
    if (response.status === 401) { setSession(null); setState('sign_in'); setError('Your Ledger session expired. Sign in again.'); return }
    if (!response.ok) throw new Error(payload?.error || 'This authorization request is invalid or expired.')
    setRequest(payload)
    if (!isUpgrade) {
      const available = await fetch(`${API_BASE}/api/workspaces`, { headers: { Authorization: `Bearer ${accessToken}` } })
      const nextWorkspaces = (await available.json().catch(() => [])) as Workspace[]
      setWorkspaces(nextWorkspaces)
      setWorkspaceId((payload as AuthorizationSession).requested_workspace_id || nextWorkspaces[0]?.id || '')
    }
    setState(payload.status === 'pending' ? 'ready' : 'error')
  }

  useEffect(() => {
    const nextSession = readOAuthSession()
    setSession(nextSession)
    if (!configured) { setError('Ledger web authentication is not configured.'); setState('error'); return }
    if (!nextSession) { setState('sign_in'); return }
    void load(nextSession.access_token).catch((caught) => { setError(caught instanceof Error ? caught.message : 'Could not load this request.'); setState('error') })
  }, [configured, isUpgrade, sessionId])

  const signIn = async (event: FormEvent) => {
    event.preventDefault(); setState('busy'); setError('')
    try { const nextSession = await authRequest({ email: email.trim(), password }); setSession(nextSession); await load(nextSession.access_token) }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Ledger sign-in failed.'); setState('sign_in') }
  }

  const signInWithGoogle = () => {
    if (configured) window.location.assign(`${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.href.split('#')[0])}&apikey=${encodeURIComponent(SUPABASE_KEY)}`)
  }

  const finish = async (action: 'approve' | 'cancel') => {
    if (!session) return
    setState('busy'); setError('')
    const endpoint = isUpgrade
      ? `/api/mcp/scope-upgrades/${action === 'approve' ? 'approve' : 'cancel'}`
      : `/api/mcp/authorization/${action}`
    const body = isUpgrade ? { session_id: sessionId, verification_code: code } : { session_id: sessionId, verification_code: code, ...(action === 'approve' ? { workspace_id: workspaceId } : {}) }
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify(body) })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload?.error || 'Ledger could not complete this authorization.')
      setState(action === 'approve' ? 'approved' : 'error')
      if (action === 'cancel') setError('This authorization request was cancelled.')
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Ledger could not complete this authorization.'); setState('error') }
  }

  if (state === 'loading') return null
  if (state === 'error') return <IntegrationCallbackSuccess status="error" sourceName="MCP authorization" sourceIcon="/assets/logos/logo.svg" title="Authorization needs attention" description={error || 'This authorization request is invalid, expired, or already used.'} />
  const title = isUpgrade ? 'Update AI access' : 'Connect an AI client'
  const readyRequest = request as AuthorizationSession | null
  const upgradeRequest = request as UpgradeSession | null
  const scopes = isUpgrade ? (upgradeRequest?.requested_scopes ?? []) : (readyRequest?.requested_scopes ?? [])

  return <main className="min-h-dvh bg-ledger-bg px-6 py-12 text-ledger-text"><section className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-[460px] items-center justify-center"><div className="w-full rounded-[28px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"><img src="/assets/logos/logo.svg" alt="Ledger" className="h-9 w-9" /><p className="mt-5 text-[13px] font-medium text-ledger-text-muted">Ledger authorization</p><h1 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">{title}</h1>{state === 'sign_in' ? <><p className="mt-3 text-[15px] leading-7 text-ledger-text-muted">Sign in to review this connection and choose what it can access.</p><form className="mt-7 space-y-3" onSubmit={(event) => void signIn(event)}><input required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="ledger-field h-11 w-full border border-(--ledger-border-subtle) bg-(--ledger-bg) px-4 text-[15px]" /><input required type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="ledger-field h-11 w-full border border-(--ledger-border-subtle) bg-(--ledger-bg) px-4 text-[15px]" /><button className="ledger-button h-11 w-full bg-ledger-accent text-[15px] font-semibold text-white" type="submit">Continue</button><button className="ledger-button h-11 w-full border border-(--ledger-border-subtle) text-[15px] font-semibold" type="button" onClick={signInWithGoogle}>Continue with Google</button></form></> : state === 'approved' ? <p className="mt-3 text-[15px] leading-7 text-ledger-text-muted">{isUpgrade ? 'Additional permissions approved.' : 'Connected. Return to your AI client.'}</p> : state === 'ready' ? <><p className="mt-3 text-[15px] leading-7 text-ledger-text-muted"><strong className="text-ledger-text">{request?.client_name || 'This AI client'}</strong> is requesting {isUpgrade ? 'additional access.' : 'access to one Ledger workspace.'}</p>{!isUpgrade && <><label className="mt-6 block text-xs font-medium text-ledger-text-muted" htmlFor="mcp-legacy-workspace">Workspace</label><select id="mcp-legacy-workspace" value={workspaceId} onChange={(event) => setWorkspaceId(event.target.value)} disabled={Boolean(readyRequest?.requested_workspace_id)} className="ledger-field mt-2 h-11 w-full border border-(--ledger-border-subtle) bg-(--ledger-surface) px-3 text-[15px]">{workspaces.map((workspace) => <option key={workspace.id} value={workspace.id}>{workspace.name}</option>)}</select></>}{isUpgrade && <><p className="mt-6 text-xs font-medium text-ledger-text-muted">Additional permissions</p></> }<ul className="mt-3 space-y-2 text-sm text-ledger-text-muted">{scopes.map((scope) => <li key={scope}>• {scopeLabels[scope] || scope}</li>)}</ul><p className="mt-5 rounded-2xl bg-(--ledger-surface-muted) px-4 py-3 text-xs text-ledger-text-muted">Verification code <strong className="ml-1 text-ledger-text">{code}</strong></p><div className="mt-7 flex gap-3"><button type="button" onClick={() => void finish('cancel')} className="ledger-button h-11 flex-1 border border-(--ledger-border-subtle) px-4 text-sm font-semibold">Cancel</button><button type="button" onClick={() => void finish('approve')} disabled={!isUpgrade && !workspaceId} className="ledger-button h-11 flex-1 bg-ledger-accent px-4 text-sm font-semibold text-white disabled:opacity-50">Approve</button></div></> : <p className="mt-3 text-[15px] leading-7 text-ledger-text-muted">Loading authorization request…</p>}</div></section></main>
}
