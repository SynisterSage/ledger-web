import type { ReactNode } from 'react'

type MediaFrameProps = {
  label: string
  recommendation: string
  className?: string
  children?: ReactNode
  ariaLabel?: string
}

/** A quiet handoff surface for product artwork, screenshots, images, or video. */
export function MediaFrame({ label, recommendation, className = '', children, ariaLabel }: MediaFrameProps) {
  return (
    <div
      className={`feature-media-frame ${className}`}
      role={children ? undefined : 'img'}
      aria-label={children ? undefined : ariaLabel ?? `${label}. ${recommendation}`}
    >
      {children ?? (
        <div className="feature-media-frame__placeholder" aria-hidden="true">
          <span className="feature-media-frame__label">{label}</span>
          <span className="feature-media-frame__recommendation">{recommendation}</span>
        </div>
      )}
    </div>
  )
}
