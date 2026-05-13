import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { SidebarPage } from './pages/SidebarPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarPage />
  </StrictMode>,
)

