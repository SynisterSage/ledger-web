type SiteHeaderProps = {
  currentPath?: '/' | '/download' | '/about'
}

const nav = [
  { href: '/about', label: 'Features' },
  { href: '/about', label: 'Guide' },
]

export function SiteHeader({ currentPath = '/' }: SiteHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <a href="/" className="flex items-center gap-2 sm:gap-3">
            <img src="/assets/logos/logo.svg" alt="" className="h-8 w-auto sm:h-9" />
            <span className="translate-y-0.5 text-base font-medium text-gray-900 sm:text-lg">Ledger</span>
          </a>

          <nav className="flex items-center gap-6 sm:gap-12">
            {nav.map((item) => {
              const isActive = item.href === currentPath
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-medium sm:text-sm ${
                    isActive ? 'text-gray-900' : 'text-gray-900 hover:text-gray-600'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
            <a
              href="/download"
              className="rounded-full bg-ledger-accent px-5 py-2 text-xs font-semibold text-white hover:opacity-90 sm:px-8 sm:py-2.5 sm:text-sm"
            >
              Download
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
