# Ledger browser `/app` handoff contract

Status: Phase 13 deployment foundation

`ledger-web` owns the public marketing and entry surfaces. The Ledger
repository owns the authenticated browser product and must not be copied into
this repository.

## Canonical origin

```text
https://ledgerworkspace.com
```

Vercel redirects `www.ledgerworkspace.com/*` to the canonical apex origin.
There should be one browser application origin, not separate `www` and apex
sessions.

## Required production routing

```text
ledgerworkspace.com/*      -> ledger-web public deployment
ledgerworkspace.com/app    -> Ledger browser deployment
ledgerworkspace.com/app/*  -> Ledger browser deployment
```

The Ledger destination must serve its `dist-web/index.html` for every
`/app/*` request, including workspace, note, calendar, capture, settings, and
other deep links. Static hashed assets should remain cacheable while HTML
should revalidate.

This repository intentionally does not add a hard-coded external Vercel
rewrite yet. The destination URL and proxy policy are not known in the current
deployment configuration. Adding a guessed destination could route production
traffic to the wrong environment.

## Auth handoff

```text
/login?returnTo=/app/...
  -> canonical Ledger authentication
  -> validated internal returnTo
  -> https://ledgerworkspace.com/app/...
```

Only paths beginning with `/app` may be used as `returnTo`. Absolute URLs,
protocol-relative URLs, custom schemes, backslash bypasses, invite tokens,
OAuth credentials, and access/refresh tokens are rejected. Invalid values
fall back to `/app`.

Invite handoff uses the same-origin `ledger:browser-invite:v1` session-storage
continuation. `ledger-web` validates and presents `/invite/:token`, then sends
the current tab to `/app`; Ledger owns acceptance, membership refresh,
onboarding, and workspace activation. The invite token is never placed in
`returnTo`.

`ledger-web` must not copy Supabase tokens between storage keys. Ledger remains
the canonical product-auth owner. Public login integration belongs in a later
phase after the browser deployment target and callback origins are configured.

## Required deployment inputs before Phase 14

- Ledger `dist-web` deployment URL for the current environment.
- Same-origin proxy or edge rewrite capability for `/app` and `/app/*`.
- SPA fallback behavior on the Ledger browser host.
- Canonical apex/`www` redirect enabled in every environment.
- Supabase callback origins for the chosen canonical origin.
- API origin and CORS policy allowing the browser product origin.
