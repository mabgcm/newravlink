import React from "react";

const MapsSection = () => {
  return (
    <div className="section pt-0">
        <div className="hero-container">
            <iframe
            loading="lazy"
            className="maps overflow-hidden"
            src="https://maps.google.com/maps?q=Greater%20Toronto%20Area%2C%20Ontario%2C%20Canada&t=m&z=8&output=embed&iwloc=near"
            title="Rav Link service area across the Greater Toronto Area and Ontario"
            aria-label="Rav Link service area across the Greater Toronto Area and Ontario" 
            ></iframe>
        </div>
    </div>
  );
};

export default MapsSection;
