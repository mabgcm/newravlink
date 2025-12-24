import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import CaseStudiesSection from "../../Components/CaseStudies/CaseStudies";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import TestimonialSection from "../../Components/Testimonial/testimonial";

function CaseStudiesPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.caseStudies")} />
            <BannerInnerSection
                title={t("pageBanners.caseStudies.title")}
                currentPage={t("pageBanners.caseStudies.currentPage")}
            />
            <CaseStudiesSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <TestimonialSection />
        </>
    );
}

export default CaseStudiesPage;
