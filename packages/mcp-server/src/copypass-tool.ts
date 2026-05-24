import { createHash, randomUUID } from "node:crypto";

type Verdict = "check" | "na" | "fail" | "other" | "pending";
type Severity = "critical" | "high" | "medium" | "low";
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
  created_at: string;
  completed_at: string | null;
  findings: CopyFinding[];
  notes: string[];
  copyroom_receipt?: CopyRoomCopyReceipt;
  error?: string;
}

const RUNS = new Map<string, CopyRunRecord>();

function emptySummary(): VerdictSummary {
  return { total: 0, check: 0, na: 0, fail: 0, other: 0, pending: 0, pass_rate: 0 };
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
  summary.pass_rate = decided > 0 ? summary.check / decided : 0;
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
    created_at: new Date().toISOString(),
    completed_at: null,
    findings: [],
    notes: [],
    copyroom_receipt: copyroomReceipt,
  };
  RUNS.set(record.id, record);
  return record;
}

function appendScaffoldFinding(runId: string, copyText: string): void {
  const current = RUNS.get(runId);
  if (!current) return;
  current.findings.push({
    id: randomUUID(),
    check_id: "copypass.scaffold.placeholder",
    title: "CopyPass scaffold is wired, but automated copy checks have not landed yet",
    severity: "low",
    verdict: "na",
    category: "scaffold",
    description:
      "This run proves the CopyPass MCP and admin surface are connected. Evidence-led copy checks land in a later chunk.",
    remediation:
      "Use this scaffold to test routing, entitlement, and UI placement now. Add deterministic copy checks before calling the result a real verdict.",
    evidence: {
      copy_length: copyText.length,
      preview: previewCopy(copyText),
      channel: current.target.channel ?? null,
      audience: current.target.audience ?? null,
      goal: current.target.goal ?? null,
      copyroom_receipt: current.copyroom_receipt
        ? {
            status: current.copyroom_receipt.status,
            source_pointer: current.copyroom_receipt.source_pointer,
            output_pointer: current.copyroom_receipt.output_pointer,
            source_sha256: current.copyroom_receipt.source_sha256,
            output_sha256: current.copyroom_receipt.output_sha256,
            byte_count: current.copyroom_receipt.byte_count,
            output_byte_count: current.copyroom_receipt.output_byte_count,
            character_count: current.copyroom_receipt.character_count,
            output_character_count: current.copyroom_receipt.output_character_count,
            exact_diff: current.copyroom_receipt.exact_diff,
          }
        : null,
    },
    created_at: new Date().toISOString(),
  });
  current.verdict_summary = summarize(current.findings);
  RUNS.set(runId, current);
}

function appendNote(runId: string, note: string): void {
  const current = RUNS.get(runId);
  if (!current) return;
  current.notes.push(note);
  RUNS.set(runId, current);
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
  const profile = parseProfile(args.profile);
  if (!profile) return { error: "profile must be one of: smoke, standard, deep" };

  const run = createRunRecord(copyText, profile, args, prepared.copyroomReceipt);
  RUNS.set(run.id, { ...run, status: "running" });
  appendScaffoldFinding(run.id, copyText);
  appendNote(run.id, "Chunk 1 scaffold only: CopyPass surface is live, but deterministic copy-quality checks land in a later chunk.");
  appendNote(run.id, "Use channel, audience, and goal fields now so later evaluator passes inherit realistic operator context.");
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
    verdict_summary: completed.verdict_summary,
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
    verdict_summary: run.verdict_summary,
    target: run.target,
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
    copyText: typeof args.copy_text === "string" ? args.copy_text.trim() : "",
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
