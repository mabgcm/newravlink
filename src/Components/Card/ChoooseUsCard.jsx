import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const ChooseUsCard = ({ icon, title, content, speed }) => {

    return (
        <>
            <AnimateOnScroll animation="fadeInRight" speed={speed}>
                <div className="card card-chooseus">
                    <div className="chooseus-icon-wrapper">
                        <div className="chooseus-spacer above"></div>
                        <div className="chooseus-icon-layout">
                            <div className="chooseus-icon">
                                <img src={icon} alt={`${title} icon`} className="img-fluid" loading="lazy" />
                            </div>
                        </div>
                        <div className="chooseus-spacer below"></div>
                    </div>
                    <div className="chooseus-content">
                        <h4 className="chooseus-title">{title}</h4>
                        <p>{content}</p>
                    </div>
                </div>
            </AnimateOnScroll>
        </>
    );
};

export default ChooseUsCard;
