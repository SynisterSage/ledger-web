import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = (path) => fs.readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

test('callback success and error states share the dark reference surface', () => {
  const source = read('src/components/IntegrationCallbackSuccess.tsx')
  assert.match(source, /bg-\[#080808\]/)
  assert.match(source, /bg-\[#141414\]/)
  assert.match(source, /window\.close\(\)/)
  assert.match(source, /secondsRemaining/)
})

test('Figma authorization keeps workspace selection and callback completion explicit', () => {
  const source = read('src/pages/FigmaPluginAuthorizationPage.tsx')
  assert.match(source, /Select a workspace to authenticate/)
  assert.match(source, /Workspace to connect/)
  assert.match(source, /workspace_id: workspaceId/)
  assert.match(source, /Figma successfully authenticated/)
  assert.match(source, /closeAfterSeconds=\{5\}/)
})

test('public callback routes do not fall back to generic raw-text pages', () => {
  const source = read('src/home.tsx')
  assert.match(source, /FigmaPluginAuthorizationPage/)
  assert.match(source, /GithubCallbackPage/)
  assert.match(source, /McpAuthorizationPage/)
  assert.match(source, /McpWorkspaceSwitchPage/)
})
