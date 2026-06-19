import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { AboutPage } from './pages/AboutPage'
import { DownloadPage } from './pages/DownloadPage'
import { HomePage } from './pages/HomePage'
import { InviteLandingPage } from './pages/InviteLandingPage'
import { InviteSuccessPage } from './pages/InviteSuccessPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PlanningPage } from './pages/PlanningPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { ReviewPage } from './pages/ReviewPage'
import { SidebarPage } from './pages/SidebarPage'
import { TermsPage } from './pages/TermsPage'

function AppRouter() {
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/'
      : '/'

  switch (pathname) {
    case '/download':
      return <DownloadPage />
    case '/about':
      return <AboutPage />
    case '/sidebar':
      return <SidebarPage />
    case '/planning':
      return <PlanningPage />
    case '/review':
      return <ReviewPage />
    case '/invite':
      return <InviteLandingPage />
    case '/joined':
      return <InviteSuccessPage />
    case '/privacy':
      return <PrivacyPage />
    case '/terms':
      return <TermsPage />
    case '/':
      return <HomePage />
    default:
      return <NotFoundPage />
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
