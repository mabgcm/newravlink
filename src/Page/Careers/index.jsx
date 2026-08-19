import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./careers.css";

export default function CareersPage() {
  return (
    <main className="careers-page">
      <Helmet>
        <title>Careers at Rav Link | Remote Opportunities</title>
        <meta name="description" content="Explore remote opportunities at Rav Link and qualify through our practical online application process." />
        <link rel="canonical" href="https://ravlink.ca/careers" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "Careers at Rav Link", url: "https://ravlink.ca/careers", description: "Remote career opportunities at Rav Link." })}</script>
      </Helmet>
      <section className="careers-hero">
        <div className="hero-container careers-narrow">
          <span className="careers-eyebrow">Careers at Rav Link</span>
          <h1>Do thoughtful work with a growing digital team.</h1>
          <p>We look for people who communicate clearly, follow through, and care about doing the small things well.</p>
        </div>
      </section>
      <section className="careers-section">
        <div className="hero-container careers-narrow">
          <div className="career-listing">
            <div>
              <span className="career-location">Remote · Philippines</span>
              <h2>Cold Caller</h2>
              <p>Connect with businesses, identify the right contact, and keep accurate call records.</p>
            </div>
            <Link className="career-link" to="/careers/cold-caller">View position <i className="fa-solid fa-arrow-right" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
