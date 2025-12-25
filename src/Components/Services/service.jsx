import React from "react";
import { useTranslation } from "react-i18next";
import { services } from "../../Data/ServiceData";
import ServiceCard from "../Card/ServiceCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function ServiceSection(){
    const { t } = useTranslation();

    return(
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column justify-content-center text-center gspace-5">
                        <div className="d-flex flex-column justify-content-center text-center gspace-2">
                            <AnimateOnScroll animation="fadeInDown" speed="normal">    
                                <div className="sub-heading align-self-center">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>{t("home.services.subHeading")}</span>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fadeInDown" speed="normal">
                                <h2 className="title-heading heading-container heading-container-medium">
                                    {t("home.services.heading")}
                                </h2>
                            </AnimateOnScroll>
                        </div>
                        <div className="card-service-wrapper">
                            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 grid-spacer-2">
                                {services.map((item) => (
                                    <div className="col" key={item.id}>
                                        <ServiceCard 
                                            icon={item.icon}
                                            title={t(item.titleKey)}
                                            content={t(item.contentKey)}
                                            speed={item.speed}
                                            link={item.link}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="service-link-footer">
                            <p>
                                {t("home.services.footerText")}
                                <a href="./contact" data-fbq-event="ContactCTA" data-fbq-label="services-footer">
                                    {t("common.getFreeStrategyCall")}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceSection;
