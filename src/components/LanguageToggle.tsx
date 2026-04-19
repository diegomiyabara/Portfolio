import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const currentLang = i18n.resolvedLanguage?.startsWith('pt') ? 'pt' : 'en'
  const nextLang = currentLang === 'pt' ? 'en' : 'pt'
  const ariaLabel =
    currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português'

  function handleToggle() {
    i18n.changeLanguage(nextLang)
    localStorage.setItem('language', nextLang)
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="inline-flex items-center gap-2 rounded-full border border-current bg-white/5 px-3 py-1 text-sm font-medium text-current transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span className="font-semibold uppercase">{currentLang}</span>
      <span className="text-xs font-medium text-muted/70">→</span>
      <span className="font-semibold uppercase">{nextLang}</span>
    </button>
  )
}
