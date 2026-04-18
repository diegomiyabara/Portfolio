export interface MediaQueryListLike {
  matches: boolean
  addEventListener: (type: 'change', listener: () => void) => void
  removeEventListener: (type: 'change', listener: () => void) => void
}

const mediaQueryFallback: MediaQueryListLike = {
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
}

export function getMediaQueryList(query: string): MediaQueryListLike {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return mediaQueryFallback
  }

  const mediaQueryList = window.matchMedia(query)

  return {
    matches: mediaQueryList.matches,
    addEventListener: (_type, listener) => {
      if (typeof mediaQueryList.addEventListener === 'function') {
        mediaQueryList.addEventListener('change', listener)
        return
      }

      mediaQueryList.addListener(listener)
    },
    removeEventListener: (_type, listener) => {
      if (typeof mediaQueryList.removeEventListener === 'function') {
        mediaQueryList.removeEventListener('change', listener)
        return
      }

      mediaQueryList.removeListener(listener)
    },
  }
}
