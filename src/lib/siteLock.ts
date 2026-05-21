const LOCK_VALUES = new Set(['false', '0', 'off', 'no'])

export function isSiteLocked() {
  const value = import.meta.env.VITE_LEDGER_SITE_LOCKED?.trim().toLowerCase()
  return !value || !LOCK_VALUES.has(value)
}