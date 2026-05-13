import { useEffect, useRef } from 'react'

export function DesktopCompanionSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        sectionEl.querySelectorAll<HTMLElement>('[data-reveal-desktop]').forEach((el) => {
          el.classList.add('is-visible')
        })
        observer.disconnect()
      },
      { threshold: 0.16, rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [])

  const benefits = [
    {
      title: 'Dock it beside your work',
      description: 'Keep Ledger next to the apps you already use.',
    },
    {
      title: 'Capture without switching',
      description: 'Add notes, tasks, projects, and events while staying in flow.',
    },
    {
      title: "Hide it when you're done",
      description: 'Collapse the sidebar and bring it back when you need it.',
    },
  ]

  return (
    <section ref={sectionRef} className="bg-white px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-275">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <div
            data-reveal-desktop
            className="feature-reveal reveal-left"
            style={{ transitionDelay: '80ms' }}
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Desktop-first
            </div>
            <h2 className="mt-4 text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-gray-900 sm:text-[42px]">
              Not another tab to manage.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-gray-600">
              Ledger lives on your desktop so your notes, tasks, projects, and daily check-ins stay close without pulling you into another crowded workspace.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                data-reveal-desktop
                className="feature-reveal reveal-right flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
                style={{ transitionDelay: `${180 + index * 90}ms` }}
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ledger-accent" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
