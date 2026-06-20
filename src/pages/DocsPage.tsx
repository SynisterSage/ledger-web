import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'

type DocCard = {
  title: string
  description: string
  href: string
  icon: 'guide' | 'workspace' | 'notes' | 'projects'
}

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
        description: 'What Ledger is and how the system fits together.',
        href: '/help/start-guide',
        icon: 'guide',
      },
      {
        title: 'Workspaces',
        description: 'How Ledger separates context without losing the big picture.',
        href: '/help/workspaces',
        icon: 'workspace',
      },
      {
        title: 'Today',
        description: 'The calm center of attention for the current day.',
        href: '/help/today',
        icon: 'notes',
      },
      {
        title: 'Actions',
        description: 'Tap, long press, and the shared action model.',
        href: '/help/actions',
        icon: 'projects',
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
        icon: 'guide',
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
        icon: 'workspace',
      },
    ],
  },
  {
    title: 'System',
    cards: [
      {
        title: 'Notifications',
        description: 'Due reminders, active items, and delivery states.',
        href: '/help/notifications',
        icon: 'notes',
      },
      {
        title: 'Search',
        description: 'Find anything across workspaces and recent activity.',
        href: '/help/search',
        icon: 'projects',
      },
      {
        title: 'Mobile',
        description: 'Today, capture, notifications, and sheets on the move.',
        href: '/help/mobile',
        icon: 'guide',
      },
      {
        title: 'Browser extension',
        description: 'Save pages and selected text into Ledger.',
        href: '/help/browser-extension',
        icon: 'workspace',
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
        icon: 'notes',
      },
      {
        title: 'Sessions and account',
        description: 'Signed-in devices, sign-out controls, and account safety.',
        href: '/help/sessions-account',
        icon: 'guide',
      },
      {
        title: 'Contact support',
        description: 'Send a simple message to Ledger support.',
        href: '/help/contact-support',
        icon: 'projects',
      },
      {
        title: 'Troubleshooting',
        description: 'Invite links, auth, notifications, search, and more.',
        href: '/help/troubleshooting',
        icon: 'projects',
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
    title: 'System',
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
    intro: 'Ledger is a workspace operating system for the things you need to remember, capture, plan, and act on.',
    sections: [
      {
        id: 'what-it-is',
        title: 'What Ledger is',
        content: [
          'Ledger brings together notes, tasks, reminders, events, projects, captures, notifications, focus, follow-ups, search, mobile capture, browser saves, and workspace context into one connected system.',
          'It is built for people who move between school, work, internships, client projects, creative projects, personal life, deadlines, meetings, ideas, and follow-ups throughout the day.',
        ],
      },
      {
        id: 'sidebar-for-life',
        title: 'The sidebar for your life',
        content: [
          'Ledger is not just a notes app, not just a task manager, and not just a calendar.',
          'It is a sidebar for your life, work, school, projects, reminders, events, notes, internships, client work, creative work, and everything you need to keep moving.',
        ],
      },
      {
        id: 'the-system',
        title: 'The Ledger system',
        content: [
          'Ledger is built around five connected layers: Workspaces, Today, Capture, Action Items, and Notifications.',
          'Everything else connects back to those layers so context stays organized instead of scattered across separate tools.',
        ],
      },
      {
        id: 'desktop-vs-mobile',
        title: 'Desktop vs mobile',
        content: [
          'Desktop is the full workspace experience: floating sidebar, projects, notes, calendar, search, quick capture, tray behavior, sessions, and integrations.',
          'Mobile stays focused on Today, Capture, Notifications, search, settings, and fast action while away from the desk.',
        ],
      },
      {
        id: 'install',
        title: 'Install Ledger',
        content: [
          'Ledger should be easy to install on desktop, mobile, and browser extension surfaces without changing the core workspace model.',
          'The docs pages below explain each part of the system in more depth.',
        ],
      },
    ],
  },
  workspaces: {
    title: 'Workspaces',
    intro: 'Workspaces are the foundation of Ledger and keep context separated without forcing you to lose the big picture.',
    sections: [
      {
        id: 'workspace-model',
        title: 'Workspace model',
        content: [
          'A workspace can be a personal space, a school semester, an internship, a client project, a team, a household, a creative system, a freelance workspace, or a daily planning space.',
          'Each workspace can contain notes, tasks, reminders, events, projects, captures, notifications, members, settings, calendar items, follow-ups, and activity.',
        ],
      },
      {
        id: 'all-workspaces',
        title: 'All workspaces',
        content: [
          'All Workspaces gives you a combined view across everything you have access to.',
          'Use it when you want to see everything due today, upcoming events, reminders, active notifications, captures waiting to be processed, overdue work, and cross-workspace search results.',
        ],
      },
      {
        id: 'single-workspace',
        title: 'Single workspace mode',
        content: [
          'Single workspace mode lets you focus on one context at a time, like one class, one internship, one project, one client, or one personal workspace.',
          'Today, Capture, Notifications, Search, Calendar, Notes, and Projects all stay scoped to that workspace so the view stays calm and relevant.',
        ],
      },
      {
        id: 'shared-workspaces',
        title: 'Shared workspaces',
        content: [
          'Shared workspaces should define what is visible to all members and what stays per user.',
          'Permissions, invite flows, and workspace notifications should stay clear so shared context feels safe and predictable.',
        ],
      },
    ],
  },
  today: {
    title: 'Today',
    intro: 'Today is the center of Ledger. It is the place where the app answers what needs your attention now.',
    sections: [
      {
        id: 'today-sections',
        title: 'Today sections',
        content: [
          'Ledger Today can be organized into Upcoming, Today Actions, Captures, Focus, Follow-ups, Overdue, and recently changed context.',
          'The exact layout can differ between desktop and mobile, but the logic stays the same: surface what matters without forcing the user to sort it mentally.',
        ],
      },
      {
        id: 'upcoming',
        title: 'Upcoming',
        content: [
          'Upcoming is for scheduled and time-based items like calendar events, timed reminders, timed tasks, meetings, classes, appointments, work blocks, and time-bound project actions.',
          'If something does not have a time or scheduled date, it belongs somewhere else.',
        ],
      },
      {
        id: 'today-actions',
        title: 'Today actions',
        content: [
          'Today Actions are action-based items that need attention today: tasks due today, overdue reminders, overdue project actions, focus items, and follow-ups due today.',
          'Today answers what needs to be done, not just what is on the calendar.',
        ],
      },
      {
        id: 'focus',
        title: 'Focus',
        content: [
          'Focus is the small number of things you want to move forward intentionally.',
          'A focus item may have no metadata and that is okay. Ledger should avoid fake metadata just to fill space.',
        ],
      },
      {
        id: 'overdue-followups',
        title: 'Overdue and follow-ups',
        content: [
          'Overdue items are active items that should have been handled already, and Ledger should surface them calmly without turning the product into a stress dashboard.',
          'Follow-ups are reminders to circle back on tasks, notes, projects, events, captures, conversations, and meetings.',
        ],
      },
    ],
  },
  actions: {
    title: 'Actions',
    intro: 'Action Items are the things in Ledger that can be acted on, and the same action model should feel consistent everywhere.',
    sections: [
      {
        id: 'tap',
        title: 'Tap behavior',
        content: [
          'Tapping an item opens a detail view with title, workspace, type, status, dates, linked context, source, and related actions.',
          'Tap is for context. Long press or right click is for quick action.',
        ],
      },
      {
        id: 'long-press',
        title: 'Long press and right click',
        content: [
          'Long press on mobile or right click on desktop opens quick actions.',
          'Quick actions are type-specific, and the action sheet should stay minimal and predictable.',
        ],
      },
      {
        id: 'shared-actions',
        title: 'Shared actions',
        content: [
          'Common Ledger actions include open, complete, snooze, move to tomorrow, add to focus, remove from focus, remove from Today, add note, create follow-up, reschedule, edit, delete, dismiss, archive, open project, and convert capture.',
          'Actions should feel the same across desktop and mobile even if the presentation differs.',
        ],
      },
      {
        id: 'rules-by-type',
        title: 'Rules by type',
        content: [
          'Tasks, reminders, events, project actions, captures, notifications, and focus items each have type-specific actions, but they should all map back to the shared model.',
          'The UI should prefer clear verbs and avoid unnecessary destructive shortcuts.',
        ],
      },
    ],
  },
  capture: {
    title: 'Capture',
    intro: 'Capture is how things enter Ledger, from quick thoughts to links and selected text.',
    sections: [
      {
        id: 'sources',
        title: 'Capture sources',
        content: [
          'Capture can happen from desktop sidebar, quick actions, mobile capture, browser extension, share sheet, Siri Shortcuts, tray/menu bar, right click, search command, or future integrations.',
          'The source should not matter once the item lands in Ledger; what matters is what it becomes next.',
        ],
      },
      {
        id: 'types',
        title: 'Capture types',
        content: [
          'Ledger supports reminder, task, event, note, project action, and capture/inbox item flows.',
          'A capture is not always a task. It might become a note, an event, a reminder, a project action, or something archived for later.',
        ],
      },
      {
        id: 'forms',
        title: 'Capture forms',
        content: [
          'Capture forms should stay short and direct with just the fields needed to save quickly.',
          'The goal is to get the item into the system with enough context to be useful later, not to block the user with a huge modal.',
        ],
      },
      {
        id: 'success',
        title: 'Capture success',
        content: [
          'After saving, Ledger can confirm where the item landed and offer quick follow-up actions like view today or add another.',
          'Capture should feel like a fast landing pad, not another inbox to manage forever.',
        ],
      },
    ],
  },
  notes: {
    title: 'Notes',
    intro: 'Notes are for workspace context: meeting notes, class notes, daily logs, research, drafts, and documentation.',
    sections: [
      {
        id: 'use-cases',
        title: 'What notes are for',
        content: [
          'Use Notes for meeting notes, class notes, daily logs, client notes, project docs, research, drafts, documentation, and personal planning.',
          'Notes should keep workspace context close to the work that generated it.',
        ],
      },
      {
        id: 'shared-notes',
        title: 'Shared notes',
        content: [
          'Shared notes need collaboration safety so newer versions are visible without overwriting active changes silently.',
          'If another user edits a note, Ledger should surface the update cleanly and let the user refresh when they are ready.',
        ],
      },
      {
        id: 'organize-review',
        title: 'Organize and review',
        content: [
          'Notes should remain easy to search, easy to link, and easy to turn back into action when needed.',
          'Review should stay useful instead of becoming a second inbox.',
        ],
      },
    ],
  },
  projects: {
    title: 'Projects',
    intro: 'Projects keep long-running work organized with notes, tasks, project actions, deadlines, and follow-ups.',
    sections: [
      {
        id: 'project-model',
        title: 'Project model',
        content: [
          'A project can include a name, description, status, progress, workspace, notes, tasks, actions, events, captures, deadlines, follow-ups, activity, and members.',
          'Project statuses can include not started, in progress, waiting, blocked, complete, and archived.',
        ],
      },
      {
        id: 'project-actions',
        title: 'Project actions',
        content: [
          'Project actions are separate from generic tasks because they belong to a project’s forward motion.',
          'Use actions for the specific work that keeps a project moving, then connect notes, reminders, deadlines, and follow-ups around them.',
        ],
      },
      {
        id: 'progress',
        title: 'Progress and follow-ups',
        content: [
          'Projects should show progress, next action, deadline, and workspace so the user can understand state at a glance.',
          'Project follow-ups and deadlines keep the work from stalling quietly.',
        ],
      },
    ],
  },
  calendar: {
    title: 'Calendar',
    intro: 'Calendar connects scheduled time to workspace context.',
    sections: [
      {
        id: 'event-creation',
        title: 'Event creation',
        content: [
          'Events can include title, date, time, duration, workspace, privacy, reminder settings, calendar, project, description, and recurrence.',
          'Calendar should support scheduled time without making everything feel like a meeting.',
        ],
      },
      {
        id: 'repeating',
        title: 'Repeating events',
        content: [
          'Ledger should support simple repeat options like daily, weekly, monthly, and yearly, plus custom selected dates for irregular patterns.',
          'Custom repeats should stay compact and understandable.',
        ],
      },
      {
        id: 'hover-layering',
        title: 'Hover and layering',
        content: [
          'Empty slot hover applies only to empty slots, event hover applies to the event block, and multi-hour events should not be visually sliced by hover overlays.',
          'Event blocks should sit above grid hover layers.',
        ],
      },
    ],
  },
  notifications: {
    title: 'Notifications',
    intro: 'Notifications are global and should surface the right thing at the right time.',
    sections: [
      {
        id: 'scope',
        title: 'Notification scope',
        content: [
          'Notifications can be workspace-specific, user-specific, global across workspaces, per-member in shared workspaces, or per-device for delivery state.',
          'Notification inbox is user-level; source context stays workspace-level.',
        ],
      },
      {
        id: 'active-earlier',
        title: 'Active and earlier',
        content: [
          'Mobile notifications can be organized into Active and Earlier so actionable items stay visible while older alerts move out of the way.',
          'Earlier notifications have already been seen, dismissed, completed, or expired.',
        ],
      },
      {
        id: 'notification-actions',
        title: 'Notification actions',
        content: [
          'Reminder due, event soon, task due, project action due, capture waiting, and deadline approaching all need clear action sets.',
          'The action set should stay calm and avoid overwhelming the user with choices.',
        ],
      },
      {
        id: 'desktop-delivery',
        title: 'Desktop delivery',
        content: [
          'Desktop notifications should work even when Ledger is minimized if the app is running and permissions are granted.',
          'Ledger should keep delivery state separate from workspace context.',
        ],
      },
    ],
  },
  search: {
    title: 'Search',
    intro: 'Search is global and helps users find anything across their workspace system.',
    sections: [
      {
        id: 'desktop-search',
        title: 'Desktop search',
        content: [
          'Desktop search can behave like a command surface that opens notes, projects, tasks, reminders, events, captures, and workspace context.',
          'Users should be able to jump across workspaces and create new items without leaving the search flow.',
        ],
      },
      {
        id: 'mobile-search',
        title: 'Mobile search',
        content: [
          'Mobile search opens from the bottom dock as a full-height sheet with a minimal search bar, clean result rows, workspace context, type labels, and snippets.',
          'It should reuse the same search logic as desktop.',
        ],
      },
      {
        id: 'result-actions',
        title: 'Search result actions',
        content: [
          'Search results can support open, mark as done, snooze, move to tomorrow, add to focus, add note, create follow-up, edit, delete, archive, and convert capture.',
          'Search should not create a separate action system; it should reuse the shared item action model.',
        ],
      },
    ],
  },
  mobile: {
    title: 'Mobile',
    intro: 'Ledger Mobile is the companion app for fast capture, daily awareness, and light action while away from desktop.',
    sections: [
      {
        id: 'tabs',
        title: 'Mobile tabs',
        content: [
          'Ledger Mobile has three core tabs: Today, Capture, and Notifications.',
          'Search can live in the bottom dock as an icon, and settings are accessed from the page header.',
        ],
      },
      {
        id: 'header',
        title: 'Mobile header',
        content: [
          'Mobile pages use a shared collapsing header with page title, settings icon, and workspace selector label.',
          'When scrolling, the header should animate upward and fade away like a native large-title experience.',
        ],
      },
      {
        id: 'sheets',
        title: 'Detail and long press sheets',
        content: [
          'Tapping a row opens a reusable detail sheet and long press opens a quick actions sheet.',
          'Both should feel minimal, draggable, and safe for destructive actions.',
        ],
      },
      {
        id: 'settings',
        title: 'Settings',
        content: [
          'Mobile settings can cover account, workspace, notifications, capture, app appearance, haptics, and help.',
          'The settings flow should stay structured and easy to scan on a phone.',
        ],
      },
    ],
  },
  'browser-extension': {
    title: 'Browser extension',
    intro: 'The Ledger browser extension helps capture information from the web and turn it into useful context.',
    sections: [
      {
        id: 'save-to-ledger',
        title: 'Save to Ledger',
        content: [
          'Users can right click and choose Save to Ledger to capture current pages, selected text, links, articles, research, documentation, client requests, ideas, references, tasks from web pages, and meeting pages.',
          'Captured items can land in an inbox, a selected workspace, or the default capture workspace.',
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
        ],
      },
      {
        id: 'convert-later',
        title: 'Convert later',
        content: [
          'Extension captures can later become tasks, reminders, notes, events, or project actions.',
          'The extension should feel like a fast bridge into Ledger, not a separate product surface.',
        ],
      },
    ],
  },
  'siri-shortcuts': {
    title: 'Siri shortcuts',
    intro: 'Ledger Mobile can support Siri Shortcuts and App Intents for quick creation and lightweight lookup.',
    sections: [
      {
        id: 'create-commands',
        title: 'Create commands',
        content: [
          'Possible Siri commands include add reminder, add task, create event, save note, and add project action.',
          'Commands should stay short and specific so they work in real-world use.',
        ],
      },
      {
        id: 'read-command',
        title: 'Read commands',
        content: [
          'A read-only command like What’s Today in Ledger? should answer with a short summary of upcoming items and current actions.',
          'Siri should not read full notes or long descriptions.',
        ],
      },
      {
        id: 'workspace-logic',
        title: 'Workspace logic',
        content: [
          'Workspace resolution can follow the spoken workspace name first, then default Siri workspace, then default capture workspace, then the first personal workspace.',
          'If nothing matches, Ledger should ask the user to open Ledger.',
        ],
      },
    ],
  },
  'sessions-account': {
    title: 'Sessions and account',
    intro: 'Ledger can show where you are signed in so users can manage trust and device access.',
    sections: [
      {
        id: 'sessions',
        title: 'Sessions',
        content: [
          'Sessions can include desktop app sessions, mobile app sessions, browser extension sessions, and web sessions.',
          'A session row can show device name, app type, platform, last active time, current device indicator, and app version.',
        ],
      },
      {
        id: 'sign-out',
        title: 'Sign out controls',
        content: [
          'Actions can include sign out this device, sign out other devices, or sign out all other devices.',
          'The UI should only show a device as signed out when the underlying auth session is actually revoked.',
        ],
      },
      {
        id: 'account',
        title: 'Account safety',
        content: [
          'Sessions help users protect workspace data if they lose a device or sign in somewhere they no longer trust.',
          'Account and session controls belong together because they affect the same trust surface.',
        ],
      },
    ],
  },
  'contact-support': {
    title: 'Contact support',
    intro: 'Send Ledger a simple support request and we will point you in the right direction.',
    sections: [
      {
        id: 'contact-form',
        title: 'Contact form',
        content: [
          'Use the form on this page to send a short message with your name, email, subject, and what you need help with.',
          'Keep it brief and specific so support can get you to the next step faster.',
        ],
      },
    ],
  },
  troubleshooting: {
    title: 'Troubleshooting',
    intro: 'Troubleshooting covers the common places where a user can get stuck and what to check first.',
    sections: [
      {
        id: 'invite-links',
        title: 'Invite links',
        content: [
          'Invite flows need a public invite URL, backend validation, invite token handling, invite acceptance, and post-accept transitions.',
          'Invite URLs should use a configured base URL instead of relying on the current origin.',
        ],
      },
      {
        id: 'notifications',
        title: 'Notifications and auth',
        content: [
          'Check permissions, delivery state, and session state if notifications are not appearing as expected.',
          'Desktop notifications should still behave correctly when Ledger is minimized if the app is running.',
        ],
      },
      {
        id: 'search-and-extension',
        title: 'Search and extension',
        content: [
          'If search is not updating, confirm the route and the search scope first.',
          'If the browser extension is not saving, check the capture destination and the active workspace.',
        ],
      },
      {
        id: 'mobile-and-siri',
        title: 'Mobile and Siri',
        content: [
          'Mobile auth, push permissions, and Siri workspace resolution are the usual places to verify when mobile behavior looks wrong.',
          'Keep the checks short and start with permissions, scope, and the currently selected workspace.',
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

function DocsGlyph({ icon }: { icon: DocCard['icon'] }) {
  switch (icon) {
    case 'guide':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M6 5.5h8.5L18 9v9.5A2.5 2.5 0 0 1 15.5 21H6A2.5 2.5 0 0 1 3.5 18.5v-11A2 2 0 0 1 5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M14.5 5.5V9H18" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      )
    case 'workspace':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="4.5" y="5.5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
          <rect x="13" y="5.5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
          <rect x="4.5" y="14" width="6.5" height="4.5" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
          <path d="M13 15h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      )
    case 'notes':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M7 4.75h7.75L19 9v10.25A2.75 2.75 0 0 1 16.25 22H7A2.75 2.75 0 0 1 4.25 19.25v-11.5A3 3 0 0 1 7.25 4.75"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M14.5 4.75V9h4.25" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      )
    case 'projects':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M5 7.5h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5 16.5h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M7 4.5v4M12 4.5v4M17 4.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      )
  }
}

function DocsHeader({
  onSearchOpen,
  breadcrumbSegments,
}: {
  onSearchOpen: () => void
  breadcrumbSegments?: string[]
}) {
  return (
    <header className="sticky top-0 z-40 grid h-16 w-full border-b border-[color:var(--ledger-border-subtle)] bg-[var(--ledger-bg)] lg:grid-cols-[260px_minmax(0,1fr)]">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:border-r lg:border-[color:var(--ledger-border-subtle)]">
        <a href="/" className="inline-flex items-center gap-2 rounded-full leading-none">
          <img src="/assets/logos/logo.svg" alt="" className="h-[28px] w-auto" aria-hidden="true" />
          <span className="relative top-[2px] text-[19px] font-medium tracking-[-0.02em] text-ledger-text">
            Help
          </span>
        </a>
        <DocsSearchButton onSearchOpen={onSearchOpen} />
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
    <aside className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col border-r border-[color:var(--ledger-border-subtle)] bg-[rgba(255,255,255,0.01)]">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <nav className="space-y-6">
            {sidebarGroups.slice(0, -1).map((group) => (
              <div key={group.title}>
                <p className="px-2 text-[11px] font-medium tracking-[0.02em] text-ledger-text-muted">
                  {group.title}
                </p>
                <div className="mt-2 space-y-0.5">
                  {group.links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`flex items-center justify-between rounded-lg px-2 py-2 text-[14px] transition-colors ${
                          isActive
                            ? 'bg-[color:var(--ledger-header-pill-active)] text-ledger-text'
                            : 'text-ledger-text-muted hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text'
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
        <div className="shrink-0 border-t border-[color:var(--ledger-border-subtle)] px-4 py-4">
          <div className="space-y-3">
            {sidebarGroups.slice(-1).map((group) => (
              <div key={group.title}>
                <p className="px-2 text-[11px] font-medium tracking-[0.02em] text-ledger-text-muted">
                  {group.title}
                </p>
                <div className="mt-2 space-y-0.5">
                  {group.links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`flex items-center justify-between rounded-lg px-2 py-2 text-[14px] transition-colors ${
                          isActive
                            ? 'bg-[color:var(--ledger-header-pill-active)] text-ledger-text'
                            : 'text-ledger-text-muted hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text'
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

function DocsCard({ card }: { card: DocCard }) {
  return (
    <a
      href={card.href}
      className="group block rounded-2xl border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.04)] p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[color:var(--ledger-header-border)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.03)] text-ledger-text">
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.04)] text-ledger-text-muted transition-colors hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text"
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
        className={`mx-auto mt-2 flex max-h-[calc(100vh-1.5rem)] w-full flex-col overflow-hidden rounded-[24px] border border-[color:var(--ledger-border-subtle)] bg-[color:var(--ledger-bg)] shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out sm:mt-0 sm:max-h-[min(80vh,760px)] ${
          hasQuery ? 'max-w-[760px]' : 'max-w-[560px]'
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[color:var(--ledger-border-subtle)] px-4 py-4 sm:px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.04)] text-ledger-text-muted">
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
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.04)] text-ledger-text-muted transition-colors hover:bg-[color:var(--ledger-header-pill)] hover:text-ledger-text"
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
                    className="block rounded-[18px] px-3 py-3 transition-colors hover:bg-[color:var(--ledger-header-pill)] sm:px-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[17px] font-medium tracking-[-0.03em] text-ledger-text">
                          {result.title}
                        </span>
                        <span className="rounded-full border border-[color:var(--ledger-border-subtle)] px-2 py-0.5 text-[11px] text-ledger-text-muted">
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

function DocsHomePage({ pathname, onSearchOpen }: { pathname: string; onSearchOpen: () => void }) {
  return (
    <div className="min-h-screen bg-[var(--ledger-bg)] text-ledger-text">
      <DocsHeader onSearchOpen={onSearchOpen} />

      <div className="grid w-full lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <DocsSidebar pathname={pathname} />
        </div>

        <main className="min-w-0 w-full justify-self-center px-5 py-10 sm:px-8 lg:max-w-[1320px] lg:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-4xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-ledger-text-muted">Help</p>
                <h1 className="mt-3 text-[50px] font-medium tracking-[-0.055em] text-ledger-text sm:text-[64px] lg:text-[72px]">
                  Help, Support, and Documents
                </h1>
                <p className="mt-4 max-w-2xl text-[17px] leading-7 text-ledger-text-muted sm:text-[18px]">
                  A clean help and docs structure for Ledger. The layout is set up first so we can fill in the real content next.
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

function DocsArticlePage({ pathname, onSearchOpen }: { pathname: string; onSearchOpen: () => void }) {
  const slug = pathname.replace(/^\/(docs|help)\/?/, '') || 'start-guide'
  const article = articleMap[slug] ?? articleMap['start-guide']
  const sectionIds = article.sections.map((section) => section.id)
  const breadcrumbGroup =
    sidebarGroups.find((group) => group.links.some((link) => link.href === `/help/${slug}`))?.title ?? 'Help'

  return (
    <div className="min-h-screen bg-[var(--ledger-bg)] text-ledger-text">
      <DocsHeader onSearchOpen={onSearchOpen} breadcrumbSegments={[breadcrumbGroup, article.title]} />

      <div className="grid w-full lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <DocsSidebar pathname={`/docs/${slug}`} />
        </div>

        <main className="min-w-0 w-full justify-self-center px-5 py-10 sm:px-8 lg:max-w-[1320px] lg:px-12 lg:py-10">
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
                  <section key={section.id} id={section.id} className="border-t border-[color:var(--ledger-border-subtle)] pt-8">
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
              <div className="sticky top-8 border-l border-[color:var(--ledger-border-subtle)] pl-4">
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
                        href={`#${id}`}
                        className="rounded-md py-1.5 text-[14px] text-ledger-text-muted transition-colors hover:text-ledger-text"
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

function ContactSupportPage({ onSearchOpen }: { onSearchOpen: () => void }) {
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
    <div className="min-h-screen bg-[var(--ledger-bg)] text-ledger-text">
      <DocsHeader onSearchOpen={onSearchOpen} breadcrumbSegments={breadcrumbSegments} />

      <div className="grid w-full lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <DocsSidebar pathname="/help/contact-support" />
        </div>

        <main className="min-w-0 w-full justify-self-center px-5 py-10 sm:px-8 lg:max-w-[1320px] lg:px-12 lg:py-10">
          <div className="mx-auto w-full max-w-2xl">
            <p className="text-[13px] font-medium text-ledger-text-muted">Help</p>
            <h1 className="mt-3 text-[44px] font-medium tracking-[-0.055em] text-ledger-text sm:text-[58px] lg:text-[64px]">
              Contact support
            </h1>
            <p className="mt-4 max-w-2xl text-[18px] leading-7 text-ledger-text-muted sm:text-[19px]">
              Send a short message and we will get you to the right place.
            </p>

            <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-[24px] border border-[color:var(--ledger-border-subtle)] bg-[rgba(247,242,234,0.03)] p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[13px] font-medium text-ledger-text-muted">Name</span>
                  <input
                    name="name"
                    type="text"
                    className="h-11 rounded-xl border border-[color:var(--ledger-border-subtle)] bg-[color:var(--ledger-bg)] px-3 text-[15px] text-ledger-text outline-none transition-colors placeholder:text-ledger-text-muted/60 focus:border-[color:var(--ledger-header-border)]"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[13px] font-medium text-ledger-text-muted">Email</span>
                  <input
                    name="email"
                    type="email"
                    className="h-11 rounded-xl border border-[color:var(--ledger-border-subtle)] bg-[color:var(--ledger-bg)] px-3 text-[15px] text-ledger-text outline-none transition-colors placeholder:text-ledger-text-muted/60 focus:border-[color:var(--ledger-header-border)]"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-ledger-text-muted">Subject</span>
                <input
                  name="subject"
                  type="text"
                  className="h-11 rounded-xl border border-[color:var(--ledger-border-subtle)] bg-[color:var(--ledger-bg)] px-3 text-[15px] text-ledger-text outline-none transition-colors placeholder:text-ledger-text-muted/60 focus:border-[color:var(--ledger-header-border)]"
                  placeholder="What do you need help with?"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-ledger-text-muted">Message</span>
                <textarea
                  name="message"
                  rows={7}
                  className="rounded-xl border border-[color:var(--ledger-border-subtle)] bg-[color:var(--ledger-bg)] px-3 py-3 text-[15px] text-ledger-text outline-none transition-colors placeholder:text-ledger-text-muted/60 focus:border-[color:var(--ledger-header-border)]"
                  placeholder="Add a few details about the issue."
                />
              </label>

              <div className="flex items-center justify-between gap-3 pt-2">
                <p className="text-[13px] leading-5 text-ledger-text-muted">
                  Messages open your email client to send to <span className="text-ledger-text">ledgerworkspace@gmail.com</span>.
                </p>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--ledger-accent)] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[var(--ledger-accent-hover)]"
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

export function DocsPage() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/help'
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const onSearchOpen = () => setIsSearchOpen(true)
  const onSearchClose = () => setIsSearchOpen(false)

  useEffect(() => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }, [pathname])

  if (pathname === '/help' || pathname === '/help/index' || pathname === '/docs' || pathname === '/docs/index') {
    return (
      <>
        <DocsHomePage pathname={pathname.replace(/^\/docs/, '/help')} onSearchOpen={onSearchOpen} />
        <SearchModal
          open={isSearchOpen}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onClose={onSearchClose}
        />
      </>
    )
  }

  if (pathname.startsWith('/help/') || pathname.startsWith('/docs/')) {
    if (pathname === '/help/contact-support' || pathname === '/docs/contact-support') {
      return (
        <>
          <ContactSupportPage onSearchOpen={onSearchOpen} />
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
        <DocsArticlePage pathname={pathname.replace(/^\/docs/, '/help')} onSearchOpen={onSearchOpen} />
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
      <DocsHomePage pathname="/help" onSearchOpen={onSearchOpen} />
      <SearchModal
        open={isSearchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={onSearchClose}
      />
    </>
  )
}
