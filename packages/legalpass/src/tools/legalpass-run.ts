import { createHash } from "node:crypto";
import type { ToolDescriptor } from "./index.js";
import { JurisdictionCodeSchema, ProfileSchema, TargetSchema } from "../pack-schema.js";
import {
  LegalPassFixtureDocumentSchema,
  type LegalPassFixtureDocumentInput,
  type LegalPassFinding,
  type LegalPassHatResult,
  type LegalPassPhaseOneHatId,
  type LegalPassReport,
} from "../schema.js";
import type {
  JurisdictionCode,
  PackItemResult,
  RunProfile,
  RunResult,
  RunTarget,
  Severity,
  Pack,
  Verdict,
  VerdictSummary,
} from "../types.js";
import {
  createFixtureLegalPassReport,
  createLegalPassVerdictPack,
} from "../verdict-pack.js";
import { assertVerdictText } from "../passguard/verdict-linter.js";
import { getDefaultPack, getPack, saveRun } from "./store.js";

export interface LegalpassRunArgs {
  pack_id?: string;
  target: RunTarget;
  profile?: RunProfile;
  jurisdictions?: string[];
  fixture_text?: string;
  fixture_documents?: LegalPassFixtureDocumentInput[];
}

export const legalpassRunTool: ToolDescriptor<LegalpassRunArgs, RunResult> = {
  name: "legalpass_run",
  description:
    "Run the current LegalPass phase-one issue-spotting pass against a URL, " +
    "contract upload, or repo. Issue-spotter only - never produces a " +
    "transactional legal instrument and never recommends a specific legal action.",
  inputSchema: {
    type: "object",
    required: ["target"],
    properties: {
      pack_id: { type: "string", minLength: 1, default: "legalpass-mvp-v0" },
      target: {
        type: "object",
        required: ["kind"],
        properties: {
          kind: { type: "string", enum: ["url", "contract_upload", "repo"] },
          url: { type: "string", format: "uri" },
          upload_ref: { type: "string" },
          repo: { type: "string" },
          branch: { type: "string" },
          commit: { type: "string" },
        },
      },
      profile: { type: "string", enum: ["smoke", "standard", "deep"] },
      jurisdictions: { type: "array", items: { type: "string" } },
      fixture_text: {
        type: "string",
        description:
          "Public, user-supplied text to evaluate deterministically. No private legal advice is inferred.",
      },
      fixture_documents: {
        type: "array",
        description:
          "Public fixture documents for deterministic issue-spotting. Used for dogfood and local proof.",
        items: { type: "object" },
      },
    },
  },
  handler: async (args) => {
    const target = TargetSchema.parse(args.target);
    const packId = args.pack_id ?? getDefaultPack().id;
    const pack = getPack(packId);
    if (!pack) {
      throw new Error(`legalpass_run: pack '${packId}' was not found`);
    }
    if (!pack.targets.includes(target.kind)) {
      throw new Error(
        `legalpass_run: pack '${packId}' does not support target kind '${target.kind}'`,
      );
    }

    const profile = ProfileSchema.parse(args.profile ?? pack.profile);
    const jurisdictions = parseJurisdictions(args.jurisdictions ?? pack.jurisdictions);
    const documents = normalizeFixtureDocuments(target, args);
    const hatIds = phaseOneHatIdsForPack(pack);
    const generated_at = stableGeneratedAt({
      packId,
      target,
      profile,
      jurisdictions,
      documents,
      hatIds,
    });
    const report = documents.length > 0
      ? createFixtureLegalPassReport({
          target: toLegalPassTarget(target),
          jurisdictions,
          hat_ids: hatIds,
          documents,
          generated_at,
        })
      : createLegalPassVerdictPack({
          target: toLegalPassTarget(target),
          jurisdictions,
          hat_ids: hatIds,
          generated_at,
        });

    const result = toRunResult({ packId, target, profile, report });
    return saveRun(result);
  },
};

function parseJurisdictions(values: string[]): JurisdictionCode[] {
  return values.map((value) => JurisdictionCodeSchema.parse(value));
}

function phaseOneHatIdsForPack(pack: Pack): LegalPassPhaseOneHatId[] {
  const enabledHatIds = new Set(
    pack.hats
      .filter((hat) => hat.enabled !== false)
      .map((hat) => hat.hat_id),
  );
  const phaseOneHatIds: LegalPassPhaseOneHatId[] = [];

  if (enabledHatIds.has("privacy")) {
    phaseOneHatIds.push("privacy-policy");
  }
  if (enabledHatIds.has("consumer_tos") || enabledHatIds.has("contracts")) {
    phaseOneHatIds.push("tos-unfair-terms");
  }
  if (enabledHatIds.has("oss_licence")) {
    phaseOneHatIds.push("oss-licence");
  }

  if (phaseOneHatIds.length === 0) {
    throw new Error(
      `legalpass_run: pack '${pack.id}' has no enabled phase-one LegalPass hats`,
    );
  }

  return phaseOneHatIds;
}

function normalizeFixtureDocuments(
  target: RunTarget,
  args: LegalpassRunArgs,
): LegalPassFixtureDocumentInput[] {
  if (args.fixture_documents?.length) {
    return args.fixture_documents.map(parsePublicFixtureDocument);
  }

  const text = args.fixture_text?.trim();
  if (!text) {
    return [];
  }

  return [
    {
      id: "inline-public-fixture",
      kind: target.kind === "repo"
        ? "oss-manifest"
        : target.kind === "url"
          ? "website"
          : "terms-of-service",
      title: "Inline public fixture",
      source_url: target.url,
      text,
      public_only: true,
    },
  ];
}

function parsePublicFixtureDocument(
  document: LegalPassFixtureDocumentInput,
): LegalPassFixtureDocumentInput {
  const parsed = LegalPassFixtureDocumentSchema.parse(document);
  if (parsed.public_only !== true) {
    throw new Error(
      "legalpass_run: fixture_documents must be public_only; private uploads need a later guarded ingestion path",
    );
  }
  return parsed;
}

function toLegalPassTarget(target: RunTarget): { name: string; url?: string } {
  if (target.kind === "url") {
    return {
      name: target.url ? new URL(target.url).hostname : "URL target",
      url: target.url,
    };
  }

  if (target.kind === "repo") {
    return { name: target.repo ?? "Repository target" };
  }

  return { name: target.upload_ref ?? "Contract upload" };
}

function toRunResult(input: {
  packId: string;
  target: RunTarget;
  profile: RunProfile;
  report: LegalPassReport;
}): RunResult {
  const items = input.report.hats.flatMap((hat) => toPackItems(hat));
  const summary = summarize(items);
  const createdAt = input.report.generated_at;

  return {
    run_id: buildRunId(input),
    pack_id: input.packId,
    target: input.target,
    profile: input.profile,
    status: "complete",
    summary,
    items,
    vetoed_items: [],
    audit_log: [],
    created_at: createdAt,
    completed_at: createdAt,
  };
}

function toPackItems(hat: LegalPassHatResult): PackItemResult[] {
  if (hat.findings.length === 0) {
    const verdict: Verdict = hat.verdict === "unknown" ? "pending" : "check";
    const finding = hat.comments.join(" ");
    assertVerdictText(finding, `${hat.hat_id}.finding`);
    return [
      {
        hat_id: hat.hat_id,
        item_id: `${hat.hat_id}.summary`,
        title: `${hat.label} issue-spotter summary`,
        category: "legalpass.issue_spotter",
        severity: "low",
        verdict,
        finding,
        citations: [],
      },
    ];
  }

  return hat.findings.map((finding) => toPackItem(hat, finding));
}

function toPackItem(hat: LegalPassHatResult, finding: LegalPassFinding): PackItemResult {
  const text = `${finding.summary} ${finding.issue_spotting_note ?? ""}`.trim();
  assertVerdictText(text, finding.id);

  return {
    hat_id: hat.hat_id,
    item_id: finding.id,
    title: finding.title,
    category: `legalpass.${finding.hat_id}`,
    severity: finding.severity as Severity,
    verdict: finding.practitioner_review_flag ? "fail" : "other",
    finding: text,
    citations: finding.evidence.map((evidence) => ({
      source: evidence.label,
      excerpt: evidence.summary,
      url: evidence.source_url,
    })),
    on_fail_comment: finding.practitioner_review_flag
      ? "Issue-spotter flag only. Qualified practitioner review may be warranted before any action is taken."
      : undefined,
  };
}

function summarize(items: PackItemResult[]): VerdictSummary {
  const summary: VerdictSummary = {
    total: items.length,
    check: 0,
    na: 0,
    fail: 0,
    other: 0,
    pending: 0,
    pass_rate: 0,
  };

  for (const item of items) {
    summary[item.verdict] += 1;
  }

  summary.pass_rate = summary.total === 0
    ? 0
    : Math.round((summary.check / summary.total) * 100);
  return summary;
}

function buildRunId(input: {
  packId: string;
  target: RunTarget;
  profile: RunProfile;
  report: LegalPassReport;
}): string {
  const hash = createHash("sha256")
    .update(JSON.stringify({
      packId: input.packId,
      target: input.target,
      profile: input.profile,
      report: input.report,
    }))
    .digest("hex")
    .slice(0, 12);
  return `legalpass_${hash}`;
}

function stableGeneratedAt(input: {
  packId: string;
  target: RunTarget;
  profile: RunProfile;
  jurisdictions: JurisdictionCode[];
  documents: LegalPassFixtureDocumentInput[];
  hatIds: LegalPassPhaseOneHatId[];
}): string {
  const hash = createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex")
    .slice(0, 8);
  const seconds = Number.parseInt(hash, 16) % (365 * 24 * 60 * 60);
  return new Date(Date.UTC(2026, 0, 1, 0, 0, seconds)).toISOString();
}

export const __legalpassRunInternals = {
  summarize,
};
