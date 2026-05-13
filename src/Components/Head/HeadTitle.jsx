import React from "react";
import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, seoConfig } from "../../Data/seoConfig";

const normalizeSchema = (schema) => {
    if (!schema) return [];
    return Array.isArray(schema) ? schema : [schema];
};

const HeadTitle = ({ title, description, seoKey, seo, schema }) => {
    const config = {
        ...(seoKey ? seoConfig[seoKey] : {}),
        ...(seo || {}),
    };

    const pageTitle = title || config.title || "Rav Link Inc. | Digital Marketing Agency";
    const pageDescription =
        description ||
        config.description ||
        "Rav Link Inc. is a digital marketing agency serving businesses across Ontario and the Greater Toronto Area.";
    const canonical = config.canonical || "https://ravlink.ca/";
    const ogTitle = config.ogTitle || pageTitle;
    const ogDescription = config.ogDescription || pageDescription;
    const ogImage = config.ogImage || DEFAULT_OG_IMAGE;
    const schemas = [...normalizeSchema(config.schema), ...normalizeSchema(schema)];

    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <link rel="canonical" href={canonical} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ogTitle} />
            <meta name="twitter:description" content={ogDescription} />
            <meta name="twitter:image" content={ogImage} />
            {schemas.map((schemaItem, index) => (
                <script type="application/ld+json" key={index}>
                    {JSON.stringify(schemaItem)}
                </script>
            ))}
        </Helmet>
    );
};

export default HeadTitle;
