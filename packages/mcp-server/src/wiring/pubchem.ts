// wiring/pubchem.ts
// Per-app MCP wiring for the pubchem connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { pubchemSearch, pubchemProperties } from "../pubchem-tool.js";

export const pubchemTools = [
  // ── pubchem-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "pubchem_search",
    description: "Search PubChem for a chemical compound by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Compound name (e.g. 'aspirin', 'caffeine', 'water')." },
      }, required: ["name"],
    },
  },
  {
    name: "pubchem_properties",
    description: "Get specific properties of a PubChem compound by CID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        cid: { type: "string" as const, description: "PubChem Compound ID." },
        properties: { type: "string" as const, description: "Comma-separated property list (default: MolecularFormula,MolecularWeight,IUPACName,IsomericSMILES)." },
      }, required: ["cid"],
    },
  },
] as const;

export const pubchemHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pubchem-tool.ts
  pubchem_search:            (args) => pubchemSearch(args),
  pubchem_properties:        (args) => pubchemProperties(args),
};
