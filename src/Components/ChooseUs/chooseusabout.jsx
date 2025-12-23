import React from "react";
import { whychooseus } from "../../Data/ChooseUsData";
import ChooseUsCard from "../Card/ChoooseUsCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function ChooseUsAboutSection(){

    return(
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        <div className="chooseus-card-container">
                            <div className="d-flex flex-column gspace-2">
                                {whychooseus.slice(3, 6).map((item) => (
                                    <ChooseUsCard 
                                        key={item.id}
                                        icon={item.icon}
                                        title={item.title}
                                        content={item.content}
                                        link={item.link}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="chooseus-content-container">
                            <div className="d-flex flex-column gspace-5">
                                <AnimateOnScroll animation="fadeInDown" speed="normal">
                                    <div className="d-flex flex-column gspace-2">
                                        <div className="sub-heading">
                                            <i className="fa-regular fa-circle-dot"></i>
                                            <span>Our Core Values</span>
                                        </div>
                                        <h2 className="title-heading">The Principles That Define Us</h2>
                                        <p className="mb-0">In the fast-paced digital world, choosing the right marketing partner makes all the difference. At Marko, we don’t just create campaigns—we craft strategies that deliver measurable success.</p>
                                    </div>
                                </AnimateOnScroll>
                                <div className="image-container">
                                    <img src="/assets/images/dummy-img-600x400.jpg" alt="Why Choose Us Image" className="chooseus-img" />
                                    <div className="card-chooseus-cta-layout">
                                        <div className="chooseus-cta-spacer"></div>
                                        <div className="d-flex flex-column align-items-end">
                                            <div className="chooseus-cta-spacer"></div>
                                            <div className="card-chooseus-cta-wrapper">
                                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                                    <div className="card card-chooseus-cta">
                                                        <h5>Partner with Marko & take your brand to the next level.</h5>
                                                        <div className="link-wrapper">
                                                            <a href="./contact">Let's Talk Strategy</a>
                                                            <i className="fa-solid fa-circle-arrow-right"></i>
                                                        </div>
                                                    </div>
                                                </AnimateOnScroll>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

        </>
    );
}

export default ChooseUsAboutSection;