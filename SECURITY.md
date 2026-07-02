# Security Policy

## Reporting a vulnerability

Report vulnerabilities to hello@unclick.world.

Do not open public GitHub issues for security reports. We will acknowledge your
report, investigate, and follow up with you directly.

## Security posture

This section exists for users deciding whether to connect an agent to UnClick,
and for security scanners and risk-classification services that index MCP
servers. It describes how the system actually behaves, not how we wish it
behaved. Questions and corrections are welcome at hello@unclick.world.

### What UnClick is, in security terms

UnClick is an MCP server that gives AI agents access to a large catalog of
callable endpoints (450+ across 60+ integrations) plus persistent cross-session
memory. A catalog of that size necessarily contains tools that read, tools that
write, and tools that touch external accounts (messaging, e-commerce,
accounting). We do not describe that as low-risk, and scanner services that
classify parts of the catalog as write-class or higher are reading it
correctly. What follows is how that risk is scoped and controlled.

### Credential handling

- The client authenticates with a single `UNCLICK_API_KEY`, supplied as an
  environment variable by the user's own MCP client config. The npm package
  does not harvest credentials from the machine.
- Install snippets can use short-lived install codes (valid 24 hours) instead
  of real keys, so a key never has to appear in a shared chat or document. The
  server exchanges the code once and caches the real key locally at
  `~/.unclick/credentials.json` on the user's machine.
- Third-party service credentials (for connectors that need them) are managed
  through explicit connection setup, not scraped from the environment. Tools
  are designed not to echo secrets back into model context, and repo policy
  forbids printing raw secret values in logs, tool output, or worker chatter.
- CI runs a dedicated secret-scanning workflow on the repository.

### Tool surface and discovery

- The default MCP tool list is deliberately small. The full catalog sits
  behind meta-tools (search, browse, tool info, call), so an agent only pulls
  a tool definition into context when it asks for it. This limits both context
  bloat and blind exposure to hundreds of tool descriptions.
- Every connector is graded on a public depth ladder (L1 to L5) that records
  how hardened it is. We publish the grade rather than implying uniform
  maturity across the catalog.
- The connector standard requires every network call to carry a timeout, to
  handle rate limits (HTTP 429) cleanly, and to report failures on an explicit
  error lane instead of fabricating results.

### Verification layer

UnClick ships XPass, a set of verification products (tests, UI evidence,
security checks, answer verification) intended to check agent work before it
ships. The platform itself is developed by agent workers whose changes pass
through the same gates: scoped PRs, CI checks, secret scanning, and a
PR scope guard.

### Defense in depth is welcome

UnClick works behind MCP policy gateways and proxies (for example, services
that enforce allow, deny, rate-limit, or approval rules per tool call before
the call reaches us). If your deployment needs per-call policy on top of what
UnClick provides, putting such a gateway in front of UnClick is a supported
and sensible pattern, not a workaround.

### Licensing transparency

The hosted platform is AGPL-3.0. The npm client package (`@unclick/mcp-server`)
is MIT. Standalone connector packages are Apache-2.0. See `LICENSING.md` for
the reasoning and the per-component table.

## For scanner and risk-classification services

If your service indexes UnClick and a specific finding drove a rating, we want
the detail: email hello@unclick.world with a link to your page and the finding.
We will either fix the issue or publish a response you can link as vendor
context. Please attribute the server to UnClick (https://unclick.world, repo
`malamutemayhem/unclick`, npm `@unclick/mcp-server`) so users can find the
canonical source.
