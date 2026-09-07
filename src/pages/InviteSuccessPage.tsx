import { IntegrationCallbackSuccess } from '../components/IntegrationCallbackSuccess'
import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

const getWorkspaceName = () => {
  const value = new URLSearchParams(window.location.search).get('workspace')?.trim()
  return value || 'this workspace'
}

const OPEN_TARGET_URL = import.meta.env.VITE_LEDGER_OPEN_TARGET_URL?.trim() || '/download'

export function InviteSuccessPage() {
  if (isSiteLocked()) return <LockedSplash />

  const workspaceName = getWorkspaceName()
  return <IntegrationCallbackSuccess variant="completion" sourceName="Workspace invitation" sourceIcon="/assets/logos/logo.svg" title="You’re in" description={`The ${workspaceName} workspace has been added to your Ledger account.`} action={{ label: 'Open Ledger', onClick: () => window.location.assign(OPEN_TARGET_URL) }} />
}
