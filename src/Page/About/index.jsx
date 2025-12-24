import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import AboutSection from "../../Components/About/about";
import PartnershipSection from "../../Components/Partnership/Partnership";
import ChooseUsAboutSection from "../../Components/ChooseUs/chooseusabout";
import TeamSection from "../../Components/Team/Team";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import DigitalProcessSection from "../../Components/DigitalProcess/digitalstep";
import TestimonialSection from "../../Components/Testimonial/testimonial";

function AboutPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.about")} />
            <BannerInnerSection
                title={t("pageBanners.about.title")}
                currentPage={t("pageBanners.about.currentPage")}
            />
            <AboutSection />
            <PartnershipSection />
            <ChooseUsAboutSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <TeamSection />
            <DigitalProcessSection />
            <TestimonialSection />
        </>
    );
}

export default AboutPage;
