import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import PartnershipSection from "../../Components/Partnership/Partnership";
import ChooseUsSection from "../../Components/ChooseUs/choose";
import TeamExtendSection from "../../Components/Team/TeamExtend";

function TeamPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.team")} />
            <BannerInnerSection
                title={t("pageBanners.team.title")}
                currentPage={t("pageBanners.team.currentPage")}
            />
            <TeamExtendSection />
            <PartnershipSection />
            <ChooseUsSection />
        </>
    );
}

export default TeamPage;
