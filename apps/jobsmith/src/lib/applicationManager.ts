import type { RulePackSummary } from "./checkEngine";

export type WelcomePacketStatus = "loading_inputs" | "needs_job_ad" | "ready_to_generate" | "draft_ready";

export interface ApplicationManagerInput {
  corpusReady: boolean;
  corpusStats?: {
    coverLetters: number;
    jobsApplied: number;
    roleTypes: string[];
    pastBrands: string[];
  };
  applicationRun?: {
    company: string;
    role: string;
    jobSource: string;
    sourceBackedClaim: string;
    proofNote: string;
  };
  jobText: string;
  draftReady: boolean;
  ruleSummary: Pick<RulePackSummary, "totalRules" | "categories" | "bySeverity" | "needsRefresh">;
}

export interface WelcomePacket {
  title: string;
  status: WelcomePacketStatus;
  purpose: string;
  availableInputs: string[];
  missingInputs: string[];
  capabilities: string[];
  safestNextMove: string;
  proofExpectations: string[];
  stopConditions: string[];
}

export function buildWelcomePacket(input: ApplicationManagerInput): WelcomePacket {
  const jobText = input.jobText.trim();
  const run = input.applicationRun;
  const availableInputs = [
    `Rule pack v1: ${input.ruleSummary.totalRules} rules across ${input.ruleSummary.categories.length} categories`,
    `${input.ruleSummary.bySeverity.ERROR} blocker rules and ${input.ruleSummary.needsRefresh} rules needing refresh`,
  ];

  if (input.corpusReady && input.corpusStats) {
    availableInputs.unshift(
      `CV corpus: ${input.corpusStats.coverLetters} cover letters and ${input.corpusStats.jobsApplied} prior applications`,
    );
    if (input.corpusStats.roleTypes.length > 0) {
      availableInputs.push(`Role signals: ${input.corpusStats.roleTypes.slice(0, 4).join(", ")}`);
    }
    if (input.corpusStats.pastBrands.length > 0) {
      availableInputs.push(`Brand signals: ${input.corpusStats.pastBrands.slice(0, 4).join(", ")}`);
    }
  }

  if (jobText.length > 0) {
    availableInputs.push(`Job ad: ${wordCount(jobText)} words pasted`);
  }

  if (run) {
    if (hasText(run.company)) availableInputs.push(`Company: ${run.company.trim()}`);
    if (hasText(run.role)) availableInputs.push(`Role: ${run.role.trim()}`);
    if (hasText(run.jobSource)) availableInputs.push(`Job source: ${run.jobSource.trim()}`);
    if (hasText(run.sourceBackedClaim)) availableInputs.push("Source-backed claim captured");
    if (hasText(run.proofNote)) availableInputs.push("Proof note captured");
  }

  if (input.draftReady) {
    availableInputs.push("Draft artifact: application packet generated for review");
  }

  const missingInputs: string[] = [];
  if (!input.corpusReady) missingInputs.push("Loaded CV corpus and voice profile");
  if (run) {
    if (!hasText(run.company)) missingInputs.push("Company");
    if (!hasText(run.role)) missingInputs.push("Role");
    if (!hasText(run.jobSource)) missingInputs.push("Job source");
    if (!hasText(run.sourceBackedClaim)) missingInputs.push("Source-backed claim");
    if (!hasText(run.proofNote)) missingInputs.push("Proof note");
  } else if (jobText.length === 0) {
    missingInputs.push("Full job ad or role brief");
  }
  if (!input.draftReady) missingInputs.push("Generated application packet artifact");

  const status = packetStatus(input.corpusReady, jobText, input.draftReady, run);

  return {
    title: "AI Welcome Packet",
    status,
    purpose:
      "JobSmith manages a job application run from intake to proof. It keeps the AI seat oriented, checks rules, creates artifacts, and shows what still needs review before submit-ready status.",
    availableInputs,
    missingInputs,
    capabilities: [
      "Tailor CV and cover letter language from the loaded voice profile",
      "Run deterministic rule-pack checks before claiming progress",
      "Separate automated findings from review-needed decision cards",
      "Track artifacts, proof, blockers, and submit-ready status for the run",
    ],
    safestNextMove: safestNextMove(status),
    proofExpectations: [
      "Record the job ad, generated artifacts, rule findings, and review-needed count",
      "Leave tests or API output for changed logic",
      "Leave screenshot or run proof before claiming the workflow moved",
    ],
    stopConditions: [
      "Do not submit an application",
      "Do not hide review-needed rules as passes",
      "Do not claim submit-ready while blockers or missing inputs remain",
    ],
  };
}

function packetStatus(
  corpusReady: boolean,
  jobText: string,
  draftReady: boolean,
  run?: ApplicationManagerInput["applicationRun"],
): WelcomePacketStatus {
  if (!corpusReady) return "loading_inputs";
  if (run && hasApplicationRunInput(run)) {
    if (!applicationRunReady(run)) return "needs_job_ad";
    if (!draftReady) return "ready_to_generate";
    return "draft_ready";
  }
  if (jobText.length === 0) return "needs_job_ad";
  if (!draftReady) return "ready_to_generate";
  return "draft_ready";
}

function hasApplicationRunInput(run: ApplicationManagerInput["applicationRun"]): boolean {
  if (!run) return false;
  return (
    hasText(run.company) ||
    hasText(run.role) ||
    hasText(run.jobSource) ||
    hasText(run.sourceBackedClaim) ||
    hasText(run.proofNote)
  );
}

function applicationRunReady(run: NonNullable<ApplicationManagerInput["applicationRun"]>): boolean {
  return (
    hasText(run.company) &&
    hasText(run.role) &&
    hasText(run.jobSource) &&
    hasText(run.sourceBackedClaim) &&
    hasText(run.proofNote)
  );
}

function safestNextMove(status: WelcomePacketStatus): string {
  if (status === "loading_inputs") return "Wait for the corpus load or fix the corpus path before generating artifacts.";
  if (status === "needs_job_ad") return "Paste the full job ad, then let JobSmith build the first draft and rule-check packet.";
  if (status === "ready_to_generate") return "Generate the starter draft, then inspect deterministic findings and review-needed rules.";
  return "Review the generated draft, rule findings, artifacts, and missing proof before any submit-ready claim.";
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasText(value: string): boolean {
  return value.trim().length > 0;
}
