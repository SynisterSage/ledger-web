import { useEffect, useRef, useState } from 'react'

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
type TypewriterPhase = 'typing' | 'holding' | 'deleting' | 'advancing'

function HeroTypewriter() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return rotatingWords[0]
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? rotatingWords[0] : ''
  })
  const [phase, setPhase] = useState<TypewriterPhase>('typing')

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const currentWord = rotatingWords[wordIndex]

    const timer = window.setTimeout(() => {
      if (phase === 'typing') {
        const nextText = currentWord.slice(0, text.length + 1)
        setText(nextText)
        if (nextText === currentWord) {
          setPhase('holding')
        }
        return
      }

      if (phase === 'holding') {
        setPhase('deleting')
        return
      }

      if (phase === 'deleting') {
        const nextText = currentWord.slice(0, Math.max(0, text.length - 1))
        setText(nextText)
        if (nextText.length === 0) {
          setPhase('advancing')
        }
        return
      }

      if (phase === 'advancing') {
        setWordIndex((value) => (value + 1) % rotatingWords.length)
        setPhase('typing')
      }
    }, phase === 'holding' ? 2200 : phase === 'advancing' ? 280 : phase === 'deleting' ? 90 : 120)

    return () => window.clearTimeout(timer)
  }, [phase, text, wordIndex])

  return (
    <span
      className="hero-typewriter relative top-[-0.12em] mx-auto inline-grid min-h-[1em] w-fit align-middle leading-none sm:min-w-[15ch]"
    >
      <span aria-hidden="true" className="invisible select-none">
        freelance work
      </span>
      <span className="absolute inset-0 inline-flex items-center justify-center whitespace-nowrap text-ledger-accent">
        <span>{text}</span>
        <span aria-hidden="true" className="hero-typewriter-cursor ml-1" />
      </span>
    </span>
  )
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <section className="relative overflow-x-clip overflow-y-visible border-b border-ledger-border/80 px-5 pb-12 pt-10 sm:px-7 sm:pb-16 sm:pt-18 lg:pb-20 lg:pt-24">
      <div
        aria-hidden="true"
        className="hero-bottom-glow pointer-events-none absolute inset-x-0 bottom-0 z-0 h-104 sm:h-136 lg:h-160"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 z-0 flex w-screen -translate-x-1/2 justify-center sm:top-20 lg:top-24"
      >
        <img
          src="/assets/logos/outline-hero.svg"
          alt=""
          className="hero-outline-float h-auto w-[min(132vw,1620px)] max-w-none opacity-6"
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="hero-enter hero-enter-title text-[58px] font-medium leading-[0.92] tracking-[-0.055em] text-ledger-text sm:text-[84px] lg:text-[108px] xl:text-[124px]">
            A sidebar for your
            <br />
            <HeroTypewriter />
          </h1>
          <p className="hero-enter hero-enter-copy mx-auto mt-0 max-w-2xl text-[18px] leading-[1.24] text-ledger-text sm:text-[20px]">
            Capture notes, tasks, and plans beside the apps you already use, without pulling yourself out of flow.
          </p>
          <div className="hero-enter hero-enter-cta mt-2.5 flex flex-col items-center justify-center gap-2.5 sm:mt-3 sm:flex-row sm:gap-3">
            <a
              href="/download"
              className="inline-flex h-12 min-w-39 items-center justify-center rounded-full bg-ledger-accent px-7 text-[16px] font-semibold leading-none text-white transition hover:bg-ledger-accent-hover"
            >
              Download
            </a>
            <a
              href="/about"
              className="inline-flex h-12 min-w-39 items-center justify-center rounded-full border border-ledger-border bg-(--ledger-surface-card) px-7 text-[16px] font-semibold leading-none text-ledger-text transition hover:bg-ledger-surface-muted"
            >
              See features
            </a>
          </div>
        </div>

        <div className="hero-enter hero-enter-video relative mx-auto mt-7 w-full max-w-6xl sm:mt-8">
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
          <video
            ref={videoRef}
            className="relative z-10 mx-auto aspect-video w-full rounded-[20px] shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
            src="/assets/videos/herovideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          />
          <button
            onClick={togglePlay}
            className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition sm:bottom-8 sm:top-auto"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--ledger-surface-card) 32%, transparent)',
            }}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <svg className="h-6 w-6 fill-(--ledger-text-primary)" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 fill-(--ledger-text-primary)" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
