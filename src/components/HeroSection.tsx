import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import heroImg from '../assets/hero.png'

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
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Text content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          variants={textVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t('hero.badge')}
          </div>

          <p className="text-muted text-lg mb-1">
            {t('hero.greeting')}{' '}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-2 tracking-tight">
            {t('hero.name')}
          </h1>
          <p className="text-primary font-semibold text-xl md:text-2xl mb-2">
            {t('hero.title')}
          </p>
          <p className="text-muted text-sm font-mono mb-6 tracking-widest uppercase">
            {t('hero.subtitle')}
          </p>
          <p className="text-muted text-base max-w-xl mb-8 leading-relaxed">
            {t('hero.tagline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-primary text-background font-semibold text-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
              className="px-6 py-3 rounded-lg border border-primary/50 text-primary font-semibold text-sm text-center hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

        {/* Profile photo */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center gap-4"
          variants={photoVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-110" />
            <img
              src={heroImg}
              alt={t('hero.photoAlt')}
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover ring-2 ring-primary/40"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
