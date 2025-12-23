import React from "react";
// import VideoButton from "../Video/VideoButton";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function GuideBannerSection() {
    return (
        <>
            <div className="section-guide">
                <div className="guide-banner">
                    <div className="hero-container">
                        <AnimateOnScroll animation="fadeInUp" speed="normal">
                            <div className="guide-content">
                                <a href="./about" className="btn btn-accent">
                                    <div className="btn-title">
                                        <span>Get Started</span>
                                    </div>
                                    <div className="icon-circle">
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                </a>
                                <div className="d-flex flex-column gspace-2">
                                    <h3 className="title-heading">Transform Your Business with Ravlink!</h3>
                                    <p>Take your digital marketing to the next level with data-driven strategies and innovative solutions. Let's create something amazing together!</p>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GuideBannerSection;