import { SiteHeader } from '../components/layout/SiteHeader'
import { HeroSection } from '../components/sections/HeroSection'
import { FeatureShowcaseOne } from '../components/sections/FeatureShowcaseOne'
import { FeatureShowcaseTwo } from '../components/sections/FeatureShowcaseTwo'
import { FeatureShowcaseThree } from '../components/sections/FeatureShowcaseThree'
import { DesktopCompanionSection } from '../components/sections/DesktopCompanionSection'
import { FinalCTASection } from '../components/sections/FinalCTASection'
import { SiteFooter } from '../components/sections/SiteFooter'

export function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader currentPath="/" />
      <main>
        <HeroSection />
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
