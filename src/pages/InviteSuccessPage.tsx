import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

const getWorkspaceName = () => {
  const value = new URLSearchParams(window.location.search).get('workspace')?.trim()
  return value || 'this workspace'
}

const OPEN_TARGET_URL = import.meta.env.VITE_LEDGER_OPEN_TARGET_URL?.trim() || '/download'

export function InviteSuccessPage() {
  if (isSiteLocked()) {
    return <LockedSplash />
  }

  const workspaceName = getWorkspaceName()

  return (
    <main className="min-h-screen bg-ledger-bg px-5 py-8 text-ledger-text sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <section className="w-full rounded-[28px] border border-ledger-border bg-ledger-surface px-6 py-7 text-center shadow-[var(--ledger-shadow-soft)]">
          <p className="text-[12px] font-medium text-ledger-text-muted">
            Invite accepted
          </p>
          <h1 className="mt-4 text-[30px] font-semibold leading-tight tracking-tight text-ledger-text">
            Joined {workspaceName}
          </h1>
          <p className="mt-3 text-sm leading-6 text-ledger-text-muted">You’re now a member of this workspace.</p>
          <a
            href={OPEN_TARGET_URL}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-ledger-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-ledger-accent-hover"
          >
            Open Ledger
          </a>
        </section>
      </div>
    </main>
  )
}
