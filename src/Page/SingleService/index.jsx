import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import TestimonialSection from "../../Components/Testimonial/testimonial";
import FaqSection from "../../Components/FAQs/faq";
import SingleServiceSection from "../../Components/Services/singleservice";

function SingleServicePage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.singleService")} />
            <BannerInnerSection
                title={t("pageBanners.singleService.title")}
                currentPage={t("pageBanners.singleService.currentPage")}
            />
            <SingleServiceSection />
            <TestimonialSection />
            <FaqSection />
        </>
    );
}

export default SingleServicePage;
