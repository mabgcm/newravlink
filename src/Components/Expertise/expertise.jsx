import React from "react";
import { useTranslation } from "react-i18next";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import CounterOnScroll from "../Hooks/CounterOnScroll";

function ExpertiseSection() {
    const { t } = useTranslation();

    return (
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        <div className="expertise-img-layout">
                            <div className="image-container expertise-img">
                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <img
                                        src="/assets/images/team.jpg"
                                        alt="Expertise Image"
                                        className="img-fluid"
                                    />
                                </AnimateOnScroll>
                                <div className="expertise-layout">
                                    <div className="d-flex flex-column">
                                        <div className="card-expertise-wrapper">
                                            <AnimateOnScroll animation="fadeInDown" speed="normal">
                                                <div className="card card-expertise">
                                                    <h4>{t("home.expertise.cardTitle")}</h4>
                                                    <p>{t("home.expertise.cardText")}</p>
                                                    <div className="d-flex align-items-center flex-row gspace-2 expertise-link">
                                                        <a href="./contact" data-fbq-event="ContactCTA" data-fbq-label="expertise-card">
                                                            {t("common.getFreeConsultation")}
                                                        </a>
                                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </AnimateOnScroll>
                                        </div>
                                        <div className="expertise-spacer"></div>
                                    </div>
                                    <div className="expertise-spacer"></div>
                                </div>
                            </div>
                        </div>
                        <div className="expertise-title">
                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>{t("home.expertise.subHeading")}</span>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <h2 className="title-heading">
                                    {t("home.expertise.heading")}
                                </h2>
                            </AnimateOnScroll>
                            <p>
                                {t("home.expertise.description")}
                            </p>
                            <div className="d-flex flex-column flex-md-row gspace-2">
                                <div className="expertise-list">
                                    <h5>{t("home.expertise.listTitle")}</h5>
                                    <ul className="check-list">
                                        {t("home.expertise.list", { returnObjects: true }).map((item, index) => (
                                            <li key={index}>
                                                <a href="./single_services">{item}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <AnimateOnScroll animation="fadeInUp">
                                    <div className="card card-expertise card-expertise-counter animate-box">
                                        <div className="d-flex flex-row gspace-2 align-items-center">
                                            <div className="d-flex flex-row align-items-center">
                                                <CounterOnScroll
                                                    target={19}
                                                    suffix="+"
                                                    counterClassName="counter"
                                                    suffixClassName="counter-detail"
                                                />
                                            </div>
                                            <h6>{t("home.expertise.counterTitle")}</h6>
                                        </div>
                                        <p>
                                            {t("home.expertise.counterText")}
                                        </p>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ExpertiseSection;
