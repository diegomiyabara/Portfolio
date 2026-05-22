import type { ReactElement, ComponentType, LazyExoticComponent } from 'react'
import type { TFunction } from 'i18next'
import HeroSection from '../components/HeroSection'

interface SectionComponents {
  ProfileSection: LazyExoticComponent<ComponentType>
  AboutSection: LazyExoticComponent<ComponentType>
  SkillsSection: LazyExoticComponent<ComponentType>
  ProjectsSection: LazyExoticComponent<ComponentType>
  ContactSection: LazyExoticComponent<ComponentType>
}

interface AppSlide {
  id: string
  label: string
  content: ReactElement
}

export function createSlides(
  t: TFunction,
  shouldSplitHero: boolean,
  sections: SectionComponents,
): AppSlide[] {
  return [
    ...(shouldSplitHero
      ? [{ id: 'profile', label: t('navbar.profile'), content: <sections.ProfileSection /> }]
      : []),
    { id: 'home', label: t('navbar.home'), content: <HeroSection /> },
    { id: 'about', label: t('navbar.about'), content: <sections.AboutSection /> },
    { id: 'skills', label: t('navbar.skills'), content: <sections.SkillsSection /> },
    { id: 'projects', label: t('navbar.projects'), content: <sections.ProjectsSection /> },
    { id: 'contact', label: t('navbar.contact'), content: <sections.ContactSection /> },
  ]
}
