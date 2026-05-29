# CopyPass Product Brief

CopyPass is a deterministic product-copy review pass for UnClick. It flags copy that is unclear, overconfident, stale, unsupported, urgency-heavy, tone-mismatched, internally inconsistent, AI-sloppy, detector-evasion positioned, weak on social-proof evidence, misleading about authorship, or missing a direct next action before the wording reaches a public surface.

## First Slice

- Run only on caller-provided copy text or CopyRoom source packets.
- Detect vague hero language, missing CTAs, missing trust signals, unsupported social proof, unsupported superiority claims, placeholder copy, risky guarantee language, human-authorship/AI-free claims, internal contradictions, audience/tone mismatch, AI-slop language, misleading urgency, and product-surface honesty gaps.
- Return a structured advisory verdict pack with findings, evidence, not-checked boundaries, and disclaimers.
- Avoid paid model calls, production crawls, private customer copy, live analytics writes, migrations, scheduled jobs, and production test rows.

## Product Guardrails

CopyPass is advisory. It does not promise legal, compliance, revenue, ranking, conversion, accessibility, or safety outcomes. Its job is to make the next human copy review sharper and easier to audit.

When CopyPass is dogfooding another Pass product, explicit guardrail documentation can quote unsafe phrases in order to ban them. CopyPass should treat those doc blocks as policy-example catalogs, not live public claims, when the block is clearly labelled as banned, forbidden, guardrail, linter, or audit wording. The same phrases remain high-risk when they appear in ordinary hero, pricing, ad, email, legal, or product copy.

## Future Fit

The package is intentionally small so it can later consume shared scanner output from the Pass family without coupling this slice to GEOPass, SEOPass, FlowPass, LegalPass, SlopPass, UXPass, SecurityPass, or TestPass internals. The current safe completion bar is deterministic evidence on supplied copy, not a paid model rewrite, voice-profile humaniser, template engine, or detector-evasion product.
