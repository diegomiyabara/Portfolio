import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useActiveSection } from '../hooks/useActiveSection'
import LanguageToggle from './LanguageToggle'
import SocialIconBar from './SocialIconBar'
import HamburgerMenu from './HamburgerMenu'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact']

const NAV_LINKS = [
  { id: 'home', key: 'navbar.home' },
  { id: 'about', key: 'navbar.about' },
  { id: 'skills', key: 'navbar.skills' },
  { id: 'projects', key: 'navbar.projects' },
  { id: 'contact', key: 'navbar.contact' },
] as const

export default function Navbar() {
  const { t } = useTranslation()
  const activeSection = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-white/10" role="banner">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-primary font-bold text-lg rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary tracking-tight">
          DM<span className="text-text/40">.</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm font-medium transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeSection === id
                  ? 'text-primary'
                  : 'text-muted hover:text-text'
              }`}
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Right side: social + language (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <SocialIconBar />
            <LanguageToggle />
          </div>

          {/* Mobile: language toggle always visible, hamburger for nav */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
          </div>

          <HamburgerMenu
            isOpen={menuOpen}
            onToggle={() => setMenuOpen((v) => !v)}
            onClose={() => setMenuOpen(false)}
            activeSection={activeSection}
          />
        </div>
      </div>
    </header>
  )
}
