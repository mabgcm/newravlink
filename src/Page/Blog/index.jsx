import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import BlogSection from "../../Components/Blog/blog";

function BlogPage(){
    const { t } = useTranslation();

    return(
        <>
            <HeadTitle title={t("pageTitles.blog")} />
            <BannerInnerSection
                title={t("pageBanners.blog.title")}
                currentPage={t("pageBanners.blog.currentPage")}
            />
            <BlogSection />            
        </>
    );
}

export default BlogPage;
