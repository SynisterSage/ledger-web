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

const captureDesktopFrames = Array.from(
  { length: 7 },
  (_, index) => `/assets/workflowsection/capture/capturedesktop${index + 1}_4x.webp`,
)

const captureMobileFrames = Array.from(
  { length: 7 },
  (_, index) => `/assets/workflowsection/capture/capturemob${index + 1}_4x.webp`,
)

const captureFrameSets = [captureDesktopFrames, captureMobileFrames]

const ecosystemCards: EcosystemCard[] = [
  {
    title: 'Desktop app',
    description: 'Float, dock, and keep Ledger beside your work.',
    href: '/sidebar',
    icon: Monitor,
  },
  {
    title: 'Mobile app',
    description: 'Capture, check Today, and review notifications away from your desk.',
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
    title: 'Shortcuts',
    description: 'Add reminders, tasks, and notes by voice.',
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

function useStopMotionFrame(frameSets: string[][], frameDuration = 1300) {
  const frameIndexRef = useRef(0)
  const intervalRef = useRef<number | null>(null)
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    frameSets.flat().forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [frameSets])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    intervalRef.current = window.setInterval(() => {
      frameIndexRef.current = (frameIndexRef.current + 1) % frameSets[0].length
      setFrameIndex(frameIndexRef.current)
    }, frameDuration)

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [frameDuration, frameSets])

  return frameIndex
}

function CaptureWorkflowVisual({
  className,
  imageClassName = 'object-cover object-center',
}: {
  className: string
  imageClassName?: string
}) {
  const frameIndex = useStopMotionFrame(captureFrameSets)

  return (
    <div className={`workflow-panel-enter relative isolate overflow-hidden bg-[rgba(255,122,89,0.08)] ${className}`}>
      <picture className="absolute inset-0 block overflow-hidden rounded-[inherit]">
        <source media="(min-width: 640px)" srcSet={captureDesktopFrames[frameIndex]} />
        <img
          src={captureMobileFrames[frameIndex]}
          alt=""
          aria-hidden="true"
          className={`h-full w-full rounded-[inherit] ${imageClassName}`}
        />
      </picture>
    </div>
  )
}

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
            : 'border-(--ledger-border-subtle) bg-[rgba(247,242,234,0.04)] text-ledger-text-muted'
        }`}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
      </span>
      <div className={`min-w-0 flex-1 ${active ? 'pt-0.5' : 'self-center'}`}>
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
  if (feature.id === 'capture') {
    return <CaptureWorkflowVisual className="h-full min-h-[560px] w-full rounded-r-[28px] rounded-l-none" />
  }

  const toneClass =
    feature.id === 'organize'
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

function WorkflowStageFrame({
  feature,
  rounded = false,
  mobileFullBleed = false,
}: {
  feature: WorkflowFeature
  rounded?: boolean
  mobileFullBleed?: boolean
}) {
  if (feature.id === 'capture') {
    return (
      <CaptureWorkflowVisual
        className={`h-full min-h-[430px] w-full sm:min-h-[500px] ${
          mobileFullBleed ? 'rounded-none' : rounded ? 'rounded-[28px]' : 'rounded-r-[28px] rounded-l-none'
        }`}
        imageClassName="object-cover object-center"
      />
    )
  }

  const toneClass =
    feature.id === 'organize'
      ? 'bg-[rgba(184,174,160,0.16)]'
      : feature.id === 'act'
        ? 'bg-[rgba(199,186,168,0.16)]'
          : 'bg-[rgba(188,180,169,0.18)]'

  return (
    <div key={feature.id} className="workflow-panel-enter h-full w-full">
      <div
        className={`h-full min-h-[460px] w-full sm:min-h-[500px] ${
          mobileFullBleed ? 'rounded-none' : rounded ? 'rounded-[28px]' : 'rounded-r-[28px] rounded-l-none'
        } ${toneClass}`}
      />
    </div>
  )
}

export function HomepageWorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
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

  useEffect(() => {
    const carouselEl = carouselRef.current
    if (!carouselEl) return

    const slides = Array.from(carouselEl.querySelectorAll<HTMLElement>('[data-workflow-slide]'))
    if (!slides.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) return
        const id = visibleEntry.target.getAttribute('data-workflow-slide') as WorkflowFeatureId | null
        if (id) setActiveFeature(id)
      },
      {
        root: carouselEl,
        threshold: 0.65,
      },
    )

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  const currentFeature = useMemo(
    () => workflowFeatures.find((feature) => feature.id === activeFeature) ?? workflowFeatures[0],
    [activeFeature],
  )

  const activeFeatureIndex = workflowFeatures.findIndex((feature) => feature.id === activeFeature)
  const scrollToFeature = (index: number) => {
    const slide = slideRefs.current[index]
    if (!slide) return
    slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }
  const moveCarousel = (direction: -1 | 1) => {
    const nextIndex = Math.max(0, Math.min(workflowFeatures.length - 1, activeFeatureIndex + direction))
    setActiveFeature(workflowFeatures[nextIndex]?.id ?? workflowFeatures[0].id)
    scrollToFeature(nextIndex)
  }

  return (
    <section
      ref={sectionRef}
      aria-label="How Ledger works"
      className="homepage-workflow relative z-20 overflow-x-clip bg-[var(--ledger-surface)] px-6 pt-10 pb-8 sm:px-8 sm:pt-14 sm:pb-10 -mt-20 sm:-mt-22 lg:-mt-26 xl:-mt-26"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div data-reveal-workflow className="feature-reveal reveal-up max-w-4xl" style={{ transitionDelay: '70ms' }}>
          <h2 className="mt-2 text-[44px] font-medium leading-[1.02] tracking-[-0.055em] text-ledger-text sm:text-[64px] lg:text-[68px]">
            Everything lands where it belongs.
          </h2>
        </div>

        <div
          data-reveal-workflow
          className="feature-reveal reveal-up mt-6 overflow-hidden rounded-[24px] bg-(--ledger-surface-card) sm:rounded-[28px] xl:rounded-[36px]"
          style={{ transitionDelay: '150ms' }}
        >
          <div className="hidden items-stretch gap-0 lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
            <div className="flex h-full flex-col justify-start border-b border-(--ledger-border-subtle) p-6 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="max-w-[34ch]">
                <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Ledger workflow</p>
                <h3 className="mt-3 text-[clamp(1.15rem,1.45vw,1.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text xl:whitespace-nowrap">
                  Your workspace, always within reach.
                </h3>
              </div>

              <a
                href="/download"
                className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ledger-accent text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
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

          <div className="relative overflow-hidden lg:hidden">
            <div className="sticky top-0 z-20 border-b border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-[28ch]">
                  <p className="text-[13px] font-medium tracking-[-0.01em] text-ledger-text-muted">Ledger workflow</p>
                  <h3 className="mt-3 text-[clamp(1.15rem,1.45vw,1.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ledger-text">
                    Your workspace, always within reach.
                  </h3>
                </div>
                <a
                  href="/download"
                  className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger-accent text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
                  aria-label="Download Ledger"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </a>
              </div>
            </div>
            <div className="relative pt-0">
              <button
                type="button"
                aria-label="Previous workflow"
                onClick={() => moveCarousel(-1)}
                className="absolute left-2 top-[calc(50%-1rem)] z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) text-ledger-text shadow-[0_10px_20px_rgba(23,21,18,0.08)] transition-colors duration-200 hover:bg-(--ledger-header-pill)"
              >
                <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                aria-label="Next workflow"
                onClick={() => moveCarousel(1)}
                className="absolute right-2 top-[calc(50%-1rem)] z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) text-ledger-text shadow-[0_10px_20px_rgba(23,21,18,0.08)] transition-colors duration-200 hover:bg-(--ledger-header-pill)"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <div
                ref={carouselRef}
                className="grid grid-flow-col auto-cols-[100%] snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {workflowFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    ref={(el) => {
                      slideRefs.current[index] = el
                    }}
                    data-workflow-slide={feature.id}
                    className="snap-start"
                  >
                    <WorkflowStageFrame feature={feature} mobileFullBleed />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-20 w-full border-t border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-4 py-3 sm:px-5 sm:py-4">
              <div className="max-w-[30ch]">
                <h4 className="text-[15px] font-semibold tracking-[-0.03em] text-ledger-text sm:text-[16px]">
                  {currentFeature.label}
                </h4>
                <p className="mt-1 text-[13px] leading-5 text-ledger-text-muted sm:text-[14px] sm:leading-6">
                  {currentFeature.subtitle}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {workflowFeatures.map((feature) => {
                  const isActive = feature.id === activeFeature

                  return (
                    <span
                      key={feature.id}
                      aria-hidden="true"
                      className={`h-2 rounded-full transition-all duration-200 ease-out ${
                        isActive ? 'w-4 bg-ledger-text-muted' : 'w-2 bg-(--ledger-border-subtle)'
                      }`}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          data-reveal-workflow
          className="feature-reveal reveal-up mt-3 grid gap-3 sm:gap-3.5 xl:grid-cols-5"
          style={{ transitionDelay: '260ms' }}
        >
          {ecosystemCards.map((card, index) => {
            const Icon = card.icon

            return (
              <a
                key={card.title}
                href={card.href}
                className="group h-full rounded-[22px] bg-(--ledger-surface-card) p-3 transition-[box-shadow] duration-180 ease-out hover:shadow-[0_10px_28px_rgba(23,21,18,0.08)] sm:p-3.5 xl:rounded-3xl xl:p-4"
                style={{ transitionDelay: `${300 + index * 40}ms` }}
              >
                <div className="flex items-center gap-3 xl:hidden">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-(--ledger-border-subtle) bg-(--ledger-surface-card) text-ledger-text sm:h-10 sm:w-10">
                    <Icon className="h-4 w-4 text-ledger-text sm:h-4.5 sm:w-4.5" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold leading-[1.08] tracking-[-0.03em] text-ledger-text transition-colors duration-200 ease-out group-hover:text-ledger-text sm:text-[16px] xl:text-[17px]">
                      {card.title}
                    </h3>
                    <p className="mt-1 hidden text-[12px] leading-5 text-ledger-text-muted xl:block xl:text-[14px]">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="hidden xl:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-(--ledger-border-subtle) bg-(--ledger-surface-card) text-ledger-text transition-shadow duration-180 ease-out group-hover:shadow-[0_8px_18px_rgba(23,21,18,0.05)]">
                    <Icon className="h-4.5 w-4.5 text-ledger-text" strokeWidth={1.8} />
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
