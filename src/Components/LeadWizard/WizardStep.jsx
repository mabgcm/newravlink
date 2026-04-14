import React from "react";
import { useTranslation } from "react-i18next";

const isChoiceSelected = (value, selectedValue) => {
  if (Array.isArray(selectedValue)) {
    return selectedValue.includes(value);
  }

  return selectedValue === value;
};

function WizardChoiceGroup({ question, value, onChange, hasError }) {
  const { t } = useTranslation();
  const isMulti = question.type === "multi";

  const handleMultiChange = (optionValue) => {
    const currentValue = Array.isArray(value) ? value : [];

    if (optionValue === "none") {
      onChange(question.id, currentValue.includes("none") ? [] : ["none"]);
      return;
    }

    const withoutNone = currentValue.filter((item) => item !== "none");
    const nextValue = withoutNone.includes(optionValue)
      ? withoutNone.filter((item) => item !== optionValue)
      : [...withoutNone, optionValue];

    onChange(question.id, nextValue);
  };

  return (
    <div
      className={`wizard-choice-grid ${isMulti ? "is-multi" : "is-single"} ${
        hasError ? "has-error" : ""
      }`}
    >
      {question.options.map((option) => {
        const optionId = `${question.id}-${option.value}`;
        const checked = isChoiceSelected(option.value, value);

        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className={`wizard-choice-card ${checked ? "is-selected" : ""}`}
          >
            <input
              id={optionId}
              className="wizard-choice-input"
              type={isMulti ? "checkbox" : "radio"}
              name={question.id}
              value={option.value}
              checked={checked}
              onChange={() => {
                if (isMulti) {
                  handleMultiChange(option.value);
                  return;
                }

                onChange(question.id, option.value);
              }}
            />
            <span className="wizard-choice-copy">{t(option.labelKey)}</span>
          </label>
        );
      })}
    </div>
  );
}

function WizardField({ question, value, onChange, hasError }) {
  const { t } = useTranslation();

  if (question.type === "single" || question.type === "multi") {
    return (
      <WizardChoiceGroup
        question={question}
        value={value}
        onChange={onChange}
        hasError={hasError}
      />
    );
  }

  return (
    <input
      type={question.type}
      name={question.id}
      id={question.id}
      value={typeof value === "string" ? value : ""}
      placeholder={question.placeholderKey ? t(question.placeholderKey) : ""}
      onChange={(event) => onChange(question.id, event.target.value)}
      aria-invalid={hasError}
      aria-label={t(`leadWizard.questions.${question.id}.label`)}
      className={hasError ? "wizard-input-error" : ""}
      autoComplete={question.id}
    />
  );
}

function WizardStep({ stepMeta, questions, currentQuestion, answers, errors, onAnswerChange }) {
  const { t } = useTranslation();

  return (
    <div className="wizard-step-content">
      <div className="d-flex flex-column gspace-2">
        <div className="sub-heading align-self-start">
          <i className="fa-regular fa-circle-dot"></i>
          <span>{t(stepMeta.titleKey)}</span>
        </div>
        <h3 className="title-heading">
          {currentQuestion ? t(`leadWizard.questions.${currentQuestion.id}.label`) : ""}
        </h3>
        <p className="wizard-step-description">{t(stepMeta.descriptionKey)}</p>
      </div>

      <div className="form wizard-form-fields">
        {questions.map((question) => {
          const value = answers[question.id];
          const hasError = Boolean(errors[question.id]);

          return (
            <div key={question.id} className="wizard-field-block">
              {questions.length > 1 && (
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <label htmlFor={question.id}>
                    {t(`leadWizard.questions.${question.id}.label`)}
                  </label>
                  {question.required && (
                    <span className="wizard-required-pill">
                      {t("leadWizard.requiredBadge")}
                    </span>
                  )}
                </div>
              )}

              <WizardField
                question={question}
                value={value}
                onChange={onAnswerChange}
                hasError={hasError}
              />

              {hasError && (
                <p className="error-text">{t(errors[question.id], { field: t(`leadWizard.questions.${question.id}.label`) })}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WizardStep;
