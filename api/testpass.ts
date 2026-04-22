/**
 * TestPass API - Vercel serverless function
 *
 * Actions:
 *   GET  ?action=get_run&run_id=<uuid>    - fetch run + items (raw shape)
 *   GET  ?action=status&run_id=<uuid>     - poll run status (status, run, items)
 *   GET  ?action=report_md&run_id=<uuid>  - markdown fix list for failed items
 *   POST ?action=start_run                - create run, probe target, seed items
 *   POST ?action=run                      - UI-friendly alias for start_run
 *   POST ?action=save_pack                - upsert a pack from raw YAML
 *   POST ?action=complete_run             - finalize a run
 *
 * Authentication: Supabase JWT Bearer token (session user = actor).
 * Service role key used server-side for DB writes (bypasses RLS which
 * checks actor_user_id = auth.uid() - that match happens at read time).
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import yaml from "js-yaml";
import { probeServer } from "../packages/testpass/src/probe.js";
import {
  createRun,
  createEvidence,
  seedPendingItems,
  updateRunStatus,
  computeVerdictSummary,
} from "../packages/testpass/src/run-manager.js";
import { runDeterministicChecks } from "../packages/testpass/src/runner/deterministic.js";
import { runAgentChecks } from "../packages/testpass/src/runner/agent.js";
import { loadPackFromFile } from "../packages/testpass/src/pack-loader.js";
import { PackSchema } from "../packages/testpass/src/pack-schema.js";
import * as path from "node:path";
import * as url from "node:url";
import type { RunTarget, RunProfile } from "../packages/testpass/src/types.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const CORS = {
  "Access-Control-Allow-Origin": "https://unclick.world",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Authorization,Content-Type",
};

function json(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader("Content-Type", "application/json");
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(body));
}

async function getActorUserId(
  supabaseUrl: string,
  token: string
): Promise<string | null> {
  const r = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "", Authorization: `Bearer ${token}` },
  });
  if (!r.ok) return null;
  const u = (await r.json()) as { id?: string };
  return u.id ?? null;
}

async function getPackIdBySlug(
  supabaseUrl: string,
  serviceKey: string,
  slug: string
): Promise<string | null> {
  const r = await fetch(
    `${supabaseUrl}/rest/v1/testpass_packs?slug=eq.${encodeURIComponent(slug)}&select=id&limit=1`,
    { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
  );
  if (!r.ok) return null;
  const rows = (await r.json()) as Array<{ id: string }>;
  return rows[0]?.id ?? null;
}

async function getRunWithItems(
  supabaseUrl: string,
  serviceKey: string,
  runId: string,
  actorUserId: string
) {
  const [runRes, itemsRes] = await Promise.all([
    fetch(
      `${supabaseUrl}/rest/v1/testpass_runs?id=eq.${runId}&actor_user_id=eq.${actorUserId}&select=*&limit=1`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    ),
    fetch(
      `${supabaseUrl}/rest/v1/testpass_items?run_id=eq.${runId}&select=*&order=created_at.asc`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    ),
  ]);
  const run = ((await runRes.json()) as unknown[])[0] ?? null;
  const items = (await itemsRes.json()) as unknown[];
  return { run, items };
}

class RunSetupError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

async function executeRun(
  config: { supabaseUrl: string; serviceRoleKey: string },
  supabaseUrl: string,
  serviceKey: string,
  actorUserId: string,
  packSlug: string,
  target: RunTarget,
  profile: RunProfile
): Promise<{ runId: string; evidenceRef: string | null; summary: Awaited<ReturnType<typeof computeVerdictSummary>> }> {
  const packId = await getPackIdBySlug(supabaseUrl, serviceKey, packSlug);
  if (!packId) throw new RunSetupError(404, `Pack '${packSlug}' not found`);

  const packPath = path.resolve(__dirname, `../packages/testpass/packs/${packSlug}.yaml`);
  let pack;
  try {
    pack = loadPackFromFile(packPath);
  } catch {
    throw new RunSetupError(422, `Pack YAML not found on server for '${packSlug}'`);
  }

  const runId = await createRun(config, { packId, target, profile, actorUserId });

  let evidenceRef: string | undefined;
  try {
    const probeResult = await probeServer(target.url, { timeoutMs: 12_000 });
    evidenceRef = await createEvidence(config, { kind: "tool_list", payload: probeResult });
  } catch (err) {
    console.error(`TestPass probe failed for run ${runId}:`, (err as Error).message);
  }

  await seedPendingItems(config, runId, pack, profile, evidenceRef);

  if (target.url) {
    try {
      await runDeterministicChecks(config, runId, target.url, pack, profile);
    } catch (err) {
      console.error(`TestPass deterministic run failed for ${runId}:`, (err as Error).message);
    }
  }

  try {
    await runAgentChecks(config, runId, target.url, pack, profile, evidenceRef);
  } catch (err) {
    console.error(`TestPass agent run failed for ${runId}:`, (err as Error).message);
  }

  const summary = await computeVerdictSummary(config, runId);
  const isDone = summary.pending === 0;
  await updateRunStatus(
    config,
    runId,
    isDone ? (summary.fail > 0 ? "failed" : "complete") : "running",
    summary,
  );

  return { runId, evidenceRef: evidenceRef ?? null, summary };
}

function buildFixListMarkdown(
  run: Record<string, unknown>,
  items: Array<Record<string, unknown>>
): string {
  const failed = items.filter((it) => it.verdict === "fail");
  const target = (run.target_url as string) ?? (run.target as { url?: string })?.url ?? "unknown";
  const lines: string[] = [];
  lines.push(`# TestPass Fix List`);
  lines.push("");
  lines.push(`**Target:** ${target}`);
  lines.push(`**Run:** ${String(run.id ?? "")}`);
  lines.push(`**Profile:** ${String(run.profile ?? "")}`);
  lines.push("");
  if (failed.length === 0) {
    lines.push("No failed checks. Everything passed or is pending/NA.");
    return lines.join("\n");
  }
  lines.push(`## ${failed.length} failing check${failed.length === 1 ? "" : "s"}`);
  lines.push("");
  for (const item of failed) {
    const checkId = String(item.check_id ?? "");
    const title = String(item.title ?? "");
    const severity = String(item.severity ?? "");
    const category = String(item.category ?? "");
    const onFail = String(item.on_fail_comment ?? item.on_fail ?? "");
    lines.push(`### ${checkId} - ${title}`);
    lines.push(`- **Severity:** ${severity}`);
    lines.push(`- **Category:** ${category}`);
    if (onFail) lines.push(`- **How to fix:** ${onFail}`);
    lines.push("");
  }
  return lines.join("\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return json(res, 204, {});

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return json(res, 500, { error: "Server misconfigured: missing Supabase env vars" });
  }

  const token = (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json(res, 401, { error: "Missing Bearer token" });

  const actorUserId = await getActorUserId(supabaseUrl, token);
  if (!actorUserId) return json(res, 401, { error: "Invalid session" });

  // Support action in query string OR request body (UI sends in body for POSTs).
  const bodyAction =
    req.method !== "GET" && typeof req.body === "object" && req.body
      ? (req.body as { action?: string }).action
      : undefined;
  const action = (req.query.action as string) ?? bodyAction ?? "";
  const config = { supabaseUrl, serviceRoleKey: serviceKey };

  if (req.method === "GET" && action === "get_run") {
    const runId = req.query.run_id as string;
    if (!runId) return json(res, 400, { error: "run_id required" });
    const data = await getRunWithItems(supabaseUrl, serviceKey, runId, actorUserId);
    if (!data.run) return json(res, 404, { error: "Run not found" });
    return json(res, 200, data);
  }

  if (req.method === "GET" && action === "status") {
    const runId = req.query.run_id as string;
    if (!runId) return json(res, 400, { error: "run_id required" });
    const data = await getRunWithItems(supabaseUrl, serviceKey, runId, actorUserId);
    if (!data.run) return json(res, 404, { error: "Run not found" });
    const run = data.run as { status?: string; summary?: unknown };
    return json(res, 200, {
      status: run.status ?? "running",
      summary: run.summary ?? null,
      run: data.run,
      items: data.items,
    });
  }

  if (req.method === "GET" && action === "report_md") {
    const runId = req.query.run_id as string;
    if (!runId) return json(res, 400, { error: "run_id required" });
    const data = await getRunWithItems(supabaseUrl, serviceKey, runId, actorUserId);
    if (!data.run) return json(res, 404, { error: "Run not found" });
    const markdown = buildFixListMarkdown(
      data.run as Record<string, unknown>,
      data.items as Array<Record<string, unknown>>
    );
    return json(res, 200, { markdown });
  }

  if (req.method === "POST" && action === "start_run") {
    const body = req.body as {
      pack_slug?: string;
      target?: RunTarget;
      profile?: RunProfile;
    };
    if (!body.pack_slug || !body.target?.url) {
      return json(res, 400, { error: "pack_slug and target.url required" });
    }
    try {
      const result = await executeRun(
        config,
        supabaseUrl,
        serviceKey,
        actorUserId,
        body.pack_slug,
        body.target,
        body.profile ?? "standard",
      );
      return json(res, 201, {
        run_id: result.runId,
        evidence_ref: result.evidenceRef,
        summary: result.summary,
      });
    } catch (err) {
      if (err instanceof RunSetupError) return json(res, err.statusCode, { error: err.message });
      throw err;
    }
  }

  // UI-friendly alias: accepts flat { target_url, profile, pack_slug? }.
  if (req.method === "POST" && action === "run") {
    const body = req.body as {
      target_url?: string;
      profile?: RunProfile;
      pack_slug?: string;
    };
    if (!body.target_url) return json(res, 400, { error: "target_url required" });
    try {
      const result = await executeRun(
        config,
        supabaseUrl,
        serviceKey,
        actorUserId,
        body.pack_slug ?? "testpass-core",
        { type: "mcp", url: body.target_url },
        body.profile ?? "standard",
      );
      return json(res, 201, {
        run_id: result.runId,
        evidence_ref: result.evidenceRef,
        summary: result.summary,
      });
    } catch (err) {
      if (err instanceof RunSetupError) return json(res, err.statusCode, { error: err.message });
      throw err;
    }
  }

  if (req.method === "POST" && action === "save_pack") {
    const body = req.body as { pack_yaml?: string };
    if (!body.pack_yaml) return json(res, 400, { error: "pack_yaml required" });

    let parsed: unknown;
    try {
      parsed = yaml.load(body.pack_yaml);
    } catch (err) {
      return json(res, 422, { error: `YAML parse error: ${(err as Error).message}` });
    }

    const validated = PackSchema.safeParse(parsed);
    if (!validated.success) {
      return json(res, 422, {
        error: "Pack validation failed",
        issues: validated.error.issues,
      });
    }
    const pack = validated.data;

    const upsertRes = await fetch(
      `${supabaseUrl}/rest/v1/testpass_packs?on_conflict=slug`,
      {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          slug: pack.id,
          name: pack.name,
          version: pack.version,
          description: pack.description ?? "",
          yaml: pack,
          owner_user_id: actorUserId,
        }),
      },
    );
    if (!upsertRes.ok) {
      const errText = await upsertRes.text();
      return json(res, 500, { error: `Upsert failed: ${errText}` });
    }
    const rows = (await upsertRes.json()) as Array<{ id: string; slug: string }>;
    return json(res, 200, {
      pack_id: rows[0]?.id ?? null,
      slug: rows[0]?.slug ?? pack.id,
      item_count: pack.items.length,
    });
  }

  // Complete a specific run (called when agent checks land after Chunk 4+)
  if (req.method === "POST" && action === "complete_run") {
    const body = req.body as { run_id?: string };
    if (!body.run_id) return json(res, 400, { error: "run_id required" });
    const summary = await computeVerdictSummary(config, body.run_id);
    const hasFailures = summary.fail > 0 || summary.pending > 0;
    await updateRunStatus(config, body.run_id, hasFailures ? "failed" : "complete", summary);
    return json(res, 200, { summary });
  }

  return json(res, 404, { error: "Unknown action" });
}
