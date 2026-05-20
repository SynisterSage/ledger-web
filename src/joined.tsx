import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { InviteSuccessPage } from './pages/InviteSuccessPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InviteSuccessPage />
  </StrictMode>,
)
