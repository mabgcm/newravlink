import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessageVisible(true);
      setSuccessMessageVisible(false);
      setTimeout(() => setErrorMessageVisible(false), 3000);
      return;
    }

    setSuccessMessageVisible(true);
    setErrorMessageVisible(false);
    e.target.reset();
    setEmail(""); 
    setTimeout(() => setSuccessMessageVisible(false), 3000);
  };

  return (
    <div className="form-layout-wrapper">
        <div className="card form-layout">
            <h3 className="title-heading">{t("contactForm.title")}</h3>

            {successMessageVisible && (
            <div id="success-message" className="alert success">
                <span className="check-icon">
                    <i className="fa-solid fa-check"></i>
                </span>
                <p className="text-center">{t("contactForm.successMessage")}</p>
            </div>
            )}

            {errorMessageVisible && (
            <div id="error-message" className="alert error">
                <span className="cross-icon">
                <i className="fa-solid fa-xmark"></i>
                </span>
                <p className="text-center">{t("contactForm.errorMessage")}</p>
            </div>
            )}

            <form
            onSubmit={handleSubmit}
            id="contactForm"
            className="form needs-validation"
            >
                <div className="row row-cols-md-2 row-cols-1 g-3">
                    <div className="col">
                        <label htmlFor="fullName">{t("contactForm.labels.fullName")}</label>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder={t("contactForm.placeholders.fullName")}
                          required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="phone">{t("contactForm.labels.phone")}</label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder={t("contactForm.placeholders.phone")}
                          required
                        />
                    </div>
                </div>

                <div className="row row-cols-md-2 row-cols-1 g-3">
                        <div className="col">
                            <label htmlFor="email">{t("contactForm.labels.email")}</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder={t("contactForm.placeholders.email")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="businessName">{t("contactForm.labels.businessName")}</label>
                            <input
                              type="text"
                              name="businessName"
                              id="businessName"
                              placeholder={t("contactForm.placeholders.businessName")}
                            />
                        </div>
                </div>

                <div className="row row-cols-md-2 row-cols-1 g-3">
                    <div className="col">
                        <label htmlFor="websiteOrSocial">{t("contactForm.labels.websiteOrSocial")}</label>
                        <input
                          type="url"
                          name="websiteOrSocial"
                          id="websiteOrSocial"
                          placeholder={t("contactForm.placeholders.websiteOrSocial")}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="location">{t("contactForm.labels.location")}</label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          placeholder={t("contactForm.placeholders.location")}
                        />
                    </div>
                </div>

                <div className="row row-cols-md-2 row-cols-1 g-3">
                    <div className="col">
                        <label htmlFor="businessType">{t("contactForm.labels.businessType")}</label>
                        <div className="select-wrap">
                            <select name="businessType" id="businessType">
                                <option value="">{t("contactForm.placeholders.select")}</option>
                                <option value="local-business">{t("contactForm.options.businessType.localBusiness")}</option>
                                <option value="ecommerce">{t("contactForm.options.businessType.ecommerce")}</option>
                                <option value="service-industry">{t("contactForm.options.businessType.serviceIndustry")}</option>
                                <option value="health-beauty">{t("contactForm.options.businessType.healthBeauty")}</option>
                                <option value="other">{t("contactForm.options.businessType.other")}</option>
                            </select>
                            <span className="select-arrow icon-circle" aria-hidden="true">
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="monthlyAdBudget">{t("contactForm.labels.monthlyAdBudget")}</label>
                        <div className="select-wrap">
                            <select name="monthlyAdBudget" id="monthlyAdBudget">
                                <option value="">{t("contactForm.placeholders.select")}</option>
                                <option value="not-sure">{t("contactForm.options.monthlyAdBudget.notSure")}</option>
                                <option value="0-500">{t("contactForm.options.monthlyAdBudget.range1")}</option>
                                <option value="500-1500">{t("contactForm.options.monthlyAdBudget.range2")}</option>
                                <option value="1500-5000">{t("contactForm.options.monthlyAdBudget.range3")}</option>
                                <option value="5000-plus">{t("contactForm.options.monthlyAdBudget.range4")}</option>
                            </select>
                            <span className="select-arrow icon-circle" aria-hidden="true">
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-md-2 row-cols-1 g-3">
                    <div className="col">
                        <label htmlFor="goal">{t("contactForm.labels.goal")}</label>
                        <div className="select-wrap">
                            <select name="goal" id="goal">
                                <option value="">{t("contactForm.placeholders.select")}</option>
                                <option value="more-customers">{t("contactForm.options.goal.moreCustomers")}</option>
                                <option value="brand-awareness">{t("contactForm.options.goal.brandAwareness")}</option>
                                <option value="increase-online-sales">{t("contactForm.options.goal.increaseOnlineSales")}</option>
                                <option value="grow-social-media">{t("contactForm.options.goal.growSocialMedia")}</option>
                            </select>
                            <span className="select-arrow icon-circle" aria-hidden="true">
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="servicesInterested">{t("contactForm.labels.servicesInterested")}</label>
                        <div className="select-wrap">
                            <select name="servicesInterested" id="servicesInterested">
                                <option value="">{t("contactForm.placeholders.select")}</option>
                                <option value="social-media-management">{t("contactForm.options.servicesInterested.socialMediaManagement")}</option>
                                <option value="meta-ads">{t("contactForm.options.servicesInterested.metaAds")}</option>
                                <option value="seo">{t("contactForm.options.servicesInterested.seo")}</option>
                                <option value="website-landing-page">{t("contactForm.options.servicesInterested.websiteLanding")}</option>
                                <option value="email-marketing">{t("contactForm.options.servicesInterested.emailMarketing")}</option>
                            </select>
                            <span className="select-arrow icon-circle" aria-hidden="true">
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 g-3">
                    <div className="col">
                        <label htmlFor="currentlyRunningAds">
                            {t("contactForm.labels.currentlyRunningAds")}
                        </label>
                        <div className="select-wrap">
                            <select name="currentlyRunningAds" id="currentlyRunningAds">
                                <option value="">{t("contactForm.placeholders.select")}</option>
                                <option value="yes-active">{t("contactForm.options.currentlyRunningAds.yesActive")}</option>
                                <option value="sometimes">{t("contactForm.options.currentlyRunningAds.sometimes")}</option>
                                <option value="no">{t("contactForm.options.currentlyRunningAds.no")}</option>
                            </select>
                            <span className="select-arrow icon-circle" aria-hidden="true">
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <label htmlFor="message">{t("contactForm.labels.message")}</label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder={t("contactForm.placeholders.message")}
                ></textarea>

                <div className="form-button-container">
                        <button type="submit" className="btn btn-accent">
                            <span className="btn-title">
                                <span>{t("contactForm.submit")}</span>
                            </span>
                            <span className="icon-circle">
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ContactForm;
