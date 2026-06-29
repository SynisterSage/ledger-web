import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

import { ChangelogPage } from './pages/ChangelogPage'
import { DownloadPage } from './pages/DownloadPage'
import { DocsPage } from './pages/DocsPage'
import { HomePage } from './pages/HomePage'
import { InviteLandingPage } from './pages/InviteLandingPage'
import { InviteSuccessPage } from './pages/InviteSuccessPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductScaffoldPage } from './pages/ProductScaffoldPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { RedirectPage } from './pages/RedirectPage'
import { TermsPage } from './pages/TermsPage'

const featureRedirects: Record<string, string> = {
  '/desktop-app': '/features/desktop',
  '/mobile-app': '/features/mobile',
  '/browser-extension': '/features/browser',
  '/integrations': '/features/integrations',
  '/sidebar': '/features/desktop',
  '/planning': '/features',
  '/review': '/features',
  '/about': '/features',
}

const docsRedirects: Record<string, string> = {
  '/docs': '/help',
  '/docs/index': '/help',
  '/docs/start-guide': '/help/getting-started',
  '/docs/workspace': '/help/workspaces',
  '/docs/workspaces': '/help/workspaces',
  '/docs/notes': '/help/notes',
  '/docs/projects': '/help/projects',
  '/docs/capture': '/help/capture',
  '/docs/today': '/help/today',
  '/docs/actions': '/help/actions',
  '/docs/calendar': '/help/calendar',
  '/docs/notifications': '/help/notifications',
  '/docs/search': '/help/search',
  '/docs/mobile': '/help/mobile',
  '/docs/browser-extension': '/help/browser-extension',
  '/docs/integrations': '/features/integrations',
  '/docs/siri-shortcuts': '/help/shortcuts',
  '/docs/sessions-account': '/help/account',
  '/docs/contact-support': '/help/contact',
  '/docs/troubleshooting': '/help/troubleshooting',
}

function normalizePath(pathname: string) {
  return pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/'
}

function AppRouter() {
  const pathname = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'

  if (pathname in featureRedirects) {
    return <RedirectPage to={featureRedirects[pathname]} />
  }

  if (pathname in docsRedirects) {
    return <RedirectPage to={docsRedirects[pathname]} />
  }

  switch (pathname) {
    case '/':
      return <HomePage />
    case '/download':
      return <DownloadPage />
    case '/features':
      return <ProductScaffoldPage page="features" />
    case '/features/desktop':
      return <ProductScaffoldPage page="desktop" />
    case '/features/mobile':
      return <ProductScaffoldPage page="mobile" />
    case '/features/browser':
      return <ProductScaffoldPage page="browser" />
    case '/features/integrations':
      return <ProductScaffoldPage page="integrations" />
    case '/changelog':
      return <ChangelogPage />
    case '/login':
      return <LoginPage />
    case '/invite':
      return <InviteLandingPage />
    case '/joined':
      return <InviteSuccessPage />
    case '/privacy':
      return <PrivacyPage />
    case '/terms':
      return <TermsPage />
    case '/help':
    case '/help/index':
      return <DocsPage />
    default:
      if (pathname.startsWith('/invite/')) {
        return <InviteLandingPage />
      }

      if (pathname.startsWith('/help/')) {
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
