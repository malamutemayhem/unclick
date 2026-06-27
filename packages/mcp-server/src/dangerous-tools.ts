// Dangerous tool classification for security gating.
// Modeled on OpenClaw's layered tool-policy approach: some tools should
// never be exposed over HTTP gateways, others require owner-level auth.
// This keeps the classification centralized so security audits and
// gateway restrictions stay in sync.

export const DANGEROUS_TOOL_TAGS = {
  exec: "command_execution",
  fs_write: "filesystem_mutation",
  fs_delete: "filesystem_mutation",
  shell: "command_execution",
  spawn: "process_control",
  admin_wipe: "data_destruction",
  hard_forget: "data_destruction",
} as const;

export type DangerTag = (typeof DANGEROUS_TOOL_TAGS)[keyof typeof DANGEROUS_TOOL_TAGS];

// Tools that must NEVER be callable over unauthenticated HTTP surfaces.
export const HTTP_DENY_LIST: ReadonlySet<string> = new Set([
  "exec",
  "spawn",
  "shell",
  "fs_write",
  "fs_delete",
  "fs_move",
  "admin_wipe",
  "hard_forget",
  "gateway_restart",
]);

// Tools that require verified owner identity even on authenticated surfaces.
export const OWNER_ONLY_TOOLS: ReadonlySet<string> = new Set([
  "admin_wipe",
  "hard_forget",
  "gateway_restart",
  "save_identity",
]);

// High-cost tools that should be gated behind spend confirmation.
export const SPEND_GATED_TOOLS: ReadonlySet<string> = new Set([
  "anthropic_create_message",
  "openai_chat_completion",
  "openai_generate_image",
  "elevenlabs_text_to_speech",
  "stability_text_to_image",
  "stability_image_to_image",
  "replicate_create_prediction",
  "runway_generate_video",
  "pika_generate_video",
  "kling_generate_video",
  "higgsfield_generate_video",
  "higgsfield_generate_image",
  "heygen_create_avatar_video",
]);

export function isDangerousTool(toolName: string): boolean {
  return HTTP_DENY_LIST.has(toolName);
}

export function isOwnerOnly(toolName: string): boolean {
  return OWNER_ONLY_TOOLS.has(toolName);
}

export function isSpendGated(toolName: string): boolean {
  return SPEND_GATED_TOOLS.has(toolName);
}

export function getDangerTag(toolName: string): DangerTag | undefined {
  return (DANGEROUS_TOOL_TAGS as Record<string, DangerTag>)[toolName];
}

// Given a list of requested tools and an access level, return which
// tools should be filtered out and why.
export function filterByAccess(
  toolNames: string[],
  access: { isOwner: boolean; isHttp: boolean },
): { allowed: string[]; denied: Array<{ tool: string; reason: string }> } {
  const allowed: string[] = [];
  const denied: Array<{ tool: string; reason: string }> = [];

  for (const name of toolNames) {
    if (access.isHttp && HTTP_DENY_LIST.has(name)) {
      denied.push({ tool: name, reason: "blocked over HTTP" });
    } else if (OWNER_ONLY_TOOLS.has(name) && !access.isOwner) {
      denied.push({ tool: name, reason: "requires owner access" });
    } else {
      allowed.push(name);
    }
  }

  return { allowed, denied };
}
