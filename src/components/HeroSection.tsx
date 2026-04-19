import type { PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useReducedMotion, useTransform } from '../lib/motion'
import heroImg from '../assets/hero.png'
import { getHeroStats } from '../content/profileContent'
import ProfileSummaryCard from './ProfileSummaryCard'

const btnPrimaryVariants = {
  rest: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, opacity: 0.92 },
  tap: { scale: 0.97 },
}

const btnOutlineVariants = {
  rest: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, opacity: 0.85 },
  tap: { scale: 0.97 },
}

export default function HeroSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const heroStats = getHeroStats(t)

  const mouseX = useMotionValue(0.5) as { set: (value: number) => void }
  const mouseY = useMotionValue(0.5) as { set: (value: number) => void }

  const bgX = useTransform(mouseX, [0, 1], [-24, 24]) as number
  const bgY = useTransform(mouseY, [0, 1], [-16, 16]) as number
  const accentX = useTransform(mouseX, [0, 1], [18, -18]) as number
  const accentY = useTransform(mouseY, [0, 1], [-12, 12]) as number

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    mouseX.set(x)
    mouseY.set(y)
  }

  const textVariants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  }

  const photoVariants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="home"
      aria-label="Hero"
      className="hero-shell relative flex h-full min-h-full w-full min-w-0 items-center justify-center overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 left-1/2 w-screen -translate-x-1/2"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08,
          filter: 'blur(40px) brightness(0.45)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.16),transparent_30%)]" />

      <motion.div
        className="pointer-events-none absolute left-8 top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        style={shouldReduceMotion ? undefined : { x: bgX, y: bgY }}
      />
      <motion.div
        className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-secondary/15 blur-3xl"
        style={shouldReduceMotion ? undefined : { x: accentX, y: accentY }}
      />

      <div className="hero-inner relative mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-8 px-4 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        <motion.div
          className="hero-copy min-w-0 text-center lg:max-w-3xl lg:flex-1 lg:text-left"
          onPointerMove={handlePointerMove}
          variants={textVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            {t('hero.badge')}
          </div>

          <p className="hero-greeting mb-2 text-lg text-muted">{t('hero.greeting')}</p>
          <h1 className="hero-title mb-4 text-4xl font-bold tracking-tight text-text sm:text-5xl md:text-6xl">
            {t('hero.name')}
          </h1>
          <p className="hero-role mb-4 text-xl font-semibold text-primary md:text-2xl">
            {t('hero.title')}
          </p>
          <p className="hero-subtitle mb-8 font-mono text-sm uppercase tracking-widest text-muted">
            {t('hero.subtitle')}
          </p>
          <p className="hero-tagline mx-auto max-w-3xl text-base leading-relaxed text-muted md:text-lg lg:mx-0">
            {t('hero.tagline')}
          </p>

          <div className="hero-stats mt-10 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.7fr)_minmax(0,1fr)]">
            {heroStats.map(({ id, label, value, featured }) => (
              <div
                key={id}
                className={`rounded-3xl border border-primary/20 bg-background/70 p-4 text-left shadow-xl shadow-primary/5 backdrop-blur-xl ${
                  featured ? 'md:col-span-2 xl:col-span-1' : ''
                }`}
              >
                <p className="hero-stat-label text-xs uppercase tracking-[0.35em] text-primary/80">{label}</p>
                <p className="hero-stat-value mt-2 text-lg font-semibold leading-relaxed text-text">{value}</p>
              </div>
            ))}
          </div>

          <div className="hero-actions mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href="#contact"
              className="hero-action-link inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-background transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              variants={shouldReduceMotion ? undefined : btnPrimaryVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.15 }}
            >
              {t('hero.ctaContact')}
            </motion.a>
            <motion.a
              href="https://github.com/diegomiyabara"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-action-link inline-flex items-center justify-center rounded-full border border-primary/50 bg-background/80 px-8 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              variants={shouldReduceMotion ? undefined : btnOutlineVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.15 }}
            >
              {t('hero.ctaGithub')}
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="hidden lg:block lg:w-full lg:max-w-[24rem] lg:flex-shrink-0"
          variants={photoVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
        >
          <ProfileSummaryCard />
        </motion.div>
      </div>
    </section>
  )
}
