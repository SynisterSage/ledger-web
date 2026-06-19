import { ActionButton } from '../ui/ActionButton'

export function FinalCTASection() {
  return (
    <section className="bg-[var(--ledger-surface-card)] px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h2 className="text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--ledger-text-primary)] sm:text-[48px]">
            Ready to run your day with less friction?
          </h2>
          <ActionButton href="/download" className="mt-8 mx-auto">
            Download Ledger
          </ActionButton>
        </div>
      </div>
    </section>
  )
}
