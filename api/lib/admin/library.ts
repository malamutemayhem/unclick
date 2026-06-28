// Knowledge-library refresh helpers for the memory-admin endpoint.
//
// Extracted verbatim from api/memory-admin.ts as part of splitting that
// endpoint into api/lib/admin/* domain modules. Covers parsing the refresh
// request options, shaping the response payload, reading taxonomy sources
// (facts + sessions), and upserting library docs.

import type { SupabaseClient } from "@supabase/supabase-js";
import { isRecallVisibleFact } from "../memory-recall-sections.js";
import { getClampedLimit, parseBooleanRequestValue } from "./request.js";
import type {
  LibraryDocInput,
  MemoryTaxonomySnapshotSource,
  MemoryTaxonomySnapshotWriteOptions,
  MemoryTaxonomySnapshotWriteResult,
} from "../../../packages/mcp-server/src/memory/types.js";

export interface AdminLibraryRefreshParseResult {
  commit: boolean;
  options: MemoryTaxonomySnapshotWriteOptions;
  error?: string;
}

export function parseAdminLibraryRefreshOptions(
  body: Record<string, unknown> = {},
  query: Record<string, unknown> = {},
): AdminLibraryRefreshParseResult {
  const rawCommit = body.commit ?? query.commit;
  const rawDryRun = body.dry_run ?? query.dry_run;
  const commit = parseBooleanRequestValue(rawCommit, false);
  const dryRun = rawDryRun === undefined
    ? !commit
    : parseBooleanRequestValue(rawDryRun, true);

  if (commit && dryRun) {
    return {
      commit,
      options: { dry_run: dryRun },
      error: "commit=true conflicts with dry_run=true",
    };
  }
  if (!dryRun && !commit) {
    return {
      commit,
      options: { dry_run: dryRun },
      error: "commit=true is required when dry_run=false",
    };
  }

  return {
    commit,
    options: {
      dry_run: dryRun,
      max_sources: getClampedLimit(body.max_sources ?? query.max_sources, 80, 250),
      max_snapshots: getClampedLimit(body.max_snapshots ?? query.max_snapshots, 12, 30),
      max_sources_per_snapshot: getClampedLimit(
        body.max_sources_per_snapshot ?? query.max_sources_per_snapshot,
        8,
        25,
      ),
    },
  };
}

type AdminLibraryRefreshPayload = MemoryTaxonomySnapshotWriteResult & {
  planned_snapshot_count: number;
  skipped_secret_count: number;
};

export function buildAdminLibraryRefreshPayload(
  result: MemoryTaxonomySnapshotWriteResult,
  skippedSecretCount: number,
): AdminLibraryRefreshPayload {
  return {
    ...result,
    planned_snapshot_count: result.snapshot_count,
    skipped_secret_count: skippedSecretCount,
  };
}

export async function readAdminLibraryTaxonomySources(
  supabase: SupabaseClient,
  apiKeyHash: string,
  maxSources: number,
): Promise<MemoryTaxonomySnapshotSource[]> {
  const factLimit = Math.max(1, Math.min(250, maxSources));
  const sessionLimit = Math.max(1, Math.floor(factLimit / 2));
  const candidateLimit = Math.min(250, Math.max(factLimit * 3, factLimit));
  const asOf = new Date();
  const asOfIso = asOf.toISOString();
  const [factsRes, sessionsRes] = await Promise.all([
    supabase
      .from("mc_extracted_facts")
      .select("id, fact, category, confidence, created_at, updated_at, valid_from, valid_to, invalidated_at, source_type, startup_fact_kind, status")
      .eq("api_key_hash", apiKeyHash)
      .eq("status", "active")
      .is("invalidated_at", null)
      .lte("valid_from", asOfIso)
      .or(`valid_to.is.null,valid_to.gt.${asOfIso}`)
      .order("confidence", { ascending: false })
      .order("updated_at", { ascending: false })
      .limit(candidateLimit),
    supabase
      .from("mc_session_summaries")
      .select("id, summary, topics, created_at")
      .eq("api_key_hash", apiKeyHash)
      .order("created_at", { ascending: false })
      .limit(sessionLimit),
  ]);
  if (factsRes.error) throw factsRes.error;
  if (sessionsRes.error) throw sessionsRes.error;

  type FactRow = {
    id: string;
    fact: string;
    category?: string | null;
    confidence?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    valid_to?: string | null;
    valid_from?: string | null;
    invalidated_at?: string | null;
    source_type?: string | null;
    startup_fact_kind?: string | null;
    status?: string | null;
  };
  type SessionRow = {
    id: string;
    summary: string;
    topics?: string[] | null;
    created_at?: string | null;
  };

  const factSources: MemoryTaxonomySnapshotSource[] = ((factsRes.data ?? []) as FactRow[])
    .filter((row) => isRecallVisibleFact(row, asOf))
    .slice(0, factLimit)
    .map((row) => ({
      id: row.id,
      kind: "fact",
      text: row.fact,
      category: row.category ?? undefined,
      confidence: row.confidence ?? null,
      created_at: row.created_at ?? null,
      updated_at: row.updated_at ?? null,
      valid_from: row.valid_from ?? null,
    }));
  const sessionSources: MemoryTaxonomySnapshotSource[] = ((sessionsRes.data ?? []) as SessionRow[]).map((row) => ({
    id: row.id,
    kind: "session",
    text: row.summary,
    category: Array.isArray(row.topics) && row.topics.length > 0 ? row.topics.join(" ") : "session",
    confidence: 0.75,
    created_at: row.created_at ?? null,
    updated_at: row.created_at ?? null,
    valid_from: row.created_at ?? null,
  }));

  return [...factSources, ...sessionSources];
}

export async function upsertAdminLibraryDoc(
  supabase: SupabaseClient,
  apiKeyHash: string,
  data: LibraryDocInput,
): Promise<string> {
  const { data: existing, error: existingError } = await supabase
    .from("mc_knowledge_library")
    .select("id, version")
    .eq("api_key_hash", apiKeyHash)
    .eq("slug", data.slug)
    .maybeSingle();
  if (existingError) throw existingError;

  if (existing) {
    const nextVersion = Number(existing.version ?? 1) + 1;
    const { error } = await supabase
      .from("mc_knowledge_library")
      .update({
        title: data.title,
        category: data.category,
        content: data.content,
        tags: data.tags,
        last_accessed: new Date().toISOString(),
        decay_tier: "hot",
      })
      .eq("api_key_hash", apiKeyHash)
      .eq("id", existing.id);
    if (error) throw error;
    return `Library doc updated: "${data.title}" (v${nextVersion})`;
  }

  const { error } = await supabase
    .from("mc_knowledge_library")
    .insert({
      api_key_hash: apiKeyHash,
      slug: data.slug,
      title: data.title,
      category: data.category,
      content: data.content,
      tags: data.tags,
      version: 1,
      decay_tier: "hot",
      last_accessed: new Date().toISOString(),
    });
  if (error) throw error;
  return `Library doc created: "${data.title}" (v1)`;
}
