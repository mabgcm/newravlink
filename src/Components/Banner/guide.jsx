import React from "react";
import { useTranslation } from "react-i18next";
// import VideoButton from "../Video/VideoButton";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function GuideBannerSection() {
    const { t } = useTranslation();

    return (
        <>
            <div className="section-guide">
                <div className="guide-banner">
                    <div className="hero-container">
                        <AnimateOnScroll animation="fadeInUp" speed="normal">
                            <div className="guide-content">
                                <a
                                    href="./contact"
                                    className="btn btn-accent w-50"
                                    data-fbq-event="ContactCTA"
                                    data-fbq-label="guide-banner"
                                >
                                    <div className="btn-title">
                                        <span>{t("common.getStarted2")}</span>
                                    </div>
                                    <div className="icon-circle" >
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                </a>
                                <div className="d-flex flex-column gspace-2">
                                    <h3 className="title-heading">{t("home.guide.heading")}</h3>
                                    <p>{t("home.guide.description")}</p>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GuideBannerSection;
