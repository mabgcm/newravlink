import React from "react";
import LeadWizard from "../LeadWizard/LeadWizard";

const ContactSection = () => {
    return (
        <div className="section">
            <div className="hero-container">
                <div className="row row-cols-lg-2 row-cols-1 g-5">
                    <div className="col col-lg-5 order-2 order-lg-1">
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
                    <div className="col col-lg-7 order-1 order-lg-2">
                        <LeadWizard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
