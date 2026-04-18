import { useEffect, useState } from 'react'

const MOBILE_HERO_SPLIT_QUERY = '(max-width: 768px) and (max-height: 960px)'

export function useSplitHeroSection(): boolean {
  const [shouldSplitHero, setShouldSplitHero] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_HERO_SPLIT_QUERY)
    const update = () => setShouldSplitHero(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return shouldSplitHero
}
