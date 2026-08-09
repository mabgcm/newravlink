const cleanText = (value, maxLength = 100) => {
  if (typeof value !== "string") {
    return undefined;
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength) || undefined;
};

const getLinkLocation = (anchor) => {
  const explicitLocation = anchor.getAttribute("data-ga-location");

  if (explicitLocation) {
    return explicitLocation;
  }

  if (anchor.closest("header, .navbar")) {
    return "header";
  }

  if (anchor.closest(".sidebar")) {
    return "sidebar";
  }

  if (anchor.closest("footer")) {
    return "footer";
  }

  return "page_content";
};

const isGrowthCheckLink = (anchor) => {
  const href = anchor.getAttribute("href");

  if (!href) {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin && /\/(?:tr\/)?growth-check\/?$/.test(url.pathname);
  } catch {
    return false;
  }
};

export const trackGa4Event = (eventName, params = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
};

export const initGa4ClickTracking = () => {
  if (typeof document === "undefined" || window.__ravlinkGa4ClickTracking) {
    return;
  }

  window.__ravlinkGa4ClickTracking = true;

  document.addEventListener("click", (event) => {
    const anchor = event.target?.closest?.("a");

    if (!anchor || !isGrowthCheckLink(anchor)) {
      return;
    }

    trackGa4Event("growth_check_click", {
      link_location: getLinkLocation(anchor),
      link_url: anchor.href,
      link_text: cleanText(anchor.textContent),
      page_path: window.location.pathname,
      site_language: window.location.pathname.startsWith("/tr") ? "tr" : "en",
    });
  });
};
