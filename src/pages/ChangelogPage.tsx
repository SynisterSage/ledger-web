import { ArrowRight } from 'lucide-react'

import { SiteHeader } from '../components/layout/SiteHeader'
import { LockedSplash } from '../components/sections/LockedSplash'
import { SiteFooter } from '../components/sections/SiteFooter'
import { isSiteLocked } from '../lib/siteLock'

const releases = [
  {
    version: '0.9.0',
    date: 'June 2026',
    title: 'Refined product surface and faster capture flow',
    bullets: [
      'Cleaned up the feature and help routes so the site has a canonical product structure.',
      'Improved capture pathways across desktop, mobile, and browser entry points.',
      'Updated workspace-aware navigation and footer links.',
    ],
  },
  {
    version: '0.8.4',
    date: 'May 2026',
    title: 'Desktop sidebar polish',
    bullets: [
      'Tightened the desktop sidebar presentation and command flow.',
      'Reduced friction around quick actions, search, and Today.',
    ],
  },
  {
    version: '0.8.0',
    date: 'April 2026',
    title: 'Workspace attention improvements',
    bullets: [
      'Added more consistent workspace context across capture and review.',
      'Improved notification handling for items that need a response.',
    ],
  },
]

export function ChangelogPage() {
  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-dvh bg-ledger-surface text-ledger-text">
      <SiteHeader currentPath="/changelog" />

      <main className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-[13px] font-medium text-(--ledger-text-secondary)">Changelog</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(3rem,7vw,5.4rem)] font-medium leading-[0.96] tracking-[-0.06em] text-ledger-text-primary">
              Changelog
            </h1>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-xl text-[18px] leading-8 tracking-[-0.02em] text-(--ledger-text-secondary) sm:text-[20px]">
              Follow Ledger updates, fixes, and improvements.
            </p>
            <div className="mt-8">
              <a
                href="/help/contact"
                className="ledger-button h-11 border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 text-[14px] font-semibold text-ledger-text transition-colors duration-200 hover:bg-(--ledger-surface-muted)"
              >
                Ask about a release
              </a>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          {releases.map((release) => (
            <article key={release.version} className="rounded-[28px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 py-6 sm:px-6 sm:py-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-medium text-(--ledger-text-secondary)">
                    {release.version} · {release.date}
                  </p>
                  <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-ledger-text-primary">{release.title}</h2>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-ledger-text-secondary" />
              </div>
              <ul className="mt-5 space-y-3">
                {release.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[15px] leading-7 text-ledger-text-secondary">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ledger-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
