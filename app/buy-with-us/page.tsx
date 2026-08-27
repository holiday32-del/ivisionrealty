import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, pageOpenGraph } from "../seo";
import { SiteShell } from "../site-shell";
import { StructuredData } from "../structured-data";

const propertySearchUrl = "https://kwsela.yourkwoffice.com/search/sale?viewport=33.97252465497983%2C-118.09295567700195%2C33.93051816126121%2C-118.15853032299805";

export const metadata: Metadata = {
  title: "Buy With Us | California Property Search",
  description: "Work with IVISION Realty Corp to plan a California real estate purchase and use the free Keller Williams property search.",
  alternates: { canonical: "/buy-with-us" },
  openGraph: pageOpenGraph("Buy With Us | IVISION Realty Corp", "Plan your California property purchase and search current listings.", "/buy-with-us"),
};

export default function BuyWithUsPage() {
  return (
    <SiteShell>
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Buy With Us", path: "/buy-with-us" }])} />
      <main>
        <section className="pathHero"><div className="shell"><p className="eyebrow">Buyer representation</p><h1>Buy With Us.</h1><p>Start with a clear plan, explore California listings, and contact IVISION Realty when you are ready to discuss your goals.</p></div></section>
        <section className="pathwayPage shell" id="property-search">
          <div><p className="eyebrow">Your buying path</p><h2>Search freely. Move forward with guidance.</h2><p>The Keller Williams search below is available at no charge. It is a third-party listing resource, not an affiliate link, and opens in a new tab.</p></div>
          <div className="pathwayActions">
            <a className="button buttonGold" href={propertySearchUrl} rel="noopener noreferrer" target="_blank">Search properties ↗</a>
            <Link className="button buttonDark" href="/contact">Contact our team</Link>
          </div>
          <div className="pathwaySteps"><article><span>01</span><h3>Define the search</h3><p>Share the location, property type, timing, and priorities that shape your purchase.</p></article><article><span>02</span><h3>Explore properties</h3><p>Use the free search to review listings that fit your needs and preferred area.</p></article><article><span>03</span><h3>Plan the next step</h3><p>Contact IVISION Realty for representation and New Wide Lending separately for funding information.</p></article></div>
        </section>
      </main>
    </SiteShell>
  );
}
