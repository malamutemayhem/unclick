---
name: API design reviewer
slug: api-design-reviewer
version: 1.0.0
description: "Review an API surface for consistency, safety, and longevity: naming, versioning, error contracts, pagination, idempotency, and the mistakes that become permanent once clients depend on them."
category: code-review
tags: [api, rest, graphql, design, contracts, naming, versioning, errors]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick API review skill synthesized from industry API design guidelines.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Reviewer]
required_mcp_tools: []
required_apps: []
---

# API design reviewer

Use this when reviewing a new API endpoint, a set of routes, an OpenAPI spec, a GraphQL schema, or any interface that external or internal consumers will call. API mistakes are uniquely expensive because clients depend on them and changing the contract after adoption breaks people.

## Review checklist

### Naming and structure

1. **Are resource names nouns, not verbs?** `/users`, not `/getUsers`. Actions on resources use HTTP methods or explicit sub-resources (`/users/123/activate`).
2. **Is naming consistent across endpoints?** If one endpoint uses `created_at`, another should not use `createdAt` or `creation_date`. Pick one convention and enforce it everywhere.
3. **Are collection and item endpoints paired?** `GET /items` and `GET /items/:id` should exist together. A collection without a detail endpoint (or vice versa) is usually a gap.

### Error handling

4. **Do errors return structured bodies, not just status codes?** A 400 with `{"error": "validation_failed", "details": [...]}` is usable. A 400 with no body is not.
5. **Are error codes stable strings, not messages?** Clients switch on error codes, not human-readable text. `"code": "insufficient_funds"` is a contract. `"message": "You don't have enough money"` is not.
6. **Is 404 vs 403 intentional?** Returning 404 for resources the caller cannot access leaks less information than 403, but some APIs need the caller to know the resource exists. Make this choice deliberately.

### Pagination, filtering, and limits

7. **Are list endpoints paginated?** Unbounded list responses will eventually break clients or servers. Cursor-based pagination is more resilient than offset-based for large or changing datasets.
8. **Are there rate limits or size caps?** Every endpoint that accepts user input should have a documented maximum. Every list endpoint should have a default and maximum page size.

### Safety

9. **Are mutating operations idempotent where possible?** PUT and DELETE should be safe to retry. POST operations that create resources should accept an idempotency key or return the existing resource on duplicate.
10. **Are dangerous operations protected?** Bulk deletes, account closure, and irreversible actions should require confirmation, a separate endpoint, or an explicit flag, not just a DELETE call.

### Longevity

11. **Is there a versioning strategy?** URL prefix (`/v1/`), header, or content negotiation. The strategy matters less than having one before the first client ships.
12. **Are response shapes additive-only?** Adding a field is safe. Removing or renaming a field breaks clients. Review whether the proposed shape leaves room to grow without breaking changes.

## Output

List findings by severity. For each, name the endpoint, the issue, and a concrete fix. If the API is clean, say so and note any areas where the design is making a bet that should be documented.
