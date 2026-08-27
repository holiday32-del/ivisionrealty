import { CONTACT_EMAIL, DISPLAY_PHONE, SITE_URL } from "../seo";

export function GET() {
  const content = `# IVISION Realty Corp

> Los Angeles real estate representation, property management support, property search resources, and connections to real estate funding information for California clients.

## Canonical website
${SITE_URL}

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

## Service area
Greater Los Angeles, San Bernardino County, and select California markets based on service availability.

## Contact
- Email: ${CONTACT_EMAIL}
- Phone: ${DISPLAY_PHONE}
- Address: 2922 Crenshaw Boulevard, Los Angeles, CA 90016

## Important qualification
Real estate funding programs are subject to lender requirements, underwriting, eligibility, and approval. IVISION Realty Corp does not guarantee financing, credit outcomes, property performance, or transaction timelines.
`;

  return new Response(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
