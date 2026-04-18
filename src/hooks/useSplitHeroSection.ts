import { useEffect, useState } from 'react'
import { getMediaQueryList } from '../utils/browser'

const MOBILE_HERO_SPLIT_QUERY = '(max-width: 768px) and (max-height: 960px)'

export function useSplitHeroSection(): boolean {
  const [shouldSplitHero, setShouldSplitHero] = useState(() => getMediaQueryList(MOBILE_HERO_SPLIT_QUERY).matches)

  useEffect(() => {
    const media = getMediaQueryList(MOBILE_HERO_SPLIT_QUERY)
    const update = () => setShouldSplitHero(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return shouldSplitHero
}
