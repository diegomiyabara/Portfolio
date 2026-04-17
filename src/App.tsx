import './App.css'
import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import SkillsSection from './components/SkillsSection'

function App() {
  return (
    <Layout>
      <HeroSection />
      <SkillsSection />
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Projects section coming soon</p>
      </section>
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Contact section coming soon</p>
      </section>
    </Layout>
  )
}

export default App
