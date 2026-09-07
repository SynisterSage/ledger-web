import type { CSSProperties, ReactNode } from 'react'
import '../../styles/feature-directory.css'
import '../../styles/feature-media.css'

export type FeatureArtwork = {
  label: string
  dimensions?: string
  alt: string
  src?: string
  mobileSrc?: string
  aspectRatio?: string
  objectFit?: CSSProperties['objectFit']
  objectPosition?: CSSProperties['objectPosition']
  visual?: ReactNode
}

type FeatureArtworkFrameProps = FeatureArtwork & {
  className?: string
}

/** Image-ready artwork handoff surface for the feature directory. */
export function FeatureArtworkFrame({
  label,
  dimensions,
  alt,
  src,
  mobileSrc,
  aspectRatio = '16 / 9',
  objectFit = 'cover',
  objectPosition = 'center',
  visual,
  className = '',
}: FeatureArtworkFrameProps) {
  const style = { '--feature-artwork-aspect-ratio': aspectRatio } as CSSProperties

  return (
    <div
      className={`feature-artwork-frame ${className}`.trim()}
      style={style}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : alt || label}
    >
      {visual ? visual : src ? (
        <picture>
          {mobileSrc ? <source media="(max-width: 700px)" srcSet={mobileSrc} /> : null}
          <img
            src={src}
            alt={alt}
            className="feature-artwork-frame__image"
            style={{ objectFit, objectPosition }}
          />
        </picture>
      ) : (
        <div className="feature-artwork-frame__placeholder">
          <span>{label}</span>
          {dimensions ? <span className="feature-artwork-frame__dimensions">{dimensions}</span> : null}
        </div>
      )}
    </div>
  )
}
