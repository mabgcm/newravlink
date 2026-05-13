import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import i18n from "../../i18n";

const LanguageContext = createContext();

const getLangFromPath = (pathname) => (pathname.startsWith("/tr") ? "tr" : "en");

export const LanguageProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const language = getLangFromPath(location.pathname);

    // One-time redirect: ?lng=tr → /tr/path, ?lng=en → /path (removes param)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const lngParam = params.get("lng");
        if (lngParam === "tr" || lngParam === "en") {
            params.delete("lng");
            const search = params.toString() ? `?${params.toString()}` : "";
            const cleanPath = location.pathname.replace(/^\/tr/, "") || "/";
            const prefix = lngParam === "tr" ? "/tr" : "";
            navigate(`${prefix}${cleanPath}${search}${location.hash}`, { replace: true });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Keep i18n and localStorage in sync with URL language
    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
    }, [language]);

    const value = useMemo(() => ({
        language,
        toggleLanguage: () => {
            const newLang = language === "en" ? "tr" : "en";
            const cleanPath = location.pathname.replace(/^\/tr/, "") || "/";
            const newPath = newLang === "tr" ? `/tr${cleanPath}` : cleanPath;
            navigate(`${newPath}${location.search}${location.hash}`);
        },
    }), [language, location.pathname, location.search, location.hash, navigate]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

export const useLangPath = () => {
    const { language } = useLanguage();
    return (path) => (language === "tr" ? `/tr${path}` : path);
};
