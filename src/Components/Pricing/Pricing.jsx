import React from "react";
import { useTranslation } from "react-i18next";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function PricingPlanSection() {
    const { t } = useTranslation();
    const startCheckout = (plan) => async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            });
            const data = await res.json();
            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            // no-op
        }
    };

    return (
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column justify-content-center text-center gspace-5">
                    <AnimateOnScroll animation="fadeInUp" speed="normal">
                        <div className="d-flex flex-column gspace-2">
                            <div className="sub-heading align-self-center">
                                <i className="fa-regular fa-circle-dot"></i>
                                <span>{t("home.pricing.subHeading")}</span>
                            </div>
                            <h2 className="title-heading heading-container heading-container-short">
                                {t("home.pricing.heading")}
                            </h2>
                        </div>
                    </AnimateOnScroll>
                    <div className="row row-cols-lg-3 row-cols-1 grid-spacer-2">
                        <div className="col">
                            <div className="pricing-container">
                                <AnimateOnScroll animation="fadeInLeft" speed="normal">
                                    <div className="card card-pricing-title">
                                        <div className="spacer" />
                                        <div className="content">
                                            <h3 className="title-heading">{t("home.pricing.introTitle")}</h3>
                                            <div className="link-wrapper">
                                                <a href="./contact" data-fbq-event="ContactCTA" data-fbq-label="pricing-intro">
                                                    {t("common.bookFreeConsultation")}
                                                </a>
                                                <i className="fa-solid fa-arrow-circle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <div className="card card-pricing">
                                        <h4>{t("home.pricing.starter.name")}</h4>
                                        <p>{t("home.pricing.starter.description")}</p>
                                        <div className="d-flex flex-row gspace-1 align-items-center h-100">
                                            <h3>$600</h3>
                                            <p>{t("home.pricing.starter.priceSuffix")}</p>
                                        </div>
                                        <a href="#" className="btn btn-accent" onClick={startCheckout("starter")}>
                                            <div className="btn-title">
                                                <span>{t("common.shopNow")}</span>
                                            </div>
                                            <div className="icon-circle">
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                        </a>
                                        <ul className="check-list">
                                            {t("home.pricing.starter.features", { returnObjects: true }).map((item, index) => (
                                                <li key={index}>
                                                    <a href="./single_services">{item}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                        <div className="col">
                            <AnimateOnScroll animation="fadeInUp" speed="slow">
                                <div className="card card-pricing pricing-highlight">
                                    <div className="spacer" />
                                    <h4>{t("home.pricing.growth.name")}</h4>
                                    <p>{t("home.pricing.growth.description")}</p>
                                    <div className="d-flex flex-row gspace-1 align-items-center">
                                        <h3>$1,000</h3>
                                        <p>{t("home.pricing.growth.priceSuffix")}</p>
                                    </div>
                                    <a href="#" className="btn btn-accent" onClick={startCheckout("growth")}>
                                        <div className="btn-title">
                                            <span>{t("common.shopNow")}</span>
                                        </div>
                                        <div className="icon-circle">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </a>

                                    <div className="core-benefits">
                                        {t("home.pricing.growth.benefits", { returnObjects: true }).map((item, index) => (
                                            <div className="benefit" key={index}>
                                                {index === 0 && <i className="fa-solid fa-brain"></i>}
                                                {index === 1 && <i className="fa-brands fa-accessible-icon"></i>}
                                                {index === 2 && <i className="fa-solid fa-bug"></i>}
                                                <a href="#">{item}</a>
                                            </div>
                                        ))}
                                    </div>

                                    <ul className="check-list">
                                        {t("home.pricing.growth.features", { returnObjects: true }).map((item, index) => (
                                            <li key={index}>
                                                <a href="#">{item}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimateOnScroll>
                        </div>
                        <div className="col">
                            <div className="pricing-container">
                                <AnimateOnScroll animation="fadeInRight" speed="normal">
                                    <div className="card pricing-highlight-box">
                                        <div className="d-flex flex-column gspace-2 w-100">
                                            <h5>{t("home.pricing.highlight.title")}</h5>
                                            <div className="d-flex flex-column gspace-2">
                                                {t("home.pricing.highlight.items", { returnObjects: true }).map((item, index) => (
                                                    <div className="pricing-highlights" key={index}>
                                                        <a href="#">{item}</a>
                                                        <i className="fa-solid fa-arrow-circle-right"></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="spacer" />
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <div className="card card-pricing">
                                        <h4>{t("home.pricing.scale.name")}</h4>
                                        <p>{t("home.pricing.scale.description")}</p>
                                        <div className="d-flex flex-row gspace-1 align-items-center h-100">
                                            <h3>$1,700</h3>
                                            <p>{t("home.pricing.scale.priceSuffix")}</p>
                                        </div>
                                        <a href="#" className="btn btn-accent" onClick={startCheckout("scale")}>
                                            <div className="btn-title">
                                                <span>{t("common.shopNow")}</span>
                                            </div>
                                            <div className="icon-circle">
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                        </a>
                                        <ul className="check-list">
                                            {t("home.pricing.scale.features", { returnObjects: true }).map((item, index) => (
                                                <li key={index}>
                                                    <a href="./single_services">{item}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PricingPlanSection;
