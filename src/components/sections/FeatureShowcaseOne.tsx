import { useEffect, useRef } from 'react'

export function FeatureShowcaseOne() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        sectionEl.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
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
    <section
      ref={sectionRef}
      aria-label="Feature showcase: Sidebar"
      className="relative z-10 -mt-20 bg-[var(--ledger-surface)] px-6 pb-14 pt-30 sm:-mt-24 sm:px-8 sm:pt-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
          <h2
            data-reveal
            className="feature-reveal reveal-left text-[42px] font-normal leading-[1.08] tracking-[-0.03em] text-ledger-text sm:text-[52px]"
            style={{ transitionDelay: '60ms' }}
          >
            Keep your day
            <br />
            beside your work
          </h2>

          <div
            data-reveal
            className="feature-reveal reveal-right pt-2"
            style={{ transitionDelay: '140ms' }}
          >
            <p className="max-w-105 text-[18px] font-normal leading-normal text-ledger-text">
              Dock Ledger next to the apps you already use, capture thoughts the moment they appear, and get back to work without losing context.
            </p>
            <a
              href="/features/desktop"
              className="mt-8 inline-flex text-[20px] font-light leading-none text-ledger-text/48 transition-colors hover:text-ledger-text/70"
            >
              1.0 Sidebar →
            </a>
          </div>
        </div>

        <div className="relative mt-12">
          <img
            data-reveal
            src="/assets/mockups/feature1.1.png"
            alt="Ledger sidebar workflow"
            className="feature-reveal reveal-up w-full"
            style={{ transitionDelay: '220ms' }}
          />
          <img
            data-reveal
            src="/assets/mockups/feature1.png"
            alt="Ledger module view"
            className="feature-reveal reveal-right absolute -bottom-8 right-0 w-[62%]"
            style={{ transitionDelay: '320ms' }}
          />
        </div>
      </div>
    </section>
  )
}
