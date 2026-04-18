import type { TFunction } from 'i18next'

export interface ProfileHighlight {
  label: string
  value: string
}

export interface HeroStat {
  id: string
  label: string
  value: string
  featured?: boolean
}

export function getAboutHighlights(t: TFunction): ProfileHighlight[] {
  return [
    { value: t('about.highlight1'), label: t('about.highlight1Label') },
    { value: t('about.highlight2'), label: t('about.highlight2Label') },
    { value: t('about.highlight3'), label: t('about.highlight3Label') },
  ]
}

export function getHeroStats(t: TFunction): HeroStat[] {
  return [
    {
      id: 'impact',
      label: t('hero.stats.impact.label'),
      value: t('hero.stats.impact.value'),
    },
    {
      id: 'tech-stack',
      label: t('hero.stats.techStack.label'),
      value: t('hero.stats.techStack.value'),
      featured: true,
    },
    {
      id: 'focus',
      label: t('hero.stats.focus.label'),
      value: t('hero.stats.focus.value'),
    },
  ]
}
