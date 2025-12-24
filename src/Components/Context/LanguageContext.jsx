import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../../i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        if (typeof window === "undefined") {
            return "en";
        }
        const urlLanguage = new URLSearchParams(window.location.search).get("lng");
        if (urlLanguage === "tr" || urlLanguage === "en") {
            return urlLanguage;
        }
        return window.localStorage.getItem("language") || "en";
    });

    useEffect(() => {
        i18n.changeLanguage(language);
        if (typeof window !== "undefined") {
            window.localStorage.setItem("language", language);
            const url = new URL(window.location.href);
            url.searchParams.set("lng", language);
            window.history.replaceState(null, "", url.toString());
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "tr" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
