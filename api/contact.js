import nodemailer from "nodemailer";

const labelMap = {
  fullName: "Full Name",
  name: "Name",
  phone: "Phone",
  email: "Email",
  businessName: "Business Name",
  websiteOrSocial: "Website / Social",
  location: "Location",
  businessType: "Business Type",
  customerType: "Customer Type",
  geoTarget: "Geo Target",
  ecommercePlatform: "E-commerce Platform",
  googleBusiness: "Google Business",
  monthlyAdBudget: "Monthly Ad Budget",
  goal: "Goal",
  goals: "Goals",
  successMetric: "Success Metric",
  urgencyReason: "Urgency Reason",
  servicesInterested: "Services Interested",
  currentlyRunningAds: "Currently Running Ads",
  hasWebsite: "Website Status",
  socialPlatforms: "Social Platforms",
  socialManager: "Social Media Management",
  hasRunAds: "Has Run Ads",
  adsResult: "Ads Result",
  contentAssets: "Content Assets",
  analyticsSetup: "Analytics Setup",
  budgetRange: "Budget Range",
  involvementLevel: "Involvement Level",
  decisionMaker: "Decision Maker",
  previousAgency: "Previous Agency",
  previousAgencyIssue: "Previous Agency Issue",
  competitorAwareness: "Competitor Awareness",
  message: "Message",
  growthCheckResult: "Growth Check Result",
};

const MODULE_CATALOG = {
  "social-mgmt": { monthly: 675, setup: 0 },
  "social-mgmt-plus": { monthly: 1125, setup: 0 },
  "meta-ads": { monthly: 450, setup: 0 },
  "google-ads": { monthly: 450, setup: 0 },
  "content-photo": { monthly: 90, setup: 0 },
  "content-video": { monthly: 125, setup: 0 },
  "seo-full": { monthly: 950, setup: 0 },
  "seo-local": { monthly: 0, setup: 450 },
  "web-build": { monthly: 0, setup: 1090 },
  "web-revamp": { monthly: 0, setup: 750 },
  "landing-page": { monthly: 0, setup: 450 },
  "gbp-setup": { monthly: 0, setup: 450 },
  "analytics-setup": { monthly: 0, setup: 200 },
  reporting: { monthly: 190, setup: 0 },
};

const BUDGET_LIMITS = {
  "under-500": 500,
  "500-1500": 1500,
  "1500-3000": 3000,
  "over-3000": Infinity,
};

const ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === null || value === undefined || value === "") {
    return [];
  }

  return [value];
};

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }

  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return String(value);
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatMoney = (amount) => `$${amount}`;

const normalizeAnswers = (answers) => {
  const normalized = {
    ...answers,
    goals: ensureArray(answers.goals),
    urgencyReason: ensureArray(answers.urgencyReason),
    socialPlatforms: ensureArray(answers.socialPlatforms),
    previousAgencyIssue: ensureArray(answers.previousAgencyIssue),
  };

  const singleValueMap = {
    "ben-kendim": "myself",
    "ekip-uyesi": "team-member",
    "baska-ajans": "another-agency",
    "kimse-aktif-degil": "nobody-active",
    "kotu-para-heba": "bad-wasted-money",
    "ne-yaptigimi-bilmiyordum": "did-not-know-what-i-was-doing",
    "cok-az": "very-few",
    "hic-yok": "none",
    "evet-telefon-cekimi": "yes-phone-quality",
    "evet-profesyonel": "yes-professional",
    "hayir": "no",
    "kurulu-ama-kullanmiyorum": "installed-not-using",
    "bilmiyorum": "not-sure",
    "ust-yonetime-danismam-lazim": "need-management-approval",
    "ortak-var-birlikte-karar": "partner-involved",
    "ben-karar-vericiyim": "i-decide",
    "evet-onlar-daha-iyi": "yes-theyre-ahead",
    "evet-benzer-durumdayiz": "yes-similar-position",
    "hayir-takip-etmiyorum": "not-tracking",
  };

  const multiValueMap = {
    "yeni-acilis": "new-opening",
    "sezon-basliyor": "season-starting",
    "rakip-baskisi": "competitor-pressure",
    "buyume-hedefi": "growth-target",
    "onceki-ajans-birakti": "previous-agency-dropped",
    "iletisim-koptu": "communication-dropped",
    "sonuc-cikmadi": "no-results",
    "fiyat-performans-kotuydu": "poor-value",
    "sozlesme-sorunu": "contract-issue",
  };

  Object.entries(singleValueMap).forEach(([from, to]) => {
    Object.keys(normalized).forEach((key) => {
      if (normalized[key] === from) {
        normalized[key] = to;
      }
    });
  });

  normalized.urgencyReason = normalized.urgencyReason.map((item) => multiValueMap[item] || item);
  normalized.previousAgencyIssue = normalized.previousAgencyIssue.map(
    (item) => multiValueMap[item] || item,
  );

  return normalized;
};

const createModule = (moduleId, overrides = {}) => {
  const base = MODULE_CATALOG[moduleId] || { monthly: 0, setup: 0 };
  return {
    moduleId,
    monthly: base.monthly,
    setup: base.setup,
    ...overrides,
  };
};

const getModuleOrder = (moduleId) =>
  [
    "social-mgmt",
    "social-mgmt-plus",
    "meta-ads",
    "google-ads",
    "content-photo",
    "content-video",
    "seo-full",
    "seo-local",
    "web-build",
    "web-revamp",
    "landing-page",
    "gbp-setup",
    "analytics-setup",
    "reporting",
  ].indexOf(moduleId);

const sortModules = (modules) =>
  [...modules].sort((left, right) => getModuleOrder(left.moduleId) - getModuleOrder(right.moduleId));

const summarizeModules = (modules) =>
  modules.reduce(
    (summary, module) => ({
      monthly: summary.monthly + module.monthly,
      setup: summary.setup + module.setup,
    }),
    { monthly: 0, setup: 0 },
  );

const formatModuleLine = (module) => {
  const setupText = module.setup > 0 ? ` + ${formatMoney(module.setup)} setup` : "";
  const detailText = module.detail ? ` (${module.detail})` : "";
  return `${module.moduleId}${detailText} — ${formatMoney(module.monthly)}/mo${setupText}`;
};

const buildBudgetSuggestion = (normalizedAnswers, recommendedModules, budgetLimit) => {
  if (!Number.isFinite(budgetLimit) || budgetLimit <= 0) {
    return null;
  }

  const priorities = [];

  if (
    normalizedAnswers.goals.includes("brand-awareness") ||
    normalizedAnswers.goals.includes("social-media")
  ) {
    priorities.push("social-mgmt");
  }

  if (
    normalizedAnswers.hasRunAds === "yes" &&
    ["bad-wasted-money", "did-not-know-what-i-was-doing"].includes(normalizedAnswers.adsResult)
  ) {
    priorities.push("meta-ads");
  }

  if (normalizedAnswers.contentAssets === "none") {
    priorities.push("content-photo");
  }

  if (normalizedAnswers.businessType === "local-business") {
    priorities.push("seo-local");
  }

  const uniquePriorities = [...new Set(priorities)];
  const suggestedModules = [];
  let monthlyTotal = 0;

  uniquePriorities.forEach((moduleId) => {
    if (suggestedModules.length >= 2) {
      return;
    }

    const module = recommendedModules.find((item) => item.moduleId === moduleId);
    if (!module) {
      return;
    }

    if (monthlyTotal + module.monthly > budgetLimit && suggestedModules.length > 0) {
      return;
    }

    suggestedModules.push(module);
    monthlyTotal += module.monthly;
  });

  if (!suggestedModules.length) {
    sortModules(recommendedModules)
      .filter((module) => module.monthly <= budgetLimit || suggestedModules.length === 0)
      .slice(0, 2)
      .forEach((module) => {
        if (suggestedModules.length >= 2) {
          return;
        }

        if (monthlyTotal + module.monthly > budgetLimit && suggestedModules.length > 0) {
          return;
        }

        suggestedModules.push(module);
        monthlyTotal += module.monthly;
      });
  }

  if (!suggestedModules.length) {
    return null;
  }

  return {
    modules: suggestedModules,
    monthlyTotal,
  };
};

const LeadScoringEngine = (answers) => {
  const normalizedAnswers = normalizeAnswers(answers);
  const requiredMap = new Map();
  const optionalMap = new Map();
  const mailNotes = [];

  const addRequired = (moduleId, overrides = {}) => {
    optionalMap.delete(moduleId);
    requiredMap.set(moduleId, createModule(moduleId, overrides));
  };

  const addOptional = (moduleId, overrides = {}) => {
    if (requiredMap.has(moduleId) || optionalMap.has(moduleId)) {
      return;
    }

    optionalMap.set(moduleId, createModule(moduleId, overrides));
  };

  const goals = normalizedAnswers.goals;
  const socialPlatforms = normalizedAnswers.socialPlatforms;
  const previousAgencyIssues = normalizedAnswers.previousAgencyIssue;
  const budgetRange = normalizedAnswers.budgetRange;

  const socialMgmtRequired =
    goals.includes("social-media") ||
    (goals.includes("brand-awareness") &&
      ["myself", "nobody-active"].includes(normalizedAnswers.socialManager));

  if (socialMgmtRequired) {
    addRequired("social-mgmt", {
      setup: socialPlatforms.includes("none") ? 300 : 0,
    });

    if (["1500-3000", "over-3000"].includes(budgetRange)) {
      addOptional("social-mgmt-plus", {
        setup: socialPlatforms.includes("none") ? 300 : 0,
      });
    }
  }

  if (["none", "very-few"].includes(normalizedAnswers.contentAssets)) {
    addRequired("content-photo");
    addOptional("content-video");
  } else if (normalizedAnswers.contentAssets === "yes-phone-quality") {
    addOptional("content-photo");
    addOptional("content-video");
  }

  const metaAdsRequired =
    goals.some((goal) => ["paid-ads", "more-leads", "increase-sales"].includes(goal)) ||
    (normalizedAnswers.hasRunAds === "yes" &&
      ["bad-wasted-money", "did-not-know-what-i-was-doing"].includes(normalizedAnswers.adsResult));

  if (metaAdsRequired) {
    addRequired("meta-ads");
  }

  const googleAdsRequired =
    goals.includes("more-leads") &&
    ["professional-service", "home-service"].includes(normalizedAnswers.businessType);

  if (googleAdsRequired) {
    addRequired("google-ads");
  } else if (
    goals.includes("paid-ads") &&
    ["national", "international"].includes(normalizedAnswers.geoTarget)
  ) {
    addOptional("google-ads");
  }

  if (goals.includes("seo")) {
    addRequired("seo-full");
  }

  if (
    ["local-business", "home-service", "food-beverage"].includes(normalizedAnswers.businessType) &&
    goals.includes("more-leads")
  ) {
    addRequired("seo-local");
  }

  if (["inactive", "none"].includes(normalizedAnswers.googleBusiness)) {
    addRequired("gbp-setup");

    if (!requiredMap.has("seo-local")) {
      addOptional("seo-local");
    }
  }

  if (normalizedAnswers.hasWebsite === "no") {
    addRequired("web-build");
  }

  if (["yes-unhappy", "in-progress"].includes(normalizedAnswers.hasWebsite)) {
    addOptional("web-revamp");
  }

  if (
    goals.some((goal) => ["increase-sales", "more-leads"].includes(goal)) &&
    normalizedAnswers.hasWebsite !== "no"
  ) {
    addOptional("landing-page");
  }

  if (normalizedAnswers.analyticsSetup === "no") {
    addRequired("analytics-setup");
  } else if (normalizedAnswers.analyticsSetup === "installed-not-using") {
    addOptional("analytics-setup");
  }

  const reportingPlatformCount =
    (requiredMap.has("meta-ads") ? 1 : 0) + (requiredMap.has("google-ads") ? 1 : 0);

  if (reportingPlatformCount > 0) {
    const reportingModule = {
      monthly: MODULE_CATALOG.reporting.monthly * reportingPlatformCount,
      setup: 0,
      detail: `${reportingPlatformCount} platform${reportingPlatformCount > 1 ? "s" : ""}`,
    };

    if (["1500-3000", "over-3000"].includes(budgetRange)) {
      addRequired("reporting", reportingModule);
    } else if (
      budgetRange === "500-1500" ||
      ["approval-only", "hands-off"].includes(normalizedAnswers.involvementLevel)
    ) {
      addOptional("reporting", reportingModule);
    }
  }

  if (normalizedAnswers.previousAgency === "yes-bad") {
    mailNotes.push(
      "Client had a negative agency experience. Emphasize process transparency and communication frequency.",
    );
  }

  if (previousAgencyIssues.includes("communication-dropped")) {
    mailNotes.push(
      "Communication breakdown was the core issue. Offer structured check-ins and regular reporting.",
    );
  }

  if (normalizedAnswers.decisionMaker === "need-management-approval") {
    mailNotes.push(
      "Client cannot decide alone. Tailor the proposal for upper management — focus on ROI and risk reduction.",
    );
  }

  if (normalizedAnswers.decisionMaker === "partner-involved") {
    mailNotes.push(
      "Multiple decision-makers. Use ROI-focused language that addresses all stakeholders.",
    );
  }

  if (normalizedAnswers.competitorAwareness === "yes-theyre-ahead") {
    mailNotes.push(
      "Client is aware competitors are outperforming them. A competitor comparison in the proposal will be persuasive.",
    );
  }

  if (["bad-wasted-money", "did-not-know-what-i-was-doing"].includes(normalizedAnswers.adsResult)) {
    mailNotes.push(
      "Client experienced poor ad results. Present a performance guarantee or case study to rebuild confidence.",
    );
  }

  if (normalizedAnswers.adsResult === "bad-wasted-money" && requiredMap.has("meta-ads")) {
    mailNotes.push(
      "Client previously lost money on unmanaged ads. Communicate clearly why managed campaigns are the correct approach.",
    );
  }

  if (budgetRange === "under-500") {
    mailNotes.push(
      "Budget is limited. Be prepared for price negotiation. Recommend starting with 1–2 core modules.",
    );
  }

  if (normalizedAnswers.involvementLevel === "hands-off") {
    mailNotes.push(
      "Client wants full agency management. Strong upsell opportunity for a complete package.",
    );
  }

  if (normalizedAnswers.urgencyReason.includes("new-opening")) {
    mailNotes.push("Business is newly launched. Prioritize visibility and quick-win channels.");
  }

  if (normalizedAnswers.successMetric === "not-sure") {
    mailNotes.push(
      "Client has no defined success metric. Begin the first meeting with a goal-setting session.",
    );
  }

  if (normalizedAnswers.analyticsSetup === "installed-not-using") {
    mailNotes.push(
      "Analytics installed but unused. Configuration may be needed before campaign launch.",
    );
  }

  const recommendedModules = sortModules([...requiredMap.values()]);
  const optionalModules = sortModules([...optionalMap.values()]);
  const pricing = summarizeModules(recommendedModules);
  const budgetLimit = BUDGET_LIMITS[budgetRange] ?? Infinity;
  const budgetWarning = Number.isFinite(budgetLimit) && pricing.monthly > budgetLimit;
  const suggestedStartingPoint = budgetWarning
    ? buildBudgetSuggestion(normalizedAnswers, recommendedModules, budgetLimit)
    : null;

  return {
    recommendedModules,
    optionalModules,
    pricing,
    budgetWarning,
    budgetRange,
    mailNotes,
    suggestedStartingPoint,
  };
};

const buildLeadAnalysisText = (analysis) => {
  const recommendedLines = analysis.recommendedModules.length
    ? analysis.recommendedModules.map((module) => `  - ${formatModuleLine(module)}`)
    : ["  - None"];

  const optionalLines = analysis.optionalModules.length
    ? analysis.optionalModules.map((module) => `  - ${formatModuleLine(module)}`)
    : ["  - None"];

  const budgetLines = [`  Client selected: ${analysis.budgetRange || "—"}`];

  if (analysis.budgetWarning && analysis.suggestedStartingPoint) {
    budgetLines.push("  ⚠ Recommended package exceeds stated budget.");
    budgetLines.push(
      `    Suggested starting point: ${analysis.suggestedStartingPoint.modules
        .map((module) => module.moduleId)
        .join(", ")} — ${formatMoney(analysis.suggestedStartingPoint.monthlyTotal)}/mo`,
    );
  }

  const noteLines = analysis.mailNotes.length
    ? analysis.mailNotes.map((note) => `  → ${note}`)
    : [];

  return `

--- LEAD ANALYSIS ---

Recommended Modules:
${recommendedLines.join("\n")}

Optional Add-ons:
${optionalLines.join("\n")}

Pricing Summary:
  Monthly Total (recommended): ${formatMoney(analysis.pricing.monthly)}
  One-time Setup Total       : ${formatMoney(analysis.pricing.setup)}

Budget Note:
${budgetLines.join("\n")}

--- ACCOUNT NOTES ---
${noteLines.join("\n")}
`.trimEnd();
};

const buildLeadAnalysisHtml = (analysis) => {
  const renderModuleList = (modules) => {
    if (!modules.length) {
      return `<li style="margin-bottom:8px; color:#111;">None</li>`;
    }

    return modules
      .map(
        (module) => `
          <li style="margin-bottom:8px; color:#111;">${escapeHtml(formatModuleLine(module))}</li>
        `,
      )
      .join("");
  };

  const budgetWarningHtml =
    analysis.budgetWarning && analysis.suggestedStartingPoint
      ? `
          <p style="margin:8px 0 0 0; color:#a34b00; font-weight:600;">⚠ Recommended package exceeds stated budget.</p>
          <p style="margin:6px 0 0 0; color:#111;">
            Suggested starting point:
            ${escapeHtml(
              `${analysis.suggestedStartingPoint.modules
                .map((module) => module.moduleId)
                .join(", ")} — ${formatMoney(analysis.suggestedStartingPoint.monthlyTotal)}/mo`,
            )}
          </p>
        `
      : "";

  const noteHtml = analysis.mailNotes.length
    ? analysis.mailNotes
        .map(
          (note) => `
            <li style="margin-bottom:8px; color:#111;">${escapeHtml(note)}</li>
          `,
        )
        .join("")
    : `<li style="margin-bottom:8px; color:#111;">None</li>`;

  return `
    <div style="padding:0 20px 20px 20px;">
      <div style="border-top:1px solid #ececf2; padding-top:18px;">
        <h3 style="margin:0 0 12px 0; font-size:16px; color:#111;">Lead Analysis</h3>

        <p style="margin:0 0 8px 0; font-weight:700; color:#111;">Recommended Modules:</p>
        <ul style="margin:0 0 16px 18px; padding:0;">${renderModuleList(analysis.recommendedModules)}</ul>

        <p style="margin:0 0 8px 0; font-weight:700; color:#111;">Optional Add-ons:</p>
        <ul style="margin:0 0 16px 18px; padding:0;">${renderModuleList(analysis.optionalModules)}</ul>

        <p style="margin:0 0 8px 0; font-weight:700; color:#111;">Pricing Summary:</p>
        <table style="width:100%; border-collapse:collapse; font-size:14px; margin-bottom:16px;">
          <tr>
            <td style="padding:8px 0; color:#555;">Monthly Total (recommended)</td>
            <td style="padding:8px 0; color:#111; text-align:right;">${escapeHtml(
              formatMoney(analysis.pricing.monthly),
            )}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#555;">One-time Setup Total</td>
            <td style="padding:8px 0; color:#111; text-align:right;">${escapeHtml(
              formatMoney(analysis.pricing.setup),
            )}</td>
          </tr>
        </table>

        <p style="margin:0 0 8px 0; font-weight:700; color:#111;">Budget Note:</p>
        <p style="margin:0; color:#111;">Client selected: ${escapeHtml(analysis.budgetRange || "—")}</p>
        ${budgetWarningHtml}

        <p style="margin:18px 0 8px 0; font-weight:700; color:#111;">Account Notes:</p>
        <ul style="margin:0 0 0 18px; padding:0;">${noteHtml}</ul>
      </div>
    </div>
  `;
};

const GROWTH_CHECK_QUESTIONS = [
  { id: "goal", label: "90-day priority", options: ["More calls or messages", "More quote or appointment requests", "Better-quality customers", "Convert more existing enquiries"] },
  { id: "source", label: "Main customer source", options: ["Referrals", "Google Search or Maps", "Social media", "Paid ads", "No consistent source", "Not tracked"] },
  { id: "google", label: "Local Google visibility", options: ["Appears near the top", "Appears sometimes", "Profile exists but is weak", "No Google Business Profile", "Never checked"] },
  { id: "presence", label: "Online presence", options: ["Current, professional website", "Old or basic website", "Only social media or Google profile", "Very little current information"] },
  { id: "conversion", label: "Conversion path", options: ["Consistent calls or forms", "Call-to-action exists but response is low", "Contact details exist but the path is unclear", "No clear next step"] },
  { id: "followup", label: "Lead follow-up", options: ["Fast response and consistent follow-up", "Replies are sent but follow-up is inconsistent", "Some enquiries are missed", "Most enquiries are low quality", "Not enough enquiries"] },
  { id: "tracking", label: "Marketing measurement", options: ["Leads and sales tracked by source", "Some results tracked", "Only sales reviewed", "Not tracked"] },
  { id: "capacity", label: "New-customer capacity", options: ["Can take on more now", "Limited capacity", "Only wants specific customers", "Currently full"] },
  { id: "budget", label: "Realistic monthly budget", options: ["No budget right now", "Under $500", "$500–$1,500", "$1,500–$3,000", "Over $3,000", "Needs guidance first"] },
];

const GROWTH_CHECK_DIAGNOSES = {
  visibility: {
    title: "Google visibility is the first priority",
    summary: "The business has room for new customers but is not consistently visible when local buyers are actively searching.",
    action: "Strengthen the Google Business Profile, reviews, and local service visibility.",
    avoid: "Do not increase ad spend before the local foundation is measurable.",
  },
  foundation: {
    title: "Build trust before buying traffic",
    summary: "Potential customers cannot quickly find enough proof, clarity, or a professional path to choose this business.",
    action: "Clarify the offer, trust signals, and contact path on a focused website.",
    avoid: "Do not pay for more visitors before the website can convert them.",
  },
  conversion: {
    title: "The conversion system is the first priority",
    summary: "People can find the business, but too few take the next step. The immediate opportunity is turning interest into enquiries.",
    action: "Simplify the quote, booking, or call path and track every enquiry.",
    avoid: "Do not treat traffic volume as the main problem.",
  },
  quality: {
    title: "Better-qualified enquiries are needed, not more volume",
    summary: "Lead quality or capacity is the constraint. More volume could create noise instead of profitable growth.",
    action: "Tighten positioning, qualification questions, and service expectations.",
    avoid: "Do not launch broad campaigns optimized only for lead volume.",
  },
  tracking: {
    title: "Measure before scaling",
    summary: "Marketing activity exists, but it is not clear which source creates real customers.",
    action: "Connect calls, forms, and sales to their original marketing source.",
    avoid: "Do not scale a channel before knowing its customer acquisition result.",
  },
};

const humanizeValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(humanizeValue).join(", ");
  }

  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return String(value)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getGrowthCheckData = (payload) => {
  const saved = payload.growthCheck && typeof payload.growthCheck === "object"
    ? payload.growthCheck
    : {};
  const diagnosisKey = saved.diagnosis || payload.growthCheckResult;
  const diagnosis = GROWTH_CHECK_DIAGNOSES[diagnosisKey];
  const answers = saved.answers && typeof saved.answers === "object" ? saved.answers : {};

  return {
    diagnosisKey,
    diagnosis,
    language: saved.language || "unknown",
    answers: GROWTH_CHECK_QUESTIONS.map((question) => ({
      label: question.label,
      value: question.options[answers[question.id]] || "Not available",
    })),
  };
};

const renderResponseRows = (payload) =>
  Object.entries(payload)
    .filter(([key]) => !["growthCheck", "growthCheckResult"].includes(key))
    .map(([key, value]) => {
      const label = labelMap[key] || humanizeValue(key);
      return `
        <tr>
          <td style="padding:12px 14px; border-bottom:1px solid #ececf2; color:#6b6873; width:38%; vertical-align:top; font-size:13px;"><strong>${escapeHtml(label)}</strong></td>
          <td style="padding:12px 14px; border-bottom:1px solid #ececf2; color:#17151b; font-size:14px; line-height:1.45;">${escapeHtml(humanizeValue(value))}</td>
        </tr>
      `;
    })
    .join("");

const renderGrowthCheckHtml = (growthCheck) => {
  if (!growthCheck.diagnosis) {
    return "";
  }

  const answerRows = growthCheck.answers
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:11px 14px; border-bottom:1px solid #ececf2; color:#6b6873; width:42%; vertical-align:top; font-size:13px;"><strong>${escapeHtml(label)}</strong></td>
          <td style="padding:11px 14px; border-bottom:1px solid #ececf2; color:#17151b; font-size:14px;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="padding:24px 24px 0;">
      <div style="font-size:11px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:#5b2dff; margin-bottom:8px;">Initial Growth Check</div>
      <div style="background:#f4f0ff; border:1px solid #ddd2ff; border-radius:14px; padding:20px;">
        <h2 style="margin:0 0 10px; color:#21164d; font-size:22px; line-height:1.25;">${escapeHtml(growthCheck.diagnosis.title)}</h2>
        <p style="margin:0 0 16px; color:#514c5b; font-size:14px; line-height:1.6;">${escapeHtml(growthCheck.diagnosis.summary)}</p>
        <div style="background:#fff; border-radius:10px; padding:13px 14px; margin-bottom:9px;">
          <div style="font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#5b2dff; margin-bottom:5px;">Recommended first move</div>
          <div style="color:#17151b; font-size:14px; line-height:1.5;">${escapeHtml(growthCheck.diagnosis.action)}</div>
        </div>
        <div style="background:#fff; border-radius:10px; padding:13px 14px;">
          <div style="font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#b04444; margin-bottom:5px;">Avoid for now</div>
          <div style="color:#17151b; font-size:14px; line-height:1.5;">${escapeHtml(growthCheck.diagnosis.avoid)}</div>
        </div>
      </div>

      <h3 style="margin:26px 0 10px; color:#17151b; font-size:16px;">Growth Check answers</h3>
      <table style="width:100%; border-collapse:collapse; border:1px solid #ececf2; border-radius:10px; overflow:hidden;">
        ${answerRows}
      </table>
    </div>
  `;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bugucam@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const payload = req.body || {};
    const analysis = LeadScoringEngine(payload);
    const growthCheck = getGrowthCheckData(payload);
    const responseRows = renderResponseRows(payload);

    const text = Object.entries(payload)
      .filter(([key]) => key !== "growthCheck")
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join("\n");
    const analysisText = buildLeadAnalysisText(analysis);
    const analysisHtml = buildLeadAnalysisHtml(analysis);
    const growthCheckHtml = renderGrowthCheckHtml(growthCheck);
    const leadName = payload.name || payload.fullName || "New lead";
    const businessName = payload.businessName || "Business not provided";
    const subjectContext = growthCheck.diagnosis
      ? `Growth Check — ${growthCheck.diagnosis.title}`
      : "New qualification form";

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif; background:#f5f4f8; padding:28px 12px;">
        <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e8e6ed; border-radius:16px; overflow:hidden; box-shadow:0 12px 35px rgba(34,25,55,.08);">
          <div style="padding:24px; background:#5b2dff; color:#fff;">
            <div style="font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; opacity:.78; margin-bottom:8px;">Rav Link · New qualified enquiry</div>
            <h1 style="margin:0 0 8px; font-size:24px; line-height:1.2;">${escapeHtml(leadName)}</h1>
            <p style="margin:0; font-size:14px; opacity:.9;">${escapeHtml(businessName)}${payload.email ? ` · ${escapeHtml(payload.email)}` : ""}${payload.phone ? ` · ${escapeHtml(payload.phone)}` : ""}</p>
          </div>
          ${growthCheckHtml}
          <div style="padding:24px 24px 6px;">
            <h3 style="margin:0 0 10px; font-size:16px; color:#17151b;">Qualification form answers</h3>
            <table style="width:100%; border-collapse:collapse; border:1px solid #ececf2; border-radius:10px; overflow:hidden;">
              ${responseRows}
            </table>
          </div>
          ${analysisHtml}
          <div style="padding:18px 24px; background:#f7f6f9; color:#77727f; font-size:11px; line-height:1.5;">
            Generated from the Rav Link Growth Check and qualification form. Review the customer’s stated answers before making a recommendation.
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: "bugucam@gmail.com",
      to: "bugucam@gmail.com",
      subject: `${leadName} · ${subjectContext}`,
      text: `--- LEAD RESPONSES ---\n${text}\n${analysisText}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
}
