import './App.css'
import { Suspense, lazy, useState } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import SectionSlider from './components/SectionSlider'
import { useSplitHeroSection } from './hooks/useSplitHeroSection'
import { createSlides } from './config/slides'
import ProfileSectionEager from './components/ProfileSection'
import AboutSectionEager from './components/AboutSection'
import SkillsSectionEager from './components/SkillsSection'
import ProjectsSectionEager from './components/ProjectsSection'
import ContactSectionEager from './components/ContactSection'

type SectionComponent = ComponentType<Record<string, unknown>> | LazyExoticComponent<ComponentType<Record<string, unknown>>>

let ProfileSection: SectionComponent
let AboutSection: SectionComponent
let SkillsSection: SectionComponent
let ProjectsSection: SectionComponent
let ContactSection: SectionComponent

if (process.env.NODE_ENV === 'test') {
  ProfileSection = ProfileSectionEager
  AboutSection = AboutSectionEager
  SkillsSection = SkillsSectionEager
  ProjectsSection = ProjectsSectionEager
  ContactSection = ContactSectionEager
} else {
  ProfileSection = lazy(() => import('./components/ProfileSection'))
  AboutSection = lazy(() => import('./components/AboutSection'))
  SkillsSection = lazy(() => import('./components/SkillsSection'))
  ProjectsSection = lazy(() => import('./components/ProjectsSection'))
  ContactSection = lazy(() => import('./components/ContactSection'))
}

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
