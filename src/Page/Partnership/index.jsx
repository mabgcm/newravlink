import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import PartnershipListSection from "../../Components/Partnership/PartnershipList";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import TestimonialSection from "../../Components/Testimonial/testimonial";

function PartnershipPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.partnership")} />
            <BannerInnerSection
                title={t("pageBanners.partnership.title")}
                currentPage={t("pageBanners.partnership.currentPage")}
            />
            <PartnershipListSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <TestimonialSection />
        </>
    );
}

export default PartnershipPage;
