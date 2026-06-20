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
