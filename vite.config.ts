import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        download: 'download.html',
        about: 'about.html',
        sidebar: 'sidebar.html',
        planning: 'planning.html',
        review: 'review.html',
      },
    },
  },
})
