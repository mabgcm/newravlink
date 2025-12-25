import React from "react";
import { useTranslation } from "react-i18next";
import { services } from "../../Data/ServiceData";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const SingleServiceSection = () => {
    const { t } = useTranslation();
    const serviceDetails = t("singleServicePage.services", { returnObjects: true });
    const highlights = t("singleServicePage.highlights", { returnObjects: true });

    return (
        <div className="section pb-0">
            <div className="hero-container">
                <div className="d-flex flex-column gspace-5">
                    <div className="image-container">
                        <img
                            src="/assets/images/servicehero.jpeg"
                            alt="Service Image"
                            className="single-service-img"
                        />
                        <div className="single-service-title-layout">
                            <div>
                                <div className="single-service-spacer"></div>
                                <div className="single-service-title-wrapper">
                                    <div className="single-service-title">
                                        <AnimateOnScroll animation="fadeInRight" speed="slow">
                                            <div className="sub-heading">
                                                <i className="fa-regular fa-circle-dot"></i>
                                                <span>{t("singleServicePage.subHeading")}</span>
                                            </div>
                                        </AnimateOnScroll>
                                        <AnimateOnScroll animation="fadeInRight" speed="normal">
                                            <h3 className="title-heading">
                                                {t("singleServicePage.title")}
                                            </h3>
                                        </AnimateOnScroll>
                                        <p>
                                            {t("singleServicePage.description")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="single-service-spacer"></div>
                        </div>
                    </div>

                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                        <div className="col col-lg-8">
                            <div className="d-flex flex-column gspace-2">
                                <h4>{t("singleServicePage.overviewTitle")}</h4>
                                <p>
                                    {t("singleServicePage.overviewDescription")}
                                </p>
                                <div className="row row-cols-md-2 row-cols-1 grid-spacer-2">
                                    {serviceDetails.map((item, index) => (
                                        <div className="col" key={index}>
                                            <div className="d-flex flex-column gspace-1">
                                                <h5>{item.title}</h5>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="row row-cols-md-2 row-cols-1 grid-spacer-2 grid-spacer-md-3">
                                    <div className="col">
                                        <div className="image-container">
                                            <img
                                                src="/assets/images/service1.jpeg"
                                                alt="Service Image"
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="image-container">
                                            <img
                                                src="/assets/images/service2.jpeg"
                                                alt="Service Image"
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card service-included">
                                    <h4>{t("singleServicePage.includedTitle")}</h4>
                                    <div className="underline-accent-short"></div>
                                    <p>
                                        {t("singleServicePage.includedDescription")}
                                    </p>
                                    <div className="row row-cols-md-2 row-cols-1 grid-spacer-2">
                                        <div className="col">
                                            <ul className="check-list">
                                                {t("singleServicePage.includedLeft", { returnObjects: true }).map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <ul className="check-list">
                                                {t("singleServicePage.includedRight", { returnObjects: true }).map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <h4>{t("singleServicePage.whyTitle")}</h4>
                                <p>
                                    {t("singleServicePage.whyDescription")}
                                </p>

                                <div className="row row-cols-2">
                                    <div className="col">
                                        <div className="d-flex flex-column gspace-2">
                                            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gspace-1">
                                                <i className="fa-regular fa-2x fa-circle-check accent-color"></i>
                                                <div className="d-flex flex-column gspace-0">
                                                    <h5>{highlights[0].title}</h5>
                                                    <p>{highlights[0].description}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gspace-1">
                                                <i className="fa-regular fa-2x fa-circle-check accent-color"></i>
                                                <div className="d-flex flex-column gspace-0">
                                                    <h5>{highlights[1].title}</h5>
                                                    <p>{highlights[1].description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex flex-column gspace-2">
                                            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gspace-1">
                                                <i className="fa-regular fa-2x fa-circle-check accent-color"></i>
                                                <div className="d-flex flex-column gspace-0">
                                                    <h5>{highlights[2].title}</h5>
                                                    <p>{highlights[2].description}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gspace-1">
                                                <i className="fa-regular fa-2x fa-circle-check accent-color"></i>
                                                <div className="d-flex flex-column gspace-0">
                                                    <h5>{highlights[3].title}</h5>
                                                    <p>{highlights[3].description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-4">
                            <div className="d-flex flex-column flex-md-row flex-lg-column justify-content-between gspace-5">
                                <div className="card service-recent">
                                    <h4>Recent Services</h4>
                                    <div className="underline-accent-short"></div>
                                    <ul className="single-service-list">
                                        {services.map((service) => (
                                            <li key={service.id}>
                                                <a href={service.link} className="hover:underline">
                                                    {t(service.titleKey)}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="cta-service-banner">
                                    <div className="spacer"></div>
                                    <h3 className="title-heading">{t("singleServicePage.ctaTitle")}</h3>
                                    <p>{t("singleServicePage.ctaDescription")}</p>
                                    <div className="link-wrapper">
                                        <a href="contact">{t("singleServicePage.ctaLink")}</a>
                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleServiceSection;
