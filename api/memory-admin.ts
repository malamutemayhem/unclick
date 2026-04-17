/**
 * UnClick Memory Admin - Vercel serverless function
 *
 * Route: GET|POST|DELETE /api/memory-admin?action=<action>&...
 *
 * Admin actions (read/write the 6 memory layers):
 *   - status: Returns counts per layer + decay tier distribution
 *   - business_context: Returns all business context entries
 *   - sessions: Returns recent session summaries (limit param)
 *   - facts: Returns extracted facts with optional search (query param)
 *   - library: Returns knowledge library index
 *   - library_doc: Returns full document by slug (slug param)
 *   - conversations: Returns conversation log for a session (session_id param)
 *   - code: Returns code dumps (session_id param optional)
 *   - search: Full-text search across conversation logs (query param)
 *   - delete_fact: Archive a fact by ID (fact_id, POST)
 *   - delete_session: DELETE a session summary by ID (session_id, POST)
 *   - update_business_context: Upsert a business context entry (POST)
 *
 * BYOD / wizard actions (control plane, keyed by UnClick API key):
 *   - setup: POST with { api_key, service_role_key, supabase_url?, email? }
 *            Validates + JWT-decodes the URL, installs schema via exec_sql
 *            RPC, and stores encrypted creds
 *   - setup_status: GET ?api_key=... — returns whether cloud memory is on
 *   - disconnect: DELETE ?api_key=... — removes a user's memory config
 *   - config: GET with Bearer <api_key> — MCP fetches decrypted creds
 *   - device_check: POST with Bearer <api_key> + fingerprint — heartbeat
 *                   + nudge signal
 *   - list_devices: GET with Bearer <api_key>
 *   - remove_device: DELETE ?fingerprint=... with Bearer (or ?dismiss=1)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { streamText, convertToModelMessages, type UIMessage, type ModelMessage } from "ai";
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// ─── Crypto helpers (mirror /api/credentials) ──────────────────────────────

const PBKDF2_ITERATIONS = 100_000;
const KEY_BYTES = 32;
const IV_BYTES = 12;
const SALT_BYTES = 32;

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function deriveKey(apiKey: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(apiKey, salt, PBKDF2_ITERATIONS, KEY_BYTES, "sha256");
}

function encryptString(plaintext: string, key: Buffer) {
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    authTag: cipher.getAuthTag().toString("hex"),
    ciphertext: enc.toString("hex"),
  };
}

function decryptString(iv: string, authTag: string, ciphertext: string, key: Buffer): string {
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "hex")),
    decipher.final(),
  ]).toString("utf8");
}

/** Decode a Supabase service_role JWT and return the project ref. */
function decodeProjectRef(jwt: string): string | null {
  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const payload = JSON.parse(Buffer.from(padded, "base64").toString("utf8")) as {
      ref?: string;
      role?: string;
    };
    if (payload.role !== "service_role") return null;
    return payload.ref ?? null;
  } catch {
    return null;
  }
}

/** Load the bundled memory schema SQL. */
function loadSchemaSql(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.join(here, "..", "packages", "memory-mcp", "schema.sql"),
    path.join(here, "..", "..", "packages", "memory-mcp", "schema.sql"),
    path.join(process.cwd(), "packages", "memory-mcp", "schema.sql"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return fs.readFileSync(p, "utf8");
  }
  return "";
}

/** Try to install the memory schema via the user's Supabase exec_sql RPC. */
async function installSchema(supabaseUrl: string, serviceRoleKey: string): Promise<boolean> {
  const sql = loadSchemaSql();
  if (!sql) return false;
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Probe whether the schema is live. */
async function verifySchema(supabaseUrl: string, serviceRoleKey: string): Promise<boolean> {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/business_context?select=id&limit=1`, {
      headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

function bearerFrom(req: VercelRequest): string {
  return (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
}

// ─── AI chat helpers ───────────────────────────────────────────────────────

type ChatProvider = "google" | "openai" | "anthropic";

function deriveAiKeyEncryptionKey(): Buffer | null {
  const secret = process.env.AI_KEY_ENCRYPTION_SECRET;
  if (!secret) return null;
  return crypto.createHash("sha256").update(secret).digest();
}

function decryptAiApiKey(payload: string | null | undefined): string | null {
  if (!payload) return null;
  const key = deriveAiKeyEncryptionKey();
  if (!key) return payload; // stored plaintext fallback
  try {
    const buf = Buffer.from(payload, "base64");
    if (buf.length < IV_BYTES + 16 + 1) return null;
    const iv = buf.subarray(0, IV_BYTES);
    const authTag = buf.subarray(buf.length - 16);
    const ciphertext = buf.subarray(IV_BYTES, buf.length - 16);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
  } catch {
    return null;
  }
}

async function normaliseChatMessages(
  raw: unknown,
): Promise<ModelMessage[] | { error: string }> {
  if (!Array.isArray(raw)) return { error: "messages must be an array" };
  if (raw.length === 0) return { error: "messages cannot be empty" };

  // useChat v6 sends UIMessage[] with `parts`. Simple clients send `content`.
  const looksLikeUiMessages = raw.every(
    (m) => m && typeof m === "object" && Array.isArray((m as { parts?: unknown }).parts),
  );

  if (looksLikeUiMessages) {
    try {
      return await convertToModelMessages(raw as UIMessage[]);
    } catch (err) {
      return { error: `Invalid UI messages: ${(err as Error).message}` };
    }
  }

  const out: ModelMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return { error: "Invalid message shape" };
    const role = (m as { role?: string }).role;
    const content = (m as { content?: string }).content;
    if (role !== "user" && role !== "assistant" && role !== "system") {
      return { error: `Invalid role: ${String(role)}` };
    }
    if (typeof content !== "string") return { error: "content must be a string" };
    out.push({ role, content } as ModelMessage);
  }
  return out;
}

// Use `any` here because the supabase-js SupabaseClient default-typed generics
// conflict with `ReturnType<typeof createClient>` between versions.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function buildAiChatContext(supabase: any): Promise<{
  businessContext: unknown[];
  standingRules: unknown[];
  facts: unknown[];
  sessions: unknown[];
}> {
  const [bcRes, factsRes, sessionsRes] = await Promise.all([
    supabase.from("business_context").select("*").order("priority", { ascending: false }),
    supabase
      .from("extracted_facts")
      .select("id, fact, category, decay_tier, created_at")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("session_summaries")
      .select("id, summary, topics, open_loops, decisions, platform, created_at")
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  const businessContext = (bcRes.data ?? []) as Array<{ category?: string }>;
  const standingRules = businessContext.filter((r) => r.category === "standing_rules");

  return {
    businessContext,
    standingRules,
    facts: (factsRes.data ?? []) as unknown[],
    sessions: (sessionsRes.data ?? []) as unknown[],
  };
}

async function resolveAiChatModel(opts: {
  provider: ChatProvider;
  model: string;
  userApiKey: string | null;
}) {
  const fallbackKey = process.env.AI_CHAT_DEFAULT_KEY ?? undefined;
  const apiKey = opts.userApiKey ?? fallbackKey;

  if (opts.provider === "google") {
    const { createGoogleGenerativeAI } = await import("@ai-sdk/google");
    const g = createGoogleGenerativeAI({ apiKey });
    return g(opts.model);
  }
  if (opts.provider === "openai") {
    const { createOpenAI } = await import("@ai-sdk/openai");
    const o = createOpenAI({ apiKey });
    return o(opts.model);
  }
  if (opts.provider === "anthropic") {
    const { createAnthropic } = await import("@ai-sdk/anthropic");
    const a = createAnthropic({ apiKey });
    return a(opts.model);
  }
  throw new Error(`Unsupported provider: ${opts.provider}`);
}

const DEFAULT_AI_CHAT_SYSTEM_PROMPT = `You are the UnClick AI Assistant for this workspace. You have access to this user's full business context and memory. Answer questions about their data, help them understand their setup, and suggest improvements.

You are NOT a general-purpose AI. You specifically help with:
- Answering questions about their business context, facts, and session history
- Explaining what UnClick Memory contains and how it is being used
- Suggesting improvements to their memory configuration
- Summarizing recent session activity
- Helping draft or refine standing rules and business context entries

RULES:
- Be concise. This is an admin tool, not a conversation.
- Reference specific facts, sessions, or context entries when answering.
- If you do not have enough context to answer, say so. Do not make things up.
- If the user asks about something outside their UnClick data, politely redirect.
- No em dashes. Use -- instead.`;

// ─── Handler ───────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Database service unavailable" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const action = (req.query.action as string) || "status";

  try {
    switch (action) {
      case "status": {
        const [bc, lib, sessions, facts, convos, code] = await Promise.all([
          supabase.from("business_context").select("id", { count: "exact", head: true }),
          supabase.from("knowledge_library").select("id", { count: "exact", head: true }),
          supabase.from("session_summaries").select("id", { count: "exact", head: true }),
          supabase.from("extracted_facts").select("id", { count: "exact", head: true }),
          supabase.from("conversation_log").select("id", { count: "exact", head: true }),
          supabase.from("code_dumps").select("id", { count: "exact", head: true }),
        ]);

        // Decay tier distribution from facts
        const { data: factsTiers } = await supabase
          .from("extracted_facts")
          .select("decay_tier, status");

        const tiers = { hot: 0, warm: 0, cold: 0 };
        const statuses = { active: 0, superseded: 0, archived: 0, disputed: 0 };
        for (const f of factsTiers ?? []) {
          if (f.decay_tier && tiers[f.decay_tier as keyof typeof tiers] !== undefined) {
            tiers[f.decay_tier as keyof typeof tiers]++;
          }
          if (f.status && statuses[f.status as keyof typeof statuses] !== undefined) {
            statuses[f.status as keyof typeof statuses]++;
          }
        }

        return res.status(200).json({
          mode: "supabase",
          layers: {
            business_context: bc.count ?? 0,
            knowledge_library: lib.count ?? 0,
            session_summaries: sessions.count ?? 0,
            extracted_facts: facts.count ?? 0,
            conversation_log: convos.count ?? 0,
            code_dumps: code.count ?? 0,
          },
          decay_tiers: tiers,
          fact_statuses: statuses,
        });
      }

      case "business_context": {
        const { data, error } = await supabase
          .from("business_context")
          .select("*")
          .order("category")
          .order("key");

        if (error) throw error;
        return res.status(200).json({ data: data ?? [] });
      }

      case "sessions": {
        const limit = parseInt(req.query.limit as string) || 20;
        const { data, error } = await supabase
          .from("session_summaries")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) throw error;
        return res.status(200).json({ data: data ?? [] });
      }

      case "facts": {
        const query = req.query.query as string;
        const showAll = req.query.show_all === "true";
        let q = supabase
          .from("extracted_facts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100);

        if (!showAll) {
          q = q.eq("status", "active");
        }

        const { data, error } = await q;
        if (error) throw error;

        let results = data ?? [];
        if (query) {
          const lower = query.toLowerCase();
          results = results.filter(
            (f: { fact: string; category: string }) =>
              f.fact.toLowerCase().includes(lower) || f.category.toLowerCase().includes(lower)
          );
        }

        return res.status(200).json({ data: results });
      }

      case "library": {
        const { data, error } = await supabase
          .from("knowledge_library")
          .select("slug, title, category, tags, version, updated_at, created_at")
          .order("category")
          .order("title");

        if (error) throw error;
        return res.status(200).json({ data: data ?? [] });
      }

      case "library_doc": {
        const slug = req.query.slug as string;
        if (!slug) return res.status(400).json({ error: "slug parameter required" });

        const { data, error } = await supabase
          .from("knowledge_library")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;

        const { data: history } = await supabase
          .from("knowledge_library_history")
          .select("*")
          .eq("slug", slug)
          .order("version", { ascending: false });

        return res.status(200).json({ doc: data, history: history ?? [] });
      }

      case "conversations": {
        const sessionId = req.query.session_id as string;
        if (!sessionId) {
          // Return distinct session IDs with message counts
          const { data, error } = await supabase
            .from("conversation_log")
            .select("session_id, created_at")
            .order("created_at", { ascending: false })
            .limit(500);

          if (error) throw error;

          const sessionMap = new Map<string, { count: number; last_message: string }>();
          for (const msg of data ?? []) {
            const existing = sessionMap.get(msg.session_id);
            if (existing) {
              existing.count++;
            } else {
              sessionMap.set(msg.session_id, { count: 1, last_message: msg.created_at });
            }
          }

          const sessions = Array.from(sessionMap.entries()).map(([id, info]) => ({
            session_id: id,
            message_count: info.count,
            last_message: info.last_message,
          }));

          return res.status(200).json({ data: sessions });
        }

        const { data, error } = await supabase
          .from("conversation_log")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true });

        if (error) throw error;
        return res.status(200).json({ data: data ?? [] });
      }

      case "code": {
        const sessionId = req.query.session_id as string;
        let q = supabase
          .from("code_dumps")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (sessionId) {
          q = q.eq("session_id", sessionId);
        }

        const { data, error } = await q;
        if (error) throw error;
        return res.status(200).json({ data: data ?? [] });
      }

      case "search": {
        const query = req.query.query as string;
        if (!query) return res.status(400).json({ error: "query parameter required" });

        const maxResults = parseInt(req.query.max_results as string) || 20;
        const { data, error } = await supabase.rpc("search_memory", {
          search_query: query,
          max_results: maxResults,
        });

        if (error) throw error;
        return res.status(200).json({ data: data ?? [] });
      }

      case "delete_fact": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const factId = req.body?.fact_id || req.query.fact_id;
        if (!factId) return res.status(400).json({ error: "fact_id required" });

        const { error } = await supabase
          .from("extracted_facts")
          .update({ status: "archived" })
          .eq("id", factId);

        if (error) throw error;
        return res.status(200).json({ success: true });
      }

      case "delete_session": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const sessionId = req.body?.session_id || req.query.session_id;
        if (!sessionId) return res.status(400).json({ error: "session_id required" });

        const { error } = await supabase
          .from("session_summaries")
          .delete()
          .eq("id", sessionId);

        if (error) throw error;
        return res.status(200).json({ success: true });
      }

      case "update_business_context": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const { category, key, value, priority } = req.body ?? {};
        if (!category || !key || value === undefined) {
          return res.status(400).json({ error: "category, key, and value required" });
        }

        const { error } = await supabase
          .from("business_context")
          .upsert(
            {
              category,
              key,
              value: typeof value === "string" ? value : JSON.stringify(value),
              priority: priority ?? 0,
              decay_tier: "hot",
              updated_at: new Date().toISOString(),
              last_accessed: new Date().toISOString(),
            },
            { onConflict: "category,key" }
          );

        if (error) throw error;
        return res.status(200).json({ success: true });
      }

      // ── BYOD / wizard actions ────────────────────────────────────────
      case "setup_status": {
        const apiKey = String(req.query.api_key ?? "").trim();
        if (!apiKey) return res.status(400).json({ error: "api_key required" });
        const { data, error } = await supabase
          .from("memory_configs")
          .select("supabase_url,schema_installed,schema_installed_at,last_used_at,updated_at")
          .eq("api_key_hash", sha256hex(apiKey))
          .maybeSingle();
        if (error) throw error;
        if (!data) return res.status(200).json({ configured: false });
        return res.status(200).json({ configured: true, ...data });
      }

      case "setup": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const body = req.body as {
          api_key?: string;
          service_role_key?: string;
          supabase_url?: string;
          email?: string;
        };
        const apiKey = (body?.api_key ?? "").trim();
        const serviceRoleKey = (body?.service_role_key ?? "").trim();
        let userSupabaseUrl = (body?.supabase_url ?? "").trim();
        const email = body?.email?.trim().toLowerCase();

        if (!apiKey) return res.status(400).json({ error: "api_key required" });
        if (!apiKey.startsWith("uc_") && !apiKey.startsWith("agt_")) {
          return res.status(400).json({ error: "Invalid api_key format" });
        }
        if (!serviceRoleKey || serviceRoleKey.length < 40) {
          return res.status(400).json({ error: "service_role_key looks invalid" });
        }

        if (!userSupabaseUrl) {
          const ref = decodeProjectRef(serviceRoleKey);
          if (!ref) {
            return res.status(400).json({
              error: "Couldn't read project ref from key. Paste the Supabase URL too.",
              need_url: true,
            });
          }
          userSupabaseUrl = `https://${ref}.supabase.co`;
        }

        // Validate creds by pinging the project.
        const pingRes = await fetch(`${userSupabaseUrl}/rest/v1/`, {
          headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` },
        });
        if (!pingRes.ok && pingRes.status !== 404) {
          return res.status(400).json({
            error: `Supabase rejected that key (HTTP ${pingRes.status}). Double-check you copied service_role, not anon.`,
          });
        }

        const installed = await installSchema(userSupabaseUrl, serviceRoleKey);
        const schemaInstalled = installed || (await verifySchema(userSupabaseUrl, serviceRoleKey));

        const salt = crypto.randomBytes(SALT_BYTES);
        const encKey = deriveKey(apiKey, salt);
        const { iv, authTag, ciphertext } = encryptString(serviceRoleKey, encKey);

        const { error } = await supabase
          .from("memory_configs")
          .upsert(
            {
              api_key_hash: sha256hex(apiKey),
              email: email ?? null,
              supabase_url: userSupabaseUrl,
              encrypted_service_key: ciphertext,
              encryption_iv: iv,
              encryption_tag: authTag,
              encryption_salt: salt.toString("hex"),
              schema_installed: schemaInstalled,
              schema_installed_at: schemaInstalled ? new Date().toISOString() : null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "api_key_hash" }
          );
        if (error) throw error;

        return res.status(200).json({
          success: true,
          supabase_url: userSupabaseUrl,
          schema_installed: schemaInstalled,
          schema_sql: schemaInstalled ? undefined : loadSchemaSql(),
          message: schemaInstalled
            ? "Memory cloud sync is live. Restart your MCP client."
            : "Credentials saved. Run the included SQL in your Supabase SQL editor, then you're done.",
        });
      }

      case "disconnect": {
        if (req.method !== "DELETE") return res.status(405).json({ error: "DELETE required" });
        const apiKey = String(req.query.api_key ?? "").trim();
        if (!apiKey) return res.status(400).json({ error: "api_key required" });
        const { error } = await supabase
          .from("memory_configs")
          .delete()
          .eq("api_key_hash", sha256hex(apiKey));
        if (error) throw error;
        return res.status(200).json({ success: true });
      }

      case "config": {
        // MCP server calls this at startup.
        const apiKey = bearerFrom(req);
        if (!apiKey) return res.status(401).json({ error: "Authorization header required" });
        const { data, error } = await supabase
          .from("memory_configs")
          .select("*")
          .eq("api_key_hash", sha256hex(apiKey))
          .maybeSingle();
        if (error) throw error;
        if (!data) return res.status(404).json({ configured: false, error: "No memory config" });

        try {
          const salt = Buffer.from(data.encryption_salt, "hex");
          const key = deriveKey(apiKey, salt);
          const serviceRoleKey = decryptString(
            data.encryption_iv,
            data.encryption_tag,
            data.encrypted_service_key,
            key
          );
          // Fire-and-forget last_used_at update
          supabase
            .from("memory_configs")
            .update({ last_used_at: new Date().toISOString() })
            .eq("api_key_hash", sha256hex(apiKey))
            .then(() => {});
          return res.status(200).json({
            configured: true,
            supabase_url: data.supabase_url,
            service_role_key: serviceRoleKey,
            schema_installed: data.schema_installed,
          });
        } catch {
          return res.status(500).json({
            error: "Failed to decrypt memory config. Your API key may have changed — rerun setup.",
          });
        }
      }

      case "device_check": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const apiKey = bearerFrom(req);
        if (!apiKey) return res.status(401).json({ error: "Authorization header required" });
        const body = req.body as {
          device_fingerprint?: string;
          label?: string;
          platform?: string;
          storage_mode?: "local" | "cloud";
        };
        const fp = (body?.device_fingerprint ?? "").trim();
        if (!fp) return res.status(400).json({ error: "device_fingerprint required" });
        const mode = body?.storage_mode === "cloud" ? "cloud" : "local";
        const apiKeyHash = sha256hex(apiKey);

        const { error: upErr } = await supabase
          .from("memory_devices")
          .upsert(
            {
              api_key_hash: apiKeyHash,
              device_fingerprint: fp,
              label: body?.label ?? null,
              platform: body?.platform ?? null,
              storage_mode: mode,
              last_seen: new Date().toISOString(),
            },
            { onConflict: "api_key_hash,device_fingerprint" }
          );
        if (upErr) throw upErr;

        const { data: rows } = await supabase
          .from("memory_devices")
          .select("storage_mode,nudge_dismissed")
          .eq("api_key_hash", apiKeyHash);

        const list = (rows ?? []) as Array<{ storage_mode: string; nudge_dismissed: boolean }>;
        const totalDevices = list.length;
        const localDevices = list.filter((r) => r.storage_mode === "local").length;
        const anyDismissed = list.some((r) => r.nudge_dismissed);
        const nudge = mode === "local" && totalDevices >= 2 && localDevices >= 1 && !anyDismissed;

        return res.status(200).json({
          success: true,
          total_devices: totalDevices,
          local_devices: localDevices,
          nudge,
          nudge_message: nudge
            ? `You're using UnClick memory on ${totalDevices} machines. Turn on cloud sync: https://unclick.world/memory/setup`
            : null,
        });
      }

      case "list_devices": {
        const apiKey = bearerFrom(req);
        if (!apiKey) return res.status(401).json({ error: "Authorization header required" });
        const { data, error } = await supabase
          .from("memory_devices")
          .select("*")
          .eq("api_key_hash", sha256hex(apiKey))
          .order("last_seen", { ascending: false });
        if (error) throw error;
        return res.status(200).json({ data: data ?? [] });
      }

      case "remove_device": {
        if (req.method !== "DELETE") return res.status(405).json({ error: "DELETE required" });
        const apiKey = bearerFrom(req);
        if (!apiKey) return res.status(401).json({ error: "Authorization header required" });
        const fp = String(req.query.fingerprint ?? "").trim();
        if (!fp) return res.status(400).json({ error: "fingerprint required" });
        const apiKeyHash = sha256hex(apiKey);

        if (req.query.dismiss === "1") {
          const { error } = await supabase
            .from("memory_devices")
            .update({ nudge_dismissed: true })
            .eq("api_key_hash", apiKeyHash)
            .eq("device_fingerprint", fp);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }

        const { error } = await supabase
          .from("memory_devices")
          .delete()
          .eq("api_key_hash", apiKeyHash)
          .eq("device_fingerprint", fp);
        if (error) throw error;
        return res.status(200).json({ success: true });
      }

      // ── Tenant settings (AI chat feature flags) ─────────────────────
      case "tenant_settings": {
        const apiKey = bearerFrom(req);
        if (!apiKey) return res.status(401).json({ error: "Authorization header required" });
        const hash = sha256hex(apiKey);
        const envEnabled = process.env.AI_CHAT_ENABLED === "true";

        if (req.method === "POST") {
          if (!envEnabled) return res.status(404).end();
          const body = req.body as {
            ai_chat_enabled?: boolean;
            ai_chat_provider?: ChatProvider;
            ai_chat_model?: string;
            ai_chat_api_key?: string | null;
            ai_chat_system_prompt?: string | null;
            ai_chat_max_turns?: number;
          };

          const update: Record<string, unknown> = {
            api_key_hash: hash,
            updated_at: new Date().toISOString(),
          };
          if (typeof body.ai_chat_enabled === "boolean")
            update.ai_chat_enabled = body.ai_chat_enabled;
          if (body.ai_chat_provider) update.ai_chat_provider = body.ai_chat_provider;
          if (body.ai_chat_model) update.ai_chat_model = body.ai_chat_model;
          if (typeof body.ai_chat_system_prompt === "string")
            update.ai_chat_system_prompt = body.ai_chat_system_prompt;
          if (typeof body.ai_chat_max_turns === "number")
            update.ai_chat_max_turns = body.ai_chat_max_turns;

          if (body.ai_chat_api_key === null) {
            update.ai_chat_api_key_encrypted = null;
          } else if (typeof body.ai_chat_api_key === "string" && body.ai_chat_api_key.length > 0) {
            const key = deriveAiKeyEncryptionKey();
            if (!key) {
              console.warn(
                "[memory-admin] AI_KEY_ENCRYPTION_SECRET not set -- storing AI key in plaintext (MVP)",
              );
              update.ai_chat_api_key_encrypted = body.ai_chat_api_key;
            } else {
              const iv = crypto.randomBytes(IV_BYTES);
              const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
              const enc = Buffer.concat([
                cipher.update(body.ai_chat_api_key, "utf8"),
                cipher.final(),
              ]);
              const tag = cipher.getAuthTag();
              update.ai_chat_api_key_encrypted = Buffer.concat([iv, enc, tag]).toString("base64");
            }
          }

          const { error } = await supabase
            .from("tenant_settings")
            .upsert(update, { onConflict: "api_key_hash" });
          if (error) throw error;
          return res.status(200).json({ success: true });
        }

        const { data, error } = await supabase
          .from("tenant_settings")
          .select(
            "ai_chat_enabled, ai_chat_provider, ai_chat_model, ai_chat_system_prompt, ai_chat_max_turns, ai_chat_api_key_encrypted",
          )
          .eq("api_key_hash", hash)
          .maybeSingle();
        if (error) throw error;

        const row = data as
          | {
              ai_chat_enabled: boolean;
              ai_chat_provider: string;
              ai_chat_model: string;
              ai_chat_system_prompt: string | null;
              ai_chat_max_turns: number;
              ai_chat_api_key_encrypted: string | null;
            }
          | null;

        return res.status(200).json({
          env_enabled: envEnabled,
          settings: {
            ai_chat_enabled: row?.ai_chat_enabled ?? false,
            ai_chat_provider: row?.ai_chat_provider ?? "google",
            ai_chat_model: row?.ai_chat_model ?? "gemini-2.0-flash",
            ai_chat_system_prompt: row?.ai_chat_system_prompt ?? null,
            ai_chat_max_turns: row?.ai_chat_max_turns ?? 20,
            has_api_key: Boolean(row?.ai_chat_api_key_encrypted),
          },
        });
      }

      // ── Admin AI chat (streaming LLM with user's memory as context) ─
      case "admin_ai_chat": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });

        // Level 1: environment kill switch.
        if (process.env.AI_CHAT_ENABLED !== "true") return res.status(404).end();

        const apiKey = bearerFrom(req);
        if (!apiKey) return res.status(401).json({ error: "Authorization header required" });

        // Level 2: tenant kill switch.
        const { data: tenantRow, error: tenantErr } = await supabase
          .from("tenant_settings")
          .select(
            "ai_chat_enabled, ai_chat_provider, ai_chat_model, ai_chat_system_prompt, ai_chat_api_key_encrypted",
          )
          .eq("api_key_hash", sha256hex(apiKey))
          .maybeSingle();
        if (tenantErr) throw tenantErr;

        const tenant = tenantRow as
          | {
              ai_chat_enabled: boolean;
              ai_chat_provider: ChatProvider;
              ai_chat_model: string;
              ai_chat_system_prompt: string | null;
              ai_chat_api_key_encrypted: string | null;
            }
          | null;
        if (!tenant?.ai_chat_enabled) return res.status(404).end();

        const messagesInput = (req.body as { messages?: unknown })?.messages;
        const modelMessages = await normaliseChatMessages(messagesInput);
        if (!Array.isArray(modelMessages)) {
          return res.status(400).json({ error: modelMessages.error });
        }

        // Load the user's context (business_context, facts, sessions).
        const ctx = await buildAiChatContext(supabase);
        const factCount = ctx.facts.length;
        const sessionCount = ctx.sessions.length;

        const baseSystemPrompt = tenant.ai_chat_system_prompt?.trim() || DEFAULT_AI_CHAT_SYSTEM_PROMPT;
        const systemPrompt = `${baseSystemPrompt}

CONTEXT (fact_count=${factCount}, session_count=${sessionCount}):
${JSON.stringify(
  {
    business_context: ctx.businessContext,
    standing_rules: ctx.standingRules,
    active_facts: ctx.facts,
    recent_sessions: ctx.sessions,
  },
  null,
  2,
)}`;

        const provider: ChatProvider = tenant.ai_chat_provider ?? "google";
        const model = tenant.ai_chat_model ?? "gemini-2.0-flash";
        const userApiKey = decryptAiApiKey(tenant.ai_chat_api_key_encrypted);

        try {
          const languageModel = await resolveAiChatModel({
            provider,
            model,
            userApiKey,
          });

          const result = streamText({
            model: languageModel,
            system: systemPrompt,
            messages: modelMessages,
          });

          result.pipeUIMessageStreamToResponse(res);
          return;
        } catch (err) {
          console.error("[admin_ai_chat] stream failed:", (err as Error).message);
          return res
            .status(500)
            .json({ error: `AI chat failed: ${(err as Error).message}` });
        }
      }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (err: unknown) {
    console.error(`Memory admin error (${action}):`, (err as Error).message);
    return res.status(500).json({ error: `Failed to execute ${action}: ${(err as Error).message}` });
  }
}
