import { load as loadYaml } from "js-yaml";
import { SecurityPackSchema } from "../types/pack-schema.js";
import {
  getRun,
  getFinding,
  listFindings,
} from "../runner/run-store.js";
import { runSkeletonScan } from "../runner/index.js";

// Shared MCP tool descriptor shape. Mirrors the structure used by
// packages/mcp-server/src/server.ts so wiring SecurityPass into the catalog
// in a later chunk is a copy of the object literal.
export interface SecurityPassToolDef {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export const SECURITYPASS_TOOLS: SecurityPassToolDef[] = [
  {
    name: "securitypass_run",
    description:
      "Start a SecurityPass scan against a registered pack. Returns the run id; poll securitypass_status for completion.",
    inputSchema: {
      type: "object",
      properties: {
        pack_id: { type: "string", description: "Pack id, e.g. 'securitypass-web-baseline'" },
        target_url: { type: "string", description: "Target URL (must be in pack scope)" },
        profile: {
          type: "string",
          enum: ["smoke", "standard", "deep"],
          default: "smoke",
        },
      },
      required: ["pack_id", "target_url"],
    },
  },
  {
    name: "securitypass_status",
    description:
      "Poll the state of a SecurityPass run. Returns status, verdict summary, and counts.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: { type: "string", description: "The run id returned by securitypass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "securitypass_report",
    description:
      "Fetch the synthesised report for a completed run (executive narrative + findings). format=json|markdown|html.",
    inputSchema: {
      type: "object",
      properties: {
        run_id: { type: "string" },
        format: { type: "string", enum: ["json", "markdown", "html"], default: "json" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "securitypass_register_pack",
    description: "Save a SecurityPack YAML for the calling tenant. Validates against the schema.",
    inputSchema: {
      type: "object",
      properties: {
        pack_id: { type: "string" },
        yaml: { type: "string", description: "Pack contents as YAML" },
      },
      required: ["pack_id", "yaml"],
    },
  },
  {
    name: "securitypass_verify_scope",
    description:
      "Verify scope authorisation for a target via DNS TXT or /.well-known proof. Required before any active probe runs.",
    inputSchema: {
      type: "object",
      properties: {
        target_url: { type: "string" },
        proof_method: {
          type: "string",
          enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"],
        },
        expected_token: { type: "string", description: "Token to look for in DNS TXT or /.well-known" },
      },
      required: ["target_url", "proof_method"],
    },
  },
  {
    name: "securitypass_disclosure_status",
    description:
      "Check the 90+30 responsible-disclosure timer state for a finding (notified, acked, extended, public, withdrawn).",
    inputSchema: {
      type: "object",
      properties: {
        finding_id: { type: "string" },
      },
      required: ["finding_id"],
    },
  },
  {
    name: "securitypass_finding_detail",
    description:
      "Fetch a single finding including PoC payload (curl / prompt / payload) and remediation. PoC is generated, never auto-fired.",
    inputSchema: {
      type: "object",
      properties: {
        finding_id: { type: "string" },
      },
      required: ["finding_id"],
    },
  },
];

// ── Handlers ────────────────────────────────────────────────────────────────
// Stubs return placeholder payloads marked with `stub: true` so callers in
// dev surfaces can render "not yet wired" without crashing. Real implementations
// land in chunks 2-5 and replace each handler body in place.

export type SecurityPassHandler = (args: Record<string, unknown>) => Promise<unknown>;

export async function securitypassRun(args: Record<string, unknown>): Promise<unknown> {
  const packId = String(args.pack_id ?? "");
  const targetUrl = String(args.target_url ?? "");
  if (!packId) return { error: "pack_id is required" };
  if (!targetUrl) return { error: "target_url is required" };

  // TODO(securitypass-runner): once chunk 2 lands, dispatch to the full
  // pack-driven runner instead of the skeleton headers probe.
  const result = await runSkeletonScan({
    pack_id: packId,
    target: { type: "url", url: targetUrl },
    profile: (args.profile as "smoke" | "standard" | "deep") ?? "smoke",
  });
  return {
    stub: true,
    run_id: result.run.id,
    status: result.run.status,
    verdict_summary: result.run.verdict_summary,
  };
}

export async function securitypassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = String(args.run_id ?? "");
  if (!runId) return { error: "run_id is required" };
  const run = getRun(runId);
  if (!run) return { error: "run not found", run_id: runId };
  return {
    stub: true,
    run_id: run.id,
    status: run.status,
    verdict_summary: run.verdict_summary,
    completed_at: run.completed_at,
  };
}

export async function securitypassReport(args: Record<string, unknown>): Promise<unknown> {
  const runId = String(args.run_id ?? "");
  if (!runId) return { error: "run_id is required" };
  const run = getRun(runId);
  if (!run) return { error: "run not found", run_id: runId };
  const findings = listFindings(runId);
  // TODO(securitypass-reporter): synthesise executive narrative + score in
  // chunk 4. For now, return raw findings + summary.
  return {
    stub: true,
    format: String(args.format ?? "json"),
    run,
    findings,
    score: null,
    narrative: null,
  };
}

export async function securitypassRegisterPack(args: Record<string, unknown>): Promise<unknown> {
  const packId = String(args.pack_id ?? "");
  const yaml = String(args.yaml ?? "");
  if (!packId) return { error: "pack_id is required" };
  if (!yaml) return { error: "yaml is required" };
  let parsed: unknown;
  try {
    parsed = loadYaml(yaml);
  } catch (err) {
    return { error: "yaml parse failed", detail: err instanceof Error ? err.message : String(err) };
  }
  const result = SecurityPackSchema.safeParse(parsed);
  if (!result.success) {
    return {
      error: "schema validation failed",
      issues: result.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    };
  }
  // TODO(securitypass-registry): persist to Supabase securitypass_packs in chunk 3.
  return { stub: true, pack_id: packId, persisted: false };
}

export async function securitypassVerifyScope(args: Record<string, unknown>): Promise<unknown> {
  const targetUrl = String(args.target_url ?? "");
  const proofMethod = String(args.proof_method ?? "");
  if (!targetUrl) return { error: "target_url is required" };
  if (!proofMethod) return { error: "proof_method is required" };
  // TODO(securitypass-scope): actually walk DNS TXT / .well-known in chunk 2.
  return {
    stub: true,
    target_url: targetUrl,
    proof_method: proofMethod,
    verified: false,
    reason: "scope verification not yet implemented",
  };
}

export async function securitypassDisclosureStatus(args: Record<string, unknown>): Promise<unknown> {
  const findingId = String(args.finding_id ?? "");
  if (!findingId) return { error: "finding_id is required" };
  // TODO(securitypass-disclosure): wire the 90+30 timer service in chunk 5.
  return {
    stub: true,
    finding_id: findingId,
    state: "notified",
    notified_at: null,
    ack_deadline_at: null,
    public_at: null,
    extension_until_at: null,
  };
}

export async function securitypassFindingDetail(args: Record<string, unknown>): Promise<unknown> {
  const findingId = String(args.finding_id ?? "");
  if (!findingId) return { error: "finding_id is required" };
  const finding = getFinding(findingId);
  if (!finding) return { error: "finding not found", finding_id: findingId };
  return {
    stub: true,
    finding,
    // PoC stays absent until chunk 4 wires the generator. The runtime
    // contract: PoCs are GENERATED, NEVER auto-fired. Any handler change
    // must preserve that invariant.
    poc: finding.poc ?? null,
  };
}

export const SECURITYPASS_HANDLERS: Record<string, SecurityPassHandler> = {
  securitypass_run: securitypassRun,
  securitypass_status: securitypassStatus,
  securitypass_report: securitypassReport,
  securitypass_register_pack: securitypassRegisterPack,
  securitypass_verify_scope: securitypassVerifyScope,
  securitypass_disclosure_status: securitypassDisclosureStatus,
  securitypass_finding_detail: securitypassFindingDetail,
};
