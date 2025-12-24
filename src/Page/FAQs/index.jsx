import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import FaqSection from "../../Components/FAQs/faq";
import BannerInnerSection from "../../Components/Banner/Inner";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import TestimonialSection from "../../Components/Testimonial/testimonial";

function FaqPage(){
    const { t } = useTranslation();

    return(
        <>  
            <HeadTitle title={t("pageTitles.faqs")} />
            <BannerInnerSection
                title={t("pageBanners.faqs.title")}
                currentPage={t("pageBanners.faqs.currentPage")}
            />
            <FaqSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <TestimonialSection />
        </>
    );
}

export default FaqPage;
