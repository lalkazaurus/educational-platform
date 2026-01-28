import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector";
import ua from "../locales/ua/translation.json"
import en from "../locales/en/translation.json"
import uaMain from "../locales/ua/main.json"
import enMain from "../locales/en/main.json"
import uaCategory from "../locales/ua/category.json"
import enCategory from "../locales/en/category.json"
import uaAddStudent from "../locales/ua/add-student.json"
import enAddStudent  from "../locales/en/add-student.json"
import uaAddSubject from "../locales/ua/add-subject.json"
import enAddSubject  from "../locales/en/add-subject.json"
import enAddTeacherProfile from "../locales/en/add-teacher-profile.json"
import uaAddTeacherProfile from "../locales/ua/add-teacher-profile.json"
import enChangePassword from "../locales/en/change-password.json"
import uaChangePassword from "../locales/ua/change-password.json"
import enProfile from "../locales/en/profile.json"
import uaProfile from "../locales/ua/profile.json"

export const supportedLngs = {
    en: "English",
    ua: "Українська"
}

export default i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en", 
        supportedLngs: Object.keys(supportedLngs),
        ns: ["translation", "main"],
        defaultNS: "translation",
        debug: true,
        
        detection: {
            order: ['localStorage', 'cookie'], 
            caches: ['localStorage'],   
        },

        interpolation: {
            escapeValue: false
        },
        resources: {
             en: { 
                translation: en,
                main: enMain,
                category: enCategory,
                addStudent: enAddStudent,
                addSubject: enAddSubject,
                addTeacherProfile: enAddTeacherProfile,
                changePassword: enChangePassword,
                profile: enProfile
            },
            ua: { 
                translation: ua,
                main: uaMain,
                category: uaCategory,
                addStudent: uaAddStudent,
                addSubject: uaAddSubject,
                addTeacherProfile: uaAddTeacherProfile,
                changePassword: uaChangePassword,
                profile: uaProfile
            }
        }
    })