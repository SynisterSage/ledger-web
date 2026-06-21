export function HomepageAssistantGridSection() {
  return (
    <section className="bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,var(--ledger-bg)_100%)] px-6 py-16 text-ledger-text sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <h2 className="mt-3 text-[clamp(2.4rem,4.2vw,4.5rem)] font-normal leading-[0.96] tracking-[-0.05em] text-ledger-text">
            Ledger keeps every workspace connected.
          </h2>
          <p className="mt-4 max-w-3xl text-[17px] leading-7 text-ledger-text-muted sm:text-[18px]">
            Work alone, share with others, search across contexts, and keep your desktop and mobile workspace in sync.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="overflow-hidden rounded-[32px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) shadow-[0_18px_48px_rgba(0,0,0,0.22)] md:col-span-2">
            <div className="grid min-h-[360px] gap-0 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
              <div className="flex flex-col justify-between p-6 sm:p-7">
                <div className="max-w-[28ch]">
                  <p className="text-[12px] font-medium tracking-[-0.01em] text-ledger-text-muted">Shared workspaces</p>
                  <h3 className="mt-3 text-[clamp(1rem,1.25vw,1.25rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ledger-text">
                    Work together without mixing every context.
                  </h3>
                </div>

                <div className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ledger-accent text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                  <span className="text-[22px] leading-none">→</span>
                </div>
              </div>

              <div className="border-t border-(--ledger-border-subtle) bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-4 lg:border-l lg:border-t-0 lg:p-5">
                <div className="flex h-full min-h-[240px] items-center justify-center rounded-[26px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="w-full max-w-[380px] rounded-[24px] border border-white/10 bg-[#f7f2ea] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
                    <div className="space-y-2.5">
                      <div className="h-4 w-24 rounded-full bg-black/10" />
                      <div className="h-3 w-4/5 rounded-full bg-black/8" />
                      <div className="h-3 w-1/2 rounded-full bg-black/8" />
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="h-20 rounded-2xl border border-dashed border-black/10 bg-black/[0.03]" />
                        <div className="h-20 rounded-2xl border border-dashed border-black/10 bg-black/[0.03]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[28px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium tracking-[-0.01em] text-ledger-text-muted">Search</p>
                  <h3 className="mt-3 max-w-[20ch] text-[clamp(0.85rem,0.95vw,1rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ledger-text md:whitespace-nowrap">
                    Search across every context.
                  </h3>
                </div>
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-[15px] leading-none text-white shadow-[0_10px_20px_rgba(0,0,0,0.16)]">
                  →
                </div>
              </div>
            </div>
            <div className="border-t border-(--ledger-border-subtle) bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-3.5">
              <div className="flex min-h-[148px] items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.04] px-3.5">
                <div className="aspect-[360/86] w-full max-w-[360px] rounded-[16px] border border-white/10 bg-[#f7f2ea]/95" />
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[28px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium tracking-[-0.01em] text-ledger-text-muted">Mobile</p>
                  <h3 className="mt-3 max-w-[20ch] text-[clamp(0.85rem,0.95vw,1rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ledger-text md:whitespace-nowrap">
                    Your workspace follows you.
                  </h3>
                </div>
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-[15px] leading-none text-white shadow-[0_10px_20px_rgba(0,0,0,0.16)]">
                  →
                </div>
              </div>
            </div>
            <div className="border-t border-(--ledger-border-subtle) bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-3.5">
              <div className="flex min-h-[148px] items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.04] px-3.5">
                <div className="aspect-[360/86] w-full max-w-[360px] rounded-[16px] border border-white/10 bg-[#f7f2ea]/95" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
