import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackMetaCustom, trackMetaStandard } from "./metaPixel";

const SITE_MILESTONES = [
  { seconds: 30, events: ["EngagedVisit", "TimeOnSite30s"] },
  { seconds: 60, events: ["TimeOnSite60s"] },
  { seconds: 120, events: ["TimeOnSite120s"] },
  { seconds: 300, events: ["LongVisit", "TimeOnSite300s"] },
];

const PAGE_MILESTONES = [
  { seconds: 30, event: "TimeOnPage30s" },
  { seconds: 60, event: "TimeOnPage60s" },
  { seconds: 120, event: "TimeOnPage120s" },
];

const SCROLL_DEPTHS = [25, 50, 75, 90];
const VIDEO_PROGRESS = [25, 50, 75, 90];

const PAGE_META = {
  "/": { name: "Home", category: "home", event: "HomePageView" },
  "/about": { name: "About", category: "company", event: "AboutPageView" },
  "/services": { name: "Services", category: "services", event: "ServicePageView" },
  "/service": { name: "Services", category: "services", event: "ServicePageView" },
  "/services/seo-barrie": { name: "SEO Services Barrie", category: "services", event: "ServiceDetailView" },
  "/services/website-design-barrie": { name: "Website Design Barrie", category: "services", event: "ServiceDetailView" },
  "/services/meta-ads-management": { name: "Meta Ads Management", category: "services", event: "ServiceDetailView" },
  "/services/contractor-marketing": { name: "Contractor Marketing", category: "services", event: "ServiceDetailView" },
  "/single_services": { name: "Service Detail", category: "services", event: "ServiceDetailView" },
  "/case-studies": { name: "Case Studies", category: "case_studies", event: "CaseStudiesPageView" },
  "/case_studies": { name: "Case Studies", category: "case_studies", event: "CaseStudiesPageView" },
  "/team": { name: "Team", category: "company", event: "TeamPageView" },
  "/partnership": { name: "Partnership", category: "company", event: "PartnershipPageView" },
  "/pricing": { name: "Pricing", category: "pricing", event: "PricingPageView" },
  "/testimonial": { name: "Testimonials", category: "social_proof", event: "TestimonialPageView" },
  "/faq": { name: "FAQ", category: "support", event: "FaqPageView" },
  "/blog": { name: "Blog", category: "blog", event: "BlogPageView" },
  "/single_post": { name: "Blog Article", category: "blog", event: "BlogArticleView" },
  "/contact": { name: "Contact", category: "lead", event: "ContactPageView" },
  "/seo-agency-toronto": { name: "SEO Agency Toronto", category: "local_seo", event: "LocationPageView" },
  "/seo-agency-vaughan": { name: "SEO Agency Vaughan", category: "local_seo", event: "LocationPageView" },
  "/seo-agency-barrie": { name: "SEO Agency Barrie", category: "local_seo", event: "LocationPageView" },
  "/website-design-toronto": { name: "Website Design Toronto", category: "local_seo", event: "LocationPageView" },
  "/meta-ads-agency-toronto": { name: "Meta Ads Agency Toronto", category: "local_seo", event: "LocationPageView" },
  "/contractor-marketing-ontario": { name: "Contractor Marketing Ontario", category: "local_seo", event: "LocationPageView" },
};

const formatSectionEventName = (section) =>
  `${section
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}SectionViewed`;

function MetaPixelTracker() {
  const location = useLocation();
  const siteSecondsRef = useRef(0);
  const pageSecondsRef = useRef(0);
  const firedSiteMilestonesRef = useRef(new Set());
  const firedPageMilestonesRef = useRef(new Set());
  const firedScrollDepthsRef = useRef(new Set());
  const currentPathRef = useRef("");
  const isFirstRouteRef = useRef(true);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (document.hidden) {
        return;
      }

      siteSecondsRef.current += 1;
      pageSecondsRef.current += 1;

      SITE_MILESTONES.forEach(({ seconds, events }) => {
        if (siteSecondsRef.current < seconds || firedSiteMilestonesRef.current.has(seconds)) {
          return;
        }

        firedSiteMilestonesRef.current.add(seconds);
        events.forEach((eventName) => {
          trackMetaCustom(eventName, { seconds });
        });
      });

      PAGE_MILESTONES.forEach(({ seconds, event }) => {
        if (pageSecondsRef.current < seconds || firedPageMilestonesRef.current.has(seconds)) {
          return;
        }

        firedPageMilestonesRef.current.add(seconds);
        trackMetaCustom(event, { seconds });
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const pageMeta = PAGE_META[path] || { name: "Unknown", category: "unknown", event: "UnknownPageView" };

    if (currentPathRef.current) {
      trackMetaCustom("PageExit", {
        exited_page: currentPathRef.current,
        active_seconds: pageSecondsRef.current,
      });
    }

    currentPathRef.current = path;
    pageSecondsRef.current = 0;
    firedPageMilestonesRef.current = new Set();
    firedScrollDepthsRef.current = new Set();

    if (isFirstRouteRef.current) {
      isFirstRouteRef.current = false;
      if (!window.__ravlinkMetaPixelBootPageViewTracked) {
        trackMetaStandard("PageView", { page_name: pageMeta.name });
      }
    } else {
      trackMetaStandard("PageView", { page_name: pageMeta.name });
    }

    trackMetaStandard("ViewContent", {
      content_name: pageMeta.name,
      content_category: pageMeta.category,
    });
    trackMetaCustom(pageMeta.event, {
      content_name: pageMeta.name,
      content_category: pageMeta.category,
    });
  }, [location.pathname]);

  useEffect(() => {
    const trackExit = () => {
      if (!currentPathRef.current) {
        return;
      }

      trackMetaCustom("PageExit", {
        exited_page: currentPathRef.current,
        active_seconds: pageSecondsRef.current,
      });
    };

    window.addEventListener("beforeunload", trackExit);
    return () => window.removeEventListener("beforeunload", trackExit);
  }, []);

  useEffect(() => {
    const videoProgressMap = new WeakMap();

    const getVideoParams = (video) => ({
      video_src: video.currentSrc || video.src,
      video_title: video.getAttribute("title") || video.getAttribute("aria-label"),
    });

    const handleVideoPlay = (event) => {
      if (event.target?.tagName !== "VIDEO") {
        return;
      }

      trackMetaCustom("VideoPlay", getVideoParams(event.target));
    };

    const handleVideoTimeUpdate = (event) => {
      const video = event.target;

      if (video?.tagName !== "VIDEO" || !video.duration) {
        return;
      }

      const watchedPercent = (video.currentTime / video.duration) * 100;
      const firedProgress = videoProgressMap.get(video) || new Set();

      VIDEO_PROGRESS.forEach((percent) => {
        if (watchedPercent < percent || firedProgress.has(percent)) {
          return;
        }

        firedProgress.add(percent);
        trackMetaCustom("VideoProgress", {
          ...getVideoParams(video),
          percent,
        });
      });

      videoProgressMap.set(video, firedProgress);
    };

    document.addEventListener("play", handleVideoPlay, true);
    document.addEventListener("timeupdate", handleVideoTimeUpdate, true);

    return () => {
      document.removeEventListener("play", handleVideoPlay, true);
      document.removeEventListener("timeupdate", handleVideoTimeUpdate, true);
    };
  }, []);

  useEffect(() => {
    const trackScrollDepth = () => {
      const documentElement = document.documentElement;
      const scrollableHeight = documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight <= 0
        ? 100
        : ((window.scrollY + window.innerHeight) / documentElement.scrollHeight) * 100;

      SCROLL_DEPTHS.forEach((depth) => {
        if (progress < depth || firedScrollDepthsRef.current.has(depth)) {
          return;
        }

        firedScrollDepthsRef.current.add(depth);
        trackMetaCustom("ScrollDepth", { percent: depth });
      });
    };

    window.addEventListener("scroll", trackScrollDepth, { passive: true });
    window.addEventListener("resize", trackScrollDepth);
    window.requestAnimationFrame(trackScrollDepth);

    return () => {
      window.removeEventListener("scroll", trackScrollDepth);
      window.removeEventListener("resize", trackScrollDepth);
    };
  }, [location.pathname]);

  useEffect(() => {
    const viewedSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target.dataset.pixelSection;
          if (!section || viewedSections.has(section)) {
            return;
          }

          viewedSections.add(section);
          trackMetaCustom("ImportantSectionViewed", { section });
          trackMetaCustom(formatSectionEventName(section), { section });
        });
      },
      { threshold: 0.45 },
    );

    const observeSections = () => {
      document.querySelectorAll("[data-pixel-section]").forEach((element) => {
        observer.observe(element);
      });
    };

    const frameId = window.requestAnimationFrame(observeSections);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}

export default MetaPixelTracker;
