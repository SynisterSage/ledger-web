import { useRef, useState } from 'react'

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
    <section className="relative overflow-hidden border-b border-ledger-border/80 px-5 pb-12 pt-16 sm:px-7 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-32">
      <div className="relative mx-auto w-full max-w-260">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="hero-enter hero-enter-title text-[42px] font-medium leading-[1.08] tracking-[-0.03em] text-ledger-text sm:text-[52px]">
            Live a little <span className="text-ledger-accent">simpler</span>
          </h1>
          <p className="hero-enter hero-enter-copy mt-2 text-[18px] leading-[1.15] text-ledger-text">Daily Accountability and Planning.</p>
          <a
            href="/download"
            className="hero-enter hero-enter-cta mt-6 inline-flex h-12 min-w-39 items-center justify-center rounded-full bg-ledger-accent px-7 text-[16px] font-semibold leading-none text-white! transition hover:bg-ledger-accent-hover"
          >
            Download
          </a>
        </div>

        <div className="hero-enter hero-enter-video relative mx-auto mt-12 w-full max-w-245 sm:mt-16">
          <video
            ref={videoRef}
            className="mx-auto w-full rounded-[20px] shadow-[0_20px_32px_rgba(17,24,39,0.2)] aspect-video"
            src="/assets/videos/herovideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          />
          <button
            onClick={togglePlay}
            className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm transition hover:bg-white/40 sm:bottom-8 sm:top-auto"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
