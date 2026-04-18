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
    <div className="bg-background text-text min-h-screen flex flex-col overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-primary focus:text-background focus:font-semibold"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 pb-20 overflow-hidden">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-background/95 py-4 text-center text-sm text-muted backdrop-blur-lg">
        <p>© {year} Diego Miyabara. {t('footer.rights')}</p>
        <p className="mt-1 text-xs text-muted/60">{t('footer.madeWith')}</p>
      </footer>
    </div>
  )
}
