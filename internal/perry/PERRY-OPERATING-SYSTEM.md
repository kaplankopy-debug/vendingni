# VendingNI Perry operating system

## Purpose and data boundary

This internal layer turns Traffic → Conversion → Economics into a repeatable operating system with 80/20 at its core. It is for decision support, not public claims. Copy templates from `templates/` into `data/`; files in `data/` are deliberately ignored by Git. Never commit names, emails, phone numbers, free-text personal data, commission figures, private scoring weights or channel budgets.

Agents may read the internal files to calculate and rank results. They must not invent missing values, infer a person's query from identity data, publish row-level records, or change a public claim solely because a small sample appears promising.

## The six frameworks

### 1. 80/20 Power Curve

Use `power-curve.csv` separately for pages, query themes, leads and placements. Select one primary metric per analysis: qualified enquiries for pages/query themes, won-placement rate or realised commission for lead segments, and annualised commission for placements. Sort descending, calculate cumulative value and cumulative share, then label each row maintain, improve, test or stop.

Outputs agents use:

- the small set of pages and query themes to improve first;
- lead/site-type patterns worth better qualification or content;
- placements that contribute most value, reported only in aggregate;
- low-value work to pause rather than expanding the content treadmill.

Do not hard-code a proprietary cutoff. The operator chooses the action after reviewing sample size, data quality and strategic fit.

### 2. Rack the Shotgun

The observable funnel is:

`impression → click → tool engagement → enquiry → won placement → recurring commission`

Each stage is a response signal. Weekly Search Console rows provide impressions and clicks. Tool analytics provide engagements. The enquiry register connects channel, landing page and query theme where genuinely known. Placement and commission records complete the chain.

Agents compare stage-to-stage movement and identify the earliest meaningful divergence. They recommend the smallest next test: strengthen a high-impression/low-click snippet, clarify a high-click/low-engagement page, improve a high-engagement/low-enquiry CTA, or tighten qualification where enquiries rarely become placements. Correlation is not attribution; use `unknown` rather than guessing.

### 3. Media Map

Evaluate channels against these unweighted questions:

- Does it contain people already expressing commercial vending intent?
- Can results be attributed through page/query theme/channel to an enquiry?
- Can VendingNI credibly compete with its available proof and resources?
- Can the channel compound through rankings, referrals or authority?
- Is the time/cash cost proportionate to observed enquiry and placement value?
- Does it preserve positioning and avoid unsupported promises?

Priority order:

1. Organic search: improve proven commercial-intent pages and position 4–20 opportunities.
2. Backlinks/authority: relevant manufacturers, payment providers, vending bodies, chambers and credible NI/Ireland business organisations.
3. Referral and partner sources that can be tracked cleanly.
4. Google Ads only after enough realised economics exist to set a defensible acquisition ceiling and a small controlled test is approved.
5. Other channels only when a specific audience, hypothesis and measurement plan are documented.

There is no default scattergun social programme. Social activity must earn its place with a bounded commercial hypothesis; follower growth alone is not an outcome.

### 4. Martini Glass economics

Copy `economics-input.json` into the ignored `data/` directory, replace nulls only with actual supplied values, and run:

`node internal/perry/metrics.mjs internal/perry/data/economics-input.json`

Definitions:

- enquiry conversion = enquiries / visitors;
- placement conversion = won placements / enquiries;
- realised value per visitor = realised commission / visitors;
- realised value per enquiry = realised commission / enquiries;
- annualised value per won placement = annualised commission run-rate / won placements;
- allowable acquisition cost per visitor = annualised commission run-rate × gross margin rate × approved acquisition share / visitors.

The calculator returns null when a denominator is zero or an input is missing. Allowable acquisition cost is a planning ceiling, not an advertising bid or permission to spend. Keep acquisition share and margin assumptions private and operator-approved.

### 5. Power Prism positioning

Core brief: VendingNI is the easiest route for a qualifying organisation in Northern Ireland or the Republic of Ireland to explore and arrange fully managed vending without having to buy, stock or manage the machine itself.

Proof and expression:

- lead with the managed outcome and reduced operational burden;
- make qualification and assessment explicit;
- use the eligibility checker, selector and calculator to reduce uncertainty;
- explain that delivery is supported through an established vending network;
- use conditional language for equipment, cashless payments, telemetry and service availability.

Avoid guarantees of approval, free placement, savings, revenue, response time, equipment availability or geographic coverage at a specific site. Do not imply VendingNI directly performed wider-network work unless the attribution supports it.

### 6. Network Effect / proprietary-data flywheel

`search signals → tool use → structured enquiries → placement outcomes → commission observations → aggregate insight → better qualification/tools/content → stronger search signals`

Near term, use aggregate patterns to improve page prioritisation, form fields, tool questions and qualification guidance. Later, once samples are large enough and privacy review is complete, publish anonymised original-data assets such as broad site-fit patterns or aggregate decision guides. Suppress small cells, remove free text and identifiers, use broad bands, document the observation period, and separate observed association from causal claims.

## Agent inputs and outputs

| Review | Inputs | Outputs |
|---|---|---|
| Monday traffic review | Search Console weekly summary, current page/query-theme Power Curve, backlink activity | Top three page/query actions; backlink-only next actions; channels to pause |
| Funnel review | Weekly summary plus tool and enquiry counts | Largest evidenced stage leak; one bounded conversion test |
| Fortnightly economics review | Enquiries, outcomes, placements, realised commission, visitor totals | Conversion rates, realised value per enquiry, annualised placement value, data-quality warnings |
| Monthly strategy review | Four-week Power Curves, economics outputs, Media Map evidence | Reallocation decision; approved next experiment; flywheel insight safe for internal use |

Every output must state period, row counts, missing fields and whether values are realised, annualised or assumed. Do not combine currencies.

## Data workflow

1. Copy each required template into `internal/perry/data/` and retain the headers.
2. Use stable pseudonymous enquiry and placement IDs; keep contact details in the existing authorised CRM or mailbox, not here.
3. Use controlled outcomes: `open`, `qualified`, `won`, `lost`, `withdrawn` or `unknown`.
4. Record channel/page/query theme only when observed; otherwise use `unknown`.
5. Update commission by quarter and preserve the observation count.
6. Validate counts and currency before calculating metrics.
7. Aggregate before sharing any result outside the authorised internal workflow.

## Minimal cadence

- Weekly, 30 minutes: import Search Console totals, update enquiry outcomes, inspect the page/query Power Curve, choose no more than three traffic/conversion actions.
- Fortnightly, 30 minutes: update placements and commission, run economics, review stage leakage and data quality.
- Monthly, 45 minutes: refresh all four Power Curves, reconsider the Media Map, approve one experiment and capture one flywheel learning.
- Quarterly: validate annualised values against realised commission, revisit any paid-media ceiling and review whether an aggregate insight is safe and useful to publish.

## Recommended automation prompt changes

### Monday SEO review

Review the latest supplied Search Console summary using the page and query-theme Power Curves. Prioritise commercial-intent opportunities already close to stronger rankings, then apply the Media Map with organic search and relevant backlinks first. Return no more than three actions, identify missing data, and do not invent traffic, rankings or values.

### Fortnightly economics review

Using only supplied visitor, enquiry, outcome, placement and realised commission data, calculate funnel conversion, realised value per enquiry and annualised value per won placement. Segment recency/status/value only where dates and values exist. Return null for unavailable metrics, flag small samples, and do not recommend paid acquisition unless an operator-approved margin and acquisition share produce a defensible ceiling.

### Backlink outreach review

Keep this task backlink-only. Identify or assess relevant manufacturers, payment providers, vending bodies, chambers, associations and credible NI/Ireland business organisations. Produce research and prioritised opportunities only; do not create or send customer cold outreach and do not drift into social posting or broad content generation.
