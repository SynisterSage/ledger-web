import { useEffect, useRef } from 'react'

import { ArrowRight } from 'lucide-react'

function AbstractStage({
  tone = 'neutral',
}: {
  tone?: 'neutral' | 'warm' | 'cool'
}) {
  const toneClass =
    tone === 'warm'
      ? 'bg-[linear-gradient(180deg,rgba(255,244,238,0.96)_0%,rgba(246,239,229,0.96)_100%)]'
      : tone === 'cool'
        ? 'bg-[linear-gradient(180deg,rgba(241,244,246,0.96)_0%,rgba(230,233,236,0.96)_100%)]'
        : 'bg-[linear-gradient(180deg,rgba(247,242,234,0.96)_0%,rgba(238,234,228,0.96)_100%)]'

  return <div className={`h-full w-full ${toneClass}`} />
}

const cardShellHeightClass = 'min-h-[420px] sm:min-h-[460px] md:min-h-[520px]'
const wideCardShellHeightClass = 'min-h-[460px] sm:min-h-[500px] md:min-h-[560px]'

function SmallCommandCard({
  label,
  title,
  tone,
}: {
  label: string
  title: string
  tone: 'warm' | 'cool'
}) {
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-[18px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) sm:rounded-[22px] xl:rounded-[28px] ${cardShellHeightClass}`}>
      <div className="p-4 sm:p-5">
        <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">{label}</p>
        <h3 className="mt-3 max-w-[24ch] text-[clamp(1.1rem,1.25vw,1.3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
          {title}
        </h3>
      </div>
      <div className="flex flex-1 border-t border-(--ledger-border-subtle) p-0">
        <div className="flex flex-1 min-h-[300px] items-stretch justify-stretch overflow-hidden rounded-b-[18px] sm:min-h-[340px] sm:rounded-b-[22px] lg:rounded-b-[28px]">
          <AbstractStage tone={tone} />
        </div>
      </div>
    </article>
  )
}

function WideCommandCard() {
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-[20px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) sm:rounded-[24px] xl:rounded-[32px] md:col-span-2 ${wideCardShellHeightClass}`}>
      <div className="flex flex-1 flex-col gap-0 lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
        <div className="flex flex-col justify-between p-6 sm:p-7">
          <div className="max-w-[32ch]">
            <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Command actions</p>
            <h3 className="mt-3 text-[clamp(1.15rem,1.45vw,1.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
              Act on anything from one place.
            </h3>
          </div>

          <div className="mt-8 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ledger-accent text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-colors duration-200 hover:bg-ledger-accent-hover">
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </div>
        </div>

        <div className="flex flex-1 border-t border-(--ledger-border-subtle) p-0 lg:border-l lg:border-t-0">
          <div className="flex flex-1 min-h-[320px] items-stretch justify-stretch overflow-hidden rounded-b-[20px] sm:min-h-[360px] sm:rounded-b-[24px] lg:rounded-b-[28px] lg:rounded-bl-none">
            <AbstractStage tone="neutral" />
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
          <div data-reveal-command className="feature-reveal reveal-left" style={{ transitionDelay: '150ms' }}>
            <SmallCommandCard
              label="Desktop"
              title="Float it or dock it beside your work."
              tone="warm"
            />
          </div>

          <div data-reveal-command className="feature-reveal reveal-right" style={{ transitionDelay: '220ms' }}>
            <SmallCommandCard
              label="Integrations"
              title="Connect the tools already in your flow."
              tone="cool"
            />
          </div>

          <div data-reveal-command className="feature-reveal reveal-up md:col-span-2" style={{ transitionDelay: '290ms' }}>
            <WideCommandCard />
          </div>
        </div>
      </div>
    </section>
  )
}
