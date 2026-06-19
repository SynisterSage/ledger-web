import type { ReactNode } from 'react'

import { SiteHeader } from '../layout/SiteHeader'
import { SiteFooter } from './SiteFooter'

type LegalSection = {
  id: string
  title: string
  content: ReactNode
}

type LegalPageProps = {
  title: string
  intro: string
  updatedAt: string
  sections: LegalSection[]
}

export function LegalPage({ title, intro, updatedAt, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--ledger-surface)_0%,var(--ledger-bg)_100%)] text-ledger-text">
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 sm:py-12 lg:py-14">
        <article className="min-w-0">
          <h1 className="text-[48px] font-semibold tracking-[-0.055em] text-ledger-text sm:text-[62px] lg:text-[72px]">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-[19px] leading-[1.45] text-ledger-text-muted sm:text-[22px]">
            {intro}
          </p>
          <p className="mt-5 text-sm text-ledger-text-muted">Last updated {updatedAt}</p>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="border-t border-ledger-border/70 pt-8">
                <h2 className="text-[28px] font-semibold tracking-[-0.04em] text-ledger-text sm:text-[32px]">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-[16px] leading-7 text-ledger-text-muted">{section.content}</div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
