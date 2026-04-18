import { useTranslation } from 'react-i18next'
import AnimatedSection from './AnimatedSection'
import SectionBackground from './SectionBackground'
import techIcons from '../data/techIcons'

interface TechIconProps {
  skill: string
  size?: number
}

function TechIcon({ skill, size = 20 }: TechIconProps) {
  const IconComponent = techIcons[skill]
  if (!IconComponent) return null
  return (
    <IconComponent
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
    />
  )
}

interface SkillBadgeProps {
  label: string
}

function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="skill-badge px-4 py-2 rounded-full bg-surface border border-primary/20 text-text text-sm font-medium flex items-center gap-2 hover:border-primary/50 transition-colors">
      <TechIcon skill={label} />
      {label}
    </span>
  )
}

interface SkillCategory {
  name: string
  items: string[]
}

export default function SkillsSection() {
  const { t } = useTranslation()
  const translatedCategories = t('skills.categories', { returnObjects: true })
  const legacyItems = t('skills.items', { returnObjects: true })

  const categories = Array.isArray(translatedCategories)
    ? (translatedCategories as SkillCategory[])
    : Array.isArray(legacyItems)
      ? [{ name: t('skills.sectionTitle'), items: legacyItems as string[] }]
      : []

  return (
    <section id="skills" aria-label="Skills" className="relative flex h-full min-h-full w-full items-center justify-center overflow-hidden">
      <SectionBackground variant="skills" />
      <div className="section-shell relative z-10 mx-auto w-full max-w-5xl px-4">
        <AnimatedSection>
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-text mb-12 text-center">
            {t('skills.sectionTitle')}
          </h2>
          <div className="skills-groups flex flex-col gap-10">
            {categories.map((category) => (
              <div key={category.name}>
                <h3 className="skills-group-title text-xs font-semibold text-muted uppercase tracking-widest mb-4 pl-1">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((skill) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
