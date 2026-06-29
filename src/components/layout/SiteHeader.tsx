import { useEffect, useRef, useState } from 'react'

type SiteHeaderProps = {
  currentPath?: string
}

const productLinks = [
  {
    href: '/features',
    label: 'Features',
    description: 'The main product overview.',
  },
  {
    href: '/features/desktop',
    label: 'Desktop app',
    description: 'Stay beside the work already open.',
  },
  {
    href: '/features/mobile',
    label: 'Mobile app',
    description: 'Capture and check in on the go.',
  },
  {
    href: '/features/browser',
    label: 'Browser extension',
    description: 'Save links, pages, and selected text.',
  },
  {
    href: '/features/integrations',
    label: 'Integrations',
    description: 'Bring outside context into Ledger.',
  },
]

const topLinks = [
  { href: '/download', label: 'Download' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/help', label: 'Help' },
]

const actions = [
  { href: '/help/contact', label: 'Contact', kind: 'ghost' as const },
  { href: '/download', label: 'Download Ledger', kind: 'primary' as const },
]

const navLinkClass = (isActive: boolean) =>
  `site-nav__link inline-flex items-center rounded-full px-3 py-2 text-[13px] font-medium leading-none tracking-[-0.01em] transition-colors duration-200 sm:px-3.5 sm:text-sm ${
    isActive
      ? 'bg-(--ledger-header-pill-active) text-(--ledger-header-text)'
      : 'text-(--ledger-header-text-muted) hover:bg-(--ledger-header-pill) hover:text-(--ledger-header-text)'
  }`

export function SiteHeader({ currentPath = '/' }: SiteHeaderProps) {
  const pathname =
    (typeof window !== 'undefined' ? window.location.pathname : currentPath).replace(/\/$/, '').replace(/\.html$/, '') ||
    '/'
  const rafId = useRef<number | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const productDropdownRef = useRef<HTMLDivElement | null>(null)
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.scrollY > 12
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductOpen, setIsProductOpen] = useState(false)

  const isProductActive = pathname === '/' || pathname.startsWith('/features')
  const isHelpActive = pathname === '/help' || pathname.startsWith('/help/')

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

  useEffect(() => {
    if (!isProductOpen) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (productDropdownRef.current?.contains(event.target as Node)) {
        return
      }

      setIsProductOpen(false)
    }

    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isProductOpen])

  return (
    <header
      className={`site-nav site-header-enter px-6 sm:px-8 ${isScrolled ? 'site-nav--scrolled' : ''} ${isMenuOpen ? 'site-nav--menu-open' : ''}`}
    >
      <div aria-hidden="true" className="site-nav__underline" />

      <div className="site-nav__shell mx-auto w-full">
        <div className="site-nav__inner flex items-center gap-4">
          <a href="/" className="site-nav__brand inline-flex min-w-max items-center rounded-full leading-none" aria-label="Ledger home">
            <img src="/assets/logos/logo.svg" alt="" className="h-7 w-auto sm:h-7.25" />
          </a>

          <div className="ml-auto flex items-center gap-3">
            <nav className="site-nav__links hidden items-center gap-0.5 lg:flex">
              <div
                ref={productDropdownRef}
                className="site-nav__product"
                onPointerEnter={() => setIsProductOpen(true)}
                onPointerLeave={() => setIsProductOpen(false)}
                onFocus={() => setIsProductOpen(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsProductOpen(false)
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={isProductOpen}
                  aria-haspopup="menu"
                  className={`${navLinkClass(isProductActive)} gap-1.5`}
                  onClick={() => setIsProductOpen((current) => !current)}
                >
                  Product
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M4.75 6.25 8 9.5l3.25-3.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </button>

                <div className={`site-nav__product-menu ${isProductOpen ? 'is-open' : ''}`} role="menu">
                  {productLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      aria-current={item.href === pathname ? 'page' : undefined}
                      className={`site-nav__product-link ${item.href === pathname ? 'is-active' : ''}`}
                      onClick={() => setIsProductOpen(false)}
                    >
                      <span className="site-nav__product-link-label">{item.label}</span>
                      <span className="site-nav__product-link-description">{item.description}</span>
                    </a>
                  ))}
                </div>
              </div>

              {topLinks.map((item) => {
                const isActive = item.href === pathname || (item.href === '/help' && isHelpActive)
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
                    {action.label}
                  </a>
                ) : (
                  <a
                    key={action.label}
                    href={action.href}
                    className="inline-flex h-9 items-center justify-center rounded-full px-3 text-[13px] font-medium leading-none text-(--ledger-header-text-muted) transition-colors duration-200 hover:bg-(--ledger-header-pill) hover:text-(--ledger-header-text)"
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
              className="site-nav__menu-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--ledger-header-border) bg-(--ledger-header-pill) text-(--ledger-header-text) transition-colors duration-200 hover:bg-(--ledger-header-pill-active) lg:hidden"
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
          <div className="site-nav__mobile-group">
            <div className="site-nav__mobile-group-title">Product</div>
            <div className="site-nav__mobile-group-list">
              {productLinks.map((item) => {
                const isActive = item.href === pathname
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`site-nav__mobile-product-link ${isActive ? 'is-active' : ''}`}
                  >
                    <span>{item.label}</span>
                    <span>{item.description}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {topLinks.map((item) => {
            const isActive = item.href === pathname || (item.href === '/help' && isHelpActive)
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

          <a
            href="/help/contact"
            onClick={() => setIsMenuOpen(false)}
            aria-current={pathname === '/help/contact' ? 'page' : undefined}
            className={`site-nav__mobile-link ${pathname === '/help/contact' ? 'is-active' : ''}`}
          >
            Contact
          </a>
        </nav>

        <div className="site-nav__mobile-bottom">
          <div className="site-nav__mobile-panel">
            <div className="site-nav__mobile-panel-title">Legal</div>
            <div className="site-nav__mobile-panel-list">
              {[
                { href: '/privacy', label: 'Privacy' },
                { href: '/terms', label: 'Terms' },
              ].map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-panel-link">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="site-nav__mobile-meta">
            <a href="/help/contact" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-meta-link">
              Contact
            </a>
            <a href="/download" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-cta">
              Download Ledger
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
