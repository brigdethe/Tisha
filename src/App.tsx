import { useEffect, useState } from 'react'
import { SectionHeader } from './components/SectionHeader'
import { SectionHero } from './components/SectionHero'
import { SectionMarquee } from './components/SectionMarquee'
import { SectionBooking } from './components/SectionBooking'
import { SectionRooms } from './components/SectionRooms'
import { SectionAmenities } from './components/SectionAmenities'
import { SectionFacts } from './components/SectionFacts'
import { SectionCta } from './components/SectionCta'
import { SectionFooter } from './components/SectionFooter'
import { ReservationModal } from './components/ReservationModal'

const WEBFLOW_SCRIPTS = [
  { src: '/external/js/script-d3e54v103j8qbb-cloudfront-net.js' },
  { src: '/external/js/script-69c4d31e44bb0ae4ccbe80dc.js' },
  { src: '/external/js/script-69c4d31e44bb0ae4ccbe80dc-1.js' },
]

export function App(): JSX.Element {
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [preSelectedRoomId, setPreSelectedRoomId] = useState<string | null>(null)

  function openReservation(roomId?: string) {
    setPreSelectedRoomId(roomId ?? null)
    setIsReservationOpen(true)
  }

  useEffect(() => {
    WEBFLOW_SCRIPTS.forEach(({ src }) => {
      if (document.querySelector(`script[src="${src}"]`)) return
      const script = document.createElement('script')
      script.src = src
      script.type = 'text/javascript'
      document.body.appendChild(script)
    })
  }, [])

  return (
    <>
      <SectionHeader onBook={openReservation} />
      <SectionHero onBook={() => openReservation()} />
      <SectionMarquee />
      <SectionBooking onBook={() => openReservation()} />
      <SectionRooms onBook={openReservation} />
      <SectionAmenities />
      <SectionFacts />
      <SectionCta onBook={() => openReservation()} />
      <SectionFooter />
      <ReservationModal
        isOpen={isReservationOpen}
        preSelectedRoomId={preSelectedRoomId}
        onClose={() => setIsReservationOpen(false)}
      />
    </>
  )
}
