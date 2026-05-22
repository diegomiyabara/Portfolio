import './App.css'
import { Suspense, lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import SectionSlider from './components/SectionSlider'
import { useSplitHeroSection } from './hooks/useSplitHeroSection'
import { createSlides } from './config/slides'

const ProfileSection = lazy(() => import('./components/ProfileSection'))
const AboutSection = lazy(() => import('./components/AboutSection'))
const SkillsSection = lazy(() => import('./components/SkillsSection'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))

function App() {
  const { t } = useTranslation()
  const shouldSplitHero = useSplitHeroSection()
  const slides = createSlides(t, shouldSplitHero, {
    ProfileSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    ContactSection,
  })
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  return (
    <Layout activeSlideIndex={activeSlideIndex} onSlideChange={setActiveSlideIndex}>
      <Suspense fallback={<div className="mx-auto mt-12 max-w-xl px-4 text-center text-muted">Loading content…</div>}>
        <SectionSlider slides={slides} activeIndex={activeSlideIndex} onSlideChange={setActiveSlideIndex} />
      </Suspense>
    </Layout>
  )
}

export default App
