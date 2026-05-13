import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { PlanningPage } from './pages/PlanningPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlanningPage />
  </StrictMode>,
)

