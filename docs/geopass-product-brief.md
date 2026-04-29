# GEOPass Chunk 1 Product Brief

GEOPass is the Pass family product for AI-search readiness. SEOPass checks classic search visibility; GEOPass checks whether a product, brand, or page can be found, understood, cited, and safely summarized by answer engines.

## Positioning

GEOPass answers one question: when a user asks ChatGPT, Claude, Gemini, Perplexity, or another answer engine about this product or category, does the brand show up correctly?

It focuses on:

- entity clarity
- citation readiness
- source attribution
- AI crawler accessibility
- structured facts
- answer-engine prompt coverage
- competitor comparison visibility

## Chunk 1 Scope

This first chunk is a scaffold only. It ships:

- a GEOPass pack shape
- a core example pack
- four MCP tool stubs
- a crawler execution-plan scaffold
- a brief product direction document

It does not yet execute live crawls, call external answer engines, persist runs, or score results.

## MCP Tools

- `geopass_run`: plan a GEOPass run for a URL or registered pack
- `geopass_status`: reserve the status lookup shape
- `geopass_register_pack`: store a YAML pack for later runs
- `geopass_crawl_plan`: build the crawler and extraction plan for a URL

## First Real Checks

The first executable GEOPass checks should be:

- crawler access: robots, sitemap, and AI crawler policy
- extractable facts: title, description, schema, headings, canonical URL
- entity consistency: brand, product, founder, location, pricing, category
- citation targets: stable source pages answer engines can cite
- answer prompts: small prompt set that tests whether the brand appears in generated answers

## Relationship To SEOPass

SEOPass checks if search engines can crawl and rank the site. GEOPass checks if AI answer engines can understand and cite it.

The two products should share URL, crawl, metadata, and report primitives later, but remain separate user-facing passes because the jobs are different:

- SEOPass: "Can Google and search engines find me?"
- GEOPass: "Can AI answers explain and recommend me accurately?"

## Product Notes

GEOPass should be careful not to promise control over AI answers. The pitch is visibility and readiness, not guaranteed ranking. The safest language is: "find and fix the signals answer engines rely on."
