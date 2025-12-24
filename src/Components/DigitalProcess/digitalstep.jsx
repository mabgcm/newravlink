
import React from "react";
import { digitalSteps } from "../../Data/DigitalProcessData";
import DigitalStepCard from "../Card/DigitalStepCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const DigitalProcessSection = () => {

    return (
        <div className="section-wrapper-digital-process">
            <div className="digital-process-layout">
                <div className="section digital-process-banner">
                    <div className="hero-container">
                        <div className="digital-process-content">
                            <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                                <div className="col">
                                    <AnimateOnScroll animation="fadeInDown" speed="normal">
                                        <div className="d-flex flex-column gspace-2">
                                            <div className="sub-heading">
                                                <i className="fa-regular fa-circle-dot"></i>
                                                <span>How it Works</span>
                                            </div>
                                            <h2 className="title-heading">Simple Steps to Real Growth</h2>
                                        </div>
                                    </AnimateOnScroll>
                                </div>
                                <div className="col">
                                    <AnimateOnScroll animation="fadeInDown" speed="normal">
                                        <div className="d-flex flex-column gspace-2 justify-content-end h-100">
                                            <p>
                                                We follow a clear, proven process to help brands grow their business using powerful online tools. From strategy to execution, every step is designed to deliver measurable results — not guesswork.
                                            </p>
                                            <div className="link-wrapper">
                                                <a href="./contact">Get Started Now</a>
                                                <i className="fa-solid fa-arrow-circle-right"></i>
                                            </div>
                                        </div>
                                    </AnimateOnScroll>
                                </div>
                            </div>

                            <div className="digital-process-steps-wrapper">
                                <div className="digital-process-steps">
                                    <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1">
                                        {digitalSteps.map((item, index) => (
                                            <DigitalStepCard
                                                key={index}
                                                icon={item.icon}
                                                step={item.step}
                                                title={item.title}
                                                content={item.content}
                                                isFirst={index === 0}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="spacer"></div>
            </div>
        </div>
    );
};

export default DigitalProcessSection;
