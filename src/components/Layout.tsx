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
    <div className="bg-background text-text min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-primary focus:text-background focus:font-semibold"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16">{children}</main>
      <footer className="py-6 text-center text-sm text-muted border-t border-white/10">
        <p>© {year} Diego Cornejo. {t('footer.rights')}</p>
        <p className="mt-1 text-xs text-muted/60">{t('footer.madeWith')}</p>
      </footer>
    </div>
  )
}
