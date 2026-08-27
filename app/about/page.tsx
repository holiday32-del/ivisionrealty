import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, pageOpenGraph, SITE_URL } from "../seo";
import { SiteShell } from "../site-shell";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = {
  title: "About Our Los Angeles Real Estate Team",
  description: "Meet IVISION Realty Corp, a Los Angeles real estate firm serving buyers, sellers, property owners, and investors across California.",
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph(
    "About IVISION Realty Corp",
    "A connected real estate and property-management partner serving California clients from Los Angeles.",
    "/about",
  ),
};

export default function AboutPage() {
  return (
    <SiteShell>
      <StructuredData data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${SITE_URL}/about#webpage`,
          url: `${SITE_URL}/about`,
          name: "About IVISION Realty Corp",
          about: { "@id": `${SITE_URL}/#organization` },
          isPartOf: { "@id": `${SITE_URL}/#website` },
        },
      ]} />
      <main>
        <section className="pageHero pageHeroAbout"><div className="pageHeroShade" /><div className="shell"><p className="eyebrow light">About IVISION</p><h1>Real estate is personal.<br /><em>So is our approach.</em></h1><p>We pair local market knowledge with a wider view of property, financing, and the goals behind every move.</p></div></section>
        <section className="section shell aboutLead">
          <div><p className="eyebrow">Our story</p><h2>Built to go beyond the traditional brokerage model.</h2></div>
          <div><p>IVISION Realty was founded in Los Angeles in 2010 around a simple belief: clients deserve a clearer, more connected real estate experience.</p><p>Our work spans residential and commercial real estate, property management, and connections to real estate funding resources. That broader perspective helps us see where decisions overlap—and bring the right professionals into the conversation at the right time.</p><p>We serve buyers, sellers, property owners, investors, and entrepreneurs across Greater Los Angeles, San Bernardino County, and select California markets.</p></div>
        </section>
        <section className="valuesSection">
          <div className="shell">
            <div className="sectionHeading"><div><p className="eyebrow">What guides us</p><h2>The IVISION way.</h2></div><p>Professional service should feel informed, responsive, and grounded in your best interests.</p></div>
            <div className="valuesGrid">
              <article><span>01</span><h3>Clarity</h3><p>We explain the choices, tradeoffs, and next steps in language that makes sense.</p></article>
              <article><span>02</span><h3>Connection</h3><p>We coordinate across real estate, property, and financing needs to reduce friction.</p></article>
              <article><span>03</span><h3>Care</h3><p>We listen closely, respond thoughtfully, and treat your goal like it matters—because it does.</p></article>
              <article><span>04</span><h3>Integrity</h3><p>We set realistic expectations and stay transparent from the first conversation onward.</p></article>
            </div>
          </div>
        </section>
        <section className="splitFeature splitFeatureLight">
          <div className="splitImage featureHome" role="img" aria-label="Modern California home at dusk" />
          <div className="splitContent"><p className="eyebrow">Built around your objective</p><h2>One relationship.<br />Many possibilities.</h2><p>Some clients arrive ready to transact. Others need time to prepare, explore options, or solve a challenge before moving forward. We meet you where you are and help define a practical route to where you want to be.</p><div className="aboutStats"><div><strong>15+</strong><span>Years serving the market</span></div><div><strong>CA</strong><span>California-focused service</span></div></div><Link className="button buttonDark" href="/contact">Meet with IVISION</Link></div>
        </section>
        <section className="ctaSection"><div className="shell ctaInner"><div><p className="eyebrow light">Let’s connect</p><h2>A better move begins with a conversation.</h2></div><Link className="button buttonGold" href="/contact">Contact our team</Link></div></section>
      </main>
    </SiteShell>
  );
}
