export function LockedSplash() {
  return (
    <main className="min-h-screen bg-ledger-bg">
      <div className="flex min-h-screen items-center justify-center px-6">
        <img
          src="/assets/logos/logo.svg"
          alt="Ledger"
          className="h-20 w-auto select-none sm:h-24"
          draggable={false}
        />
      </div>
    </main>
  )
}