import type { ReactNode } from 'react'

import { ArrowRight, BookOpen, CalendarDays, LaptopMinimal, Layers3, Search, Smartphone, Sparkles, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { SiteHeader } from '../components/layout/SiteHeader'
import { LockedSplash } from '../components/sections/LockedSplash'
import { SiteFooter } from '../components/sections/SiteFooter'
import { isSiteLocked } from '../lib/siteLock'

type HelpSlug =
  | 'getting-started'
  | 'workspaces'
  | 'capture'
  | 'today'
  | 'actions'
  | 'notes'
  | 'projects'
  | 'calendar'
  | 'notifications'
  | 'search'
  | 'desktop'
  | 'mobile'
  | 'browser-extension'
  | 'shortcuts'
  | 'account'
  | 'troubleshooting'
  | 'contact'

type HelpSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type HelpArticle = {
  title: string
  intro: string
  sections: HelpSection[]
  related: Array<{ label: string; href: string }>
}

const helpArticles: Record<HelpSlug, HelpArticle> = {
  'getting-started': {
    title: 'Getting started with Ledger',
    intro: 'Ledger is a workspace-first companion for work you want to keep close. Start with one workspace, capture one item, and let the system show you what needs attention next.',
    sections: [
      {
        title: '1. Choose your default workspace',
        paragraphs: ['Every capture belongs to a workspace. Start by picking the one you will use most often, then adjust later when a capture belongs somewhere else.'],
      },
      {
        title: '2. Capture the next thing on your mind',
        paragraphs: ['Add a task, note, reminder, or event as soon as it appears. Ledger is most useful when it keeps the friction low enough that you actually use it.'],
      },
      {
        title: '3. Check Today before you start moving',
        paragraphs: ['Today brings the current day into focus so you can see what needs attention, what is waiting, and what should be pushed forward.'],
      },
    ],
    related: [
      { label: 'Using workspaces', href: '/help/workspaces' },
      { label: 'Capturing into Ledger', href: '/help/capture' },
      { label: 'Using Today', href: '/help/today' },
    ],
  },
  workspaces: {
    title: 'Using workspaces',
    intro: 'Workspaces keep separate contexts separated without making you give up the broader picture. Use them for clients, teams, school, personal planning, or anything else you want to keep clean.',
    sections: [
      {
        title: 'Workspace basics',
        paragraphs: ['Each workspace has its own notes, tasks, reminders, and project context. That keeps your day from becoming one giant mixed inbox.'],
        bullets: ['Pick a default capture workspace', 'Move items when context changes', 'Keep shared work visible without mixing it together'],
      },
      {
        title: 'Shared workspaces',
        paragraphs: ['When a workspace is shared, everyone sees the same context and can act on the same items. Ledger is built so shared work does not feel like a separate product.'],
      },
    ],
    related: [
      { label: 'Getting started', href: '/help/getting-started' },
      { label: 'Searching across Ledger', href: '/help/search' },
      { label: 'Account and sessions', href: '/help/account' },
    ],
  },
  capture: {
    title: 'Capturing into Ledger',
    intro: 'Capture should be fast enough that you do not need to decide everything up front. Add the item now, then turn it into the right kind of work once it is safely in Ledger.',
    sections: [
      {
        title: 'What you can capture',
        paragraphs: ['Capture notes, tasks, reminders, events, links, and project actions. Anything that starts as a thought can become a usable item later.'],
      },
      {
        title: 'How Ledger treats captures',
        paragraphs: ['Captures land in the right workspace and carry source context when available. That keeps them useful when you return later.'],
        bullets: ['Set a default workspace', 'Change the workspace before saving', 'Add enough context to make it searchable later'],
      },
      {
        title: 'Capture from desktop, mobile, or browser',
        paragraphs: ['Use the desktop app when you are already at your machine, mobile when you are away, and the browser extension when the web page itself matters.'],
      },
    ],
    related: [
      { label: 'Desktop app', href: '/help/desktop' },
      { label: 'Mobile app', href: '/help/mobile' },
      { label: 'Browser extension', href: '/help/browser-extension' },
    ],
  },
  today: {
    title: 'Using Today',
    intro: 'Today is the attention layer for the day in front of you. It should show what is due, what is waiting, and what you need to review before you are done.',
    sections: [
      {
        title: 'What appears in Today',
        paragraphs: ['Due reminders, upcoming events, active items, and anything else that needs a decision should surface here.'],
      },
      {
        title: 'What to do from Today',
        paragraphs: ['Open an item, reply to a notification, or push work forward. Today is not a calendar grid; it is the work queue for the day.'],
      },
      {
        title: 'Use it as a daily check-in',
        paragraphs: ['Most people get more value from a short daily review than from a heavy planning ritual. Keep the loop short and repeatable.'],
      },
    ],
    related: [
      { label: 'Notifications', href: '/help/notifications' },
      { label: 'Actions', href: '/help/actions' },
      { label: 'Calendar', href: '/help/calendar' },
    ],
  },
  actions: {
    title: 'Creating and managing actions',
    intro: 'Actions are the things you can actually do. They help Ledger turn captures and reminders into work you can move forward.',
    sections: [
      {
        title: 'Actions stay tied to context',
        paragraphs: ['Use an action when an item needs a decision or a next step. Keep the parent note, project, or workspace attached so the meaning stays obvious.'],
      },
      {
        title: 'Move actions through the day',
        paragraphs: ['Mark an action complete, defer it, or turn it into follow-up work. The important part is keeping the next step visible.'],
      },
    ],
    related: [
      { label: 'Today', href: '/help/today' },
      { label: 'Projects', href: '/help/projects' },
      { label: 'Troubleshooting', href: '/help/troubleshooting' },
    ],
  },
  notes: {
    title: 'Writing and linking notes',
    intro: 'Notes are where context lives. Use them for meeting notes, drafts, decisions, summaries, and anything else you want to keep attached to the workspace.',
    sections: [
      {
        title: 'Keep notes useful',
        paragraphs: ['A note should explain what happened and what comes next. Short, connected notes are more useful than a wall of text you never return to.'],
      },
      {
        title: 'Link notes to work',
        paragraphs: ['Attach notes to projects, workspaces, or actions so the context stays findable. That makes review and search much more valuable later.'],
      },
    ],
    related: [
      { label: 'Projects', href: '/help/projects' },
      { label: 'Search', href: '/help/search' },
      { label: 'Capture', href: '/help/capture' },
    ],
  },
  projects: {
    title: 'Managing projects',
    intro: 'Projects help you hold longer-running work together. They give you a place to collect notes, actions, and follow-ups without turning Ledger into a project-management app.',
    sections: [
      {
        title: 'Project structure',
        paragraphs: ['A project should stay lightweight. Use it to keep related actions and notes together, then let Today and search surface what needs attention now.'],
      },
      {
        title: 'Use projects for review',
        paragraphs: ['When you review a project, you should be able to see what moved, what stalled, and what still needs a decision.'],
      },
    ],
    related: [
      { label: 'Actions', href: '/help/actions' },
      { label: 'Search', href: '/help/search' },
      { label: 'Workspaces', href: '/help/workspaces' },
    ],
  },
  calendar: {
    title: 'Using the calendar',
    intro: 'Calendar items connect time with workspace context. Use them for events, deadlines, and anything else that needs a place on the timeline.',
    sections: [
      {
        title: 'Schedule and review',
        paragraphs: ['Ledger should make it easy to add an event and then understand why it matters later. The context around the event is the useful part.'],
      },
      {
        title: 'Keep events in view',
        paragraphs: ['Calendar details should show up in Today and notifications when they matter, so you are not relying on memory alone.'],
      },
    ],
    related: [
      { label: 'Today', href: '/help/today' },
      { label: 'Notifications', href: '/help/notifications' },
      { label: 'Capture', href: '/help/capture' },
    ],
  },
  notifications: {
    title: 'Managing notifications',
    intro: 'Notifications are how Ledger brings attention back to you when something needs action. Keep them useful and reduce noise wherever possible.',
    sections: [
      {
        title: 'What notifications are for',
        paragraphs: ['Use notifications for reminders, due items, project changes, and other events that should not sit quietly in the background.'],
      },
      {
        title: 'Respond quickly',
        paragraphs: ['A notification should let you open the item, act, or defer it without forcing a second hunt for context.'],
      },
    ],
    related: [
      { label: 'Today', href: '/help/today' },
      { label: 'Account and sessions', href: '/help/account' },
      { label: 'Troubleshooting', href: '/help/troubleshooting' },
    ],
  },
  search: {
    title: 'Searching across Ledger',
    intro: 'Search should find the item you are thinking about without making you remember where you saved it. Search across workspaces, notes, actions, captures, and projects.',
    sections: [
      {
        title: 'Search from anywhere',
        paragraphs: ['Use search when you know the idea but not the exact location. It is the fastest way to reconnect a thought to its context.'],
      },
      {
        title: 'Search by source and workspace',
        paragraphs: ['Saved web pages, notes, and workspace items should stay easy to find because Ledger preserves enough source context to make them searchable later.'],
      },
    ],
    related: [
      { label: 'Workspaces', href: '/help/workspaces' },
      { label: 'Capture', href: '/help/capture' },
      { label: 'Desktop app', href: '/help/desktop' },
    ],
  },
  desktop: {
    title: 'Using the desktop app',
    intro: 'The desktop app is the main Ledger surface. It should stay calm, compact, and close enough to the work already open to feel like part of the system.',
    sections: [
      {
        title: 'Sidebar and docked use',
        paragraphs: ['Use Ledger as a floating sidebar or a docked panel beside your apps. The goal is to keep context nearby without turning it into another full window.'],
      },
      {
        title: 'Fast commands',
        paragraphs: ['Use keyboard shortcuts and command-style navigation to move between search, Today, capture, and workspace items quickly.'],
      },
    ],
    related: [
      { label: 'Keyboard and Siri shortcuts', href: '/help/shortcuts' },
      { label: 'Capture', href: '/help/capture' },
      { label: 'Today', href: '/help/today' },
    ],
  },
  mobile: {
    title: 'Using the mobile app',
    intro: 'Mobile is for quick capture, a fast check-in, and notification review when you are away from your desk. It should stay light and focused on attention.',
    sections: [
      {
        title: 'What mobile is for',
        paragraphs: ['Use mobile to capture an idea, check Today, or deal with a notification without trying to recreate the desktop experience.'],
      },
      {
        title: 'Keep workspace context visible',
        paragraphs: ['Every item still belongs to a workspace. Mobile should make that clear so the item lands in the right place.'],
      },
    ],
    related: [
      { label: 'Today', href: '/help/today' },
      { label: 'Notifications', href: '/help/notifications' },
      { label: 'Capture', href: '/help/capture' },
    ],
  },
  'browser-extension': {
    title: 'Using the browser extension',
    intro: 'The browser extension saves web context into the right workspace without breaking your browsing flow. It is the fastest bridge from the web into Ledger.',
    sections: [
      {
        title: 'Save pages and selected text',
        paragraphs: ['Send the current page, a useful link, or a highlighted passage into Ledger when the source itself matters.'],
      },
      {
        title: 'Turn web captures into work',
        paragraphs: ['Once a page lands in Ledger, turn it into a note, task, reminder, or project action so it can actually move forward.'],
      },
    ],
    related: [
      { label: 'Capture', href: '/help/capture' },
      { label: 'Search', href: '/help/search' },
      { label: 'Integrations', href: '/features/integrations' },
    ],
  },
  shortcuts: {
    title: 'Keyboard and Siri shortcuts',
    intro: 'Shortcuts help Ledger feel quick enough to use throughout the day. Use keyboard commands on desktop and Siri Shortcuts where the platform supports them.',
    sections: [
      {
        title: 'Desktop shortcuts',
        paragraphs: ['Use shortcuts for search, capture, navigation, and any action you repeat often. The best shortcuts remove the need to reach for the mouse.'],
      },
      {
        title: 'Capture and navigation shortcuts',
        paragraphs: ['Shortcuts should help you jump to Today, open search, capture something new, or move between workspaces without friction.'],
      },
      {
        title: 'Siri Shortcuts',
        paragraphs: ['If Siri Shortcuts are available on your device, use them for quick capture and common Ledger actions when hands-free input is faster.'],
      },
    ],
    related: [
      { label: 'Desktop app', href: '/help/desktop' },
      { label: 'Mobile app', href: '/help/mobile' },
      { label: 'Capture', href: '/help/capture' },
    ],
  },
  account: {
    title: 'Account and sessions',
    intro: 'Your Ledger account keeps your workspaces in sync across devices. Make sure you know where you are signed in and keep access secure.',
    sections: [
      {
        title: 'Account basics',
        paragraphs: ['Use one account to keep desktop, mobile, and browser captures in the same workspace system.'],
      },
      {
        title: 'Sessions and security',
        paragraphs: ['Review active devices, sign out where needed, and keep an eye on anything unusual.'],
      },
    ],
    related: [
      { label: 'Troubleshooting', href: '/help/troubleshooting' },
      { label: 'Notifications', href: '/help/notifications' },
      { label: 'Workspaces', href: '/help/workspaces' },
    ],
  },
  troubleshooting: {
    title: 'Troubleshooting Ledger',
    intro: 'If something feels off, start with the route you are on, the workspace you picked, and whether the app is signed in on the right device.',
    sections: [
      {
        title: 'Common checks',
        paragraphs: ['Confirm your network, refresh the app, and make sure the workspace and account are correct before digging deeper.'],
        bullets: ['Check sign-in state', 'Confirm the default workspace', 'Try again on a stable connection', 'Contact support with the exact route or error'],
      },
      {
        title: 'When to reach out',
        paragraphs: ['If a capture, notification, or invite does not behave the way it should, send support the steps you took and the workspace involved.'],
      },
    ],
    related: [
      { label: 'Contact support', href: '/help/contact' },
      { label: 'Account and sessions', href: '/help/account' },
      { label: 'Using workspaces', href: '/help/workspaces' },
    ],
  },
  contact: {
    title: 'Contact support',
    intro: 'If something is blocked, confusing, or not behaving the way it should, send a clear note to Ledger support and include the workspace and route involved.',
    sections: [
      {
        title: 'What to include',
        paragraphs: ['Tell us what you were trying to do, which workspace it happened in, and what you expected to happen instead.'],
        bullets: ['The route or page you were on', 'The workspace involved', 'Any error text you saw', 'Whether you were on desktop, mobile, or browser'],
      },
      {
        title: 'How to reach us',
        paragraphs: ['Email the team at ledgerworkspace@gmail.com or use the contact link in the site header.'],
      },
    ],
    related: [
      { label: 'Troubleshooting', href: '/help/troubleshooting' },
      { label: 'Getting started', href: '/help/getting-started' },
      { label: 'Shortcuts', href: '/help/shortcuts' },
    ],
  },
}

const helpIndexCards: Array<{ title: string; description: string; href: string; icon: LucideIcon }> = [
  { title: 'Getting started', description: 'Learn the core Ledger loop and pick your first workspace.', href: '/help/getting-started', icon: Workflow },
  { title: 'Workspaces', description: 'Keep different contexts separated without losing the big picture.', href: '/help/workspaces', icon: Layers3 },
  { title: 'Capture', description: 'Save notes, tasks, events, reminders, and links quickly.', href: '/help/capture', icon: BookOpen },
  { title: 'Today', description: 'Review what needs attention right now.', href: '/help/today', icon: CalendarDays },
  { title: 'Search', description: 'Find items across workspaces and sources.', href: '/help/search', icon: Search },
  { title: 'Desktop', description: 'Use Ledger as a sidebar beside your work.', href: '/help/desktop', icon: LaptopMinimal },
  { title: 'Mobile', description: 'Capture and check in away from your desk.', href: '/help/mobile', icon: Smartphone },
  { title: 'Shortcuts', description: 'Move faster with keyboard and Siri shortcuts.', href: '/help/shortcuts', icon: Sparkles },
]

function HelpFrame({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <section className="rounded-[28px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <p className="text-[12px] font-medium text-(--ledger-text-secondary)">Help / {title}</p>
      <h1 className="mt-3 max-w-3xl text-[clamp(2.4rem,5vw,4.3rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-[17px] leading-8 text-(--ledger-text-secondary)">{intro}</p>
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  )
}

function HelpArticlePage({ article }: { article: HelpArticle }) {
  return (
    <HelpFrame title={article.title} intro={article.intro}>
      {article.sections.map((section) => (
        <div key={section.title} className="border-t border-(--ledger-border-subtle) pt-6 first:border-t-0 first:pt-0">
          <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-ledger-text-primary">{section.title}</h2>
          <div className="mt-3 space-y-3 text-[15px] leading-7 text-ledger-text-secondary">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="list-disc space-y-2 pl-5">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ))}

      <div className="border-t border-(--ledger-border-subtle) pt-6">
        <h2 className="text-[13px] font-medium text-(--ledger-text-secondary)">Related articles</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {article.related.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center justify-between rounded-[20px] border border-(--ledger-border-subtle) px-4 py-3 text-[14px] font-medium text-ledger-text-primary transition-colors hover:bg-(--ledger-surface-muted)"
            >
              {item.label}
              <ArrowRight className="h-4 w-4 text-ledger-text-secondary" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-(--ledger-border-subtle) pt-6">
        <a
          href="/help/contact"
          className="inline-flex h-11 items-center justify-center rounded-full bg-ledger-accent px-5 text-[14px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
        >
          Contact support
        </a>
      </div>
    </HelpFrame>
  )
}

function HelpIndexPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:items-end lg:gap-16">
        <div>
          <p className="text-[13px] font-medium text-(--ledger-text-secondary)">Help center</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(3rem,7vw,5.8rem)] font-medium leading-[0.96] tracking-[-0.06em] text-ledger-text-primary">
            Help that stays close to the product.
          </h1>
        </div>

        <div className="lg:justify-self-end">
          <p className="max-w-xl text-[18px] leading-8 tracking-[-0.02em] text-(--ledger-text-secondary) sm:text-[20px]">
            Find the basics, learn the core flows, and get help when something is not behaving the way it should.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/help/getting-started"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ledger-accent px-5 text-[14px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
            >
              Getting started
            </a>
            <a
              href="/help/contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 text-[14px] font-semibold leading-none text-ledger-text transition-colors duration-200 hover:bg-(--ledger-surface-muted)"
            >
              Contact support
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {helpIndexCards.map((card) => {
          const Icon = card.icon
          return (
            <a
              key={card.title}
              href={card.href}
              className="group rounded-[24px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) p-5 transition-colors hover:bg-(--ledger-surface-muted)"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.48)]">
                <Icon className="h-4.5 w-4.5 text-ledger-text-primary" />
              </div>
              <h2 className="mt-4 text-[18px] font-semibold tracking-[-0.03em] text-ledger-text-primary">{card.title}</h2>
              <p className="mt-2 text-[14px] leading-6 text-ledger-text-secondary">{card.description}</p>
              <div className="mt-5 flex items-center gap-2 text-[13px] font-medium text-ledger-text-primary">
                Open article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          )
        })}
      </section>
    </div>
  )
}

export function HelpPage({ pathname }: { pathname: string }) {
  if (isSiteLocked()) {
    return <LockedSplash />
  }

  const slug = pathname.replace(/^\/help\/?/, '') as HelpSlug | ''

  return (
    <div className="min-h-dvh bg-ledger-surface text-ledger-text">
      <SiteHeader currentPath={pathname} />
      <main>
        {pathname === '/help' || pathname === '/help/index' || slug === '' ? (
          <HelpIndexPage />
        ) : (
          <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:py-24">
            {slug === 'contact' ? (
              <HelpArticlePage article={helpArticles.contact} />
            ) : (
              <HelpArticlePage article={helpArticles[slug as HelpSlug]} />
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
