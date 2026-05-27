import { createHash, randomUUID } from "node:crypto";

type Verdict = "check" | "na" | "fail" | "other" | "pending";
type Severity = "critical" | "high" | "medium" | "low" | "info";
type CopyPassRunVerdict = "pass" | "warn" | "fail";
type CopyPassCheckId =
  | "value-prop-clarity"
  | "cta-presence"
  | "proof-trust-gap"
  | "unsupported-superiority"
  | "detector-evasion-claim"
  | "placeholder-copy"
  | "risky-guarantee-language"
  | "internal-consistency"
  | "audience-tone-fit"
  | "ai-slop-language"
  | "misleading-urgency"
  | "ui-honesty-gap";
type RunStatus = "queued" | "running" | "complete" | "failed";
type RunProfile = "smoke" | "standard" | "deep";
type CopyRoomEncoding = "utf8";
type CopyRoomExactStatus = "pass" | "blocked";
type CopyRoomDiffResult = "pass" | "fail";
type CopyRoomNewlinePolicy = "preserve";
type CopyRoomNewlineStyle = "none" | "lf" | "crlf" | "cr" | "mixed";

interface CopyRoomSourcePacketInput {
  source_id: string;
  source_pointer: string;
  text: string;
  encoding?: CopyRoomEncoding;
  newline_policy?: CopyRoomNewlinePolicy;
}

interface CopyRoomSourcePacket {
  kind: "copyroom_source_packet";
  source_id: string;
  source_pointer: string;
  text: string;
  encoding: CopyRoomEncoding;
  newline_policy: CopyRoomNewlinePolicy;
  newline_style: CopyRoomNewlineStyle;
  source_sha256: string;
  byte_count: number;
  character_count: number;
}

interface CopyRoomCopyReceipt {
  kind: "copyroom_exact_copy_receipt";
  status: CopyRoomExactStatus;
  source_id: string;
  source_pointer: string;
  output_pointer: string;
  source_sha256: string;
  output_sha256: string;
  byte_count: number;
  output_byte_count: number;
  character_count: number;
  output_character_count: number;
  encoding: CopyRoomEncoding;
  newline_policy: CopyRoomNewlinePolicy;
  newline_style: CopyRoomNewlineStyle;
  output_newline_style: CopyRoomNewlineStyle;
  exact_diff: CopyRoomDiffResult;
  action_needed: string[];
}

interface CopyRoomPreparedCopy {
  copyText: string;
  copyroomReceipt?: CopyRoomCopyReceipt;
  error?: string;
}

interface VerdictSummary {
  total: number;
  check: number;
  na: number;
  fail: number;
  other: number;
  pending: number;
  pass_rate: number;
}

interface CopyPassSummary {
  posture: string;
  counts_by_severity: Record<Severity, number>;
  coverage_note: string;
}

interface CopyFinding {
  id: string;
  check_id: string;
  title: string;
  severity: Severity;
  verdict: Verdict;
  category: string;
  description?: string;
  remediation?: string;
  evidence: Record<string, unknown>;
  created_at: string;
}

interface CopyRunRecord {
  id: string;
  profile: RunProfile;
  status: RunStatus;
  target: {
    type: "copy";
    copy_text_preview: string;
    channel?: string;
    audience?: string;
    goal?: string;
  };
  verdict_summary: VerdictSummary;
  copypass_verdict: CopyPassRunVerdict;
  overall_score: number;
  checks_attempted: CopyPassCheckId[];
  created_at: string;
  completed_at: string | null;
  findings: CopyFinding[];
  notes: string[];
  summary: CopyPassSummary;
  disclaimer: {
    headline: string;
    body: string;
    compact: string;
  };
  not_checked: Array<{ label: string; reason: string }>;
  copyroom_receipt?: CopyRoomCopyReceipt;
  error?: string;
}

const RUNS = new Map<string, CopyRunRecord>();

const COPYPASS_DISCLAIMER = {
  headline: "CopyPass is a scoped review, not a guarantee of copy quality or safety.",
  body:
    "CopyPass reports evidence-based copy-quality findings it can observe in the AI-generated copy and scope for this run. It does not certify factual accuracy, legal compliance, brand approval, conversion performance, or fitness for every audience, channel, or future edit.",
  compact:
    "Scoped review only. Not legal approval, brand sign-off, or a guarantee of quality, safety, or performance.",
};

const COPYPASS_NOT_CHECKED = [
  {
    label: "Production crawl",
    reason: "This run only evaluates caller-provided copy_text or CopyRoom source-packet text.",
  },
  {
    label: "Paid model rewrite",
    reason: "CopyPass deterministic mode uses local evidence checks and does not call paid LLMs.",
  },
  {
    label: "Humaniser, template, or voice-profile rewrite",
    reason:
      "This deterministic review slice does not rewrite copy, store voice profiles, or apply style templates.",
  },
  {
    label: "Legal, brand, or factual approval",
    reason:
      "CopyPass flags copy-quality evidence but does not certify lawfulness, brand approval, or external truth.",
  },
  {
    label: "Detector-evasion guarantee",
    reason:
      "CopyPass is positioned as anti-slop and copy-quality review, not as an AI-detector bypass tool.",
  },
];

const COPYPASS_CHECK_IDS: CopyPassCheckId[] = [
  "value-prop-clarity",
  "cta-presence",
  "proof-trust-gap",
  "unsupported-superiority",
  "detector-evasion-claim",
  "placeholder-copy",
  "risky-guarantee-language",
  "internal-consistency",
  "audience-tone-fit",
  "ai-slop-language",
  "misleading-urgency",
  "ui-honesty-gap",
];

const VALUE_TERMS = [
  "helps",
  "ship",
  "review",
  "scan",
  "find",
  "reduce",
  "save",
  "protect",
  "connect",
  "context",
  "proof",
  "receipts",
  "checks",
  "workflow",
];

const VAGUE_TERMS = [
  "all-in-one",
  "game changing",
  "next generation",
  "next-gen",
  "powerful",
  "revolutionary",
  "simple",
  "smart",
  "solution",
  "transform",
  "world class",
];

const CTA_TERMS = ["book", "connect", "create", "get", "join", "open", "run", "scan", "start", "try"];
const PROOF_TERMS = ["audit", "case study", "check", "checked", "checks", "customer", "evidence", "privacy", "proof", "receipt", "receipts", "safety", "security", "trusted", "verified"];
const SUPERIORITY_TERMS = ["#1", "best", "industry leading", "leading", "most advanced", "number one", "revolutionary", "ultimate"];
const PLACEHOLDER_TERMS = ["coming soon", "copy goes here", "insert copy", "lorem ipsum"];
const GUARANTEE_TERMS = ["100%", "always", "compliance guaranteed", "guaranteed", "instant revenue", "never fail", "rank #1", "risk-free"];
const DETECTOR_EVASION_TERMS = ["ai detection bypass", "bypass ai detection", "bypass ai detector", "beat ai detection", "beat ai detector", "evade ai detection", "evade detection", "gptzero safe", "pass gptzero", "pass turnitin", "turnitin safe", "turnitin-safe", "undetectable ai"];
const AI_SLOP_TERMS = ["delve", "elevate", "game changing", "game-changing", "in today's digital landscape", "leverage", "not just", "revolutionize", "seamless", "tapestry", "transform your", "unlock", "whether you're"];
const URGENCY_TERMS = ["act now", "before it's gone", "don't miss out", "last chance", "limited time", "only today"];
const UI_AUTOMATION_TERMS = ["autopilot", "automatic", "automatically", "automated", "done for you", "fully built", "hands-off", "zero touch"];
const INFORMAL_TONE_TERMS = ["bro", "crush it", "heck yeah", "insane", "lol", "no-brainer", "skyrocket"];
const FORMAL_CHANNEL_TERMS = ["pricing", "legal", "proof", "billing", "compliance", "privacy", "security"];
const FORMAL_COPY_TERMS = ["annual contract", "approval", "billing", "compliance", "evidence", "legal", "privacy", "proof", "receipt", "security", "terms"];
const CONSISTENCY_PAIRS = [
  ["free forever", "paid only"],
  ["no credit card", "credit card required"],
  ["cancel anytime", "annual contract"],
  ["zero setup", "setup fee"],
  ["no setup", "setup fee"],
  ["private by default", "public by default"],
] as const;

function emptySummary(): VerdictSummary {
  return { total: 0, check: 0, na: 0, fail: 0, other: 0, pending: 0, pass_rate: 1 };
}

function parseProfile(raw: unknown): RunProfile | null {
  if (raw === undefined || raw === null || raw === "") return "smoke";
  return raw === "smoke" || raw === "standard" || raw === "deep" ? raw : null;
}

function previewCopy(text: string): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (SENSITIVE_COPY_PATTERN.test(oneLine)) {
    return "[redacted-sensitive-copy-fragment]";
  }
  return oneLine.length > 160 ? `${oneLine.slice(0, 157)}...` : oneLine;
}

function summarize(findings: CopyFinding[]): VerdictSummary {
  const summary = emptySummary();
  summary.total = findings.length;
  for (const finding of findings) {
    summary[finding.verdict] += 1;
  }
  const decided = summary.check + summary.na + summary.fail + summary.other;
  summary.pass_rate = decided > 0 ? summary.check / decided : 1;
  return summary;
}

function createRunRecord(
  copyText: string,
  profile: RunProfile,
  args: Record<string, unknown>,
  copyroomReceipt?: CopyRoomCopyReceipt,
): CopyRunRecord {
  const record: CopyRunRecord = {
    id: randomUUID(),
    profile,
    status: "queued",
    target: {
      type: "copy",
      copy_text_preview: previewCopy(copyText),
      channel: typeof args.channel === "string" ? args.channel : undefined,
      audience: typeof args.audience === "string" ? args.audience : undefined,
      goal: typeof args.goal === "string" ? args.goal : undefined,
    },
    verdict_summary: emptySummary(),
    copypass_verdict: "pass",
    overall_score: 100,
    checks_attempted: COPYPASS_CHECK_IDS,
    created_at: new Date().toISOString(),
    completed_at: null,
    findings: [],
    notes: [],
    summary: summarizeCopyPass([]),
    disclaimer: COPYPASS_DISCLAIMER,
    not_checked: COPYPASS_NOT_CHECKED,
    copyroom_receipt: copyroomReceipt,
  };
  RUNS.set(record.id, record);
  return record;
}

function appendDeterministicFindings(runId: string, copyText: string): void {
  const current = RUNS.get(runId);
  if (!current) return;
  current.findings.push(...detectCopyPassFindings(copyText, current));
  current.verdict_summary = summarize(current.findings);
  current.overall_score = scoreCopyPassFindings(current.findings);
  current.copypass_verdict = toCopyPassRunVerdict(current.findings);
  current.summary = summarizeCopyPass(current.findings);
  RUNS.set(runId, current);
}

function appendNote(runId: string, note: string): void {
  const current = RUNS.get(runId);
  if (!current) return;
  current.notes.push(note);
  RUNS.set(runId, current);
}

function detectCopyPassFindings(copyText: string, run: CopyRunRecord): CopyFinding[] {
  const normalized = normalizeCopy(copyText);
  const findings: CopyFinding[] = [];
  const channel = normalizeCopy(run.target.channel ?? "");
  const isPolicyExample = isPolicyExampleCatalog(normalized, channel);

  if (containsAny(normalized, VAGUE_TERMS) && !containsAny(normalized, VALUE_TERMS)) {
    findings.push(
      createCopyFinding(
        "value-prop-clarity",
        "Primary copy lacks a concrete value prop",
        "medium",
        "The copy leans on broad language without clearly naming the user, action, and outcome.",
        "Rewrite the line with a concrete audience, action, and outcome instead of broad platform language.",
        copyText,
      ),
    );
  }

  if (containsAny(channel, ["hero", "cta"]) && !containsAny(normalized, CTA_TERMS)) {
    findings.push(
      createCopyFinding(
        "cta-presence",
        "Primary copy is missing a clear CTA",
        "medium",
        "The block does not include a direct next action.",
        "Add one direct call to action, such as Start, Try, Connect, Run, Book, or Open.",
        copyText,
      ),
    );
  }

  if (containsAny(channel, ["hero", "pricing"]) && !containsAny(normalized, PROOF_TERMS)) {
    findings.push(
      createCopyFinding(
        "proof-trust-gap",
        "Primary copy is missing a trust signal",
        "low",
        "The block does not show proof, safety, privacy, receipt, or public evidence language.",
        "Add a concrete receipt, customer proof, safety note, privacy note, or public evidence signal.",
        copyText,
      ),
    );
  }

  if (
    !isPolicyExample &&
    containsAny(normalized, SUPERIORITY_TERMS) &&
    !containsAny(normalized, PROOF_TERMS)
  ) {
    findings.push(
      createCopyFinding(
        "unsupported-superiority",
        "Superiority claim needs proof",
        "high",
        "The copy uses an absolute or superiority phrase without a nearby proof signal.",
        "Replace the absolute claim with a qualified claim, or attach public proof in nearby copy.",
        copyText,
      ),
    );
  }

  if (hasPlaceholderLanguage(normalized)) {
    findings.push(
      createCopyFinding(
        "placeholder-copy",
        "Placeholder copy detected",
        "medium",
        "The block contains drafting language that should not ship.",
        "Replace the placeholder with final copy or remove the block until the message is ready.",
        copyText,
      ),
    );
  }

  if (!isPolicyExample && hasRiskyGuarantee(normalized)) {
    findings.push(
      createCopyFinding(
        "risky-guarantee-language",
        "Outcome guarantee language detected",
        "high",
        "The copy appears to promise a fixed result, access, compliance, revenue, or ranking outcome.",
        "Use advisory, evidence-backed language and remove outcome guarantees.",
        copyText,
      ),
    );
  }

  if (!isPolicyExample && containsAny(normalized, DETECTOR_EVASION_TERMS)) {
    findings.push(
      createCopyFinding(
        "detector-evasion-claim",
        "Detector-evasion claim detected",
        "high",
        "The copy markets AI-detector bypass or guaranteed undetectability instead of quality review.",
        "Reposition the copy around quality, clarity, editing, and evidence instead of detector bypass claims.",
        copyText,
      ),
    );
  }

  const matchedPair = CONSISTENCY_PAIRS.find(([left, right]) =>
    containsAny(normalized, [left]) && containsAny(normalized, [right])
  );
  if (!isPolicyExample && matchedPair) {
    findings.push(
      createCopyFinding(
        "internal-consistency",
        "Copy contains conflicting offer language",
        "high",
        `The inspected copy contains both "${matchedPair[0]}" and "${matchedPair[1]}".`,
        "Reconcile the conflicting claims or add context that makes the difference explicit.",
        copyText,
      ),
    );
  }

  if (
    (containsAny(channel, FORMAL_CHANNEL_TERMS) || containsAny(normalized, FORMAL_COPY_TERMS)) &&
    containsAny(normalized, INFORMAL_TONE_TERMS)
  ) {
    findings.push(
      createCopyFinding(
        "audience-tone-fit",
        "Tone does not fit the surface",
        "medium",
        "A formal surface uses casual hype or slang that may reduce trust.",
        "Rewrite in the audience's language and remove tone swings that do not fit the surface.",
        copyText,
      ),
    );
  }

  if (
    !isPolicyExample &&
    (containsAny(normalized, AI_SLOP_TERMS) || /[\u2013\u2014]/u.test(copyText))
  ) {
    findings.push(
      createCopyFinding(
        "ai-slop-language",
        "Generic AI-sounding language detected",
        "medium",
        "The copy uses a common AI-writing tell or avoidable em dash styling instead of direct, specific wording.",
        "Replace generic AI-sounding phrases with concrete nouns, verbs, and proof-backed wording.",
        copyText,
      ),
    );
  }

  if (!isPolicyExample && containsAny(normalized, URGENCY_TERMS) && !hasUrgencySupport(normalized)) {
    findings.push(
      createCopyFinding(
        "misleading-urgency",
        "Urgency claim needs support",
        "high",
        "The copy creates urgency without showing a real deadline, quota, or availability reason.",
        "Remove the urgency claim or add nearby evidence such as an actual deadline, quota, or availability reason.",
        copyText,
      ),
    );
  }

  if (
    !isPolicyExample &&
    containsAny(normalized, UI_AUTOMATION_TERMS) &&
    !containsAny(normalized, PROOF_TERMS) &&
    !containsAny(normalized, ["beta", "manual review", "preview", "when safe"])
  ) {
    findings.push(
      createCopyFinding(
        "ui-honesty-gap",
        "Automation claim needs a proof boundary",
        "high",
        "The copy implies finished automation without naming receipts, checks, review, or a clear beta boundary.",
        "Qualify the capability, name the proof boundary, or link to the receipt that supports the claim.",
        copyText,
      ),
    );
  }

  return findings;
}

function createCopyFinding(
  checkId: CopyPassCheckId,
  title: string,
  severity: Severity,
  description: string,
  remediation: string,
  copyText: string,
): CopyFinding {
  return {
    id: randomUUID(),
    check_id: checkId,
    title,
    severity,
    verdict: "fail",
    category: "deterministic-copy-quality",
    description,
    remediation,
    evidence: {
      preview: previewCopy(copyText),
      scope: "caller_provided_copy",
    },
    created_at: new Date().toISOString(),
  };
}

function toCopyPassRunVerdict(findings: CopyFinding[]): CopyPassRunVerdict {
  if (findings.length === 0) return "pass";
  if (findings.some((finding) => finding.severity === "critical" || finding.severity === "high")) {
    return "fail";
  }
  return "warn";
}

function scoreCopyPassFindings(findings: CopyFinding[]): number {
  const penalty = findings.reduce((total, finding) => {
    switch (finding.severity) {
      case "critical":
        return total + 30;
      case "high":
        return total + 20;
      case "medium":
        return total + 12;
      case "low":
        return total + 6;
      case "info":
        return total + 2;
    }
  }, 0);

  return Math.max(0, 100 - penalty);
}

function summarizeCopyPass(findings: CopyFinding[]): CopyPassSummary {
  const counts_by_severity: Record<Severity, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  };
  for (const finding of findings) counts_by_severity[finding.severity] += 1;

  const hasSerious = findings.some(
    (finding) => finding.severity === "critical" || finding.severity === "high",
  );
  return {
    posture:
      findings.length === 0
        ? "CopyPass found no deterministic copy-quality issues in the inspected scope."
        : hasSerious
          ? "CopyPass found evidence-backed copy risks that should be fixed before publishing."
          : "CopyPass found copy improvements worth reviewing before publishing.",
    counts_by_severity,
    coverage_note:
      "This result only covers caller-provided copy_text or CopyRoom packet text. Unknown legal, factual, brand, localization, and performance questions stay unknown.",
  };
}

function normalizeCopy(value: string): string {
  return value.toLocaleLowerCase("en-US").replace(/\s+/g, " ").trim();
}

function containsAny(value: string, terms: string[]): boolean {
  return terms.some((term) => containsTerm(value, term));
}

function isPolicyExampleCatalog(normalized: string, channel: string): boolean {
  if (!containsAny(channel, ["doc", "docs", "policy", "guardrail", "linter", "audit"])) {
    return false;
  }

  const catalogContext = `${channel} ${normalized}`;
  const hasGuardrailContext = containsAny(catalogContext, [
    "banned",
    "forbidden",
    "blocked",
    "disallowed",
    "do not use",
    "guardrail",
    "linter",
    "marketing copy audit",
    "passguard",
    "policy",
  ]);
  const hasExampleContext = containsAny(catalogContext, [
    "allowed framing",
    "banned phrase",
    "banned phrases",
    "example",
    "examples",
    "phrase",
    "phrases",
    "term",
    "terms",
    "wording",
  ]);
  const hasRiskTerm = containsAny(normalized, [
    ...SUPERIORITY_TERMS,
    ...GUARANTEE_TERMS,
    ...DETECTOR_EVASION_TERMS,
    ...AI_SLOP_TERMS,
    ...URGENCY_TERMS,
    ...UI_AUTOMATION_TERMS,
  ]);

  return hasGuardrailContext && hasExampleContext && hasRiskTerm;
}

function containsTerm(value: string, term: string): boolean {
  const escaped = escapeRegExp(term);
  const startsWithWord = /^[a-z0-9]/i.test(term);
  const endsWithWord = /[a-z0-9]$/i.test(term);
  const prefix = startsWithWord ? "(?:^|[^a-z0-9])" : "";
  const suffix = endsWithWord ? "(?=$|[^a-z0-9])" : "";
  return new RegExp(`${prefix}${escaped}${suffix}`, "i").test(value);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasUrgencySupport(value: string): boolean {
  return /\b\d{1,2}\s*(hours?|days?|seats?|spots?|places?)\b/i.test(value) ||
    /\b(deadline|until|ends|expires|capacity|quota)\b/i.test(value);
}

function hasPlaceholderLanguage(value: string): boolean {
  return containsAny(value, PLACEHOLDER_TERMS) ||
    /\b(todo|tbd)\b/i.test(value) ||
    /\bplaceholder\s+(text|copy|headline|body)\s+(here|goes here)\b/i.test(value);
}

function hasRiskyGuarantee(value: string): boolean {
  const neutralized = value
    .replace(
      /\b(?:not|no|never|without|cannot|can't|does not|doesn't|do not|don't|is not|isn't|are not|aren't)\s+(?:a\s+)?guarantee(?:d|s)?\b/g,
      "",
    )
    .replace(/\bdoes not guarantee\b/g, "")
    .replace(/\bno guarantee(?:s|d)?\b/g, "");

  return containsAny(neutralized, GUARANTEE_TERMS);
}

export async function copypassRun(args: Record<string, unknown>): Promise<unknown> {
  const prepared = prepareCopyText(args);
  if (prepared.error) {
    return {
      error: prepared.error,
      copyroom_receipt: prepared.copyroomReceipt ?? null,
    };
  }
  const copyText = prepared.copyText;
  if (!copyText) return { error: "copy_text or copyroom_source_packet is required" };
  if (!copyText.trim()) {
    return {
      error: "COPY_TEXT_EMPTY: CopyPass requires non-whitespace copy_text to review.",
      copyroom_receipt: prepared.copyroomReceipt ?? null,
    };
  }
  const profile = parseProfile(args.profile);
  if (!profile) return { error: "profile must be one of: smoke, standard, deep" };

  const run = createRunRecord(copyText, profile, args, prepared.copyroomReceipt);
  RUNS.set(run.id, { ...run, status: "running" });
  appendDeterministicFindings(run.id, copyText);
  appendNote(run.id, "Deterministic CopyPass checks ran on caller-provided copy. No paid model, production crawl, private analytics, or detector-evasion claim was used.");
  appendNote(run.id, "Use channel, audience, and goal fields to make the scoped copy review easier to audit.");
  if (prepared.copyroomReceipt) {
    appendNote(
      run.id,
      "CopyRoom exact-copy receipt attached: source/output hashes, byte counts, character counts, and diff status are included.",
    );
  }

  const completed = RUNS.get(run.id);
  if (!completed) return { error: "run disappeared before completion" };
  completed.status = "complete";
  completed.completed_at = new Date().toISOString();
  RUNS.set(run.id, completed);

  return {
    run_id: completed.id,
    status: completed.status,
    finding_count: completed.findings.length,
    copypass_verdict: completed.copypass_verdict,
    overall_score: completed.overall_score,
    checks_attempted: completed.checks_attempted,
    verdict_summary: completed.verdict_summary,
    summary: completed.summary,
    findings: completed.findings,
    disclaimer: completed.disclaimer,
    not_checked: completed.not_checked,
    notes: completed.notes,
    preview: completed.target.copy_text_preview,
    copyroom_receipt: completed.copyroom_receipt ?? null,
  };
}

export async function copypassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const run = RUNS.get(runId);
  if (!run) return { error: `CopyPass run '${runId}' was not found in this MCP session` };
  return {
    run_id: run.id,
    status: run.status,
    profile: run.profile,
    finding_count: run.findings.length,
    copypass_verdict: run.copypass_verdict,
    overall_score: run.overall_score,
    checks_attempted: run.checks_attempted,
    verdict_summary: run.verdict_summary,
    summary: run.summary,
    target: run.target,
    findings: run.findings,
    disclaimer: run.disclaimer,
    not_checked: run.not_checked,
    notes: run.notes,
    completed_at: run.completed_at,
    copyroom_receipt: run.copyroom_receipt ?? null,
  };
}

function prepareCopyText(args: Record<string, unknown>): CopyRoomPreparedCopy {
  const rawSourcePacket = args.copyroom_source_packet;
  const copyroomRequired = requiresCopyRoomReceipt(args.copyroom_required);
  if (rawSourcePacket !== undefined && rawSourcePacket !== null) {
    const packetInput = parseCopyRoomSourcePacketInput(rawSourcePacket);
    if (!packetInput) {
      return { copyText: "", error: "COPYROOM_MISSING: copyroom_source_packet must include source_id, source_pointer, and text." };
    }

    const packet = createCopyRoomSourcePacket(packetInput);
    const outputText = typeof args.copy_text === "string" ? args.copy_text : packet.text;
    const outputPointer =
      typeof args.copyroom_output_pointer === "string" && args.copyroom_output_pointer.trim()
        ? args.copyroom_output_pointer.trim()
        : `copypass://copyroom-output/${packet.source_id}`;
    const receipt = verifyCopyRoomExact(packet, outputText, outputPointer);

    if (receipt.status !== "pass") {
      return {
        copyText: "",
        copyroomReceipt: receipt,
        error: "FIDELITY_DRIFT_RISK: copy_text differs from the CopyRoom source packet.",
      };
    }

    return { copyText: outputText, copyroomReceipt: receipt };
  }

  if (copyroomRequired) {
    return {
      copyText: "",
      error: "COPYROOM_MISSING: copyroom_source_packet is required when copyroom_required is true.",
    };
  }

  return {
    copyText: typeof args.copy_text === "string" ? args.copy_text : "",
  };
}

function requiresCopyRoomReceipt(value: unknown): boolean {
  return value === true || value === "true";
}

function parseCopyRoomSourcePacketInput(value: unknown): CopyRoomSourcePacketInput | null {
  if (!isRecord(value)) return null;

  const sourceId = typeof value.source_id === "string" ? value.source_id : "";
  const sourcePointer = typeof value.source_pointer === "string" ? value.source_pointer : "";
  const text = typeof value.text === "string" ? value.text : "";
  const encoding = value.encoding === undefined || value.encoding === "utf8" ? "utf8" : null;
  const newlinePolicy =
    value.newline_policy === undefined || value.newline_policy === "preserve" ? "preserve" : null;

  if (!sourceId.trim() || !sourcePointer.trim() || text === "" || !encoding || !newlinePolicy) {
    return null;
  }

  return {
    source_id: sourceId,
    source_pointer: sourcePointer,
    text,
    encoding,
    newline_policy: newlinePolicy,
  };
}

function createCopyRoomSourcePacket(input: CopyRoomSourcePacketInput): CopyRoomSourcePacket {
  return {
    kind: "copyroom_source_packet",
    source_id: requireNonEmpty(input.source_id, "source_id"),
    source_pointer: requireNonEmpty(input.source_pointer, "source_pointer"),
    text: input.text,
    encoding: input.encoding ?? "utf8",
    newline_policy: input.newline_policy ?? "preserve",
    newline_style: detectNewlineStyle(input.text),
    source_sha256: sha256Utf8(input.text),
    byte_count: byteCount(input.text),
    character_count: characterCount(input.text),
  };
}

function verifyCopyRoomExact(
  packet: CopyRoomSourcePacket,
  outputText: string,
  outputPointer: string,
): CopyRoomCopyReceipt {
  const outputSha256 = sha256Utf8(outputText);
  const outputByteCount = byteCount(outputText);
  const outputCharacterCount = characterCount(outputText);
  const outputNewlineStyle = detectNewlineStyle(outputText);
  const exactMatch =
    outputSha256 === packet.source_sha256 &&
    outputByteCount === packet.byte_count &&
    outputCharacterCount === packet.character_count &&
    outputNewlineStyle === packet.newline_style &&
    outputText === packet.text;

  return {
    kind: "copyroom_exact_copy_receipt",
    status: exactMatch ? "pass" : "blocked",
    source_id: packet.source_id,
    source_pointer: packet.source_pointer,
    output_pointer: requireNonEmpty(outputPointer, "output_pointer"),
    source_sha256: packet.source_sha256,
    output_sha256: outputSha256,
    byte_count: packet.byte_count,
    output_byte_count: outputByteCount,
    character_count: packet.character_count,
    output_character_count: outputCharacterCount,
    encoding: packet.encoding,
    newline_policy: packet.newline_policy,
    newline_style: packet.newline_style,
    output_newline_style: outputNewlineStyle,
    exact_diff: exactMatch ? "pass" : "fail",
    action_needed: exactMatch
      ? []
      : ["FIDELITY_DRIFT_RISK: output differs from CopyRoom source packet."],
  };
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function byteCount(value: string): number {
  return Buffer.byteLength(value, "utf8");
}

function characterCount(value: string): number {
  return Array.from(value).length;
}

function detectNewlineStyle(value: string): CopyRoomNewlineStyle {
  const crlf = /\r\n/.test(value);
  const withoutCrlf = value.replace(/\r\n/g, "");
  const lf = /\n/.test(withoutCrlf);
  const cr = /\r/.test(withoutCrlf);
  const count = [crlf, lf, cr].filter(Boolean).length;

  if (count === 0) return "none";
  if (count > 1) return "mixed";
  if (crlf) return "crlf";
  if (lf) return "lf";
  return "cr";
}

function requireNonEmpty(value: string, label: string): string {
  if (!value.trim()) {
    throw new Error(`CopyRoom ${label} is required.`);
  }
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const SENSITIVE_COPY_PATTERN =
  /\b(api[_ -]?key|bearer|password|secret|sk-[a-z0-9_-]{8,}|token)\b/i;
