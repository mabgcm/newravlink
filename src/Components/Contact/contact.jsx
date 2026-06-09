import React from "react";
import { useTranslation } from "react-i18next";
import LeadWizard from "../LeadWizard/LeadWizard";

const ContactSection = () => {
    const { t } = useTranslation();

    return (
        <div className="section" data-pixel-section="contact">
            <div className="hero-container">
                <div className="row row-cols-lg-2 row-cols-1 g-5">
                    <div className="col col-lg-5 order-2 order-lg-1">
                        <div className="contact-title-wrapper">
                            <div className="card contact-title">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>{t("contactPage.card.subHeading")}</span>
                                </div>
                                <h2 className="title-heading">{t("contactPage.card.title")}</h2>
                                <p>
                                    {t("contactPage.card.description")}
                                </p>
                                <div className="d-flex flex-column flex-md-row align-items-center text-md-start text-center gspace-2">
                                    <div>
                                        <div className="icon-wrapper">
                                            <div className="icon-box">
                                                <i className="fa-solid fa-phone-volume accent-color"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-grid">
                                        <span>{t("contactPage.card.phoneLabel")}</span>
	                                        <h5>
                                                <a href="tel:+14372196444" data-fbq-label="contact-card-phone">(437) 219-6444</a>
                                            </h5>
                                    </div>
                                </div>
                                <div className="d-flex flex-column flex-md-row align-items-center text-md-start text-center gspace-2">
                                    <div>
                                        <div className="icon-wrapper">
                                            <div className="icon-box">
                                                <i className="fa-solid fa-envelope accent-color"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-grid">
                                        <span>{t("contactPage.card.emailLabel")}</span>
	                                        <h5>
                                                <a href="mailto:info@ravlink.ca" data-fbq-label="contact-card-email">info@ravlink.ca</a>
                                            </h5>
                                    </div>
                                </div>
                                <div className="d-flex flex-column flex-md-row align-items-center text-md-start text-center gspace-2">
                                    <div>
                                        <div className="icon-wrapper">
                                            <div className="icon-box">
                                                <i className="fa-solid fa-location-dot accent-color"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-grid">
                                        <span>{t("contactPage.card.serviceAreaLabel")}</span>
                                        <h5>{t("contactPage.card.serviceArea")}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-7 order-1 order-lg-2">
                        <LeadWizard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
