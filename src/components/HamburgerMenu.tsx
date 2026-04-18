import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'

interface HamburgerMenuProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  activeSection: string
  showProfileLink: boolean
}

const BASE_NAV_LINKS = [
  { id: 'home', key: 'navbar.home' },
  { id: 'about', key: 'navbar.about' },
  { id: 'skills', key: 'navbar.skills' },
  { id: 'projects', key: 'navbar.projects' },
  { id: 'contact', key: 'navbar.contact' },
] as const

export default function HamburgerMenu({
  isOpen,
  onToggle,
  onClose,
  activeSection,
  showProfileLink,
}: HamburgerMenuProps) {
  const { t } = useTranslation()
  const navLinks = showProfileLink
    ? [{ id: 'profile', key: 'navbar.profile' as const }, ...BASE_NAV_LINKS]
    : [...BASE_NAV_LINKS]

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-surface border-b border-white/10 py-4"
          >
            <ul className="flex flex-col">
              {navLinks.map(({ id, key }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={onClose}
                    className={`block px-6 py-3 text-sm font-medium transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                      activeSection === id
                        ? 'text-primary'
                        : 'text-muted hover:text-text'
                    }`}
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
