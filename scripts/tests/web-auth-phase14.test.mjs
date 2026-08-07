import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = (path) => fs.readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

test('public login uses the canonical Ledger Supabase session configuration', () => {
  const source = read('src/lib/supabase.ts')
  assert.match(source, /storageKey: 'ledger-auth'/)
  assert.match(source, /persistSession: true/)
  assert.match(source, /autoRefreshToken: true/)
  assert.match(source, /detectSessionInUrl: true/)
  assert.doesNotMatch(source, /ledger-web-auth-session/)
})

test('public login performs real password and signup auth and restores returnTo', () => {
  const login = read('src/pages/LoginPage.tsx')
  const auth = read('src/lib/auth.ts')
  assert.match(auth, /signInWithPassword/)
  assert.match(auth, /supabase\.auth\.signUp/)
  assert.match(login, /productAuth\.signIn/)
  assert.match(login, /productAuth\.signUp/)
  assert.match(login, /window\.location\.replace\(returnTo\)/)
  assert.doesNotMatch(login, /ledger-web-auth-session/)
})

test('returnTo allows only app paths and rejects credential-bearing values', () => {
  const source = read('src/lib/returnTo.ts')
  assert.match(source, /startsWith\('\/app'\)/)
  assert.match(source, /access_token\|refresh_token\|token\|invite\|code\|state/)
  assert.match(source, /candidate\.includes\('\\\\'\)/)
  assert.match(source, /startsWith\('\/\/'\)/)
})

test('OAuth callback returns through the public login entry', () => {
  assert.match(read('src/home.tsx'), /case '\/auth\/callback':/) 
})
