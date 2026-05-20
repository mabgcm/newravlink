import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./Page/Home"));
const AboutPage = lazy(() => import("./Page/About"));
const ServicePage = lazy(() => import("./Page/Service"));
const CaseStudiesPage = lazy(() => import("./Page/CaseStudies"));
const TeamPage = lazy(() => import("./Page/Team"));
const PartnershipPage = lazy(() => import("./Page/Partnership"));
const PricingPage = lazy(() => import("./Page/Pricing"));
const TestimonialPage = lazy(() => import("./Page/Testimonial"));
const NotFoundPage = lazy(() => import("./Page/NotFound"));
const FaqPage = lazy(() => import("./Page/FAQs"));
const BlogPage = lazy(() => import("./Page/Blog"));
const ContactPage = lazy(() => import("./Page/Contact"));
const SingleServicePage = lazy(() => import("./Page/SingleService"));
const SinglePostPage = lazy(() => import("./Page/SinglePost"));
const ServiceDetailPage = lazy(() => import("./Page/ServiceDetail"));
const LocationLandingPage = lazy(() => import("./Page/LocationLanding"));

// Shared page routes — rendered relative to parent match (/tr/* or /*)
function PageRoutes() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicePage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="single_services" element={<SingleServicePage />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route path="case_studies" element={<CaseStudiesPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="partnership" element={<PartnershipPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="testimonial" element={<TestimonialPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<SinglePostPage />} />
            <Route path="single_post" element={<SinglePostPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="seo-agency-toronto" element={<LocationLandingPage />} />
            <Route path="seo-agency-vaughan" element={<LocationLandingPage />} />
            <Route path="seo-agency-barrie" element={<LocationLandingPage />} />
            <Route path="website-design-toronto" element={<LocationLandingPage />} />
            <Route path="meta-ads-agency-toronto" element={<LocationLandingPage />} />
            <Route path="contractor-marketing-ontario" element={<LocationLandingPage />} />
            <Route path="404_page" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

function AppRouter() {
    return (
        <Suspense fallback={null}>
            <Routes>
                {/* Turkish routes: /tr/* strips the prefix so PageRoutes sees clean paths */}
                <Route path="tr/*" element={<PageRoutes />} />
                {/* English routes: catch-all for all other paths */}
                <Route path="*" element={<PageRoutes />} />
            </Routes>
        </Suspense>
    );
}

export default AppRouter;
