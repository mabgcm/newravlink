import React from "react";
import { useLanguage } from "../Context/LanguageContext";

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            type="button"
            className="lang-switch"
            onClick={toggleLanguage}
            aria-label="Toggle language"
        >
            <span>{language.toUpperCase()}</span>
        </button>
    );
};

export default LanguageSwitcher;
