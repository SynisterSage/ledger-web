import { SiteHeader } from '../components/layout/SiteHeader'

export function SidebarPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader currentPath="/" />
      <main className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Sidebar</h1>
        <p className="mt-4 text-lg text-ledger-text-muted">
          Sidebar feature page scaffold. We can now design this section-specific page next.
        </p>
      </main>
    </div>
  )
}

