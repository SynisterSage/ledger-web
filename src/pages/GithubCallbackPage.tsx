import { useMemo, useState } from 'react'
import { IntegrationCallbackSuccess } from '../components/IntegrationCallbackSuccess'

const OPEN_LEDGER_URL = 'ledger://settings/integrations?github=success'

export function GithubCallbackPage() {
  const [opened, setOpened] = useState(false)
  const result = useMemo(() => new URLSearchParams(window.location.search).get('github') || 'success', [])
  const isSuccess = result === 'success'

  const openLedger = () => {
    setOpened(true)
    window.location.assign(OPEN_LEDGER_URL)
  }

  return (
    isSuccess ? (
      <IntegrationCallbackSuccess
        sourceName="GitHub"
        sourceIcon="/github-mark.svg"
        sourceIconClassName="ledger-invert-on-dark"
        title="GitHub successfully connected"
        description="Open Ledger to finish refreshing your workspace connection and approved repositories."
        action={{ label: 'Open Ledger', onClick: openLedger, opened }}
      />
    ) : (
      <IntegrationCallbackSuccess
        status="error"
        sourceName="GitHub"
        sourceIcon="/github-mark.svg"
        sourceIconClassName="ledger-invert-on-dark"
        title="GitHub connection needs attention"
        description="Open Ledger to review the GitHub connection and try again safely."
        action={{ label: 'Open Ledger', onClick: openLedger, opened }}
      />
    )
  )
}
