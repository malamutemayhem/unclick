# CompliancePass Dependency Audit Notes

**Date:** 2026-05-27
**Command:** `npm audit --audit-level=moderate --json`
**Scope:** Local UnClick worktree after CompliancePass package wiring.

## Summary

The current dependency audit is not clean:

- total: 34
- critical: 0
- high: 17
- moderate: 17

`npm audit fix --package-lock-only --ignore-scripts --dry-run --json` reported no package changes. The remaining fixes appear to involve dependency upgrade work that should be routed deliberately rather than forced as part of the CompliancePass product slice.

## Direct Upgrade Groups To Review

- `@anthropic-ai/sdk`
- `@vercel/node`
- `drizzle-orm`
- `drizzle-kit`
- `fast-xml-parser`
- `hono`
- `vite`

## CompliancePass Position

CompliancePass should report this as a readiness gap until a SecurityPass or dependency-upgrade lane has reviewed the major upgrades, run the affected builds/tests, and refreshed this receipt.
