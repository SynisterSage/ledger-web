import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

import { SiteHeader } from '../components/layout/SiteHeader'
import { HeroSection } from '../components/sections/HeroSection'
import { HomepageWorkflowSection } from '../components/sections/HomepageWorkflowSection'
import { HomepageAssistantGridSection } from '../components/sections/HomepageAssistantGridSection'
import { DesktopCompanionSection } from '../components/sections/DesktopCompanionSection'
import { FinalCTASection } from '../components/sections/FinalCTASection'
import { SiteFooter } from '../components/sections/SiteFooter'

export function HomePage() {
  if (isSiteLocked()) {
    return <LockedSplash />
  }

  return (
    <div className="min-h-screen">
      <SiteHeader currentPath="/" />
      <main>
        <HeroSection />
        <HomepageWorkflowSection />
        <HomepageAssistantGridSection />
        <DesktopCompanionSection />
        <FinalCTASection />
        <SiteFooter />
      </main>
    </div>
  )
}
