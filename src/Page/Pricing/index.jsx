import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import PricingPlanSection from "../../Components/Pricing/Pricing";
import DigitalProcessSection from "../../Components/DigitalProcess/digitalstep";
import ChooseUsSection from "../../Components/ChooseUs/choose";

function PricingPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.pricing")} />
            <BannerInnerSection
                title={t("pageBanners.pricing.title")}
                currentPage={t("pageBanners.pricing.currentPage")}
            />
            <PricingPlanSection />
            <DigitalProcessSection />
            <ChooseUsSection />
        </>
    );
}

export default PricingPage;
