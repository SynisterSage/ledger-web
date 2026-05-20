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
        sidebar: 'html-pages/sidebar.html',
        planning: 'planning.html',
        review: 'html-pages/review.html',
        joined: 'html-pages/joined.html',
      },
    },
  },
})
