import { ArrowUpRight, Archive, Bell, CalendarDays, ChevronRight, FolderKanban, Inbox, Sparkles } from 'lucide-react'
import { SiteHeader } from '../components/layout/SiteHeader'
import { ActionButton } from '../components/ui/ActionButton'
import { MediaFrame } from '../components/feature/MediaFrame'
import { SiteFooter } from '../components/sections/SiteFooter'
import { isSiteLocked } from '../lib/siteLock'
import { LockedSplash } from '../components/sections/LockedSplash'
import '../styles/capture-page.css'

const relatedFeatures = [
  { href: '/features/notes', label: 'Notes', copy: 'Keep useful context.', icon: Sparkles },
  { href: '/features/projects', label: 'Projects', copy: 'Move work forward.', icon: FolderKanban },
  { href: '/features/calendar', label: 'Calendar', copy: 'Give work a time.', icon: CalendarDays },
  { href: '/features/workspaces', label: 'Workspaces', copy: 'Keep work in its place.', icon: Inbox },
]

export function CaptureFeaturePage() {
  if (isSiteLocked()) return <LockedSplash />

  return (
    <div className="capture-page min-h-dvh bg-ledger-bg text-(--ledger-text-primary)">
      <SiteHeader currentPath="/features/capture" />
      <main>
        <section className="capture-hero page-section">
          <div className="capture-hero__copy">
            <p className="feature-eyebrow">Capture</p>
            <h1>Catch it before it&apos;s gone.</h1>
            <p className="feature-lede">Capture thoughts, links, tasks, reminders, and incoming work without leaving what you&apos;re doing.</p>
            <div className="feature-actions">
              <ActionButton href="/download">Download Ledger</ActionButton>
              <ActionButton href="/help/capture" variant="secondary">See how capture works</ActionButton>
            </div>
          </div>
          <MediaFrame label="Capture hero artwork" recommendation="1600 × 900 recommended" className="capture-hero__media" />
        </section>

        <section className="capture-context page-section">
          <div className="section-intro">
            <div className="section-copy">
              <p className="feature-eyebrow">Capture without interruption</p>
              <h2>Stay with the work in front of you.</h2>
            </div>
            <div className="section-explanation">
              <p>Quick Capture keeps Ledger close by, so a thought can become useful without turning into another detour.</p>
              <div className="inline-detail"><span className="inline-detail__mark">⌘</span><span>Add a note, task, reminder, or link in a few keystrokes.</span></div>
            </div>
          </div>
          <MediaFrame label="Sidebar / Quick Capture artwork" recommendation="1600 × 900 recommended" className="capture-context__media" />
        </section>

        <section className="capture-surfaces page-section">
          <div className="section-heading section-heading--wide">
            <p className="feature-eyebrow">Capture from anywhere</p>
            <h2>When the thought happens, Ledger is there.</h2>
          </div>
          <div className="surface-collage">
            <MediaFrame label="Desktop capture artwork" recommendation="1200 × 700 recommended" className="surface-collage__desktop" />
            <MediaFrame label="Mobile capture artwork" recommendation="700 × 960 recommended" className="surface-collage__mobile" />
            <MediaFrame label="Browser extension artwork" recommendation="1400 × 620 recommended" className="surface-collage__browser" />
          </div>
        </section>

        <section className="capture-intake page-section">
          <div className="section-intro">
            <div className="section-copy section-copy--narrow">
              <p className="feature-eyebrow">Everything arrives somewhere useful</p>
              <h2>Everything has somewhere to land.</h2>
            </div>
            <div className="section-explanation">
              <p>Incoming material can wait in Intake until you have the context to decide what it needs to become.</p>
              <div className="intake-signals"><span>Source</span><span>Type</span><span>Workspace</span><span>Project</span></div>
            </div>
          </div>
          <MediaFrame label="Intake artwork" recommendation="1600 × 900 recommended" className="capture-intake__media" />
        </section>

        <section className="capture-conversion page-section">
          <div className="section-heading section-heading--conversion">
            <p className="feature-eyebrow">Decide what it becomes</p>
            <h2>A capture is a beginning, not a category.</h2>
            <p>Turn one incoming thought into the kind of work that can move.</p>
          </div>
          <MediaFrame label="Capture conversion artwork" recommendation="1600 × 700 recommended" className="capture-conversion__media" />
          <div className="conversion-grid" aria-label="Things a capture can become">
            <div><strong>Note</strong><span>Keep the useful context.</span></div>
            <div><strong>Task</strong><span>Give the next move a home.</span></div>
            <div><strong>Event</strong><span>Give the work a time.</span></div>
            <div><strong>Follow-up</strong><span>Remember to come back.</span></div>
          </div>
        </section>

        <section className="capture-place page-section page-section--split page-section--reverse">
          <MediaFrame label="Capture context artwork" recommendation="1200 × 900 recommended" className="capture-place__media" />
          <div className="section-copy">
            <p className="feature-eyebrow">Put it in context</p>
            <h2>Capture now. Place it when you&apos;re ready.</h2>
            <p>Connect work to the workspace, project, person, date, or note where it will make sense later.</p>
            <div className="context-links"><span>Workspace</span><span>Project</span><span>Date</span></div>
          </div>
        </section>

        <section className="capture-actions page-section">
          <div className="capture-actions__copy">
            <p className="feature-eyebrow">Not everything needs attention now</p>
            <h2>Make room to review it later.</h2>
            <p>Snooze, archive, restore, or filter incoming work without creating another inbox to babysit.</p>
          </div>
          <div className="capture-actions__aside">
            <MediaFrame label="Intake actions artwork" recommendation="1200 × 720 recommended" className="capture-actions__media" />
            <div className="action-grid">
              <span><Bell size={15} /><span className="action-grid__label">Snooze</span></span><span><Archive size={15} /><span className="action-grid__label">Archive</span></span>
              <span><Inbox size={15} /><span className="action-grid__label">Review later</span></span><span><Sparkles size={15} /><span className="action-grid__label">Filter incoming</span></span>
            </div>
          </div>
        </section>

        <section className="capture-related page-section">
          <div className="section-heading">
            <p className="feature-eyebrow">Capture is the beginning</p>
            <h2>Keep the work moving.</h2>
          </div>
          <nav className="related-features" aria-label="Related Ledger features">
            {relatedFeatures.map(({ href, label, copy, icon: Icon }) => (
              <a key={href} href={href} className="related-feature">
                <span className="related-feature__icon"><Icon size={17} strokeWidth={1.8} /></span>
                <span><strong>{label}</strong><small>{copy}</small></span>
                <ChevronRight className="related-feature__arrow" size={20} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </section>

        <section className="capture-final-cta page-section">
          <p className="feature-eyebrow">A better first move</p>
          <h2>Catch the thought. Keep moving.</h2>
          <ActionButton href="/download">Download Ledger <ArrowUpRight size={16} /></ActionButton>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
