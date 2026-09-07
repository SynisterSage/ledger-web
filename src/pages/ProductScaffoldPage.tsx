import { SiteHeader } from '../components/layout/SiteHeader'
import { LockedSplash } from '../components/sections/LockedSplash'
import { SiteFooter } from '../components/sections/SiteFooter'
import { FeatureCardGrid, FeaturedFeatureCard, StandardFeatureCard } from '../components/feature/FeatureCards'
import { ProjectsDirectoryArtwork } from '../components/feature/ProjectsDirectoryArtwork'
import { NotesDirectoryArtwork } from '../components/feature/NotesDirectoryArtwork'
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
        <section className="features-hero flex flex-col items-center pt-24 text-center sm:pt-32 lg:pt-40" aria-labelledby="features-hero-title">
          <h1 id="features-hero-title" className="max-w-[760px] text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.07em] text-ledger-text-primary">
            The workspace for keeping work connected.
          </h1>
          <p className="features-hero__lede mt-7 max-w-xl text-[16px] leading-7 text-(--ledger-text-secondary) sm:mt-8 sm:text-[18px] sm:leading-8">
            Bring projects, notes, meetings, calendar, capture, people, and connected tools into one calm system for moving work forward.
          </p>
        </section>

        <section className="mt-20 pt-4 sm:mt-28 sm:pt-6 lg:mt-36" aria-label="Ledger features">
          <FeatureCardGrid className="w-full">
            <FeaturedFeatureCard
              href="/features/projects"
              label="Plan & organize"
              title="Projects"
              description="Planning, tasks, milestones, and timeline in one place."
              className="md:col-span-2"
              artwork={{ label: 'Projects directory artwork', dimensions: '1600 × 700', alt: 'Abstract project roadmap with milestones and a structured timeline', aspectRatio: '16 / 6.35', visual: <ProjectsDirectoryArtwork /> }}
            />
            <FeaturedFeatureCard
              href="/features/notes"
              label="Think & capture"
              title="Notes"
              description="Write, mind map, transcribe, and keep today’s note."
              className="md:col-span-2"
              artwork={{ label: 'Notes directory artwork', dimensions: '1600 × 700', alt: 'Abstract field of note fragments resolving into connected knowledge', aspectRatio: '16 / 6.35', visual: <NotesDirectoryArtwork /> }}
            />
            <StandardFeatureCard
              href="/features/calendar"
              label="Plan & organize"
              title="Calendar"
              description="Events, reminders, deadlines, and calendar sync."
              artwork={{ label: 'Calendar directory artwork', dimensions: '1400 × 1000', alt: 'Ledger Calendar showing project tasks, reminders, and scheduled work across the month', src: '/assets/featuredirectory/features1.webp', aspectRatio: '16 / 9' }}
            />
            <StandardFeatureCard
              href="/features/capture"
              label="Think & capture"
              title="Capture"
              description="Intake, quick capture, and browser capture."
              artwork={{ label: 'Capture directory artwork', dimensions: '1400 × 1000', alt: 'Capture feature artwork', aspectRatio: '16 / 9' }}
            />
            <FeaturedFeatureCard
              href="/integrations"
              label="Connect your work"
              title="Connected work"
              description="Slack, GitHub, Figma, Drive, and the integrations around your work."
              className="md:col-span-2"
              artwork={{ label: 'Connected work directory artwork', dimensions: '1600 × 700', alt: 'Connected work feature artwork', aspectRatio: '16 / 6.35' }}
            />
            <StandardFeatureCard
              href="/features/workspaces"
              label="Shared work"
              title="Teams / Workspaces"
              description="Shared work, collaboration, and teamspaces."
              artwork={{ label: 'Teams and workspaces directory artwork', dimensions: '1400 × 1000', alt: 'Teams and workspaces feature artwork', aspectRatio: '16 / 9' }}
            />
            <StandardFeatureCard
              label="Across your workspace"
              title="Search"
              description="Global and contextual search across the work."
              artwork={{ label: 'Search directory artwork', dimensions: '1400 × 1000', alt: 'Search feature artwork', aspectRatio: '16 / 9' }}
            />
            <FeaturedFeatureCard
              href="/platforms/mobile"
              label="Work anywhere"
              title="Mobile"
              description="Keep Ledger and the work that matters with you away from desktop."
              className="md:col-span-2"
              artwork={{ label: 'Mobile directory artwork', dimensions: '1600 × 700', alt: 'Mobile app feature artwork', aspectRatio: '16 / 6.35' }}
            />
          </FeatureCardGrid>
        </section>
      </main>
    )

    /* Previous multi-section directory retained temporarily for review.
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-20 sm:px-8 sm:pb-28 lg:pb-36">
        <section className="flex flex-col items-center pt-24 text-center sm:pt-32 lg:pt-40" aria-labelledby="features-hero-title">
          <h1 id="features-hero-title" className="max-w-[760px] text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.07em] text-ledger-text-primary">
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

        <nav className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 border-y border-(--ledger-border) py-4 text-[13px] text-(--ledger-text-muted) sm:mt-14 sm:gap-x-7" aria-label="Feature categories">
          <a href="#features-plan-title" className="transition-colors hover:text-ledger-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ledger-accent) focus-visible:ring-offset-2">Plan &amp; organize</a>
          <a href="#features-thinking-title" className="transition-colors hover:text-ledger-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ledger-accent) focus-visible:ring-offset-2">Think &amp; capture</a>
          <a href="#features-connected-title" className="transition-colors hover:text-ledger-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ledger-accent) focus-visible:ring-offset-2">Connect your work</a>
          <a href="#features-workspace-title" className="transition-colors hover:text-ledger-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ledger-accent) focus-visible:ring-offset-2">Across your workspace</a>
          <a href="#features-platform-title" className="transition-colors hover:text-ledger-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ledger-accent) focus-visible:ring-offset-2">Work anywhere</a>
        </nav>

        <section className="mt-24 border-t border-(--ledger-border) pt-10 sm:mt-36 sm:pt-14 lg:mt-48" aria-labelledby="features-plan-title">
          <div className="max-w-xl">
            <p className="text-[12px] font-medium tracking-[0.04em] text-(--ledger-text-muted)">Plan &amp; organize</p>
            <h2 id="features-plan-title" className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">
              Give open work a place to move.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-(--ledger-text-secondary)">
              Set direction, keep the next step visible, and make time for what matters.
            </p>
          </div>

          <FeatureCardGrid className="mt-12 sm:mt-16">
            <FeaturedFeatureCard
              href="/features/projects"
              label="Plan & organize"
              title="Projects"
              description="Turn a goal into a clear path forward."
              className="md:col-span-2"
              artwork={{ label: 'Projects directory artwork', alt: 'Projects feature artwork', aspectRatio: '16 / 7' }}
            />
            <StandardFeatureCard
              href="/features/projects"
              label="Plan & organize"
              title="Tasks"
              description="Keep the next move easy to find."
              artwork={{ label: 'Tasks directory artwork', alt: 'Tasks feature artwork', aspectRatio: '16 / 10' }}
            />
            <StandardFeatureCard
              href="/features/calendar"
              label="Plan & organize"
              title="Calendar"
              description="Give important work a time."
              artwork={{ label: 'Calendar directory artwork', alt: 'Calendar feature artwork', aspectRatio: '16 / 9' }}
            />
            <StandardFeatureCard
              href="/features/projects"
              label="Plan & organize"
              title="Milestones"
              description="See the meaningful steps along the way."
              artwork={{ label: 'Milestones directory artwork', alt: 'Milestones feature artwork', aspectRatio: '3 / 2' }}
            />
            <StandardFeatureCard
              href="/features/calendar"
              label="Plan & organize"
              title="Today"
              description="Know what deserves your attention now."
              artwork={{ label: 'Today directory artwork', alt: 'Today feature artwork', aspectRatio: '4 / 3' }}
            />
          </FeatureCardGrid>
        </section>

        <section className="mt-28 border-t border-(--ledger-border) pt-10 sm:mt-40 sm:pt-14 lg:mt-52" aria-labelledby="features-thinking-title">
          <div className="max-w-xl">
            <p className="text-[12px] font-medium tracking-[0.04em] text-(--ledger-text-muted)">Think &amp; capture</p>
            <h2 id="features-thinking-title" className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">
              Catch the thought, keep the context.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-(--ledger-text-secondary)">
              Bring ideas in quickly, then give them enough shape to become useful.
            </p>
          </div>

          <FeatureCardGrid className="mt-12 sm:mt-16">
            <FeaturedFeatureCard
              href="/features/notes"
              label="Think &amp; capture"
              title="Notes"
              description="Develop ideas, meetings, and working context in one flexible space."
              artworkFirst
              className="md:col-span-2"
              artwork={{ label: 'Notes directory artwork', alt: 'Notes feature artwork', aspectRatio: '16 / 6.5' }}
            />
            <StandardFeatureCard
              href="/features/capture"
              label="Think &amp; capture"
              title="Capture / Intake"
              description="Get something into Ledger before it disappears."
              artwork={{ label: 'Capture directory artwork', alt: 'Capture feature artwork', aspectRatio: '16 / 9' }}
            />
            <StandardFeatureCard
              href="/features/notes"
              label="Think &amp; capture"
              title="Mind Map"
              description="See the structure of an idea differently."
              artwork={{ label: 'Mind map directory artwork', alt: 'Mind map feature artwork', aspectRatio: '4 / 3' }}
            />
            <StandardFeatureCard
              href="/features/notes"
              label="Think &amp; capture"
              title="Transcribe"
              description="Turn conversations into usable context."
              artwork={{ label: 'Transcribe directory artwork', alt: 'Transcribe feature artwork', aspectRatio: '3 / 2' }}
            />
            <StandardFeatureCard
              href="/features/notes"
              label="Think &amp; capture"
              title="Today’s note"
              description="Keep a lightweight record of the day."
              artwork={{ label: 'Today’s note directory artwork', alt: 'Today’s note feature artwork', aspectRatio: '16 / 10' }}
            />
          </FeatureCardGrid>
        </section>

        <section className="mt-28 border-t border-(--ledger-border) pt-10 sm:mt-40 sm:pt-14 lg:mt-52" aria-labelledby="features-connected-title">
          <div className="max-w-xl">
            <p className="text-[12px] font-medium tracking-[0.04em] text-(--ledger-text-muted)">Connect your work</p>
            <h2 id="features-connected-title" className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">
              Keep the tools around the work attached to it.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-(--ledger-text-secondary)">
              Bring useful outside context close without turning Ledger into another version of every tool you use.
            </p>
          </div>

          <FeatureCardGrid className="mt-12 sm:mt-16">
            <FeaturedFeatureCard
              href="/integrations"
              label="Connect your work"
              title="Connected work"
              description="Keep tools and resources attached to the work they support."
              className="md:col-span-2"
              artwork={{ label: 'Connected work directory artwork', alt: 'Connected work feature artwork', aspectRatio: '16 / 7' }}
            />
            <StandardFeatureCard
              href="/integrations/slack"
              label="Connect your work"
              title="Slack"
              description="Bring important conversations out of the stream."
              artwork={{ label: 'Slack directory artwork', alt: 'Slack integration artwork', aspectRatio: '16 / 9' }}
            />
            <StandardFeatureCard
              href="/integrations/github"
              label="Connect your work"
              title="GitHub"
              description="Keep development context connected to its project."
              artwork={{ label: 'GitHub directory artwork', alt: 'GitHub integration artwork', aspectRatio: '4 / 3' }}
            />
            <StandardFeatureCard
              href="/integrations/figma"
              label="Connect your work"
              title="Figma"
              description="Keep design resources close to the work they support."
              artwork={{ label: 'Figma directory artwork', alt: 'Figma integration artwork', aspectRatio: '3 / 2' }}
            />
            <StandardFeatureCard
              href="/integrations/google-drive"
              label="Connect your work"
              title="Google Drive"
              description="Connect files and shared resources to their surrounding work."
              artwork={{ label: 'Google Drive directory artwork', alt: 'Google Drive integration artwork', aspectRatio: '16 / 10' }}
            />
            <StandardFeatureCard
              href="/features/calendar"
              label="Connect your work"
              title="Calendar connections"
              description="Bring external calendars into the work around them."
              className="md:col-span-2"
              artwork={{ label: 'Calendar connections directory artwork', alt: 'Calendar connections feature artwork', aspectRatio: '16 / 6.5' }}
            />
          </FeatureCardGrid>
        </section>

        <section className="mt-24 border-t border-(--ledger-border) pt-10 sm:mt-36 sm:pt-14 lg:mt-48" aria-labelledby="features-workspace-title">
          <div className="max-w-xl">
            <p className="text-[12px] font-medium tracking-[0.04em] text-(--ledger-text-muted)">Across your workspace</p>
            <h2 id="features-workspace-title" className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">
              Keep the whole day within reach.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-(--ledger-text-secondary)">
              Move through the workspace quickly, with the right signal close when you need it.
            </p>
          </div>

          <FeatureCardGrid className="mt-12 sm:mt-16">
            <StandardFeatureCard
              label="Across your workspace"
              title="Search"
              description="Find the thread, note, or task you need next."
              className="md:col-span-2"
              artwork={{ label: 'Search directory artwork', alt: 'Search feature artwork', aspectRatio: '16 / 6.5' }}
            />
            <StandardFeatureCard
              label="Across your workspace"
              title="Overview"
              description="See what deserves attention across the day."
              artwork={{ label: 'Overview directory artwork', alt: 'Overview feature artwork', aspectRatio: '4 / 3' }}
            />
            <StandardFeatureCard
              label="Across your workspace"
              title="Activity"
              description="Keep up with the work moving around you."
              artwork={{ label: 'Activity directory artwork', alt: 'Activity feature artwork', aspectRatio: '3 / 2' }}
            />
            <StandardFeatureCard
              label="Across your workspace"
              title="Notifications"
              description="Return to the signals that need a response."
              artwork={{ label: 'Notifications directory artwork', alt: 'Notifications feature artwork', aspectRatio: '16 / 10' }}
            />
          </FeatureCardGrid>
        </section>

        <section className="mt-24 border-t border-(--ledger-border) pt-10 sm:mt-36 sm:pt-14 lg:mt-48" aria-labelledby="features-platform-title">
          <div className="max-w-xl">
            <p className="text-[12px] font-medium tracking-[0.04em] text-(--ledger-text-muted)">Work anywhere</p>
            <h2 id="features-platform-title" className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">
              Keep the work close, wherever the day takes you.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-(--ledger-text-secondary)">
              Use the Ledger experience that fits the moment, from focused desktop work to quick mobile context and browser access.
            </p>
          </div>

          <FeatureCardGrid className="mt-12 sm:mt-16">
            <FeaturedFeatureCard
              href="/platforms/desktop"
              label="Work anywhere"
              title="Desktop"
              description="The full Ledger workspace for focused work."
              className="md:col-span-2"
              artwork={{ label: 'Desktop directory artwork', alt: 'Desktop app feature artwork', aspectRatio: '16 / 7' }}
            />
            <StandardFeatureCard
              href="/platforms/mobile"
              label="Work anywhere"
              title="Mobile"
              description="Keep the work that matters with you."
              artwork={{ label: 'Mobile directory artwork', alt: 'Mobile app feature artwork', aspectRatio: '4 / 3' }}
            />
            <StandardFeatureCard
              href="/platforms/web"
              label="Work anywhere"
              title="Web"
              description="Access Ledger from a desktop browser without installing the app."
              artwork={{ label: 'Web directory artwork', alt: 'Web app feature artwork', aspectRatio: '16 / 9' }}
            />
          </FeatureCardGrid>
        </section>
      </main>
    ) */
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
    <div className={`min-h-dvh text-ledger-text ${content.path === '/features' ? 'bg-(--ledger-background)' : 'bg-ledger-surface'}`}>
      <SiteHeader currentPath={content.path} />
      <FeatureSimplePage content={content} />
      <SiteFooter />
    </div>
  )
}
