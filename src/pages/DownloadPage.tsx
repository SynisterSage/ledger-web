import { useState } from 'react'

import { LockedSplash } from '../components/sections/LockedSplash'
import { SiteFooter } from '../components/sections/SiteFooter'
import { isSiteLocked } from '../lib/siteLock'

import { SiteHeader } from '../components/layout/SiteHeader'
import { ActionButton } from '../components/ui/ActionButton'

const desktopDownloads = [
  { label: 'macOS', action: 'Download', icon: 'apple' as const },
  { label: 'Windows', action: 'Download', icon: 'windows' as const },
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
}: {
  label: string
  action: string
  icon: 'apple' | 'windows' | 'extension' | 'ios' | 'android'
  secondaryAction?: string
}) {
  const iconView = {
    apple: <img src="/assets/icons/Apple_Logo_0.svg" alt="" className="h-4 w-4 object-contain" aria-hidden="true" />,
    windows: (
      <img src="/assets/icons/Microsoft_Symbol_0.svg" alt="" className="h-4 w-4 object-contain" aria-hidden="true" />
    ),
    extension: (
      <span
        aria-hidden="true"
        className="h-4 w-4 bg-current mask-[url('/assets/icons/extension-puzzle-outline.svg')] mask-center mask-no-repeat mask-contain"
      />
    ),
    ios: <img src="/assets/icons/Apple_Logo_0.svg" alt="" className="h-4 w-4 object-contain" aria-hidden="true" />,
    android: <img src="/assets/icons/google-play.svg" alt="" className="h-4 w-4 object-contain" aria-hidden="true" />,
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
          <span className="inline-flex h-8 items-center rounded-full border border-(--ledger-border-subtle) px-3 text-[12px] font-medium text-(--ledger-text-secondary)">
            {secondaryAction}
          </span>
        ) : null}
        <span className="inline-flex h-8 items-center rounded-full bg-(--ledger-header-pill) px-4 text-[12px] font-medium text-(--ledger-text-primary) transition-all duration-200 hover:-translate-y-px hover:bg-(--ledger-header-pill-active) hover:text-(--ledger-text-primary)">
          {action}
        </span>
      </div>
    </div>
  )
}

export function DownloadPage() {
  const [downloadLabel] = useState<'macOS' | 'Windows'>(() => getPlatformDownloadLabel())

  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-dhv bg-ledger-surface text-(--ledger-text-primary)">
      <SiteHeader currentPath="/download" />

      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
        <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] shadow-[0_4px_10px_rgba(0,0,0,0.34)]">
            <img src="/assets/logos/logo.svg" alt="" className="h-14 w-14" />
          </div>

          <h1 className="mt-8 text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-(--ledger-text-primary) sm:text-[54px] lg:text-[62px]">
            Download Ledger
          </h1>

          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-(--ledger-text-secondary) sm:text-[17px]">
            Available for desktop and mobile. Choose the platform that fits your workflow and keep your work close
            wherever you are.
          </p>

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
                <DownloadRow key={item.label} label={item.label} action={item.action} icon={item.icon} />
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
