import type { ReactElement } from 'react'
import type { TFunction } from 'i18next'
import ProfileSection from '../components/ProfileSection'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import SkillsSection from '../components/SkillsSection'
import ProjectsSection from '../components/ProjectsSection'
import ContactSection from '../components/ContactSection'

interface AppSlide {
  id: string
  label: string
  content: ReactElement
}

export function createSlides(t: TFunction, shouldSplitHero: boolean): AppSlide[] {
  return [
    ...(shouldSplitHero
      ? [{ id: 'profile', label: t('navbar.profile'), content: <ProfileSection /> }]
      : []),
    { id: 'home', label: t('navbar.home'), content: <HeroSection /> },
    { id: 'about', label: t('navbar.about'), content: <AboutSection /> },
    { id: 'skills', label: t('navbar.skills'), content: <SkillsSection /> },
    { id: 'projects', label: t('navbar.projects'), content: <ProjectsSection /> },
    { id: 'contact', label: t('navbar.contact'), content: <ContactSection /> },
  ]
}
