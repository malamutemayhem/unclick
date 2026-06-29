// wiring/calculator.ts
// Per-app MCP wiring for the calculator connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Utilities

import { calculateTip, calculateMortgage, calculateBmi, calculateCompoundInterest, convertCurrencyEstimate } from "../calculator-tool.js";

export const calculatorTools = [
  // ── calculator-tool.ts ───────────────────────────────────────────────────────
  {
    name: "calc_tip",
    description: "Calculate tip amount and total for a bill.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bill: { type: "number" },
        tip_percent: { type: "number" },
        split: { type: "number" },
      },
      required: ["bill"],
    },
  },
  {
    name: "calc_mortgage",
    description: "Calculate monthly mortgage repayment.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        principal: { type: "number" },
        annual_rate: { type: "number" },
        years: { type: "number" },
      },
      required: ["principal", "annual_rate", "years"],
    },
  },
  {
    name: "calc_bmi",
    description: "Calculate Body Mass Index (BMI).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        weight_kg: { type: "number" },
        height_cm: { type: "number" },
      },
      required: ["weight_kg", "height_cm"],
    },
  },
  {
    name: "calc_compound_interest",
    description: "Calculate compound interest growth.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        principal: { type: "number" },
        annual_rate: { type: "number" },
        years: { type: "number" },
        compounds_per_year: { type: "number" },
        monthly_contribution: { type: "number" },
      },
      required: ["principal", "annual_rate", "years"],
    },
  },
  {
    name: "calc_currency_estimate",
    description: "Estimate currency conversion using a rough rate.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        amount: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["amount", "from", "to"],
    },
  },
] as const;

export const calculatorHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // calculator-tool.ts
  calc_tip:             (args) => Promise.resolve(calculateTip(args)),
  calc_mortgage:        (args) => Promise.resolve(calculateMortgage(args)),
  calc_bmi:             (args) => Promise.resolve(calculateBmi(args)),
  calc_compound_interest:(args) => Promise.resolve(calculateCompoundInterest(args)),
  calc_currency_estimate:(args) => Promise.resolve(convertCurrencyEstimate(args)),
};
