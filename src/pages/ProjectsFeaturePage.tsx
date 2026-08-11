import { ArrowUpRight, Bell, CalendarDays, ChevronRight, CircleCheck, Clock3, Flag, FolderKanban, ListChecks } from 'lucide-react'
import { SiteHeader } from '../components/layout/SiteHeader'
import { ActionButton } from '../components/ui/ActionButton'
import { MediaFrame } from '../components/feature/MediaFrame'
import { SiteFooter } from '../components/sections/SiteFooter'
import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'
import '../styles/projects-page.css'

const relatedFeatures = [
  { href: '/features/capture', label: 'Capture', copy: 'Start the next thing.', icon: ArrowUpRight },
  { href: '/features/notes', label: 'Notes', copy: 'Keep useful context.', icon: ListChecks },
  { href: '/features/calendar', label: 'Calendar', copy: 'Give the work a time.', icon: CalendarDays },
  { href: '/features/workspaces', label: 'Workspaces', copy: 'Keep it in the right place.', icon: FolderKanban },
]

export function ProjectsFeaturePage() {
  if (isSiteLocked()) return <LockedSplash />

  return (
    <div className="projects-page min-h-dvh bg-ledger-bg text-(--ledger-text-primary)">
      <SiteHeader currentPath="/features/projects" />
      <main>
        <section className="projects-hero projects-section">
          <div className="projects-hero__copy">
            <p className="feature-eyebrow">Projects</p>
            <h1>Keep the work moving.</h1>
            <p className="projects-lede">See what the work is, where it stands, and what should happen next without turning it into a miniature project-management system.</p>
            <div className="feature-actions">
              <ActionButton href="/download">Download Ledger</ActionButton>
              <ActionButton href="/help/projects" variant="secondary">See how Projects works</ActionButton>
            </div>
          </div>
          <MediaFrame label="Projects hero artwork" recommendation="1600 × 1000 recommended" className="projects-hero__media">
            <img src="/assets/featureimages/projects1.webp" alt="Ledger Projects showing a project roadmap and project overview" />
          </MediaFrame>
        </section>

        <section className="projects-model projects-section">
          <div className="projects-intro-row">
            <div>
              <p className="feature-eyebrow">Know what the work is</p>
              <h2>A project gives the work a clear center.</h2>
            </div>
            <div className="projects-intro-support">
              <p>Bring the name, description, workspace, people, notes, actions, and deadline into one calm view.</p>
              <div className="project-signals"><span>Workspace</span><span>Status</span><span>Progress</span><span>Next action</span></div>
            </div>
          </div>
          <MediaFrame label="Project overview artwork" recommendation="1600 × 900 recommended" className="projects-model__media">
            <img src="/assets/featureimages/projects2.webp" alt="Ledger Projects showing milestones, next actions, notes, and calendar context" />
          </MediaFrame>
        </section>

        <section className="projects-actions projects-section">
          <div className="projects-intro-row">
            <div>
              <p className="feature-eyebrow">Move the work forward</p>
              <h2>A project is more than a task list.</h2>
            </div>
            <p className="projects-intro-copy">Project actions keep attention on the next meaningful step, with notes, reminders, and follow-ups close by.</p>
          </div>
          <div className="projects-action-layout">
            <MediaFrame label="Project actions artwork" recommendation="1600 × 900 recommended" className="projects-actions__media">
              <img src="/assets/featureimages/projects3.webp" alt="Ledger Projects showing next actions and milestones with dates and details" />
            </MediaFrame>
            <div className="projects-action-list">
              <div><CircleCheck size={17} /><span><strong>Next action</strong><small>Know what to do now.</small></span></div>
              <div><Flag size={17} /><span><strong>Milestone</strong><small>Mark meaningful progress.</small></span></div>
              <div><Bell size={17} /><span><strong>Follow-up</strong><small>Make sure work resumes.</small></span></div>
            </div>
          </div>
        </section>

        <section className="projects-progress projects-section">
          <div className="projects-intro-row">
            <div>
              <p className="feature-eyebrow">See the work over time</p>
              <h2>Put the whole project on a timeline.</h2>
            </div>
            <div className="projects-intro-support">
              <p>See project spans, milestones, dates, and progress in the same view as the work itself.</p>
              <div className="project-statuses"><span><Clock3 size={16} />Timeline</span><span><Flag size={16} />Milestones</span><span><CalendarDays size={16} />Dates</span><span><CircleCheck size={16} />Progress</span></div>
            </div>
          </div>
          <MediaFrame label="Project timeline artwork" recommendation="1600 × 900 recommended" className="projects-progress__media">
            <img src="/assets/featureimages/projects4.webp" alt="Ledger Projects showing a project roadmap with spans, milestones, and dates" />
          </MediaFrame>
        </section>

        <section className="projects-context projects-section">
          <div className="projects-context__copy">
            <p className="feature-eyebrow">Keep the context attached</p>
            <h2>Projects connect the pieces around the work.</h2>
            <p>Keep related notes, tasks, events, captures, people, and workspace context close enough to act without rebuilding the story.</p>
          </div>
          <MediaFrame label="Connected project context artwork" recommendation="1600 × 1000 recommended" className="projects-context__media">
            <img src="/assets/featureimages/projects5.webp" alt="Ledger showing linked project context from notes, calendar, and integrations" />
          </MediaFrame>
        </section>

        <section className="projects-related projects-section">
          <div className="projects-section-heading">
            <p className="feature-eyebrow">Projects are part of the flow</p>
            <h2>Give the work somewhere to go next.</h2>
          </div>
          <nav className="projects-related__grid" aria-label="Related Ledger features">
            {relatedFeatures.map(({ href, label, copy, icon: Icon }) => (
              <a key={href} href={href} className="projects-related__link">
                <span className="projects-related__icon"><Icon size={17} strokeWidth={1.8} /></span>
                <span><strong>{label}</strong><small>{copy}</small></span>
                <ChevronRight className="projects-related__arrow" size={20} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </section>

        <section className="projects-final projects-section">
          <p className="feature-eyebrow">A clearer way forward</p>
          <h2>Know the work. Move it forward.</h2>
          <ActionButton href="/download">Download Ledger <ArrowUpRight size={16} /></ActionButton>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
