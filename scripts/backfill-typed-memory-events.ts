/**
 * Backfill log-shaped fact rows into the Worker 9 session_events store.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=...
 *   MC_API_KEY_HASH=... npx tsx scripts/backfill-typed-memory-events.ts
 *
 * Optional env vars:
 *   DRY_RUN=0                      apply inserts and memory_class updates
 *   PAGE_SIZE=50                   rows per page
 *   MAX_BACKFILL_ROWS=100          max candidate rows per run, 0 disables cap
 *   BACKFILL_UNPREFIXED_TABLES=1   target BYOD legacy tables instead of mc_ tables
 *
 * Safety:
 * - Dry-run is the default.
 * - The script never deletes facts.
 * - Applied rows get payload.migrated_from_fact_id and payload.migration so the
 *   Coordinator can audit or reverse the move later.
 */

import { createClient } from "@supabase/supabase-js";
import {
  classifyMemoryClass,
  factInputToSessionEventInput,
  normalizeMemoryClass,
} from "../packages/mcp-server/src/memory/typed-memory.js";
import type { FactInput } from "../packages/mcp-server/src/memory/types.js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const MC_API_KEY_HASH = process.env.MC_API_KEY_HASH ?? "";
const BACKFILL_UNPREFIXED_TABLES = process.env.BACKFILL_UNPREFIXED_TABLES === "1";
const DRY_RUN = process.env.DRY_RUN !== "0";
const PAGE_SIZE = Math.max(1, parseInt(process.env.PAGE_SIZE ?? "50", 10) || 50);
const MAX_BACKFILL_ROWS = Math.max(0, parseInt(process.env.MAX_BACKFILL_ROWS ?? "100", 10) || 100);
const MIGRATION_ID = "worker-09-typed-split-v1";

interface FactRow {
  id: string;
  fact: string;
  category: string;
  confidence: number;
  source_session_id?: string | null;
  startup_fact_kind?: string | null;
  memory_class?: string | null;
  created_at?: string | null;
}

const managedMode = Boolean(MC_API_KEY_HASH);
const factTable = managedMode ? "mc_extracted_facts" : "extracted_facts";
const eventTable = managedMode ? "mc_session_events" : "session_events";

function validateEnvironment(): void {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
    process.exit(1);
  }
  if (!managedMode && !BACKFILL_UNPREFIXED_TABLES) {
    console.error("MC_API_KEY_HASH is required for managed backfills. Set BACKFILL_UNPREFIXED_TABLES=1 only for BYOD legacy tables.");
    process.exit(1);
  }
}

function factRowToInput(row: FactRow): FactInput {
  return {
    fact: row.fact,
    category: row.category,
    confidence: row.confidence,
    source_session_id: row.source_session_id ?? undefined,
    startup_fact_kind: row.startup_fact_kind === "operational" ||
      row.startup_fact_kind === "excluded" ||
      row.startup_fact_kind === "legacy_unspecified" ||
      row.startup_fact_kind === "durable"
      ? row.startup_fact_kind
      : undefined,
    memory_class: normalizeMemoryClass(row.memory_class, "semantic"),
  };
}

function isEpisodeCandidate(row: FactRow): boolean {
  if (!row.fact?.trim()) return false;
  const memoryClass = classifyMemoryClass({
    text: row.fact,
    category: row.category,
    startup_fact_kind: row.startup_fact_kind ?? undefined,
    memory_class: row.memory_class ?? undefined,
  });
  return memoryClass === "episodic";
}

async function alreadyMigrated(
  supabase: ReturnType<typeof createClient>,
  row: FactRow
): Promise<boolean> {
  let query = supabase
    .from(eventTable)
    .select("id")
    .contains("payload", { migrated_from_fact_id: row.id, migration: MIGRATION_ID })
    .limit(1);

  if (managedMode) query = query.eq("api_key_hash", MC_API_KEY_HASH);
  const { data, error } = await query;
  if (error) throw new Error(`duplicate check failed for ${row.id}: ${error.message}`);
  return Boolean(data?.length);
}

async function applyCandidate(
  supabase: ReturnType<typeof createClient>,
  row: FactRow
): Promise<void> {
  const input = factRowToInput(row);
  const eventInput = factInputToSessionEventInput(input);
  const payload = {
    ...eventInput.payload,
    migration: MIGRATION_ID,
    migrated_from_fact_id: row.id,
    original_created_at: row.created_at ?? null,
  };

  const insertRow: Record<string, unknown> = {
    session_id: eventInput.session_id ?? null,
    memory_class: "episodic",
    event_kind: "fact_backfill",
    content: eventInput.content,
    summary: eventInput.summary ?? null,
    payload,
    source_fact_id: row.id,
  };
  if (managedMode) insertRow.api_key_hash = MC_API_KEY_HASH;

  const { error: insertError } = await supabase.from(eventTable).insert(insertRow);
  if (insertError) throw new Error(`event insert failed for ${row.id}: ${insertError.message}`);

  let update = supabase
    .from(factTable)
    .update({ memory_class: "episodic" })
    .eq("id", row.id);
  if (managedMode) update = update.eq("api_key_hash", MC_API_KEY_HASH);
  const { error: updateError } = await update;
  if (updateError) throw new Error(`fact marker update failed for ${row.id}: ${updateError.message}`);
}

async function main(): Promise<void> {
  validateEnvironment();
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log("UnClick typed memory event backfill");
  console.log(`mode=${managedMode ? "managed" : "byod"} fact_table=${factTable} event_table=${eventTable} dry_run=${DRY_RUN}`);

  let page = 0;
  let scanned = 0;
  let candidates = 0;
  let skippedExisting = 0;
  let applied = 0;

  while (true) {
    let query = supabase
      .from(factTable)
      .select("id, fact, category, confidence, source_session_id, startup_fact_kind, memory_class, created_at")
      .eq("status", "active")
      .order("created_at", { ascending: true })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    if (managedMode) query = query.eq("api_key_hash", MC_API_KEY_HASH);

    const { data, error } = await query;
    if (error) throw new Error(`fact scan failed: ${error.message}`);
    const rows = (data ?? []) as unknown as FactRow[];
    if (rows.length === 0) break;

    for (const row of rows) {
      scanned += 1;
      if (!isEpisodeCandidate(row)) continue;
      if (MAX_BACKFILL_ROWS > 0 && candidates >= MAX_BACKFILL_ROWS) break;
      candidates += 1;

      if (await alreadyMigrated(supabase, row)) {
        skippedExisting += 1;
        continue;
      }

      if (!DRY_RUN) {
        await applyCandidate(supabase, row);
        applied += 1;
      }
    }

    if (rows.length < PAGE_SIZE) break;
    if (MAX_BACKFILL_ROWS > 0 && candidates >= MAX_BACKFILL_ROWS) break;
    page += 1;
  }

  console.log(JSON.stringify({
    dry_run: DRY_RUN,
    scanned,
    candidates,
    skipped_existing: skippedExisting,
    applied,
  }, null, 2));
}

const isMain = process.argv[1]?.endsWith("backfill-typed-memory-events.ts");
if (isMain) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
}

