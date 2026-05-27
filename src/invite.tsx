import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { InviteLandingPage } from './pages/InviteLandingPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InviteLandingPage />
  </StrictMode>,
)
