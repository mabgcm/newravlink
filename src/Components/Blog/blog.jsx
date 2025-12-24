import React from "react";
import { useTranslation } from "react-i18next";
import BlogCard from "../Card/BlogCard";
import { blogs } from "../../Data/BlogPostData";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function BlogSection() {
    const { t } = useTranslation();

    return (
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column gspace-5">
                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5 m-0">
                        <div className="col col-lg-8 ps-0 pe-0">
                            <AnimateOnScroll animation="fadeInLeft" speed="fast">
                                <div
                                    className="d-flex flex-column gspace-2">
                                    <div className="sub-heading">
                                        <i className="fa-regular fa-circle-dot"></i>
                                        <span>{t("home.blog.subHeading")}</span>
                                    </div>
                                    <h2 className="title-heading">{t("home.blog.heading")}</h2>
                                </div>
                            </AnimateOnScroll>
                        </div>
                        <div className="col col-lg-4 ps-0 pe-0">
                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <div
                                    className="d-flex flex-column gspace-2 justify-content-end h-100">
                                    <p>
                                        {t("home.blog.description")}
                                    </p>
                                    <div className="link-wrapper">
                                        <a href="./blog">{t("common.viewAllArticles")}</a>
                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>

                    <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                blog={{
                                    ...blog,
                                    date: t(blog.dateKey),
                                    category: t(blog.categoryKey),
                                    title: t(blog.titleKey),
                                    excerpt: t(blog.excerptKey)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogSection;
