export const SITE_URL = "https://ivisionrealtycorp.com";
export const SITE_NAME = "IVISION Realty Corp";
export const CONTACT_EMAIL = "info@ivisionrealtycorp.com";
export const CONTACT_PHONE = "+1-888-451-9328";
export const DISPLAY_PHONE = "(888) 451-9328 ext. 701";

export const BUSINESS_ADDRESS = {
  streetAddress: "2922 Crenshaw Boulevard",
  addressLocality: "Los Angeles",
  addressRegion: "CA",
  postalCode: "90016",
  addressCountry: "US",
};

export const homeFaqs = [
  {
    question: "What areas does IVISION Realty serve?",
    answer:
      "IVISION Realty serves Greater Los Angeles, San Bernardino County, and select California markets based on service availability.",
  },
  {
    question: "What real estate services does IVISION Realty provide?",
    answer:
      "IVISION Realty provides residential and commercial representation, property management support, property and land search resources, and connections to real estate funding information.",
  },
  {
    question: "Can IVISION Realty help me search for property or land?",
    answer:
      "Yes. IVISION Realty provides links to third-party land and property listing resources so clients can explore available opportunities.",
  },
  {
    question: "Where can I explore real estate funding options?",
    answer:
      "IVISION Realty connects clients with New Wide Lending for real estate funding information. Programs are subject to lender requirements, underwriting, eligibility, and approval.",
  },
  {
    question: "How do I contact IVISION Realty?",
    answer:
      `Call ${DISPLAY_PHONE}, email ${CONTACT_EMAIL}, or visit 2922 Crenshaw Boulevard, Los Angeles, CA 90016.`,
  },
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function pageOpenGraph(title: string, description: string, path: string) {
  return {
    title,
    description,
    url: absoluteUrl(path),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website" as const,
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "IVISION Realty Corp" }],
  };
}

export function pageTwitter(title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [absoluteUrl("/og.png")],
  };
}

export function webPageSchema({
  path,
  name,
  description,
  type = "WebPage",
  mainEntityId,
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  mainEntityId?: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}

export function realEstateServiceSchema({
  path,
  name,
  description,
  serviceType,
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name,
    description,
    serviceType,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "State", name: "California" },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "IVISION Realty",
  legalName: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/og.png"),
  image: absoluteUrl("/og.png"),
  description:
    "Los Angeles real estate representation, property management support, property search resources, and connections to real estate funding information for California clients.",
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  foundingDate: "2010",
  slogan: "Real estate. Property. Capital. One clear path forward.",
  address: {
    "@type": "PostalAddress",
    ...BUSINESS_ADDRESS,
  },
  areaServed: [
    { "@type": "State", name: "California" },
    { "@type": "AdministrativeArea", name: "Greater Los Angeles" },
    { "@type": "AdministrativeArea", name: "San Bernardino County" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    areaServed: "California",
    availableLanguage: "English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IVISION Realty services",
    itemListElement: [
      "Residential real estate representation",
      "Commercial real estate representation",
      "Property management support",
      "Property and land search resources",
      "Real estate funding information through New Wide Lending",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: "IVISION Realty",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#frequently-asked-questions`,
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
