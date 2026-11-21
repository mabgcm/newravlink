import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import BlogPostSection from "../../Components/Blog/SinglePost";

const defaultSlug = "how-toronto-businesses-rank-higher-on-google-maps";

const articleSchema = ({ slug, headline, description, image, datePublished }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    author: {
        "@type": "Organization",
        name: "Rav Link Inc.",
    },
    publisher: {
        "@type": "Organization",
        name: "Rav Link Inc.",
        logo: {
            "@type": "ImageObject",
            url: "https://ravlink.ca/assets/images/ravlink-logo.png",
        },
    },
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: `https://ravlink.ca/blog/${slug}`,
});

const postSeo = {
    "how-toronto-businesses-rank-higher-on-google-maps": {
        bannerTitle: {
            en: "How Toronto Businesses Rank Higher on Google Maps",
            tr: "Toronto İşletmeleri Google Haritalar'da Nasıl Daha Yukarı Çıkar?",
        },
        title: "How Toronto Businesses Rank Higher on Google Maps | Rav Link Inc.",
        description:
            "Learn how Toronto businesses can improve Google Maps rankings with Google Business Profile optimization, NAP consistency, reviews, citations, and local SEO.",
        ogTitle: "How Toronto Businesses Rank Higher on Google Maps",
        ogDescription: "A practical local SEO guide for Toronto and GTA businesses that want stronger Google Maps visibility.",
        ogImage: "https://ravlink.ca/assets/images/google-maps-local-seo-toronto.jpg",
        schema: articleSchema({
            slug: "how-toronto-businesses-rank-higher-on-google-maps",
            headline: "How Toronto Businesses Rank Higher on Google Maps",
            description:
                "A local SEO guide for improving Google Maps visibility with stronger profiles, reviews, citations, and local authority.",
            image: "https://ravlink.ca/assets/images/google-maps-local-seo-toronto.jpg",
            datePublished: "2026-05-20",
        }),
    },
    "growth-strategies-for-digital-business": {
        bannerTitle: {
            en: "Growth Strategies for Digital Business",
            tr: "Dijital İşletmeler İçin Sürdürülebilir Büyüme Stratejileri",
        },
        title: "Growth Strategies for Digital Business | Rav Link Inc.",
        description:
            "Learn how digital businesses can connect positioning, SEO, paid ads, websites, and reporting into a practical growth system.",
        ogTitle: "Growth Strategies for Digital Business",
        ogDescription: "A practical guide to building a measurable digital growth system across SEO, ads, websites, and reporting.",
        ogImage: "https://ravlink.ca/assets/images/servicehero.jpeg",
        schema: articleSchema({
            slug: "growth-strategies-for-digital-business",
            headline: "Growth Strategies for Digital Business",
            description:
                "A practical guide to building a measurable digital growth system across SEO, ads, websites, and reporting.",
            image: "https://ravlink.ca/assets/images/servicehero.jpeg",
            datePublished: "2025-04-14",
        }),
    },
    "why-most-contractor-websites-dont-convert": {
        bannerTitle: {
            en: "Why Most Contractor Websites Don’t Convert",
            tr: "Neden Çoğu Contractor Web Sitesi Dönüşüm Getirmez?",
        },
        title: "Why Most Contractor Websites Don’t Convert | Rav Link Inc.",
        description:
            "Learn why most contractor websites fail to convert visitors into quote requests, and how better contractor website design, proof, local SEO, and CTAs improve lead flow.",
        ogTitle: "Why Most Contractor Websites Don’t Convert",
        ogDescription: "A contractor marketing guide to fixing weak websites, poor proof, local SEO gaps, and quote request friction.",
        ogImage: "https://ravlink.ca/assets/images/construction.jpg",
        schema: articleSchema({
            slug: "why-most-contractor-websites-dont-convert",
            headline: "Why Most Contractor Websites Don’t Convert",
            description:
                "A contractor marketing guide to fixing weak websites, poor proof, local SEO gaps, and quote request friction.",
            image: "https://ravlink.ca/assets/images/construction.jpg",
            datePublished: "2026-05-20",
        }),
    },
    "why-your-competitor-shows-up-on-google-maps-and-you-dont": {
        bannerTitle: {
            en: "Why Your Competitor Shows Up on Google Maps and You Don't",
            tr: "Rakibiniz Google Haritalar'da Çıkıyor, Siz Neden Çıkmıyorsunuz?",
        },
        title: "Why Your Competitor Shows Up on Google Maps and You Don't | Rav Link Inc.",
        description:
            "Your competitor shows up on Google Maps and you don't? Google ranks profiles on relevance, distance and prominence — here's how to fix what you control.",
        ogTitle: "Why Your Competitor Shows Up on Google Maps and You Don't",
        ogDescription: "Why your competitor shows up on Google Maps and you don't — and the two fixes you control: the right primary category and a steady flow of real reviews.",
        ogImage: "https://images.pexels.com/photos/35969/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
        schema: [
            articleSchema({
                slug: "why-your-competitor-shows-up-on-google-maps-and-you-dont",
                headline: "Why Your Competitor Shows Up on Google Maps and You Don't",
                description:
                    "Why your competitor shows up on Google Maps and you don't — and the two fixes you control: the right primary category and a steady flow of real reviews.",
                image: "https://images.pexels.com/photos/35969/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
                datePublished: "2026-11-20",
            }),
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "How does Google decide the top 3 on Maps?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Google ranks Business Profiles on relevance, distance, and prominence: how well your profile matches the search, how close you are to the searcher, and how well known and trusted your business looks. The map pack ranks profiles, not web pages — which is why a complete profile matters as much as a good website.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Do Google Business Profile posts help my ranking?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "No measurable impact, according to a controlled Sterling Sky test: three profiles, weekly posts for nine weeks, 441 keywords tracked, and no change in local-pack rankings. Posts are still useful as a shop window for people who already found you — they help a searcher choose you, they just do not move your ranking.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Can I add keywords or my city to my business name?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "It is better not to. A keyword-stuffed name ranks well in the data but violates Google's guidelines, it is a common suspension cause, and competitors can suggest an edit to your listing. Keep your real business name and put keywords in your description, services, and posts instead.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How long does it take to see results?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "The category fix is fast — minutes to change, and Google picks it up quickly. Reviews are the slow part: a steady flow builds over months, and there is no overnight fix. That is normal, and it is also why starting the habit now matters more than any single change.",
                        },
                    },
                ],
            },
        ],
    },
};

function SinglePostPage(){
    const { t, i18n } = useTranslation();
    const { slug } = useParams();
    const activeSlug = slug || defaultSlug;
    const seo = postSeo[activeSlug] || postSeo[defaultSlug];
    const bannerTitle =
        typeof seo.bannerTitle === "object"
            ? seo.bannerTitle[i18n.language?.startsWith("tr") ? "tr" : "en"]
            : seo.bannerTitle;

    return(
        <>
            <HeadTitle seoKey="singlePost" seo={seo} />
            <BannerInnerSection
                title={bannerTitle || t("pageBanners.singlePost.title")}
                currentPage={t("pageBanners.singlePost.currentPage")}
            />
            <BlogPostSection />

        </>
    );
}

export default SinglePostPage;
