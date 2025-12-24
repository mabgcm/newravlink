import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import NotFoundSection from "../../Components/NotFound/notfound";

function NotFoundPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.notFound")} />
            <NotFoundSection />
        </>
    );
}

export default NotFoundPage;
