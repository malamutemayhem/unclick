import type { JurisdictionCode } from "./types.js";
import { getPhaseOneLegalPassHats } from "./hat-library.js";
import {
  LegalPassFixtureDocumentSchema,
  LegalPassReportSchema,
  type LegalPassFixtureDocument,
  type LegalPassFixtureDocumentInput,
  type LegalPassGeoPassAdapter,
  type LegalPassHatDefinition,
  type LegalPassHatResult,
  type LegalPassPhaseOneHatId,
  type LegalPassReport,
  type LegalPassReportVerdict,
  type LegalPassTarget,
} from "./schema.js";

const ISSUE_SPOTTER_DISCLAIMER =
  "LegalPass is an issue-spotter only. It surfaces public signals for review and is not a lawyer, legal opinion, or substitute for a qualified practitioner.";

export interface CreateLegalPassVerdictPackInput {
  target: LegalPassTarget;
  jurisdictions?: JurisdictionCode[];
  generated_at?: string;
  hat_ids?: LegalPassPhaseOneHatId[];
  geo_pass?: LegalPassGeoPassAdapter;
}

export interface CreateFixtureLegalPassReportInput extends CreateLegalPassVerdictPackInput {
  documents: LegalPassFixtureDocumentInput[];
}

export function createLegalPassVerdictPack(
  input: CreateLegalPassVerdictPackInput,
): LegalPassReport {
  const jurisdictions = input.jurisdictions ?? ["AU", "EU", "US-CA"];
  const hats = getPhaseOneLegalPassHats({
    hat_ids: input.hat_ids,
    jurisdictions,
  });
  assertPhaseOneHats(hats, jurisdictions);
  const report = {
    target: input.target,
    generated_at: input.generated_at ?? new Date().toISOString(),
    mode: "plan-only" as const,
    jurisdictions,
    overall_score: 0,
    verdict: "unknown" as const,
    hats: hats.map(createPlanOnlyHatResult),
    scanner_source: {
      kind: input.geo_pass ? "geopass-plan" as const : "manual" as const,
      mode: input.geo_pass?.mode ?? "plan-only" as const,
      target_url: input.geo_pass?.target_url ?? input.target.url,
      shared_check_ids: input.geo_pass?.shared_check_ids ?? [],
    },
    disclaimers: [ISSUE_SPOTTER_DISCLAIMER],
    notes: [
      "Plan-only LegalPass pack. No private contracts, production rows, paid calls, or live legal review were used.",
    ],
  };

  return LegalPassReportSchema.parse(report);
}

export function createFixtureLegalPassReport(
  input: CreateFixtureLegalPassReportInput,
): LegalPassReport {
  const jurisdictions = input.jurisdictions ?? ["AU", "EU", "US-CA"];
  const documents = input.documents.map(parsePublicFixtureDocument);
  const hats = getPhaseOneLegalPassHats({
    hat_ids: input.hat_ids,
    jurisdictions,
  });
  assertPhaseOneHats(hats, jurisdictions);
  const hatResults = hats.map((hat) => evaluateHatAgainstFixtures(hat, documents));
  const overall_score = Math.round(
    hatResults.reduce((total, result) => total + result.score, 0) / hatResults.length,
  );
  const report = {
    target: input.target,
    generated_at: input.generated_at ?? new Date().toISOString(),
    mode: "fixture" as const,
    jurisdictions,
    overall_score,
    verdict: toReportVerdict(hatResults),
    hats: hatResults,
    scanner_source: {
      kind: "fixture" as const,
      mode: "fixture" as const,
      target_url: input.geo_pass?.target_url ?? input.target.url,
      shared_check_ids: input.geo_pass?.shared_check_ids ?? [],
    },
    disclaimers: [ISSUE_SPOTTER_DISCLAIMER],
    notes: [
      "Fixture-only LegalPass report. Findings are deterministic text signals and may warrant human practitioner review before action.",
    ],
  };

  return LegalPassReportSchema.parse(report);
}

function parsePublicFixtureDocument(
  document: LegalPassFixtureDocumentInput,
): LegalPassFixtureDocument {
  const parsed = LegalPassFixtureDocumentSchema.parse(document);
  if (parsed.public_only !== true) {
    throw new Error(
      "LegalPass fixture reports require public_only documents; private uploads need a later guarded ingestion path",
    );
  }

  return parsed;
}

function assertPhaseOneHats(
  hats: LegalPassHatDefinition[],
  jurisdictions: JurisdictionCode[],
): void {
  if (hats.length > 0) return;
  throw new Error(
    `LegalPass requires at least one phase-one hat for jurisdictions: ${jurisdictions.join(", ")}`,
  );
}

function createPlanOnlyHatResult(hat: LegalPassHatDefinition): LegalPassHatResult {
  return {
    hat_id: hat.id,
    label: hat.label,
    score: 0,
    verdict: "unknown",
    findings: [],
    comments: [
      `${hat.label} is configured for fixture and read-only evidence collection.`,
    ],
  };
}

function evaluateHatAgainstFixtures(
  hat: LegalPassHatDefinition,
  documents: LegalPassFixtureDocument[],
): LegalPassHatResult {
  const relevantDocuments = documents.filter((document) =>
    (document.public_only ?? true) && hat.target_documents.includes(document.kind),
  );
  const searchableText = normalizeText(
    relevantDocuments.map((document) => document.text).join(" "),
  );
  const evidence = evidenceForHat(hat, relevantDocuments);
  const findings = hat.checks.flatMap((check) => {
    const matchedTerms = check.fixture_terms.filter((term) =>
      searchableText.includes(normalizeText(term)),
    );

    if (matchedTerms.length > 0) {
      return [];
    }

    return [
      {
        id: `${hat.id}.${check.id}.missing-fixture-signal`,
        hat_id: hat.id,
        severity: check.severity,
        title: `${check.label} fixture signal missing`,
        summary:
          "The provided public fixture text did not include the configured issue-spotting signal.",
        evidence,
        issue_spotting_note: check.issue_spotting_note,
        practitioner_review_flag: check.severity === "critical" || check.severity === "high",
      },
    ];
  });

  const passingChecks = hat.checks.length - findings.length;
  const score = Math.round((passingChecks / hat.checks.length) * 100);

  return {
    hat_id: hat.id,
    label: hat.label,
    score,
    verdict: toHatVerdict(score, findings.length),
    findings,
    comments: [
      `Evaluated ${relevantDocuments.length} public fixture document(s) for ${hat.label}.`,
    ],
  };
}

function evidenceForHat(
  hat: LegalPassHatDefinition,
  relevantDocuments: LegalPassFixtureDocument[],
): LegalPassHatResult["findings"][number]["evidence"] {
  if (relevantDocuments.length === 0) {
    return [
      {
        kind: "fixture",
        label: `${hat.label} fixture coverage`,
        summary:
          "No public fixture document matched the configured document kinds for this hat.",
      },
    ];
  }

  return relevantDocuments.map((document) => ({
    kind: "fixture" as const,
    label: document.title,
    source_url: document.source_url,
    summary: `Checked public fixture document ${document.id}.`,
  }));
}

function toHatVerdict(score: number, findingCount: number): LegalPassHatResult["verdict"] {
  if (findingCount === 0) {
    return "pass";
  }

  if (score >= 50) {
    return "warn";
  }

  return "fail";
}

function toReportVerdict(hats: LegalPassHatResult[]): LegalPassReportVerdict {
  if (hats.every((hat) => hat.verdict === "pass")) {
    return "ready";
  }

  if (hats.some((hat) => hat.verdict === "fail")) {
    return "blocked";
  }

  if (hats.some((hat) => hat.verdict === "warn")) {
    return "needs-review";
  }

  return "unknown";
}

function normalizeText(value: string): string {
  return value.toLocaleLowerCase("en-US").replace(/\s+/g, " ").trim();
}
