import { useTranslation } from 'react-i18next'
import AnimatedSection from './AnimatedSection'
import SectionBackground from './SectionBackground'
import { getAboutHighlights } from '../content/profileContent'

export default function AboutSection() {
  const { t } = useTranslation()
  const highlights = getAboutHighlights(t)

  return (
    <section id="about" aria-label="About" className="relative flex h-full min-h-full w-full items-center justify-center overflow-hidden">
      <SectionBackground variant="about" />
      <div className="section-shell relative z-10 mx-auto w-full max-w-5xl px-4">
        <AnimatedSection>
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-text mb-10 text-center">
            {t('about.sectionTitle')}
          </h2>

          <div className="about-content grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
            {/* Text */}
            <div className="about-copy flex flex-col gap-5">
              <p className="about-paragraph text-muted text-base leading-relaxed">
                {t('about.paragraph1')}
              </p>
              <p className="about-paragraph text-muted text-base leading-relaxed">
                {t('about.paragraph2')}
              </p>
            </div>

            {/* Highlights */}
            <div className="about-highlights grid grid-cols-1 gap-4 sm:grid-cols-3">
              {highlights.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface border border-primary/20"
                >
                  <span className="about-highlight-value text-3xl font-bold text-primary mb-1">{value}</span>
                  <span className="about-highlight-label text-xs text-muted leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
