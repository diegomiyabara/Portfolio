import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Slide {
  id: string
  label: string
  content: ReactNode
}

interface SectionSliderProps {
  slides: Slide[]
  activeIndex?: number
  onSlideChange?: (index: number) => void
}

export default function SectionSlider({ slides, activeIndex = 0, onSlideChange }: SectionSliderProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(activeIndex)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Sync internal state with external activeIndex
  useEffect(() => {
    setInternalActiveIndex(activeIndex)
  }, [activeIndex])

  const currentIndex = internalActiveIndex

  const changeSlide = (newIndex: number) => {
    setInternalActiveIndex(newIndex)
    onSlideChange?.(newIndex)
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        changeSlide((currentIndex + 1) % slides.length)
      }
      if (event.key === 'ArrowLeft') {
        changeSlide((currentIndex - 1 + slides.length) % slides.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slides.length])

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return

    const timer = window.setInterval(() => {
      changeSlide((currentIndex + 1) % slides.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [isPaused, shouldReduceMotion, slides.length])

  return (
    <section className="slider-shell relative flex h-[calc(100vh-8rem)] min-h-[560px] w-full overflow-hidden">
      <div className="slider-viewport relative flex-1 min-h-0 overflow-hidden">
        {isMobile ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[activeIndex]?.id}
              className="slider-slide h-full w-full overflow-x-hidden overflow-y-auto"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
            >
              {slides[activeIndex]?.content}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            className="relative flex h-full w-full"
            animate={{ x: shouldReduceMotion ? 0 : `-${activeIndex * 100}%` }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: 'easeOut' }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="slider-slide flex h-full min-w-full shrink-0 items-center justify-center overflow-hidden">
                {slide.content}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="slider-controls absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-4">
        <div className="slider-controls-bar flex items-center gap-3 rounded-full bg-surface/90 px-3 py-2 shadow-xl shadow-black/20 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => changeSlide((currentIndex - 1 + slides.length) % slides.length)}
            className="slider-control-btn rounded-full border border-primary/30 bg-background px-3 py-2 text-xl text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Tela anterior"
          >
            {'<'}
          </button>

          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => changeSlide(index)}
                className={`h-3 w-3 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  index === activeIndex
                    ? 'bg-primary scale-110'
                    : 'bg-muted/50 hover:bg-muted'
                }`}
                aria-label={`Ir para ${slide.label}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => changeSlide((currentIndex + 1) % slides.length)}
            className="slider-control-btn rounded-full border border-primary/30 bg-background px-3 py-2 text-xl text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Proxima tela"
          >
            {'>'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((value) => !value)}
          className="slider-play-btn rounded-full border border-primary/30 bg-surface/90 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isPaused ? 'Continuar' : 'Pausar'}
        </button>
      </div>
    </section>
  )
}
