import type { ReactNode } from 'react'

type ActionButtonProps = {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

export function ActionButton({ href, children, className = '', variant = 'primary' }: ActionButtonProps) {
  const variantClassName =
    variant === 'secondary'
      ? 'bg-(--ledger-surface-card) text-ledger-text ring-1 ring-inset ring-ledger-border hover:bg-(--ledger-surface-muted) hover:shadow-none'
      : 'bg-ledger-accent text-white hover:bg-ledger-accent-hover'

  return (
    <a
      href={href}
      className={`inline-flex h-12 min-w-39 w-fit items-center justify-center rounded-full px-7 text-[16px] font-semibold leading-none transition-colors duration-200 ${variantClassName} ${className}`}
    >
      {children}
    </a>
  )
}
