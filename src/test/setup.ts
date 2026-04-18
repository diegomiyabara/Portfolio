import '@testing-library/jest-dom'

if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}

if (typeof globalThis.IntersectionObserver !== 'function') {
  globalThis.IntersectionObserver = class IntersectionObserverFallback {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
    root: Element | Document | null = null
    rootMargin = '0px'
    scrollMargin = '0px'
    thresholds = [0]
  } as unknown as typeof IntersectionObserver
}
