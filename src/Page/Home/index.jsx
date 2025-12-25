import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerHomeSection from "../../Components/Banner";
import ExpertiseSection from "../../Components/Expertise/expertise";
import ChooseUsSection from "../../Components/ChooseUs/choose";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import ServiceSection from "../../Components/Services/service";
import CaseStudiesSection from "../../Components/CaseStudies/CaseStudies";
import TestimonialSection from "../../Components/Testimonial/testimonial";
import DigitalProcessSection from "../../Components/DigitalProcess/digitalstep";
import PricingPlanSection from "../../Components/Pricing/Pricing";
// import PartnershipSection from "../../Components/Partnership/Partnership";
// import BlogSection from "../../Components/Blog/blog";

function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <HeadTitle title={t("home.headTitle")} />
            <BannerHomeSection />
            <ExpertiseSection />
            {/* <PartnershipSection /> */}
            <ChooseUsSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <ServiceSection />
            <CaseStudiesSection noPadding={true} />
            <TestimonialSection />
            <DigitalProcessSection />
            <PricingPlanSection />
            {/* <BlogSection /> */}
        </>
    );
}

export default HomePage;
