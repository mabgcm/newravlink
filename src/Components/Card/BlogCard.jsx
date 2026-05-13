import React from "react";
import { useTranslation } from "react-i18next";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import { trackMetaCustom } from "../../analytics/metaPixel";

function BlogCard({ blog }) {
    const { t } = useTranslation();
    const handleClick = () => {
        trackMetaCustom("BlogReadMoreClick", {
            content_name: blog.title,
            content_category: blog.category,
            href: blog.link,
        });
        window.location.href = blog.link;
    };

    return (
        <div className="col">
            <AnimateOnScroll animation="fadeInUp" speed="normal">
                <div
                    className="card card-blog"
                    onClick={handleClick}
                >
                    <div className="blog-image">
                        <img src={blog.image} alt={`${blog.title} article preview`} loading="lazy" />
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-row gspace-2">
                            <div className="d-flex flex-row gspace-1 align-items-center">
                                <i className="fa-solid fa-calendar accent-color"></i>
                                <span className="meta-data">{blog.date}</span>
                            </div>
                            <div className="d-flex flex-row gspace-1 align-items-center">
                                <i className="fa-solid fa-folder accent-color"></i>
                                <span className="meta-data">{blog.category}</span>
                            </div>
                        </div>
                        <a href={blog.link} className="blog-link" data-fbq-event="BlogArticleClick" data-fbq-label={blog.title}>
                            {blog.title}
                        </a>
                        <p>{blog.excerpt}</p>
                        <a href={blog.link} className="read-more" data-fbq-event="BlogReadMoreClick" data-fbq-label={blog.title}>
                            {t("common.readMore")}
                        </a>
                    </div>
                </div>
            </AnimateOnScroll>
        </div>
    );
}

export default BlogCard;
