import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import heroImg from '../assets/hero.png'

// Compositor-thread safe: only transform (scale) and opacity are animated.
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
          <p className="text-muted text-lg mb-2">
            {t('hero.greeting')}{' '}
            <span className="text-primary font-semibold">{t('hero.name')}</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-muted text-lg max-w-xl mb-8">
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
              href="https://github.com/diegofcornejo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold text-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          className="flex-shrink-0"
          variants={photoVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
        >
          <img
            src={heroImg}
            alt={t('hero.photoAlt')}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover ring-2 ring-primary/30"
          />
        </motion.div>
      </div>
    </section>
  )
}
