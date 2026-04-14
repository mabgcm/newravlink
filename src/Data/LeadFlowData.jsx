const hasActiveSocialPlatforms = (answers) =>
  Array.isArray(answers.socialPlatforms) &&
  answers.socialPlatforms.some((platform) => platform !== "none");

export const leadFlowSteps = [
  {
    id: 1,
    titleKey: "leadWizard.steps.step1.title",
    descriptionKey: "leadWizard.steps.step1.description",
  },
  {
    id: 2,
    titleKey: "leadWizard.steps.step2.title",
    descriptionKey: "leadWizard.steps.step2.description",
  },
  {
    id: 3,
    titleKey: "leadWizard.steps.step3.title",
    descriptionKey: "leadWizard.steps.step3.description",
  },
  {
    id: 4,
    titleKey: "leadWizard.steps.step4.title",
    descriptionKey: "leadWizard.steps.step4.description",
  },
  {
    id: 5,
    titleKey: "leadWizard.steps.step5.title",
    descriptionKey: "leadWizard.steps.step5.description",
  },
];

export const leadFlowQuestions = [
  {
    id: "name",
    step: 1,
    type: "text",
    required: true,
    placeholderKey: "leadWizard.questions.name.placeholder",
  },
  {
    id: "businessName",
    step: 1,
    type: "text",
    required: true,
    placeholderKey: "leadWizard.questions.businessName.placeholder",
  },
  {
    id: "email",
    step: 1,
    type: "email",
    required: true,
    placeholderKey: "leadWizard.questions.email.placeholder",
  },
  {
    id: "phone",
    step: 1,
    type: "tel",
    required: true,
    placeholderKey: "leadWizard.questions.phone.placeholder",
  },
  {
    id: "businessType",
    step: 2,
    type: "single",
    required: true,
    options: [
      { value: "local-business", labelKey: "leadWizard.questions.businessType.options.local-business" },
      { value: "ecommerce", labelKey: "leadWizard.questions.businessType.options.ecommerce" },
      { value: "professional-service", labelKey: "leadWizard.questions.businessType.options.professional-service" },
      { value: "food-beverage", labelKey: "leadWizard.questions.businessType.options.food-beverage" },
      { value: "home-service", labelKey: "leadWizard.questions.businessType.options.home-service" },
      { value: "other", labelKey: "leadWizard.questions.businessType.options.other" },
    ],
  },
  {
    id: "customerType",
    step: 2,
    type: "single",
    required: true,
    options: [
      { value: "b2c", labelKey: "leadWizard.questions.customerType.options.b2c" },
      { value: "b2b", labelKey: "leadWizard.questions.customerType.options.b2b" },
      { value: "her-ikisi", labelKey: "leadWizard.questions.customerType.options.her-ikisi" },
    ],
  },
  {
    id: "geoTarget",
    step: 2,
    type: "single",
    required: true,
    options: [
      { value: "local", labelKey: "leadWizard.questions.geoTarget.options.local" },
      { value: "national", labelKey: "leadWizard.questions.geoTarget.options.national" },
      { value: "international", labelKey: "leadWizard.questions.geoTarget.options.international" },
    ],
  },
  {
    id: "ecommercePlatform",
    step: 2,
    type: "single",
    required: false,
    showIf: (answers) => answers.businessType === "ecommerce",
    options: [
      { value: "shopify", labelKey: "leadWizard.questions.ecommercePlatform.options.shopify" },
      { value: "woocommerce", labelKey: "leadWizard.questions.ecommercePlatform.options.woocommerce" },
      { value: "other", labelKey: "leadWizard.questions.ecommercePlatform.options.other" },
      { value: "none", labelKey: "leadWizard.questions.ecommercePlatform.options.none" },
    ],
  },
  {
    id: "googleBusiness",
    step: 2,
    type: "single",
    required: false,
    showIf: (answers) =>
      answers.businessType === "local-business" || answers.businessType === "home-service",
    options: [
      { value: "active", labelKey: "leadWizard.questions.googleBusiness.options.active" },
      { value: "inactive", labelKey: "leadWizard.questions.googleBusiness.options.inactive" },
      { value: "none", labelKey: "leadWizard.questions.googleBusiness.options.none" },
    ],
  },
  {
    id: "goals",
    step: 3,
    type: "multi",
    required: true,
    options: [
      { value: "more-leads", labelKey: "leadWizard.questions.goals.options.more-leads" },
      { value: "increase-sales", labelKey: "leadWizard.questions.goals.options.increase-sales" },
      { value: "brand-awareness", labelKey: "leadWizard.questions.goals.options.brand-awareness" },
      { value: "social-media", labelKey: "leadWizard.questions.goals.options.social-media" },
      { value: "seo", labelKey: "leadWizard.questions.goals.options.seo" },
      { value: "paid-ads", labelKey: "leadWizard.questions.goals.options.paid-ads" },
    ],
  },
  {
    id: "successMetric",
    step: 3,
    type: "single",
    required: true,
    options: [
      { value: "lead-count", labelKey: "leadWizard.questions.successMetric.options.lead-count" },
      { value: "sales-revenue", labelKey: "leadWizard.questions.successMetric.options.sales-revenue" },
      { value: "follower-growth", labelKey: "leadWizard.questions.successMetric.options.follower-growth" },
      { value: "website-traffic", labelKey: "leadWizard.questions.successMetric.options.website-traffic" },
      { value: "bilmiyorum", labelKey: "leadWizard.questions.successMetric.options.bilmiyorum" },
    ],
  },
  {
    id: "urgencyReason",
    step: 3,
    type: "single",
    required: true,
    options: [
      { value: "yeni-acilis", labelKey: "leadWizard.questions.urgencyReason.options.yeni-acilis" },
      { value: "sezon-basliyor", labelKey: "leadWizard.questions.urgencyReason.options.sezon-basliyor" },
      { value: "rakip-baskisi", labelKey: "leadWizard.questions.urgencyReason.options.rakip-baskisi" },
      { value: "buyume-hedefi", labelKey: "leadWizard.questions.urgencyReason.options.buyume-hedefi" },
      {
        value: "onceki-ajans-birakti",
        labelKey: "leadWizard.questions.urgencyReason.options.onceki-ajans-birakti",
      },
      { value: "other", labelKey: "leadWizard.questions.urgencyReason.options.other" },
    ],
  },
  {
    id: "hasWebsite",
    step: 4,
    type: "single",
    required: true,
    options: [
      { value: "yes-happy", labelKey: "leadWizard.questions.hasWebsite.options.yes-happy" },
      { value: "yes-unhappy", labelKey: "leadWizard.questions.hasWebsite.options.yes-unhappy" },
      { value: "in-progress", labelKey: "leadWizard.questions.hasWebsite.options.in-progress" },
      { value: "no", labelKey: "leadWizard.questions.hasWebsite.options.no" },
    ],
  },
  {
    id: "socialPlatforms",
    step: 4,
    type: "multi",
    required: true,
    options: [
      { value: "instagram", labelKey: "leadWizard.questions.socialPlatforms.options.instagram" },
      { value: "facebook", labelKey: "leadWizard.questions.socialPlatforms.options.facebook" },
      { value: "tiktok", labelKey: "leadWizard.questions.socialPlatforms.options.tiktok" },
      { value: "linkedin", labelKey: "leadWizard.questions.socialPlatforms.options.linkedin" },
      { value: "none", labelKey: "leadWizard.questions.socialPlatforms.options.none" },
    ],
  },
  {
    id: "socialManager",
    step: 4,
    type: "single",
    required: false,
    showIf: hasActiveSocialPlatforms,
    options: [
      { value: "ben-kendim", labelKey: "leadWizard.questions.socialManager.options.ben-kendim" },
      { value: "ekip-uyesi", labelKey: "leadWizard.questions.socialManager.options.ekip-uyesi" },
      { value: "baska-ajans", labelKey: "leadWizard.questions.socialManager.options.baska-ajans" },
      {
        value: "kimse-aktif-degil",
        labelKey: "leadWizard.questions.socialManager.options.kimse-aktif-degil",
      },
    ],
  },
  {
    id: "hasRunAds",
    step: 4,
    type: "single",
    required: true,
    options: [
      { value: "yes", labelKey: "leadWizard.questions.hasRunAds.options.yes" },
      { value: "no", labelKey: "leadWizard.questions.hasRunAds.options.no" },
    ],
  },
  {
    id: "adsResult",
    step: 4,
    type: "single",
    required: false,
    showIf: (answers) => answers.hasRunAds === "yes",
    options: [
      { value: "cok-iyi", labelKey: "leadWizard.questions.adsResult.options.cok-iyi" },
      { value: "orta", labelKey: "leadWizard.questions.adsResult.options.orta" },
      { value: "kotu-para-heba", labelKey: "leadWizard.questions.adsResult.options.kotu-para-heba" },
      {
        value: "ne-yaptigimi-bilmiyordum",
        labelKey: "leadWizard.questions.adsResult.options.ne-yaptigimi-bilmiyordum",
      },
    ],
  },
  {
    id: "contentAssets",
    step: 4,
    type: "single",
    required: true,
    options: [
      { value: "evet-profesyonel", labelKey: "leadWizard.questions.contentAssets.options.evet-profesyonel" },
      { value: "evet-telefon-cekimi", labelKey: "leadWizard.questions.contentAssets.options.evet-telefon-cekimi" },
      { value: "cok-az", labelKey: "leadWizard.questions.contentAssets.options.cok-az" },
      { value: "hic-yok", labelKey: "leadWizard.questions.contentAssets.options.hic-yok" },
    ],
  },
  {
    id: "analyticsSetup",
    step: 4,
    type: "single",
    required: true,
    options: [
      { value: "evet-aktif", labelKey: "leadWizard.questions.analyticsSetup.options.evet-aktif" },
      {
        value: "kurulu-ama-kullanmiyorum",
        labelKey: "leadWizard.questions.analyticsSetup.options.kurulu-ama-kullanmiyorum",
      },
      { value: "hayir", labelKey: "leadWizard.questions.analyticsSetup.options.hayir" },
    ],
  },
  {
    id: "budgetRange",
    step: 5,
    type: "single",
    required: true,
    options: [
      { value: "under-500", labelKey: "leadWizard.questions.budgetRange.options.under-500" },
      { value: "500-1500", labelKey: "leadWizard.questions.budgetRange.options.500-1500" },
      { value: "1500-3000", labelKey: "leadWizard.questions.budgetRange.options.1500-3000" },
      { value: "over-3000", labelKey: "leadWizard.questions.budgetRange.options.over-3000" },
    ],
  },
  {
    id: "involvementLevel",
    step: 5,
    type: "single",
    required: true,
    options: [
      { value: "hands-off", labelKey: "leadWizard.questions.involvementLevel.options.hands-off" },
      {
        value: "approval-only",
        labelKey: "leadWizard.questions.involvementLevel.options.approval-only",
      },
      {
        value: "collaborative",
        labelKey: "leadWizard.questions.involvementLevel.options.collaborative",
      },
    ],
  },
  {
    id: "decisionMaker",
    step: 5,
    type: "single",
    required: true,
    options: [
      {
        value: "ben-karar-vericiyim",
        labelKey: "leadWizard.questions.decisionMaker.options.ben-karar-vericiyim",
      },
      {
        value: "ortak-var-birlikte-karar",
        labelKey: "leadWizard.questions.decisionMaker.options.ortak-var-birlikte-karar",
      },
      {
        value: "ust-yonetime-danismam-lazim",
        labelKey: "leadWizard.questions.decisionMaker.options.ust-yonetime-danismam-lazim",
      },
    ],
  },
  {
    id: "previousAgency",
    step: 5,
    type: "single",
    required: true,
    options: [
      { value: "no", labelKey: "leadWizard.questions.previousAgency.options.no" },
      { value: "yes-good", labelKey: "leadWizard.questions.previousAgency.options.yes-good" },
      { value: "yes-bad", labelKey: "leadWizard.questions.previousAgency.options.yes-bad" },
    ],
  },
  {
    id: "previousAgencyIssue",
    step: 5,
    type: "single",
    required: false,
    showIf: (answers) => answers.previousAgency === "yes-bad",
    options: [
      {
        value: "iletisim-koptu",
        labelKey: "leadWizard.questions.previousAgencyIssue.options.iletisim-koptu",
      },
      {
        value: "sonuc-cikmadi",
        labelKey: "leadWizard.questions.previousAgencyIssue.options.sonuc-cikmadi",
      },
      {
        value: "fiyat-performans-kotuydu",
        labelKey: "leadWizard.questions.previousAgencyIssue.options.fiyat-performans-kotuydu",
      },
      {
        value: "sozlesme-sorunu",
        labelKey: "leadWizard.questions.previousAgencyIssue.options.sozlesme-sorunu",
      },
      { value: "other", labelKey: "leadWizard.questions.previousAgencyIssue.options.other" },
    ],
  },
  {
    id: "competitorAwareness",
    step: 5,
    type: "single",
    required: true,
    options: [
      {
        value: "evet-onlar-daha-iyi",
        labelKey: "leadWizard.questions.competitorAwareness.options.evet-onlar-daha-iyi",
      },
      {
        value: "evet-benzer-durumdayiz",
        labelKey: "leadWizard.questions.competitorAwareness.options.evet-benzer-durumdayiz",
      },
      {
        value: "hayir-takip-etmiyorum",
        labelKey: "leadWizard.questions.competitorAwareness.options.hayir-takip-etmiyorum",
      },
    ],
  },
];

export const leadFlowScreens = [
  { id: "screen-1", step: 1, questionIds: ["name"] },
  { id: "screen-2", step: 1, questionIds: ["businessName"] },
  { id: "screen-3", step: 1, questionIds: ["email"] },
  { id: "screen-4", step: 1, questionIds: ["phone"] },
  { id: "screen-5", step: 2, questionIds: ["businessType"] },
  { id: "screen-6", step: 2, questionIds: ["customerType"] },
  { id: "screen-7", step: 2, questionIds: ["geoTarget"] },
  { id: "screen-8", step: 2, questionIds: ["ecommercePlatform", "googleBusiness"] },
  { id: "screen-9", step: 3, questionIds: ["goals"] },
  { id: "screen-10", step: 3, questionIds: ["successMetric"] },
  { id: "screen-11", step: 3, questionIds: ["urgencyReason"] },
  { id: "screen-12", step: 4, questionIds: ["hasWebsite"] },
  { id: "screen-13", step: 4, questionIds: ["socialPlatforms"] },
  { id: "screen-14", step: 4, questionIds: ["socialManager"] },
  { id: "screen-15", step: 4, questionIds: ["hasRunAds"] },
  { id: "screen-16", step: 4, questionIds: ["adsResult"] },
  { id: "screen-17", step: 4, questionIds: ["contentAssets"] },
  { id: "screen-18", step: 4, questionIds: ["analyticsSetup"] },
  { id: "screen-19", step: 5, questionIds: ["budgetRange"] },
  { id: "screen-20", step: 5, questionIds: ["involvementLevel"] },
  { id: "screen-21", step: 5, questionIds: ["decisionMaker"] },
  { id: "screen-22", step: 5, questionIds: ["previousAgency"] },
  { id: "screen-23", step: 5, questionIds: ["previousAgencyIssue"] },
  { id: "screen-24", step: 5, questionIds: ["competitorAwareness"] },
];

export const getQuestionVisibility = (question, answers) =>
  typeof question.showIf === "function" ? question.showIf(answers) : true;

export const getQuestionsForStep = (step, answers) =>
  leadFlowQuestions.filter(
    (question) => question.step === step && getQuestionVisibility(question, answers),
  );

export const getVisibleScreens = (answers) =>
  leadFlowScreens.filter((screen) =>
    screen.questionIds.some((questionId) => {
      const question = leadFlowQuestions.find((item) => item.id === questionId);
      return question && getQuestionVisibility(question, answers);
    }),
  );

export const getQuestionsForScreen = (screen, answers) =>
  screen.questionIds
    .map((questionId) => leadFlowQuestions.find((question) => question.id === questionId))
    .filter((question) => question && getQuestionVisibility(question, answers));
