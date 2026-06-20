import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        download: 'html-pages/download.html',
        about: 'html-pages/about.html',
        docs: 'docs/index.html',
        docsStartGuide: 'docs/start-guide/index.html',
        docsWorkspace: 'docs/workspace/index.html',
        docsNotes: 'docs/notes/index.html',
        docsProjects: 'docs/projects/index.html',
        help: 'help/index.html',
        helpStartGuide: 'help/start-guide/index.html',
        helpWorkspace: 'help/workspace/index.html',
        helpWorkspaces: 'help/workspaces/index.html',
        helpToday: 'help/today/index.html',
        helpActions: 'help/actions/index.html',
        helpCapture: 'help/capture/index.html',
        helpNotes: 'help/notes/index.html',
        helpProjects: 'help/projects/index.html',
        helpCalendar: 'help/calendar/index.html',
        helpNotifications: 'help/notifications/index.html',
        helpSearch: 'help/search/index.html',
        helpMobile: 'help/mobile/index.html',
        helpBrowserExtension: 'help/browser-extension/index.html',
        helpSiriShortcuts: 'help/siri-shortcuts/index.html',
        helpSessionsAccount: 'help/sessions-account/index.html',
        helpContactSupport: 'help/contact-support/index.html',
        helpTroubleshooting: 'help/troubleshooting/index.html',
        privacy: 'privacy/index.html',
        terms: 'terms/index.html',
        sidebar: 'html-pages/sidebar.html',
        planning: 'planning.html',
        review: 'html-pages/review.html',
        joined: 'html-pages/joined.html',
        invite: 'html-pages/invite.html',
        notfound: '404.html',
      },
    },
  },
})
