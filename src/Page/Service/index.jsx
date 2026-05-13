import React from "react";
import { useTranslation } from "react-i18next";
import BannerInnerSection from "../../Components/Banner/Inner";
import ServiceSection from "../../Components/Services/service";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import PricingPlanSection from "../../Components/Pricing/Pricing";
import HeadTitle from "../../Components/Head/HeadTitle";

function ServicePage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle seoKey="services" />
            <BannerInnerSection
                title="Digital Marketing Services"
                currentPage={t("pageBanners.service.currentPage")}
            />
            <ServiceSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <PricingPlanSection />
        </>
    );
}

export default ServicePage;
