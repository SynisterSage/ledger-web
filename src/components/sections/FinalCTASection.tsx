import { ActionButton } from '../ui/ActionButton'

export function FinalCTASection() {
  return (
    <section className="bg-(--ledger-surface-card) px-6 py-24 sm:px-8 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-(--ledger-text-primary) sm:text-[54px] lg:text-[62px]">
            Ready to run your day with less friction?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:mt-10 sm:flex-row sm:gap-3">
            <ActionButton href="/download">
              Download Ledger
            </ActionButton>
            <ActionButton
              href="/help/contact-support"
              variant="secondary"
            >
              Contact
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}
