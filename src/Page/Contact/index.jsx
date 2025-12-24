import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import ContactSection from "../../Components/Contact/contact";

function ContactPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.contact")} />
            <BannerInnerSection
                title={t("pageBanners.contact.title")}
                currentPage={t("pageBanners.contact.currentPage")}
            />
            <ContactSection />
        </>
    );
}

export default ContactPage;
