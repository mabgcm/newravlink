import React from "react";
import { useTranslation } from "react-i18next";
import { whychooseus } from "../../Data/ChooseUsData";
import ChooseUsCard from "../Card/ChoooseUsCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import { useLangPath } from "../Context/LanguageContext";

function ChooseUsAboutSection(){
    const { t } = useTranslation();
    const langPath = useLangPath();

    return(
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        <div className="chooseus-card-container">
                            <div className="d-flex flex-column gspace-2">
                                {whychooseus.slice(3, 6).map((item) => (
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
                                            <span>{t("about.coreValues.subHeading")}</span>
                                        </div>
                                        <h2 className="title-heading">{t("about.coreValues.heading")}</h2>
                                        <p className="mb-0">{t("about.coreValues.description")}</p>
                                    </div>
                                </AnimateOnScroll>
                                <div className="image-container">
                                    <img src="/assets/images/choose.jpg" alt="Why Ontario businesses choose Rav Link" className="chooseus-img" loading="lazy" />
                                    <div className="card-chooseus-cta-layout">
                                        <div className="chooseus-cta-spacer"></div>
                                        <div className="d-flex flex-column align-items-end">
                                            <div className="chooseus-cta-spacer"></div>
                                            <div className="card-chooseus-cta-wrapper">
                                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                                    <div className="card card-chooseus-cta">
                                                        <h5>{t("about.coreValues.ctaTitle")}</h5>
                                                        <div className="link-wrapper">
                                                            <a href={langPath("/growth-check")} data-ga-location="about" data-fbq-event="GrowthCheckCTA" data-fbq-label="chooseus-about">
                                                                {t("common.findMarketingPriority")}
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

export default ChooseUsAboutSection;
