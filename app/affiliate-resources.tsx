export const affiliateResources = {
  housecallPro: {
    name: "Housecall Pro",
    url: "https://fxo.co/JEtC",
    copy: "Explore business-management tools designed for home-service and field-service professionals.",
    action: "Explore Housecall Pro",
  },
  iraFinancial: {
    name: "IRA Financial",
    url: "https://fxo.co/JEtD",
    copy: "Explore self-directed retirement-account information and investment resources through IRA Financial.",
    action: "Explore IRA Financial",
  },
  superMoneyBusiness: {
    name: "SuperMoney Business Financing",
    url: "https://fxo.co/JEtF",
    copy: "Compare business financing options through SuperMoney's financial-services marketplace.",
    action: "Compare Business Financing Options",
  },
  yaleHome: {
    name: "Yale Home",
    url: "https://fxo.co/JEtG",
    copy: "Explore smart-lock and home-access products available through Yale Home.",
    action: "Explore Yale Home",
  },
  goodGreek: {
    name: "Good Greek Moving & Storage",
    url: "https://fxo.co/JEtH",
    copy: "Planning a move? Explore third-party moving and storage resources that may help with local or long-distance relocation.",
    action: "Explore Moving Services",
  },
  buildium: {
    name: "Buildium",
    url: "https://fxo.co/JEtI",
    copy: "Explore property-management software and tools available through Buildium.",
    action: "Explore Buildium",
  },
} as const;

type ActiveAffiliateResource = {
  name: string;
  url: string;
  copy: string;
  action: string;
};

export function AffiliateResourceCard({ resource }: { resource: ActiveAffiliateResource }) {
  return (
    <article className="affiliateCard">
      <div>
        <h3>{resource.name}</h3>
        <p>{resource.copy}</p>
      </div>
      <a
        className="button buttonDark"
        href={resource.url}
        rel="sponsored noopener noreferrer"
        target="_blank"
      >
        {resource.action}
      </a>
    </article>
  );
}
