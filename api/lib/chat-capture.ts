// ─── Chat auto-capture bridge ────────────────────────────────────────────────
//
// The chat-session write paths (api/chat-threads.ts append, api/chat.ts
// onFinish) persist turns to chat_thread_messages and mc_conversation_log via
// raw REST, which bypasses the two handlers where auto-capture is wired (the
// MCP log_conversation handler, and the legacy admin_conversation_turn_ingest
// hook from #1295). Result: pasted code and reference docs in the website chat
// never reach the mc_code_dumps / knowledge-library layers, even with the
// capture flags enabled.
//
// This bridge applies the SAME capture with the SAME guards as #1295:
//   - flag-gated: MEMORY_CODE_AUTOCAPTURE_ENABLED / MEMORY_LIBRARY_AUTOCAPTURE_ENABLED
//   - user-authored turns only (v1 capture policy, see auto-capture.ts)
//   - managed tenants only: BYOD accounts keep memory in their own Supabase,
//     so writing to the central mc_* tables would be the wrong store
//   - best-effort: a capture failure never breaks or delays the turn write

import { SupabaseBackend } from "../../packages/mcp-server/src/memory/supabase.js";
import {
  autoCaptureFromTurn,
  codeAutoCaptureEnabled,
  libraryAutoCaptureEnabled,
} from "../../packages/mcp-server/src/memory/auto-capture.js";

export async function captureFromChatTurn(opts: {
  supabaseUrl: string;
  serviceKey: string;
  ownerLane: string;
  threadId: string;
  role: string;
  content: string;
}): Promise<void> {
  try {
    if ((opts.role ?? "").trim().toLowerCase() !== "user") return;
    if (!opts.content || !opts.content.trim()) return;
    if (!codeAutoCaptureEnabled() && !libraryAutoCaptureEnabled()) return;

    // Managed tenants only: a memory_configs row for this lane means BYOD.
    const byodRes = await fetch(
      `${opts.supabaseUrl}/rest/v1/memory_configs?api_key_hash=eq.${encodeURIComponent(opts.ownerLane)}&select=id&limit=1`,
      {
        headers: {
          apikey: opts.serviceKey,
          Authorization: `Bearer ${opts.serviceKey}`,
        },
      },
    );
    if (byodRes.ok) {
      const rows = (await byodRes.json().catch(() => [])) as unknown[];
      if (Array.isArray(rows) && rows.length > 0) return;
    }

    const backend = new SupabaseBackend({
      url: opts.supabaseUrl,
      serviceRoleKey: opts.serviceKey,
      tenancy: { mode: "managed", apiKeyHash: opts.ownerLane },
    });
    await autoCaptureFromTurn(backend, {
      session_id: `chat:${opts.threadId}`,
      role: "user",
      content: opts.content,
    });
  } catch {
    // best-effort; capture must never break the chat write
  }
}
