import { useEffect, useRef } from 'react'

export function FeatureShowcaseTwo() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        sectionEl.querySelectorAll<HTMLElement>('[data-reveal-two]').forEach((el) => {
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
      aria-label="Feature showcase: Planning"
      className="relative bg-[var(--ledger-surface)] px-6 pb-18 pt-20 sm:px-8 sm:pt-22"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
          <h2
            data-reveal-two
            className="feature-reveal reveal-right text-[42px] font-normal leading-[1.08] tracking-[-0.03em] text-ledger-text sm:text-[52px]"
            style={{ transitionDelay: '70ms' }}
          >
            Turn ideas into
            <br />
            a plan
          </h2>

          <div
            data-reveal-two
            className="feature-reveal reveal-left pt-2"
            style={{ transitionDelay: '150ms' }}
          >
            <p className="max-w-105 text-[18px] font-normal leading-normal text-ledger-text">
              Create projects, add tasks, and schedule follow-ups before scattered thoughts disappear into another tab.
            </p>
            <a
              href="/features"
              className="mt-8 inline-flex text-[20px] font-light leading-none text-ledger-text/48 transition-colors hover:text-ledger-text/70"
            >
              2.0 Planning →
            </a>
          </div>
        </div>

        <div className="relative mt-12">
          <img
            data-reveal-two
            src="/assets/mockups/feature2.png"
            alt="Ledger planning workspace"
            className="feature-reveal reveal-up mx-auto w-[82%]"
            style={{ transitionDelay: '240ms' }}
          />
          <img
            data-reveal-two
            src="/assets/mockups/feature2.1.png"
            alt="Ledger planning sidebar"
            className="feature-reveal reveal-left absolute left-0 -top-7 w-[26%]"
            style={{ transitionDelay: '320ms' }}
          />
          <img
            data-reveal-two
            src="/assets/mockups/feature2.2.png"
            alt="Ledger project tracker panel"
            className="feature-reveal reveal-right absolute right-[2%] top-5.5 w-[24%]"
            style={{ transitionDelay: '380ms' }}
          />
        </div>
      </div>
    </section>
  )
}
