import { useEffect, useMemo, useState } from 'react'

type InvitePayload = {
  status?: string
  invitation?: {
    id?: string | null
    workspace_id?: string | null
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

type ViewState = 'loading' | 'ready' | 'opening' | 'joined' | 'error'

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

const LedgerMark = ({ className = '' }: { className?: string }) => (
  <img
    src="/assets/logos/logo.svg"
    alt=""
    aria-hidden="true"
    className={`h-7 w-7 shrink-0 ${className}`}
  />
)

export function InviteLandingPage() {
  const token = useMemo(() => getInviteToken(), [])
  const [state, setState] = useState<ViewState>(() => (token ? 'loading' : 'error'))
  const [invite, setInvite] = useState<InvitePayload['invitation'] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    token ? null : 'This invite is invalid or expired.',
  )
  const [openRequested, setOpenRequested] = useState(false)

  useEffect(() => {
    if (!token) {
      return
    }

    let cancelled = false

    const loadInvite = async ({ silent = false }: { silent?: boolean } = {}) => {
      try {
        if (!silent) {
          setState((current) => (current === 'opening' || current === 'joined' ? current : 'loading'))
        }
        setErrorMessage(null)

        const response = await fetch(`${API_BASE}/api/invitations/${encodeURIComponent(token)}`)
        const payload = (await response.json().catch(() => ({}))) as InvitePayload

        if (cancelled) return

        if (response.ok) {
          const nextInvite = payload.invitation ?? null
          setInvite(nextInvite)

          if (payload.status === 'accepted') {
            setState('joined')
            setOpenRequested(false)
            return
          }

          if (payload.status === 'expired') {
            setState('error')
            setErrorMessage('This invite is invalid or expired.')
            return
          }

          setState((current) => (current === 'opening' ? 'opening' : 'ready'))
          return
        }

        if (payload.status === 'accepted' && payload.invitation) {
          setInvite(payload.invitation)
          setState('joined')
          setOpenRequested(false)
          return
        }

        setState('error')
        setErrorMessage('This invite is invalid or expired.')
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

  useEffect(() => {
    if (!token || !openRequested || state === 'joined' || state === 'error') return

    let cancelled = false
    const poll = async () => {
      if (cancelled) return
      try {
        const response = await fetch(`${API_BASE}/api/invitations/${encodeURIComponent(token)}`)
        const payload = (await response.json().catch(() => ({}))) as InvitePayload

        if (cancelled) return

        if (response.ok && payload.invitation) {
          setInvite(payload.invitation)
          if (payload.status === 'accepted') {
            setState('joined')
            setOpenRequested(false)
            return
          }
        }

        if (!response.ok || payload.status === 'expired') {
          setState('error')
          setErrorMessage('This invite is invalid or expired.')
        }
      } catch {
        if (cancelled) return
      }
    }

    void poll()
    const intervalId = window.setInterval(poll, 2000)
    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [openRequested, state, token])

  const workspaceName = invite?.workspace_name?.trim() || 'this workspace'
  const inviterName =
    invite?.invited_by?.full_name?.trim() ||
    invite?.invited_by?.email?.trim() ||
    'your team'
  const expiryLabel = formatExpiry(invite?.expires_at)

  const openLedger = () => {
    setOpenRequested(true)
    setState('opening')
    window.location.assign(`ledger://invite/${encodeURIComponent(token)}`)
  }

  return (
    <main className="min-h-screen bg-ledger-bg px-5 py-8 text-ledger-text sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center justify-center">
        <section className="w-full rounded-3xl border border-ledger-border bg-ledger-surface px-6 py-7 shadow-(--ledger-shadow-soft) sm:px-8 sm:py-8">
          {state === 'loading' && (
            <>
              <p className="text-[12px] font-medium text-ledger-text-muted">
                Invitation
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
              <p className="text-[12px] font-medium text-ledger-text-muted">
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

          {state === 'joined' && (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-ledger-border bg-ledger-bg">
                <LedgerMark className="h-8 w-8" />
              </div>
              <p className="mt-6 text-[12px] font-medium text-ledger-text-muted">
                Joined
              </p>
              <h1 className="mt-3 text-[32px] font-semibold leading-tight tracking-tight text-ledger-text">
                {workspaceName}
              </h1>
              <p className="mt-3 text-sm leading-6 text-ledger-text-muted">
                You&apos;re in. Open Ledger to continue.
              </p>
              <a
                href={`ledger://invite/${encodeURIComponent(token)}`}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-2xl bg-ledger-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-ledger-accent-hover"
              >
                Open Ledger
              </a>
            </div>
          )}

          {(state === 'ready' || state === 'opening') && invite && (
            <>
              <div className="flex items-center gap-3">
                <LedgerMark className="h-8 w-8" />
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-ledger-text-muted">
                    Invitation
                  </p>
                  <h1 className="mt-2 text-[30px] font-semibold leading-tight tracking-tight text-ledger-text">
                    You&apos;ve been invited to join {workspaceName}
                  </h1>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-ledger-text-muted">
                Invited by {inviterName}
                {expiryLabel ? ` · Expires ${expiryLabel}` : ''}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openLedger}
                  disabled={state === 'opening'}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-ledger-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-ledger-accent-hover disabled:cursor-default disabled:opacity-80"
                >
                  {state === 'opening' ? 'Waiting for Ledger…' : 'Continue in Ledger'}
                </button>
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
              </p>            </>
          )}
        </section>
      </div>
    </main>
  )
}
