import { ArrowUpRight, CalendarDays, ChevronRight, FileText, FolderKanban, GitBranch, Link2, Mic2, Users } from 'lucide-react'
import { SiteHeader } from '../components/layout/SiteHeader'
import { ActionButton } from '../components/ui/ActionButton'
import { MediaFrame } from '../components/feature/MediaFrame'
import { SiteFooter } from '../components/sections/SiteFooter'
import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'
import '../styles/notes-page.css'

const relatedFeatures = [
  { href: '/features/capture', label: 'Capture', copy: 'Start the thought.', icon: FileText },
  { href: '/features/projects', label: 'Projects', copy: 'Turn it into action.', icon: FolderKanban },
  { href: '/features/calendar', label: 'Calendar', copy: 'Give it time.', icon: CalendarDays },
  { href: '/features/connected-work', label: 'Connected work', copy: 'Keep the context attached.', icon: Link2 },
]

export function NotesFeaturePage() {
  if (isSiteLocked()) return <LockedSplash />

  return (
    <div className="notes-page min-h-dvh bg-ledger-bg text-(--ledger-text-primary)">
      <SiteHeader currentPath="/features/notes" />
      <main>
        <section className="notes-hero notes-section">
          <div className="notes-hero__copy">
            <p className="feature-eyebrow">Notes</p>
            <h1>Give the thought somewhere to grow.</h1>
            <p className="notes-lede">Write, meet, structure, and connect ideas in a note that can keep changing with the work.</p>
            <div className="feature-actions">
              <ActionButton href="/download">Download Ledger</ActionButton>
              <ActionButton href="/help/notes" variant="secondary">See how Notes works</ActionButton>
            </div>
          </div>
          <MediaFrame label="Notes hero artwork" recommendation="1600 × 1200 recommended" className="notes-hero__media">
            <img src="/assets/featureimages/notes1.webp" alt="Ledger Notes showing a structured meeting note and surrounding workspace context" />
          </MediaFrame>
        </section>

        <section className="notes-write notes-section">
          <div className="notes-intro-row">
            <div>
              <p className="feature-eyebrow">Write</p>
              <h2>Start simple. Keep going deeper.</h2>
            </div>
            <div className="notes-intro-support">
              <p className="notes-intro-copy">A clean writing surface for quick thoughts, detailed notes, and everything that appears between them.</p>
              <div className="editor-capabilities" aria-label="Note editor capabilities">
                Rich text, links, dates, and nested notes.
              </div>
            </div>
          </div>
          <MediaFrame label="Note editor artwork" recommendation="1600 × 980 recommended" className="notes-write__media" />
        </section>

        <section className="notes-modes notes-section">
          <div className="notes-intro-row">
            <div>
              <p className="feature-eyebrow">One note, different ways of thinking</p>
              <h2>Write it out. See how it connects.</h2>
            </div>
            <p className="notes-intro-copy">Move between writing, outlines, maps, and transcription as the idea takes shape.</p>
          </div>
          <div className="notes-mode-grid">
            <MediaFrame label="Write mode artwork" recommendation="1100 × 760 recommended" className="notes-mode-grid__write" />
            <MediaFrame label="Outline mode artwork" recommendation="760 × 1100 recommended" className="notes-mode-grid__outline" />
            <MediaFrame label="Mind map artwork" recommendation="1500 × 760 recommended" className="notes-mode-grid__map" />
          </div>
        </section>

        <section className="notes-meeting notes-section">
          <div className="notes-intro-row">
            <div>
              <p className="feature-eyebrow">Meetings become useful notes</p>
              <h2>Leave the meeting with more than a transcript.</h2>
            </div>
            <div className="notes-intro-support">
              <p className="notes-intro-copy">Turn the conversation into structured notes, follow-ups, tasks, and context that stays connected to the work.</p>
              <div className="meeting-outcomes"><span><Mic2 size={16} />Transcript</span><span><FileText size={16} />Structured notes</span><span><Users size={16} />Follow-ups</span><span><GitBranch size={16} />Project context</span></div>
            </div>
          </div>
          <MediaFrame label="Meeting notes / transcription artwork" recommendation="1600 × 900 recommended" className="notes-meeting__media" />
        </section>

        <section className="notes-structure notes-section">
          <div className="notes-intro-row">
            <div>
              <p className="feature-eyebrow">Structure without locking yourself in</p>
              <h2>Let the shape of the idea change.</h2>
            </div>
            <p className="notes-intro-copy">Nest related notes, start from a template, or pull back to an outline when you need the whole shape at once.</p>
          </div>
          <div className="notes-structure-grid">
            <MediaFrame label="Nested notes artwork" recommendation="900 × 620 recommended" className="notes-structure-grid__nested" />
            <MediaFrame label="Templates artwork" recommendation="900 × 620 recommended" className="notes-structure-grid__templates" />
            <MediaFrame label="Outline structure artwork" recommendation="1800 × 620 recommended" className="notes-structure-grid__outline" />
          </div>
        </section>

        <section className="notes-map notes-section">
          <div className="notes-intro-row">
            <div>
              <p className="feature-eyebrow">See the idea differently</p>
              <h2>Sometimes the structure is easier to see than to write.</h2>
            </div>
            <p className="notes-intro-copy">Move from a page to a map when the relationships matter as much as the words.</p>
          </div>
          <MediaFrame label="Mind map feature artwork" recommendation="1500 × 900 recommended" className="notes-map__media" />
        </section>

        <section className="notes-context notes-section">
          <div className="notes-intro-row">
            <div>
              <p className="feature-eyebrow">Keep context attached</p>
              <h2>A note should know what it belongs to.</h2>
            </div>
            <p className="notes-intro-copy">Connect ideas to projects, tasks, events, people, workspaces, other notes, and the resources that give them meaning.</p>
          </div>
          <MediaFrame label="Connected note context artwork" recommendation="1600 × 900 recommended" className="notes-context__media" />
        </section>

        <section className="notes-history notes-section">
          <div className="notes-history__copy">
            <p className="feature-eyebrow">Keep the history of the work</p>
            <h2>Come back to the thinking, not just the final draft.</h2>
            <p>Revisit earlier versions, carry useful knowledge forward, and export when the work needs to travel.</p>
          </div>
          <MediaFrame label="Note history / export artwork" recommendation="1000 × 620 recommended" className="notes-history__media" />
        </section>

        <section className="notes-related notes-section">
          <div className="notes-section-heading">
            <p className="feature-eyebrow">Notes are part of the flow</p>
            <h2>Keep building from here.</h2>
          </div>
          <nav className="notes-related__grid" aria-label="Related Ledger features">
            {relatedFeatures.map(({ href, label, copy, icon: Icon }) => (
              <a key={href} href={href} className="notes-related__link">
                <span className="notes-related__icon"><Icon size={17} strokeWidth={1.8} /></span>
                <span><strong>{label}</strong><small>{copy}</small></span>
                <ChevronRight className="notes-related__arrow" size={20} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </section>

        <section className="notes-final notes-section">
          <p className="feature-eyebrow">A place for the work to grow</p>
          <h2>Start with a thought. Build from there.</h2>
          <ActionButton href="/download">Download Ledger <ArrowUpRight size={16} /></ActionButton>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
