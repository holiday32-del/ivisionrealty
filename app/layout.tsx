import type { Metadata } from "next";
import "./globals.css";
import { organizationSchema, SITE_NAME, SITE_URL, websiteSchema } from "./seo";
import { StructuredData } from "./structured-data";

const description =
  "Los Angeles real estate representation, property management, property search resources, and connections to real estate funding information for California clients.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Los Angeles Real Estate & Property Management | IVISION Realty Corp",
    template: "%s | IVISION Realty Corp",
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "IVISION Realty Corp | Real Estate. Property. Capital.",
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "IVISION Realty Corp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IVISION Realty Corp | Real Estate. Property. Capital.",
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <StructuredData data={[organizationSchema, websiteSchema]} />
        <script async src="//static.zotabox.com/r/z/rzxfdfseby5r3kauq8yq9c00cbobgw3v/widgets.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
