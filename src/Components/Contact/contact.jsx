import React from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "../Form/ContactForm";

const QUESTIONNAIRE_URL = "https://script.google.com/macros/s/AKfycbxedG_GH-sV5clLOAJi_k7NBAF5uvtSfgSvFhZBlfCFw3k25BCx0E6WmWU58a-82WAJ/exec";

const ContactSection = () => {
    const { t } = useTranslation();
    return (
        <div className="section">
            <div className="hero-container">

                {/* Questionnaire banner */}
                <div className="form-layout-wrapper" style={{ marginBottom: "40px" }}>
                    <div className="card form-layout" style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div className="sub-heading" style={{ alignSelf: "flex-start" }}>
                                <i className="fa-regular fa-circle-dot"></i>
                                <span>{t("questionnaire.badge")}</span>
                            </div>
                            <h4 className="title-heading">{t("questionnaire.heading")}</h4>
                            <p style={{ margin: 0 }}>{t("questionnaire.description")}</p>
                        </div>
                        <a
                            href={QUESTIONNAIRE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-accent"
                            data-fbq-event="QuestionnaireCTA"
                            data-fbq-label="contact-page"
                        >
                            <div className="btn-title">
                                <span>{t("questionnaire.button")}</span>
                            </div>
                            <div className="icon-circle">
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="row row-cols-lg-2 row-cols-1 g-5">
                    <div className="col col-lg-5">
                        <div className="contact-title-wrapper">
                            <div className="card contact-title">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>Reach out to us</span>
                                </div>
                                <h2 className="title-heading">Get in Touch</h2>
                                <p>
                                    Reach out to us for tailored digital solutions that drive results sollicitudin nec.
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
                                        <span>Phone Number</span>
                                        <h5>(437) 219-6444</h5>
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
                                        <span>Email Address</span>
                                        <h5>info@ravlink.ca</h5>
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
                                        <span>Office Address</span>
                                        <h5>10 Honeycrisp Cres, Vaughan, Ontario L4K 0M7 Canada</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-7">
                        <div id="success-message" className="alert success hidden">
                            <span className="check-icon">
                                <i className="fa-solid fa-2xl fa-check"></i>
                            </span>
                            <p>Thank you! Form submitted successfully.</p>
                        </div>
                        <div id="error-message" className="alert error hidden">
                            <span className="cross-icon">
                                <i className="fa-solid fa-2xl fa-xmark"></i>
                            </span>
                            <p>Oops! Form submission failed. Please try again.</p>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
