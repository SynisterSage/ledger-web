import type { CSSProperties } from 'react'
import '../../styles/feature-directory.css'

export type FeatureArtwork = {
  label: string
  alt: string
  src?: string
  mobileSrc?: string
  aspectRatio?: string
  objectFit?: CSSProperties['objectFit']
  objectPosition?: CSSProperties['objectPosition']
}

type FeatureArtworkFrameProps = FeatureArtwork & {
  className?: string
}

/** Image-ready artwork handoff surface for the feature directory. */
export function FeatureArtworkFrame({
  label,
  alt,
  src,
  mobileSrc,
  aspectRatio = '16 / 9',
  objectFit = 'cover',
  objectPosition = 'center',
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
      {src ? (
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
        <span className="feature-artwork-frame__placeholder">{label}</span>
      )}
    </div>
  )
}
