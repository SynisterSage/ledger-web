const DEFAULT_RETURN_TO = '/app'
const MAX_RETURN_TO_LENGTH = 2048
const CANONICAL_ORIGIN = 'https://ledgerworkspace.com'
const SENSITIVE_QUERY_KEY = /^(access_token|refresh_token|token|invite|code|state|error|error_description)$/i

/** Keep post-auth navigation inside the Ledger product surface. */
export function sanitizeReturnTo(value: string | null | undefined): string {
  if (!value || value.length > MAX_RETURN_TO_LENGTH) return DEFAULT_RETURN_TO
  const candidate = value.trim()
  if (!candidate || candidate.includes('\\') || /%5c/i.test(candidate) || !candidate.startsWith('/') || candidate.includes('#') || candidate.startsWith('//') || candidate.startsWith('/\\')) return DEFAULT_RETURN_TO
  let parsed: URL
  try { parsed = new URL(candidate, CANONICAL_ORIGIN) } catch { return DEFAULT_RETURN_TO }
  if (parsed.origin !== CANONICAL_ORIGIN || !parsed.pathname.startsWith('/app')) return DEFAULT_RETURN_TO
  for (const key of parsed.searchParams.keys()) if (SENSITIVE_QUERY_KEY.test(key)) return DEFAULT_RETURN_TO
  return parsed.pathname === '/app' || parsed.pathname.startsWith('/app/') ? `${parsed.pathname}${parsed.search}` : DEFAULT_RETURN_TO
}

export function getReturnTo(): string {
  return sanitizeReturnTo(new URLSearchParams(window.location.search).get('returnTo'))
}
