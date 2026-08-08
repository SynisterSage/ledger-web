import type { CSSProperties, FormEvent } from 'react'
import {
  Bell,
  BookOpen,
  CalendarDays,
  FolderKanban,
  LifeBuoy,
  Layers3,
  Link2,
  Monitor,
  NotebookPen,
  Plug2,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TriangleAlert,
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
  | 'calendar'
  | 'notifications'
  | 'search'
  | 'mobile'
  | 'desktop'
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
      {
        title: 'Capture',
        description: 'Turn thoughts, links, and ideas into something usable.',
        href: '/help/capture',
        icon: 'capture',
      },
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
    title: 'Platform',
    cards: [
      {
        title: 'Notifications',
        description: 'Due reminders, active items, and delivery states.',
        href: '/help/notifications',
        icon: 'notifications',
      },
      {
        title: 'Search',
        description: 'Find anything across workspaces and recent activity.',
        href: '/help/search',
        icon: 'search',
      },
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
        href: '/help/start-guide#desktop',
        icon: 'desktop',
      },
      {
        title: 'Integrations',
        description: 'How connected apps and import flows fit into Ledger.',
        href: '/help/start-guide#integrations',
        icon: 'integrations',
      },
    ],
  },
  {
    title: 'Account and support',
    cards: [
      {
        title: 'Siri shortcuts',
        description: 'Create or check items with App Intents and Siri.',
        href: '/help/siri-shortcuts',
        icon: 'siri-shortcuts',
      },
      {
        title: 'Sessions and account',
        description: 'Signed-in devices, sign-out controls, and account safety.',
        href: '/help/sessions-account',
        icon: 'sessions-account',
      },
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
      { label: 'Calendar', href: '/help/calendar' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Notifications', href: '/help/notifications' },
      { label: 'Search', href: '/help/search' },
      { label: 'Mobile', href: '/help/mobile' },
      { label: 'Browser extension', href: '/help/browser-extension' },
    ],
  },
  {
    title: 'Account and support',
    links: [
      { label: 'Siri shortcuts', href: '/help/siri-shortcuts' },
      { label: 'Sessions and account', href: '/help/sessions-account' },
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
      },
      {
        id: 'active-earlier',
        title: 'Active and earlier',
        content: [
          'Mobile notifications can be organized into Active and Earlier so actionable items stay visible while older alerts move out of the way.',
          'Earlier notifications have already been seen, dismissed, completed, or expired.',
          'The split helps users focus on what still needs attention rather than forcing them to dig through a long history.',
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
  calendar: CalendarDays,
  notifications: Bell,
  search: Search,
  mobile: Smartphone,
  desktop: Monitor,
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
  const slug = pathname.replace(/^\/(docs|help)\/?/, '') || 'start-guide'
  const article = articleMap[slug] ?? articleMap['start-guide']
  const sectionIds = useMemo(() => article.sections.map((section) => section.id), [article])
  const outlineRailRef = useRef<HTMLDivElement | null>(null)
  const outlineItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? '')
  const [outlineMarker, setOutlineMarker] = useState({ top: 0, height: 0 })
  const breadcrumbGroup =
    sidebarGroups.find((group) => group.links.some((link) => link.href === `/help/${slug}`))?.title ?? 'Help'

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

              <div className="mt-10 space-y-12">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id} className="border-t border-(--ledger-border-subtle) pt-8">
                    <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-ledger-text sm:text-[30px]">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4 text-[16px] leading-7 text-ledger-text-muted">
                      {section.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
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
  const canonicalPathname = pathname === '/help/contact' ? '/help/contact-support' : pathname
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
