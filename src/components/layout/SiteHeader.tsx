import { useEffect, useRef, useState } from 'react'

type SiteHeaderProps = {
  currentPath?: string
}

const primaryLinks = [
  { href: '/about', label: 'Product' },
  { href: '/sidebar', label: 'Mobile' },
  { href: '/help', label: 'Help' },
]

const secondaryLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/about', label: 'About' },
]

const actions = [
  { href: '/about', label: 'Log in', kind: 'ghost' as const },
  { href: '/download', label: 'Get Ledger', kind: 'primary' as const },
]

const navLinkClass = (isActive: boolean) =>
  `site-nav__link inline-flex items-center rounded-full px-3 py-2 text-[13px] font-medium leading-none tracking-[-0.01em] transition-colors duration-200 sm:px-3.5 sm:text-sm ${
    isActive
      ? 'bg-[color:var(--ledger-header-pill-active)] text-[color:var(--ledger-header-text)]'
      : 'text-[color:var(--ledger-header-text-muted)] hover:bg-[color:var(--ledger-header-pill)] hover:text-[color:var(--ledger-header-text)]'
  }`

export function SiteHeader({ currentPath = '/' }: SiteHeaderProps) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : currentPath
  const rafId = useRef<number | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.scrollY > 12
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current)
      }

      rafId.current = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 12
        setIsScrolled((current) => (current === nextScrolled ? current : nextScrolled))
        rafId.current = null
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  return (
    <header
      className={`site-nav site-header-enter px-6 sm:px-8 ${isScrolled ? 'site-nav--scrolled' : ''} ${isMenuOpen ? 'site-nav--menu-open' : ''}`}
    >
      <div aria-hidden="true" className="site-nav__underline" />

      <div className="site-nav__shell mx-auto w-full">
        <div className="site-nav__inner flex items-center gap-4">
          <a href="/" className="site-nav__brand inline-flex min-w-max items-center gap-2 rounded-full leading-none">
            <img src="/assets/logos/logo.svg" alt="" className="h-[28px] w-auto sm:h-[29px]" />
            <span className="relative top-[2px] text-[19px] font-medium tracking-[-0.02em] text-[color:var(--ledger-header-text)]">
              Ledger
            </span>
          </a>

          <div className="ml-auto flex items-center gap-3">
            <nav className="site-nav__links hidden items-center gap-0.5 lg:flex">
              {primaryLinks.map((item) => {
                const isActive = item.href === pathname
                return (
                  <a key={item.label} href={item.href} aria-current={isActive ? 'page' : undefined} className={navLinkClass(isActive)}>
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <span aria-hidden="true" className="site-nav__divider hidden lg:block" />

            <div className="site-nav__actions hidden items-center gap-1.5 md:flex">
              {actions.map((action) =>
                action.kind === 'primary' ? (
                  <a
                    key={action.label}
                    href={action.href}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-ledger-accent px-4.5 text-[13px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
                  >
                    Download
                  </a>
                ) : (
                  <a
                    key={action.label}
                    href={action.href}
                    className="inline-flex h-9 items-center justify-center rounded-full px-3 text-[13px] font-medium leading-none text-[color:var(--ledger-header-text-muted)] transition-colors duration-200 hover:bg-[color:var(--ledger-header-pill)] hover:text-[color:var(--ledger-header-text)]"
                  >
                    {action.label}
                  </a>
                ),
              )}
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="site-nav__menu-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--ledger-header-border)] bg-[color:var(--ledger-header-pill)] text-[color:var(--ledger-header-text)] transition-colors duration-200 hover:bg-[color:var(--ledger-header-pill-active)] lg:hidden"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M5 7.5h14M5 12h14M5 16.5h14"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`site-nav__mobile-sheet lg:hidden ${isMenuOpen ? 'is-open' : ''}`}>
        <nav className="site-nav__mobile-links">
          {primaryLinks.map((item) => {
            const isActive = item.href === pathname
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`site-nav__mobile-link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="site-nav__mobile-bottom">
          <div className="site-nav__mobile-panel">
            <div className="site-nav__mobile-panel-title">More</div>
            <div className="site-nav__mobile-panel-list">
              {secondaryLinks.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-panel-link">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="site-nav__mobile-meta">
            <a href="/about" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-meta-link">
              Log in
            </a>
            <a href="/download" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-cta">
              Download app
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!isMenuOpen}
        className={`site-nav__mobile-backdrop lg:hidden ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  )
}
