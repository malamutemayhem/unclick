/**
 * MCP Streamable HTTP protocol helpers.
 *
 * Currently exports normalizeAcceptHeader, which works around the SDK's
 * strict Accept-header policy. The MCP Streamable HTTP server transport
 * rejects any POST whose Accept header lacks both "application/json" and
 * "text/event-stream" with HTTP 406 + JSON-RPC -32000 + id:null. That
 * cascades into multiple TestPass-core failures because the request never
 * reaches the SDK's protocol layer where the proper id echo and -32601
 * unknown-method response live.
 *
 * Spec-curious clients (TestPass-core, plain JSON-RPC tools, browsers
 * using fetch defaults) commonly send only "application/json". In
 * stateless mode the server always responds with a JSON body, so being
 * more permissive than the SDK is safe.
 */

export interface AcceptCarrier {
  headers: { accept?: string | string[] | undefined } & Record<string, unknown>;
}

const REQUIRED = ["application/json", "text/event-stream"] as const;

/**
 * Mutate `req.headers.accept` so that the MCP SDK's strict check passes.
 * Preserves any client-supplied values, only appending the missing ones.
 *
 * - "application/json"          becomes "application/json, text/event-stream"
 * - "text/event-stream"         becomes "text/event-stream, application/json"
 * - "application/json, text/event-stream" passes through untouched
 * - "*\/*" or missing            becomes "application/json, text/event-stream"
 */
export function normalizeAcceptHeader(req: AcceptCarrier): void {
  const raw = req.headers.accept;
  const current = Array.isArray(raw) ? raw.join(", ") : raw ?? "";
  const missing = REQUIRED.filter((value) => !current.includes(value));
  if (missing.length === 0) return;
  req.headers.accept = current
    ? `${current}, ${missing.join(", ")}`
    : missing.join(", ");
}
