function HeroProductFrame() {
  const previewUrl = import.meta.env.VITE_LEDGER_PREVIEW_URL?.trim()

  return (
    <figure className="hero-product-frame hero-enter hero-enter-artwork" aria-label="Interactive Ledger product preview">
      {previewUrl ? (
        <iframe
          className="hero-product-frame__iframe"
          src={previewUrl}
          title="Ledger product preview"
          loading="lazy"
        />
      ) : (
        <div className="hero-product-frame__placeholder">
          <span>Ledger product preview</span>
        </div>
      )}
    </figure>
  )
}

export function HeroSection() {
  return (
    <section className="hero relative overflow-x-clip bg-[var(--ledger-surface)]">
      <div className="hero__linework" aria-hidden="true">
        <img src="/assets/logos/outline-hero.svg" alt="" />
      </div>

      <div className="hero__shell">
        <div className="hero__copy">
          <h1 className="hero-enter hero-enter-title hero__title">
            Your work,<br />
            <span>beside your work.</span>
          </h1>
          <p className="hero-enter hero-enter-copy hero__description">
            Capture notes, tasks, meetings, and plans without leaving the apps you already use.
          </p>
          <div className="hero-enter hero-enter-cta hero__actions">
            <a href="/download" className="ledger-button hero__primary-action">
              Download Ledger
            </a>
            <a href="/features" className="hero__secondary-action">
              See how it works <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <HeroProductFrame />
      </div>
    </section>
  )
}
