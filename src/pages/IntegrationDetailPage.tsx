import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Bot, CalendarDays, CheckSquare, ExternalLink, FolderOpen, GitBranch, Globe2, MessageSquare, Palette, Puzzle, Rss, Settings2 } from 'lucide-react'
import { getIntegrationBySlug, integrationCategories, integrations, type Integration, type IntegrationDetail } from '../data/integrations'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SiteFooter } from '../components/sections/SiteFooter'
import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

function GitHubArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="Ledger project with linked GitHub resources">
      <div className="h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface">
        <div className="flex h-10 items-center gap-2 border-b border-(--ledger-border-subtle) px-3">
          <span className="h-2 w-2 rounded-full bg-(--ledger-border)" /><span className="h-2 w-2 rounded-full bg-(--ledger-border)" /><span className="h-2 w-2 rounded-full bg-(--ledger-border)" />
          <span className="ml-2 text-[11px] text-ledger-text-muted">Project overview</span>
        </div>
        <div className="grid h-[calc(100%-2.5rem)] grid-cols-[0.8fr_1.2fr]">
          <div className="border-r border-(--ledger-border-subtle) p-3 sm:p-4">
            <p className="text-[10px] font-medium text-ledger-text-muted">Project</p>
            <p className="mt-2 truncate text-[12px] font-medium text-ledger-text-primary">Workspace launch</p>
            <div className="mt-5 space-y-2">
              {['Linked context', 'Milestones', 'Next actions'].map((item, index) => <div key={item} className={`rounded-[var(--ledger-control-radius)] px-2 py-2 text-[10px] ${index === 0 ? 'bg-(--ledger-surface-muted) text-ledger-text-primary' : 'text-ledger-text-muted'}`}>{item}</div>)}
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><GitBranch size={14} /></span><span className="text-[12px] font-medium text-ledger-text-primary">Linked context</span></div>
            <div className="mt-4 space-y-2.5">
              {['GitHub repository', 'Figma design file', 'Project notes'].map((item, index) => <div key={item} className="flex items-center gap-2 border-b border-(--ledger-border-subtle) pb-2.5 text-[10px] text-ledger-text-muted"><span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-ledger-accent' : 'bg-(--ledger-border)'}`} />{item}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlackArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="Slack message captured into Ledger Intake">
      <div className="grid h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface md:grid-cols-[1fr_48px_1fr]">
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><MessageSquare size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Slack</span></div>
          <div className="mt-5 rounded-[var(--ledger-control-radius)] border border-(--ledger-border-subtle) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Project launch</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Let’s keep the launch notes and next steps together so we can come back to them.</p><p className="mt-3 text-[9px] text-ledger-text-muted">#product · 10:42 AM</p></div>
        </div>
        <div className="flex items-center justify-center border-y border-(--ledger-border-subtle) md:border-x md:border-y-0"><ArrowUpRight size={16} className="text-ledger-accent" /></div>
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><BookOpen size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Ledger Intake</span></div>
          <div className="mt-5 rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Captured from Slack</p><p className="mt-2 line-clamp-2 text-[10px] leading-4 text-ledger-text-muted">Project launch notes and next steps</p><p className="mt-3 text-[9px] text-ledger-text-muted">Slack context attached</p></div>
        </div>
      </div>
    </div>
  )
}

function GoogleDriveArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="Replaceable Google Drive and Ledger connected context artwork">
      <div className="grid h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface md:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-(--ledger-border-subtle) p-3 sm:p-4 md:border-r md:border-b-0">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><FolderOpen size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Google Drive</span></div>
          <div className="mt-5 space-y-2"><div className="rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) px-2 py-2 text-[10px] text-ledger-text-primary">Workspace launch</div><div className="px-2 py-2 text-[10px] text-ledger-text-muted">Product documentation</div><div className="px-2 py-2 text-[10px] text-ledger-text-muted">Shared resources</div></div>
        </div>
        <div className="p-3 sm:p-4"><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><FolderOpen size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Ledger project</span></div><div className="mt-5 rounded-[var(--ledger-control-radius)] border border-(--ledger-border-subtle) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Linked context</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Launch brief and supporting resources</p><p className="mt-3 text-[9px] text-ledger-text-muted">Google Drive folder attached</p></div></div>
      </div>
    </div>
  )
}

function FigmaArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="Replaceable Figma design and Ledger project context artwork">
      <div className="grid h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface md:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-(--ledger-border-subtle) p-3 sm:p-4 md:border-r md:border-b-0">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><Palette size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Figma</span></div>
          <div className="mt-5 rounded-[var(--ledger-control-radius)] border border-(--ledger-border-subtle) p-3"><div className="h-16 rounded-md bg-(--ledger-surface-muted) sm:h-20"><div className="mx-auto h-full w-1/2 border-x border-(--ledger-border-subtle)" /></div><p className="mt-3 text-[10px] font-medium text-ledger-text-primary">Launch screens</p><p className="mt-1 text-[9px] text-ledger-text-muted">Design reference</p></div>
        </div>
        <div className="p-3 sm:p-4"><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><BookOpen size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Ledger project</span></div><div className="mt-5 rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Linked context</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Design decisions, notes, and next actions</p><p className="mt-3 text-[9px] text-ledger-text-muted">Figma reference attached</p></div></div>
      </div>
    </div>
  )
}

function AppleCalendarArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="Replaceable Apple Calendar and Ledger project context artwork">
      <div className="grid h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface md:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-(--ledger-border-subtle) p-3 sm:p-4 md:border-r md:border-b-0">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><CalendarDays size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Apple Calendar</span></div>
          <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[8px] text-ledger-text-muted"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>{Array.from({ length: 21 }, (_, index) => <span key={index} className={`rounded py-1 ${index === 14 ? 'bg-ledger-accent text-white' : 'bg-(--ledger-surface-muted)'}`}>{index + 1}</span>)}</div>
        </div>
        <div className="p-3 sm:p-4"><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><CalendarDays size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Ledger project</span></div><div className="mt-5 rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Project timeline</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Launch review · Tuesday, 14</p><p className="mt-3 text-[9px] text-ledger-text-muted">Calendar event attached</p></div></div>
      </div>
    </div>
  )
}

function AppleRemindersArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="Replaceable Apple Reminders and Ledger project context artwork">
      <div className="grid h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface md:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-(--ledger-border-subtle) p-3 sm:p-4 md:border-r md:border-b-0">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><CheckSquare size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Apple Reminders</span></div>
          <div className="mt-5 space-y-2"><div className="rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) px-2 py-2 text-[10px] text-ledger-text-primary">Project follow-ups</div><div className="px-2 py-2 text-[10px] text-ledger-text-muted">Personal</div><div className="px-2 py-2 text-[10px] text-ledger-text-muted">Shared lists</div></div>
        </div>
        <div className="p-3 sm:p-4"><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><CheckSquare size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Ledger project</span></div><div className="mt-5 rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Next actions</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Send launch notes · Due tomorrow</p><p className="mt-3 text-[9px] text-ledger-text-muted">Reminder context attached</p></div></div>
      </div>
    </div>
  )
}

function McpArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="MCP client connected to Ledger workspace context">
      <div className="grid h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface md:grid-cols-[1fr_48px_1fr]">
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><Bot size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">AI client</span></div>
          <div className="mt-5 rounded-[var(--ledger-control-radius)] border border-(--ledger-border-subtle) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">What needs attention today?</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Review project tasks and calendar items that need a next step.</p><p className="mt-3 text-[9px] text-ledger-text-muted">MCP request · workspace context</p></div>
        </div>
        <div className="flex items-center justify-center border-y border-(--ledger-border-subtle) md:border-x md:border-y-0"><ArrowUpRight size={16} className="text-ledger-accent" /></div>
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><Bot size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Ledger workspace</span></div>
          <div className="mt-5 rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Authorized context</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Projects, tasks, notes, and Today</p><p className="mt-3 text-[9px] text-ledger-text-muted">Workspace and scopes selected</p></div>
        </div>
      </div>
    </div>
  )
}

function CalendarFeedArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="Replaceable Ledger calendar feed and external calendar artwork">
      <div className="grid h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface md:grid-cols-[1fr_48px_1fr]"><div className="p-3 sm:p-4"><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><CalendarDays size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Ledger workspace</span></div><div className="mt-5 rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Project dates</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Launch review · Tuesday, 14</p><p className="mt-3 text-[9px] text-ledger-text-muted">Workspace calendar feed</p></div></div><div className="flex items-center justify-center border-y border-(--ledger-border-subtle) md:border-x md:border-y-0"><Rss size={16} className="text-ledger-accent" /></div><div className="p-3 sm:p-4"><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><CalendarDays size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Your calendar app</span></div><div className="mt-5 rounded-[var(--ledger-control-radius)] border border-(--ledger-border-subtle) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Subscribed calendar</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Ledger workspace dates</p><p className="mt-3 text-[9px] text-ledger-text-muted">Read-only calendar feed</p></div></div></div>
    </div>
  )
}

function BrowserExtensionArtwork() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 sm:p-6" aria-label="Browser page captured into Ledger Inbox">
      <div className="grid h-full overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface md:grid-cols-[1fr_48px_1fr]">
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><Puzzle size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Browser</span></div>
          <div className="mt-5 rounded-[var(--ledger-control-radius)] border border-(--ledger-border-subtle) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">Project launch research</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Selected text and source page ready to save.</p><p className="mt-3 text-[9px] text-ledger-text-muted">Current tab · selected text</p></div>
        </div>
        <div className="flex items-center justify-center border-y border-(--ledger-border-subtle) md:border-x md:border-y-0"><ArrowUpRight size={16} className="text-ledger-accent" /></div>
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--ledger-surface-muted)"><Puzzle size={13} /></span><span className="text-[11px] font-medium text-ledger-text-primary">Ledger Inbox</span></div>
          <div className="mt-5 rounded-[var(--ledger-control-radius)] bg-(--ledger-surface-muted) p-3"><p className="text-[10px] font-medium text-ledger-text-primary">New browser capture</p><p className="mt-2 text-[10px] leading-4 text-ledger-text-muted">Workspace launch · source attached</p><p className="mt-3 text-[9px] text-ledger-text-muted">Default workspace selected</p></div>
        </div>
      </div>
    </div>
  )
}

function IntegrationArtwork({ artwork }: { artwork: IntegrationDetail['artwork'] }) {
  return artwork === 'slack-capture' ? <SlackArtwork /> : artwork === 'google-drive-context' ? <GoogleDriveArtwork /> : artwork === 'figma-context' ? <FigmaArtwork /> : artwork === 'apple-calendar-context' ? <AppleCalendarArtwork /> : artwork === 'apple-reminders-context' ? <AppleRemindersArtwork /> : artwork === 'mcp-context' ? <McpArtwork /> : artwork === 'calendar-feed-context' ? <CalendarFeedArtwork /> : artwork === 'browser-extension-context' ? <BrowserExtensionArtwork /> : <GitHubArtwork />
}

function IntegrationArtworkCarousel({ detail }: { detail: IntegrationDetail }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const captions: Record<IntegrationDetail['artwork'], string> = {
    'slack-capture': 'A Slack conversation captured into Ledger with its source context attached.',
    'google-drive-context': 'Google Drive resources connected to a Ledger project.',
    'figma-context': 'Figma design context connected to a Ledger project.',
    'apple-calendar-context': 'Apple Calendar dates connected to a Ledger project.',
    'apple-reminders-context': 'Apple Reminders connected to Ledger next actions.',
    'mcp-context': 'An MCP client working with authorized Ledger workspace context.',
    'calendar-feed-context': 'A Ledger workspace calendar feed in an external calendar app.',
    'browser-extension-context': 'A browser page captured into the right Ledger workspace Inbox.',
    'github-workflow': 'A project view with GitHub resources connected to the work around them.',
  }
  const slides = detail.artworkSlides ?? [{ label: 'Overview', caption: captions[detail.artwork] }]
  const activeSlide = slides[activeIndex]
  const move = (direction: -1 | 1) => setActiveIndex((index) => (index + direction + slides.length) % slides.length)

  return (
    <div aria-label="Integration screenshots" aria-roledescription="carousel">
      <div aria-live="polite" aria-atomic="true">
        {activeSlide.image ? <img src={activeSlide.image} alt={activeSlide.alt ?? activeSlide.label} className="block aspect-[16/10] w-full rounded-[var(--ledger-radius-lg)] border border-(--ledger-border-subtle) object-cover" /> : <IntegrationArtwork artwork={detail.artwork} />}
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-medium text-ledger-text-primary">{activeSlide.label}</p>
          <p className="mt-0.5 text-[12px] text-ledger-text-muted">{activeSlide.caption}</p>
        </div>
        {slides.length > 1 && <div className="flex shrink-0 items-center gap-1" aria-label="Carousel controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous screenshot" className="flex h-7 w-7 items-center justify-center rounded-full text-ledger-text-muted transition-colors hover:bg-(--ledger-surface-muted) hover:text-ledger-text-primary"><ArrowLeft size={15} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next screenshot" className="flex h-7 w-7 items-center justify-center rounded-full text-ledger-text-muted transition-colors hover:bg-(--ledger-surface-muted) hover:text-ledger-text-primary"><ArrowRight size={15} /></button>
        </div>}
      </div>
    </div>
  )
}

function IntegrationLogo({ integration }: { integration: Integration }) {
  if (integration.logo === 'github') return <img src="/github.svg" alt="" className="h-7 w-7 object-contain ledger-invert-on-dark" aria-hidden="true" />
  if (integration.logo === 'slack') return <img src="/slack.svg" alt="" className="h-7 w-7 object-contain" aria-hidden="true" />
  if (integration.logo === 'google-drive') return <img src="/drive.svg" alt="" className="h-7 w-7 object-contain" aria-hidden="true" />
  if (integration.logo === 'figma') return <img src="/Figma-logo.svg" alt="" className="h-7 w-7 object-contain" aria-hidden="true" />
  if (integration.logo === 'apple') return <img src="/apple.svg" alt="" className="h-7 w-7 object-contain ledger-invert-on-dark" aria-hidden="true" />
  if (integration.logo === 'mcp') return <img src="/mpc.svg" alt="" className="h-7 w-7 object-contain ledger-invert-on-dark" aria-hidden="true" />
  if (integration.logo === 'calendar') return <CalendarDays size={27} aria-hidden="true" />
  if (integration.logo === 'browser-extension') return <Puzzle size={27} aria-hidden="true" />
  return <Globe2 size={27} aria-hidden="true" />
}

function MetadataPanel({ integration }: { integration: Integration }) {
  const detail = integration.detail
  if (!detail) return null
  const categoryLabel = integrationCategories.find((category) => category.slug === integration.category)?.name ?? integration.category
  const availabilityLabel = integration.availability === 'macos-only' ? 'macOS only' : integration.availability === 'partial' ? 'Limited availability' : null
  return (
    <aside className="self-start lg:sticky lg:top-24" aria-label={`${integration.name} integration details`}>
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface-card text-ledger-text-primary"><IntegrationLogo integration={integration} /></span>
        <div><h2 className="text-[15px] font-medium text-ledger-text-primary">{integration.name}</h2><p className="mt-0.5 text-[12px] text-ledger-text-muted">By Ledger</p></div>
      </div>
      <dl className="mt-6 space-y-4">
        <div className="py-3"><dt className="text-[12px] font-medium text-ledger-text-primary">Website</dt><dd className="mt-0.5"><a href={detail.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[12px] text-ledger-text-muted transition-colors hover:text-ledger-text-primary">{detail.websiteLabel ?? detail.website} <ExternalLink size={11} /></a></dd></div>
        <div className="py-3"><dt className="text-[12px] font-medium text-ledger-text-primary">Category</dt><dd className="mt-0.5 text-[12px] text-ledger-text-muted">{categoryLabel}</dd></div>
        <div className="py-3"><dt className="text-[12px] font-medium text-ledger-text-primary">Docs</dt><dd className="mt-0.5"><a href={detail.docsHref} className="inline-flex items-center gap-1 text-[12px] text-ledger-text-muted transition-colors hover:text-ledger-text-primary">{detail.docsLabel ?? 'Integration guide'} <BookOpen size={11} /></a></dd></div>
        {availabilityLabel && <div className="py-3"><dt className="text-[12px] font-medium text-ledger-text-primary">Availability</dt><dd className="mt-0.5 text-[12px] text-ledger-text-muted">{availabilityLabel}</dd></div>}
      </dl>
      <a href={detail.primaryAction.href} className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-[var(--ledger-control-radius)] bg-ledger-accent px-4 text-[13px] font-medium text-white transition-colors hover:bg-ledger-accent-hover">{detail.primaryAction.label}<ArrowUpRight size={14} /></a>
    </aside>
  )
}

const relatedLogoSources: Record<string, string> = { slack: '/slack.svg', 'google-drive': '/drive.svg', github: '/github.svg', figma: '/Figma-logo.svg', apple: '/apple.svg', mcp: '/mpc.svg' }
const relatedIntegrationSlugsBySlug: Record<string, string[]> = {
  github: ['figma', 'google-drive', 'slack'],
  slack: ['github', 'google-drive', 'figma'],
  'google-drive': ['figma', 'slack', 'github'],
  figma: ['google-drive', 'github', 'slack'],
  'apple-calendar': ['github', 'google-drive', 'slack'],
  'apple-reminders': ['slack', 'github', 'google-drive'],
  'calendar-subscription': ['apple-calendar', 'google-drive', 'slack'],
  'browser-extension': ['mcp', 'slack', 'github'],
}

function RelatedIntegrationCard({ integration }: { integration: Integration }) {
  const logoSource = relatedLogoSources[integration.logo]
  const Logo = integration.logo === 'slack' ? MessageSquare : Palette
  const invertOnDark = integration.logo === 'github' || integration.logo === 'apple' || integration.logo === 'mcp'
  const content = <><span className="flex h-9 w-9 items-center justify-center rounded-[var(--ledger-radius-sm)] border border-(--ledger-border-subtle) bg-ledger-surface text-ledger-text-muted">{logoSource ? <img src={logoSource} alt="" className={`h-5 w-5 object-contain ${invertOnDark ? 'ledger-invert-on-dark' : ''}`} /> : <Logo size={18} strokeWidth={1.7} />}</span><div className="mt-3"><h3 className="text-[15px] font-medium text-ledger-text-primary">{integration.name}</h3><p className="mt-0.5 text-[11px] text-ledger-text-muted">By Ledger</p></div><p className="mt-6 line-clamp-2 text-[13px] leading-5 text-ledger-text-muted">{integration.description}</p></>
  const className = 'group block min-h-[150px] rounded-[var(--ledger-radius-md)] border border-(--ledger-border-subtle) bg-ledger-surface-card p-4 transition-all duration-150 hover:-translate-y-px hover:border-(--ledger-header-border) hover:bg-(--ledger-header-pill)'
  return integration.detail ? <a href={`/integrations/${integration.slug}`} className={className}>{content}</a> : <article className={className}>{content}</article>
}

export function IntegrationDetailPage({ slug }: { slug: string }) {
  const integration = getIntegrationBySlug(slug)
  const detail = integration?.detail
  if (isSiteLocked()) return <LockedSplash />
  if (!integration || !detail) return null

  return (
    <div className="min-h-dvh bg-ledger-surface text-ledger-text">
      <SiteHeader currentPath={`/integrations/${integration.slug}`} />
      <main className="mx-auto w-full max-w-[1010px] px-6 pb-24 pt-12 sm:px-8 sm:pt-16 lg:pb-32 lg:pt-20">
        <nav className="flex items-center gap-2 text-[13px] text-ledger-text-muted" aria-label="Breadcrumb"><a href="/integrations" className="transition-colors hover:text-ledger-text-primary">Integrations</a><span aria-hidden="true">/</span><span className="text-ledger-text-primary">{integration.name}</span></nav>
        <header className="mt-5 max-w-4xl pb-8"><p className="text-[13px] font-medium text-ledger-text-muted">{integration.name} integration</p><h1 className="mt-3 text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ledger-text-primary">{detail.headline}</h1></header>
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-14"><div><IntegrationArtworkCarousel detail={detail} />
        <article className="mt-20 max-w-[700px]">
          <section><h2 className="text-[24px] font-medium tracking-[-0.035em] text-ledger-text-primary">Overview</h2><p className="mt-4 text-[16px] leading-7 text-ledger-text-muted">{detail.overview}</p></section>
          <div className="mt-16 space-y-12">{detail.sections.map((section) => <section key={section.title}><h2 className="text-[20px] font-medium tracking-[-0.025em] text-ledger-text-primary">{section.title}</h2><p className="mt-3 text-[15px] leading-7 text-ledger-text-muted">{section.body}</p></section>)}</div>
          <section className="mt-16 pt-8"><div className="flex items-center gap-2"><Settings2 size={17} className="text-ledger-text-muted" /><h2 className="text-[20px] font-medium tracking-[-0.025em] text-ledger-text-primary">Configure {integration.name} in Ledger</h2></div><p className="mt-3 text-[15px] leading-7 text-ledger-text-muted">{detail.setup} <a href={detail.docsHref} className="text-ledger-text-primary underline decoration-(--ledger-border) underline-offset-4 hover:text-ledger-accent">Read the setup guide.</a></p></section>
        </article></div><MetadataPanel integration={integration} />
        </div>
        <section className="mt-24 pt-10" aria-labelledby="related-integrations-heading">
          <div className="flex items-center justify-between gap-5"><h2 id="related-integrations-heading" className="text-[22px] font-medium tracking-[-0.035em] text-ledger-text-primary">You might be interested in</h2><a href="/integrations" className="inline-flex shrink-0 items-center gap-1 text-[13px] text-ledger-text-muted transition-colors hover:text-ledger-text-primary">Browse all integrations <ArrowUpRight size={14} /></a></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{(relatedIntegrationSlugsBySlug[integration.slug] ?? ['github', 'google-drive', 'figma']).flatMap((slug) => { const item = integrations.find((candidate) => candidate.slug === slug); return item && item.slug !== integration.slug ? [item] : [] }).map((item) => <RelatedIntegrationCard key={item.slug} integration={item} />)}</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
