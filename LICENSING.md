# Licensing

Copyright (c) 2026 UnClick (Malamute Mayhem)

UnClick uses a split license. The short version:

- The **platform** is **AGPL-3.0** (the part a competitor would clone to run a rival service).
- The **client package you install** is **MIT** (zero friction, so anyone can adopt it).
- The **standalone connector packages** stay **Apache-2.0** (already permissive, published separately).

The goal is protection where cloning would hurt us, and openness where adoption helps us.

## Why the split

UnClick is two different things wearing one repo:

1. A **hosted platform**: the website (`src/`), the API (`api/`), and the backend
   and memory services it deploys. If someone takes this, modifies it, and runs a
   competing service, AGPL-3.0 requires them to publish their changes, including
   when they only expose it over a network. Plain GPL would not catch the
   network-only case; AGPL is the version written for exactly this.

2. A **distributed client**: `@unclick/mcp-server`, the npm package agents install.
   We *want* maximum adoption here, including inside companies. Many companies have
   blanket bans on AGPL dependencies, so an AGPL package would lock those users out
   for no benefit to us. It stays MIT so installing it is frictionless. Using a
   service is not "using its code", so the AGPL on the platform never reaches
   clients that merely connect to the hosted API.

## Per-component breakdown

| Component | Path | License |
|-----------|------|---------|
| Platform: website, API, hosted backend and memory services | `src/`, `api/`, repo root | **AGPL-3.0** (`LICENSE`) |
| MCP client package | `packages/mcp-server/` | **MIT** (`packages/mcp-server/LICENSE`, `license` field) |
| Standalone connector packages | `packages/standalone/*` | **Apache-2.0** (per-package `license` field) |
| Other internal packages | `packages/*` | As declared in each `package.json` |

If a component carries its own `LICENSE` file or a `license` field in its
`package.json`, that declaration governs that component. The root `LICENSE`
(AGPL-3.0) governs everything not otherwise marked. The root `LICENSE` file is
the unmodified FSF text on purpose: license scanners detect it cleanly that
way, and this file carries the project-specific context instead.

## Contributing

We want community involvement, and we want to keep the option of dual licensing
(offering a separate commercial license to companies that want to build closed
products on the platform). Both are only possible if contributions come in under
terms that allow it. Contributions are accepted under the license of the
component they touch, and under the Developer Certificate of Origin (DCO); see
`CONTRIBUTING.md`.

## Not legal advice

This file explains intent. It is not legal advice. For anything that matters,
confirm with a lawyer before relying on it.
