import React from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import BannerInnerSection from "../../Components/Banner/Inner";
import HeadTitle from "../../Components/Head/HeadTitle";
import { getLocationSeo, locationPages } from "../../Data/locationPages";
import { useLangPath, useLanguage } from "../../Components/Context/LanguageContext";

const getLocalizedPage = (page, language) => {
    if (language !== "tr" || !page.tr) return page;

    return {
        ...page,
        ...page.tr,
        path: `/tr${page.path}`,
    };
};

function LocationLandingPage() {
    const { slug } = useParams();
    const location = useLocation();
    const langPath = useLangPath();
    const { language } = useLanguage();
    // Strip /tr prefix before extracting the slug segment
    const cleanPath = location.pathname.replace(/^\/tr/, "");
    const pageSlug = slug || cleanPath.replace(/^\//, "");
    const basePage = locationPages[pageSlug];

    if (!basePage) return <Navigate to={langPath("/services")} replace />;

    const page = getLocalizedPage(basePage, language);
    const isTurkish = language === "tr";

    return (
        <>
            <HeadTitle seo={getLocationSeo(page)} />
            <BannerInnerSection title={page.title} currentPage={page.eyebrow} />
            <div className="section pb-0">
                <div className="hero-container">
                    <div className="d-flex flex-column gspace-5">
                        <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5 align-items-center">
                            <div className="col col-lg-7">
                                <div className="d-flex flex-column gspace-2">
                                    <div className="sub-heading">
                                        <i className="fa-regular fa-circle-dot"></i>
                                        <span>{page.eyebrow}</span>
                                    </div>
                                    <h2 className="title-heading">
                                        {page.headline || "Digital marketing support for local growth"}
                                    </h2>
                                    <p>{page.intro}</p>
                                </div>
                            </div>
                            <div className="col col-lg-5">
                                <div className="card service-included">
                                    <h2>{page.supportTitle || "How Rav Link can help"}</h2>
                                    <div className="underline-accent-short"></div>
                                    <ul className="check-list">
                                        {(page.supportItems || [
                                            "Local SEO and service page planning",
                                            "Website structure and conversion improvements",
                                            "Meta Ads and Google Ads campaign support",
                                            "Lead tracking and practical monthly reporting",
                                        ]).map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                            {page.sections.map((section) => (
                                <div className="col" key={section.heading}>
                                    <div className="card card-service h-100">
                                        <h2>{section.heading}</h2>
                                        <p>{section.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card service-recent">
                            <h2>{page.relatedTitle || "Explore related services"}</h2>
                            <div className="underline-accent-short"></div>
                            <ul className="single-service-list">
                                {page.links.map((link) => (
                                    <li key={link.href}>
                                        <Link to={langPath(link.href)}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="cta-service-banner">
                            <div className="spacer"></div>
                            <h2 className="title-heading">
                                {page.ctaTitle || "Plan your next local growth move"}
                            </h2>
                            <p>
                                {page.ctaBody ||
                                    "Rav Link serves businesses across Ontario and the Greater Toronto Area remotely and on-site. Share your service area and goals, and we will recommend the right next step."}
                            </p>
                            <div className="link-wrapper">
                                <Link to={langPath("/growth-check")}>
                                    {isTurkish ? "Ücretsiz Büyüme Analizini Başlatın" : "Start Your Free Growth Check"}
                                </Link>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LocationLandingPage;
