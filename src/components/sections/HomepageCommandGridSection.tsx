import { useEffect, useRef, useState } from 'react'

import { ArrowRight } from 'lucide-react'

const desktopCommandFrames = [
  '/assets/bentobox2/3rdbottombentoboxdesktop1_4x.webp',
  '/assets/bentobox2/3rdbottombentoboxdesktop2_4x.webp',
  '/assets/bentobox2/3rdbottombentoboxdesktop3_4x.webp',
]

const integrationsDesktopSrc = '/assets/bentobox2/2ndtopbentoboxdesktop_4x.webp'
const integrationsMobileSrc = '/assets/bentobox2/2ndtopbentoboxmobtab_4x.webp'
const commandActionsDesktopSrc = '/assets/bentobox2/topbentoboxdesktop_4x.webp'
const commandActionsMobileSrc = '/assets/bentobox2/topbentoboxmobtab_4x.webp.webp'

function DesktopCommandBentoMockup() {
  const frameIndexRef = useRef(0)
  const intervalRef = useRef<number | null>(null)
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    desktopCommandFrames.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktopQuery = window.matchMedia('(min-width: 1024px)')

    const stop = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    const start = () => {
      stop()

      if (prefersReducedMotion || !desktopQuery.matches) {
        return
      }

      intervalRef.current = window.setInterval(() => {
        frameIndexRef.current = (frameIndexRef.current + 1) % desktopCommandFrames.length
        setFrameIndex(frameIndexRef.current)
      }, 1200)
    }

    const handleChange = () => {
      start()
    }

    start()
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', handleChange)
    } else {
      desktopQuery.addListener(handleChange)
    }

    return () => {
      stop()
      if (typeof desktopQuery.removeEventListener === 'function') {
        desktopQuery.removeEventListener('change', handleChange)
      } else {
        desktopQuery.removeListener(handleChange)
      }
    }
  }, [])

  return (
    <div className="relative isolate aspect-[5/3] w-full overflow-hidden rounded-b-[20px] rounded-t-none bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,rgba(255,255,255,0.52)_100%)] sm:rounded-b-[24px] lg:aspect-[7/5] lg:rounded-l-none lg:rounded-r-[28px] lg:rounded-bl-none">
      <picture className="absolute inset-0 block overflow-hidden rounded-[inherit]">
        <source media="(min-width: 1024px)" srcSet={desktopCommandFrames[frameIndex]} />
        <img
          src="/assets/bentobox2/3rdbottombentoboxmobtab_4x.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full rounded-[inherit] object-cover object-center max-[620px]:object-[8%_center]"
        />
      </picture>
    </div>
  )
}

function IntegrationsMockup() {
  useEffect(() => {
    ;[integrationsDesktopSrc, integrationsMobileSrc].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return (
    <div className="relative isolate aspect-[5/3] w-full overflow-hidden rounded-b-[20px] rounded-t-none bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,rgba(255,255,255,0.52)_100%)] sm:rounded-b-[24px] lg:aspect-[63/50] lg:rounded-b-[28px]">
      <picture className="absolute inset-0 block overflow-hidden rounded-[inherit]">
        <source media="(min-width: 1024px)" srcSet={integrationsDesktopSrc} />
        <img
          src={integrationsMobileSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-full rounded-[inherit] object-cover object-center"
        />
      </picture>
    </div>
  )
}

function CommandActionsMockup() {
  useEffect(() => {
    ;[commandActionsDesktopSrc, commandActionsMobileSrc].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return (
    <div className="relative isolate aspect-[5/3] w-full overflow-hidden rounded-b-[20px] rounded-t-none bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,rgba(255,255,255,0.52)_100%)] sm:rounded-b-[24px] lg:aspect-[63/50] lg:rounded-b-[28px]">
      <picture className="absolute inset-0 block overflow-hidden rounded-[inherit]">
        <source media="(min-width: 1024px)" srcSet={commandActionsDesktopSrc} />
        <img
          src={commandActionsMobileSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-full rounded-[inherit] object-cover object-center"
        />
      </picture>
    </div>
  )
}

const wideCardShellHeightClass = 'min-h-[360px] sm:min-h-[420px] md:min-h-[520px]'

function WideCommandCard() {
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-[20px] bg-(--ledger-surface-card) sm:rounded-[24px] xl:rounded-[32px] md:col-span-2 ${wideCardShellHeightClass}`}>
      <div className="flex flex-1 flex-col gap-0 lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 max-w-[32ch]">
              <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Desktop</p>
              <h3 className="mt-3 text-[clamp(1.15rem,1.45vw,1.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
                Float it, Dock it.
              </h3>
            </div>

            <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white transition-colors duration-200 hover:bg-ledger-accent-hover">
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </div>
          </div>
        </div>

        <div className="flex flex-1 border-t border-(--ledger-border-subtle) p-0 lg:border-l lg:border-t-0">
          <div className="flex flex-1 items-stretch justify-stretch overflow-hidden rounded-b-[20px] sm:rounded-b-[24px] lg:rounded-b-[28px] lg:rounded-bl-none">
            <DesktopCommandBentoMockup />
          </div>
        </div>
      </div>
    </article>
  )
}

export function HomepageCommandGridSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        sectionEl.querySelectorAll<HTMLElement>('[data-reveal-command]').forEach((el) => {
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
        <div data-reveal-command className="feature-reveal reveal-up max-w-4xl" style={{ transitionDelay: '70ms' }}>
          <h2 className="text-[clamp(2.4rem,4.2vw,4.5rem)] font-normal leading-[0.96] tracking-[-0.05em] text-ledger-text">
            A command layer for work.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article
            data-reveal-command
            className="feature-reveal reveal-left overflow-hidden rounded-[18px] bg-(--ledger-surface-card) sm:rounded-[22px] xl:rounded-[28px]"
            style={{ transitionDelay: '150ms' }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Planning</p>
                  <h3 className="mt-3 max-w-[30ch] text-[clamp(1.1rem,1.25vw,1.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
                    Plan across notes, events, and projects.
                  </h3>
                </div>
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white transition-colors duration-200 hover:bg-ledger-accent-hover">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </div>
              </div>
            </div>
            <div className="border-t border-(--ledger-border-subtle) p-0">
              <CommandActionsMockup />
            </div>
          </article>

          <article
            data-reveal-command
            className="feature-reveal reveal-right overflow-hidden rounded-[18px] bg-(--ledger-surface-card) sm:rounded-[22px] xl:rounded-[28px]"
            style={{ transitionDelay: '220ms' }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Integrations</p>
                  <h3 className="mt-3 max-w-[30ch] text-[clamp(1.1rem,1.25vw,1.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
                    Connect tools you use daily.
                  </h3>
                </div>
                <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white transition-colors duration-200 hover:bg-ledger-accent-hover">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </div>
              </div>
            </div>
            <IntegrationsMockup />
          </article>

          <div data-reveal-command className="feature-reveal reveal-up md:col-span-2" style={{ transitionDelay: '290ms' }}>
            <WideCommandCard />
          </div>
        </div>
      </div>
    </section>
  )
}
