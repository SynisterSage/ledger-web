import { useEffect, useMemo, useState } from 'react'
import {
  Bot,
  CalendarDays,
  Code2,
  FolderOpen,
  GitBranch,
  Globe2,
  MessageSquare,
  Palette,
  Puzzle,
  Search,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { integrationCategories, integrations, type Integration, type IntegrationCategory } from '../data/integrations'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SiteFooter } from '../components/sections/SiteFooter'
import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

type DirectoryFilter = 'essentials' | IntegrationCategory

const categoryDescriptions: Record<DirectoryFilter, string> = {
  essentials: 'The connections that bring the most useful context into Ledger.',
  communication: 'Keep conversations and follow-up close to the work.',
  'files-resources': 'Bring files, folders, and external resources into context.',
  development: 'Keep repository activity and development attention connected.',
  design: 'Keep design references attached to the work they inform.',
  calendar: 'See time-bound work and reminders alongside Ledger.',
  automation: 'Extend capture and workspace actions into the tools you use.',
}

const categoryIcons: Record<DirectoryFilter, LucideIcon> = {
  essentials: Star,
  communication: MessageSquare,
  'files-resources': FolderOpen,
  development: Code2,
  design: Palette,
  calendar: CalendarDays,
  automation: Zap,
}

const categoryLabels: Record<DirectoryFilter, string> = {
  essentials: 'Essentials',
  ...Object.fromEntries(integrationCategories.map(({ slug, name }) => [slug, name])) as Record<IntegrationCategory, string>,
}

const availabilityLabels: Partial<Record<Integration['availability'], string>> = {
  'macos-only': 'Mac only',
  partial: 'Limited availability',
  developer: 'For developers',
}

const directoryFilters: DirectoryFilter[] = ['essentials', ...integrationCategories.map(({ slug }) => slug)]

const integrationLogoSources: Record<string, string> = {
  slack: '/slack.svg',
  github: '/github.svg',
  'google-drive': '/drive.svg',
  figma: '/Figma-logo.svg',
  apple: '/apple.svg',
  mcp: '/mpc.svg',
}

function IntegrationLogo({ integration }: { integration: Integration }) {
  const iconByLogo: Record<string, LucideIcon> = {
    slack: MessageSquare,
    'google-drive': FolderOpen,
    github: GitBranch,
    figma: Palette,
    apple: Sparkles,
    calendar: CalendarDays,
    mcp: Bot,
    'browser-extension': Puzzle,
  }
  const Icon = iconByLogo[integration.logo] ?? Globe2
  const logoSource = integrationLogoSources[integration.logo]
  const invertOnDark = integration.logo === 'github' || integration.logo === 'apple' || integration.logo === 'mcp'

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--ledger-radius-sm)] border border-(--ledger-border-subtle) bg-ledger-surface text-ledger-text-muted transition-colors duration-150 group-hover:border-(--ledger-header-border) group-hover:bg-(--ledger-header-pill)" aria-hidden="true">
      {logoSource ? <img src={logoSource} alt="" className={`h-5 w-5 object-contain ${invertOnDark ? 'ledger-invert-on-dark' : ''}`} /> : <Icon size={18} strokeWidth={1.7} />}
    </span>
  )
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const className = "group flex min-h-[150px] flex-col rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 transition-all duration-150 hover:-translate-y-px hover:border-(--ledger-header-border) hover:bg-(--ledger-header-pill)"
  const content = (
    <>
      <div className="flex items-start gap-3">
        <IntegrationLogo integration={integration} />
        <div className="min-w-0 pt-0.5">
          <h3 className="text-[15px] font-medium tracking-[-0.02em] text-ledger-text-primary">{integration.name}</h3>
          <p className="mt-0.5 text-[11px] text-ledger-text-muted">By Ledger{availabilityLabels[integration.availability] ? ` · ${availabilityLabels[integration.availability]}` : ''}</p>
        </div>
      </div>
      <p className="mt-auto line-clamp-2 pt-6 text-[13px] leading-5 text-ledger-text-muted">{integration.description}</p>
    </>
  )
  return integration.detail ? <a href={`/integrations/${integration.slug}`} className={className} aria-label={`View ${integration.name} integration`}>{content}</a> : <article className={className}>{content}</article>
}

export function IntegrationsDirectoryPage() {
  const [activeFilter, setActiveFilter] = useState<DirectoryFilter>('essentials')
  const [query, setQuery] = useState('')

  const filteredIntegrations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return (filter: DirectoryFilter) => integrations.filter((integration) => {
      const matchesFilter = filter === 'essentials' ? integration.featured : integration.category === filter
      return matchesFilter && (!normalizedQuery || `${integration.name} ${integration.description}`.toLowerCase().includes(normalizedQuery))
    })
  }, [query])

  useEffect(() => {
    const sections = directoryFilters
      .map((filter) => document.getElementById(`integration-section-${filter}`))
      .filter((section): section is HTMLElement => Boolean(section))
    if (!sections.length || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      const filter = visible[0]?.target.id.replace('integration-section-', '') as DirectoryFilter | undefined
      if (filter && directoryFilters.includes(filter)) setActiveFilter(filter)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [query])

  const scrollToFilter = (filter: DirectoryFilter) => {
    setActiveFilter(filter)
    document.getElementById(`integration-section-${filter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (isSiteLocked()) return <LockedSplash />

  return (
    <div className="min-h-dvh bg-ledger-surface text-ledger-text">
      <SiteHeader currentPath="/integrations" />
      <main className="mx-auto w-full max-w-[1010px] flex-1 px-6 pb-20 pt-12 sm:px-8 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="flex flex-col gap-7 border-b border-(--ledger-border-subtle) pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <h1 className="text-[clamp(2.35rem,4.5vw,4rem)] font-medium leading-[0.98] tracking-[-0.05em] text-ledger-text-primary">Integrations</h1>
          <label className="flex h-9 w-full items-center gap-2 rounded-full border border-(--ledger-border-subtle) bg-ledger-surface-card px-3 text-ledger-text-muted leading-none sm:max-w-[220px]">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search integrations</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="h-5 min-w-0 flex-1 appearance-none bg-transparent p-0 text-[14px] leading-5 text-ledger-text-primary outline-none placeholder:text-ledger-text-muted"
              type="search"
              aria-label="Search integrations"
            />
            <kbd className="hidden h-4 text-[11px] leading-4 text-ledger-text-muted sm:inline">⌘K</kbd>
          </label>
        </div>

        <div className="mt-10 sm:hidden">
          <label className="sr-only" htmlFor="integration-category">Integration category</label>
          <select
            id="integration-category"
            value={activeFilter}
            onChange={(event) => scrollToFilter(event.target.value as DirectoryFilter)}
            className="ledger-field h-10 w-full border border-(--ledger-border-subtle) bg-ledger-surface-card px-3 text-[14px] text-ledger-text-primary"
          >
            <option value="essentials">Essentials</option>
            {integrationCategories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
          </select>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden self-start lg:sticky lg:top-24 lg:block" aria-label="Integration categories">
            <nav className="space-y-1">
              {directoryFilters.map((filter) => {
                const Icon = categoryIcons[filter]
                const isActive = activeFilter === filter
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => scrollToFilter(filter)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-[var(--ledger-control-radius)] px-2 py-2 text-left text-[14px] transition-all duration-150 hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ledger-header-border) ${isActive ? 'font-medium text-ledger-text-primary' : 'text-ledger-text-muted hover:text-ledger-text-primary'}`}
                  >
                    <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
                    <span>{categoryLabels[filter]}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          <div className="lg:max-w-[700px]">
            {directoryFilters.map((filter, index) => {
              const sectionIntegrations = filteredIntegrations(filter)
              if (!sectionIntegrations.length) return null
              const SectionIcon = categoryIcons[filter]
              return (
                <section key={filter} id={`integration-section-${filter}`} className={`scroll-mt-8 pb-12 last:pb-0 ${index > 0 ? 'border-t border-(--ledger-border-subtle) pt-6' : ''}`} aria-labelledby={`integration-heading-${filter}`}>
                  <div className="flex items-start gap-3">
                    <SectionIcon className="mt-1 shrink-0 text-ledger-text-muted" size={17} strokeWidth={1.7} aria-hidden="true" />
                    <div>
                      <h2 id={`integration-heading-${filter}`} className="text-[16px] font-medium tracking-[-0.02em] text-ledger-text-primary">{categoryLabels[filter]}</h2>
                      <p className="mt-0.5 text-[14px] leading-5 text-ledger-text-muted">{categoryDescriptions[filter]}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {sectionIntegrations.map((integration) => <IntegrationCard key={integration.slug} integration={integration} />)}
                  </div>
                </section>
              )
            })}
            {!directoryFilters.some((filter) => filteredIntegrations(filter).length) ? (
              <div className="border border-dashed border-(--ledger-border-subtle) px-5 py-10 text-center" aria-live="polite">
                <p className="text-[15px] font-medium text-ledger-text-primary">No integrations found</p>
                <p className="mt-1 text-[14px] text-ledger-text-muted">Try another search or clear the current one.</p>
                {query ? <button type="button" onClick={() => setQuery('')} className="mt-4 text-[13px] font-medium text-ledger-text-primary underline decoration-(--ledger-border) underline-offset-4 transition-colors hover:text-ledger-accent">Clear search</button> : null}
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
