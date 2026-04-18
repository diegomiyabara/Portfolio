import { useTranslation } from 'react-i18next'
import AnimatedSection from './AnimatedSection'
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
    <span className="px-4 py-2 rounded-full bg-surface border border-primary/20 text-text text-sm font-medium flex items-center gap-2 hover:border-primary/50 transition-colors">
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
  const categories = t('skills.categories', { returnObjects: true }) as SkillCategory[]

  return (
    <section id="skills" aria-label="Skills" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
            {t('skills.sectionTitle')}
          </h2>
          <div className="flex flex-col gap-10">
            {categories.map((category) => (
              <div key={category.name}>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4 pl-1">
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
