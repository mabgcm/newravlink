import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import CounterOnScroll from "../Hooks/CounterOnScroll";

function ExpertiseSection() {

    return (
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        <div className="expertise-img-layout">
                            <div className="image-container expertise-img">
                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <img
                                        src="/assets/images/team.jpg"
                                        alt="Expertise Image"
                                        className="img-fluid"
                                    />
                                </AnimateOnScroll>
                                <div className="expertise-layout">
                                    <div className="d-flex flex-column">
                                        <div className="card-expertise-wrapper">
                                            <AnimateOnScroll animation="fadeInDown" speed="normal">
                                                <div className="card card-expertise">
                                                    <h4>Ready to Elevate Your Digital Presence?</h4>
                                                    <p>Let's create a custom strategy that fits your business goals.</p>
                                                    <div className="d-flex align-items-center flex-row gspace-2 expertise-link">
                                                        <a href="./contact">Get Free Consultation</a>
                                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </AnimateOnScroll>
                                        </div>
                                        <div className="expertise-spacer"></div>
                                    </div>
                                    <div className="expertise-spacer"></div>
                                </div>
                            </div>
                        </div>
                        <div className="expertise-title">
                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>Our Expertise</span>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <h2 className="title-heading">
                                    Marketing Decisions That Drive Real Growth
                                </h2>
                            </AnimateOnScroll>
                            <p>
                                At Ravlink, we make smart marketing decisions backed by data to drive real business growth and keep your brand competitive online.
                            </p>
                            <div className="d-flex flex-column flex-md-row gspace-2">
                                <div className="expertise-list">
                                    <h5>What We Do Best</h5>
                                    <ul className="check-list">
                                        <li><a href="./single_services">Performance Marketing</a></li>
                                        <li><a href="./single_services">Social Media Growth</a></li>
                                        <li><a href="./single_services">Proven SEO Strategy</a></li>
                                        <li><a href="./single_services">Content Marketing</a></li>
                                        <li><a href="./single_services">PPC & Paid Ads</a></li>
                                        <li><a href="./single_services">Brand Strategy</a></li>
                                        <li><a href="./single_services">Conversion Optimization</a></li>
                                    </ul>
                                </div>

                                <AnimateOnScroll animation="fadeInUp">
                                    <div className="card card-expertise card-expertise-counter animate-box">
                                        <div className="d-flex flex-row gspace-2 align-items-center">
                                            <div className="d-flex flex-row align-items-center">
                                                <CounterOnScroll
                                                    target={19}
                                                    suffix="+"
                                                    counterClassName="counter"
                                                    suffixClassName="counter-detail"
                                                />
                                            </div>
                                            <h6>Years of Experience on Digital Marketing Services</h6>
                                        </div>
                                        <p>
                                            Helping businesses grow through proven strategies, creative execution, and measurable digital marketing results across competitive industries.
                                        </p>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ExpertiseSection;