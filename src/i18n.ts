import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import sk from './locales/sk.json';
import en from './locales/en.json';

const resources = {
  sk: {
    translation: sk
  },
  en: {
    translation: en
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sk', // Примусово встановлюємо SK як початкову мову
    fallbackLng: 'sk', // Default language
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    react: {
      useSuspense: false, // Відключаємо, оскільки керуємо готовністю вручну
    }
  });

export default i18n;