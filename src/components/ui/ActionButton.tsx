import type { ReactNode } from 'react'

type ActionButtonProps = {
  href: string
  children: ReactNode
  className?: string
}

export function ActionButton({ href, children, className = '' }: ActionButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex w-fit items-center justify-center rounded-full bg-ledger-accent px-8 py-3 text-sm font-semibold leading-none text-white transition-all duration-200 hover:-translate-y-px hover:bg-ledger-accent-hover hover:shadow-md ${className}`}
    >
      {children}
    </a>
  )
}
