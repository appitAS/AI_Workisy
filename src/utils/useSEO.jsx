import { Helmet } from "react-helmet-async";

export const useSEO = ({
  title = "Workisy",
  description = "AI-powered job matching platform that connects talented professionals with their dream careers. Upload your resume and get matched with perfect job opportunities.",
  keywords = "jobs, AI, career, resume, job matching, employment, workisy, job search",
  ogTitle,
  ogDescription,
  ogImage = "/workisy logo-01.png",
  ogUrl,
  twitterCard = "summary_large_image",
  canonicalUrl,
  additionalMeta = []
}) => {
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;

  const defaultTitle = title === "Workisy" ? title : `${title} | Workisy`;
  const finalOgTitle = ogTitle || defaultTitle;
  const finalOgDescription = ogDescription || description;
  const finalOgUrl = ogUrl || currentUrl;
  const finalCanonicalUrl = canonicalUrl || currentUrl;
  const finalOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{defaultTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Workisy" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:site_name" content="Workisy" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:site" content="@workisy" />
      <meta name="twitter:creator" content="@workisy" />

      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Workisy",
          "description": "AI-powered job matching platform",
          "url": siteUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${siteUrl}/jobs?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
}; 