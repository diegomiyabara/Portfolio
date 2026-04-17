import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const nextLang = currentLang === 'pt' ? 'en' : 'pt'
  const ariaLabel =
    currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português'

  function handleToggle() {
    i18n.changeLanguage(nextLang)
    sessionStorage.setItem('language', nextLang)
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={ariaLabel}
      className="rounded border border-current px-3 py-1 text-sm font-medium hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current transition-colors"
    >
      {t('languageToggle.label')}
    </button>
  )
}
