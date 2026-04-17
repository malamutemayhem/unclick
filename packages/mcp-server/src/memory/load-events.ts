/**
 * Tool-call event logger for UnClick Memory reliability metrics.
 *
 * Fire-and-forget POST to /api/memory-admin?action=log_tool_event whenever
 * the MCP server dispatches a tool. The control plane uses these rows to
 * compute get_startup_context compliance across sessions and clients.
 *
 * Never blocks or throws into the tool-call path: a logging failure must
 * not break the actual tool invocation.
 */

import * as crypto from "crypto";

const MEMORY_API_BASE =
  process.env.UNCLICK_MEMORY_BASE_URL ||
  process.env.UNCLICK_SITE_URL ||
  "https://unclick.world";

// Stable for the lifetime of this MCP server process.
// A fresh server boot counts as a new session for compliance metrics.
const SESSION_IDENTIFIER = crypto.randomUUID();

function clientType(): string {
  return (
    process.env.UNCLICK_CLIENT_TYPE ||
    process.env.MCP_CLIENT_NAME ||
    "unknown"
  );
}

export function logToolCall(toolName: string): void {
  const apiKey = process.env.UNCLICK_API_KEY;
  if (!apiKey) return;

  fetch(`${MEMORY_API_BASE}/api/memory-admin?action=log_tool_event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      tool_name: toolName,
      session_identifier: SESSION_IDENTIFIER,
      client_type: clientType(),
    }),
  }).catch(() => {
    // Swallow: reliability metrics must never break tool dispatch.
  });
}
