/**
 * Shared config for the admin AI chat panel.
 * Kept in a separate file so tests and future embeds can share it.
 */

export const ADMIN_AI_CHAT_API = "/api/memory-admin?action=admin_ai_chat";

export interface AIChatSuggestion {
  label: string;
  prompt: string;
}

export const ADMIN_CHAT_SUGGESTIONS: AIChatSuggestion[] = [
  {
    label: "What are my standing rules?",
    prompt: "What are my current standing rules and business context?",
  },
  {
    label: "Summarize my last session",
    prompt: "Summarize my most recent session.",
  },
  {
    label: "What facts do I have stored?",
    prompt: "Show me the highest-confidence facts in my memory, grouped by category.",
  },
  {
    label: "Create a task to...",
    prompt: "Create a task to ",
  },
];

/** Short human-readable summary of tool calls for the chat UI. */
export function describeToolCall(toolName: string, input: unknown): string {
  const i = (input ?? {}) as Record<string, unknown>;
  switch (toolName) {
    case "search_memory":
      return `Searched memory for "${String(i.query ?? "")}"`;
    case "add_fact":
      return `Added fact: ${String(i.value ?? i.key ?? "new fact")}`;
    case "update_business_context":
      return `Updated business context: ${String(i.category ?? "")}/${String(i.key ?? "")}`;
    case "get_memory_stats":
      return "Checked memory stats";
    case "list_recent_sessions":
      return `Listed recent sessions${i.limit ? ` (${i.limit})` : ""}`;
    case "write_session_summary":
      return "Wrote session summary";
    default:
      return `Called ${toolName}`;
  }
}

/** Is the AI chat feature flag on (frontend side)? */
export function isAdminAIChatEnabled(): boolean {
  const flag = (import.meta.env.VITE_AI_CHAT_ENABLED ?? "").toString().toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}
