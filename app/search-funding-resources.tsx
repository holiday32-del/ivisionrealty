import { NEW_WIDE_LENDING_INVESTOR_URL } from "./new-wide-lending";

const resources = [
    {
      number: "01",
      label: "Listing resource",
      title: "Land Search",
      copy: "Search land listings and explore potential sites for your next build, investment, or purchase.",
      action: "Search land",
      href: "https://kwland.com/",
    },
    {
      number: "02",
      label: "Listing resource",
      title: "Property Search",
      copy: "Explore homes and real estate listings that align with your location, property, and purchase goals.",
      action: "Search properties",
      href: "https://kwsela.yourkwoffice.com/search/sale?viewport=33.97252465497983%2C-118.09295567700195%2C33.93051816126121%2C-118.15853032299805",
    },
    {
      number: "03",
      label: "Seller resource",
      title: "Property Value",
      copy: "Request a property-value analysis as a starting point for your selling conversation.",
      action: "Check property value",
      href: "https://jamesholidayhaven.officialpropertyvalue.com/analysis?p=d4def49d-d37b-4241-b556-4b4d95e77a94",
    },
    {
      number: "04",
      label: "Funding resource",
      title: "New Wide Lending",
      copy: "Explore real estate funding options for home purchases, commercial property, and investment real estate.",
      action: "Explore funding",
      href: NEW_WIDE_LENDING_INVESTOR_URL,
    },
    {
      number: "05",
      label: "Financial planning tool",
      title: "Empower Dashboard",
      copy: "See and track your financial accounts and net worth with Empower's free financial dashboard.",
      action: "Explore Empower",
      href: "https://track.flexlinkspro.com/g.ashx?foid=156074.13439.1187369&trid=1187318.157618&foc=16&fot=9999&fos=6",
      affiliate: true,
    },
    {
      number: "06",
      label: "Home design resource",
      title: "ABC Carpet & Home",
      copy: "Explore new furniture, rugs, lighting, and interior accents for your California home.",
      action: "Explore new arrivals",
      href: "https://track.flexlinkspro.com/g.ashx?foid=156052.9992&trid=1187318.189434&foc=17&fot=9999&fos=6&url=https%3a%2f%2fabchome.com%2f",
      affiliate: true,
    },
];

export function SearchFundingResources() {
  return (
    <section className="searchResources" id="property-search">
      <div className="resourceHero">
        <div className="resourceHeroShade" />
        <div className="shell sectionHeading resourceHeading">
          <div>
            <p className="eyebrow light">Search & funding resources</p>
            <h2>Find the opportunity.<br />Then fund the move.</h2>
          </div>
          <p>
            Explore land and property listings, then connect with New Wide
            Lending for real estate funding information and optional financial
            planning tools.
          </p>
        </div>
      </div>
      <div className="shell resourceBody">
        <div className="resourceGrid">
          {resources.map((resource) => (
            <a
              className="resourceCard"
              href={resource.href}
              key={resource.title}
              rel={resource.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
              target="_blank"
            >
              <div className="resourceTopline">
                <span>{resource.number}</span>
                <small>{resource.label}</small>
              </div>
              <div>
                <h3>{resource.title}</h3>
                <p>{resource.copy}</p>
                {resource.affiliate ? (
                  <small className="resourceAffiliateNote">Affiliate link</small>
                ) : null}
              </div>
              <strong>{resource.action} <span>↗</span></strong>
            </a>
          ))}
        </div>
        <p className="resourceDisclosure">
          Land search, property search, and property-value tools open third-party websites and are not affiliate links. Real
          estate funding information is provided by New Wide Lending; programs
          are subject to lender requirements, underwriting, and approval.
          IVISION Realty Corp may receive compensation if you use the Empower
          or ABC Carpet &amp; Home links; this does not affect the price you
          pay.
        </p>
      </div>
    </section>
  );
}
