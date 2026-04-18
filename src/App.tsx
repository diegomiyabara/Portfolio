import './App.css'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import SectionSlider from './components/SectionSlider'
import { useSplitHeroSection } from './hooks/useSplitHeroSection'
import { createSlides } from './config/slides'

function App() {
  const { t } = useTranslation()
  const shouldSplitHero = useSplitHeroSection()
  const slides = createSlides(t, shouldSplitHero)

  return (
    <Layout>
      <SectionSlider slides={slides} />
    </Layout>
  )
}

export default App
