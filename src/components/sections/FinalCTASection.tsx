import { ActionButton } from '../ui/ActionButton'

export function FinalCTASection() {
  return (
    <section className="bg-(--ledger-surface-card) px-6 py-14 sm:px-8 sm:py-18 lg:py-22">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-(--ledger-text-primary) sm:text-[54px] lg:text-[62px]">
            Ready to run your day with less friction?
          </h2>
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:mt-10 sm:gap-3">
            <ActionButton
              href="/download"
              className="h-10 min-w-0 w-auto whitespace-nowrap px-5 text-[14px] sm:h-12 sm:min-w-39 sm:px-7 sm:text-[16px]"
            >
              Download Ledger
            </ActionButton>
            <ActionButton
              href="/help/contact-support"
              variant="secondary"
              className="h-10 min-w-0 w-auto whitespace-nowrap px-5 text-[14px] sm:h-12 sm:min-w-39 sm:px-7 sm:text-[16px]"
            >
              Contact
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}
