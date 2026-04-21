import React from "react";
import { useLanguage } from "../Context/LanguageContext";
import { trackMetaCustom } from "../../analytics/metaPixel";

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();
    const nextLanguage = language === "en" ? "tr" : "en";

    const handleClick = () => {
        trackMetaCustom("LanguageChange", {
            from_language: language,
            to_language: nextLanguage,
        });
        toggleLanguage();
    };

    return (
        <button
            type="button"
            className="lang-switch"
            onClick={handleClick}
            aria-label="Toggle language"
        >
            <span>{language.toUpperCase()}</span>
        </button>
    );
};

export default LanguageSwitcher;
