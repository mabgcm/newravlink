import React from "react";
import { teamData } from "../../Data/TeamData";
import TeamCard from "../Card/TeamCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const TeamExtendSection = () => {

    return (
        <div className="section">
            <div className="hero-container">
                <div className="team-wrapper">
                    <div className="card team-layout">
                        <AnimateOnScroll animation="fadeInLeft" speed="normal">
                            <div className="d-flex flex-column align-items-center gspace-2">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>Our Team</span>
                                </div>
                                <h2 className="title-heading">
                                    Meet the Minds Behind Your Digital Success
                                </h2>
                            </div>
                        </AnimateOnScroll>

                        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 grid-spacer-2">
                            {teamData.slice(0, 6).map((member) => (
                                <TeamCard key={member.id} {...member} />
                            ))}
                        </div>

                        <div className="spacer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamExtendSection;