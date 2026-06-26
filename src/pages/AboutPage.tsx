import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

import { SiteHeader } from '../components/layout/SiteHeader'

export function AboutPage() {
  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-dhv">
      <SiteHeader currentPath="/about" />
      <main className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">About Ledger</h1>
        <p className="mt-4 text-lg text-ledger-text-muted">
          Ledger is a lightweight sidebar companion for makers and small teams to capture, organize, and execute work in one flow.
        </p>
      </main>
    </div>
  )
}
