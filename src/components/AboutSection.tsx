import { useTranslation } from 'react-i18next'
import AnimatedSection from './AnimatedSection'
import SectionBackground from './SectionBackground'

export default function AboutSection() {
  const { t } = useTranslation()

  const highlights = [
    { value: t('about.highlight1'), label: t('about.highlight1Label') },
    { value: t('about.highlight2'), label: t('about.highlight2Label') },
    { value: t('about.highlight3'), label: t('about.highlight3Label') },
  ]

  return (
    <section id="about" aria-label="About" className="relative flex h-full min-h-full w-full items-center justify-center overflow-hidden">
      <SectionBackground variant="about" />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-10 text-center">
            {t('about.sectionTitle')}
          </h2>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
            {/* Text */}
            <div className="flex flex-col gap-5">
              <p className="text-muted text-base leading-relaxed">
                {t('about.paragraph1')}
              </p>
              <p className="text-muted text-base leading-relaxed">
                {t('about.paragraph2')}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {highlights.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface border border-primary/20"
                >
                  <span className="text-3xl font-bold text-primary mb-1">{value}</span>
                  <span className="text-xs text-muted leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
