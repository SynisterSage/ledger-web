import { Check } from 'lucide-react'
import { useState } from 'react'

import { SiteFooter } from '../components/sections/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'

const plans = [
  {
    name: 'Free',
    price: '$0',
    detail: 'Free for everyone',
    features: [
      'Quick capture for tasks, notes, and ideas',
      '1 personal workspace',
      'Projects and daily focus',
      'Basic calendar planning',
      'Desktop and web access',
    ],
    action: 'Get started',
    href: '/signup',
  },
  {
    name: 'Basic',
    price: '$5',
    suffix: 'per user/month',
    detail: 'Everything you need to keep your day moving.',
    features: [
      'Everything in Free',
      'Unlimited tasks, notes, and projects',
      'Full calendar and reminders',
      'Daily check-ins and review history',
      'Sync across your devices',
    ],
    action: 'Get started',
    href: '/signup',
    billing: true,
  },
  {
    name: 'Business',
    price: '$16',
    suffix: 'per user/month',
    detail: 'For teams moving work forward together.',
    features: [
      'Everything in Basic',
      'Shared workspaces',
      'Workspace members and roles',
      'Linked notes, projects, and events',
      'Connected tool integrations',
      'Advanced accountability insights',
      'Priority support',
    ],
    action: 'Get started',
    href: '/signup',
    billing: true,
    featured: true,
  },
]

export function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true)

  return (
    <div className="min-h-dvh bg-[#0b0c0c] text-[#f1f1ef]">
      <SiteHeader currentPath="/pricing" />
      <main className="mx-auto w-full max-w-[1120px] px-6 pb-24 pt-12 sm:px-8 sm:pt-16 lg:pb-32 lg:pt-20">
        <h1 id="pricing-title" className="text-[36px] font-medium leading-none tracking-[-0.055em] text-[#f1f1ef] sm:text-[40px]">Pricing</h1>

        <section className="mt-24 grid grid-cols-1 gap-0 md:grid-cols-3" aria-labelledby="pricing-title">
          {plans.map((plan, index) => (
            <article key={plan.name} className={`flex min-h-[430px] flex-col border-[#222525] py-8 md:px-6 md:py-0 lg:min-h-[414px] ${index === 0 ? 'lg:pl-0' : ''} ${index === plans.length - 1 ? 'lg:pr-0' : ''} ${index > 0 ? 'border-t md:border-l md:border-t-0' : ''}`}>
              <div className="min-h-[60px]">
                <h2 className="text-[18px] font-semibold leading-5 tracking-[-0.025em] text-[#ededeb]">{plan.name}</h2>
                <div className="mt-2 flex items-baseline gap-1 text-[13px] text-[#a8aaa9]">
                  <span className="text-[#e6e7e5]">{plan.price}</span>
                  {plan.suffix && <span>{plan.suffix}</span>}
                </div>
              </div>

              {plan.billing ? (
                <label className="mt-0 flex min-h-[45px] cursor-pointer items-center gap-2 border-y border-[#222525] text-[11px] text-[#969997]">
                  <input type="checkbox" checked={annualBilling} onChange={(event) => setAnnualBilling(event.target.checked)} className="peer sr-only" />
                  <span aria-hidden="true" className={`relative h-[15px] w-6 rounded-full transition-colors ${annualBilling ? 'bg-ledger-accent' : 'bg-[#3a3d3d]'}`}><span className={`absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white transition-transform ${annualBilling ? 'translate-x-[11px]' : 'translate-x-[2px]'}`} /></span>
                  Billed yearly
                </label>
              ) : (
                <p className="flex min-h-[45px] items-center border-y border-[#222525] text-[11px] text-[#969997]">{plan.detail}</p>
              )}

              <ul className="mt-5 space-y-3 text-[11px] leading-4 text-[#c4c7c6]">
                {plan.features.map((feature) => <li key={feature} className="flex items-start gap-2"><Check size={13} strokeWidth={2.4} className="mt-px shrink-0 text-[#cbd4dc]" aria-hidden="true" />{feature}</li>)}
              </ul>

              <div className="mt-auto flex gap-2 pt-8">
                <a href={plan.href} className={`flex h-[31px] flex-1 items-center justify-center rounded-full border px-3 text-[10px] font-medium transition-colors ${plan.featured ? 'border-ledger-accent bg-ledger-accent text-white hover:bg-ledger-accent-hover' : 'border-[#2b2e2e] bg-[#171919] text-[#eceeeb] hover:bg-[#222525]'}`}>{plan.action}</a>
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
