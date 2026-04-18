import { useTranslation } from 'react-i18next'
import profileImg from '../assets/foto.png'

interface ProfileSummaryCardProps {
  className?: string
}

export default function ProfileSummaryCard({ className = '' }: ProfileSummaryCardProps) {
  const { t } = useTranslation()

  return (
    <div className={`profile-card relative w-full overflow-hidden rounded-[2rem] border border-primary/20 bg-surface/90 p-6 shadow-2xl shadow-primary/10 backdrop-blur-xl ${className}`.trim()}>
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="profile-card-media relative mx-auto flex aspect-square w-full max-w-[15rem] items-center justify-center rounded-full border-2 border-primary/30 bg-surface/80 shadow-xl shadow-black/20">
        <img
          src={profileImg}
          alt={t('hero.photoAlt')}
          className="profile-card-image h-[86%] w-[86%] rounded-full object-cover"
        />
      </div>
      <div className="relative mt-6 space-y-3 text-center">
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
  )
}
