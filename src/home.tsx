import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { AboutPage } from './pages/AboutPage'
import { DownloadPage } from './pages/DownloadPage'
import { HomePage } from './pages/HomePage'
import { InviteLandingPage } from './pages/InviteLandingPage'
import { InviteSuccessPage } from './pages/InviteSuccessPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { DocsPage } from './pages/DocsPage'
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
    case '/login':
      return <LoginPage />
    case '/privacy':
      return <PrivacyPage />
    case '/terms':
      return <TermsPage />
    case '/help':
    case '/docs':
      return <DocsPage />
    case '/':
      return <HomePage />
    default:
      if (pathname.startsWith('/help/') || pathname.startsWith('/docs/')) {
        return <DocsPage />
      }
      return <NotFoundPage />
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
