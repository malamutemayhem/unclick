// ============================================================
// Chat api-lane endpoint
//
// Streams a model reply on the user's OWN provider key, server-side.
// This endpoint serves the "api" seat lane ONLY. Local seats are browser
// direct and subscription seats run through Crews / MCP sampling, so
// both are rejected here.
//
// Security invariants (do not weaken):
//  - The raw UnClick api key arrives in the Authorization header, never
//    the body, and is never logged.
//  - The decrypted provider key lives only in this handler scope, is used
//    only for the upstream model call, and is never returned, logged,
//    streamed, or placed in process.env.
//  - CORS is pinned to https://unclick.world.
//  - This endpoint does NOT inherit AI_CHAT_ENABLED; it is user-key
//    required by design and fails closed via the spend gate.
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { streamText, stepCountIs, convertToModelMessages, type UIMessage } from "ai";
import { resolveApiChatModel } from "./lib/chat-transport.js";
import { sha256hex, readProviderKey, readProviderKeyForAccount, type EncryptedCredential } from "./lib/chat-crypto.js";
import { decideChatProviderCall } from "./lib/chat-spend.js";
import { resolveAccountLane } from "./lib/account-lane.js";
import { fetchMemoryBlock } from "./lib/chat-memory.js";

const MAX_STEPS = 5;

// Prepended to every seat so it knows it is running inside UnClick and treats
// the user's loaded memory as authoritative context (see fetchMemoryBlock).
const UNCLICK_SEAT_PREAMBLE =
  "You are an AI seat running inside UnClick, the user's AI operating system. " +
  "You are connected to the user's UnClick workspace, and the memory shown below is theirs: treat it as authoritative context about who they are, their standing rules, and what they are working on. " +
  "If asked whether you are connected to UnClick, the answer is yes - you are running inside their UnClick account with their memory loaded. " +
  "Use the memory naturally; do not recite it verbatim unless asked.";

// ─── pure, testable helpers ──────────────────────────────────────

// Extract a valid UnClick api key from the Authorization header. Returns
// null for anything that is not a Bearer uc_/agt_ token.
export function extractApiKey(authHeader: string | undefined): string | null {
  if (!authHeader) return null;
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token.startsWith("uc_") && !token.startsWith("agt_")) return null;
  return token;
}

export interface ChatRequest {
  slug: string;
  model: string;
  messages: UIMessage[];
  system?: string;
  thread_id?: string;
}

// Validate the request body. This endpoint is api-lane only; local and
// subscription are rejected with a clear pointer to the right path.
export function validateChatRequest(body: unknown): { error: string } | ChatRequest {
  const b = (body ?? {}) as Record<string, unknown>;
  const lane = typeof b.lane === "string" ? b.lane : "api";
  if (lane !== "api") {
    return {
      error:
        "This endpoint serves the api lane only. Local seats run in the browser; subscription seats run through Crews.",
    };
  }
  const slug = typeof b.slug === "string" ? b.slug.trim() : "";
  const model = typeof b.model === "string" ? b.model.trim() : "";
  if (!slug) return { error: "slug is required" };
  if (!model) return { error: "model is required" };
  if (!Array.isArray(b.messages) || b.messages.length === 0) return { error: "messages is required" };

  const out: ChatRequest = { slug, model, messages: b.messages as UIMessage[] };
  if (typeof b.system === "string") out.system = b.system;
  if (typeof b.thread_id === "string") out.thread_id = b.thread_id;
  return out;
}

// ─── supabase REST (service role) ────────────────────────────────

async function fetchVaultRow(
  supabaseUrl: string,
  serviceKey: string,
  apiKeyHash: string,
  slug: string,
): Promise<EncryptedCredential | null> {
  const url =
    `${supabaseUrl}/rest/v1/user_credentials` +
    `?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}` +
    `&platform_slug=eq.${encodeURIComponent(slug)}` +
    `&select=encryption_iv,encryption_tag,encrypted_data,encryption_salt` +
    `&order=label.asc.nullsfirst&limit=1`;
  const r = await fetch(url, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!r.ok) return null;
  const rows = (await r.json()) as EncryptedCredential[] | null;
  return rows && rows.length > 0 ? rows[0] : null;
}

// Account-scoped (server-scheme) provider key row: lane-scoped and decryptable
// with the server secret, so it survives master-key rotation and needs only a
// logged-in session.
async function fetchServerVaultRow(
  supabaseUrl: string,
  serviceKey: string,
  laneHash: string,
  slug: string,
): Promise<EncryptedCredential | null> {
  const url =
    `${supabaseUrl}/rest/v1/user_credentials` +
    `?lane_hash=eq.${encodeURIComponent(laneHash)}` +
    `&enc_scheme=eq.server` +
    `&platform_slug=eq.${encodeURIComponent(slug)}` +
    `&select=encryption_iv,encryption_tag,encrypted_data,encryption_salt` +
    `&order=label.asc.nullsfirst&limit=1`;
  const r = await fetch(url, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!r.ok) return null;
  const rows = (await r.json()) as EncryptedCredential[] | null;
  return rows && rows.length > 0 ? rows[0] : null;
}

// Best-effort: record the assistant turn so the Orchestrator feed and the
// per-model token meter have data. Never breaks the stream on failure.
async function persistAssistantTurn(opts: {
  supabaseUrl: string;
  serviceKey: string;
  apiKeyHash: string;
  threadId: string;
  slug: string;
  model: string;
  content: string;
  tokensIn: number | null;
  tokensOut: number | null;
}): Promise<void> {
  try {
    await fetch(`${opts.supabaseUrl}/rest/v1/chat_thread_messages`, {
      method: "POST",
      headers: {
        apikey: opts.serviceKey,
        Authorization: `Bearer ${opts.serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        api_key_hash: opts.apiKeyHash,
        thread_id: opts.threadId,
        sender_id: opts.slug,
        sender_kind: "agent",
        seat_lane: "api",
        model: opts.model,
        content: opts.content,
        status: "complete",
        tokens_in: opts.tokensIn,
        tokens_out: opts.tokensOut,
      }),
    });
  } catch {
    // best effort
  }
}

// ─── handler ────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: "Server not configured." });
  }

  const parsed = validateChatRequest(req.body);
  if ("error" in parsed) return res.status(400).json({ error: parsed.error });

  // Resolve the caller to their STABLE account lane from either a logged-in
  // session JWT or a uc_/agt_ key. AI provider keys are account-scoped, so a
  // logged-in session is enough and master-key rotation has no effect.
  const lane = await resolveAccountLane(req.headers.authorization, supabaseUrl, serviceKey);
  if (!lane) return res.status(401).json({ error: "Sign in to chat." });
  const apiKeyHash = lane;

  // Read and decrypt the provider key. Prefer the account-scoped (server-scheme)
  // row, which survives rotation and needs only a session. Fall back to a legacy
  // master-key-encrypted row when the caller sent a uc_/agt_ key.
  // Fallback to a V2 name so a typo or stray character in the original env var
  // name can be sidestepped without another code change.
  const aiSecret = process.env.UNCLICK_AI_KEY_SECRET || process.env.UNCLICK_AI_KEY_SECRET_V2;
  let providerKey: string | null = null;
  if (aiSecret) {
    try {
      const row = await fetchServerVaultRow(supabaseUrl, serviceKey, lane, parsed.slug);
      if (row) providerKey = readProviderKeyForAccount(aiSecret, lane, row);
    } catch {
      providerKey = null;
    }
  }
  if (!providerKey) {
    const apiKey = extractApiKey(req.headers.authorization);
    if (apiKey) {
      try {
        const row = await fetchVaultRow(supabaseUrl, serviceKey, sha256hex(apiKey), parsed.slug);
        if (row) providerKey = readProviderKey(apiKey, row);
      } catch {
        providerKey = null;
      }
    }
  }

  const decision = decideChatProviderCall({
    lane: "api",
    slug: parsed.slug,
    hasVaultKey: Boolean(providerKey),
  });
  if (!decision.allowed || !providerKey) {
    return res.status(403).json({ error: decision.reason });
  }

  let model: ReturnType<typeof resolveApiChatModel>;
  try {
    model = resolveApiChatModel({ slug: parsed.slug, model: parsed.model, apiKey: providerKey });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }

  const modelMessages = await convertToModelMessages(parsed.messages);

  // Ground the seat in the user's UnClick memory. Best-effort: a memory hiccup
  // returns "" and the chat proceeds with the preamble + any client system text.
  const memoryBlock = await fetchMemoryBlock(supabaseUrl, serviceKey, apiKeyHash);
  const groundedSystem = [
    UNCLICK_SEAT_PREAMBLE,
    memoryBlock ? `The user's UnClick memory:\n\n${memoryBlock}` : "",
    parsed.system ?? "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const result = streamText({
    model,
    system: groundedSystem,
    messages: modelMessages,
    stopWhen: stepCountIs(MAX_STEPS),
    onError({ error }) {
      // Log the error shape only - never the key, the body, or the prompt.
      console.error("chat stream error:", error instanceof Error ? error.message : "unknown");
    },
    onFinish({ text, usage }) {
      if (!parsed.thread_id) return;
      const u = usage as
        | { inputTokens?: number; outputTokens?: number; promptTokens?: number; completionTokens?: number }
        | undefined;
      void persistAssistantTurn({
        supabaseUrl,
        serviceKey,
        apiKeyHash,
        threadId: parsed.thread_id,
        slug: parsed.slug,
        model: parsed.model,
        content: text,
        tokensIn: u?.inputTokens ?? u?.promptTokens ?? null,
        tokensOut: u?.outputTokens ?? u?.completionTokens ?? null,
      });
    },
  });

  result.pipeUIMessageStreamToResponse(res);
}
