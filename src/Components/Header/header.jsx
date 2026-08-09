import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Language/LanguageSwitcher";
import ThemeSwitcher from "../Theme/themeswitch";
import { useLangPath } from "../Context/LanguageContext";

function Navbar() {
    const { t } = useTranslation();
    const langPath = useLangPath();
    return (
        <div className="navbar-wrapper">
            <nav className="navbar navbar-expand-lg">
                <div className="navbar-container">
                    <div className="logo-container">
                        <NavLink className="navbar-brand" to={langPath("/")} data-fbq-event="NavClick" data-fbq-label="logo">
                            <img
                                src="/assets/images/ravlink-logo.png"
                                className="site-logo img-fluid"
                                alt="Rav Link Inc. logo"
                            />
                        </NavLink>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to={langPath("/")} className="nav-link" end data-fbq-event="NavClick" data-fbq-label="home">
                                    {t("nav.home")}
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle"
                                    type="button"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    data-fbq-event="NavClick"
                                    data-fbq-label="about"
                                >
                                    {t("nav.about")} <i className="fa-solid fa-angle-down accent-color"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to={langPath("/services")} className="dropdown-item" data-fbq-event="NavClick" data-fbq-label="services">
                                            {t("nav.services")}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={langPath("/case-studies")} className="dropdown-item" data-fbq-event="NavClick" data-fbq-label="case-studies">
                                            {t("nav.caseStudies")}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={langPath("/testimonial")} className="dropdown-item" data-fbq-event="NavClick" data-fbq-label="testimonials">
                                            {t("nav.testimonials")}
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <NavLink to={langPath("/pricing")} className="nav-link" data-fbq-event="NavClick" data-fbq-label="pricing">
                                    {t("nav.pricing")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to={langPath("/blog")} className="nav-link" data-fbq-event="NavClick" data-fbq-label="blog">
                                    {t("nav.blog")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to={langPath("/growth-check")} className="nav-link" data-ga-location="header" data-fbq-event="NavClick" data-fbq-label="growth-check">
                                    {t("nav.growthCheck")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to={langPath("/contact")} className="nav-link" data-fbq-event="NavClick" data-fbq-label="contact">
                                    {t("nav.contact")}
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Navbar Action */}
                    <div className="navbar-action-container">
                        <div className="navbar-action-button">
                            <ThemeSwitcher />
                            <LanguageSwitcher />
                        </div>
                        <button
                            className="navbar-toggler nav-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
