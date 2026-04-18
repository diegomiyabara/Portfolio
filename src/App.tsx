import './App.css'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import SectionSlider from './components/SectionSlider'

function App() {
  const { t } = useTranslation()

  const slides = [
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
