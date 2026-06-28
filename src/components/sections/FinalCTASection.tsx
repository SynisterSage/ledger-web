import { ActionButton } from '../ui/ActionButton'

export function FinalCTASection() {
  return (
    <section className="bg-ledger-surface px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <div className="max-w-[56rem]">
          <h2 className="text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">
            Everything you need. <br /> Right beside your work.
          </h2>
          <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-3 sm:mt-12">
            <ActionButton href="/download" className="h-11 px-6 text-[15px] sm:h-12 sm:px-7 sm:text-[16px]">
              Download Ledger
            </ActionButton>
            <ActionButton
              href="/help/contact-support"
              variant="secondary"
              className="h-11 px-6 text-[15px] sm:h-12 sm:px-7 sm:text-[16px]"
            >
              Contact
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}
