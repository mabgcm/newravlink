import React from "react";
import { useTranslation } from "react-i18next";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const BannerInnerSection = ({ title, currentPage }) => {
    const { t } = useTranslation();

    return (
        <div className="section-banner">
            <div className="banner-layout-wrapper banner-inner">
                <div className="banner-layout">
                    <div className="d-flex flex-column text-center align-items-center gspace-2">
                        <AnimateOnScroll animation="fadeInRight" speed="normal">
                            <h2 className="title-heading">
                                {title}
                            </h2>
                        </AnimateOnScroll>
                        <nav className="breadcrumb">
                            <a href="/" className="gspace-2">{t("nav.home")}</a>
                            <span className="separator-link">/</span>
                            <p className="current-page">{currentPage}</p>
                        </nav>
                    </div>
                    <div className="spacer"></div>
                </div>
            </div>
        </div>
    );
};

export default BannerInnerSection;
