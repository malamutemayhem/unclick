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
  type FlowPassFixture,
  type FlowPassNormalizedPack,
  type FlowPassReport,
} from "../../flowpass/dist/index.js";

type ReportFormat = "json" | "markdown" | "html" | "fix_prompt";

interface FlowPassRunRecord {
  run_id: string;
  status: "planned" | "complete";
  pack_id?: string;
  report: FlowPassReport;
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

function storeRun(report: FlowPassReport, pack?: FlowPassNormalizedPack): FlowPassRunRecord {
  const runId = report.run_id ?? `flowpass_plan_${RUNS.size + 1}`;
  const record: FlowPassRunRecord = {
    run_id: runId,
    status: report.mode === "fixture" ? "complete" : "planned",
    pack_id: pack?.id,
    report,
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
    const record = storeRun(report, pack);
    return {
      run_id: record.run_id,
      status: record.status,
      pass: "flowpass",
      pack_id: record.pack_id,
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
    verdict: record.report.verdict,
    journey_readiness_score: record.report.journey_readiness_score,
    target_url: record.report.target_url,
    journey: record.report.journey,
    summary: record.report.summary,
    disagreements: record.report.disagreements.filter(
      (item) => !RESOLVED_DISAGREEMENTS.has(item.id),
    ),
    completed_at: record.report.generated_at,
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
