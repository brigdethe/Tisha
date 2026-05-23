import { useEffect } from 'react'
import { SectionHeader } from './components/SectionHeader'
import { SectionHero } from './components/SectionHero'
import { SectionMarquee } from './components/SectionMarquee'
import { SectionBooking } from './components/SectionBooking'
import { SectionRooms } from './components/SectionRooms'
import { SectionAmenities } from './components/SectionAmenities'
import { SectionFacts } from './components/SectionFacts'
// import { SectionCare } from './components/SectionCare'
// import { SectionReviews } from './components/SectionReviews'
// import { SectionWellness } from './components/SectionWellness'
import { SectionCta } from './components/SectionCta'
import { SectionFooter } from './components/SectionFooter'

const WEBFLOW_SCRIPTS = [
  {
    src: '/external/js/script-d3e54v103j8qbb-cloudfront-net.js',
    integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
  },
  {
    src: '/external/js/script-69c4d31e44bb0ae4ccbe80dc.js',
    integrity: 'sha384-4abIlA5/v7XaW1HMXKBgnUuhnjBYJ/Z9C1OSg4OhmVw9O3QeHJ/qJqFBERCDPv7G',
  },
  {
    src: '/external/js/script-69c4d31e44bb0ae4ccbe80dc-1.js',
    integrity: 'sha384-3/kfdDuFbNlKPM1Rl0mGRn8FslhIic8bU7o8wwXDu/ulVeVq4VW8ZYSdCCw3pXUs',
  },
]

export function App(): JSX.Element {
  useEffect(() => {
    WEBFLOW_SCRIPTS.forEach(({ src, integrity }) => {
      if (document.querySelector(`script[src="${src}"]`)) return
      const script = document.createElement('script')
      script.src = src
      script.type = 'text/javascript'
      script.integrity = integrity
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
    })
  }, [])

  return (
    <>
      <SectionHeader />
      <SectionHero />
      <SectionMarquee />
      <SectionBooking />
      <SectionRooms />
      <SectionAmenities />
      <SectionFacts />
      {/* <SectionCare /> */}
      {/* <SectionReviews /> */}
      {/* <SectionWellness /> */}
      <SectionCta />
      <SectionFooter />
    </>
  )
}
