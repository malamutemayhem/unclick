// wiring/carboninterface.ts
// Per-app MCP wiring for the carboninterface connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Environment / Science

import { estimateFlightEmissions, estimateVehicleEmissions, estimateElectricityEmissions } from "../carboninterface-tool.js";

export const carboninterfaceTools = [
  // ── carboninterface-tool.ts ──────────────────────────────────────────────────
  {
    name: "carbon_flight_emissions",
    description: "Estimate carbon emissions for a flight.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        legs: { type: "array", items: {}, description: "Array of flight legs with departure_airport and destination_airport" },
        passengers: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["legs"],
    },
  },
  {
    name: "carbon_vehicle_emissions",
    description: "Estimate carbon emissions for a vehicle journey.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        distance_value: { type: "number" },
        distance_unit: { type: "string" },
        vehicle_model_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["distance_value", "vehicle_model_id"],
    },
  },
  {
    name: "carbon_electricity_emissions",
    description: "Estimate carbon emissions for electricity consumption.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        electricity_value: { type: "number" },
        electricity_unit: { type: "string" },
        country: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["electricity_value", "country"],
    },
  },
] as const;

export const carboninterfaceHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // carboninterface-tool.ts
  carbon_flight_emissions:     (args) => estimateFlightEmissions(args),
  carbon_vehicle_emissions:    (args) => estimateVehicleEmissions(args),
  carbon_electricity_emissions:(args) => estimateElectricityEmissions(args),
};
