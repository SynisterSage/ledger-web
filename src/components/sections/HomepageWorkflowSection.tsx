import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bell,
  CalendarDays,
  Layers3,
  Link2,
  Monitor,
  NotebookPen,
  Plug2,
  Puzzle,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

type WorkflowFeatureId = 'capture' | 'organize' | 'act' | 'review'

type WorkflowFeature = {
  id: WorkflowFeatureId
  label: string
  subtitle: string
  title: string
  description: string
}

type EcosystemCard = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

type OrganizeWorkspaceId = 'summer26' | 'ledger' | 'personal' | 'client'

type OrganizeWorkspace = {
  id: OrganizeWorkspaceId
  name: string
  meta: string
  sections: Array<{
    label: string
    title: string
    meta: string
  }>
}

const workflowFeatures: WorkflowFeature[] = [
  {
    id: 'capture',
    label: 'Capture',
    subtitle: 'Save anything before you forget.',
    title: 'Capture without breaking flow.',
    description:
      'Save a task, note, event, reminder, link, or project action from desktop, mobile, browser, or Siri.',
  },
  {
    id: 'organize',
    label: 'Organize',
    subtitle: 'Send it to the right workspace.',
    title: 'Every context gets a workspace.',
    description:
      'Keep school, internships, client work, creative projects, and personal tasks separated without losing the full picture.',
  },
  {
    id: 'act',
    label: 'Act',
    subtitle: 'See what needs attention today.',
    title: 'Today shows what needs attention.',
    description:
      'Upcoming events, due reminders, action items, focus, notifications, and captures come together in one calm daily view.',
  },
  {
    id: 'review',
    label: 'Review',
    subtitle: 'Bring waiting items back into view.',
    title: 'Nothing gets lost in the background.',
    description:
      'Ledger brings captures, notifications, follow-ups, reminders, and unfinished work back into view so you can decide what happens next.',
  },
]

type ReviewItemId = 'captures' | 'notifications' | 'followups' | 'unfinished'

type ReviewItem = {
  id: ReviewItemId
  label: string
  meta: string
  title: string
  detail: string
  actions: string[]
}

const ecosystemCards: EcosystemCard[] = [
  {
    title: 'Desktop sidebar',
    description: 'Dock Ledger beside the apps you already use.',
    href: '/sidebar',
    icon: Monitor,
  },
  {
    title: 'Mobile capture',
    description: 'Save reminders, tasks, events, notes, and project actions away from your desk.',
    href: '/help/mobile',
    icon: Smartphone,
  },
  {
    title: 'Browser extension',
    description: 'Right click to save links, pages, and selected text to Ledger.',
    href: '/help/browser-extension',
    icon: Puzzle,
  },
  {
    title: 'Siri Shortcuts',
    description: 'Add reminders, tasks, events, and notes by voice.',
    href: '/help/siri-shortcuts',
    icon: Sparkles,
  },
  {
    title: 'Integrations',
    description: 'Connect the tools you already use to the same workspace context.',
    href: '/help/integrations',
    icon: Plug2,
  },
]

const organizeWorkspaces: OrganizeWorkspace[] = [
  {
    id: 'summer26',
    name: 'Summer 26',
    meta: '4 notes · 3 tasks · 2 events',
    sections: [
      { label: 'Today', title: 'Submit hours', meta: 'Reminder · 2:00 PM' },
      { label: 'Notes', title: 'Jun 2, Workday Meeting', meta: 'Note · Updated today' },
      { label: 'Events', title: 'Remote internship', meta: 'Event · Tomorrow 11:00 AM' },
      { label: 'Captures', title: 'Browser capture', meta: 'Ready to process' },
    ],
  },
  {
    id: 'ledger',
    name: 'Ledger',
    meta: '8 notes · 5 tasks · 1 capture',
    sections: [
      { label: 'Today', title: 'Review homepage copy', meta: 'Task · Due today' },
      { label: 'Notes', title: 'Launch review', meta: 'Note · Updated yesterday' },
      { label: 'Events', title: 'Design sync', meta: 'Event · Tue 10:00 AM' },
      { label: 'Captures', title: 'Feature idea', meta: 'Ready to process' },
    ],
  },
  {
    id: 'personal',
    name: 'Personal',
    meta: '2 notes · 6 tasks · 4 reminders',
    sections: [
      { label: 'Today', title: 'Buy printer ink', meta: 'Reminder · 5:00 PM' },
      { label: 'Notes', title: 'Trip planning', meta: 'Note · Saved today' },
      { label: 'Events', title: 'Dinner with Sam', meta: 'Event · Fri 7:30 PM' },
      { label: 'Captures', title: 'Gift idea', meta: 'Ready to process' },
    ],
  },
  {
    id: 'client',
    name: 'Client work',
    meta: '3 notes · 2 tasks · 1 project',
    sections: [
      { label: 'Today', title: 'Send draft update', meta: 'Task · Due today' },
      { label: 'Notes', title: 'Client kickoff', meta: 'Note · Updated today' },
      { label: 'Events', title: 'Review call', meta: 'Event · Tomorrow 3:00 PM' },
      { label: 'Captures', title: 'Reference link', meta: 'Ready to process' },
    ],
  },
]

const reviewItems: ReviewItem[] = [
  {
    id: 'captures',
    label: 'Captures waiting',
    meta: '2 items ready to sort',
    title: 'Browser capture',
    detail: 'Homepage inspiration saved from browser extension.',
    actions: ['Convert to task', 'Convert to reminder', 'Archive'],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    meta: '6 alerts to review',
    title: 'Today alerts',
    detail: 'Two reminders and one follow-up need a decision.',
    actions: ['Mark reviewed', 'Snooze', 'Open today'],
  },
  {
    id: 'followups',
    label: 'Follow-ups',
    meta: '1 due today',
    title: 'Reply to design sync',
    detail: 'A message you started is waiting to be finished.',
    actions: ['Reply now', 'Reschedule', 'Archive'],
  },
  {
    id: 'unfinished',
    label: 'Unfinished actions',
    meta: '3 items to move forward',
    title: 'Review notification system',
    detail: 'A task that can be completed or pushed out cleanly.',
    actions: ['Mark done', 'Move to tomorrow', 'Archive'],
  },
]

function WorkflowFeatureButton({
  feature,
  active,
  onSelect,
}: {
  feature: WorkflowFeature
  active: boolean
  onSelect: (id: WorkflowFeatureId) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(feature.id)}
      aria-pressed={active}
      className={`group flex w-full items-start gap-3 rounded-[18px] border px-4 py-3 text-left transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out ${
        active
          ? 'border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.07)] shadow-[0_6px_18px_rgba(0,0,0,0.08)]'
          : 'border-transparent bg-transparent hover:border-(--ledger-border-subtle) hover:bg-[rgba(255,255,255,0.04)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]'
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-200 ${
          active ? 'bg-ledger-accent' : 'bg-(--ledger-border-subtle)'
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold tracking-[-0.03em] text-ledger-text">{feature.label}</div>
        <p className="mt-0.5 text-[12px] leading-5 text-ledger-text-muted">{feature.subtitle}</p>
      </div>
    </button>
  )
}

function WorkflowPreview() {
  return (
    <div className="rounded-3xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4">
      <p className="text-[12px] font-medium tracking-[0.08em] text-ledger-text-muted/90">Ledger workflow</p>
      <h3 className="mt-1.5 text-[20px] font-semibold tracking-[-0.04em] text-ledger-text sm:text-[22px]">
        Your workspace, always within reach.
      </h3>
      <p className="mt-1.5 max-w-xl text-[13px] leading-6 text-ledger-text-muted">
        Capture what matters, keep it tied to the right context, and come back when it needs attention.
      </p>
      <div className="mt-3">
        <a
          href="/download"
          className="inline-flex h-8 items-center justify-center rounded-full bg-ledger-accent px-3.5 text-[12px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
        >
          Download Ledger
        </a>
      </div>
    </div>
  )
}

function PanelShell({
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
    <div className="workflow-panel-enter rounded-[30px] border border-(--ledger-border-subtle) bg-[linear-gradient(180deg,rgba(18,17,15,0.98)_0%,rgba(23,21,18,0.96)_100%)] p-4 shadow-[0_14px_42px_rgba(0,0,0,0.28)] sm:p-5">
      <p className="text-[12px] font-medium tracking-[0.08em] text-ledger-text-muted/90">{eyebrow}</p>
      <h3 className="mt-1.5 text-[28px] font-semibold tracking-[-0.04em] text-ledger-text sm:text-[34px]">
        {title}
      </h3>
      <p className="mt-1.5 max-w-2xl text-[15px] leading-7 text-ledger-text-muted sm:text-[16px]">{description}</p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function CapturePanel() {
  return (
    <PanelShell
      eyebrow="Capture"
      title="Capture without breaking flow."
      description="Save a task, note, event, reminder, link, or project action from desktop, mobile, browser, or Siri."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.92fr)]">
        <div className="rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.04)] p-4 transition-colors duration-200 ease-out hover:border-(--ledger-header-border) hover:bg-[rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-ledger-text">Ledger workspace</p>
              <p className="mt-1 text-[12px] text-ledger-text-muted">Living beside Figma</p>
            </div>
            <span className="rounded-full bg-(--ledger-header-pill-active) px-2.5 py-1 text-[11px] font-medium text-ledger-text">
              Summer 26
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {[
              { label: 'Task', icon: NotebookPen },
              { label: 'Note', icon: NotebookPen },
              { label: 'Event', icon: CalendarDays },
              { label: 'Reminder', icon: Bell },
              { label: 'Project action', icon: Workflow },
            ].map((item) => (
              <div key={item.label} className="group flex items-center justify-between rounded-2xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] px-3 py-2.5 transition-colors duration-200 ease-out hover:border-(--ledger-header-border) hover:bg-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.04)] text-ledger-text-muted transition-colors duration-200 group-hover:border-(--ledger-header-border) group-hover:bg-[rgba(255,255,255,0.06)]">
                    <item.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                  <span className="text-[14px] font-medium text-ledger-text">{item.label}</span>
                </div>
                <span className="text-[12px] text-ledger-text-muted">Quick add</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-full flex-col rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4 transition-colors duration-200 ease-out hover:border-(--ledger-header-border) hover:bg-[rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-ledger-text">Quick capture</p>
              <p className="mt-1 text-[12px] text-ledger-text-muted">Saving to Summer 26</p>
            </div>
            <Link2 className="h-4.5 w-4.5 text-ledger-text-muted" strokeWidth={1.8} />
          </div>

          <div className="mt-4 grid gap-2">
            {['Desktop', 'Mobile', 'Browser', 'Siri'].map((item, index) => (
              <div key={item} className="group flex items-center justify-between rounded-2xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] px-3 py-2.5 transition-colors duration-200 ease-out hover:border-(--ledger-header-border) hover:bg-[rgba(255,255,255,0.05)]">
                <span className="text-[13px] font-medium text-ledger-text">{item}</span>
                <span className="text-[12px] text-ledger-text-muted">
                  {index === 0 ? 'sidebar' : index === 1 ? 'sheet' : index === 2 ? 'extension' : 'shortcut'}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex-1 rounded-[22px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.02)] p-4 transition-colors duration-200 ease-out hover:bg-[rgba(255,255,255,0.035)]">
            <p className="text-[12px] font-medium text-ledger-text-muted/80">Saving now</p>
            <div className="mt-2 rounded-[18px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] px-3 py-3">
              <p className="text-[14px] font-medium text-ledger-text">Submit hours</p>
              <p className="mt-0.5 text-[12px] text-ledger-text-muted">Captured from browser extension</p>
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  )
}

function OrganizePanel() {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<OrganizeWorkspaceId>('summer26')
  const selectedWorkspace =
    organizeWorkspaces.find((workspace) => workspace.id === selectedWorkspaceId) ?? organizeWorkspaces[0]

  return (
    <PanelShell
      eyebrow="Organize"
      title="Every context gets a workspace."
      description="Keep school, internships, client work, creative projects, and personal tasks separated without losing the full picture."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-ledger-text">All workspaces</p>
            <Layers3 className="h-4.5 w-4.5 text-ledger-text-muted" strokeWidth={1.8} />
          </div>
          <div className="mt-4 space-y-2">
            {organizeWorkspaces.map((workspace) => {
              const active = workspace.id === selectedWorkspace.id

              return (
                <button
                  key={workspace.id}
                  type="button"
                  onClick={() => setSelectedWorkspaceId(workspace.id)}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition-colors duration-200 ${
                    active
                      ? 'border-(--ledger-header-border) bg-[rgba(255,255,255,0.06)]'
                      : 'border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] hover:border-(--ledger-header-border) hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full ${active ? 'bg-ledger-accent' : 'bg-(--ledger-border-subtle)'}`}
                      />
                      <p className="text-[14px] font-medium text-ledger-text">{workspace.name}</p>
                    </div>
                    <p className="mt-1 text-[12px] text-ledger-text-muted">{workspace.meta}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${active ? 'bg-(--ledger-header-pill-active) text-ledger-text' : 'bg-(--ledger-header-pill) text-ledger-text-muted'}`}>
                    {active ? 'Selected' : 'Open'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4">
          <p className="text-[13px] font-medium text-ledger-text">Inside {selectedWorkspace.name}</p>
          <div className="mt-4 rounded-[22px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-3">
            <p className="text-[12px] text-ledger-text-muted">Workspace context</p>
            <div className="mt-3 grid gap-3">
              {selectedWorkspace.sections.map((section, index) => (
                <div key={section.label} className={`${index > 0 ? 'border-t border-(--ledger-border-subtle) pt-3' : ''}`}>
                  <p className="text-[12px] font-medium text-ledger-text-muted">{section.label}</p>
                  <div className="mt-1 rounded-[18px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.025)] px-3 py-2.5">
                    <p className="text-[14px] font-medium text-ledger-text">{section.title}</p>
                    <p className="mt-0.5 text-[12px] text-ledger-text-muted">{section.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  )
}

function ActPanel() {
  return (
    <PanelShell
      eyebrow="Act"
      title="Today shows what needs attention."
      description="Upcoming events, due reminders, action items, focus, notifications, and captures come together in one calm daily view."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4">
          <div className="grid gap-3">
            <div className="rounded-2xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-3">
              <p className="text-[12px] text-ledger-text-muted">Today</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-medium text-ledger-text">Submit hours</span>
                  <span className="rounded-full bg-(--ledger-header-pill-active) px-2.5 py-1 text-[11px] font-medium text-ledger-text">
                    Focus
                  </span>
                </div>
                <div className="border-t border-(--ledger-border-subtle)/80 pt-2.5 flex items-center justify-between">
                  <span className="text-[15px] font-medium text-ledger-text">Review notification system</span>
                  <span className="text-[12px] text-ledger-text-muted">Due today</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-3">
              <p className="text-[12px] text-ledger-text-muted">Upcoming</p>
              <p className="mt-1 text-[15px] font-medium text-ledger-text">Remote internship</p>
              <p className="mt-1 text-[13px] text-ledger-text-muted">11:00 AM</p>
            </div>
            <div className="rounded-2xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-3">
              <p className="text-[12px] text-ledger-text-muted">Captures</p>
              <p className="mt-1 text-[15px] font-medium text-ledger-text">2 waiting</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-[12px] text-ledger-text-muted">Next up</p>
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] px-4 py-3">
              <div>
                <p className="text-[14px] font-medium text-ledger-text">Notifications</p>
                <p className="mt-1 text-[12px] text-ledger-text-muted">6 waiting</p>
              </div>
              <Bell className="h-4.5 w-4.5 text-ledger-text-muted" strokeWidth={1.8} />
            </div>
          </div>
          <div className="rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.04)] p-4">
            <p className="text-[12px] text-ledger-text-muted">Focus</p>
            <p className="mt-2 text-[14px] font-medium text-ledger-text">Keep the important work in view.</p>
            <p className="mt-1 text-[13px] leading-6 text-ledger-text-muted">
              Move between attention, action, and follow-through without turning Today into another inbox.
            </p>
          </div>
        </div>
      </div>
    </PanelShell>
  )
}

function ReviewPanel() {
  const [selectedItemId, setSelectedItemId] = useState<ReviewItemId>('captures')
  const selectedItem = reviewItems.find((item) => item.id === selectedItemId) ?? reviewItems[0]

  return (
    <PanelShell
      eyebrow="Review"
      title="Nothing gets lost in the background."
      description="Ledger brings captures, notifications, follow-ups, reminders, and unfinished work back into view so you can decide what happens next."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.98fr)]">
        <div className="rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-ledger-text">Review queue</p>
            <NotebookPen className="h-4.5 w-4.5 text-ledger-text-muted" strokeWidth={1.8} />
          </div>
          <div className="mt-4 space-y-2">
            {reviewItems.map((item) => {
              const active = item.id === selectedItem.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItemId(item.id)}
                  aria-pressed={active}
                  className={`flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition-colors duration-200 ${
                    active
                      ? 'border-(--ledger-header-border) bg-[rgba(255,255,255,0.06)]'
                      : 'border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] hover:border-(--ledger-header-border) hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${active ? 'bg-ledger-accent' : 'bg-(--ledger-border-subtle)'}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium text-ledger-text">{item.label}</p>
                    <p className="mt-1 text-[12px] text-ledger-text-muted">{item.meta}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[26px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4">
          <p className="text-[13px] font-medium text-ledger-text">Selected item</p>
          <div key={selectedItem.id} className="workflow-panel-enter mt-4 rounded-3xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-[12px] text-ledger-text-muted">Ledger · Review</p>
            <h3 className="mt-1.5 text-[24px] font-semibold tracking-[-0.04em] text-ledger-text">
              {selectedItem.title}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-ledger-text-muted">{selectedItem.detail}</p>

            <div className="mt-4 space-y-2">
              {selectedItem.actions.map((action, index) => (
                <div
                  key={action}
                  className={`flex items-center justify-between rounded-[18px] border px-3 py-2.5 ${
                    index === 0
                      ? 'border-(--ledger-header-border) bg-[rgba(255,255,255,0.05)]'
                      : 'border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.025)]'
                  }`}
                >
                  <span className="text-[13px] font-medium text-ledger-text">{action}</span>
                  {index === 0 ? (
                    <span className="h-2 w-2 rounded-full bg-ledger-accent" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  )
}

export function HomepageWorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeFeature, setActiveFeature] = useState<WorkflowFeatureId>('capture')
  const [hoverPoint, setHoverPoint] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        sectionEl.querySelectorAll<HTMLElement>('[data-reveal-workflow]').forEach((el) => {
          el.classList.add('is-visible')
        })
        observer.disconnect()
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [])

  const currentFeature = useMemo(
    () => workflowFeatures.find((feature) => feature.id === activeFeature) ?? workflowFeatures[0],
    [activeFeature],
  )

  const workflowCardStyle = {
    '--workflow-hover-x': `${hoverPoint.x}%`,
    '--workflow-hover-y': `${hoverPoint.y}%`,
    transitionDelay: '150ms',
  } as CSSProperties

  return (
    <section
      ref={sectionRef}
      aria-label="How Ledger works"
      className="relative z-20 -mt-16 overflow-x-clip border-y border-(--ledger-border-subtle) bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,var(--ledger-bg)_100%)] px-6 py-20 sm:-mt-20 sm:px-8 sm:py-24 lg:-mt-26"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div data-reveal-workflow className="feature-reveal reveal-up max-w-4xl" style={{ transitionDelay: '70ms' }}>
          <h2 className="mt-4 text-[44px] font-medium leading-[1.02] tracking-[-0.055em] text-ledger-text sm:text-[64px] lg:text-[74px]">
            Everything lands where it belongs.
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-7 text-ledger-text-muted sm:text-[18px]">
            Capture notes, tasks, events, reminders, links, and project actions from anywhere. Ledger keeps each item
            tied to the right workspace, then brings it back when it needs attention.
          </p>
        </div>

        <div
          data-reveal-workflow
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width) * 100
            const y = ((event.clientY - rect.top) / rect.height) * 100
            setHoverPoint({
              x: Math.max(0, Math.min(100, x)),
              y: Math.max(0, Math.min(100, y)),
            })
          }}
          onMouseLeave={() => setHoverPoint({ x: 50, y: 50 })}
          className="workflow-main-card feature-reveal reveal-up mt-10 rounded-[34px] border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-(--ledger-header-border) hover:shadow-[0_20px_56px_rgba(0,0,0,0.2)] sm:p-5 lg:mt-12 lg:p-6"
          style={workflowCardStyle}
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(260px,0.84fr)_minmax(0,1.16fr)]">
            <div className="flex h-full flex-col gap-4">
              <WorkflowPreview />
              <div className="mt-auto grid gap-2">
                {workflowFeatures.map((feature) => (
                  <WorkflowFeatureButton
                    key={feature.id}
                    feature={feature}
                    active={activeFeature === feature.id}
                    onSelect={setActiveFeature}
                  />
                ))}
              </div>
            </div>

            <div className="min-w-0">
              {currentFeature.id === 'capture' ? (
                <div key={currentFeature.id} className="workflow-panel-enter h-full">
                  <CapturePanel />
                </div>
              ) : currentFeature.id === 'organize' ? (
                <div key={currentFeature.id} className="workflow-panel-enter h-full">
                  <OrganizePanel />
                </div>
              ) : currentFeature.id === 'act' ? (
                <div key={currentFeature.id} className="workflow-panel-enter h-full">
                  <ActPanel />
                </div>
              ) : (
                <div key={currentFeature.id} className="workflow-panel-enter h-full">
                  <ReviewPanel />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          data-reveal-workflow
          className="feature-reveal reveal-up mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
          style={{ transitionDelay: '260ms' }}
        >
          {ecosystemCards.map((card, index) => {
            const Icon = card.icon

            return (
              <a
                key={card.title}
                href={card.href}
                className="group rounded-3xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.03)] p-4 transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-(--ledger-header-border) hover:bg-[rgba(255,255,255,0.05)]"
                style={{ transitionDelay: `${300 + index * 40}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.04)] text-ledger-text">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.03em] text-ledger-text">{card.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-ledger-text-muted">{card.description}</p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
