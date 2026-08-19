import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./careers.css";

const requirements = [
  "Based in the Philippines and able to work remotely",
  "Clear, professional spoken English",
  "Able to follow instructions and use good judgment",
  "Reliable internet connection, computer, and headset",
  "Accurate use of the shared CRM and call-recording links",
  "Professional communication with receptionists and decision makers",
  "Reliable availability during agreed calling hours",
];

export default function ColdCallerPositionPage() {
  return (
    <main className="careers-page">
      <Helmet>
        <title>Remote Cold Caller – Philippines | Rav Link Careers</title>
        <meta name="description" content="Apply for Rav Link’s remote Philippines-based Cold Caller role through online training and qualification." />
        <link rel="canonical" href="https://ravlink.ca/careers/cold-caller" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "JobPosting", title: "Cold Caller", description: "Remote cold calling role for Philippines-based applicants. Identify the right business contact and maintain accurate CRM records.", datePosted: "2026-08-19", employmentType: "CONTRACTOR", hiringOrganization: { "@type": "Organization", name: "Rav Link Inc.", sameAs: "https://ravlink.ca" }, jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Philippines" }, directApply: true })}</script>
      </Helmet>
      <section className="careers-hero career-role-hero">
        <div className="hero-container careers-narrow">
          <Link className="career-back" to="/careers"><i className="fa-solid fa-arrow-left" /> All careers</Link>
          <span className="careers-eyebrow">Remote · Philippines</span>
          <h1>Cold Caller</h1>
          <p>Help Rav Link reach the right people at small and medium-sized businesses through concise, professional calls.</p>
          <Link className="btn btn-accent career-cta" to="/careers/cold-caller/apply">
            <span className="btn-title">Start Training &amp; Qualification</span>
            <span className="icon-circle"><i className="fa-solid fa-arrow-right" /></span>
          </Link>
        </div>
      </section>
      <section className="careers-section">
        <div className="hero-container career-detail-grid">
          <article className="career-copy">
            <h2>The role</h2>
            <p>You will make outbound cold calls, identify the person responsible for a business’s website, marketing, or online presence, and capture useful next-step information. Calls should be brief, truthful, and professional.</p>
            <p>You will record call outcomes accurately in Rav Link’s shared CRM and attach the correct recording link for each completed call.</p>
            <h2>What you need</h2>
            <ul>{requirements.map((item) => <li key={item}><i className="fa-solid fa-check" /> <span>{item}</span></li>)}</ul>
            <h2>Availability</h2>
            <p>You should be able to commit to the schedule agreed during hiring and be available for calls during the business hours assigned to you. You will provide your current availability in the application.</p>
          </article>
          <aside className="career-application-note">
            <span className="careers-eyebrow">How to apply</span>
            <h2>No CV or resume needed.</h2>
            <p>This is not a traditional CV application. Complete the online training and qualification so we can assess how you understand instructions, communicate, and handle realistic call situations.</p>
            <p>Allow a quiet period to complete the modules and five short voice answers. Your progress is saved on this device.</p>
            <Link className="btn btn-accent" to="/careers/cold-caller/apply"><span className="btn-title">Start Online Application</span></Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
