/**
 * Supabase client for UnClick Memory MCP
 *
 * Connects to the user's own Supabase instance (BYOD â Bring Your Own Database).
 * All memory data lives in the user's project, not ours.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_KEY environment variables. " +
        "Set these in your MCP config to point at your own Supabase project."
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false },
  });

  return client;
}

/* ------------------------------------------------------------------ */
/*  Business Context                                                   */
/* ------------------------------------------------------------------ */

export interface BusinessContext {
  id?: string;
  key: string;
  value: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export async function getBusinessContext(category?: string): Promise<BusinessContext[]> {
  const sb = getSupabase();
  let query = sb.from("business_context").select("*").order("updated_at", { ascending: false });
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw new Error(`business_context query failed: ${error.message}`);
  return data ?? [];
}

export async function upsertBusinessContext(
  key: string,
  value: string,
  category: string
): Promise<BusinessContext> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("business_context")
    .upsert({ key, value, category }, { onConflict: "key" })
    .select()
    .single();
  if (error) throw new Error(`business_context upsert failed: ${error.message}`);
  return data;
}

/* ------------------------------------------------------------------ */
/*  Knowledge Library                                                  */
/* ------------------------------------------------------------------ */

export interface KnowledgeEntry {
  id?: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  source?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getKnowledge(category?: string, limit = 20): Promise<KnowledgeEntry[]> {
  const sb = getSupabase();
  let query = sb
    .from("knowledge_library")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw new Error(`knowledge_library query failed: ${error.message}`);
  return data ?? [];
}

export async function storeKnowledge(entry: Omit<KnowledgeEntry, "id" | "created_at" | "updated_at">): Promise<KnowledgeEntry> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("knowledge_library")
    .insert(entry)
    .select()
    .single();
  if (error) throw new Error(`knowledge_library insert failed: ${error.message}`);
  return data;
}

export async function searchKnowledge(query: string, limit = 10): Promise<KnowledgeEntry[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("knowledge_library")
    .select("*")
    .textSearch("title", query, { type: "websearch" })
    .limit(limit);
  if (error) {
    // Fall back to ilike if full-text search not configured
    const { data: fallback, error: fbErr } = await sb
      .from("knowledge_library")
      .select("*")
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .limit(limit);
    if (fbErr) throw new Error(`knowledge search failed: ${fbErr.message}`);
    return fallback ?? [];
  }
  return data ?? [];
}

/* ------------------------------------------------------------------ */
/*  Session Summaries                                                  */
/* ------------------------------------------------------------------ */

export interface SessionSummary {
  id?: string;
  session_id: string;
  summary: string;
  key_decisions: string[];
  open_threads: string[];
  tools_used: string[];
  files_modified: string[];
  duration_minutes?: number;
  created_at?: string;
}

export async function getRecentSessions(limit = 5): Promise<SessionSummary[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("session_summaries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`session_summaries query failed: ${error.message}`);
  return data ?? [];
}

export async function writeSessionSummary(
  summary: Omit<SessionSummary, "id" | "created_at">
): Promise<SessionSummary> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("session_summaries")
    .insert(summary)
    .select()
    .single();
  if (error) throw new Error(`session_summaries insert failed: ${error.message}`);
  return data;
}

/* ------------------------------------------------------------------ */
/*  Extracted Facts                                                    */
/* ------------------------------------------------------------------ */

export interface ExtractedFact {
  id?: string;
  fact: string;
  category: string;
  confidence: number;
  source_session_id?: string;
  created_at?: string;
}

export async function getFacts(category?: string, limit = 30): Promise<ExtractedFact[]> {
  const sb = getSupabase();
  let query = sb
    .from("extracted_facts")
    .select("*")
    .order("confidence", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw new Error(`extracted_facts query failed: ${error.message}`);
  return data ?? [];
}

export async function storeFact(
  fact: string,
  category: string,
  confidence: number,
  sourceSessionId?: string
): Promise<ExtractedFact> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("extracted_facts")
    .insert({
      fact,
      category,
      confidence: Math.min(1, Math.max(0, confidence)),
      source_session_id: sourceSessionId,
    })
    .select()
    .single();
  if (error) throw new Error(`extracted_facts insert failed: ${error.message}`);
  return data;
}

/* ------------------------------------------------------------------ */
/*  Conversation Log                                                   */
/* ------------------------------------------------------------------ */

export interface ConversationEntry {
  id?: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  tool_calls?: Record<string, unknown>[];
  created_at?: string;
}

export async function logConversation(
  entry: Omit<ConversationEntry, "id" | "created_at">
): Promise<ConversationEntry> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("conversation_log")
    .insert(entry)
    .select()
    .single();
  if (error) throw new Error(`conversation_log insert failed: ${error.message}`);
  return data;
}

export async function getConversationLog(
  sessionId: string,
  limit = 50
): Promise<ConversationEntry[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("conversation_log")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw new Error(`conversation_log query failed: ${error.message}`);
  return data ?? [];
}

/* ------------------------------------------------------------------ */
/*  Code Dumps                                                         */
/* ------------------------------------------------------------------ */

export interface CodeDump {
  id?: string;
  session_id: string;
  filename: string;
  language: string;
  content: string;
  description?: string;
  created_at?: string;
}

export async function storeCodeDump(
  dump: Omit<CodeDump, "id" | "created_at">
): Promise<CodeDump> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("code_dumps")
    .insert(dump)
    .select()
    .single();
  if (error) throw new Error(`code_dumps insert failed: ${error.message}`);
  return data;
}

export async function getRecentCodeDumps(limit = 10): Promise<CodeDump[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("code_dumps")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`code_dumps query failed: ${error.message}`);
  return data ?? [];
}

/* ------------------------------------------------------------------ */
/*  Cross-layer Search                                                 */
/* ------------------------------------------------------------------ */

export interface SearchResult {
  layer: string;
  id: string;
  content: string;
  relevance: string;
  created_at: string;
}

export async function searchAllLayers(query: string, limit = 15): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const q = `%${query}%`;
  const sb = getSupabase();

  // Search business context
  const { data: bc } = await sb
    .from("business_context")
    .select("id, key, value, updated_at")
    .or(`key.ilike.${q},value.ilike.${q}`)
    .limit(3);
  for (const r of bc ?? []) {
    results.push({
      layer: "business_context",
      id: r.id,
      content: `${r.key}: ${r.value}`,
      relevance: "business",
      created_at: r.updated_at,
    });
  }

  // Search knowledge library
  const { data: kl } = await sb
    .from("knowledge_library")
    .select("id, title, content, updated_at")
    .or(`title.ilike.${q},content.ilike.${q}`)
    .limit(3);
  for (const r of kl ?? []) {
    results.push({
      layer: "knowledge_library",
      id: r.id,
      content: `${r.title}: ${r.content.substring(0, 200)}`,
      relevance: "knowledge",
      created_at: r.updated_at,
    });
  }

  // Search session summaries
  const { data: ss } = await sb
    .from("session_summaries")
    .select("id, summary, created_at")
    .ilike("summary", q)
    .limit(3);
  for (const r of ss ?? []) {
    results.push({
      layer: "session_summaries",
      id: r.id,
      content: r.summary.substring(0, 200),
      relevance: "session",
      created_at: r.created_at,
    });
  }

  // Search extracted facts
  const { data: ef } = await sb
    .from("extracted_facts")
    .select("id, fact, category, created_at")
    .ilike("fact", q)
    .limit(3);
  for (const r of ef ?? []) {
    results.push({
      layer: "extracted_facts",
      id: r.id,
      content: `[${r.category}] ${r.fact}`,
      relevance: "fact",
      created_at: r.created_at,
    });
  }

  // Search code dumps
  const { data: cd } = await sb
    .from("code_dumps")
    .select("id, filename, description, created_at")
    .or(`filename.ilike.${q},description.ilike.${q}`)
    .limit(3);
  for (const r of cd ?? []) {
    results.push({
      layer: "code_dumps",
      id: r.id,
      content: `${r.filename}: ${r.description ?? ""}`,
      relevance: "code",
      created_at: r.created_at,
    });
  }

  // Sort by recency and trim
  results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return results.slice(0, limit);
}

/* ------------------------------------------------------------------ */
/*  Startup Context (the main session-bridge entry point)              */
/* ------------------------------------------------------------------ */

export interface StartupContext {
  business_context: BusinessContext[];
  recent_sessions: SessionSummary[];
  key_facts: ExtractedFact[];
  open_threads: string[];
}

export async function getStartupContext(): Promise<StartupContext> {
  const [businessContext, recentSessions, keyFacts] = await Promise.all([
    getBusinessContext(),
    getRecentSessions(3),
    getFacts(undefined, 20),
  ]);

  // Collect open threads from recent sessions
  const openThreads = recentSessions.flatMap((s) => s.open_threads ?? []);

  return {
    business_context: businessContext,
    recent_sessions: recentSessions,
    key_facts: keyFacts,
    open_threads: [...new Set(openThreads)], // deduplicate
  };
}
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) environment variables. " +
      "Set these in your MCP config's env block."
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}

/** Touch the access tracking columns on a row. */
export async function touchAccess(table: string, id: string): Promise<void> {
  const sb = getSupabase();
  await sb
    .from(table)
    .update({
      access_count: undefined,
      last_accessed: new Date().toISOString(),
      decay_tier: "hot",
    })
    .eq("id", id);
}

/** Run a Supabase RPC function. */
export async function rpc<T = unknown>(fn: string, params: Record<string, unknown> = {}): Promise<T> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc(fn, params);
  if (error) throw new Error(`rpc(${fn}) failed: ${error.message}`);
  return data as T;
}
