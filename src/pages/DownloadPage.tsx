import { type PointerEvent, useState } from 'react'
import { Globe2 } from 'lucide-react'

import { LockedSplash } from '../components/sections/LockedSplash'
import { SiteFooter } from '../components/sections/SiteFooter'
import { isSiteLocked } from '../lib/siteLock'

import { SiteHeader } from '../components/layout/SiteHeader'
import { ActionButton } from '../components/ui/ActionButton'

const desktopDownloads = [
  { label: 'macOS', action: 'Download', icon: 'apple' as const },
  { label: 'Windows', action: 'Download', icon: 'windows' as const },
  { label: 'Ledger web app', action: 'Open', icon: 'web' as const, actionHref: '/login' },
  { label: 'Ledger extension', action: 'Open', icon: 'extension' as const },
]

const mobileDownloads = [
  { label: 'iOS', action: 'Open store', icon: 'ios' as const },
  { label: 'Android', action: 'Open store', icon: 'android' as const },
]

const getPlatformDownloadLabel = (): 'macOS' | 'Windows' => {
  if (typeof window === 'undefined') {
    return 'macOS'
  }

  const uaPlatform =
    typeof navigator !== 'undefined' && 'userAgentData' in navigator
      ? // userAgentData is not typed on all TS targets, so keep this narrow
        (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform
      : undefined
  const platform = (uaPlatform || navigator.platform || '').toLowerCase()

  if (platform.includes('win')) {
    return 'Windows'
  }

  return 'macOS'
}

function DownloadRow({
  label,
  action,
  icon,
  secondaryAction,
  actionHref,
}: {
  label: string
  action: string
  icon: 'apple' | 'windows' | 'extension' | 'ios' | 'android' | 'web'
  secondaryAction?: string
  actionHref?: string
}) {
  const iconView = {
    apple: <img src="/assets/icons/Apple_Logo_0.svg" alt="" className="h-4 w-4 object-contain ledger-invert-on-dark" aria-hidden="true" />,
    windows: (
      <img src="/assets/icons/Microsoft_Symbol_0.svg" alt="" className="h-4 w-4 object-contain" aria-hidden="true" />
    ),
    extension: (
      <span
        aria-hidden="true"
        className="h-4 w-4 bg-current mask-[url('/assets/icons/extension-puzzle-outline.svg')] mask-center mask-no-repeat mask-contain"
      />
    ),
    ios: <img src="/assets/icons/Apple_Logo_0.svg" alt="" className="h-4 w-4 object-contain ledger-invert-on-dark" aria-hidden="true" />,
    android: <img src="/assets/icons/google-play.svg" alt="" className="h-4 w-4 object-contain" aria-hidden="true" />,
    web: <Globe2 className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />,
  }[icon]

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] text-(--ledger-text-primary)">
          {iconView}
        </div>
        <span className="text-[15px] font-medium text-(--ledger-text-primary)">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {secondaryAction ? (
          <span className="ledger-button h-8 rounded-[var(--ledger-control-radius)] border border-(--ledger-border-subtle) px-3 text-[12px] font-medium text-(--ledger-text-secondary)">
            {secondaryAction}
          </span>
        ) : null}
        {actionHref ? (
          <a
            href={actionHref}
            className="ledger-button h-8 rounded-[var(--ledger-control-radius)] bg-(--ledger-header-pill) px-4 text-[12px] font-medium text-(--ledger-text-primary) transition-all duration-200 hover:-translate-y-px hover:bg-(--ledger-header-pill-active) hover:text-(--ledger-text-primary)"
          >
            {action}
          </a>
        ) : (
          <span className="ledger-button h-8 rounded-[var(--ledger-control-radius)] bg-(--ledger-header-pill) px-4 text-[12px] font-medium text-(--ledger-text-primary) transition-all duration-200 hover:-translate-y-px hover:bg-(--ledger-header-pill-active) hover:text-(--ledger-text-primary)">
            {action}
          </span>
        )}
      </div>
    </div>
  )
}

function InteractiveLedgerLogo({ pointer }: { pointer: { x: number; y: number } }) {
  const gradientShiftX = pointer.x * 220
  const gradientShiftY = pointer.y * 220
  const highlightX = 467 + pointer.x * 280
  const highlightY = 467 + pointer.y * 280

  return (
    <svg viewBox="0 0 934 934" className="download-logo-mark__image h-[78%] w-[78%]" aria-hidden="true">
      <defs>
        <linearGradient
          id="ledger-download-gradient"
          x1="0"
          y1="0"
          x2="934"
          y2="934"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${gradientShiftX} ${gradientShiftY}) rotate(${pointer.x * 8} 467 467)`}
        >
          <stop stopColor="#FF1F00" />
          <stop offset="1" stopColor="#FFD600" />
        </linearGradient>
        <radialGradient id="ledger-download-highlight" cx={highlightX} cy={highlightY} r="560" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFBEA" stopOpacity="0.68" />
          <stop offset="0.38" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M0 813.045C0 920.421 129.822 974.196 205.749 898.27L552.018 552.008H0V813.045ZM0 552.008L552.018 0H120.526C53.961 0 0 53.961 0 120.526V552.008ZM552.018 0V552.008L898.261 205.748C974.186 129.821 920.41 0 813.035 0H552.018ZM552.018 552.008V813.031C552.018 920.41 681.844 974.184 757.77 898.254L898.261 757.756C974.185 681.828 920.41 552.008 813.035 552.008H552.018Z"
        fill="url(#ledger-download-gradient)"
        fillOpacity="0.82"
      />
      <path
        d="M0 813.045C0 920.421 129.822 974.196 205.749 898.27L552.018 552.008H0V813.045ZM0 552.008L552.018 0H120.526C53.961 0 0 53.961 0 120.526V552.008ZM552.018 0V552.008L898.261 205.748C974.186 129.821 920.41 0 813.035 0H552.018ZM552.018 552.008V813.031C552.018 920.41 681.844 974.184 757.77 898.254L898.261 757.756C974.185 681.828 920.41 552.008 813.035 552.008H552.018Z"
        fill="url(#ledger-download-highlight)"
        fillOpacity="0.46"
      />
    </svg>
  )
}

export function DownloadPage() {
  const [downloadLabel] = useState<'macOS' | 'Windows'>(() => getPlatformDownloadLabel())
  const [logoPointer, setLogoPointer] = useState({ x: 0, y: 0 })

  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-dvh bg-(--ledger-background) text-(--ledger-text-primary)">
      <SiteHeader currentPath="/download" />

      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
        <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div
            className="download-logo-mark flex h-48 w-48 items-center justify-center rounded-[20%] bg-ledger-bg sm:h-56 sm:w-56 lg:h-64 lg:w-64"
            onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
              const bounds = event.currentTarget.getBoundingClientRect()
              setLogoPointer({
                x: (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2),
                y: (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2),
              })
              event.currentTarget.style.setProperty('--logo-rotate-x', `${-(event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2) * 5}deg`)
              event.currentTarget.style.setProperty('--logo-rotate-y', `${(event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2) * 5}deg`)
            }}
            onPointerLeave={(event) => {
              setLogoPointer({ x: 0, y: 0 })
              event.currentTarget.style.setProperty('--logo-rotate-x', '0deg')
              event.currentTarget.style.setProperty('--logo-rotate-y', '0deg')
            }}
          >
            <InteractiveLedgerLogo pointer={logoPointer} />
          </div>

          <h1 className="mt-8 text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-(--ledger-text-primary) sm:text-[54px] lg:text-[62px]">
            Download Ledger
          </h1>

          <ActionButton href="#platforms" className="mt-8">
            Download for {downloadLabel}
          </ActionButton>
        </section>

        <section id="platforms" className="mx-auto mt-14 max-w-4xl">
          <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:py-12">
            <div className="space-y-4">
              <p className="text-[15px] font-medium text-(--ledger-text-primary)">Ledger desktop</p>
              <p className="max-w-sm text-[16px] leading-7 text-(--ledger-text-secondary)">
                A fast, focused desktop experience for the work you keep open all day. Built for macOS, Windows, and
                the Ledger extension.
              </p>
            </div>

            <div className="divide-y divide-(--ledger-border-subtle)">
              {desktopDownloads.map((item) => (
                <DownloadRow key={item.label} label={item.label} action={item.action} icon={item.icon} actionHref={item.actionHref} />
              ))}
            </div>
          </div>

          <div className="grid gap-10 border-t border-(--ledger-border-subtle) py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:py-12">
            <div className="space-y-4">
              <p className="text-[15px] font-medium text-(--ledger-text-primary)">Ledger mobile</p>
              <p className="max-w-sm text-[16px] leading-7 text-(--ledger-text-secondary)">
                Stay connected away from your desk with mobile apps that keep notes, tasks, reminders, and captures in
                sync.
              </p>
            </div>

            <div className="divide-y divide-(--ledger-border-subtle)">
              {mobileDownloads.map((item) => (
                <DownloadRow key={item.label} label={item.label} action={item.action} icon={item.icon} secondaryAction="Scan QR" />
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
