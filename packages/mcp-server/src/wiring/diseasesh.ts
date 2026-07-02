// wiring/diseasesh.ts
// Per-app MCP wiring for the diseasesh connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { covidGlobal, covidCountry, covidVaccine } from "../diseasesh-tool.js";

export const diseaseshTools = [
  // ── diseasesh-tool.ts ────────────────────────────────────────────────────────
  {
    name: "covid_global",
    description: "Get global COVID-19 statistics from disease.sh.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "covid_country",
    description: "Get COVID-19 statistics for a specific country from disease.sh.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        country: { type: "string" as const, description: "Country name (e.g. USA, UK, Australia)." },
      },
      required: ["country"],
    },
  },
  {
    name: "covid_vaccine",
    description: "Get COVID-19 vaccine candidate information from disease.sh.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const diseaseshHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // diseasesh-tool.ts
  covid_global:              (args) => covidGlobal(args),
  covid_country:             (args) => covidCountry(args),
  covid_vaccine:             (args) => covidVaccine(args),};
