# GEOPass Product Brief

GEOPass is the Pass family product for generative-engine readiness. It diagnoses how prepared a public website is to be understood, cited, and represented by AI answer engines such as ChatGPT, Claude, Perplexity, Gemini, Copilot, Grok, and Meta AI.

GEOPass does not promise rankings or citations. The correct promise is readiness: surface public gaps, explain why they matter, and give the user practical next steps that may increase the likelihood of accurate AI discovery.

## Chunk 1 Scope

This first scaffold creates a package-level contract only. It defines report, check, finding, evidence, severity, verdict, engine, bot, and cross-pass signal shapes. It also adds a scanner plan that documents the future shared scanner stack without running crawlers, using paid APIs, reading credentials, or writing production data.

The v0 diagnostic hats are:

- AI bot crawlability matrix across GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Twitterbot, and FacebookBot.
- llms.txt presence and quality.
- schema.org citation-grade validation.
- Brand mention readiness across the seven answer engines.
- Wikidata presence.
- Common Crawl presence.
- Aggregate AI engine readiness score.

## Shared Scanner Relationship

GEOPass owns the shared scanner contract for the Pass family. SEOPass should become a thin verdict pack on top of this package, reusing the same evidence and report language where possible. FlowPass, LegalPass, SlopPass, and UXPass can consume `cross_pass_signals` without each inventing a second scanner shape.

## Safety Rules

- No guaranteed citations, guaranteed rankings, or rank-one language.
- No live crawler execution in this scaffold.
- No paid API calls.
- No credentials, auth, billing, domains, migrations, or production database writes.
- Source-linked public evidence only.

## 2026 research refresh: Google AI features

Google Search Central's current AI features guidance says the same foundational SEO best practices still apply to AI Overviews and AI Mode. There are no extra technical requirements or special "GEO hacks" for inclusion. A page needs to be indexed, eligible to appear in Google Search with a snippet, technically accessible, policy-compliant, and useful to people.

GEOPass should therefore score readiness, not promise placement. The product should reward:

- crawlable public pages with index/snippet eligibility
- helpful, reliable, people-first content
- visible source evidence, author/entity clarity, and clean internal linking
- structured data that truthfully represents visible page content
- topical coverage that survives query fan-out across related subtopics

GEOPass should penalize:

- hidden, misleading, or irrelevant schema
- scaled AI pages with little added value
- scraped or stitched content with no original usefulness
- "guaranteed AI citation", "ranked in AI Mode", or similar unverifiable claims

Reference sources:

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/essentials/spam-policies
