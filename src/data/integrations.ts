export type IntegrationCategory =
  | 'communication'
  | 'files-resources'
  | 'development'
  | 'design'
  | 'calendar'
  | 'automation'

export type IntegrationAvailability = 'live' | 'macos-only' | 'partial' | 'developer'
export type IntegrationKind = 'integration' | 'capture-surface'

export type IntegrationDetail = {
  headline: string
  website: string
  websiteLabel?: string
  docsHref: string
  docsLabel?: string
  primaryAction: { label: string; href: string }
  artwork: 'github-workflow' | 'slack-capture' | 'google-drive-context' | 'figma-context' | 'apple-calendar-context' | 'apple-reminders-context' | 'mcp-context' | 'calendar-feed-context' | 'browser-extension-context'
  artworkSlides?: Array<{ label: string; caption: string; image?: string; alt?: string }>
  overview: string
  sections: Array<{ title: string; body: string }>
  setup: string
}

export type Integration = {
  slug: string
  name: string
  description: string
  category: IntegrationCategory
  logo: string
  featured: boolean
  availability: IntegrationAvailability
  kind?: IntegrationKind
  detail?: IntegrationDetail
}

export const integrationCategories: Array<{ slug: IntegrationCategory; name: string }> = [
  { slug: 'communication', name: 'Communication' },
  { slug: 'files-resources', name: 'Files & resources' },
  { slug: 'development', name: 'Development' },
  { slug: 'design', name: 'Design' },
  { slug: 'calendar', name: 'Calendar' },
  { slug: 'automation', name: 'Automation' },
]

export const integrations = [
  {
    slug: 'slack',
    name: 'Slack',
    description: 'Capture messages into Intake and keep up with Slack activity, threads, and linked Ledger context.',
    category: 'communication',
    logo: 'slack',
    featured: true,
    availability: 'live',
    detail: {
      headline: 'Turn conversations into work you can come back to.',
      website: 'https://slack.com',
      websiteLabel: 'slack.com',
      docsHref: '/help/start-guide#integrations',
      docsLabel: 'Slack setup guide',
      primaryAction: { label: 'Set up Slack in Ledger', href: '/download' },
      artwork: 'slack-capture',
      overview: 'Slack is where a lot of work starts, but it is not always where that work should stay. Ledger’s Slack integration gives important conversations somewhere to go after they happen. Capture useful messages, bring Slack context into Ledger, and keep track of conversations that matter without turning every message into another task.',
      sections: [
        { title: 'Capture what matters', body: 'Send a Slack message to Ledger when it becomes useful. A conversation can contain a decision, idea, request, reference, follow-up, or something you simply do not want to lose. The captured item can retain the Slack context it came from, giving you a way to revisit the work without trying to remember which channel or conversation contained it.' },
        { title: 'Send conversations to Intake', body: 'Decide what something means after you capture it. Messages sent to Ledger can enter Intake, giving you a temporary place to review the information before deciding what should happen next. Capture first. Place it when you’re ready.' },
        { title: 'Keep important conversations in view', body: 'Some conversations matter beyond a single captured message. Ledger’s Slack experience gives you a dedicated place to surface relevant Slack activity so you can return to conversations without keeping Slack open and mentally tracking everything yourself.' },
        { title: 'See what changed', body: 'Ledger can surface Slack activity in a focused view so you can see relevant changes and return to the original context when needed. Slack remains where the conversation happens; Ledger becomes where you can understand how that conversation relates to everything else you’re doing.' },
        { title: 'Keep the source attached', body: 'Capturing something from Slack should not turn it into an anonymous piece of text. Ledger keeps Slack recognizable as the source, preserving the context that helps explain where a message came from, who was involved, what surrounded it, and when it happened.' },
        { title: 'Conversation can become context', body: 'Slack conversations often sit upstream from actual work. Someone shares a resource, a decision gets made, a follow-up emerges, or a project changes direction. Ledger gives that information somewhere to live after the conversation moves on, connecting Slack context to captures, notes, projects, tasks, and connected work.' },
        { title: 'Use Slack for conversation. Use Ledger for continuity.', body: 'Ledger should not try to become another Slack client. Slack remains the place for conversation, channels, messages, threads, and real-time communication. Ledger provides the capture, context, organization, follow-through, and return path for the smaller subset of conversation that has value beyond the moment it was sent.' },
      ],
      setup: 'Connect your Slack workspace through Ledger’s integration settings. Once connected, available Slack features depend on the workspace and permissions granted during setup. For exact installation, permissions, workspace requirements, reconnection, and troubleshooting instructions, use the Slack setup guide.',
    },
  },
  {
    slug: 'google-drive',
    name: 'Google Drive',
    description: 'Keep files and shared resources attached to the work they support.',
    category: 'files-resources',
    logo: 'google-drive',
    featured: true,
    availability: 'partial',
    detail: {
      headline: 'Keep files and shared resources attached to the work they support.',
      website: 'https://drive.google.com',
      websiteLabel: 'drive.google.com',
      docsHref: '/help/start-guide#integrations',
      docsLabel: 'Google Drive setup guide',
      primaryAction: { label: 'Set up Google Drive in Ledger', href: '/download' },
      artwork: 'google-drive-context',
      overview: 'Google Drive is where documents, folders, and shared working materials accumulate. Ledger’s Google Drive integration gives those resources a place beside the projects, notes, milestones, and decisions they support, so important files stay connected to the work instead of becoming links you have to rediscover later.',
      sections: [
        { title: 'Bring the files behind the work into the project', body: 'Connect Drive files and folders to the Ledger project they belong to. A project can keep its documentation, briefs, working files, and shared resources close to the actions and decisions that give them meaning.' },
        { title: 'Keep resources beside the project story', body: 'A document rarely explains the whole reason it exists. It may support a launch, client engagement, redesign, research effort, internal initiative, or operational process. Ledger keeps the Drive resource near the project context around it: notes, milestones, dates, people, and what happens next.' },
        { title: 'Monitor connected folders', body: 'When a folder continues to change, keep it connected to the work that depends on it. Ledger can monitor connected Drive folders so the resource remains part of the project context as documents are added or updated, without turning Ledger into another file browser.' },
        { title: 'Create Drive resources from projects', body: 'When work needs a new shared document or folder, create the Drive resource from the project context where the need appeared. The project stays the starting point, while Drive remains the place for files and collaborative editing.' },
        { title: 'Use Drive alongside other connected resources', body: 'The complete project record often crosses tools. One Ledger project might include a Google Drive folder for documentation, a Figma file for design, a GitHub repository for implementation, project notes, meeting context, milestones, and calendar dates. Connected Work keeps those resources together without asking one tool to replace the others.' },
        { title: 'Keep files as context, not another inbox', body: 'Ledger does not need to duplicate Google Drive or recreate document editing. Drive remains the source for files, folders, and shared documents. Ledger provides the surrounding context: which work the resource supports, who owns it, what decisions relate to it, and what should happen next.' },
      ],
      setup: 'Connect Google Drive from Ledger’s integration settings. Drive is currently available with limited support, and the available file, folder, monitoring, and creation workflows depend on the permissions granted during setup. For exact account, permission, and troubleshooting instructions, use the Google Drive setup guide.',
    },
  },
  {
    slug: 'github',
    name: 'GitHub',
    description: 'Keep development context attached to the work around it.',
    category: 'development',
    logo: 'github',
    featured: true,
    availability: 'live',
    detail: {
      headline: 'Keep development context attached to the work around it.',
      website: 'https://github.com',
      websiteLabel: 'github.com',
      docsHref: '/help/start-guide#integrations',
      docsLabel: 'GitHub setup guide',
      primaryAction: { label: 'Set up GitHub in Ledger', href: '/download' },
      artwork: 'github-workflow',
      overview: 'Ledger’s GitHub integration keeps development work connected to the projects, notes, people, and decisions around it. Rather than treating a repository as a separate destination, Ledger lets GitHub resources live alongside the project they support, so code, planning, notes, milestones, dates, and related work stay part of the same context.',
      sections: [
        { title: 'Connect repositories to projects', body: 'Bring the repository behind the work into the project itself. When a Ledger project depends on code in GitHub, connect that repository so the technical source stays close to the planning and execution around it. Move between the project, milestones, related notes, deadlines, GitHub repositories, and other linked resources without treating each tool as a separate island.' },
        { title: 'Keep code beside the project story', body: 'Development work rarely makes sense by itself. A repository may be connected to a launch, redesign, client project, internal initiative, bug fix, or product change. Use Notes for decisions and working context, Projects for execution and milestones, Calendar for dates and deadlines, and GitHub for the development resource itself.' },
        { title: 'Link GitHub alongside other resources', body: 'GitHub resources can sit beside other connected tools rather than competing with them. One Ledger project might include a GitHub repository for implementation, a Figma file for design, a Google Drive folder for documentation or assets, project notes, meeting notes, milestones, and calendar events.' },
        { title: 'Bring development into the project workflow', body: 'Development resources can live alongside next actions, milestones, notes, dates, and people. Ledger’s Projects system combines tasks and actions, milestones, project notes, assignees, teams, progress, and external resources including GitHub.' },
        { title: 'See the repository in context', body: 'A GitHub repository tells you about the code. Ledger tells you about the surrounding work: what it is, why it matters, where it stands, what happens next, and what other context belongs to it. The project can keep those pieces connected in one place when you return to the work or hand it to someone else.' },
        { title: 'Use GitHub as connected context, not another inbox', body: 'Ledger does not need to duplicate GitHub. GitHub remains the development environment, while Ledger keeps the repository connected to planning, project ownership, milestones, notes, external resources, dates, and follow-through.' },
      ],
      setup: 'Connect GitHub from Ledger’s integration settings. Once connected, use GitHub repositories and related development resources as linked context within Ledger where supported. For exact instructions, permissions, account requirements, and troubleshooting, use the GitHub setup guide.',
    },
  },
  {
    slug: 'figma',
    name: 'Figma',
    description: 'Keep design resources attached to the work they inform.',
    category: 'design',
    logo: 'figma',
    featured: true,
    availability: 'live',
    detail: {
      headline: 'Keep design resources attached to the work they inform.',
      website: 'https://figma.com',
      websiteLabel: 'figma.com',
      docsHref: '/help/start-guide#integrations',
      docsLabel: 'Figma setup guide',
      primaryAction: { label: 'Set up Figma in Ledger', href: '/download' },
      artwork: 'figma-context',
      artworkSlides: [
        {
          label: 'Figma context',
          caption: 'Preview a Figma reference alongside the Ledger project it informs.',
          image: '/assets/integrations/integrationsfigma1.webp',
          alt: 'Figma design reference connected to a Ledger project',
        },
      ],
      overview: 'Design work often begins in Figma, but the file is only one part of the project around it. Ledger’s Figma integration keeps design resources close to the notes, decisions, milestones, and work they inform, so a design reference remains understandable when you return to it later.',
      sections: [
        { title: 'Bring design context into the work', body: 'Link Figma designs to the Ledger project they support. A file can stay close to the brief, research, decisions, milestones, and next actions that give the design its purpose instead of becoming an isolated reference shared somewhere else.' },
        { title: 'Keep the design story nearby', body: 'A Figma file rarely tells the full story of a project. It may represent a launch, redesign, client engagement, product change, or internal initiative. Ledger keeps the surrounding context nearby: why the work exists, what has been decided, who is involved, and what needs to happen next.' },
        { title: 'Preview design references in Ledger', body: 'Use the Figma plugin and Ledger workspace tools to preview design references where the related work is already organized. The goal is not to recreate Figma inside Ledger, but to make the relevant visual context easier to find when working through a project.' },
        { title: 'Connect design to implementation', body: 'Design rarely ends when the file is shared. Keep a Figma resource beside the GitHub repository, project notes, milestones, dates, and other resources that carry the work forward. This gives design and implementation a shared project context without forcing either tool to replace the other.' },
        { title: 'Keep decisions attached to the reference', body: 'A design is easier to understand when the decisions around it remain close. Use Ledger notes and project context for feedback, rationale, open questions, and follow-through while Figma remains the source for the design itself.' },
        { title: 'Use Figma as design context, not another project system', body: 'Figma remains the place for creating and collaborating on designs. Ledger provides the continuity around those designs: the project they belong to, the people and notes involved, the milestones they support, and the work that follows.' },
      ],
      setup: 'Connect Figma through Ledger’s supported plugin and workspace tools. Available preview and linking workflows depend on the authorization and workspace setup in use. For exact installation, permissions, account requirements, and troubleshooting instructions, use the Figma setup guide.',
    },
  },
  {
    slug: 'apple-calendar',
    name: 'Apple Calendar',
    description: 'Keep selected calendars and project dates together on Mac.',
    category: 'calendar',
    logo: 'apple',
    featured: false,
    availability: 'macos-only',
    detail: {
      headline: 'Keep calendar time connected to the work it supports.',
      website: 'https://www.icloud.com/calendar/',
      websiteLabel: 'icloud.com/calendar',
      docsHref: '/help/start-guide#integrations',
      docsLabel: 'Apple Calendar setup guide',
      primaryAction: { label: 'Set up Apple Calendar in Ledger', href: '/download' },
      artwork: 'apple-calendar-context',
      overview: 'Calendar events are where work becomes time. Ledger’s Apple Calendar integration brings selected calendars into the same workspace as projects, notes, and next actions, so deadlines and commitments are easier to understand alongside the work they belong to. The integration is available on Mac.',
      sections: [
        { title: 'See the time around the work', body: 'View selected Apple Calendars alongside Ledger work on Mac. A calendar event can provide the date, commitment, or boundary that explains when a project needs attention without requiring you to keep a separate mental picture of your schedule.' },
        { title: 'Keep project dates in context', body: 'A date is more useful when it remains connected to what it represents. Keep calendar events near project notes, milestones, people, and next actions so a launch, meeting, deadline, or appointment is part of the surrounding work rather than an isolated entry.' },
        { title: 'Create events from the work', body: 'When a Ledger project needs time on the calendar, create an Apple Calendar event alongside the project context. The calendar remains the source for scheduling, while Ledger keeps the reason and follow-through close by.' },
        { title: 'Update or remove events when plans change', body: 'Work changes, and the calendar should be able to change with it. Update or remove supported Apple Calendar events from Ledger when a project date moves, a meeting is rescheduled, or a commitment is no longer needed.' },
        { title: 'Choose the calendars Ledger should show', body: 'Bring only the calendars that are useful to your Ledger workflow into view. Selected-calendar support keeps the workspace focused while preserving Apple Calendar as the place where your broader schedule is managed.' },
        { title: 'Use Calendar for time, Ledger for continuity', body: 'Apple Calendar remains the place for calendar management and scheduling. Ledger adds the project context around those events: why the time matters, what needs to happen before it, who is involved, and what should follow afterward.' },
      ],
      setup: 'Connect Apple Calendar from Ledger on Mac and choose the calendars you want to use alongside your work. This integration is macOS-only; availability and event permissions depend on the calendars selected and the access granted on the device. For exact setup and troubleshooting instructions, use the Apple Calendar setup guide.',
    },
  },
  {
    slug: 'apple-reminders',
    name: 'Apple Reminders',
    description: 'Keep dated reminders close to the work they support on Mac.',
    category: 'calendar',
    logo: 'apple',
    featured: false,
    availability: 'macos-only',
    detail: {
      headline: 'Keep reminders close to the work they support.',
      website: 'https://www.icloud.com/reminders/',
      websiteLabel: 'icloud.com/reminders',
      docsHref: '/help/start-guide#integrations',
      docsLabel: 'Apple Reminders setup guide',
      primaryAction: { label: 'Set up Apple Reminders in Ledger', href: '/download' },
      artwork: 'apple-reminders-context',
      overview: 'Reminders are often the small commitments that keep larger work moving. Ledger’s Apple Reminders integration brings dated reminders and selected reminder lists close to projects, notes, and next actions, so the things you need to remember remain connected to why they matter. The integration is available on Mac.',
      sections: [
        { title: 'See reminders alongside the work', body: 'View dated reminders in the same workspace as Ledger projects and related context. A reminder can be a small next step, a follow-up, or a commitment that makes more sense when it stays near the project it supports.' },
        { title: 'Keep the small commitments visible', body: 'Projects are made up of more than milestones and large tasks. Selected reminder lists can keep the practical details in view: the call to make, the item to check, the document to send, or the follow-up that should not disappear after the meeting.' },
        { title: 'Choose the lists that belong in Ledger', body: 'Bring selected Apple Reminders lists into your Ledger workflow instead of duplicating every personal reminder. Focused list selection keeps the workspace useful while Apple Reminders remains the source for your broader reminder system.' },
        { title: 'Keep dates connected to follow-through', body: 'A dated reminder gives an action a moment in time. Ledger places that timing near the notes, people, project context, and next steps that explain what the reminder is for and what should happen after it.' },
        { title: 'Use Reminders for small actions, Ledger for continuity', body: 'Apple Reminders remains the place for managing reminder lists and everyday reminders. Ledger adds the surrounding continuity: which work the reminder supports, what context belongs to it, and how it fits with the rest of the project.' },
      ],
      setup: 'Connect Apple Reminders from Ledger on Mac and choose the reminder lists you want to use alongside your work. This integration is macOS-only; availability depends on the lists selected and the access granted on the device. For exact setup and troubleshooting instructions, use the Apple Reminders setup guide.',
    },
  },
  {
    slug: 'calendar-subscription',
    name: 'Calendar feeds',
    description: 'See Ledger workspace dates in the calendar app you already use.',
    category: 'calendar',
    logo: 'calendar',
    featured: false,
    availability: 'live',
    detail: {
      headline: 'Keep Ledger dates visible in the calendar you already use.',
      website: '/integrations',
      websiteLabel: 'Ledger workspace calendar',
      docsHref: '/help/start-guide#integrations',
      docsLabel: 'Calendar feed setup guide',
      primaryAction: { label: 'Set up a Ledger calendar feed', href: '/download' },
      artwork: 'calendar-feed-context',
      overview: 'Ledger workspace calendars can be subscribed to from an external calendar app that supports calendar feeds. This gives your projects, events, and shared dates a useful place in the schedule you already check, without making Ledger pretend to be the calendar application itself.',
      sections: [
        { title: 'Publish the dates that matter', body: 'Share a Ledger workspace calendar feed with the dates your team needs to see outside Ledger. Project timelines, events, and other workspace scheduling context can stay visible without manually copying each date into another calendar.' },
        { title: 'Subscribe where your schedule lives', body: 'Add the Ledger calendar feed to an external calendar app that supports subscriptions. The feed gives you a calendar view of workspace dates alongside the rest of your schedule, so important project timing is easier to notice.' },
        { title: 'Keep shared dates visible', body: 'A workspace calendar is useful when dates need to be seen by more than one person or across more than one tool. Use the feed to keep project timing, shared events, and relevant deadlines available to the people and calendar apps that need them.' },
        { title: 'A feed, not a second calendar system', body: 'Calendar feeds are intentionally simple. They make Ledger dates visible elsewhere, while Ledger remains the source for the workspace context behind those dates. The subscription does not turn an external calendar app into a place to manage Ledger projects.' },
        { title: 'Different from Apple Calendar', body: 'Apple Calendar is a Mac integration for viewing selected Apple calendars and managing supported events alongside Ledger work. Calendar feeds work in the other direction: Ledger publishes workspace dates outward so an external calendar app can display them.' },
        { title: 'Keep the project context in Ledger', body: 'A calendar event can tell you when something happens. Ledger keeps the surrounding story: the project, notes, milestones, people, and next actions that explain what the date means and what should happen next.' },
      ],
      setup: 'Create or manage a Ledger workspace calendar feed from the supported calendar settings, then subscribe to it from an external calendar app. Feed behavior depends on the calendar app and workspace access in use. For exact subscription, access, refresh, and troubleshooting instructions, use the calendar feed setup guide.',
    },
  },
  {
    slug: 'mcp',
    name: 'MCP',
    description: 'Connect MCP clients to authorized Ledger workspace context and supported actions.',
    category: 'automation',
    logo: 'mcp',
    featured: false,
    availability: 'developer',
    detail: {
      headline: 'Bring Ledger context into the AI clients you already use.',
      website: 'https://modelcontextprotocol.io',
      websiteLabel: 'modelcontextprotocol.io',
      docsHref: '/help/start-guide#integrations',
      docsLabel: 'MCP setup guide',
      primaryAction: { label: 'Set up MCP in Ledger', href: '/download' },
      artwork: 'mcp-context',
      overview: 'MCP lets compatible AI clients work with authorized Ledger context. Connect a client, choose the Ledger workspace it can use, and review the permissions it requests before approving the connection. Ledger stays in control of the workspace and scopes while your AI client becomes a useful way to find and work with the context already in Ledger.',
      sections: [
        { title: 'Connect the clients you already use', body: 'Use Ledger’s MCP connection with compatible AI clients that support the Model Context Protocol. The client remains the place where you ask questions and shape the interaction, while Ledger remains the source for the workspace context those questions depend on.' },
        { title: 'Choose one Ledger workspace', body: 'Every MCP connection is bound to one Ledger workspace. Choose the workspace that belongs with the client and the work you want it to understand. Keeping that boundary explicit helps separate personal, client, school, team, and project context.' },
        { title: 'Review permissions before access begins', body: 'Ledger shows the client name, requested workspace, and requested permissions before a connection is approved. Grant only the scopes that make sense for the way you intend to use the client, with read access and optional write access kept visible as separate capabilities.' },
        { title: 'Ask about the work around you', body: 'With the relevant read scopes, an MCP client can work with Ledger workspace context such as projects, tasks, notes, calendar items, and Today. This makes it easier to find the next action, recover a decision, summarize project context, or understand what needs attention without rebuilding the story by hand.' },
        { title: 'Let the client help with follow-through', body: 'Where supported and explicitly approved, MCP can create or update Ledger work such as Intake items, tasks, notes, daily focus, and projects. Write permissions are optional and can be expanded later when the connection needs more than read access.' },
        { title: 'Keep Ledger as the source of truth', body: 'MCP is a connection layer, not a second workspace. Ledger continues to own the workspace, permissions, records, and membership checks. Your AI client can help you navigate and act on the work, while the underlying context remains organized in Ledger.' },
      ],
      setup: 'Set up MCP from Ledger on desktop, then follow your AI client’s instructions for adding a remote MCP connection. When the client starts authorization, sign in to Ledger, choose one workspace, review the requested read or write permissions, and approve the connection. For exact client configuration, scope details, reconnection, revocation, and troubleshooting instructions, use the MCP setup guide.',
    },
  },
  {
    slug: 'browser-extension',
    name: 'Browser extension',
    description: 'Send links and selected text from the browser into the right Ledger workspace Inbox.',
    category: 'automation',
    logo: 'browser-extension',
    featured: false,
    availability: 'live',
    kind: 'capture-surface',
    detail: {
      headline: 'Capture the useful part of the web before it gets away.',
      website: 'https://developer.chrome.com/docs/extensions/',
      websiteLabel: 'Chrome extensions',
      docsHref: '/help/browser-extension',
      docsLabel: 'Browser extension guide',
      primaryAction: { label: 'Set up the Ledger extension', href: '/download' },
      artwork: 'browser-extension-context',
      overview: 'The Ledger browser extension is a fast bridge from the web into your workspace. Save a page, selected text, link, article, client request, or meeting page without copying it into a separate note first. The capture keeps its source context and lands in the right Ledger workspace Inbox so you can decide what it becomes later.',
      sections: [
        { title: 'Save from wherever you are on the web', body: 'Use the extension popup or right-click menu to capture the current page, a link, or selected text. It is built for the moment when something online becomes relevant to your work and you want it in Ledger before the tab, thought, or conversation disappears.' },
        { title: 'Keep the source attached', body: 'A browser capture should remain recognizable when you return to it. Ledger preserves the page URL, title, selected text, and source details so a saved article, request, reference, or meeting page still makes sense when you process it later.' },
        { title: 'Send captures to the right workspace', body: 'Choose a default capture workspace for fast saves, then change the destination when the context calls for it. Captures land in that workspace’s Inbox, keeping client work, school, personal references, and project research separate without slowing down the capture.' },
        { title: 'Turn web finds into useful work', body: 'A saved page does not need to become a task immediately. Review the capture in Ledger and turn it into a note, task, reminder, event, or project reference when you understand what it means and what should happen next.' },
        { title: 'Use the extension for the edge of the workflow', body: 'The browser is where research, requests, documentation, ideas, and references often appear. Ledger is where those things become organized context and follow-through. The extension keeps the handoff short without trying to become another browser or project system.' },
        { title: 'Keep access clear and revocable', body: 'The extension uses a Ledger-issued token tied to a workspace. Manage that token from Ledger settings, regenerate it if needed, or revoke it when the extension should no longer be able to save captures.' },
      ],
      setup: 'Install the Ledger browser extension, open its options or popup, and paste the extension token generated in Ledger settings. Choose the default capture workspace, then save a page or selected text from the browser. For installation, token management, workspace selection, capture behavior, and troubleshooting instructions, use the Browser extension guide.',
    },
  },
] as const satisfies readonly Integration[]

export type IntegrationSlug = (typeof integrations)[number]['slug']

export const featuredIntegrations = integrations.filter((integration) => integration.featured)

export const getIntegrationBySlug = (slug: string): Integration | undefined => integrations.find((integration) => integration.slug === slug)
