import type { Metadata } from "next";
import { AffiliateResourceCard, affiliateResources } from "../affiliate-resources";
import { breadcrumbSchema, pageOpenGraph, pageTwitter, webPageSchema } from "../seo";
import { SiteShell } from "../site-shell";
import { StructuredData } from "../structured-data";

export const metadata: Metadata = {
  title: "Real Estate & Business Resources",
  description:
    "Third-party resources for homeowners, buyers, sellers, landlords, real-estate investors, and business owners from IVISION Realty Corp.",
  alternates: { canonical: "/resources" },
  openGraph: pageOpenGraph(
    "Real Estate & Business Resources | IVISION Realty Corp",
    "Professional third-party resources for real estate, property ownership, moving, service businesses, and business financing.",
    "/resources",
  ),
  twitter: pageTwitter(
    "Real Estate & Business Resources | IVISION Realty Corp",
    "Professional third-party resources for real estate, property ownership, moving, service businesses, and business financing.",
  ),
};

const resourceGroups = [
  {
    category: "Moving & relocation",
    intro: "Planning a move? Explore third-party moving and storage resources that may help with local or long-distance relocation.",
    resource: affiliateResources.goodGreek,
  },
  {
    category: "Property owners & landlords",
    intro: "Managing rental property can involve software, maintenance coordination, vendors, and other operational tools.",
    resource: affiliateResources.buildium,
  },
  {
    category: "Homeowner resources",
    intro: "Explore third-party resources that may complement homeowner planning or access needs.",
    resource: affiliateResources.yaleHome,
  },
  {
    category: "Service business tools",
    intro: "Explore operational resources for service professionals connected to property ownership and maintenance.",
    resource: affiliateResources.housecallPro,
  },
  {
    category: "Business financing",
    intro: "Business owners and real-estate investors may need capital for expansion, equipment, staffing, marketing, inventory, or other operating needs.",
    resource: affiliateResources.superMoneyBusiness,
  },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      <StructuredData data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }]),
        webPageSchema({ path: "/resources", name: "Real Estate & Business Resources", description: "Clearly disclosed third-party resources for homeowners, property owners, real-estate investors, and business owners.", type: "CollectionPage" }),
      ]} />
      <main>
        <section className="pageHero pageHeroResources">
          <div className="pageHeroShade" />
          <div className="shell">
            <p className="eyebrow light">Resources</p>
            <h1>Real Estate &<br /><em>Business Resources.</em></h1>
            <p>
              iVision Realty has assembled third-party resources that may
              complement the needs of homeowners, buyers, sellers, landlords,
              real-estate investors, and business owners.
            </p>
          </div>
        </section>

        <section className="resourceIndex shell">
          <p className="resourceIndexDisclosure">
            Affiliate Disclosure: Some resources on this page contain affiliate
            links. iVision Realty may receive compensation from qualifying
            purchases, applications, or other activity completed through these
            links, at no additional cost to you. Third-party products and
            services are offered by their respective providers and are subject
            to their own eligibility requirements, pricing, terms, and
            conditions.
          </p>

          <div className="resourceIndexGrid">
            {resourceGroups.map((group) => (
              <section className="resourceIndexGroup" key={group.category}>
                <div>
                  <p className="eyebrow">{group.category}</p>
                  <p>{group.intro}</p>
                </div>
                <AffiliateResourceCard resource={group.resource} />
              </section>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
