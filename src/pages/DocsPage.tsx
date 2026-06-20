import { SiteHeader } from '../components/layout/SiteHeader'

type DocCard = {
  title: string
  description: string
  href: string
  icon: 'guide' | 'workspace' | 'notes' | 'projects'
}

type DocSection = {
  id: string
  title: string
  content: string[]
}

type DocArticle = {
  title: string
  intro: string
  sections: DocSection[]
}

const homeSections: Array<{ title: string; cards: DocCard[] }> = [
  {
    title: 'Docs',
    cards: [
      {
        title: 'Start guide',
        description: 'A short tour of the docs layout and core flows.',
        href: '/docs/start-guide',
        icon: 'guide',
      },
      {
        title: 'Workspace',
        description: 'Where notes, tasks, and project context live together.',
        href: '/docs/workspace',
        icon: 'workspace',
      },
    ],
  },
  {
    title: 'Basics',
    cards: [
      {
        title: 'Notes',
        description: 'Capture and organize ideas, decisions, and follow-ups.',
        href: '/docs/notes',
        icon: 'notes',
      },
      {
        title: 'Projects',
        description: 'Track work, status, and the next step in one place.',
        href: '/docs/projects',
        icon: 'projects',
      },
    ],
  },
]

const sidebarGroups = [
  {
    title: 'Getting started',
    links: [
      { label: 'Start guide', href: '/docs/start-guide' },
      { label: 'Workspace', href: '/docs/workspace' },
    ],
  },
  {
    title: 'Basics',
    links: [
      { label: 'Notes', href: '/docs/notes' },
      { label: 'Projects', href: '/docs/projects' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Developers', href: '/about' },
      { label: 'Learn', href: '/about' },
      { label: 'Contact support', href: 'mailto:ledgerworkspace@gmail.com' },
    ],
  },
]

const articleMap: Record<string, DocArticle> = {
  'start-guide': {
    title: 'Start guide',
    intro: 'Learn the structure of Ledger Docs and how the workspace is organized.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          'Use this space for the main orientation content that introduces the docs layout.',
          'Keep the writing short, direct, and easy to scan so the page feels like a clean reference.',
        ],
      },
      {
        id: 'workspace',
        title: 'Workspace',
        content: [
          'This section can explain where notes, tasks, and projects live in the product.',
          'The layout is built to support longer explanations later without changing the structure.',
        ],
      },
      {
        id: 'next-steps',
        title: 'Next steps',
        content: [
          'Add the first real walkthroughs here after the structure is approved.',
          'Leave room for code blocks, callouts, or supporting screenshots if needed.',
        ],
      },
    ],
  },
  workspace: {
    title: 'Workspace',
    intro: 'A placeholder document shell for workspace-level docs and navigation patterns.',
    sections: [
      {
        id: 'overview',
        title: 'Workspace overview',
        content: [
          'Use this section to explain the high-level workspace model.',
          'It can later hold copy about members, shared context, and structure.',
        ],
      },
      {
        id: 'members',
        title: 'Members and roles',
        content: [
          'This space can describe ownership, permissions, and collaboration basics.',
          'The two-column layout gives room for long-form content and a sticky outline.',
        ],
      },
      {
        id: 'settings',
        title: 'Settings',
        content: [
          'Keep settings guidance here when the real docs are ready.',
          'The page shell is already prepared for more sections later.',
        ],
      },
    ],
  },
  notes: {
    title: 'Notes',
    intro: 'A simple notes document shell for future product instructions and guides.',
    sections: [
      {
        id: 'capture',
        title: 'Capture',
        content: [
          'This section can cover quick capture, note entry, and the fastest path to save thoughts.',
          'A minimal heading hierarchy keeps the page readable at a glance.',
        ],
      },
      {
        id: 'organize',
        title: 'Organize',
        content: [
          'Use this area for organizing note structure, tags, and relationships.',
          'Later this can hold examples, screenshots, or keyboard shortcuts.',
        ],
      },
      {
        id: 'review',
        title: 'Review',
        content: [
          'This slot can explain how notes turn back into actions.',
          'The page is intentionally neutral for now so it can absorb real content later.',
        ],
      },
    ],
  },
  projects: {
    title: 'Projects',
    intro: 'A placeholder page for project docs, status, and execution guidance.',
    sections: [
      {
        id: 'board',
        title: 'Project board',
        content: [
          'Use this section to explain the board layout and key states.',
          'The shell is wide enough for examples, definitions, and simple diagrams later.',
        ],
      },
      {
        id: 'views',
        title: 'Views',
        content: [
          'Add content about list, board, and timeline views here when the copy is ready.',
          'The right-side outline can grow with the page as the article gets longer.',
        ],
      },
      {
        id: 'delivery',
        title: 'Delivery',
        content: [
          'Reserve this area for handoff, tracking, and closing out work.',
          'For now it stays as layout scaffolding only.',
        ],
      },
    ],
  },
}

function DocsGlyph({ icon }: { icon: DocCard['icon'] }) {
  switch (icon) {
    case 'guide':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M6 5.5h8.5L18 9v9.5A2.5 2.5 0 0 1 15.5 21H6A2.5 2.5 0 0 1 3.5 18.5v-11A2 2 0 0 1 5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M14.5 5.5V9H18" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      )
    case 'workspace':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="4.5" y="5.5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
          <rect x="13" y="5.5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
          <rect x="4.5" y="14" width="6.5" height="4.5" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
          <path d="M13 15h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      )
    case 'notes':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M7 4.75h7.75L19 9v10.25A2.75 2.75 0 0 1 16.25 22H7A2.75 2.75 0 0 1 4.25 19.25v-11.5A3 3 0 0 1 7.25 4.75"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M14.5 4.75V9h4.25" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      )
    case 'projects':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M5 7.5h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5 16.5h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M7 4.5v4M12 4.5v4M17 4.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      )
  }
}

function DocsSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="border-r border-[color:var(--ledger-border-subtle)] bg-[rgba(255,255,255,0.01)]">
      <div className="sticky top-0 flex h-full min-h-[calc(100vh-4.5rem)] flex-col">
        <div className="flex items-center justify-between border-b border-[color:var(--ledger-border-subtle)] px-5 py-4">
          <a href="/docs" className="inline-flex items-center gap-2">
            <img src="/assets/logos/logo.svg" alt="" className="h-6 w-auto" aria-hidden="true" />
            <span className="text-[15px] font-medium tracking-[-0.02em] text-ledger-text">Docs</span>
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.04)] text-ledger-text-muted"
            aria-label="Search docs"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.7" />
              <path d="M15.25 15.25L19 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 px-4 py-4">
          <nav className="space-y-5">
            {sidebarGroups.map((group) => (
              <div key={group.title}>
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-ledger-text-muted">
                  {group.title}
                </p>
                <div className="mt-2 space-y-0.5">
                  {group.links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`flex items-center justify-between rounded-lg px-2 py-2 text-[14px] transition-colors ${
                          isActive
                            ? 'bg-[color:var(--ledger-header-pill-active)] text-ledger-text'
                            : 'text-ledger-text-muted hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text'
                        }`}
                      >
                        <span>{link.label}</span>
                        <span className="text-[11px] text-ledger-text-muted">›</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="border-t border-[color:var(--ledger-border-subtle)] px-4 py-4">
          <div className="grid gap-1 text-[13px] text-ledger-text-muted">
            <a href="/docs" className="rounded-md px-2 py-2 hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text">
              Home
            </a>
            <a
              href="/about"
              className="rounded-md px-2 py-2 hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text"
            >
              Developers
            </a>
            <a
              href="/about"
              className="rounded-md px-2 py-2 hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text"
            >
              Learn
            </a>
            <a
              href="mailto:ledgerworkspace@gmail.com"
              className="rounded-md px-2 py-2 hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}

function DocsCard({ card }: { card: DocCard }) {
  return (
    <a
      href={card.href}
      className="group block rounded-2xl border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.04)] p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[color:var(--ledger-header-border)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.03)] text-ledger-text">
        <DocsGlyph icon={card.icon} />
      </div>
      <h3 className="mt-10 text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">{card.title}</h3>
      <p className="mt-2 max-w-sm text-[15px] leading-6 text-ledger-text-muted">{card.description}</p>
    </a>
  )
}

function DocsHomePage({ pathname }: { pathname: string }) {
  return (
    <div className="min-h-screen bg-[var(--ledger-bg)] text-ledger-text">
      <SiteHeader currentPath="/docs" />

      <div className="mx-auto grid w-full max-w-[1800px] lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <DocsSidebar pathname={pathname} />
        </div>

        <main className="min-w-0 px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="max-w-5xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-ledger-text-muted">Home</p>
                <h1 className="mt-3 text-[50px] font-medium tracking-[-0.055em] text-ledger-text sm:text-[64px] lg:text-[72px]">
                  Ledger Docs
                </h1>
                <p className="mt-4 max-w-2xl text-[17px] leading-7 text-ledger-text-muted sm:text-[18px]">
                  A clean docs structure for Ledger. The layout is set up first so we can fill in the real content next.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-12">
              {homeSections.map((section) => (
                <section key={section.title}>
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-ledger-text sm:text-[28px]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {section.cards.map((card) => (
                      <DocsCard key={card.title} card={card} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function DocsArticlePage({ pathname }: { pathname: string }) {
  const slug = pathname.replace(/^\/docs\/?/, '') || 'start-guide'
  const article = articleMap[slug] ?? articleMap['start-guide']
  const sectionIds = article.sections.map((section) => section.id)

  return (
    <div className="min-h-screen bg-[var(--ledger-bg)] text-ledger-text">
      <SiteHeader currentPath="/docs" />

      <div className="mx-auto grid w-full max-w-[1800px] lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <DocsSidebar pathname={`/docs/${slug}`} />
        </div>

        <main className="min-w-0 px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12">
            <article className="min-w-0 max-w-4xl">
              <p className="text-[13px] font-medium text-ledger-text-muted">Documentation</p>
              <h1 className="mt-3 text-[44px] font-medium tracking-[-0.055em] text-ledger-text sm:text-[58px] lg:text-[64px]">
                {article.title}
              </h1>
              <p className="mt-4 max-w-3xl text-[18px] leading-7 text-ledger-text-muted sm:text-[19px]">
                {article.intro}
              </p>

              <div className="mt-10 space-y-12">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id} className="border-t border-[color:var(--ledger-border-subtle)] pt-8">
                    <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-ledger-text sm:text-[30px]">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4 text-[16px] leading-7 text-ledger-text-muted">
                      {section.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <aside className="hidden xl:block">
              <div className="sticky top-8 border-l border-[color:var(--ledger-border-subtle)] pl-4">
                <p className="text-[13px] font-medium text-ledger-text-muted">On this page</p>
                <nav className="mt-2 grid gap-1">
                  {sectionIds.map((id) => {
                    const section = article.sections.find((item) => item.id === id)
                    if (!section) {
                      return null
                    }

                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        className="rounded-md py-1.5 text-[14px] text-ledger-text-muted transition-colors hover:text-ledger-text"
                      >
                        {section.title}
                      </a>
                    )
                  })}
                </nav>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}

export function DocsPage() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/docs'

  if (pathname === '/docs' || pathname === '/docs/index') {
    return <DocsHomePage pathname={pathname} />
  }

  if (pathname.startsWith('/docs/')) {
    return <DocsArticlePage pathname={pathname} />
  }

  return <DocsHomePage pathname="/docs" />
}
