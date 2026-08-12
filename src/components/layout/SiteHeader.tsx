import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, CalendarDays, ChevronDown, FolderKanban, Globe2, Layers3, Link2, Monitor, NotebookPen, Puzzle, Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { integrations } from '../../data/integrations'
import { productAuth } from '../../lib/auth'

type SiteHeaderProps = { currentPath?: string }
type MenuName = 'product' | 'platforms' | 'integrations'
type ProductLink = { href: string; label: string; phrase: string; icon: LucideIcon }

const productLinks: ProductLink[] = [
  { href: '/features/capture', label: 'Capture', phrase: 'Catch the next thing.', icon: ArrowUpRight },
  { href: '/features/notes', label: 'Notes', phrase: 'Keep useful context.', icon: NotebookPen },
  { href: '/features/projects', label: 'Projects', phrase: 'Move work forward.', icon: FolderKanban },
  { href: '/features/calendar', label: 'Calendar', phrase: 'Give work a time.', icon: CalendarDays },
  { href: '/features/connected-work', label: 'Connected work', phrase: 'Bring signals together.', icon: Link2 },
  { href: '/features/workspaces', label: 'Workspaces', phrase: 'Keep work in its place.', icon: Layers3 },
]

const platformLinks = [
  { href: '/platforms/desktop', label: 'Desktop', icon: Monitor },
  { href: '/platforms/web', label: 'Web', icon: Globe2 },
  { href: '/platforms/mobile', label: 'Mobile', icon: Smartphone },
  { href: '/platforms/browser-extension', label: 'Browser extension', icon: Puzzle },
]

const integrationMenuLinks = integrations.filter((integration) => integration.detail)
const productVisuals: Record<string, string> = {
  '/features/capture': '/assets/mockups/feature1.png',
  '/features/notes': '/assets/mockups/feature2.png',
  '/features/projects': '/assets/mockups/feature3.1.png',
}
const featureOverviewLink = { href: '/features', label: 'All features' }
const navLinkClass = (active: boolean) => `site-nav__link inline-flex h-9 items-center rounded-[var(--ledger-control-radius)] px-3 text-[13px] font-medium leading-none transition-colors sm:px-3.5 sm:text-sm ${active ? 'bg-(--ledger-header-pill-active) text-(--ledger-header-text)' : 'text-(--ledger-header-text-muted) hover:bg-(--ledger-header-pill) hover:text-(--ledger-header-text)'}`

export function SiteHeader({ currentPath = '/' }: SiteHeaderProps) {
  const pathname = (typeof window !== 'undefined' ? window.location.pathname : currentPath).replace(/\/$/, '').replace(/\.html$/, '') || '/'
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 12)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null)
  const [pinnedMenu, setPinnedMenu] = useState<MenuName | null>(null)
  const [mobileSection, setMobileSection] = useState<'product' | 'platforms' | 'integrations' | 'legal'>('product')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const rafId = useRef<number | null>(null)
  const isHelpActive = pathname === '/help' || pathname.startsWith('/help/')
  const isOpen = (menu: MenuName) => openMenu === menu || pinnedMenu === menu
  const closeMenu = () => { setOpenMenu(null); setPinnedMenu(null) }
  const menuPointerLeave = (menu: MenuName) => { if (pinnedMenu !== menu) closeMenu() }

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => { setIsScrolled(window.scrollY > 12); rafId.current = null })
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => { window.removeEventListener('scroll', onScroll); if (rafId.current !== null) cancelAnimationFrame(rafId.current) }
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('.site-nav__dropdown-wrap')) closeMenu()
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!isMenuOpen && !openMenu && !pinnedMenu) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (isMenuOpen) { setIsMenuOpen(false); menuButtonRef.current?.focus() }
      if (openMenu || pinnedMenu) { const menu = openMenu || pinnedMenu; closeMenu(); if (menu) document.querySelector<HTMLButtonElement>(`[data-site-nav-trigger="${menu}"]`)?.focus() }
    }
    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = previousOverflow }
  }, [isMenuOpen, openMenu, pinnedMenu])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsMenuOpen(false) }
    window.addEventListener('resize', onResize); return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let mounted = true
    void productAuth.getSession().then((session) => {
      if (mounted) setIsAuthenticated(Boolean(session))
    }).catch(() => {
      if (mounted) setIsAuthenticated(false)
    })
    const subscription = productAuth.onAuthStateChange((_event, session) => {
      if (mounted) setIsAuthenticated(Boolean(session))
    })
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const menuProps = (menu: MenuName) => ({
    onPointerEnter: () => { setOpenMenu(menu); setPinnedMenu((current) => current && current !== menu ? null : current) },
    onFocus: () => { setOpenMenu(menu); setPinnedMenu((current) => current && current !== menu ? null : current) },
    onBlur: (event: React.FocusEvent<HTMLDivElement>) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu((current) => current === menu ? null : current) },
  })

  const triggerProps = (menu: MenuName) => ({
    'data-site-nav-trigger': menu,
    type: 'button' as const,
    'aria-expanded': isOpen(menu),
    'aria-haspopup': 'menu' as const,
    onClick: () => { setPinnedMenu((current) => current === menu ? null : menu); setOpenMenu(menu) },
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== 'ArrowDown' && event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault(); setPinnedMenu(menu); setOpenMenu(menu)
      requestAnimationFrame(() => document.getElementById(`site-nav-${menu}-menu`)?.querySelector<HTMLElement>('[role="menuitem"]')?.focus())
    },
  })

  const moveFocus = (event: React.KeyboardEvent<HTMLElement>, direction: 1 | -1) => {
    const items = Array.from(event.currentTarget.closest('[role="menu"]')?.querySelectorAll<HTMLElement>('[role="menuitem"]') || [])
    if (!items.length) return
    const current = items.indexOf(document.activeElement as HTMLElement)
    items[(current + direction + items.length) % items.length].focus()
  }

  const itemKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); moveFocus(event, 1) }
    if (event.key === 'ArrowUp') { event.preventDefault(); moveFocus(event, -1) }
    if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); const items = Array.from(event.currentTarget.closest('[role="menu"]')?.querySelectorAll<HTMLElement>('[role="menuitem"]') || []); items[event.key === 'Home' ? 0 : items.length - 1]?.focus() }
  }

  const productCard = (item: ProductLink) => {
    const active = pathname === item.href
    return <a key={item.href} href={item.href} role="menuitem" tabIndex={-1} aria-current={active ? 'page' : undefined} className={`site-nav__product-card ${active ? 'is-active' : ''}`} onKeyDown={itemKeyDown} onClick={closeMenu}>
      <span className="site-nav__product-card-visual"><img src={productVisuals[item.href]} alt="" aria-hidden="true" /></span>
      <span className="site-nav__product-card-copy"><span className="site-nav__product-link-label">{item.label}</span><span className="site-nav__product-link-phrase">{item.phrase}</span></span>
    </a>
  }

  const productMenu = <div id="site-nav-product-menu" className={`site-nav__product-menu ${isOpen('product') ? 'is-open' : ''}`} role="menu" aria-label="Product menu" onPointerLeave={() => menuPointerLeave('product')} onKeyDown={(event) => { if (event.key === 'Tab') closeMenu() }}>
    <div className="site-nav__menu-heading"><span>Product</span><a href={featureOverviewLink.href} role="menuitem" tabIndex={-1} onKeyDown={itemKeyDown} onClick={closeMenu}>All features <ArrowUpRight aria-hidden="true" /></a></div>
    <div className="site-nav__product-grid">{productLinks.slice(0, 3).map(productCard)}</div>
    <div className="site-nav__menu-bottom"><span>Capture, organize, and keep work moving.</span><a href="/download" role="menuitem" tabIndex={-1} onKeyDown={itemKeyDown} onClick={closeMenu}>Download Ledger <ArrowUpRight aria-hidden="true" /></a></div>
  </div>

  const platformItem = ({ href, label }: (typeof platformLinks)[number]) => <a key={href} href={href} role="menuitem" tabIndex={-1} onKeyDown={itemKeyDown} onClick={closeMenu}><span>{label}</span></a>
  const platformsMenu = <div id="site-nav-platforms-menu" className={`site-nav__simple-menu site-nav__platforms-menu ${isOpen('platforms') ? 'is-open' : ''}`} role="menu" aria-label="Platforms menu" onPointerLeave={() => menuPointerLeave('platforms')}>
    <div className="site-nav__platform-grid"><div className="site-nav__platform-column"><p>Use Ledger</p>{platformLinks.slice(0, 3).map(platformItem)}</div><div className="site-nav__platform-column"><p>Extend Ledger</p>{platformLinks.slice(3).map(platformItem)}</div></div>
    <a href="/download" role="menuitem" tabIndex={-1} onKeyDown={itemKeyDown} onClick={closeMenu} className="site-nav__menu-footer-link">Download Ledger <ArrowUpRight aria-hidden="true" /></a>
  </div>

  const integrationsMenu = <div id="site-nav-integrations-menu" className={`site-nav__simple-menu site-nav__integrations-menu ${isOpen('integrations') ? 'is-open' : ''}`} role="menu" aria-label="Integrations menu" onPointerLeave={() => menuPointerLeave('integrations')}>
    <div className="site-nav__menu-heading"><span>Connected work</span><a href="/integrations" role="menuitem" tabIndex={-1} onKeyDown={itemKeyDown} onClick={closeMenu}>Directory <ArrowUpRight aria-hidden="true" /></a></div><div className="site-nav__integration-grid">{integrationMenuLinks.map((integration) => <a key={integration.slug} href={`/integrations/${integration.slug}`} role="menuitem" tabIndex={-1} onKeyDown={itemKeyDown} onClick={closeMenu} aria-current={pathname === `/integrations/${integration.slug}` ? 'page' : undefined}>{integration.name}</a>)}</div><a href="/integrations" role="menuitem" tabIndex={-1} onKeyDown={itemKeyDown} onClick={closeMenu} className="site-nav__menu-footer-link">Browse all integrations <ArrowUpRight aria-hidden="true" /></a>
  </div>

  const mobileProduct = <div className={`site-nav__mobile-section-panel site-nav__mobile-product-grid ${mobileSection === 'product' ? 'is-open' : ''}`}>{productLinks.map(({ href, label }) => <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-section-link"><span className="site-nav__mobile-section-link-title">{label}</span></a>)}<a href="/features" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-section-link site-nav__mobile-section-link--compact"><span className="site-nav__mobile-section-link-title">All features</span></a></div>
  const mobilePlatforms = <div className={`site-nav__mobile-section-panel ${mobileSection === 'platforms' ? 'is-open' : ''}`}>{platformLinks.map(({ href, label }) => <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-section-link site-nav__mobile-section-link--compact"><span className="site-nav__mobile-section-link-title">{label}</span></a>)}</div>
  const mobileIntegrations = <div className={`site-nav__mobile-section-panel ${mobileSection === 'integrations' ? 'is-open' : ''}`}><a href="/integrations" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-section-link site-nav__mobile-section-link--compact"><span className="site-nav__mobile-section-link-title">Directory</span></a>{integrationMenuLinks.map((integration) => <a key={integration.slug} href={`/integrations/${integration.slug}`} onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-section-link site-nav__mobile-section-link--compact"><span className="site-nav__mobile-section-link-title">{integration.name}</span></a>)}</div>
  const section = (name: 'product' | 'platforms' | 'integrations' | 'legal', label: string, content: React.ReactNode) => <div className="site-nav__mobile-section"><button type="button" className="site-nav__mobile-section-trigger" aria-expanded={mobileSection === name} onClick={() => setMobileSection((current) => current === name ? 'legal' : name)}><span>{label}</span><ChevronDown aria-hidden="true" className={`site-nav__mobile-section-chevron ${mobileSection === name ? 'is-open' : ''}`} /></button>{content}</div>

  return <header className={`site-nav site-header-enter px-6 sm:px-8 ${isScrolled ? 'site-nav--scrolled' : ''} ${isMenuOpen ? 'site-nav--menu-open' : ''}`}>
    <div aria-hidden="true" className="site-nav__underline" /><div className="site-nav__shell mx-auto w-full"><div className="site-nav__inner flex items-center gap-6">
      <a href="/" className="site-nav__brand inline-flex min-w-max items-center rounded-full leading-none" aria-label="Ledger home"><img src="/assets/logos/logo.svg" alt="" className="h-7 w-auto sm:h-7.25" /></a>
      <div className="site-nav__cluster flex min-w-0 flex-1 items-center gap-3"><nav className="site-nav__links hidden items-center gap-0.5 lg:flex">
        <div className={`site-nav__dropdown-wrap site-nav__product ${isOpen('product') ? 'is-open' : ''}`} {...menuProps('product')}><button className={`${navLinkClass(false)} site-nav__dropdown-trigger ${isOpen('product') ? 'is-open' : ''}`} {...triggerProps('product')}><span>Product</span><ChevronDown aria-hidden="true" className="site-nav__trigger-chevron" /></button>{productMenu}</div>
        <div className={`site-nav__dropdown-wrap site-nav__product ${isOpen('platforms') ? 'is-open' : ''}`} {...menuProps('platforms')}><button className={`${navLinkClass(pathname.startsWith('/platforms'))} site-nav__dropdown-trigger ${isOpen('platforms') ? 'is-open' : ''}`} {...triggerProps('platforms')}><span>Platforms</span><ChevronDown aria-hidden="true" className="site-nav__trigger-chevron" /></button>{platformsMenu}</div>
        <div className={`site-nav__dropdown-wrap site-nav__product ${isOpen('integrations') ? 'is-open' : ''}`} {...menuProps('integrations')}><button className={`${navLinkClass(pathname === '/integrations' || pathname.startsWith('/integrations/'))} site-nav__dropdown-trigger ${isOpen('integrations') ? 'is-open' : ''}`} {...triggerProps('integrations')}><span>Integrations</span><ChevronDown aria-hidden="true" className="site-nav__trigger-chevron" /></button>{integrationsMenu}</div>
        <a href="/help" aria-current={isHelpActive ? 'page' : undefined} className={navLinkClass(isHelpActive)}>Help</a><a href="/pricing" aria-current={pathname === '/pricing' ? 'page' : undefined} className={navLinkClass(pathname === '/pricing')}>Pricing</a>
      </nav><div className="site-nav__actions hidden items-center gap-1.5 md:flex">{isAuthenticated ? <a href="/app" className="ledger-button h-9 rounded-[var(--ledger-control-radius)] bg-ledger-accent px-4.5 text-[13px] font-semibold text-white hover:bg-ledger-accent-hover">Open app</a> : <><a href="/login" className="ledger-button h-9 rounded-[var(--ledger-control-radius)] px-3 text-[13px] font-medium text-(--ledger-header-text-muted) hover:bg-(--ledger-header-pill)">Log in</a><a href="/download" className="ledger-button h-9 rounded-[var(--ledger-control-radius)] bg-ledger-accent px-4.5 text-[13px] font-semibold text-white hover:bg-ledger-accent-hover">Download Ledger</a></>}</div>
      <button ref={menuButtonRef} type="button" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} className="site-nav__menu-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--ledger-header-border) bg-(--ledger-header-pill) lg:hidden" onClick={() => setIsMenuOpen((current) => !current)}>{isMenuOpen ? '×' : '☰'}</button>
      </div></div></div>
    <div className={`site-nav__mobile-sheet lg:hidden ${isMenuOpen ? 'is-open' : ''}`}><nav className="site-nav__mobile-links">{section('product', 'Product', mobileProduct)}{section('platforms', 'Platforms', mobilePlatforms)}{section('integrations', 'Integrations', mobileIntegrations)}<a href="/help" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-direct-link">Help</a>{section('legal', 'Legal', <div className={`site-nav__mobile-section-panel ${mobileSection === 'legal' ? 'is-open' : ''}`}><a href="/privacy" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-section-link site-nav__mobile-section-link--compact"><span className="site-nav__mobile-section-link-title">Privacy</span></a><a href="/terms" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-section-link site-nav__mobile-section-link--compact"><span className="site-nav__mobile-section-link-title">Terms</span></a></div>)}</nav><div className="site-nav__mobile-bottom"><div className="site-nav__mobile-meta"><a href={isAuthenticated ? '/app' : '/login'} onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-meta-link">{isAuthenticated ? 'Open app' : 'Log in'}</a>{!isAuthenticated && <a href="/download" onClick={() => setIsMenuOpen(false)} className="site-nav__mobile-cta">Download Ledger</a>}</div></div></div><div aria-hidden={!isMenuOpen} className={`site-nav__mobile-backdrop lg:hidden ${isMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMenuOpen(false)} />
  </header>
}
