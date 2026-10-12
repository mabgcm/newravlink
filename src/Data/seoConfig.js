const SITE_URL = "https://ravlink.ca";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/ravlink-logo.png`;

export const areaServed = [
    "Greater Toronto Area",
    "Toronto",
    "Vaughan",
    "Richmond Hill",
    "Markham",
    "Mississauga",
    "Brampton",
    "North York",
    "Scarborough",
    "Barrie",
    "Simcoe County",
    "Ontario",
];

const canonical = (path) => `${SITE_URL}${path}`;
const googleMapsArticlePath = "/blog/how-toronto-businesses-rank-higher-on-google-maps";
const servicesOffered = [
    "SEO Services",
    "Website Design",
    "Meta Ads Management",
    "Google Ads",
    "Contractor Marketing",
    "Local Business Marketing",
];

export const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rav Link Inc.",
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    email: "info@ravlink.ca",
    telephone: "+1-437-219-6444",
    address: {
        "@type": "PostalAddress",
        addressRegion: "Ontario",
        addressCountry: "CA",
    },
    areaServed: areaServed.map((name) => ({ "@type": "Place", name })),
    makesOffer: servicesOffered.map((name) => ({
        "@type": "Offer",
        itemOffered: {
            "@type": "Service",
            name,
        },
    })),
    description:
        "Rav Link Inc. is a digital marketing agency serving businesses across Ontario and the Greater Toronto Area remotely and on-site.",
};

export const faqSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
});

const pageSchema = (name, path, description) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: canonical(path),
    description,
});

export const seoConfig = {
    home: {
        title: "Rav Link Inc. | Digital Marketing Agency Serving Ontario & the GTA",
        description:
            "Rav Link Inc. helps Ontario and GTA businesses grow with SEO, website design, Meta Ads, Google Ads, and contractor marketing.",
        canonical: canonical("/"),
        ogTitle: "Digital Marketing Agency Serving Ontario & the GTA",
        ogDescription:
            "SEO, website design, paid ads, and local business marketing for Ontario companies.",
        ogImage: DEFAULT_OG_IMAGE,
        schema: [professionalServiceSchema, pageSchema("Rav Link Inc.", "/", "Digital marketing agency serving Ontario and the GTA.")],
    },
    about: {
        title: "About Rav Link Inc. | Ontario Digital Marketing Agency",
        description:
            "Learn how Rav Link Inc. supports local businesses, service companies, and contractors across Ontario with practical digital marketing.",
        canonical: canonical("/about"),
        ogTitle: "About Rav Link Inc.",
        ogDescription: "Digital marketing support for businesses across Ontario and the GTA.",
        ogImage: DEFAULT_OG_IMAGE,
        schema: pageSchema("About Rav Link Inc.", "/about", "About Rav Link Inc."),
    },
    services: {
        title: "Digital Marketing Services in Ontario | SEO, Web Design & Ads",
        description:
            "Explore SEO, website design, Meta Ads management, Google Ads, and contractor marketing services for Ontario businesses.",
        canonical: canonical("/services"),
        ogTitle: "Digital Marketing Services in Ontario",
        ogDescription: "SEO, web design, Meta Ads, Google Ads, and local marketing services.",
        ogImage: DEFAULT_OG_IMAGE,
        schema: pageSchema("Digital Marketing Services", "/services", "Digital marketing services for Ontario businesses."),
    },
    seoBarrie: {
        title: "SEO Services Barrie | Local SEO Agency for Ontario Businesses",
        description:
            "SEO services in Barrie for local businesses that need better Google visibility, stronger content, and more qualified leads.",
        canonical: canonical("/services/seo-barrie"),
        ogTitle: "SEO Services in Barrie",
        ogDescription: "Local SEO strategy, technical SEO, and content planning for Barrie businesses.",
        ogImage: DEFAULT_OG_IMAGE,
    },
    websiteDesignBarrie: {
        title: "Website Design Barrie | Websites for Service-Based Businesses",
        description:
            "Website design in Barrie for service-based businesses that need fast, trustworthy, conversion-focused websites.",
        canonical: canonical("/services/website-design-barrie"),
        ogTitle: "Website Design in Barrie",
        ogDescription: "Conversion-focused websites for Barrie and Ontario service businesses.",
        ogImage: DEFAULT_OG_IMAGE,
    },
    metaAdsManagement: {
        title: "Meta Ads Management for Local Businesses | Rav Link Inc.",
        description:
            "Meta Ads management for local businesses that need better Facebook and Instagram campaigns, tracking, creative testing, and lead generation.",
        canonical: canonical("/services/meta-ads-management"),
        ogTitle: "Meta Ads Management for Local Businesses",
        ogDescription: "Facebook and Instagram ad management for local businesses across Ontario.",
        ogImage: DEFAULT_OG_IMAGE,
    },
    contractorMarketing: {
        title: "Digital Marketing for Contractors in Ontario | Rav Link Inc.",
        description:
            "Digital marketing for contractors in Ontario, including SEO, landing pages, paid ads, lead tracking, and local growth strategy.",
        canonical: canonical("/services/contractor-marketing"),
        ogTitle: "Digital Marketing for Contractors in Ontario",
        ogDescription: "Lead generation, SEO, websites, and ads for Ontario contractors.",
        ogImage: DEFAULT_OG_IMAGE,
    },
    caseStudies: {
        title: "Case Studies | Rav Link Digital Marketing Results",
        description:
            "See examples of digital marketing, SEO, website, and advertising strategies built for Ontario businesses.",
        canonical: canonical("/case-studies"),
        ogTitle: "Rav Link Case Studies",
        ogDescription: "Digital marketing work and growth examples for Ontario businesses.",
        ogImage: DEFAULT_OG_IMAGE,
        schema: pageSchema("Case Studies", "/case-studies", "Rav Link case studies."),
    },
    blog: {
        title: "Digital Marketing Blog | Rav Link Inc.",
        description:
            "Read practical digital marketing, SEO, website, and paid ads insights for Ontario business owners.",
        canonical: canonical("/blog"),
        ogTitle: "Rav Link Digital Marketing Blog",
        ogDescription: "SEO, websites, ads, and local marketing insights.",
        ogImage: DEFAULT_OG_IMAGE,
        schema: pageSchema("Digital Marketing Blog", "/blog", "Digital marketing blog by Rav Link Inc."),
    },
    singlePost: {
        title: "How Toronto Businesses Rank Higher on Google Maps | Rav Link Inc.",
        description:
            "Learn how Toronto businesses can improve Google Maps rankings with Google Business Profile optimization, NAP consistency, reviews, citations, and local SEO.",
        canonical: canonical(googleMapsArticlePath),
        ogTitle: "How Toronto Businesses Rank Higher on Google Maps",
        ogDescription: "A practical local SEO guide for Toronto and GTA businesses that want stronger Google Maps visibility.",
        ogImage: canonical("/assets/images/google-maps-local-seo-toronto.jpg"),
        schema: {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How Toronto Businesses Rank Higher on Google Maps",
            description:
                "A local SEO guide for improving Google Maps visibility with stronger profiles, reviews, citations, and local authority.",
            image: canonical("/assets/images/google-maps-local-seo-toronto.jpg"),
            author: {
                "@type": "Organization",
                name: "Rav Link Inc.",
            },
            publisher: {
                "@type": "Organization",
                name: "Rav Link Inc.",
                logo: {
                    "@type": "ImageObject",
                    url: DEFAULT_OG_IMAGE,
                },
            },
            datePublished: "2026-05-20",
            dateModified: "2026-05-20",
            mainEntityOfPage: canonical(googleMapsArticlePath),
        },
    },
    contact: {
        title: "Contact Rav Link Inc. | Digital Marketing Agency in Ontario",
        description:
            "Contact Rav Link Inc. for SEO, website design, Meta Ads, Google Ads, and digital marketing across Ontario and the GTA.",
        canonical: canonical("/contact"),
        ogTitle: "Contact Rav Link Inc.",
        ogDescription: "Book a strategy call for Ontario digital marketing support.",
        ogImage: DEFAULT_OG_IMAGE,
        schema: [professionalServiceSchema, pageSchema("Contact Rav Link Inc.", "/contact", "Contact Rav Link Inc.")],
    },
};

export const buildLocationSeo = ({ title, path, description }) => ({
    title,
    description,
    canonical: canonical(path),
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_OG_IMAGE,
    schema: [professionalServiceSchema, pageSchema(title, path, description)],
});

export { SITE_URL, DEFAULT_OG_IMAGE };
