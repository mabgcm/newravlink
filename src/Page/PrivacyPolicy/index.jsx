import React from "react";
import { useTranslation } from "react-i18next";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";

function PrivacyPolicyPage() {
    const { t } = useTranslation();

    return (
        <>
            <HeadTitle
                title="Privacy Policy | Rav Link Inc."
                description="How Rav Link Inc. collects, uses, and protects your personal information when you use ravlink.ca, contact us, or submit a lead form."
            />
            <BannerInnerSection
                title={t("footer.privacy")}
                currentPage={t("footer.privacy")}
            />
            <section className="section">
                <div className="container">
                    <div className="d-flex flex-column gspace-3" style={{ maxWidth: "860px", margin: "0 auto" }}>
                        <p>
                            <strong>Last updated:</strong> November 11, 2026
                        </p>
                        <p>
                            Rav Link Inc. (&ldquo;Rav Link&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects
                            your privacy. This Privacy Policy explains what personal information we collect
                            when you visit ravlink.ca, contact us, message us on WhatsApp, or submit a form
                            &mdash; including lead forms on advertising platforms such as LinkedIn &mdash; how
                            we use it, and the choices you have. We handle personal information in accordance
                            with Canada&rsquo;s Personal Information Protection and Electronic Documents Act
                            (PIPEDA) and applicable Ontario law.
                        </p>

                        <h2>1. Information We Collect</h2>
                        <p>
                            <strong>Information you provide.</strong> When you fill out a contact form, a lead
                            form, or a consultation request, or when you email or message us, we collect the
                            details you share, such as your name, email address, phone number, company name,
                            and anything you write in your message.
                        </p>
                        <p>
                            <strong>Information collected automatically.</strong> When you visit our website, we
                            automatically collect basic usage information such as the pages you visit, the
                            links you click, your device and browser type, approximate location, and IP
                            address. We use cookies and analytics and advertising tools &mdash; including
                            Google Analytics, the Meta Pixel, and Vercel Analytics &mdash; to understand how
                            visitors use the site and to measure our advertising.
                        </p>
                        <p>
                            <strong>Information from advertising platforms.</strong> If you submit a lead form
                            on LinkedIn or another advertising platform, that platform shares the information
                            you entered in the form with us so we can respond to your request.
                        </p>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use personal information to:</p>
                        <ul>
                            <li>Respond to your inquiries and consultation requests;</li>
                            <li>Provide, quote, and improve our services;</li>
                            <li>Send information you asked for;</li>
                            <li>Understand how our website and advertising perform; and</li>
                            <li>Comply with legal obligations.</li>
                        </ul>
                        <p>We do not sell your personal information.</p>

                        <h2>3. Sharing Your Information</h2>
                        <p>
                            We share personal information only with service providers that help us operate our
                            business &mdash; such as website hosting, email delivery, analytics, customer
                            relationship tools, and advertising platforms &mdash; and only as needed for them
                            to perform their services for us. We may also disclose information when required
                            by law or to protect our rights, and in connection with a sale or reorganization
                            of our business.
                        </p>

                        <h2>4. Cookies and Tracking</h2>
                        <p>
                            Cookies are small files stored on your device that help a website remember your
                            preferences and understand usage. You can block or delete cookies in your browser
                            settings, though some parts of the site may not work as intended. You can opt out
                            of personalized advertising through the settings of the advertising platforms you
                            use, such as Google Ads Settings and Meta&rsquo;s Ad Preferences.
                        </p>

                        <h2>5. Data Retention</h2>
                        <p>
                            We keep personal information only as long as needed for the purposes described in
                            this policy, or as required by law, and then delete or anonymize it.
                        </p>

                        <h2>6. Security</h2>
                        <p>
                            We use reasonable safeguards to protect personal information against loss, theft,
                            and unauthorized access. No method of transmission or storage is completely secure,
                            so we cannot guarantee absolute security.
                        </p>

                        <h2>7. Your Rights</h2>
                        <p>
                            Under PIPEDA, you may request access to the personal information we hold about
                            you, ask us to correct it, or withdraw your consent to our use of it, subject to
                            legal and contractual limits. To make a request, contact us using the details
                            below. If you are not satisfied with our response, you may contact the Office of
                            the Privacy Commissioner of Canada.
                        </p>

                        <h2>8. Third-Party Links</h2>
                        <p>
                            Our website may link to third-party websites or services. We are not responsible
                            for their privacy practices, and we encourage you to read their privacy policies.
                        </p>

                        <h2>9. Children&rsquo;s Privacy</h2>
                        <p>
                            Our services are directed to businesses and are not intended for children under
                            13. We do not knowingly collect personal information from children under 13.
                        </p>

                        <h2>10. Changes to This Policy</h2>
                        <p>
                            We may update this policy from time to time. The updated version will be posted on
                            this page with a new &ldquo;Last updated&rdquo; date.
                        </p>

                        <h2>11. Contact Us</h2>
                        <p>
                            Questions about this policy or your personal information? Contact us at{" "}
                            <a href="mailto:info@ravlink.ca">info@ravlink.ca</a> or +1 (365) 360-5011.
                            Rav Link Inc., Ontario, Canada.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PrivacyPolicyPage;
