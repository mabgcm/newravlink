import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    const footerServices = t("data.footerServices", { returnObjects: true });

    return (
        <div className="section-footer">
            <div className="bg-footer-wrapper">
                <div className="bg-footer">
                    <div className="hero-container position-relative z-2">
                        <div className="d-flex flex-column gspace-2">
                            <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 grid-spacer-5">
                                <div className="col col-lg-4">
                                    <div className="footer-logo-container">
                                        <div className="logo-container-footer">
                                            <img src="/assets/images/marko-logo.png" alt="Logo" className="site-logo img-fluid" />
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
                                            <li><NavLink to="/">{t("nav.home")}</NavLink></li>
                                            <li><NavLink to="/service">{t("nav.services")}</NavLink></li>
                                            <li><NavLink to="/case_studies">{t("nav.caseStudies")}</NavLink></li>
                                            <li><NavLink to="/testimonial">{t("nav.testimonials")}</NavLink></li>
                                            <li><NavLink to="/pricing">{t("nav.pricing")}</NavLink></li>
                                            <li><NavLink to="/blog">{t("nav.blog")}</NavLink></li>
                                            <li><NavLink to="/contact">{t("nav.contact")}</NavLink></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col col-lg-3">
                                    <div className="footer-services-container">
                                        <h5>{t("footer.services")}</h5>
                                        <ul className="footer-list">
                                            {footerServices.map((service, index) => (
                                                <li key={index}>
                                                    <NavLink to="/single_services">{service}</NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col col-lg-3">
                                    <div className="footer-contact-container">
                                        <h5>{t("footer.contactInfo")}</h5>
                                        <ul className="contact-list">
                                            <li>info@ravlink.ca</li>
                                            <li>+1(506)3493512</li>
                                            <li>10 Honeycrisp Cres, Vaughan, Ontario L4K 0M7</li>
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
                                <a href="#" className="legal-link">{t("footer.terms")}</a>
                                <a href="#" className="legal-link">{t("footer.privacy")}</a>
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
