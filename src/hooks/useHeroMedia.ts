import { useEffect, useRef, useState } from 'react'

type HeroMediaMode = 'poster' | 'video'

const LOAD_TIMEOUT_MS = 4000
const SLOW_CONNECTIONS = ['slow-2g', '2g']

function shouldSkipVideo(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any
  const conn = nav.connection ?? nav.mozConnection ?? nav.webkitConnection
  if (!conn) return false
  if (conn.saveData) return true
  if (conn.effectiveType && SLOW_CONNECTIONS.includes(conn.effectiveType as string)) return true

  return false
}

export function useHeroMedia(): {
  containerRef: React.RefObject<HTMLDivElement>
  mode: HeroMediaMode
} {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<HeroMediaMode>('poster')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const video = container.querySelector<HTMLVideoElement>('.hero-video')
    if (!video) return

    if (shouldSkipVideo()) return

    let settled = false
    let timeoutId: ReturnType<typeof setTimeout>

    function settle(showVideo: boolean): void {
      if (settled) return
      settled = true
      clearTimeout(timeoutId)

      if (showVideo) {
        setMode('video')
        const playPromise = video!.play()
        if (playPromise) {
          playPromise.catch(() => setMode('poster'))
        }
      } else {
        setMode('poster')
        video!.pause()
      }
    }

    timeoutId = setTimeout(() => settle(false), LOAD_TIMEOUT_MS)

    video.addEventListener('canplaythrough', () => settle(true), { once: true })
    video.addEventListener('error', () => settle(false), { once: true })

    video.load()

    return () => clearTimeout(timeoutId)
  }, [])

  return { containerRef, mode }
}
