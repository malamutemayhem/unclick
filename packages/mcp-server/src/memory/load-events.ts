/**
 * Tool-call instrumentation for UnClick Memory reliability tracking.
 *
 * Fire-and-forget POST to the UnClick control plane every time the MCP server
 * dispatches a tool call. The server computes `was_first_call_in_session`
 * based on whether any row for the same api_key_hash exists within the last
 * 30 minutes, then inserts a row into `memory_load_events`.
 *
 * Never blocks the tool response, never throws.
 */

const MEMORY_API_BASE =
  process.env.UNCLICK_MEMORY_BASE_URL || process.env.UNCLICK_SITE_URL || "https://unclick.world";

function detectClientType(): string {
  if (process.env.UNCLICK_CLIENT_TYPE) return process.env.UNCLICK_CLIENT_TYPE;
  if (process.env.MCP_CLIENT) return process.env.MCP_CLIENT;
  if (process.env.CLAUDE_CODE_SESSION_ID) return "claude-code";
  if (process.env.CURSOR_SESSION_ID) return "cursor";
  return "unknown";
}

export function logToolCall(toolName: string): void {
  const apiKey = process.env.UNCLICK_API_KEY;
  if (!apiKey) return;

  const body = JSON.stringify({
    tool_name: toolName,
    client_type: detectClientType(),
  });

  fetch(`${MEMORY_API_BASE}/api/memory-admin?action=log_tool_event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  }).catch(() => {});
}
