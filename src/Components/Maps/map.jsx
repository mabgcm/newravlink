import React from "react";

const MapsSection = () => {
  return (
    <div className="section pt-0">
        <div className="hero-container">
            <iframe
            loading="lazy"
            className="maps overflow-hidden"
            src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=14&output=embed&iwloc=near"
            title="London Eye, London, United Kingdom"
            aria-label="London Eye, London, United Kingdom" 
            ></iframe>
        </div>
    </div>
  );
};

export default MapsSection;
