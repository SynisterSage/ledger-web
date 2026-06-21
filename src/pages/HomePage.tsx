import { LockedSplash } from '../components/sections/LockedSplash'
import { isSiteLocked } from '../lib/siteLock'

import { SiteHeader } from '../components/layout/SiteHeader'
import { HeroSection } from '../components/sections/HeroSection'
import { HomepageWorkflowSection } from '../components/sections/HomepageWorkflowSection'
import { FeatureShowcaseOne } from '../components/sections/FeatureShowcaseOne'
import { FeatureShowcaseTwo } from '../components/sections/FeatureShowcaseTwo'
import { FeatureShowcaseThree } from '../components/sections/FeatureShowcaseThree'
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
        <FeatureShowcaseOne />
        <FeatureShowcaseTwo />
        <FeatureShowcaseThree />
        <DesktopCompanionSection />
        <FinalCTASection />
        <SiteFooter />
      </main>
    </div>
  )
}
