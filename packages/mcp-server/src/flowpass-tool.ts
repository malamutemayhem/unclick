/**
 * flowpass-tool - MCP exposure for FlowPass.
 *
 * FlowPass proves user journeys from public fixtures. It does not drive live
 * auth, checkout, billing, email, production data, or destructive submissions
 * from this MCP surface.
 */

import {
  generateFlowPassFixPrompt,
  generateFlowPassHtmlReport,
  generateFlowPassJsonReport,
  generateFlowPassMarkdownReport,
  parseFlowPassPack,
  runFlowPass,
} from "./flowpass-runtime.js";

type ReportFormat = "json" | "markdown" | "html" | "fix_prompt";
type FlowPassFixture = Record<string, unknown>;
type FlowPassReceiptStatus = "PASS" | "WARN" | "BLOCKER" | "PENDING";

interface FlowPassJourney {
  id: string;
  name: string;
  kind: string;
}

interface FlowPassNormalizedPack {
  id: string;
  name: string;
  targetUrl: string;
  journey: FlowPassJourney;
  steps: unknown[];
  plainEnglishSteps: unknown[];
  assertions: unknown[];
  hats: unknown[];
  fixture?: FlowPassFixture;
}

interface FlowPassReport {
  run_id?: string;
  mode: "plan-only" | "fixture" | "live-readonly";
  profile: "smoke" | "standard" | "deep";
  verdict: "ready" | "needs-work" | "blocked" | "unknown";
  journey_readiness_score: number;
  target_url: string;
  journey: FlowPassJourney;
  summary?: {
    counts_by_verdict?: Partial<Record<"pass" | "warn" | "fail" | "unknown", number>>;
  } & Record<string, unknown>;
  steps: Array<{
    step_id: string;
    label: string;
    score: number;
    verdict: "pass" | "warn" | "fail" | "unknown";
    evidence?: FlowPassReceiptEvidence[];
    findings?: FlowPassReceiptFinding[];
  }>;
  disagreements: Array<{ id: string; summary?: string } & Record<string, unknown>>;
  not_checked: Array<{ label: string; reason: string }>;
  notes: string[];
  generated_at: string;
}

interface FlowPassReceiptEvidence {
  kind: string;
  label: string;
  source_url?: string;
  summary: string;
}

interface FlowPassReceiptFinding {
  id: string;
  recommendation?: string;
  title?: string;
  evidence?: FlowPassReceiptEvidence[];
}

interface FlowPassMcpReceipt {
  kind: "flowpass_receipt_v1";
  status: FlowPassReceiptStatus;
  run_id: string;
  target_url: string;
  target_sha?: string;
  generated_at: string;
  mode: FlowPassReport["mode"];
  profile: FlowPassReport["profile"];
  journey: FlowPassJourney;
  score: number;
  verdict: FlowPassReport["verdict"];
  checked: {
    total: number;
    pass: number;
    warn: number;
    fail: number;
    unknown: number;
  };
  evidence_sources: FlowPassReceiptEvidence[];
  not_checked: Array<{ label: string; reason: string }>;
  disagreements_open: number;
  action_needed: string[];
  boundaries: string[];
}

interface FlowPassRunRecord {
  run_id: string;
  status: "planned" | "complete";
  pack_id?: string;
  target_sha?: string;
  report: FlowPassReport;
  receipt: FlowPassMcpReceipt;
  reports: {
    json: object;
    markdown: string;
    html: string;
    fix_prompt: string;
  };
}

interface QuarantineRecord {
  flow_id: string;
  reason: string;
  status: "active" | "resolved";
  created_at: string;
  resolved_at?: string;
}

const PACKS = new Map<string, FlowPassNormalizedPack>();
const RUNS = new Map<string, FlowPassRunRecord>();
const QUARANTINE = new Map<string, QuarantineRecord>();
const RESOLVED_DISAGREEMENTS = new Set<string>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function httpUrlError(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return null;
    return "target_url must be a valid http(s) URL";
  } catch (error) {
    return `target_url must be a valid http(s) URL: ${error instanceof Error ? error.message : String(error)}`;
  }
}

function parseFormat(value: unknown): ReportFormat {
  return value === "markdown" || value === "html" || value === "fix_prompt" ? value : "json";
}

function parseFixture(value: unknown): FlowPassFixture | undefined {
  if (!isRecord(value)) return undefined;
  return value as unknown as FlowPassFixture;
}

function resolvePack(args: Record<string, unknown>): FlowPassNormalizedPack | undefined {
  if (typeof args.pack_yaml === "string" && args.pack_yaml.trim()) {
    const pack = parseFlowPassPack(args.pack_yaml);
    PACKS.set(pack.id, pack);
    return pack;
  }
  if (isRecord(args.pack)) {
    const pack = parseFlowPassPack(args.pack);
    PACKS.set(pack.id, pack);
    return pack;
  }
  const packId = typeof args.pack_id === "string" ? args.pack_id.trim() : "";
  if (packId) return PACKS.get(packId);
  const packName = typeof args.pack_name === "string" ? args.pack_name.trim() : "";
  if (packName) {
    return Array.from(PACKS.values()).find((pack) => pack.name === packName || pack.id === packName);
  }
  return undefined;
}

function buildFlowPassReceipt(
  report: FlowPassReport,
  runId: string,
  targetSha?: string,
): FlowPassMcpReceipt {
  const checked = checkedCounts(report);
  const openDisagreements = report.disagreements.filter((item) => !RESOLVED_DISAGREEMENTS.has(item.id));
  return {
    kind: "flowpass_receipt_v1",
    status: receiptStatus(report, checked, openDisagreements.length),
    run_id: runId,
    target_url: report.target_url,
    ...(targetSha ? { target_sha: targetSha } : {}),
    generated_at: report.generated_at,
    mode: report.mode,
    profile: report.profile,
    journey: report.journey,
    score: report.journey_readiness_score,
    verdict: report.verdict,
    checked,
    evidence_sources: receiptEvidence(report),
    not_checked: report.not_checked,
    disagreements_open: openDisagreements.length,
    action_needed: receiptActions(report, openDisagreements),
    boundaries: [
      "FlowPass uses provided public fixture evidence from this MCP surface.",
      "FlowPass does not drive live auth, checkout, billing, email, production data, or destructive submissions.",
      "Plan-only results are not PASS receipts until fixture or live read-only proof is supplied.",
    ],
  };
}

function checkedCounts(report: FlowPassReport): FlowPassMcpReceipt["checked"] {
  const summary = report.summary?.counts_by_verdict;
  return {
    total: report.steps.length,
    pass: summary?.pass ?? report.steps.filter((step) => step.verdict === "pass").length,
    warn: summary?.warn ?? report.steps.filter((step) => step.verdict === "warn").length,
    fail: summary?.fail ?? report.steps.filter((step) => step.verdict === "fail").length,
    unknown: summary?.unknown ?? report.steps.filter((step) => step.verdict === "unknown").length,
  };
}

function receiptStatus(
  report: FlowPassReport,
  checked: FlowPassMcpReceipt["checked"],
  disagreementsOpen: number,
): FlowPassReceiptStatus {
  if (report.mode === "plan-only" || report.verdict === "unknown" || checked.unknown > 0) return "PENDING";
  if (report.verdict === "blocked" || checked.fail > 0) return "BLOCKER";
  if (report.verdict === "needs-work" || checked.warn > 0 || disagreementsOpen > 0) {
    return "WARN";
  }
  return "PASS";
}

function receiptEvidence(report: FlowPassReport): FlowPassReceiptEvidence[] {
  const evidence = report.steps.flatMap((step) => [
    ...(step.evidence ?? []),
    ...((step.findings ?? []).flatMap((finding) => finding.evidence ?? [])),
  ]);
  const normalized = evidence.length > 0
    ? evidence
    : [{
        kind: "manual-note",
        label: "Plan-only note",
        source_url: report.target_url,
        summary: "Fixture proof is still required before FlowPass can act as a PASS receipt.",
      }];
  const seen = new Set<string>();
  return normalized.filter((item) => {
    const key = [item.kind, item.label, item.source_url ?? "", item.summary].join("\u0000");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 20);
}

function receiptActions(
  report: FlowPassReport,
  openDisagreements: Array<{ id: string; summary?: string }>,
): string[] {
  const actions = [
    ...(report.mode === "plan-only"
      ? ["Provide fixture proof before using this as a PASS receipt."]
      : []),
    ...openDisagreements.map((item) => `Resolve disagreement ${item.id}: ${item.summary ?? "review the open driver/verifier mismatch"}`),
    ...report.steps.flatMap((step) =>
      (step.findings ?? []).flatMap((finding) =>
        finding.recommendation ? [`${finding.id}: ${finding.recommendation}`] : [],
      ),
    ),
  ];
  return Array.from(new Set(actions)).slice(0, 12);
}

function parseTargetSha(value: unknown): string | undefined | { error: string } {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.trim().length === 0) {
    return { error: "target_sha must be a non-empty string when provided" };
  }
  return value.trim();
}

function storeRun(report: FlowPassReport, pack?: FlowPassNormalizedPack, targetSha?: string): FlowPassRunRecord {
  const runId = report.run_id ?? `flowpass_plan_${RUNS.size + 1}`;
  const record: FlowPassRunRecord = {
    run_id: runId,
    status: report.mode === "fixture" ? "complete" : "planned",
    pack_id: pack?.id,
    target_sha: targetSha,
    report,
    receipt: buildFlowPassReceipt(report, runId, targetSha),
    reports: {
      json: generateFlowPassJsonReport(report),
      markdown: generateFlowPassMarkdownReport(report),
      html: generateFlowPassHtmlReport(report),
      fix_prompt: generateFlowPassFixPrompt(report),
    },
  };
  RUNS.set(runId, record);
  return record;
}

export async function flowpassRun(args: Record<string, unknown>): Promise<unknown> {
  try {
    const targetSha = parseTargetSha(args.target_sha);
    if (isRecord(targetSha)) return targetSha;
    const pack = resolvePack(args);
    const targetUrl =
      (typeof args.target_url === "string" && args.target_url.trim()) ||
      (typeof args.url === "string" && args.url.trim()) ||
      pack?.targetUrl ||
      "";
    if (!targetUrl) return { error: "target_url, url, pack, pack_yaml, pack_id, or pack_name is required" };
    const targetUrlError = httpUrlError(targetUrl);
    if (targetUrlError) return { error: targetUrlError };

    const fixture = parseFixture(args.fixture) ?? pack?.fixture;
    const report = runFlowPass({
      target_url: targetUrl,
      generated_at: typeof args.generated_at === "string" ? args.generated_at : undefined,
      mode: fixture ? "fixture" : "plan-only",
      profile:
        args.profile === "standard" || args.profile === "deep" || args.profile === "smoke"
          ? args.profile
          : "smoke",
      journey_id:
        typeof args.journey_id === "string" && args.journey_id.trim()
          ? args.journey_id.trim()
          : pack?.journey.id,
      journey_name:
        typeof args.journey_name === "string" && args.journey_name.trim()
          ? args.journey_name.trim()
          : pack?.journey.name,
      journey_kind:
        args.journey_kind === "signup" ||
        args.journey_kind === "auth" ||
        args.journey_kind === "checkout" ||
        args.journey_kind === "onboarding" ||
        args.journey_kind === "support" ||
        args.journey_kind === "custom"
          ? args.journey_kind
          : pack?.journey.kind ?? "custom",
      steps: pack?.steps,
      fixture,
      notes: [
        "MCP FlowPass run used deterministic public fixtures only.",
        ...(pack ? [`Registered pack ${pack.id} supplied ${pack.plainEnglishSteps.length} plain-English step(s).`] : []),
      ],
    });
    const record = storeRun(report, pack, targetSha);
    return {
      run_id: record.run_id,
      status: record.status,
      pass: "flowpass",
      pack_id: record.pack_id,
      target_sha: record.target_sha,
      target_url: report.target_url,
      journey: report.journey,
      mode: report.mode,
      verdict: report.verdict,
      journey_readiness_score: report.journey_readiness_score,
      summary: report.summary,
      step_count: report.steps.length,
      finding_count: report.steps.flatMap((step) => step.findings).length,
      disagreements: report.disagreements,
      not_checked: report.not_checked,
      notes: report.notes,
      flowpass_receipt_v1: record.receipt,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function flowpassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id.trim() : "";
  if (!runId) return { error: "run_id is required" };
  const record = RUNS.get(runId);
  if (!record) return { error: `FlowPass run '${runId}' was not found in this MCP session` };
  return {
    run_id: record.run_id,
    status: record.status,
    pack_id: record.pack_id,
    target_sha: record.target_sha,
    verdict: record.report.verdict,
    journey_readiness_score: record.report.journey_readiness_score,
    target_url: record.report.target_url,
    journey: record.report.journey,
    summary: record.report.summary,
    disagreements: record.report.disagreements.filter(
      (item) => !RESOLVED_DISAGREEMENTS.has(item.id),
    ),
    completed_at: record.report.generated_at,
    flowpass_receipt_v1: {
      ...record.receipt,
      disagreements_open: record.report.disagreements.filter(
        (item) => !RESOLVED_DISAGREEMENTS.has(item.id),
      ).length,
    },
  };
}

export async function flowpassReport(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id.trim() : "";
  if (!runId) return { error: "run_id is required" };
  const record = RUNS.get(runId);
  if (!record) return { error: `FlowPass run '${runId}' was not found in this MCP session` };
  const format = parseFormat(args.format);
  return {
    run_id: runId,
    format,
    report: record.reports[format],
  };
}

export async function flowpassRegisterPack(args: Record<string, unknown>): Promise<unknown> {
  try {
    const source =
      typeof args.pack_yaml === "string" && args.pack_yaml.trim()
        ? args.pack_yaml
        : isRecord(args.pack)
          ? args.pack
          : undefined;
    if (!source) return { error: "pack_yaml or pack object is required" };
    const pack = parseFlowPassPack(source);
    if (!args.overwrite && PACKS.has(pack.id)) {
      return { error: `pack '${pack.id}' already exists; pass overwrite=true to update it` };
    }
    PACKS.set(pack.id, pack);
    return {
      pack_id: pack.id,
      saved: true,
      name: pack.name,
      target_url: pack.targetUrl,
      journey: pack.journey,
      step_count: pack.steps.length,
      plain_english_step_count: pack.plainEnglishSteps.length,
      assertion_count: pack.assertions.length,
      hat_count: pack.hats.length,
      has_fixture: Boolean(pack.fixture),
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function flowpassRecord(args: Record<string, unknown>): Promise<unknown> {
  const targetUrl = typeof args.target_url === "string" ? args.target_url.trim() : "";
  if (!targetUrl) return { error: "target_url must be a valid http(s) URL" };
  const targetUrlError = httpUrlError(targetUrl);
  if (targetUrlError) return { error: targetUrlError };
  const events = Array.isArray(args.session_events)
    ? args.session_events.map((event) => String(event)).filter((event) => event.trim())
    : [];
  if (events.length === 0) {
    return {
      status: "planned",
      note:
        "flowpass_record needs rrweb or structured session events. No browser recording was started from this safe MCP surface.",
      draft_pack: {
        flow: "recorded-flow-draft",
        url: targetUrl,
        steps: ["go to the entry route", "complete the primary journey", "verify the receipt or handoff proof"],
      },
    };
  }
  return {
    status: "drafted",
    draft_pack: {
      flow: "recorded-flow-draft",
      url: targetUrl,
      steps: events,
      assertions: ["verify the success state", "verify the receipt or handoff proof"],
    },
    note:
      "FlowPass converted supplied session events into a draft pack. Human approval is still required before this becomes a gate.",
  };
}

export async function flowpassQuarantine(args: Record<string, unknown>): Promise<unknown> {
  const action = typeof args.action === "string" ? args.action : "list";
  if (action === "list") {
    return { quarantined: Array.from(QUARANTINE.values()) };
  }
  const flowId = typeof args.flow_id === "string" ? args.flow_id.trim() : "";
  if (!flowId) return { error: "flow_id is required for add or resolve" };
  if (action === "add") {
    const record: QuarantineRecord = {
      flow_id: flowId,
      reason:
        typeof args.reason === "string" && args.reason.trim()
          ? args.reason.trim()
          : "FlowPass quarantine requested because the flow is not currently trustworthy.",
      status: "active",
      created_at: new Date().toISOString(),
    };
    QUARANTINE.set(flowId, record);
    return { quarantined: true, record };
  }
  if (action === "resolve") {
    const record = QUARANTINE.get(flowId);
    if (!record) return { error: `flow '${flowId}' is not quarantined` };
    record.status = "resolved";
    record.resolved_at = new Date().toISOString();
    QUARANTINE.set(flowId, record);
    return { resolved: true, record };
  }
  return { error: "action must be list|add|resolve" };
}

export async function flowpassDisagreementQueue(args: Record<string, unknown>): Promise<unknown> {
  const action = typeof args.action === "string" ? args.action : "list";
  if (action === "resolve") {
    const disagreementId = typeof args.disagreement_id === "string" ? args.disagreement_id.trim() : "";
    if (!disagreementId) return { error: "disagreement_id is required for resolve" };
    RESOLVED_DISAGREEMENTS.add(disagreementId);
    return {
      resolved: true,
      disagreement_id: disagreementId,
      reviewer_note: typeof args.reviewer_note === "string" ? args.reviewer_note : undefined,
    };
  }
  if (action !== "list") return { error: "action must be list|resolve" };

  const runId = typeof args.run_id === "string" ? args.run_id.trim() : "";
  const runs = runId ? [RUNS.get(runId)].filter(Boolean) : Array.from(RUNS.values());
  return {
    disagreements: runs.flatMap((record) =>
      record
        ? record.report.disagreements
            .filter((item) => !RESOLVED_DISAGREEMENTS.has(item.id))
            .map((item) => ({ ...item, run_id: record.run_id }))
        : [],
    ),
  };
}
