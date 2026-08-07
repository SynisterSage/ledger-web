import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = (path) => fs.readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

test('public invite continues through the browser app using scoped session storage', () => {
  const source = read('src/pages/InviteLandingPage.tsx')
  assert.match(source, /ledger:browser-invite:v1/)
  assert.match(source, /sessionStorage\.setItem/)
  assert.match(source, /LEDGER_APP_URL/)
  assert.match(source, /Continue in browser/)
  assert.match(source, /ledger:\/\/invite\//)
})

test('signup has a public route but onboarding remains Ledger-owned', () => {
  assert.match(read('src/home.tsx'), /case '\/signup':/)
  assert.match(read('vercel.json'), /"source": "\/signup"/)
  assert.doesNotMatch(read('src/pages/InviteLandingPage.tsx'), /acceptWorkspaceInvitation/)
})

test('invite continuation never uses returnTo for the token', () => {
  assert.doesNotMatch(read('src/pages/InviteLandingPage.tsx'), /returnTo.*token|token.*returnTo/)
  assert.match(read('src/pages/LoginPage.tsx'), /getReturnTo/)
})
