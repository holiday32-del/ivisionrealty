import { CONTACT_EMAIL, DISPLAY_PHONE, SITE_URL } from "../seo";

export function GET() {
  const content = `# IVISION Realty Corp

> Los Angeles real estate representation, property management support, property search resources, and connections to real estate funding information for California clients.

## Canonical website
${SITE_URL}

## Primary pages
- Home: ${SITE_URL}/
- Services: ${SITE_URL}/services
- Buy with IVISION Realty: ${SITE_URL}/buy-with-us
- List with IVISION Realty: ${SITE_URL}/list-with-us
- Appointment requests: ${SITE_URL}/appointment
- Third-party resources and affiliate disclosures: ${SITE_URL}/resources
- About IVISION Realty Corp: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact

## Services
- Residential buyer and seller representation
- Commercial and investment property support
- Property management support
- Property and land search resources
- Real estate funding information through New Wide Lending
- Buyer representation and free Keller Williams property search: /buy-with-us
- Seller representation and property-value resource: /list-with-us
- Appointment requests: /appointment
- Privacy, terms, and disclosures: /privacy, /terms, /disclosures
- Third-party real estate and business resources with affiliate disclosures

## Business identity
- Legal and public name: IVISION Realty Corp
- Alternate name: IVISION Realty
- Business type: California real estate agency and local business
- Founded: 2010
- Canonical organization identifier: ${SITE_URL}/#organization
- Canonical website identifier: ${SITE_URL}/#website

## Service area
Greater Los Angeles, San Bernardino County, and select California markets based on service availability.

## Contact
- Email: ${CONTACT_EMAIL}
- Phone: ${DISPLAY_PHONE}
- Address: 2922 Crenshaw Boulevard, Los Angeles, CA 90016

## Important qualification
Real estate funding programs are subject to lender requirements, underwriting, eligibility, and approval. IVISION Realty Corp does not guarantee financing, credit outcomes, property performance, or transaction timelines.

## Source and compensation notes
- Keller Williams Property Search and Land Search are third-party resources and are not affiliate links.
- New Wide Lending is the identified source for real estate funding information; IVISION Realty Corp does not guarantee funding or approval.
- Other third-party links may be affiliate links only when clearly labeled and disclosed on the page.
`;

  return new Response(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
