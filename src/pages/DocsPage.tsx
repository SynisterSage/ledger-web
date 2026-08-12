import type { CSSProperties, FormEvent } from 'react'
import {
  Bell,
  BookOpen,
  CalendarDays,
  FolderKanban,
  Inbox,
  LifeBuoy,
  Layers3,
  Link2,
  MessageCircle,
  Monitor,
  NotebookPen,
  Plug2,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Settings,
  TriangleAlert,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type DocCard = {
  title: string
  description: string
  href: string
  icon: CardIconKey
}

type CardIconKey =
  | 'start-guide'
  | 'workspaces'
  | 'today'
  | 'actions'
  | 'capture'
  | 'notes'
  | 'projects'
  | 'project-timeline'
  | 'calendar'
  | 'intake'
  | 'circle'
  | 'teams'
  | 'slack'
  | 'dashboard'
  | 'notifications'
  | 'search'
  | 'mobile'
  | 'desktop'
  | 'web'
  | 'settings'
  | 'browser-extension'
  | 'integrations'
  | 'siri-shortcuts'
  | 'sessions-account'
  | 'contact-support'
  | 'troubleshooting'

type DocSection = {
  id: string
  title: string
  content: string[]
  bullets?: string[]
  steps?: string[]
  note?: { label?: string; text: string }
  screenshot?: {
    label: string
    title: string
    description: string
    caption: string
  }
}

type DocArticle = {
  title: string
  intro: string
  sections: DocSection[]
}

const homeSections: Array<{ title: string; cards: DocCard[] }> = [
  {
    title: 'Start here',
    cards: [
      {
        title: 'Start guide',
        description: 'What Ledger is, how the loop works, and how the pieces fit together.',
        href: '/help/start-guide',
        icon: 'start-guide',
      },
      {
        title: 'Workspaces',
        description: 'How Ledger separates context without losing the big picture.',
        href: '/help/workspaces',
        icon: 'workspaces',
      },
      {
        title: 'Today',
        description: 'The calm center of attention for the current day.',
        href: '/help/today',
        icon: 'today',
      },
      {
        title: 'Actions',
        description: 'Tap, long press, and the shared action model.',
        href: '/help/actions',
        icon: 'actions',
      },
    ],
  },
  {
    title: 'Capture and content',
    cards: [
      { title: 'Capture', description: 'Turn thoughts, links, and ideas into something usable.', href: '/help/capture', icon: 'capture' },
      {
        title: 'Notes',
        description: 'Workspace context, meeting notes, drafts, and docs.',
        href: '/help/notes',
        icon: 'notes',
      },
      {
        title: 'Projects',
        description: 'Status, actions, follow-ups, and long-running work.',
        href: '/help/projects',
        icon: 'projects',
      },
      {
        title: 'Calendar',
        description: 'Events, repeats, and the link between time and context.',
        href: '/help/calendar',
        icon: 'calendar',
      },
    ],
  },
  {
    title: 'Daily operation',
    cards: [
      { title: 'Dashboard and Today', description: 'Use focus, attention, review, and the day view to decide what matters now.', href: '/help/dashboard', icon: 'dashboard' },
      { title: 'Intake', description: 'Review incoming captures and turn raw context into useful work.', href: '/help/intake', icon: 'intake' },
      { title: 'Notifications', description: 'Understand active alerts, read state, delivery, and follow-through.', href: '/help/notifications', icon: 'notifications' },
      { title: 'Search', description: 'Find records and launch actions across your workspaces.', href: '/help/search', icon: 'search' },
    ],
  },
  {
    title: 'People and collaboration',
    cards: [
      { title: 'Circle', description: 'See the people, assignments, shared projects, and follow-ups around your work.', href: '/help/circle', icon: 'circle' },
      { title: 'Teams', description: 'Coordinate team-owned projects, assigned work, and milestones in a workspace.', href: '/help/teams', icon: 'teams' },
    ],
  },
  {
    title: 'Connected work',
    cards: [
      { title: 'Slack', description: 'Capture messages, watch conversations, review activity, and link context back to Ledger.', href: '/help/slack', icon: 'slack' },
      { title: 'Integrations', description: 'Understand what each connector imports, links, publishes, or lets Ledger act on.', href: '/help/integrations', icon: 'integrations' },
      { title: 'Project timeline', description: 'Read the roadmap view, date ranges, milestones, horizons, and project context together.', href: '/help/project-timeline', icon: 'projects' },
    ],
  },
  {
    title: 'Platform',
    cards: [
      {
        title: 'Mobile',
        description: 'Today, capture, notifications, and sheets on the move.',
        href: '/help/mobile',
        icon: 'mobile',
      },
      {
        title: 'Browser extension',
        description: 'Save pages and selected text into Ledger.',
        href: '/help/browser-extension',
        icon: 'browser-extension',
      },
      {
        title: 'Desktop app',
        description: 'Sidebar, pop-outs, tray behavior, and native shortcuts.',
        href: '/help/desktop',
        icon: 'desktop',
      },
      {
        title: 'Web app',
        description: 'Use Ledger in a browser with the same workspace-aware product flow.',
        href: '/help/web',
        icon: 'web',
      },
    ],
  },
  {
    title: 'Settings and account',
    cards: [
      { title: 'Settings', description: 'Configure your account, workspace, notifications, sidebar, accessibility, and integrations.', href: '/help/settings', icon: 'settings' },
      { title: 'Sessions and account', description: 'Signed-in devices, sign-out controls, and account safety.', href: '/help/sessions-account', icon: 'sessions-account' },
      { title: 'Siri shortcuts', description: 'Create or check items with App Intents and Siri.', href: '/help/siri-shortcuts', icon: 'siri-shortcuts' },
    ],
  },
  {
    title: 'Account and support',
    cards: [
      {
        title: 'Contact support',
        description: 'Send a simple message to Ledger support.',
        href: '/help/contact-support',
        icon: 'contact-support',
      },
      {
        title: 'Troubleshooting',
        description: 'Invite links, auth, notifications, search, and more.',
        href: '/help/troubleshooting',
        icon: 'troubleshooting',
      },
    ],
  },
]

const sidebarGroups = [
  {
    title: 'Start here',
    links: [
      { label: 'Start guide', href: '/help/start-guide' },
      { label: 'Workspaces', href: '/help/workspaces' },
      { label: 'Today', href: '/help/today' },
      { label: 'Actions', href: '/help/actions' },
    ],
  },
  {
    title: 'Capture and content',
    links: [
      { label: 'Capture', href: '/help/capture' },
      { label: 'Notes', href: '/help/notes' },
      { label: 'Projects', href: '/help/projects' },
      { label: 'Project timeline', href: '/help/project-timeline' },
      { label: 'Calendar', href: '/help/calendar' },
    ],
  },
  {
    title: 'Daily operation',
    links: [
      { label: 'Dashboard and Today', href: '/help/dashboard' },
      { label: 'Intake', href: '/help/intake' },
      { label: 'Notifications', href: '/help/notifications' },
      { label: 'Search', href: '/help/search' },
    ],
  },
  {
    title: 'People and collaboration',
    links: [
      { label: 'Circle', href: '/help/circle' },
      { label: 'Teams', href: '/help/teams' },
    ],
  },
  {
    title: 'Connected work',
    links: [
      { label: 'Slack', href: '/help/slack' },
      { label: 'Integrations', href: '/help/integrations' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Mobile', href: '/help/mobile' },
      { label: 'Web app', href: '/help/web' },
      { label: 'Browser extension', href: '/help/browser-extension' },
    ],
  },
  {
    title: 'Settings and account',
    links: [
      { label: 'Settings', href: '/help/settings' },
      { label: 'Sessions and account', href: '/help/sessions-account' },
      { label: 'Siri shortcuts', href: '/help/siri-shortcuts' },
    ],
  },
  {
    title: 'Account and support',
    links: [
      { label: 'Contact support', href: '/help/contact-support' },
      { label: 'Troubleshooting', href: '/help/troubleshooting' },
    ],
  },
]

const articleMap: Record<string, DocArticle> = {
  'start-guide': {
    title: 'Start guide',
    intro: 'Ledger is a sidebar-first workspace that keeps capture, planning, execution, and review in one connected system across desktop, mobile, browser extension, and Siri.',
    sections: [
      {
        id: 'what-it-is',
        title: 'What Ledger is',
        content: [
          'Ledger brings together notes, tasks, reminders, events, projects, captures, notifications, focus, follow-ups, search, mobile capture, browser saves, and workspace context in one connected system.',
          'It is built for people who move between school, work, internships, client projects, creative projects, personal life, deadlines, meetings, ideas, and follow-ups throughout the day.',
          'The goal is not to replace every tool. The goal is to keep the next useful thing close enough that you can act on it without losing the thread.',
        ],
      },
      {
        id: 'how-it-works',
        title: 'How Ledger works',
        content: [
          'Capture is the entry point: something lands in Ledger from the sidebar, mobile, search, Siri, or the browser extension.',
          'From there it becomes a task, reminder, note, event, project action, or something that simply lives in context until you need it.',
          'Today is where active work comes back into view, while Projects, Notes, Calendar, Search, and Notifications let you move between planning and execution without rebuilding the context each time.',
        ],
      },
      {
        id: 'desktop',
        title: 'Desktop app',
        content: [
          'The desktop app is the full command center: the sidebar stays available beside your other apps, pop-outs give you a larger workspace, and each module keeps the same Ledger tokens and interaction model.',
          'Desktop is where keyboard shortcuts, tray or menu bar behavior, quick capture, multi-panel layouts, and longer writing sessions matter most.',
          'Use desktop when you want to manage the day, write notes, review projects, work through calendar context, or keep Ledger parked beside your main app.',
        ],
      },
      {
        id: 'mobile-and-extension',
        title: 'Mobile and browser extension',
        content: [
          'Mobile is for fast capture, Today, Notifications, search, and lightweight follow-through when you are away from your desk.',
          'The browser extension is the bridge from the web into Ledger: save a page, save selected text, send a link to a workspace, or turn something you found online into a note, task, reminder, or event later.',
          'Both surfaces should feel like the same product, just tuned for the device you are on.',
        ],
      },
      {
        id: 'integrations',
        title: 'Integrations',
        content: [
          'Integrations should feed the Ledger loop instead of becoming a separate product area.',
          'Calendar sync, Slack saves, Siri commands, import flows, and future connectors all belong in the same path: capture the signal, attach the right workspace, then decide what it becomes next.',
          'If an integration cannot help a user capture, plan, execute, or review, it should stay out of the way.',
        ],
      },
      {
        id: 'workspaces',
        title: 'Workspaces',
        content: [
          'Workspaces keep context separated without forcing you to split your workflow into disconnected apps.',
          'A workspace can be personal, shared, school-related, project-based, client-based, or anything else that benefits from its own notes, projects, calendar items, reminders, and captures.',
        ],
      },
      {
        id: 'today-and-focus',
        title: 'Today, focus, and follow-through',
        content: [
          'Today is the calm center of attention: the place where upcoming work, focus items, overdue items, and follow-ups come together.',
          'Focus should stay small and intentional, while overdue items and follow-ups should be surfaced plainly so the user can decide what to do next without noise.',
          'Ledger works best when Today reflects reality instead of becoming a second inbox.',
        ],
      },
      {
        id: 'install',
        title: 'Install Ledger',
        content: [
          'Ledger should be easy to install on desktop, mobile, and browser extension surfaces without changing the core workspace model.',
          'The help pages below break the experience into specific surfaces and workflows so users can get to the right answer quickly.',
        ],
      },
    ],
  },
  workspaces: {
    title: 'Workspaces',
    intro: 'Workspaces are the foundation of Ledger. They keep personal, shared, school, client, and project context separated while still letting you see the larger picture when you need it.',
    sections: [
      {
        id: 'workspace-model',
        title: 'Workspace model',
        content: [
          'A workspace can be a personal space, a school semester, an internship, a client project, a team, a household, a creative system, a freelance workspace, or a daily planning space.',
          'Each workspace can contain notes, tasks, reminders, events, projects, captures, notifications, members, settings, calendar items, follow-ups, and activity.',
          'The point of the workspace model is not just organization. It is to make sure capture, planning, and review always happen in the right context.',
        ],
        screenshot: {
          label: 'Workspace switcher screenshot',
          title: 'Choose the context where work belongs',
          description: 'Add a screenshot showing the workspace switcher with personal, shared, or team workspaces and the current selection.',
          caption: 'The active workspace determines the context for records, members, integrations, and most actions.',
        },
        bullets: [
          'Personal workspace: private planning, personal notes, reminders, and independent projects.',
          'Team workspace: shared projects, assignments, milestones, people, and activity.',
          'Client or school workspace: a deliberately bounded context with its own records and membership.',
        ],
      },
      {
        id: 'all-workspaces',
        title: 'All workspaces',
        content: [
          'All Workspaces gives you a combined view across everything you have access to.',
          'Use it when you want to see everything due today, upcoming events, reminders, active notifications, captures waiting to be processed, overdue work, and cross-workspace search results.',
          'It is useful for people who juggle multiple roles and want one place to see the day without losing which workspace an item came from.',
        ],
      },
      {
        id: 'single-workspace',
        title: 'Single workspace mode',
        content: [
          'Single workspace mode lets you focus on one context at a time, like one class, one internship, one project, one client, or one personal workspace.',
          'Today, Capture, Notifications, Search, Calendar, Notes, and Projects all stay scoped to that workspace so the view stays calm and relevant.',
          'That scoping should feel obvious in the UI: the user should be able to tell at a glance which workspace they are acting in and where a saved item will land.',
        ],
      },
      {
        id: 'shared-workspaces',
        title: 'Shared workspaces',
        content: [
          'Shared workspaces should define what is visible to all members and what stays per user.',
          'Permissions, invite flows, and workspace notifications should stay clear so shared context feels safe and predictable.',
          'A shared workspace still needs the same calm Ledger behavior: the same surfaces, the same action model, and the same ability to move from capture to follow-through without friction.',
        ],
      },
    ],
  },
  today: {
    title: 'Today',
    intro: 'Today is the center of Ledger. It is the place where the app answers what needs your attention now, what is coming up, and what should stay in focus.',
    sections: [
      {
        id: 'today-sections',
        title: 'Today sections',
        content: [
          'Ledger Today can be organized into Upcoming, Today Actions, Captures, Focus, Follow-ups, Overdue, and recently changed context.',
          'The exact layout can differ between desktop and mobile, but the logic stays the same: surface what matters without forcing the user to sort it mentally.',
          'Today should behave like a daily briefing, not a dump of everything in the system.',
        ],
        screenshot: {
          label: 'Today screenshot',
          title: 'A daily view of attention and follow-through',
          description: 'Add a screenshot showing Today with focus, upcoming work, actions, overdue items, and follow-ups.',
          caption: 'Today brings the next useful decisions together without replacing the underlying project, note, calendar, or Intake records.',
        },
      },
      {
        id: 'upcoming',
        title: 'Upcoming',
        content: [
          'Upcoming is for scheduled and time-based items like calendar events, timed reminders, timed tasks, meetings, classes, appointments, work blocks, and time-bound project actions.',
          'If something does not have a time or scheduled date, it belongs somewhere else.',
          'This section helps the user see the day ahead without mixing in items that are only loosely related to time.',
        ],
      },
      {
        id: 'today-actions',
        title: 'Today actions',
        content: [
          'Today Actions are action-based items that need attention today: tasks due today, overdue reminders, overdue project actions, focus items, and follow-ups due today.',
          'Today answers what needs to be done, not just what is on the calendar.',
          'These items should be easy to complete, snooze, reschedule, or turn into a more specific next step.',
        ],
        bullets: [
          'Complete it when the work is actually finished.',
          'Reschedule it when the commitment is still real but the date changed.',
          'Create a follow-up when the next step depends on another person or a later check-in.',
          'Remove it from focus when it no longer belongs in today’s small set of priorities.',
        ],
      },
      {
        id: 'focus',
        title: 'Focus',
        content: [
          'Focus is the small number of things you want to move forward intentionally.',
          'A focus item may have no metadata and that is okay. Ledger should avoid fake metadata just to fill space.',
          'The focus area should help the user choose a few important moves instead of pretending everything can be equally important.',
        ],
      },
      {
        id: 'overdue-followups',
        title: 'Overdue and follow-ups',
        content: [
          'Overdue items are active items that should have been handled already, and Ledger should surface them calmly without turning the product into a stress dashboard.',
          'Follow-ups are reminders to circle back on tasks, notes, projects, events, captures, conversations, and meetings.',
          'The goal is not to create guilt. The goal is to make the next decision obvious so work can keep moving.',
        ],
      },
    ],
  },
  actions: {
    title: 'Actions',
    intro: 'Action Items are the things in Ledger that can be acted on, and the same action model should feel consistent everywhere, whether the user is on desktop, mobile, search, or a detail sheet.',
    sections: [
      {
        id: 'tap',
        title: 'Tap behavior',
        content: [
          'Tapping an item opens a detail view with title, workspace, type, status, dates, linked context, source, and related actions.',
          'Tap is for context. Long press or right click is for quick action.',
          'The main rule is that opening something should never hide the obvious next step; the detail view should make the user feel oriented, not trapped.',
        ],
      },
      {
        id: 'long-press',
        title: 'Long press and right click',
        content: [
          'Long press on mobile or right click on desktop opens quick actions.',
          'Quick actions are type-specific, and the action sheet should stay minimal and predictable.',
          'These menus should reuse the same verbs across the app so the user does not have to relearn what "snooze" or "follow up" means in different places.',
        ],
      },
      {
        id: 'shared-actions',
        title: 'Shared actions',
        content: [
          'Common Ledger actions include open, complete, snooze, move to tomorrow, add to focus, remove from focus, remove from Today, add note, create follow-up, reschedule, edit, delete, dismiss, archive, open project, and convert capture.',
          'Actions should feel the same across desktop and mobile even if the presentation differs.',
          'Where possible, one action should update the state everywhere at once so Today, Search, the sidebar, and the detail view stay in sync.',
        ],
      },
      {
        id: 'rules-by-type',
        title: 'Rules by type',
        content: [
          'Tasks, reminders, events, project actions, captures, notifications, and focus items each have type-specific actions, but they should all map back to the shared model.',
          'The UI should prefer clear verbs and avoid unnecessary destructive shortcuts.',
          'If the item type changes, the available actions should change with it instead of showing generic buttons that do not make sense in context.',
        ],
      },
    ],
  },
  capture: {
    title: 'Capture',
    intro: 'Capture is how things enter Ledger, from quick thoughts to links and selected text, and it should be fast enough that users do not lose the moment they decided to save something.',
    sections: [
      {
        id: 'sources',
        title: 'Capture sources',
        content: [
          'Capture can happen from desktop sidebar, quick actions, mobile capture, browser extension, share sheet, Siri Shortcuts, tray/menu bar, right click, search command, or future integrations.',
          'The source should not matter once the item lands in Ledger; what matters is what it becomes next.',
          'Each surface should feel like a different doorway into the same inbox, not like a separate product with its own rules.',
        ],
        bullets: [
          'Desktop sidebar or quick capture for thoughts that occur while you work.',
          'Mobile Capture for reminders, tasks, notes, events, and project actions away from your desk.',
          'Browser extension for a page, link, or selected text.',
          'Slack, Drive, MCP, and other integrations for incoming external context.',
        ],
      },
      {
        id: 'types',
        title: 'Capture types',
        content: [
          'Ledger supports reminder, task, event, note, project action, and capture/inbox item flows.',
          'A capture is not always a task. It might become a note, an event, a reminder, a project action, or something archived for later.',
          'Good capture means the user can save first and sort the meaning out afterward without losing the original context.',
        ],
      },
      {
        id: 'forms',
        title: 'Capture forms',
        content: [
          'Capture forms should stay short and direct with just the fields needed to save quickly.',
          'The goal is to get the item into the system with enough context to be useful later, not to block the user with a huge modal.',
          'If the form becomes too long, the capture surface should split the flow into a fast save step and an optional detail step so the default path stays effortless.',
        ],
        steps: [
          'Choose the workspace where the item belongs.',
          'Give it a title that will still make sense when you see it later.',
          'Add only the date, project, or context needed to make the capture useful.',
          'Save it, then process or refine it when you have enough attention.',
        ],
        note: {
          label: 'Tip',
          text: 'A capture does not need to be perfectly organized at the moment it enters Ledger. Preserve the thought first; make the destination precise during Intake.',
        },
      },
      {
        id: 'success',
        title: 'Capture success',
        content: [
          'After saving, Ledger can confirm where the item landed and offer quick follow-up actions like view today or add another.',
          'Capture should feel like a fast landing pad, not another inbox to manage forever.',
          'A useful success state reassures the user, closes the loop, and helps them keep moving instead of wondering where the item went.',
        ],
      },
    ],
  },
  notes: {
    title: 'Notes',
    intro: 'Notes are for workspace context: meeting notes, class notes, daily logs, research, drafts, and documentation, with enough structure to keep the context useful later without turning the editor into a wiki system.',
    sections: [
      {
        id: 'use-cases',
        title: 'What notes are for',
        content: [
          'Use Notes for meeting notes, class notes, daily logs, client notes, project docs, research, drafts, documentation, and personal planning.',
          'Notes should keep workspace context close to the work that generated it.',
          'A note should feel like a place to think, record, and return later, not just a text box with a title.',
        ],
        bullets: [
          'Meeting notes that need to stay connected to the project and follow-ups they create.',
          'Research or reference material that should remain searchable without becoming a task.',
          'Project context, decisions, and working documents that explain why the work is moving.',
          'Personal logs, plans, drafts, and structured templates that support the daily loop.',
        ],
      },
      {
        id: 'shared-notes',
        title: 'Shared notes',
        content: [
          'Shared notes need collaboration safety so newer versions are visible without overwriting active changes silently.',
          'If another user edits a note, Ledger should surface the update cleanly and let the user refresh when they are ready.',
          'The experience should stay calm even when the content changes, because shared editing only works if users trust that their current work is not being silently lost.',
        ],
      },
      {
        id: 'organize-review',
        title: 'Organize and review',
        content: [
          'Notes should remain easy to search, easy to link, and easy to turn back into action when needed.',
          'Review should stay useful instead of becoming a second inbox.',
          'That means notes should have a stable home in a workspace, a clear title, and a path back to projects, events, or follow-up actions when the information matters again.',
        ],
        bullets: [
          'Use sections and parent notes to create a lightweight hierarchy.',
          'Keep templates collapsed until you need a repeatable starting point.',
          'Use linked notes when a project or event needs durable context.',
          'Use search and recent updates to recover notes without rebuilding the folder structure.',
        ],
      },
      {
        id: 'templates-and-views',
        title: 'Templates and note views',
        content: [
          'Templates are reusable starting points for meeting notes, project context, daily reviews, research, and other repeated work. Creating a note from a template gives you structure without forcing every note into the same format.',
          'A note can be viewed in different modes depending on the work: Write for editing, Outline for structure, Map for spatial relationships, and Transcribe for meeting or recorded conversation context where that capability is available.',
          'Choose the view that helps with the current job. A mind map is a way to understand a note; it is not a separate kind of note that should break links, workspace ownership, or search.',
        ],
        note: {
          label: 'Tip',
          text: 'Keep templates focused. A good template removes the blank-page problem while leaving enough room for the actual meeting, project, or review to take its own shape.',
        },
      },
      {
        id: 'meeting-notes-and-history',
        title: 'Meeting notes, media, and history',
        content: [
          'Meeting notes can hold the discussion, decisions, follow-ups, linked people, project context, and relevant calendar event in one place. The note should explain what happened and make the next action easy to recover.',
          'Images, files, external embeds, and design or Drive resources should remain stable links or stored assets rather than fragile temporary content. Keep the source recognizable when it matters to future review.',
          'Version history is for meaningful recovery points, not every keystroke. Use it when you need to inspect an earlier version, restore a destructive change, or understand how important context evolved.',
        ],
        screenshot: {
          label: 'Notes screenshot',
          title: 'Note editor with structure and context',
          description: 'Add a screenshot showing the note editor, left note organization, current view, and right-side metadata or linked context.',
          caption: 'Notes keep writing, organization, metadata, and project context close without turning Ledger into a general-purpose wiki.',
        },
      },
    ],
  },
  projects: {
    title: 'Projects',
    intro: 'Projects keep long-running work organized with notes, tasks, project actions, deadlines, and follow-ups, while staying lightweight enough that they do not become miniature project-management software.',
    sections: [
      {
        id: 'project-model',
        title: 'Project model',
        content: [
          'A project can include a name, description, status, progress, workspace, notes, tasks, actions, events, captures, deadlines, follow-ups, activity, and members.',
          'Project statuses can include not started, in progress, waiting, blocked, complete, and archived.',
          'The project record should answer what the work is, where it stands, and what the user should do next without requiring a lot of digging.',
        ],
        bullets: [
          'Outcome: what should be true when the project is complete.',
          'Status and progress: how the work is moving without treating low progress as failure.',
          'Next actions: the concrete work that keeps momentum.',
          'Context: notes, calendar items, linked resources, activity, people, and workspace ownership.',
        ],
        screenshot: {
          label: 'Project workspace screenshot',
          title: 'Project overview with context and next actions',
          description: 'Add a screenshot showing the project header, status, progress, next actions, notes, and linked context.',
          caption: 'A project brings outcome, progress, next actions, dates, notes, and connected context together so the work has a durable home.',
        },
      },
      {
        id: 'project-actions',
        title: 'Project actions',
        content: [
          'Project actions are separate from generic tasks because they belong to a project’s forward motion.',
          'Use actions for the specific work that keeps a project moving, then connect notes, reminders, deadlines, and follow-ups around them.',
          'This keeps the project centered on outcome and momentum rather than on a big undifferentiated task list.',
        ],
      },
      {
        id: 'progress',
        title: 'Progress and follow-ups',
        content: [
          'Projects should show progress, next action, deadline, and workspace so the user can understand state at a glance.',
          'Project follow-ups and deadlines keep the work from stalling quietly.',
          'A good project view makes it obvious whether the problem is that nothing has started, the next step is missing, or the work simply needs a reminder to resume.',
        ],
      },
    ],
  },
  desktop: {
    title: 'Ledger on desktop',
    intro: 'The desktop app is Ledger’s full command center: a persistent sidebar beside your work, focused pop-out windows for deeper planning, and native shortcuts for capturing context before it disappears.',
    sections: [
      {
        id: 'why-desktop',
        title: 'Why use the desktop app?',
        content: [
          'Ledger on desktop is designed to stay close to the applications where work happens. Keep the sidebar visible beside a browser, editor, design tool, terminal, or meeting window so the next useful action is always nearby.',
          'The desktop app is the best place for longer sessions: shaping a project, writing a note, reviewing a calendar, processing Intake, checking Circle, or moving between workspace context without repeatedly opening a new browser tab.',
          'The desktop app does not replace the web view or mobile app. It owns the native companion behavior: docked placement, pop-outs, menu bar or tray access, native notifications, platform shortcuts, and window state.',
        ],
        screenshot: {
          label: 'Desktop app screenshot',
          title: 'Ledger beside the work',
          description: 'Add a screenshot showing the sidebar beside another application or a desktop module open in a pop-out.',
          caption: 'Use the desktop workspace when a project needs context, dates, actions, notes, and connected resources in one place.',
        },
      },
      {
        id: 'sidebar',
        title: 'The sidebar',
        content: [
          'The sidebar is the always-available layer for quick capture, Today, workspace switching, navigation, notifications, and fast access to Notes, Projects, Calendar, Teams, Circle, Intake, and Slack.',
          'Dock it to the left, right, top, or bottom when the layout calls for it, or use a floating mode when the sidebar should remain near a particular area of the screen. Personal presentation settings such as opacity, frost, collapsed state, auto-hide, and always-on-top belong to your device.',
          'The sidebar is not a second dashboard. Its job is to keep the path from thought to action short while the larger modules remain available for focused work.',
        ],
      },
      {
        id: 'popouts',
        title: 'Pop-out workspaces',
        content: [
          'Open a module in a pop-out when the work needs room: a three-pane Notes session, a Projects timeline, a Calendar day or week, a team review, or a detailed integration workflow.',
          'Pop-outs remember their module bounds when possible and open relative to the visible sidebar. If a saved window would land off-screen after a monitor change, Ledger should prefer a usable current display.',
          'The center content has priority as space narrows. Right inspectors may collapse before the main workspace, and focus mode may take over at smaller widths so the window remains usable instead of becoming a set of clipped panels.',
        ],
      },
      {
        id: 'capture-and-shortcuts',
        title: 'Quick capture and shortcuts',
        content: [
          'Use the desktop quick capture flow for a task, note, event, reminder, or follow-up. A quick capture can be scoped to a workspace and optionally connected to a project or date before it is saved.',
          'Ledger uses the platform’s conventional modifier: Command on macOS and Control on Windows. The exact shortcut can be reviewed in Settings, and the desktop menu bar or tray can provide another entry point when the main window is not in front.',
          'Keyboard access should make capture faster, not force you to remember a large command language. If you do not know the shortcut, open the desktop app and use the visible capture control while you build the habit.',
        ],
      },
      {
        id: 'updates',
        title: 'Updates and version checks',
        content: [
          'Ledger desktop updates are distributed through the app’s release channel. Use the application menu’s update action when available, then restart Ledger if the updater asks you to.',
          'If a new UI or behavior does not appear after an update, close and reopen the app before reinstalling. A hard refresh is primarily a web-view troubleshooting step; the native app may need its packaged process restarted.',
          'On managed devices, update behavior may be controlled by the organization’s deployment settings. Contact the device administrator if the app reports that updates are unavailable or blocked.',
        ],
        note: {
          label: 'Note',
          text: 'If a new feature is not visible immediately after an update, close and reopen Ledger before reinstalling the app. The web app and desktop app may update on different release paths.',
        },
      },
      {
        id: 'desktop-troubleshooting',
        title: 'Desktop troubleshooting',
        content: [
          'If the sidebar is not visible, check its position, collapsed state, auto-hide setting, and always-on-top state. Move the pointer to the configured edge if auto-hide is enabled.',
          'If a pop-out is missing, use the module navigation again and check whether it opened on another display or behind the current window. Ledger should restore a saved position only when it remains on-screen.',
          'If notifications do not appear, check operating-system notification permissions, Ledger’s notification settings, and whether the app is running. Delivery state is device-specific even though the underlying work belongs to a workspace.',
        ],
      },
    ],
  },
  web: {
    title: 'Ledger on the web',
    intro: 'The Ledger web app gives you the workspace command center in a browser. It keeps the same records, routes, and workspace boundaries as desktop while fitting naturally into a tab, a separate browser window, or a shared team workflow.',
    sections: [
      {
        id: 'when-to-use-web',
        title: 'When to use the web app',
        content: [
          'Use the web app when you are on a computer where Ledger desktop is not installed, when you need a shareable browser URL, or when your team already works primarily in browser-based tools.',
          'The web app is useful for opening a workspace from an invite, checking a project from a link, reviewing Intake, or keeping Ledger available in a normal browser tab without native window behavior.',
          'Desktop and web share the same workspace model. The difference is the shell around the product: web navigation and browser history replace Electron windows, tray behavior, and operating-system placement.',
        ],
      },
      {
        id: 'workspace-routes',
        title: 'Workspace URLs and navigation',
        content: [
          'A web workspace URL identifies the workspace and the surface you are opening. Links can take you directly to a project, note, task, event, team, Intake item, notification, search query, or settings section.',
          'Use browser Back to return to the workspace route you came from. Overlay captures and follow-ups should return to the underlying workspace context instead of losing the page you were working on.',
          'When a link opens the wrong workspace, stop and check the workspace identifier in the URL and the workspace switcher before editing or creating anything.',
        ],
        bullets: [
          'Workspace home and Dashboard for orientation.',
          'Projects, Notes, Calendar, Teams, Circle, Intake, Slack, and Notifications for focused work.',
          'Search with a query when you already know part of the title, source, or workspace context.',
          'Settings for account, workspace, integrations, and browser-specific preferences.',
        ],
        note: {
          label: 'Important',
          text: 'Before creating or editing from a direct link, confirm the workspace name in the switcher and the workspace identifier in the URL.',
        },
      },
      {
        id: 'web-vs-desktop',
        title: 'Web and desktop differences',
        content: [
          'The core records and actions should stay consistent across web and desktop. A task completed on the web should be completed when you return to desktop, and a note opened from a web link should remain the same workspace note.',
          'Desktop adds native behaviors such as a persistent sidebar beside other apps, pop-out module windows, menu bar or tray access, native shortcuts, and desktop notification delivery. Web uses browser tabs, URL routes, and browser permissions instead.',
          'When a help instruction mentions a desktop menu, Electron window, sidebar placement, or native shortcut, use the Desktop guide. When it mentions a route, browser Back, or a shareable link, use the Web guide.',
        ],
      },
      {
        id: 'web-auth',
        title: 'Sign in and workspace access',
        content: [
          'The web app requires an authenticated Ledger account. After signing in, you can open the workspaces you belong to and switch between them according to your access.',
          'Invite links may open a public landing step before the membership is accepted. Complete the invite flow with the account that should own the membership, then return to the workspace route.',
          'If a workspace is missing, check that you are signed in with the expected account and that the invitation was accepted. Do not create a duplicate workspace just because the expected one is not visible yet.',
        ],
      },
      {
        id: 'web-troubleshooting',
        title: 'Web troubleshooting',
        content: [
          'If a page is blank or stale, refresh the browser tab and confirm that the URL is the Ledger web app route rather than the marketing site.',
          'If a direct project or note link returns to the wrong place, confirm the workspace in the URL and sign in again if the session expired.',
          'If browser notifications are missing, check browser notification permissions separately from Ledger’s in-app notification preferences.',
          'If the web app does not reflect a recent desktop change, reload the route and verify that both clients are signed in to the same account and workspace.',
        ],
      },
    ],
  },
  'project-timeline': {
    title: 'Project timeline, roadmap, and milestones',
    intro: 'The Projects timeline turns long-running work into a visible plan. It shows where projects sit in time, which milestones define progress, and what actions need to happen between now and the outcome.',
    sections: [
      {
        id: 'timeline-overview',
        title: 'Read the timeline',
        content: [
          'Open Projects and switch the overview to Timeline when you want to understand the shape of the workspace rather than inspect one project at a time. The timeline groups dated projects into rows and places their milestones on the same time axis.',
          'Use the range controls to look at a month, a quarter, or the full available plan. A short range is useful for near-term coordination; the full view is useful for spotting collisions, gaps, and projects that have quietly lost a date.',
          'Projects without a start or end date remain available in the list view. They are not treated as failures; they are simply work that has not yet been placed on the calendar of the roadmap.',
        ],
        screenshot: {
          label: 'Projects timeline screenshot',
          title: 'Roadmap with project bars and milestone markers',
          description: 'Add a screenshot of the Projects timeline showing its range controls, project rows, today marker, and milestone labels.',
          caption: 'The timeline is an overview of project timing. Open the project for the detail behind each bar and marker.',
        },
      },
      {
        id: 'project-bars',
        title: 'Project date ranges',
        content: [
          'A project bar represents the period in which the project is expected to be active. The bar is not a task schedule and it does not claim that every day in the range is fully planned. It gives the team a shared frame for the work.',
          'Set a start date when work becomes active and an end date when the outcome should be ready. If the date changes, update the project rather than moving every task one by one; the timeline is designed to make the larger shift visible.',
          'Status, progress, lead, owner team, next actions, notes, and connected calendar items explain the bar. The date range says when; the project record says why and what happens next.',
        ],
      },
      {
        id: 'milestones',
        title: 'Milestones and roadmap checkpoints',
        content: [
          'Milestones are dated checkpoints inside a project. Use them for a launch, handoff, review, deadline, decision, delivery, approval, or any other point that makes progress legible to someone who is not watching every task.',
          'A milestone belongs to a project and can be marked complete, reopened, assigned to a person or team, and given a type. The project timeline renders it as a marker so the important dates remain visible even when the project has many actions.',
          'A roadmap is stronger when milestones describe outcomes rather than vague activity. “Approve onboarding flow” is a useful checkpoint; “work on onboarding” is usually better represented as a next action.',
        ],
        bullets: [
          'Use a milestone for a date that changes how the project is understood.',
          'Use a next action for the work required to reach that date.',
          'Assign a milestone when someone needs to own the checkpoint or decision.',
          'Reopen a milestone when the outcome moved backward or needs another pass.',
        ],
      },
      {
        id: 'horizons',
        title: 'Today work and longer-horizon work',
        content: [
          'Ledger keeps immediate execution separate from longer-horizon planning. Tasks can be routed toward today when they need attention now, or kept long term when they belong to the project but do not need to compete with the current day.',
          'This distinction prevents the roadmap from becoming a giant daily task list. The timeline shows the project’s shape; Today shows the small set of actions that should actually receive attention now.',
          'When processing Intake or assigning work to a team, choose the horizon based on urgency and usefulness, not on whether the work is important. Important work can still belong in the longer horizon until its next step is ready.',
        ],
      },
      {
        id: 'timeline-actions',
        title: 'Create and edit from the timeline',
        content: [
          'Select a project row to place a milestone, then give the milestone a title, date, type, and optional assignment. Select an existing marker to inspect or edit it. Keep the title short enough to remain readable at the current zoom level.',
          'Use project context for the detail behind the marker: linked notes, project notes, activity, calendar items, and connected resources. The timeline should remain an overview, not a replacement for the project workspace.',
          'If a project has no meaningful date yet, use the list view to establish the project record and its next action first. Add dates when they help a decision or coordination conversation.',
        ],
      },
      {
        id: 'timeline-faq',
        title: 'Timeline FAQs',
        content: [
          'Why is my project missing from the timeline? It may not have a start or end date, or the selected range may not include its dates. Use the list view to inspect the project and choose a wider range.',
          'Why is a milestone not on the project row? Check that it is linked to the expected project and that its date is inside the selected range. Completed milestones can also be grouped below active milestones for readability.',
          'Does a milestone create a task automatically? No. A milestone is a checkpoint. Add next actions when the team needs concrete work between the checkpoint and the outcome.',
        ],
      },
    ],
  },
  dashboard: {
    title: 'Dashboard and Today',
    intro: 'Dashboard is the daily command center for Ledger. Today narrows the view to immediate attention; Dashboard gives that attention a little more context through focus, assigned work, review, upcoming items, and signals from the rest of the workspace.',
    sections: [
      {
        id: 'dashboard-vs-today',
        title: 'Dashboard and Today are related, not identical',
        content: [
          'Today is the tight daily view: what is scheduled, due, overdue, in focus, or waiting for follow-through. Dashboard is the broader briefing around that view, including work assigned to you, projects needing attention, upcoming context, and review.',
          'Use Today when you are deciding what to do next. Use Dashboard when you are starting the day, switching into a workspace, or closing the loop and deciding what should carry forward.',
          'Both views are workspace-aware. In a single workspace they stay focused; in an all-workspaces view they preserve the source workspace so you can see the whole day without losing context.',
        ],
      },
      {
        id: 'focus',
        title: 'Set a small focus',
        content: [
          'Focus is for the one to three outcomes you want to move intentionally. It is not a second task database and it does not need every item to have a due date.',
          'Pull focus from a task, project action, reminder, calendar context, or a fresh capture. If the focus list grows until everything is included, remove items until it represents the day you can actually lead.',
          'At the end of the day, completed focus gives review a useful starting point. Unfinished focus should be rescheduled or reworded, not silently left to become background guilt.',
        ],
      },
      {
        id: 'assigned-review',
        title: 'Assigned work and review',
        content: [
          'Assigned work shows tasks and project work that have been given to you in a shared workspace. It is different from everything in the workspace: the distinction is ownership and the next response expected from you.',
          'Review is where Ledger closes the loop. Record what finished, what was blocked, and the first task for tomorrow. A review note can be short; its value is that it turns a vague end-of-day feeling into a durable next step.',
          'If a block depends on another person, use Circle or a follow-up to make that dependency visible. Do not bury a waiting state in a private note where nobody can act on it.',
        ],
      },
      {
        id: 'needs-attention',
        title: 'Needs attention',
        content: [
          'Needs attention is a signal layer for overdue work, paused or stalled projects, upcoming milestones, waiting items, and new Intake context. It is designed to help you decide, not to make every item look urgent.',
          'Open the source item when the signal needs context. A project may need a new next action, a task may need a new date, a Slack thread may need to become Intake, or a milestone may need to be reassigned.',
          'When a signal is no longer relevant, resolve the source state. Mark the work complete, snooze it, reschedule it, archive the capture, or write the follow-up that explains what happens next.',
        ],
      },
    ],
  },
  intake: {
    title: 'Intake',
    intro: 'Intake is Ledger’s processing layer for incoming context. It gives captures a temporary home where you can understand them, choose a destination, and preserve the source before turning them into durable work.',
    sections: [
      {
        id: 'what-intake-is',
        title: 'What belongs in Intake',
        content: [
          'Intake can receive browser saves, Slack messages, Google Drive files, integration activity, quick captures, and other incoming items that do not yet have a clear final form.',
          'An Intake item keeps source details such as the provider, link, channel or author, raw content, capture method, suggested destination, and workspace. That information is useful while you decide what the item means.',
          'Intake is intentionally different from Notes. A note is a place for context you have chosen to keep; Intake is where unprocessed context waits for a decision.',
        ],
      },
      {
        id: 'process-item',
        title: 'Process an item',
        content: [
          'Start by reading the title and preview, then inspect the source context. Ask what this is, why it matters, and whether there is a next action. You do not need to decide the final destination before you understand the item.',
          'Convert the item to a task, note, reminder, event, or project. When the item is already useful as context, place it in the relevant project or note instead of creating a task that only says “look at this.”',
          'If the item is not ready, snooze it until a date when it can be reviewed. If it is not relevant, archive it. Accepted and archived states make the queue finite and explain what happened to the original capture.',
        ],
        bullets: [
          'Clarify: what is this and why was it captured?',
          'Route: which workspace, project, person, calendar, or note should own it?',
          'Convert: task, note, reminder, event, project, or linked context.',
          'Close the loop: accept, snooze, or archive the Intake item.',
        ],
        screenshot: {
          label: 'Intake screenshot',
          title: 'Review an incoming item before conversion',
          description: 'Add a screenshot showing the source, workspace, suggested destination, and conversion controls.',
          caption: 'Intake is the processing layer between an incoming signal and the durable Ledger record it becomes.',
        },
      },
      {
        id: 'workspace-routing',
        title: 'Workspace and destination routing',
        content: [
          'Every Intake item should land in a workspace. The browser extension and mobile capture use a default capture workspace, while explicit captures can choose another workspace when the context is different.',
          'During conversion, choose the destination project, calendar, note section, or assignee where those options apply. Keep related records in the same workspace so links remain understandable and access stays safe.',
          'If an external item arrives without enough context, leave it in Intake until the workspace and destination are clear. Ambiguous captures should not be scattered across guessed locations.',
        ],
      },
      {
        id: 'intake-sources',
        title: 'Slack, Drive, and browser sources',
        content: [
          'Slack Intake keeps the message, channel, author, and permalink available. Google Drive Intake keeps the provider resource and access state. Browser Intake keeps the page URL, title, and selected text. Each source should remain recognizable after conversion.',
          'A connected source can produce duplicate or stale items when the provider retries delivery or access changes. Use the source metadata and status to understand whether an item is new, already converted, failed, or waiting for reconnection.',
          'Intake is also where external chaos becomes Ledger structure. Convert only what deserves a durable Ledger record; archive the rest without feeling obligated to recreate the entire external system inside Ledger.',
        ],
      },
      {
        id: 'intake-faq',
        title: 'Intake FAQs',
        content: [
          'Can an Intake item become a project? Yes. Use that when the incoming context represents an outcome with its own actions, dates, notes, and ownership—not just one task.',
          'What does “snoozed” mean? It means the item remains available but is intentionally removed from the immediate processing queue until its snooze date.',
          'Why did a Slack or Drive item fail? Check the provider connection, workspace access, source access status, and any retry or reconnect action shown with the item.',
        ],
      },
    ],
  },
  circle: {
    title: 'Circle',
    intro: 'Circle is the people-centered view of a shared workspace. It shows who is connected to the work, what is assigned, which projects are shared, where follow-ups are waiting, and what activity needs a human response.',
    sections: [
      {
        id: 'circle-purpose',
        title: 'What Circle is for',
        content: [
          'Projects and tasks tell you what exists. Circle helps answer who is involved, who owns the next move, who is waiting, and what shared context has changed recently.',
          'Use Circle for a person-centered check-in, a handoff, a manager’s review of assigned work, or a quick way to find shared projects without opening each project separately.',
          'Circle is not a social feed. Its tabs and summaries are organized around work: active people, waiting on, shared work, pinned people, assigned tasks, projects, follow-ups, and activity.',
        ],
      },
      {
        id: 'people-list',
        title: 'Find the right person',
        content: [
          'The people list can be filtered by team, role, open tasks, shared projects, waiting state, and pinned status. Sort by name, team, role, open work, recent activity, or newest active work when the workspace is large.',
          'A person row summarizes open work, shared projects, follow-ups, waiting state, role, teams, and recent activity. Use the summary to choose where to look next; open the detail view when you need the actual records.',
          'Pin people you regularly coordinate with. A pin is a personal navigation preference, not a change to workspace membership or visibility.',
        ],
        screenshot: {
          label: 'Circle screenshot',
          title: 'People, shared work, and waiting states',
          description: 'Add a screenshot showing Circle filters, people rows, open work counts, shared projects, and the selected person detail.',
          caption: 'Circle starts with people and leads back to the work, ownership, and follow-ups connected to them.',
        },
      },
      {
        id: 'assigned-and-waiting',
        title: 'Assigned work and waiting states',
        content: [
          'Assigned work shows tasks and project work connected to a person. Waiting on me means the person is waiting for you; waiting on them means your next move depends on that person.',
          'Use the distinction to write better follow-ups. “Waiting on design” is a useful state when a specific person or team owns the next decision; it is not a substitute for an undated task with no owner.',
          'Needs attention brings overdue or active items forward so a shared workspace does not rely on memory alone. Resolve the source item or create a follow-up when the state needs an explicit next move.',
        ],
      },
      {
        id: 'shared-projects-activity',
        title: 'Shared projects and activity',
        content: [
          'Shared projects show the projects a person is connected to, including status, progress, due date, next-action count, and recent changes. Open the project when the person view tells you that the work needs more context.',
          'Activity brings together task, project, and audit-style changes so you can see what moved without treating every change as a notification. Use it for review and coordination, not for replacing the project history.',
          'Follow-ups can be created from the person context when a conversation, handoff, or promise needs to return at a specific time.',
        ],
      },
    ],
  },
  teams: {
    title: 'Teams',
    intro: 'Teams organize people around shared delivery inside a workspace. A team can own projects, receive tasks and milestones, surface overdue work, and provide a focused view of the work that belongs to that group.',
    sections: [
      {
        id: 'team-model',
        title: 'Workspace, team, and project boundaries',
        content: [
          'A workspace is the access and context boundary. A team is a group inside that workspace. A project is the outcome the work is moving toward. Keeping those levels distinct makes it easier to share the right context without turning every project into a new workspace.',
          'Teams can link existing projects or create a project for the team. Linked project notes and milestones surface in the team view so the team can coordinate without copying the project into a second system.',
          'Team settings can define membership, invitations, role context, and default project visibility. Access to the team still follows the workspace membership and role rules.',
        ],
      },
      {
        id: 'team-overview',
        title: 'Team overview',
        content: [
          'The team overview combines active projects, assigned work, team notes, upcoming events or reminders, milestones, and needs-attention signals. It is a coordination surface, not a replacement for the project timeline.',
          'Use the overview to answer what the team owns, what is active, what is overdue, and which milestone is next. Open the project or work item when an item needs editing or a deeper decision.',
          'The overview is especially useful during a weekly check-in: review active projects, inspect overdue milestones, then assign the next concrete task or milestone while the context is fresh.',
        ],
        screenshot: {
          label: 'Team overview screenshot',
          title: 'Team projects, assignments, and milestones',
          description: 'Add a screenshot showing a team overview with active projects, assigned work, milestones, and needs-attention items.',
          caption: 'Teams give a group a focused coordination surface while the workspace remains the access and context boundary.',
        },
      },
      {
        id: 'assign-work',
        title: 'Assign tasks and milestones',
        content: [
          'Team work can include tasks and milestones. Tasks describe concrete action; milestones describe a dated checkpoint or outcome. Both can be searched, assigned, opened, completed, reopened, and linked to their project context.',
          'When creating a milestone, give it a title, project, date, and type. Use a type such as review, delivery, decision, or deadline when that label will help the team understand the checkpoint later.',
          'Choose the task horizon deliberately. Today work belongs in immediate attention; long-term work remains connected to the project without crowding the daily view.',
        ],
      },
      {
        id: 'team-review',
        title: 'Review a team without creating noise',
        content: [
          'Start with needs attention: overdue milestones, overdue assignments, paused work, and projects without a next action. Then open the source record and resolve the actual cause.',
          'Use Circle when the question is about a person, Teams when the question is about a group, and the project timeline when the question is about dates and dependencies. These views overlap intentionally but should not be used interchangeably.',
          'Keep notifications for events that need a response. Routine activity belongs in the team activity context, where it can be reviewed without interrupting everyone.',
        ],
      },
    ],
  },
  slack: {
    title: 'Slack in Ledger',
    intro: 'Ledger connects Slack to the accountability loop: capture a message into Intake, watch the conversations that matter, review activity, and link the thread to the project, note, task, or follow-up that gives it a durable home.',
    sections: [
      {
        id: 'slack-model',
        title: 'What the Slack integration does',
        content: [
          'Slack is not copied into Ledger as a second chat client. Ledger stores the useful context around selected messages and conversations so they can become work without losing their Slack source.',
          'The Slack workspace connection, your Slack identity, conversation watches, captures, activity, and context links are separate parts of the integration. Workspace administrators manage the connection; individual users can manage their own identity and personal watches where supported.',
          'Every Slack action is scoped to a Ledger workspace. Choose the workspace that should receive captures and links before you start processing activity.',
        ],
      },
      {
        id: 'connect-and-identity',
        title: 'Connect Slack and verify identity',
        content: [
          'An owner or administrator connects Slack for the Ledger workspace. After the connection is authorized, Ledger shows the Slack team, who connected it, and whether the connection needs reauthorization or additional activity scopes.',
          'Each user can connect their Slack identity when the workspace flow supports personal activity. This lets Ledger associate mentions, replies, and watched conversation activity with the right user without making one person’s private setup the workspace’s shared connection.',
          'If Slack access changes, expect a visible disconnected, access-lost, or reauthorization-required state. Reconnect the provider before treating missing activity as a content problem.',
        ],
      },
      {
        id: 'watches-and-activity',
        title: 'Watch conversations and review activity',
        content: [
          'A watch tells Ledger which Slack conversation deserves attention. Personal watches are useful for your own follow-through; shared watches can make a channel or conversation part of a workspace-level operating rhythm.',
          'Watch preferences can control daily recap inclusion, mentions, replies, and active threads. Keep the watch list intentional so Slack activity remains a signal rather than another firehose.',
          'Activity can be filtered by date and type, marked read or unread, dismissed, opened in Slack, or promoted to Intake. The daily recap summarizes new messages, mentions, replies, active threads, captures, and linked context.',
        ],
        bullets: [
          'Personal watch: a conversation you need to keep up with for your own work.',
          'Shared watch: a conversation that should inform a workspace or team workflow.',
          'Daily recap: a compact review of what changed without opening every thread.',
          'Promote to Intake: preserve a message when it needs a Ledger decision or follow-through.',
        ],
        screenshot: {
          label: 'Slack screenshot',
          title: 'Slack activity and watched conversations',
          description: 'Add a screenshot showing activity filters, watched conversations, recap metrics, and the promote-to-Intake action.',
          caption: 'Use watches to keep Slack activity focused on conversations that can affect Ledger work.',
        },
      },
      {
        id: 'capture-and-intake',
        title: 'Capture a Slack message into Intake',
        content: [
          'Capture a message when it contains a request, decision, reference, deadline, or promise that should survive the conversation. Ledger keeps the message text, channel, author, timestamp, and permalink so the source remains available.',
          'Review Slack captures in the Slack captures view or Intake. Captures can be received, processing, completed, or failed. Once converted, Ledger keeps the relationship to the destination item so you can see what the message became.',
          'Use the Intake conversion flow to create a task, note, reminder, event, project, or project context. Do not create a generic task when the real follow-through is a project milestone, linked note, or person-specific follow-up.',
        ],
      },
      {
        id: 'context-links',
        title: 'Link Slack context to Ledger work',
        content: [
          'A Slack context can be linked to a project, note, task, event, reminder, or other supported Ledger record. The link keeps the conversation available from the work it explains.',
          'Use links for durable context: a decision in a thread, a client request, a technical incident, a handoff, or a discussion that explains why the project changed. A link is not the same as converting the message; it preserves relationship without forcing a new record.',
          'Refresh a context when the thread has changed, mark it read when you have reviewed the latest replies, and remove the link when the relationship is no longer useful. The original Slack message remains in Slack.',
        ],
      },
      {
        id: 'slack-troubleshooting',
        title: 'Slack troubleshooting',
        content: [
          'No Slack captures are appearing? Check that the Ledger workspace is connected, the user identity is authorized when required, and the capture has not been filtered out as converted or failed.',
          'Activity is missing? Check the conversation watch, its status, the selected date, and the watch preferences for mentions, replies, or active threads. An access-lost watch needs provider access restored before it can update.',
          'A capture is stuck in processing? Open its status and failure reason, then retry or reconnect the Slack integration if offered. Do not duplicate-capture the same message until you know whether the original request succeeded.',
        ],
        note: {
          label: 'Important',
          text: 'A connected Slack team does not automatically mean every conversation or activity scope is available. Check the watch status and authorization scopes before debugging the capture itself.',
        },
      },
    ],
  },
  integrations: {
    title: 'Integrations',
    intro: 'Ledger integrations bring outside signals and resources into the same workspace loop. Each connector has a different job: some capture, some link resources, some publish dates, some watch activity, and some let an authorized client act on Ledger context.',
    sections: [
      {
        id: 'integration-principles',
        title: 'How integrations fit into Ledger',
        content: [
          'Ledger remains the source of truth for workspace membership, permissions, projects, notes, tasks, events, Intake items, and follow-through. An integration should make relevant context easier to bring in or act on, not create a disconnected copy of the outside product.',
          'When a signal is ambiguous, it should land in Intake first. When a resource is already understood, link it directly to the project or note that owns the context. The distinction prevents the workspace from filling with unprocessed noise.',
          'Connector availability varies by platform and permission. Read the integration’s setup and access requirements before assuming that a connected account means every provider feature is available.',
        ],
      },
      {
        id: 'communication',
        title: 'Communication: Slack',
        content: [
          'Slack captures messages and activity into workspace context. Use it for requests, decisions, mentions, replies, watched conversations, daily recaps, and links back to the original thread.',
          'Slack’s strongest Ledger workflow is capture → Intake → conversion or context link. It is not intended to replace Slack’s conversation model.',
          'See the full Slack guide for connection roles, personal identity, watches, activity filters, captures, links, and troubleshooting.',
        ],
      },
      {
        id: 'files-and-resources',
        title: 'Files and resources: Google Drive',
        content: [
          'Google Drive can connect a project to a Drive folder, browse connected files, refresh source state, promote files into project resources, and send selected files to Intake for processing.',
          'Projects can also use Drive write actions such as creating folders or native files, uploading files, applying folder templates, and exporting project structure where the connected account and permissions allow it.',
          'A connected folder is a live relationship with provider access and refresh state. If access is revoked, the folder is missing, or the source is stale, reconnect or repair the connection instead of assuming the project data has disappeared.',
        ],
      },
      {
        id: 'development-and-design',
        title: 'Development and design: GitHub and Figma',
        content: [
          'GitHub can connect repositories and surface attention signals, searchable resources, capture rules, and notification preferences. Use it to bring relevant issues, pull requests, or repository context into project follow-through.',
          'Figma can connect design context and authorize the plugin flow so designs can remain connected to the project or note where decisions are recorded. The external resource stays in its source tool while Ledger preserves the relationship.',
          'Provider authorization is scoped and revocable. If an integration asks for a new scope, review why it is needed before approving it.',
        ],
      },
      {
        id: 'calendar-and-automation',
        title: 'Calendar feeds, Apple apps, MCP, and the extension',
        content: [
          'Apple Calendar and Apple Reminders are macOS-oriented connections for bringing supported calendar and reminder context alongside Ledger work. Calendar feeds publish Ledger dates outward to an external calendar app; they are not a second Ledger editor.',
          'MCP connects an authorized AI client to one Ledger workspace at a time. Review requested read and write scopes, keep the workspace boundary explicit, and remember that the client is a connection layer while Ledger owns the underlying records and permissions.',
          'The browser extension captures pages and selections into a default workspace Inbox using a revocable extension token. See the Browser extension guide for token setup and destination behavior.',
        ],
      },
      {
        id: 'integration-faq',
        title: 'Integration FAQs',
        content: [
          'Does connected mean synchronized? Not always. Some integrations publish or import selectively, some refresh on demand, and some watch activity. Use the connector’s status and refresh controls to understand its current state.',
          'Can I connect one provider to multiple Ledger workspaces? Workspace behavior depends on the integration. Always confirm the selected workspace before authorizing or sending captures.',
          'What should I do when access changes? Reauthorize or reconnect the provider, then refresh the affected source. If the source is still unavailable, keep the Ledger record and use its access status to decide whether to repair, replace, or unlink it.',
        ],
      },
    ],
  },
  calendar: {
    title: 'Calendar',
    intro: 'Calendar connects scheduled time to workspace context, so events, reminders, and time blocks can stay attached to the work they belong to instead of living as isolated appointments.',
    sections: [
      {
        id: 'event-creation',
        title: 'Event creation',
        content: [
          'Events can include title, date, time, duration, workspace, privacy, reminder settings, calendar, project, description, and recurrence.',
          'Calendar should support scheduled time without making everything feel like a meeting.',
          'The modal or editor should stay quick to use, because most calendar items are about getting context onto a date rather than building a complex schedule object.',
        ],
        bullets: [
          'Title and date are required to make the item findable.',
          'Start time and optional end time place it in the day or week timeline.',
          'Calendar controls visibility and grouping.',
          'Project, note, and notes fields keep the event connected to follow-through.',
          'Repeat is for predictable patterns; use separate events when each occurrence needs different context.',
        ],
        screenshot: {
          label: 'Calendar screenshot',
          title: 'Time connected to projects and notes',
          description: 'Add a screenshot showing the calendar view, event or reminder detail, and linked project or note context.',
          caption: 'Calendar is most useful when a scheduled item explains what it is connected to and what follow-through it may create.',
        },
      },
      {
        id: 'repeating',
        title: 'Repeating events',
        content: [
          'Ledger should support simple repeat options like daily, weekly, monthly, and yearly, plus custom selected dates for irregular patterns.',
          'Custom repeats should stay compact and understandable.',
          'Repeats are useful when they stay obvious; if the user has to decode a complicated rule just to save an event, the flow has gone too far.',
        ],
      },
      {
        id: 'hover-layering',
        title: 'Hover and layering',
        content: [
          'Empty slot hover applies only to empty slots, event hover applies to the event block, and multi-hour events should not be visually sliced by hover overlays.',
          'Event blocks should sit above grid hover layers.',
          'This matters because the calendar needs to stay readable when the user is scanning a dense day, not just when the grid is empty.',
        ],
      },
    ],
  },
  notifications: {
    title: 'Notifications',
    intro: 'Notifications are global and should surface the right thing at the right time without turning Ledger into a noisy alert stream.',
    sections: [
      {
        id: 'scope',
        title: 'Notification scope',
        content: [
          'Notifications can be workspace-specific, user-specific, global across workspaces, per-member in shared workspaces, or per-device for delivery state.',
          'Notification inbox is user-level; source context stays workspace-level.',
          'That separation keeps the alert surface simple while still preserving where each item came from and why it matters.',
        ],
        screenshot: {
          label: 'Notifications screenshot',
          title: 'Active alerts with source context',
          description: 'Add a screenshot showing notification filters, active or earlier states, source labels, workspace context, and actions.',
          caption: 'Notifications are a response layer. The underlying task, reminder, event, project, or Intake item remains the source of truth.',
        },
      },
      {
        id: 'active-earlier',
        title: 'Active and earlier',
        content: [
          'Mobile notifications can be organized into Active and Earlier so actionable items stay visible while older alerts move out of the way.',
          'Earlier notifications have already been seen, dismissed, completed, or expired.',
          'The split helps users focus on what still needs attention rather than forcing them to dig through a long history.',
        ],
        bullets: [
          'Active: unread or unresolved items that still need a response.',
          'Earlier: notifications that have already been seen, dismissed, completed, or expired.',
          'Read state is separate from workflow state; reading an alert does not complete the underlying task.',
        ],
      },
      {
        id: 'notification-actions',
        title: 'Notification actions',
        content: [
          'Reminder due, event soon, task due, project action due, capture waiting, and deadline approaching all need clear action sets.',
          'The action set should stay calm and avoid overwhelming the user with choices.',
          'If the action is not obvious, the notification should lead the user to the item itself instead of inventing extra controls.',
        ],
      },
      {
        id: 'desktop-delivery',
        title: 'Desktop delivery',
        content: [
          'Desktop notifications should work even when Ledger is minimized if the app is running and permissions are granted.',
          'Ledger should keep delivery state separate from workspace context.',
          'Delivery status belongs to the device and permission layer, while the meaning of the notification belongs to the workspace item that created it.',
        ],
      },
    ],
  },
  search: {
    title: 'Search',
    intro: 'Search is global and helps users find anything across their workspace system, then act on it without leaving the flow.',
    sections: [
      {
        id: 'desktop-search',
        title: 'Desktop search',
        content: [
          'Desktop search can behave like a command surface that opens notes, projects, tasks, reminders, events, captures, and workspace context.',
          'Users should be able to jump across workspaces and create new items without leaving the search flow.',
          'On desktop, search can be both a finder and a launcher, which makes it useful for quick navigation as well as broad recall.',
        ],
        screenshot: {
          label: 'Search screenshot',
          title: 'Find a record or launch the next action',
          description: 'Add a screenshot showing search results with record types, workspace labels, snippets, and available actions.',
          caption: 'Search should help you recover context and act on it without creating a separate workflow.',
        },
      },
      {
        id: 'mobile-search',
        title: 'Mobile search',
        content: [
          'Mobile search opens from the bottom dock as a full-height sheet with a minimal search bar, clean result rows, workspace context, type labels, and snippets.',
          'It should reuse the same search logic as desktop.',
          'The mobile version should stay fast and touch-friendly, with results that are easy to scan in a narrow viewport.',
        ],
      },
      {
        id: 'result-actions',
        title: 'Search result actions',
        content: [
          'Search results can support open, mark as done, snooze, move to tomorrow, add to focus, add note, create follow-up, edit, delete, archive, and convert capture.',
          'Search should not create a separate action system; it should reuse the shared item action model.',
          'That reuse keeps the product consistent and prevents search from becoming a dead-end list that the user has to manually process elsewhere.',
        ],
        bullets: [
          'Open the source record when you need full context.',
          'Use quick actions for completion, snoozing, focus, rescheduling, or follow-up.',
          'Convert an Intake result only after confirming the destination and workspace.',
          'Use the same search language across titles, notes, projects, people, and source context.',
        ],
      },
    ],
  },
  mobile: {
    title: 'Mobile',
    intro: 'Ledger Mobile is the companion app for fast capture, daily awareness, and light action while away from desktop, with a smaller surface area tuned for quick checking and response.',
    sections: [
      {
        id: 'tabs',
        title: 'Mobile tabs',
        content: [
          'Ledger Mobile has three core tabs: Today, Capture, and Notifications.',
          'Search can live in the bottom dock as an icon, and settings are accessed from the page header.',
          'Those tabs cover the most common away-from-desk jobs: checking the day, saving something before it disappears, and clearing action items that need a response now.',
        ],
        bullets: [
          'Today: see what needs attention and what is coming up.',
          'Capture: create a note, task, reminder, event, or project action quickly.',
          'Notifications: respond to due work, assignments, project updates, and integration activity.',
        ],
        screenshot: {
          label: 'Mobile screenshot',
          title: 'Today, Capture, and Notifications on the move',
          description: 'Add a mobile screenshot showing the main tabs, workspace selector, and a compact capture or notification flow.',
          caption: 'Mobile keeps Ledger focused on quick awareness, capture, and response rather than reproducing every desktop surface.',
        },
      },
      {
        id: 'header',
        title: 'Mobile header',
        content: [
          'Mobile pages use a shared collapsing header with page title, settings icon, and workspace selector label.',
          'When scrolling, the header should animate upward and fade away like a native large-title experience.',
          'That behavior keeps the screen focused on content while still giving the user an obvious way to switch context or open settings.',
        ],
      },
      {
        id: 'sheets',
        title: 'Detail and long press sheets',
        content: [
          'Tapping a row opens a reusable detail sheet and long press opens a quick actions sheet.',
          'Both should feel minimal, draggable, and safe for destructive actions.',
          'The sheet pattern lets mobile stay compact without losing the ability to inspect items or act on them in place.',
        ],
      },
      {
        id: 'settings',
        title: 'Settings',
        content: [
          'Mobile settings can cover account, workspace, notifications, capture, app appearance, haptics, and help.',
          'The settings flow should stay structured and easy to scan on a phone.',
          'Settings should stay out of the way until needed, then answer the most likely questions without forcing the user through a long maze of toggles.',
        ],
      },
    ],
  },
  'browser-extension': {
    title: 'Browser extension',
    intro: 'The Ledger browser extension helps capture information from the web and turn it into useful context, so a page or selection can become a note, task, reminder, event, or project reference without extra copying.',
    sections: [
      {
        id: 'save-to-ledger',
        title: 'Save to Ledger',
        content: [
          'Users can right click and choose Save to Ledger to capture current pages, selected text, links, articles, research, documentation, client requests, ideas, references, tasks from web pages, and meeting pages.',
          'Captured items can land in an inbox, a selected workspace, or the default capture workspace.',
          'The capture destination should be obvious enough that users know where the item went, but flexible enough that they can route it correctly when the context matters.',
        ],
        bullets: [
          'Open the extension popup for a deliberate capture.',
          'Use the browser context menu to save the current page or selected text.',
          'Choose the workspace when the item does not belong in the default capture workspace.',
          'Process the resulting Intake item when you know whether it should become durable work.',
        ],
        screenshot: {
          label: 'Browser extension screenshot',
          title: 'Capture a page or selected text',
          description: 'Add a screenshot showing the extension popup or browser context menu with the selected workspace and capture type.',
          caption: 'The extension is the short path from something useful on the web to a workspace item that can be processed later.',
        },
      },
      {
        id: 'workflows',
        title: 'Use cases',
        content: [
          'Save a research article and turn it into a note.',
          'Save a client request and turn it into a task.',
          'Save a deadline and turn it into a reminder.',
          'Save a meeting page and turn it into an event.',
          'The extension is most useful when it removes friction from the moment you realize something on the web actually belongs in Ledger.',
        ],
      },
      {
        id: 'convert-later',
        title: 'Convert later',
        content: [
          'Extension captures can later become tasks, reminders, notes, events, or project actions.',
          'The extension should feel like a fast bridge into Ledger, not a separate product surface.',
          'That means the item should preserve enough source context that the later conversion is still meaningful, even if the user processes it hours or days later.',
        ],
        note: {
          label: 'Tip',
          text: 'Use the extension as a fast landing point. Decide whether a page is a note, task, reminder, or project reference after you have read enough to understand why it matters.',
        },
      },
    ],
  },
  'siri-shortcuts': {
    title: 'Siri shortcuts',
    intro: 'Ledger Mobile can support Siri Shortcuts and App Intents for quick creation and lightweight lookup, which makes it useful when the user wants to capture or check something without opening the app.',
    sections: [
      {
        id: 'create-commands',
        title: 'Create commands',
        content: [
          'Possible Siri commands include add reminder, add task, create event, save note, and add project action.',
          'Commands should stay short and specific so they work in real-world use.',
          'The command should say enough to route the item correctly, but not so much that the spoken flow becomes slower than just opening Ledger.',
        ],
      },
      {
        id: 'read-command',
        title: 'Read commands',
        content: [
          'A read-only command like What’s Today in Ledger? should answer with a short summary of upcoming items and current actions.',
          'Siri should not read full notes or long descriptions.',
          'The response should feel like a concise briefing: enough to orient the user, then stop so they can decide whether to open the app for more detail.',
        ],
      },
      {
        id: 'workspace-logic',
        title: 'Workspace logic',
        content: [
          'Workspace resolution can follow the spoken workspace name first, then default Siri workspace, then default capture workspace, then the first personal workspace.',
          'If nothing matches, Ledger should ask the user to open Ledger.',
          'Clear workspace resolution matters because Siri only feels reliable when the user trusts that the item will land in the right place every time.',
        ],
      },
    ],
  },
  settings: {
    title: 'Settings and preferences',
    intro: 'Settings control the parts of Ledger that belong to your account, your workspace, your devices, and your connected tools. Use this guide to understand which changes are personal, which affect a shared workspace, and where to find each control.',
    sections: [
      {
        id: 'settings-model',
        title: 'How Ledger settings are organized',
        content: [
          'Ledger separates account settings, workspace settings, personal preferences, and integration settings so a local display choice does not accidentally change the experience for everyone else.',
          'Account and device settings follow you as a user. Workspace settings apply to the workspace and may require an owner or administrator role. Integration settings connect provider accounts to a workspace and should be reviewed with the same care as workspace access.',
          'When you are unsure where a setting belongs, ask whether it changes who can access shared data or only how Ledger appears on your device. Shared access belongs to Workspace or Members; presentation belongs to Preferences, Sidebar, Accessibility, or Startup.',
        ],
        bullets: [
          'Account: profile, display name, avatar, sessions, and sign-in access.',
          'Workspace: name, description, type, members, invitations, and workspace-level defaults.',
          'Preferences: time format, overdue behavior, notifications, and personal defaults.',
          'Sidebar and accessibility: position, opacity, frost, motion, contrast, text size, and startup behavior.',
          'Integrations: Slack, Google Drive, GitHub, Figma, calendar connections, MCP, and browser extension access.',
        ],
      },
      {
        id: 'profile-account',
        title: 'Profile and account',
        content: [
          'Your profile identifies you across shared workspaces. Keep your display name and avatar current so assignments, Circle, project activity, and workspace membership are understandable to other people.',
          'Account controls should be used for changes that follow you across Ledger surfaces. Changing your profile does not rename a workspace or change the ownership of records you created there.',
          'Use Sessions and account when the concern is device access rather than profile information. Those controls let you review where Ledger is signed in and revoke sessions you no longer trust.',
        ],
        note: {
          label: 'Important',
          text: 'Changing a profile is not the same as changing workspace membership. If someone should gain or lose access, use Workspace members and invitations.',
        },
      },
      {
        id: 'workspace-members',
        title: 'Workspace details, members, and invitations',
        content: [
          'Workspace settings define the shared context: its name, description, type, members, invitations, and related defaults. Keep the workspace description specific enough that a new member knows what belongs there.',
          'Members and invitations are access controls. Review the invited email, role, and membership before sending an invitation, and remove access when someone should no longer see the workspace.',
          'Teams are organized inside a workspace. Use team settings for team membership and team-specific project visibility, while workspace members remain the top-level access boundary.',
        ],
        steps: [
          'Open Settings from the workspace you intend to manage.',
          'Review Workspace details and Members before changing access.',
          'Invite people with the role they need for the work, not more access than necessary.',
          'Confirm the membership state after the invitation is accepted or revoked.',
        ],
      },
      {
        id: 'notifications-preferences',
        title: 'Notification preferences',
        content: [
          'Notification preferences control which Ledger signals should reach you and how prominently they should appear. They do not change the underlying task, reminder, event, project, or Intake state.',
          'Keep read state separate from workflow state. Reading a notification acknowledges that you saw it; completing or dismissing the source record is what changes the work itself.',
          'Use workspace notification settings for the categories that matter in a workspace, then check operating-system or browser permissions if delivery is missing. Ledger cannot display a notification that the device has blocked.',
        ],
        bullets: [
          'Reminders and events: time-based signals from your calendar context.',
          'Tasks and project work: due, overdue, assignment, and milestone signals.',
          'Intake and integrations: incoming context that may need processing.',
          'Workspace activity and invitations: changes that affect shared access or coordination.',
        ],
      },
      {
        id: 'sidebar-accessibility',
        title: 'Sidebar, accessibility, and startup',
        content: [
          'Sidebar settings are personal presentation preferences. Choose where the sidebar docks, how transparent or frosted it appears, whether it auto-hides, whether it stays above other windows, and whether Ledger remembers its expanded or collapsed state.',
          'Accessibility settings reduce motion or transparency, increase contrast, and adjust text sizing where supported. These preferences should make the workspace easier to read without changing shared records or workspace behavior.',
          'Startup settings control how Ledger behaves when the device or app starts. If Ledger opens unexpectedly, check startup preferences and the operating system’s login-item settings together.',
        ],
        screenshot: {
          label: 'Settings screenshot',
          title: 'Personal preferences and workspace settings',
          description: 'Add a screenshot showing the Settings navigation with the selected section and its compact setting rows.',
          caption: 'Settings group personal presentation, shared workspace administration, accessibility, and integrations into separate sections.',
        },
      },
      {
        id: 'integration-settings',
        title: 'Integration settings and access',
        content: [
          'Integration settings are where you connect, refresh, repair, or disconnect external providers. A connected account is not necessarily a fully synchronized system; each provider has its own scopes, refresh behavior, and access state.',
          'Review the workspace before connecting a provider. For connectors that can write or capture, confirm the destination workspace and the permissions being requested before authorizing.',
          'Disconnecting a provider should stop new activity while preserving Ledger records that already exist. If a source becomes inaccessible, reconnect or repair it before deleting the Ledger context that explains the work.',
        ],
        note: {
          label: 'Tip',
          text: 'Use the individual integration guides for provider-specific setup. This page explains where settings live and how to reason about access; it is not a replacement for each connector’s setup instructions.',
        },
      },
    ],
  },
  'sessions-account': {
    title: 'Sessions and account',
    intro: 'Ledger can show where you are signed in so users can manage trust and device access across desktop, mobile, browser, and web sessions.',
    sections: [
      {
        id: 'sessions',
        title: 'Sessions',
        content: [
          'Sessions can include desktop app sessions, mobile app sessions, browser extension sessions, and web sessions.',
          'A session row can show device name, app type, platform, last active time, current device indicator, and app version.',
          'That list is most useful when it lets the user quickly tell which devices are still trusted and which ones should be removed.',
        ],
      },
      {
        id: 'sign-out',
        title: 'Sign out controls',
        content: [
          'Actions can include sign out this device, sign out other devices, or sign out all other devices.',
          'The UI should only show a device as signed out when the underlying auth session is actually revoked.',
          'If the session still exists on the server, the interface should make that clear instead of pretending the user is protected when they are not.',
        ],
      },
      {
        id: 'account',
        title: 'Account safety',
        content: [
          'Sessions help users protect workspace data if they lose a device or sign in somewhere they no longer trust.',
          'Account and session controls belong together because they affect the same trust surface.',
          'This page should keep the language plain and action-oriented so the user can understand what access is active without reading a security manual.',
        ],
      },
    ],
  },
  'contact-support': {
    title: 'Contact support',
    intro: 'Send Ledger a simple support request and we will point you in the right direction, whether the issue is about login, workspace access, mobile behavior, desktop behavior, or something else.',
    sections: [
      {
        id: 'contact-form',
        title: 'Contact form',
        content: [
          'Use the form on this page to send a short message with your name, email, subject, and what you need help with.',
          'Keep it brief and specific so support can get you to the next step faster.',
          'Including the exact surface and the exact thing that is not behaving correctly usually saves a round trip.',
        ],
      },
    ],
  },
  troubleshooting: {
    title: 'Troubleshooting',
    intro: 'Troubleshooting covers the common places where a user can get stuck and what to check first, starting with the simplest route before moving into deeper account or platform issues.',
    sections: [
      {
        id: 'invite-links',
        title: 'Invite links',
        content: [
          'Invite flows need a public invite URL, backend validation, invite token handling, invite acceptance, and post-accept transitions.',
          'Invite URLs should use a configured base URL instead of relying on the current origin.',
          'If an invite is failing, the issue is often in link generation, token state, or the post-accept redirect rather than in the page copy itself.',
        ],
      },
      {
        id: 'notifications',
        title: 'Notifications and auth',
        content: [
          'Check permissions, delivery state, and session state if notifications are not appearing as expected.',
          'Desktop notifications should still behave correctly when Ledger is minimized if the app is running.',
          'A lot of notification problems come down to either permissions on the device or a stale session, so those checks should happen first.',
        ],
      },
      {
        id: 'search-and-extension',
        title: 'Search and extension',
        content: [
          'If search is not updating, confirm the route and the search scope first.',
          'If the browser extension is not saving, check the capture destination and the active workspace.',
          'These two surfaces often fail in ways that look like a content bug but are actually scope or routing problems.',
        ],
      },
      {
        id: 'mobile-and-siri',
        title: 'Mobile and Siri',
        content: [
          'Mobile auth, push permissions, and Siri workspace resolution are the usual places to verify when mobile behavior looks wrong.',
          'Keep the checks short and start with permissions, scope, and the currently selected workspace.',
          'When Siri or mobile returns the wrong thing, it is usually better to confirm the active account and workspace before chasing the command text itself.',
        ],
      },
    ],
  },
}

const articleSlugAliases: Record<string, string> = {
  'getting-started': 'start-guide',
  shortcuts: 'siri-shortcuts',
  account: 'sessions-account',
  contact: 'contact-support',
}

type SearchEntry = {
  title: string
  href: string
  label: string
  excerpt: string
  scope: string
  searchText: string
}

function createSearchText(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(' ').toLowerCase()
}

const helpSearchEntries: SearchEntry[] = [
  ...homeSections.flatMap((section) =>
    section.cards.map((card) => ({
      title: card.title,
      href: card.href,
      label: section.title,
      excerpt: card.description,
      scope: 'Help home',
      searchText: createSearchText([card.title, card.description, section.title, 'help home']),
    })),
  ),
  ...Object.entries(articleMap).flatMap(([slug, article]) => [
    {
      title: article.title,
      href: `/help/${slug}`,
      label: 'Document',
      excerpt: article.intro,
      scope: 'Article',
      searchText: createSearchText([article.title, article.intro, slug, 'help article']),
    },
    ...article.sections.map((section) => ({
      title: section.title,
      href: `/help/${slug}#${section.id}`,
      label: article.title,
      excerpt: section.content.join(' '),
      scope: 'Section',
      searchText: createSearchText([section.title, section.content.join(' '), article.title, slug]),
    })),
  ]),
  ...sidebarGroups.flatMap((group) =>
    group.links.map((link) => ({
      title: link.label,
      href: link.href,
      label: group.title,
      excerpt: link.label,
      scope: 'Support',
      searchText: createSearchText([link.label, group.title, link.href, 'support']),
    })),
  ),
]

function getSearchScore(entry: SearchEntry, query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) {
    return 1
  }

  const tokens = normalized.split(/\s+/).filter(Boolean)
  let score = 0

  for (const token of tokens) {
    if (!entry.searchText.includes(token)) {
      return 0
    }

    score += 1
  }

  if (entry.title.toLowerCase().includes(normalized)) {
    score += 3
  }

  if (entry.label.toLowerCase().includes(normalized)) {
    score += 1
  }

  if (entry.excerpt.toLowerCase().includes(normalized)) {
    score += 1
  }

  return score
}

const cardIcons: Record<CardIconKey, LucideIcon> = {
  'start-guide': BookOpen,
  workspaces: Layers3,
  today: Sparkles,
  actions: Workflow,
  capture: NotebookPen,
  notes: BookOpen,
  projects: FolderKanban,
  'project-timeline': FolderKanban,
  calendar: CalendarDays,
  dashboard: Sparkles,
  intake: Inbox,
  circle: Users,
  teams: Layers3,
  slack: MessageCircle,
  notifications: Bell,
  search: Search,
  mobile: Smartphone,
  desktop: Monitor,
  web: Monitor,
  settings: Settings,
  'browser-extension': Plug2,
  integrations: Link2,
  'siri-shortcuts': Sparkles,
  'sessions-account': ShieldCheck,
  'contact-support': LifeBuoy,
  troubleshooting: TriangleAlert,
}

function DocsGlyph({ icon }: { icon: DocCard['icon'] }) {
  const Icon = cardIcons[icon]

  return <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
}

function DocsHeader({
  onSearchOpen,
  isMenuOpen,
  onMenuToggle,
  breadcrumbSegments,
}: {
  onSearchOpen: () => void
  isMenuOpen: boolean
  onMenuToggle: () => void
  breadcrumbSegments?: string[]
}) {
  return (
    <header className="sticky top-0 z-40 grid h-16 w-full border-b border-(--ledger-border-subtle) bg-ledger-bg lg:grid-cols-[260px_minmax(0,1fr)]">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:border-r lg:border-(--ledger-border-subtle)">
        <div className="flex items-center gap-3">
          <a href="/" className="inline-flex items-center rounded-full leading-none">
          <img src="/assets/logos/logo.svg" alt="" className="h-7 w-auto" aria-hidden="true" />
          </a>
          <span aria-hidden="true" className="h-5 w-px bg-(--ledger-border-subtle)" />
          <a href="/help" className="relative top-px text-[19px] font-medium tracking-[-0.02em] text-ledger-text">
            Help
          </a>
        </div>
        <div className="flex items-center gap-2">
          <DocsSearchButton onSearchOpen={onSearchOpen} />
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={onMenuToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] text-ledger-text-muted transition-colors duration-200 hover:bg-(--ledger-header-pill) hover:text-ledger-text lg:hidden"
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M5 7.5h14M5 12h14M5 16.5h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="hidden items-center justify-start px-6 text-[14px] text-ledger-text-muted lg:flex">
        {breadcrumbSegments ? <DocsBreadcrumbs segments={breadcrumbSegments} /> : null}
      </div>
    </header>
  )
}

function DocsBreadcrumbs({ segments }: { segments: string[] }) {
  if (segments.length === 0) {
    return null
  }

  return (
    <nav className="flex min-w-0 items-center gap-2 text-[14px] text-ledger-text-muted" aria-label="Breadcrumb">
      {segments.map((segment, index) => (
        <div key={`${segment}-${index}`} className="flex min-w-0 items-center gap-2">
          {index > 0 ? <span className="text-ledger-text-muted/70">/</span> : null}
          <span className={index === segments.length - 1 ? 'truncate text-ledger-text' : 'truncate'}>{segment}</span>
        </div>
      ))}
    </nav>
  )
}

function DocsSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col border-r border-(--ledger-border-subtle) bg-[rgba(255,255,255,0.01)]">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-10 pb-5">
          <nav className="space-y-6">
            {sidebarGroups.slice(0, -1).map((group) => (
              <div key={group.title}>
                <p className="px-2 text-[10px] font-semibold tracking-[0.08em] text-ledger-text-muted/60">
                  {group.title}
                </p>
                <div className="mt-3 space-y-0.5">
                  {group.links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`flex items-center justify-between rounded-lg px-2 py-2 text-[14px] transition-colors ${
                        isActive
                            ? 'bg-(--ledger-header-pill-active) text-ledger-text'
                            : 'text-ledger-text-muted hover:bg-(--ledger-header-pill) hover:text-ledger-text'
                        }`}
                      >
                        <span>{link.label}</span>
                        <span className="text-[11px] text-ledger-text-muted">›</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className="shrink-0 border-t border-(--ledger-border-subtle) px-4 py-4">
          <div className="space-y-3">
            {sidebarGroups.slice(-1).map((group) => (
              <div key={group.title}>
                <p className="px-2 text-[10px] font-semibold tracking-[0.08em] text-ledger-text-muted/60">
                  {group.title}
                </p>
                <div className="mt-3 space-y-0.5">
                  {group.links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`flex items-center justify-between rounded-lg px-2 py-2 text-[14px] transition-colors ${
                        isActive
                            ? 'bg-(--ledger-header-pill-active) text-ledger-text'
                            : 'text-ledger-text-muted hover:bg-(--ledger-header-pill) hover:text-ledger-text'
                        }`}
                      >
                        <span>{link.label}</span>
                        <span className="text-[11px] text-ledger-text-muted">›</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

function DocsMobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean
  pathname: string
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <>
      <div aria-hidden="true" className="site-nav__mobile-backdrop lg:hidden is-open" onClick={onClose} />

      <div className="site-nav__mobile-sheet is-open pt-0! lg:hidden">
        <div className="min-h-0 flex-1 overflow-y-auto pr-4 scrollbar-gutter-stable">
          <nav className="space-y-6">
            {sidebarGroups.map((group) => (
              <div key={group.title}>
                <p className="px-2 text-[10px] font-semibold tracking-[0.08em] text-ledger-text-muted/60">
                  {group.title}
                </p>
                <div className="mt-3 space-y-0.5">
                  {group.links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        className={`flex items-center justify-between rounded-lg px-2 py-2 text-[15px] transition-colors ${
                          isActive
                            ? 'bg-(--ledger-header-pill-active) text-ledger-text'
                            : 'text-ledger-text-muted hover:bg-(--ledger-header-pill) hover:text-ledger-text'
                        }`}
                      >
                        <span>{link.label}</span>
                        <span className="text-[11px] text-ledger-text-muted">›</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-4 border-t border-(--ledger-border-subtle) pt-4">
          <div className="grid gap-2">
            <a
              href="/help"
              onClick={onClose}
              className={`rounded-xl px-3 py-2 text-[14px] transition-colors ${
                pathname === '/help'
                  ? 'bg-(--ledger-header-pill-active) text-ledger-text'
                  : 'text-ledger-text-muted hover:bg-(--ledger-header-pill) hover:text-ledger-text'
              }`}
            >
              Help home
            </a>
            <a
              href="/help/contact-support"
              onClick={onClose}
              className={`rounded-xl px-3 py-2 text-[14px] transition-colors ${
                pathname === '/help/contact-support'
                  ? 'bg-(--ledger-header-pill-active) text-ledger-text'
                  : 'text-ledger-text-muted hover:bg-(--ledger-header-pill) hover:text-ledger-text'
              }`}
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

function DocsCard({ card }: { card: DocCard }) {
  return (
    <a
      href={card.href}
      className="group block rounded-2xl border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-(--ledger-header-border)"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.03)] text-ledger-text">
        <DocsGlyph icon={card.icon} />
      </div>
      <h3 className="mt-10 text-[18px] font-semibold tracking-[-0.03em] text-ledger-text">{card.title}</h3>
      <p className="mt-2 max-w-sm text-[15px] leading-6 text-ledger-text-muted">{card.description}</p>
    </a>
  )
}

function DocsSearchButton({ onSearchOpen }: { onSearchOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onSearchOpen}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] text-ledger-text-muted transition-colors hover:bg-(--ledger-header-pill) hover:text-ledger-text"
      aria-label="Search help"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M15.25 15.25L19 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </button>
  )
}

function SearchModal({
  open,
  query,
  onQueryChange,
  onClose,
}: {
  open: boolean
  query: string
  onQueryChange: (value: string) => void
  onClose: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.requestAnimationFrame(() => {
      inputRef.current?.focus()
    })

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const normalizedQuery = query.trim()

    if (normalizedQuery.length < 2) {
      return []
    }

    const scored = helpSearchEntries
      .map((entry) => ({ entry, score: getSearchScore(entry, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))

    if (query.trim()) {
      return scored.slice(0, 12).map(({ entry }) => entry)
    }

    return scored.slice(0, 8).map(({ entry }) => entry)
  }, [query])

  if (!open) {
    return null
  }

  const hasQuery = query.trim().length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[rgba(14,13,11,0.72)] px-3 py-3 backdrop-blur-[2px] sm:items-center sm:px-6 sm:py-8" onMouseDown={onClose}>
      <div
        className={`mx-auto mt-2 flex max-h-[calc(100vh-1.5rem)] w-full flex-col overflow-hidden rounded-3xl border border-(--ledger-border-subtle) bg-ledger-bg shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out sm:mt-0 sm:max-h-[min(80vh,760px)] ${
          hasQuery ? 'max-w-190' : 'max-w-140'
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-(--ledger-border-subtle) px-4 py-4 sm:px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] text-ledger-text-muted">
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.7" />
              <path d="M15.25 15.25L19 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </div>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search help and docs"
            className="min-w-0 flex-1 bg-transparent text-[17px] text-ledger-text outline-none placeholder:text-ledger-text-muted/70"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] text-ledger-text-muted transition-colors hover:bg-(--ledger-header-pill) hover:text-ledger-text"
            aria-label="Close search"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {hasQuery ? (
          <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-3">
            {results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <a
                    key={`${result.href}-${result.title}`}
                    href={result.href}
                    className="block rounded-[18px] px-3 py-3 transition-colors hover:bg-(--ledger-header-pill) sm:px-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[17px] font-medium tracking-[-0.03em] text-ledger-text">
                          {result.title}
                        </span>
                        <span className="rounded-full border border-(--ledger-border-subtle) px-2 py-0.5 text-[11px] text-ledger-text-muted">
                          {result.label}
                        </span>
                    </div>
                      <p className="mt-1.5 max-w-3xl text-[14px] leading-6 text-ledger-text-muted">
                        {result.excerpt}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center px-8 text-center">
                <div>
                  <p className="text-[18px] font-medium tracking-[-0.03em] text-ledger-text">No results found</p>
                  <p className="mt-2 text-[15px] leading-6 text-ledger-text-muted">
                    Try a different keyword, like workspace, notes, or project updates.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <p className="text-[15px] leading-6 text-ledger-text-muted">
              Search help, docs, and support.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function DocsHomePage({
  pathname,
  onSearchOpen,
  isMenuOpen,
  onMenuToggle,
}: {
  pathname: string
  onSearchOpen: () => void
  isMenuOpen: boolean
  onMenuToggle: () => void
}) {
  return (
    <div
      className="min-h-dhv bg-ledger-bg text-ledger-text"
      style={{ '--site-nav-menu-offset': '64px' } as CSSProperties}
    >
      <DocsHeader onSearchOpen={onSearchOpen} isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle} />
      <DocsMobileMenu open={isMenuOpen} pathname={pathname} onClose={onMenuToggle} />

      <div className="grid w-full lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <DocsSidebar pathname={pathname} />
        </div>

        <main className="min-w-0 w-full justify-self-center px-5 py-10 sm:px-8 lg:max-w-330 lg:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-5xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-ledger-text-muted">Help</p>
                <h1 className="mt-3 text-[50px] font-medium tracking-[-0.055em] text-ledger-text sm:text-[64px] lg:text-[72px]">
                  Help, Support, and Documents
                </h1>
                <p className="mt-4 max-w-2xl text-[17px] leading-7 text-ledger-text-muted sm:text-[18px]">
                  Learn how Ledger works across desktop, mobile, browser extension, workspaces, capture, projects, calendar, and support.
                  Start with the overview, then jump into the surface or workflow you need without having to piece the system together yourself.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-12">
              {homeSections.map((section) => (
                <section key={section.title}>
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-ledger-text sm:text-[28px]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {section.cards.map((card) => (
                      <DocsCard key={card.title} card={card} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function DocsArticlePage({
  pathname,
  onSearchOpen,
  isMenuOpen,
  onMenuToggle,
}: {
  pathname: string
  onSearchOpen: () => void
  isMenuOpen: boolean
  onMenuToggle: () => void
}) {
  const requestedSlug = pathname.replace(/^\/(docs|help)\/?/, '') || 'start-guide'
  const slug = articleSlugAliases[requestedSlug] ?? requestedSlug
  const article = articleMap[slug] ?? articleMap['start-guide']
  const sectionIds = useMemo(() => article.sections.map((section) => section.id), [article])
  const outlineRailRef = useRef<HTMLDivElement | null>(null)
  const outlineItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? '')
  const [outlineMarker, setOutlineMarker] = useState({ top: 0, height: 0 })
  const breadcrumbGroup =
    sidebarGroups.find((group) => group.links.some((link) => link.href === `/help/${slug}`))?.title ?? 'Help'
  const relatedLinks = useMemo(() => {
    const currentGroup = sidebarGroups.find((group) => group.links.some((link) => link.href === `/help/${slug}`))
    const candidates = [
      ...(currentGroup?.links ?? []),
      ...sidebarGroups.flatMap((group) => group.links),
    ]
    const seen = new Set<string>()

    return candidates.filter((link) => {
      if (link.href === `/help/${slug}` || seen.has(link.href)) return false
      seen.add(link.href)
      return true
    }).slice(0, 3)
  }, [slug])

  useEffect(() => {
    if (sectionIds.length === 0 || typeof window === 'undefined') {
      return
    }

    let rafId = 0
    const activationOffset = 96

    const updateActiveSection = () => {
      const viewportLine = window.scrollY + activationOffset
      const atPageBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24
      let nextSectionId = sectionIds[0] ?? ''

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) {
          continue
        }

        const sectionTop = element.getBoundingClientRect().top + window.scrollY

        if (sectionTop <= viewportLine) {
          nextSectionId = id
        }
      }

      if (atPageBottom) {
        nextSectionId = sectionIds[sectionIds.length - 1] ?? nextSectionId
      }

      setActiveSectionId((current) => (current === nextSectionId ? current : nextSectionId))
    }

    const onScroll = () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }

      rafId = window.requestAnimationFrame(() => {
        updateActiveSection()
        rafId = 0
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [sectionIds])

  useEffect(() => {
    const updateMarker = () => {
      const railElement = outlineRailRef.current
      const activeElement = outlineItemRefs.current[activeSectionId]

      if (!railElement || !activeElement) {
        return
      }

      const railRect = railElement.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()

      setOutlineMarker({
        top: activeRect.top - railRect.top,
        height: activeRect.height,
      })
    }

    updateMarker()
    window.addEventListener('resize', updateMarker)

    return () => {
      window.removeEventListener('resize', updateMarker)
    }
  }, [activeSectionId])

  return (
    <div
      className="min-h-dhv bg-ledger-bg text-ledger-text"
      style={{ '--site-nav-menu-offset': '64px' } as CSSProperties}
    >
      <DocsHeader
        onSearchOpen={onSearchOpen}
        isMenuOpen={isMenuOpen}
        onMenuToggle={onMenuToggle}
        breadcrumbSegments={[breadcrumbGroup, article.title]}
      />
      <DocsMobileMenu open={isMenuOpen} pathname={pathname} onClose={onMenuToggle} />

      <div className="grid w-full lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <DocsSidebar pathname={`/docs/${slug}`} />
        </div>

        <main className="min-w-0 w-full justify-self-center px-5 py-10 sm:px-8 lg:max-w-330 lg:px-12 lg:py-10">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12">
            <article className="min-w-0 mx-auto w-full max-w-3xl">
              <p className="text-[13px] font-medium text-ledger-text-muted">Help</p>
              <h1 className="mt-3 text-[44px] font-medium tracking-[-0.055em] text-ledger-text sm:text-[58px] lg:text-[64px]">
                {article.title}
              </h1>
              <p className="mt-4 max-w-3xl text-[18px] leading-7 text-ledger-text-muted sm:text-[19px]">
                {article.intro}
              </p>

              <div className="mt-12 space-y-16">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-[24px] font-semibold tracking-[-0.035em] text-ledger-text sm:text-[28px]">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-[16px] leading-7 text-ledger-text-muted">
                      {section.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets?.length ? (
                      <ul className="mt-5 list-disc space-y-3 pl-6 text-[16px] leading-7 text-ledger-text-muted marker:text-ledger-accent">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="pl-1">{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.steps?.length ? (
                      <ol className="mt-5 list-decimal space-y-3 pl-6 text-[16px] leading-7 text-ledger-text-muted marker:font-medium marker:text-ledger-text">
                        {section.steps.map((step) => (
                          <li key={step} className="pl-1">{step}</li>
                        ))}
                      </ol>
                    ) : null}
                    {section.note ? (
                      <aside className="mt-7 rounded-xl border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.08)] px-4 py-3.5 sm:px-5" role="note">
                        <p className="text-[13px] font-semibold text-ledger-text">{section.note.label ?? 'Note'}</p>
                        <p className="mt-1.5 text-[14px] leading-6 text-ledger-text-muted">{section.note.text}</p>
                      </aside>
                    ) : null}
                    {section.screenshot ? (
                      <figure className="mt-8 overflow-hidden rounded-xl border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.035)] p-2">
                        <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-(--ledger-header-border) bg-ledger-bg px-6 py-10 text-center">
                          <div className="max-w-md">
                            <p className="text-[13px] font-medium text-ledger-text-muted">{section.screenshot.label}</p>
                            <p className="mt-3 text-[17px] font-medium tracking-[-0.02em] text-ledger-text">{section.screenshot.title}</p>
                            <p className="mt-2 text-[13px] leading-5 text-ledger-text-muted">{section.screenshot.description}</p>
                          </div>
                        </div>
                        <figcaption className="px-2 pb-2 pt-3 text-[13px] leading-5 text-ledger-text-muted">
                          {section.screenshot.caption}
                        </figcaption>
                      </figure>
                    ) : null}
                  </section>
                ))}
              </div>

              {relatedLinks.length ? (
                <section className="mt-20 border-t border-(--ledger-border-subtle) pt-8">
                  <h2 className="text-[24px] font-semibold tracking-[-0.035em] text-ledger-text">Read more</h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {relatedLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="group flex h-full min-h-56 flex-col rounded-xl border border-(--ledger-border-subtle) px-4 py-4 transition-colors hover:border-(--ledger-header-border) hover:bg-[rgba(247,242,234,0.05)]"
                      >
                        <p className="text-[15px] font-medium text-ledger-text">{link.label}</p>
                        <p className="mt-2 line-clamp-5 text-[13px] leading-5 text-ledger-text-muted group-hover:text-ledger-text-muted/90">
                          {articleMap[link.href.replace('/help/', '')]?.intro ?? 'Continue exploring Ledger help.'}
                        </p>
                        <span className="mt-auto pt-5 text-[13px] font-medium text-ledger-text-muted group-hover:text-ledger-text">Read guide →</span>
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </article>

            <aside className="hidden xl:block">
              <div ref={outlineRailRef} className="sticky top-8 border-l border-(--ledger-border-subtle) pl-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 w-px rounded-full bg-ledger-text transition-[transform,height,opacity] duration-200 ease-out"
                  style={{
                    opacity: activeSectionId ? 1 : 0,
                    transform: `translateY(${outlineMarker.top}px)`,
                    height: `${outlineMarker.height}px`,
                  }}
                />
                <p className="text-[13px] font-medium text-ledger-text-muted">On this page</p>
                <nav className="mt-2 grid gap-1">
                  {sectionIds.map((id) => {
                    const section = article.sections.find((item) => item.id === id)
                    if (!section) {
                      return null
                    }

                    return (
                      <a
                        key={id}
                        ref={(node) => {
                          outlineItemRefs.current[id] = node
                        }}
                        href={`#${id}`}
                        className={`rounded-md py-1.5 text-[14px] transition-colors ${
                          id === activeSectionId
                            ? 'text-ledger-text'
                            : 'text-ledger-text-muted hover:text-ledger-text'
                        }`}
                      >
                        {section.title}
                      </a>
                    )
                  })}
                </nav>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}

function ContactSupportPage({
  onSearchOpen,
  isMenuOpen,
  onMenuToggle,
}: {
  onSearchOpen: () => void
  isMenuOpen: boolean
  onMenuToggle: () => void
}) {
  const breadcrumbSegments = ['Account and support', 'Contact support']

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const subject = String(formData.get('subject') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    const body = [
      `Name: ${name || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      '',
      message || 'No message provided.',
    ].join('\n')

    const mailto = new URL('mailto:ledgerworkspace@gmail.com')
    mailto.searchParams.set('subject', subject || 'Ledger support request')
    mailto.searchParams.set('body', body)

    window.location.href = mailto.toString()
  }

  return (
    <div
      className="min-h-dhv bg-ledger-bg text-ledger-text"
      style={{ '--site-nav-menu-offset': '64px' } as CSSProperties}
    >
      <DocsHeader
        onSearchOpen={onSearchOpen}
        isMenuOpen={isMenuOpen}
        onMenuToggle={onMenuToggle}
        breadcrumbSegments={breadcrumbSegments}
      />
      <DocsMobileMenu open={isMenuOpen} pathname="/help/contact-support" onClose={onMenuToggle} />

      <div className="grid w-full lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <DocsSidebar pathname="/help/contact-support" />
        </div>

        <main className="min-w-0 w-full justify-self-center px-5 py-10 sm:px-8 lg:max-w-330 lg:px-12 lg:py-10">
          <div className="mx-auto w-full max-w-2xl">
            <p className="text-[13px] font-medium text-ledger-text-muted">Help</p>
            <h1 className="mt-3 text-[44px] font-medium tracking-[-0.055em] text-ledger-text sm:text-[58px] lg:text-[64px]">
              Contact support
            </h1>
            <p className="mt-4 max-w-2xl text-[18px] leading-7 text-ledger-text-muted sm:text-[19px]">
              Send a short message and we will get you to the right place.
            </p>

            <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-3xl border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.03)] p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[13px] font-medium text-ledger-text-muted">Name</span>
                  <input
                    name="name"
                    type="text"
                    className="ledger-field h-11 border border-(--ledger-border-subtle) bg-ledger-bg px-3 text-[15px] text-ledger-text outline-none transition-colors placeholder:text-ledger-text-muted/60 focus:border-(--ledger-header-border)"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[13px] font-medium text-ledger-text-muted">Email</span>
                  <input
                    name="email"
                    type="email"
                    className="ledger-field h-11 border border-(--ledger-border-subtle) bg-ledger-bg px-3 text-[15px] text-ledger-text outline-none transition-colors placeholder:text-ledger-text-muted/60 focus:border-(--ledger-header-border)"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-ledger-text-muted">Subject</span>
                <input
                  name="subject"
                  type="text"
                  className="ledger-field h-11 border border-(--ledger-border-subtle) bg-ledger-bg px-3 text-[15px] text-ledger-text outline-none transition-colors placeholder:text-ledger-text-muted/60 focus:border-(--ledger-header-border)"
                  placeholder="What do you need help with?"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-ledger-text-muted">Message</span>
                <textarea
                  name="message"
                  rows={7}
                  className="ledger-field border border-(--ledger-border-subtle) bg-ledger-bg px-3 py-3 text-[15px] text-ledger-text outline-none transition-colors placeholder:text-ledger-text-muted/60 focus:border-(--ledger-header-border)"
                  placeholder="Add a few details about the issue."
                />
              </label>

              <div className="flex items-center justify-between gap-3 pt-2">
                <p className="text-[13px] leading-5 text-ledger-text-muted">
                  Messages open your email client to send to <span className="text-ledger-text">ledgerworkspace@gmail.com</span>.
                </p>
                <button
                  type="submit"
                  className="ledger-button h-11 bg-ledger-accent px-5 text-[14px] font-medium text-white transition-colors hover:bg-ledger-accent-hover"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

function DocsPageShell({ pathname }: { pathname: string }) {
  const requestedPathname = pathname.replace(/^\/docs/, '/help')
  const requestedSlug = requestedPathname.startsWith('/help/') ? requestedPathname.slice('/help/'.length) : ''
  const canonicalPathname = articleSlugAliases[requestedSlug]
    ? `/help/${articleSlugAliases[requestedSlug]}`
    : requestedPathname
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onSearchOpen = () => setIsSearchOpen(true)
  const onSearchClose = () => setIsSearchOpen(false)

  if (canonicalPathname === '/help' || canonicalPathname === '/help/index' || canonicalPathname === '/docs' || canonicalPathname === '/docs/index') {
    return (
      <>
        <DocsHomePage
          pathname={canonicalPathname.replace(/^\/docs/, '/help')}
          onSearchOpen={onSearchOpen}
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((current) => !current)}
        />
        <SearchModal
          open={isSearchOpen}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onClose={onSearchClose}
        />
      </>
    )
  }

  if (canonicalPathname.startsWith('/help/') || canonicalPathname.startsWith('/docs/')) {
    if (canonicalPathname === '/help/contact-support' || canonicalPathname === '/docs/contact-support') {
      return (
        <>
          <ContactSupportPage
            onSearchOpen={onSearchOpen}
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen((current) => !current)}
          />
          <SearchModal
            open={isSearchOpen}
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onClose={onSearchClose}
          />
        </>
      )
    }

    return (
      <>
        <DocsArticlePage
          pathname={canonicalPathname.replace(/^\/docs/, '/help')}
          onSearchOpen={onSearchOpen}
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((current) => !current)}
        />
        <SearchModal
          open={isSearchOpen}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onClose={onSearchClose}
        />
      </>
    )
  }

  return (
    <>
      <DocsHomePage
        pathname="/help"
        onSearchOpen={onSearchOpen}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((current) => !current)}
      />
      <SearchModal
        open={isSearchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={onSearchClose}
      />
    </>
  )
}

export function DocsPage() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/help'

  return <DocsPageShell key={pathname} pathname={pathname} />
}
