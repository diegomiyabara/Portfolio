import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import profileImg from '../assets/foto.png'

export default function ProfileSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="profile"
      aria-label="Profile"
      className="profile-shell relative flex h-full min-h-full w-full items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.12),transparent_26%),radial-gradient(circle_at_bottom,_rgba(124,58,237,0.16),transparent_32%)]" />

      <motion.div
        className="profile-inner relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-8 px-4 py-10 text-center"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: 'easeOut' }}
      >
        <div className="profile-card relative w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-primary/20 bg-surface/90 p-6 shadow-2xl shadow-primary/10 backdrop-blur-xl">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="profile-card-media relative mx-auto flex aspect-square w-full max-w-[15rem] items-center justify-center rounded-full border-2 border-primary/30 bg-surface/80 shadow-xl shadow-black/20">
            <img
              src={profileImg}
              alt={t('hero.photoAlt')}
              className="profile-card-image h-[86%] w-[86%] rounded-full object-cover"
            />
          </div>
          <div className="relative mt-6 space-y-3">
            <p className="profile-kicker text-sm uppercase tracking-[0.35em] text-primary/75">
              {t('navbar.profile')}
            </p>
            <h2 className="profile-title text-2xl font-bold text-text">
              {t('hero.name')}
            </h2>
            <p className="profile-role text-lg font-semibold text-primary">
              {t('hero.title')}
            </p>
            <p className="profile-subtitle mx-auto max-w-xs text-sm leading-relaxed text-muted">
              {t('hero.tagline')}
            </p>
          </div>
        </div>

        <div className="profile-glance flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-sm text-text">
            {t('about.highlight1')} {t('about.highlight1Label')}
          </div>
          <div className="rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-sm text-text">
            {t('about.highlight2')} {t('about.highlight2Label')}
          </div>
          <div className="rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-sm text-text">
            {t('about.highlight3')} {t('about.highlight3Label')}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
