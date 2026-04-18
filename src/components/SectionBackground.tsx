import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from '../lib/motion'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import { getMediaQueryList } from '../utils/browser'

interface SectionBackgroundProps {
  variant: 'about' | 'skills' | 'projects' | 'contact'
}

const variantOptions = {
  about: {
    gradient: 'bg-[radial-gradient(circle_at_top_left,_rgba(0,212,255,0.16),transparent_32%)]',
    shape1: 'bg-primary/15 left-12 top-16 h-64 w-64',
    shape2: 'bg-secondary/10 right-10 bottom-12 h-72 w-72',
    shape1Mobile: 'bg-primary/15 left-4 top-10 h-44 w-44',
    shape2Mobile: 'bg-secondary/10 right-4 bottom-8 h-52 w-52',
  },
  skills: {
    gradient: 'bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.18),transparent_30%)]',
    shape1: 'bg-secondary/15 right-16 top-10 h-56 w-56',
    shape2: 'bg-primary/10 left-8 bottom-16 h-80 w-80',
    shape1Mobile: 'bg-secondary/15 right-4 top-12 h-40 w-40',
    shape2Mobile: 'bg-primary/10 left-4 bottom-12 h-56 w-56',
  },
  projects: {
    gradient: 'bg-[radial-gradient(circle_at_top_left,_rgba(0,212,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.12),transparent_28%)]',
    shape1: 'bg-primary/10 left-10 top-20 h-72 w-72',
    shape2: 'bg-secondary/15 right-14 bottom-10 h-72 w-72',
    shape1Mobile: 'bg-primary/10 left-4 top-12 h-48 w-48',
    shape2Mobile: 'bg-secondary/15 right-4 bottom-10 h-56 w-56',
  },
  contact: {
    gradient: 'bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.14),transparent_30%)]',
    shape1: 'bg-primary/15 left-12 bottom-24 h-72 w-72',
    shape2: 'bg-secondary/15 right-10 top-28 h-56 w-56',
    shape1Mobile: 'bg-primary/15 left-4 bottom-10 h-48 w-48',
    shape2Mobile: 'bg-secondary/15 right-4 top-12 h-40 w-40',
  },
} as const

export default function SectionBackground({ variant }: SectionBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const media = getMediaQueryList('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const moveYTransform = useTransform(scrollYProgress, [0, 1], [18, -18]) as number
  const moveXTransform = useTransform(scrollYProgress, [0, 1], [-16, 16]) as number
  const moveXSlowTransform = useTransform(scrollYProgress, [0, 1], [12, -12]) as number
  const moveYSlowTransform = useTransform(scrollYProgress, [0, 1], [-12, 12]) as number
  const sectionOpacityTransform = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]) as number

  const moveY = shouldReduceMotion ? 0 : moveYTransform
  const moveX = shouldReduceMotion ? 0 : moveXTransform
  const moveXSlow = shouldReduceMotion ? 0 : moveXSlowTransform
  const moveYSlow = shouldReduceMotion ? 0 : moveYSlowTransform
  const sectionOpacity = shouldReduceMotion ? 1 : sectionOpacityTransform

  const config = variantOptions[variant]
  const shape1Class = isMobile ? config.shape1Mobile : config.shape1
  const shape2Class = isMobile ? config.shape2Mobile : config.shape2

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none absolute inset-y-0 overflow-hidden"
      style={{
        opacity: sectionOpacity,
        left: isMobile ? 0 : '50%',
        right: isMobile ? 0 : '50%',
        marginLeft: isMobile ? undefined : '-50vw',
        marginRight: isMobile ? undefined : '-50vw',
        width: isMobile ? '100%' : '100vw',
      }}
    >
      <motion.div className={`absolute inset-0 ${config.gradient}`} style={{ opacity: 0.9 }} />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent opacity-90" />
      <motion.div
        className={`absolute ${shape1Class} rounded-full blur-3xl`}
        style={{ x: moveX, y: moveY }}
      />
      <motion.div
        className={`absolute ${shape2Class} rounded-full blur-3xl`}
        style={{ x: moveXSlow, y: moveYSlow }}
      />
      {variant === 'projects' && (
        <>
          <motion.img
            src={reactLogo}
            alt="React"
            className="absolute left-8 top-24 h-20 w-20 opacity-20"
            style={{ y: moveYSlow }}
          />
          <motion.img
            src={viteLogo}
            alt="Vite"
            className="absolute right-10 bottom-24 h-24 w-24 opacity-20"
            style={{ y: moveY }}
          />
        </>
      )}
    </motion.div>
  )
}
