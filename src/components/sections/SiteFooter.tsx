const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
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
    <footer className="overflow-x-clip border-t border-(--ledger-border-subtle) bg-ledger-bg px-6 py-12 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-start lg:gap-12">
          <div className="max-w-xs">
            <img src="/assets/logos/logo.svg" alt="Ledger" className="h-8 w-auto" />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-12">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[13px] font-semibold tracking-[-0.02em] text-(--ledger-text-primary)">{column.title}</h3>
                <ul className="mt-3 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] leading-5 text-(--ledger-text-secondary) transition-colors hover:text-(--ledger-text-primary)"
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
