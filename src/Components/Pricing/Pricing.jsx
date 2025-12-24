import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function PricingPlanSection() {
    return (
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column justify-content-center text-center gspace-5">
                    <AnimateOnScroll animation="fadeInUp" speed="normal">
                        <div className="d-flex flex-column gspace-2">
                            <div className="sub-heading align-self-center">
                                <i className="fa-regular fa-circle-dot"></i>
                                <span>Our Core Services</span>
                            </div>
                            <h2 className="title-heading heading-container heading-container-short">
                                Simple, Transparent Pricing
                            </h2>
                        </div>
                    </AnimateOnScroll>
                    <div className="row row-cols-lg-3 row-cols-1 grid-spacer-2">
                        <div className="col">
                            <div className="pricing-container">
                                <AnimateOnScroll animation="fadeInLeft" speed="normal">
                                    <div className="card card-pricing-title">
                                        <div className="spacer" />
                                        <div className="content">
                                            <h3 className="title-heading">Let’s Find the Right Plan for Your Business</h3>
                                            <div className="link-wrapper">
                                                <a href="./contact">Book a Free Consultation</a>
                                                <i className="fa-solid fa-arrow-circle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <div className="card card-pricing">
                                        <h4>Starter</h4>
                                        <p>For small local businesses building trust online</p>
                                        <div className="d-flex flex-row gspace-1 align-items-center h-100">
                                            <h3>C$600</h3>
                                            <p>/Month</p>
                                        </div>
                                        <a href="#" className="btn btn-accent">
                                            <div className="btn-title">
                                                <span>View Details</span>
                                            </div>
                                            <div className="icon-circle">
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                        </a>
                                        <ul className="check-list">
                                            <li><a href="./single_services">8 posts / month (static or carousel)</a></li>
                                            <li><a href="./single_services">Captions + profile optimization</a></li>
                                            <li><a href="./single_services">Monthly performance report</a></li>
                                        </ul>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                        <div className="col">
                            <AnimateOnScroll animation="fadeInUp" speed="slow">
                                <div className="card card-pricing pricing-highlight">
                                    <div className="spacer" />
                                    <h4>Growth</h4>
                                    <p>Content + ads for consistent leads</p>
                                    <div className="d-flex flex-row gspace-1 align-items-center">
                                        <h3>C$1,000</h3>
                                        <p>/Month</p>
                                    </div>
                                    <a href="#" className="btn btn-accent">
                                        <div className="btn-title">
                                            <span>View Details</span>
                                        </div>
                                        <div className="icon-circle">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </a>

                                    <div className="core-benefits">
                                        <div className="benefit">
                                            <i className="fa-solid fa-brain"></i>
                                            <a href="#">Content Plan & Brand Messaging</a>
                                        </div>
                                        <div className="benefit">
                                            <i className="fa-brands fa-accessible-icon"></i>
                                            <a href="#">Meta Ads Setup & Optimization</a>
                                        </div>
                                        <div className="benefit">
                                            <i className="fa-solid fa-bug"></i>
                                            <a href="#">Conversion Tracking & Reporting</a>
                                        </div>
                                    </div>

                                    <ul className="check-list">
                                        <li><a href="#">12–16 posts / month (mix of reels + static)</a></li>
                                        <li><a href="#">Monthly strategy & content calendar</a></li>
                                        <li><a href="#">Meta ads management (ad spend not included)</a></li>
                                        <li><a href="#">Audience testing & optimization</a></li>
                                        <li><a href="#">Monthly reporting + next-step plan</a></li>
                                        <li><a href="#">Support via WhatsApp</a></li>
                                    </ul>
                                </div>
                            </AnimateOnScroll>
                        </div>
                        <div className="col">
                            <div className="pricing-container">
                                <AnimateOnScroll animation="fadeInRight" speed="normal">
                                    <div className="card pricing-highlight-box">
                                        <div className="d-flex flex-column gspace-2 w-100">
                                            <h5>Your Growth, Our Priority!</h5>
                                            <div className="d-flex flex-column gspace-2">
                                                <div className="pricing-highlights">
                                                    <a href="#">Fair, clear monthly packages</a>
                                                    <i className="fa-solid fa-arrow-circle-right"></i>
                                                </div>
                                                <div className="pricing-highlights">
                                                    <a href="#">Designed for Ontario businesses</a>
                                                    <i className="fa-solid fa-arrow-circle-right"></i>
                                                </div>
                                                <div className="pricing-highlights">
                                                    <a href="#">Built for long-term partnerships</a>
                                                    <i className="fa-solid fa-arrow-circle-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacer" />
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <div className="card card-pricing">
                                        <h4>Scale</h4>
                                        <p>For brands ready to scale performance</p>
                                        <div className="d-flex flex-row gspace-1 align-items-center h-100">
                                            <h3>C$1,700</h3>
                                            <p>/Month</p>
                                        </div>
                                        <a href="#" className="btn btn-accent">
                                            <div className="btn-title">
                                                <span>View Details</span>
                                            </div>
                                            <div className="icon-circle">
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                        </a>
                                        <ul className="check-list">
                                            <li><a href="./single_services">Weekly reels + advanced creative testing</a></li>
                                            <li><a href="./single_services">Priority optimization & scaling</a></li>
                                            <li><a href="./single_services">Monthly strategy call + KPI tracking</a></li>
                                        </ul>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PricingPlanSection;
