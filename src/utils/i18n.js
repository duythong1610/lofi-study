import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import English from "./en.json";
import Vietnamese from "./vi.json";

const resources = {
  en: {
    translation: English,
  },
  vi: {
    translation: Vietnamese,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "vi",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export const getCurrentLang = () => window.localStorage.i18nextLng;

export default i18n;
