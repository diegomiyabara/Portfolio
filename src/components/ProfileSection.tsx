import { motion, useReducedMotion } from '../lib/motion'
import { useTranslation } from 'react-i18next'
import { getAboutHighlights } from '../content/profileContent'
import ProfileSummaryCard from './ProfileSummaryCard'

export default function ProfileSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const highlights = getAboutHighlights(t)

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
        <ProfileSummaryCard className="max-w-[22rem]" />

        <div className="profile-glance flex flex-wrap items-center justify-center gap-3">
          {highlights.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-sm text-text"
            >
              {value} {label}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
