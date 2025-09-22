import i18n from "i18next"
import { initReactI18next } from "react-i18next"

export const supportedLngs = {
    en: "English",
    ua: "Українська"
}

export default i18n
    .use(initReactI18next)
    .init({
        lng: "ua",
        fallbackLng: "en",
        supportedLngs: Object.keys(supportedLngs),
        debug: true,
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: {
                    hello_world: "Hello world!"
                }
            },
            ua: {
                translation: {
                    hello_world: "Привіт світ!"
                }
            }
        }
    })