import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BlogCard from "../Card/BlogCard";
import { blogs } from "../../Data/BlogPostData";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function BlogSection({ showFilters = false }) {
    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const resolvedBlogs = blogs.map((blog) => ({
        ...blog,
        date: t(blog.dateKey),
        category: t(blog.categoryKey),
        title: t(blog.titleKey),
        excerpt: t(blog.excerptKey),
    }));

    const categories = [...new Set(resolvedBlogs.map((blog) => blog.category))];

    const visibleBlogs = resolvedBlogs
        .filter((blog) => {
            const matchesCategory = activeCategory === "all" || blog.category === activeCategory;
            const searchText = query.trim().toLocaleLowerCase(i18n.language);
            const matchesQuery =
                !searchText ||
                `${blog.title} ${blog.excerpt}`.toLocaleLowerCase(i18n.language).includes(searchText);
            return matchesCategory && matchesQuery;
        })
        .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

    return (
        <div className="section" data-pixel-section="blog">
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
                                        <a href="/blog">{t("common.viewAllArticles")}</a>
                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="blog-filter-bar">
                            <div className="blog-search">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input
                                    type="search"
                                    className="blog-search-input"
                                    placeholder={t("blog.searchPlaceholder")}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    aria-label={t("blog.searchPlaceholder")}
                                />
                            </div>
                            <div className="blog-category-chips">
                                <button
                                    type="button"
                                    className={`blog-category-chip${activeCategory === "all" ? " active" : ""}`}
                                    onClick={() => setActiveCategory("all")}
                                >
                                    {t("blog.all")}
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        className={`blog-category-chip${activeCategory === category ? " active" : ""}`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
                        {visibleBlogs.map((blog) => (
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
                    {showFilters && visibleBlogs.length === 0 && (
                        <p className="blog-no-results">{t("blog.noResults")}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogSection;
