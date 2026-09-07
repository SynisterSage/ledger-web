import { useEffect, useState } from 'react'

type IntegrationCallbackSuccessProps = {
  sourceName: string
  sourceIcon: string
  sourceIconClassName?: string
  variant?: 'connection' | 'completion'
  status?: 'success' | 'error'
  title: string
  description: string
  closeAfterSeconds?: number
  action?: { label: string; onClick: () => void; opened?: boolean }
}

export function IntegrationCallbackSuccess({
  sourceName,
  sourceIcon,
  sourceIconClassName = '',
  variant = 'connection',
  status = 'success',
  title,
  description,
  closeAfterSeconds,
  action,
}: IntegrationCallbackSuccessProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(closeAfterSeconds ?? 0)

  useEffect(() => {
    if (!closeAfterSeconds) return

    const closeTimer = window.setTimeout(() => window.close(), closeAfterSeconds * 1000)
    const countdownTimer = window.setInterval(() => {
      setSecondsRemaining((current) => Math.max(0, current - 1))
    }, 1000)

    return () => {
      window.clearTimeout(closeTimer)
      window.clearInterval(countdownTimer)
    }
  }, [closeAfterSeconds])

  return (
    <main className="integration-callback min-h-dvh bg-[#080808] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[680px] items-center justify-center">
        <section className="w-full rounded-[14px] border border-[#242424] bg-[#141414] px-6 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:px-10 sm:py-11">
          <div className="flex items-center justify-center gap-5" aria-label={variant === 'completion' ? sourceName : `${sourceName} connected to Ledger`}>
            <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[16px] border border-[#292929] bg-[#191919] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.24)]">
              <img src={sourceIcon} alt={`${sourceName} logo`} className={`max-h-full max-w-full object-contain ${sourceIconClassName}`} />
            </div>
            <span className={`text-[30px] font-medium leading-none ${status === 'error' ? 'text-[#f0a45d]' : 'text-[#3bd267]'}`} aria-hidden="true">{status === 'error' ? '!' : '✓'}</span>
            {variant === 'connection' && <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[16px] border border-[#292929] bg-[#191919] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.24)]"><img src="/assets/logos/logo.svg" alt="Ledger logo" className="h-full w-full object-contain" /></div>}
          </div>
          <h1 className="mt-8 text-[25px] font-semibold leading-tight tracking-[-0.025em] text-[#f5f5f5] sm:text-[27px]">{title}</h1>
          <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-6 text-[#979797]">{description}</p>
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="ledger-button mt-7 h-11 min-w-[180px] border border-[#363636] bg-[#202020] px-5 text-sm font-semibold text-[#f5f5f5] transition-colors hover:bg-[#292929]"
            >
              {action.opened ? 'Opening Ledger…' : action.label}
            </button>
          )}
          {closeAfterSeconds ? (
            <p className="mt-4 text-[13px] text-[#777]" role="status">
              This window will close automatically in {secondsRemaining} seconds.
            </p>
          ) : null}
        </section>
      </div>
    </main>
  )
}
