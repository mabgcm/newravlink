import React from "react";
import { useTranslation } from "react-i18next";

function WizardResult() {
  const { t } = useTranslation();

  return (
    <div className="wizard-result">
      <div className="alert success wizard-result-card">
        <span className="check-icon">
          <i className="fa-solid fa-check"></i>
        </span>
        <h3 className="title-heading">{t("leadWizard.result.title")}</h3>
        <p>{t("leadWizard.result.message")}</p>
      </div>
    </div>
  );
}

export default WizardResult;
