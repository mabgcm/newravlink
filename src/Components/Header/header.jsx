import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Language/LanguageSwitcher";
import ThemeSwitcher from "../Theme/themeswitch";

function Navbar() {
    const { t } = useTranslation();
    return (
        <div className="navbar-wrapper">
            <nav className="navbar navbar-expand-lg">
                <div className="navbar-container">
                    <div className="logo-container">
                        <NavLink className="navbar-brand" to="/">
                            <img
                                src="/assets/images/ravlink-logo.png"
                                className="site-logo img-fluid"
                                alt="Logo"
                            />
                        </NavLink>
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

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" end>
                                    {t("nav.home")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/service" className="nav-link">
                                    {t("nav.services")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/case_studies" className="nav-link">
                                    {t("nav.caseStudies")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/testimonial" className="nav-link">
                                    {t("nav.testimonials")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/pricing" className="nav-link">
                                    {t("nav.pricing")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/blog" className="nav-link">
                                    {t("nav.blog")}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/contact" className="nav-link">
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
                        <a className="navbar-icon-wrapper" href="tel:+14372196444" aria-label="Call (437) 219-6444">
                            <div className="icon-circle">
                                <i className="fa-solid fa-phone-volume"></i>
                            </div>
                            <h6>(437) 219-6444</h6>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
