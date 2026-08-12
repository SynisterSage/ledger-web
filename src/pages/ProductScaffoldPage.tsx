import { SiteHeader } from '../components/layout/SiteHeader'
import { LockedSplash } from '../components/sections/LockedSplash'
import { SiteFooter } from '../components/sections/SiteFooter'
import { isSiteLocked } from '../lib/siteLock'

export type ProductPageKey =
  | 'features'
  | 'sidebar'
  | 'capture'
  | 'notes'
  | 'projects'
  | 'calendar'
  | 'connected-work'
  | 'workspaces'

export type PlatformPageKey = 'platforms' | 'desktop' | 'web' | 'mobile' | 'browser-extension'

export type SiteScaffoldPageKey = ProductPageKey | PlatformPageKey | 'integrations'

type FeaturePageContent = {
  path: string
  title: string
  text: string
}

const scaffoldPageContent: Record<SiteScaffoldPageKey, FeaturePageContent> = {
  features: {
    path: '/features',
    title: 'Features',
    text: 'Scaffold page.',
  },
  sidebar: {
    path: '/features/sidebar',
    title: 'Sidebar',
    text: 'Scaffold page.',
  },
  capture: {
    path: '/features/capture',
    title: 'Capture',
    text: 'Scaffold page.',
  },
  notes: {
    path: '/features/notes',
    title: 'Notes',
    text: 'Scaffold page.',
  },
  projects: {
    path: '/features/projects',
    title: 'Projects',
    text: 'Scaffold page.',
  },
  calendar: {
    path: '/features/calendar',
    title: 'Calendar',
    text: 'Scaffold page.',
  },
  'connected-work': {
    path: '/features/connected-work',
    title: 'Connected work',
    text: 'Scaffold page.',
  },
  workspaces: {
    path: '/features/workspaces',
    title: 'Workspaces',
    text: 'Scaffold page.',
  },
  platforms: {
    path: '/platforms',
    title: 'Platforms',
    text: 'Scaffold page.',
  },
  desktop: {
    path: '/platforms/desktop',
    title: 'Desktop app',
    text: 'Scaffold page.',
  },
  web: {
    path: '/platforms/web',
    title: 'Web app',
    text: 'Scaffold page.',
  },
  mobile: {
    path: '/platforms/mobile',
    title: 'Mobile app',
    text: 'Scaffold page.',
  },
  'browser-extension': {
    path: '/platforms/browser-extension',
    title: 'Browser extension',
    text: 'Scaffold page.',
  },
  integrations: {
    path: '/integrations',
    title: 'Integrations',
    text: 'Scaffold page.',
  },
}

function FeatureSimplePage({ content }: { content: FeaturePageContent }) {
  if (content.path === '/features') {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-20 sm:px-8 sm:pb-28 lg:pb-36">
        <section className="flex flex-col items-center pt-24 text-center sm:pt-32 lg:pt-40" aria-labelledby="features-hero-title">
          <h1 id="features-hero-title" className="max-w-3xl text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.07em] text-ledger-text-primary">
            The workspace for keeping work connected.
          </h1>
          <p className="mt-7 max-w-xl text-[16px] leading-7 text-(--ledger-text-secondary) sm:mt-8 sm:text-[18px] sm:leading-8">
            Bring projects, notes, meetings, calendar, capture, people, and connected tools into one calm system for moving work forward.
          </p>
        </section>

        <section className="mt-20 sm:mt-28 lg:mt-36" aria-labelledby="features-hero-artwork-label">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border) bg-[radial-gradient(circle_at_50%_18%,rgba(255,95,64,0.08),transparent_40%),var(--ledger-surface-card)] shadow-[var(--ledger-shadow-soft)] sm:aspect-[16/9]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),transparent_46%,rgba(10,10,10,0.025))]" aria-hidden="true" />
            <div className="relative flex h-full items-center justify-center px-6 text-center sm:px-10">
              <p id="features-hero-artwork-label" className="text-[11px] font-semibold tracking-[0.04em] text-(--ledger-text-muted)">
                Features hero artwork
              </p>
            </div>
          </div>
        </section>

        <section className="mt-28 border-t border-(--ledger-border) pt-10 sm:mt-40 sm:pt-14 lg:mt-52" aria-labelledby="features-directory-title">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold tracking-[0.04em] text-(--ledger-text-muted)">Explore Ledger</p>
            <h2 id="features-directory-title" className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">
              Everything has a place in the loop.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-(--ledger-text-secondary)">
              Capture what matters, make a plan, keep the context close, and review what comes next.
            </p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-10rem)] w-full max-w-7xl flex-1 flex-col px-6 py-14 sm:px-8 sm:py-20 lg:py-24">
      <section className="max-w-2xl">
        <h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.96] tracking-[-0.055em] text-ledger-text-primary">
          {content.title}
        </h1>
        <p className="mt-4 text-[16px] leading-7 text-(--ledger-text-secondary)">{content.text}</p>
      </section>
    </main>
  )
}

export function ProductScaffoldPage({ page }: { page: SiteScaffoldPageKey }) {
  const content = scaffoldPageContent[page]

  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-dvh bg-ledger-surface text-ledger-text">
      <SiteHeader currentPath={content.path} />
      <FeatureSimplePage content={content} />
      <SiteFooter />
    </div>
  )
}
