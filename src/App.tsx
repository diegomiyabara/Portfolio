import './App.css'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import SectionSlider from './components/SectionSlider'
import { useSplitHeroSection } from './hooks/useSplitHeroSection'
import { createSlides } from './config/slides'

function App() {
  const { t } = useTranslation()
  const shouldSplitHero = useSplitHeroSection()
  const slides = createSlides(t, shouldSplitHero)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  return (
    <Layout activeSlideIndex={activeSlideIndex} onSlideChange={setActiveSlideIndex}>
      <SectionSlider slides={slides} activeIndex={activeSlideIndex} onSlideChange={setActiveSlideIndex} />
    </Layout>
  )
}

export default App
