import type { JobsmithCheckResult, ReviewNeededRule, RuleFinding, RulePackSummary, RuleSeverity } from "./checkEngine";

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

export type DecisionCardOwner = "human" | "jobsmith" | "reviewer";
export type DecisionCardStatus = "needs_decision" | "blocked" | "ready_for_review";

export interface DecisionCard {
  id: string;
  ruleId: string;
  title: string;
  category: string;
  severity: RuleSeverity;
  owner: DecisionCardOwner;
  status: DecisionCardStatus;
  reason: string;
  proofNeeded: string;
  suggestedAction: string;
}

export interface DecisionCardInput {
  reviewNeeded: ReviewNeededRule[];
  findings: RuleFinding[];
  missingInputs: string[];
  artifactsReady: boolean;
}

export type ManagedApplicationRunStatus = "blocked" | "review_needed" | "proof_needed" | "submit_ready";
export type ManagedApplicationRunStepStatus = "blocked" | "ready" | "review_needed";
export type ManagedApplicationRunArtifactKind = "cv" | "cover_letter" | "starter_packet" | "proof_json" | "other";
export type ManagedApplicationRunProofKind = "api" | "screenshot" | "test" | "receipt";

export interface ManagedApplicationRunArtifact {
  id: string;
  label: string;
  kind: ManagedApplicationRunArtifactKind;
  ready: boolean;
  proof: string;
}

export interface ManagedApplicationRunProof {
  id: string;
  label: string;
  kind: ManagedApplicationRunProofKind;
  uri: string;
}

export interface ManagedApplicationRunInput {
  runId: string;
  company: string;
  role: string;
  jobSource: string;
  sourceBackedClaim: string;
  proofNote: string;
  ruleResult: Pick<JobsmithCheckResult, "totalRules" | "findings" | "reviewNeeded" | "blocked">;
  decisionCards: DecisionCard[];
  artifacts: ManagedApplicationRunArtifact[];
  proof: ManagedApplicationRunProof[];
}

export interface ManagedApplicationRunStep {
  id: string;
  label: string;
  status: ManagedApplicationRunStepStatus;
  reason: string;
  proofNeeded: string;
}

export interface ManagedApplicationRunReport {
  runId: string;
  status: ManagedApplicationRunStatus;
  submitReady: boolean;
  rulesPassed: number;
  blockers: string[];
  deterministicFindings: Array<Pick<RuleFinding, "ruleId" | "name" | "severity" | "message">>;
  reviewNeededCount: number;
  artifacts: ManagedApplicationRunArtifact[];
  proof: ManagedApplicationRunProof[];
  steps: ManagedApplicationRunStep[];
  nextSafeAction: string;
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

export function buildDecisionCards(input: DecisionCardInput): DecisionCard[] {
  const cards = new Map<string, DecisionCard>();

  for (const rule of input.reviewNeeded) {
    cards.set(rule.ruleId, {
      id: decisionCardId(rule.ruleId),
      ruleId: rule.ruleId,
      title: rule.name,
      category: rule.category,
      severity: rule.severity,
      owner: "human",
      status: rule.severity === "ERROR" ? "blocked" : "needs_decision",
      reason: reviewReason(rule),
      proofNeeded: proofNeededForRule(rule),
      suggestedAction: suggestedActionForRule(rule.severity),
    });
  }

  if (input.missingInputs.length > 0) {
    cards.set("jobsmith-missing-inputs", {
      id: "decision-card-jobsmith-missing-inputs",
      ruleId: "jobsmith-missing-inputs",
      title: "Missing application inputs",
      category: "INTAKE",
      severity: "ERROR",
      owner: "human",
      status: "blocked",
      reason: `JobSmith cannot claim submit-ready while missing: ${input.missingInputs.join(", ")}.`,
      proofNeeded: "Provide the missing inputs or attach a no-code reason for each one.",
      suggestedAction: "Fill the missing fields before generating or submitting the application pack.",
    });
  }

  if (!input.artifactsReady) {
    cards.set("jobsmith-artifacts", {
      id: "decision-card-jobsmith-artifacts",
      ruleId: "jobsmith-artifacts",
      title: "Application artifacts not ready",
      category: "ARTIFACTS",
      severity: "ERROR",
      owner: "jobsmith",
      status: "blocked",
      reason: "The CV, cover letter, or application pack artifact has not been generated yet.",
      proofNeeded: "Attach artifact paths or an engine receipt proving the pack was generated.",
      suggestedAction: "Generate the application pack, then rerun the rule checks.",
    });
  }

  for (const finding of input.findings) {
    if (finding.severity !== "ERROR") continue;
    cards.set(finding.ruleId, {
      id: decisionCardId(finding.ruleId),
      ruleId: finding.ruleId,
      title: finding.name,
      category: finding.category,
      severity: finding.severity,
      owner: "jobsmith",
      status: "blocked",
      reason: finding.message,
      proofNeeded: `Resolve or justify the matched text: "${finding.match}".`,
      suggestedAction: "Fix the blocker, rerun checks, and keep the before/after receipt.",
    });
  }

  return Array.from(cards.values()).sort(decisionCardSort);
}

export function buildManagedApplicationRun(input: ManagedApplicationRunInput): ManagedApplicationRunReport {
  const missingInputs = managedRunMissingInputs(input);
  const blockedCards = input.decisionCards.filter((card) => card.status === "blocked");
  const reviewCards = input.decisionCards.filter((card) => card.status === "needs_decision");
  const missingArtifacts = input.artifacts.filter((artifact) => !artifact.ready);
  const deterministicFindings = input.ruleResult.findings.map(({ ruleId, name, severity, message }) => ({
    ruleId,
    name,
    severity,
    message,
  }));
  const blockers = [
    ...missingInputs.map((missing) => `Missing input: ${missing}`),
    ...missingArtifacts.map((artifact) => `Artifact blocked: ${artifact.label}`),
    ...blockedCards.map((card) => `Decision card blocked: ${card.title}`),
    ...input.ruleResult.findings
      .filter((finding) => finding.severity === "ERROR")
      .map((finding) => `Deterministic blocker: ${finding.name}`),
  ];
  const rulesPassed = Math.max(0, input.ruleResult.totalRules - input.ruleResult.findings.length - input.ruleResult.reviewNeeded.length);
  const hasProof = input.proof.length > 0;
  const submitReady = blockers.length === 0 && reviewCards.length === 0 && hasProof;
  const status = managedRunStatus(blockers.length, reviewCards.length, hasProof);

  return {
    runId: input.runId,
    status,
    submitReady,
    rulesPassed,
    blockers,
    deterministicFindings,
    reviewNeededCount: input.ruleResult.reviewNeeded.length,
    artifacts: input.artifacts,
    proof: input.proof,
    steps: buildManagedRunSteps(input, missingInputs, missingArtifacts, blockedCards, reviewCards, hasProof),
    nextSafeAction: managedRunNextSafeAction(status),
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

function decisionCardId(ruleId: string): string {
  return `decision-card-${ruleId.toLowerCase()}`;
}

function reviewReason(rule: ReviewNeededRule): string {
  if (rule.needsRefresh) {
    return `${rule.name} needs a current human check because the rule source is stale or volatile.`;
  }
  if (rule.checkType === "human_review") {
    return `${rule.name} needs judgement that the deterministic engine cannot safely automate.`;
  }
  if (rule.checkType === "semantic_check") {
    return `${rule.name} needs semantic comparison against the job ad, CV, portfolio, or application intent.`;
  }
  return `${rule.name} needs document, format, or threshold review before submit-ready status.`;
}

function proofNeededForRule(rule: ReviewNeededRule): string {
  if (rule.severity === "ERROR") {
    return "A human PASS/BLOCKER decision with source evidence is required before submit-ready.";
  }
  if (rule.checkType === "format_check") {
    return "DOCX/PDF render proof or metadata proof showing the format check was inspected.";
  }
  if (rule.checkType === "semantic_check") {
    return "A source-linked note showing the claim matches the job ad, CV, or portfolio proof.";
  }
  return "A reviewer note explaining pass, accept risk, or revise.";
}

function suggestedActionForRule(severity: RuleSeverity): string {
  if (severity === "ERROR") return "Block submit-ready until this is resolved or explicitly accepted.";
  if (severity === "WARN") return "Review and either revise the draft or record an accepted risk.";
  return "Review when time allows and keep the note with the final report.";
}

function decisionCardSort(a: DecisionCard, b: DecisionCard): number {
  const severityRank: Record<RuleSeverity, number> = { ERROR: 0, WARN: 1, INFO: 2 };
  const severityDiff = severityRank[a.severity] - severityRank[b.severity];
  if (severityDiff !== 0) return severityDiff;
  return a.ruleId.localeCompare(b.ruleId);
}

function managedRunMissingInputs(input: ManagedApplicationRunInput): string[] {
  const missing: string[] = [];
  if (!hasText(input.company)) missing.push("Company");
  if (!hasText(input.role)) missing.push("Role");
  if (!hasText(input.jobSource)) missing.push("Job source");
  if (!hasText(input.sourceBackedClaim)) missing.push("Source-backed claim");
  if (!hasText(input.proofNote)) missing.push("Proof note");
  return missing;
}

function managedRunStatus(
  blockerCount: number,
  reviewCardCount: number,
  hasProof: boolean,
): ManagedApplicationRunStatus {
  if (blockerCount > 0) return "blocked";
  if (reviewCardCount > 0) return "review_needed";
  if (!hasProof) return "proof_needed";
  return "submit_ready";
}

function buildManagedRunSteps(
  input: ManagedApplicationRunInput,
  missingInputs: string[],
  missingArtifacts: ManagedApplicationRunArtifact[],
  blockedCards: DecisionCard[],
  reviewCards: DecisionCard[],
  hasProof: boolean,
): ManagedApplicationRunStep[] {
  return [
    {
      id: "intake",
      label: "Job ad and role intake",
      status: missingInputs.length > 0 ? "blocked" : "ready",
      reason: missingInputs.length > 0 ? `Missing ${missingInputs.join(", ")}.` : "Role basics and proof note are captured.",
      proofNeeded: "Company, role, job source, source-backed claim, and proof note.",
    },
    {
      id: "artifacts",
      label: "Application artifacts",
      status: missingArtifacts.length > 0 ? "blocked" : "ready",
      reason:
        missingArtifacts.length > 0
          ? `${missingArtifacts.length} artifact(s) still need generation proof.`
          : "All tracked artifacts have ready proof.",
      proofNeeded: "CV, cover letter, starter packet, or proof JSON artifact receipt.",
    },
    {
      id: "rules",
      label: "Deterministic rule run",
      status: input.ruleResult.blocked ? "blocked" : "ready",
      reason: input.ruleResult.blocked
        ? `${input.ruleResult.findings.filter((finding) => finding.severity === "ERROR").length} deterministic blocker(s) found.`
        : "No deterministic rule blocker found.",
      proofNeeded: "Rule engine result with findings and review-needed counts.",
    },
    {
      id: "review",
      label: "Review-needed decisions",
      status: blockedCards.length > 0 ? "blocked" : reviewCards.length > 0 ? "review_needed" : "ready",
      reason:
        blockedCards.length > 0
          ? `${blockedCards.length} decision card(s) block submit-ready.`
          : reviewCards.length > 0
            ? `${reviewCards.length} decision card(s) need owner review.`
            : "No owner decisions remain.",
      proofNeeded: "Decision cards with owner, reason, and proof needed.",
    },
    {
      id: "proof",
      label: "Run proof",
      status: hasProof ? "ready" : "blocked",
      reason: hasProof ? `${input.proof.length} proof receipt(s) attached.` : "Attach API, test, screenshot, or receipt proof before submit-ready.",
      proofNeeded: "Screenshot or API/test receipt for the managed run.",
    },
  ];
}

function managedRunNextSafeAction(status: ManagedApplicationRunStatus): string {
  if (status === "blocked") return "Clear blockers, then rerun the managed checklist.";
  if (status === "review_needed") return "Resolve the decision cards or record owner review proof.";
  if (status === "proof_needed") return "Attach screenshot, API, or test proof for the managed run.";
  return "Review the final report before any human-controlled submission step.";
}
