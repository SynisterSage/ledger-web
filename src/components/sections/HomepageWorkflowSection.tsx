import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Inbox,
  Monitor,
  ArrowRight,
  Plug2,
  Puzzle,
  Route,
  RotateCcw,
  Smartphone,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react'

type WorkflowFeatureId = 'capture' | 'organize' | 'act' | 'review'

type WorkflowFeature = {
  id: WorkflowFeatureId
  icon: LucideIcon
  label: string
  subtitle: string
  title: string
  description: string
}

type EcosystemCard = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

const workflowFeatures: WorkflowFeature[] = [
  {
    id: 'capture',
    icon: Inbox,
    label: 'Capture',
    subtitle: 'Save anything before you forget.',
    title: 'Capture without breaking flow.',
    description:
      'Save a task, note, event, reminder, link, or project action from desktop, mobile, browser, or Siri.',
  },
  {
    id: 'organize',
    icon: Route,
    label: 'Organize',
    subtitle: 'Send it to the right workspace.',
    title: 'Every context gets a workspace.',
    description:
      'Keep school, internships, client work, creative projects, and personal tasks separated without losing the full picture.',
  },
  {
    id: 'act',
    icon: Target,
    label: 'Act',
    subtitle: 'See what needs attention today.',
    title: 'Today shows what needs attention.',
    description:
      'Upcoming events, due reminders, action items, focus, notifications, and captures come together in one calm daily view.',
  },
  {
    id: 'review',
    icon: RotateCcw,
    label: 'Review',
    subtitle: 'Bring waiting items back into view.',
    title: 'Nothing gets lost in the background.',
    description:
      'Ledger brings captures, notifications, follow-ups, reminders, and unfinished work back into view so you can decide what happens next.',
  },
]

const ecosystemCards: EcosystemCard[] = [
  {
    title: 'Desktop sidebar',
    description: 'Dock Ledger beside the apps you already use.',
    href: '/sidebar',
    icon: Monitor,
  },
  {
    title: 'Mobile capture',
    description: 'Save reminders, tasks, events, notes, and project actions away from your desk.',
    href: '/help/mobile',
    icon: Smartphone,
  },
  {
    title: 'Browser extension',
    description: 'Right click to save links, pages, and selected text to Ledger.',
    href: '/help/browser-extension',
    icon: Puzzle,
  },
  {
    title: 'Siri Shortcuts',
    description: 'Add reminders, tasks, events, and notes by voice.',
    href: '/help/siri-shortcuts',
    icon: Sparkles,
  },
  {
    title: 'Integrations',
    description: 'Connect the tools you already use to the same workspace context.',
    href: '/help/integrations',
    icon: Plug2,
  },
]

function WorkflowFeatureButton({
  feature,
  active,
  hovered,
  onSelect,
  onHover,
  onLeave,
}: {
  feature: WorkflowFeature
  active: boolean
  hovered: boolean
  onSelect: (id: WorkflowFeatureId) => void
  onHover: (id: WorkflowFeatureId) => void
  onLeave: () => void
}) {
  const Icon = feature.icon

  return (
    <button
      type="button"
      onClick={() => {
        onLeave()
        onSelect(feature.id)
      }}
      onMouseEnter={() => {
        if (!active) onHover(feature.id)
      }}
      onMouseLeave={() => {
        if (!active) onLeave()
      }}
      aria-pressed={active}
      data-active={active ? 'true' : 'false'}
      className={`group relative flex w-full gap-3 rounded-[18px] border px-2.5 py-3.5 text-left transition-[background-color,border-color] duration-120 ease-out ${
        active ? 'items-start' : 'items-center'
      } ${
        active
          ? 'border-transparent bg-transparent hover:border-transparent hover:bg-transparent'
          : hovered
            ? 'border-(--ledger-header-border) bg-(--ledger-header-pill)'
            : 'border-transparent bg-transparent hover:border-(--ledger-header-border) hover:bg-(--ledger-header-pill)'
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-ledger-text transition-colors duration-200 ${
          active
            ? 'border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] text-ledger-text'
            : 'border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] text-ledger-text-muted group-hover:border-(--ledger-header-border) group-hover:text-ledger-accent'
        }`}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
      </span>
      <div className={`min-w-0 flex-1 ${active ? 'pt-0.5' : 'self-center translate-y-[1px]'}`}>
        <div
          className={`text-[15px] tracking-[-0.03em] sm:text-[16px] ${
            active ? 'font-semibold text-ledger-text' : 'font-medium text-ledger-text-muted group-hover:text-ledger-text'
          }`}
        >
          {feature.label}
        </div>
        <div
          className={`grid overflow-hidden transition-[max-height,opacity,margin-top] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            active ? 'mt-0.5 max-h-10 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="min-h-0 max-w-xl overflow-hidden text-[12px] leading-5 text-ledger-text-muted sm:text-[13px]">
            {feature.subtitle}
          </p>
        </div>
      </div>
    </button>
  )
}

function WorkflowStageShell({ feature }: { feature: WorkflowFeature }) {
  const toneClass =
    feature.id === 'capture'
      ? 'bg-[rgba(255,122,89,0.08)]'
      : feature.id === 'organize'
        ? 'bg-[rgba(184,174,160,0.16)]'
        : feature.id === 'act'
          ? 'bg-[rgba(199,186,168,0.16)]'
          : 'bg-[rgba(188,180,169,0.18)]'

  return (
    <div key={feature.id} className="workflow-panel-enter h-full w-full">
      <div className={`h-full min-h-[560px] w-full rounded-r-[28px] rounded-l-none ${toneClass}`} />
    </div>
  )
}

export function HomepageWorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeFeature, setActiveFeature] = useState<WorkflowFeatureId>('capture')
  const [hoveredFeature, setHoveredFeature] = useState<WorkflowFeatureId | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        sectionEl.querySelectorAll<HTMLElement>('[data-reveal-workflow]').forEach((el) => {
          el.classList.add('is-visible')
        })
        observer.disconnect()
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [])

  const currentFeature = useMemo(
    () => workflowFeatures.find((feature) => feature.id === activeFeature) ?? workflowFeatures[0],
    [activeFeature],
  )

  return (
    <section
      ref={sectionRef}
      aria-label="How Ledger works"
      className="homepage-workflow relative z-20 overflow-x-clip border-y border-(--ledger-border-subtle) bg-[linear-gradient(180deg,var(--ledger-background-muted)_0%,var(--ledger-bg)_100%)] px-6 py-20 sm:px-8 sm:py-24 xl:-mt-26"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div data-reveal-workflow className="feature-reveal reveal-up max-w-4xl" style={{ transitionDelay: '70ms' }}>
          <h2 className="mt-4 text-[44px] font-medium leading-[1.02] tracking-[-0.055em] text-ledger-text sm:text-[64px] lg:text-[68px]">
            Everything lands where it belongs.
          </h2>
        </div>

        <div
          data-reveal-workflow
          className="feature-reveal reveal-up mt-10 overflow-hidden rounded-[36px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) shadow-(--ledger-shadow-soft)"
          style={{ transitionDelay: '150ms' }}
        >
          <div className="grid items-stretch gap-0 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
            <div className="flex h-full flex-col justify-start border-b border-(--ledger-border-subtle) p-6 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="max-w-[28ch]">
                <p className="text-[12px] font-medium tracking-[-0.01em] text-ledger-text-muted">Ledger workflow</p>
                <h3 className="mt-3 text-[clamp(1rem,1.25vw,1.25rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ledger-text">
                  Your workspace, always within reach.
                </h3>
              </div>

              <a
                href="/download"
                className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ledger-accent text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-colors duration-200 hover:bg-ledger-accent-hover"
                aria-label="Download Ledger"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </a>

              <div className="mt-auto pt-4">
                {workflowFeatures.map((feature, index) => {
                  const isActive = activeFeature === feature.id
                  const isHovered = hoveredFeature === feature.id
                  const nextIsHovered = hoveredFeature === workflowFeatures[index + 1]?.id

                  return (
                    <div
                      key={feature.id}
                      className={`group/row border-b transition-colors duration-120 ease-out last:border-b-0 ${
                        nextIsHovered
                          ? 'border-transparent'
                          : isActive
                            ? 'border-(--ledger-border-subtle)'
                            : 'border-(--ledger-border-subtle) hover:border-transparent'
                      }`}
                    >
                      <WorkflowFeatureButton
                        feature={feature}
                        active={isActive}
                        hovered={isHovered}
                        onSelect={setActiveFeature}
                        onHover={setHoveredFeature}
                        onLeave={() => setHoveredFeature(null)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex h-full min-h-[560px] p-0">
              <WorkflowStageShell feature={currentFeature} />
            </div>
          </div>
        </div>

        <div
          data-reveal-workflow
          className="feature-reveal reveal-up mt-5 grid gap-3 sm:gap-3.5 xl:grid-cols-5"
          style={{ transitionDelay: '260ms' }}
        >
          {ecosystemCards.map((card, index) => {
            const Icon = card.icon

            return (
              <a
                key={card.title}
                href={card.href}
                className="group h-full rounded-[22px] border border-(--ledger-border-subtle) bg-(--ledger-surface-card) p-3 transition-[background-color,border-color] duration-120 ease-out hover:border-(--ledger-header-border) hover:bg-(--ledger-header-pill) sm:p-3.5 xl:rounded-3xl xl:p-4"
                style={{ transitionDelay: `${300 + index * 40}ms` }}
              >
                <div className="flex items-start gap-3 xl:hidden">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-(--ledger-border-subtle) bg-(--ledger-surface-card) text-ledger-text transition-colors duration-120 ease-out group-hover:border-(--ledger-header-border) sm:h-10 sm:w-10">
                    <Icon className="h-4 w-4 text-ledger-text transition-colors duration-120 ease-out group-hover:text-ledger-accent sm:h-4.5 sm:w-4.5" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold tracking-[-0.03em] text-ledger-text transition-colors duration-200 ease-out group-hover:text-ledger-text sm:text-[16px] xl:text-[17px]">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-5 text-ledger-text-muted sm:text-[13px] sm:leading-6 xl:text-[14px]">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="hidden xl:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-(--ledger-border-subtle) bg-(--ledger-surface-card) text-ledger-text transition-colors duration-120 ease-out group-hover:border-(--ledger-header-border)">
                    <Icon className="h-4.5 w-4.5 text-ledger-text transition-colors duration-120 ease-out group-hover:text-ledger-accent" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.03em] text-ledger-text transition-colors duration-200 ease-out group-hover:text-ledger-text">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-6 text-ledger-text-muted">{card.description}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
