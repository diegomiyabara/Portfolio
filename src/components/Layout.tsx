import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
  activeSlideIndex?: number
  onSlideChange?: (index: number) => void
}

export default function Layout({ children, activeSlideIndex, onSlideChange }: LayoutProps) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <div className="bg-background text-text min-h-screen flex flex-col overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-background"
      >
        Skip to main content
      </a>
      <Navbar activeSlideIndex={activeSlideIndex} onSlideChange={onSlideChange} />
      <main id="main-content" className="flex-1 pt-16 pb-20 overflow-hidden">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-background/95 py-4 text-center text-sm text-muted backdrop-blur-lg">
        <p>&copy; {year} Diego Miyabara. {t('footer.rights')}</p>
        <p className="mt-1 text-xs text-muted/60">{t('footer.madeWith')}</p>
      </footer>
    </div>
  )
}
