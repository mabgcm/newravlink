import React from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import BannerInnerSection from "../../Components/Banner/Inner";
import HeadTitle from "../../Components/Head/HeadTitle";
import { getLocationSeo, locationPages } from "../../Data/locationPages";

function LocationLandingPage() {
    const { slug } = useParams();
    const location = useLocation();
    const pageSlug = slug || location.pathname.replace("/", "");
    const page = locationPages[pageSlug];

    if (!page) return <Navigate to="/services" replace />;

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
                                    <h2 className="title-heading">Digital marketing support for local growth</h2>
                                    <p>{page.intro}</p>
                                </div>
                            </div>
                            <div className="col col-lg-5">
                                <div className="card service-included">
                                    <h2>How Rav Link can help</h2>
                                    <div className="underline-accent-short"></div>
                                    <ul className="check-list">
                                        <li>Local SEO and service page planning</li>
                                        <li>Website structure and conversion improvements</li>
                                        <li>Meta Ads and Google Ads campaign support</li>
                                        <li>Lead tracking and practical monthly reporting</li>
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
                            <h2>Explore related services</h2>
                            <div className="underline-accent-short"></div>
                            <ul className="single-service-list">
                                {page.links.map((link) => (
                                    <li key={link.href}>
                                        <Link to={link.href}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="cta-service-banner">
                            <div className="spacer"></div>
                            <h2 className="title-heading">Plan your next local growth move</h2>
                            <p>
                                Rav Link serves businesses across Ontario and the Greater Toronto Area remotely and
                                on-site. Share your service area and goals, and we will recommend the right next step.
                            </p>
                            <div className="link-wrapper">
                                <Link to="/contact">Start a conversation</Link>
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
