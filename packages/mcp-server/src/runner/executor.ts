/**
 * Endpoint executor for the AutoPilot Runner and the unclick CLI.
 *
 * Resolves an endpoint id through the same lanes as the unclick_call
 * meta-tool in server.ts, without requiring an MCP session:
 *   1. memory.<op>            -> MEMORY_HANDLERS
 *   2. local catalog handlers -> LOCAL_CATALOG_HANDLERS
 *   3. wired integrations     -> ADDITIONAL_HANDLERS (dot -> underscore)
 *   4. remote API fallback    -> createClient().call() via ENDPOINT_MAP
 */

import { MEMORY_HANDLERS } from "../memory/handlers.js";
import { LOCAL_CATALOG_HANDLERS } from "../local-catalog-handlers.js";
import { ADDITIONAL_HANDLERS } from "../tool-wiring.js";
import { ENDPOINT_MAP } from "../catalog.js";
import { createClient } from "../client.js";

export interface ExecutionResult {
  ok: boolean;
  endpoint_id: string;
  lane: "memory" | "local" | "integration" | "remote" | "none";
  result?: unknown;
  error?: string;
}

function looksLikeFailure(result: unknown): string | null {
  if (!result || typeof result !== "object" || Array.isArray(result)) return null;
  const rec = result as Record<string, unknown>;
  if (typeof rec.error === "string" && rec.error.trim()) return rec.error;
  if (rec.error === true) return "tool reported an error";
  return null;
}

export async function executeEndpoint(
  endpointId: string,
  params: Record<string, unknown> = {},
): Promise<ExecutionResult> {
  const id = endpointId.trim();
  if (!id) return { ok: false, endpoint_id: endpointId, lane: "none", error: "endpoint_id is required" };

  try {
    if (id.startsWith("memory.")) {
      const op = id.slice("memory.".length);
      const handler = MEMORY_HANDLERS[op];
      if (!handler) {
        return { ok: false, endpoint_id: id, lane: "memory", error: `Unknown memory operation "${op}".` };
      }
      const result = await handler(params);
      const failure = looksLikeFailure(result);
      return { ok: failure === null, endpoint_id: id, lane: "memory", result, error: failure ?? undefined };
    }

    const local = LOCAL_CATALOG_HANDLERS[id];
    if (local) {
      const result = await local(params);
      const failure = looksLikeFailure(result);
      return { ok: failure === null, endpoint_id: id, lane: "local", result, error: failure ?? undefined };
    }

    const integration = ADDITIONAL_HANDLERS[id.replace(/\./g, "_")];
    if (integration) {
      const result = await integration(params);
      const failure = looksLikeFailure(result);
      return { ok: failure === null, endpoint_id: id, lane: "integration", result, error: failure ?? undefined };
    }

    const entry = ENDPOINT_MAP.get(id);
    if (entry) {
      const client = createClient();
      const result = await client.call(entry.endpoint.method, entry.endpoint.path, params);
      const failure = looksLikeFailure(result);
      return { ok: failure === null, endpoint_id: id, lane: "remote", result, error: failure ?? undefined };
    }

    return {
      ok: false,
      endpoint_id: id,
      lane: "none",
      error: `Endpoint "${id}" not found. Use the unclick_search tool or "unclick call memory.list_schedules" style ids.`,
    };
  } catch (err) {
    return {
      ok: false,
      endpoint_id: id,
      lane: "none",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
