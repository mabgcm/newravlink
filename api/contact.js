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
    const rows = Object.entries(payload).map(([key, value]) => {
      const label = labelMap[key] || key;
      const safeValue = escapeHtml(formatValue(value));
      return `
        <tr>
          <td style="padding:10px 12px; border-bottom:1px solid #e6e6e6; color:#555; width:35%;"><strong>${label}</strong></td>
          <td style="padding:10px 12px; border-bottom:1px solid #e6e6e6; color:#111;">${safeValue}</td>
        </tr>
      `;
    });

    const text = Object.entries(payload)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join("\n");
    const analysisText = buildLeadAnalysisText(analysis);
    const analysisHtml = buildLeadAnalysisHtml(analysis);

    const html = `
      <div style="font-family:Arial, sans-serif; background:#f7f7fb; padding:24px;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #ececf2; border-radius:12px; overflow:hidden;">
          <div style="padding:16px 20px; background:#5b2dff; color:#fff;">
            <h2 style="margin:0; font-size:18px; font-weight:600;">New Lead Form Submission</h2>
          </div>
          <div style="padding:8px 20px 20px 20px;">
            <h3 style="margin:0 0 12px 0; font-size:16px; color:#111;">Lead Responses</h3>
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              ${rows.join("")}
            </table>
          </div>
          ${analysisHtml}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: "bugucam@gmail.com",
      to: "bugucam@gmail.com",
      subject: "New Lead Form Submission",
      text: `--- LEAD RESPONSES ---\n${text}\n${analysisText}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
}
