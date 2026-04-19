import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ptJSON from './locales/pt.json'
import enJSON from './locales/en.json'

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') ?? 'en' : 'en'

i18next.use(initReactI18next).init({
  resources: {
    pt: { translation: ptJSON },
    en: { translation: enJSON },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
