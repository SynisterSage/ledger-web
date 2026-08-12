import { StrictMode, useEffect } from 'react'
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
import { IntegrationsDirectoryPage } from './pages/IntegrationsDirectoryPage'
import { IntegrationDetailPage } from './pages/IntegrationDetailPage'
import { getIntegrationBySlug } from './data/integrations'
import { CaptureFeaturePage } from './pages/CaptureFeaturePage'
import { NotesFeaturePage } from './pages/NotesFeaturePage'
import { ProjectsFeaturePage } from './pages/ProjectsFeaturePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { RedirectPage } from './pages/RedirectPage'
import { TermsPage } from './pages/TermsPage'
import { FigmaPluginAuthorizationPage } from './pages/FigmaPluginAuthorizationPage'
import { GithubCallbackPage } from './pages/GithubCallbackPage'
import { McpAuthorizationPage } from './pages/McpAuthorizationPage'
import { McpWorkspaceSwitchPage } from './pages/McpWorkspaceSwitchPage'
import { PricingPage } from './pages/PricingPage'

const legacyRedirects: Record<string, string> = {
  '/desktop-app': '/platforms/desktop',
  '/mobile-app': '/platforms/mobile',
  '/browser-extension': '/platforms/browser-extension',
  '/sidebar': '/features/sidebar',
  '/planning': '/features/calendar',
  '/review': '/features',
  '/about': '/features',
  '/features/desktop': '/platforms/desktop',
  '/features/mobile': '/platforms/mobile',
  '/features/browser': '/platforms/browser-extension',
  '/features/integrations': '/integrations',
  '/features/shared-workspaces': '/features/workspaces',
  '/features/search': '/features',
  '/features/planning': '/features/calendar',
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
  '/docs/integrations': '/integrations',
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
  const pluginSession = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('figmaPluginAuth') : null
  const pluginCode = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('code') : null
  const mcpRequestId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('request_id') : null
  const mcpSwitchSessionId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('session_id') : null
  const mcpSwitchCode = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('code') : null
  const githubResult = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('github') : null

  useEffect(() => {
    if (typeof document === 'undefined') return
    const integrationSlug = pathname.startsWith('/integrations/') ? pathname.slice('/integrations/'.length) : null
    const integration = integrationSlug ? getIntegrationBySlug(integrationSlug) : undefined
    const title = integration?.detail
      ? `${integration.name} integration | Ledger`
      : pathname === '/integrations'
        ? 'Integrations | Ledger'
        : pathname === '/help' || pathname.startsWith('/help/')
          ? 'Ledger Help'
          : pathname === '/download'
            ? 'Download Ledger'
            : pathname === '/pricing'
              ? 'Pricing | Ledger'
              : 'Ledger | Connected work for teams'
    const description = integration?.detail?.overview
      || (pathname === '/integrations'
        ? 'Connect Ledger to the tools and surfaces that keep projects, context, and follow-through together.'
        : pathname === '/pricing'
          ? 'Explore Ledger plans for capturing, organizing, and moving work forward across your workspaces.'
          : 'Ledger keeps capture, notes, projects, calendar, and connected work in one calm workspace.')
    const canonical = `https://ledgerworkspace.com${pathname === '/' ? '/' : pathname}`
    document.title = title
    const setMeta = (selector: string, attribute: 'name' | 'property', content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, selector.match(/"([^"]+)"/)?.[1] || '')
        document.head.appendChild(element)
      }
      element.content = content
    }
    setMeta('meta[name="description"]', 'name', description)
    setMeta('meta[property="og:title"]', 'property', title)
    setMeta('meta[property="og:description"]', 'property', description)
    setMeta('meta[property="og:url"]', 'property', canonical)
    setMeta('meta[name="twitter:title"]', 'name', title)
    setMeta('meta[name="twitter:description"]', 'name', description)
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = canonical
  }, [pathname])

  if (pluginSession && pluginCode) {
    return <FigmaPluginAuthorizationPage sessionId={pluginSession} code={pluginCode} />
  }

  if (pathname === '/integrations/mcp/authorize' && mcpRequestId) {
    return <McpAuthorizationPage requestId={mcpRequestId} />
  }

  if (pathname === '/integrations/mcp/switch-workspace' && mcpSwitchSessionId && mcpSwitchCode) {
    return <McpWorkspaceSwitchPage sessionId={mcpSwitchSessionId} code={mcpSwitchCode} />
  }

  if (pathname === '/' && githubResult) {
    return <GithubCallbackPage />
  }

  if (pathname in legacyRedirects) {
    return <RedirectPage to={legacyRedirects[pathname]} />
  }

  if (pathname in docsRedirects) {
    return <RedirectPage to={docsRedirects[pathname]} />
  }

  if (pathname.startsWith('/integrations/')) {
    const slug = pathname.slice('/integrations/'.length)
    const integration = getIntegrationBySlug(slug)
    if (integration?.detail) return <IntegrationDetailPage slug={slug} />
    return <NotFoundPage />
  }

  switch (pathname) {
    case '/':
      return <HomePage />
    case '/download':
      return <DownloadPage />
    case '/pricing':
      return <PricingPage />
    case '/features':
      return <ProductScaffoldPage page="features" />
    case '/features/sidebar':
      return <ProductScaffoldPage page="sidebar" />
    case '/features/capture':
      return <CaptureFeaturePage />
    case '/features/notes':
      return <NotesFeaturePage />
    case '/features/projects':
      return <ProjectsFeaturePage />
    case '/features/calendar':
      return <ProductScaffoldPage page="calendar" />
    case '/features/connected-work':
      return <ProductScaffoldPage page="connected-work" />
    case '/features/workspaces':
      return <ProductScaffoldPage page="workspaces" />
    case '/platforms':
      return <ProductScaffoldPage page="platforms" />
    case '/platforms/desktop':
      return <ProductScaffoldPage page="desktop" />
    case '/platforms/web':
      return <ProductScaffoldPage page="web" />
    case '/platforms/mobile':
      return <ProductScaffoldPage page="mobile" />
    case '/platforms/browser-extension':
      return <ProductScaffoldPage page="browser-extension" />
    case '/integrations':
      return <IntegrationsDirectoryPage />
    case '/changelog':
      return <ChangelogPage />
    case '/login':
      return <LoginPage />
    case '/signup':
      return <LoginPage initialMode="signup" />
    case '/auth/callback':
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
