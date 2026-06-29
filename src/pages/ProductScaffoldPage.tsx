import type { ReactNode } from 'react'

import { ArrowRight, Monitor, Plug2, Search, Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { SiteHeader } from '../components/layout/SiteHeader'
import { LockedSplash } from '../components/sections/LockedSplash'
import { SiteFooter } from '../components/sections/SiteFooter'
import { isSiteLocked } from '../lib/siteLock'

type FeaturePageKey = 'features' | 'desktop' | 'mobile' | 'browser' | 'integrations'

type FeaturePageContent = {
  path: string
  eyebrow: string
  title: string
  subtitle: string
}

const featurePageContent: Record<FeaturePageKey, FeaturePageContent> = {
  features: {
    path: '/features',
    eyebrow: 'Features',
    title: 'Features that keep your work in reach.',
    subtitle:
      'Capture notes, tasks, events, reminders, projects, and context across the places you already work.',
  },
  desktop: {
    path: '/features/desktop',
    eyebrow: 'Desktop app',
    title: 'A workspace that stays beside your work.',
    subtitle:
      'Float Ledger, dock it beside your apps, and keep notes, actions, projects, and context close without switching tabs.',
  },
  mobile: {
    path: '/features/mobile',
    eyebrow: 'Mobile app',
    title: 'Capture and check in from anywhere.',
    subtitle:
      'Use Ledger on mobile to capture ideas, review Today, check notifications, and find what you need away from your desk.',
  },
  browser: {
    path: '/features/browser',
    eyebrow: 'Browser extension',
    title: 'Save the web into your workspace.',
    subtitle:
      'Capture pages, links, and selected text from your browser and send them to the right Ledger workspace.',
  },
  integrations: {
    path: '/features/integrations',
    eyebrow: 'Integrations',
    title: 'Bring outside context into Ledger.',
    subtitle:
      'Connect the tools you use every day so messages, pages, files, and updates can become usable workspace context.',
  },
}

const workflowItems = [
  {
    title: 'Capture',
    description: 'Save a thought, note, task, event, or reminder before it disappears.',
  },
  {
    title: 'Organize',
    description: 'Send each item into the workspace it belongs to and keep context separated.',
  },
  {
    title: 'Act',
    description: 'Use Today, notifications, and project context to focus on what needs attention now.',
  },
  {
    title: 'Review',
    description: 'Surface unfinished work, follow-ups, and stale captures before they get lost.',
  },
]

const surfaceCards = [
  {
    title: 'Desktop app',
    description: 'A sidebar companion that stays beside the apps already open.',
    href: '/features/desktop',
    icon: Monitor,
  },
  {
    title: 'Mobile app',
    description: 'Quick capture and attention checks from your phone.',
    href: '/features/mobile',
    icon: Smartphone,
  },
  {
    title: 'Browser extension',
    description: 'Save web context without breaking your browsing flow.',
    href: '/features/browser',
    icon: Search,
  },
  {
    title: 'Integrations',
    description: 'Bring Slack, Calendar, Mail, and GitHub into the same system.',
    href: '/features/integrations',
    icon: Plug2,
  },
]

function SectionFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="grid gap-8 border-t border-(--ledger-border-subtle) py-10 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] md:gap-12 md:py-12">
      <div>
        <p className="text-[13px] font-medium text-(--ledger-text-secondary)">{eyebrow}</p>
        <h2 className="mt-3 max-w-sm text-[28px] font-semibold leading-[1.05] tracking-[-0.04em] text-(--ledger-text-primary) sm:text-[34px]">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-7 text-(--ledger-text-secondary) sm:text-[16px]">{description}</p>
      </div>

      <div>{children}</div>
    </section>
  )
}

function MockPanel({
  title,
  lines,
  accent = false,
}: {
  title: string
  lines: string[]
  accent?: boolean
}) {
  return (
    <div className={`overflow-hidden rounded-[24px] border border-(--ledger-border-subtle) ${accent ? 'bg-[rgba(255,122,89,0.05)]' : 'bg-(--ledger-surface-card)'}`}>
      <div className="flex items-center justify-between border-b border-(--ledger-border-subtle) px-5 py-4">
        <div>
          <p className="text-[12px] font-medium text-(--ledger-text-secondary)">{title}</p>
          <div className="mt-1 h-1.5 w-14 rounded-full bg-ledger-accent/60" />
        </div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(61,67,74,0.18)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(61,67,74,0.18)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(61,67,74,0.18)]" />
        </div>
      </div>
      <div className="space-y-3 px-5 py-5">
        {lines.map((line) => (
          <div key={line} className="flex items-center justify-between gap-4 rounded-[16px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.4)] px-4 py-3">
            <span className="text-[14px] font-medium text-(--ledger-text-primary)">{line}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-ledger-accent" />
          </div>
        ))}
      </div>
    </div>
  )
}

function SurfaceLinkCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string
  description: string
  href: string
  icon: LucideIcon
}) {
  return (
    <a
      href={href}
      className="group flex h-full flex-col justify-between rounded-[24px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) p-5 transition-colors hover:bg-(--ledger-surface-muted)"
    >
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.48)] text-(--ledger-text-primary)">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.03em] text-(--ledger-text-primary)">{title}</h3>
        <p className="mt-2 text-[14px] leading-6 text-(--ledger-text-secondary)">{description}</p>
      </div>

      <div className="mt-5 flex items-center gap-2 text-[13px] font-medium text-(--ledger-text-primary)">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </a>
  )
}

function FeaturesOverviewPage({ content }: { content: FeaturePageContent }) {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:items-end lg:gap-16 lg:py-24">
        <div>
          <p className="text-[13px] font-medium text-(--ledger-text-secondary)">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(3rem,7vw,5.8rem)] font-medium leading-[0.96] tracking-[-0.06em] text-ledger-text-primary">
            {content.title}
          </h1>
        </div>

        <div className="lg:justify-self-end">
          <p className="max-w-xl text-[18px] leading-8 tracking-[-0.02em] text-(--ledger-text-secondary) sm:text-[20px]">
            {content.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/download"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ledger-accent px-5 text-[14px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
            >
              Download Ledger
            </a>
            <a
              href="/help"
              className="inline-flex h-11 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 text-[14px] font-semibold leading-none text-ledger-text transition-colors duration-200 hover:bg-(--ledger-surface-muted)"
            >
              Browse help
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8 sm:pb-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {workflowItems.map((item, index) => (
            <div key={item.title} className="rounded-[24px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ledger-accent text-white">
                <span className="text-[12px] font-semibold">{index + 1}</span>
              </div>
              <h2 className="mt-4 text-[18px] font-semibold tracking-[-0.03em] text-ledger-text-primary">{item.title}</h2>
              <p className="mt-2 text-[14px] leading-6 text-ledger-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8 sm:pb-16">
        <SectionFrame
          eyebrow="Shared workspaces and global search"
          title="Shared context stays organized."
          description="Ledger keeps workspaces separate without forcing you to lose the bigger picture. Search, filters, and notifications surface context from across your Ledger account."
        >
          <div className="grid gap-4">
            <MockPanel
              title="Shared workspaces"
              lines={['Client work', 'Personal planning', 'Team launch', 'School']}
            />
            <MockPanel
              title="Global search"
              lines={['Find notes, tasks, and events', 'Search across all workspaces', 'Jump to recent captures']}
              accent
            />
          </div>
        </SectionFrame>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8 sm:pb-16">
        <SectionFrame
          eyebrow="Planning"
          title="Planning should feel like a review, not a project manager."
          description="Plan the next move around the same workspace context you already captured. Keep it simple, keep it usable, and keep it close to the work."
        >
          <MockPanel
            title="Planning view"
            lines={['Next actions', 'Upcoming deadlines', 'Open projects', 'Waiting on']}
            accent
          />
        </SectionFrame>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {surfaceCards.map((card) => (
            <SurfaceLinkCard key={card.title} {...card} icon={card.icon} />
          ))}
        </div>
      </section>
    </>
  )
}

function FeatureSurfacePage({
  content,
  variant,
}: {
  content: FeaturePageContent
  variant: Exclude<FeaturePageKey, 'features'>
}) {
  const sections =
    variant === 'desktop'
      ? [
          {
            eyebrow: 'Floating and docked sidebar',
            title: 'Keep Ledger beside the work already open.',
            description:
              'Use Ledger as a slim sidebar for the moments when you need to capture, inspect, or act without changing contexts.',
            panel: <MockPanel title="Desktop layout" lines={['Docked sidebar', 'Floating panel', 'Command palette']} accent />,
          },
          {
            eyebrow: 'Quick capture from desktop',
            title: 'Capture while you are still in the app you were using.',
            description:
              'Use the desktop app to add items with almost no ceremony. The point is to keep momentum, not to start a new workflow.',
            panel: <MockPanel title="Quick capture" lines={['Task', 'Reminder', 'Note', 'Event']} />,
          },
          {
            eyebrow: 'Today and notifications',
            title: 'Today turns the workspace into a daily attention layer.',
            description:
              'See what is due, what needs a response, and what should be carried forward before it gets stale.',
            panel: <MockPanel title="Today" lines={['Due today', 'Waiting on', 'Follow-ups', 'Notifications']} accent />,
          },
          {
            eyebrow: 'Keyboard and command navigation',
            title: 'Move quickly with shortcuts and command-style navigation.',
            description:
              'Ledger should feel fast enough to stay out of the way when you already know what to do next.',
            panel: <MockPanel title="Keyboard flow" lines={['Open command', 'Search workspace', 'Capture item', 'Jump to Today']} />,
          },
        ]
      : variant === 'mobile'
        ? [
            {
              eyebrow: 'Today on mobile',
              title: 'Review the day without recreating the desktop.',
              description:
                'Mobile should show what matters now: quick attention items, the next reminder, and the captures you need to keep moving.',
              panel: <MockPanel title="Today" lines={['Morning check-in', 'Due now', 'Upcoming event']} accent />,
            },
            {
              eyebrow: 'Quick capture',
              title: 'Capture while you are away from your desk.',
              description:
                'Add notes, tasks, reminders, and events in a flow that respects being on a phone instead of pretending to be desktop.',
              panel: <MockPanel title="Capture" lines={['Voice note', 'Text note', 'Task', 'Reminder']} />,
            },
            {
              eyebrow: 'Notifications',
              title: 'See what needs attention and respond quickly.',
              description:
                'Ledger mobile should keep notifications understandable so you can act or defer without digging for context.',
              panel: <MockPanel title="Notifications" lines={['Due reminder', 'Project update', 'Mention from workspace']} accent />,
            },
            {
              eyebrow: 'Search and workspace context',
              title: 'Find the right workspace even when you are away from the desktop.',
              description:
                'Search should stay useful on mobile, especially when you only need to pull up one item and keep moving.',
              panel: <MockPanel title="Search" lines={['Recent captures', 'Workspace results', 'Pinned items']} />,
            },
          ]
        : variant === 'browser'
          ? [
              {
                eyebrow: 'Save pages',
                title: 'Capture pages without losing your place.',
                description:
                  'Send useful web context into Ledger while the tab is still open and the idea still makes sense.',
                panel: <MockPanel title="Browser capture" lines={['Save page', 'Save link', 'Save selected text']} accent />,
              },
              {
                eyebrow: 'Source-aware items',
                title: 'Keep the original source attached to the item.',
                description:
                  'Ledger should make it obvious where a capture came from so it is easier to trust, search, and revisit later.',
                panel: <MockPanel title="Captured source" lines={['URL', 'Title', 'Selected text', 'Workspace']} />,
              },
              {
                eyebrow: 'Turn captures into work',
                title: 'Convert browser captures into notes, tasks, reminders, or project actions.',
                description:
                  'The browser extension is the first step. The useful part is turning that quick capture into something you can act on later.',
                panel: <MockPanel title="Next step" lines={['Note', 'Task', 'Reminder', 'Project action']} accent />,
              },
            ]
          : [
              {
                eyebrow: 'Connected tools',
                title: 'Pull context from the tools your team already uses.',
                description:
                  'Slack, Mail, Calendar, GitHub, Chrome, and other tools should feed Ledger with less friction and more context.',
                panel: <MockPanel title="Connected sources" lines={['Slack', 'GitHub', 'Calendar', 'Mail']} accent />,
              },
              {
                eyebrow: 'Workspace-aware saves',
                title: 'Every integration should know where the item belongs.',
                description:
                  'The goal is not just import. The goal is making sure the item lands in the right workspace with useful source context.',
                panel: <MockPanel title="Save to workspace" lines={['Choose workspace', 'Attach source', 'Preserve context']} />,
              },
              {
                eyebrow: 'Shared workspace context',
                title: 'Bring updates into the same system you use to act on them.',
                description:
                  'When tools report activity, Ledger should turn that noise into a clear action path instead of another inbox to check.',
                panel: <MockPanel title="Action path" lines={['Incoming update', 'Follow-up', 'Review later']} accent />,
              },
            ]

  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:items-end lg:gap-16 lg:py-24">
        <div>
          <p className="text-[13px] font-medium text-(--ledger-text-secondary)">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.96] tracking-[-0.06em] text-ledger-text-primary">
            {content.title}
          </h1>
        </div>

        <div className="lg:justify-self-end">
          <p className="max-w-xl text-[18px] leading-8 tracking-[-0.02em] text-(--ledger-text-secondary) sm:text-[20px]">
            {content.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/download"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ledger-accent px-5 text-[14px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
            >
              Download Ledger
            </a>
            <a
              href="/help/contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 text-[14px] font-semibold leading-none text-ledger-text transition-colors duration-200 hover:bg-(--ledger-surface-muted)"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20">
        <div className="space-y-8 rounded-[28px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {sections.map((section) => (
            <SectionFrame
              key={section.eyebrow}
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
            >
              {section.panel}
            </SectionFrame>
          ))}
        </div>
      </section>
    </>
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
      <main>{page === 'features' ? <FeaturesOverviewPage content={content} /> : <FeatureSurfacePage content={content} variant={page} />}</main>
      <SiteFooter />
    </div>
  )
}
