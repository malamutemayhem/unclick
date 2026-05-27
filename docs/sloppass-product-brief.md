# SlopPass Product Brief

SlopPass is UnClick's scoped review layer for sloppy code and risky AI-generated output. It does not certify correctness. It collects evidence-backed static signals, can inspect source files or unified PR diffs, states exactly what was checked, and leaves unknown runtime paths as unknown.

## Chunk 1

Chunk 1 is a deterministic source and diff reviewer. It focuses on static checks that can run without executing untrusted code, crawling production, calling paid APIs, reading credentials, or writing production rows. The same runner powers package tests, API calls, MCP calls, and XPass routing receipts.

The first smell library covers:

- Placeholder logic that still needs implementation.
- Broad type bypasses such as `any` and TypeScript suppression comments.
- Dynamic code execution such as `eval` and `new Function`.
- Secret-looking literals with redacted evidence.
- Catch-all fallback paths that hide failure.
- Test proof theatre, including weak assertions, skipped tests, and tautological assertions.
- Reliability wording that needs evidence, such as retry and wrapper claims.
- Generated-copy markers that need human review.

## Verdict Shape

Each report includes the target, inspected files, attempted checks, not-checked areas, evidence-backed findings, severity counts, a build-fix prompt, and a verdict. Critical or high signals fail the report. Medium, low, or info signals warn. No findings pass within the inspected scope.

## Boundaries

SlopPass must not execute customer code, inspect private repositories without permission, print secrets, use paid providers by default, or imply a quality guarantee. The deterministic runner is allowed to inspect provided file text or diff text only. Later chunks can connect shared scanner output and richer review hats, but chunk 1 stays self-contained and safe.
