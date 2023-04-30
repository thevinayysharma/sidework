import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";

//translations imports
import translationEN from "./locales/en/translation.json";
import translationHE from "./locales/hn/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  hn: {
    translation: translationHE,
  },
};

//i18N Initialization

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", //default language
    debug: true,
    "ns":  "translation",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
