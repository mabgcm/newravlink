import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage, useLangPath } from "../Context/LanguageContext";

const Footer = () => {
    const { t } = useTranslation();
    const langPath = useLangPath();
    const { language } = useLanguage();
    const isTurkish = language === "tr";
    const footerServices = [
        { label: "SEO Services", href: "/services/seo-barrie" },
        { label: "Website Design", href: "/services/website-design-barrie" },
        { label: "Meta Ads Management", href: "/services/meta-ads-management" },
        { label: "Contractor Marketing", href: "/services/contractor-marketing" },
    ];
    const footerMarkets = [
        {
            label: isTurkish ? "Toronto SEO Ajansı" : "SEO Agency Toronto",
            href: "/seo-agency-toronto",
        },
        {
            label: isTurkish ? "Toronto Web Tasarım" : "Website Design Toronto",
            href: "/website-design-toronto",
        },
        {
            label: isTurkish ? "Ontario Contractor Marketing" : "Contractor Marketing Ontario",
            href: "/contractor-marketing-ontario",
        },
        {
            label: isTurkish ? "Toronto Meta Ads Ajansı" : "Meta Ads Agency Toronto",
            href: "/meta-ads-agency-toronto",
        },
    ];
    const footerResources = [
        {
            label: isTurkish ? "Google Haritalar SEO Rehberi" : "Google Maps Local SEO Guide",
            href: "/blog/how-toronto-businesses-rank-higher-on-google-maps",
        },
        {
            label: isTurkish ? "Contractor Web Sitesi Dönüşüm Rehberi" : "Contractor Website Conversion Guide",
            href: "/blog/why-most-contractor-websites-dont-convert",
        },
        {
            label: isTurkish ? "Dijital Büyüme Stratejileri" : "Digital Growth Strategies",
            href: "/blog/growth-strategies-for-digital-business",
        },
    ];

    return (
        <div className="section-footer" data-pixel-section="footer">
            <div className="bg-footer-wrapper">
                <div className="bg-footer">
                    <div className="hero-container position-relative z-2">
                        <div className="d-flex flex-column gspace-2">
                            <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 grid-spacer-5">
                                <div className="col col-lg-4">
                                    <div className="footer-logo-container">
                                        <div className="logo-container-footer">
                                            <img src="/assets/images/ravlink-logo.png" alt="Rav Link Inc. logo" className="site-logo img-fluid" loading="lazy" />
                                        </div>
                                        <h4>{t("footer.tagline")}</h4>
                                        <p>
                                            {t("footer.description")}
                                        </p>
                                    </div>
                                </div>

                                <div className="col col-lg-2">
                                    <div className="footer-quick-links">
                                        <h5>{t("footer.quickLinks")}</h5>
                                        <ul className="footer-list">
                                            <li><NavLink to={langPath("/")}>{t("nav.home")}</NavLink></li>
                                            <li><NavLink to={langPath("/services")}>{t("nav.services")}</NavLink></li>
                                            <li><NavLink to={langPath("/case-studies")}>{t("nav.caseStudies")}</NavLink></li>
                                            <li><NavLink to={langPath("/testimonial")}>{t("nav.testimonials")}</NavLink></li>
                                            <li><NavLink to={langPath("/pricing")}>{t("nav.pricing")}</NavLink></li>
                                            <li><NavLink to={langPath("/blog")}>{t("nav.blog")}</NavLink></li>
                                            <li><NavLink to={langPath("/contact")}>{t("nav.contact")}</NavLink></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col col-lg-3">
                                    <div className="footer-services-container">
                                        <h5>{t("footer.services")}</h5>
                                        <ul className="footer-list">
                                            {footerServices.map((service) => (
                                                <li key={service.href}>
                                                    <NavLink to={langPath(service.href)}>{service.label}</NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                        <h5>{isTurkish ? "Hizmet Bölgeleri" : "Markets"}</h5>
                                        <ul className="footer-list">
                                            {footerMarkets.map((market) => (
                                                <li key={market.href}>
                                                    <NavLink to={langPath(market.href)}>{market.label}</NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col col-lg-3">
                                    <div className="footer-contact-container">
                                        <h5>{isTurkish ? "Kaynaklar" : "Resources"}</h5>
                                        <ul className="footer-list">
                                            {footerResources.map((resource) => (
                                                <li key={resource.href}>
                                                    <NavLink to={langPath(resource.href)}>{resource.label}</NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                        <h5>{t("footer.contactInfo")}</h5>
                                        <ul className="contact-list">
                                            <li><a href="mailto:info@ravlink.ca" data-fbq-label="footer-email">info@ravlink.ca</a></li>
                                            <li><a href="tel:+14372196444" data-fbq-label="footer-phone">+1(437) 219-6444</a></li>
                                            <li>Serving businesses across Ontario remotely and on-site.</li>
                                            <li>GTA, Toronto, Vaughan, Richmond Hill, Markham, Mississauga, Brampton, North York, Scarborough, Barrie, and Simcoe County.</li>
                                        </ul>
                                        <div className="d-flex flex-column gspace-1">
                                            <h5>{t("footer.socialMedia")}</h5>
                                            <div className="social-container">
                                                <div className="social-item-wrapper">
                                                    <a href="https://www.facebook.com/ravlinkinc/" className="social-item">
                                                        <i className="fa-brands fa-facebook"></i>
                                                    </a>
                                                </div>
                                                <div className="social-item-wrapper">
                                                    <a href="https://www.instagram.com/rav.link/" className="social-item">
                                                        <i className="fa-brands fa-instagram"></i>
                                                    </a>
                                                </div>
                                                <div className="social-item-wrapper">
                                                    <a href="https://www.linkedin.com/company/rav-link-inc" className="social-item">
                                                        <i className="fa-brands fa-linkedin"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-content-spacer"></div>
                        </div>

                        <div className="copyright-container">
                            <span className="copyright">{t("footer.copyright", { year: new Date().getFullYear() })}</span>
                            <div className="d-flex flex-row gspace-2">
                                <span className="legal-link" aria-disabled="true">{t("footer.terms")}</span>
                                <span className="legal-link" aria-disabled="true">{t("footer.privacy")}</span>
                            </div>
                        </div>

                        <div className="footer-spacer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
