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
  const icon = <TechIcon skill={label} />
  return (
    <span className="px-4 py-2 rounded-full bg-surface border border-primary/30 text-text text-sm font-medium flex items-center gap-2">
      {icon}
      {label}
    </span>
  )
}

export default function SkillsSection() {
  const { t } = useTranslation()
  const skills = t('skills.items', { returnObjects: true }) as string[]

  return (
    <section id="skills" aria-label="Skills" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-10">
            {t('skills.sectionTitle')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <SkillBadge key={skill} label={skill} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
