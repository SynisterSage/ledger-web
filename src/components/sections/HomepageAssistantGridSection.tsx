import { useEffect, useRef } from 'react'

import { ArrowRight } from 'lucide-react'

function SharedWorkspaceMockup() {
  return (
    <div className="relative isolate h-full min-h-[320px] overflow-hidden rounded-b-[18px] rounded-t-none bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,rgba(255,255,255,0.52)_100%)] p-3 sm:min-h-[360px] sm:rounded-b-[22px] sm:rounded-t-none sm:p-4 lg:min-h-[500px] lg:rounded-l-none lg:rounded-r-[24px] lg:rounded-t-none lg:rounded-b-none xl:rounded-r-[28px] xl:rounded-t-none xl:rounded-b-none">
      <picture className="absolute inset-0 block overflow-hidden rounded-[inherit]">
        <source media="(min-width: 1024px)" srcSet="/assets/bentobox1/topbentodesktop_4x.webp" />
        <img
          src="/assets/bentobox1/topbentopmobtab_4x.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full rounded-[inherit] object-cover object-center max-[420px]:object-[8%_center]"
        />
      </picture>
    </div>
  )
}

function SearchMockup() {
  return (
    <div className="relative isolate aspect-[5/3] w-full overflow-hidden rounded-b-[20px] rounded-t-none bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,rgba(255,255,255,0.52)_100%)] sm:rounded-b-[24px] lg:aspect-[63/50] lg:rounded-b-[28px]">
      <picture className="absolute inset-0 block overflow-hidden rounded-[inherit]">
        <source media="(min-width: 1024px)" srcSet="/assets/bentobox1/2ndtopbentoboxdesktop_4x.webp" />
        <img
          src="/assets/bentobox1/2ndtopbentoboxmobtab_4x.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full rounded-[inherit] object-cover object-center"
        />
      </picture>
    </div>
  )
}

function WorkspaceFollowsMockup() {
  return (
    <div className="relative isolate aspect-[5/3] w-full overflow-hidden rounded-b-[20px] rounded-t-none bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,rgba(255,255,255,0.52)_100%)] sm:rounded-b-[24px] lg:aspect-[63/50] lg:rounded-b-[28px]">
      <picture className="absolute inset-0 block overflow-hidden rounded-[inherit]">
        <source media="(min-width: 1024px)" srcSet="/assets/bentobox1/3rdtopbentoboxdesktop_4x.webp" />
        <img
          src="/assets/bentobox1/3rdtopbentoboxmobtab_4x.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full rounded-[inherit] object-cover object-center"
        />
      </picture>
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
            className="feature-reveal reveal-up overflow-hidden rounded-[20px] bg-(--ledger-surface-card) sm:rounded-[24px] xl:rounded-[32px] md:col-span-2"
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

                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white transition-colors duration-200 hover:bg-ledger-accent-hover">
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
            className="feature-reveal reveal-left overflow-hidden rounded-[18px] bg-(--ledger-surface-card) sm:rounded-[22px] xl:rounded-[28px]"
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
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white transition-colors duration-200 hover:bg-ledger-accent-hover">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </div>
              </div>
            </div>
            <SearchMockup />
          </article>

          <article
            data-reveal-assistant
            className="feature-reveal reveal-right overflow-hidden rounded-[18px] bg-(--ledger-surface-card) sm:rounded-[22px] xl:rounded-[28px]"
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
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white transition-colors duration-200 hover:bg-ledger-accent-hover">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </div>
              </div>
            </div>
            <WorkspaceFollowsMockup />
          </article>
        </div>
      </div>
    </section>
  )
}
