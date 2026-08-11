import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'
import { productAuth } from '../lib/auth'
import { getReturnTo } from '../lib/returnTo'
import { supabaseConfigError } from '../lib/supabase'

type Mode = 'login' | 'signup'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginPage({ initialMode = 'login' }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [returnTo] = useState(() => getReturnTo())

  useEffect(() => {
    let mounted = true
    void productAuth.getSession().then((session) => {
      if (mounted && session) window.location.replace(returnTo)
    }).catch(() => undefined)
    const subscription = productAuth.onAuthStateChange((_event, session) => {
      if (mounted && session) window.location.replace(returnTo)
    })
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [returnTo])

  const copy = useMemo(
    () =>
      mode === 'login'
        ? {
            title: 'Welcome to Ledger',
            subtitle: 'Sign in to continue to your workspace.',
            primaryLabel: 'Continue',
            googleLabel: 'Continue with Google',
            footerPrompt: 'New to Ledger?',
            footerAction: 'Sign up',
          }
        : {
            title: 'Welcome to Ledger',
            primaryLabel: 'Create account',
            googleLabel: 'Continue with Google',
            footerPrompt: 'Already have an account?',
            footerAction: 'Log in',
          },
    [mode],
  )

  const validate = () => {
    const trimmed = email.trim()

    if (!trimmed) {
      setError('Add an email address to continue.')
      return false
    }

    if (!emailPattern.test(trimmed)) {
      setError('Enter a valid email address.')
      return false
    }

    if (password.length < 8) {
      setError('Use a password with at least 8 characters.')
      return false
    }

    if (mode === 'signup' && !fullName.trim()) {
      setError('Add your name to create an account.')
      return false
    }

    setError('')
    return true
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    if (supabaseConfigError) {
      setError(supabaseConfigError.message)
      return
    }
    setIsSubmitting(true)
    setError('')
    setNotice('')
    try {
      const session = mode === 'login'
        ? await productAuth.signIn(email.trim(), password)
        : await productAuth.signUp(email.trim(), password, fullName.trim())
      if (session) {
        window.location.replace(returnTo)
      } else {
        setNotice('Check your email to confirm your account, then return to Ledger.')
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Authentication failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-dhv bg-ledger-bg text-ledger-text">
      <main className="mx-auto flex min-h-dvh w-full items-center justify-center px-6 py-12 sm:px-8">
        <section className="w-full max-w-[362px] text-center">
          <img src="/assets/logos/logo.svg" alt="Ledger" className="mx-auto h-10 w-10" />


          <div className="mt-7">
            <h1 className="mt-2 text-[26px] font-semibold leading-tight text-ledger-text">{copy.title}</h1>
            <p className="mt-2 text-[16px] leading-7 text-ledger-text-muted">{copy.subtitle}</p>
          </div>

          <div className="mt-7 text-left">
            <form
              className="space-y-4"
              onSubmit={(event) => void handleSubmit(event)}
            >
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-[13px] font-medium text-ledger-text-muted">Name</label>
                  <input id="full-name" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your name" className="login-field border border-(--ledger-border-subtle) bg-(--ledger-surface-card) text-[15px] text-ledger-text placeholder:text-ledger-text-muted/65 outline-none focus:border-(--ledger-header-border)" />
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-[13px] font-medium text-ledger-text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  spellCheck={false}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (error) {
                      setError('')
                    }
                  }}
                  placeholder="Enter your email address..."
                  className={`login-field border bg-(--ledger-surface-card) text-[15px] text-ledger-text placeholder:text-ledger-text-muted/65 outline-none transition-colors duration-200 focus:border-(--ledger-header-border) ${
                    error ? 'border-red-300 focus:border-red-400' : 'border-(--ledger-border-subtle)'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-[13px] font-medium text-ledger-text-muted">Password</label>
                <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" className="login-field border border-(--ledger-border-subtle) bg-(--ledger-surface-card) text-[15px] text-ledger-text placeholder:text-ledger-text-muted/65 outline-none focus:border-(--ledger-header-border)" />
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="ledger-button h-11 w-full bg-ledger-accent px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-ledger-accent-hover"
                >
                  {isSubmitting ? 'Working…' : copy.primaryLabel}
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
                  onClick={() => void productAuth.signInWithGoogle().catch((caught) => setError(caught instanceof Error ? caught.message : 'Could not start Google sign in.'))}
                  className="ledger-button h-11 w-full border border-(--ledger-border-subtle) bg-(--ledger-surface-card) px-5 text-[15px] font-semibold text-ledger-text transition-colors duration-200 hover:bg-(--ledger-surface-muted)"
                >
                  {copy.googleLabel}
                </button>
              </div>

              <div aria-live="polite" className="min-h-5 text-[13px] leading-5">
                {error ? <span className="text-red-600">{error}</span> : null}
                {!error && notice ? <span className="text-ledger-text-muted">{notice}</span> : null}
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
                  setNotice('')
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
