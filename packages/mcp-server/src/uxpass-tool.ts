/**
 * uxpass-tool - MCP handlers for UXPass.
 *
 * UXPass is the journey/usability sister to TestPass. uxpass_run, uxpass_status, and
 * the three uxpass_report_* tools call back into the UnClick Vercel API at
 * /api/uxpass using the caller's UNCLICK_API_KEY as a Bearer token (same
 * pattern as the testpass tool). The API resolves the key to a user id and
 * persists run + finding rows under that user.
 *
 * uxpass_register_pack still validates and persists packs to a local file
 * under packs/registered/. The full server-side packs table lands in a
 * later chunk; until then the local persistence keeps the wiring testable.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import yaml from "js-yaml";

const API_BASE = (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");

const PACKS_DIR = path.resolve(
  process.env.UXPASS_PACKS_DIR ??
    path.join(process.cwd(), "packages", "uxpass", "packs", "registered"),
);

const REQUIRED_PACK_KEYS = [
  "name",
  "url",
  "viewports",
  "themes",
  "hats",
  "synthesiser",
  "budgets",
  "remediation",
] as const;

type UxPassReceiptStatus = "PASS" | "WARN" | "BLOCKER" | "PENDING";

interface UxPassRunContext {
  target_sha?: string;
  target_url?: string;
  receipt?: UxPassMcpReceipt;
}

interface UxPassMcpReceipt {
  kind: "uxpass_receipt_v1";
  status: UxPassReceiptStatus;
  run_id: string;
  target_url: string | null;
  target_sha: string | null;
  generated_at: string;
  ux_score: number | null;
  checked: {
    total: number | null;
    pass: number | null;
    fail: number | null;
    na: number | null;
    finding_count: number | null;
  };
  visual_evidence: {
    browser_snapshot: "attached" | "missing" | "unknown";
    screenshot_proof: "present" | "missing" | "unknown";
    mobile_desktop_coverage: "covered" | "missing" | "unknown";
    note: string;
  };
  evidence_sources: string[];
  action_needed: string[];
  boundaries: string[];
}

const RUN_CONTEXT = new Map<string, UxPassRunContext>();

function getApiKey(): string {
  const key = process.env.UNCLICK_API_KEY?.trim();
  if (!key) {
    throw new Error("UNCLICK_API_KEY env var is not set. Get your install config at https://unclick.world");
  }
  return key;
}

async function callApi(
  pathAndQuery: string,
  init: { method?: string; body?: unknown } = {},
): Promise<unknown> {
  const apiKey = getApiKey();
  const res = await fetch(`${API_BASE}/api/uxpass${pathAndQuery}`, {
    method: init.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const text = await res.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    /* keep text */
  }
  if (!res.ok) return { error: `uxpass API failed (HTTP ${res.status})`, body };
  return body;
}

function recordValue(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function stringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function numberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function parseTargetSha(args: Record<string, unknown>): { value?: string; error?: string } {
  if (args.target_sha === undefined || args.target_sha === null) return {};
  if (typeof args.target_sha !== "string" || !args.target_sha.trim()) {
    return { error: "target_sha must be a non-empty string when provided" };
  }
  return { value: args.target_sha.trim() };
}

function checkedStats(body: Record<string, unknown>): UxPassMcpReceipt["checked"] {
  const stats = recordValue(body.stats);
  const breakdown = recordValue(body.breakdown);
  const byHat = recordValue(breakdown.by_hat);
  const findingCount = numberValue(body.finding_count);

  if (Object.keys(byHat).length > 0) {
    let pass = 0;
    let fail = 0;
    let na = 0;
    for (const value of Object.values(byHat)) {
      const row = recordValue(value);
      pass += numberValue(row.pass) ?? 0;
      fail += numberValue(row.fail) ?? 0;
      na += numberValue(row.na) ?? 0;
    }
    return { total: pass + fail + na, pass, fail, na, finding_count: findingCount };
  }

  const total = numberValue(stats.total);
  const pass = numberValue(stats.pass);
  const fail = numberValue(stats.fail);
  const na = numberValue(stats.na);
  return { total, pass, fail, na, finding_count: findingCount };
}

function hasScreenshotEvidence(body: Record<string, unknown>): boolean | null {
  const direct = stringValue(body.screenshot_url) ?? stringValue(body.screenshotUrl);
  if (direct) return true;
  const evidence = recordValue(body.evidence);
  const viewports = Array.isArray(evidence.viewports) ? evidence.viewports : [];
  if (viewports.some((viewport) => stringValue(recordValue(viewport).screenshot_url))) return true;
  if (viewports.length > 0) return false;
  return null;
}

function viewportCoverage(body: Record<string, unknown>): "covered" | "missing" | "unknown" {
  const evidence = recordValue(body.evidence);
  const viewports = Array.isArray(evidence.viewports) ? evidence.viewports : [];
  const names = new Set(viewports.map((viewport) => stringValue(recordValue(viewport).name)).filter(Boolean));
  if (names.size === 0) return "unknown";
  return names.has("mobile") && names.has("desktop") ? "covered" : "missing";
}

function receiptStatus(body: Record<string, unknown>, checked: UxPassMcpReceipt["checked"]): UxPassReceiptStatus {
  const status = stringValue(body.status);
  if (body.error || status === "failed" || status === "budget_exceeded") return "BLOCKER";
  if (status === "queued" || status === "running") return "PENDING";
  if ((checked.fail ?? 0) > 0 || (checked.finding_count ?? 0) > 0) return "BLOCKER";
  if ((checked.na ?? 0) > 0) return "WARN";
  if (!status || status !== "complete") return "WARN";
  return "PASS";
}

function buildUxPassReceipt(
  body: Record<string, unknown>,
  context: { runId: string; targetSha?: string; targetUrl?: string },
): UxPassMcpReceipt {
  const checked = checkedStats(body);
  const status = receiptStatus(body, checked);
  const screenshotEvidence = hasScreenshotEvidence(body);
  const coverage = viewportCoverage(body);
  const browserSnapshot = (checked.na ?? 0) > 0 ? "missing" : checked.na === 0 ? "attached" : "unknown";
  const screenshotProof = screenshotEvidence === true ? "present" : screenshotEvidence === false ? "missing" : "unknown";
  const actionNeeded: string[] = [];

  if (status === "BLOCKER") {
    actionNeeded.push("Fix failing UXPass findings before claiming the surface is UX-ready.");
  }
  if (status === "PENDING") {
    actionNeeded.push("Wait for the UXPass run to complete before using this receipt as proof.");
  }
  if (browserSnapshot === "missing") {
    actionNeeded.push("Attach browser-backed visual snapshots so layout, hierarchy, target-size, and contrast checks are not N/A.");
  }
  if (coverage !== "covered") {
    actionNeeded.push("Capture both mobile and desktop evidence before calling the visual critique complete.");
  }
  if (screenshotProof !== "present") {
    actionNeeded.push("Add screenshot proof for UIPass or UXPass Boardroom closure when the target has a visible interface.");
  }
  if (!context.targetSha) {
    actionNeeded.push("Bind the receipt to a target SHA when it is used for PR or release proof.");
  }

  return {
    kind: "uxpass_receipt_v1",
    status,
    run_id: context.runId,
    target_url: stringValue(body.target_url) ?? context.targetUrl ?? null,
    target_sha: context.targetSha ?? null,
    generated_at: new Date().toISOString(),
    ux_score: numberValue(body.ux_score),
    checked,
    visual_evidence: {
      browser_snapshot: browserSnapshot,
      screenshot_proof: screenshotProof,
      mobile_desktop_coverage: coverage,
      note: "Fetch-only UXPass checks are useful for journey readiness but do not prove UIPass visual polish without browser snapshots and screenshot evidence.",
    },
    evidence_sources: [
      "uxpass_api_response",
      checked.na !== null ? "uxpass_check_stats" : "uxpass_status_fields",
      screenshotProof === "present" ? "screenshot_evidence" : "screenshot_required",
    ],
    action_needed: Array.from(new Set(actionNeeded)),
    boundaries: [
      "UXPass is product UX readiness evidence, not a guarantee that every user path is polished.",
      "Fetch-only runs do not prove layout, hierarchy, mobile, contrast, or screenshot quality unless browser evidence is attached.",
      "This receipt must not include secrets, private production data, or local filesystem paths in public comments.",
    ],
  };
}

function attachUxPassReceipt(
  data: unknown,
  context: { runId?: string; targetSha?: string; targetUrl?: string },
): unknown {
  const body = recordValue(data);
  const runId = stringValue(body.run_id) ?? context.runId;
  if (!runId) return data;
  const prior = RUN_CONTEXT.get(runId);
  const receipt = buildUxPassReceipt(body, {
    runId,
    targetSha: context.targetSha ?? prior?.target_sha,
    targetUrl: context.targetUrl ?? prior?.target_url,
  });
  RUN_CONTEXT.set(runId, {
    target_sha: receipt.target_sha ?? undefined,
    target_url: receipt.target_url ?? undefined,
    receipt,
  });
  return {
    ...body,
    target_sha: receipt.target_sha,
    uxpass_receipt_v1: receipt,
  };
}

function ensurePacksDir(): void {
  try {
    fs.mkdirSync(PACKS_DIR, { recursive: true });
  } catch {
    // best effort. The handler returns a clear error if writeFileSync fails.
  }
}

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120);
}

export async function uxpassRun(args: Record<string, unknown>): Promise<unknown> {
  const url = typeof args.url === "string" ? args.url : undefined;
  const packName = typeof args.pack_name === "string" ? args.pack_name : undefined;
  const taskId = typeof args.task_id === "string" && args.task_id ? args.task_id : undefined;
  const targetSha = parseTargetSha(args);
  if (targetSha.error) return { error: targetSha.error };

  if (!url && !packName) {
    return { error: "Either url or pack_name is required" };
  }

  // pack_name still resolves locally because pack persistence is file-based
  // until the server-side packs table lands. We resolve it to the pack's
  // declared url and submit a run for that.
  let targetUrl = url;
  if (!targetUrl && packName) {
    try {
      ensurePacksDir();
      const candidate = fs.readdirSync(PACKS_DIR).find((f) => f.startsWith(`${safeFilename(packName)}-`));
      if (!candidate) return { error: `No registered pack found for name '${packName}'` };
      const packYaml = fs.readFileSync(path.join(PACKS_DIR, candidate), "utf8");
      const parsed = yaml.load(packYaml) as { url?: string } | undefined;
      if (!parsed?.url) return { error: `Pack '${packName}' has no url field` };
      targetUrl = parsed.url;
    } catch (err) {
      return { error: `failed to read pack '${packName}': ${(err as Error).message}` };
    }
  }

  const body: Record<string, unknown> = { target_url: targetUrl, pack_slug: "uxpass-core" };
  if (taskId) body.task_id = taskId;
  const response = await callApi("?action=start_run", {
    method: "POST",
    body,
  });
  return attachUxPassReceipt(response, { targetSha: targetSha.value, targetUrl });
}

export async function uxpassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const response = await callApi(`?action=status&run_id=${encodeURIComponent(runId)}`);
  return attachUxPassReceipt(response, { runId });
}

export async function uxpassReportHtml(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const apiKey = getApiKey();
  const res = await fetch(
    `${API_BASE}/api/uxpass?action=report_html&run_id=${encodeURIComponent(runId)}`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  const text = await res.text();
  if (!res.ok) {
    let body: unknown = text;
    try { body = text ? JSON.parse(text) : null; } catch { /* keep text */ }
    return { error: `uxpass report_html failed (HTTP ${res.status})`, body };
  }
  return { run_id: runId, format: "html", body: text };
}

export async function uxpassReportJson(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const data = await callApi(`?action=report_json&run_id=${encodeURIComponent(runId)}`);
  return { run_id: runId, format: "json", body: data };
}

export async function uxpassReportMd(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const data = await callApi(`?action=report_md&run_id=${encodeURIComponent(runId)}`);
  if (data && typeof data === "object" && "markdown" in data) {
    return { run_id: runId, format: "md", body: (data as { markdown: string }).markdown };
  }
  return data;
}

export async function uxpassRegisterPack(args: Record<string, unknown>): Promise<unknown> {
  const packYaml = typeof args.pack_yaml === "string" ? args.pack_yaml : "";
  if (!packYaml) return { error: "pack_yaml is required" };

  let parsed: unknown;
  try {
    parsed = yaml.load(packYaml);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { error: `pack_yaml is not valid YAML: ${message}` };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { error: "pack_yaml must be a YAML object at the top level" };
  }
  const obj = parsed as Record<string, unknown>;
  const missing = REQUIRED_PACK_KEYS.filter((k) => obj[k] === undefined);
  if (missing.length > 0) {
    return {
      error: "pack is missing required keys",
      missing,
      hint: "Required keys are name, url, viewports, themes, hats, synthesiser, budgets, remediation. See @unclick/uxpass for the full zod schema.",
    };
  }

  const name = typeof obj.name === "string" ? obj.name : "";
  if (!name) return { error: "pack name must be a non-empty string" };

  ensurePacksDir();
  const packId = `${safeFilename(name)}-${crypto.randomBytes(4).toString("hex")}`;
  const filePath = path.join(PACKS_DIR, `${packId}.yaml`);
  try {
    fs.writeFileSync(filePath, packYaml, "utf8");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { error: `failed to persist pack: ${message}` };
  }

  return {
    pack_id: packId,
    name,
    file: filePath,
    note: "Persisted to local file. Database-backed pack persistence lands in a later chunk; uxpass_run currently resolves pack_name to its declared url and submits a deterministic run.",
  };
}
