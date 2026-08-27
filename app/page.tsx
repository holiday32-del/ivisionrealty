import type { Metadata } from "next";
import Link from "next/link";
import { SearchFundingResources } from "./search-funding-resources";
import { faqSchema, homeFaqs, pageOpenGraph } from "./seo";
import { SiteShell } from "./site-shell";
import { StructuredData } from "./structured-data";

export const metadata: Metadata = {
  title: "Los Angeles Real Estate & Property Management",
  description:
    "IVISION Realty Corp helps California clients with residential and commercial real estate, property management, property searches, and funding resources.",
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph(
    "Los Angeles Real Estate & Property Management | IVISION Realty Corp",
    "Residential and commercial real estate, property management, property search resources, and funding information for California clients.",
    "/",
  ),
};

const services = [
  {
    number: "01",
    title: "Buy & sell real estate",
    copy: "Clear guidance for residential and commercial buyers, sellers, and investors across Greater Los Angeles and California.",
    href: "/services#real-estate",
    className: "serviceCard serviceCardHome",
  },
  {
    number: "02",
    title: "Property management",
    copy: "Hands-on oversight for homes, apartments, retail spaces, and commercial properties throughout Greater Los Angeles.",
    href: "/services#management",
    className: "serviceCard serviceCardManagement",
  },
  {
    number: "03",
    title: "Real estate funding",
    copy: "Explore real estate funding information and options through New Wide Lending.",
    href: "/services#funding",
    className: "serviceCard serviceCardFunding",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <StructuredData data={faqSchema} />
      <main>
        <section className="hero heroHome">
          <div className="heroShade" />
          <div className="shell heroInner">
            <p className="eyebrow light">Los Angeles · California</p>
            <h1>Real estate.<br />Property. Capital.<br /><em>One clear path forward.</em></h1>
            <p className="heroCopy">
              IVISION Realty brings real estate, property management, and
              financing guidance together around one objective: helping you
              move with confidence.
            </p>
            <div className="buttonRow">
              <Link className="button buttonGold" href="/contact">Start a conversation</Link>
              <Link className="textLink lightLink" href="/services">Explore our services <span>↗</span></Link>
            </div>
          </div>
          <div className="shell heroStats">
            <div><strong>2010</strong><span>Serving LA County since</span></div>
            <div><strong>California</strong><span>Local market focus</span></div>
            <div><strong>One team</strong><span>From strategy to closing</span></div>
          </div>
        </section>

        <section className="trustStrip" aria-label="Core capabilities">
          <div className="shell trustItems">
            <span>Residential</span><i />
            <span>Commercial</span><i />
            <span>Property management</span><i />
            <span>Funding guidance</span>
          </div>
        </section>

        <section className="section shell introGrid">
          <div>
            <p className="eyebrow">A better way to move</p>
            <h2>A modern real estate partner for ambitious plans.</h2>
          </div>
          <div className="introCopy">
            <p>
              Every move starts with a different story. You may be buying your
              first home, repositioning an investment, preparing a property for
              market, or looking for a smarter way to finance what comes next.
            </p>
            <p>
              We create a clear plan, connect the right resources, and stay
              engaged through the details—so you never feel like just another
              transaction.
            </p>
            <Link className="textLink" href="/about">Meet IVISION <span>↗</span></Link>
          </div>
        </section>

        <section className="section servicesSection">
          <div className="shell">
            <div className="sectionHeading">
              <div><p className="eyebrow">What we do</p><h2>Expertise that works together.</h2></div>
              <p>Focused services. Connected thinking. A team that sees the whole picture.</p>
            </div>
            <div className="serviceGrid">
              {services.map((service) => (
                <Link className={service.className} href={service.href} key={service.title}>
                  <span className="serviceNumber">{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <span className="cardLink">Learn more ↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <SearchFundingResources />

        <section className="splitFeature">
          <div className="splitImage featureCity" role="img" aria-label="Contemporary commercial skyline" />
          <div className="splitContent">
            <p className="eyebrow light">Beyond the transaction</p>
            <h2>Local perspective.<br />Broader capability.</h2>
            <p>
              Our network brings together real estate professionals, property
              specialists, and financing resources. The result is a more
              connected experience from early planning through the final details.
            </p>
            <ul className="checkList">
              <li><span>✓</span> Residential and commercial representation</li>
              <li><span>✓</span> Property operations and tenant coordination</li>
              <li><span>✓</span> Financing and business-readiness guidance</li>
            </ul>
            <Link className="button buttonOutlineLight" href="/about">Why IVISION</Link>
          </div>
        </section>

        <section className="section shell statement">
          <p className="eyebrow">Our promise</p>
          <blockquote>“We don’t just point you toward the next step. We help you understand the path.”</blockquote>
          <p className="statementCopy">Straight answers, thoughtful strategy, and service built around your goals.</p>
        </section>

        <section className="section faqSection" id="frequently-asked-questions">
          <div className="shell faqLayout">
            <div className="faqIntro">
              <p className="eyebrow">Common questions</p>
              <h2>Clear answers for your next move.</h2>
              <p>Start with the essentials, then contact our team for guidance based on your property and goals.</p>
            </div>
            <div className="faqList">
              {homeFaqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ctaSection">
          <div className="shell ctaInner">
            <div><p className="eyebrow light">Ready when you are</p><h2>Let’s make your next move a smart one.</h2></div>
            <Link className="button buttonGold" href="/contact">Talk with our team</Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
