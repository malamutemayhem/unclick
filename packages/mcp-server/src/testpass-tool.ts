/**
 * testpass-tool - MCP handlers for starting TestPass runs, polling status,
 * and fetching reports in HTML, JSON, or Markdown.
 *
 * All handlers call back into the UnClick Vercel API (/api/testpass) using
 * the caller's UNCLICK_API_KEY as the Bearer token. The API resolves the
 * caller's user id from that token and enforces actor_user_id scoping.
 */

const API_BASE = (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getApiKey(): string {
  const key = process.env.UNCLICK_API_KEY?.trim();
  if (!key) {
    throw new Error("UNCLICK_API_KEY env var is not set. Get your install config at https://unclick.world");
  }
  return key;
}

function parseTextBody(text: string): unknown {
  try { return text ? JSON.parse(text) : null; } catch { return text; }
}

async function fetchJson(path: string): Promise<{ ok: boolean; status: number; body: unknown }> {
  const apiKey = getApiKey();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: parseTextBody(text) };
}

export async function testpassListPacks(): Promise<unknown> {
  const result = await fetchJson("/api/memory-admin?action=list_testpass_packs");
  if (!result.ok) return { error: `testpass list_packs failed (HTTP ${result.status})`, body: result.body };
  return result.body;
}

export async function testpassRun(args: Record<string, unknown>): Promise<unknown> {
  const targetUrl = String(args.target_url ?? "");
  const packId = String(args.pack_id ?? "testpass-core");
  const profile = String(args.profile ?? "smoke");
  const taskId = typeof args.task_id === "string" && args.task_id ? args.task_id : undefined;
  if (!targetUrl) return { error: "target_url is required" };

  const apiKey = getApiKey();
  const requestBody: Record<string, unknown> = {
    target: { type: "mcp", url: targetUrl },
    profile,
  };
  requestBody[UUID_RE.test(packId) ? "pack_id" : "pack_slug"] = packId;
  if (taskId) requestBody.task_id = taskId;
  const res = await fetch(`${API_BASE}/api/testpass?action=start_run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });
  const text = await res.text();
  const body = parseTextBody(text);
  if (!res.ok) return { error: `testpass start_run failed (HTTP ${res.status})`, body };
  return body;
}

export async function testpassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = String(args.run_id ?? "");
  if (!runId) return { error: "run_id is required" };

  const result = await fetchJson(`/api/testpass?action=status&run_id=${encodeURIComponent(runId)}`);
  if (!result.ok) return { error: `testpass status failed (HTTP ${result.status})`, body: result.body };
  return result.body;
}

export async function testpassReportHtml(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };

  const apiKey = getApiKey();
  const res = await fetch(
    `${API_BASE}/api/testpass?action=report_html&run_id=${encodeURIComponent(runId)}`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  const text = await res.text();
  if (!res.ok) {
    const body = parseTextBody(text);
    return { error: `testpass report_html failed (HTTP ${res.status})`, body };
  }
  return { run_id: runId, format: "html", body: text };
}

export async function testpassReportJson(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };

  const result = await fetchJson(`/api/testpass?action=report_json&run_id=${encodeURIComponent(runId)}`);
  if (!result.ok) return { error: `testpass report_json failed (HTTP ${result.status})`, body: result.body };
  return { run_id: runId, format: "json", body: result.body };
}

export async function testpassReportMd(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };

  const result = await fetchJson(`/api/testpass?action=report_md&run_id=${encodeURIComponent(runId)}`);
  if (!result.ok) return { error: `testpass report_md failed (HTTP ${result.status})`, body: result.body };
  if (result.body && typeof result.body === "object" && "markdown" in result.body) {
    return { run_id: runId, format: "md", body: (result.body as { markdown: string }).markdown };
  }
  return result.body;
}

export async function testpassFixList(args: Record<string, unknown>): Promise<unknown> {
  return testpassReportMd(args);
}

export async function testpassEvidence(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  const itemId = typeof args.item_id === "string" ? args.item_id : "";
  const checkId = typeof args.check_id === "string" ? args.check_id : "";
  if (!runId) return { error: "run_id is required" };
  if (!itemId && !checkId) return { error: "item_id or check_id is required" };

  const result = await fetchJson(`/api/testpass?action=report_json&run_id=${encodeURIComponent(runId)}`);
  if (!result.ok) return { error: `testpass evidence failed (HTTP ${result.status})`, body: result.body };
  const body = result.body as {
    items?: Array<Record<string, unknown>>;
    evidence?: Record<string, unknown>;
  } | null;
  const item = body?.items?.find((candidate) => {
    return (itemId && candidate.id === itemId) || (checkId && candidate.check_id === checkId);
  });
  if (!item) return { error: "item not found", run_id: runId, item_id: itemId || undefined, check_id: checkId || undefined };
  const evidenceRef = typeof item.evidence_ref === "string" ? item.evidence_ref : "";
  const evidence = evidenceRef && body?.evidence ? body.evidence[evidenceRef] ?? null : null;
  return { run_id: runId, item, evidence_ref: evidenceRef || null, evidence };
}

export async function testpassSavePack(args: Record<string, unknown>): Promise<unknown> {
  const packId = String(args.pack_id ?? "");
  const yaml = String(args.yaml ?? "");
  if (!packId) return { error: "pack_id is required" };
  if (!yaml) return { error: "yaml is required" };

  const apiKey = getApiKey();
  const res = await fetch(`${API_BASE}/api/testpass?action=save_pack`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ pack_id: packId, pack_yaml: yaml }),
  });
  const text = await res.text();
  const body = parseTextBody(text);
  if (!res.ok) return { error: `testpass save_pack failed (HTTP ${res.status})`, body };
  return body;
}

export async function testpassEditItem(args: Record<string, unknown>): Promise<unknown> {
  const runId = String(args.run_id ?? "");
  const itemId = String(args.item_id ?? "");
  const verdict = String(args.verdict ?? "");
  const notes = args.notes;
  if (!runId) return { error: "run_id is required" };
  if (!itemId) return { error: "item_id is required" };
  if (!["pass", "fail", "na", "other"].includes(verdict)) {
    return { error: "verdict must be pass|fail|na|other" };
  }
  if (typeof notes !== "string" || notes.trim().length < 3) {
    return { error: "notes are required for manual verdict edits" };
  }

  const payload: Record<string, unknown> = { run_id: runId, item_id: itemId, verdict, notes: notes.trim() };

  const apiKey = getApiKey();
  const res = await fetch(`${API_BASE}/api/testpass?action=edit_item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  const body = parseTextBody(text);
  if (!res.ok) return { error: `testpass edit_item failed (HTTP ${res.status})`, body };
  return body;
}
