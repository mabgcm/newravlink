import { faqSchema, professionalServiceSchema } from "./seoConfig.js";

export const servicePages = {
    "seo-barrie": {
        seoKey: "seoBarrie",
        path: "/services/seo-barrie",
        eyebrow: "Local SEO",
        title: "SEO Services in Barrie for Local Businesses",
        intro:
            "Rav Link helps Barrie and Simcoe County businesses improve organic visibility with practical SEO strategy, better website structure, and content built around real search intent.",
        image: "/assets/images/local.jpg",
        benefitsTitle: "SEO support built for local demand",
        benefits: [
            "Improve rankings for high-intent local searches in Barrie and nearby Ontario markets.",
            "Fix technical and on-page issues that keep important pages from performing.",
            "Build service content that explains your offer clearly and earns qualified leads.",
            "Strengthen internal links, metadata, and conversion paths across the site.",
        ],
        processTitle: "How the SEO process works",
        process: [
            "Audit your current website, Google visibility, competitors, and local keyword opportunities.",
            "Map priority pages for services, locations, and commercial search intent.",
            "Improve metadata, headings, content depth, internal links, and technical basics.",
            "Track rankings, leads, and search performance so the strategy keeps improving.",
        ],
        faqs: [
            {
                question: "Do you only provide SEO in Barrie?",
                answer:
                    "No. Barrie is a priority market, but Rav Link serves businesses across Ontario, including the GTA, Vaughan, Toronto, and Simcoe County.",
            },
            {
                question: "How long does local SEO take?",
                answer:
                    "Most local SEO campaigns need consistent work for three to six months before stronger ranking and lead patterns become clear.",
            },
            {
                question: "Can SEO help a service-based business?",
                answer:
                    "Yes. Service businesses often benefit from clear service pages, location targeting, Google Business Profile alignment, and content that answers buyer questions.",
            },
        ],
        related: [
            { label: "Website Design Barrie", href: "/services/website-design-barrie" },
            { label: "Contractor Marketing", href: "/services/contractor-marketing" },
            { label: "SEO Agency Barrie", href: "/seo-agency-barrie" },
            { label: "Link Building Barrie", href: "/services/link-building-barrie" },
            { label: "Local SEO Barrie", href: "/services/local-seo-barrie" },
        ],
    },
    "website-design-barrie": {
        seoKey: "websiteDesignBarrie",
        path: "/services/website-design-barrie",
        eyebrow: "Web Design",
        title: "Website Design in Barrie for Service-Based Businesses",
        intro:
            "We design and build fast, credible websites for Barrie service businesses that need clear messaging, stronger local trust, and better conversion paths.",
        image: "/assets/images/servicehero.jpeg",
        benefitsTitle: "A website should help people choose you",
        benefits: [
            "Position your service, proof, and calls to action clearly on every key page.",
            "Create mobile-friendly layouts for local visitors comparing providers quickly.",
            "Support SEO with clean page structure, metadata, internal links, and service content.",
            "Improve lead quality with focused forms, tracking, and conversion-oriented copy.",
        ],
        processTitle: "Website design process",
        process: [
            "Clarify your audience, service area, offers, and strongest conversion goals.",
            "Plan the sitemap, page sections, and local SEO opportunities before design work.",
            "Build responsive pages that keep the existing brand direction while improving clarity.",
            "Connect analytics, lead forms, and launch checks so performance can be measured.",
        ],
        faqs: [
            {
                question: "Do you build websites for businesses outside Barrie?",
                answer:
                    "Yes. Rav Link serves service businesses across Ontario and the Greater Toronto Area, including Vaughan, Toronto, Markham, Mississauga, and Barrie.",
            },
            {
                question: "Can you improve an existing website instead of rebuilding it?",
                answer:
                    "Yes. If the current site has a solid foundation, we can improve page structure, messaging, SEO, and conversion flow without a full redesign.",
            },
            {
                question: "Will the website be SEO-friendly?",
                answer:
                    "Yes. We plan headings, metadata, internal links, service pages, location targeting, and performance basics as part of the build.",
            },
        ],
        related: [
            { label: "SEO Services Barrie", href: "/services/seo-barrie" },
            { label: "Meta Ads Management", href: "/services/meta-ads-management" },
            { label: "Website Design Toronto", href: "/website-design-toronto" },
        ],
    },
    "meta-ads-management": {
        seoKey: "metaAdsManagement",
        path: "/services/meta-ads-management",
        eyebrow: "Paid Social",
        title: "Meta Ads Management for Local Businesses",
        intro:
            "Rav Link manages Facebook and Instagram ads for local businesses that need better targeting, stronger creative testing, and clearer lead tracking.",
        image: "/assets/images/service1.jpeg",
        benefitsTitle: "Campaigns built around local business outcomes",
        benefits: [
            "Structure campaigns around leads, bookings, calls, and measurable customer actions.",
            "Test creative angles that match your market, offer, and service area.",
            "Improve tracking so ad decisions are based on real business signals.",
            "Use remarketing and audience testing to reduce wasted ad spend over time.",
        ],
        processTitle: "Meta Ads management process",
        process: [
            "Review your offer, audience, landing page, tracking, and current ad account setup.",
            "Build campaign structure, creative tests, budgets, and reporting benchmarks.",
            "Launch controlled tests across Facebook and Instagram placements.",
            "Optimize weekly around cost per lead, quality, creative fatigue, and sales feedback.",
        ],
        faqs: [
            {
                question: "Do you manage both Facebook and Instagram ads?",
                answer:
                    "Yes. Meta Ads campaigns can run across Facebook and Instagram depending on the audience, creative format, and goal.",
            },
            {
                question: "Is Meta Ads management useful for small local businesses?",
                answer:
                    "Yes, when the offer, targeting, creative, and landing page are aligned. Local businesses often benefit from focused campaigns and clear follow-up systems.",
            },
            {
                question: "Do you include ad creative?",
                answer:
                    "We help plan and test ad creative angles, copy, and formats. Production scope depends on the package and campaign needs.",
            },
        ],
        related: [
            { label: "Website Design Barrie", href: "/services/website-design-barrie" },
            { label: "Contractor Marketing", href: "/services/contractor-marketing" },
            { label: "Meta Ads Agency Toronto", href: "/meta-ads-agency-toronto" },
            { label: "Meta Ads Agency Brampton", href: "/meta-ads-agency-brampton" },
        ],
    },
    "contractor-marketing": {
        seoKey: "contractorMarketing",
        path: "/services/contractor-marketing",
        eyebrow: "Contractor Growth",
        title: "Digital Marketing for Contractors in Ontario",
        intro:
            "We help Ontario contractors generate better leads with SEO, service pages, landing pages, paid ads, and tracking that connects marketing to booked jobs.",
        image: "/assets/images/construction.jpg",
        benefitsTitle: "Marketing for high-trust, high-value services",
        benefits: [
            "Create service and location pages for the jobs you actually want to win.",
            "Improve local visibility across Ontario markets where your crews operate.",
            "Use paid ads and landing pages to create predictable lead flow.",
            "Track calls, forms, and campaign quality so budget moves toward profitable work.",
        ],
        processTitle: "Contractor marketing process",
        process: [
            "Identify your best services, margins, service areas, and seasonal demand.",
            "Build SEO and ad campaigns around commercial intent and local trust signals.",
            "Improve landing pages with proof, project context, FAQs, and direct CTAs.",
            "Review lead quality and adjust keywords, creative, pages, and budget allocation.",
        ],
        faqs: [
            {
                question: "Which contractors do you work with?",
                answer:
                    "We can support home service, renovation, construction, trade, and specialty contractors across Ontario.",
            },
            {
                question: "Should contractors invest in SEO or ads first?",
                answer:
                    "It depends on timeline and market competition. Ads can generate faster testing data, while SEO builds long-term visibility and trust.",
            },
            {
                question: "Can you target multiple service areas?",
                answer:
                    "Yes. We can structure campaigns and pages around Ontario service areas without duplicating thin location content.",
            },
        ],
        related: [
            { label: "SEO Services Barrie", href: "/services/seo-barrie" },
            { label: "Meta Ads Management", href: "/services/meta-ads-management" },
            { label: "Contractor Marketing Ontario", href: "/contractor-marketing-ontario" },
        ],
    },    "link-building-barrie": {
        seoKey: "linkBuildingBarrie",
        path: "/services/link-building-barrie",
        eyebrow: "Link Building",
        title: "Link Building Services in Barrie",
        intro:
            "Link building earns your website the authority Google needs to see before it ranks you for competitive local searches. Rav Link builds relevant, white-hat backlinks for Barrie and Simcoe County businesses from real Ontario websites, local directories, and industry publications — no link farms and no paid spam networks.",
        image: "/assets/images/blog-seo-analytics-dashboard.webp",
        benefitsTitle: "Backlinks that move local rankings",
        benefits: [
            "Earn links from real local and industry websites that pass genuine authority to your service pages.",
            "Fix and complete local citations and directory listings so your business details stay consistent everywhere.",
            "Close the backlink gap between you and the Barrie competitors currently outranking you.",
            "Strengthen the pages that matter most — services, locations, and high-intent offers — instead of collecting random links.",
        ],
        processTitle: "How the link building process works",
        process: [
            "Audit your current backlink profile and compare it with the competitors ranking above you.",
            "Identify relevant local, regional, and industry websites worth earning links from.",
            "Run outreach, local partnerships, sponsorships, and content placements that earn contextual links.",
            "Monitor new links, referring domains, and ranking movement so the strategy keeps compounding.",
        ],
        faqs: [
            {
                question: "What is link building and why does it matter in Barrie?",
                answer:
                    "Link building is earning links from other websites to yours. Google treats relevant links as votes of trust, so Barrie businesses with stronger backlink profiles usually outrank competitors with similar content. It is often the missing piece when a good website still sits on page three.",
            },
            {
                question: "Do you buy links?",
                answer:
                    "No. Bought links and link farms violate Google's spam policies and can get a site penalized. Rav Link earns links through outreach, local partnerships, directories, and content that other sites genuinely want to reference.",
            },
            {
                question: "How long does link building take to improve rankings?",
                answer:
                    "Most businesses see measurable ranking movement within three to six months of consistent link building, depending on competition and the starting backlink profile.",
            },
            {
                question: "Is link building included with SEO services?",
                answer:
                    "Link building works alongside on-page and technical SEO. It can be added to an SEO engagement or run as a focused campaign for specific service pages.",
            },
        ],
        related: [
            { label: "SEO Services Barrie", href: "/services/seo-barrie" },
            { label: "Local SEO Barrie", href: "/services/local-seo-barrie" },
            { label: "Website Design Barrie", href: "/services/website-design-barrie" },
        ],
    },
    "local-seo-barrie": {
        seoKey: "localSeoBarrie",
        path: "/services/local-seo-barrie",
        eyebrow: "Local SEO",
        title: "Local SEO Services in Barrie",
        intro:
            "Local SEO helps Barrie businesses show up in Google Maps and 'near me' searches at the moment nearby customers are ready to call. Rav Link aligns your Google Business Profile, reviews, citations, and service pages so customers in Barrie and Simcoe County find you first — on Google and in AI-generated answers.",
        image: "/assets/images/google-maps-local-seo-toronto.jpg",
        benefitsTitle: "Built for Maps, 'near me', and local intent",
        benefits: [
            "Optimize your Google Business Profile categories, services, photos, and attributes for Barrie searches.",
            "Improve Google Maps rankings across Barrie neighbourhoods and nearby Simcoe County communities.",
            "Build a steady, ethical review flow that strengthens trust and click-through rates.",
            "Align service pages, citations, and location signals so every local signal points the same way.",
        ],
        processTitle: "How local SEO works",
        process: [
            "Audit your Google Business Profile, Map rankings, reviews, and citation consistency.",
            "Fix categories, services, photos, and business details so your profile matches real search demand.",
            "Strengthen local pages and internal links around the services and areas you want to win.",
            "Track Map pack positions, calls, and direction requests so progress is visible month to month.",
        ],
        faqs: [
            {
                question: "What is the difference between SEO and local SEO?",
                answer:
                    "SEO improves your website's rankings in standard search results. Local SEO focuses on Google Maps, the local pack, and 'near me' searches, using your Google Business Profile, reviews, and location signals. Most Barrie service businesses need both working together.",
            },
            {
                question: "How do I rank higher on Google Maps in Barrie?",
                answer:
                    "The biggest factors are a complete and accurate Google Business Profile, the right primary category, consistent business details across the web, relevant reviews, and service pages that match what people search for in Barrie.",
            },
            {
                question: "Do reviews really affect local rankings?",
                answer:
                    "Yes. Review count, rating, recency, and the keywords customers naturally use all influence Maps visibility and, just as importantly, whether searchers choose you over a competitor.",
            },
            {
                question: "How long does local SEO take?",
                answer:
                    "Profile fixes can improve visibility within weeks, while competitive Map positions usually build over three to six months of consistent work.",
            },
        ],
        related: [
            { label: "SEO Services Barrie", href: "/services/seo-barrie" },
            { label: "Link Building Barrie", href: "/services/link-building-barrie" },
            { label: "SEO Agency Barrie", href: "/seo-agency-barrie" },
        ],
    },
    "legal-seo-barrie": {
        seoKey: "legalSeoBarrie",
        path: "/services/legal-seo-barrie",
        eyebrow: "Legal SEO",
        title: "SEO for Law Firms in Barrie",
        intro:
            "Legal SEO helps Barrie law firms get found when people search for a lawyer by practice area — family law, real estate law, personal injury, wills and estates, and more. Rav Link builds practice-area pages, local visibility, and clear trust content that turns those searches into consultation requests.",
        image: "/assets/images/service2.jpeg",
        benefitsTitle: "Visibility built around practice areas and trust",
        benefits: [
            "Create dedicated pages for each practice area, written around the questions clients actually ask.",
            "Strengthen Google Maps and local visibility so your firm appears when Barrie clients search nearby.",
            "Publish clear, accurate content that AI search tools can cite when people ask for legal help in Barrie.",
            "Build review and trust signals that respect Law Society of Ontario advertising rules.",
        ],
        processTitle: "How legal SEO works",
        process: [
            "Audit your website, practice-area coverage, local profile, and the Barrie firms outranking you.",
            "Map each practice area to the searches potential clients use before contacting a lawyer.",
            "Build and improve practice-area pages, local signals, and internal links in priority order.",
            "Track rankings, calls, and consultation inquiries so you can see which areas are growing.",
        ],
        faqs: [
            {
                question: "Which practice areas benefit most from SEO?",
                answer:
                    "Practice areas people search for directly — family law, real estate law, personal injury, wills and estates, criminal defence, and immigration — benefit most, because clients compare firms online before calling.",
            },
            {
                question: "Can you guarantee a first-place ranking?",
                answer:
                    "No ethical agency can guarantee a specific ranking. What we can do is build the pages, local signals, and authority that give your firm the strongest measurable chance of ranking, and report progress transparently.",
            },
            {
                question: "Is SEO marketing allowed for Ontario law firms?",
                answer:
                    "Yes, when it follows the Law Society of Ontario's advertising rules — marketing must be accurate, verifiable, and not misleading. Our content approach is built around those requirements.",
            },
            {
                question: "How long does legal SEO take?",
                answer:
                    "Local visibility improvements can appear within weeks, while competitive practice-area rankings typically build over three to six months of consistent work.",
            },
        ],
        related: [
            { label: "SEO Services Barrie", href: "/services/seo-barrie" },
            { label: "Local SEO Barrie", href: "/services/local-seo-barrie" },
            { label: "Link Building Barrie", href: "/services/link-building-barrie" },
        ],
    },
};

export const serviceSchema = (page) => [
    professionalServiceSchema,
    {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.title,
        provider: {
            "@type": "ProfessionalService",
            name: "Rav Link Inc.",
            url: "https://ravlink.ca",
        },
        areaServed: "Ontario",
        url: `https://ravlink.ca${page.path}`,
        description: page.intro,
    },
    faqSchema(page.faqs),
];
