// ============================================================
// Chat api-lane endpoint
//
// Streams a model reply on the user's OWN provider key, server-side.
// This endpoint serves the "api" seat lane ONLY. Local seats are browser
// direct and subscription seats run through Crews / MCP sampling, so
// both are rejected here.
//
// Security invariants (do not weaken):
//  - The caller authenticates in the Authorization header (a logged-in
//    session JWT, or a raw uc_/agt_ key). An OPTIONAL connector key may
//    arrive in the X-UnClick-Connector-Key header for connector access
//    only; it is validated to the SAME account lane before use and is
//    never logged. No raw key is ever read from the request BODY.
//  - The decrypted provider key lives only in this handler scope, is used
//    only for the upstream model call, and is never returned, logged,
//    streamed, or placed in process.env.
//  - When a thread_id is supplied, the caller must own that thread or be an
//    active room member before any provider call starts. Shared-room assistant
//    turns are stamped with the room owner's lane, matching chat-threads.ts.
//  - CORS is pinned to https://unclick.world.
//  - This endpoint does NOT inherit AI_CHAT_ENABLED; it is user-key
//    required by design and fails closed via the spend gate.
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  streamText,
  stepCountIs,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { resolveApiChatModel } from "./lib/chat-transport.js";
import {
  sha256hex,
  readProviderKey,
  readProviderKeyForAccount,
  type EncryptedCredential,
} from "./lib/chat-crypto.js";
import { decideChatProviderCall } from "./lib/chat-spend.js";
import { resolveAccountLane } from "./lib/account-lane.js";
import { fetchMemoryBlock, buildChatMemory } from "./lib/chat-memory.js";
import { buildChatTools, type ChatToolMode } from "./lib/chat-tools.js";
import { redactSensitive } from "./lib/orchestrator-context.js";

const MAX_STEPS = 10;

// Prepended to every seat so it knows it is running inside UnClick and treats
// the user's loaded memory as authoritative context (see fetchMemoryBlock).
function buildUnclickSeatPreamble(toolMode: ChatToolMode): string {
  const base =
    "You are an AI seat running inside UnClick, the user's AI operating system. " +
    "You are connected to the user's UnClick workspace, and the memory shown below is theirs: treat it as authoritative context about who they are, their standing rules, and what they are working on. " +
    "If asked whether you are connected to UnClick, the answer is yes - you are running inside their UnClick account with their memory loaded. " +
    "Use the memory naturally; do not recite it verbatim unless asked.\n\n" +
    "You have tools to read the user's UnClick memory and their connected apps. " +
    "Use search_memory to recall what the user told you before, and save_memory to remember new durable facts about them. " +
    "To use a connected app, use the chat tools exactly as named here: find_tools, tool_info, and call_tool. " +
    "First call find_tools to discover the relevant connector or integration tool (for example gmail, google-drive, dropbox, onedrive, higgsfield), then tool_info when you need details, then call_tool to run the endpoint. " +
    "If tool output mentions internal MCP names such as unclick_search, unclick_tool_info, or unclick_call, translate them to find_tools, tool_info, and call_tool; do not pass unclick_call as call_tool.endpoint_id. " +
    "Endpoint IDs may be dotted or snake-case; examples include gmail_search, gmail.search, drive_search, onedrive_list, dropbox_list_folder, and higgsfield_generate_image. ";

  const policy =
    toolMode === "build"
      ? "Build mode is active for this turn. You may use call_tool for read/list/search/get/status endpoints and for non-destructive create/write/generate endpoints when the user's request clearly asks for it. Sends, deletes, payments, merges, deploys, permission changes, and other high-risk actions are still blocked until the approval layer exists. "
      : "Read-first mode is active for this turn. Do not attempt to send, create, update, delete, generate, or mutate anything in a connected app; call_tool will refuse those actions. ";

  return (
    base +
    policy +
    "Never fabricate tool results: if a tool returns a 'tool error' or empty result, tell the user plainly that the tool failed instead of inventing an answer."
  );
}

// ─── pure, testable helpers ──────────────────────────────────────

// Extract a valid UnClick api key from the Authorization header. Returns
// null for anything that is not a Bearer uc_/agt_ token.
export function extractApiKey(authHeader: string | undefined): string | null {
  if (!authHeader) return null;
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token.startsWith("uc_") && !token.startsWith("agt_")) return null;
  return token;
}

// Extract an OPTIONAL connector key from the dedicated header. The website
// authenticates chat with the logged-in session JWT and sends the user's cached
// uc_/agt_ key here purely so the seat can reach connected apps. It is validated
// to the caller's lane before use (see handler) and never logged. Returns null
// for a missing or non-uc_/agt_ value.
export function extractConnectorKeyHeader(
  headerValue: string | string[] | undefined,
): string | null {
  const raw = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  const token = (raw ?? "").trim();
  if (!token.startsWith("uc_") && !token.startsWith("agt_")) return null;
  return token;
}

function cleanVercelHost(vercelUrl: string | undefined): string | null {
  const raw = (vercelUrl ?? "").trim();
  if (!raw) return null;
  const host = raw
    .replace(/^https?:\/\//i, "")
    .split(/[/?#]/)[0]
    .split(":")[0]
    .toLowerCase();
  return host.endsWith(".vercel.app") ? host : null;
}

// Derive the internal /api/mcp origin from the trusted request host, pinned to
// known UnClick hosts. On Vercel the platform sets `host`, but pinning is
// defense-in-depth: a forged Host header can never redirect the internal
// connector call (which carries the user's key) to an attacker origin. Preview
// deployments are allowed only when the host exactly matches VERCEL_URL.
// An unrecognized host yields "" so connectors are simply disabled (memory +
// chat keep working) rather than calling out to an untrusted destination.
export function safeInternalOrigin(
  host: string | undefined,
  vercelUrl = process.env.VERCEL_URL,
): string {
  const raw = (host ?? "").trim();
  if (!raw || !/^[A-Za-z0-9.-]+(?::\d+)?$/.test(raw)) return "";
  const hostname = raw.split(":")[0].toLowerCase();
  const previewHost = cleanVercelHost(vercelUrl);
  const allowed =
    hostname === "unclick.world" ||
    hostname.endsWith(".unclick.world") ||
    (previewHost !== null && hostname === previewHost);
  return allowed ? `https://${raw}` : "";
}

export interface ChatRequest {
  slug: string;
  model: string;
  messages: UIMessage[];
  system?: string;
  thread_id?: string;
  tool_mode?: ChatToolMode;
  council_seats?: Array<{
    slug: string;
    model: string;
    label: string;
    handle: string;
  }>;
}

// Validate the request body. This endpoint is api-lane only; local and
// subscription are rejected with a clear pointer to the right path.
export function validateChatRequest(
  body: unknown,
): { error: string } | ChatRequest {
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
  if (!Array.isArray(b.messages) || b.messages.length === 0)
    return { error: "messages is required" };

  const out: ChatRequest = { slug, model, messages: b.messages as UIMessage[] };
  if (typeof b.system === "string") out.system = b.system;
  if (typeof b.thread_id === "string") out.thread_id = b.thread_id;
  if (b.tool_mode === "build") out.tool_mode = "build";
  else out.tool_mode = "read";
  if (Array.isArray(b.council_seats)) {
    out.council_seats = b.council_seats
      .map((raw) => {
        const seat = (raw ?? {}) as Record<string, unknown>;
        return {
          slug: typeof seat.slug === "string" ? seat.slug.trim().slice(0, 80) : "",
          model: typeof seat.model === "string" ? seat.model.trim().slice(0, 200) : "",
          label: typeof seat.label === "string" ? seat.label.trim().slice(0, 120) : "",
          handle: typeof seat.handle === "string" ? seat.handle.trim().slice(0, 80) : "",
        };
      })
      .filter((seat) => seat.slug && seat.model)
      .slice(0, 8);
  }
  return out;
}

function providerDisplayName(slug: string): string {
  const known: Record<string, string> = {
    openrouter: "OpenRouter",
    openai: "OpenAI",
    anthropic: "Anthropic",
    google: "Google AI",
    groq: "Groq",
    mistral: "Mistral",
    together: "Together AI",
    xai: "xAI",
    deepseek: "DeepSeek",
    "z-ai": "Z.ai",
    z_ai: "Z.ai",
    zai: "Z.ai",
  };
  return known[slug] ?? slug.replace(/[-_]/g, " ");
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

interface ThreadOwnerRow {
  id: string;
  api_key_hash: string;
}

interface ThreadMemberRow {
  id: string;
}

function sbHeaders(serviceKey: string): Record<string, string> {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

// Resolve the canonical lane used to persist assistant turns. The model
// endpoint receives thread_id from the browser, so it must re-check room access
// itself instead of trusting the earlier human-message append request.
export async function resolveThreadPersistenceLane(
  supabaseUrl: string,
  serviceKey: string,
  threadId: string,
  callerLane: string,
): Promise<string | null> {
  const rest = `${supabaseUrl}/rest/v1`;
  const ownerRes = await fetch(
    `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}&select=id,api_key_hash&limit=1`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!ownerRes.ok) return null;

  const owners = (await ownerRes.json().catch(() => [])) as ThreadOwnerRow[];
  const ownerLane = Array.isArray(owners) ? owners[0]?.api_key_hash : null;
  if (!ownerLane) return null;
  if (ownerLane === callerLane) return ownerLane;

  const memberRes = await fetch(
    `${rest}/chat_room_members?thread_id=eq.${encodeURIComponent(threadId)}` +
      `&member_lane_hash=eq.${encodeURIComponent(callerLane)}` +
      `&status=eq.active&select=id&limit=1`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!memberRes.ok) return null;

  const members = (await memberRes.json().catch(() => [])) as ThreadMemberRow[];
  return Array.isArray(members) && members.length > 0 ? ownerLane : null;
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
    const safeContent = redactSensitive(opts.content);
    if (!safeContent.trim()) return;
    const saved = await fetch(`${opts.supabaseUrl}/rest/v1/chat_thread_messages`, {
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
    if (!saved.ok) return;
    await fetch(`${opts.supabaseUrl}/rest/v1/mc_conversation_log`, {
      method: "POST",
      headers: {
        apikey: opts.serviceKey,
        Authorization: `Bearer ${opts.serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        api_key_hash: opts.apiKeyHash,
        session_id: `chat:${opts.threadId}`,
        role: "assistant",
        content: safeContent,
        has_code: /```/.test(opts.content),
        tokens_estimated: (opts.tokensIn ?? 0) + (opts.tokensOut ?? 0) || null,
      }),
    }).catch(() => {});
  } catch {
    // best effort
  }
}

// ─── handler ────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, X-UnClick-Connector-Key",
  );
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST required" });

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
  const lane = await resolveAccountLane(
    req.headers.authorization,
    supabaseUrl,
    serviceKey,
  );
  if (!lane) return res.status(401).json({ error: "Sign in to chat." });
  const apiKeyHash = lane;

  const threadPersistenceLane = parsed.thread_id
    ? await resolveThreadPersistenceLane(
        supabaseUrl,
        serviceKey,
        parsed.thread_id,
        lane,
      )
    : null;
  if (parsed.thread_id && !threadPersistenceLane) {
    return res.status(403).json({ error: "Not a member of this chat room." });
  }

  // Read and decrypt the provider key. Prefer the account-scoped (server-scheme)
  // row, which survives rotation and needs only a session. Fall back to a legacy
  // master-key-encrypted row when the caller sent a uc_/agt_ key.
  // Fallback to a V2 name so a typo or stray character in the original env var
  // name can be sidestepped without another code change.
  const aiSecret =
    process.env.UNCLICK_AI_KEY_SECRET || process.env.UNCLICK_AI_KEY_SECRET_V2;
  let providerKey: string | null = null;
  if (aiSecret) {
    try {
      const row = await fetchServerVaultRow(
        supabaseUrl,
        serviceKey,
        lane,
        parsed.slug,
      );
      if (row) providerKey = readProviderKeyForAccount(aiSecret, lane, row);
    } catch {
      providerKey = null;
    }
  }
  if (!providerKey) {
    const apiKey = extractApiKey(req.headers.authorization);
    if (apiKey) {
      try {
        const row = await fetchVaultRow(
          supabaseUrl,
          serviceKey,
          sha256hex(apiKey),
          parsed.slug,
        );
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
    const label = providerDisplayName(parsed.slug);
    return res.status(403).json({
      error: "provider_key_missing",
      provider: parsed.slug,
      message: `${label} is not connected for this account yet. Add its API key, or choose a connected seat.`,
    });
  }

  let model: ReturnType<typeof resolveApiChatModel>;
  try {
    model = resolveApiChatModel({
      slug: parsed.slug,
      model: parsed.model,
      apiKey: providerKey,
    });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }

  const modelMessages = await convertToModelMessages(parsed.messages);

  // Ground the seat in the user's UnClick memory. Best-effort: a memory hiccup
  // returns "" and the chat proceeds with the preamble + any client system text.
  const memoryBlock = await fetchMemoryBlock(
    supabaseUrl,
    serviceKey,
    apiKeyHash,
  );
  const groundedSystem = [
    buildUnclickSeatPreamble(parsed.tool_mode ?? "read"),
    memoryBlock ? `The user's UnClick memory:\n\n${memoryBlock}` : "",
    parsed.council_seats && parsed.council_seats.length > 1
      ? [
          "Council mode is active for this turn.",
          "The user selected these AI seats:",
          ...parsed.council_seats.map(
            (seat, index) =>
              `${index + 1}. ${seat.label || seat.model} (@${seat.handle || seat.slug}) - ${seat.slug}/${seat.model}`,
          ),
          "Answer as the council's synthesis: briefly surface meaningful agreement or dissent when it changes the recommendation, then give one clear final answer. Do not pretend you literally called separate models unless tool output or system context proves that.",
        ].join("\n")
      : "",
    parsed.system ?? "",
  ]
    .filter(Boolean)
    .join("\n\n");

  // Build the chat tool surface.
  //  - Memory tools run DIRECTLY against the caller's lane-scoped backend, so
  //    they work on the logged-in session alone (no cached key needed).
  //  - Connector tools need the user's raw uc_/agt_ key (connector creds are
  //    zero-knowledge; a session JWT cannot decrypt them). We accept an OPTIONAL
  //    connector key - from the Authorization header when the caller authed with
  //    a key, else from X-UnClick-Connector-Key - and use it ONLY after it
  //    resolves to the SAME account lane (proof of possession; a stale or
  //    cross-account key is ignored and connectors degrade gracefully).
  // The origin for the internal /api/mcp call is the trusted request host
  // (never user body input), pinned to known UnClick hosts as defense-in-depth.
  const origin = safeInternalOrigin(req.headers.host);

  let connectorKey = extractApiKey(req.headers.authorization);
  if (!connectorKey) {
    const headerKey = extractConnectorKeyHeader(
      req.headers["x-unclick-connector-key"],
    );
    if (headerKey) {
      const keyLane = await resolveAccountLane(
        `Bearer ${headerKey}`,
        supabaseUrl,
        serviceKey,
      );
      if (keyLane && keyLane === lane) connectorKey = headerKey;
    }
  }

  const chatTools = buildChatTools({
    origin,
    connectorKey: origin ? connectorKey : null,
    memory: buildChatMemory(supabaseUrl, serviceKey, apiKeyHash),
    toolMode: parsed.tool_mode ?? "read",
  });

  const result = streamText({
    model,
    system: groundedSystem,
    messages: modelMessages,
    tools: chatTools,
    stopWhen: stepCountIs(MAX_STEPS),
    onError({ error }) {
      // Log the error shape only - never the key, the body, or the prompt.
      console.error(
        "chat stream error:",
        error instanceof Error ? error.message : "unknown",
      );
    },
    onFinish({ text, usage }) {
      if (!parsed.thread_id) return;
      const u = usage as
        | {
            inputTokens?: number;
            outputTokens?: number;
            promptTokens?: number;
            completionTokens?: number;
          }
        | undefined;
      void persistAssistantTurn({
        supabaseUrl,
        serviceKey,
        apiKeyHash: threadPersistenceLane ?? apiKeyHash,
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
