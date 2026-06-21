export function NotFoundPage() {
  return (
    <main className="min-h-screen bg-ledger-bg text-ledger-text">
      <div className="flex min-h-screen flex-col">
        <div className="flex items-start px-4 py-4 sm:px-6">
          <a href="/" className="inline-flex items-center gap-2 rounded-full px-1.5 py-1 leading-none">
            <img src="/assets/logos/logo.svg" alt="Ledger" className="h-7 w-auto" />
            <span className="relative top-0.5 text-[19px] font-medium tracking-[-0.02em] text-ledger-text">
              Ledger
            </span>
          </a>
        </div>

        <section className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-[28px] font-semibold tracking-[-0.04em] text-ledger-text sm:text-[34px]">
              This page couldn&apos;t be found
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[16px] leading-7 text-ledger-text-muted sm:text-[17px]">
              You may not have access, or the page might have been moved or deleted. Check the link and try again.
            </p>
          </div>
        </section>

        <footer className="px-4 pb-5 sm:px-6">
          <div className="flex items-center justify-center gap-3 text-[13px] text-ledger-text-muted">
            <a href="/" className="transition-colors hover:text-ledger-text">
              What is Ledger?
            </a>
            <span aria-hidden="true">·</span>
            <a href="mailto:ledgerworkspace@gmail.com" className="transition-colors hover:text-ledger-text">
              Message support
            </a>
            <span aria-hidden="true">·</span>
            <a href="/terms" className="transition-colors hover:text-ledger-text">
              Terms
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}
