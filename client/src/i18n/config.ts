import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector";
import ua from "../locales/ua/translation.json"
import en from "../locales/en/translation.json"
import uaMain from "../locales/ua/main.json"
import enMain from "../locales/en/main.json"
import uaCategory from "../locales/ua/category.json"
import enCategory from "../locales/en/category.json"

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
        ns: ["translation", "main"],
        defaultNS: "translation",
        debug: true,
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: { 
                translation: en,
                main: enMain,
                category: enCategory
            },
            ua: { 
                translation: ua,
                main: uaMain,
                category: uaCategory
            }
        }
    })