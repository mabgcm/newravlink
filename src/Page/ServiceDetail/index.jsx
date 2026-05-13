import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BannerInnerSection from "../../Components/Banner/Inner";
import HeadTitle from "../../Components/Head/HeadTitle";
import { servicePages, serviceSchema } from "../../Data/servicePages";
import { useLangPath } from "../../Components/Context/LanguageContext";

function ServiceDetailPage() {
    const { slug } = useParams();
    const page = servicePages[slug];
    const langPath = useLangPath();

    if (!page) return <Navigate to={langPath("/services")} replace />;

    return (
        <>
            <HeadTitle seoKey={page.seoKey} schema={serviceSchema(page)} />
            <BannerInnerSection title={page.title} currentPage={page.eyebrow} />
            <div className="section pb-0">
                <div className="hero-container">
                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5 align-items-center">
                        <div className="col col-lg-7">
                            <div className="d-flex flex-column gspace-2">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>{page.eyebrow}</span>
                                </div>
                                <h2 className="title-heading">{page.benefitsTitle}</h2>
                                <p>{page.intro}</p>
                                <ul className="check-list">
                                    {page.benefits.map((benefit) => (
                                        <li key={benefit}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-5">
                            <div className="image-container">
                                <img
                                    src={page.image}
                                    alt={`${page.eyebrow} service by Rav Link Inc.`}
                                    className="img-fluid"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5 mt-5">
                        <div className="col">
                            <div className="card service-included">
                                <h2>{page.processTitle}</h2>
                                <div className="underline-accent-short"></div>
                                <ul className="check-list">
                                    {page.process.map((step) => (
                                        <li key={step}>{step}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card service-recent">
                                <h2>Related services</h2>
                                <div className="underline-accent-short"></div>
                                <ul className="single-service-list">
                                    {page.related.map((link) => (
                                        <li key={link.href}>
                                            <Link to={link.href}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="section px-0">
                        <div className="d-flex flex-column gspace-3">
                            <div className="d-flex flex-column text-center align-items-center gspace-2">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>Questions</span>
                                </div>
                                <h2 className="title-heading heading-container heading-container-medium">Service FAQs</h2>
                            </div>
                            <div className="row row-cols-lg-3 row-cols-1 grid-spacer-2">
                                {page.faqs.map((faq) => (
                                    <div className="col" key={faq.question}>
                                        <div className="card card-service h-100">
                                            <h3>{faq.question}</h3>
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="cta-service-banner">
                        <div className="spacer"></div>
                        <h2 className="title-heading">Ready to build a stronger local marketing system?</h2>
                        <p>
                            Tell us where your business operates and which services matter most. We will map the
                            next practical step for SEO, website, ads, or contractor lead generation.
                        </p>
                        <div className="link-wrapper">
                            <Link to={langPath("/contact")}>Contact Rav Link</Link>
                            <i className="fa-solid fa-circle-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceDetailPage;
