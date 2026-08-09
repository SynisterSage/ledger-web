import { useEffect, useRef, useState } from 'react'

const heroDesktopFrames = Array.from(
  { length: 3 },
  (_, index) => `/assets/hero/herodesktop${index + 1}_4x.webp`,
)

const heroMobileFrames = Array.from(
  { length: 3 },
  (_, index) => `/assets/hero/heromob${index + 1}_4x.webp`,
)

const heroFrameSets = [heroDesktopFrames, heroMobileFrames]

const rotatingWords = [
  'life',
  'work',
  'day',
  'projects',
  'notes',
  'tasks',
  'calendar',
  'workspace',
  'ideas',
  'focus',
  'plans',
  'schedule',
  'reminders',
  'school',
  'internship',
  'job',
  'business',
  'clients',
  'team',
  'classes',
  'meetings',
  'deadlines',
  'brain',
  'workflow',
  'routine',
  'week',
  'goals',
  'side projects',
  'creative work',
  'freelance work',
]
function useHeroFrame(frameDuration = 3200) {
  const frameIndexRef = useRef(0)
  const intervalRef = useRef<number | null>(null)
  const preloadedFramesRef = useRef<HTMLImageElement[]>([])
  const [frameState, setFrameState] = useState({ index: 0, tick: 0 })

  useEffect(() => {
    preloadedFramesRef.current = heroFrameSets.flat().map((src) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
      return img
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    intervalRef.current = window.setInterval(() => {
      frameIndexRef.current = (frameIndexRef.current + 1) % heroDesktopFrames.length
      setFrameState((current) => ({
        index: frameIndexRef.current,
        tick: current.tick + 1,
      }))
    }, frameDuration)

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [frameDuration])

  return frameState
}

function HeroTypewriter() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const timer = window.setInterval(() => {
      setWordIndex((value) => (value + 1) % rotatingWords.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <span
      className="hero-typewriter relative top-[-0.12em] mx-auto inline-grid min-h-[1em] w-fit align-middle leading-none sm:min-w-[15ch]"
      aria-live="polite"
    >
      <span aria-hidden="true" className="invisible select-none">
        freelance work
      </span>
      <span className="absolute inset-0 inline-flex items-center justify-center whitespace-nowrap text-ledger-accent">
        <span key={rotatingWords[wordIndex]} className="hero-word-scale">{rotatingWords[wordIndex]}</span>
      </span>
    </span>
  )
}

function HeroProductVisual() {
  const { index: frameIndex, tick: frameTick } = useHeroFrame()

  return (
    <picture className="relative z-10 block aspect-[39/48] w-full overflow-hidden rounded-[20px] sm:aspect-[9/5]">
      <source media="(min-width: 640px)" srcSet={heroDesktopFrames[frameIndex]} />
      <img
        src={heroMobileFrames[frameIndex]}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        className="hero-frame-spring h-full w-full object-cover object-[center_18%] sm:object-center"
        style={{ animationName: `heroFrameSpring${frameTick % 2}` }}
      />
    </picture>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-x-clip overflow-y-visible border-b border-ledger-border/80 bg-[var(--ledger-surface)] px-5 pb-8 pt-10 sm:px-7 sm:pb-12 sm:pt-18 lg:pb-16 lg:pt-24">
      <div
        aria-hidden="true"
        className="hero-bottom-glow pointer-events-none absolute inset-x-0 bottom-0 z-0 h-104 sm:h-136 lg:h-160"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 z-0 flex w-screen -translate-x-1/2 justify-center sm:top-28 lg:top-32"
      >
        <img
          src="/assets/logos/outline-hero.svg"
          alt=""
          className="hero-outline-float h-auto w-[min(128vw,1560px)] max-w-none opacity-[0.08]"
          style={{ transformOrigin: 'center center', backfaceVisibility: 'hidden' }}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="hero-enter hero-enter-title text-[58px] font-medium leading-[0.92] tracking-[-0.055em] text-ledger-text sm:text-[84px] lg:text-[108px] xl:text-[124px]">
            A sidebar for your
            <br />
            <HeroTypewriter />
          </h1>
          <p className="hero-enter hero-enter-copy mx-auto mt-0 max-w-[34ch] text-[18px] leading-[1.24] text-ledger-text sm:max-w-2xl sm:text-[20px]">
            <span className="sm:hidden">Capture what matters without leaving your flow.</span>
            <span className="hidden sm:inline">
              Capture notes, tasks, and plans beside the apps you already use, without pulling yourself out of flow.
            </span>
          </p>
          <div className="hero-enter hero-enter-cta mt-2.5 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:mt-3 sm:gap-3">
            <a
              href="/download"
              className="ledger-button h-10 w-auto min-w-0 whitespace-nowrap bg-ledger-accent px-5 text-[14px] font-semibold text-white transition hover:bg-ledger-accent-hover sm:h-12 sm:min-w-39 sm:px-7 sm:text-[16px]"
            >
              Download
            </a>
            <a
              href="/features"
              className="ledger-button h-10 w-auto min-w-0 whitespace-nowrap border border-ledger-border bg-(--ledger-surface-card) px-5 text-[14px] font-semibold text-ledger-text transition hover:bg-ledger-surface-muted sm:h-12 sm:min-w-39 sm:px-7 sm:text-[16px]"
            >
              See features
            </a>
          </div>
        </div>

        <div className="hero-enter hero-enter-video relative mx-auto mt-5 w-full max-w-6xl sm:mt-6">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 hidden md:block">
            <div className="hero-ornament hero-ornament--left pointer-events-auto absolute -left-19 top-[60%] w-[clamp(3.3rem,4.4vw,4.75rem)] rotate-[-16deg] opacity-80 lg:-left-25 lg:top-[63%] lg:w-[clamp(3.8rem,5.1vw,5.6rem)]">
              <img src="/assets/images/hero-left.svg" alt="" className="block h-full w-full" />
            </div>
            <div className="hero-ornament hero-ornament--right pointer-events-auto absolute -right-19 top-[8%] w-[clamp(3.3rem,4.4vw,4.75rem)] rotate-10 opacity-80 lg:-right-25 lg:top-[5%] lg:w-[clamp(3.8rem,5.1vw,5.6rem)]">
              <img src="/assets/images/hero-right.svg" alt="" className="block h-full w-full" />
            </div>
            <div className="hero-ornament hero-ornament--frame10 pointer-events-auto absolute -left-25 top-[24%] w-[clamp(3rem,4.05vw,4.4rem)] -rotate-10 opacity-78 lg:-left-31 lg:top-[21%] lg:w-[clamp(3.55rem,4.75vw,5.2rem)]">
              <img src="/assets/images/Frame 10.svg" alt="" className="block h-full w-full" />
            </div>
            <div className="hero-ornament hero-ornament--frame11 pointer-events-auto absolute -right-25 top-[79%] w-[clamp(3.05rem,4.1vw,4.45rem)] rotate-14 opacity-78 lg:-right-31 lg:top-[81%] lg:w-[clamp(3.6rem,4.85vw,5.25rem)]">
              <img src="/assets/images/Frame 11.svg" alt="" className="block h-full w-full" />
            </div>
          </div>
          <HeroProductVisual />
        </div>
      </div>
    </section>
  )
}
