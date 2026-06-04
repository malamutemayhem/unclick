# SEOPass + GEOPass bundle: packaging brief (DRAFT)

Status: DRAFT packaging brief only. This document defines how a combined
SEOPass + GEOPass offer would be packaged. It does NOT change billing,
checkout, Stripe, pricing pages, or public marketing copy. The price below is
a placeholder fixture for discussion and is not wired anywhere. Any launch,
price, or checkout change is a human decision and waits for Chris to approve
the offer framing.

Source job: Boardroom todo `2e7d6604-0f9a-4c88-8f3d-1f234b607b37`
("SEOPass + GEOPass bundle: $149/mo combined product").

## Why bundle the two passes

SEOPass and GEOPass already share one scanner contract. GEOPass owns the
shared scanner stack and SEOPass is a thin verdict pack on top of it (see
`docs/geopass-product-brief.md` and `docs/seopass-product-brief.md`). They
read the same public surfaces (HTML, robots.txt, sitemap.xml, llms.txt,
schema.org markup) and emit cross-pass signals to each other. A buyer who
wants search visibility almost always wants AI answer-engine visibility too,
so selling them together matches how the work is actually done.

Both passes already share one safety rule: AI search readiness is not a
separate promise from search quality. Neither pass guarantees rankings,
rich results, AI Overview inclusion, or AI citations. The bundle keeps that
exact boundary.

## What is included

### From SEOPass (search-engine readiness)

- Crawler access and indexability checks (robots.txt, status codes,
  noindex signals).
- Metadata and snippet readiness (title, meta description, viewport, H1).
- Canonical signals and redirect sanity.
- Structured data presence that matches visible content.
- Internal link graph health.
- Core Web Vitals readiness placeholder and a Lighthouse execution plan.
- AI-era readiness signal (FAQ/question structure, freshness signals).

### From GEOPass (generative-engine readiness)

- AI bot crawlability matrix across GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, Bingbot, Twitterbot, and FacebookBot.
- llms.txt presence and quality.
- schema.org citation-grade validation.
- Brand mention readiness across the seven answer engines.
- Wikidata presence.
- Common Crawl presence.
- Aggregate AI engine readiness score.

### Shared

- One combined read-only receipt per run, using the shared scanner evidence
  so the same fetch feeds both verdicts.
- Cross-pass signals: SEOPass AI-era gaps expand into a GEOPass scan, and
  GEOPass readiness gaps reference the matching SEOPass fix prompts.

## Monthly deliverables (proposed)

This is the recurring value a subscriber would get. It mirrors the existing
read-only dogfood receipt the fleet already produces, scoped to a customer
domain.

1. One scheduled combined SEOPass + GEOPass receipt per week for one primary
   domain, kept as dated history so drift is visible over time.
2. A plain-language change summary: what improved, what regressed, and the
   three highest-value fixes for the next period.
3. Fix prompts for each finding, written so an agent can act on them, with
   the standing boundary that no fix promises rankings or AI citations.
4. A monthly readiness trend (search readiness score and AI engine readiness
   score) shown next to the action list.

## Limits and boundaries

- Read-only public evidence only. No credentials, no paid search or AI APIs,
  no production database writes, no URL submission, no site mutation.
- No guaranteed rankings, rich results, AI Overview placement, or AI
  citations. Structured data is treated as an eligibility and clarity signal,
  not a ranking guarantee.
- One primary domain per seat in this draft. Extra domains would be a future
  add-on, not part of the base bundle.
- Heavy Lighthouse execution stays on the existing plan-and-execute lane and
  is not promised as part of the base read-only receipt.

## Success metrics

- Activation: a new subscriber gets a first combined receipt within minutes
  of pointing the bundle at a domain.
- Usefulness: each receipt surfaces at least one actionable, source-linked
  finding, and the action list is short enough to act on.
- Honesty: zero claims of guaranteed rank or guaranteed AI citation in any
  receipt or marketing copy. CopyPass and LegalPass language boundaries
  apply.
- Retention signal: readiness scores trend up across dated runs for active
  subscribers, the same loop the Benchmarks scoreboard uses internally.

## Upgrade and downgrade paths

- Downgrade: a single-pass plan (SEOPass only or GEOPass only) for buyers who
  only want one side.
- Base: the combined SEOPass + GEOPass bundle described here.
- Upgrade: more domains, more frequent receipts, the heavier Lighthouse
  execution lane, and human-reviewed fix delivery.

## Draft pricing fixture (NOT wired)

```json
{
  "draft_only": true,
  "do_not_wire": "No billing, Stripe, checkout, or marketing change. Awaiting Chris approval.",
  "offer": "SEOPass + GEOPass bundle",
  "proposed_price_monthly_usd": 149,
  "single_pass_reference_price_monthly_usd": 99,
  "included_domains": 1,
  "receipt_cadence": "weekly",
  "boundaries": [
    "read-only public evidence only",
    "no guaranteed rankings or AI citations",
    "no credentials, paid APIs, or production writes"
  ]
}
```

The `$149/mo` figure comes straight from the job title and is a starting
point for discussion, not a decision. The single-pass reference price is a
placeholder to frame the bundle discount and is equally unconfirmed.

## What this brief deliberately does NOT do

- It does not create or change any Stripe product, price, or checkout flow.
- It does not edit public pricing or marketing pages.
- It does not enable any scheduled customer-facing automation.
- It does not commit to the price. Pricing and launch wait for Chris.

## Suggested next steps (each is a separate, gated chip)

1. Chris confirms or adjusts the offer framing and price.
2. After approval, a separate chip wires a customer-scoped scheduled receipt
   reusing the existing dogfood receipt builder (`runSEOPass` in
   `scripts/build-dogfood-report.mjs` and the GEOPass scanner adapter).
3. A separate, security-reviewed chip handles any billing or checkout work.
