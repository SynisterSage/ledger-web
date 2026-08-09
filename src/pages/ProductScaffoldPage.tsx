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
