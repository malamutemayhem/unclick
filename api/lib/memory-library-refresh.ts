/**
 * Memory Library refresh helper for the admin API path.
 *
 * Wraps the MCP-side taxonomy snapshot planner/writer
 * (buildMemoryTaxonomySnapshots + writeMemoryTaxonomySnapshotsToLibrary)
 * with API-shaped input mapping and a safe dry_run default so the admin
 * UI can preview a refresh before committing writes to mc_knowledge_library.
 *
 * Owner-auth is enforced upstream in api/memory-admin.ts via Bearer api_key;
 * this module stays pure (no Supabase client) so it can be unit-tested with
 * injected fixtures and mocks.
 */

import {
  writeMemoryTaxonomySnapshotsToLibrary,
  type LibraryDocInput,
  type MemoryTaxonomySnapshotSource,
  type MemoryTaxonomySnapshotWriteOptions,
  type MemoryTaxonomySnapshotWriteResult,
} from "../../packages/mcp-server/src/memory/supabase";

export interface MemoryLibraryRefreshFactRow {
  id: string;
  fact: string;
  category?: string | null;
  confidence?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  valid_from?: string | null;
}

export interface MemoryLibraryRefreshSessionRow {
  id: string;
  summary: string;
  topics?: string[] | null;
  created_at?: string | null;
}

export interface MemoryLibraryRefreshRequestBody {
  commit?: unknown;
  dry_run?: unknown;
  max_sources?: unknown;
  max_snapshots?: unknown;
  max_sources_per_snapshot?: unknown;
}

export interface MemoryLibraryRefreshOptions extends MemoryTaxonomySnapshotWriteOptions {
  commit: boolean;
}

export interface MemoryLibraryRefreshResult extends MemoryTaxonomySnapshotWriteResult {
  commit: boolean;
  fact_count: number;
  session_count: number;
}

const MIN_SOURCES = 1;
const MAX_SOURCES_HARD = 250;
const DEFAULT_MAX_SOURCES = 80;
const MIN_SNAPSHOTS = 1;
const MAX_SNAPSHOTS_HARD = 30;
const DEFAULT_MAX_SNAPSHOTS = 12;
const MIN_PER = 1;
const MAX_PER_HARD = 20;
const DEFAULT_PER = 8;

function clampInt(value: unknown, fallback: number, min: number, max: number): number {
  if (value === undefined || value === null || value === "") return fallback;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

function asBool(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().toLowerCase() === "true";
  return false;
}

/**
 * Parses untrusted query/body values into bounded refresh options.
 * Safety rule: writes only happen when commit === true, so any ambiguous
 * input resolves to dry_run.
 */
export function parseMemoryLibraryRefreshOptions(
  raw: MemoryLibraryRefreshRequestBody | undefined | null
): MemoryLibraryRefreshOptions {
  const body = raw ?? {};
  const commit = asBool(body.commit);
  // dry_run defaults to true. Explicit commit=true overrides.
  const dry_run = commit ? false : true;
  return {
    commit,
    dry_run,
    max_sources: clampInt(body.max_sources, DEFAULT_MAX_SOURCES, MIN_SOURCES, MAX_SOURCES_HARD),
    max_snapshots: clampInt(body.max_snapshots, DEFAULT_MAX_SNAPSHOTS, MIN_SNAPSHOTS, MAX_SNAPSHOTS_HARD),
    max_sources_per_snapshot: clampInt(
      body.max_sources_per_snapshot,
      DEFAULT_PER,
      MIN_PER,
      MAX_PER_HARD
    ),
  };
}

/**
 * Maps Supabase mc_extracted_facts and mc_session_summaries rows into the
 * snapshot source shape expected by buildMemoryTaxonomySnapshots.
 * Pure: no Supabase client, no I/O.
 */
export function memoryLibraryRefreshSources(input: {
  facts: MemoryLibraryRefreshFactRow[];
  sessions: MemoryLibraryRefreshSessionRow[];
}): MemoryTaxonomySnapshotSource[] {
  const facts: MemoryTaxonomySnapshotSource[] = (input.facts ?? []).map((row) => ({
    id: row.id,
    kind: "fact",
    text: row.fact,
    category: row.category ?? undefined,
    confidence: row.confidence ?? null,
    created_at: row.created_at ?? null,
    updated_at: row.updated_at ?? null,
    valid_from: row.valid_from ?? null,
  }));
  const sessions: MemoryTaxonomySnapshotSource[] = (input.sessions ?? []).map((row) => ({
    id: row.id,
    kind: "session",
    text: row.summary,
    category:
      Array.isArray(row.topics) && row.topics.length > 0 ? row.topics.join(" ") : "session",
    confidence: 0.75,
    created_at: row.created_at ?? null,
    updated_at: row.created_at ?? null,
    valid_from: row.created_at ?? null,
  }));
  return [...facts, ...sessions];
}

/**
 * Runs the Memory Library refresh end-to-end with injectable upsert.
 * - dry_run default true via parseMemoryLibraryRefreshOptions.
 * - upsertLibraryDoc is only invoked when commit === true.
 * - Returns a result shape that includes the explicit commit flag plus
 *   fact_count and session_count so admin UIs can show what was scanned.
 */
export async function runMemoryLibraryRefresh(input: {
  facts: MemoryLibraryRefreshFactRow[];
  sessions: MemoryLibraryRefreshSessionRow[];
  options: MemoryLibraryRefreshOptions;
  upsertLibraryDoc: (doc: LibraryDocInput) => Promise<string>;
  generatedAt?: string;
}): Promise<MemoryLibraryRefreshResult> {
  const facts = input.facts ?? [];
  const sessions = input.sessions ?? [];
  const sources = memoryLibraryRefreshSources({ facts, sessions });
  const result = await writeMemoryTaxonomySnapshotsToLibrary({
    sources,
    options: {
      dry_run: input.options.dry_run,
      max_sources: input.options.max_sources,
      max_snapshots: input.options.max_snapshots,
      max_sources_per_snapshot: input.options.max_sources_per_snapshot,
    },
    upsertLibraryDoc: input.upsertLibraryDoc,
    generatedAt: input.generatedAt,
  });
  return {
    ...result,
    commit: input.options.commit,
    fact_count: facts.length,
    session_count: sessions.length,
  };
}
