import React from "react";
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

function AboutPage() {
    return (
        <>
            <HeadTitle title="About - Ravlink - Digital Marketing Agency" />
            <BannerInnerSection title="About Ravlink" currentPage="About Us" />
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