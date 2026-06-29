// ─── Chat memory grounding ───────────────────────────────────────────────────
//
// Loads a compact, prompt-ready block of the caller's UnClick memory (identity,
// standing rules, current focus, durable facts) so a chat seat is grounded in
// the user's UnClick context instead of answering like a blank model.
//
// Tenancy: scoped to the resolved account hash (lane_hash ?? key_hash) - the
// SAME key memory-admin uses - by constructing the managed Supabase backend
// directly with that hash. No global env mutation, no cross-tenant risk.
//
// Best-effort: any failure returns "" so a memory hiccup never blocks the chat.

import { SupabaseBackend } from "../../packages/mcp-server/src/memory/supabase.js";

interface StartupContext {
  business_context?: Array<{ category?: string; key?: string; value?: unknown }>;
  profile_card?: {
    profile_summary?: string[];
    working_now?: string[];
    do_not_repeat?: string[];
    timezone_context?: string;
  };
  active_facts?: Array<{ fact?: string; category?: string }>;
}

function cap(value: unknown, max: number): string {
  const s = typeof value === "string" ? value : JSON.stringify(value ?? "");
  return s.length > max ? `${s.slice(0, max - 1)}...` : s;
}

/**
 * Build a markdown memory block (<= maxChars) for the account, or "" when there
 * is nothing useful or the lookup fails. Never throws.
 */
export async function fetchMemoryBlock(
  supabaseUrl: string,
  serviceKey: string,
  apiKeyHash: string,
  maxChars = 2500,
): Promise<string> {
  try {
    const backend = new SupabaseBackend({
      url: supabaseUrl,
      serviceRoleKey: serviceKey,
      tenancy: { mode: "managed", apiKeyHash },
    });
    const raw = (await backend.getStartupContext(3)) as StartupContext | null;
    if (!raw || typeof raw !== "object") return "";

    const lines: string[] = [];

    const rules = (raw.business_context ?? []).slice(0, 8);
    if (rules.length > 0) {
      lines.push("## Standing rules");
      for (const r of rules) {
        lines.push(`- [${r.category ?? "rule"}] ${r.key ?? ""}: ${cap(r.value, 200)}`);
      }
    }

    const card = raw.profile_card;
    if (card) {
      const profile = (card.profile_summary ?? []).slice(0, 8);
      if (card.timezone_context || profile.length > 0) {
        lines.push("", "## Profile");
        if (card.timezone_context) lines.push(`- ${cap(card.timezone_context, 200)}`);
        for (const item of profile) lines.push(`- ${cap(item, 200)}`);
      }
      const avoid = (card.do_not_repeat ?? []).slice(0, 6);
      if (avoid.length > 0) {
        lines.push("", "## Do not repeat");
        for (const item of avoid) lines.push(`- ${cap(item, 160)}`);
      }
      const workingNow = (card.working_now ?? []).slice(0, 6);
      if (workingNow.length > 0) {
        lines.push("", "## Working now");
        for (const item of workingNow) lines.push(`- ${cap(item, 200)}`);
      }
    }

    const facts = (raw.active_facts ?? []).slice(0, 12);
    if (facts.length > 0) {
      lines.push("", "## Durable facts");
      for (const f of facts) {
        if (f.fact) lines.push(`- [${f.category ?? "general"}] ${cap(f.fact, 200)}`);
      }
    }

    // Enforce the budget by dropping whole trailing lines (keeps valid markdown).
    const block: string[] = [];
    let used = 0;
    for (const line of lines) {
      if (used + line.length + 1 > maxChars) break;
      block.push(line);
      used += line.length + 1;
    }
    return block.join("\n").trim();
  } catch {
    return "";
  }
}
