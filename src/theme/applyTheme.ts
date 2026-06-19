import { applyDesktopCssVars } from './desktopTokens'

const applyDesktopTheme = () => {
  if (typeof document === 'undefined') {
    return
  }

  applyDesktopCssVars(document.documentElement, 'light')
}

applyDesktopTheme()

export {}
