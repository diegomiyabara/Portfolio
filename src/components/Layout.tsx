import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-background"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 overflow-x-hidden pt-16 pb-10 md:pb-20">
        {children}
      </main>
      <footer className="border-t border-white/10 bg-background/95 py-4 text-center text-sm text-muted backdrop-blur-lg md:fixed md:bottom-0 md:left-0 md:right-0 md:z-40">
        <p>&copy; {year} Diego Miyabara. {t('footer.rights')}</p>
        <p className="mt-1 text-xs text-muted/60">{t('footer.madeWith')}</p>
      </footer>
    </div>
  )
}
