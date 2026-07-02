// wiring/pypi.ts
// Per-app MCP wiring for the pypi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { pypiGetPackage, pypiGetVersion } from "../pypi-tool.js";

export const pypiTools = [
  // ── pypi-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "pypi_get_package",
    description: "Get metadata for a Python package from PyPI.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Package name." },
      }, required: ["name"],
    },
  },
  {
    name: "pypi_get_version",
    description: "Get metadata for a specific version of a Python package from PyPI.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Package name." },
        version: { type: "string" as const, description: "Version string." },
      }, required: ["name", "version"],
    },
  },
] as const;

export const pypiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pypi-tool.ts
  pypi_get_package:          (args) => pypiGetPackage(args),
  pypi_get_version:          (args) => pypiGetVersion(args),
};
