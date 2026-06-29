import { SiteHeader } from '../components/layout/SiteHeader'
import { LockedSplash } from '../components/sections/LockedSplash'
import { SiteFooter } from '../components/sections/SiteFooter'
import { isSiteLocked } from '../lib/siteLock'

type FeaturePageKey =
  | 'features'
  | 'desktop'
  | 'mobile'
  | 'browser'
  | 'integrations'
  | 'shared-workspaces'
  | 'search'
  | 'planning'

type FeaturePageContent = {
  path: string
  title: string
  text: string
}

const featurePageContent: Record<FeaturePageKey, FeaturePageContent> = {
  features: {
    path: '/features',
    title: 'Features',
    text: 'Scaffold page.',
  },
  desktop: {
    path: '/features/desktop',
    title: 'Desktop app',
    text: 'Scaffold page.',
  },
  mobile: {
    path: '/features/mobile',
    title: 'Mobile app',
    text: 'Scaffold page.',
  },
  browser: {
    path: '/features/browser',
    title: 'Browser extension',
    text: 'Scaffold page.',
  },
  integrations: {
    path: '/features/integrations',
    title: 'Integrations',
    text: 'Scaffold page.',
  },
  'shared-workspaces': {
    path: '/features/shared-workspaces',
    title: 'Shared workspaces',
    text: 'Scaffold page.',
  },
  search: {
    path: '/features/search',
    title: 'Search',
    text: 'Scaffold page.',
  },
  planning: {
    path: '/features/planning',
    title: 'Planning',
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

export function ProductScaffoldPage({ page }: { page: FeaturePageKey }) {
  const content = featurePageContent[page]

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
