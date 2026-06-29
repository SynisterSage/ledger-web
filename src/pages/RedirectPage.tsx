import { useEffect } from 'react'

export function RedirectPage({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return null
}
