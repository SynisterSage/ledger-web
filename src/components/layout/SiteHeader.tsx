import { useEffect, useRef, useState } from 'react'

type SiteHeaderProps = {
  currentPath?: '/' | '/download' | '/about'
}

const quickLinks = [
  { href: '/download', label: 'Download' },
  { href: '/about', label: 'Features' },
]

const docsLink = { href: '/about', label: 'Docs' }

const navLinkClass = (isActive: boolean) =>
  `site-nav-link inline-flex items-center rounded-full px-3 py-2 text-[13px] font-medium leading-none tracking-[-0.005em] transition-all duration-200 sm:px-3.5 sm:text-sm ${
    isActive
      ? 'bg-[var(--ledger-surface-muted)] text-[var(--ledger-text-primary)]'
      : 'text-[var(--ledger-text-secondary)] hover:bg-[var(--ledger-surface-muted)] hover:text-[var(--ledger-text-primary)]'
  }`

export function SiteHeader({ currentPath = '/' }: SiteHeaderProps) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : currentPath
  const lastScrollY = useRef(0)
  const rafId = useRef<number | null>(null)
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const animateFrameRef = useRef<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const stepProgress = () => {
      animateFrameRef.current = null

      const current = progressRef.current
      const target = targetProgressRef.current
      const delta = target - current

      if (Math.abs(delta) < 0.01) {
        progressRef.current = target
        setScrollProgress(target)
        return
      }

      const next = current + delta * 0.16
      progressRef.current = next
      setScrollProgress(next)
      animateFrameRef.current = window.requestAnimationFrame(stepProgress)
    }

    const handleScroll = () => {
      if (rafId.current !== null) {
        return
      }

      rafId.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'

        lastScrollY.current = currentScrollY
        targetProgressRef.current = currentScrollY > 8 && direction === 'down' ? 1 : 0
        rafId.current = null

        if (animateFrameRef.current === null) {
          animateFrameRef.current = window.requestAnimationFrame(stepProgress)
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current)
      }
      if (animateFrameRef.current !== null) {
        window.cancelAnimationFrame(animateFrameRef.current)
      }
    }
  }, [])

  return (
    <header
      className="site-header-enter relative sticky top-0 z-50 transform-gpu overflow-hidden border-b border-transparent transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        backgroundColor:
          scrollProgress === 0
            ? 'var(--ledger-bg)'
            : `color-mix(in srgb, var(--ledger-surface-card) ${88 + scrollProgress * 7}%, transparent)`,
        backdropFilter: scrollProgress > 0 ? `blur(${8 + scrollProgress * 14}px) saturate(${1 + scrollProgress * 0.18})` : 'none',
        WebkitBackdropFilter:
          scrollProgress > 0 ? `blur(${8 + scrollProgress * 14}px) saturate(${1 + scrollProgress * 0.18})` : 'none',
        boxShadow:
          scrollProgress === 0
            ? 'none'
            : [
                `inset 0 0 0 1px rgba(222, 214, 203, ${0.15 + scrollProgress * 0.75})`,
                `0 1px 0 rgba(0, 0, 0, ${scrollProgress * 0.02})`,
                `0 ${scrollProgress * 12}px ${scrollProgress * 30}px rgba(17, 24, 39, ${scrollProgress * 0.035})`,
              ].join(', '),
        borderBottomColor: `rgba(222, 214, 203, ${scrollProgress * 0.85})`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--ledger-border-subtle)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity: scrollProgress,
          transform: `translateY(${(1 - scrollProgress) * 4}px)`,
        }}
      />
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <div
          className="flex h-[54px] items-center justify-between gap-4 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[58px] sm:gap-6"
          style={{
            transform: `translateY(${-scrollProgress * 1.5}px)`,
            opacity: 0.95 + scrollProgress * 0.05,
          }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
            <a href="/" className="group flex items-center gap-2 rounded-full px-1.5 py-1 leading-none">
              <img src="/assets/logos/logo.svg" alt="" className="h-[24px] w-auto sm:h-[26px]" />
              <span className="translate-y-[4px] text-[24px] font-medium tracking-[-0.01em] text-[var(--ledger-text-primary)] transition-colors duration-200 group-hover:text-ledger-accent">
                Ledger
              </span>
            </a>

            <nav className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              {quickLinks.map((item) => {
                const isActive = item.href === pathname
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={navLinkClass(isActive)}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>
          </div>

          <nav className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={docsLink.href}
              aria-current={docsLink.href === pathname ? 'page' : undefined}
              className={navLinkClass(docsLink.href === pathname)}
            >
              {docsLink.label}
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
