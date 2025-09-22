import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector";
import ua from "../locales/ua/translation.json"
import en from "../locales/en/translation.json"

export const supportedLngs = {
    en: "English",
    ua: "Українська"
}

export default i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: "ua",
        fallbackLng: "en",
        supportedLngs: Object.keys(supportedLngs),
        debug: true,
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: { translation: en },
            ua: { translation: ua }
        }
    })