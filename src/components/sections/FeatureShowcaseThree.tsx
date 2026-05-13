import { useEffect, useRef } from 'react'

export function FeatureShowcaseThree() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        sectionEl.querySelectorAll<HTMLElement>('[data-reveal-three]').forEach((el) => {
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
      aria-label="Feature showcase: Review"
      className="relative bg-white px-6 pb-24 pt-16 sm:px-8 sm:pt-18"
    >
      <div className="mx-auto w-full max-w-275">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
          <h2
            data-reveal-three
            className="feature-reveal reveal-up text-[42px] font-normal leading-[1.08] tracking-[-0.03em] text-ledger-text sm:text-[52px]"
            style={{ transitionDelay: '60ms' }}
          >
            Close the loop
            <br />
            before tomorrow
          </h2>

          <div
            data-reveal-three
            className="feature-reveal reveal-right pt-2"
            style={{ transitionDelay: '140ms' }}
          >
            <p className="max-w-105 text-[18px] font-normal leading-normal text-ledger-text">
              End the day with a quick check-in that captures what moved, what got blocked, and what needs your attention next.
            </p>
            <a
              href="/review"
              className="mt-8 inline-flex text-[20px] font-light leading-none text-ledger-text/48 transition-colors hover:text-ledger-text/70"
            >
              3.0 Review →
            </a>
          </div>
        </div>

        <div className="relative mt-10">
          <img
            data-reveal-three
            src="/assets/mockups/feature3.3.png"
            alt="Ledger review dashboard"
            className="feature-reveal reveal-left mx-auto w-[84%]"
            style={{ transitionDelay: '240ms' }}
          />
          <img
            data-reveal-three
            src="/assets/mockups/feature3.1.png"
            alt="Ledger upcoming items panel"
            className="feature-reveal reveal-up absolute right-[6%] -top-4.5 w-[24%]"
            style={{ transitionDelay: '320ms' }}
          />
          <img
            data-reveal-three
            src="/assets/mockups/feature3.2.png"
            alt="Ledger daily check-in panel"
            className="feature-reveal reveal-up absolute -bottom-3.5 left-[6%] w-[17%]"
            style={{ transitionDelay: '390ms' }}
          />
        </div>
      </div>
    </section>
  )
}
