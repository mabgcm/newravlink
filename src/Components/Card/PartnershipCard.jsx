import React from "react";

const PartnershipCard = ({ logo }) => {
  return (
    <div className="col partnership-container">
        <div className="partnership-item">
            <div>
                <img src={logo} alt="Rav Link partner logo" className="img-fluid" loading="lazy" />
            </div>
        </div>
    </div>
  );
};

export default PartnershipCard;
