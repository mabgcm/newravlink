import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import NewsletterSection from "../../Components/Form/Newsletter";
import BlogSection from "../../Components/Blog/blog";
import TestimonialSection from "../../Components/Testimonial/testimonial";

function TestimonialPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.testimonial")} />
            <BannerInnerSection
                title={t("pageBanners.testimonial.title")}
                currentPage={t("pageBanners.testimonial.currentPage")}
            />
            <TestimonialSection />
            <NewsletterSection />
            <BlogSection />
        </>
    );
}

export default TestimonialPage;
