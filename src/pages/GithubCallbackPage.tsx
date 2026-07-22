import { useMemo, useState } from 'react'

const OPEN_LEDGER_URL = 'ledger://settings/integrations?github=success'

export function GithubCallbackPage() {
  const [opened, setOpened] = useState(false)
  const result = useMemo(() => new URLSearchParams(window.location.search).get('github') || 'success', [])
  const isSuccess = result === 'success'

  const openLedger = () => {
    setOpened(true)
    window.location.assign(OPEN_LEDGER_URL)
  }

  return (
    <main className="min-h-dvh bg-ledger-bg px-5 py-8 text-ledger-text sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <section className="w-full rounded-3xl border border-ledger-border bg-ledger-surface px-6 py-7 text-center shadow-(--ledger-shadow-soft)">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-(--ledger-surface-muted)">
            <img src="/github-mark.svg" alt="GitHub" className="h-6 w-6" />
          </div>
          <p className="mt-5 text-[12px] font-medium text-ledger-text-muted">GitHub integration</p>
          <h1 className="mt-3 text-[27px] font-semibold leading-tight tracking-tight">
            {isSuccess ? 'GitHub is connected.' : 'GitHub connection needs attention.'}
          </h1>
          <p className="mt-3 text-sm leading-6 text-ledger-text-muted">
            {isSuccess
              ? 'Open Ledger to finish refreshing your workspace connection and approved repositories.'
              : 'Open Ledger to review the GitHub connection and try again safely.'}
          </p>
          <button
            type="button"
            onClick={openLedger}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-ledger-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-ledger-accent-hover"
          >
            {opened ? 'Opening Ledger…' : 'Open Ledger'}
          </button>
          <a
            href="/download"
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-4 text-sm font-semibold text-ledger-text transition-colors hover:bg-ledger-surface-muted"
          >
            Download Ledger
          </a>
        </section>
      </div>
    </main>
  )
}
