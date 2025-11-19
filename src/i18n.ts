import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { KEY_LANGUAGE } from 'config/constants';
import i18nResources from 'locales';
import { LANG } from './config/constants/index';

i18next.use(initReactI18next).init({
  lng: window.localStorage.getItem(KEY_LANGUAGE) ?? LANG.VI,
  fallbackLng: [LANG.VI, LANG.EN],
  resources: i18nResources,
  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  // debug: import.meta.env.DEV,
});

i18next.services.formatter?.add('lowercase', (value) => {
  return value.toLowerCase();
});

export default i18next;
