import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  getQuestionVisibility,
  getQuestionsForScreen,
  getVisibleScreens,
  leadFlowQuestions,
  leadFlowSteps,
} from "../../Data/LeadFlowData";
import WizardResult from "./WizardResult";
import WizardStep from "./WizardStep";
import { trackMetaCustom, trackMetaStandard } from "../../analytics/metaPixel";

const STEP_TRANSITION_MS = 260;

const isEmptyAnswer = (question, value) => {
  if (question.type === "multi") {
    return !Array.isArray(value) || value.length === 0;
  }

  return typeof value !== "string" || value.trim() === "";
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

function LeadWizard() {
  const { t } = useTranslation();
  const location = useLocation();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("forward");
  const [transitionState, setTransitionState] = useState("idle");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);
  const frameRef = useRef(null);
  const hasTrackedStartRef = useRef(false);
  const hasTrackedFirstInteractionRef = useRef(false);

  const totalStages = leadFlowSteps.length;
  const visibleScreens = getVisibleScreens(answers);
  const currentScreen = visibleScreens[currentScreenIndex] || visibleScreens[0];
  const totalScreens = visibleScreens.length;
  const currentStage = currentScreen?.step || 1;
  const currentStepMeta = leadFlowSteps.find((step) => step.id === currentStage);
  const currentQuestions = currentScreen ? getQuestionsForScreen(currentScreen, answers) : [];
  const currentQuestion = currentQuestions[0];
  const progressPercentage = totalScreens ? ((currentScreenIndex + 1) / totalScreens) * 100 : 0;
  const isTransitioning = transitionState !== "idle";

  useEffect(() => {
    if (!visibleScreens.length) {
      return;
    }

    if (currentScreenIndex > visibleScreens.length - 1) {
      setCurrentScreenIndex(visibleScreens.length - 1);
    }
  }, [currentScreenIndex, visibleScreens]);

  useEffect(() => {
    setAnswers((previousAnswers) => {
      const nextAnswers = { ...previousAnswers };
      let hasChanges = false;

      leadFlowQuestions.forEach((question) => {
        const isVisible = getQuestionVisibility(question, previousAnswers);

        if (!isVisible && Object.hasOwn(previousAnswers, question.id)) {
          delete nextAnswers[question.id];
          hasChanges = true;
        }
      });

      return hasChanges ? nextAnswers : previousAnswers;
    });
  }, [answers]);

  useEffect(() => {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      trackMetaCustom("LeadWizardStart", {
        total_screens: totalScreens,
        total_stages: totalStages,
      });
    }
  }, [totalScreens, totalStages]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const moveToStep = (nextStep, nextDirection) => {
    if (nextStep === currentScreenIndex || isTransitioning) {
      return;
    }

    setDirection(nextDirection);
    setTransitionState("exiting");

    timeoutRef.current = window.setTimeout(() => {
      setCurrentScreenIndex(nextStep);
      setTransitionState("entering");

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = window.requestAnimationFrame(() => {
          setTransitionState("idle");
        });
      });
    }, STEP_TRANSITION_MS);
  };

  const handleAnswerChange = (questionId, value) => {
    if (!hasTrackedFirstInteractionRef.current) {
      hasTrackedFirstInteractionRef.current = true;
      trackMetaCustom("ContactFormStart", {
        form_name: "lead_wizard",
        first_question_id: questionId,
      });
      trackMetaCustom("LeadWizardFirstInteraction", {
        question_id: questionId,
      });
    }

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: value,
    }));

    setErrors((previousErrors) => {
      if (!previousErrors[questionId]) {
        return previousErrors;
      }

      const nextErrors = { ...previousErrors };
      delete nextErrors[questionId];
      return nextErrors;
    });

    setSubmitError("");
  };

  const validateStep = () => {
    const nextErrors = {};

    currentQuestions.forEach((question) => {
      if (!question.required) {
        return;
      }

      if (isEmptyAnswer(question, answers[question.id])) {
        nextErrors[question.id] = "leadWizard.errors.required";
        return;
      }

      if (question.type === "email" && !isValidEmail(answers[question.id])) {
        nextErrors[question.id] = "leadWizard.errors.email";
      }
    });

    setErrors(nextErrors);
    const isValid = Object.keys(nextErrors).length === 0;

    if (!isValid) {
      trackMetaCustom("LeadWizardValidationError", {
        screen: currentScreenIndex + 1,
        stage: currentStage,
        errors_count: Object.keys(nextErrors).length,
      });

      if (currentScreenIndex === totalScreens - 1) {
        trackMetaCustom("ContactFormSubmitFailure", {
          form_name: "lead_wizard",
          reason: "validation",
        });
      }
    }

    return isValid;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    trackMetaCustom("LeadWizardStepComplete", {
      screen: currentScreenIndex + 1,
      stage: currentStage,
      question_id: currentQuestion?.id,
    });
    moveToStep(currentScreenIndex + 1, "forward");
  };

  const handleBack = () => {
    setSubmitError("");
    setErrors({});
    moveToStep(currentScreenIndex - 1, "back");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isTransitioning || isSubmitting) {
      return;
    }

    if (currentScreenIndex < totalScreens - 1) {
      handleNext();
      return;
    }

    if (!validateStep()) {
      return;
    }

    trackMetaCustom("ContactFormSubmitClick", {
      form_name: "lead_wizard",
      total_screens: totalScreens,
    });
    trackMetaCustom("LeadWizardFinalSubmitAttempt", {
      total_screens: totalScreens,
    });
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          ...(new URLSearchParams(location.search).get("growthCheck")
            ? { growthCheckResult: new URLSearchParams(location.search).get("growthCheck") }
            : {}),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      trackMetaStandard("Lead", {
        content_name: "Lead Wizard",
        form_name: "lead_wizard",
      });
      trackMetaCustom("ContactFormSubmitSuccess", {
        form_name: "lead_wizard",
      });
      trackMetaCustom("LeadWizardSubmitSuccess", {
        total_screens: totalScreens,
      });
      setIsComplete(true);
    } catch {
      trackMetaCustom("ContactFormSubmitFailure", {
        form_name: "lead_wizard",
        reason: "request_failed",
      });
      trackMetaCustom("LeadWizardSubmitFailure", {
        reason: "request_failed",
      });
      setSubmitError("leadWizard.errors.submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="form-layout-wrapper">
        <div className="card form-layout">
          <WizardResult />
        </div>
      </div>
    );
  }

  return (
    <div className="form-layout-wrapper">
      <div className="card form-layout">
        <form onSubmit={handleSubmit} className="wizard-shell" noValidate>
          <div className="wizard-progress">
            <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
              <div>
                <span className="wizard-progress-label">{t("leadWizard.progressLabel")}</span>
                <h4 className="wizard-progress-title">
                  {t(currentStepMeta.titleKey)}
                </h4>
              </div>
              <span className="wizard-step-pill">
                {t("leadWizard.stepCounter", { current: currentScreenIndex + 1, total: totalScreens })}
              </span>
            </div>
            <div className="wizard-progress-track" aria-hidden="true">
              <span className="wizard-progress-bar" style={{ width: `${progressPercentage}%` }} />
            </div>
            <p className="wizard-progress-copy">
              {t("leadWizard.stageCounter", { current: currentStage, total: totalStages })} ·{" "}
              {t(currentStepMeta.descriptionKey)}
            </p>
          </div>

          <div className="wizard-stage">
            <div
              className={`wizard-step-panel is-${transitionState} direction-${direction}`}
              style={{ transitionDuration: `${STEP_TRANSITION_MS}ms` }}
            >
              <WizardStep
                stepMeta={currentStepMeta}
                questions={currentQuestions}
                currentQuestion={currentQuestion}
                answers={answers}
                errors={errors}
                onAnswerChange={handleAnswerChange}
              />
            </div>
          </div>

          {submitError && (
            <div className="alert error wizard-submit-error" aria-live="polite">
              <span className="cross-icon">
                <i className="fa-solid fa-xmark"></i>
              </span>
              <p>{t(submitError)}</p>
            </div>
          )}

          <div className="form-button-container wizard-actions">
            {currentScreenIndex > 0 ? (
              <button
                type="button"
                className="btn btn-outline wizard-back-button"
                onClick={handleBack}
                disabled={isTransitioning || isSubmitting}
              >
                <span className="btn-title">{t("leadWizard.nav.back")}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              className="btn btn-accent"
              disabled={isTransitioning || isSubmitting}
              data-fbq-event={currentScreenIndex === totalScreens - 1 ? "LeadWizardSubmitClick" : "LeadWizardNextClick"}
              data-fbq-label={`screen-${currentScreenIndex + 1}`}
            >
              <span className="btn-title">
                <span>
                  {currentScreenIndex === totalScreens - 1
                    ? isSubmitting
                      ? t("leadWizard.nav.submitting")
                      : t("leadWizard.nav.submit")
                    : t("leadWizard.nav.next")}
                </span>
              </span>
              <span className="icon-circle">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadWizard;
