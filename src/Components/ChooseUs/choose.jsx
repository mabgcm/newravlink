import React from "react";
import { useTranslation } from "react-i18next";
import { whychooseus } from "../../Data/ChooseUsData";
import ChooseUsCard from "../Card/ChoooseUsCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function ChooseUsSection() {
    const { t } = useTranslation();

    return (
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        <div className="chooseus-card-container">
                            <div className="d-flex flex-column gspace-2">
                                {whychooseus.slice(0, 3).map((item) => (
                                    <ChooseUsCard
                                        key={item.id}
                                        icon={item.icon}
                                        title={t(item.titleKey)}
                                        content={t(item.contentKey)}
                                        link={item.link}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="chooseus-content-container">
                            <div className="d-flex flex-column gspace-5">
                                <AnimateOnScroll animation="fadeInDown" speed="normal">
                                    <div className="d-flex flex-column gspace-2">
                                        <div className="sub-heading">
                                            <i className="fa-regular fa-circle-dot"></i>
                                            <span>{t("home.chooseUs.subHeading")}</span>
                                        </div>
                                        <h2 className="title-heading">{t("home.chooseUs.heading")}</h2>
                                        <p className="mb-0">{t("home.chooseUs.description")}</p>
                                    </div>
                                </AnimateOnScroll>
                                <div className="image-container">
                                    <img src="/assets/images/choose.jpg" alt="Why Choose Us Image" className="chooseus-img" />
                                    <div className="card-chooseus-cta-layout">
                                        <div className="chooseus-cta-spacer"></div>
                                        <div className="d-flex flex-column align-items-end">
                                            <div className="chooseus-cta-spacer"></div>
                                            <div className="card-chooseus-cta-wrapper">
                                                <AnimateOnScroll animation="fadeInUp" speed="normal">

                                                    <div className="card card-chooseus-cta">
                                                        <h5>{t("home.chooseUs.ctaTitle")}</h5>
                                                        <div className="link-wrapper">
                                                            <a href="./contact" data-fbq-event="ContactCTA" data-fbq-label="chooseus">
                                                                {t("common.letsTalkStrategy")}
                                                            </a>
                                                            <i className="fa-solid fa-circle-arrow-right"></i>
                                                        </div>
                                                    </div>
                                                </AnimateOnScroll>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ChooseUsSection;
