import { useEffect, useMemo, useState } from 'react'

type InvitePayload = {
  status?: string
  invitation?: {
    workspace_name?: string | null
    role?: string | null
    expires_at?: string | null
    invited_by?: {
      id?: string | null
      email?: string | null
      full_name?: string | null
    } | null
  }
}

const API_BASE = import.meta.env.VITE_API_URL?.trim() || 'https://api.ledgerworkspace.com'
const DOWNLOAD_URL = '/download'

const getInviteToken = () => {
  const path = window.location.pathname.split('/').filter(Boolean)
  const token = path[0] === 'invite' ? path[1] : null
  return token?.trim() || new URLSearchParams(window.location.search).get('token')?.trim() || ''
}

const formatExpiry = (value?: string | null) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function InviteLandingPage() {
  const token = useMemo(() => getInviteToken(), [])
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [invite, setInvite] = useState<InvitePayload['invitation'] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setState('error')
      setErrorMessage('This invite is invalid or expired.')
      return
    }

    let cancelled = false

    const loadInvite = async () => {
      try {
        setState('loading')
        setErrorMessage(null)

        const response = await fetch(`${API_BASE}/api/invitations/${encodeURIComponent(token)}`)
        const payload = (await response.json().catch(() => ({}))) as InvitePayload

        if (cancelled) return

        if (!response.ok) {
          setState('error')
          setErrorMessage('This invite is invalid or expired.')
          return
        }

        setInvite(payload.invitation ?? null)
        setState('ready')
      } catch {
        if (cancelled) return
        setState('error')
        setErrorMessage('This invite is invalid or expired.')
      }
    }

    void loadInvite()

    return () => {
      cancelled = true
    }
  }, [token])

  const workspaceName = invite?.workspace_name?.trim() || 'this workspace'
  const inviterName =
    invite?.invited_by?.full_name?.trim() ||
    invite?.invited_by?.email?.trim() ||
    'your team'
  const expiryLabel = formatExpiry(invite?.expires_at)

  return (
    <main className="min-h-screen bg-ledger-bg px-5 py-8 text-ledger-text sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center justify-center">
        <section className="w-full rounded-[28px] border border-ledger-border bg-ledger-surface px-6 py-7 shadow-[0_16px_48px_rgba(17,24,39,0.08)] sm:px-8 sm:py-8">
          {state === 'loading' && (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ledger-text-muted">
                Invite
              </p>
              <div className="mt-4 h-9 w-4/5 rounded-2xl bg-ledger-border/40" />
              <div className="mt-3 h-5 w-3/5 rounded-2xl bg-ledger-border/30" />
              <div className="mt-8 space-y-3">
                <div className="h-11 w-full rounded-2xl bg-ledger-border/25" />
                <div className="h-11 w-full rounded-2xl bg-ledger-border/20" />
              </div>
            </>
          )}

          {state === 'error' && (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ledger-text-muted">
                Invite unavailable
              </p>
              <h1 className="mt-4 text-[30px] font-semibold leading-tight tracking-tight text-ledger-text">
                {errorMessage ?? 'This invite is invalid or expired.'}
              </h1>
              <p className="mt-3 text-sm leading-6 text-ledger-text-muted">
                Ask the workspace owner to send you a fresh invite link.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={DOWNLOAD_URL}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-ledger-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-ledger-accent-hover"
                >
                  Download Ledger
                </a>
                <a
                  href={DOWNLOAD_URL}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-ledger-border bg-ledger-surface px-4 text-sm font-semibold text-ledger-text transition-colors hover:bg-ledger-bg"
                >
                  Continue in browser
                </a>
              </div>
            </>
          )}

          {state === 'ready' && invite && (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ledger-text-muted">
                Invitation
              </p>
              <h1 className="mt-4 text-[30px] font-semibold leading-tight tracking-tight text-ledger-text">
                You&apos;ve been invited to join {workspaceName}
              </h1>
              <p className="mt-3 text-sm leading-6 text-ledger-text-muted">
                Invited by {inviterName}
                {expiryLabel ? ` · Expires ${expiryLabel}` : ''}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`ledger://invite/${encodeURIComponent(token)}`}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-ledger-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-ledger-accent-hover"
                >
                  Continue in Ledger
                </a>
                <a
                  href={DOWNLOAD_URL}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-ledger-border bg-ledger-surface px-4 text-sm font-semibold text-ledger-text transition-colors hover:bg-ledger-bg"
                >
                  Download Ledger
                </a>
              </div>

              <p className="mt-4 text-xs leading-5 text-ledger-text-muted">
                If Ledger is already installed, the button will open the app and bring this invite
                in automatically. If not, download Ledger first and sign in there.
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  )
}
