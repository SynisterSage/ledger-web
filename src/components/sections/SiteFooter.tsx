const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Sidebar', href: '/features/sidebar' },
      { label: 'Capture', href: '/features/capture' },
      { label: 'Notes', href: '/features/notes' },
      { label: 'Projects', href: '/features/projects' },
      { label: 'Calendar', href: '/features/calendar' },
      { label: 'Connected work', href: '/features/connected-work' },
      { label: 'Workspaces', href: '/features/workspaces' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Platforms',
    links: [
      { label: 'Desktop', href: '/platforms/desktop' },
      { label: 'Web', href: '/platforms/web' },
      { label: 'Mobile', href: '/platforms/mobile' },
      { label: 'Browser extension', href: '/platforms/browser-extension' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Download', href: '/download' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Getting Started', href: '/help/getting-started' },
      { label: 'Help', href: '/help' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Shortcuts', href: '/help/shortcuts' },
      { label: 'Contact', href: '/help/contact' },
      { label: 'Workspaces', href: '/help/workspaces' },
      { label: 'Notes', href: '/help/notes' },
      { label: 'Today', href: '/help/today' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="overflow-x-clip border-t border-(--ledger-border-subtle) bg-ledger-bg px-6 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="site-footer__inner mx-auto w-full">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-start lg:gap-12">
          <div className="max-w-xs">
            <a href="/" className="inline-flex items-center gap-2 text-(--ledger-text-primary)" aria-label="Ledger home">
              <img src="/assets/logos/logo.svg" alt="" className="h-6 w-auto" />
              <span className="translate-y-[2px] text-[20px] font-medium leading-none tracking-[-0.045em]">Ledger</span>
            </a>
            <p className="mt-6 max-w-[18ch] text-[14px] leading-6 text-(--ledger-text-muted)">
              A calm workspace companion for the work you keep close.
            </p>
            <p className="mt-8 text-[13px] text-(--ledger-text-muted)">© 2026 Ledger</p>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-12">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[14px] font-medium tracking-[-0.02em] text-(--ledger-text-muted)">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[15px] font-medium leading-5 text-(--ledger-text-primary) transition-colors hover:text-(--ledger-accent)"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
