import React from "react";
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
                                            <li><a href="/">{t("nav.home")}</a></li>
                                            <li><a href="/service">{t("nav.services")}</a></li>
                                            <li><a href="/case_studies">{t("nav.caseStudies")}</a></li>
                                            <li><a href="/testimonial">{t("nav.testimonials")}</a></li>
                                            <li><a href="/pricing">{t("nav.pricing")}</a></li>
                                            <li><a href="/blog">{t("nav.blog")}</a></li>
                                            <li><a href="/contact">{t("nav.contact")}</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col col-lg-3">
                                    <div className="footer-services-container">
                                        <h5>{t("footer.services")}</h5>
                                        <ul className="footer-list">
                                            {footerServices.map((service, index) => (
                                                <li key={index}>
                                                    <a href="/single_services">{service}</a>
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
                                            <li>(437) 219-6444</li>
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
