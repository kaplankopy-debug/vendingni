# VendingNI Agent Readiness

## Current machine-readable interfaces

VendingNI is a static GitHub Pages website. The following public resources improve discovery and factual interpretation without pretending to provide transactional capabilities:

- `https://vendingni.com/llms.txt` — compact index of the business, services, sectors, geographic pages and discovery resources.
- `https://vendingni.com/robots.txt` — crawler access rules and sitemap discovery.
- `https://vendingni.com/sitemap.xml` — canonical indexable HTML pages.
- Schema.org JSON-LD — organisation, website and service information embedded in important HTML pages.
- `https://vendingni.com/data/services.json` — factual managed-vending, machine-type, sector and coverage data.
- `https://vendingni.com/data/site.json` — stable site manifest and important canonical URLs.
- `https://vendingni.com/openapi-agent-future.yaml` — non-operational design for a possible future agent API.

These resources are static and read-only. They do not accept enquiries, determine eligibility or perform actions.

## Phase 2: transactional agent support

True agent actions require server-side infrastructure rather than GitHub Pages alone. A future implementation could use serverless functions, Cloudflare Workers, Vercel Functions, Netlify Functions or another lightweight API backend.

After operational rules, validation, security, privacy, abuse prevention and enquiry routing are defined, a backend could expose capabilities such as:

- `check_site_eligibility`
- `submit_vending_enquiry`
- `get_machine_options`
- `get_service_coverage`

The planned OpenAPI document provides an initial design only. It must not be advertised as operational until real endpoints have been implemented, secured, tested and monitored.

MCP could be considered later as an optional interface once the underlying backend functions genuinely exist. MCP should not be added as a wrapper around nonexistent static-site actions.
