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
        features: 'features/index.html',
        help: 'help/index.html',
        changelog: 'html-pages/changelog.html',
        login: 'html-pages/login.html',
        privacy: 'privacy/index.html',
        terms: 'terms/index.html',
        joined: 'html-pages/joined.html',
        invite: 'html-pages/invite.html',
        notfound: '404.html',
      },
    },
  },
})
