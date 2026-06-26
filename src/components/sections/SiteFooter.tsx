const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/about' },
      { label: 'Help', href: '/help' },
      { label: 'Download', href: '/download' },
      { label: 'Changelog', href: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Getting Started', href: '/about' },
      { label: 'Shortcuts', href: '/about' },
      { label: 'Contact', href: '/help/contact-support' },
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
    <footer className="overflow-x-clip border-t border-(--ledger-border-subtle) bg-ledger-bg px-6 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
          <div className="shrink-0">
            <img src="/assets/logos/logo.svg" alt="Ledger" className="h-8 w-auto" />
            <p className="mt-2 text-sm font-medium text-(--ledger-text-primary)">Live a little simpler</p>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:justify-end lg:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold text-(--ledger-text-primary)">{column.title}</h3>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-xs text-(--ledger-text-secondary) transition-colors hover:text-(--ledger-text-primary)">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-start border-t border-(--ledger-border-subtle) pt-4 md:justify-end">
          <p className="text-left text-xs text-(--ledger-text-secondary) md:text-right">Ledger 2026.</p>
        </div>
      </div>
    </footer>
  )
}
