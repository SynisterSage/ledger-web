import { useMemo, useState } from 'react'

import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

type Mode = 'login' | 'signup'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const copy = useMemo(
    () =>
      mode === 'login'
        ? {
            eyebrow: 'Ledger account',
            title: 'Welcome to Ledger',
            subtitle: 'Sign in to continue to your workspace.',
            primaryLabel: 'Continue',
            googleLabel: 'Continue with Google',
            footerPrompt: 'New to Ledger?',
            footerAction: 'Sign up',
          }
        : {
            eyebrow: 'Ledger account',
            title: 'Welcome to Ledger',
            subtitle: 'Create your Ledger account.',
            primaryLabel: 'Create account',
            googleLabel: 'Continue with Google',
            footerPrompt: 'Already have an account?',
            footerAction: 'Log in',
          },
    [mode],
  )

  const validateEmail = () => {
    const trimmed = email.trim()

    if (!trimmed) {
      setError('Add an email address to continue.')
      return false
    }

    if (!emailPattern.test(trimmed)) {
      setError('Enter a valid email address.')
      return false
    }

    setError('')
    return true
  }

  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-dhv bg-ledger-bg text-ledger-text">
      <main className="mx-auto flex min-h-dvh w-full items-center justify-center px-6 py-12 sm:px-8">
        <section className="w-full max-w-[362px] text-center">
          <img src="/assets/logos/logo.svg" alt="Ledger" className="mx-auto h-10 w-10" />
          <p className=" mt-3 text-[14px] font-medium text-ledger-text-muted">{copy.eyebrow}</p>


          <div className="mt-7">
            <h1 className="mt-2 text-[26px] font-semibold leading-tight text-ledger-text">{copy.title}</h1>
            <p className="mt-3 text-[16px] leading-7 text-ledger-text-muted">{copy.subtitle}</p>
          </div>

          <div className="mt-8 text-left">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                validateEmail()
              }}
            >
              <div className="space-y-2">
                <label htmlFor="email" className="text-[13px] font-medium text-ledger-text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (error) {
                      setError('')
                    }
                  }}
                  placeholder="Enter your email address..."
                  className={`h-11 w-full rounded-full border bg-(--ledger-surface-card) px-4 text-[15px] text-ledger-text outline-none transition-colors duration-200 placeholder:text-ledger-text-muted/55 focus:border-(--ledger-header-border) ${
                    error ? 'border-red-300 focus:border-red-400' : 'border-(--ledger-border-subtle)'
                  }`}
                />
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-ledger-accent px-5 text-center text-[15px] font-semibold leading-none text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
                >
                  {copy.primaryLabel}
                </button>

                <div className="flex items-center gap-3 py-2">
                  <div className="h-px flex-1 bg-(--ledger-border-subtle)" />
                  <span className="text-[14px] font-medium text-ledger-text-muted">
                    or continue with
                  </span>
                  <div className="h-px flex-1 bg-(--ledger-border-subtle)" />
                </div>

                <button
                  type="button"
                  className="inline-flex h-11 w-full items-center justify-center rounded-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 text-center text-[15px] font-semibold leading-none text-ledger-text transition-colors duration-200 hover:bg-(--ledger-surface-muted)"
                >
                  {copy.googleLabel}
                </button>
              </div>

              <div aria-live="polite" className="min-h-5 text-[13px] leading-5">
                {error ? <span className="text-red-600">{error}</span> : null}
              </div>
            </form>

            <p className="mt-3 text-center text-[14px] leading-6 text-ledger-text-muted">
              {copy.footerPrompt}{' '}
              <button
                type="button"
                className="font-medium text-ledger-text underline decoration-ledger-text-muted/40 underline-offset-3 transition-colors duration-200 hover:text-ledger-accent"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login')
                  setError('')
                }}
              >
                {copy.footerAction}
              </button>
            </p>
          </div>

          <p className="mt-6 text-[13px] leading-5 text-ledger-text-muted">
            <a href="/" className="underline decoration-ledger-text-muted/40 underline-offset-3 transition-colors hover:text-ledger-accent">
              Back to home
            </a>
          </p>
        </section>
      </main>
    </div>
  )
}
