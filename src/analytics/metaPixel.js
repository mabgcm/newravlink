const EVENT_TEXT_LIMIT = 80;

const cleanValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  if (typeof value === "string") {
    return value.trim().slice(0, EVENT_TEXT_LIMIT) || undefined;
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean).map(cleanValue).filter(Boolean);
  }

  return value;
};

export const buildPixelParams = (params = {}) => {
  const eventParams = {
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
    ...params,
  };

  return Object.fromEntries(
    Object.entries(eventParams)
      .map(([key, value]) => [key, cleanValue(value)])
      .filter(([, value]) => value !== undefined),
  );
};

export const trackMetaStandard = (eventName, params = {}) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", eventName, buildPixelParams(params));
};

export const trackMetaCustom = (eventName, params = {}) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("trackCustom", eventName, buildPixelParams(params));
};

const getLinkType = (anchor) => {
  const href = anchor.getAttribute("href") || "";
  const normalizedHref = href.toLowerCase();

  if (normalizedHref.startsWith("mailto:")) {
    return "email";
  }

  if (normalizedHref.startsWith("tel:")) {
    return "phone";
  }

  if (normalizedHref.includes("wa.me/") || normalizedHref.includes("whatsapp.com/")) {
    return "whatsapp";
  }

  if (
    anchor.hasAttribute("download") ||
    /\.(pdf|zip|docx?|xlsx?|pptx?|csv)(\?|#|$)/i.test(normalizedHref)
  ) {
    return "download";
  }

  if (/^https?:\/\//i.test(href)) {
    return "outbound";
  }

  return "internal";
};

const getClickParams = (target, anchor) => ({
  label: target.getAttribute("data-fbq-label"),
  section: target.getAttribute("data-fbq-section") || target.closest("[data-pixel-section]")?.dataset.pixelSection,
  href: anchor?.getAttribute("href"),
  button_text: target.textContent,
});

export const initMetaPixelClickTracking = () => {
  if (typeof document === "undefined" || window.__ravlinkMetaPixelClickTracking) {
    return;
  }

  window.__ravlinkMetaPixelClickTracking = true;

  document.addEventListener("click", (event) => {
    const target = event.target?.closest?.("[data-fbq-event], a, button");

    if (!target) {
      return;
    }

    const anchor = target.closest("a");
    const explicitEventTarget = target.closest("[data-fbq-event]");
    const explicitEventName = explicitEventTarget?.getAttribute("data-fbq-event");

    if (explicitEventName) {
      trackMetaCustom(explicitEventName, getClickParams(explicitEventTarget, anchor));
    }

    if (target.closest(".navbar-toggler")) {
      trackMetaCustom("MobileMenuOpen", { label: "header-mobile-menu" });
    }

    if (!anchor) {
      return;
    }

    const linkType = getLinkType(anchor);
    const params = getClickParams(explicitEventTarget || anchor, anchor);

    if (linkType === "whatsapp") {
      trackMetaStandard("Contact", { ...params, contact_method: "whatsapp" });
      if (explicitEventName !== "WhatsAppClick") {
        trackMetaCustom("WhatsAppClick", params);
      }
      return;
    }

    if (linkType === "email") {
      trackMetaStandard("Contact", { ...params, contact_method: "email" });
      trackMetaCustom("EmailClick", params);
      return;
    }

    if (linkType === "phone") {
      trackMetaStandard("Contact", { ...params, contact_method: "phone" });
      trackMetaCustom("PhoneClick", params);
      return;
    }

    if (linkType === "download") {
      trackMetaCustom("DownloadClick", params);
      return;
    }

    if (linkType === "outbound") {
      trackMetaCustom("OutboundLinkClick", params);
      if (anchor.closest(".social-container")) {
        trackMetaCustom("SocialClick", params);
      }
      return;
    }

    if (anchor.closest(".section-footer")) {
      trackMetaCustom("FooterNavClick", params);
    }
  });
};
