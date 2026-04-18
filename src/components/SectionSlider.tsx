import { useEffect, useState } from 'react'
import { useReducedMotion, motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Slide {
  id: string
  label: string
  content: ReactNode
}

interface SectionSliderProps {
  slides: Slide[]
}

export default function SectionSlider({ slides }: SectionSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current + 1) % slides.length)
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slides.length])

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [isPaused, shouldReduceMotion, slides.length])

  return (
    <section className="relative flex h-[calc(100vh-8rem)] min-h-[560px] w-full overflow-hidden">
      <motion.div
        className="relative flex h-full w-full"
        animate={{ x: shouldReduceMotion ? 0 : `-${activeIndex * 100}%` }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: 'easeOut' }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="h-full min-w-full shrink-0 flex items-center justify-center overflow-hidden">
            {slide.content}
          </div>
        ))}
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 rounded-full bg-surface/90 px-3 py-2 shadow-xl shadow-black/20 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)}
            className="rounded-full border border-primary/30 bg-background px-3 py-2 text-xl text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Tela anterior"
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
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
            onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
            className="rounded-full border border-primary/30 bg-background px-3 py-2 text-xl text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Próxima tela"
          >
            ›
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((value) => !value)}
          className="rounded-full border border-primary/30 bg-surface/90 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isPaused ? 'Continuar' : 'Pausar'}
        </button>
      </div>
    </section>
  )
}
