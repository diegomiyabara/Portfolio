import './App.css'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import ProfileSection from './components/ProfileSection'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import SectionSlider from './components/SectionSlider'
import { useSplitHeroSection } from './hooks/useSplitHeroSection'

function App() {
  const { t } = useTranslation()
  const shouldSplitHero = useSplitHeroSection()

  const slides = [
    ...(shouldSplitHero
      ? [{ id: 'profile', label: t('navbar.profile'), content: <ProfileSection /> }]
      : []),
    { id: 'home', label: t('navbar.home'), content: <HeroSection /> },
    { id: 'about', label: t('navbar.about'), content: <AboutSection /> },
    { id: 'skills', label: t('navbar.skills'), content: <SkillsSection /> },
    { id: 'projects', label: t('navbar.projects'), content: <ProjectsSection /> },
    { id: 'contact', label: t('navbar.contact'), content: <ContactSection /> },
  ]

  return (
    <Layout>
      <SectionSlider slides={slides} />
    </Layout>
  )
}

export default App
