# iVision Realty production package

This package is ready for a Cloudflare Pages deployment with Pages Functions.

## Required production secrets
Configure these in Cloudflare Pages > Settings > Variables and Secrets:
- `KW_API_BASE_URL` (environment variable; e.g. the production API hostname assigned by KW)
- `KW_API_KEY` (secret)
- `KW_ACCESS_TOKEN` (secret)

The public form submits to `/api/kw-lead`, which runs server-side and keeps KW credentials out of browser code.

## Before DNS cutover
1. Deploy this package to a preview Pages URL.
2. Confirm the homepage and legal pages render correctly.
3. Add the KW environment values and submit a test lead.
4. Confirm the lead appears in Command.
5. Only then attach `ivisionrealty.com` and `www.ivisionrealty.com`.

## Files
- `index.html` — primary conversion page
- `privacy.html`, `terms.html`, `disclosures.html` — compliance pages
- `functions/api/kw-lead.js` — server-side KW Command lead endpoint
- `_headers` — security headers
- `robots.txt`, `sitemap.xml` — search-engine controls
