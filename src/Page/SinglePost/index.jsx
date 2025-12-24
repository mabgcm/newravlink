import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import BlogPostSection from "../../Components/Blog/SinglePost";

function SinglePostPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.singlePost")} />
            <BannerInnerSection
                title={t("pageBanners.singlePost.title")}
                currentPage={t("pageBanners.singlePost.currentPage")}
            />
            <BlogPostSection />

        </>
    );
}

export default SinglePostPage;
