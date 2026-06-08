import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  Clipboard,
  Download,
  FileText,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import {
  buildBrowserCorpus,
  type CorpusFileResult,
} from "@/lib/jobsmith/buildBrowserCorpus";
import { buildVoiceProfile, type VoiceProfile } from "@jobsmith/lib/voiceProfile";
import {
  renderCoverLetterDraft,
  type DraftResult,
} from "@jobsmith/lib/renderDraft";
import {
  renderCvDraft,
  type CvDraftResult,
} from "@jobsmith/lib/renderCvDraft";
import {
  CV_FACTS_TEMPLATE,
  parseMasterCvFacts,
  type MasterCvFacts,
} from "@jobsmith/lib/cvFacts";
import { toDocxBlob, type DocxKind } from "@jobsmith/lib/exportDocx";
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  createApplicationRecord,
  type ApplicationRecord,
  type ApplicationStatus,
} from "@jobsmith/lib/appLog";
import { loadAppLog, saveAppLog } from "@/lib/jobsmith/appLogStore";
import {
  extractQuantifiedClaims,
  scanAgeSignals,
  scanTone,
} from "@jobsmith/lib/riskAudit";
import { JOBSMITH_RULE_PACK_V1, runJobsmithChecks, summarizeRulePack } from "../../apps/jobsmith/src/lib/checkEngine";
import {
  buildDecisionCards,
  buildManagedApplicationRun,
  buildWelcomePacket,
  summarizeDecisionCards,
  type DecisionCard,
  type DecisionCardReview,
  type ManagedApplicationRunReport,
  type WelcomePacket,
} from "../../apps/jobsmith/src/lib/applicationManager";

const CV_FACTS_STORAGE_KEY = "jobsmith.cvFacts.v1";

type ClaimVerdict = "unmarked" | "verified" | "needs-verification" | "invented";

const CLAIM_VERDICT_OPTIONS: { value: ClaimVerdict; label: string }[] = [
  { value: "unmarked", label: "Not reviewed" },
  { value: "verified", label: "Verified" },
  { value: "needs-verification", label: "Needs verification" },
  { value: "invented", label: "Invented - remove" },
];

function safeFilePart(value: string | null | undefined, fallback: string): string {
  const cleaned = (value ?? "").replace(/[^\w\s-]/g, "").replace(/\s+/g, " ").trim();
  return cleaned.length > 0 ? cleaned : fallback;
}

async function downloadDocx(
  kind: DocxKind,
  text: string,
  company: string | null,
  role: string | null,
): Promise<void> {
  const blob = await toDocxBlob(text, { kind });
  const prefix = kind === "cv" ? "CV" : "Cover Letter";
  const filename = `${prefix} - ${safeFilePart(company, "Company")} - ${safeFilePart(role, "Role")}.docx`;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

type ReadinessLevel = "blocked" | "review" | "ready";

interface ReadinessCheck {
  label: string;
  level: ReadinessLevel;
  reason: string;
}

const STANDARD_HEADING_SAMPLE = `
Profile
Summary
Experience
Built proof-backed UnClick workflows.

Education
University Degree Equivalent

Skills
Automation, product strategy, operations
`;

const LEVEL_LABELS: Record<ReadinessLevel, string> = {
  blocked: "Blocked",
  review: "Review",
  ready: "Ready",
};

const LEVEL_STYLES: Record<ReadinessLevel, string> = {
  blocked: "border-rose-300/25 bg-rose-300/10 text-rose-100",
  review: "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#F4D36B]",
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

type CorpusState =
  | { kind: "empty" }
  | { kind: "loading" }
  | {
      kind: "ready";
      profile: VoiceProfile;
      files: CorpusFileResult[];
      letterCount: number;
    }
  | { kind: "error"; message: string };

const WELCOME_STATUS_LABELS: Record<WelcomePacket["status"], string> = {
  loading_inputs: "Loading inputs",
  needs_job_ad: "Needs intake",
  ready_to_generate: "Ready to generate",
  draft_ready: "Draft ready for review",
};

const WELCOME_STATUS_STYLES: Record<WelcomePacket["status"], string> = {
  loading_inputs: "border-white/[0.08] bg-white/[0.05] text-white/70",
  needs_job_ad: "border-rose-300/25 bg-rose-300/10 text-rose-100",
  ready_to_generate: "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#F4D36B]",
  draft_ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

const DECISION_STATUS_LABELS: Record<DecisionCard["status"], string> = {
  blocked: "Blocked",
  needs_decision: "Needs decision",
  ready_for_review: "Ready for review",
};

const DECISION_OWNER_LABELS: Record<DecisionCard["owner"], string> = {
  human: "Human",
  jobsmith: "JobSmith",
  reviewer: "Reviewer",
};

const MANAGED_RUN_STATUS_LABELS: Record<ManagedApplicationRunReport["status"], string> = {
  blocked: "Blocked",
  proof_needed: "Proof needed",
  review_needed: "Review needed",
  submit_ready: "Submit-ready",
};

const SAMPLE_DECISION_REVIEWS: DecisionCardReview[] = [
  {
    ruleId: "JS-AGE-02",
    resolution: "blocker",
    evidence: "Graduation-year review is still unresolved in this browser-local starter run.",
  },
];

function hasBrittleFormatLanguage(value: string): boolean {
  return /\b(table|tables|column|columns|two-column|textbox|text box|image-only|pdf-only|scanned|screenshot|infographic|hidden text|keyword stuffing)\b/i.test(
    value,
  );
}

function longestParagraphWords(value: string): number {
  return value
    .split(/\n{2,}/)
    .map((p) => p.trim().split(/\s+/).filter(Boolean).length)
    .reduce((max, count) => Math.max(max, count), 0);
}

function buildReadinessChecks(
  draft: DraftResult | null,
  letterText: string,
  cvText: string,
  profile: VoiceProfile | null,
  jobText: string,
): ReadinessCheck[] {
  if (!draft) {
    const pending = "Generate a draft to run readiness checks";
    return [
      { label: "Role basics", level: "blocked", reason: pending },
      { label: "Source-backed claim", level: "blocked", reason: pending },
      { label: "Portal paste length", level: "blocked", reason: pending },
      { label: "Format risk", level: "blocked", reason: pending },
      { label: "Tone", level: "blocked", reason: pending },
      { label: "Age signals", level: "blocked", reason: pending },
    ];
  }

  const combined = `${letterText}\n${cvText}`;
  const toneFindings = scanTone(combined);
  const ageFindings = scanAgeSignals(combined);

  const roleBasics: ReadinessLevel =
    draft.detectedRole && draft.detectedCompany
      ? "ready"
      : draft.detectedRole || draft.detectedCompany
        ? "review"
        : "blocked";

  const citedBrands = (profile?.pastBrands ?? []).filter((brand) =>
    letterText.includes(brand),
  );
  const claimLevel: ReadinessLevel = citedBrands.length > 0 ? "ready" : "review";

  const longest = longestParagraphWords(letterText);
  const lengthLevel: ReadinessLevel = longest > 55 ? "review" : "ready";

  const brittle = hasBrittleFormatLanguage(`${jobText}\n${letterText}`);

  return [
    {
      label: "Role basics",
      level: roleBasics,
      reason:
        roleBasics === "ready"
          ? "Role and company detected from the job description"
          : roleBasics === "review"
            ? "Only one of role or company was detected; check the draft"
            : "Could not detect role or company; the draft uses placeholders",
    },
    {
      label: "Source-backed claim",
      level: claimLevel,
      reason:
        claimLevel === "ready"
          ? `Draft cites brands from your corpus: ${citedBrands.join(", ")}`
          : "Upload more cover letters so the draft can cite real past brands",
    },
    {
      label: "Portal paste length",
      level: lengthLevel,
      reason:
        lengthLevel === "review"
          ? `Longest paragraph is ${longest} words; trim before pasting into tight fields`
          : "Paragraph lengths are reasonable for portal fields",
    },
    {
      label: "Format risk",
      level: brittle ? "review" : "ready",
      reason: brittle
        ? "Review table, column, image, hidden text, or keyword-stuffing wording"
        : "No brittle ATS formatting language detected",
    },
    {
      label: "Tone",
      level: toneFindings.length > 0 ? "review" : "ready",
      reason:
        toneFindings.length > 0
          ? toneFindings.map((f) => f.label).join("; ")
          : "No em-dashes, curly quotes, or AI-era tell words detected",
    },
    {
      label: "Age signals",
      level: ageFindings.length > 0 ? "review" : "ready",
      reason:
        ageFindings.length > 0
          ? ageFindings.map((f) => f.label).join("; ")
          : "No visible years or long experience spans detected",
    },
  ];
}

function overallLevel(checks: ReadinessCheck[]): ReadinessLevel {
  if (checks.some((c) => c.level === "blocked")) return "blocked";
  if (checks.some((c) => c.level === "review")) return "review";
  return "ready";
}

function buildSourceBackedClaim(
  letterText: string,
  draft: DraftResult | null,
  profile: VoiceProfile | null,
): string {
  if (!draft || letterText.trim().length === 0) return "";

  const citedBrand = (profile?.pastBrands ?? []).find((brand) => letterText.includes(brand));
  if (citedBrand) {
    return `Cover letter draft cites ${citedBrand} from the uploaded corpus.`;
  }

  if (draft.detectedRole && draft.detectedCompany) {
    return `Cover letter draft generated for ${draft.detectedRole} at ${draft.detectedCompany}.`;
  }

  return "Cover letter draft generated from the uploaded corpus.";
}

function LevelBadge({ level }: { level: ReadinessLevel }) {
  const Icon = level === "ready" ? CheckCircle2 : AlertTriangle;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[level]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {LEVEL_LABELS[level]}
    </span>
  );
}

function WelcomePacketPanel({ packet }: { packet: WelcomePacket }) {
  return (
    <section
      aria-label="Jobsmith AI welcome packet"
      data-testid="jobsmith-ai-welcome-packet"
      className="mb-4 rounded-lg border border-[#61C1C4]/20 bg-[#61C1C4]/[0.07] p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#61C1C4]">AI Welcome Packet</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{packet.title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">{packet.purpose}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${WELCOME_STATUS_STYLES[packet.status]}`}>
          {WELCOME_STATUS_LABELS[packet.status]}
        </span>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Inputs visible now</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/70">
            {packet.availableInputs.map((input) => (
              <li key={input}>{input}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Missing before submit-ready</h3>
          {packet.missingInputs.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm leading-6 text-white/70">
              {packet.missingInputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-emerald-100">No missing inputs in this slice.</p>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Can do</h3>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-white/60">
            {packet.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Proof expected</h3>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-white/60">
            {packet.proofExpectations.map((proof) => (
              <li key={proof}>{proof}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Stop conditions</h3>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-white/60">
            {packet.stopConditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 border-t border-white/[0.08] pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9EE4E6]">Safest next move</p>
        <p className="mt-2 text-sm leading-6 text-white/75">{packet.safestNextMove}</p>
      </div>
    </section>
  );
}

function ManagedRunReport({
  report,
  decisionCards,
}: {
  report: ManagedApplicationRunReport;
  decisionCards: DecisionCard[];
}) {
  const decisionSummary = summarizeDecisionCards(
    decisionCards,
    report.artifacts.every((artifact) => artifact.ready),
  );
  const visibleBlockers = report.blockers.slice(0, 4);
  const visibleFindings = report.deterministicFindings.slice(0, 3);
  const finalReportLines = [
    `Submit-ready status: ${report.submitReady ? "ready" : "not ready"}`,
    `Rules passed: ${report.rulesPassed}`,
    `Blockers: ${report.blockers.length}`,
    `Deterministic findings: ${report.deterministicFindings.length}`,
    `Review-needed rules: ${report.reviewNeededCount}`,
    `Decision cards: ${decisionSummary.resolved} resolved, ${decisionSummary.unresolved} unresolved`,
    `Artifacts: ${report.artifacts.filter((artifact) => artifact.ready).length}/${report.artifacts.length} ready`,
    `Proof receipts: ${report.proof.length}`,
  ];

  return (
    <section
      aria-label="Jobsmith managed run report"
      data-testid="jobsmith-managed-run-report"
      className="rounded-lg border border-[#61C1C4]/20 bg-[#61C1C4]/[0.06] p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#61C1C4]">Managed Run Report</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Checklist to submit-ready gate</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            JobSmith keeps the rule run, decision cards, artifacts, and submit-ready status visible instead of hiding review work in chat.
          </p>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            report.submitReady ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" : "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#F4D36B]"
          }`}
        >
          {report.submitReady ? "Submit-ready" : "Not submit-ready"}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <RunMetric label="Rules passed" value={report.rulesPassed} />
        <RunMetric label="Blockers" value={report.blockers.length} />
        <RunMetric label="Findings" value={report.deterministicFindings.length} />
        <RunMetric label="Review needed" value={report.reviewNeededCount} />
        <RunMetric label="Artifacts" value={report.artifacts.length} />
        <RunMetric label="Proof" value={report.proof.length} />
        <RunMetric label="Resolved" value={decisionSummary.resolved} />
        <RunMetric label="Unresolved" value={decisionSummary.unresolved} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Run steps</h3>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-white/65">
              {MANAGED_RUN_STATUS_LABELS[report.status]}
            </span>
          </div>
          <div className="mt-4 grid gap-2">
            {report.steps.map((step) => (
              <div key={step.id} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-white/65">
                    {step.status === "review_needed" ? "Review" : step.status === "blocked" ? "Blocked" : "Ready"}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-white/55">{step.reason}</p>
                <p className="mt-1 text-xs leading-5 text-[#9EE4E6]">Proof needed: {step.proofNeeded}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Final report</h3>
          <dl className="mt-4 grid gap-3 text-xs leading-5 text-white/60">
            <div>
              <dt className="font-semibold text-white/45">Run id</dt>
              <dd className="mt-1 text-white/70">{report.runId}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white/45">Next safe action</dt>
              <dd className="mt-1 text-white/70">{report.nextSafeAction}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white/45">Submit-ready proof summary</dt>
              <dd className="mt-1 space-y-1 text-white/70" data-testid="jobsmith-final-report-proof-summary">
                {finalReportLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white/45">Artifacts</dt>
              <dd className="mt-1 space-y-1 text-white/70">
                {report.artifacts.map((artifact) => (
                  <span key={artifact.id} className="block">
                    {artifact.label}: {artifact.ready ? "Ready" : "Blocked"} ({artifact.proof})
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white/45">Proof</dt>
              <dd className="mt-1 space-y-1 text-white/70">
                {report.proof.length > 0 ? (
                  report.proof.map((proof) => (
                    <span key={proof.id} className="block">
                      {proof.label}: {proof.uri}
                    </span>
                  ))
                ) : (
                  <span>No run proof attached yet.</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Blockers</h3>
          {visibleBlockers.length > 0 ? (
            <ul className="mt-3 space-y-2 text-xs leading-5 text-white/60">
              {visibleBlockers.map((blocker) => (
                <li key={blocker}>{blocker}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs leading-5 text-emerald-100">No blockers in the managed report.</p>
          )}
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Deterministic findings</h3>
          {visibleFindings.length > 0 ? (
            <ul className="mt-3 space-y-2 text-xs leading-5 text-white/60">
              {visibleFindings.map((finding) => (
                <li key={finding.ruleId}>
                  {finding.ruleId}: {finding.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs leading-5 text-emerald-100">No deterministic findings in the current run.</p>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-white/[0.06] bg-black/20 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Decision cards</h3>
            <p className="mt-1 text-xs leading-5 text-white/50">
              Showing the first {Math.min(5, decisionCards.length)} of {decisionCards.length}. The full count stays in the run report.
            </p>
          </div>
          <p className="text-xs font-semibold text-[#9EE4E6]">
            {decisionSummary.blocked} blocked, {decisionSummary.needsDecision} need decision, {decisionSummary.resolved} resolved
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {decisionCards.slice(0, 5).map((card) => (
            <article key={card.id} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{card.title}</p>
                  <p className="mt-1 text-xs text-white/45">
                    {card.ruleId} | {card.category} | Owner: {DECISION_OWNER_LABELS[card.owner]}
                  </p>
                </div>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-white/65">
                  {DECISION_STATUS_LABELS[card.status]}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/55">{card.reason}</p>
              <p className="mt-2 text-xs leading-5 text-[#9EE4E6]">Proof needed: {card.proofNeeded}</p>
              {card.resolutionEvidence ? (
                <p className="mt-2 text-xs leading-5 text-emerald-100">Evidence: {card.resolutionEvidence}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RunMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function RulePackStatus({ summary }: { summary: ReturnType<typeof summarizeRulePack> }) {
  const sampleResult = useMemo(() => runJobsmithChecks(STANDARD_HEADING_SAMPLE, JOBSMITH_RULE_PACK_V1), []);
  const sampleClean = sampleResult.findings.length === 0;
  const standardHeadingsSafe = sampleResult.findings.every((finding) => finding.ruleId !== "JS-ATS-03");

  return (
    <section
      aria-label="Jobsmith universal rules"
      className="rounded-lg border border-[#61C1C4]/20 bg-[#61C1C4]/[0.06] p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#61C1C4]">Universal Rules v{summary.version}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Rule-pack check status</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Source-backed rules are loaded as data. Allowlist and requirement specs stay out of banned-keyword findings unless a rule explicitly says to flag or block the terms.
          </p>
        </div>
        <LevelBadge level={sampleClean && standardHeadingsSafe ? "ready" : "review"} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
          <p className="text-xs text-white/45">Rules</p>
          <p className="mt-1 text-lg font-semibold text-white">{summary.totalRules}</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
          <p className="text-xs text-white/45">Categories</p>
          <p className="mt-1 text-lg font-semibold text-white">{summary.categories.length}</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
          <p className="text-xs text-white/45">Blockers</p>
          <p className="mt-1 text-lg font-semibold text-white">{summary.bySeverity.ERROR}</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
          <p className="text-xs text-white/45">Sample check</p>
          <p className="mt-1 text-sm font-semibold text-emerald-100">
            {sampleClean && standardHeadingsSafe ? "Standard headings pass" : "Review standard headings"}
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-xs font-medium text-white/55">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#61C1C4]/45"
      />
    </label>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-xs font-medium text-white/55">{label}</span>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#61C1C4]/45"
      />
    </label>
  );
}

export default function JobsmithPage() {
  const [corpus, setCorpus] = useState<CorpusState>({ kind: "empty" });
  const [profile, setProfile] = useState<VoiceProfile | null>(null);
  const [jobText, setJobText] = useState("");
  const [letterDraft, setLetterDraft] = useState<DraftResult | null>(null);
  const [letterText, setLetterText] = useState("");
  const [cvDraft, setCvDraft] = useState<CvDraftResult | null>(null);
  const [cvText, setCvText] = useState("");
  const [copied, setCopied] = useState<"letter" | "cv" | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cvFactsRaw, setCvFactsRaw] = useState<string>(() =>
    typeof window === "undefined"
      ? ""
      : (window.localStorage.getItem(CV_FACTS_STORAGE_KEY) ?? ""),
  );
  const [appLog, setAppLog] = useState<ApplicationRecord[]>(() => loadAppLog());
  const [claimVerdicts, setClaimVerdicts] = useState<
    Record<string, ClaimVerdict>
  >({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (cvFactsRaw.trim()) {
      window.localStorage.setItem(CV_FACTS_STORAGE_KEY, cvFactsRaw);
    } else {
      window.localStorage.removeItem(CV_FACTS_STORAGE_KEY);
    }
  }, [cvFactsRaw]);

  const cvFactsParse = useMemo(
    () => (cvFactsRaw.trim() ? parseMasterCvFacts(cvFactsRaw) : null),
    [cvFactsRaw],
  );
  const cvFacts: MasterCvFacts | null =
    cvFactsParse && cvFactsParse.ok ? cvFactsParse.facts : null;
  let cvFactsError = "";
  if (cvFactsParse && !cvFactsParse.ok) {
    cvFactsError = cvFactsParse.error;
  }

  useCanonical("/jobsmith");
  useMetaTags({
    title: "Jobsmith - UnClick",
    description:
      "Browser-local Jobsmith: turn your cover-letter corpus into a tailored, source-backed application draft.",
    ogTitle: "Jobsmith - UnClick",
    ogDescription:
      "Upload your cover letters, paste a job description, get a tailored draft. Nothing leaves your browser.",
    ogUrl: "https://unclick.world/jobsmith",
  });

  const checks = useMemo(
    () =>
      buildReadinessChecks(letterDraft, letterText, cvText, profile, jobText),
    [letterDraft, letterText, cvText, profile, jobText],
  );
  const level = useMemo(() => overallLevel(checks), [checks]);
  const quantifiedClaims = useMemo(
    () => (letterText ? extractQuantifiedClaims(letterText) : []),
    [letterText],
  );
  const hasDraft = letterDraft !== null || cvDraft !== null;
  const ruleSummary = useMemo(() => summarizeRulePack(JOBSMITH_RULE_PACK_V1), []);
  const detectedCompany = letterDraft?.detectedCompany ?? "";
  const detectedRole = letterDraft?.detectedRole ?? "";
  const jobSource = jobText.trim().length > 0 ? "Browser-local pasted job description" : "";
  const sourceBackedClaim = useMemo(
    () => buildSourceBackedClaim(letterText, letterDraft, profile),
    [letterDraft, letterText, profile],
  );
  const proofNote =
    sourceBackedClaim.length > 0
      ? "Derived from the uploaded cover-letter corpus and browser-local draft artifacts."
      : "";
  const managedRunText = useMemo(
    () => [jobText, letterText, cvText].filter((part) => part.trim().length > 0).join("\n\n"),
    [cvText, jobText, letterText],
  );
  const checkResult = useMemo(
    () => runJobsmithChecks(managedRunText || jobText, JOBSMITH_RULE_PACK_V1),
    [jobText, managedRunText],
  );
  const welcomePacket = useMemo(
    () =>
      buildWelcomePacket({
        corpusReady: corpus.kind === "ready",
        corpusStats:
          corpus.kind === "ready"
            ? {
                coverLetters: corpus.letterCount,
                jobsApplied: appLog.length,
                roleTypes: profile?.roleTypes ?? [],
                pastBrands: profile?.pastBrands ?? [],
              }
            : undefined,
        applicationRun: {
          company: detectedCompany,
          role: detectedRole,
          jobSource,
          sourceBackedClaim,
          proofNote,
        },
        jobText,
        draftReady: hasDraft,
        ruleSummary,
      }),
    [appLog.length, corpus, detectedCompany, detectedRole, hasDraft, jobSource, jobText, profile, proofNote, ruleSummary, sourceBackedClaim],
  );
  const decisionCards = useMemo(
    () =>
      buildDecisionCards({
        reviewNeeded: checkResult.reviewNeeded,
        findings: checkResult.findings,
        missingInputs: welcomePacket.missingInputs,
        artifactsReady: hasDraft,
        reviews: SAMPLE_DECISION_REVIEWS,
      }),
    [checkResult.findings, checkResult.reviewNeeded, hasDraft, welcomePacket.missingInputs],
  );
  const managedRunReport = useMemo(
    () =>
      buildManagedApplicationRun({
        runId: "browser-local-jobsmith-run",
        company: detectedCompany,
        role: detectedRole,
        jobSource,
        sourceBackedClaim,
        proofNote,
        ruleResult: {
          totalRules: checkResult.totalRules,
          findings: checkResult.findings,
          reviewNeeded: checkResult.reviewNeeded,
          blocked: checkResult.blocked,
        },
        decisionCards,
        artifacts: [
          {
            id: "cover-letter-draft",
            label: "Browser-local cover letter draft",
            kind: "cover_letter",
            ready: letterDraft !== null && letterText.trim().length > 0,
            proof: letterDraft ? "Editable cover letter draft rendered" : "Generate a cover letter draft first",
          },
          {
            id: "cv-draft",
            label: "Tailored CV draft",
            kind: "cv",
            ready: cvDraft !== null && cvText.trim().length > 0,
            proof: cvDraft ? "Editable CV draft rendered from structured facts" : "Paste structured CV facts to generate a CV draft",
          },
          {
            id: "application-log",
            label: "Application log receipt",
            kind: "proof_json",
            ready: appLog.length > 0,
            proof: appLog.length > 0 ? `${appLog.length} browser-local application log row(s)` : "Log an application after generating a draft",
          },
        ],
        proof:
          !hasDraft
            ? []
            : [
                {
                  id: "managed-run-report-ui",
                  label: "Managed run report UI",
                  kind: "receipt",
                  uri: "ui://jobsmith/managed-run-report",
                },
                {
                  id: "browser-local-draft-ui",
                  label: "Browser-local draft UI",
                  kind: "receipt",
                  uri: "ui://jobsmith/tailored-draft",
                },
              ],
      }),
    [
      appLog.length,
      checkResult.blocked,
      checkResult.findings,
      checkResult.reviewNeeded,
      checkResult.totalRules,
      cvDraft,
      cvText,
      decisionCards,
      detectedCompany,
      detectedRole,
      hasDraft,
      jobSource,
      letterDraft,
      letterText,
      proofNote,
      sourceBackedClaim,
    ],
  );

  async function handleCorpusFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setCorpus({ kind: "loading" });
    try {
      const { corpus: built, files } = await buildBrowserCorpus(
        Array.from(fileList),
      );
      const built_profile = buildVoiceProfile(built);
      const letterCount = files.filter((f) => f.ok).length;
      setProfile(built_profile);
      setCorpus({ kind: "ready", profile: built_profile, files, letterCount });
    } catch (err) {
      setProfile(null);
      setCorpus({
        kind: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  function handleGenerate() {
    if (profile) {
      const letter = renderCoverLetterDraft({ rawText: jobText }, profile, {
        name: cvFacts?.name,
      });
      setLetterDraft(letter);
      setLetterText(letter.draft);
    }
    if (cvFacts) {
      const cv = renderCvDraft(cvFacts, { rawText: jobText });
      setCvDraft(cv);
      setCvText(cv.draft);
    }
    setClaimVerdicts({});
    setCopied(null);
  }

  async function copyText(which: "letter" | "cv", text: string) {
    if (!text) return;
    await navigator.clipboard?.writeText(text);
    setCopied(which);
  }

  function logCurrentApplication() {
    const record = createApplicationRecord({
      company: letterDraft?.detectedCompany ?? "",
      role: letterDraft?.detectedRole ?? "",
      jobText,
      cvText,
      letterText,
    });
    setAppLog((prev) => {
      const next = [record, ...prev];
      saveAppLog(next);
      return next;
    });
  }

  function updateStatus(id: string, status: ApplicationStatus) {
    setAppLog((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, status } : r));
      saveAppLog(next);
      return next;
    });
  }

  const canGenerate = profile !== null && jobText.trim().length > 0;

  return (
    <div className="min-h-screen bg-white/[0.02] text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#61C1C4]">
                Jobsmith
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Tailored application drafts
              </h1>
            </div>
            <div className="rounded-lg border border-[#61C1C4]/20 bg-[#61C1C4]/10 px-3 py-2 text-xs leading-5 text-[#9EE4E6]">
              Browser-local. No upload, no submit, no external check.
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <WelcomePacketPanel packet={welcomePacket} />
        </FadeIn>

        <FadeIn delay={0.1}>
          <RulePackStatus summary={ruleSummary} />
        </FadeIn>

        <FadeIn delay={0.15}>
          <ManagedRunReport report={managedRunReport} decisionCards={decisionCards} />
        </FadeIn>

        <FadeIn delay={0.2}>
          <section
            aria-label="Jobsmith draft builder"
            className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]"
          >
            <div className="space-y-4">
              <section className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-[#61C1C4]" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                    Step 1 - Cover letter corpus
                  </h2>
                </div>
                <p className="mb-3 text-xs leading-5 text-white/50">
                  Pick your past cover letters (.pdf, .txt, or .md). They are
                  parsed in this browser to learn your voice. The files are not
                  uploaded anywhere.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md"
                  multiple
                  aria-label="Cover letter files"
                  onChange={(e) => void handleCorpusFiles(e.target.files)}
                  className="block w-full text-xs text-white/70 file:mr-3 file:rounded-lg file:border file:border-[#61C1C4]/30 file:bg-[#61C1C4]/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#9EE4E6] hover:file:bg-[#61C1C4]/20"
                />

                {corpus.kind === "loading" && (
                  <p className="mt-3 text-xs text-white/55">Parsing corpus...</p>
                )}
                {corpus.kind === "error" && (
                  <p className="mt-3 text-xs text-rose-200">
                    Could not parse corpus: {corpus.message}
                  </p>
                )}
                {corpus.kind === "ready" && (
                  <CorpusSummary
                    files={corpus.files}
                    profile={corpus.profile}
                    letterCount={corpus.letterCount}
                  />
                )}
              </section>

              <section className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ScrollText className="h-4 w-4 text-[#61C1C4]" />
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                      Step 2 - Master CV facts
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCvFactsRaw(JSON.stringify(CV_FACTS_TEMPLATE, null, 2))
                    }
                    className="rounded-lg border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-3 py-1.5 text-xs font-semibold text-[#9EE4E6] transition-colors hover:bg-[#61C1C4]/20"
                  >
                    Load template
                  </button>
                </div>
                <p className="mb-3 text-xs leading-5 text-white/50">
                  Optional but recommended. Paste your CV as structured JSON
                  facts, each with an id. The CV draft can only select and
                  reorder these facts, never invent a line. Saved in this
                  browser so you enter it once.
                </p>
                <textarea
                  aria-label="Master CV facts JSON"
                  value={cvFactsRaw}
                  onChange={(e) => setCvFactsRaw(e.target.value)}
                  rows={10}
                  spellCheck={false}
                  placeholder='{ "name": "...", "contact": "...", "experience": [], "education": [], "skills": [] }'
                  className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 font-mono text-xs leading-5 text-white outline-none transition-colors focus:border-[#61C1C4]/45"
                />
                {cvFactsParse === null && (
                  <p className="mt-2 text-xs text-white/40">
                    No CV facts yet. The cover letter still works without them.
                  </p>
                )}
                {cvFactsParse && cvFactsParse.ok && (
                  <p className="mt-2 text-xs text-emerald-200">
                    Valid: {cvFactsParse.facts.experience.length} experience
                    {cvFactsParse.facts.experience.length === 1
                      ? " entry"
                      : " entries"}
                    , {cvFactsParse.facts.skills.length} skills.
                  </p>
                )}
                {cvFactsError && (
                  <p className="mt-2 text-xs text-rose-200">
                    CV facts not usable: {cvFactsError}
                  </p>
                )}
              </section>

              <section className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-[#61C1C4]" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                    Step 3 - Job description
                  </h2>
                </div>
                <label htmlFor="jobsmith-jd" className="block">
                  <span className="mb-1 block text-xs font-medium text-white/55">
                    Paste the full job description
                  </span>
                  <textarea
                    id="jobsmith-jd"
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    rows={10}
                    placeholder="Paste the job description here. The first line is read as the role, the second as the company."
                    className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#61C1C4]/45"
                  />
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-4 py-2.5 text-sm font-semibold text-[#9EE4E6] transition-colors hover:bg-[#61C1C4]/20 disabled:cursor-not-allowed disabled:border-white/[0.08] disabled:bg-white/[0.04] disabled:text-white/30"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate tailored draft
                  </button>
                  {hasDraft && (
                    <button
                      type="button"
                      onClick={logCurrentApplication}
                      className="flex items-center justify-center gap-2 rounded-lg border border-emerald-300/30 bg-emerald-300/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/20"
                    >
                      <BriefcaseBusiness className="h-4 w-4" />
                      Log this application
                    </button>
                  )}
                </div>
                {!profile && (
                  <p className="mt-2 text-xs text-white/40">
                    Load a cover letter corpus first to enable drafting.
                  </p>
                )}
              </section>

              {letterDraft && (
                <section
                  aria-label="Cover letter draft"
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-fuchsia-300" />
                      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                        Cover letter draft
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void copyText("letter", letterText)}
                        className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
                      >
                        {copied === "letter" ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Clipboard className="h-3.5 w-3.5" />
                        )}
                        {copied === "letter" ? "Copied" : "Copy letter"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          void downloadDocx(
                            "letter",
                            letterText,
                            letterDraft.detectedCompany,
                            letterDraft.detectedRole,
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100 transition-colors hover:bg-fuchsia-300/20"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download .docx
                      </button>
                    </div>
                  </div>

                  {letterDraft.warnings.length > 0 && (
                    <ul className="mb-3 space-y-1 rounded-lg border border-[#E2B93B]/20 bg-[#E2B93B]/10 p-3 text-xs leading-5 text-[#F4D36B]">
                      {letterDraft.warnings.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  )}

                  <textarea
                    aria-label="Editable cover letter draft"
                    value={letterText}
                    onChange={(e) => {
                      setLetterText(e.target.value);
                      setCopied(null);
                    }}
                    rows={20}
                    className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm leading-6 text-white outline-none transition-colors focus:border-[#61C1C4]/45"
                  />
                  <p className="mt-2 text-xs text-white/45">
                    Detected role: {letterDraft.detectedRole ?? "not detected"} -
                    company: {letterDraft.detectedCompany ?? "not detected"}.
                    This is a starter draft: edit it before sending.
                  </p>
                </section>
              )}

              {cvDraft && (
                <section
                  aria-label="CV draft"
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-fuchsia-300" />
                      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                        Tailored CV draft
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void copyText("cv", cvText)}
                        className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
                      >
                        {copied === "cv" ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Clipboard className="h-3.5 w-3.5" />
                        )}
                        {copied === "cv" ? "Copied" : "Copy CV"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          void downloadDocx(
                            "cv",
                            cvText,
                            letterDraft?.detectedCompany ?? null,
                            letterDraft?.detectedRole ?? null,
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100 transition-colors hover:bg-fuchsia-300/20"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download .docx
                      </button>
                    </div>
                  </div>

                  {cvDraft.warnings.length > 0 && (
                    <ul className="mb-3 space-y-1 rounded-lg border border-[#E2B93B]/20 bg-[#E2B93B]/10 p-3 text-xs leading-5 text-[#F4D36B]">
                      {cvDraft.warnings.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  )}

                  <textarea
                    aria-label="Editable CV draft"
                    value={cvText}
                    onChange={(e) => {
                      setCvText(e.target.value);
                      setCopied(null);
                    }}
                    rows={22}
                    className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm leading-6 text-white outline-none transition-colors focus:border-[#61C1C4]/45"
                  />
                  <p className="mt-2 text-xs text-white/45">
                    Single column, standard ATS headings. Every bullet is one of
                    your master CV facts:{" "}
                    {cvDraft.citations.length} fact
                    {cvDraft.citations.length === 1 ? "" : "s"} used,{" "}
                    {cvDraft.omittedBullets.length} left out for not matching the
                    job. Nothing here is invented.
                  </p>
                </section>
              )}

              {letterDraft && (
                <section
                  aria-label="Truthfulness audit"
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                      Truthfulness audit
                    </h2>
                  </div>
                  {quantifiedClaims.length === 0 ? (
                    <p className="text-xs leading-5 text-white/45">
                      No quantified claims detected in the cover letter draft.
                      Numbers are the easiest thing to overstate, so this list
                      stays empty until a draft contains one.
                    </p>
                  ) : (
                    <>
                      <p className="mb-3 text-xs leading-5 text-white/50">
                        Mark every quantified claim. Anything you cannot trace
                        to a real source fact should be removed before sending.
                      </p>
                      <ul className="space-y-2">
                        {quantifiedClaims.map((claim, index) => {
                          const verdict = claimVerdicts[claim] ?? "unmarked";
                          return (
                            <li
                              key={index}
                              className="rounded-lg border border-white/[0.06] bg-black/20 p-3"
                            >
                              <p className="text-xs leading-5 text-white/80">
                                {claim}
                              </p>
                              <select
                                aria-label={`Verdict for quantified claim ${index + 1}`}
                                value={verdict}
                                onChange={(e) =>
                                  setClaimVerdicts((prev) => ({
                                    ...prev,
                                    [claim]: e.target.value as ClaimVerdict,
                                  }))
                                }
                                className={`mt-2 rounded-md border px-2 py-1 text-xs outline-none ${
                                  verdict === "invented"
                                    ? "border-rose-300/40 bg-rose-300/10 text-rose-100"
                                    : verdict === "verified"
                                      ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-100"
                                      : verdict === "needs-verification"
                                        ? "border-[#E2B93B]/40 bg-[#E2B93B]/10 text-[#F4D36B]"
                                        : "border-white/[0.12] bg-black/40 text-white/70"
                                }`}
                              >
                                {CLAIM_VERDICT_OPTIONS.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </section>
              )}
            </div>

            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <section
                aria-label="ATS and paste readiness"
                className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                      Readiness checks
                    </h2>
                  </div>
                  <LevelBadge level={level} />
                </div>
                <div className="grid gap-2">
                  {checks.map((check) => (
                    <div
                      key={check.label}
                      className="rounded-lg border border-white/[0.06] bg-black/20 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-white">
                          {check.label}
                        </p>
                        <LevelBadge level={check.level} />
                      </div>
                      <p className="mt-1 text-xs leading-5 text-white/50">
                        {check.reason}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-[#61C1C4]/15 bg-[#61C1C4]/[0.06] p-3 text-xs leading-5 text-[#9EE4E6]">
                  Every draft is assembled in this browser from your own corpus.
                  Jobsmith does not submit an application or call an external
                  service.
                </div>
              </section>
            </aside>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section
            aria-label="Application log"
            className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-[#61C1C4]" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Application log
              </h2>
            </div>
            {appLog.length === 0 ? (
              <p className="text-xs leading-5 text-white/45">
                No applications logged yet. Generate a draft, then choose "Log
                this application". The log is saved in this browser and survives
                reloads.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-white/45">
                    <tr>
                      <th className="pb-2 pr-3 font-medium">Company</th>
                      <th className="pb-2 pr-3 font-medium">Role</th>
                      <th className="pb-2 pr-3 font-medium">Logged</th>
                      <th className="pb-2 pr-3 font-medium">Versions</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appLog.map((record) => (
                      <tr
                        key={record.id}
                        className="border-t border-white/[0.06]"
                      >
                        <td className="py-2 pr-3 text-white/80">
                          {record.company}
                        </td>
                        <td className="py-2 pr-3 text-white/80">
                          {record.role}
                        </td>
                        <td className="py-2 pr-3 text-white/55">
                          {new Date(record.sentAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 pr-3 font-mono text-white/40">
                          CV {record.cvVersionId} / CL {record.letterVersionId}
                        </td>
                        <td className="py-2">
                          <select
                            aria-label={`Status for ${record.company} ${record.role}`}
                            value={record.status}
                            onChange={(e) =>
                              updateStatus(
                                record.id,
                                e.target.value as ApplicationStatus,
                              )
                            }
                            className="rounded-md border border-white/[0.12] bg-black/40 px-2 py-1 text-xs text-white outline-none focus:border-[#61C1C4]/45"
                          >
                            {APPLICATION_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {STATUS_LABELS[s]}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}

function CorpusSummary({
  files,
  profile,
  letterCount,
}: {
  files: CorpusFileResult[];
  profile: VoiceProfile;
  letterCount: number;
}) {
  return (
    <div className="mt-3 space-y-3">
      <p className="text-xs font-semibold text-emerald-200">
        {letterCount} of {files.length} file
        {files.length === 1 ? "" : "s"} parsed into your voice profile
      </p>
      <ul className="space-y-1 text-xs leading-5 text-white/55">
        {files.map((file) => (
          <li key={file.fileName} className="flex items-start gap-2">
            {file.ok ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
            ) : (
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-300" />
            )}
            <span>
              {file.fileName}
              {file.ok
                ? ` - ${file.chars} characters`
                : ` - ${file.error ?? "could not parse"}`}
            </span>
          </li>
        ))}
      </ul>
      <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3 text-xs leading-5 text-white/55">
        <p>
          <strong className="text-white/75">Past brands:</strong>{" "}
          {profile.pastBrands.join(", ") || "none detected yet"}
        </p>
        <p>
          <strong className="text-white/75">Tone:</strong>{" "}
          {profile.tonalAdjectives.join(", ") || "none detected yet"}
        </p>
        {profile.openingFormulas[0] && (
          <p>
            <strong className="text-white/75">Default opener:</strong>{" "}
            <em>{profile.openingFormulas[0]}</em>
          </p>
        )}
      </div>
    </div>
  );
}
