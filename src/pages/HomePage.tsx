import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

import { SiteHeader } from '../components/layout/SiteHeader'
import { HeroSection } from '../components/sections/HeroSection'
import { HomepageWorkflowSection } from '../components/sections/HomepageWorkflowSection'
import { HomepageAssistantGridSection } from '../components/sections/HomepageAssistantGridSection'
import { HomepageCommandGridSection } from '../components/sections/HomepageCommandGridSection'
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
        <HomepageCommandGridSection />
        <FinalCTASection />
        <SiteFooter />
      </main>
    </div>
  )
}
