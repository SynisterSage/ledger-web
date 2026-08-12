import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { FeatureArtworkFrame, type FeatureArtwork } from './FeatureArtworkFrame'

type FeatureCardBase = {
  href?: string
  label: string
  title: string
  description: string
  artwork: FeatureArtwork
  artworkFirst?: boolean
  presentation?: 'overlay' | 'split'
  className?: string
  children?: ReactNode
}

type FeatureCardGridProps = {
  children: ReactNode
  className?: string
}

const cardClassName =
  'feature-directory-card group block min-w-0 overflow-hidden rounded-[var(--ledger-radius-md)] border border-(--ledger-border) bg-ledger-surface-card text-ledger-text-primary transition-colors duration-200 hover:border-(--ledger-header-border) hover:bg-(--ledger-surface-muted) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ledger-accent) focus-visible:ring-offset-2'

export function FeaturedFeatureCard({
  href,
  label,
  title,
  description,
  artwork,
  artworkFirst = false,
  presentation = 'overlay',
  className = '',
  children,
}: FeatureCardBase) {
  const cardContent = presentation === 'overlay' ? (
    <div className="feature-card-overlay">
      <FeatureArtworkFrame {...artwork} className="feature-artwork-frame--featured w-full border-0" />
      <div className="feature-card-overlay__copy">
        <div className="min-w-0">
          <p className="feature-card-overlay__label">{label}</p>
          <h3 className="feature-card-overlay__title">{title}</h3>
          <p className="feature-card-overlay__description">{description}</p>
          {children}
        </div>
        {href ? <span className="feature-card-overlay__arrow"><ArrowUpRight size={16} aria-hidden="true" /></span> : null}
      </div>
    </div>
  ) : (
    <div className={`grid gap-8 p-5 sm:p-7 lg:items-end lg:gap-12 lg:p-8 ${artworkFirst ? 'lg:grid-cols-[minmax(0,1.3fr)_minmax(15rem,0.7fr)]' : 'lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)]'}`}>
      <div className={`min-w-0 ${artworkFirst ? 'lg:order-2' : ''}`}>
        <p className="text-[12px] font-medium tracking-[0.04em] text-(--ledger-text-muted)">{label}</p>
        <h3 className="mt-3 max-w-[18ch] text-[clamp(1.8rem,3.5vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.055em]">{title}</h3>
        <p className="mt-4 max-w-sm text-[14px] leading-6 text-(--ledger-text-secondary)">{description}</p>
        {href ? <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-(--ledger-text-secondary)">
          Explore <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span> : null}
        {children}
      </div>
      <FeatureArtworkFrame {...artwork} className={`w-full ${artworkFirst ? 'lg:order-1' : ''}`} />
    </div>
  )
  return href ? <a href={href} className={`${cardClassName} ${className}`.trim()}>{cardContent}</a> : <article className={`${cardClassName} ${className}`.trim()}>{cardContent}</article>
}

type StandardFeatureCardProps = FeatureCardBase & {
  showArrow?: boolean
}

export function StandardFeatureCard({
  href,
  label,
  title,
  description,
  artwork,
  showArrow = true,
  className = '',
  children,
}: StandardFeatureCardProps) {
  const cardContent = (
    <>
      <FeatureArtworkFrame {...artwork} className="feature-artwork-frame--standard w-full shrink-0" />
      <div className="flex min-w-0 flex-1 items-start justify-between gap-5 p-5 sm:p-6">
        <div className="min-w-0">
          <p className="text-[12px] font-medium tracking-[0.04em] text-(--ledger-text-muted)">{label}</p>
          <h3 className="mt-2 text-[clamp(1.35rem,2.3vw,2rem)] font-medium leading-[1] tracking-[-0.045em]">{title}</h3>
          <p className="mt-3 max-w-md text-[14px] leading-6 text-(--ledger-text-secondary)">{description}</p>
          {children}
        </div>
        {href && showArrow ? <ArrowUpRight size={17} className="mt-0.5 shrink-0 text-(--ledger-text-muted) transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /> : null}
      </div>
    </>
  )
  const standardCardClassName = `${cardClassName} feature-directory-card--standard h-full flex flex-col ${className}`.trim()
  return href ? <a href={href} className={standardCardClassName}>{cardContent}</a> : <article className={standardCardClassName}>{cardContent}</article>
}

/** Flexible grid boundary for full-width, paired, and caller-defined spans. */
export function FeatureCardGrid({ children, className = '' }: FeatureCardGridProps) {
  return <div className={`grid min-w-0 grid-cols-1 items-stretch gap-4 md:grid-cols-2 ${className}`.trim()}>{children}</div>
}
