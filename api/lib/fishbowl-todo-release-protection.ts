export const FISHBOWL_TODO_RELEASE_PROTECTED_IDS = new Set<string>([
  "8719dc4f-1650-4ea9-bca8-e92a9819f0ba",
]);

export interface FishbowlTodoReleaseProtectionInput {
  id?: unknown;
  title?: unknown;
  description?: unknown;
  priority?: unknown;
  status?: unknown;
  assigned_to_agent_id?: unknown;
  created_by_agent_id?: unknown;
}

function normalizeToken(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function nonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function fishbowlTodoReleaseProtectedReason(
  todo: FishbowlTodoReleaseProtectionInput,
): string | null {
  const todoId = nonEmptyString(todo.id)?.toLowerCase();
  if (todoId && FISHBOWL_TODO_RELEASE_PROTECTED_IDS.has(todoId)) {
    return "canary_seed_protected";
  }

  const status = normalizeToken(todo.status);
  if (status === "human_blocker") return "human_blocker_protected";
  if (status === "manual_only") return "manual_only_protected";

  const owner =
    nonEmptyString(todo.assigned_to_agent_id) ??
    nonEmptyString(todo.created_by_agent_id);
  if (owner?.startsWith("human-")) return "human_owned_work_protected";

  const text = [todo.title, todo.description, todo.priority]
    .map((value) => String(value ?? "").toLowerCase())
    .join("\n");
  if (/\bhuman[_ -]?blocker\b/.test(text)) return "human_blocker_protected";
  if (/\bmanual[_ -]?only\b/.test(text)) return "manual_only_protected";
  if (/\bhuman[_ -]?owned\b/.test(text)) return "human_owned_work_protected";

  return null;
}
