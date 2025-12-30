import React from "react";
import { useTranslation } from "react-i18next";
import { partnerships } from "../../Data/PartnershipData";

const PartnershipListSection = () => {
  const { t } = useTranslation();

  return (
    <div className="section">
        <div className="hero-container">
            <div className="d-flex flex-column gspace-2">
                <div className="d-flex flex-column gspace-2 justify-content-center align-items-center">
                    <div className="sub-heading">
                        <i className="fa-regular fa-circle-dot"></i>
                        <span>{t("partnershipPage.subHeading")}</span>
                    </div>
                    <h2 className="title-heading heading-container heading-container-wide">
                    {t("partnershipPage.heading")}
                    </h2>
                </div>

                <div className="partnership-layout">
                    <div className="partnership-wrapper">
                        <div className="partnership-spacer"></div>
                        <div className="row row-cols-md-4 row-cols-1 g-0">
                            {partnerships.map((partner) => (
                            <div className="col partnership-container" key={partner.id}>
                                <div className="partnership-item">
                                    <a href="#">
                                        <img
                                        src={partner.logo}
                                        alt="Partner Logo"
                                        className="partner-logo img-fluid"
                                        />
                                    </a>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PartnershipListSection;
