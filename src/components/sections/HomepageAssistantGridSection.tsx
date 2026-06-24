import { useEffect, useRef } from 'react'

import { ArrowRight } from 'lucide-react'

function SharedWorkspaceMockup() {
  return (
    <div className="relative isolate h-full min-h-[320px] overflow-hidden rounded-[18px] border border-(--ledger-border-subtle) bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,rgba(255,255,255,0.52)_100%)] p-3 sm:min-h-[360px] sm:rounded-[22px] sm:p-4 lg:min-h-[500px] lg:rounded-l-none lg:rounded-r-[28px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.88),transparent_36%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.58),transparent_30%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(0,0,0,0.02),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.0)_36%,rgba(255,255,255,0.16)_100%)]" />

      <div className="relative h-full">
        <div className="absolute left-[10%] top-[16%] h-[20%] w-[44%] rounded-[22px] border border-white/40 bg-white/35 shadow-[0_20px_40px_rgba(0,0,0,0.08)]" />
        <div className="absolute right-[8%] top-[10%] h-[18%] w-[28%] rounded-[20px] border border-white/30 bg-white/25 shadow-[0_18px_36px_rgba(0,0,0,0.07)]" />
        <div className="absolute left-[16%] bottom-[14%] h-[34%] w-[50%] rounded-[26px] border border-white/50 bg-white/55 shadow-[0_22px_48px_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  )
}

export function HomepageAssistantGridSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        sectionEl.querySelectorAll<HTMLElement>('[data-reveal-assistant]').forEach((el) => {
          el.classList.add('is-visible')
        })
        observer.disconnect()
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[var(--ledger-surface)] px-6 py-14 text-ledger-text sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div data-reveal-assistant className="feature-reveal reveal-up max-w-4xl" style={{ transitionDelay: '70ms' }}>
          <h2 className="mt-3 text-[clamp(2.4rem,4.2vw,4.5rem)] font-normal leading-[0.96] tracking-[-0.05em] text-ledger-text">
            Keep everything connected.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article
            data-reveal-assistant
            className="feature-reveal reveal-up overflow-hidden rounded-[20px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) sm:rounded-[24px] xl:rounded-[32px] md:col-span-2"
            style={{ transitionDelay: '150ms' }}
          >
            <div className="grid min-h-[320px] gap-0 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 max-w-[32ch]">
                    <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Shared workspaces</p>
                    <h3 className="mt-3 text-[clamp(1.15rem,1.45vw,1.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
                      Share work without the mess.
                    </h3>
                  </div>

                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-colors duration-200 hover:bg-ledger-accent-hover">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                </div>
              </div>

              <div className="border-t border-(--ledger-border-subtle) p-0 lg:border-l lg:border-t-0">
                <SharedWorkspaceMockup />
              </div>
            </div>
          </article>

          <article
            data-reveal-assistant
            className="feature-reveal reveal-left overflow-hidden rounded-[18px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) sm:rounded-[22px] xl:rounded-[28px]"
            style={{ transitionDelay: '220ms' }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Search</p>
                  <h3 className="mt-3 max-w-[24ch] text-[clamp(1.1rem,1.25vw,1.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
                    Search across every context.
                  </h3>
                </div>
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-colors duration-200 hover:bg-ledger-accent-hover">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </div>
              </div>
            </div>
            <div className="border-t border-(--ledger-border-subtle) bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-0">
              <div className="flex min-h-[320px] items-stretch justify-stretch overflow-hidden rounded-b-[20px] bg-white/[0.04] sm:min-h-[360px] sm:rounded-b-[24px] lg:min-h-[500px] lg:rounded-b-[28px]">
                <div className="w-full rounded-b-[20px] bg-[#f7f2ea]/95 sm:rounded-b-[24px] lg:rounded-b-[28px]" />
              </div>
            </div>
          </article>

          <article
            data-reveal-assistant
            className="feature-reveal reveal-right overflow-hidden rounded-[18px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) sm:rounded-[22px] xl:rounded-[28px]"
            style={{ transitionDelay: '280ms' }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Mobile</p>
                  <h3 className="mt-3 max-w-[24ch] text-[clamp(1.1rem,1.25vw,1.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
                    Your workspace follows you.
                  </h3>
                </div>
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-colors duration-200 hover:bg-ledger-accent-hover">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </div>
              </div>
            </div>
            <div className="border-t border-(--ledger-border-subtle) bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-0">
              <div className="flex min-h-[320px] items-stretch justify-stretch overflow-hidden rounded-b-[20px] bg-white/[0.04] sm:min-h-[360px] sm:rounded-b-[24px] lg:min-h-[500px] lg:rounded-b-[28px]">
                <div className="w-full rounded-b-[20px] bg-[#f7f2ea]/95 sm:rounded-b-[24px] lg:rounded-b-[28px]" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
