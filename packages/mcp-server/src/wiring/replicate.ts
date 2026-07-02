// wiring/replicate.ts
// Per-app MCP wiring for the replicate connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { replicateListModels, replicateGetModel, replicateCreatePrediction, replicateGetPrediction, replicateListPredictions, replicateCancelPrediction } from "../replicate-tool.js";

export const replicateTools = [
  // ── replicate-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "replicate_list_models",
    description: "List public models available on Replicate.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        cursor: { type: "string" },
      },
      required: ["api_token"],
    },
  },
  {
    name: "replicate_get_model",
    description: "Get details and latest version for a Replicate model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        owner: { type: "string", description: "Model owner username" },
        model_name: { type: "string" },
      },
      required: ["api_token", "owner", "model_name"],
    },
  },
  {
    name: "replicate_create_prediction",
    description: "Run a Replicate model by creating a prediction.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        version: { type: "string", description: "Model version ID (use this OR model)" },
        model: { type: "string", description: "Model as owner/name or owner/name:version (use this OR version)" },
        input: { description: "Model input parameters as JSON object or string" },
        webhook: { type: "string" },
        stream: { type: "boolean" },
      },
      required: ["api_token", "input"],
    },
  },
  {
    name: "replicate_get_prediction",
    description: "Get the status and output of a Replicate prediction.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        prediction_id: { type: "string" },
      },
      required: ["api_token", "prediction_id"],
    },
  },
  {
    name: "replicate_list_predictions",
    description: "List recent predictions for a Replicate account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        cursor: { type: "string" },
      },
      required: ["api_token"],
    },
  },
  {
    name: "replicate_cancel_prediction",
    description: "Cancel a running Replicate prediction.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        prediction_id: { type: "string" },
      },
      required: ["api_token", "prediction_id"],
    },
  },
] as const;

export const replicateHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // replicate-tool.ts
  replicate_list_models:       (args) => replicateListModels(args),
  replicate_get_model:         (args) => replicateGetModel(args),
  replicate_create_prediction: (args) => replicateCreatePrediction(args),
  replicate_get_prediction:    (args) => replicateGetPrediction(args),
  replicate_list_predictions:  (args) => replicateListPredictions(args),
  replicate_cancel_prediction: (args) => replicateCancelPrediction(args),
};
