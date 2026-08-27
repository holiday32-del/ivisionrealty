import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, pageOpenGraph, pageTwitter, realEstateServiceSchema, webPageSchema } from "../seo";
import { SiteShell } from "../site-shell";
import { StructuredData } from "../structured-data";

const propertyValueUrl = "https://jamesholidayhaven.officialpropertyvalue.com/analysis?p=d4def49d-d37b-4241-b556-4b4d95e77a94";

export const metadata: Metadata = {
  title: "List With Us | California Seller Services",
  description: "Contact IVISION Realty Corp about preparing and listing your California property, or request a third-party property-value analysis.",
  alternates: { canonical: "/list-with-us" },
  openGraph: pageOpenGraph("List With Us | IVISION Realty Corp", "Start a thoughtful California property-selling conversation.", "/list-with-us"),
  twitter: pageTwitter("List With Us | IVISION Realty Corp", "Start a thoughtful California property-selling conversation."),
};

export default function ListWithUsPage() {
  return (
    <SiteShell>
      <StructuredData data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "List With Us", path: "/list-with-us" }]),
        webPageSchema({ path: "/list-with-us", name: "List With Us", description: "California seller representation and property-listing guidance from IVISION Realty Corp.", mainEntityId: "https://ivisionrealtycorp.com/list-with-us#service" }),
        realEstateServiceSchema({ path: "/list-with-us", name: "California Seller Representation", description: "Property preparation, listing strategy, marketing guidance, and seller representation for California properties.", serviceType: "Real estate seller representation" }),
      ]} />
      <main>
        <section className="pathHero"><div className="shell"><p className="eyebrow">Seller representation</p><h1>List With Us.</h1><p>Prepare your California property for market with a practical plan and a direct line to the IVISION Realty team.</p></div></section>
        <section className="pathwayPage shell">
          <div><p className="eyebrow">Your selling path</p><h2>Start with the property. Build the strategy together.</h2><p>The property-value tool is a third-party starting point, not an appraisal or guarantee of value. It is not an affiliate link.</p></div>
          <div className="pathwayActions">
            <Link className="button buttonGold" href="/contact">Contact a seller representative</Link>
            <a className="button buttonDark" href={propertyValueUrl} rel="noopener noreferrer" target="_blank">Request property value ↗</a>
          </div>
          <div className="pathwaySteps"><article><span>01</span><h3>Share your goals</h3><p>Tell us about the property, your timing, and the result you want to pursue.</p></article><article><span>02</span><h3>Review the property</h3><p>Discuss positioning, preparation, and the information needed before going to market.</p></article><article><span>03</span><h3>Build the plan</h3><p>Work with IVISION Realty on the listing process, marketing approach, and next steps.</p></article></div>
        </section>
      </main>
    </SiteShell>
  );
}
