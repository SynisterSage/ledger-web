import { SiteHeader } from '../components/layout/SiteHeader'

export function DownloadPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader currentPath="/download" />
      <main className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Download Ledger</h1>
        <p className="mt-4 text-lg text-ledger-text-muted">
          macOS and Windows downloads will be connected here once your release links are ready.
        </p>
      </main>
    </div>
  )
}
