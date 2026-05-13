const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/about' },
      { label: 'Guide', href: '/about' },
      { label: 'Download', href: '/download' },
      { label: 'Changelog', href: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Getting Started', href: '/about' },
      { label: 'Shortcuts', href: '/about' },
      { label: 'Contact', href: '/about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/about' },
      { label: 'Terms', href: '/about' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 sm:px-8">
      <div className="mx-auto w-full max-w-290">
        <div className="flex items-start justify-between gap-12">
          <div className="shrink-0">
            <img src="/assets/logos/logo.svg" alt="Ledger" className="h-8 w-auto brightness-0" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              Live a little simpler
            </p>
          </div>

          <div className="flex gap-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold text-gray-900">{column.title}</h3>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs text-gray-600 transition-colors hover:text-gray-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs text-gray-600">Ledger 2026.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
