import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import tr from "./tr.json";

const getInitialLanguage = () => {
    if (typeof window === "undefined") {
        return "en";
    }

    const urlLanguage = new URLSearchParams(window.location.search).get("lng");
    if (urlLanguage === "tr" || urlLanguage === "en") {
        return urlLanguage;
    }

    return window.localStorage.getItem("language") || "en";
};

void i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        tr: { translation: tr },
    },
    lng: getInitialLanguage(),
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
