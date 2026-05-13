import { SiteHeader } from '../components/layout/SiteHeader'

export function AboutPage() {
  return (
    <div className="min-h-screen">
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
