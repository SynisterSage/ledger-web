import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

import { SiteHeader } from '../components/layout/SiteHeader'

export function ReviewPage() {
  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-dhv">
      <SiteHeader currentPath="/" />
      <main className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Review</h1>
        <p className="mt-4 text-lg text-ledger-text-muted">
          Review feature page scaffold. We can design this page section by section next.
        </p>
      </main>
    </div>
  )
}
