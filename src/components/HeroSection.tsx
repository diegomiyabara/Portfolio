import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import heroImg from '../assets/hero.png'

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
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-primary text-background font-semibold text-sm transition-opacity hover:opacity-90 text-center"
            >
              {t('hero.ctaContact')}
            </a>
            <a
              href="https://github.com/diegofcornejo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold text-sm transition-colors hover:bg-primary/10 text-center"
            >
              {t('hero.ctaGithub')}
            </a>
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
            alt="Diego — Magento & React Developer"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover ring-2 ring-primary/30"
          />
        </motion.div>
      </div>
    </section>
  )
}
