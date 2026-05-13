import React from "react";
import { useTranslation } from "react-i18next";
import { blogs } from "../../Data/BlogPostData";

const BlogPostSection = () => {
  const { t } = useTranslation();

  return (
    <div className="section" data-pixel-section="blog-article">
        <div className="hero-container">
            <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                <div className="col col-lg-4 order-2 order-lg-1">
                    <div className="d-flex flex-column flex-md-row flex-lg-column gspace-5">
                        <div className="card recent-post">
                            <h4>Recent Blog</h4>
                            {blogs.map((blog) => (
                                <div
                                    className="d-flex flex-row w-100 gspace-1"
                                    key={blog.id}
                                >
                                    <div className="image-container">
                                    <img
                                        src={blog.image}
                                        alt={t(blog.titleKey)}
                                        className="img-fluid"
                                        loading="lazy"
                                    />
                                    </div>
                                    <div className="d-grid">
                                        <div className="d-flex flex-row gspace-1 align-items-center">
                                            <i className="fa-solid fa-calendar accent-color"></i>
                                            <span className="meta-data-post">{t(blog.dateKey)}</span>
                                        </div>
                                        <a href={blog.link} className="blog-link-post">
                                            {t(blog.titleKey)}
                                        </a>
                                    </div>
                                </div>
                                ))}
                        </div>
                        <div className="cta-service-banner">
                            <div className="spacer"></div>
                            <h3 className="title-heading">Transform Your Business with Rav Link!</h3>
                            <p>
                                Take your digital marketing to the next level with data-driven strategies and innovative solutions. Let's create something amazing together!
                            </p>
                            <div className="link-wrapper">
                                <a href="about">Read More</a>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-8 order-1 order-lg-2">
                    <div className="d-flex flex-column gspace-2">
                        <div className="post-image">
                            <img
                            src="/assets/images/local.jpg"
                            alt="Local SEO and digital marketing strategy for Ontario businesses"
                            className="img-fluid"
                            loading="lazy"
                            />
                        </div>
                        <h3>How Ontario Businesses Can Grow With Local SEO and Paid Ads</h3>
                        <div className="underline-muted-full"></div>
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-row align-items-center gspace-2">
                                <div className="d-flex flex-row gspace-1 align-items-center">
                                    <i className="fa-solid fa-calendar accent-color"></i>
                                    <span className="meta-data-post">March 27, 2025</span>
                                </div>
                                <div className="d-flex flex-row gspace-1 align-items-center">
                                    <i className="fa-solid fa-folder accent-color"></i>
                                    <span className="meta-data-post">SEO</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row gspace-1 align-items-center">
                                <i className="fa-solid fa-user accent-color"></i>
                                <span className="meta-data">Rav Link Inc.</span>
                            </div>
                        </div>

                    <div>
                        <p>
                            In today's fast-paced digital landscape, growing a business online requires more than just a website and a few ads.
                            To achieve sustainable growth, digital businesses must implement a well-rounded strategy that includes brand positioning,
                            performance marketing, and customer retention. In this post, we'll explore actionable growth strategies to help your digital
                            business scale successfully.
                        </p>
                        <p>
                            For local businesses, the strongest results usually come from matching the right channel to the right intent.
                            SEO helps capture people already searching for a service, while Meta Ads and Google Ads help test offers,
                            build demand, and bring visitors back to focused landing pages. The website has to connect those channels
                            with clear messaging, useful proof, and simple next steps.
                        </p>
                    </div>
                    <div className="quote-container">
                        <div>
                        <div className="icon-wrapper">
                            <div className="icon-box">
                            <i className="fa-solid fa-quote-right"></i>
                            </div>
                        </div>
                        </div>
                        <p className="quote">
                            The best local marketing systems are clear before they are complex: know the service area, explain the offer,
                            track the lead source, and improve the pages that turn interest into booked conversations.
                        </p>
                        <div>
                        <h5>Rav Link Inc.</h5>
                        <p className="quote-description">Digital Marketing Team</p>
                        </div>
                    </div>
                    <p>
                        Rav Link helps businesses across Ontario and the Greater Toronto Area connect SEO, websites, Meta Ads, Google Ads,
                        and reporting into one practical growth system. The goal is not more activity; it is better visibility, better leads,
                        and a clearer path from first click to customer conversation.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BlogPostSection;
